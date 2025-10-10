import { supabaseAdmin } from './client'
import { Order } from '@/lib/types/order'

export interface DatabaseOrder {
  id: string
  order_number: string
  external_reference: string
  mercadopago_preference_id: string | null
  mercadopago_payment_id: string | null

  customer_email: string
  customer_phone: string

  shipping_name: string
  shipping_address_line1: string
  shipping_address_line2: string | null
  shipping_colonia: string
  shipping_city: string
  shipping_state: string
  shipping_postal_code: string
  shipping_country: string

  subtotal: number
  shipping_cost: number
  tax: number
  discount: number
  total: number
  currency: string

  coupon_code: string | null

  status: string
  payment_status: string

  tracking_number: string | null
  tracking_url: string | null
  carrier: string | null

  created_at: string
  updated_at: string
  paid_at: string | null
  shipped_at: string | null
  delivered_at: string | null
}

export interface DatabaseOrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_slug: string
  size: string
  size_display: string
  gender: string
  quantity: number
  unit_price: number
  total_price: number
  product_snapshot: any
  created_at: string
}

/**
 * Save a new order to the database
 */
export async function createOrder(order: Order) {
  try {
    // 1. Insert order
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: order.id,
        external_reference: order.externalReference,
        mercadopago_preference_id: order.preferenceId,

        customer_email: order.customerInfo.email,
        customer_phone: order.customerInfo.phone,

        shipping_name: order.shippingAddress.name,
        shipping_address_line1: order.shippingAddress.addressLine1,
        shipping_address_line2: order.shippingAddress.addressLine2,
        shipping_colonia: order.shippingAddress.colonia,
        shipping_city: order.shippingAddress.city,
        shipping_state: order.shippingAddress.state,
        shipping_postal_code: order.shippingAddress.postalCode,
        shipping_country: order.shippingAddress.country || 'México',

        subtotal: order.subtotal,
        shipping_cost: order.shipping,
        tax: order.tax,
        discount: order.discount,
        total: order.total,
        currency: order.currency,

        coupon_code: order.couponCode,

        status: order.status,
        payment_status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      throw orderError
    }

    // 2. Insert order items
    const orderItems = order.items.map(item => {
      // Parse size info (e.g., "m-female" -> size: "M", gender: "female")
      const sizeInfo = item.size.toLowerCase()
      const genderMatch = sizeInfo.match(/(male|female)/)
      const gender = genderMatch ? genderMatch[1] : 'female'
      const sizeOnly = sizeInfo.split('-')[0].toUpperCase()

      return {
        order_id: orderData.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_slug: item.product.slug,
        size: item.size,
        size_display: sizeOnly,
        gender: gender,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        product_snapshot: item.product
      }
    })

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      throw itemsError
    }

    console.log('✅ Order saved to database:', orderData.order_number)
    return { success: true, orderId: orderData.id }

  } catch (error) {
    console.error('Database error creating order:', error)
    return { success: false, error }
  }
}

/**
 * Update order payment status
 */
export async function updateOrderPaymentStatus(
  externalReference: string,
  paymentId: string,
  paymentStatus: string,
  orderStatus: string
) {
  try {
    const updateData: any = {
      mercadopago_payment_id: paymentId,
      payment_status: paymentStatus,
      status: orderStatus,
      updated_at: new Date().toISOString()
    }

    // Set paid_at timestamp when payment is approved
    if (paymentStatus === 'approved') {
      updateData.paid_at = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('external_reference', externalReference)
      .select()
      .single()

    if (error) {
      console.error('Error updating payment status:', error)
      throw error
    }

    console.log('✅ Payment status updated:', data.order_number, paymentStatus)
    return { success: true, order: data }

  } catch (error) {
    console.error('Database error updating payment:', error)
    return { success: false, error }
  }
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('order_number', orderNumber)
      .single()

    if (error) throw error
    return { success: true, order: data }

  } catch (error) {
    console.error('Error fetching order:', error)
    return { success: false, error }
  }
}

/**
 * Get order by external reference (for webhook lookups)
 */
export async function getOrderByExternalReference(externalReference: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('external_reference', externalReference)
      .single()

    if (error) throw error
    return { success: true, order: data }

  } catch (error) {
    console.error('Error fetching order by external reference:', error)
    return { success: false, error }
  }
}

/**
 * Update tracking information
 */
export async function updateOrderTracking(
  orderNumber: string,
  trackingNumber: string,
  trackingUrl?: string,
  carrier?: string
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({
        tracking_number: trackingNumber,
        tracking_url: trackingUrl,
        carrier: carrier,
        status: 'shipped',
        shipped_at: new Date().toISOString()
      })
      .eq('order_number', orderNumber)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Tracking info updated:', orderNumber)
    return { success: true, order: data }

  } catch (error) {
    console.error('Error updating tracking:', error)
    return { success: false, error }
  }
}

/**
 * Delete an order (used for failed payments)
 */
export async function deleteOrder(externalReference: string) {
  try {
    // First get the order ID
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('id')
      .eq('external_reference', externalReference)
      .single()

    if (fetchError || !order) {
      console.log('Order not found for deletion:', externalReference)
      return { success: true } // Not an error if order doesn't exist
    }

    // Delete order items first (foreign key constraint)
    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .delete()
      .eq('order_id', order.id)

    if (itemsError) {
      console.error('Error deleting order items:', itemsError)
      throw itemsError
    }

    // Delete the order
    const { error: orderError } = await supabaseAdmin
      .from('orders')
      .delete()
      .eq('id', order.id)

    if (orderError) {
      console.error('Error deleting order:', orderError)
      throw orderError
    }

    console.log('✅ Deleted failed order:', externalReference)
    return { success: true }

  } catch (error) {
    console.error('Database error deleting order:', error)
    return { success: false, error }
  }
}
