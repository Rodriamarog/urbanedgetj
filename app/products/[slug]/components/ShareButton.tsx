"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

import { Product } from "@/lib/types/product"

interface ShareButtonProps {
  product: Product
}

export default function ShareButton({ product }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado al portapapeles')
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
    >
      <Share2 className="w-5 h-5" />
    </Button>
  )
}