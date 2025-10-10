import { NextRequest, NextResponse } from 'next/server'
import {
  CreateOrderRequest,
  CreateOrderResponse,
  Order
} from '@/lib/types/order'
import { CartItem } from '@/lib/types/cart'
import { createOrder } from '@/lib/supabase/orders'

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

    // Save order to database with 'pending' status
    // Payment will be processed via Payment Brick in the frontend
    // Emails are only sent AFTER payment is approved (via payment processing endpoint or webhook)
    console.log('Saving pending order to database:', order.id)
    await createOrder(order)

    return NextResponse.json({
      success: true,
      order
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