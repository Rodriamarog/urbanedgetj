"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Menu,
  X,
  Home,
  Package,
  Mail,
  Truck
} from "lucide-react"
import { useCart } from "@/lib/context/CartContext"

const navigationItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Productos", href: "/products", icon: Package },
  { name: "Rastrear Pedido", href: "/tracking", icon: Truck },
  { name: "Contacto", href: "/contact", icon: Mail },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { state } = useCart()
  const cartItemCount = state.itemCount

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt="Urban Edge TJ"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-foreground tracking-tight">
            URBAN EDGE TJ
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Cart and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 hover:bg-accent"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" data-cart-icon />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-green-500 hover:bg-green-600 text-white border-green-500"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/logo.jpg"
                      alt="Urban Edge TJ"
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span className="font-bold text-foreground">URBAN EDGE TJ</span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 px-2 rounded-md hover:bg-accent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile Cart Link */}
                <div className="mt-8 pt-8 border-t border-border">
                  <Link
                    href="/cart"
                    className="flex items-center space-x-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 px-2 rounded-md hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Carrito</span>
                    {cartItemCount > 0 && (
                      <Badge className="ml-auto bg-green-500 hover:bg-green-600 text-white border-green-500">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}