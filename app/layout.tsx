import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatbotAssistant } from '@/components/ChatbotAssistant'
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
    default: 'FlexiBerry — Premium Installment Marketplace',
    template: '%s | FlexiBerry',
  },
  description:
    'Buy electronics, vehicles, furniture, energy solutions & more with flexible 6 or 12-month installment payment plans. Verified sellers. Minimal down payment.',
  keywords: [
    'installment shopping',
    'buy now pay later Pakistan',
    'kist par shopping',
    'electronics on installment',
    'furniture installment',
    'FlexiBerry',
  ],
  authors: [{ name: 'FlexiBerry' }],
  creator: 'FlexiBerry',
  publisher: 'FlexiBerry',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'FlexiBerry',
    title: 'FlexiBerry — Premium Installment Marketplace',
    description:
      'Shop premium products with flexible installment plans. 6 or 12 months, minimal down payment, verified sellers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FlexiBerry — Premium Installment Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlexiBerry — Premium Installment Marketplace',
    description: 'Shop premium products with flexible installment plans.',
    images: ['/og-image.png'],
    creator: '@flexiberry',
  },
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
        <ChatbotAssistant />
        <Analytics />
      </body>
    </html>
  )
}