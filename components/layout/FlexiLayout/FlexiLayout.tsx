'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Category data with color schemes
export const CATEGORY_THEMES: Record<string, { 
  primary: string; 
  secondary: string; 
  accent: string; 
  bg: string;
  gradient: string;
  text: string;
}> = {
  smartphones: { 
    primary: '#6366f1', secondary: '#818cf8', accent: '#4f46e5', 
    bg: '#eef2ff', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)', text: '#312e81'
  },
  laptops: { 
    primary: '#8b5cf6', secondary: '#a78bfa', accent: '#7c3aed', 
    bg: '#f5f3ff', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', text: '#4c1d95'
  },
  bikes: { 
    primary: '#f97316', secondary: '#fb923c', accent: '#ea580c', 
    bg: '#fff7ed', gradient: 'linear-gradient(135deg, #f97316, #ea580c)', text: '#7c2d12'
  },
  appliances: { 
    primary: '#0ea5e9', secondary: '#38bdf8', accent: '#0284c7', 
    bg: '#f0f9ff', gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)', text: '#075985'
  },
  solar: { 
    primary: '#eab308', secondary: '#facc15', accent: '#ca8a04', 
    bg: '#fefce8', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', text: '#713f12'
  },
  furniture: { 
    primary: '#14b8a6', secondary: '#2dd4bf', accent: '#0d9488', 
    bg: '#f0fdfa', gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)', text: '#134e4a'
  },
  jahez: { 
    primary: '#ec4899', secondary: '#f472b6', accent: '#db2777', 
    bg: '#fdf2f8', gradient: 'linear-gradient(135deg, #ec4899, #db2777)', text: '#831843'
  },
  cars: { 
    primary: '#06b6d4', secondary: '#22d3ee', accent: '#0891b2', 
    bg: '#ecfeff', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', text: '#164e63'
  },
  business: { 
    primary: '#22c55e', secondary: '#4ade80', accent: '#16a34a', 
    bg: '#f0fdf4', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', text: '#14532d'
  },
  general: { 
    primary: '#f59e0b', secondary: '#fbbf24', accent: '#d97706', 
    bg: '#fffbeb', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', text: '#78350f'
  },
  electronics: { 
    primary: '#6366f1', secondary: '#818cf8', accent: '#4f46e5', 
    bg: '#eef2ff', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)', text: '#312e81'
  },
  vehicles: { 
    primary: '#f97316', secondary: '#fb923c', accent: '#ea580c', 
    bg: '#fff7ed', gradient: 'linear-gradient(135deg, #f97316, #ea580c)', text: '#7c2d12'
  },
  energy: { 
    primary: '#eab308', secondary: '#facc15', accent: '#ca8a04', 
    bg: '#fefce8', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', text: '#713f12'
  },
  default: { 
    primary: '#3730a3', secondary: '#6366f1', accent: '#4338ca', 
    bg: '#f4f5fb', gradient: 'linear-gradient(135deg, #3730a3, #4338ca)', text: '#1e1b4b'
  },
}

const TICKER = [
  'iPhone 15 Pro - Starting PKR 45,833/mo',
  'Honda CD 70 on Easy Installments',
  'Jahez Packages - Bundle & Save 50%',
  'Solar Systems - Go Green Today',
  'Free Nationwide Delivery',
  '0% Commission for first 90 days!',
]

const CATS = [
  { name: 'Smartphones',    slug: 'smartphones' },
  { name: 'Laptops',        slug: 'laptops'     },
  { name: 'Scotty & Bikes', slug: 'bikes'       },
  { name: 'Appliances',     slug: 'appliances'  },
  { name: 'Solar Systems',  slug: 'solar'       },
  { name: 'Furniture',      slug: 'furniture'   },
  { name: 'Jahez Packages', slug: 'jahez'       },
  { name: 'Car Financing',  slug: 'cars'        },
  { name: 'Business Stock', slug: 'business'    },
  { name: 'General Store',  slug: 'general'     },
]

interface FlexiLayoutProps {
  children: React.ReactNode
  categoryTheme?: string
}

export default function FlexiLayout({ children, categoryTheme }: FlexiLayoutProps) {
  const [scrolled, setScrolled] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [vendOpen, setVendOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hello! Welcome to FlexiBerry. How can I help you today?' }
  ])
  const [chatInput, setChatInput] = useState('')
  const pathname = usePathname()

  const theme = CATEGORY_THEMES[categoryTheme || 'default'] || CATEGORY_THEMES.default

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

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const handleSendChat = useCallback(() => {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setChatInput('')
    
    setTimeout(() => {
      let response = 'Thank you for your message! Our team will assist you shortly. You can also call us at +92 300 1234567 or email support@flexiberry.com'
      
      if (userMsg.toLowerCase().includes('installment') || userMsg.toLowerCase().includes('payment')) {
        response = 'Our installment plans offer 6 or 12 month options with minimal down payment (typically 20%). No credit card needed - just your CNIC for verification!'
      } else if (userMsg.toLowerCase().includes('delivery') || userMsg.toLowerCase().includes('shipping')) {
        response = 'We offer FREE nationwide delivery across Pakistan! Most orders are delivered within 3-5 business days.'
      } else if (userMsg.toLowerCase().includes('return') || userMsg.toLowerCase().includes('refund')) {
        response = 'We have a 7-day easy return policy. Products must be in original condition. Refunds are processed within 5-7 business days.'
      } else if (userMsg.toLowerCase().includes('kyc') || userMsg.toLowerCase().includes('verification')) {
        response = 'For KYC verification, you need your CNIC (front & back), a selfie, and a bank statement or salary slip. Verification takes 3-5 business days.'
      }
      
      setChatMessages(prev => [...prev, { role: 'bot', text: response }])
    }, 800)
  }, [chatInput])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box }
        
        /* Ticker Animation */
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { display: inline-flex; white-space: nowrap; animation: ticker 35s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
        
        /* Toast Animation */
        @keyframes toastAnim { 0% { opacity: 0; transform: translateY(10px) } 12% { opacity: 1; transform: translateY(0) } 88% { opacity: 1 } 100% { opacity: 0 } }
        .toast-el { animation: toastAnim 2.8s ease forwards; }
        
        .flexi-nav-lnk {
          display: flex; align-items: center; gap: 5px;
          padding: 0 12px; height: 44px;
          font-size: 13.5px; font-weight: 600; color: #374151;
          text-decoration: none; border-radius: 10px;
          transition: all .15s; white-space: nowrap;
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        }
        .flexi-nav-lnk:hover { color: ${theme.primary}; background: ${theme.bg} }
        
        .flexi-dd-menu {
          position: absolute; top: calc(100% + 6px); left: 0;
          background: #fff; border: 1.5px solid #e5e7eb;
          border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,.13);
          z-index: 200; overflow: hidden;
        }
        .flexi-dd-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; text-decoration: none; transition: background .12s;
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        }
        .flexi-dd-row:hover { background: ${theme.bg} }
        
        .flexi-srch {
          display: flex; border: 1.5px solid #e5e7eb;
          border-radius: 13px; overflow: hidden; transition: all .2s; background: #fff;
        }
        .flexi-srch:focus-within { border-color: ${theme.primary}; box-shadow: 0 0 0 3px ${theme.primary}22 }
        .flexi-srch input {
          flex: 1; padding: 10px 15px; font-size: 13.5px;
          outline: none; background: transparent;
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          color: #374151; border: none;
        }
        .flexi-srch input::placeholder { color: #9ca3af }
        .flexi-srch button {
          padding: 0 16px; background: ${theme.primary}; border: none;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: background .15s;
        }
        .flexi-srch button:hover { background: ${theme.accent} }
        
        .flexi-btn-ind {
          display: inline-flex; align-items: center; gap: 7px;
          cursor: pointer; background: ${theme.gradient};
          color: #fff; border: none; font-weight: 700; border-radius: 999px;
          transition: all .2s; box-shadow: 0 4px 14px ${theme.primary}55;
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          text-decoration: none;
        }
        .flexi-btn-ind:hover { box-shadow: 0 6px 22px ${theme.primary}77; transform: translateY(-1px) }
        
        .flexi-btn-outline {
          display: inline-flex; align-items: center; gap: 7px;
          cursor: pointer; background: #fff;
          color: ${theme.primary}; border: 1.5px solid ${theme.primary}; font-weight: 700; border-radius: 999px;
          transition: all .2s;
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          text-decoration: none;
        }
        .flexi-btn-outline:hover { background: ${theme.bg}; }
        
        /* Chat Widget */
        .chat-widget {
          position: fixed; bottom: 24px; right: 24px; z-index: 1000;
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
        }
        .chat-bubble {
          width: 60px; height: 60px; border-radius: 50%;
          background: ${theme.gradient};
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 8px 30px ${theme.primary}44;
          transition: all 0.3s ease;
        }
        .chat-bubble:hover { transform: scale(1.1); box-shadow: 0 10px 40px ${theme.primary}66; }
        .chat-box {
          position: absolute; bottom: 75px; right: 0;
          width: 360px; max-width: calc(100vw - 48px);
          background: #fff; border-radius: 20px;
          box-shadow: 0 25px 80px rgba(0,0,0,.2);
          overflow: hidden;
        }
        .chat-header {
          background: ${theme.gradient};
          color: #fff; padding: 18px 20px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .chat-messages {
          height: 300px; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
          background: #f9fafb;
        }
        .chat-msg {
          max-width: 85%; padding: 12px 16px; border-radius: 18px;
          font-size: 14px; line-height: 1.5;
        }
        .chat-msg.user {
          background: ${theme.primary}; color: #fff;
          margin-left: auto; border-bottom-right-radius: 4px;
        }
        .chat-msg.bot {
          background: #fff; color: #374151;
          border: 1px solid #e5e7eb; border-bottom-left-radius: 4px;
        }
        .chat-input-area {
          padding: 14px; border-top: 1px solid #e5e7eb;
          display: flex; gap: 10px; background: #fff;
        }
        .chat-input-area input {
          flex: 1; padding: 12px 16px; border: 1.5px solid #e5e7eb;
          border-radius: 25px; outline: none; font-size: 14px;
          font-family: inherit;
        }
        .chat-input-area input:focus { border-color: ${theme.primary}; }
        .chat-input-area button {
          width: 44px; height: 44px; border-radius: 50%;
          background: ${theme.gradient}; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }
        .chat-input-area button:hover { transform: scale(1.05); }
        
        @media(max-width: 768px) {
          .flexi-hide-sm { display: none !important }
          .flexi-show-sm { display: flex !important }
          .chat-box { width: calc(100vw - 48px); right: 0; }
        }
        @media(min-width: 769px) {
          .flexi-show-sm { display: none !important }
        }
      `}</style>

      {/* TICKER MARQUEE */}
      <div style={{ background: 'linear-gradient(90deg, #1e1b4b, #2e2a7a)', overflow: 'hidden', padding: '9px 0' }}>
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', padding: '0 24px',
              fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,.88)', gap: 8,
              fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif"
            }}>
              <span style={{ color: categoryTheme ? CATEGORY_THEMES[categoryTheme]?.secondary || '#facc15' : '#facc15' }}>*</span>
              {t}
              <span style={{ opacity: .3, marginLeft: 8 }}>|</span>
            </span>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,.98)', backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${scrolled ? '#e5e7eb' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.06)' : 'none',
        transition: 'all .25s',
        fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      }}>
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 16px' }}>
          {/* Row 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 64 }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: theme.gradient,
                boxShadow: `0 4px 14px ${theme.primary}55`,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle"
                    style={{ fontSize: '10px', fontWeight: 900, fill: '#fff', letterSpacing: '-0.5px' }}>
                    FB
                  </text>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20, color: '#111827', lineHeight: 1, letterSpacing: -0.6 }}>
                  Flexi<span style={{ color: theme.primary }}>Berry</span>
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>
                  Shop . Pay . Smile
                </div>
              </div>
            </Link>

            {/* Search */}
            <div className="flexi-srch flexi-hide-sm" style={{ flex: 1, maxWidth: 520, margin: '0 20px' }}>
              <input type="text" placeholder="Search products, brands and categories..." />
              <button aria-label="Search">
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
              <Link href="/auth/login" className="flexi-nav-lnk flexi-hide-sm" style={{ height: 40, padding: '0 16px', border: '1.5px solid #e5e7eb', borderRadius: 12 }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Login
              </Link>
              <button className="flexi-hide-sm" aria-label="Wishlist" style={{
                width: 40, height: 40, borderRadius: 12, border: '1.5px solid #e5e7eb',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#6b7280', transition: 'all .15s',
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>
              <Link href="/cart" className="flexi-btn-ind" style={{ padding: '10px 20px', fontSize: 14 }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                <span className="flexi-hide-sm">Cart</span>
                <span style={{ background: '#fff', color: theme.primary, fontSize: 11, fontWeight: 800, padding: '2px 7px', borderRadius: 99 }}>0</span>
              </Link>
              {/* Mobile menu */}
              <button
                className="flexi-show-sm"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: 40, height: 40, borderRadius: 10,
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

          {/* Row 2 - Nav */}
          <nav className="flexi-hide-sm" style={{ display: 'flex', alignItems: 'center', height: 48, borderTop: '1px solid #f3f4f6', gap: 2 }}>
            {/* All Categories */}
            <div data-dd style={{ position: 'relative', flexShrink: 0 }}>
              <button
                onClick={() => { setCatOpen(!catOpen); setVendOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, height: 48,
                  padding: '0 20px', background: catOpen ? theme.accent : theme.primary,
                  color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '12px 12px 0 0',
                  fontSize: 14, fontWeight: 700, fontFamily: 'inherit', transition: 'background .15s',
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                All Categories
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  style={{ transform: catOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {catOpen && (
                <div className="flexi-dd-menu" style={{ width: 280 }}>
                  <div style={{ maxHeight: 400, overflowY: 'auto', padding: '8px 0' }}>
                    {CATS.map(c => {
                      const catTheme = CATEGORY_THEMES[c.slug] || CATEGORY_THEMES.default
                      return (
                        <Link key={c.slug} href={`/products?category=${c.slug}`} className="flexi-dd-row"
                          onClick={() => setCatOpen(false)}
                          style={{ margin: '2px 8px', borderRadius: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: catTheme.bg, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            border: `1.5px solid ${catTheme.primary}22`
                          }}>
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: catTheme.primary }} />
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{c.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link href="/" className="flexi-nav-lnk">Home</Link>
            <Link href="/products?sale=true" className="flexi-nav-lnk">Flash Sale</Link>
            <Link href="/products?sort=new" className="flexi-nav-lnk">New Arrivals</Link>

            {/* Sell as Vendor */}
            <div data-dd style={{ position: 'relative', marginLeft: 4 }}>
              <button
                onClick={() => { setVendOpen(!vendOpen); setCatOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, height: 36,
                  padding: '0 16px', border: `1.5px solid ${theme.primary}33`, borderRadius: 10,
                  background: theme.bg, cursor: 'pointer', fontSize: 13.5, fontWeight: 700,
                  color: theme.primary, fontFamily: 'inherit', transition: 'all .15s',
                }}
              >
                Sell as Vendor
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  style={{ transform: vendOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {vendOpen && (
                <div className="flexi-dd-menu" style={{ width: 220, padding: '8px 0' }}>
                  {[
                    ['Register as Vendor', '/auth/register?type=seller'],
                    ['Vendor Dashboard', '/vendor/dashboard'],
                    ['How to Sell', '/#how-it-works']
                  ].map(([lbl, href]) => (
                    <Link key={lbl} href={href} onClick={() => setVendOpen(false)}
                      style={{
                        display: 'block', padding: '12px 18px', fontSize: 14,
                        fontWeight: 600, color: '#374151', textDecoration: 'none', transition: 'all .12s',
                        fontFamily: 'inherit', margin: '2px 8px', borderRadius: 8,
                      }}
                      onMouseOver={e => { 
                        const el = e.currentTarget; 
                        el.style.background = theme.bg; 
                        el.style.color = theme.primary 
                      }}
                      onMouseOut={e => { 
                        const el = e.currentTarget; 
                        el.style.background = 'transparent'; 
                        el.style.color = '#374151' 
                      }}
                    >
                      {lbl}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <Link href="/products" className="flexi-btn-outline" style={{ padding: '9px 20px', fontSize: 13 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Shop Now . Pay in Installments
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '16px' }}>
            <div className="flexi-srch" style={{ marginBottom: 16 }}>
              <input type="text" placeholder="Search products..." />
              <button aria-label="Search">
                <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {CATS.slice(0, 6).map(c => {
                const catTheme = CATEGORY_THEMES[c.slug] || CATEGORY_THEMES.default
                return (
                  <Link key={c.slug} href={`/products?category=${c.slug}`} onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                      borderRadius: 12, background: catTheme.bg, border: `1px solid ${catTheme.primary}22`,
                      textDecoration: 'none',
                    }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: catTheme.primary }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{c.name}</span>
                  </Link>
                )
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {[['Home', '/'], ['Flash Sale', '/products?sale=true'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                  style={{ padding: '12px 14px', borderRadius: 10, background: '#f9fafb', textDecoration: 'none', fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  {label}
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                style={{
                  flex: 1, textAlign: 'center', padding: '12px', borderRadius: 12,
                  border: '1.5px solid #e5e7eb', fontSize: 14, fontWeight: 700,
                  color: '#374151', textDecoration: 'none',
                }}>
                Login
              </Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}
                className="flexi-btn-ind" style={{ flex: 1, justifyContent: 'center', padding: '12px', borderRadius: 12, fontSize: 14 }}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main style={{ minHeight: '60vh', background: '#f8fafc' }}>
        {children}
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#0f172a', color: '#fff', fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}>
        {/* CTA strip */}
        <div style={{ background: theme.gradient, padding: '20px 16px' }}>
          <div style={{ maxWidth: 1340, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 15, color: 'rgba(255,255,255,.95)', fontWeight: 500 }}>
              Ready to start shopping on installments?
            </span>
            <Link href="/auth/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', background: '#fff', color: theme.primary,
              borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: 'none',
              transition: 'all .2s', boxShadow: '0 4px 14px rgba(0,0,0,.15)'
            }}>
              Get Started Free
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '56px 16px 36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: theme.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 14px ${theme.primary}55`,
                }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, letterSpacing: -0.5 }}>FB</span>
                </div>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>FlexiBerry</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.75, marginBottom: 24, maxWidth: 280 }}>
                Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments across Pakistan.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', label: 'Facebook' },
                  { icon: 'M16 8a6 6 0 01-12 0 6 6 0 0112 0zM22 4s-.8 2-2.5 3c0 4-2.5 8-7.5 10-3 0-5.5-1-7.5-3 2 0 4-.5 5.5-2-2 0-3.5-1.5-4-3.5 1 0 2 0 2-.5-2-.5-3.5-2.5-3.5-5 .5.5 1.5.5 2 .5C3 4 2.5 2 3.5.5 6 3.5 9.5 5 13 5c0-1 .5-2 1.5-2.5C16 2 17 2.5 18 4h4z', label: 'Twitter' },
                  { icon: 'M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-7 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM12 17.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z', label: 'Instagram' },
                ].map(social => (
                  <a key={social.label} href="#" title={social.label} style={{
                    width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'all .2s',
                  }}
                  onMouseOver={e => { 
                    const el = e.currentTarget; 
                    el.style.background = theme.primary; 
                    el.style.color = '#fff'; 
                    el.style.transform = 'translateY(-2px)' 
                  }}
                  onMouseOut={e => { 
                    const el = e.currentTarget; 
                    el.style.background = 'rgba(255,255,255,.08)'; 
                    el.style.color = 'rgba(255,255,255,.6)'; 
                    el.style.transform = 'none' 
                  }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d={social.icon}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { h: 'Quick Links', links: [
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Vendor Registration', href: '/auth/register?type=seller' },
              ]},
              { h: 'Customer Care', links: [
                { label: 'Help Center', href: '#' },
                { label: 'How to Buy on Installments', href: '#' },
                { label: 'Returns Policy', href: '#' },
                { label: 'KYC Guide', href: '#' },
                { label: 'Payment Methods', href: '#' },
              ]},
              { h: 'Contact Us', links: [
                { label: 'support@flexiberry.com', href: 'mailto:support@flexiberry.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { label: '+92 300 1234567', href: 'tel:+923001234567', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                { label: 'Lahore, Punjab, Pakistan', href: '#', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
              ]},
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 20, letterSpacing: -.2 }}>
                  {col.h}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, margin: 0, padding: 0 }}>
                  {col.links.map(l => (
                    <li key={l.label}>
                      <a href={l.href} style={{ 
                        color: '#94a3b8', fontSize: 14, textDecoration: 'none', transition: 'color .15s',
                        display: 'flex', alignItems: 'center', gap: 8 
                      }}
                         onMouseOver={e => (e.currentTarget).style.color = theme.secondary}
                         onMouseOut={e => (e.currentTarget).style.color = '#94a3b8'}>
                        {'icon' in l && (
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d={l.icon}/>
                          </svg>
                        )}
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 28,
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
            alignItems: 'center', gap: 12 
          }}>
            <p style={{ color: '#64748b', fontSize: 13 }}>2026 FlexiBerry. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none', transition: 'color .15s' }}
                   onMouseOver={e => (e.currentTarget).style.color = theme.secondary}
                   onMouseOut={e => (e.currentTarget).style.color = '#64748b'}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CHATBOT */}
      <div className="chat-widget">
        {chatOpen && (
          <div className="chat-box">
            <div className="chat-header">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>FlexiBerry Support</div>
                <div style={{ fontSize: 12, opacity: .85 }}>We typically reply instantly</div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{
                background: 'rgba(255,255,255,.2)', border: 'none', borderRadius: 8,
                width: 32, height: 32, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input-area">
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              />
              <button onClick={handleSendChat} aria-label="Send">
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </div>
        )}
        <button className="chat-bubble" onClick={() => setChatOpen(!chatOpen)} aria-label="Open chat">
          {chatOpen ? (
            <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
            </svg>
          )}
        </button>
      </div>
    </>
  )
}

export { CATS }
