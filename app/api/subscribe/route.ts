import { NextRequest, NextResponse } from 'next/server'

interface ConvertKitResponse {
  subscription?: {
    id: number
    state: string
    email_address: string
  }
  error?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get environment variables - focus on API Secret for V3
    const apiSecret = process.env.CONVERTKIT_API_KEY_V3_SECRET
    const formId = process.env.CONVERTKIT_FORM_ID

    if (!apiSecret || !formId) {
      console.error('Missing ConvertKit configuration. Need API Secret and Form ID.')
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      )
    }

    console.log(`Using ConvertKit API Secret: ${apiSecret.substring(0, 10)}... with Form ID: ${formId}`)

    // Try the public form submission endpoint first
    let convertKitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY_V3, // Try public API key first
          email: email,
        }),
      }
    )

    // If that fails, try with API secret
    if (!convertKitResponse.ok) {
      console.log('Public API failed, trying with API secret...')
      convertKitResponse = await fetch(
        `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_secret: apiSecret,
            email: email,
          }),
        }
      )
    }

    const data: ConvertKitResponse = await convertKitResponse.json()

    // Log the full response for debugging
    console.log('ConvertKit Response Status:', convertKitResponse.status)
    console.log('ConvertKit Response Data:', JSON.stringify(data, null, 2))

    if (!convertKitResponse.ok) {
      console.error('ConvertKit API error:', data)

      // Handle duplicate subscription gracefully
      if (data.message?.includes('already subscribed')) {
        return NextResponse.json({
          success: true,
          message: 'Ya estás suscrito! Revisa tu email para el código de descuento.',
          couponCode: process.env.NEXT_PUBLIC_COUPON_CODE || 'URBANEDGE20'
        })
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    // Log successful subscription details
    console.log('Email successfully subscribed:', email)
    console.log('Subscription ID:', data.subscription?.id)
    console.log('Subscription State:', data.subscription?.state)

    // Success response
    return NextResponse.json({
      success: true,
      message: '¡Suscripción exitosa! Ya tienes acceso prioritario y tu código de descuento.',
      couponCode: process.env.NEXT_PUBLIC_COUPON_CODE || 'URBANEDGE20',
      subscriptionId: data.subscription?.id
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}