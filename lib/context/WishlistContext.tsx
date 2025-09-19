"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { WishlistItem, WishlistStorage } from '@/lib/types/cart'

const WISHLIST_STORAGE_KEY = 'urbanedgetj_wishlist'

// Helper functions for localStorage
const getWishlistFromStorage = (): WishlistStorage | null => {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error)
    return null
  }
}

const saveWishlistToStorage = (wishlist: WishlistStorage): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error)
  }
}

const clearWishlistFromStorage = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(WISHLIST_STORAGE_KEY)
}

// Wishlist Actions
type WishlistAction =
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }

// Wishlist State
interface WishlistState {
  items: WishlistItem[]
  isLoading: boolean
  updatedAt: Date
}

// Initial state
const initialState: WishlistState = {
  items: [],
  isLoading: true,
  updatedAt: new Date()
}

// Wishlist reducer
const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'LOAD_WISHLIST': {
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        updatedAt: new Date()
      }
    }

    case 'ADD_ITEM': {
      const productId = action.payload

      // Check if item already exists
      if (state.items.some(item => item.productId === productId)) {
        return state
      }

      const newItem: WishlistItem = {
        productId,
        addedAt: new Date()
      }

      return {
        ...state,
        items: [...state.items, newItem],
        updatedAt: new Date()
      }
    }

    case 'REMOVE_ITEM': {
      const productId = action.payload

      return {
        ...state,
        items: state.items.filter(item => item.productId !== productId),
        updatedAt: new Date()
      }
    }

    case 'CLEAR_WISHLIST': {
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
interface WishlistContextType {
  state: WishlistState
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  toggleItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// Provider component
interface WishlistProviderProps {
  children: ReactNode
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = getWishlistFromStorage()
    if (storedWishlist) {
      const items = storedWishlist.items.map(item => ({
        ...item,
        addedAt: new Date(item.addedAt)
      }))
      dispatch({ type: 'LOAD_WISHLIST', payload: items })
    } else {
      dispatch({ type: 'LOAD_WISHLIST', payload: [] })
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      const storageWishlist: WishlistStorage = {
        items: state.items,
        updatedAt: state.updatedAt.toISOString()
      }
      saveWishlistToStorage(storageWishlist)
    }
  }, [state.items, state.updatedAt, state.isLoading])

  // Wishlist actions
  const addItem = (productId: string) => {
    dispatch({ type: 'ADD_ITEM', payload: productId })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const toggleItem = (productId: string) => {
    if (isInWishlist(productId)) {
      removeItem(productId)
    } else {
      addItem(productId)
    }
  }

  const isInWishlist = (productId: string): boolean => {
    return state.items.some(item => item.productId === productId)
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
    clearWishlistFromStorage()
  }

  const contextValue: WishlistContextType = {
    state,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist
  }

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  )
}

// Hook to use wishlist context
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}