import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const trackingNumber = searchParams.get('trackingNumber')

  if (!trackingNumber) {
    return NextResponse.json(
      { error: 'Tracking number is required' },
      { status: 400 }
    )
  }

  try {
    // Use AfterShip API for universal tracking (supports 1000+ carriers worldwide)
    // Alternative: Use 17track.net API which is free and supports most carriers
    // For now, we'll return mock data that simulates real tracking
    // You can integrate with AfterShip or 17track later with your API key

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate realistic mock tracking data
    const now = new Date()
    const dayInMs = 24 * 60 * 60 * 1000

    const mockData = {
      success: true,
      tracking: {
        number: trackingNumber,
        status: 'En tránsito',
        carrier: 'Envío Internacional',
        estimatedDelivery: new Date(now.getTime() + 7 * dayInMs).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        currentLocation: 'Centro de Distribución - México',
        events: [
          {
            date: now.toISOString(),
            status: 'En tránsito',
            location: 'Centro de Distribución - Ciudad de México',
            description: 'Tu paquete está en camino a su destino final'
          },
          {
            date: new Date(now.getTime() - 1 * dayInMs).toISOString(),
            status: 'En ruta',
            location: 'Hub Regional - Guadalajara',
            description: 'Paquete en tránsito hacia tu ciudad'
          },
          {
            date: new Date(now.getTime() - 3 * dayInMs).toISOString(),
            status: 'Liberado de aduana',
            location: 'Aduana - Ciudad de México',
            description: 'Paquete procesado y liberado de aduana mexicana'
          },
          {
            date: new Date(now.getTime() - 5 * dayInMs).toISOString(),
            status: 'Llegó a México',
            location: 'Aduana - Ciudad de México',
            description: 'Paquete arribó al país y está en proceso de revisión aduanal'
          },
          {
            date: new Date(now.getTime() - 8 * dayInMs).toISOString(),
            status: 'En tránsito internacional',
            location: 'En vuelo internacional',
            description: 'Paquete en tránsito desde el país de origen'
          },
          {
            date: new Date(now.getTime() - 12 * dayInMs).toISOString(),
            status: 'Enviado',
            location: 'Almacén de origen',
            description: 'Tu pedido ha sido enviado y está en camino'
          },
          {
            date: new Date(now.getTime() - 13 * dayInMs).toISOString(),
            status: 'Preparando envío',
            location: 'Almacén de origen',
            description: 'Tu pedido está siendo preparado para envío'
          },
          {
            date: new Date(now.getTime() - 14 * dayInMs).toISOString(),
            status: 'Pedido confirmado',
            location: 'Urban Edge TJ',
            description: 'Tu pedido ha sido confirmado y procesado'
          }
        ]
      }
    }

    return NextResponse.json(mockData)

    /*
    // REAL IMPLEMENTATION EXAMPLE using AfterShip API
    // Uncomment and add your AfterShip API key to use this

    const aftershipApiKey = process.env.AFTERSHIP_API_KEY

    if (!aftershipApiKey) {
      // Return mock data if no API key
      return NextResponse.json(mockData)
    }

    const response = await fetch(`https://api.aftership.com/v4/trackings/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'aftership-api-key': aftershipApiKey,
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tracking data')
    }

    const data = await response.json()
    const tracking = data.data?.tracking

    if (!tracking) {
      return NextResponse.json(
        { error: 'Tracking number not found' },
        { status: 404 }
      )
    }

    // Transform AfterShip data to our format
    return NextResponse.json({
      success: true,
      tracking: {
        number: trackingNumber,
        status: translateStatus(tracking.tag),
        carrier: tracking.slug || 'Envío Internacional',
        estimatedDelivery: tracking.expected_delivery,
        currentLocation: tracking.checkpoints?.[0]?.location || 'En tránsito',
        events: tracking.checkpoints?.map((checkpoint: any) => ({
          date: checkpoint.checkpoint_time,
          status: translateStatus(checkpoint.tag),
          location: checkpoint.location || checkpoint.city,
          description: checkpoint.message
        })) || []
      }
    })
    */

  } catch (error) {
    console.error('Tracking API error:', error)
    return NextResponse.json(
      { error: 'No se pudo obtener la información de rastreo. Por favor intenta de nuevo más tarde.' },
      { status: 500 }
    )
  }
}

// Helper function to translate status codes to Spanish
function translateStatus(status: string): string {
  const statusMap: { [key: string]: string } = {
    'InfoReceived': 'Información recibida',
    'InTransit': 'En tránsito',
    'OutForDelivery': 'En ruta de entrega',
    'AttemptFail': 'Intento de entrega fallido',
    'Delivered': 'Entregado',
    'Exception': 'Excepción',
    'Expired': 'Expirado',
    'Pending': 'Pendiente'
  }

  return statusMap[status] || status
}
