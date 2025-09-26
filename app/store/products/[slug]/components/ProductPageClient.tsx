"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Product } from "@/lib/types/product"
import ProductGallery from "./ProductGallery"
import SizeSelector from "./SizeSelector"
import AddToCartSection from "./AddToCartSection"
import WishlistButton from "./WishlistButton"
import ShareButton from "./ShareButton"

interface ProductPageClientProps {
  product: Product
}

type GenderFilter = 'male' | 'female'

export default function ProductPageClient({ product }: ProductPageClientProps) {
  console.log('🎯 ProductPageClient rendering with product:', product?.id, product?.name)

  const searchParams = useSearchParams()
  const genderParam = searchParams.get('gender') as GenderFilter | null

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<GenderFilter>(genderParam || 'male')

  console.log('🎯 ProductPageClient hooks initialized')

  // Filter sizes by selected gender
  const filteredSizes = product.sizes.filter(size => size.gender === selectedGender)

  // Reset selected size when gender changes if the current size doesn't exist for the new gender
  React.useEffect(() => {
    if (selectedSize && !filteredSizes.find(size => size.id === selectedSize)) {
      setSelectedSize(null)
    }
  }, [selectedGender, selectedSize, filteredSizes])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery and Price */}
      <div className="space-y-6">
        <ProductGallery product={product} selectedGender={selectedGender} />

        {/* Price - Simplified */}
        <div className="text-right">
          <span className="text-3xl font-bold text-foreground">
            ${product.price.toLocaleString()} MXN
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Gender Selection */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Modelo</h3>
          <Tabs value={selectedGender} onValueChange={(value) => setSelectedGender(value as GenderFilter)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="male">Hombre</TabsTrigger>
              <TabsTrigger value="female">Mujer</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Size Selector */}
        <SizeSelector
          sizes={filteredSizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />

        {/* Add to Cart Section */}
        <AddToCartSection
          product={product}
          selectedSize={selectedSize}
        />

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <WishlistButton productId={product.id} />
          <ShareButton product={product} />
        </div>
      </div>
    </div>
  )
}