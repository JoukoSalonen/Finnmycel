# Vinokkaat – verkkokauppa

Next.js-pohjainen verkkokauppa Finnmycel Oy:lle. Tuotenimi: **vinokkaat.fi**.

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Kieli**: TypeScript
- **Tyyli**: CSS Modules + CSS custom properties (ei Tailwind)
- **Maksut**: Stripe (lisätään myöhemmin)
- **Kuvat**: Cloudinary CDN (lisätään myöhemmin)
- **Hosting**: Vercel

---

## Paikallinen kehitys

```bash
npm install
npm run dev
```

Avaa http://localhost:3000

---

## Vercel-deployaus (ensikertaa)

1. Luo tili osoitteessa https://vercel.com (ilmainen)
2. Asenna Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Projektin juuressa:
   ```bash
   vercel
   ```
   Seuraa ohjeita. Vercel tunnistaa Next.js:n automaattisesti.

4. Oma domain (vinokkaat.fi):
   - Vercel Dashboardissa: Settings → Domains → lisää `vinokkaat.fi`
   - Louhi.fi DNS-asetuksissa lisää A-record:
     - `@` → `76.76.21.21`
   - Ja CNAME:
     - `www` → `cname.vercel-dns.com`

---

## Projektin rakenne

```
src/
├── app/
│   ├── layout.tsx        ← root layout + metadata
│   ├── page.tsx          ← etusivu (hero, tuotteet, feed)
│   ├── globals.css       ← brand tokens + utility classes
│   └── kauppa/
│       └── page.tsx      ← tuotelistaus
├── components/
│   ├── Navbar.tsx        ← header + ostoskori-ikoni
│   ├── ProductCard.tsx   ← tuotekortti
│   ├── FounderPost.tsx   ← tilalta-syötteen postaus
│   └── Footer.tsx        ← footer + uutiskirje
└── lib/
    ├── data.ts           ← tuotteet + postaukset (mock data)
    └── cart.tsx          ← ostoskorin tila (React Context)
```

---

## Seuraavat vaiheet

- [ ] Lisää oikeat tuotekuvat (Cloudinary)
- [ ] Integroi Stripe maksuja varten
- [ ] Rakenna ostoskori-sivu (`/ostoskori`)
- [ ] Rakenna tuotesivu (`/tuotteet/[slug]`)
- [ ] Lisää tarina-sivu (`/tarina`)
- [ ] Lisää reseptit-sivu (`/reseptit`)
- [ ] Kytke uutiskirje Mailchimpiin tai Brevooon
- [ ] Lisää cookie-banneri (GDPR)
- [ ] Google Analytics / Plausible

---

## Väripaletti

| Nimi         | Arvo       | Käyttö                        |
|--------------|------------|-------------------------------|
| `--gold`     | `#f5b308`  | Pääaksentti, CTA-painike      |
| `--green`    | `#6bc30d`  | Primääripainike, kategoriat   |
| `--brown`    | `#412207`  | Navbar, footer, otsikot       |
| `--off-white`| `#fdf8f0`  | Sivupohja                     |
