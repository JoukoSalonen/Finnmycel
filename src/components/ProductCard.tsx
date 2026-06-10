'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/data'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const lowestPrice = Math.min(...product.sizes.map(s => s.price))

  function handleAdd() {
    const size = product.sizes[0]
    add({ ...product, id: `${product.id}-${size.weight}`, name: `${product.name} ${size.weight}`, price: size.price, unit: size.weight })
  }

  const categoryLabel: Record<Product['category'], string> = {
    tuore: 'Tuore', kuivattu: 'Kuivattu', jalostettu: 'Jalostettu',
  }

  return (
    <div className={styles.card}>
      {product.badge && <span className={styles.badge}>{product.badge}</span>}
      {!product.inStock && <span className={`${styles.badge} ${styles.badgeOut}`}>Loppu</span>}

      <Link href={`/tuotteet/${product.slug}`} className={styles.imageWrap}>
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          className={styles.image}
          sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{categoryLabel[product.category]}</span>
        <Link href={`/tuotteet/${product.slug}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.subtitle}>{product.subtitle}</p>
        <p className={styles.desc}>{product.shortDesc}</p>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.amount}>alkaen {lowestPrice.toFixed(2)} €</span>
          </div>
          <button
            className={`btn btn-primary ${styles.addBtn}`}
            onClick={handleAdd}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Lisää koriin' : 'Ilmoita minulle'}
          </button>
        </div>
      </div>
    </div>
  )
}
