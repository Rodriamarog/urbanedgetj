"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Ruler,
} from "lucide-react"

import { Product, ProductSize } from "@/lib/types/product"
import { useCart } from "@/lib/context/CartContext"
import { useWishlist } from "@/lib/context/WishlistContext"

interface ProductPageClientProps {
  product: Product
}

const ProductImageGallery: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.images[currentImageIndex]?.url}
          alt={product.images[currentImageIndex]?.alt}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Buttons */}
        {product.images.length > 1 && (
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
      {product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={image.id}
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
              src={product.images[currentImageIndex]?.url}
              alt={product.images[currentImageIndex]?.alt}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const SizeSelector: React.FC<{
  sizes: ProductSize[],
  selectedSize: string | null,
  onSizeChange: (size: string) => void
}> = ({ sizes, selectedSize, onSizeChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Talla</label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              <Ruler className="w-3 h-3 mr-1" />
              Guía de tallas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Guía de Tallas</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-medium">Talla</div>
                <div className="font-medium">Pecho (cm)</div>
                <div className="font-medium">Largo (cm)</div>
                <div className="font-medium">Manga (cm)</div>

                <div>XS</div><div>88-92</div><div>65</div><div>61</div>
                <div>S</div><div>92-96</div><div>67</div><div>63</div>
                <div>M</div><div>96-100</div><div>69</div><div>65</div>
                <div>L</div><div>100-104</div><div>71</div><div>67</div>
                <div>XL</div><div>104-108</div><div>73</div><div>69</div>
                <div>XXL</div><div>108-112</div><div>75</div><div>71</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant={selectedSize === size.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSizeChange(size.id)}
            disabled={!size.inStock}
            className={`relative ${!size.inStock ? 'opacity-50' : ''}`}
          >
            {size.name}
            {!size.inStock && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <div className="w-full h-px bg-destructive transform rotate-45" />
              </div>
            )}
          </Button>
        ))}
      </div>

      {selectedSize && (
        <p className="text-xs text-muted-foreground">
          Talla seleccionada: {sizes.find(s => s.id === selectedSize)?.label}
        </p>
      )}
    </div>
  )
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  console.log('🎯 ProductPageClient rendering with product:', product?.id, product?.name)

  const { addItem, getItemQuantity } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  console.log('🎯 ProductPageClient hooks initialized')

  const isWishlisted = isInWishlist(product.id)

  // Get current quantity in cart for this product/size combination
  const currentCartQuantity = selectedSize ? getItemQuantity(product.id, selectedSize) : 0

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla')
      return
    }

    setIsAddingToCart(true)
    try {
      addItem(product, selectedSize, quantity)

      // Show success feedback
      alert(`✅ ${product.name} agregado al carrito!\nTalla: ${selectedSize.toUpperCase()}\nCantidad: ${quantity}`)

      // Reset quantity to 1 after adding
      setQuantity(1)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Error al agregar al carrito. Por favor intenta de nuevo.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado al portapapeles')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div>
        <ProductImageGallery product={product} />
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Size Selector */}
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />

        {/* Quantity */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Cantidad</label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= 10}
            >
              +
            </Button>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.inStock ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-green-600 font-medium">
                  En stock ({product.stockQuantity} disponibles)
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-sm text-red-600 font-medium">Agotado</span>
              </>
            )}
          </div>

          {currentCartQuantity > 0 && (
            <div className="text-sm text-primary font-medium">
              {currentCartQuantity} en carrito
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleAddToCart}
            disabled={!product.inStock || !selectedSize || isAddingToCart}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isAddingToCart ? "Agregando..." : "Agregar al Carrito"}
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => toggleItem(product.id)}
            >
              <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              {isWishlisted ? 'En Lista' : 'Guardar'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}