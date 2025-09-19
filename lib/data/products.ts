import { Product } from '@/lib/types/product'

export const products: Product[] = [
  // F1 Ferrari Jacket - Flagship Product
  {
    id: 'f1-ferrari-jacket-black',
    name: 'Chaqueta F1 Ferrari Negra',
    slug: 'chaqueta-f1-ferrari-negra',
    description: 'Chaqueta premium inspirada en la Fórmula 1 con diseño Ferrari auténtico. Confeccionada con materiales de alta calidad que combinan estilo urbano con la pasión por las carreras. Perfecta para destacar en cualquier ocasión con un look deportivo y elegante.',
    shortDescription: 'Chaqueta F1 premium con diseño Ferrari auténtico',
    price: 2899,
    originalPrice: 3499,
    discountPercentage: 17,
    category: 'jackets',
    subcategory: 'racing',
    images: [
      {
        id: 'ferrari-black-1',
        url: '/ferrari-black-front.png',
        alt: 'Chaqueta F1 Ferrari Negra - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1
      },
      {
        id: 'ferrari-black-lifestyle-1',
        url: '/male-model-1.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 2
      },
      {
        id: 'ferrari-black-lifestyle-2',
        url: '/male-model-2.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 3
      },
      {
        id: 'ferrari-black-lifestyle-3',
        url: '/male-model-3.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 4
      },
      {
        id: 'ferrari-black-female-1',
        url: '/female-model-1.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 5
      },
      {
        id: 'ferrari-black-female-2',
        url: '/female-model-2.png',
        alt: 'Modelo femenino con Chaqueta F1 Ferrari',
        type: 'lifestyle',
        order: 6
      }
    ],
    sizes: [
      { id: 'xs', name: 'XS', label: 'Extra Chica', inStock: true, stockQuantity: 8 },
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
    stockQuantity: 79,
    sku: 'UE-F1-FERRARI-BLACK-001',
    tags: ['f1', 'ferrari', 'racing', 'premium', 'chaqueta', 'urbano'],
    seoTitle: 'Chaqueta F1 Ferrari Negra Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta F1 Ferrari negra premium. Diseño auténtico, materiales de alta calidad. Envío gratis en México. ¡Compra ahora!',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-19')
  },

  // Hoodie Urban Edge
  {
    id: 'hoodie-urban-edge-black',
    name: 'Hoodie Urban Edge Negro',
    slug: 'hoodie-urban-edge-negro',
    description: 'Hoodie premium de la colección Urban Edge con diseño minimalista y comfort superior. Perfecto para el streetwear diario con un toque de elegancia urbana.',
    shortDescription: 'Hoodie premium con diseño urbano minimalista',
    price: 1299,
    originalPrice: 1599,
    discountPercentage: 19,
    category: 'hoodies',
    images: [
      {
        id: 'hoodie-urban-1',
        url: '/male-model-4.png',
        alt: 'Hoodie Urban Edge Negro',
        isPrimary: true,
        type: 'lifestyle',
        order: 1
      },
      {
        id: 'hoodie-urban-2',
        url: '/male-model-5.png',
        alt: 'Hoodie Urban Edge Negro - Vista Lateral',
        type: 'lifestyle',
        order: 2
      }
    ],
    sizes: [
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 12 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 25 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 20 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 15 },
      { id: 'xxl', name: 'XXL', label: 'Doble Extra Grande', inStock: false, stockQuantity: 0 }
    ],
    colors: [
      { id: 'black', name: 'Black', hex: '#000000', label: 'Negro' }
    ],
    materials: ['Algodón 80%', 'Poliéster 20%', 'Capucha ajustable'],
    careInstructions: [
      'Lavar a máquina en agua fría',
      'Secar a temperatura baja',
      'No planchar sobre estampados'
    ],
    features: [
      'Capucha con cordones',
      'Bolsillo canguro',
      'Puños y dobladillo acanalados',
      'Fit relajado'
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    stockQuantity: 72,
    sku: 'UE-HOODIE-BLACK-001',
    tags: ['hoodie', 'urbano', 'casual', 'negro'],
    seoTitle: 'Hoodie Urban Edge Negro Premium - Streetwear Mexicano',
    seoDescription: 'Hoodie premium Urban Edge negro. Comfort superior y estilo urbano. Envío gratis en México.',
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-09-19')
  },

  // Camiseta Street
  {
    id: 'camiseta-street-white',
    name: 'Camiseta Street Blanca',
    slug: 'camiseta-street-blanca',
    description: 'Camiseta esencial de la colección Street con corte moderno y tela premium. Básico perfecto para cualquier outfit urbano.',
    shortDescription: 'Camiseta básica premium con corte urbano',
    price: 599,
    originalPrice: 799,
    discountPercentage: 25,
    category: 't-shirts',
    images: [
      {
        id: 'street-tee-1',
        url: '/female-model-3.png',
        alt: 'Camiseta Street Blanca',
        isPrimary: true,
        type: 'lifestyle',
        order: 1
      },
      {
        id: 'street-tee-2',
        url: '/female-model-4.png',
        alt: 'Camiseta Street Blanca - Vista Frontal',
        type: 'lifestyle',
        order: 2
      }
    ],
    sizes: [
      { id: 'xs', name: 'XS', label: 'Extra Chica', inStock: true, stockQuantity: 10 },
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 18 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 22 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 16 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 8 }
    ],
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF', label: 'Blanco' }
    ],
    materials: ['Algodón 100%', 'Tela premium suave'],
    careInstructions: [
      'Lavar a máquina en agua fría',
      'Secar al aire libre',
      'Planchar a temperatura media'
    ],
    features: [
      'Corte moderno',
      'Cuello redondo',
      'Manga corta',
      'Fit regular'
    ],
    isLimited: true,
    inStock: true,
    stockQuantity: 74,
    sku: 'UE-TEE-WHITE-001',
    tags: ['camiseta', 'básico', 'blanco', 'algodón'],
    seoTitle: 'Camiseta Street Blanca Premium - Urban Edge TJ',
    seoDescription: 'Camiseta básica premium blanca. Algodón 100%, corte moderno. Esencial para tu guardarropa urbano.',
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-09-19')
  },

  // F1 Ferrari Jacket Red Variant
  {
    id: 'f1-ferrari-jacket-red',
    name: 'Chaqueta F1 Ferrari Roja',
    slug: 'chaqueta-f1-ferrari-roja',
    description: 'Chaqueta premium inspirada en la Fórmula 1 con el icónico color Ferrari rojo. Diseño auténtico que combina la pasión por las carreras con el estilo urbano más sofisticado.',
    shortDescription: 'Chaqueta F1 en el icónico rojo Ferrari',
    price: 2899,
    originalPrice: 3499,
    discountPercentage: 17,
    category: 'jackets',
    subcategory: 'racing',
    images: [
      {
        id: 'ferrari-red-1',
        url: '/ferrari-front.jpg',
        alt: 'Chaqueta F1 Ferrari Roja - Vista Frontal',
        isPrimary: true,
        type: 'product',
        order: 1
      },
      {
        id: 'ferrari-red-lifestyle-1',
        url: '/male-model-6.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari Roja',
        type: 'lifestyle',
        order: 2
      },
      {
        id: 'ferrari-red-lifestyle-2',
        url: '/male-model-7.png',
        alt: 'Modelo masculino con Chaqueta F1 Ferrari Roja',
        type: 'lifestyle',
        order: 3
      }
    ],
    sizes: [
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 8 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 12 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 10 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 6 },
      { id: 'xxl', name: 'XXL', label: 'Doble Extra Grande', inStock: false, stockQuantity: 0 }
    ],
    colors: [
      { id: 'red', name: 'Red', hex: '#DC2626', label: 'Rojo Ferrari' }
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
      'Color rojo icónico',
      'Cremallera YKK de alta calidad',
      'Bolsillos funcionales',
      'Ajuste ergonómico'
    ],
    isBestseller: true,
    isLimited: true,
    inStock: true,
    stockQuantity: 36,
    sku: 'UE-F1-FERRARI-RED-001',
    tags: ['f1', 'ferrari', 'racing', 'rojo', 'premium'],
    seoTitle: 'Chaqueta F1 Ferrari Roja Premium - Urban Edge TJ',
    seoDescription: 'Chaqueta F1 Ferrari roja premium. Color icónico, diseño auténtico. Edición limitada. ¡Compra ahora!',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-09-19')
  },

  // Hoodie Urban Edge Gray
  {
    id: 'hoodie-urban-edge-gray',
    name: 'Hoodie Urban Edge Gris',
    slug: 'hoodie-urban-edge-gris',
    description: 'Hoodie premium en color gris versátil. Diseño urbano que se adapta a cualquier estilo y ocasión con comfort excepcional.',
    shortDescription: 'Hoodie premium gris versátil y cómodo',
    price: 1299,
    originalPrice: 1599,
    discountPercentage: 19,
    category: 'hoodies',
    images: [
      {
        id: 'hoodie-gray-1',
        url: '/female-model-5.png',
        alt: 'Hoodie Urban Edge Gris',
        isPrimary: true,
        type: 'lifestyle',
        order: 1
      }
    ],
    sizes: [
      { id: 'xs', name: 'XS', label: 'Extra Chica', inStock: true, stockQuantity: 6 },
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 14 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 18 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 12 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 8 }
    ],
    colors: [
      { id: 'gray', name: 'Gray', hex: '#6B7280', label: 'Gris' }
    ],
    materials: ['Algodón 80%', 'Poliéster 20%', 'Interior polar suave'],
    features: [
      'Color versátil',
      'Capucha ajustable',
      'Bolsillo frontal',
      'Fit cómodo'
    ],
    isNew: true,
    inStock: true,
    stockQuantity: 58,
    sku: 'UE-HOODIE-GRAY-001',
    tags: ['hoodie', 'gris', 'versátil', 'cómodo'],
    seoTitle: 'Hoodie Urban Edge Gris - Streetwear Versátil',
    seoDescription: 'Hoodie Urban Edge gris premium. Versátil y cómodo para cualquier ocasión urbana.',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-09-19')
  },

  // Chaqueta F1 Ferrari Blanca (Special Edition)
  {
    id: 'f1-ferrari-jacket-white',
    name: 'Chaqueta F1 Ferrari Blanca Edición Especial',
    slug: 'chaqueta-f1-ferrari-blanca-edicion-especial',
    description: 'Edición especial de la chaqueta F1 Ferrari en blanco inmaculado. Diseño exclusivo que representa la elegancia y pureza del racing de élite.',
    shortDescription: 'Edición especial F1 Ferrari en blanco premium',
    price: 3199,
    originalPrice: 3899,
    discountPercentage: 18,
    category: 'jackets',
    subcategory: 'racing',
    images: [
      {
        id: 'ferrari-white-1',
        url: '/belinda-ferrari-2.png',
        alt: 'Chaqueta F1 Ferrari Blanca - Edición Especial',
        isPrimary: true,
        type: 'lifestyle',
        order: 1
      }
    ],
    sizes: [
      { id: 's', name: 'S', label: 'Chica', inStock: true, stockQuantity: 3 },
      { id: 'm', name: 'M', label: 'Mediana', inStock: true, stockQuantity: 5 },
      { id: 'l', name: 'L', label: 'Grande', inStock: true, stockQuantity: 4 },
      { id: 'xl', name: 'XL', label: 'Extra Grande', inStock: true, stockQuantity: 2 }
    ],
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF', label: 'Blanco Puro' }
    ],
    materials: ['Poliéster Premium', 'Microfibra Avanzada', 'Detalles en Contraste'],
    features: [
      'Edición especial limitada',
      'Detalles exclusivos',
      'Numeración individual',
      'Packaging premium'
    ],
    isLimited: true,
    isBestseller: false,
    isNew: true,
    inStock: true,
    stockQuantity: 14,
    sku: 'UE-F1-FERRARI-WHITE-SE-001',
    tags: ['f1', 'ferrari', 'blanco', 'edición especial', 'limitado'],
    seoTitle: 'Chaqueta F1 Ferrari Blanca Edición Especial - Urban Edge TJ',
    seoDescription: 'Edición especial F1 Ferrari blanca. Diseño exclusivo, numerada individualmente. Muy limitada.',
    createdAt: new Date('2024-09-01'),
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