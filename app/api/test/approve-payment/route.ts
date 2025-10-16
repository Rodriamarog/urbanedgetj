import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { updateOrderPaymentStatus, getOrderByExternalReference } from '@/lib/supabase/orders'
import { Resend } from 'resend'
import { getOrderNotificationEmail } from '@/lib/email/templates/order-notification'
import { Order } from '@/lib/types/order'

const resend = new Resend(process.env.RESEND_API_KEY)

// Initialize MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000
  }
})

const payment = new Payment(client)

/**
 * TEST ENDPOINT - Simulates OXXO payment being completed
 *
 * Usage: POST /api/test/approve-payment
 * Body: { "paymentId": "1341813669" }
 *
 * This simulates what happens when a customer pays at OXXO and MercadoPago
 * sends a webhook notification.
 *
 * DELETE THIS FILE IN PRODUCTION OR ADD AUTHENTICATION
 */
export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json()

    if (!paymentId) {
      return NextResponse.json({
        error: 'Missing paymentId',
        usage: 'POST /api/test/approve-payment with body: { "paymentId": "123456" }'
      }, { status: 400 })
    }

    console.log('🧪 TEST: Fetching payment from MercadoPago:', paymentId)

    // Fetch payment details from MercadoPago (same as webhook does)
    const paymentData = await payment.get({ id: paymentId })

    if (!paymentData) {
      return NextResponse.json({
        error: 'Payment not found in MercadoPago'
      }, { status: 404 })
    }

    console.log('Payment details:', {
      id: paymentData.id,
      status: paymentData.status,
      external_reference: paymentData.external_reference,
      payment_method_id: paymentData.payment_method_id
    })

    const externalReference = paymentData.external_reference
    if (!externalReference) {
      return NextResponse.json({
        error: 'Payment has no external_reference'
      }, { status: 400 })
    }

    // Simulate payment being approved
    const newStatus = 'approved'

    console.log('🧪 TEST: Simulating payment approval...')
    console.log('Updating order status to:', newStatus)

    // Update order status in database
    await updateOrderPaymentStatus(
      externalReference,
      String(paymentData.id),
      newStatus as any,
      'approved'
    )

    console.log('✅ Order status updated in database')

    // Fetch full order for email
    const orderResult = await getOrderByExternalReference(externalReference)

    if (!orderResult.success || !orderResult.order) {
      return NextResponse.json({
        success: true,
        message: 'Order updated but could not fetch for email',
        paymentId,
        status: newStatus
      })
    }

    const dbOrder = orderResult.order

    // Convert to Order type for email
    const orderForEmail: Order = {
      id: dbOrder.order_number,
      externalReference: dbOrder.external_reference,
      items: dbOrder.order_items.map((item: any) => ({
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
        email: dbOrder.customer_email,
        phone: dbOrder.customer_phone
      },
      shippingAddress: {
        name: dbOrder.shipping_name,
        addressLine1: dbOrder.shipping_address_line1,
        addressLine2: dbOrder.shipping_address_line2 || undefined,
        colonia: dbOrder.shipping_colonia,
        city: dbOrder.shipping_city,
        state: dbOrder.shipping_state,
        postalCode: dbOrder.shipping_postal_code,
        country: dbOrder.shipping_country
      },
      useSameAddress: true,
      subtotal: dbOrder.subtotal,
      tax: dbOrder.tax,
      shipping: dbOrder.shipping_cost,
      discount: dbOrder.discount,
      total: dbOrder.total,
      currency: dbOrder.currency,
      couponCode: dbOrder.coupon_code || undefined,
      status: 'approved',
      paymentStatus: 'approved',
      createdAt: new Date(dbOrder.created_at),
      updatedAt: new Date()
    }

    console.log('📧 Sending order notification email...')

    const emailContent = getOrderNotificationEmail(orderForEmail)

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.ORDER_NOTIFICATION_EMAIL || 'urbanedgetj@gmail.com',
      subject: emailContent.subject,
      html: emailContent.html
    })

    console.log('✅ Order notification email sent successfully')

    return NextResponse.json({
      success: true,
      message: '🎉 OXXO payment simulation complete!',
      order: {
        id: orderForEmail.id,
        externalReference: orderForEmail.externalReference,
        status: 'approved',
        total: orderForEmail.total,
        email_sent: true,
        email_to: process.env.ORDER_NOTIFICATION_EMAIL
      },
      payment: {
        id: paymentData.id,
        status: paymentData.status,
        payment_method: paymentData.payment_method_id
      }
    })

  } catch (error) {
    console.error('❌ Test simulation error:', error)
    return NextResponse.json({
      error: 'Simulation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to show usage
export async function GET() {
  return NextResponse.json({
    message: 'Test endpoint for simulating OXXO payment approval',
    usage: {
      method: 'POST',
      endpoint: '/api/test/approve-payment',
      body: {
        paymentId: 'string (e.g., "1341813669")'
      },
      example: `
        curl -X POST http://localhost:3000/api/test/approve-payment \\
          -H "Content-Type: application/json" \\
          -d '{"paymentId": "1341813669"}'
      `
    },
    steps: [
      '1. Create an OXXO payment in your app',
      '2. Copy the payment ID from the URL or console',
      '3. POST to this endpoint with the payment ID',
      '4. Check console logs to see order update + email sent'
    ]
  })
}
