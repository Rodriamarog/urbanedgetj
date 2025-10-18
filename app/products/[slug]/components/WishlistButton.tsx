"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

import { useWishlist } from "@/lib/context/WishlistContext"

interface WishlistButtonProps {
  productId: string
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(productId)

  return (
    <Button
      variant="outline"
      size="lg"
      className="flex-1"
      onClick={() => toggleItem(productId)}
    >
      <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      {isWishlisted ? 'En Lista' : 'Guardar'}
    </Button>
  )
}