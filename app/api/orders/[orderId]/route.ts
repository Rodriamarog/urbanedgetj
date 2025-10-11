import { NextRequest, NextResponse } from 'next/server'
import { getOrderByNumber } from '@/lib/supabase/orders'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const result = await getOrderByNumber(orderId)

    if (!result.success || !result.order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Transform database format to frontend format
    const dbOrder = result.order as any
    const order = {
      id: dbOrder.order_number,
      externalReference: dbOrder.external_reference,
      status: dbOrder.status,
      paymentStatus: dbOrder.payment_status,
      paymentId: dbOrder.mercadopago_payment_id,
      total: dbOrder.total,
      subtotal: dbOrder.subtotal,
      tax: dbOrder.tax,
      shipping: dbOrder.shipping_cost,
      discount: dbOrder.discount,
      currency: dbOrder.currency,
      couponCode: dbOrder.coupon_code,
      customerInfo: {
        email: dbOrder.customer_email,
        phone: dbOrder.customer_phone
      },
      shippingAddress: {
        name: dbOrder.shipping_name,
        addressLine1: dbOrder.shipping_address_line1,
        addressLine2: dbOrder.shipping_address_line2,
        colonia: dbOrder.shipping_colonia,
        city: dbOrder.shipping_city,
        state: dbOrder.shipping_state,
        postalCode: dbOrder.shipping_postal_code,
        country: dbOrder.shipping_country
      },
      items: dbOrder.order_items?.map((item: any) => ({
        product: {
          id: item.product_id,
          name: item.product_name,
          slug: item.product_slug,
          ...item.product_snapshot
        },
        size: item.size,
        quantity: item.quantity,
        price: item.unit_price
      })) || [],
      createdAt: dbOrder.created_at,
      updatedAt: dbOrder.updated_at,
      paidAt: dbOrder.paid_at
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}
