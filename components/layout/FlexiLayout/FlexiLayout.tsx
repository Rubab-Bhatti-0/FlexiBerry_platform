'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CATS = [
  { name: 'Smartphones',    e: '📱', slug: 'smartphones' },
  { name: 'Laptops',        e: '💻', slug: 'laptops'     },
  { name: 'Scotty & Bikes', e: '🏍️', slug: 'bikes'       },
  { name: 'Appliances',     e: '🌀', slug: 'appliances'  },
  { name: 'Solar Systems',  e: '☀️', slug: 'solar'       },
  { name: 'Furniture',      e: '🛋️', slug: 'furniture'   },
  { name: 'Jahez Packages', e: '📦', slug: 'jahez'       },
  { name: 'Car Financing',  e: '🚗', slug: 'cars'        },
  { name: 'Business Stock', e: '🏭', slug: 'business'    },
  { name: 'General Store',  e: '🛒', slug: 'general'     },
]

interface FlexiLayoutProps {
  children: React.ReactNode
}

export default function FlexiLayout({ children }: FlexiLayoutProps) {
  const [scrolled, setScrolled]     = useState(false)
  const [catOpen, setCatOpen]       = useState(false)
  const [vendOpen, setVendOpen]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-dd]')) {
        setCatOpen(false)
        setVendOpen(false)
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box }
        .flexi-nav-lnk {
          display: flex; align-items: center; gap: 5px;
          padding: 0 12px; height: 44px;
          font-size: 13.5px; font-weight: 600; color: #374151;
          text-decoration: none; border-radius: 10px;
          transition: all .15s; white-space: nowrap;
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
        }
        .flexi-nav-lnk:hover { color: #6366f1; background: rgba(99,102,241,.08) }
        .flexi-dd-menu {
          position: absolute; top: calc(100% + 6px); left: 0;
          background: #fff; border: 1.5px solid #e5e7eb;
          border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,.13);
          z-index: 200; overflow: hidden;
        }
        .flexi-dd-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; text-decoration: none; transition: background .12s;
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
        }
        .flexi-dd-row:hover { background: #f5f3ff }
        .flexi-srch {
          display: flex; border: 1.5px solid #e5e7eb;
          border-radius: 13px; overflow: hidden; transition: all .2s; background: #fff;
        }
        .flexi-srch:focus-within { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,.13) }
        .flexi-srch input {
          flex: 1; padding: 10px 15px; font-size: 13.5px;
          outline: none; background: transparent;
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          color: #374151;
        }
        .flexi-srch input::placeholder { color: #9ca3af }
        .flexi-srch button {
          padding: 0 16px; background: #6366f1; border: none;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: background .15s;
        }
        .flexi-srch button:hover { background: #4f46e5 }
        .flexi-btn-ind {
          display: inline-flex; align-items: center; gap: 7px;
          cursor: pointer; background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #fff; border: none; font-weight: 700; border-radius: 999px;
          transition: all .2s; box-shadow: 0 4px 14px rgba(99,102,241,.38);
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          text-decoration: none;
        }
        .flexi-btn-ind:hover { box-shadow: 0 6px 22px rgba(99,102,241,.55); transform: translateY(-1px) }
        @media(max-width: 768px) {
          .flexi-hide-sm { display: none !important }
          .flexi-show-sm { display: flex !important }
        }
        @media(min-width: 769px) {
          .flexi-show-sm { display: none !important }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${scrolled ? '#e5e7eb' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.06)' : 'none',
        transition: 'all .25s',
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
      }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 16px' }}>

          {/* Row 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 64 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
              {/* FB Logo matching the uploaded image - dark indigo square with rounded corners */}
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #3730a3, #4338ca)',
                boxShadow: '0 4px 14px rgba(67,56,202,.4)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Shopping bag icon overlay (like in photo) */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
                    style={{ fontSize: '11px', fontWeight: 900, fill: '#fff', letterSpacing: '-0.5px' }}>
                    FB
                  </text>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 18.5, color: '#111827', lineHeight: 1, letterSpacing: -0.6 }}>
                  Flexi<span style={{ color: '#6366f1' }}>Berry</span>
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 2 }}>
                  Shop · Pay · Smile
                </div>
              </div>
            </Link>

            {/* Search */}
            <div className="flexi-srch flexi-hide-sm" style={{ flex: 1, maxWidth: 520, margin: '0 14px' }}>
              <input type="text" placeholder="Search products, brands and categories..." />
              <button aria-label="Search">
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
              <Link href="/auth/login" className="flexi-nav-lnk flexi-hide-sm" style={{ height: 38, padding: '0 14px' }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Login
              </Link>
              <Link href="/cart" className="flexi-btn-ind" style={{ padding: '9px 18px', fontSize: 13.5 }}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span className="flexi-hide-sm">Cart</span>
              </Link>
              {/* Mobile menu */}
              <button
                className="flexi-show-sm"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  border: '1.5px solid #e5e7eb', background: '#fff',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Menu"
              >
                <svg width="18" height="18" fill="none" stroke="#374151" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}/>
                </svg>
              </button>
            </div>
          </div>

          {/* Row 2 — Nav */}
          <div className="flexi-hide-sm" style={{ display: 'flex', alignItems: 'center', height: 46, borderTop: '1px solid #f3f4f6', gap: 2 }}>

            {/* All Categories */}
            <div data-dd style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => { setCatOpen(!catOpen); setVendOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, height: 46,
                  padding: '0 18px', background: catOpen ? '#4338ca' : '#6366f1',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 700, fontFamily: 'inherit', transition: 'background .15s',
                }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                All Categories
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  style={{ transform: catOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {catOpen && (
                <div className="flexi-dd-menu" style={{ width: 270 }}>
                  <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                    {CATS.map(c => (
                      <Link key={c.slug} href={`/products?category=${c.slug}`} className="flexi-dd-row"
                        onClick={() => setCatOpen(false)}>
                        <span style={{ fontSize: 18 }}>{c.e}</span>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: '#111827' }}>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/" className="flexi-nav-lnk">🏠 Home</Link>
            <Link href="/products?sale=true" className="flexi-nav-lnk">⚡ Flash Sale</Link>
            <Link href="/products?sort=new" className="flexi-nav-lnk">✨ New Arrivals</Link>
            <Link href="/about" className="flexi-nav-lnk">About</Link>
            <Link href="/contact" className="flexi-nav-lnk">Contact</Link>

            {/* Sell as Vendor */}
            <div data-dd style={{ position: 'relative', marginLeft: 4 }}>
              <button
                onClick={() => { setVendOpen(!vendOpen); setCatOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, height: 34,
                  padding: '0 14px', border: '1.5px solid #e5e7eb', borderRadius: 10,
                  background: '#fff', cursor: 'pointer', fontSize: 13.5, fontWeight: 700,
                  color: '#374151', fontFamily: 'inherit', transition: 'all .15s',
                }}
                onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#6366f1'; el.style.color = '#6366f1' }}
                onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#e5e7eb'; el.style.color = '#374151' }}
              >
                🏪 Sell as Vendor
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  style={{ transform: vendOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {vendOpen && (
                <div className="flexi-dd-menu" style={{ width: 205 }}>
                  {[['Register as Vendor', '/auth/register?type=seller'], ['Vendor Dashboard', '/vendor/dashboard'], ['How to Sell', '/#how-it-works']].map(([lbl, href]) => (
                    <Link key={lbl} href={href} onClick={() => setVendOpen(false)}
                      style={{
                        display: 'block', padding: '11px 16px', fontSize: 13.5,
                        fontWeight: 600, color: '#374151', textDecoration: 'none', transition: 'all .12s',
                        fontFamily: 'inherit',
                      }}
                      onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#f5f3ff'; el.style.color = '#6366f1' }}
                      onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#374151' }}
                    >
                      {lbl}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <Link href="/products" className="flexi-btn-ind" style={{ padding: '8px 18px', fontSize: 13 }}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Shop Now · Pay in Installments
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '14px 16px' }}>
            <div className="flexi-srch" style={{ marginBottom: 14 }}>
              <input type="text" placeholder="Search products..." />
              <button aria-label="Search">
                <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
              {CATS.slice(0, 6).map(c => (
                <Link key={c.slug} href={`/products?category=${c.slug}`} onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                    borderRadius: 10, background: '#f5f3ff', border: '1px solid #e0e7ff',
                    textDecoration: 'none',
                  }}>
                  <span style={{ fontSize: 18 }}>{c.e}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: '#374151' }}>{c.name}</span>
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {[['🏠 Home', '/'], ['⚡ Flash Sale', '/products?sale=true'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  style={{ padding: '10px 12px', borderRadius: 10, background: '#f9fafb', textDecoration: 'none', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  {label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1, textAlign: 'center', padding: '11px', borderRadius: 12,
                  border: '1.5px solid #e5e7eb', fontSize: 14, fontWeight: 700,
                  color: '#374151', textDecoration: 'none', fontFamily: 'inherit',
                }}>
                Login
              </Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}
                className="flexi-btn-ind" style={{ flex: 1, justifyContent: 'center', padding: '11px', borderRadius: 12, fontSize: 14 }}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main style={{ minHeight: '60vh' }}>
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0d1117', color: '#fff', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
        {/* CTA strip */}
        <div style={{ background: 'linear-gradient(90deg, #312e81, #4c1d95)', padding: '18px 16px' }}>
          <div style={{ maxWidth: 1340, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,.9)', fontWeight: 500 }}>
              🚀 Ready to start shopping on installments?
            </span>
            <Link href="/auth/register" className="flexi-btn-ind" style={{ padding: '9px 22px', fontSize: 13.5 }}>
              Get Started Free →
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '48px 16px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 36 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: 'linear-gradient(135deg, #3730a3, #4338ca)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(67,56,202,.4)',
                }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, letterSpacing: -0.5 }}>FB</span>
                </div>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>FlexiBerry</span>
              </div>
              <p style={{ color: '#6b7280', fontSize: 13.5, lineHeight: 1.75, marginBottom: 20, maxWidth: 270 }}>
                Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments across Pakistan.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['f', 'Facebook'], ['📸', 'Instagram'], ['𝕏', 'Twitter'], ['▶', 'YouTube']].map(([ic, lb]) => (
                  <a key={lb} href="#" title={lb} style={{
                    width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'all .18s',
                  }}
                  onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#6366f1'; el.style.color = '#fff'; el.style.transform = 'translateY(-2px)' }}
                  onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.07)'; el.style.color = 'rgba(255,255,255,.55)'; el.style.transform = 'none' }}>
                    {ic}
                  </a>
                ))}
              </div>
            </div>

            {[
              { h: 'Quick Links',   links: [['About Us', '/about'], ['Contact', '/contact'], ['Vendor Registration', '/auth/register?type=seller'], ['Blog', '#'], ['Careers', '#']] },
              { h: 'Customer Care', links: [['Help Center', '#'], ['How to Buy', '#'], ['Returns Policy', '#'], ['KYC Guide', '#'], ['Payment Methods', '#']] },
              { h: 'Contact Us',    links: [['support@flexiberry.pk', 'mailto:support@flexiberry.pk'], ['+92 300 1234567', '#'], ['Lahore, Punjab, Pakistan', '#']] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: -0.2 }}>
                  {col.h}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} style={{ color: '#6b7280', fontSize: 13.5, textDecoration: 'none', transition: 'color .15s' }}
                        onMouseOver={e => (e.currentTarget as HTMLElement).style.color = '#a5b4fc'}
                        onMouseOut={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 22,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
            alignItems: 'center', gap: 10,
          }}>
            <p style={{ color: '#4b5563', fontSize: 13, margin: 0 }}>© 2026 FlexiBerry. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {[['Privacy Policy', '#'], ['Terms of Service', '#']].map(([l, href]) => (
                <a key={l} href={href} style={{ color: '#4b5563', fontSize: 13, textDecoration: 'none', transition: 'color .15s' }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.color = '#a5b4fc'}
                  onMouseOut={e => (e.currentTarget as HTMLElement).style.color = '#4b5563'}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}