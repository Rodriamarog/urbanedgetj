"use client"

import React, { useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Truck,
  Shield,
  RefreshCw,
  Star,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Ruler,
  Home,
  Package,
  Info,
  Crown,
  Zap,
  Clock
} from "lucide-react"

import { getProductBySlug, getRelatedProducts } from "@/lib/data/products"
import { Product, ProductSize, PRODUCT_CATEGORIES } from "@/lib/types/product"
import { useCart } from "@/lib/context/CartContext"
import { useWishlist } from "@/lib/context/WishlistContext"

interface ProductPageProps {
  params: {
    slug: string
  }
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

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const { addItem, getItemQuantity } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const isWishlisted = isInWishlist(product.id)

  const relatedProducts = getRelatedProducts(product.id, product.category)
  const categoryName = PRODUCT_CATEGORIES.find(cat => cat.id === product.category)?.name

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <ProductImageGallery product={product} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
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

          {/* Features */}
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