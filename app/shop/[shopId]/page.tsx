'use client'

import { useState, useMemo } from 'react'
import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { ArrowLeft, Star, MapPin, BadgeCheck, ShoppingCart, Heart, Flame, TrendingUp, Package, Sparkles, Grid3X3, List, Search, X, Zap, Shield, ChevronRight } from 'lucide-react'
import { VENDORS as VENDORS_ARRAY } from '@/lib/vendors'

// Convert array to object for easy lookup
const VENDORS: Record<string, any> = {}
VENDORS_ARRAY.forEach(v => {
  VENDORS[v.id] = {
    ...v,
    themeBgLight: v.themeBgLight || '#f8f9fd',
    themeColor: v.categoryColor,
    subCategories: [
      { name: 'Category 1', count: Math.floor(v.products * 0.3), icon: '📦' },
      { name: 'Category 2', count: Math.floor(v.products * 0.3), icon: '📦' },
      { name: 'Category 3', count: Math.floor(v.products * 0.2), icon: '📦' },
      { name: 'Category 4', count: Math.floor(v.products * 0.2), icon: '📦' },
    ],
  }
})

/* Mock Product Data with Real Images */
const generateProducts = (shopId: string, category: string) => {
  const products = [
    { id: '1', name: 'Premium Flagship Phone', price: 549999, original: 599999, discount: -8, rating: 4.8, reviews: 234, featured: true, sale: true, mo: 45834, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop' },
    { id: '2', name: 'Ultra Slim Laptop 15"', price: 429999, original: null, discount: -6, rating: 4.9, reviews: 156, featured: true, sale: false, mo: 35834, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop' },
    { id: '3', name: 'Wireless Earbuds Pro', price: 24999, original: 29999, discount: -17, rating: 4.5, reviews: 89, featured: false, sale: true, mo: 2083, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop' },
    { id: '4', name: 'Smart Watch Series X', price: 34999, original: 39999, discount: -13, rating: 4.7, reviews: 123, featured: false, sale: true, mo: 2917, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { id: '5', name: 'Tablet 12" Display', price: 149999, original: 179999, discount: -17, rating: 4.6, reviews: 201, featured: true, sale: false, mo: 12500, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop' },
    { id: '6', name: 'Phone Camera Lens', price: 8999, original: 10999, discount: -18, rating: 4.4, reviews: 67, featured: false, sale: true, mo: 750, image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=400&fit=crop' },
    { id: '7', name: 'Portable Charger 50K', price: 6999, original: null, discount: null, rating: 4.5, reviews: 45, featured: false, sale: false, mo: 583, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop' },
    { id: '8', name: 'Gaming Laptop RTX 4090', price: 799999, original: 899999, discount: -11, rating: 4.9, reviews: 189, featured: true, sale: true, mo: 66667, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop' },
  ]
  return products
}

/* ─────────────────── PRODUCT CARD ─────────────────── */
const ProductCard = ({ product, themeColor }: { product: any; themeColor: string }) => {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '16px',
        border: `1.5px solid ${hovered ? `${themeColor}33` : 'rgba(37,99,235,0.08)'}`,
        boxShadow: hovered ? `0 12px 32px ${themeColor}22` : '0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'none',
        cursor: 'pointer',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column' as const,
      }}>
      {/* Image Container */}
      <div style={{
        height: '160px',
        background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}08)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        {!imgLoaded && (
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}08)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            📦
          </div>
        )}
        {product.featured && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
            color: 'white',
            padding: '4px 10px',
            borderRadius: '99px',
            fontSize: '9px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Flame size={10} /> Featured
          </div>
        )}
        {product.sale && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: '#ef4444',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '99px',
            fontSize: '9px',
            fontWeight: 800,
          }}>
            {product.discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.3 }}>
          {product.name}
        </h4>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
          <Star size={12} fill={themeColor} color={themeColor} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: themeColor }}>{product.rating}</span>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>({product.reviews})</span>
        </div>

        {/* Price */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
            Rs. {product.price.toLocaleString()}
          </div>
          {product.original && (
            <div style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>
              Rs. {product.original.toLocaleString()}
            </div>
          )}
        </div>

        {/* Monthly installment */}
        {product.mo && (
          <div style={{
            fontSize: '11px',
            color: themeColor,
            fontWeight: 600,
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Zap size={10} /> From Rs. {product.mo.toLocaleString()}/month
          </div>
        )}

        {/* CTA */}
        <button style={{
          marginTop: 'auto',
          padding: '10px 14px',
          borderRadius: '10px',
          background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`,
          border: 'none',
          color: 'white',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          boxShadow: `0 4px 12px ${themeColor}44`,
        }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}>
          <ShoppingCart size={12} /> Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function SoloShopPage({ params }: { params: Promise<{ shopId: string }> }) {
  const { shopId } = use(params)
  const shop = VENDORS[shopId]
  const [selectedSubcat, setSelectedSubcat] = useState('All')
  const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured')
  const [search, setSearch] = useState('')
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
          .prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; animation: fadeIn 0.4s ease }
          .stat-card { 
            transition: all 0.3s ease;
            border-top: 4px solid transparent;
          }
          .stat-card:hover { 
            transform: translateY(-6px);
            box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          }
          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: ${shop.themeColor}44;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${shop.themeColor}66;
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
              <div style={{ fontSize: '28px', fontWeight: 800, color: shop.themeColor, marginBottom: '6px' }}>Since {shop.established}</div>
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
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: shop.bannerGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: `0 8px 20px ${shop.themeColor}44` }}>
                  {shop.emoji}
                </div>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 900, margin: 0, color: '#111827' }}>
                    Featured Products
                  </h2>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0 0' }}>Best sellers from {shop.name}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setViewMode('featured')} style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: `1.5px solid ${viewMode === 'featured' ? shop.themeColor : 'rgba(37,99,235,0.12)'}`,
                  background: viewMode === 'featured' ? `${shop.themeColor}15` : 'transparent',
                  color: viewMode === 'featured' ? shop.themeColor : '#64748b',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'all 0.2s ease',
                }}>
                  <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} /> Featured
                </button>
                <button onClick={() => setViewMode('all')} style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: `1.5px solid ${viewMode === 'all' ? shop.themeColor : 'rgba(37,99,235,0.12)'}`,
                  background: viewMode === 'all' ? `${shop.themeColor}15` : 'transparent',
                  color: viewMode === 'all' ? shop.themeColor : '#64748b',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'all 0.2s ease',
                }}>
                  All Products
                </button>
              </div>
            </div>

            <div className="prod-grid">
              {(viewMode === 'featured' ? featured : filtered).map(product => (
                <ProductCard key={product.id} product={product} themeColor={shop.themeColor} />
              ))}
            </div>
          </div>

          {/* ─────────────── CATEGORIES SECTION ─────────────── */}
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 24px', color: '#111827' }}>Shop by Category</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {shop.subCategories.map((cat: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSubcat(cat.name)}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: selectedSubcat === cat.name ? `${shop.themeColor}15` : '#fff',
                    border: `1.5px solid ${selectedSubcat === cat.name ? shop.themeColor : 'rgba(37,99,235,0.08)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedSubcat === cat.name ? `0 8px 24px ${shop.themeColor}22` : '0 2px 8px rgba(0,0,0,0.04)',
                    transform: selectedSubcat === cat.name ? 'translateY(-4px)' : 'none',
                  }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>{cat.name}</h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{cat.count} products</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────── SALE PRODUCTS SECTION ─────────────── */}
          {sale.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `linear-gradient(135deg, #ef4444, #dc2626)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  🔥
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 900, margin: 0, color: '#111827' }}>Hot Deals</h2>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>Limited time offers</p>
                </div>
              </div>
              <div className="prod-grid">
                {sale.map(product => (
                  <ProductCard key={product.id} product={product} themeColor={shop.themeColor} />
                ))}
              </div>
            </div>
          )}

          {/* ─────────────── SHOP INFO SECTION ─────────────── */}
          <div style={{ marginTop: '60px', padding: '40px', borderRadius: '20px', background: 'white', border: `1.5px solid ${shop.categoryBg}` }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 24px', color: '#111827' }}>About {shop.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Category</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{shop.category}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Location</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{shop.city}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Established</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Since {shop.established}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: shop.verified ? '#10b981' : '#f97316' }}>
                  {shop.verified ? '✓ Verified' : 'Pending'}
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1.5px solid rgba(37,99,235,0.08)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 16px', color: '#111827' }}>Why Shop Here?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {[
                  { icon: '⚡', title: 'Easy Installments', desc: 'Flexible payment plans available' },
                  { icon: '🛡️', title: 'Verified Seller', desc: 'Trusted & KYC verified' },
                  { icon: '📦', title: 'Fast Delivery', desc: 'Quick shipping across Pakistan' },
                  { icon: '💬', title: 'Support', desc: '24/7 customer support available' },
                ].map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ fontSize: '24px' }}>{feature.icon}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{feature.title}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  )
}
