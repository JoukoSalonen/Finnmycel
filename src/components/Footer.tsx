import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>Vinokkaat</span>
          <p>Viljelijä ja pakkaaja<br /><strong>Finnmycel Oy</strong></p>
          <p>Saaritie 1, Säynätsalo<br />puh <a href="tel:0503054365">0503054365</a></p>
        </div>

        <div>
          <p className={styles.colHeading}>Tilaa</p>
          <ul className={styles.linkList}>
            <li><Link href="/kauppa?kategoria=tuore">Tuoreet sienet</Link></li>
            <li><Link href="/kauppa?kategoria=kuivattu">Kuivatut sienet</Link></li>
            <li><Link href="/kauppa?kategoria=jalostettu">Jalostetut tuotteet</Link></li>
          </ul>
        </div>

        <div>
          <p className={styles.colHeading}>Tietoa</p>
          <ul className={styles.linkList}>
            <li><Link href="/tarina">Tarina</Link></li>
            <li><Link href="/reseptit">Reseptit</Link></li>
            <li><Link href="/toimitusehdot">Toimitusehdot</Link></li>
            <li><Link href="/tietosuoja">Tietosuojaseloste</Link></li>
          </ul>
        </div>

        <div>
          <p className={styles.colHeading}>Liity postituslistalle</p>
          <p className={styles.newsletterText}>Saat tiedon uusista satoerista ja resepteistä ensin.</p>
          <form className={styles.newsletterForm} action="#">
            <input type="email" placeholder="sähköpostiosoitteesi" aria-label="Sähköposti" />
            <button type="submit" className="btn btn-gold">Liity</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {new Date().getFullYear()} Finnmycel Oy. Kaikki oikeudet pidätetään.</span>
        </div>
      </div>
    </footer>
  )
}
