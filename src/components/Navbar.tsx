'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { count, total } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Vinokkaat</span>
          <span className={styles.logoSub}>by Finnmycel</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          <Link href="/kauppa">Kauppa</Link>
          <Link href="/tuotteet/koivuvinokas-tuore">Tuotteet</Link>
          <Link href="/tarina">Tarina</Link>
          <Link href="/reseptit">Reseptit</Link>
        </nav>

        {/* Cart + hamburger */}
        <div className={styles.actions}>
          <Link href="/ostoskori" className={styles.cartBtn}>
            <CartIcon />
            {count > 0 && <span className={styles.cartBadge}>{count}</span>}
            {count > 0 && (
              <span className={styles.cartTotal}>{total.toFixed(2)} €</span>
            )}
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Avaa valikko"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className={styles.mobileMenu}>
          <Link href="/kauppa" onClick={() => setMenuOpen(false)}>Kauppa</Link>
          <Link href="/tarina" onClick={() => setMenuOpen(false)}>Tarina</Link>
          <Link href="/reseptit" onClick={() => setMenuOpen(false)}>Reseptit</Link>
          <Link href="/ostoskori" onClick={() => setMenuOpen(false)}>Ostoskori {count > 0 && `(${count})`}</Link>
        </nav>
      )}
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}
