"use client"

import React, { useEffect, ReactNode } from 'react'
import { initMercadoPago } from '@mercadopago/sdk-react'

interface MercadoPagoProviderProps {
  children: ReactNode
}

export const MercadoPagoProvider: React.FC<MercadoPagoProviderProps> = ({ children }) => {
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY

    if (publicKey && publicKey !== 'your_public_key_here') {
      initMercadoPago(publicKey, {
        locale: 'es-MX' // Mexico Spanish
      })
    } else {
      console.warn('MercadoPago public key not configured. Payment functionality will be limited.')
    }
  }, [])

  return <>{children}</>
}