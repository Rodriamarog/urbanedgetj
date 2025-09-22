import React from "react"
import {
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react"

export default function ProductFeatures() {
  return (
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
  )
}