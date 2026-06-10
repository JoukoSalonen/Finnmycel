import { notFound } from 'next/navigation'
import { products } from '@/lib/data'
import { CartProvider } from '@/lib/cart'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductPageContent from './ProductPageContent'

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) return {}
  return {
    title: `${product.name} – Vinokkaat | Finnmycel`,
    description: product.shortDesc,
    openGraph: {
      title: product.name,
      description: product.shortDesc,
      images: [{ url: product.images[0]?.src }],
    },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const related = products
    .filter(p => p.slug !== product.slug && p.category === product.category && p.inStock)
    .slice(0, 3)

  return (
    <CartProvider>
      <Navbar />
      <ProductPageContent product={product} related={related} />
      <Footer />
    </CartProvider>
  )
}
