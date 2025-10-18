import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { FacebookPixelProvider } from "../components/FacebookPixel"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "./components-store/Header"
import { Footer } from "./components-store/Footer"
import { CartProvider } from "@/lib/context/CartContext"
import { WishlistProvider } from "@/lib/context/WishlistContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Urban Edge TJ Store - Premium Streetwear Mexicano",
  description: "Tienda oficial de Urban Edge TJ - Ropa urbana premium, chaquetas F1, hoodies y streetwear exclusivo mexicano",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <FacebookPixelProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1">
                  <Suspense fallback={null}>{children}</Suspense>
                </main>
                <Footer />
              </div>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </FacebookPixelProvider>
        <Analytics />
      </body>
    </html>
  )
}
