import React from "react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Política de Privacidad
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
              1. Introducción
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              En Urban Edge TJ, valoramos y respetamos su privacidad. Esta Política de Privacidad
              describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal
              cuando utiliza nuestro sitio web y servicios.
            </p>
          </section>

          <Separator />

          {/* Information Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Información que Recopilamos
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Información Personal
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección de envío</li>
                  <li>Información de pago (procesada de forma segura)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Información de Navegación
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador</li>
                  <li>Páginas visitadas</li>
                  <li>Tiempo de navegación</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          {/* Use of Information */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Uso de la Información
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Utilizamos su información personal para:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Procesar y cumplir sus pedidos</li>
              <li>Comunicarnos con usted sobre su pedido</li>
              <li>Brindar servicio al cliente</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Enviar promociones y ofertas especiales (con su consentimiento)</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <Separator />

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Compartir Información
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              No vendemos, alquilamos o compartimos su información personal con terceros,
              excepto en las siguientes circunstancias:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Con proveedores de servicios de confianza (envío, procesamiento de pagos)</li>
              <li>Cuando sea requerido por ley</li>
              <li>Para proteger nuestros derechos y seguridad</li>
              <li>Con su consentimiento explícito</li>
            </ul>
          </section>

          <Separator />

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Seguridad de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para
              proteger su información personal contra acceso no autorizado, alteración,
              divulgación o destrucción.
            </p>
          </section>

          <Separator />

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Sus Derechos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de su información</li>
              <li>Oponerse al procesamiento de su información</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <Separator />

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos,
              contáctenos en:
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