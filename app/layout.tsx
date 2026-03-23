import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/* ── Fonts loaded via next/font — NO @import needed in globals.css ───────── */
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

/* ── SEO Metadata ────────────────────────────────────────────────────────── */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexiberry.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FlexiBerry — Buy Now Pay Later | Premium Installment Marketplace Pakistan',
    template: '%s | FlexiBerry',
  },
  description:
    'Shop smartphones, laptops, furniture, solar systems, vehicles & more on easy 6-12 month installments in Pakistan. 0% markup, verified sellers, free delivery, 7-day returns. Start shopping with just 20% down payment!',
  keywords: [
    'installment shopping Pakistan',
    'buy now pay later Pakistan',
    'kist par shopping',
    'BNPL Pakistan',
    'electronics on installment',
    'furniture installment Pakistan',
    'smartphone installment plan',
    'laptop installment Pakistan',
    'solar panel installment',
    'car financing Pakistan',
    'FlexiBerry',
    'easy monthly payments',
    '0% markup installment',
    'verified sellers Pakistan',
    'online shopping installments',
  ],
  authors: [{ name: 'FlexiBerry' }],
  creator: 'FlexiBerry',
  publisher: 'FlexiBerry',
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    alternateLocale: ['en_US', 'ur_PK'],
    url: siteUrl,
    siteName: 'FlexiBerry',
    title: 'FlexiBerry — Buy Now Pay Later | Premium Installment Marketplace Pakistan',
    description:
      'Shop smartphones, laptops, furniture, solar systems & vehicles on easy installments. 0% markup, verified sellers, free delivery across Pakistan.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FlexiBerry — Shop Now Pay Later in Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@flexiberry',
    title: 'FlexiBerry — Buy Now Pay Later Pakistan',
    description: 'Shop premium products with 0% markup installments. Smartphones, laptops, furniture & more.',
    images: ['/og-image.png'],
    creator: '@flexiberry',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-PK': siteUrl,
      'en-US': siteUrl,
    },
  },
  category: 'ecommerce',
  classification: 'Shopping, Buy Now Pay Later, Installment Marketplace',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)'  },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f5ef' },
    { media: '(prefers-color-scheme: dark)',  color: '#1a1812' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
