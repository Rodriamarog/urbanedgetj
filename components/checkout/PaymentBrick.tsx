'use client'

// REVERTED TO COMMIT 5b35266 - Working version before cash payments implementation
// Card payments were working at this commit (2025-10-16)

import { useEffect, useState } from 'react'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
import { ProcessPaymentRequest, ProcessPaymentResponse, CustomerInfo } from '@/lib/types/order'
import { CartItem } from '@/lib/types/cart'
import { toast } from '@/lib/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PaymentBrickProps {
  amount: number
  customerEmail: string

  // Order data
  items: CartItem[]
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  shippingAddress: {
    addressLine1: string
    addressLine2?: string
    colonia: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  subtotal: number
  tax: number
  shipping: number
  discount: number
  couponCode?: string

  // Validation function
  validateShippingForm: () => boolean

  onSuccess?: (orderId: string, paymentId: string) => void
  onError?: (error: string) => void
}

export default function PaymentBrick({
  amount,
  customerEmail,
  items,
  customerInfo,
  shippingAddress,
  subtotal,
  tax,
  shipping,
  discount,
  couponCode,
  validateShippingForm,
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

  const handlePaymentSubmit = async (param: any) => {
    // STEP 1: Validate shipping form FIRST
    if (!validateShippingForm()) {
      toast({
        title: 'Información incompleta',
        description: 'Completa tu información de envío antes de pagar',
        variant: 'destructive'
      })
      return // Stop - don't process payment
    }

    setIsProcessing(true)

    // Scroll to top so user sees the loading overlay
    window.scrollTo({ top: 0, behavior: 'smooth' })

    try {
      // Debug: Log what MercadoPago sends
      console.log('MercadoPago param:', param)

      // Extract formData from the parameter (it's nested!)
      const formData = param.formData || param

      console.log('Extracted formData:', formData)

      // STEP 2: Generate external reference
      const externalReference = `URBANEDGE-${Date.now()}`

      // STEP 3: Create complete payment request with order data
      const paymentData: any = {
        // Common payment data
        paymentMethodId: formData.payment_method_id,
        payer: {
          email: customerEmail,
          // Only include identification if it exists
          ...(formData.payer?.identification && {
            identification: formData.payer.identification
          })
        },

        // Order data
        externalReference,
        items,
        customerInfo: {
          firstName: customerInfo.name.split(' ')[0] || customerInfo.name,
          lastName: customerInfo.name.split(' ').slice(1).join(' ') || '',
          email: customerInfo.email,
          phone: customerInfo.phone
        },
        shippingAddress: {
          ...shippingAddress,
          name: customerInfo.name
        },
        subtotal,
        tax,
        shipping,
        discount,
        total: amount,
        couponCode
      }

      // Add card-specific fields only for card payments
      if (formData.token) {
        paymentData.token = formData.token
        paymentData.installments = formData.installments || 1
        if (formData.issuer_id) {
          paymentData.issuerId = formData.issuer_id
        }
      }

      console.log('Processing payment with order data:', {
        externalReference,
        amount,
        items: items.length,
        paymentMethod: formData.payment_method_id,
        hasIdentification: !!formData.payer?.identification,
        identification: formData.payer?.identification
      })

      // STEP 4: Send to backend (creates order + processes payment)
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      })

      const result: ProcessPaymentResponse = await response.json()

      if (result.success && result.paymentId && result.orderId) {
        // Check if payment is pending (OXXO, cash payments)
        if (result.status === 'pending') {
          toast({
            title: 'Pago pendiente',
            description: 'Completa tu pago para confirmar tu pedido.',
          })

          // Redirect to pending page with transaction details
          const params = new URLSearchParams({
            order_id: result.orderId,
            payment_id: result.paymentId,
            payment_method: formData.payment_method_id
          })

          // Add transaction details if available
          if (result.transactionDetails || result.pointOfInteraction) {
            params.append('transaction_details', JSON.stringify({
              transactionDetails: result.transactionDetails,
              pointOfInteraction: result.pointOfInteraction
            }))
          }

          router.push(`/order/pending?${params.toString()}`)
        } else {
          // Payment approved
          toast({
            title: '¡Pago exitoso!',
            description: 'Tu pago ha sido procesado correctamente.',
          })

          if (onSuccess) {
            onSuccess(result.orderId, result.paymentId)
          }

          // Redirect to success page
          router.push(`/order/success?order_id=${result.orderId}&payment_id=${result.paymentId}`)
        }
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
      router.push(`/order/failure?error=${encodeURIComponent(errorMessage)}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleError = async (error: any) => {
    console.error('Payment Brick error:', error)
    console.error('Error details:', {
      type: error?.type,
      cause: error?.cause,
      message: error?.message
    })

    // Ignore non-critical errors (like installment fetching failures)
    if (error?.type === 'non_critical') {
      console.warn('Non-critical Payment Brick error (ignoring):', error?.message)
      return
    }

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
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="flex flex-col items-center p-8 bg-card rounded-lg shadow-2xl border border-border">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
            <p className="mt-6 text-xl font-semibold">Procesando pago...</p>
            <p className="text-sm text-muted-foreground mt-2">Por favor espera, no cierres esta ventana</p>
          </div>
        </div>
      )}

      <Payment
        initialization={{
          amount: amount,
          payer: {
            email: customerEmail,
            entityType: 'individual'
          }
        }}
        customization={{
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            maxInstallments: 1
          },
          visual: {
            style: {
              theme: 'default',
              customVariables: {
                baseColor: '#16a34a',
                // Green color for the button (matches your brand primary green)
              }
            }
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
