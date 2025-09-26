export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  basePrice?: number
  ivaPercentage?: number
  originalPrice?: number
  discountPercentage?: number
  category?: string
  subcategory?: string
  images: ProductImage[]
  variants?: ProductVariant[]
  sizes: ProductSize[]
  colors?: ProductColor[]
  materials?: string[]
  careInstructions?: string[]
  features?: string[]
  isNew?: boolean
  isBestseller?: boolean
  isLimited?: boolean
  inStock: boolean
  stockQuantity?: number
  sku: string
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary?: boolean
  type: 'product' | 'lifestyle' | 'detail' | 'back' | 'side'
  order: number
  gender?: 'male' | 'female' | 'unisex'
}

export interface ProductVariant {
  id: string
  name: string
  slug: string
  color?: ProductColor
  price?: number
  originalPrice?: number
  images: ProductImage[]
  sku: string
  inStock: boolean
  stockQuantity?: number
}

export interface ProductSize {
  id: string
  name: string
  label: string
  measurements?: {
    chest?: number
    waist?: number
    length?: number
    sleeve?: number
  }
  inStock: boolean
  stockQuantity?: number
  gender?: 'male' | 'female' | 'unisex'
}

export interface ProductColor {
  id: string
  name: string
  hex: string
  label: string
}

export type ProductCategory = 'hombre' | 'mujer'

export interface ProductFilter {
  category?: ProductCategory
  priceRange?: {
    min: number
    max: number
  }
  sizes?: string[]
  colors?: string[]
  inStockOnly?: boolean
  isNew?: boolean
  isBestseller?: boolean
  isLimited?: boolean
}

export interface ProductSort {
  field: 'price' | 'name' | 'createdAt' | 'popularity'
  direction: 'asc' | 'desc'
}

export interface CartItem {
  productId: string
  variantId?: string
  size: string
  quantity: number
  price: number
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  couponCode?: string
  discount?: number
  createdAt: string
  updatedAt: string
}

export const PRODUCT_CATEGORIES = [
  { id: 'hombre', name: 'Hombre', slug: 'hombre' },
  { id: 'mujer', name: 'Mujer', slug: 'mujer' },
] as const

export const PRODUCT_SIZES = [
  { id: 'xs', name: 'XS', label: 'Extra Chica' },
  { id: 's', name: 'S', label: 'Chica' },
  { id: 'm', name: 'M', label: 'Mediana' },
  { id: 'l', name: 'L', label: 'Grande' },
  { id: 'xl', name: 'XL', label: 'Extra Grande' },
  { id: 'xxl', name: 'XXL', label: 'Doble Extra Grande' },
] as const

export const PRODUCT_COLORS = [
  { id: 'black', name: 'Black', hex: '#000000', label: 'Negro' },
  { id: 'white', name: 'White', hex: '#FFFFFF', label: 'Blanco' },
  { id: 'red', name: 'Red', hex: '#DC2626', label: 'Rojo' },
  { id: 'gray', name: 'Gray', hex: '#6B7280', label: 'Gris' },
  { id: 'navy', name: 'Navy', hex: '#1E3A8A', label: 'Azul Marino' },
] as const