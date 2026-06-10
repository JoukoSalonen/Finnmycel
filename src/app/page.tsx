import Link from 'next/link'
import { CartProvider } from '@/lib/cart'
import { products, founderPosts } from '@/lib/data'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import FounderPost from '@/components/FounderPost'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function Home() {
  const featuredProducts = products.filter(p => p.inStock).slice(0, 3)

  return (
    <CartProvider>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroText}>
              <span className={styles.heroEyebrow}>Säynätsalosta suoraan pöytääsi</span>
              <h1 className={styles.heroTitle}>
                Tuoreita vinokkasia,<br />
                <em>juuri korjattuina</em>
              </h1>
              <p className={styles.heroSub}>
                Kasvatamme koivu- ja kuningasvinokkaan vehnän oljella ja koivupurulla.
                Ei välikäsiä — tilauksesi pakataan samana päivänä.
              </p>
              <div className={styles.heroCta}>
                <Link href="/kauppa" className="btn btn-gold">Katso tuotteet</Link>
                <Link href="/tarina" className="btn btn-outline">Lue tarinamme</Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroIllustration}>
                <HeroMushrooms />
              </div>
              <div className={styles.heroBadge}>
                <span className={styles.badgeNum}>1–2</span>
                <span className={styles.badgeLabel}>arkipäivää toimitusaika</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why us strip ─────────────────────────────────── */}
        <section className={styles.whyStrip}>
          <div className={`container ${styles.whyGrid}`}>
            {[
              { icon: '🌿', title: 'Tuoreus', text: 'Pakattu samana päivänä kun sienet korjataan. Maksimiset aromit, pitkä säilyvyys.' },
              { icon: '🌲', title: 'Suomalainen', text: 'Kasvatettu Säynätsalossa, Jyväskylän kupeessa. Raaka-aineet kotimaisia.' },
              { icon: '♻️', title: 'Vastuullinen', text: 'Kierrätettävä pakkaus, lämpö maalämmöstä, kasvualusta kompostoitavissa.' },
            ].map(item => (
              <div key={item.title} className={styles.whyItem}>
                <span className={styles.whyIcon}>{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured products ────────────────────────────── */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <h2>Tuotteet</h2>
              <Link href="/kauppa" className={styles.seeAll}>Kaikki tuotteet →</Link>
            </div>
            <div className={styles.productGrid}>
              {featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Founder feed + sidebar ────────────────────────── */}
        <section className={`${styles.section} ${styles.feedSection}`}>
          <div className="container">
            <div className={styles.feedGrid}>

              {/* Posts */}
              <div>
                <h2 className={styles.feedTitle}>Tilalta</h2>
                <div className={styles.posts}>
                  {founderPosts.map(post => (
                    <FounderPost key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <aside className={styles.sidebar}>
                {/* Free shipping card */}
                <div className={styles.sideCard}>
                  <span className={styles.sideCardIcon}>🚚</span>
                  <h4>Ilmainen toimitus</h4>
                  <p>Kaikki yli <strong>49 €</strong> tilaukset toimitetaan ilmaiseksi PostNordin viilennyskuljetuksella.</p>
                  <Link href="/kauppa" className="btn btn-primary" style={{width:'100%', justifyContent:'center', marginTop:'.75rem'}}>
                    Aloita ostokset
                  </Link>
                </div>

                {/* Farm address */}
                <div className={styles.sideCard}>
                  <span className={styles.sideCardIcon}>📍</span>
                  <h4>Noutomyymälä</h4>
                  <p>Voit noutaa tilauksesi suoraan tilalta Säynätsalosta.<br /><strong>Saaritie 1, Säynätsalo</strong></p>
                  <p style={{marginTop:'.4rem', fontSize:'.85rem'}}>puh <a href="tel:0503054365" style={{color:'var(--green-dark)', fontWeight:700}}>0503054365</a></p>
                </div>
              </aside>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </CartProvider>
  )
}

function HeroMushrooms() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{width:'100%', maxWidth:320}}>
      {/* Back mushroom */}
      <ellipse cx="200" cy="155" rx="55" ry="38" fill="#f5b308" opacity=".25"/>
      <path d="M168 155 Q170 190 178 200 Q186 210 200 210 Q214 210 222 200 Q230 190 232 155" fill="#d99a00" opacity=".5"/>
      {/* Main mushroom cap */}
      <ellipse cx="130" cy="140" rx="72" ry="50" fill="#f5b308" opacity=".9"/>
      <ellipse cx="130" cy="140" rx="72" ry="50" fill="url(#capShade)" opacity=".3"/>
      {/* Stem */}
      <path d="M110 185 Q108 220 112 235 Q118 248 130 248 Q142 248 148 235 Q152 220 150 185" fill="#d99a00" opacity=".85"/>
      {/* Cap detail lines */}
      <path d="M75 135 Q100 118 130 115 Q160 118 185 135" stroke="#412207" strokeWidth="1.5" strokeLinecap="round" opacity=".2" fill="none"/>
      <path d="M68 145 Q95 125 130 122 Q165 125 192 145" stroke="#412207" strokeWidth="1" strokeLinecap="round" opacity=".12" fill="none"/>
      {/* Small accent mushroom */}
      <ellipse cx="260" cy="200" rx="32" ry="22" fill="#6bc30d" opacity=".4"/>
      <path d="M244 200 Q245 220 252 228 Q256 232 260 232 Q264 232 268 228 Q275 220 276 200" fill="#4d8a09" opacity=".4"/>
      {/* Grass/ground */}
      <path d="M40 255 Q80 245 130 248 Q180 251 220 248 Q260 245 290 252" stroke="#6bc30d" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6"/>
      <defs>
        <radialGradient id="capShade" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#412207" stopOpacity=".15"/>
        </radialGradient>
      </defs>
    </svg>
  )
}
