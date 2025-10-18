import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { LinkButton } from "@/components/ui/link-button"

import { Product } from "@/lib/types/product"

interface RelatedProductsProps {
  relatedProducts: Product[]
  categoryName: string | undefined
  categoryId: string
}

export default function RelatedProducts({ relatedProducts, categoryName, categoryId }: RelatedProductsProps) {
  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          También te puede interesar
        </h2>
        <LinkButton
          href={`/products?category=${categoryId}`}
          variant="outline"
        >
          Ver más en {categoryName}
        </LinkButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <Card key={relatedProduct.id} className="group overflow-hidden">
            <Link href={`/products/${relatedProduct.slug}`}>
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
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}