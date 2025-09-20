"use client"

import React from "react"
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

const featuredProducts = [
  {
    id: "f1-ferrari-jacket",
    name: "Chaqueta F1 Ferrari",
    price: "2,899",
    originalPrice: "3,499",
    image: "/ferrari-black-front.png",
    category: "Chaquetas"
  },
  {
    id: "urban-hoodie",
    name: "Hoodie Urban Edge",
    price: "1,299",
    originalPrice: "1,599",
    image: "/male-model-1.png",
    category: "Hoodies"
  },
  {
    id: "street-tee",
    name: "Camiseta Street",
    price: "599",
    originalPrice: "799",
    image: "/female-model-1.png",
    category: "Camisetas"
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit border-primary text-primary">
                  🔥 Streetwear Premium Mexicano
                </Badge>
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
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/store/about">
                    Nuestra Historia
                    <ArrowRight className="ml-2 h-5 w-5" />
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
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Productos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.8★</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
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
                <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Crown className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Chaqueta F1 Ferrari</div>
                      <div className="text-sm text-muted-foreground">Desde $2,899 MXN</div>
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
              Lo Más Popular
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestros productos más vendidos y las últimas incorporaciones a nuestra colección premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={500}
                    className="w-full h-80 object-contain bg-muted group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-foreground">
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href={`/store/products/${product.id}`}>
                      Ver Detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Únete a la Revolución Streetwear
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Sé parte de la comunidad Urban Edge TJ y recibe acceso exclusivo a nuevos lanzamientos,
                ofertas especiales y contenido premium.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                  asChild
                >
                  <Link href="/store/products">
                    <Zap className="mr-2 h-5 w-5" />
                    Comprar Ahora
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link href="/">
                    Lista de Espera F1
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}