import React from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Términos y Condiciones
        </h1>
        <p className="text-lg text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar el sitio web de Urban Edge TJ, usted acepta estar legalmente
              obligado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte
              de estos términos, no debe utilizar nuestros servicios.
            </p>
          </section>

          <Separator />

          {/* Use of Website */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Uso del Sitio Web
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Usted se compromete a utilizar nuestro sitio web únicamente para fines legales y de manera
                que no infrinja los derechos de terceros o restrinja o inhiba el uso y disfrute del sitio
                por parte de cualquier tercero.
              </p>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Está prohibido:
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Utilizar el sitio para cualquier actividad ilegal</li>
                <li>Intentar acceder a áreas restringidas del sitio</li>
                <li>Interferir con la seguridad del sitio</li>
                <li>Transmitir virus o código malicioso</li>
                <li>Copiar o reproducir contenido sin autorización</li>
              </ul>
            </div>
          </section>

          <Separator />

          {/* Products and Orders */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Productos y Pedidos
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Disponibilidad de Productos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho
                  de discontinuar cualquier producto en cualquier momento.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Precios
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Los precios están expresados en pesos mexicanos (MXN) e incluyen impuestos aplicables.
                  Nos reservamos el derecho de modificar los precios sin previo aviso.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Confirmación de Pedidos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Al realizar un pedido, recibirá un correo electrónico de confirmación.
                  Nos reservamos el derecho de rechazar o cancelar pedidos por cualquier motivo.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Payment and Shipping */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Pago y Envío
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Métodos de Pago
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Aceptamos tarjetas de crédito, débito y otros métodos de pago especificados
                  en el momento de la compra. El pago debe completarse antes del envío.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Tiempos de Envío
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Los envíos dentro de México tardan entre 14-21 días hábiles. Los tiempos
                  pueden variar según la ubicación y disponibilidad del producto.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Returns and Exchanges */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Devoluciones y Cambios
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Aceptamos devoluciones dentro de los 30 días siguientes a la recepción del producto,
              siempre que:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>El producto esté en condiciones originales</li>
              <li>Incluya todas las etiquetas originales</li>
              <li>No haya sido usado o lavado</li>
              <li>Se incluya el recibo de compra</li>
            </ul>
          </section>

          <Separator />

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Propiedad Intelectual
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes
              y software, es propiedad de Urban Edge TJ y está protegido por las leyes de
              derechos de autor y propiedad intelectual.
            </p>
          </section>

          <Separator />

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Limitación de Responsabilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Urban Edge TJ no será responsable de daños indirectos, incidentales o
              consecuentes que resulten del uso o la imposibilidad de usar nuestros
              productos o servicios.
            </p>
          </section>

          <Separator />

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Modificaciones a los Términos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento.
              Las modificaciones entrarán en vigor inmediatamente después de su publicación
              en el sitio web.
            </p>
          </section>

          <Separator />

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre estos Términos y Condiciones, contáctenos:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> urbanedgetj@gmail.com<br />
                <strong>Ubicación:</strong> Tijuana, Baja California, México
              </p>
            </div>
          </section>
        </div>
      </Card>
    </div>
  )
}