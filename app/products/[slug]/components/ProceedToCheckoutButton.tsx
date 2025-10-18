"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

import { Product } from "@/lib/types/product"
import { useCart } from "@/lib/context/CartContext"

interface ProceedToCheckoutButtonProps {
  product: Product
  selectedSize: string | null
}

export default function ProceedToCheckoutButton({ product, selectedSize }: ProceedToCheckoutButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleProceedToCheckout = () => {
    if (!selectedSize) {
      alert('Por favor elige una talla antes de proceder al pago')
      return
    }

    // Add item to cart
    addItem(product, selectedSize, 1)

    // Navigate to checkout
    router.push('/checkout')
  }

  return (
    <Button
      variant="default"
      size="lg"
      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
      onClick={handleProceedToCheckout}
    >
      <CreditCard className="w-5 h-5 mr-2" />
      Proceder al Pago
    </Button>
  )
}