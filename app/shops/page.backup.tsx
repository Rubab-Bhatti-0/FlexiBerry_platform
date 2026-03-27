'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search, Star, MapPin, Package, BadgeCheck, Sparkles, Grid3X3, List,
  ArrowUpRight, Zap, ChevronDown, X, Flame, Menu
} from 'lucide-react'
import { VENDORS } from '@/lib/vendors'

// Derive CATEGORIES and CITIES from VENDORS
const CATEGORIES = ['All', ...Array.from(new Set(VENDORS.map(v => v.category)))]
const CITIES = ['All Cities', ...Array.from(new Set(VENDORS.map(v => v.city)))]

/* ─────────────── SHOP CARD COMPONENT ─────────────── */
function ShopCard({ vendor, view }: { vendor: typeof VENDORS[0], view: 'grid' | 'list' }) {
  const isGrid = view === 'grid'

  return (
    <Link 
      href={`/shop/${vendor.id}`}
      style={{ 
        textDecoration: 'none',
        display: 'block',
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: '100%',
        position: 'relative'
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(0,0,0,0.1)'
        e.currentTarget.style.borderColor = '#6366f1'
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = '#e5e7eb'
      }}
    >
      <div style={{ 
        display: isGrid ? 'block' : 'flex',
        height: '100%'
      }}>
        {/* Banner/Image Area */}
        <div style={{ 
          width: isGrid ? '100%' : '240px',
          height: isGrid ? '140px' : 'auto',
          background: vendor.bannerGrad || '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          position: 'relative'
        }}>
          {vendor.emoji || '🏪'}
          {vendor.verified && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'white',
              borderRadius: '50%',
              padding: '4px',
              display: 'flex',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <BadgeCheck size={16} color="#6366f1" fill="#6366f1" stroke="white" />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div style={{ 
          padding: '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px',
              color: vendor.categoryColor || '#6366f1',
              background: vendor.categoryBg || 'rgba(99, 102, 241, 0.1)',
              padding: '4px 8px',
              borderRadius: '6px'
            }}>
              {vendor.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
              {vendor.rating}
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
            {vendor.name}
          </h3>
          
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.5, flex: 1 }}>
            {vendor.description}
          </p>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            paddingTop: '16px', 
            borderTop: '1px solid #f3f4f6',
            fontSize: '13px',
            color: '#64748b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} />
              {vendor.city}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Package size={14} />
              {vendor.products} Products
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function ShopsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [searchTerm, setSearchTerm] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    return VENDORS.filter(v => {
      const matchCat = selectedCategory === 'All' || v.category === selectedCategory
      const matchCity = selectedCity === 'All Cities' || v.city === selectedCity
      const matchSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchCat && matchCity && matchSearch
    })
  }, [selectedCategory, selectedCity, searchTerm])

  return (
    <div style={{ background: '#f8f9fd', minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box }
        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0 }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        .shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; animation: fadeIn 0.4s ease }
        .shop-list { display: grid; grid-template-columns: 1fr; gap: 16px; animation: fadeIn 0.4s ease }
        @media (max-width: 768px) {
          .shop-grid { grid-template-columns: 1fr; gap: 16px }
        }
      `}</style>

      {/* ─────────────── FLEXIBERRY NAVBAR ─────────────── */}
      <header style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: '70px', gap: '24px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: 800, fontSize: '18px', color: '#6366f1' }}>
            <span style={{ fontSize: '24px' }}>🛍️</span>
            FlexiBerry
          </Link>

          {/* Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: '40px' }}>
            <Link href="/" style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', textDecoration: 'none', transition: 'color .2s' }}>
              Home
            </Link>
            <Link href="/shops" style={{ fontSize: '14px', fontWeight: 600, color: '#6366f1', textDecoration: 'none' }}>
              All Shops
            </Link>
            <Link href="/products" style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', textDecoration: 'none', transition: 'color .2s' }}>
              Products
            </Link>
          </nav>

          {/* CTA */}
          <div style={{ marginLeft: 'auto' }}>
            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '8px', background: '#6366f1', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 700, transition: 'all .2s' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Shop Now
            </Link>
          </div>
        </div>
      </header>

      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '24px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0' }}>
            All Shops
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
            Discover {VENDORS.length} verified sellers. {filtered.length} shops match your filters.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          border: '1.5px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '24px',
          background: 'white',
        }}>
          <input
            type="text"
            placeholder="Search shops by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '14px',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'inherit',
            }}
          />
          <button style={{
            padding: '0 16px',
            background: '#6366f1',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Search size={18} color="white" />
          </button>
        </div>

        {/* Category & City Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '12px', marginBottom: '24px' }}>
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1.5px solid #e5e7eb',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'white',
              fontFamily: 'inherit',
            }}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* City */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1.5px solid #e5e7eb',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'white',
              fontFamily: 'inherit',
            }}
          >
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* View Toggle */}
          <button
            onClick={() => setView('grid')}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: `1.5px solid ${view === 'grid' ? '#6366f1' : '#e5e7eb'}`,
              background: view === 'grid' ? '#6366f1' : 'white',
              color: view === 'grid' ? 'white' : '#6366f1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
            }}
          >
            <Grid3X3 size={18} />
          </button>

          <button
            onClick={() => setView('list')}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: `1.5px solid ${view === 'list' ? '#6366f1' : '#e5e7eb'}`,
              background: view === 'list' ? '#6366f1' : 'white',
              color: view === 'list' ? 'white' : '#6366f1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
            }}
          >
            <List size={18} />
          </button>
        </div>

        {/* Results */}
        <div className={view === 'grid' ? 'shop-grid' : 'shop-list'}>
          {filtered.length > 0 ? (
            filtered.map(vendor => <ShopCard key={vendor.id} vendor={vendor} view={view} />)
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 20px',
              color: '#64748b',
            }}>
              <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>
                No shops found
              </h3>
              <p style={{ fontSize: '14px', margin: 0 }}>Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer style={{ background: '#1f2937', color: '#fff', marginTop: '60px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: '#fff', letterSpacing: -0.5 }}>
                FlexiBerry
              </h3>
              <p style={{ color: '#9ca3af', fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>
                Buy now, pay later on installments. Shop from 1000s of products with 0% markup.
              </p>
            </div>

            {[
              { h: 'Quick Links', links: ['About Us', 'Contact', 'Careers', 'Blog', 'Vendor Registration'] },
              { h: 'Customer Care', links: ['Help Center', 'How to Buy on Installments', 'Returns Policy', 'KYC Guide', 'Payment Methods'] },
              { h: 'Contact Us', links: ['support@flexiberry.com', '+92 300 1234567', 'Lahore, Punjab, Pakistan'] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: -0.2 }}>
                  {col.h}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0 }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ color: '#6b7280', fontSize: 13.5, textDecoration: 'none', transition: 'color .15s' }}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 22, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <p style={{ color: '#4b5563', fontSize: 13 }}>© 2026 FlexiBerry. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ color: '#4b5563', fontSize: 13, textDecoration: 'none', transition: 'color .15s' }}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
