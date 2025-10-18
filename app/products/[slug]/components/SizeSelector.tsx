"use client"

import React from "react"
import { Button } from "@/components/ui/button"

import { ProductSize } from "@/lib/types/product"

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: string | null
  onSizeChange: (size: string) => void
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">Talla</label>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant={selectedSize === size.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSizeChange(size.id)}
            disabled={!size.inStock}
            className={`relative ${!size.inStock ? 'opacity-50' : ''}`}
          >
            {size.name}
            {!size.inStock && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <div className="w-full h-px bg-destructive transform rotate-45" />
              </div>
            )}
          </Button>
        ))}
      </div>

      {selectedSize && (
        <p className="text-xs text-muted-foreground">
          Talla seleccionada: {sizes.find(s => s.id === selectedSize)?.label}
        </p>
      )}
    </div>
  )
}