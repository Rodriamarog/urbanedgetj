"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  CreditCard,
  Home,
  ShoppingCart,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  MapPin
} from "lucide-react"

export default function OrderPendingPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentMethod = searchParams.get('payment_method')

  const getPaymentMethodInfo = () => {
    switch (paymentMethod) {
      case 'ticket':
        return {
          title: 'Pago en OXXO',
          description: 'Tu pedido está reservado. Tienes 3 días para completar el pago en cualquier tienda OXXO.',
          instructions: [
            'Ve a cualquier tienda OXXO',
            'Proporciona el código de barras al cajero',
            'Paga el monto exacto',
            'Guarda tu comprobante'
          ],
          timeLimit: '3 días'
        }
      case 'bank_transfer':
        return {
          title: 'Transferencia bancaria',
          description: 'Tu pedido está reservado. Realiza la transferencia bancaria para completar tu compra.',
          instructions: [
            'Ingresa a tu banca en línea',
            'Realiza la transferencia SPEI',
            'Usa la referencia proporcionada',
            'El pago se reflejará en 1-2 horas hábiles'
          ],
          timeLimit: '24 horas'
        }
      case 'rapipago':
        return {
          title: 'Pago en efectivo',
          description: 'Tu pedido está reservado. Completa el pago en efectivo en los puntos autorizados.',
          instructions: [
            'Ve al punto de pago seleccionado',
            'Proporciona el código de referencia',
            'Paga el monto exacto',
            'Conserva tu comprobante'
          ],
          timeLimit: '2 días'
        }
      default:
        return {
          title: 'Pago pendiente',
          description: 'Tu pago está siendo procesado. Te notificaremos cuando esté confirmado.',
          instructions: [
            'El pago puede tardar algunos minutos en procesarse',
            'Revisa tu email para actualizaciones',
            'No realices otro pago por el mismo pedido'
          ],
          timeLimit: '1 hora'
        }
    }
  }

  const paymentInfo = getPaymentMethodInfo()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pago pendiente
          </h1>
          <p className="text-muted-foreground">
            Tu pedido está reservado y esperando el pago
          </p>
        </div>

        {/* Order Status */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-yellow-600" />
              <h2 className="text-lg font-semibold">{paymentInfo.title}</h2>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Pendiente
            </Badge>
          </div>

          {orderId && (
            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted-foreground">Número de pedido:</span>
              <span className="font-medium">{orderId}</span>
            </div>
          )}

          <div className="p-4 bg-yellow-50 rounded-lg mb-4">
            <p className="text-yellow-800">
              {paymentInfo.description}
            </p>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>Tiempo límite para completar el pago: {paymentInfo.timeLimit}</span>
          </div>
        </Card>

        {/* Payment Instructions */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Instrucciones de pago
          </h3>

          <div className="space-y-3">
            {paymentInfo.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm">{instruction}</p>
              </div>
            ))}
          </div>

          {paymentMethod === 'ticket' && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="mb-2">
                  <div className="inline-block bg-white p-4 rounded border-2 border-dashed">
                    <p className="text-xs text-muted-foreground mb-1">Código de barras</p>
                    <div className="w-48 h-8 bg-black bg-opacity-10 rounded flex items-center justify-center">
                      <span className="text-xs font-mono">||||| |||| ||||| ||||</span>
                    </div>
                    <p className="text-xs font-mono mt-1">4567 8901 2345 6789</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Muestra este código al cajero en OXXO
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Status Timeline */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Estado del pedido
          </h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">Pedido creado</p>
                <p className="text-xs text-muted-foreground">Hace unos momentos</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">Esperando pago</p>
                <p className="text-xs text-muted-foreground">Tiempo límite: {paymentInfo.timeLimit}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preparando envío</p>
                <p className="text-xs text-muted-foreground">Después del pago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enviado</p>
                <p className="text-xs text-muted-foreground">10-15 días hábiles</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button className="w-full" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Verificar estado del pago
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/store/products">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Seguir comprando
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/store">
                <Home className="w-4 h-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Importante</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Tu pedido está reservado durante el tiempo límite</li>
                <li>• Te enviaremos un email cuando confirmemos tu pago</li>
                <li>• Si no pagas a tiempo, el pedido se cancelará automáticamente</li>
                <li>• Conserva tu comprobante de pago</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ¿Tienes problemas con tu pago?
          </p>
          <p className="text-sm">
            Contáctanos en{" "}
            <a
              href="mailto:soporte@urbanedgetj.com"
              className="text-primary hover:underline"
            >
              soporte@urbanedgetj.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}