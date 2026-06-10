'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import type { Product } from '@/lib/data'
import styles from './product.module.css'

export default function ProductPageContent({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  const { add } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const selectedSizeObj = product.sizes[selectedSize]
  const lineTotal = (selectedSizeObj.price * qty).toFixed(2)

  function handleAdd() {
    // Build a cart-compatible product object with selected size baked in
    const cartProduct = {
      ...product,
      id: `${product.id}-${selectedSizeObj.weight}`,
      name: `${product.name} ${selectedSizeObj.weight}`,
      price: selectedSizeObj.price,
      unit: selectedSizeObj.weight,
    }
    for (let i = 0; i < qty; i++) add(cartProduct)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className={styles.main}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Sijaintisi">
            <Link href="/">Etusivu</Link>
            <span>›</span>
            <Link href="/kauppa">Kauppa</Link>
            <span>›</span>
            <span>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <section className={styles.productSection}>
        <div className={`container ${styles.productGrid}`}>

          {/* ── Image gallery ─────────────────────────── */}
          <div className={styles.gallery}>
            {/* Main image */}
            <div className={styles.mainImageWrap}>
              {product.badge && (
                <span className={styles.badge}>{product.badge}</span>
              )}
              <Image
                src={product.images[activeImg].src}
                alt={product.images[activeImg].alt}
                fill
                className={styles.mainImage}
                sizes="(max-width: 860px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className={styles.thumbs}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Kuva ${i + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={styles.thumbImage}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ───────────────────────────── */}
          <div className={styles.info}>
            {/* Tags */}
            <div className={styles.tags}>
              {product.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productSubtitle}>{product.subtitle}</p>
            <p className={styles.shortDesc}>{product.shortDesc}</p>

            {/* Size selector */}
            <div className={styles.sizeSection}>
              <p className={styles.sizeLabel}>Koko</p>
              <div className={styles.sizes}>
                {product.sizes.map((size, i) => (
                  <button
                    key={size.weight}
                    className={`${styles.sizeBtn} ${i === selectedSize ? styles.sizeBtnActive : ''}`}
                    onClick={() => setSelectedSize(i)}
                  >
                    <span className={styles.sizeWeight}>{size.weight}</span>
                    <span className={styles.sizePrice}>{size.price.toFixed(2)} €</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className={styles.priceRow}>
              <span className={styles.price}>{selectedSizeObj.price.toFixed(2)} €</span>
              <span className={styles.vat}>sis. {product.vatPercent} % ALV</span>
            </div>

            {/* Qty + Add to cart */}
            <div className={styles.purchaseRow}>
              <div className={styles.qtyControl}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Vähennä"
                >−</button>
                <span className={styles.qtyVal}>{qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQty(q => q + 1)}
                  aria-label="Lisää"
                >+</button>
              </div>

              <button
                className={`btn btn-primary ${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
                onClick={handleAdd}
                disabled={!product.inStock}
              >
                {added ? '✓ Lisätty koriin!' : `Lisää koriin · ${lineTotal} €`}
              </button>
            </div>

            {/* Stock + shipping info */}
            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryItem}>
                <span className={styles.deliveryIcon}>🌿</span>
                <span>{product.inStock ? 'Varastossa – korjattu tuoreena' : 'Tilapäisesti loppu'}</span>
              </div>
              <div className={styles.deliveryItem}>
                <span className={styles.deliveryIcon}>🚚</span>
                <span>PostNord viilennyskuljetus 1–2 arkipäivässä</span>
              </div>
              <div className={styles.deliveryItem}>
                <span className={styles.deliveryIcon}>📍</span>
                <span>Nouto tilalta: Saaritie 1, Säynätsalo</span>
              </div>
              <div className={styles.deliveryItem}>
                <span className={styles.deliveryIcon}>🎁</span>
                <span>Ilmainen toimitus yli 49 € tilauksiin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product details tabs ──────────────────────── */}
      <section className={styles.detailsSection}>
        <div className="container">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* ── Related products ─────────────────────────── */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Kokeile myös</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}

/* ── Product detail tabs ─────────────────────────────── */
function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState(0)
  const tabs = [
    { label: 'Kuvaus', content: product.description },
    { label: 'Kasvatus', content: product.cultivation },
    { label: 'Keittiössä', content: product.culinary },
    { label: 'Säilytys', content: product.storage },
  ]

  return (
    <div className={styles.tabs}>
      <div className={styles.tabNav} role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={i === active}
            className={`${styles.tabBtn} ${i === active ? styles.tabBtnActive : ''}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent} role="tabpanel">
        <p>{tabs[active].content}</p>
      </div>
    </div>
  )
}

/* ── Related product mini-card ───────────────────────── */
function RelatedCard({ product }: { product: Product }) {
  const { add } = useCart()
  const lowestPrice = Math.min(...product.sizes.map(s => s.price))

  return (
    <Link href={`/tuotteet/${product.slug}`} className={styles.relatedCard}>
      <div className={styles.relatedImageWrap}>
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          className={styles.relatedImage}
          sizes="280px"
        />
      </div>
      <div className={styles.relatedBody}>
        <p className={styles.relatedName}>{product.name}</p>
        <p className={styles.relatedDesc}>{product.shortDesc}</p>
        <p className={styles.relatedPrice}>alkaen {lowestPrice.toFixed(2)} €</p>
      </div>
    </Link>
  )
}
