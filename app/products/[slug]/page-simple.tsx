import { notFound } from "next/navigation"

// Route segment config - force dynamic rendering
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  console.log('🔍 Simple ProductPage rendering with params:', params)

  // Simple hardcoded check first
  const validSlugs = [
    'chaqueta-f1-ferrari-hombre',
    'chaqueta-f1-ferrari-mujer',
    'chaqueta-red-bull-racing-hombre',
    'chaqueta-red-bull-racing-mujer'
  ]

  if (!validSlugs.includes(params.slug)) {
    console.log('❌ Invalid slug, calling notFound()')
    notFound()
  }

  console.log('✅ Valid slug, rendering page')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Product Page</h1>
      <p>Slug: {params.slug}</p>
      <p>This is a simple test page to verify server rendering works.</p>

      <div className="mt-8 p-4 bg-green-100 rounded">
        <p>✅ Server component rendered successfully!</p>
        <p>✅ No 500 error</p>
        <p>✅ Product slug: {params.slug}</p>
      </div>
    </div>
  )
}