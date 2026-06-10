'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import styles from './ostoskori.module.css'

const FREE_SHIPPING_THRESHOLD = 49
const SHIPPING_COST = 5.90

type CheckoutStep = 'cart' | 'details' | 'confirm'

type DeliveryDetails = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  deliveryMethod: 'postnord' | 'pickup'
  notes: string
}

const emptyDetails: DeliveryDetails = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', postalCode: '', city: '',
  deliveryMethod: 'postnord', notes: '',
}

export default function CartPageContent() {
  const { items, remove, setQty, total, count } = useCart()
  const [step, setStep] = useState<CheckoutStep>('cart')
  const [details, setDetails] = useState<DeliveryDetails>(emptyDetails)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shippingFree = total >= FREE_SHIPPING_THRESHOLD
  const shippingCost = details.deliveryMethod === 'pickup' ? 0 : (shippingFree ? 0 : SHIPPING_COST)
  const orderTotal = total + shippingCost
  const remaining = FREE_SHIPPING_THRESHOLD - total

  function handleField(field: keyof DeliveryDetails, value: string) {
    setDetails(d => ({ ...d, [field]: value }))
  }

  function isDetailsValid() {
    const { firstName, lastName, email, phone, deliveryMethod } = details
    if (!firstName || !lastName || !email || !phone) return false
    if (deliveryMethod === 'postnord' && (!details.address || !details.postalCode || !details.city)) return false
    return true
  }

  if (orderPlaced) {
    return (
      <main className={styles.main}>
        <div className={`container ${styles.successWrap}`}>
          <div className={styles.successCard}>
            <span className={styles.successIcon}>🍄</span>
            <h1>Tilaus vastaanotettu!</h1>
            <p>Kiitos tilauksestasi, <strong>{details.firstName}</strong>! Lähetämme tilausvahvistuksen osoitteeseen <strong>{details.email}</strong>.</p>
            <p className={styles.successNote}>Pakkaamo saa tilauksen käsiteltäväksi heti. Tuotteet lähtevät matkaan {details.deliveryMethod === 'pickup' ? 'noudettaviksi Saaritie 1, Säynätsalo' : 'PostNordin viilennyskuljetuksella 1–2 arkipäivässä'}.</p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Takaisin etusivulle</Link>
          </div>
        </div>
      </main>
    )
  }

  if (count === 0 && step === 'cart') {
    return (
      <main className={styles.main}>
        <div className={`container ${styles.emptyWrap}`}>
          <span className={styles.emptyIcon}>🛒</span>
          <h1>Ostoskorisi on tyhjä</h1>
          <p>Lisää tuotteita kaupasta aloittaaksesi tilauksen.</p>
          <Link href="/kauppa" className="btn btn-primary">Siirry kauppaan</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      {/* Step indicator */}
      <div className={styles.stepBar}>
        <div className="container">
          <div className={styles.steps}>
            {(['cart', 'details', 'confirm'] as CheckoutStep[]).map((s, i) => {
              const labels = ['Ostoskori', 'ToimitusTiedot', 'Vahvistus']
              const active = step === s
              const done = (step === 'details' && i === 0) || (step === 'confirm' && i <= 1)
              return (
                <div key={s} className={`${styles.step} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}>
                  <span className={styles.stepNum}>{done ? '✓' : i + 1}</span>
                  <span className={styles.stepLabel}>{labels[i]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>

          {/* ── Left column ─────────────────────────────── */}
          <div className={styles.left}>

            {/* STEP 1: Cart items */}
            {step === 'cart' && (
              <>
                <h1 className={styles.pageTitle}>Ostoskori</h1>

                {/* Free shipping progress */}
                {!shippingFree && (
                  <div className={styles.shippingProgress}>
                    <div className={styles.shippingProgressText}>
                      <span>Lisää <strong>{remaining.toFixed(2)} €</strong> ilmaista toimitusta varten</span>
                      <span className={styles.shippingGoal}>49 €</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                {shippingFree && (
                  <div className={styles.shippingFreeAlert}>
                    🎉 Ilmainen toimitus! Tilauksesi ylittää 49 €.
                  </div>
                )}

                {/* Item list */}
                <div className={styles.itemList}>
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className={styles.item}>
                      {/* Thumbnail placeholder */}
                      <div className={styles.itemThumb}>
                        <MushroomThumb />
                      </div>

                      <div className={styles.itemBody}>
                        <div className={styles.itemTop}>
                          <div>
                            <p className={styles.itemName}>{product.name}</p>
                            <p className={styles.itemSub}>{product.subtitle}</p>
                          </div>
                          <button
                            className={styles.removeBtn}
                            onClick={() => remove(product.id)}
                            aria-label={`Poista ${product.name}`}
                          >
                            ✕
                          </button>
                        </div>

                        <div className={styles.itemBottom}>
                          {/* Qty stepper */}
                          <div className={styles.stepper}>
                            <button
                              className={styles.stepperBtn}
                              onClick={() => setQty(product.id, qty - 1)}
                              aria-label="Vähennä"
                            >−</button>
                            <span className={styles.stepperVal}>{qty}</span>
                            <button
                              className={styles.stepperBtn}
                              onClick={() => setQty(product.id, qty + 1)}
                              aria-label="Lisää"
                            >+</button>
                          </div>
                          <p className={styles.itemPrice}>
                            {((product.price ?? 0) * qty).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cartActions}>
                  <Link href="/kauppa" className="btn btn-outline">← Jatka ostoksia</Link>
                  <button className="btn btn-primary" onClick={() => setStep('details')}>
                    Siirry toimitustietoihin →
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: Delivery details */}
            {step === 'details' && (
              <>
                <h1 className={styles.pageTitle}>Toimitustiedot</h1>

                {/* Delivery method */}
                <div className={styles.fieldGroup}>
                  <label className={styles.groupLabel}>Toimitustapa</label>
                  <div className={styles.deliveryOptions}>
                    <label className={`${styles.deliveryOption} ${details.deliveryMethod === 'postnord' ? styles.deliverySelected : ''}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value="postnord"
                        checked={details.deliveryMethod === 'postnord'}
                        onChange={() => handleField('deliveryMethod', 'postnord')}
                      />
                      <div className={styles.deliveryOptionBody}>
                        <span className={styles.deliveryName}>📦 PostNord viilennyskuljetus</span>
                        <span className={styles.deliveryDesc}>1–2 arkipäivää · {shippingFree ? 'Ilmainen' : `${SHIPPING_COST.toFixed(2)} €`}</span>
                      </div>
                    </label>
                    <label className={`${styles.deliveryOption} ${details.deliveryMethod === 'pickup' ? styles.deliverySelected : ''}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        checked={details.deliveryMethod === 'pickup'}
                        onChange={() => handleField('deliveryMethod', 'pickup')}
                      />
                      <div className={styles.deliveryOptionBody}>
                        <span className={styles.deliveryName}>📍 Nouto tilalta</span>
                        <span className={styles.deliveryDesc}>Saaritie 1, Säynätsalo · Ilmainen · Sovittava erikseen</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Contact info */}
                <div className={styles.fieldGroup}>
                  <label className={styles.groupLabel}>Yhteystiedot</label>
                  <div className={styles.fieldRow}>
                    <Field label="Etunimi *" value={details.firstName} onChange={v => handleField('firstName', v)} placeholder="Matti" />
                    <Field label="Sukunimi *" value={details.lastName} onChange={v => handleField('lastName', v)} placeholder="Meikäläinen" />
                  </div>
                  <Field label="Sähköposti *" type="email" value={details.email} onChange={v => handleField('email', v)} placeholder="matti@esimerkki.fi" />
                  <Field label="Puhelinnumero *" type="tel" value={details.phone} onChange={v => handleField('phone', v)} placeholder="050 123 4567" />
                </div>

                {/* Delivery address — only if PostNord */}
                {details.deliveryMethod === 'postnord' && (
                  <div className={styles.fieldGroup}>
                    <label className={styles.groupLabel}>Toimitusosoite</label>
                    <Field label="Katuosoite *" value={details.address} onChange={v => handleField('address', v)} placeholder="Esimerkkikatu 1 A 2" />
                    <div className={styles.fieldRow}>
                      <Field label="Postinumero *" value={details.postalCode} onChange={v => handleField('postalCode', v)} placeholder="40100" />
                      <Field label="Postitoimipaikka *" value={details.city} onChange={v => handleField('city', v)} placeholder="Jyväskylä" />
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className={styles.fieldGroup}>
                  <label className={styles.groupLabel}>Lisätiedot tilaukseesi (valinnainen)</label>
                  <textarea
                    className={styles.textarea}
                    value={details.notes}
                    onChange={e => handleField('notes', e.target.value)}
                    placeholder="Esim. toivottu noutopäivä tai erityistoiveet"
                    rows={3}
                  />
                </div>

                <div className={styles.cartActions}>
                  <button className="btn btn-outline" onClick={() => setStep('cart')}>← Takaisin</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setStep('confirm')}
                    disabled={!isDetailsValid()}
                  >
                    Tarkista tilaus →
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: Confirm */}
            {step === 'confirm' && (
              <>
                <h1 className={styles.pageTitle}>Tarkista ja vahvista</h1>

                {/* Order summary list */}
                <div className={styles.confirmSection}>
                  <h3>Tuotteet</h3>
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className={styles.confirmRow}>
                      <span>{product.name} × {qty}</span>
                      <span>{((product.price ?? 0) * qty).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>

                {/* Delivery info */}
                <div className={styles.confirmSection}>
                  <h3>Toimitus</h3>
                  {details.deliveryMethod === 'postnord' ? (
                    <>
                      <p className={styles.confirmDetail}>PostNord viilennyskuljetus</p>
                      <p className={styles.confirmDetail}>{details.address}, {details.postalCode} {details.city}</p>
                    </>
                  ) : (
                    <p className={styles.confirmDetail}>Nouto tilalta – Saaritie 1, Säynätsalo</p>
                  )}
                </div>

                {/* Contact */}
                <div className={styles.confirmSection}>
                  <h3>Yhteystiedot</h3>
                  <p className={styles.confirmDetail}>{details.firstName} {details.lastName}</p>
                  <p className={styles.confirmDetail}>{details.email} · {details.phone}</p>
                  {details.notes && <p className={styles.confirmDetail}>Lisätieto: {details.notes}</p>}
                </div>

                {/* Payment note */}
                <div className={styles.paymentNote}>
                  <span className={styles.paymentNoteIcon}>💳</span>
                  <p>Maksu tapahtuu turvallisesti Stripeä käyttäen tilauksen vahvistamisen jälkeen. Hyväksymme Visa, Mastercard ja verkkopankkimaksut.</p>
                </div>

                <div className={styles.cartActions}>
                  <button className="btn btn-outline" onClick={() => setStep('details')}>← Muokkaa tietoja</button>
                  <button className="btn btn-gold" onClick={() => setOrderPlaced(true)}>
                    Vahvista tilaus {orderTotal.toFixed(2)} €
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── Right column: order summary ──────────────── */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Yhteenveto</h2>

            <div className={styles.summaryLines}>
              {items.map(({ product, qty }) => (
                <div key={product.id} className={styles.summaryLine}>
                  <span>{product.name} <span className={styles.summaryQty}>×{qty}</span></span>
                  <span>{((product.price ?? 0) * qty).toFixed(2)} €</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryDivider} />

            <div className={styles.summaryLine}>
              <span>Tuotteet yhteensä</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Toimitus</span>
              <span className={shippingCost === 0 ? styles.free : ''}>
                {details.deliveryMethod === 'pickup'
                  ? 'Nouto (ilmainen)'
                  : shippingCost === 0
                    ? 'Ilmainen 🎉'
                    : `${shippingCost.toFixed(2)} €`
                }
              </span>
            </div>

            <div className={styles.summaryDivider} />

            <div className={`${styles.summaryLine} ${styles.summaryTotal}`}>
              <span>Yhteensä</span>
              <span>{orderTotal.toFixed(2)} €</span>
            </div>

            {/* Free shipping nudge */}
            {!shippingFree && details.deliveryMethod === 'postnord' && (
              <div className={styles.summaryNudge}>
                Lisää <strong>{remaining.toFixed(2)} €</strong> edestä tuotteita ja säästät toimituskuluissa!
                <Link href="/kauppa" className={styles.summaryNudgeLink}>Lisää tuotteita →</Link>
              </div>
            )}
          </aside>

        </div>
      </div>
    </main>
  )
}

/* ── Small reusable field component ─────────────────── */
function Field({
  label, value, onChange, placeholder, type = 'text'
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="on"
      />
    </div>
  )
}

/* ── Thumbnail placeholder ───────────────────────────── */
function MushroomThumb() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48" aria-hidden="true">
      <ellipse cx="32" cy="30" rx="22" ry="15" fill="#f5b308" opacity=".35"/>
      <path d="M22 30 Q22 44 26 48 Q29 51 32 51 Q35 51 38 48 Q42 44 42 30" fill="#d99a00" opacity=".55"/>
      <ellipse cx="32" cy="30" rx="22" ry="15" fill="#f5b308" opacity=".5"/>
    </svg>
  )
}
