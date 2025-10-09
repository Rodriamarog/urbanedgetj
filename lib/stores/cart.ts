import {
  Cart,
  CartItem,
  CartStorage,
  TAX_RATE,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
  COUPON_CODES,
  CouponCode
} from '@/lib/types/cart'
import { Product } from '@/lib/types/product'
import { getProductBySlug, products } from '@/lib/data/products'
import { unifiedProducts } from '@/lib/data/unified-products'

const CART_STORAGE_KEY = 'urbanedgetj_cart'

// Helper functions for localStorage
export const getCartFromStorage = (): CartStorage | null => {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return null
  }
}

export const saveCartToStorage = (cart: CartStorage): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

export const clearCartFromStorage = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_STORAGE_KEY)
}

// Legacy to unified product ID mapping
const LEGACY_PRODUCT_MAPPING: Record<string, string> = {
  'ferrari-jacket-male': 'ferrari-jacket',
  'ferrari-jacket-female': 'ferrari-jacket',
  'redbull-jacket-male': 'redbull-jacket',
  'redbull-jacket-female': 'redbull-jacket'
}

// Helper to convert storage format to cart format
export const hydrateCartItems = (storageItems: CartStorage['items']): CartItem[] => {
  return storageItems.map(item => {
    let productId = item.productId

    // Check if this is a legacy product ID that needs mapping
    if (LEGACY_PRODUCT_MAPPING[productId]) {
      productId = LEGACY_PRODUCT_MAPPING[productId]
      console.log(`🛒 Migrating legacy product ID: ${item.productId} → ${productId}`)
    }

    // Find the product by ID - try unified products first, then legacy products
    let product = unifiedProducts.find(p => p.id === productId)

    if (!product) {
      product = products.find(p => p.id === productId)
    }

    if (!product) {
      product = getProductBySlug(productId) // Fallback to slug lookup
    }

    if (!product) {
      console.warn(`Product not found for cart item: ${item.productId} (mapped to: ${productId})`)
      console.warn(`Available unified products:`, unifiedProducts.map(p => p.id))
      console.warn(`Available legacy products:`, products.map(p => p.id))
      return null
    }

    return {
      ...item,
      productId, // Use the mapped product ID
      product,
      addedAt: item.addedAt
    }
  }).filter(Boolean) as CartItem[]
}

// Helper to convert cart format to storage format
export const dehydrateCartItems = (cartItems: CartItem[]): CartStorage['items'] => {
  return cartItems.map(item => ({
    id: item.id,
    productId: item.productId,
    variantId: item.variantId,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
    originalPrice: item.originalPrice,
    addedAt: item.addedAt
  }))
}

// Calculate cart totals
export const calculateCartTotals = (items: CartItem[], couponCode?: string) => {
  // Product price already includes 16% IVA
  // To show IVA separately: Price = Base + (Base * 0.16), so Base = Price / 1.16
  const priceWithIVA = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const basePrice = Math.round(priceWithIVA / 1.16)
  const tax = priceWithIVA - basePrice // IVA amount for display

  // Subtotal (base price without IVA for display)
  const subtotal = basePrice

  // Calculate shipping (free over $1500 MXN)
  const shipping = priceWithIVA >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST

  // Total before discount = base + IVA + shipping
  const totalBeforeDiscount = priceWithIVA + shipping

  // Apply coupon discount on total (after IVA and shipping)
  let discount = 0
  if (couponCode && COUPON_CODES[couponCode as CouponCode]) {
    const coupon = COUPON_CODES[couponCode as CouponCode]
    if (coupon.active && priceWithIVA >= coupon.minAmount) {
      discount = Math.round(totalBeforeDiscount * coupon.discount)
    }
  }

  // Final total
  const total = totalBeforeDiscount - discount

  return {
    subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimal places
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping,
    total: Math.round(total * 100) / 100 // Ensure exact pricing with proper rounding
  }
}

// Generate unique cart item ID
export const generateCartItemId = (productId: string, size: string, variantId?: string): string => {
  return `${productId}-${size}${variantId ? `-${variantId}` : ''}`
}

// Validate cart item stock
export const validateCartItemStock = (product: Product, size: string, quantity: number): {
  valid: boolean
  maxQuantity: number
  message?: string
} => {
  const sizeInfo = product.sizes.find(s => s.id === size)

  if (!sizeInfo) {
    return {
      valid: false,
      maxQuantity: 0,
      message: 'Talla no disponible'
    }
  }

  if (!sizeInfo.inStock) {
    return {
      valid: false,
      maxQuantity: 0,
      message: 'Talla agotada'
    }
  }

  if (sizeInfo.stockQuantity && quantity > sizeInfo.stockQuantity) {
    return {
      valid: false,
      maxQuantity: sizeInfo.stockQuantity,
      message: `Solo quedan ${sizeInfo.stockQuantity} unidades disponibles`
    }
  }

  return {
    valid: true,
    maxQuantity: sizeInfo.stockQuantity || 999
  }
}

// Cart utility functions
export const findCartItem = (items: CartItem[], productId: string, size: string, variantId?: string): CartItem | undefined => {
  return items.find(item =>
    item.productId === productId &&
    item.size === size &&
    item.variantId === variantId
  )
}

export const getCartItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0)
}

export const isValidCouponCode = (code: string): boolean => {
  const coupon = COUPON_CODES[code as CouponCode]
  return !!(coupon && coupon.active)
}

export const getCouponDiscount = (code: string, subtotal: number): number => {
  const coupon = COUPON_CODES[code as CouponCode]
  if (!coupon || !coupon.active || subtotal < coupon.minAmount) {
    return 0
  }
  return subtotal * coupon.discount
}