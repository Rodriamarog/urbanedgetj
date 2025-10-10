import { CartItem } from './cart'

export type OrderStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'cancelled' | 'expired'
export type PaymentStatus = 'pending' | 'approved' | 'authorized' | 'in_process' | 'in_mediation' | 'rejected' | 'cancelled' | 'refunded' | 'charged_back'
export type PaymentMethod = 'credit_card' | 'debit_card' | 'bank_transfer' | 'ticket' | 'account_money' | 'digital_currency'

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Address {
  name: string
  addressLine1: string
  addressLine2?: string
  colonia: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  items: CartItem[]
  customerInfo: CustomerInfo
  shippingAddress: Address
  billingAddress?: Address
  useSameAddress: boolean

  // Pricing
  subtotal: number
  tax: number
  shipping: number
  discount: number
  couponCode?: string
  total: number
  currency: 'MXN'

  // Payment & Status
  status: OrderStatus
  paymentId?: string
  mercadoPagoId?: string
  paymentStatus?: PaymentStatus
  paymentMethod?: PaymentMethod

  // Timestamps
  createdAt: Date
  updatedAt: Date

  // MercadoPago specific
  preferenceId?: string
  collectorId?: string
  externalReference?: string
}

export interface PaymentNotification {
  id: string
  orderId: string
  paymentId: string
  status: PaymentStatus
  paymentMethod: PaymentMethod
  amount: number
  currency: string
  receivedAt: Date

  // MercadoPago webhook data
  topic?: string
  resource?: string
  userId?: string
  apiVersion?: string
  action?: string
  dateCreated?: string
}

export interface MercadoPagoPreference {
  id: string
  items: Array<{
    id: string
    title: string
    description?: string
    picture_url?: string
    category_id?: string
    quantity: number
    currency_id: 'MXN'
    unit_price: number
  }>

  payer?: {
    name?: string
    surname?: string
    email?: string
    phone?: {
      area_code?: string
      number?: string
    }
    identification?: {
      type?: string
      number?: string
    }
    address?: {
      street_name?: string
      street_number?: string
      zip_code?: string
    }
  }

  back_urls?: {
    success?: string
    failure?: string
    pending?: string
  }

  auto_return?: 'approved' | 'all'
  payment_methods?: {
    excluded_payment_methods?: Array<{ id: string }>
    excluded_payment_types?: Array<{ id: string }>
    installments?: number
  }

  notification_url?: string
  statement_descriptor?: string
  external_reference?: string
  expires?: boolean
  expiration_date_from?: string
  expiration_date_to?: string
}

export interface CreateOrderRequest {
  items: CartItem[]
  customerInfo: CustomerInfo
  shippingAddress: Address
  billingAddress?: Address
  useSameAddress: boolean
  couponCode?: string
}

export interface CreateOrderResponse {
  success: boolean
  order?: Order
  preferenceId?: string
  initPoint?: string
  error?: string
  message?: string
}

// Payment Brick types for direct payment processing
export interface ProcessPaymentRequest {
  // Payment data
  token: string
  paymentMethodId: string
  installments: number
  issuerId?: string
  payer: {
    email: string
    identification?: {
      type: string
      number: string
    }
  }

  // Order data
  externalReference: string
  items: CartItem[]
  customerInfo: CustomerInfo
  shippingAddress: Address
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  couponCode?: string
}

export interface ProcessPaymentResponse {
  success: boolean
  orderId?: string
  paymentId?: string
  status?: PaymentStatus
  statusDetail?: string
  error?: string
  message?: string
}

export interface OrderStorage {
  orders: Omit<Order, 'items'>[]
  currentOrderId?: string
  updatedAt: string
}

// Utility types for order management
export type OrderSummary = Pick<Order, 'id' | 'status' | 'total' | 'createdAt' | 'paymentStatus'>

export interface OrderFilters {
  status?: OrderStatus[]
  paymentStatus?: PaymentStatus[]
  dateRange?: {
    from: Date
    to: Date
  }
  search?: string
}

// Mexican payment method specific types
export interface MexicanPaymentMethods {
  cards: boolean
  bank_transfer: boolean
  ticket: boolean // OXXO, etc.
  account_money: boolean // Mercado Pago wallet
}

export const DEFAULT_MEXICAN_PAYMENT_METHODS: MexicanPaymentMethods = {
  cards: true,
  bank_transfer: true,
  ticket: true,
  account_money: true
}

// Order validation
export interface OrderValidation {
  valid: boolean
  errors: string[]
  warnings?: string[]
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  processing: 'Procesando',
  approved: 'Aprobado',
  rejected: 'Rechazado',
  cancelled: 'Cancelado',
  expired: 'Expirado'
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Pendiente',
  approved: 'Aprobado',
  authorized: 'Autorizado',
  in_process: 'En proceso',
  in_mediation: 'En mediación',
  rejected: 'Rechazado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
  charged_back: 'Contracargo'
}