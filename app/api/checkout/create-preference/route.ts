import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { Resend } from 'resend'
import {
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
  MercadoPagoPreference
} from '@/lib/types/order'
import { CartItem } from '@/lib/types/cart'
import { getOrderNotificationEmail } from '@/lib/email/templates/order-notification'
import { createOrder } from '@/lib/supabase/orders'

const resend = new Resend(process.env.RESEND_API_KEY)

// Initialize MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
    idempotencyKey: 'dev-' + Date.now()
  }
})

const preference = new Preference(client)

function generateOrderId(): string {
  return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

function generateExternalReference(): string {
  return `URBANEDGE-${Date.now()}`
}

function validateOrderRequest(data: CreateOrderRequest): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validate items
  if (!data.items || data.items.length === 0) {
    errors.push('El carrito está vacío')
  }

  // Validate customer info
  if (!data.customerInfo.firstName?.trim()) errors.push('Nombre es requerido')
  if (!data.customerInfo.lastName?.trim()) errors.push('Apellidos son requeridos')
  if (!data.customerInfo.email?.trim()) errors.push('Email es requerido')
  if (!data.customerInfo.phone?.trim()) errors.push('Teléfono es requerido')

  // Validate shipping address
  if (!data.shippingAddress.name?.trim()) errors.push('Nombre para entrega es requerido')
  if (!data.shippingAddress.addressLine1?.trim()) errors.push('Dirección es requerida')
  if (!data.shippingAddress.colonia?.trim()) errors.push('Colonia es requerida')
  if (!data.shippingAddress.city?.trim()) errors.push('Ciudad es requerida')
  if (!data.shippingAddress.state?.trim()) errors.push('Estado es requerido')
  if (!data.shippingAddress.postalCode?.trim()) errors.push('Código postal es requerido')

  // Validate billing address if different
  if (!data.useSameAddress && data.billingAddress) {
    if (!data.billingAddress.name?.trim()) errors.push('Nombre para facturación es requerido')
    if (!data.billingAddress.addressLine1?.trim()) errors.push('Dirección de facturación es requerida')
  }

  return { valid: errors.length === 0, errors }
}

function calculateTotals(items: CartItem[], couponCode?: string) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Calculate shipping (free over $1500 MXN)
  const shipping = subtotal >= 1500 ? 0 : 150

  // Prices already include IVA (standard in Mexico)
  const tax = 0

  // Calculate total before discount
  const totalBeforeDiscount = subtotal + shipping + tax

  // Apply coupon discount on total
  let discount = 0
  if (couponCode === process.env.NEXT_PUBLIC_COUPON_CODE) {
    discount = Math.round(totalBeforeDiscount * 0.20) // 20% discount on total
  }

  const total = totalBeforeDiscount - discount

  return { subtotal, tax, shipping, discount, total }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()

    // Validate request
    const validation = validateOrderRequest(body)
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: 'Datos inválidos',
        message: validation.errors.join(', ')
      } as CreateOrderResponse, { status: 400 })
    }

    // Calculate totals
    const totals = calculateTotals(body.items, body.couponCode)

    // Generate order
    const orderId = generateOrderId()
    const externalReference = generateExternalReference()

    const order: Order = {
      id: orderId,
      items: body.items,
      customerInfo: body.customerInfo,
      shippingAddress: body.shippingAddress,
      billingAddress: body.billingAddress,
      useSameAddress: body.useSameAddress,
      ...totals,
      couponCode: body.couponCode,
      currency: 'MXN',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      externalReference
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Create MercadoPago preference
    const mpItems: any[] = body.items.map(item => {
      const imageUrl = item.product.images?.[0]?.url
      const fullImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : undefined

      return {
        id: item.product.id,
        title: item.product.name,
        description: `${item.product.description} - Talla: ${item.size.toUpperCase()}`,
        picture_url: fullImageUrl,
        category_id: item.product.category,
        quantity: item.quantity,
        currency_id: 'MXN' as const,
        unit_price: item.price
      }
    })

    // Add shipping as item if not free
    if (totals.shipping > 0) {
      mpItems.push({
        id: 'shipping',
        title: 'Envío',
        description: 'Costo de envío a domicilio',
        quantity: 1,
        currency_id: 'MXN' as const,
        unit_price: totals.shipping
      })
    }

    // Apply discount as negative item
    if (totals.discount > 0) {
      mpItems.push({
        id: 'discount',
        title: `Descuento (${body.couponCode})`,
        description: 'Cupón de descuento aplicado',
        quantity: 1,
        currency_id: 'MXN' as const,
        unit_price: -totals.discount
      })
    }

    const successUrl = process.env.MERCADOPAGO_SUCCESS_URL || '/store/order/success'
    const failureUrl = process.env.MERCADOPAGO_FAILURE_URL || '/store/order/failure'
    const pendingUrl = process.env.MERCADOPAGO_PENDING_URL || '/store/order/pending'

    const backUrls = {
      success: `${baseUrl}${successUrl}?order_id=${orderId}`,
      failure: `${baseUrl}${failureUrl}?order_id=${orderId}`,
      pending: `${baseUrl}${pendingUrl}?order_id=${orderId}`
    }

    console.log('Creating preference with back_urls:', backUrls)

    const preferenceData = {
      items: mpItems,
      payer: {
        name: body.customerInfo.firstName,
        surname: body.customerInfo.lastName,
        email: body.customerInfo.email,
        phone: {
          number: body.customerInfo.phone.replace(/[^\d]/g, '') // Remove non-digits
        }
      },
      back_urls: backUrls,
      // auto_return: 'approved', // Temporarily disabled to test
      payment_methods: {
        installments: 12, // Allow up to 12 monthly installments
        default_installments: 1 // Default to single payment
      },
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
      statement_descriptor: 'URBAN EDGE TJ',
      external_reference: externalReference,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }

    console.log('Full preference data:', JSON.stringify(preferenceData, null, 2))

    // Create preference in MercadoPago
    const mpPreference = await preference.create({ body: preferenceData })

    // Update order with preference ID
    order.preferenceId = mpPreference.id
    order.mercadoPagoId = mpPreference.id

    // Save order to database
    const dbResult = await createOrder(order)
    if (!dbResult.success) {
      console.error('Failed to save order to database, but continuing...', dbResult.error)
      // Don't fail the checkout if database save fails
    }

    // Send order notification email
    try {
      const emailTemplate = getOrderNotificationEmail(order)
      await resend.emails.send({
        from: 'Urban Edge TJ <orders@urbanedgetj.com>',
        to: process.env.ORDER_NOTIFICATION_EMAIL || 'urbanedgetj@gmail.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html
      })
      console.log('✅ Order notification email sent:', order.id)
    } catch (emailError) {
      console.error('❌ Failed to send order notification email:', emailError)
      // Don't fail the order if email fails
    }

    return NextResponse.json({
      success: true,
      order,
      preferenceId: mpPreference.id,
      initPoint: mpPreference.init_point
    } as CreateOrderResponse)

  } catch (error) {
    console.error('Checkout preference creation error:', error)

    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor',
      message: 'No se pudo crear la preferencia de pago. Intenta de nuevo.'
    } as CreateOrderResponse, { status: 500 })
  }
}