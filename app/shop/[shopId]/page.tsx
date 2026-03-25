'use client'

import { useState, useMemo } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, BadgeCheck, ShoppingCart, Heart, Flame, TrendingUp, Package } from 'lucide-react'

/* ─────────────── VENDOR & PRODUCT DATA ─────────────── */
const VENDORS: Record<string, any> = {
  techzone: {
    id: 'techzone',
    name: 'TechZone Electronics',
    category: 'Electronics',
    categoryColor: '#2563eb',
    categoryBg: 'rgba(37,99,235,0.10)',
    themeColor: '#2563eb',
    themeBg: '#eff6ff',
    themeBgLight: '#f0f9ff',
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
    established: 'Since 2022',
    subCategories: [
      { name: 'Smartphones', count: 120, icon: '📱' },
      { name: 'Laptops', count: 85, icon: '💻' },
      { name: 'Tablets', count: 45, icon: '📲' },
      { name: 'Accessories', count: 70, icon: '🔌' },
    ],
  },
  furniturehub: {
    id: 'furniturehub',
    name: 'Furniture Hub PK',
    category: 'Furniture',
    categoryColor: '#92400e',
    categoryBg: 'rgba(146,64,14,0.10)',
    themeColor: '#92400e',
    themeBg: '#fef3c7',
    themeBgLight: '#fefae0',
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
    established: 'Since 2023',
    subCategories: [
      { name: 'Bedroom Furniture', count: 50, icon: '🛏️' },
      { name: 'Living Room', count: 60, icon: '🛋️' },
      { name: 'Office Furniture', count: 45, icon: '🪑' },
      { name: 'Dining Sets', count: 37, icon: '🍽️' },
    ],
  },
  jazbajahez: {
    id: 'jazbajahez',
    name: 'Jazba Jahez Store',
    category: 'Jahez & Dowry',
    categoryColor: '#be185d',
    categoryBg: 'rgba(190,24,93,0.10)',
    themeColor: '#be185d',
    themeBg: '#fdf2f8',
    themeBgLight: '#fce7f3',
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
    established: 'Since 2021',
    subCategories: [
      { name: 'Gold Packages', count: 35, icon: '💎' },
      { name: 'Silver Packages', count: 40, icon: '✨' },
      { name: 'Bedding Sets', count: 30, icon: '🛏️' },
      { name: 'Kitchen Sets', count: 40, icon: '🍳' },
    ],
  },
  bikeworld: {
    id: 'bikeworld',
    name: 'BikeWorld Pakistan',
    category: 'Bikes & Scooters',
    categoryColor: '#0891b2',
    categoryBg: 'rgba(8,145,178,0.10)',
    themeColor: '#0891b2',
    themeBg: '#ecfdf5',
    themeBgLight: '#f0fdfa',
    city: 'Rawalpindi',
    description: 'Honda, Yamaha & electric bikes — all models on installments.',
    rating: 4.6,
    reviews: 512,
    products: 98,
    verified: true,
    featured: true,
    installments: true,
    emoji: '🏍️',
    bannerGrad: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
    joined: '2023',
    established: 'Since 2023',
    subCategories: [
      { name: 'Honda Bikes', count: 30, icon: '🏍️' },
      { name: 'Yamaha', count: 25, icon: '🏍️' },
      { name: 'Electric Bikes', count: 20, icon: '⚡' },
      { name: 'Accessories', count: 23, icon: '🔧' },
    ],
  },
}

/* Mock Product Data */
const generateProducts = (shopId: string, category: string) => {
  const products = [
    { id: '1', name: 'Premium Flagship Phone', price: 549999, original: 599999, discount: -8, rating: 4.8, reviews: 234, featured: true, sale: true, mo: 45834 },
    { id: '2', name: 'Ultra Slim Laptop 15"', price: 429999, original: null, discount: -6, rating: 4.9, reviews: 156, featured: true, sale: false, mo: 35834 },
    { id: '3', name: 'Wireless Earbuds Pro', price: 24999, original: 29999, discount: -17, rating: 4.5, reviews: 89, featured: false, sale: true, mo: 2083 },
    { id: '4', name: 'Smart Watch Series X', price: 34999, original: 39999, discount: -13, rating: 4.7, reviews: 123, featured: false, sale: true, mo: 2917 },
    { id: '5', name: 'Tablet 12" Display', price: 149999, original: 179999, discount: -17, rating: 4.6, reviews: 201, featured: true, sale: false, mo: 12500 },
    { id: '6', name: 'Phone Camera Lens', price: 8999, original: 10999, discount: -18, rating: 4.4, reviews: 67, featured: false, sale: true, mo: 750 },
    { id: '7', name: 'Portable Charger 50K', price: 6999, original: null, discount: null, rating: 4.5, reviews: 45, featured: false, sale: false, mo: 583 },
    { id: '8', name: 'Gaming Laptop RTX 4090', price: 799999, original: 899999, discount: -11, rating: 4.9, reviews: 189, featured: true, sale: true, mo: 66667 },
  ]
  return products
}

export default function SoloShopPage({ params }: { params: Promise<{ shopId: string }> }) {
  const { shopId } = use(params)
  const shop = VENDORS[shopId]
  const [selectedSubcat, setSelectedSubcat] = useState('All')
  const products = generateProducts(shopId, shop?.category)

  if (!shop) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fd' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Shop Not Found</h1>
          <Link href="/shops" style={{ color: '#6366f1', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
            Back to All Shops
          </Link>
        </div>
      </div>
    )
  }

  const featured = products.filter(p => p.featured)
  const sale = products.filter(p => p.sale)
  const filtered = selectedSubcat === 'All' ? products : products.filter((_, i) => i % 2 === 0)

  return (
    <div style={{ background: shop.themeBgLight, minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box }
        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0 }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        .prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 18px; animation: fadeIn 0.4s ease }
        @media (max-width: 768px) { .prod-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px } }
      `}</style>

      {/* ─────────────── NAVBAR ─────────────── */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: '70px', gap: '16px' }}>
          <Link href="/shops" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '8px', color: shop.themeColor, cursor: 'pointer', textDecoration: 'none', fontSize: '14px', fontWeight: 600, transition: 'all .2s' }} onMouseOver={e => (e.currentTarget as HTMLElement).style.background = shop.categoryBg} onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            <ArrowLeft size={18} />
            Back to Shops
          </Link>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/" style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={e => (e.currentTarget as HTMLElement).style.color = shop.themeColor} onMouseOut={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}>
              Home
            </Link>
            <Link href="/shops" style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={e => (e.currentTarget as HTMLElement).style.color = shop.themeColor} onMouseOut={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}>
              All Shops
            </Link>
            <Link href="/products" style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', textDecoration: 'none', transition: 'color .2s' }} onMouseOver={e => (e.currentTarget as HTMLElement).style.color = shop.themeColor} onMouseOut={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}>
              Products
            </Link>
          </div>
        </div>
      </header>

      {/* ─────────────── SHOP HERO ─────────────── */}
      <div style={{ background: shop.bannerGrad, color: '#fff', padding: '50px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ fontSize: '70px', marginBottom: '20px', display: 'inline-block', animation: 'bounce 2s ease-in-out infinite' }}>{shop.emoji}</div>
          <h1 style={{ fontSize: '44px', fontWeight: 900, margin: '0 0 12px 0', letterSpacing: '-1px' }}>
            {shop.name}
          </h1>
          <p style={{ fontSize: '17px', opacity: 0.95, margin: '0 0 28px 0', maxWidth: '700px', margin: '0 auto 28px' }}>
            {shop.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              <Star size={18} fill="#fff" /> {shop.rating} ({shop.reviews.toLocaleString()} reviews)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              <Package size={18} /> {shop.products} Products
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              <MapPin size={18} /> {shop.city}
            </div>
            {shop.verified && <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px' }}>
              <BadgeCheck size={18} /> Verified Seller
            </div>}
          </div>
        </div>
      </div>

      {/* ─────────────── SHOP DETAILS CARDS ─────────────── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '48px' }}>
          <div style={{ background: '#fff', padding: '28px 20px', borderRadius: '14px', border: `2px solid ${shop.categoryBg}`, textAlign: 'center', transition: 'all .3s', cursor: 'pointer' }} onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 25px rgba(0,0,0,.08)' }} onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⭐</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px', textTransform: 'uppercase' }}>Rating</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: shop.themeColor, marginBottom: '4px' }}>{shop.rating}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Based on {shop.reviews.toLocaleString()} reviews</div>
          </div>
          <div style={{ background: '#fff', padding: '28px 20px', borderRadius: '14px', border: `2px solid ${shop.categoryBg}`, textAlign: 'center', transition: 'all .3s', cursor: 'pointer' }} onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 25px rgba(0,0,0,.08)' }} onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📦</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px', textTransform: 'uppercase' }}>Products</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: shop.themeColor, marginBottom: '4px' }}>{shop.products}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Available on kisti</div>
          </div>
          <div style={{ background: '#fff', padding: '28px 20px', borderRadius: '14px', border: `2px solid ${shop.categoryBg}`, textAlign: 'center', transition: 'all .3s', cursor: 'pointer' }} onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 25px rgba(0,0,0,.08)' }} onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏢</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px', textTransform: 'uppercase' }}>Est. Since</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: shop.themeColor, marginBottom: '4px' }}>{shop.established}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{shop.city}</div>
          </div>
          <div style={{ background: '#fff', padding: '28px 20px', borderRadius: '14px', border: `2px solid ${shop.categoryBg}`, textAlign: 'center', transition: 'all .3s', cursor: 'pointer' }} onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 25px rgba(0,0,0,.08)' }} onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{shop.verified ? '✅' : '⏳'}</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px', textTransform: 'uppercase' }}>Status</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: shop.verified ? shop.themeColor : '#f97316', marginBottom: '4px' }}>{shop.verified ? 'Verified' : 'Pending'}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Trusted seller</div>
          </div>
        </div>

        {/* ─────────────── FEATURED PRODUCTS ─────────────── */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <TrendingUp size={24} style={{ color: shop.themeColor }} />
            <h2 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: '#111827' }}>
              Featured Products
            </h2>
          </div>
          <div className="prod-grid">
            {featured.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${shop.categoryBg}`, transition: 'all .3s', cursor: 'pointer' }} onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'} onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'none'}>
                <div style={{ background: shop.themeBg, height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', position: 'relative' }}>
                  📦
                  {p.sale && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                      SALE
                    </div>
                  )}
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: shop.themeColor }}>
                      Rs. {(p.price / 1000).toFixed(0)}K
                    </div>
                    {p.discount && (
                      <div style={{ fontSize: '12px', background: '#fecaca', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {p.discount}%
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    <Star size={14} fill="#fbbf24" style={{ color: '#fbbf24' }} /> {p.rating} ({p.reviews})
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    From Rs. {(p.mo).toLocaleString()}/mo
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────── SALE ITEMS ─────────────── */}
        {sale.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Flame size={24} style={{ color: '#ef4444' }} />
              <h2 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: '#111827' }}>
                Hot Deals
              </h2>
            </div>
            <div className="prod-grid">
              {sale.map(p => (
                <div key={p.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: `1px solid #fed7aa`, transition: 'all .3s', cursor: 'pointer', position: 'relative' }} onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'} onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'none'}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, zIndex: 10 }}>
                    FLASH SALE
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fef08a)', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                    🔥
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#ef4444' }}>
                        Rs. {(p.price / 1000).toFixed(0)}K
                      </div>
                      {p.discount && (
                        <div style={{ fontSize: '12px', background: '#fecaca', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          {p.discount}%
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                      <Star size={14} fill="#fbbf24" style={{ color: '#fbbf24' }} /> {p.rating} ({p.reviews})
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      From Rs. {(p.mo).toLocaleString()}/mo
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────── ALL PRODUCTS BY SUBCATEGORY ─────────────── */}
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 24px 0', color: '#111827' }}>
            All Products
          </h2>

          {/* Subcategory Filter */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
            <button onClick={() => setSelectedSubcat('All')} style={{
              padding: '10px 16px', borderRadius: '8px', border: 'none', background: selectedSubcat === 'All' ? shop.themeColor : '#e5e7eb',
              color: selectedSubcat === 'All' ? '#fff' : '#111827', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap'
            }} onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = selectedSubcat === 'All' ? 'none' : 'scale(1.05)'} onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'none'}>
              All Products
            </button>
            {shop.subCategories.map(sc => (
              <button key={sc.name} onClick={() => setSelectedSubcat(sc.name)} style={{
                padding: '10px 16px', borderRadius: '8px', border: 'none', background: selectedSubcat === sc.name ? shop.themeColor : '#e5e7eb',
                color: selectedSubcat === sc.name ? '#fff' : '#111827', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap'
              }} onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = selectedSubcat === sc.name ? 'none' : 'scale(1.05)'} onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'none'}>
                {sc.icon} {sc.name} ({sc.count})
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="prod-grid">
            {filtered.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: `1px solid #e5e7eb`, transition: 'all .3s' }} onMouseOver={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'} onMouseOut={e => (e.currentTarget as HTMLElement).style.transform = 'none'}>
                <div style={{ background: shop.themeBg, height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>
                  📦
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: shop.themeColor }}>
                      Rs. {(p.price / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    <Star size={14} fill="#fbbf24" style={{ color: '#fbbf24' }} /> {p.rating}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    From Rs. {(p.mo).toLocaleString()}/mo
                  </div>
                  <button style={{
                    width: '100%', padding: '8px', borderRadius: '6px', border: 'none', background: shop.themeColor, color: '#fff',
                    fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all .2s'
                  }} onMouseOver={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'} onMouseOut={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
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
              <p style={{ color: '#9ca3af', fontSize: 13.5, lineHeight: 1.6 }}>
                Buy now, pay later on installments. Shop from 1000s of products.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li><Link href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 13.5 }}>Home</Link></li>
                <li><Link href="/shops" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 13.5 }}>All Shops</Link></li>
                <li><Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 13.5 }}>Products</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Support</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 13.5 }}>Help Center</a></li>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 13.5 }}>Contact Us</a></li>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: 13.5 }}>Returns</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 22, textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
            © 2026 FlexiBerry. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
