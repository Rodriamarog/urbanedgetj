"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react"

import { Product } from "@/lib/types/product"

interface ProductGalleryProps {
  product: Product
  selectedGender: 'male' | 'female'
}

export default function ProductGallery({ product, selectedGender }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  // Filter images based on selected gender
  const getFilteredImages = () => {
    // Get unisex images (product shots)
    const unisexImages = product.images.filter(img => img.gender === 'unisex' || !img.gender)

    // Get gender-specific lifestyle images
    const genderImages = product.images.filter(img => img.gender === selectedGender)

    // Combine: unisex first, then gender-specific
    return [...unisexImages, ...genderImages]
  }

  const filteredImages = getFilteredImages()

  // Reset current image index when gender changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [selectedGender])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  if (filteredImages.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={filteredImages[currentImageIndex]?.url}
          alt={filteredImages[currentImageIndex]?.alt}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Buttons */}
        {filteredImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Zoom Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-3 right-3 opacity-80 hover:opacity-100"
          onClick={() => setIsZoomOpen(true)}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      {/* Thumbnail Gallery */}
      {filteredImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {filteredImages.map((image, index) => (
            <button
              key={`${image.id}-${selectedGender}`}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                index === currentImageIndex
                  ? 'border-primary'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Dialog */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-square">
            <Image
              src={filteredImages[currentImageIndex]?.url}
              alt={filteredImages[currentImageIndex]?.alt}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}