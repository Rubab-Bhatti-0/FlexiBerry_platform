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

// Get category color by category name
function getCategoryTheme(category: string) {
  const vendor = VENDORS.find(v => v.category === category)
  if (vendor) {
    return {
      color: vendor.categoryColor,
      bg: vendor.categoryBg,
      gradient: vendor.bannerGrad,
      light: vendor.themeBgLight
    }
  }
  return {
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.1)',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    light: '#f0f9ff'
  }
}

/* ─────────────── ENHANCED SHOP CARD COMPONENT ─────────────── */
function ShopCard({ vendor, view }: { vendor: typeof VENDORS[0], view: 'grid' | 'list' }) {
  const isGrid = view === 'grid'
  const theme = getCategoryTheme(vendor.category)

  return (
    <Link 
      href={`/shop/${vendor.id}`}
      style={{ 
        textDecoration: 'none',
        display: 'block',
        background: 'white',
        borderRadius: '16px',
        border: `2px solid ${theme.bg}`,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: '100%',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
      onMouseOver={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = `0 16px 32px ${theme.color}22`
        el.style.borderColor = theme.color
      }}
      onMouseOut={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'none'
        el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
        el.style.borderColor = theme.bg
      }}
    >
      <div style={{ 
        display: isGrid ? 'block' : 'flex',
        height: '100%'
      }}>
        {/* Banner/Image Area with Category Gradient */}
        <div style={{ 
          width: isGrid ? '100%' : '240px',
          height: isGrid ? '160px' : 'auto',
          background: theme.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '56px',
          position: 'relative',
          borderBottom: isGrid ? `4px solid ${theme.color}` : 'none'
        }}>
          {vendor.emoji || '🏪'}
          {vendor.verified && (
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'white',
              borderRadius: '50%',
              padding: '6px',
              display: 'flex',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
            }}>
              <BadgeCheck size={18} color={theme.color} fill={theme.color} stroke="white" />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div style={{ 
          padding: '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: isGrid ? '#fff' : `${theme.light}40`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px',
              color: theme.color,
              background: theme.bg,
              padding: '5px 10px',
              borderRadius: '8px'
            }}>
              {vendor.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span>{vendor.rating}</span>
              <span style={{ color: '#9ca3af', fontWeight: 600 }}>({vendor.reviews})</span>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.3 }}>
            {vendor.name}
          </h3>
          
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.6, flex: 1 }}>
            {vendor.description}
          </p>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            paddingTop: '16px', 
            borderTop: `1px solid ${theme.bg}`,
            fontSize: '13px',
            color: '#64748b',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color={theme.color} />
              <span style={{ fontWeight: 600 }}>{vendor.city}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Package size={14} color={theme.color} />
              <span style={{ fontWeight: 600 }}>{vendor.products} Products</span>
            </div>
            {vendor.verified && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: theme.color }}>
                <Sparkles size={14} />
                Verified
              </div>
            )}
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

  const categoryTheme = getCategoryTheme(selectedCategory !== 'All' ? selectedCategory : 'Electronics')

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

      {/* Header with Category Theme */}
      <div style={{ background: categoryTheme.light, borderBottom: `3px solid ${categoryTheme.color}`, padding: '32px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: -1 }}>
            All Shops
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
            Discover {VENDORS.length} verified sellers. {filtered.length} shops match your filters.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 20px' }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          border: `2px solid ${categoryTheme.color}`,
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '24px',
          background: 'white',
          boxShadow: `0 4px 12px ${categoryTheme.color}15`
        }}>
          <input
            type="text"
            placeholder="Search shops by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '14px 18px',
              fontSize: '14px',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'inherit',
            }}
          />
          <button style={{
            padding: '0 18px',
            background: categoryTheme.color,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s'
          }} onMouseOver={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'} onMouseOut={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
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
              padding: '11px 14px',
              borderRadius: '10px',
              border: `2px solid ${categoryTheme.bg}`,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'white',
              fontFamily: 'inherit',
              color: '#0f172a',
              transition: 'all .2s'
            }}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* City */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '11px 14px',
              borderRadius: '10px',
              border: `2px solid ${categoryTheme.bg}`,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'white',
              fontFamily: 'inherit',
              color: '#0f172a',
              transition: 'all .2s'
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
              border: `2px solid ${view === 'grid' ? categoryTheme.color : '#e5e7eb'}`,
              background: view === 'grid' ? categoryTheme.color : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: view === 'grid' ? 'white' : '#6b7280',
              transition: 'all .2s'
            }}
          >
            <Grid3X3 size={18} />
          </button>

          {/* List View */}
          <button
            onClick={() => setView('list')}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: `2px solid ${view === 'list' ? categoryTheme.color : '#e5e7eb'}`,
              background: view === 'list' ? categoryTheme.color : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: view === 'list' ? 'white' : '#6b7280',
              transition: 'all .2s'
            }}
          >
            <List size={18} />
          </button>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className={view === 'grid' ? 'shop-grid' : 'shop-list'}>
            {filtered.map(vendor => (
              <ShopCard key={vendor.id} vendor={vendor} view={view} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              No shops found
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
