"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

import { Product } from "@/lib/types/product"
import { useCart } from "@/lib/context/CartContext"
import { useCartAnimation, CartAnimation } from "../../../components-store/CartAnimation"

interface AddToCartSectionProps {
  product: Product
  selectedSize: string | null
}

export default function AddToCartSection({ product, selectedSize }: AddToCartSectionProps) {
  const router = useRouter()
  const { addItem, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { isAnimating, startPosition, targetPosition, triggerAnimation, handleAnimationComplete } = useCartAnimation()

  // Get current quantity in cart for this product/size combination
  const currentCartQuantity = selectedSize ? getItemQuantity(product.id, selectedSize) : 0

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Por favor elige una talla antes de agregar al carrito')
      return
    }

    setIsAddingToCart(true)
    try {
      addItem(product, selectedSize, quantity)

      // Trigger cart animation
      let cartIcon = document.querySelector('[data-cart-icon]') as HTMLElement

      // Fallback: try to find any cart icon if the main one isn't visible
      if (!cartIcon || cartIcon.offsetParent === null) {
        cartIcon = document.querySelector('[href="/cart"]') as HTMLElement
      }

      if (buttonRef.current && cartIcon) {
        triggerAnimation(buttonRef.current, cartIcon)
      } else {
        // Fallback: show a simple visual feedback
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'scale(0.95)'
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.style.transform = 'scale(1)'
            }
          }, 150)
        }
      }

      // Reset quantity to 1 after adding
      setQuantity(1)

      // Redirect to cart page
      router.push('/cart')
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Cantidad</label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= 10}
          >
            +
          </Button>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {product.inStock ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-green-600 font-medium">
                En stock ({product.stockQuantity} disponibles)
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-sm text-red-600 font-medium">Agotado</span>
            </>
          )}
        </div>

        {currentCartQuantity > 0 && (
          <div className="text-sm text-primary font-medium">
            {currentCartQuantity} en carrito
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button
        ref={buttonRef}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={handleAddToCart}
        disabled={!product.inStock || isAddingToCart}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        {isAddingToCart ? "Agregando..." : "Agregar al Carrito"}
      </Button>

      {/* Cart Animation */}
      <CartAnimation
        isAnimating={isAnimating}
        startPosition={startPosition}
        targetPosition={targetPosition}
        onComplete={handleAnimationComplete}
      />
    </div>
  )
}