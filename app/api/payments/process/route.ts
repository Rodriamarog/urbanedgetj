import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { Resend } from 'resend'
import { ProcessPaymentRequest, ProcessPaymentResponse } from '@/lib/types/order'
import { getOrderByExternalReference, updateOrderPaymentStatus } from '@/lib/supabase/orders'
import { getOrderNotificationEmail } from '@/lib/email/templates/order-notification'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

// Initialize MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 10000
  }
})

const payment = new Payment(client)

export async function POST(request: NextRequest) {
  try {
    const body: ProcessPaymentRequest = await request.json()

    console.log('Processing payment for order:', body.orderId)

    // Validate request
    if (!body.token || !body.orderId || !body.paymentMethodId) {
      return NextResponse.json({
        success: false,
        error: 'Datos incompletos',
        message: 'Token, order ID, y método de pago son requeridos'
      } as ProcessPaymentResponse, { status: 400 })
    }

    // Fetch order from database to get amount and details
    const orderResult = await getOrderByExternalReference(body.orderId)

    if (!orderResult.success || !orderResult.order) {
      return NextResponse.json({
        success: false,
        error: 'Orden no encontrada',
        message: 'No se encontró la orden en la base de datos'
      } as ProcessPaymentResponse, { status: 404 })
    }

    const dbOrder = orderResult.order

    // Create payment request for MercadoPago
    const paymentData = {
      transaction_amount: dbOrder.total,
      token: body.token,
      description: `Orden ${body.orderId} - Urban Edge TJ`,
      installments: body.installments,
      payment_method_id: body.paymentMethodId,
      issuer_id: body.issuerId,
      payer: {
        email: body.payer.email,
        identification: body.payer.identification
      },
      external_reference: body.orderId,
      statement_descriptor: 'URBAN EDGE TJ',
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/mercadopago`,
      metadata: {
        order_id: body.orderId
      }
    }

    console.log('Creating payment in MercadoPago:', {
      amount: paymentData.transaction_amount,
      method: paymentData.payment_method_id,
      order: body.orderId
    })

    // Generate idempotency key for safe retries
    const idempotencyKey = uuidv4()

    // Process payment with MercadoPago
    const mpPayment = await payment.create({
      body: paymentData,
      requestOptions: {
        idempotencyKey
      }
    })

    console.log('MercadoPago payment response:', {
      id: mpPayment.id,
      status: mpPayment.status,
      status_detail: mpPayment.status_detail
    })

    // Update order in database with payment info
    const paymentStatus = mpPayment.status as string
    const orderStatus = paymentStatus === 'approved' ? 'approved' :
                       paymentStatus === 'rejected' ? 'rejected' :
                       'processing'

    await updateOrderPaymentStatus(
      body.orderId,
      String(mpPayment.id),
      paymentStatus,
      orderStatus
    )

    // Send email notification if payment approved
    if (mpPayment.status === 'approved') {
      console.log('Payment approved, sending email notification')

      try {
        // Fetch full order with items for email
        const updatedOrder = await getOrderByExternalReference(body.orderId)

        if (updatedOrder.success && updatedOrder.order) {
          const emailOrder = {
            id: updatedOrder.order.order_number,
            externalReference: updatedOrder.order.external_reference,
            items: updatedOrder.order.order_items.map((item: any) => ({
              product: item.product_snapshot || {
                id: item.product_id,
                name: item.product_name,
                slug: item.product_slug,
                images: []
              },
              size: item.size,
              quantity: item.quantity,
              price: item.unit_price
            })),
            customerInfo: {
              firstName: '',
              lastName: '',
              email: updatedOrder.order.customer_email,
              phone: updatedOrder.order.customer_phone
            },
            shippingAddress: {
              name: updatedOrder.order.shipping_name,
              addressLine1: updatedOrder.order.shipping_address_line1,
              addressLine2: updatedOrder.order.shipping_address_line2 || undefined,
              colonia: updatedOrder.order.shipping_colonia,
              city: updatedOrder.order.shipping_city,
              state: updatedOrder.order.shipping_state,
              postalCode: updatedOrder.order.shipping_postal_code,
              country: updatedOrder.order.shipping_country
            },
            useSameAddress: true,
            subtotal: updatedOrder.order.subtotal,
            tax: updatedOrder.order.tax,
            shipping: updatedOrder.order.shipping_cost,
            discount: updatedOrder.order.discount,
            total: updatedOrder.order.total,
            currency: updatedOrder.order.currency as 'MXN',
            couponCode: updatedOrder.order.coupon_code || undefined,
            status: updatedOrder.order.status as any,
            paymentStatus: updatedOrder.order.payment_status as any,
            createdAt: new Date(updatedOrder.order.created_at),
            updatedAt: new Date(updatedOrder.order.updated_at || updatedOrder.order.created_at)
          }

          const emailContent = getOrderNotificationEmail(emailOrder)

          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.ORDER_NOTIFICATION_EMAIL || 'urbanedgetj@gmail.com',
            subject: emailContent.subject,
            html: emailContent.html
          })

          console.log('Order notification email sent successfully')
        }
      } catch (emailError) {
        console.error('Failed to send order notification email:', emailError)
        // Don't fail the payment if email fails
      }
    }

    return NextResponse.json({
      success: true,
      paymentId: String(mpPayment.id),
      status: mpPayment.status as any,
      statusDetail: mpPayment.status_detail || undefined,
      message: mpPayment.status === 'approved' ? 'Pago aprobado exitosamente' :
               mpPayment.status === 'pending' ? 'Pago pendiente de confirmación' :
               mpPayment.status === 'in_process' ? 'Pago en proceso' :
               'Pago rechazado'
    } as ProcessPaymentResponse)

  } catch (error: any) {
    console.error('Payment processing error:', error)

    // Handle MercadoPago specific errors
    let errorMessage = 'Error al procesar el pago'
    let statusCode = 500

    if (error.cause) {
      const cause = JSON.parse(JSON.stringify(error.cause))
      if (cause[0]?.description) {
        errorMessage = cause[0].description
      }
      if (cause[0]?.code) {
        console.error('MercadoPago error code:', cause[0].code)
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Error de pago',
      message: errorMessage
    } as ProcessPaymentResponse, { status: statusCode })
  }
}
