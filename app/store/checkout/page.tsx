"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Package,
  Shield,
  Truck
} from "lucide-react"

import { useCart } from "@/lib/context/CartContext"
import { MEXICAN_STATES } from "@/lib/types/cart"
import { toast } from "@/lib/hooks/use-toast"
import { CreateOrderRequest, CreateOrderResponse, Order } from "@/lib/types/order"
import { PaymentForm } from "@/components/payment/PaymentForm"

export default function CheckoutPage() {
  const { state } = useCart()
  const [useSameAddress, setUseSameAddress] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  // Form state
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: ""
  })

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    colonia: "",
    city: "",
    state: "",
    postalCode: "",
    country: "México"
  })

  const [billingAddress, setBillingAddress] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    colonia: "",
    city: "",
    state: "",
    postalCode: "",
    country: "México"
  })

  const validateForm = (): boolean => {
    // Validate contact info
    if (!contactInfo.firstName.trim() || !contactInfo.lastName.trim() ||
        !contactInfo.email.trim() || !contactInfo.phone.trim()) {
      toast({
        title: "Información incompleta",
        description: "Completa toda la información de contacto.",
        variant: "destructive"
      })
      return false
    }

    // Validate shipping address
    if (!shippingAddress.name.trim() || !shippingAddress.addressLine1.trim() ||
        !shippingAddress.colonia.trim() || !shippingAddress.city.trim() ||
        !shippingAddress.state.trim() || !shippingAddress.postalCode.trim()) {
      toast({
        title: "Dirección incompleta",
        description: "Completa toda la información de envío.",
        variant: "destructive"
      })
      return false
    }

    // Validate billing address if different
    if (!useSameAddress && billingAddress.name.trim() === '') {
      toast({
        title: "Dirección de facturación incompleta",
        description: "Completa la información de facturación o usa la misma dirección de envío.",
        variant: "destructive"
      })
      return false
    }

    return true
  }

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Tu carrito está vacío. Agrega productos antes de proceder.",
        variant: "destructive"
      })
      return
    }

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    try {
      const orderRequest: CreateOrderRequest = {
        items: state.items,
        customerInfo: contactInfo,
        shippingAddress: shippingAddress,
        billingAddress: useSameAddress ? undefined : billingAddress,
        useSameAddress: useSameAddress,
        couponCode: state.couponCode
      }

      const response = await fetch('/api/checkout/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest)
      })

      const data: CreateOrderResponse = await response.json()

      if (data.success && data.order) {
        setCurrentOrder(data.order)
        setShowPayment(true)

        toast({
          title: "Pedido creado",
          description: "Procede con el pago para completar tu compra.",
        })
      } else {
        throw new Error(data.message || 'Error al crear el pedido')
      }

    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Error de pago",
        description: "Error al procesar el pedido. Por favor intenta de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = (paymentId: string) => {
    toast({
      title: "¡Pago exitoso!",
      description: "Tu pedido ha sido procesado correctamente.",
    })

    // TODO: Redirect to success page
    console.log('Payment successful:', paymentId)
  }

  const handlePaymentError = (error: string) => {
    toast({
      title: "Error de pago",
      description: error,
      variant: "destructive"
    })
    setShowPayment(false)
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Carrito Vacío
          </h1>
          <p className="text-muted-foreground mb-8">
            Agrega algunos productos a tu carrito antes de proceder al checkout.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/store/products">
                <Package className="w-5 h-5 mr-2" />
                Explorar Productos
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/store/cart">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Ver Carrito
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <CreditCard className="w-8 h-8 mr-3" />
            Checkout
          </h1>
          <p className="text-muted-foreground mt-2">
            Completa tu pedido de forma segura
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/store/cart">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Carrito
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forms */}
        <div className="lg:col-span-2 space-y-8">
          {showPayment && currentOrder ? (
            <PaymentForm
              order={currentOrder}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          ) : (
            <>
            {/* Contact and Address Forms */}
          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Información de Contacto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  value={contactInfo.firstName}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={contactInfo.lastName}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Tus apellidos"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+52 55 1234 5678"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Dirección de Envío
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shippingName">Nombre completo</Label>
                <Input
                  id="shippingName"
                  name="shippingName"
                  autoComplete="shipping name"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre completo para la entrega"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddressLine1">Dirección</Label>
                <Input
                  id="shippingAddressLine1"
                  name="shippingAddressLine1"
                  autoComplete="shipping address-line1"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                  placeholder="Calle y número"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddressLine2">Apartamento, suite, etc. (opcional)</Label>
                <Input
                  id="shippingAddressLine2"
                  name="shippingAddressLine2"
                  autoComplete="shipping address-line2"
                  value={shippingAddress.addressLine2}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                  placeholder="Apartamento, suite, piso, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingColonia">Colonia</Label>
                  <Input
                    id="shippingColonia"
                    name="shippingColonia"
                    autoComplete="shipping address-level3"
                    value={shippingAddress.colonia}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, colonia: e.target.value }))}
                    placeholder="Colonia"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingCity">Ciudad</Label>
                  <Input
                    id="shippingCity"
                    name="shippingCity"
                    autoComplete="shipping locality"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Ciudad"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingState">Estado</Label>
                  <Select
                    value={shippingAddress.state}
                    onValueChange={(value) => setShippingAddress(prev => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEXICAN_STATES.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingPostalCode">Código Postal</Label>
                  <Input
                    id="shippingPostalCode"
                    name="shippingPostalCode"
                    autoComplete="shipping postal-code"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                    placeholder="12345"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingCountry">País</Label>
                <Input
                  id="shippingCountry"
                  name="shippingCountry"
                  autoComplete="shipping country"
                  value={shippingAddress.country}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </Card>

          {/* Billing Address */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Dirección de Facturación
              </h2>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="useSameAddress"
                checked={useSameAddress}
                onCheckedChange={(checked) => setUseSameAddress(checked === true)}
              />
              <Label htmlFor="useSameAddress" className="text-sm">
                Usar la misma dirección de envío
              </Label>
            </div>

            {!useSameAddress && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="billingName">Nombre completo</Label>
                  <Input
                    id="billingName"
                    name="billingName"
                    autoComplete="billing name"
                    value={billingAddress.name}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre completo para facturación"
                    required={!useSameAddress}
                  />
                </div>

                {/* Similar billing address fields would go here */}
                <p className="text-sm text-muted-foreground">
                  Los campos de dirección de facturación aparecerían aquí cuando se desmarca la casilla anterior.
                </p>
              </div>
            )}
          </Card>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Resumen del Pedido
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium">{item.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Talla: {item.size.toUpperCase()}</p>
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-6" />

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${state.subtotal.toLocaleString()} MXN</span>
              </div>

              {state.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Descuento ({state.couponCode})</span>
                  <span>-${state.discount.toLocaleString()} MXN</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span>
                  {state.shipping === 0 ? (
                    <span className="text-green-600 font-medium">Gratis</span>
                  ) : (
                    `$${state.shipping.toLocaleString()} MXN`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>IVA (16%)</span>
                <span>${state.tax.toLocaleString()} MXN</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${state.total.toLocaleString()} MXN</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              size="lg"
              className="w-full mb-4"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {isProcessing ? "Procesando..." : "Proceder al Pago"}
            </Button>

            {/* Security Info */}
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Pago 100% seguro con MercadoPago</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                <span>Entrega en 3-5 días hábiles</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}