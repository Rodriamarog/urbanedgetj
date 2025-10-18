"use client"

import type React from "react"
import Link from "next/link"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CheckCircle, Star, Zap, Crown, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { trackLead } from "../../components/FacebookPixel"

export default function F1WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)

  // Dynamic counter starting at 10, +1 every hour
  const getWaitlistCount = () => {
    const startDate = new Date('2025-09-18T00:00:00Z') // Launch date
    const now = new Date()
    const hoursPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60))
    return Math.max(10, 10 + hoursPassed) // Start at 10, add 1 per hour
  }

  const [count, setCount] = useState(getWaitlistCount())

  const images = [
    { src: "/belinda-ferrari-2.png", alt: "Belinda con Chaqueta F1 Ferrari" },
    { src: "/ferrari-black-front.png", alt: "Chaqueta F1 Ferrari Negra" },
    { src: "/male-model-1.png", alt: "Modelo Masculino con Chaqueta F1" },
    { src: "/female-model-1.png", alt: "Modelo Femenino con Chaqueta F1" },
    { src: "/male-model-2.png", alt: "Modelo Masculino con Chaqueta F1" },
    { src: "/female-model-2.png", alt: "Modelo Femenino con Chaqueta F1" },
    { src: "/male-model-3.png", alt: "Modelo Masculino con Chaqueta F1" },
    { src: "/female-model-3.png", alt: "Modelo Femenino con Chaqueta F1" },
    { src: "/male-model-4.png", alt: "Modelo Masculino con Chaqueta F1" },
    { src: "/female-model-4.png", alt: "Modelo Femenino con Chaqueta F1" },
    { src: "/male-model-5.png", alt: "Modelo Masculino con Chaqueta F1" },
    { src: "/female-model-5.png", alt: "Modelo Femenino con Chaqueta F1" },
    { src: "/male-model-6.png", alt: "Modelo Masculino con Chaqueta F1" },
    { src: "/male-model-7.png", alt: "Modelo Masculino con Chaqueta F1" }
  ]

  // Auto-rotate carousel
  useEffect(() => {
    if (isCarouselPaused) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 6000) // Change image every 6 seconds

    return () => clearInterval(interval)
  }, [images.length, isCarouselPaused])

  // Update counter every minute to keep it current
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(getWaitlistCount())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const pauseCarousel = () => {
    setIsCarouselPaused(true)
    // Resume automatic rotation after 20 seconds
    setTimeout(() => {
      setIsCarouselPaused(false)
    }, 20000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    pauseCarousel()
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    pauseCarousel()
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
    pauseCarousel()
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!validateEmail(email)) {
      setError("Por favor ingresa un email válido")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Track Facebook Pixel Lead event
        trackLead(email)

        setIsSubmitted(true)
        setSuccessMessage(data.message)
        setCount((prev) => prev + 1)
      } else {
        setError(data.error || 'Hubo un error. Por favor intenta de nuevo.')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setError('Error de conexión. Por favor verifica tu internet e intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 sm:p-8 text-center bg-card border-border">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">¡Estás dentro!</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">
            ¡Perfecto! Ya tienes acceso prioritario a nuestras chaquetas F1.
          </p>
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 rounded-lg mb-4">
            <p className="text-sm font-medium">Tu código de descuento:</p>
            <p className="text-xl font-bold">{process.env.NEXT_PUBLIC_COUPON_CODE || "URBANEDGE20"}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Usa este código al momento de compra para obtener tu 20% de descuento
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="p-4 sm:p-6 text-center">
        <img
          src="/logo.jpg"
          alt="Urban Edge TJ"
          className="h-12 sm:h-16 mx-auto"
        />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
        <div className="text-center mb-6 sm:mb-8">
          {/* Hero Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-tight text-balance text-black leading-tight">
              F1 RACING JACKETS
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty px-2">
              Experimenta la emoción de la Fórmula 1 con nuestra colección exclusiva de chaquetas racing premium.
            </p>
          </div>

          {/* F1 Jacket Image Carousel */}
          <div className="mb-8 sm:mb-12">
            <div className="relative mx-auto max-w-md sm:max-w-lg">
              <div className="relative overflow-hidden rounded-lg shadow-xl aspect-square">
                <div className="relative w-full h-full">
                  <div
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-200/20 to-transparent"></div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Email Capture Form */}
          <div className="mb-8 sm:mb-12">
            <Card className="max-w-2xl mx-auto p-6 sm:p-8 md:p-12 bg-card border-2 border-primary/20 shadow-2xl">
              <div className="text-center mb-6 sm:mb-8">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
                  UNETE A LA LISTA DE ESPERA
                </h3>
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-full inline-block mb-4 font-bold text-sm sm:text-base">
                  GARANTIZA TU 20% DE DESCUENTO
                </div>
                <p className="text-base sm:text-lg text-muted-foreground mb-4">
                  Sé el primero en obtener tu chaqueta F1 premium con descuento exclusivo
                </p>

                {/* Social Proof Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-2 max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="bg-green-500 rounded-full p-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-green-700 font-medium">
                      ¡Tienes buen gusto! {count}+ personas ya tienen reservado su lugar en la lista de espera
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 sm:h-16 text-base sm:text-lg bg-input border-2 border-border focus:border-primary text-foreground placeholder:text-muted-foreground rounded-lg"
                    disabled={isLoading}
                  />
                  {error && <p className="text-destructive text-sm mt-2 sm:mt-3">{error}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 sm:h-16 text-base sm:text-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 font-bold tracking-wide transition-colors duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "CONFIRMANDO..." : "CONFIRMAR"}
                </Button>
              </form>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">Recibirás tu cupón de descuento del 20% inmediatamente</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Acceso prioritario al lanzamiento</p>
              </div>
            </Card>
          </div>


          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-2">
            <div className="text-center py-4 sm:py-0">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Calidad Premium</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Materiales de la más alta calidad</p>
            </div>
            <div className="text-center py-4 sm:py-0">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Diseños Exclusivos</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Edición limitada inspirada en F1</p>
            </div>
            <div className="text-center py-4 sm:py-0">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">20% de Descuento</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Cupón exclusivo para miembros de la lista de espera
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 sm:py-8 border-t border-border px-4">
        <div className="mb-3">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors duration-200 underline decoration-dotted"
          >
            Explorar Tienda Completa →
          </Link>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm">© 2024 Urban Edge TJ. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
