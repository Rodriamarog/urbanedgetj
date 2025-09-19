import React from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center space-x-2 text-sm mb-8">
        <Skeleton className="w-4 h-4" />
        <span>/</span>
        <Skeleton className="w-4 h-4" />
        <span>/</span>
        <Skeleton className="w-20 h-4" />
        <span>/</span>
        <Skeleton className="w-32 h-4" />
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-9 w-3/4 mb-2" />
            <Skeleton className="h-6 w-full" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-5 w-40" />
          </div>

          <Separator />

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-9" />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-16" />
            <div className="flex items-center space-x-3">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <div className="flex space-x-3">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center space-y-2">
                <Skeleton className="w-6 h-6 mx-auto" />
                <Skeleton className="h-3 w-16 mx-auto" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Card Skeleton */}
      <div className="mb-16">
        <Card className="p-6">
          <div className="space-y-8">
            {/* Description */}
            <div>
              <div className="flex items-center mb-4">
                <Skeleton className="w-5 h-5 mr-2" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <div className="flex items-center mb-4">
                <Skeleton className="w-5 h-5 mr-2" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <Skeleton className="w-1.5 h-1.5 rounded-full mr-3" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Materials & Care */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-5 w-20 mb-3" />
                <div className="space-y-1">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-24" />
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-5 w-16 mb-3" />
                <div className="space-y-1">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-32" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Related Products Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-square">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}