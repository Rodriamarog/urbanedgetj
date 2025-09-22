import React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import {
  Home,
  Package,
  Info,
  Zap,
} from "lucide-react"

import { Product } from "@/lib/types/product"
import { PRODUCT_CATEGORIES } from "@/lib/types/product"

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const categoryName = PRODUCT_CATEGORIES.find(cat => cat.id === product.category)?.name

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
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

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{categoryName}</Badge>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
        <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
      </div>

      {/* Price */}
      <div className="space-y-2">
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

      <Separator />

      {/* Product Details */}
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
  )
}