'use client'

import { useEffect, useState } from 'react'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
import { ProcessPaymentRequest, ProcessPaymentResponse } from '@/lib/types/order'
import { toast } from '@/lib/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PaymentBrickProps {
  orderId: string
  amount: number
  customerEmail: string
  onSuccess?: (paymentId: string) => void
  onError?: (error: string) => void
}

export default function PaymentBrick({
  orderId,
  amount,
  customerEmail,
  onSuccess,
  onError
}: PaymentBrickProps) {
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Initialize MercadoPago SDK
    const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
    if (!publicKey) {
      console.error('MercadoPago public key not found')
      return
    }

    try {
      initMercadoPago(publicKey, { locale: 'es-MX' })
      setIsInitialized(true)
    } catch (error) {
      console.error('Failed to initialize MercadoPago:', error)
      toast({
        title: 'Error de inicialización',
        description: 'No se pudo cargar el sistema de pago. Por favor recarga la página.',
        variant: 'destructive'
      })
    }
  }, [])

  const handlePaymentSubmit = async (formData: any) => {
    setIsProcessing(true)

    try {
      // Extract payment data from form
      const paymentData: ProcessPaymentRequest = {
        orderId,
        token: formData.token,
        paymentMethodId: formData.payment_method_id,
        installments: formData.installments || 1,
        issuerId: formData.issuer_id,
        payer: {
          email: customerEmail,
          identification: formData.payer?.identification
        }
      }

      console.log('Processing payment:', paymentData)

      // Send to backend for processing
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      })

      const result: ProcessPaymentResponse = await response.json()

      if (result.success && result.paymentId) {
        toast({
          title: '¡Pago exitoso!',
          description: 'Tu pago ha sido procesado correctamente.',
        })

        if (onSuccess) {
          onSuccess(result.paymentId)
        }

        // Redirect to success page
        router.push(`/store/order/success?order_id=${orderId}&payment_id=${result.paymentId}`)
      } else {
        throw new Error(result.message || 'Error al procesar el pago')
      }

    } catch (error) {
      console.error('Payment error:', error)

      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'

      toast({
        title: 'Error de pago',
        description: errorMessage,
        variant: 'destructive'
      })

      if (onError) {
        onError(errorMessage)
      }

      // Redirect to failure page
      router.push(`/store/order/failure?order_id=${orderId}&error=${encodeURIComponent(errorMessage)}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleError = async (error: any) => {
    console.error('Payment Brick error:', error)

    toast({
      title: 'Error en el formulario de pago',
      description: 'Por favor verifica tu información e intenta de nuevo.',
      variant: 'destructive'
    })

    if (onError) {
      onError(error?.message || 'Error en el formulario')
    }
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Cargando sistema de pago...</span>
      </div>
    )
  }

  return (
    <div className="payment-brick-container">
      {isProcessing && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-medium">Procesando pago...</p>
            <p className="text-sm text-muted-foreground">Por favor espera</p>
          </div>
        </div>
      )}

      <Payment
        initialization={{
          amount: amount,
          payer: {
            email: customerEmail
          }
        }}
        customization={{
          visual: {
            style: {
              theme: 'default',
              customVariables: {
                baseColor: '#16a34a' // Green button color
              }
            }
          },
          paymentMethods: {
            creditCard: 'all',
            debitCard: 'all',
            ticket: 'all',
            bankTransfer: 'all',
            mercadoPago: 'all'
          }
        }}
        onSubmit={handlePaymentSubmit}
        onError={handleError}
        onReady={() => {
          console.log('Payment Brick ready')
        }}
      />
    </div>
  )
}
