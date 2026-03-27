'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, LogOut, LayoutDashboard, UserPlus, ShoppingBag, ChevronDown, Search, Heart, Menu, X, PlusCircle } from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// Single source of truth — imported from carousel
// ─────────────────────────────────────────────────────────────
import { CATEGORY_THEMES } from '@/components/ui/carousel'
export { CATEGORY_THEMES }

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
  const [scrolled, setScrolled]   = useState(false)
  const [catOpen, setCatOpen]     = useState(false)
  const [userOpen, setUserOpen]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [user, setUser]           = useState<any>(null)
  const pathname = usePathname()
  const router   = useRouter()

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user')
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }
    checkUser()
    window.addEventListener('storage', checkUser)
    return () => window.removeEventListener('storage', checkUser)
  }, [])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-dd]')) {
        setCatOpen(false)
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
    window.dispatchEvent(new Event('storage'))
  }

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
          position: absolute; top: calc(100% + 6px); right: 0;
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

      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${scrolled ? '#e5e7eb' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.06)' : 'none',
        transition: 'all .25s',
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
      }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 64 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #3730a3, #4338ca)',
                boxShadow: '0 4px 14px rgba(67,56,202,.4)',
              }}>
                <ShoppingBag size={22} color="white" />
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
              <button aria-label="Search"><Search size={16} color="white" /></button>
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
              {user ? (
                <div data-dd style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserOpen(!userOpen)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, height: 40,
                      padding: '0 12px', borderRadius: 12, border: '1.5px solid #e5e7eb',
                      background: '#fff', cursor: 'pointer', transition: 'all .15s'
                    }}
                    onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = '#6366f1'}
                    onMouseOut={e  => (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                      <User size={14} />
                    </div>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: '#374151' }}>{user.firstName}</span>
                    <ChevronDown size={14} color="#9ca3af" />
                  </button>
                  {userOpen && (
                    <div className="flexi-dd-menu" style={{ width: 220, top: 'calc(100% + 8px)' }}>
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                        <p style={{ fontSize: 11, fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Signed in as</p>
                        <p style={{ fontSize: 13.5, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                      </div>
                      <div style={{ padding: '6px' }}>
                        <Link href={user.role === 'seller' ? '/vendor/dashboard' : '/buyer/dashboard'} className="flexi-dd-row" style={{ borderRadius: 10 }}>
                          <LayoutDashboard size={16} color="#6366f1" />
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>Dashboard</span>
                        </Link>
                        <Link href="/auth/register" className="flexi-dd-row" style={{ borderRadius: 10 }}>
                          <PlusCircle size={16} color="#6366f1" />
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#374151' }}>Add Account</span>
                        </Link>
                        <button onClick={handleLogout} className="flexi-dd-row" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 10 }}>
                          <LogOut size={16} color="#ef4444" />
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#ef4444' }}>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="flexi-nav-lnk flexi-hide-sm" style={{ height: 38, padding: '0 14px' }}>
                    <User size={15} /> Login
                  </Link>
                  <Link href="/auth/register" className="flexi-btn-ind flexi-hide-sm" style={{ padding: '9px 18px', fontSize: 13.5 }}>
                    <UserPlus size={15} /> Sign Up
                  </Link>
                </>
              )}

              <button className="flexi-hide-sm" aria-label="Wishlist" style={{
                width: 38, height: 38, borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                color: '#9ca3af', transition: 'all .15s',
              }}>
                <Heart size={16} />
              </button>

              <Link href="/cart" className="flexi-btn-ind" style={{ padding: '9px 18px', fontSize: 13.5 }}>
                <ShoppingBag size={15} />
                <span className="flexi-hide-sm">Cart</span>
              </Link>

              <button className="flexi-show-sm" onClick={() => setMenuOpen(!menuOpen)} style={{
                width: 38, height: 38, borderRadius: 10, border: '1.5px solid #e5e7eb',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Category nav bar */}
          <div className="flexi-hide-sm" style={{ display: 'flex', alignItems: 'center', height: 46, borderTop: '1px solid #f3f4f6', gap: 2 }}>
            <div data-dd style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, height: 46,
                  padding: '0 18px', background: catOpen ? '#4338ca' : '#6366f1',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 700, fontFamily: 'inherit', transition: 'background .15s',
                }}
              >
                <Menu size={15} />
                All Categories
                <ChevronDown size={13} style={{ transform: catOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
              </button>
              {catOpen && (
                <div className="flexi-dd-menu" style={{ width: 270, left: 0, right: 'auto' }}>
                  <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                    {CATS.map(c => {
                      const t = CATEGORY_THEMES[c.slug]
                      return (
                        <Link
                          key={c.slug}
                          href={`/products?category=${c.slug}`}
                          className="flexi-dd-row"
                          onClick={() => setCatOpen(false)}
                          style={{ borderLeft: `3px solid ${t?.primary ?? '#6366f1'}` }}
                        >
                          <span style={{ fontSize: 18 }}>{c.e}</span>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: '#111827' }}>{c.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link href="/" className="flexi-nav-lnk">🏠 Home</Link>
            <Link href="/flash-sale" className="flexi-nav-lnk">⚡ Flash Sale</Link>
            <Link href="/products?sort=new" className="flexi-nav-lnk">✨ New Arrivals</Link>
            <Link href="/about" className="flexi-nav-lnk">About</Link>
            <Link href="/contact" className="flexi-nav-lnk">Contact</Link>

            <div style={{ marginLeft: 'auto' }}>
              <Link href="/products" className="flexi-btn-ind" style={{ padding: '8px 18px', fontSize: 13 }}>
                Shop Now · Pay in Installments
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '14px 16px' }}>
            <div className="flexi-srch" style={{ marginBottom: 14 }}>
              <input type="text" placeholder="Search products..." />
              <button aria-label="Search"><Search size={14} color="white" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {user ? (
                <>
                  <Link
                    href={user.role === 'seller' ? '/vendor/dashboard' : '/buyer/dashboard'}
                    onClick={() => setMenuOpen(false)}
                    style={{ padding: '10px 12px', borderRadius: 10, background: '#f5f3ff', textDecoration: 'none', fontSize: 14, fontWeight: 700, color: '#6366f1', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 10, background: '#fef2f2', border: 'none', fontSize: 14, fontWeight: 700, color: '#ef4444', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    style={{ flex: 1, textAlign: 'center', padding: '11px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, fontWeight: 700, color: '#374151', textDecoration: 'none' }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="flexi-btn-ind"
                    style={{ flex: 1, justifyContent: 'center', padding: '11px', borderRadius: 12, fontSize: 14 }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile category list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {CATS.map(c => {
                const t = CATEGORY_THEMES[c.slug]
                return (
                  <Link
                    key={c.slug}
                    href={`/products?category=${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 12px', borderRadius: 10,
                      background: `${t?.primary ?? '#6366f1'}11`,
                      textDecoration: 'none', fontSize: 13.5, fontWeight: 700,
                      color: t?.primary ?? '#6366f1',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{c.e}</span>
                    {c.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      <main style={{ minHeight: '60vh' }}>{children}</main>

      <footer style={{ background: '#0d1117', color: '#fff', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
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
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg, #3730a3, #4338ca)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: 14 }}>FB</span>
                </div>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>FlexiBerry</span>
              </div>
              <p style={{ color: '#6b7280', fontSize: 13.5, lineHeight: 1.75, marginBottom: 20, maxWidth: 270 }}>
                Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments across Pakistan.
              </p>
            </div>
            {[
              { h: 'Quick Links',   links: [['About Us', '/about'], ['Contact', '/contact'], ['Vendor Registration', '/auth/register?type=seller']] },
              { h: 'Customer Care', links: [['Help Center', '#'], ['How to Buy', '#'], ['Returns Policy', '#']] },
              { h: 'Contact Us',    links: [['support@flexiberry.pk', 'mailto:support@flexiberry.pk'], ['+92 300 1234567', '#']] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 16 }}>{col.h}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                  {col.links.map(([label, href]) => (
                    <li key={label}><a href={href} style={{ color: '#6b7280', fontSize: 13.5, textDecoration: 'none' }}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#4b5563', fontSize: 13, margin: 0 }}>© 2026 FlexiBerry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
