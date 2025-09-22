"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Ruler } from "lucide-react"

import { ProductSize } from "@/lib/types/product"

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: string | null
  onSizeChange: (size: string) => void
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Talla</label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              <Ruler className="w-3 h-3 mr-1" />
              Guía de tallas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Guía de Tallas</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-medium">Talla</div>
                <div className="font-medium">Pecho (cm)</div>
                <div className="font-medium">Largo (cm)</div>
                <div className="font-medium">Manga (cm)</div>

                <div>XS</div><div>88-92</div><div>65</div><div>61</div>
                <div>S</div><div>92-96</div><div>67</div><div>63</div>
                <div>M</div><div>96-100</div><div>69</div><div>65</div>
                <div>L</div><div>100-104</div><div>71</div><div>67</div>
                <div>XL</div><div>104-108</div><div>73</div><div>69</div>
                <div>XXL</div><div>108-112</div><div>75</div><div>71</div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant={selectedSize === size.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSizeChange(size.id)}
            disabled={!size.inStock}
            className={`relative ${!size.inStock ? 'opacity-50' : ''}`}
          >
            {size.name}
            {!size.inStock && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <div className="w-full h-px bg-destructive transform rotate-45" />
              </div>
            )}
          </Button>
        ))}
      </div>

      {selectedSize && (
        <p className="text-xs text-muted-foreground">
          Talla seleccionada: {sizes.find(s => s.id === selectedSize)?.label}
        </p>
      )}
    </div>
  )
}