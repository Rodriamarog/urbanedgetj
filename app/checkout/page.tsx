"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
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
  Mail,
  Package,
  Shield,
  Truck
} from "lucide-react"

import { useCart } from "@/lib/context/CartContext"
import { MEXICAN_STATES } from "@/lib/types/cart"
import { toast } from "@/lib/hooks/use-toast"

// Dynamically import PaymentBrick to avoid SSR issues
const PaymentBrick = dynamic(
  () => import('@/components/checkout/PaymentBrick'),
  { ssr: false }
)

export default function CheckoutPage() {
  const { state } = useCart()

  // Form state
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    colonia: "",
    city: "",
    state: "",
    postalCode: "",
    country: "México"
  })

  // DEV ONLY: Autofill test data
  const autofillTestData = () => {
    setContactInfo({
      name: "Juan Pérez García",
      email: "test@urbanedge.com",
      phone: "+52 664 123 4567"
    })
    setShippingAddress({
      addressLine1: "Av. Revolución 1234",
      addressLine2: "Depto 5B",
      colonia: "Zona Centro",
      city: "Tijuana",
      state: "BCN",
      postalCode: "22000",
      country: "México"
    })
  }


  const validateForm = (): boolean => {
    // Validate cart
    if (state.items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Tu carrito está vacío. Agrega productos antes de proceder.",
        variant: "destructive"
      })
      return false
    }

    // Validate contact info
    if (!contactInfo.name.trim() || !contactInfo.email.trim() || !contactInfo.phone.trim()) {
      toast({
        title: "Información incompleta",
        description: "Completa toda la información de contacto.",
        variant: "destructive"
      })
      return false
    }

    // Validate shipping address
    if (!shippingAddress.addressLine1.trim() ||
        !shippingAddress.colonia.trim() || !shippingAddress.city.trim() ||
        !shippingAddress.state.trim() || !shippingAddress.postalCode.trim()) {
      toast({
        title: "Dirección incompleta",
        description: "Completa toda la información de envío.",
        variant: "destructive"
      })
      return false
    }

    return true
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
              <Link href="/products">
                <Package className="w-5 h-5 mr-2" />
                Explorar Productos
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/cart">
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
        <div className="flex gap-2">
          {/* DEV ONLY: Autofill button */}
          <Button
            variant="secondary"
            onClick={autofillTestData}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            🧪 Test Autofill
          </Button>
          <Button variant="outline" asChild>
            <Link href="/cart">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Carrito
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Forms */}
        <div className="lg:col-span-2 space-y-4">
          {/* Contact Information */}
          <Card className="p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Información de Contacto
                </h2>

                <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="contactName">Nombre completo *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  type="text"
                  autoComplete="name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
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

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono *</Label>
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
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Dirección de Envío
            </h2>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="shippingAddressLine1">Dirección *</Label>
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

              <div className="space-y-1.5">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="shippingColonia">Colonia *</Label>
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

                <div className="space-y-1.5">
                  <Label htmlFor="shippingCity">Ciudad *</Label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="shippingState">Estado *</Label>
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

                <div className="space-y-1.5">
                  <Label htmlFor="shippingPostalCode">Código Postal *</Label>
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

              <div className="space-y-1.5">
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
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Resumen del Pedido
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]?.url}
                      alt={item.product.images[0]?.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs font-medium px-1 rounded-tl">
                      {item.quantity}
                    </div>
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

            <Separator className="mb-4" />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${state.subtotal.toLocaleString()} MXN</span>
              </div>

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

              {state.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Descuento ({state.couponCode})</span>
                  <span>-${state.discount.toLocaleString()} MXN</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${state.total.toLocaleString()} MXN</span>
              </div>
            </div>

            {/* DEV ONLY: Test Card Info */}
            <div className="mb-4 p-3 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
              <p className="text-xs font-bold text-yellow-900 mb-2">🧪 TEST CARD (Copy & Paste):</p>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-yellow-800">Card:</span>
                  <button
                    onClick={() => navigator.clipboard.writeText('5031755734530604')}
                    className="text-yellow-900 hover:text-yellow-600 underline"
                  >
                    5031 7557 3453 0604 📋
                  </button>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">Expiry:</span>
                  <button
                    onClick={() => navigator.clipboard.writeText('11/25')}
                    className="text-yellow-900 hover:text-yellow-600 underline"
                  >
                    11/25 📋
                  </button>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">CVV:</span>
                  <button
                    onClick={() => navigator.clipboard.writeText('123')}
                    className="text-yellow-900 hover:text-yellow-600 underline"
                  >
                    123 📋
                  </button>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">Name:</span>
                  <button
                    onClick={() => navigator.clipboard.writeText('APRO')}
                    className="text-yellow-900 hover:text-yellow-600 underline"
                  >
                    APRO 📋
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Brick - Always visible */}
            <div id="payment-section">
              <PaymentBrick
                amount={state.total}
                customerEmail={contactInfo.email || ""}
                items={state.items}
                customerInfo={contactInfo}
                shippingAddress={shippingAddress}
                subtotal={state.subtotal}
                tax={state.tax}
                shipping={state.shipping}
                discount={state.discount}
                couponCode={state.couponCode}
                validateShippingForm={validateForm}
              />
            </div>

            {/* Security Info */}
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Pago 100% seguro con MercadoPago</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                <span>Entrega en 10-15 días hábiles</span>
              </div>
              <div className="mt-3 p-2 bg-muted rounded text-center">
                <span>Múltiples métodos de pago: tarjeta, efectivo (OXXO), transferencia</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}