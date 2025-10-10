"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  XCircle,
  CreditCard,
  ArrowLeft,
  Home,
  ShoppingCart,
  RefreshCw,
  HelpCircle
} from "lucide-react"

export default function OrderFailurePage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const errorCode = searchParams.get('error_code')
  const errorParam = searchParams.get('error')
  const errorMessage = searchParams.get('error_message')

  const getErrorMessage = () => {
    if (errorParam) return decodeURIComponent(errorParam)
    if (errorMessage) return decodeURIComponent(errorMessage)

    switch (errorCode) {
      case 'cc_rejected_insufficient_amount':
        return 'Fondos insuficientes en tu tarjeta'
      case 'cc_rejected_bad_filled_security_code':
        return 'Código de seguridad incorrecto'
      case 'cc_rejected_bad_filled_date':
        return 'Fecha de vencimiento incorrecta'
      case 'cc_rejected_bad_filled_other':
        return 'Revisa los datos de tu tarjeta'
      case 'cc_rejected_high_risk':
        return 'Transacción rechazada por seguridad'
      case 'cc_rejected_duplicated_payment':
        return 'Pago duplicado detectado'
      case 'cc_rejected_card_disabled':
        return 'Tarjeta deshabilitada'
      case 'cc_rejected_call_for_authorize':
        return 'Contacta a tu banco para autorizar el pago'
      default:
        return 'Tu pago no pudo ser procesado. Intenta de nuevo con otro método de pago.'
    }
  }

  const getErrorSolution = () => {
    switch (errorCode) {
      case 'cc_rejected_insufficient_amount':
        return 'Verifica el saldo de tu tarjeta o usa otro método de pago'
      case 'cc_rejected_bad_filled_security_code':
      case 'cc_rejected_bad_filled_date':
      case 'cc_rejected_bad_filled_other':
        return 'Revisa que todos los datos de tu tarjeta estén correctos'
      case 'cc_rejected_high_risk':
        return 'Intenta con otra tarjeta o contacta a tu banco'
      case 'cc_rejected_duplicated_payment':
        return 'Espera unos minutos antes de intentar nuevamente'
      case 'cc_rejected_card_disabled':
        return 'Contacta a tu banco o usa otra tarjeta'
      case 'cc_rejected_call_for_authorize':
        return 'Llama a tu banco para autorizar la transacción'
      default:
        return 'Puedes intentar nuevamente o usar otro método de pago como OXXO o transferencia bancaria'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pago no procesado
          </h1>
          <p className="text-muted-foreground">
            Hubo un problema al procesar tu pago
          </p>
        </div>

        {/* Error Details */}
        <Card className="p-6 mb-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-5 h-5 mr-2 text-red-600" />
            <h2 className="text-lg font-semibold">Detalles del error</h2>
          </div>

          <div className="space-y-4">
            {orderId && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Número de pedido:</span>
                <span className="font-medium">{orderId}</span>
              </div>
            )}

            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-red-800 font-medium mb-2">
                {getErrorMessage()}
              </p>
              <p className="text-red-700 text-sm">
                {getErrorSolution()}
              </p>
            </div>
          </div>
        </Card>

        {/* Possible Solutions */}
        <Card className="p-6 mb-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold">¿Qué puedes hacer?</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Verificar los datos de tu tarjeta</p>
                <p className="text-sm text-muted-foreground">
                  Asegúrate de que el número, fecha de vencimiento y código de seguridad sean correctos
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Usar otro método de pago</p>
                <p className="text-sm text-muted-foreground">
                  Intenta con otra tarjeta, OXXO, transferencia bancaria o Mercado Pago
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Contactar a tu banco</p>
                <p className="text-sm text-muted-foreground">
                  Tu banco puede estar bloqueando la transacción por seguridad
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Intentar más tarde</p>
                <p className="text-sm text-muted-foreground">
                  A veces los problemas se resuelven esperando unos minutos
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button className="w-full" asChild>
            <Link href="/store/checkout">
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Link>
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/store/cart">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al carrito
            </Link>
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/store/products">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Seguir comprando
            </Link>
          </Button>

          <Button variant="ghost" className="w-full" asChild>
            <Link href="/store">
              <Home className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        {/* Contact Support */}
        <div className="mt-8 p-4 bg-muted rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ¿Necesitas ayuda?
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