import { Order } from '@/lib/types/order'

export function getOrderNotificationEmail(order: Order) {
  const itemsList = order.items.map(item => {
    const sizeInfo = item.size.toUpperCase()
    const genderMatch = sizeInfo.match(/(MALE|FEMALE)/)
    const gender = genderMatch ? (genderMatch[1] === 'MALE' ? 'Hombre' : 'Mujer') : ''
    const sizeOnly = sizeInfo.split('-')[0]

    return `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
        <div style="font-weight: 600; color: #171717; margin-bottom: 4px;">${item.product.name}</div>
        <div style="color: #737373; font-size: 14px;">Talla: ${sizeOnly} • ${gender} • Cantidad: ${item.quantity}</div>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right; white-space: nowrap;">
        <div style="font-weight: 600; color: #171717;">$${(item.price * item.quantity).toLocaleString()} MXN</div>
      </td>
    </tr>
  `
  }).join('')

  return {
    subject: `Nueva Orden ${order.id}`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Orden - Urban Edge TJ</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

                  <!-- Header -->
                  <tr>
                    <td style="background-color: #171717; padding: 32px 24px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Urban Edge TJ</h1>
                      <p style="margin: 8px 0 0 0; color: #a3a3a3; font-size: 14px;">Nueva orden recibida</p>
                    </td>
                  </tr>

                  <!-- Order Info -->
                  <tr>
                    <td style="padding: 32px 24px;">
                      <h2 style="margin: 0 0 20px 0; color: #171717; font-size: 18px; font-weight: 600;">Detalles de la Orden</h2>

                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 8px 0; color: #737373; font-size: 14px;">Número de orden</td>
                          <td style="padding: 8px 0; text-align: right; color: #171717; font-weight: 600; font-size: 14px;">${order.id}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #737373; font-size: 14px;">Fecha</td>
                          <td style="padding: 8px 0; text-align: right; color: #171717; font-size: 14px;">${new Date(order.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #737373; font-size: 14px;">Estado</td>
                          <td style="padding: 8px 0; text-align: right;">
                            <span style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                              ${order.status}
                            </span>
                          </td>
                        </tr>
                      </table>

                      <!-- Customer Info -->
                      <h3 style="margin: 32px 0 16px 0; color: #171717; font-size: 16px; font-weight: 600;">Información del Cliente</h3>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 8px 0; color: #737373; font-size: 14px;">Email</td>
                          <td style="padding: 8px 0; text-align: right; color: #171717; font-size: 14px;">${order.customerInfo.email}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #737373; font-size: 14px;">Teléfono</td>
                          <td style="padding: 8px 0; text-align: right; color: #171717; font-size: 14px;">${order.customerInfo.phone}</td>
                        </tr>
                      </table>

                      <!-- Shipping Address -->
                      <h3 style="margin: 32px 0 16px 0; color: #171717; font-size: 16px; font-weight: 600;">Dirección de Envío</h3>
                      <div style="background-color: #fafafa; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
                        <p style="margin: 0; color: #171717; font-size: 14px; line-height: 1.6;">
                          <strong>${order.shippingAddress.name}</strong><br>
                          ${order.shippingAddress.addressLine1}<br>
                          ${order.shippingAddress.addressLine2 ? order.shippingAddress.addressLine2 + '<br>' : ''}
                          ${order.shippingAddress.colonia}, ${order.shippingAddress.city}<br>
                          ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
                          México
                        </p>
                      </div>

                      <!-- Products -->
                      <h3 style="margin: 32px 0 16px 0; color: #171717; font-size: 16px; font-weight: 600;">Productos</h3>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                        ${itemsList}
                      </table>

                      <!-- Order Summary -->
                      <div style="background-color: #fafafa; padding: 20px; border-radius: 6px; margin-top: 24px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 8px 0; color: #737373; font-size: 14px;">Subtotal</td>
                            <td style="padding: 8px 0; text-align: right; color: #171717; font-size: 14px;">$${order.subtotal.toLocaleString()} MXN</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #737373; font-size: 14px;">Envío</td>
                            <td style="padding: 8px 0; text-align: right; color: ${order.shipping === 0 ? '#22c55e' : '#171717'}; font-size: 14px; font-weight: ${order.shipping === 0 ? '600' : 'normal'};">
                              ${order.shipping === 0 ? 'GRATIS' : '$' + order.shipping.toLocaleString() + ' MXN'}
                            </td>
                          </tr>
                          ${order.tax > 0 ? `
                          <tr>
                            <td style="padding: 8px 0; color: #737373; font-size: 14px;">IVA (16%)</td>
                            <td style="padding: 8px 0; text-align: right; color: #171717; font-size: 14px;">$${order.tax.toLocaleString()} MXN</td>
                          </tr>
                          ` : ''}
                          ${order.discount > 0 ? `
                          <tr>
                            <td style="padding: 8px 0; color: #22c55e; font-size: 14px;">Descuento${order.couponCode ? ' (' + order.couponCode + ')' : ''}</td>
                            <td style="padding: 8px 0; text-align: right; color: #22c55e; font-size: 14px; font-weight: 600;">-$${order.discount.toLocaleString()} MXN</td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td colspan="2" style="padding: 16px 0 8px 0; border-top: 2px solid #e5e5e5;"></td>
                          </tr>
                          <tr>
                            <td style="padding: 0; color: #171717; font-size: 16px; font-weight: 700;">Total</td>
                            <td style="padding: 0; text-align: right; color: #171717; font-size: 18px; font-weight: 700;">$${order.total.toLocaleString()} MXN</td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0 0 4px 0; color: #171717; font-size: 14px; font-weight: 600;">Urban Edge TJ</p>
                      <p style="margin: 0; color: #737373; font-size: 12px;">Tijuana, Baja California • México</p>
                      <p style="margin: 12px 0 0 0; color: #a3a3a3; font-size: 12px;">Notificación automática de orden</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `
  }
}
