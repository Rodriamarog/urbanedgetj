import { Product } from '@/lib/types/product'

export const unifiedProducts: Product[] = [
  // Ferrari Jacket - Unified
  {
    id: 'ferrari-jacket',
    name: 'Chaqueta F1 Ferrari',
    slug: 'chaqueta-f1-ferrari',
    description: 'Chaqueta premium inspirada en la Fórmula 1 con diseño Ferrari auténtico. Confeccionada con materiales de alta calidad que combinan estilo urbano con la pasión por las carreras.',
    shortDescription: 'Chaqueta F1 premium con diseño Ferrari auténtico',
    price: 1999,
    basePrice: 1723.28,
    ivaPercentage: 16,
    category: 'racing',
    subcategory: 'f1',
    images: [
      // Product shots (unisex)
      {
        id: 'ferrari-product-1',
        url: '/ferrari/ferrari-black.png',
        alt: 'Chaqueta F1 Ferrari - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1,
        gender: 'unisex'
      },
      // Male model shots
      {
        id: 'ferrari-male-1',
        url: '/ferrari/male/male-model-1.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 2,
        gender: 'male'
      },
      {
        id: 'ferrari-male-2',
        url: '/ferrari/male/male-model-2.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 3,
        gender: 'male'
      },
      {
        id: 'ferrari-male-3',
        url: '/ferrari/male/male-model-3.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 4,
        gender: 'male'
      },
      // Female model shots
      {
        id: 'ferrari-female-1',
        url: '/ferrari/female/female-model-1.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 5,
        gender: 'female'
      },
      {
        id: 'ferrari-female-2',
        url: '/ferrari/female/female-model-2.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 6,
        gender: 'female'
      },
      {
        id: 'ferrari-female-3',
        url: '/ferrari/female/female-model-3.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 7,
        gender: 'female'
      }
    ],
    sizes: [
      // Male sizes
      { id: 's-male', name: 'S', label: 'Chica (Hombre)', inStock: true, stockQuantity: 15, gender: 'male' },
      { id: 'm-male', name: 'M', label: 'Mediana (Hombre)', inStock: true, stockQuantity: 20, gender: 'male' },
      { id: 'l-male', name: 'L', label: 'Grande (Hombre)', inStock: true, stockQuantity: 18, gender: 'male' },
      { id: 'xl-male', name: 'XL', label: 'Extra Grande (Hombre)', inStock: true, stockQuantity: 12, gender: 'male' },
      { id: 'xxl-male', name: 'XXL', label: 'Doble Extra Grande (Hombre)', inStock: true, stockQuantity: 6, gender: 'male' },
      // Female sizes
      { id: 'xs-female', name: 'XS', label: 'Extra Chica (Mujer)', inStock: true, stockQuantity: 8, gender: 'female' },
      { id: 's-female', name: 'S', label: 'Chica (Mujer)', inStock: true, stockQuantity: 15, gender: 'female' },
      { id: 'm-female', name: 'M', label: 'Mediana (Mujer)', inStock: true, stockQuantity: 20, gender: 'female' },
      { id: 'l-female', name: 'L', label: 'Grande (Mujer)', inStock: true, stockQuantity: 18, gender: 'female' },
      { id: 'xl-female', name: 'XL', label: 'Extra Grande (Mujer)', inStock: true, stockQuantity: 12, gender: 'female' }
    ],
    colors: [
      { id: 'black', name: 'Black', hex: '#000000', label: 'Negro' }
    ],
    materials: ['Poliéster Premium', 'Microfibra', 'Forro Interior Suave'],
    careInstructions: [
      'Lavar a máquina en agua fría',
      'No usar lejía',
      'Secar al aire libre',
      'Planchar a temperatura baja'
    ],
    features: [
      'Diseño Ferrari auténtico',
      'Cremallera YKK de alta calidad',
      'Bolsillos funcionales',
      'Ajuste ergonómico',
      'Resistente al viento'
    ],
    isBestseller: true,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockQuantity: 144, // Combined stock
    sku: 'UE-FERRARI-001',
    tags: ['f1', 'ferrari', 'racing', 'premium', 'chaqueta'],
    seoTitle: 'Chaqueta F1 Ferrari Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta F1 Ferrari unisex. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-09-19T00:00:00.000Z'
  },

  // Red Bull Jacket - Unified
  {
    id: 'redbull-jacket',
    name: 'Chaqueta Red Bull Racing',
    slug: 'chaqueta-red-bull-racing',
    description: 'Chaqueta premium inspirada en el equipo Red Bull Racing de Fórmula 1. Diseño auténtico que combina la velocidad y la adrenalina del automovilismo con el estilo urbano más sofisticado.',
    shortDescription: 'Chaqueta Red Bull Racing premium auténtica',
    price: 1999,
    basePrice: 1723.28,
    ivaPercentage: 16,
    category: 'racing',
    subcategory: 'f1',
    images: [
      // Product shots (unisex)
      {
        id: 'redbull-product-1',
        url: '/redbull-front.png',
        alt: 'Chaqueta Red Bull Racing - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1,
        gender: 'unisex'
      },
      // Male model shots
      {
        id: 'redbull-male-1',
        url: '/redbull/male/male-1.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 2,
        gender: 'male'
      },
      {
        id: 'redbull-male-2',
        url: '/redbull/male/male-2.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 3,
        gender: 'male'
      },
      {
        id: 'redbull-male-3',
        url: '/redbull/male/male-3.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 4,
        gender: 'male'
      },
      // Female model shots
      {
        id: 'redbull-female-1',
        url: '/redbull/female/female-1.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 5,
        gender: 'female'
      },
      {
        id: 'redbull-female-2',
        url: '/redbull/female/female-2.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 6,
        gender: 'female'
      },
      {
        id: 'redbull-female-3',
        url: '/redbull/female/female-3.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 7,
        gender: 'female'
      }
    ],
    sizes: [
      // Male sizes
      { id: 's-male', name: 'S', label: 'Chica (Hombre)', inStock: true, stockQuantity: 12, gender: 'male' },
      { id: 'm-male', name: 'M', label: 'Mediana (Hombre)', inStock: true, stockQuantity: 18, gender: 'male' },
      { id: 'l-male', name: 'L', label: 'Grande (Hombre)', inStock: true, stockQuantity: 15, gender: 'male' },
      { id: 'xl-male', name: 'XL', label: 'Extra Grande (Hombre)', inStock: true, stockQuantity: 10, gender: 'male' },
      { id: 'xxl-male', name: 'XXL', label: 'Doble Extra Grande (Hombre)', inStock: true, stockQuantity: 5, gender: 'male' },
      // Female sizes
      { id: 'xs-female', name: 'XS', label: 'Extra Chica (Mujer)', inStock: true, stockQuantity: 6, gender: 'female' },
      { id: 's-female', name: 'S', label: 'Chica (Mujer)', inStock: true, stockQuantity: 14, gender: 'female' },
      { id: 'm-female', name: 'M', label: 'Mediana (Mujer)', inStock: true, stockQuantity: 16, gender: 'female' },
      { id: 'l-female', name: 'L', label: 'Grande (Mujer)', inStock: true, stockQuantity: 12, gender: 'female' },
      { id: 'xl-female', name: 'XL', label: 'Extra Grande (Mujer)', inStock: true, stockQuantity: 8, gender: 'female' }
    ],
    colors: [
      { id: 'navy', name: 'Navy', hex: '#1E3A8A', label: 'Azul Marino' }
    ],
    materials: ['Poliéster Premium', 'Microfibra', 'Forro Interior Suave'],
    careInstructions: [
      'Lavar a máquina en agua fría',
      'No usar lejía',
      'Secar al aire libre',
      'Planchar a temperatura baja'
    ],
    features: [
      'Diseño Red Bull Racing auténtico',
      'Cremallera YKK de alta calidad',
      'Bolsillos funcionales',
      'Ajuste ergonómico',
      'Resistente al viento'
    ],
    isBestseller: true,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockQuantity: 116, // Combined stock
    sku: 'UE-REDBULL-001',
    tags: ['f1', 'redbull', 'racing', 'premium', 'chaqueta'],
    seoTitle: 'Chaqueta Red Bull Racing Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta Red Bull Racing unisex. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-09-19T00:00:00.000Z'
  }
]

export const getUnifiedProductBySlug = (slug: string): Product | undefined => {
  return unifiedProducts.find(product => product.slug === slug)
}

export const getUnifiedProducts = (): Product[] => {
  return unifiedProducts
}

export const getRelatedUnifiedProducts = (productId: string): Product[] => {
  return unifiedProducts.filter(product => product.id !== productId).slice(0, 4)
}