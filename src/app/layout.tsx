import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vinokkaat – Tuoreita sieniä suoraan tilalta | Finnmycel',
  description: 'Tuoreita vinokkassieniä, kuivattuja sieniä ja jalostettuja tuotteita. Kasvatettu vehnän oljella ja koivupurulla Säynätsalossa. Viljelijä Finnmycel.',
  keywords: 'vinokkaat, vinokas, oyster mushroom, sienet, koivuvinokas, kuningasvinokas, Finnmycel, Säynätsalo, tuoreet sienet',
  openGraph: {
    title: 'Vinokkaat – Tuoreita sieniä suoraan tilalta',
    description: 'Tuoreita vinokkassieniä kasvatettu vehnän oljella ja koivupurulla Säynätsalossa.',
    url: 'https://vinokkaat.fi',
    siteName: 'Vinokkaat',
    locale: 'fi_FI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  )
}
