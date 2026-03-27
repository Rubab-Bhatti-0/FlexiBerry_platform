'use client'

import { useState, useMemo } from 'react'
import { use } from 'react'
import Link from 'next/link'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { ArrowLeft, Star, MapPin, BadgeCheck, ShoppingCart, Heart, Flame, TrendingUp, Package, Sparkles, Grid3X3, List } from 'lucide-react'
import { VENDORS as VENDORS_ARRAY } from '@/lib/vendors'

// Convert array to object for easy lookup
const VENDORS: Record<string, any> = {}
VENDORS_ARRAY.forEach(v => {
  VENDORS[v.id] = {
    ...v,
    established: `Since ${v.established}`,
    themeBgLight: v.themeBgLight || '#f8f9fd',
    themeColor: v.categoryColor,
    categoryBg: v.categoryBg,
    subCategories: [
      { name: 'Category 1', count: Math.floor(v.products * 0.3), icon: '📦' },
      { name: 'Category 2', count: Math.floor(v.products * 0.3), icon: '📦' },
      { name: 'Category 3', count: Math.floor(v.products * 0.2), icon: '📦' },
      { name: 'Category 4', count: Math.floor(v.products * 0.2), icon: '📦' },
    ],
  }
})

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
  const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured')
  const products = generateProducts(shopId, shop?.category)

  if (!shop) {
    return (
      <FlexiLayout>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fd' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Shop Not Found</h1>
            <Link href="/shops" style={{ color: '#6366f1', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
              Back to All Shops
            </Link>
          </div>
        </div>
      </FlexiLayout>
    )
  }

  const featured = products.filter(p => p.featured)
  const sale = products.filter(p => p.sale)
  const filtered = selectedSubcat === 'All' ? products : products.filter((_, i) => i % 2 === 0)

  return (
    <FlexiLayout>
      <div style={{ background: shop.themeBgLight, minHeight: '100vh' }}>
        <style>{`
          * { box-sizing: border-box }
          body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0 }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
          @keyframes bounce { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
          @keyframes slideIn { from { opacity: 0; transform: translateX(-20px) } to { opacity: 1; transform: translateX(0) } }
          .prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; animation: fadeIn 0.4s ease }
          .stat-card { 
            transition: all 0.3s ease;
            border-top: 4px solid transparent;
          }
          .stat-card:hover { 
            transform: translateY(-6px);
            box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          }
          @media (max-width: 768px) { 
            .prod-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px } 
          }
        `}</style>

        {/* ─────────────── BREADCRUMB ─────────────── */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/" style={{ color: shop.themeColor, textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Home
          </Link>
          <span style={{ color: '#d1d5db', fontSize: '13px' }}>/</span>
          <Link href="/shops" style={{ color: shop.themeColor, textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>All Shops</Link>
          <span style={{ color: '#d1d5db', fontSize: '13px' }}>/</span>
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: 600 }}>{shop.name}</span>
        </div>

        {/* ─────────────── SHOP HERO BANNER ─────────────── */}
        <div style={{ background: shop.bannerGrad, color: '#fff', padding: '60px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(50%, -50%)' }} />
          <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '80px', marginBottom: '24px', display: 'inline-block', animation: 'bounce 2.5s ease-in-out infinite', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
              {shop.emoji}
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '0 0 16px 0', letterSpacing: '-1.5px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              {shop.name}
            </h1>
            <p style={{ fontSize: '18px', opacity: 0.95, margin: '0 0 32px 0', maxWidth: '700px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              {shop.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', fontSize: '16px', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <Star size={20} fill="#fff" /> {shop.rating} ({shop.reviews.toLocaleString()})
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <Package size={20} /> {shop.products} Products
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <MapPin size={20} /> {shop.city}
              </div>
              {shop.verified && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                  <BadgeCheck size={20} /> Verified
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─────────────── SHOP STATS CARDS ─────────────── */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '60px' }}>
            {/* Rating Card */}
            <div className="stat-card" style={{ background: '#fff', padding: '32px 24px', borderRadius: '16px', border: `2px solid ${shop.categoryBg}`, borderTopColor: shop.themeColor, textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>⭐</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>Customer Rating</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: shop.themeColor, marginBottom: '6px' }}>{shop.rating}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Based on {shop.reviews.toLocaleString()} reviews</div>
            </div>

            {/* Products Card */}
            <div className="stat-card" style={{ background: '#fff', padding: '32px 24px', borderRadius: '16px', border: `2px solid ${shop.categoryBg}`, borderTopColor: shop.themeColor, textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>📦</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>Total Products</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: shop.themeColor, marginBottom: '6px' }}>{shop.products}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Available on easy installments</div>
            </div>

            {/* Established Card */}
            <div className="stat-card" style={{ background: '#fff', padding: '32px 24px', borderRadius: '16px', border: `2px solid ${shop.categoryBg}`, borderTopColor: shop.themeColor, textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏢</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>Established</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: shop.themeColor, marginBottom: '6px' }}>{shop.established}</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>{shop.city}</div>
            </div>

            {/* Status Card */}
            <div className="stat-card" style={{ background: '#fff', padding: '32px 24px', borderRadius: '16px', border: `2px solid ${shop.categoryBg}`, borderTopColor: shop.verified ? shop.themeColor : '#f97316', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{shop.verified ? '✅' : '⏳'}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>Verification</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: shop.verified ? shop.themeColor : '#f97316', marginBottom: '6px' }}>
                {shop.verified ? 'Verified' : 'Pending'}
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Trusted seller badge</div>
            </div>
          </div>

          {/* ─────────────── FEATURED PRODUCTS SECTION ─────────────── */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `linear-gradient(135deg, ${shop.g1}, ${shop.g2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: `0 8px 20px ${shop.g1}44` }}>
                  {shop.e}
                </div>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: '#111827' }}>
                    Featured Products
                  </h2>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0 0' }}>Best sellers from {shop.name}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ padding: '10px 16px', borderRadius: '10px', border: `2px solid ${viewMode === 'featured' ? shop.themeColor : '#e5e7eb'}`, background: viewMode === 'featured' ? shop.themeColor : 'white', color: viewMode === 'featured' ? 'white' : '#6b7280', cursor: 'pointer', fontWeight: 600, fontSize: '13px', transition: 'all .2s' }} onClick={() => setViewMode('featured')}>
                  Featured
                </button>
                <button style={{ padding: '10px 16px', borderRadius: '10px', border: `2px solid ${viewMode === 'all' ? shop.themeColor : '#e5e7eb'}`, background: viewMode === 'all' ? shop.themeColor : 'white', color: viewMode === 'all' ? 'white' : '#6b7280', cursor: 'pointer', fontWeight: 600, fontSize: '13px', transition: 'all .2s' }} onClick={() => setViewMode('all')}>
                  All Products
                </button>
              </div>
            </div>

            <div className="prod-grid">
              {(viewMode === 'featured' ? featured : products).map(p => (
                <div key={p.id} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', border: `2px solid ${shop.categoryBg}`, transition: 'all .3s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = `0 12px 28px ${shop.themeColor}22` }} onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
                  <div style={{ background: shop.themeBgLight, height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px', position: 'relative', borderBottom: `3px solid ${shop.themeColor}` }}>
                    📦
                    {p.sale && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#ef4444', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>
                        SALE
                      </div>
                    )}
                    {p.featured && (
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: shop.themeColor, color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={12} /> Featured
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.4 }}>
                      {p.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontSize: '12px' }}>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontWeight: 700, color: '#111827' }}>{p.rating}</span>
                      <span style={{ color: '#9ca3af' }}>({p.reviews})</span>
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: `1px solid ${shop.categoryBg}` }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: shop.themeColor }}>
                          PKR {p.price.toLocaleString()}
                        </span>
                        {p.original && (
                          <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>
                            {p.original.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>
                        From PKR {p.mo.toLocaleString()}/month
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────── CATEGORIES SECTION ─────────────── */}
          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', border: `2px solid ${shop.categoryBg}` }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Grid3X3 size={28} color={shop.themeColor} />
              Shop Categories
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {shop.subCategories.map((cat, i) => (
                <div key={i} style={{ padding: '20px', borderRadius: '12px', border: `2px solid ${shop.categoryBg}`, background: shop.themeBgLight, cursor: 'pointer', transition: 'all .3s' }} onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.borderColor = shop.themeColor }} onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.borderColor = shop.categoryBg }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cat.icon}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{cat.name}</div>
                  <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>{cat.count} items</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  )
}
