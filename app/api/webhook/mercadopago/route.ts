import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import crypto from 'crypto'
import {
  PaymentNotification,
  PaymentStatus,
  PaymentMethod,
  OrderStatus
} from '@/lib/types/order'

// Initialize MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000
  }
})

const payment = new Payment(client)

function verifySignature(
  signature: string,
  dataToValidate: string,
  secret: string
): boolean {
  try {
    // Extract timestamp and signature from x-signature header
    const parts = signature.split(',')
    let timestamp = ''
    let v1 = ''

    for (const part of parts) {
      const [key, value] = part.trim().split('=')
      if (key === 'ts') timestamp = value
      if (key === 'v1') v1 = value
    }

    if (!timestamp || !v1) {
      console.error('Invalid signature format')
      return false
    }

    // Create the string to validate
    const stringToValidate = `id:${dataToValidate};request-id:${timestamp};`

    // Generate HMAC
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(stringToValidate)
    const generatedSignature = hmac.digest('hex')

    return generatedSignature === v1
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

function mapPaymentStatus(mpStatus: string): PaymentStatus {
  const statusMap: Record<string, PaymentStatus> = {
    'pending': 'pending',
    'approved': 'approved',
    'authorized': 'authorized',
    'in_process': 'in_process',
    'in_mediation': 'in_mediation',
    'rejected': 'rejected',
    'cancelled': 'cancelled',
    'refunded': 'refunded',
    'charged_back': 'charged_back'
  }

  return statusMap[mpStatus] || 'pending'
}

function mapPaymentMethod(mpMethod: string): PaymentMethod {
  const methodMap: Record<string, PaymentMethod> = {
    'credit_card': 'credit_card',
    'debit_card': 'debit_card',
    'bank_transfer': 'bank_transfer',
    'ticket': 'ticket',
    'account_money': 'account_money',
    'digital_currency': 'digital_currency'
  }

  return methodMap[mpMethod] || 'credit_card'
}

function getOrderStatusFromPaymentStatus(paymentStatus: PaymentStatus): OrderStatus {
  switch (paymentStatus) {
    case 'approved':
      return 'approved'
    case 'rejected':
    case 'cancelled':
      return 'rejected'
    case 'pending':
    case 'in_process':
    case 'authorized':
      return 'processing'
    case 'refunded':
    case 'charged_back':
      return 'cancelled'
    case 'in_mediation':
      return 'processing'
    default:
      return 'pending'
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get headers
    const signature = request.headers.get('x-signature')
    const requestId = request.headers.get('x-request-id')

    if (!signature) {
      console.error('Missing x-signature header')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Get body
    const body = await request.text()
    let webhookData: any

    try {
      webhookData = JSON.parse(body)
    } catch (error) {
      console.error('Invalid JSON body:', error)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    console.log('Webhook received:', {
      action: webhookData.action,
      data: webhookData.data,
      type: webhookData.type
    })

    // Verify signature if secret is configured
    const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET
    if (webhookSecret && webhookSecret !== 'your_webhook_secret_here') {
      const dataId = webhookData.data?.id || webhookData.id
      if (!verifySignature(signature, dataId, webhookSecret)) {
        console.error('Invalid webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    // Process payment notifications
    if (webhookData.type === 'payment') {
      const paymentId = webhookData.data?.id || webhookData.id

      if (!paymentId) {
        console.error('Missing payment ID in webhook')
        return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 })
      }

      try {
        // Get payment details from MercadoPago
        const paymentData = await payment.get({ id: paymentId })

        if (!paymentData) {
          console.error('Payment not found:', paymentId)
          return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
        }

        // Extract order ID from external_reference
        const externalReference = paymentData.external_reference
        if (!externalReference) {
          console.error('Missing external_reference in payment:', paymentId)
          return NextResponse.json({ error: 'Missing external reference' }, { status: 400 })
        }

        // Create payment notification
        const notification: PaymentNotification = {
          id: `notification-${Date.now()}`,
          orderId: externalReference,
          paymentId: paymentId.toString(),
          status: mapPaymentStatus(paymentData.status || 'pending'),
          paymentMethod: mapPaymentMethod(paymentData.payment_method_id || 'credit_card'),
          amount: paymentData.transaction_amount || 0,
          currency: paymentData.currency_id || 'MXN',
          receivedAt: new Date(),

          // Additional MercadoPago data
          topic: webhookData.type,
          resource: webhookData.data?.id?.toString(),
          userId: webhookData.user_id?.toString(),
          apiVersion: webhookData.api_version,
          action: webhookData.action,
          dateCreated: paymentData.date_created
        }

        console.log('Payment notification processed:', {
          orderId: notification.orderId,
          paymentId: notification.paymentId,
          status: notification.status,
          amount: notification.amount
        })

        // TODO: In a real app, save notification to database and update order status
        // For now, we'll just log it

        // Here you would typically:
        // 1. Update order status in database
        // 2. Send confirmation email to customer
        // 3. Update inventory if payment approved
        // 4. Trigger fulfillment process

        return NextResponse.json({
          success: true,
          message: 'Notification processed',
          orderId: notification.orderId,
          status: notification.status
        })

      } catch (error) {
        console.error('Error processing payment notification:', error)
        return NextResponse.json({ error: 'Processing error' }, { status: 500 })
      }
    }

    // Handle other notification types (orders, merchant_orders, etc.)
    console.log('Unhandled webhook type:', webhookData.type)
    return NextResponse.json({
      success: true,
      message: 'Webhook received but not processed'
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Also handle GET requests for webhook verification
export async function GET(request: NextRequest) {
  // MercadoPago sometimes sends GET requests to verify webhook endpoint
  return NextResponse.json({
    status: 'ok',
    message: 'MercadoPago webhook endpoint is active'
  })
}