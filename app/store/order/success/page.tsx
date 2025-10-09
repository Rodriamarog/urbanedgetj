"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Package,
  CreditCard,
  Truck,
  Mail,
  ArrowLeft,
  Home,
  ShoppingBag,
  Calendar,
  MapPin
} from "lucide-react"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentId = searchParams.get('payment_id')
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    // TODO: In a real app, fetch order details from API
    // For now, simulate order data
    if (orderId) {
      const mockOrderData = {
        id: orderId,
        status: 'approved',
        total: 2500,
        currency: 'MXN',
        items: [
          {
            name: 'Chaqueta F1 Ferrari Premium',
            size: 'L',
            quantity: 1,
            price: 2150
          }
        ],
        customerInfo: {
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@example.com'
        },
        shippingAddress: {
          name: 'Juan Pérez',
          addressLine1: 'Av. Revolución 123',
          colonia: 'Centro',
          city: 'Tijuana',
          state: 'BC',
          postalCode: '22000'
        },
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        createdAt: new Date()
      }
      setOrderData(mockOrderData)
    }
  }, [orderId])

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Orden no encontrada
          </h1>
          <p className="text-muted-foreground mb-8">
            No se pudo encontrar la información de tu pedido.
          </p>
          <Button asChild>
            <Link href="/store">
              <Home className="w-5 h-5 mr-2" />
              Volver a la tienda
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡Pago exitoso!
          </h1>
          <p className="text-muted-foreground">
            Tu pedido ha sido confirmado y está siendo procesado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Detalles del Pedido
                </h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Confirmado
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Número de pedido:</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                {paymentId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ID de pago:</span>
                    <span className="font-medium">{paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="font-medium">
                    {orderData?.createdAt ? new Date(orderData.createdAt).toLocaleDateString('es-MX') : 'Hoy'}
                  </span>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Items */}
              {orderData?.items && (
                <div className="space-y-4">
                  <h3 className="font-medium">Productos</h3>
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Talla: {item.size.toUpperCase()} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toLocaleString()} MXN
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Shipping Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Información de Envío
              </h2>

              {orderData?.shippingAddress && (
                <div className="space-y-2">
                  <p className="font-medium">{orderData.shippingAddress.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.addressLine1}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.colonia}, {orderData.shippingAddress.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.state}, {orderData.shippingAddress.postalCode}
                  </p>
                </div>
              )}

              {orderData?.estimatedDelivery && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Entrega estimada:</span>
                    <span className="ml-2 font-medium">
                      {new Date(orderData.estimatedDelivery).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Status & Actions */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Estado del Pedido
              </h2>

              {/* Status Timeline */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Pago confirmado</p>
                    <p className="text-xs text-muted-foreground">Hace unos momentos</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Preparando envío</p>
                    <p className="text-xs text-muted-foreground">3-5 días hábiles</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">En tránsito</p>
                    <p className="text-xs text-muted-foreground">5-10 días hábiles</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Entregado</p>
                    <p className="text-xs text-muted-foreground">10-15 días hábiles</p>
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Total */}
              {orderData && (
                <div className="mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total pagado</span>
                    <span>${orderData.total?.toLocaleString()} MXN</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/store/products">
                    <ShoppingBag className="w-4 h-4 mr-2" />
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

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>Te enviaremos un email de confirmación</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Si tienes preguntas, contáctanos en soporte@urbanedgetj.com
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}