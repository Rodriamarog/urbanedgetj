import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { Resend } from 'resend'
import { ProcessPaymentRequest, ProcessPaymentResponse, Order } from '@/lib/types/order'
import { createOrder, getOrderByExternalReference, updateOrderPaymentStatus, deleteOrder } from '@/lib/supabase/orders'
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

    console.log('Processing payment with order data:', {
      externalReference: body.externalReference,
      total: body.total,
      items: body.items?.length
    })

    // Validate request
    if (!body.token || !body.externalReference || !body.paymentMethodId) {
      return NextResponse.json({
        success: false,
        error: 'Datos incompletos',
        message: 'Token, referencia externa, y método de pago son requeridos'
      } as ProcessPaymentResponse, { status: 400 })
    }

    // Generate order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // STEP 1: Create order in database with 'pending' status
    const order: Order = {
      id: orderId,
      externalReference: body.externalReference,
      items: body.items,
      customerInfo: body.customerInfo,
      shippingAddress: body.shippingAddress,
      useSameAddress: true,
      subtotal: body.subtotal,
      tax: body.tax,
      shipping: body.shipping,
      discount: body.discount,
      total: body.total,
      couponCode: body.couponCode,
      currency: 'MXN',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    console.log('Creating order in database:', orderId)
    const orderResult = await createOrder(order)

    if (!orderResult.success) {
      console.error('Failed to create order in database')
      throw new Error('No se pudo crear la orden en la base de datos')
    }

    // STEP 2: Process payment with MercadoPago
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
    const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')

    const paymentData: any = {
      transaction_amount: body.total,
      token: body.token,
      description: `Orden ${orderId} - Urban Edge TJ`,
      installments: body.installments,
      payment_method_id: body.paymentMethodId,
      issuer_id: body.issuerId,
      payer: {
        email: body.payer.email,
        identification: body.payer.identification
      },
      external_reference: body.externalReference,
      statement_descriptor: 'URBAN EDGE TJ',
      metadata: {
        order_id: orderId
      }
    }

    // Only add notification_url in production (not localhost)
    if (!isLocalhost && baseUrl) {
      paymentData.notification_url = `${baseUrl}/api/webhook/mercadopago`
    }

    console.log('Creating payment in MercadoPago:', {
      amount: paymentData.transaction_amount,
      method: paymentData.payment_method_id,
      externalReference: body.externalReference
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

    // STEP 3: Handle payment result
    const paymentStatus = mpPayment.status as string

    if (paymentStatus === 'approved') {
      // Payment approved - update order status
      console.log('Payment approved, updating order status')

      await updateOrderPaymentStatus(
        body.externalReference,
        String(mpPayment.id),
        paymentStatus,
        'approved'
      )

      // Send email notification
      try {
        console.log('Sending order notification email')
        const emailContent = getOrderNotificationEmail(order)

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.ORDER_NOTIFICATION_EMAIL || 'urbanedgetj@gmail.com',
          subject: emailContent.subject,
          html: emailContent.html
        })

        console.log('Order notification email sent successfully')
      } catch (emailError) {
        console.error('Failed to send order notification email:', emailError)
        // Don't fail the payment if email fails
      }

      return NextResponse.json({
        success: true,
        orderId: orderId,
        paymentId: String(mpPayment.id),
        status: paymentStatus as any,
        message: 'Pago aprobado exitosamente'
      } as ProcessPaymentResponse)

    } else if (paymentStatus === 'rejected') {
      // Payment rejected - DELETE the order from database
      console.log('Payment rejected, deleting order from database')

      await deleteOrder(body.externalReference)

      return NextResponse.json({
        success: false,
        error: 'Pago rechazado',
        message: mpPayment.status_detail || 'Tu pago fue rechazado. Por favor intenta con otro método de pago.'
      } as ProcessPaymentResponse, { status: 400 })

    } else {
      // Payment pending/in_process - keep order as pending
      console.log('Payment pending/in_process, keeping order as pending')

      await updateOrderPaymentStatus(
        body.externalReference,
        String(mpPayment.id),
        paymentStatus,
        'processing'
      )

      return NextResponse.json({
        success: true,
        orderId: orderId,
        paymentId: String(mpPayment.id),
        status: paymentStatus as any,
        message: 'Pago pendiente de confirmación'
      } as ProcessPaymentResponse)
    }

  } catch (error: any) {
    console.error('Payment processing error:', error)

    // Handle MercadoPago specific errors
    let errorMessage = 'Error al procesar el pago'
    let statusCode = 500

    if (error.cause) {
      try {
        const cause = JSON.parse(JSON.stringify(error.cause))
        if (cause[0]?.description) {
          errorMessage = cause[0].description
        }
        if (cause[0]?.code) {
          console.error('MercadoPago error code:', cause[0].code)
        }
      } catch (parseError) {
        console.error('Error parsing error cause:', parseError)
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Error de pago',
      message: errorMessage
    } as ProcessPaymentResponse, { status: statusCode })
  }
}
