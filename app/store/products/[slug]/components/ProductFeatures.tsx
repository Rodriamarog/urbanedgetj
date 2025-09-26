import React from "react"
import { Card } from "@/components/ui/card"
import {
  Truck,
  Shield,
  RefreshCw,
  Star,
} from "lucide-react"

export default function ProductFeatures() {
  const placeholderReviews = [
    {
      id: 1,
      name: "Carlos Mendoza",
      avatar: "/placeholder-avatar-1.jpg",
      rating: 5,
      date: "Hace 2 semanas",
      review: "Excelente calidad de la chaqueta Ferrari. Los materiales se sienten premium y el ajuste es perfecto. Definitivamente recomiendo Urban Edge TJ.",
      verified: true
    },
    {
      id: 2,
      name: "María González",
      avatar: "/placeholder-avatar-2.jpg",
      rating: 5,
      date: "Hace 1 mes",
      review: "Me encanta mi chaqueta Red Bull Racing. El diseño es auténtico y llega súper rápido. Perfecta para el streetwear mexicano.",
      verified: true
    },
    {
      id: 3,
      name: "Diego Ramírez",
      avatar: "/placeholder-avatar-3.jpg",
      rating: 4,
      date: "Hace 3 semanas",
      review: "Muy buena chaqueta, la tela es resistente y el diseño está increíble. El único detalle es que tardó un poco más de lo esperado en llegar.",
      verified: false
    }
  ]

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6">
        <div className="text-center">
          <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Envío Gratis</p>
          <p className="text-xs text-muted-foreground">Compras +$1,500</p>
        </div>
        <div className="text-center">
          <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Garantía</p>
          <p className="text-xs text-muted-foreground">30 días</p>
        </div>
        <div className="text-center">
          <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Devoluciones</p>
          <p className="text-xs text-muted-foreground">Fáciles</p>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Reseñas de Clientes</h3>
          <div className="flex items-center space-x-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">4.8</span>
          </div>
        </div>

        <div className="space-y-4">
          {placeholderReviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{review.name}</h4>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>

                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.review}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}