import { CartProvider } from '@/lib/cart'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartPageContent from './CartPageContent'

export const metadata = {
  title: 'Ostoskori – Vinokkaat',
}

export default function OstoskoriPage() {
  return (
    <CartProvider>
      <Navbar />
      <CartPageContent />
      <Footer />
    </CartProvider>
  )
}
