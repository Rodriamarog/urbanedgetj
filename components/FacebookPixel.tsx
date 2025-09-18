"use client"

import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'

export function FacebookPixelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

    if (pixelId) {
      console.log('🔥 Initializing Facebook Pixel with ID:', pixelId)

      ReactPixel.init(pixelId, undefined, {
        autoConfig: true,
        debug: true, // Always enable debug in development
      })

      // Track page view
      console.log('🔥 Tracking PageView event')
      ReactPixel.pageView()

      // Test if fbq is available
      if (typeof window !== 'undefined' && (window as any).fbq) {
        console.log('✅ Facebook Pixel loaded successfully')
      } else {
        console.log('❌ Facebook Pixel not loaded')
      }
    } else {
      console.log('❌ No Facebook Pixel ID found')
    }
  }, [])

  return <>{children}</>
}

// Export a function to track lead events
export const trackLead = (email: string) => {
  console.log('🔥 Tracking Lead event for:', email)

  ReactPixel.track('Lead', {
    content_category: 'F1 Racing Jackets',
    content_name: 'Urban Edge TJ Waitlist',
    email_address: email,
    currency: 'MXN',
    value: 0,
  })

  // Also check if the event was sent
  setTimeout(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      console.log('✅ Lead event sent via Facebook Pixel')
    } else {
      console.log('❌ Facebook Pixel not available for Lead tracking')
    }
  }, 100)
}

// Export a function to track custom events
export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  ReactPixel.trackCustom(eventName, parameters)
}