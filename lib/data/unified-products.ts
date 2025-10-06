import { Product } from '@/lib/types/product'

export const unifiedProducts: Product[] = [
  // Ferrari Black Jacket - Unified
  {
    id: 'ferrari-black-jacket',
    name: 'Chaqueta F1 Ferrari Negra',
    slug: 'chaqueta-f1-ferrari-negra',
    description: 'Chaqueta premium inspirada en la Fórmula 1 con diseño Ferrari auténtico. Confeccionada con materiales de alta calidad que combinan estilo urbano con la pasión por las carreras.',
    shortDescription: 'Chaqueta F1 premium con diseño Ferrari auténtico',
    price: 1999,
    basePrice: 1723.28,
    ivaPercentage: 16,
    category: 'racing',
    subcategory: 'f1',
    images: [
      // Generic product shots (for both genders) - NEW
      {
        id: 'ferrari-black-generic-1',
        url: '/ferrari/1.jpg',
        alt: 'Chaqueta F1 Ferrari Negra - Vista 1',
        isPrimary: true,
        type: 'product',
        order: 1,
        gender: 'unisex'
      },
      {
        id: 'ferrari-black-generic-2',
        url: '/ferrari/2.jpg',
        alt: 'Chaqueta F1 Ferrari Negra - Vista 2',
        type: 'product',
        order: 2,
        gender: 'unisex'
      },
      // Male model shots
      {
        id: 'ferrari-black-male-1',
        url: '/ferrari/male/male-model-1.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 3,
        gender: 'male'
      },
      {
        id: 'ferrari-black-male-2',
        url: '/ferrari/male/male-model-2.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 4,
        gender: 'male'
      },
      {
        id: 'ferrari-black-male-3',
        url: '/ferrari/male/male-model-3.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 5,
        gender: 'male'
      },
      {
        id: 'ferrari-black-male-4',
        url: '/ferrari/male/male-model-4.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 6,
        gender: 'male'
      },
      // Female model shots
      {
        id: 'ferrari-black-female-1',
        url: '/ferrari/female/female-model-1.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 7,
        gender: 'female'
      },
      {
        id: 'ferrari-black-female-2',
        url: '/ferrari/female/female-model-2.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 8,
        gender: 'female'
      },
      {
        id: 'ferrari-black-female-3',
        url: '/ferrari/female/female-model-3.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 9,
        gender: 'female'
      },
      {
        id: 'ferrari-black-female-4',
        url: '/ferrari/female/female-model-4.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari Negra',
        type: 'lifestyle',
        order: 10,
        gender: 'female'
      }
    ],
    sizes: [
      // Male sizes
      { id: 's-male', name: 'S', label: 'Chica (Hombre)', inStock: true, stockQuantity: 15, gender: 'male' },
      { id: 'm-male', name: 'M', label: 'Mediana (Hombre)', inStock: true, stockQuantity: 20, gender: 'male' },
      { id: 'l-male', name: 'L', label: 'Grande (Hombre)', inStock: true, stockQuantity: 18, gender: 'male' },
      { id: 'xl-male', name: 'XL', label: 'Extra Grande (Hombre)', inStock: false, stockQuantity: 0, gender: 'male' },
      { id: 'xxl-male', name: 'XXL', label: 'Doble Extra Grande (Hombre)', inStock: false, stockQuantity: 0, gender: 'male' },
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
    reviews: [
      {
        id: 1,
        name: "Ana Martínez",
        rating: 5,
        date: "Hace 2 semanas",
        review: "¡Me encanta! La chaqueta Ferrari es de excelente calidad. El negro se ve elegante y combina con todo. Super recomendada.",
        verified: true,
        images: ['/ferrari/review1.jpg', '/ferrari/review1.2.jpg']
      },
      {
        id: 2,
        name: "Roberto Sánchez",
        rating: 5,
        date: "Hace 1 mes",
        review: "Perfecta para lucir en la calle. La calidad es premium y el diseño Ferrari auténtico. Llegó rápido a Tijuana.",
        verified: true,
        images: ['/ferrari/review2.jpg', '/ferrari/review2.2.jpg']
      },
      {
        id: 3,
        name: "Valeria Torres",
        rating: 4,
        date: "Hace 3 semanas",
        review: "Muy buena chaqueta, solo que tardó un poco más de lo esperado. Pero la calidad lo vale totalmente.",
        verified: false
      }
    ],
    isBestseller: true,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockQuantity: 144,
    sku: 'UE-FERRARI-BLACK-001',
    tags: ['f1', 'ferrari', 'racing', 'premium', 'chaqueta'],
    seoTitle: 'Chaqueta F1 Ferrari Negra Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta F1 Ferrari Negra unisex. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2024-09-19T00:00:00.000Z'
  },

  // Red Bull Jacket - Unified (UPDATED WITH NEW IMAGES)
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
      // Generic product shots 1,2,3,4 (for both genders) - NEW
      {
        id: 'redbull-generic-1',
        url: '/redbull/1.jpg',
        alt: 'Chaqueta Red Bull Racing - Vista 1',
        isPrimary: true,
        type: 'product',
        order: 1,
        gender: 'unisex'
      },
      {
        id: 'redbull-generic-2',
        url: '/redbull/2.jpg',
        alt: 'Chaqueta Red Bull Racing - Vista 2',
        type: 'product',
        order: 2,
        gender: 'unisex'
      },
      {
        id: 'redbull-generic-3',
        url: '/redbull/3.jpg',
        alt: 'Chaqueta Red Bull Racing - Vista 3',
        type: 'product',
        order: 3,
        gender: 'unisex'
      },
      {
        id: 'redbull-generic-4',
        url: '/redbull/4.jpg',
        alt: 'Chaqueta Red Bull Racing - Vista 4',
        type: 'product',
        order: 4,
        gender: 'unisex'
      },
      // Male model shots (5th, 6th, etc.)
      {
        id: 'redbull-male-1',
        url: '/redbull/male/male-1.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 5,
        gender: 'male'
      },
      {
        id: 'redbull-male-2',
        url: '/redbull/male/male-2.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 6,
        gender: 'male'
      },
      {
        id: 'redbull-male-3',
        url: '/redbull/male/male-3.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 7,
        gender: 'male'
      },
      {
        id: 'redbull-male-4',
        url: '/redbull/male/male-4.png',
        alt: 'Modelo masculino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 8,
        gender: 'male'
      },
      // Female model shots (5th, 6th, etc.)
      {
        id: 'redbull-female-1',
        url: '/redbull/female/female-1.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 9,
        gender: 'female'
      },
      {
        id: 'redbull-female-2',
        url: '/redbull/female/female-2.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 10,
        gender: 'female'
      },
      {
        id: 'redbull-female-3',
        url: '/redbull/female/female-3.png',
        alt: 'Modelo femenino con Chaqueta Red Bull Racing',
        type: 'lifestyle',
        order: 11,
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
    reviews: [
      {
        id: 1,
        name: "Luis Hernández",
        rating: 5,
        date: "Hace 1 semana",
        review: "La chaqueta Red Bull está increíble. Los colores son vibrantes y la calidad es top. Vale cada peso!",
        verified: true,
        images: ['/redbull/review1.avif', '/redbull/review1.2.avif']
      },
      {
        id: 2,
        name: "Sofía Ramírez",
        rating: 5,
        date: "Hace 2 semanas",
        review: "Súper cómoda y el diseño es auténtico. Me llegó en perfectas condiciones. Urban Edge es confiable!",
        verified: true,
        images: ['/redbull/review2.avif', '/redbull/review2.2.avif']
      },
      {
        id: 3,
        name: "Miguel Ángel Cruz",
        rating: 5,
        date: "Hace 1 mes",
        review: "Excelente compra! La chaqueta Red Bull supera mis expectativas. Material de primera y fit perfecto.",
        verified: true,
        images: ['/redbull/review3.avif']
      }
    ],
    isBestseller: true,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockQuantity: 116,
    sku: 'UE-REDBULL-001',
    tags: ['f1', 'redbull', 'racing', 'premium', 'chaqueta'],
    seoTitle: 'Chaqueta Red Bull Racing Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta Red Bull Racing unisex. Diseño auténtico, materiales de alta calidad. Envío gratis en México.',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-09-19T00:00:00.000Z'
  },

  // Ferrari Red Jacket - NEW PRODUCT
  {
    id: 'ferrari-red-jacket',
    name: 'Chaqueta F1 Ferrari Roja',
    slug: 'chaqueta-f1-ferrari-roja',
    description: 'Chaqueta premium inspirada en la Fórmula 1 con el icónico diseño rojo Ferrari. Confeccionada con materiales de alta calidad que combinan estilo urbano con la pasión por las carreras.',
    shortDescription: 'Chaqueta F1 roja con diseño Ferrari auténtico',
    price: 1999,
    basePrice: 1723.28,
    ivaPercentage: 16,
    category: 'racing',
    subcategory: 'f1',
    images: [
      // Generic product shots (temporary - only 2 images for now)
      {
        id: 'ferrari-red-generic-1',
        url: '/ferrari-red/1.jpg',
        alt: 'Chaqueta F1 Ferrari Roja - Vista 1',
        isPrimary: true,
        type: 'product',
        order: 1,
        gender: 'unisex'
      },
      {
        id: 'ferrari-red-generic-2',
        url: '/ferrari-red/2.jpg',
        alt: 'Chaqueta F1 Ferrari Roja - Vista 2',
        type: 'product',
        order: 2,
        gender: 'unisex'
      }
    ],
    sizes: [
      // Male sizes
      { id: 's-male', name: 'S', label: 'Chica (Hombre)', inStock: true, stockQuantity: 15, gender: 'male' },
      { id: 'm-male', name: 'M', label: 'Mediana (Hombre)', inStock: true, stockQuantity: 20, gender: 'male' },
      { id: 'l-male', name: 'L', label: 'Grande (Hombre)', inStock: true, stockQuantity: 18, gender: 'male' },
      { id: 'xl-male', name: 'XL', label: 'Extra Grande (Hombre)', inStock: false, stockQuantity: 0, gender: 'male' },
      { id: 'xxl-male', name: 'XXL', label: 'Doble Extra Grande (Hombre)', inStock: false, stockQuantity: 0, gender: 'male' },
      // Female sizes
      { id: 'xs-female', name: 'XS', label: 'Extra Chica (Mujer)', inStock: true, stockQuantity: 8, gender: 'female' },
      { id: 's-female', name: 'S', label: 'Chica (Mujer)', inStock: true, stockQuantity: 15, gender: 'female' },
      { id: 'm-female', name: 'M', label: 'Mediana (Mujer)', inStock: true, stockQuantity: 20, gender: 'female' },
      { id: 'l-female', name: 'L', label: 'Grande (Mujer)', inStock: true, stockQuantity: 18, gender: 'female' },
      { id: 'xl-female', name: 'XL', label: 'Extra Grande (Mujer)', inStock: true, stockQuantity: 12, gender: 'female' }
    ],
    colors: [
      { id: 'red', name: 'Red', hex: '#DC0000', label: 'Rojo Ferrari' }
    ],
    materials: ['Poliéster Premium', 'Microfibra', 'Forro Interior Suave'],
    careInstructions: [
      'Lavar a máquina en agua fría',
      'No usar lejía',
      'Secar al aire libre',
      'Planchar a temperatura baja'
    ],
    features: [
      'Diseño Ferrari rojo icónico',
      'Cremallera YKK de alta calidad',
      'Bolsillos funcionales',
      'Ajuste ergonómico',
      'Resistente al viento'
    ],
    reviews: [
      {
        id: 1,
        name: "Daniela Flores",
        rating: 5,
        date: "Hace 3 días",
        review: "El rojo Ferrari es espectacular! La chaqueta es tal cual las fotos. Super contenta con mi compra.",
        verified: true
      },
      {
        id: 2,
        name: "Fernando Gómez",
        rating: 5,
        date: "Hace 1 semana",
        review: "Calidad premium, el color rojo es vibrante. Llegó antes de lo esperado. 100% recomendado!",
        verified: true
      },
      {
        id: 3,
        name: "Patricia Morales",
        rating: 4,
        date: "Hace 2 semanas",
        review: "Muy linda chaqueta, el rojo es hermoso. Solo le doy 4 estrellas porque viene un poco grande, pero nada grave.",
        verified: false
      }
    ],
    isBestseller: false,
    isNew: true,
    isLimited: true,
    inStock: true,
    stockQuantity: 144,
    sku: 'UE-FERRARI-RED-001',
    tags: ['f1', 'ferrari', 'racing', 'premium', 'chaqueta', 'roja'],
    seoTitle: 'Chaqueta F1 Ferrari Roja Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta F1 Ferrari Roja unisex. Diseño icónico rojo Ferrari, materiales de alta calidad. Envío gratis en México.',
    createdAt: '2024-10-01T00:00:00.000Z',
    updatedAt: '2024-10-06T00:00:00.000Z'
  },

  // Lamborghini Jacket - NEW PRODUCT
  {
    id: 'lamborghini-jacket',
    name: 'Chaqueta Lamborghini Racing',
    slug: 'chaqueta-lamborghini-racing',
    description: 'Chaqueta premium inspirada en el legendario estilo Lamborghini. Diseño exclusivo que combina la potencia y el lujo de Lamborghini con el estilo urbano más sofisticado.',
    shortDescription: 'Chaqueta Lamborghini Racing premium exclusiva',
    price: 1999,
    basePrice: 1723.28,
    ivaPercentage: 16,
    category: 'racing',
    subcategory: 'supercar',
    images: [
      // Generic product shots (temporary - only 2 images for now)
      {
        id: 'lamborghini-generic-1',
        url: '/lamborghini/1.jpg',
        alt: 'Chaqueta Lamborghini Racing - Vista 1',
        isPrimary: true,
        type: 'product',
        order: 1,
        gender: 'unisex'
      },
      {
        id: 'lamborghini-generic-2',
        url: '/lamborghini/2.jpg',
        alt: 'Chaqueta Lamborghini Racing - Vista 2',
        type: 'product',
        order: 2,
        gender: 'unisex'
      }
    ],
    sizes: [
      // Male sizes
      { id: 's-male', name: 'S', label: 'Chica (Hombre)', inStock: true, stockQuantity: 15, gender: 'male' },
      { id: 'm-male', name: 'M', label: 'Mediana (Hombre)', inStock: true, stockQuantity: 20, gender: 'male' },
      { id: 'l-male', name: 'L', label: 'Grande (Hombre)', inStock: true, stockQuantity: 18, gender: 'male' },
      { id: 'xl-male', name: 'XL', label: 'Extra Grande (Hombre)', inStock: false, stockQuantity: 0, gender: 'male' },
      { id: 'xxl-male', name: 'XXL', label: 'Doble Extra Grande (Hombre)', inStock: false, stockQuantity: 0, gender: 'male' },
      // Female sizes
      { id: 'xs-female', name: 'XS', label: 'Extra Chica (Mujer)', inStock: true, stockQuantity: 8, gender: 'female' },
      { id: 's-female', name: 'S', label: 'Chica (Mujer)', inStock: true, stockQuantity: 15, gender: 'female' },
      { id: 'm-female', name: 'M', label: 'Mediana (Mujer)', inStock: true, stockQuantity: 20, gender: 'female' },
      { id: 'l-female', name: 'L', label: 'Grande (Mujer)', inStock: true, stockQuantity: 18, gender: 'female' },
      { id: 'xl-female', name: 'XL', label: 'Extra Grande (Mujer)', inStock: true, stockQuantity: 12, gender: 'female' }
    ],
    colors: [
      { id: 'black-gold', name: 'Black & Gold', hex: '#000000', label: 'Negro y Dorado' }
    ],
    materials: ['Poliéster Premium', 'Microfibra', 'Forro Interior Suave'],
    careInstructions: [
      'Lavar a máquina en agua fría',
      'No usar lejía',
      'Secar al aire libre',
      'Planchar a temperatura baja'
    ],
    features: [
      'Diseño Lamborghini exclusivo',
      'Cremallera YKK de alta calidad',
      'Bolsillos funcionales',
      'Ajuste ergonómico',
      'Resistente al viento'
    ],
    reviews: [
      {
        id: 1,
        name: "Alejandro Vargas",
        rating: 5,
        date: "Hace 5 días",
        review: "La chaqueta Lamborghini es una obra de arte. Los detalles dorados se ven premium. Muy exclusiva!",
        verified: true
      },
      {
        id: 2,
        name: "Gabriela Reyes",
        rating: 5,
        date: "Hace 1 semana",
        review: "Me fascina! El diseño Lamborghini es único y la calidad es increíble. Definitivamente la mejor compra del año.",
        verified: true
      },
      {
        id: 3,
        name: "Carlos Jiménez",
        rating: 5,
        date: "Hace 2 semanas",
        review: "Espectacular! El negro con dorado es elegante y deportivo a la vez. Urban Edge TJ nunca decepciona.",
        verified: false
      }
    ],
    isBestseller: false,
    isNew: true,
    isLimited: true,
    inStock: true,
    stockQuantity: 144,
    sku: 'UE-LAMBO-001',
    tags: ['lamborghini', 'racing', 'premium', 'chaqueta', 'supercar'],
    seoTitle: 'Chaqueta Lamborghini Racing Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta Lamborghini Racing unisex. Diseño exclusivo, materiales de alta calidad. Envío gratis en México.',
    createdAt: '2024-10-01T00:00:00.000Z',
    updatedAt: '2024-10-06T00:00:00.000Z'
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
