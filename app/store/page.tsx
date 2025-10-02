"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingBag,
  Star,
  Crown,
  Zap,
  Truck,
  Shield,
  ArrowRight,
  TrendingUp
} from "lucide-react"

const products = [
  {
    id: "ferrari-jacket",
    slug: "chaqueta-f1-ferrari",
    name: "Chaqueta F1 Ferrari",
    price: 1999,
    basePrice: 1723.28,
    ivaPercentage: 16,
    image: "/ferrari/female/female-model-1.png",
    productImage: "/ferrari-black-front.png",
    category: "Mujer",
    brand: "Ferrari",
    gender: "female"
  },
  {
    id: "redbull-jacket",
    slug: "chaqueta-red-bull-racing",
    name: "Chaqueta Red Bull Racing",
    price: 1999,
    basePrice: 1723.28,
    ivaPercentage: 16,
    image: "/redbull/female/female-1.png",
    productImage: "/redbull-front.png",
    category: "Mujer",
    brand: "Red Bull",
    gender: "female"
  }
]

const brandValues = [
  {
    icon: Crown,
    title: "Calidad Premium",
    description: "Materiales de la más alta calidad seleccionados especialmente"
  },
  {
    icon: Star,
    title: "Diseños Exclusivos",
    description: "Creaciones únicas que no encontrarás en ningún otro lugar"
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "Envío gratuito en compras mayores a $1,500 MXN"
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "30 días de garantía en todos nuestros productos"
  }
]

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<"Todos" | "Hombre" | "Mujer">("Todos")

  const filteredProducts = products

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  URBAN EDGE
                  <span className="block text-primary">STREETWEAR</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  Descubre nuestra colección exclusiva de ropa urbana premium.
                  Diseños únicos que definen tu estilo en las calles.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  asChild
                >
                  <Link href="/store/products">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Explorar Productos
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">1K+</div>
                  <div className="text-sm text-muted-foreground">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.8★</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">🇲🇽</div>
                  <div className="text-sm text-muted-foreground">Envío Gratis</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/belinda-ferrari-2.png"
                  alt="Urban Edge TJ Streetwear"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Floating Price Card */}
                <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 bg-background/90 backdrop-blur-sm rounded-md md:rounded-lg p-2 md:p-4 shadow-lg max-w-[160px] md:max-w-none">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-6 h-6 md:w-12 md:h-12 bg-primary rounded md:rounded-lg flex items-center justify-center">
                      <Crown className="h-3 w-3 md:h-6 md:w-6 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-foreground text-xs md:text-base truncate">Chaqueta F1 Ferrari</div>
                      <div className="text-sm md:text-lg font-bold text-foreground">$1,999</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary mr-2" />
              <Badge variant="outline" className="border-primary text-primary">
                Productos Destacados
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Chaquetas F1 Racing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Colección exclusiva de chaquetas F1 para hombre y mujer. Diseños Ferrari y Red Bull Racing.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-1 w-full px-1 md:gap-4 md:px-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/store/products/${product.slug}?gender=female`} className="block h-full">
                <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 py-0 flex flex-col h-full cursor-pointer">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={500}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  <div className="p-3 md:p-6 flex flex-col flex-1">
                    {/* Title - Fixed height for up to 2 lines */}
                    <h3 className="font-semibold text-lg text-foreground mb-2 min-h-[3.5rem] flex items-start leading-tight">
                      {product.name}
                    </h3>

                    {/* Description - Fixed height */}
                    <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem] flex items-start leading-tight">
                      Chaqueta F1 premium con diseño auténtico
                    </p>

                    {/* Price - Fixed height */}
                    <div className="mb-4 min-h-[2rem] flex items-center">
                      <div className="text-2xl font-bold text-foreground">
                        ${product.price.toLocaleString()} MXN
                      </div>
                    </div>

                    {/* Button - Pushed to bottom */}
                    <div className="mt-auto">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground pointer-events-none"
                      >
                        Ver Detalles
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/store/products">
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por Qué Urban Edge TJ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nos comprometemos a ofrecerte la mejor experiencia en streetwear premium mexicano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  )
}