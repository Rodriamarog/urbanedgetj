import { Order } from '@/lib/types/order'

export function getOrderNotificationEmail(order: Order) {
  const itemsList = order.items.map(item => {
    // Extract gender and size info
    const sizeInfo = item.size.toUpperCase()
    const genderMatch = sizeInfo.match(/(MALE|FEMALE)/)
    const gender = genderMatch ? (genderMatch[1] === 'MALE' ? '👨 Hombre' : '👩 Mujer') : ''
    const sizeOnly = sizeInfo.split('-')[0] // Get just the size part (S, M, L, etc.)

    return `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        <strong>${item.product.name}</strong><br>
        <span style="color: #666; font-size: 13px;">
          Talla: ${sizeOnly} | ${gender}
        </span>
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">
        <strong>${item.quantity}</strong>
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">
        $${item.price.toLocaleString()} MXN
      </td>
    </tr>
  `
  }).join('')

  return {
    subject: `🛍️ Nueva Orden: ${order.id}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nueva Orden - Urban Edge TJ</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Nueva Orden Recibida</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">Urban Edge TJ</p>
          </div>

          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #667eea; margin-top: 0;">Detalles de la Orden</h2>

            <table style="width: 100%; margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px;">
              <tr>
                <td style="padding: 8px; font-weight: bold;">Número de Orden:</td>
                <td style="padding: 8px;">${order.id}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Fecha:</td>
                <td style="padding: 8px;">${new Date(order.createdAt).toLocaleString('es-MX')}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Estado:</td>
                <td style="padding: 8px;">
                  <span style="background: #fbbf24; color: #78350f; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                    ${order.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            </table>

            <h3 style="color: #667eea;">👤 Información del Cliente</h3>
            <table style="width: 100%; margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px;">
              <tr>
                <td style="padding: 8px; font-weight: bold;">Email:</td>
                <td style="padding: 8px;">${order.customerInfo.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Teléfono:</td>
                <td style="padding: 8px;">${order.customerInfo.phone}</td>
              </tr>
            </table>

            <h3 style="color: #667eea;">📦 Dirección de Envío</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0;">
                <strong>${order.shippingAddress.name}</strong><br>
                ${order.shippingAddress.addressLine1}<br>
                ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + '<br>' : ''}
                ${order.shippingAddress.colonia}, ${order.shippingAddress.city}<br>
                ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}<br>
                México
              </p>
            </div>

            <h3 style="color: #667eea;">🛒 Productos</h3>
            <table style="width: 100%; margin-bottom: 20px; background: white; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #667eea; color: white;">
                  <th style="padding: 12px; text-align: left;">Producto</th>
                  <th style="padding: 12px; text-align: center;">Cantidad</th>
                  <th style="padding: 12px; text-align: right;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>

            <h3 style="color: #667eea;">💰 Resumen del Pago</h3>
            <table style="width: 100%; background: white; padding: 15px; border-radius: 8px;">
              <tr>
                <td style="padding: 8px;">Subtotal:</td>
                <td style="padding: 8px; text-align: right;">$${order.subtotal.toLocaleString()} MXN</td>
              </tr>
              ${order.shipping > 0 ? `
                <tr>
                  <td style="padding: 8px;">Envío:</td>
                  <td style="padding: 8px; text-align: right;">$${order.shipping.toLocaleString()} MXN</td>
                </tr>
              ` : `
                <tr>
                  <td style="padding: 8px;">Envío:</td>
                  <td style="padding: 8px; text-align: right; color: #10b981; font-weight: bold;">GRATIS</td>
                </tr>
              `}
              ${order.tax > 0 ? `
                <tr>
                  <td style="padding: 8px;">IVA (16%):</td>
                  <td style="padding: 8px; text-align: right;">$${order.tax.toLocaleString()} MXN</td>
                </tr>
              ` : ''}
              ${order.discount > 0 ? `
                <tr style="color: #10b981;">
                  <td style="padding: 8px;">Descuento ${order.couponCode ? `(${order.couponCode})` : ''}:</td>
                  <td style="padding: 8px; text-align: right; font-weight: bold;">-$${order.discount.toLocaleString()} MXN</td>
                </tr>
              ` : ''}
              <tr style="border-top: 2px solid #667eea;">
                <td style="padding: 12px; font-size: 18px; font-weight: bold;">TOTAL:</td>
                <td style="padding: 12px; text-align: right; font-size: 18px; font-weight: bold; color: #667eea;">
                  $${order.total.toLocaleString()} MXN
                </td>
              </tr>
            </table>

            <div style="background: #fef3c7; border-left: 4px solid #fbbf24; padding: 15px; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0; color: #78350f;">
                <strong>⏰ Siguiente paso:</strong> Procesar el pago en MercadoPago y preparar el envío una vez confirmado.
              </p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; color: #888; font-size: 12px;">
            <p>Urban Edge TJ - Tijuana, México</p>
            <p>Este es un email automático de notificación de orden</p>
          </div>
        </body>
      </html>
    `
  }
}
