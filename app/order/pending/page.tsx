"use client"

import React, { useState, useEffect } from "react"
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
  MapPin,
  Download,
  Copy,
  Check
} from "lucide-react"

export default function OrderPendingPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentMethod = searchParams.get('payment_method')
  const transactionDetailsParam = searchParams.get('transaction_details')

  const [copied, setCopied] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    if (transactionDetailsParam) {
      try {
        const parsed = JSON.parse(transactionDetailsParam)
        setPaymentData(parsed)
        console.log('Payment data:', parsed)
      } catch (e) {
        console.error('Failed to parse transaction details:', e)
      }
    }
  }, [transactionDetailsParam])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Extract OXXO reference from payment data
  const getOxxoReference = () => {
    if (!paymentData) return null

    // MercadoPago structure for OXXO payments:
    // - transactionDetails.payment_method_reference_id = OXXO reference code (e.g., "6007066328")
    // - transactionDetails.external_resource_url = ticket URL
    // - transactionDetails.barcode.content = barcode content
    const referenceCode = paymentData.transactionDetails?.payment_method_reference_id
    const ticketUrl = paymentData.transactionDetails?.external_resource_url
    const barcodeContent = paymentData.transactionDetails?.barcode?.content

    return { referenceCode, ticketUrl, barcodeContent }
  }

  const oxxoData = getOxxoReference()

  // Get payment method display name
  const getPaymentMethodName = () => {
    const methodMap: Record<string, string> = {
      'oxxo': 'OXXO',
      '7eleven': '7-Eleven',
      'santander': 'Santander',
      'farmaciasyza': 'Farmacias Yza',
      'circlek': 'Circle K',
      'extra': 'Extra',
      'kiosko': 'Kiosko',
      'soriana': 'Soriana',
      'calimax': 'Calimax'
    }
    return methodMap[paymentMethod || ''] || 'efectivo'
  }

  const getPaymentMethodInfo = () => {
    const methodName = getPaymentMethodName()

    switch (paymentMethod) {
      case 'oxxo':
      case '7eleven':
      case 'santander':
      case 'farmaciasyza':
      case 'circlek':
      case 'extra':
      case 'kiosko':
      case 'soriana':
      case 'calimax':
      case 'ticket':
        return {
          title: `Pago en ${methodName}`,
          description: `Tu pedido está reservado. Completa el pago en ${methodName}.`,
          instructions: [
            `Acude a cualquier tienda ${methodName}`,
            'Indica al cajero que vas a realizar un pago de servicio',
            'Proporciona el código de referencia o muestra el código de barras',
            'Realiza el pago en efectivo',
            'Conserva tu comprobante de pago',
            'Recibirás un email de confirmación cuando se procese tu pago'
          ],
          timeLimit: paymentMethod === 'oxxo' ? '48 horas' : '1 hora'
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
      default:
        return {
          title: 'Pago en efectivo',
          description: 'Tu pedido está reservado. Completa el pago en efectivo en el punto autorizado.',
          instructions: [
            'Acude al punto de pago que seleccionaste',
            'Indica al cajero que vas a realizar un pago de servicio',
            'Proporciona el código de referencia o muestra el código de barras',
            'Realiza el pago en efectivo',
            'Conserva tu comprobante de pago',
            'Recibirás un email de confirmación cuando se procese tu pago'
          ],
          timeLimit: '48 horas'
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

          {oxxoData && oxxoData.referenceCode && (
            <div className="mt-6 space-y-4">
              {/* Reference Code */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Código de referencia</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-2xl font-bold font-mono tracking-wider">
                      {oxxoData.referenceCode}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(oxxoData.referenceCode)}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Proporciona este código al cajero
                  </p>
                </div>
              </div>

              {/* Download Ticket Button */}
              {oxxoData.ticketUrl && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(oxxoData.ticketUrl, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar ficha de pago
                  </Button>
                </div>
              )}
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
              <Link href="/products">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Seguir comprando
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/">
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