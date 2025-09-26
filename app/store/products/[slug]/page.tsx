import React from "react"
import { notFound } from "next/navigation"

import { getUnifiedProductBySlug, getRelatedUnifiedProducts } from "@/lib/data/unified-products"
import { PRODUCT_CATEGORIES } from "@/lib/types/product"
import ProductPageClient from "./components/ProductPageClient"
import ProductInfo from "./components/ProductInfo"
import ProductFeatures from "./components/ProductFeatures"
import RelatedProducts from "./components/RelatedProducts"

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Route segment config - force dynamic rendering
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false

export default function ProductPage({ params }: ProductPageProps) {
  console.log('🔍 ProductPage rendering with params:', params)
  console.log('🔍 Looking for slug:', params.slug)

  const product = getUnifiedProductBySlug(params.slug)
  console.log('🔍 Product found:', product ? 'YES' : 'NO')
  console.log('🔍 Product data:', product ? { id: product.id, name: product.name, slug: product.slug } : 'null')

  if (!product) {
    console.log('❌ Product not found, calling notFound()')
    notFound()
  }

  const relatedProducts = getRelatedUnifiedProducts(product.id)
  const categoryName = product.category

  console.log('🔍 Related products:', relatedProducts.length)
  console.log('🔍 Category name:', categoryName)
  console.log('🔍 About to render component')

  try {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Product Info (Server Component) */}
        <ProductInfo product={product} />

        {/* Interactive Product Components (Client) */}
        <div className="mb-16">
          <ProductPageClient product={product} />
          <ProductFeatures />
        </div>

        {/* Related Products (Server Component) */}
        <RelatedProducts
          relatedProducts={relatedProducts}
          categoryName={categoryName}
          categoryId={product.category || 'racing'}
        />
      </div>
    )
  } catch (error) {
    console.error('❌ Error rendering ProductPage:', error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Error Loading Product</h1>
        <p>Product slug: {params.slug}</p>
        <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }
}