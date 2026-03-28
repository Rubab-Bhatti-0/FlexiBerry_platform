import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { FlexiBerryLogo } from '@/components/ui/FlexiBerryLogo'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Nav */}
      <nav className="bg-background/95 backdrop-blur border-b border-border px-4 h-16 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <FlexiBerryLogo size={24} />
          <span className="text-xl font-serif font-bold">FlexiBerry</span>
        </Link>
        <Link href="/auth/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all">
          Sign In
        </Link>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          {/* Animated emoji */}
          <div className="mb-6 animate-float select-none">
            <FlexiBerryLogo size={120} />
          </div>

          <div className="text-8xl font-serif font-bold text-accent/20 mb-2">404</div>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h1>

          <p className="text-muted-foreground mb-10 text-lg">
            Looks like this page has gone out of stock! Let&apos;s get you back to shopping.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base transition-all hover:scale-105">
                ← Back to Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full text-base transition-all hover:scale-105">
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Popular categories:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: '🖥️ Electronics', href: '/products?category=electronics' },
                { label: '🛋️ Furniture',   href: '/products?category=furniture'   },
                { label: '⚡ Energy',        href: '/products?category=energy'       },
                { label: '🏠 Appliances',   href: '/products?category=appliances'   },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full border border-border hover:border-accent hover:bg-accent/10 text-sm transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}