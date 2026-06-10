'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { Product } from './data'

export type CartItem = { product: Product; qty: number }

type CartCtx = {
  items: CartItem[]
  add: (product: Product) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  total: number
  count: number
  clear: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, qty: 1 }]
    })
  }, [])

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.product.id !== id))
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) { remove(id); return }
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i))
  }, [remove])

  const clear = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + (i.product.price ?? 0) * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, total, count, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
