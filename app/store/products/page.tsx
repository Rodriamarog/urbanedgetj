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

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  // Get female model image for display
  const femaleImage = product.images.find(img =>
    img.type === 'lifestyle' && img.gender === 'female'
  ) || product.images.find(img => img.isPrimary) || product.images[0]

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
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

      <div className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs mb-2">
            Para Mujer
          </Badge>
        </div>

        <h3 className="font-semibold text-lg text-foreground mb-2">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-foreground">
            ${product.price.toLocaleString()} MXN
          </div>
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          asChild
        >
          <Link href={`/store/products/${product.slug}?gender=female`}>
            Ver Detalles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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