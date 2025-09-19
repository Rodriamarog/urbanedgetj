import { Product } from './product'

export interface CartItem {
  id: string
  productId: string
  product: Product
  variantId?: string
  size: string
  quantity: number
  price: number
  originalPrice?: number
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number // IVA 16%
  shipping: number
  discount: number
  couponCode?: string
  total: number
  updatedAt: Date
}

export interface CartStorage {
  items: Omit<CartItem, 'product'>[]
  couponCode?: string
  updatedAt: string
}

export interface Address {
  id?: string
  name: string
  addressLine1: string
  addressLine2?: string
  colonia: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface ContactInfo {
  email: string
  phone: string
  firstName: string
  lastName: string
}

export interface CheckoutData {
  contact: ContactInfo
  shippingAddress: Address
  billingAddress?: Address
  useSameAddress: boolean
  orderNotes?: string
}

export interface WishlistItem {
  productId: string
  addedAt: Date
}

export interface WishlistStorage {
  items: WishlistItem[]
  updatedAt: string
}

// Mexican states for address forms
export const MEXICAN_STATES = [
  { code: 'AGU', name: 'Aguascalientes' },
  { code: 'BCN', name: 'Baja California' },
  { code: 'BCS', name: 'Baja California Sur' },
  { code: 'CAM', name: 'Campeche' },
  { code: 'CHP', name: 'Chiapas' },
  { code: 'CHH', name: 'Chihuahua' },
  { code: 'COA', name: 'Coahuila' },
  { code: 'COL', name: 'Colima' },
  { code: 'DIF', name: 'Ciudad de México' },
  { code: 'DUR', name: 'Durango' },
  { code: 'GUA', name: 'Guanajuato' },
  { code: 'GRO', name: 'Guerrero' },
  { code: 'HID', name: 'Hidalgo' },
  { code: 'JAL', name: 'Jalisco' },
  { code: 'MEX', name: 'Estado de México' },
  { code: 'MIC', name: 'Michoacán' },
  { code: 'MOR', name: 'Morelos' },
  { code: 'NAY', name: 'Nayarit' },
  { code: 'NLE', name: 'Nuevo León' },
  { code: 'OAX', name: 'Oaxaca' },
  { code: 'PUE', name: 'Puebla' },
  { code: 'QUE', name: 'Querétaro' },
  { code: 'ROO', name: 'Quintana Roo' },
  { code: 'SLP', name: 'San Luis Potosí' },
  { code: 'SIN', name: 'Sinaloa' },
  { code: 'SON', name: 'Sonora' },
  { code: 'TAB', name: 'Tabasco' },
  { code: 'TAM', name: 'Tamaulipas' },
  { code: 'TLA', name: 'Tlaxcala' },
  { code: 'VER', name: 'Veracruz' },
  { code: 'YUC', name: 'Yucatán' },
  { code: 'ZAC', name: 'Zacatecas' }
] as const

// Tax and shipping constants
export const TAX_RATE = 0.16 // IVA 16%
export const FREE_SHIPPING_THRESHOLD = 1500 // MXN
export const STANDARD_SHIPPING_COST = 150 // MXN

// Coupon codes
export const COUPON_CODES = {
  URBANEDGE20: {
    code: 'URBANEDGE20',
    discount: 0.20,
    description: '20% de descuento',
    minAmount: 0,
    active: true
  }
} as const

export type CouponCode = keyof typeof COUPON_CODES