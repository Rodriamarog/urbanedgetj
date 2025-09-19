import React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="aspect-square relative">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="p-4 space-y-3">
      <Badge variant="outline" className="w-20">
        <Skeleton className="w-full h-3" />
      </Badge>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  </Card>
)

const FiltersSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-4 mb-8">
    <div className="relative flex-1">
      <Skeleton className="h-10 w-full" />
    </div>
    <Skeleton className="h-10 w-full lg:w-48" />
    <div className="flex space-x-2">
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
    </div>
  </div>
)

const TabsSkeleton = () => (
  <div className="mb-8">
    <div className="flex space-x-2">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-22" />
      <Skeleton className="h-10 w-24" />
    </div>
  </div>
)

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Skeleton className="h-6 w-6 mr-2" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-12 w-96 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>

      {/* Filters Skeleton */}
      <FiltersSkeleton />

      {/* Tabs Skeleton */}
      <TabsSkeleton />

      {/* Results Count Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}