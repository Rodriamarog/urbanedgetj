"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  ArrowUpDown,
  Grid3X3,
  List,
  ShoppingCart,
  Star,
  Heart,
  Eye,
  TrendingUp,
  Zap,
  Crown
} from "lucide-react"

import { products } from "@/lib/data/products"
import { Product, ProductCategory, PRODUCT_CATEGORIES } from "@/lib/types/product"
import { useCart } from "@/lib/context/CartContext"
import { useWishlist } from "@/lib/context/WishlistContext"

type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular' | 'name'
type ViewMode = 'grid' | 'list'

const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'name':
        return a.name.localeCompare(b.name)
      case 'popular':
        // Sort by bestseller first, then by stock quantity
        if (a.isBestseller && !b.isBestseller) return -1
        if (!a.isBestseller && b.isBestseller) return 1
        return (b.stockQuantity || 0) - (a.stockQuantity || 0)
      default:
        return 0
    }
  })
}

const ProductCard: React.FC<{ product: Product; viewMode: ViewMode }> = ({ product, viewMode }) => {
  const [quickAddSize, setQuickAddSize] = useState<string>("")
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // If product has multiple sizes, use medium as default, otherwise use first available
    const defaultSize = product.sizes.find(s => s.id === 'm' && s.inStock)?.id ||
                       product.sizes.find(s => s.inStock)?.id

    if (!defaultSize) {
      alert('Producto agotado')
      return
    }

    addItem(product, defaultSize, 1)
    alert(`✅ ${product.name} agregado al carrito!`)
  }

  if (viewMode === 'list') {
    return (
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex gap-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src={product.images[0]?.url}
              alt={product.images[0]?.alt}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                  <Link href={`/store/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {PRODUCT_CATEGORIES.find(cat => cat.id === product.category)?.name}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleItem(product.id)
                }}
                className="text-muted-foreground hover:text-red-500"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-foreground">
                  ${product.price.toLocaleString()} MXN
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/store/products/${product.slug}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalles
                  </Link>
                </Button>
                <Button
                  size="sm"
                  onClick={handleQuickAdd}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={product.images[0]?.url}
            alt={product.images[0]?.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />


          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleItem(product.id)
            }}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/store/products/${product.slug}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  Ver
                </Link>
              </Button>
              <Button
                size="sm"
                onClick={handleQuickAdd}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs mb-2">
            {PRODUCT_CATEGORIES.find(cat => cat.id === product.category)?.name}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg text-foreground mb-2 hover:text-primary transition-colors">
          <Link href={`/store/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-foreground">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">MXN</div>
          </div>

          <div className="flex items-center space-x-1">
            {product.stockQuantity && product.stockQuantity > 0 ? (
              <Badge variant="outline" className="text-green-600 border-green-600">
                En Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">
                Agotado
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    return sortProducts(filtered, sortBy)
  }, [searchQuery, selectedCategory, sortBy])

  const categoryCount = (category: ProductCategory | 'all') => {
    if (category === 'all') return products.length
    return products.filter(p => p.category === category).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-6 w-6 text-primary mr-2" />
          <Badge variant="outline" className="border-primary text-primary">
            Catálogo Completo
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Productos Urban Edge TJ
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Descubre nuestra colección completa de streetwear premium mexicano.
          Desde chaquetas F1 hasta hoodies urbanos, encuentra tu estilo perfecto.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-full lg:w-48">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más Nuevos</SelectItem>
            <SelectItem value="popular">Más Populares</SelectItem>
            <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="name">Nombre A-Z</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode */}
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ProductCategory | 'all')} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <span>Todos</span>
            <Badge variant="secondary" className="ml-2">
              {categoryCount('all')}
            </Badge>
          </TabsTrigger>
          {PRODUCT_CATEGORIES.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-2">
                {categoryCount(category.id as ProductCategory)}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Mostrando {filteredAndSortedProducts.length} de {products.length} productos
          {searchQuery && ` para "${searchQuery}"`}
        </p>
      </div>

      {/* Products Grid/List */}
      <div className={
        viewMode === 'grid'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {filteredAndSortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No se encontraron productos
          </h3>
          <p className="text-muted-foreground mb-4">
            Intenta con otros términos de búsqueda o explora nuestras categorías.
          </p>
          <Button onClick={() => setSearchQuery('')} variant="outline">
            Ver Todos los Productos
          </Button>
        </div>
      )}
    </div>
  )
}