"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  ArrowRight
} from "lucide-react"

import { unifiedProducts as products } from "@/lib/data/unified-products"
import { Product } from "@/lib/types/product"

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Get female model image for display
  const femaleImage = product.images.find((img: any) =>
    img.type === 'lifestyle' && img.gender === 'female'
  ) || product.images.find((img: any) => img.isPrimary) || product.images[0]

  return (
    <Link href={`/store/products/${product.slug}?gender=female`} className="block h-full">
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 py-0 flex flex-col h-full cursor-pointer">
        <div className="relative overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={femaleImage?.url || ''}
              alt={femaleImage?.alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="p-2 md:p-6 flex flex-col flex-1">
          {/* Title - Fixed height for up to 2 lines */}
          <h3 className="font-semibold text-lg text-foreground mb-2 min-h-[3.5rem] flex items-start leading-tight">
            {product.name}
          </h3>

          {/* Description - Fixed height */}
          <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem] flex items-start leading-tight">
            {product.shortDescription}
          </p>

          {/* Price - Fixed height */}
          <div className="mb-4 min-h-[2rem] flex items-center">
            <div className="text-2xl font-bold text-foreground">
              ${product.price.toLocaleString()} MXN
            </div>
          </div>

          {/* Button - Pushed to bottom */}
          <div className="mt-auto">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground pointer-events-none"
            >
              Ver Detalles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-1 py-4 md:px-4 md:py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-primary mr-2" />
          <Badge variant="outline" className="border-primary text-primary">
            Catálogo Completo
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Chaquetas F1 Racing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Descubre nuestra colección exclusiva de chaquetas F1 para mujer.
          Diseños Ferrari y Red Bull Racing auténticos.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-1 w-full md:gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}