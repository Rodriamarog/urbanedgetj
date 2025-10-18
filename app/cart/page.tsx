"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  Package,
  Truck,
  Shield,
  Tag,
  CreditCard,
  ShoppingBag,
  Home
} from "lucide-react"

import { useCart } from "@/lib/context/CartContext"
import { CartItem } from "@/lib/types/cart"
import { PRODUCT_CATEGORIES } from "@/lib/types/product"

const CartItemCard: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  const itemTotal = item.price * item.quantity
  const originalItemTotal = item.originalPrice ? item.originalPrice * item.quantity : null

  return (
    <Card className="p-6">
      <div className="flex gap-4">
        {/* Product Image and Quantity Controls */}
        <div className="flex flex-col gap-3">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
            <Image
              src={item.product.images[0]?.url}
              alt={item.product.images[0]?.alt}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </Button>

            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 10}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-1">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {item.product.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Talla: {item.size.toUpperCase()}
              </p>
            </div>

            {/* Remove Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Eliminar Producto</AlertDialogTitle>
                  <AlertDialogDescription>
                    ¿Estás seguro de que quieres eliminar "{item.product.name}" de tu carrito?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => removeItem(item.id)}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <span className="text-lg font-bold">
                ${itemTotal.toLocaleString()} MXN
              </span>
              {originalItemTotal && originalItemTotal > itemTotal && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalItemTotal.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <div>${item.price.toLocaleString()} c/u</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

const CartSummary: React.FC = () => {
  const { state, applyCoupon, removeCoupon } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    const success = applyCoupon(couponCode.trim())
    if (success) {
      setCouponCode("")
      setCouponError("")
    } else {
      setCouponError("Código de cupón inválido")
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponError("")
  }

  return (
    <Card className="p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Package className="w-5 h-5 mr-2" />
        Resumen del Pedido
      </h2>

      {/* Order Summary */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Subtotal ({state.itemCount} productos)</span>
          <span>${state.subtotal.toLocaleString()} MXN</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center">
            <Truck className="w-4 h-4 mr-1" />
            Envío
          </span>
          <span>
            {state.shipping === 0 ? (
              <span className="text-green-600 font-medium">Gratis</span>
            ) : (
              `$${state.shipping.toLocaleString()} MXN`
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>IVA (16%)</span>
          <span>${state.tax.toLocaleString()} MXN</span>
        </div>

        {state.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              Descuento ({state.couponCode})
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveCoupon}
                className="ml-2 h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
              >
                Quitar
              </Button>
            </span>
            <span>-${state.discount.toLocaleString()} MXN</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${state.total.toLocaleString()} MXN</span>
        </div>
      </div>

      {/* Coupon Code */}
      {!state.couponCode && (
        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium">Código de Descuento</label>
          <div className="flex space-x-2">
            <Input
              placeholder="Código de descuento"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase())
                setCouponError("")
              }}
              className="flex-1"
            />
            <Button onClick={handleApplyCoupon} variant="outline">
              Aplicar
            </Button>
          </div>
          {couponError && (
            <p className="text-sm text-destructive">{couponError}</p>
          )}
        </div>
      )}

      {/* Checkout Button */}
      <Button
        size="lg"
        className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200"
        asChild
      >
        <Link href="/checkout">
          <CreditCard className="w-5 h-5 mr-2" />
          Proceder al Checkout
        </Link>
      </Button>

      {/* Security & Shipping Info */}
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          <span>Pago 100% seguro</span>
        </div>
        <div className="flex items-center">
          <Truck className="w-4 h-4 mr-2" />
          <span>Envío gratis en compras +$1,500</span>
        </div>
        <div className="flex items-center">
          <Package className="w-4 h-4 mr-2" />
          <span>Garantía de 30 días</span>
        </div>
      </div>
    </Card>
  )
}

const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-6">🛒</div>
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Tu carrito está vacío
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Explora nuestra colección de streetwear premium y encuentra tu estilo perfecto.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild>
          <Link href="/products">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Explorar Productos
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">
            <Home className="w-5 h-5 mr-2" />
            Ir a Inicio
          </Link>
        </Button>
      </div>

      {/* Featured Categories */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Categorías Populares
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {PRODUCT_CATEGORIES.map((category) => (
            <Button key={category.id} variant="outline" asChild>
              <Link href={`/products?category=${category.id}`}>
                {category.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  const { state } = useCart()

  if (state.isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded" />
              ))}
            </div>
            <div className="h-96 bg-muted rounded" />
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
            <ShoppingCart className="w-8 h-8 mr-3" />
            Carrito de Compras
          </h1>
          {state.items.length > 0 && (
            <p className="text-muted-foreground mt-2">
              {state.itemCount} producto{state.itemCount !== 1 ? 's' : ''} en tu carrito
            </p>
          )}
        </div>

        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Seguir Comprando
          </Link>
        </Button>
      </div>

      {state.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {state.items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}