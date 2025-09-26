"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ChevronDown,
  ChevronRight,
  Package,
  Truck,
  CreditCard,
  RotateCcw,
  Mail,
  HelpCircle
} from "lucide-react"

const faqCategories = [
  {
    id: "orders",
    title: "Pedidos y Compras",
    icon: Package,
    questions: [
      {
        question: "¿Cómo realizo un pedido?",
        answer: "Puedes realizar un pedido navegando por nuestros productos, seleccionando la talla y color deseado, y agregándolo al carrito. Luego procede al checkout para completar tu compra."
      },
      {
        question: "¿Puedo modificar mi pedido después de realizarlo?",
        answer: "Una vez confirmado el pedido, no es posible modificarlo. Si necesitas hacer cambios, contáctanos inmediatamente a urbanedgetj@gmail.com y haremos nuestro mejor esfuerzo para ayudarte."
      },
      {
        question: "¿Cómo puedo cancelar mi pedido?",
        answer: "Puedes cancelar tu pedido dentro de las primeras 24 horas después de la confirmación. Contáctanos a urbanedgetj@gmail.com con tu número de pedido."
      }
    ]
  },
  {
    id: "shipping",
    title: "Envíos y Entregas",
    icon: Truck,
    questions: [
      {
        question: "¿Cuál es el tiempo de entrega?",
        answer: "Los envíos dentro de México tardan entre 14-21 días hábiles dependiendo de tu ubicación. Te enviaremos un número de seguimiento una vez que tu pedido sea enviado."
      },
      {
        question: "¿Ofrecen envío gratis?",
        answer: "Sí, ofrecemos envío gratis en compras mayores a $1,500 MXN en todo México."
      },
      {
        question: "¿Envían a toda la República Mexicana?",
        answer: "Sí, realizamos envíos a toda la República Mexicana. Los tiempos de entrega pueden variar según la ubicación."
      },
      {
        question: "¿Cómo puedo rastrear mi pedido?",
        answer: "Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento y un enlace para rastrear tu paquete."
      }
    ]
  },
  {
    id: "payment",
    title: "Pagos y Facturación",
    icon: CreditCard,
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal y transferencias bancarias."
      },
      {
        question: "¿Los precios incluyen impuestos?",
        answer: "Sí, todos nuestros precios están expresados en pesos mexicanos (MXN) e incluyen el IVA."
      },
      {
        question: "¿Emiten facturas?",
        answer: "Sí, podemos emitir facturas fiscales. Solicítala al momento de realizar tu pedido o contáctanos después de la compra con tus datos fiscales."
      }
    ]
  },
  {
    id: "returns",
    title: "Devoluciones y Cambios",
    icon: RotateCcw,
    questions: [
      {
        question: "¿Puedo devolver un producto?",
        answer: "Sí, aceptamos devoluciones dentro de los 30 días siguientes a la recepción del producto, siempre que esté en condiciones originales con todas las etiquetas."
      },
      {
        question: "¿Cómo inicio una devolución?",
        answer: "Contáctanos a urbanedgetj@gmail.com con tu número de pedido y el motivo de la devolución. Te enviaremos las instrucciones para el proceso."
      },
      {
        question: "¿Quién paga el envío de devolución?",
        answer: "Si la devolución es por defecto del producto, nosotros cubrimos el costo. Si es por cambio de opinión, el cliente cubre el envío de devolución."
      },
      {
        question: "¿Cuándo recibiré mi reembolso?",
        answer: "Una vez que recibamos y procesemos tu devolución, el reembolso se procesará en 5-10 días hábiles al método de pago original."
      }
    ]
  },
  {
    id: "products",
    title: "Productos",
    icon: HelpCircle,
    questions: [
      {
        question: "¿Cómo sé qué talla elegir?",
        answer: "Recomendamos revisar las medidas de cada producto en la descripción. Si tienes dudas, contáctanos y te ayudaremos a elegir la talla correcta."
      },
      {
        question: "¿Los productos son originales?",
        answer: "Todos nuestros productos son 100% originales y auténticos. Trabajamos directamente con proveedores autorizados."
      },
      {
        question: "¿Cómo cuido mi prenda?",
        answer: "Cada producto incluye instrucciones específicas de cuidado. Generalmente recomendamos lavar a máquina en agua fría y secar al aire libre."
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Encuentra respuestas a las preguntas más comunes sobre nuestros productos,
          envíos, pagos y políticas.
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {faqCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.id} className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-4">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-3">
                {category.questions.map((faq, index) => {
                  const itemId = `${category.id}-${index}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <Collapsible key={index} open={isOpen} onOpenChange={() => toggleItem(itemId)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-left p-4 h-auto border border-border hover:bg-muted/50"
                        >
                          <span className="font-medium text-foreground">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Contact Section */}
      <Card className="mt-12 p-8 bg-muted/50 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-muted-foreground mb-6">
            Si tienes alguna pregunta que no está aquí, no dudes en contactarnos.
            Estamos aquí para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('mailto:urbanedgetj@gmail.com', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Enviar Email
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('https://www.facebook.com/profile.php?id=61554508376140', '_blank')}
            >
              Mensaje en Facebook
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}