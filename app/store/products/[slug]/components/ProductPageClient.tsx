"use client"

import React, { useState } from "react"

import { Product } from "@/lib/types/product"
import ProductGallery from "./ProductGallery"
import SizeSelector from "./SizeSelector"
import AddToCartSection from "./AddToCartSection"
import WishlistButton from "./WishlistButton"
import ShareButton from "./ShareButton"

interface ProductPageClientProps {
  product: Product
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  console.log('🎯 ProductPageClient rendering with product:', product?.id, product?.name)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  console.log('🎯 ProductPageClient hooks initialized')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div>
        <ProductGallery product={product} />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Size Selector */}
        <SizeSelector
          sizes={product.sizes}
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