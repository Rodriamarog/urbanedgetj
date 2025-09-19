import type React from "react"
import type { Metadata } from "next"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { CartProvider } from "@/lib/context/CartContext"
import { WishlistProvider } from "@/lib/context/WishlistContext"

export const metadata: Metadata = {
  title: "Urban Edge TJ Store - Premium Streetwear Mexicano",
  description: "Tienda oficial de Urban Edge TJ - Ropa urbana premium, chaquetas F1, hoodies y streetwear exclusivo mexicano",
}

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}