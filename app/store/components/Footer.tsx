import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight
} from "lucide-react"

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/urbanedgetj",
    icon: Instagram,
    color: "hover:text-pink-500"
  },
  {
    name: "Facebook",
    href: "https://facebook.com/urbanedgetj",
    icon: Facebook,
    color: "hover:text-blue-500"
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@urbanedgetj",
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    color: "hover:text-black dark:hover:text-white"
  },
]

const quickLinks = [
  { name: "Política de Privacidad", href: "/store/privacy" },
  { name: "Términos y Condiciones", href: "/store/terms" },
  { name: "FAQ", href: "/store/faq" },
]

const productCategories = [
  { name: "Chaquetas F1", href: "/store/products?category=jackets" },
  { name: "Hoodies", href: "/store/products?category=hoodies" },
  { name: "Camisetas", href: "/store/products?category=t-shirts" },
  { name: "Accesorios", href: "/store/products?category=accessories" },
]

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.jpg"
                alt="Urban Edge TJ"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-lg font-bold text-foreground">
                URBAN EDGE TJ
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Streetwear urbano premium mexicano. Diseños exclusivos que definen tu estilo único en las calles.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`text-muted-foreground ${social.color} transition-colors duration-200`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Síguenos en ${social.name}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Productos
            </h3>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Soporte
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Contacto
            </h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Tijuana, Baja California</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:urbanedgetj@gmail.com" className="hover:text-foreground transition-colors">
                  urbanedgetj@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Lun - Vie: 9:00 - 18:00</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">
                Newsletter
              </h4>
              <p className="text-xs text-muted-foreground">
                Recibe ofertas exclusivas y lanzamientos
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="h-9 text-sm"
                />
                <Button size="sm" className="h-9 px-3">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs text-muted-foreground">
              © 2024 Urban Edge TJ. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>🇲🇽 Hecho en México</span>
              <span>•</span>
              <span>Streetwear Premium</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}