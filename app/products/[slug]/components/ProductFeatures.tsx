"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Truck,
  Shield,
  RefreshCw,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Product } from "@/lib/types/product"

interface ProductFeaturesProps {
  product: Product
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [currentReviewImages, setCurrentReviewImages] = useState<string[]>([])
  const reviews = product.reviews || []

  const openImageGallery = (images: string[], startIndex: number) => {
    setCurrentReviewImages(images)
    setSelectedImageIndex(startIndex)
  }

  const closeImageGallery = () => {
    setSelectedImageIndex(null)
    setCurrentReviewImages([])
  }

  const goToNextImage = () => {
    if (selectedImageIndex !== null && currentReviewImages.length > 0) {
      setSelectedImageIndex((selectedImageIndex + 1) % currentReviewImages.length)
    }
  }

  const goToPrevImage = () => {
    if (selectedImageIndex !== null && currentReviewImages.length > 0) {
      setSelectedImageIndex((selectedImageIndex - 1 + currentReviewImages.length) % currentReviewImages.length)
    }
  }

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6">
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

      {/* Customer Reviews Section */}
      {reviews.length > 0 && (
        <div className="pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Reseñas de Clientes</h3>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{review.name}</h4>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>

                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                      {review.verified && (
                        <span className="ml-2 text-xs text-green-600 font-medium">Compra verificada</span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.review}
                    </p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((imageUrl, idx) => (
                          <button
                            key={idx}
                            onClick={() => openImageGallery(review.images!, idx)}
                            className="relative w-20 h-20 rounded-lg overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
                          >
                            <Image
                              src={imageUrl}
                              alt={`Foto de ${review.name}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Image Gallery Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeImageGallery()}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10 bg-black/50 text-white hover:bg-black/70">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {selectedImageIndex !== null && currentReviewImages.length > 0 && (
            <div className="relative w-full h-[80vh] group">
              <Image
                src={currentReviewImages[selectedImageIndex]}
                alt={`Review image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />

              {/* Navigation Arrows - Only show if more than 1 image */}
              {currentReviewImages.length > 1 && (
                <>
                  <Button
                    onClick={goToPrevImage}
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>

                  <Button
                    onClick={goToNextImage}
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {currentReviewImages.length}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}