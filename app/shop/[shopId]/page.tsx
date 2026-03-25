'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, BadgeCheck, ShoppingCart, Heart, Share2, Search, ChevronDown, Zap, Package, TrendingUp } from 'lucide-react'

/* ─────────────── VENDOR & CATEGORY DATA ─────────────── */
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
    rating: 4.4,
    reviews: 670,
    products: 87,
    verified: true,
    featured: false,
    installments: true,
    emoji: '🏍️',
    bannerGrad: 'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
    joined: '2022',
    subCategories: [
      { name: 'Standard Bikes', count: 30, icon: '🏍️' },
      { name: 'Electric Bikes', count: 20, icon: '⚡' },
      { name: 'Scooters', count: 25, icon: '🛵' },
      { name: 'Accessories', count: 12, icon: '🔧' },
    ],
  },
  solarpk: {
    id: 'solarpk',
    name: 'SolarPK Solutions',
    category: 'Solar & Energy',
    categoryColor: '#d97706',
    categoryBg: 'rgba(217,119,6,0.10)',
    themeColor: '#d97706',
    themeBg: '#fffbeb',
    themeBgLight: '#fef3c7',
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
    subCategories: [
      { name: 'Solar Panels', count: 25, icon: '☀️' },
      { name: 'Inverters', count: 15, icon: '🔋' },
      { name: 'Batteries', count: 20, icon: '🔌' },
      { name: 'Accessories', count: 8, icon: '🔧' },
    ],
  },
}

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Premium Product 1', price: 45000, mo: 3750, rating: 4.8, reviews: 234 },
  { id: 2, name: 'Premium Product 2', price: 35000, mo: 2917, rating: 4.7, reviews: 156 },
  { id: 3, name: 'Premium Product 3', price: 55000, mo: 4583, rating: 4.9, reviews: 340 },
  { id: 4, name: 'Premium Product 4', price: 28000, mo: 2333, rating: 4.5, reviews: 89 },
  { id: 5, name: 'Premium Product 5', price: 65000, mo: 5417, rating: 4.8, reviews: 245 },
  { id: 6, name: 'Premium Product 6', price: 42000, mo: 3500, rating: 4.6, reviews: 178 },
]

/* ─────────────── MAIN PAGE ─────────────── */
export default function ShopPage({ params }: { params: { shopId: string } }) {
  const shop = VENDORS[params.shopId]
  const [selectedSubCat, setSelectedSubCat] = useState(shop?.subCategories[0]?.name || 'All')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())

  if (!shop) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fd' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Shop not found</h1>
          <Link href="/shops" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
            Back to all shops
          </Link>
        </div>
      </div>
    )
  }

  const toggleWish = (id: number) => {
    const newWish = new Set(wishlist)
    newWish.has(id) ? newWish.delete(id) : newWish.add(id)
    setWishlist(newWish)
  }

  return (
    <div style={{ background: shop.themeBgLight, minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box }
        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0 }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px }
        }
      `}</style>

      {/* Header */}
      <header style={{ background: shop.bannerGrad, padding: '20px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/shops" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s', color: 'white' }}>
            <ArrowLeft size={20} />
          </Link>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '28px' }}>{shop.emoji}</span> {shop.name}
            </h1>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> {shop.city} • ★{shop.rating}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} />
            </button>
            <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Info Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '13px', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={16} fill={shop.themeColor} color={shop.themeColor} />
            <span>{shop.rating} ({shop.reviews.toLocaleString()} reviews)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Package size={16} color={shop.themeColor} />
            <span>{shop.products} Products</span>
          </div>
          {shop.verified && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: shop.themeColor }}>
              <BadgeCheck size={16} />
              <span>Verified Seller</span>
            </div>
          )}
          {shop.installments && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: shop.themeColor }}>
              <Zap size={16} />
              <span>Kisti Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px' }}>
        {/* Subcategories */}
        <div style={{ marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', minWidth: 'min-content' }}>
            {shop.subCategories.map((subCat: any) => (
              <button
                key={subCat.name}
                onClick={() => setSelectedSubCat(subCat.name)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '99px',
                  border: `2px solid ${selectedSubCat === subCat.name ? shop.themeColor : '#e5e7eb'}`,
                  background: selectedSubCat === subCat.name ? shop.themeBg : 'white',
                  color: selectedSubCat === subCat.name ? shop.themeColor : '#64748b',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '16px' }}>{subCat.icon}</span>
                {subCat.name}
                <span style={{ background: shop.themeColor, color: 'white', borderRadius: '99px', padding: '0 6px', fontSize: '11px', fontWeight: 700 }}>
                  {subCat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', border: `1px solid ${shop.categoryBg}` }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
            {SAMPLE_PRODUCTS.length} products
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: `1px solid #e5e7eb`,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                background: 'white',
                color: shop.themeColor,
              }}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {SAMPLE_PRODUCTS.map(product => (
            <div
              key={product.id}
              style={{
                background: 'white',
                borderRadius: '14px',
                overflow: 'hidden',
                border: `1.5px solid ${shop.categoryBg}`,
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              {/* Image placeholder */}
              <div style={{
                height: '160px',
                background: `linear-gradient(135deg, ${shop.themeColor}22 0%, ${shop.themeColor}11 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                position: 'relative',
              }}>
                <span style={{ opacity: 0.5 }}>📦</span>
                <button
                  onClick={() => toggleWish(product.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Heart size={18} fill={wishlist.has(product.id) ? shop.themeColor : 'none'} color={wishlist.has(product.id) ? shop.themeColor : '#cbd5e1'} />
                </button>
              </div>

              {/* Product info */}
              <div style={{ padding: '12px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.3 }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  <Star size={12} fill={shop.themeColor} color={shop.themeColor} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: shop.themeColor }}>{product.rating}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>({product.reviews})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: shop.themeColor }}>
                    PKR {product.price.toLocaleString()}
                  </span>
                  {product.mo && (
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                      ({product.mo.toLocaleString()}/mo)
                    </span>
                  )}
                </div>
                <button style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: shop.themeColor,
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}>
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
