import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Truck,
  Shield,
  RefreshCw,
  Home,
  Package,
  Info,
  Zap,
} from "lucide-react"

import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products"
import { PRODUCT_CATEGORIES } from "@/lib/types/product"
import ProductPageClient from "./ProductPageClient"

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
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id, product.category)
  const categoryName = PRODUCT_CATEGORIES.find(cat => cat.id === product.category)?.name

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/store" className="hover:text-foreground transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <span>/</span>
        <Link href="/store/products" className="hover:text-foreground transition-colors">
          <Package className="w-4 h-4" />
        </Link>
        <span>/</span>
        <Link
          href={`/store/products?category=${product.category}`}
          className="hover:text-foreground transition-colors"
        >
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="mb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{categoryName}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
        </div>

        {/* Price */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-foreground">
              ${product.price.toLocaleString()} MXN
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
                <Badge variant="destructive">
                  Ahorra ${(product.originalPrice - product.price).toLocaleString()}
                </Badge>
              </>
            )}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Interactive Client Component */}
        <ProductPageClient product={product} />

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-6 mt-8">
          <div className="text-center">
            <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Envío Gratis</p>
            <p className="text-xs text-muted-foreground">Compras +$1,500</p>
          </div>
          <div className="text-center">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Garantía</p>
            <p className="text-xs text-muted-foreground">30 días</p>
          </div>
          <div className="text-center">
            <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Devoluciones</p>
            <p className="text-xs text-muted-foreground">Fáciles</p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <Card className="p-6">
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Descripción
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Características
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
              </>
            )}

            {/* Materials & Care */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Materiales</h4>
                  <ul className="space-y-1">
                    {product.materials.map((material, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {material}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.careInstructions && product.careInstructions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Cuidados</h4>
                  <ul className="space-y-1">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              También te puede interesar
            </h2>
            <Button variant="outline" asChild>
              <Link href={`/store/products?category=${product.category}`}>
                Ver más en {categoryName}
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group overflow-hidden">
                <Link href={`/store/products/${relatedProduct.slug}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.images[0]?.url}
                      alt={relatedProduct.images[0]?.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">
                        ${relatedProduct.price.toLocaleString()}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${relatedProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}