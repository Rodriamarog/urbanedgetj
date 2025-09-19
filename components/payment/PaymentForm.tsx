"use client"

import React, { useState, useCallback } from 'react'
import { Payment } from '@mercadopago/sdk-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Shield, Clock, CheckCircle } from 'lucide-react'
import { toast } from '@/lib/hooks/use-toast'
import { Order } from '@/lib/types/order'

interface PaymentFormProps {
  order: Order
  onPaymentSuccess: (paymentId: string) => void
  onPaymentError: (error: string) => void
  className?: string
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  order,
  onPaymentSuccess,
  onPaymentError,
  className
}) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const initialization = {
    amount: order.total,
    preferenceId: order.preferenceId
  }

  const customization = {
    paymentMethods: {
      ticket: 'all' as const,
      creditCard: 'all' as const,
      debitCard: 'all' as const,
      mercadoPago: 'all' as const
    }
  }

  const onSubmit = useCallback(async ({ selectedPaymentMethod, formData }: any) => {
    setIsProcessing(true)

    try {
      // Payment processing will be handled by MercadoPago
      // The actual payment submission happens within the Payment component
      console.log('Payment method:', selectedPaymentMethod)
      console.log('Form data:', formData)

    } catch (error) {
      console.error('Payment error:', error)
      onPaymentError('Error al procesar el pago')
      toast({
        title: "Error de pago",
        description: "No se pudo procesar el pago. Intenta de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }, [onPaymentError])

  const onError = useCallback((error: any) => {
    console.error('Payment error:', error)
    setIsProcessing(false)

    let errorMessage = 'Error al procesar el pago'

    if (error?.message) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    onPaymentError(errorMessage)
    toast({
      title: "Error de pago",
      description: errorMessage,
      variant: "destructive"
    })
  }, [onPaymentError])

  const onReady = useCallback(() => {
    console.log('Payment form is ready')
  }, [])

  return (
    <div className={className}>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Método de Pago
          </h2>
          <Badge variant="secondary" className="text-xs">
            Seguro SSL
          </Badge>
        </div>

        {/* Payment Methods Info */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            <span>Tarjetas de crédito y débito</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            <span>Transferencia bancaria (SPEI)</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            <span>Pago en efectivo (OXXO)</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            <span>Mercado Pago</span>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Order Summary */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${order.subtotal.toLocaleString()} MXN</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Descuento ({order.couponCode})</span>
              <span>-${order.discount.toLocaleString()} MXN</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Envío</span>
            <span>
              {order.shipping === 0 ? (
                <span className="text-green-600 font-medium">Gratis</span>
              ) : (
                `$${order.shipping.toLocaleString()} MXN`
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>IVA (16%)</span>
            <span>${order.tax.toLocaleString()} MXN</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${order.total.toLocaleString()} MXN</span>
          </div>
        </div>

        {/* Payment Component */}
        <div className="payment-form-container">
          {order.preferenceId ? (
            <Payment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                Preparando método de pago...
              </div>
              <Button disabled>
                Cargando...
              </Button>
            </div>
          )}
        </div>

        {/* Security Info */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-center text-xs text-muted-foreground">
            <Shield className="w-4 h-4 mr-2" />
            <span>Tu información está protegida con cifrado SSL de 256 bits</span>
          </div>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Procesando pago...</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}