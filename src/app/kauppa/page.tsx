import { CartProvider } from '@/lib/cart'
import { products } from '@/lib/data'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import styles from './kauppa.module.css'

export default function KauppaPage() {
  const categories = [
    { key: 'kaikki', label: 'Kaikki' },
    { key: 'tuore',  label: 'Tuoreet sienet' },
    { key: 'kuivattu', label: 'Kuivatut sienet' },
    { key: 'jalostettu', label: 'Jalostetut tuotteet' },
  ]

  return (
    <CartProvider>
      <Navbar />
      <main>
        <section className={styles.header}>
          <div className="container">
            <h1>Kauppa</h1>
            <p>Tuoreita, kuivattuja ja jalostettuja vinokkastuotteita suoraan tilalta.</p>
          </div>
        </section>

        <section className={styles.shop}>
          <div className="container">
            {/* Category filter pills */}
            <div className={styles.filters}>
              {categories.map(c => (
                <span key={c.key} className={`${styles.filterPill} ${c.key === 'kaikki' ? styles.active : ''}`}>
                  {c.label}
                </span>
              ))}
            </div>

            <div className={styles.grid}>
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </CartProvider>
  )
}
