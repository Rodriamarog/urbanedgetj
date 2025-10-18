"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Search,
  ArrowLeft,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Loader2
} from "lucide-react"

interface TrackingEvent {
  date: string
  status: string
  location: string
  description: string
}

interface TrackingData {
  number: string
  status: string
  carrier?: string
  estimatedDelivery?: string
  currentLocation?: string
  events: TrackingEvent[]
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Por favor ingresa un número de rastreo")
      return
    }

    setIsTracking(true)
    setError(null)
    setTrackingData(null)

    try {
      const response = await fetch(`/api/tracking?trackingNumber=${encodeURIComponent(trackingNumber.trim())}`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Error al obtener información de rastreo')
      }

      setTrackingData(data.tracking)
    } catch (err: any) {
      setError(err.message || 'No se pudo obtener la información de rastreo. Por favor verifica el número e intenta de nuevo.')
    } finally {
      setIsTracking(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack()
    }
  }

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('entregado') || statusLower.includes('delivered')) {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    } else if (statusLower.includes('tránsito') || statusLower.includes('transit')) {
      return <Truck className="w-5 h-5 text-blue-600" />
    } else {
      return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('entregado') || statusLower.includes('delivered')) {
      return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900'
    } else if (statusLower.includes('tránsito') || statusLower.includes('transit')) {
      return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900'
    } else {
      return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Package className="w-8 h-8 mr-3" />
            Rastrea tu Pedido
          </h1>
          <p className="text-muted-foreground mt-2">
            Ingresa tu número de rastreo para verificar el estado de tu paquete
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Inicio
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tracking Form */}
        <Card className="p-6 md:p-8 mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="trackingNumber" className="text-lg font-semibold">
                Número de Rastreo
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Puedes encontrar tu número de rastreo en el correo de confirmación de envío
              </p>
              <div className="flex gap-3">
                <Input
                  id="trackingNumber"
                  type="text"
                  placeholder="Ej: 1234567890"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-12 text-lg"
                  disabled={isTracking}
                />
                <Button
                  size="lg"
                  onClick={handleTrack}
                  disabled={!trackingNumber.trim() || isTracking}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isTracking ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Rastrear
                    </>
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card className={`p-6 border-2 ${getStatusColor(trackingData.status)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(trackingData.status)}
                    <h2 className="text-2xl font-bold text-foreground">
                      {trackingData.status}
                    </h2>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Package className="w-4 h-4 mr-2" />
                      <span className="font-medium">Número de rastreo:</span>
                      <span className="ml-2 font-mono">{trackingData.number}</span>
                    </div>
                    {trackingData.currentLocation && (
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-medium">Ubicación actual:</span>
                        <span className="ml-2">{trackingData.currentLocation}</span>
                      </div>
                    )}
                    {trackingData.estimatedDelivery && (
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-medium">Entrega estimada:</span>
                        <span className="ml-2">{trackingData.estimatedDelivery}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Tracking Timeline */}
            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                Historial de Envío
              </h3>

              <div className="space-y-4">
                {trackingData.events.map((event, index) => (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index !== trackingData.events.length - 1 && (
                      <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-border" />
                    )}

                    <div className="flex items-start space-x-4">
                      {/* Timeline dot */}
                      <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 z-10 ${
                        index === 0
                          ? 'bg-primary ring-4 ring-primary/20'
                          : 'bg-muted-foreground/30'
                      }`} />

                      {/* Event content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-foreground">{event.status}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('es-MX', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.description}
                        </p>
                        {event.location && (
                          <p className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* How to Track Section (only show if no tracking data) */}
        {!trackingData && (
          <Card className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="w-6 h-6 mr-2" />
              ¿Cómo rastrear tu pedido?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Encuentra tu número de rastreo</h3>
                  <p className="text-sm text-muted-foreground">
                    Revisa tu correo de confirmación de envío. El número de rastreo aparece en el asunto y en el cuerpo del correo.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ingresa el número arriba</h3>
                  <p className="text-sm text-muted-foreground">
                    Copia y pega o escribe tu número de rastreo en el campo de arriba.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Haz clic en "Rastrear"</h3>
                  <p className="text-sm text-muted-foreground">
                    Verás el estado actual de tu paquete y el historial completo de envío.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="font-semibold mb-3">Estados Comunes de Envío</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">En tránsito</p>
                    <p className="text-xs text-muted-foreground">Tu paquete está en camino</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <Truck className="w-5 h-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">En aduana</p>
                    <p className="text-xs text-muted-foreground">Procesándose en aduana mexicana</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Entregado</p>
                    <p className="text-xs text-muted-foreground">Tu paquete ha sido entregado</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Need Help */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            ¿No encuentras tu número de rastreo o tienes problemas?
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">
              Contáctanos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
