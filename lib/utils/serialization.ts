import { Product } from "@/lib/types/product"

/**
 * Ensures a product object is fully serializable for client components
 * This function is a safeguard but shouldn't be needed after proper type fixes
 */
export function serializeProduct(product: Product): Product {
  return {
    ...product,
    createdAt: typeof product.createdAt === 'string' ? product.createdAt : product.createdAt,
    updatedAt: typeof product.updatedAt === 'string' ? product.updatedAt : product.updatedAt,
  }
}

/**
 * Parse ISO date strings back to Date objects if needed on client side
 */
export function parseProductDates(product: Product): Product & {
  createdAtDate: Date
  updatedAtDate: Date
} {
  return {
    ...product,
    createdAtDate: new Date(product.createdAt),
    updatedAtDate: new Date(product.updatedAt),
  }
}

/**
 * Utility to format date strings for display
 */
export function formatProductDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Validates that an object is serializable (no functions, dates, etc.)
 */
export function isSerializable(obj: any): boolean {
  try {
    JSON.stringify(obj)
    return true
  } catch {
    return false
  }
}