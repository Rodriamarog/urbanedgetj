"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq: any;
  }
}

export function FacebookPixelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

    if (pixelId) {
      console.log('🔥 Initializing Facebook Pixel with ID:', pixelId)

      // Initialize Facebook Pixel manually without react-facebook-pixel
      const script = document.createElement('script')
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `
      document.head.appendChild(script)

      // Add noscript fallback
      const noscript = document.createElement('noscript')
      const img = document.createElement('img')
      img.height = 1
      img.width = 1
      img.style.display = 'none'
      img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`
      noscript.appendChild(img)
      document.head.appendChild(noscript)

      console.log('🔥 Tracking PageView event')

      // Test if fbq is available
      setTimeout(() => {
        if (window.fbq) {
          console.log('✅ Facebook Pixel loaded successfully')
        } else {
          console.log('❌ Facebook Pixel not loaded')
        }
      }, 1000)
    } else {
      console.log('❌ No Facebook Pixel ID found')
    }
  }, [])

  return <>{children}</>
}

// Export a function to track lead events
export const trackLead = (email: string) => {
  // Only run on client side
  if (typeof window === 'undefined' || !window.fbq) return

  console.log('🔥 Tracking Lead event for:', email)

  window.fbq('track', 'Lead', {
    content_category: 'F1 Racing Jackets',
    content_name: 'Urban Edge TJ Waitlist',
    email_address: email,
    currency: 'MXN',
    value: 0,
  })

  console.log('✅ Lead event sent via Facebook Pixel')
}

// Export a function to track custom events
export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Only run on client side
  if (typeof window === 'undefined' || !window.fbq) return

  window.fbq('trackCustom', eventName, parameters)
}