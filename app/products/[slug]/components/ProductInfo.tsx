import React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Package,
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
        <Link href="/" className="hover:text-foreground transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground transition-colors">
          <Package className="w-4 h-4" />
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category}`}
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
      </div>


    </div>
  )
}