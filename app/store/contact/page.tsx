"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Facebook,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  ExternalLink
} from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Contáctanos
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Ponte en contacto con nosotros a través de cualquiera de estos canales.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Email Contact */}
        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-4">
            Correo Electrónico
          </h3>
          <p className="text-muted-foreground text-center mb-6">
            Envíanos un mensaje y te responderemos lo antes posible.
          </p>
          <div className="text-center">
            <Button
              className="w-full"
              onClick={() => window.open('mailto:urbanedgetj@gmail.com', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" />
              urbanedgetj@gmail.com
            </Button>
          </div>
        </Card>

        {/* Facebook Contact */}
        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center">
              <Facebook className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-4">
            Facebook
          </h3>
          <p className="text-muted-foreground text-center mb-6">
            Síguenos y envíanos un mensaje directo en Facebook.
          </p>
          <div className="text-center">
            <Button
              className="w-full bg-[#1877F2] hover:bg-[#166FE5]"
              onClick={() => window.open('https://www.facebook.com/profile.php?id=61554508376140', '_blank')}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Visitar Página
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Additional Info */}
      <Card className="p-8 bg-muted/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Response Time */}
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="font-semibold mb-2">Tiempo de Respuesta</h4>
            <p className="text-sm text-muted-foreground">
              Respondemos en menos de 24 horas
            </p>
          </div>

          {/* Location */}
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="font-semibold mb-2">Ubicación</h4>
            <p className="text-sm text-muted-foreground">
              Tijuana, Baja California
            </p>
          </div>

          {/* Support */}
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <h4 className="font-semibold mb-2">Soporte</h4>
            <p className="text-sm text-muted-foreground">
              Lun - Vie: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">¿Cuál es el tiempo de entrega?</h3>
            <p className="text-muted-foreground">
              Los envíos dentro de México tardan entre 14-21 días hábiles dependiendo de tu ubicación.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">¿Ofrecen envío gratis?</h3>
            <p className="text-muted-foreground">
              Sí, ofrecemos envío gratis en compras mayores a $1,500 MXN en todo México.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">¿Puedo cambiar o devolver un producto?</h3>
            <p className="text-muted-foreground">
              Tenemos una política de devolución de 30 días. El producto debe estar en perfectas condiciones.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}