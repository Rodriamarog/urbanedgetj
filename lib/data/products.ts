import { Product } from '@/lib/types/product'

export const products: Product[] = [
  // Ferrari Male
  {
    id: 'ferrari-jacket-male',
    name: 'Chaqueta F1 Ferrari',
    slug: 'chaqueta-f1-ferrari-hombre',
    description: 'Chaqueta premium inspirada en la Fórmula 1 con diseño Ferrari auténtico. Confeccionada con materiales de alta calidad que combinan estilo urbano con la pasión por las carreras.',
    shortDescription: 'Chaqueta F1 premium con diseño Ferrari auténtico',
    price: 2899,
    originalPrice: 3499,
    discountPercentage: 17,
    category: 'hombre',
    subcategory: 'racing',
    images: [
      {
        id: 'ferrari-male-1',
        url: '/ferrari/ferrari-black.png',
        alt: 'Chaqueta F1 Ferrari - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1
      },
      {
        id: 'ferrari-male-2',
        url: '/ferrari/male/male-model-1.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 2
      },
      {
        id: 'ferrari-male-3',
        url: '/ferrari/male/male-model-2.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 3
      },
      {
        id: 'ferrari-male-4',
        url: '/ferrari/male/male-model-3.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 4
      }
    ],
    sizes: [
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 15 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 20 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 18 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 12 },
      { id: 'xxl', name: 'XXL', label: 'Doble Extra Grande', inStock: true, stockQuantity: 6 }
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
    stockQuantity: 71,
    sku: 'UE-FERRARI-MALE-001',
    tags: ['f1', 'ferrari', 'racing', 'premium', 'chaqueta', 'hombre'],
    seoTitle: 'Chaqueta F1 Ferrari Hombre Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta F1 Ferrari para hombre. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-19')
  },

  // Ferrari Female
  {
    id: 'ferrari-jacket-female',
    name: 'Chaqueta F1 Ferrari',
    slug: 'chaqueta-f1-ferrari-mujer',
    description: 'Chaqueta premium inspirada en la Fórmula 1 con diseño Ferrari auténtico. Confeccionada con materiales de alta calidad que combinan estilo urbano con la pasión por las carreras.',
    shortDescription: 'Chaqueta F1 premium con diseño Ferrari auténtico',
    price: 2899,
    originalPrice: 3499,
    discountPercentage: 17,
    category: 'mujer',
    subcategory: 'racing',
    images: [
      {
        id: 'ferrari-female-1',
        url: '/ferrari/ferrari-black.png',
        alt: 'Chaqueta F1 Ferrari - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1
      },
      {
        id: 'ferrari-female-2',
        url: '/ferrari/female/female-model-1.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 2
      },
      {
        id: 'ferrari-female-3',
        url: '/ferrari/female/female-model-2.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 3
      },
      {
        id: 'ferrari-female-4',
        url: '/ferrari/female/female-model-3.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 4
      }
    ],
    sizes: [
      { id: 'xs', name: 'XS', label: 'Extra Chica', inStock: true, stockQuantity: 8 },
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 15 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 20 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 18 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 12 }
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
    stockQuantity: 73,
    sku: 'UE-FERRARI-FEMALE-001',
    tags: ['f1', 'ferrari', 'racing', 'premium', 'chaqueta', 'mujer'],
    seoTitle: 'Chaqueta F1 Ferrari Mujer Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta F1 Ferrari para mujer. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-19')
  },

  // Red Bull Male
  {
    id: 'redbull-jacket-male',
    name: 'Chaqueta Red Bull Racing',
    slug: 'chaqueta-red-bull-racing-hombre',
    description: 'Chaqueta premium inspirada en el equipo Red Bull Racing de Fórmula 1. Diseño auténtico que combina la velocidad y la adrenalina del automovilismo con el estilo urbano más sofisticado.',
    shortDescription: 'Chaqueta Red Bull Racing premium auténtica',
    price: 2799,
    originalPrice: 3399,
    discountPercentage: 18,
    category: 'hombre',
    subcategory: 'racing',
    images: [
      {
        id: 'redbull-male-1',
        url: '/redbull-front.png',
        alt: 'Chaqueta Red Bull Racing - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1
      },
      {
        id: 'redbull-male-2',
        url: '/redbull/male/male-1.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 2
      },
      {
        id: 'redbull-male-3',
        url: '/redbull/male/male-2.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 3
      },
      {
        id: 'redbull-male-4',
        url: '/redbull/male/male-3.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 4
      }
    ],
    sizes: [
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 12 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 18 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 15 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 10 },
      { id: 'xxl', name: 'XXL', label: 'Doble Extra Grande', inStock: true, stockQuantity: 5 }
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
    stockQuantity: 60,
    sku: 'UE-REDBULL-MALE-001',
    tags: ['f1', 'redbull', 'racing', 'premium', 'chaqueta', 'hombre'],
    seoTitle: 'Chaqueta Red Bull Racing Hombre Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta Red Bull Racing para hombre. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-09-19')
  },

  // Red Bull Female
  {
    id: 'redbull-jacket-female',
    name: 'Chaqueta Red Bull Racing',
    slug: 'chaqueta-red-bull-racing-mujer',
    description: 'Chaqueta premium inspirada en el equipo Red Bull Racing de Fórmula 1. Diseño auténtico que combina la velocidad y la adrenalina del automovilismo con el estilo urbano más sofisticado.',
    shortDescription: 'Chaqueta Red Bull Racing premium auténtica',
    price: 2799,
    originalPrice: 3399,
    discountPercentage: 18,
    category: 'mujer',
    subcategory: 'racing',
    images: [
      {
        id: 'redbull-female-1',
        url: '/redbull-front.png',
        alt: 'Chaqueta Red Bull Racing - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1
      },
      {
        id: 'redbull-female-2',
        url: '/redbull/female/female-1.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 2
      },
      {
        id: 'redbull-female-3',
        url: '/redbull/female/female-2.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 3
      },
      {
        id: 'redbull-female-4',
        url: '/redbull/female/female-3.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 4
      }
    ],
    sizes: [
      { id: 'xs', name: 'XS', label: 'Extra Chica', inStock: true, stockQuantity: 6 },
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 14 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 16 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 12 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 8 }
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
    stockQuantity: 56,
    sku: 'UE-REDBULL-FEMALE-001',
    tags: ['f1', 'redbull', 'racing', 'premium', 'chaqueta', 'mujer'],
    seoTitle: 'Chaqueta Red Bull Racing Mujer Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta Red Bull Racing para mujer. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-09-19')
  }
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isBestseller || product.isNew).slice(0, 6)
}

export const getRelatedProducts = (productId: string, category: string): Product[] => {
  return products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, 4)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}