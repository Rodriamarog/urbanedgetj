"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LinkButton } from "@/components/ui/link-button"
import { Search, Home, Package, ArrowLeft } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-12">
          {/* 404 Illustration */}
          <div className="text-8xl mb-6">🔍</div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Producto No Encontrado
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Lo sentimos, el producto que buscas no existe o ha sido discontinuado.
            Te invitamos a explorar nuestras otras increíbles opciones.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkButton size="lg" href="/store/products">
              <Package className="w-5 h-5 mr-2" />
              Ver Todos los Productos
            </LinkButton>

            <LinkButton variant="outline" size="lg" href="/store">
              <Home className="w-5 h-5 mr-2" />
              Ir a la Tienda
            </LinkButton>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              ¿Qué puedes hacer?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex flex-col items-center space-y-2">
                <Search className="w-8 h-8 text-primary" />
                <span className="font-medium">Buscar Productos</span>
                <span>Utiliza nuestro buscador para encontrar lo que necesitas</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Package className="w-8 h-8 text-primary" />
                <span className="font-medium">Explorar Categorías</span>
                <span>Navega por nuestras diferentes categorías de productos</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Home className="w-8 h-8 text-primary" />
                <span className="font-medium">Página Principal</span>
                <span>Descubre nuestros productos destacados y ofertas</span>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mt-8">
            <h4 className="text-md font-medium text-foreground mb-4">
              Categorías Populares
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <LinkButton variant="outline" size="sm" href="/store/products?category=jackets">
                Chaquetas
              </LinkButton>
              <LinkButton variant="outline" size="sm" href="/store/products?category=hoodies">
                Hoodies
              </LinkButton>
              <LinkButton variant="outline" size="sm" href="/store/products?category=t-shirts">
                Camisetas
              </LinkButton>
              <LinkButton variant="outline" size="sm" href="/store/products?category=accessories">
                Accesorios
              </LinkButton>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="mt-8">
          <Button variant="ghost" onClick={() => history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Regresar
          </Button>
        </div>
      </div>
    </div>
  )
}