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

// Helper to convert storage format to cart format
export const hydrateCartItems = (storageItems: CartStorage['items']): CartItem[] => {
  return storageItems.map(item => {
    // Find the product by ID - first try by ID, then by slug as fallback
    let product = products.find(p => p.id === item.productId)
    if (!product) {
      product = getProductBySlug(item.productId) // Fallback to slug lookup
    }

    if (!product) {
      console.warn(`Product not found for cart item: ${item.productId}`)
      return null
    }

    return {
      ...item,
      product,
      addedAt: new Date(item.addedAt)
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
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Apply coupon discount
  let discount = 0
  if (couponCode && COUPON_CODES[couponCode as CouponCode]) {
    const coupon = COUPON_CODES[couponCode as CouponCode]
    if (coupon.active && subtotal >= coupon.minAmount) {
      discount = subtotal * coupon.discount
    }
  }

  const discountedSubtotal = subtotal - discount

  // Calculate tax (IVA 16%)
  const tax = discountedSubtotal * TAX_RATE

  // Calculate shipping
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST

  // Calculate total
  const total = discountedSubtotal + tax + shipping

  return {
    subtotal,
    discount,
    tax,
    shipping,
    total: Math.max(0, total) // Ensure total is never negative
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