'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search, Star, MapPin, Package, BadgeCheck, Sparkles, Grid3X3, List,
  ArrowUpRight, Zap, ChevronDown, X, Flame
} from 'lucide-react'

/* ─────────────── VENDOR DATA WITH CATEGORY COLORS ─────────────── */
const VENDORS = [
  {
    id: 'techzone',
    name: 'TechZone Electronics',
    category: 'Electronics',
    categoryColor: '#2563eb',
    categoryBg: 'rgba(37,99,235,0.10)',
    city: 'Lahore',
    description: 'Premium electronics & gadgets — phones, laptops, accessories & more.',
    rating: 4.8,
    reviews: 1240,
    products: 320,
    verified: true,
    featured: true,
    installments: true,
    emoji: '⚡',
    bannerGrad: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
    joined: '2022',
  },
  {
    id: 'homekart',
    name: 'HomeKart Pakistan',
    category: 'Home & Living',
    categoryColor: '#059669',
    categoryBg: 'rgba(5,150,105,0.10)',
    city: 'Karachi',
    description: 'Appliances, furniture & packages — complete home solutions.',
    rating: 4.6,
    reviews: 875,
    products: 210,
    verified: true,
    featured: true,
    installments: true,
    emoji: '🏠',
    bannerGrad: 'linear-gradient(135deg, #047857 0%, #0891b2 100%)',
    joined: '2021',
  },
  {
    id: 'megadeal',
    name: 'MegaDeal Motors',
    category: 'Motors & Energy',
    categoryColor: '#7c3aed',
    categoryBg: 'rgba(124,58,237,0.10)',
    city: 'Islamabad',
    description: 'Vehicles, solar & heavy items — all on easy installments.',
    rating: 4.7,
    reviews: 560,
    products: 95,
    verified: true,
    featured: true,
    installments: true,
    emoji: '🚗',
    bannerGrad: 'linear-gradient(135deg, #6d28d9 0%, #db2777 100%)',
    joined: '2023',
  },
  {
    id: 'solarpk',
    name: 'SolarPK Solutions',
    category: 'Solar & Energy',
    categoryColor: '#d97706',
    categoryBg: 'rgba(217,119,6,0.10)',
    city: 'Lahore',
    description: 'Go green with premium solar panels & energy systems.',
    rating: 4.9,
    reviews: 420,
    products: 68,
    verified: true,
    featured: false,
    installments: true,
    emoji: '☀️',
    bannerGrad: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
    joined: '2023',
  },
  {
    id: 'jazbajahez',
    name: 'Jazba Jahez Store',
    category: 'Jahez & Dowry',
    categoryColor: '#be185d',
    categoryBg: 'rgba(190,24,93,0.10)',
    city: 'Faisalabad',
    description: 'Complete jahez packages — furniture, appliances & bedding bundles.',
    rating: 4.5,
    reviews: 980,
    products: 145,
    verified: true,
    featured: false,
    installments: true,
    emoji: '🎁',
    bannerGrad: 'linear-gradient(135deg, #9d174d 0%, #ec4899 100%)',
    joined: '2021',
  },
  {
    id: 'bikeworld',
    name: 'BikeWorld Pakistan',
    category: 'Bikes & Scooters',
    categoryColor: '#0891b2',
    categoryBg: 'rgba(8,145,178,0.10)',
    city: 'Rawalpindi',
    description: 'Honda, Yamaha & electric bikes — all models on installments.',
    rating: 4.4,
    reviews: 670,
    products: 87,
    verified: true,
    featured: false,
    installments: true,
    emoji: '🏍️',
    bannerGrad: 'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
    joined: '2022',
  },
  {
    id: 'furniturehub',
    name: 'Furniture Hub PK',
    category: 'Furniture',
    categoryColor: '#92400e',
    categoryBg: 'rgba(146,64,14,0.10)',
    city: 'Multan',
    description: 'Bedroom sets, sofas & office furniture — crafted with quality.',
    rating: 4.3,
    reviews: 340,
    products: 192,
    verified: false,
    featured: false,
    installments: false,
    emoji: '🛋️',
    bannerGrad: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
    joined: '2023',
  },
  {
    id: 'mobilezone',
    name: 'MobileZone Official',
    category: 'Mobiles',
    categoryColor: '#2563eb',
    categoryBg: 'rgba(37,99,235,0.10)',
    city: 'Karachi',
    description: 'Official reseller of Samsung, iPhone, Xiaomi & more brands.',
    rating: 4.7,
    reviews: 2100,
    products: 450,
    verified: true,
    featured: true,
    installments: true,
    emoji: '📱',
    bannerGrad: 'linear-gradient(135deg, #1e40af 0%, #0891b2 100%)',
    joined: '2020',
  },
  {
    id: 'rawstore',
    name: 'RawStore Materials',
    category: 'Raw Materials',
    categoryColor: '#374151',
    categoryBg: 'rgba(55,65,81,0.10)',
    city: 'Sialkot',
    description: 'Construction & industrial raw materials at wholesale prices.',
    rating: 4.2,
    reviews: 210,
    products: 310,
    verified: false,
    featured: false,
    installments: false,
    emoji: '🧱',
    bannerGrad: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
    joined: '2024',
  },
]

const CATEGORIES = ['All', 'Electronics', 'Mobiles', 'Home & Living', 'Motors & Energy', 'Solar & Energy', 'Jahez & Dowry', 'Bikes & Scooters', 'Furniture', 'Raw Materials']
const CITIES = ['All Cities', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Sialkot']

/* ─────────────── SHOP CARD COMPONENT ─────────────── */
const ShopCard = ({ vendor, view }: { vendor: typeof VENDORS[0]; view: 'grid' | 'list' }) => {
  const [hovered, setHovered] = useState(false)

  if (view === 'list') {
    return (
      <Link href={`/shop/${vendor.id}`} style={{ textDecoration: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: 'white',
            borderRadius: '16px',
            border: `1.5px solid ${hovered ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.08)'}`,
            boxShadow: hovered ? '0 12px 40px rgba(99,102,241,0.14)' : '0 2px 12px rgba(0,0,0,0.04)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
            transform: hovered ? 'translateY(-2px)' : 'none',
            cursor: 'pointer',
          }}>
          {/* Logo */}
          <div style={{
            height: '60px',
            width: '60px',
            borderRadius: '16px',
            flexShrink: 0,
            background: vendor.bannerGrad,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
          }}>{vendor.emoji}</div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                {vendor.name}
              </span>
              {vendor.verified && <BadgeCheck size={15} color="#2563eb" />}
              {vendor.featured && (
                <span style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '99px',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  color: 'white',
                }}>FEATURED</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 9px', borderRadius: '99px', background: vendor.categoryBg, color: vendor.categoryColor }}>{vendor.category}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#64748b' }}>
                <MapPin size={11} /> {vendor.city}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0', lineHeight: 1.5 }}>{vendor.description}</p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '20px', flexShrink: 0, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f59e0b' }}>★ {vendor.rating}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{vendor.reviews} reviews</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{vendor.products}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Products</div>
            </div>
            {vendor.installments && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#2563eb' }}>⚡ Kisti</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Available</div>
              </div>
            )}
          </div>

          {/* CTA */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '12px',
            background: hovered ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : 'transparent',
            border: `1.5px solid ${hovered ? 'transparent' : 'rgba(37,99,235,0.20)'}`,
            color: hovered ? 'white' : '#2563eb',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: hovered ? '0 6px 20px rgba(37,99,235,0.35)' : 'none',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}>
            Visit <ArrowUpRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/shop/${vendor.id}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'white',
          borderRadius: '18px',
          border: `1.5px solid ${hovered ? 'rgba(37,99,235,0.22)' : 'rgba(37,99,235,0.07)'}`,
          boxShadow: hovered
            ? '0 20px 50px rgba(37,99,235,0.14)'
            : '0 2px 12px rgba(0,0,0,0.04)',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          transform: hovered ? 'translateY(-6px) scale(1.01)' : 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
        }}>

        {/* Banner */}
        <div style={{
          height: '100px',
          background: vendor.bannerGrad,
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: '-30px', right: '-20px' }} />
          <div style={{ position: 'absolute', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', bottom: '-20px', right: '40px' }} />

          {/* Emoji */}
          <div style={{
            position: 'absolute',
            bottom: '-16px',
            left: '20px',
            height: '52px',
            width: '52px',
            borderRadius: '14px',
            background: 'white',
            boxShadow: '0 6px 20px rgba(0,0,0,0.20)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            border: '2px solid white',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.12) rotate(-4deg)' : 'scale(1)',
          }}>{vendor.emoji}</div>

          {/* Badges */}
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {vendor.featured && (
              <span style={{
                fontSize: '9px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '99px',
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.40)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}>
                <Sparkles size={8} /> FEATURED
              </span>
            )}
            {vendor.installments && (
              <span style={{
                fontSize: '9px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '99px',
                background: 'rgba(255,255,255,0.20)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.35)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}>
                <Zap size={8} /> KISTI
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '26px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.2 }}>
            {vendor.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 9px',
              borderRadius: '99px',
              background: vendor.categoryBg,
              color: vendor.categoryColor,
            }}>{vendor.category}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#94a3b8' }}>
              <MapPin size={10} /> {vendor.city}
            </span>
          </div>

          <p style={{
            fontSize: '12px',
            color: '#64748b',
            lineHeight: 1.5,
            margin: '0 0 12px 0',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {vendor.description}
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0',
            borderTop: '1px solid rgba(37,99,235,0.07)',
            padding: '10px 0',
            margin: '10px -2px 0',
          }}>
            <div style={{ textAlign: 'center', padding: '0 4px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f59e0b' }}>★{vendor.rating}</div>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>{vendor.reviews}+ reviews</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 4px', borderLeft: '1px solid rgba(37,99,235,0.07)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{vendor.products}</div>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>Products</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 4px', borderLeft: '1px solid rgba(37,99,235,0.07)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb' }}>Kisti</div>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>Available</div>
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
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

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
    </div>
  )
}
