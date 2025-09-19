"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import {
  Cart,
  CartItem,
  CartStorage,
  CouponCode
} from '@/lib/types/cart'
import {
  getCartFromStorage,
  saveCartToStorage,
  clearCartFromStorage,
  hydrateCartItems,
  dehydrateCartItems,
  calculateCartTotals,
  generateCartItemId,
  validateCartItemStock,
  findCartItem,
  getCartItemCount,
  isValidCouponCode
} from '@/lib/stores/cart'
import { Product } from '@/lib/types/product'
import { toast } from '@/lib/hooks/use-toast'

// Cart Actions
type CartAction =
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; quantity: number; variantId?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }

// Cart State
interface CartState extends Cart {
  itemCount: number
  isLoading: boolean
}

// Initial state
const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  itemCount: 0,
  isLoading: true,
  updatedAt: new Date()
}

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART': {
      const items = action.payload
      const itemCount = getCartItemCount(items)
      const totals = calculateCartTotals(items, state.couponCode)

      return {
        ...state,
        items,
        itemCount,
        ...totals,
        isLoading: false,
        updatedAt: new Date()
      }
    }

    case 'ADD_ITEM': {
      const { product, size, quantity, variantId } = action.payload

      // Validate stock
      const stockValidation = validateCartItemStock(product, size, quantity)
      if (!stockValidation.valid) {
        toast({
          title: "Error de inventario",
          description: stockValidation.message,
          variant: "destructive"
        })
        return state
      }

      const itemId = generateCartItemId(product.id, size, variantId)
      const existingItem = findCartItem(state.items, product.id, size, variantId)

      let newItems: CartItem[]

      if (existingItem) {
        // Update existing item quantity
        const newQuantity = existingItem.quantity + quantity
        const newStockValidation = validateCartItemStock(product, size, newQuantity)

        if (!newStockValidation.valid) {
          toast({
            title: "Error de inventario",
            description: newStockValidation.message,
            variant: "destructive"
          })
          return state
        }

        newItems = state.items.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: newQuantity, addedAt: new Date() }
            : item
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          product,
          variantId,
          size,
          quantity,
          price: product.price,
          originalPrice: product.originalPrice,
          addedAt: new Date()
        }
        newItems = [...state.items, newItem]
      }

      const itemCount = getCartItemCount(newItems)
      const totals = calculateCartTotals(newItems, state.couponCode)

      // Show success notification
      toast({
        title: "Producto agregado",
        description: `${product.name} (${size.toUpperCase()}) agregado al carrito`,
      })

      return {
        ...state,
        items: newItems,
        itemCount,
        ...totals,
        updatedAt: new Date()
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      const itemCount = getCartItemCount(newItems)
      const totals = calculateCartTotals(newItems, state.couponCode)

      return {
        ...state,
        items: newItems,
        itemCount,
        ...totals,
        updatedAt: new Date()
      }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: itemId })
      }

      const newItems = state.items.map(item => {
        if (item.id === itemId) {
          // Validate stock for new quantity
          const stockValidation = validateCartItemStock(item.product, item.size, quantity)
          if (!stockValidation.valid) {
            toast({
              title: "Error de inventario",
              description: stockValidation.message,
              variant: "destructive"
            })
            return item // Keep original quantity
          }
          return { ...item, quantity, addedAt: new Date() }
        }
        return item
      })

      const itemCount = getCartItemCount(newItems)
      const totals = calculateCartTotals(newItems, state.couponCode)

      return {
        ...state,
        items: newItems,
        itemCount,
        ...totals,
        updatedAt: new Date()
      }
    }

    case 'APPLY_COUPON': {
      const couponCode = action.payload.toUpperCase()

      if (!isValidCouponCode(couponCode)) {
        toast({
          title: "Código inválido",
          description: "El código de descuento ingresado no es válido.",
          variant: "destructive"
        })
        return state
      }

      const totals = calculateCartTotals(state.items, couponCode)

      // Show success notification
      toast({
        title: "Cupón aplicado",
        description: `Código ${couponCode} aplicado con éxito. Descuento: $${totals.discount.toLocaleString()} MXN`,
      })

      return {
        ...state,
        couponCode,
        ...totals,
        updatedAt: new Date()
      }
    }

    case 'REMOVE_COUPON': {
      const totals = calculateCartTotals(state.items)

      return {
        ...state,
        couponCode: undefined,
        ...totals,
        updatedAt: new Date()
      }
    }

    case 'CLEAR_CART': {
      return {
        ...initialState,
        isLoading: false
      }
    }

    default:
      return state
  }
}

// Context
interface CartContextType {
  state: CartState
  addItem: (product: Product, size: string, quantity: number, variantId?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  clearCart: () => void
  getItemQuantity: (productId: string, size: string, variantId?: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider component
interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = getCartFromStorage()
    if (storedCart) {
      const hydratedItems = hydrateCartItems(storedCart.items)
      dispatch({ type: 'LOAD_CART', payload: hydratedItems })

      // Apply stored coupon if exists
      if (storedCart.couponCode) {
        dispatch({ type: 'APPLY_COUPON', payload: storedCart.couponCode })
      }
    } else {
      dispatch({ type: 'LOAD_CART', payload: [] })
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      const storageCart: CartStorage = {
        items: dehydrateCartItems(state.items),
        couponCode: state.couponCode,
        updatedAt: state.updatedAt.toISOString()
      }
      saveCartToStorage(storageCart)
    }
  }, [state.items, state.couponCode, state.updatedAt, state.isLoading])

  // Cart actions
  const addItem = (product: Product, size: string, quantity: number = 1, variantId?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, quantity, variantId } })
  }

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }

  const applyCoupon = (code: string): boolean => {
    if (isValidCouponCode(code.toUpperCase())) {
      dispatch({ type: 'APPLY_COUPON', payload: code })
      return true
    }
    return false
  }

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    clearCartFromStorage()
  }

  const getItemQuantity = (productId: string, size: string, variantId?: string): number => {
    const item = findCartItem(state.items, productId, size, variantId)
    return item ? item.quantity : 0
  }

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
    getItemQuantity
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

// Hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}