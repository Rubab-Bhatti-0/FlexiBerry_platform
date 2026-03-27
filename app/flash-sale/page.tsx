'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Clock, ShoppingCart, Heart, Star, TrendingDown,
  ChevronRight, Filter, Tag, Flame, Timer, Package,
  BadgeCheck, ArrowRight, SlidersHorizontal,
} from 'lucide-react'

// ── Countdown hook ────────────────────────────────────────────────────
function useCountdown(endTime: number) {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now())
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(endTime - Date.now()), 1000)
    return () => clearInterval(t)
  }, [endTime])
  const total = Math.max(0, timeLeft)
  const h = String(Math.floor(total / 3_600_000)).padStart(2, '0')
  const m = String(Math.floor((total % 3_600_000) / 60_000)).padStart(2, '0')
  const s = String(Math.floor((total % 60_000) / 1_000)).padStart(2, '0')
  return { h, m, s, pct: Math.min(100, (total / endTime) * 100) }
}

// ── Flash sale products ───────────────────────────────────────────────
const FLASH_PRODUCTS = [
  {
    id: 'f1', name: 'Samsung Galaxy S24 Ultra 256GB',
    category: 'phones', categoryLabel: 'Smartphones',
    price: 289999, original: 369999, discount: 22,
    installment: 24166, rating: 4.9, reviews: 2341,
    stock: 7, totalStock: 30,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
    shop: 'TechZone Official', shopId: 'vendor-techzone-001', verified: true, hot: true,
  },
  {
    id: 'f2', name: 'LG OLED C3 65" 4K Smart TV',
    category: 'appliances', categoryLabel: 'TVs',
    price: 449999, original: 589999, discount: 24,
    installment: 37499, rating: 4.8, reviews: 876,
    stock: 3, totalStock: 10,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    shop: 'HomeElite Appliances', shopId: 'vendor-homeelite-004', verified: true, hot: true,
  },
  {
    id: 'f3', name: 'MacBook Air M3 16GB 512GB',
    category: 'laptops', categoryLabel: 'Laptops',
    price: 359999, original: 429999, discount: 16,
    installment: 29999, rating: 4.7, reviews: 543,
    stock: 12, totalStock: 20,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    shop: 'DigiWorld Electronics', shopId: 'vendor-digiworld-002', verified: true, hot: false,
  },
  {
    id: 'f4', name: 'Sony WH-1000XM5 Headphones',
    category: 'phones', categoryLabel: 'Audio',
    price: 79999, original: 109999, discount: 27,
    installment: 6666, rating: 4.9, reviews: 3102,
    stock: 18, totalStock: 40,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&q=80',
    shop: 'TechZone Official', shopId: 'vendor-techzone-001', verified: true, hot: false,
  },
  {
    id: 'f5', name: 'Dyson V15 Detect Absolute',
    category: 'appliances', categoryLabel: 'Appliances',
    price: 129999, original: 179999, discount: 28,
    installment: 10833, rating: 4.6, reviews: 712,
    stock: 5, totalStock: 15,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80',
    shop: 'HomeElite Appliances', shopId: 'vendor-homeelite-004', verified: true, hot: true,
  },
  {
    id: 'f6', name: 'iPad Pro M4 12.9" Wi-Fi 256GB',
    category: 'phones', categoryLabel: 'Tablets',
    price: 249999, original: 299999, discount: 17,
    installment: 20833, rating: 4.8, reviews: 621,
    stock: 9, totalStock: 25,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    shop: 'DigiWorld Electronics', shopId: 'vendor-digiworld-002', verified: true, hot: false,
  },
  {
    id: 'f7', name: 'Honda CD 70 2025 Model',
    category: 'bikes', categoryLabel: 'Bikes',
    price: 179999, original: 209999, discount: 14,
    installment: 14999, rating: 4.5, reviews: 1890,
    stock: 4, totalStock: 8,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    shop: 'SpeedRiders Pk', shopId: 'vendor-speedriders-003', verified: true, hot: true,
  },
  {
    id: 'f8', name: 'Dell XPS 15 Intel i9 RTX 4060',
    category: 'laptops', categoryLabel: 'Laptops',
    price: 469999, original: 569999, discount: 18,
    installment: 39166, rating: 4.7, reviews: 389,
    stock: 6, totalStock: 12,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    shop: 'DigiWorld Electronics', shopId: 'vendor-digiworld-002', verified: true, hot: false,
  },
  {
    id: 'f9', name: 'Haier Inverter AC 1.5 Ton',
    category: 'appliances', categoryLabel: 'Appliances',
    price: 119999, original: 159999, discount: 25,
    installment: 9999, rating: 4.4, reviews: 2140,
    stock: 11, totalStock: 20,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    shop: 'HomeElite Appliances', shopId: 'vendor-homeelite-004', verified: false, hot: false,
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Deals' },
  { id: 'phones', label: '📱 Mobiles' },
  { id: 'laptops', label: '💻 Laptops' },
  { id: 'appliances', label: '🏠 Appliances' },
  { id: 'bikes', label: '🏍️ Bikes' },
]

const SORTS = [
  { id: 'discount', label: 'Biggest Discount' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'ending', label: 'Ending Soon' },
]

const formatPKR = (n: number) => 'PKR ' + n.toLocaleString('en-PK')

// ── Countdown box ─────────────────────────────────────────────────────
function CountBox({ val, label }: { val: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 12,
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Grotesk', monospace",
        fontSize: 26, fontWeight: 800, color: 'white',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}>
        {val}
      </div>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  )
}

// ── Stock bar ─────────────────────────────────────────────────────────
function StockBar({ stock, total }: { stock: number; total: number }) {
  const pct = Math.round((stock / total) * 100)
  const color = pct <= 25 ? '#ef4444' : pct <= 50 ? '#f97316' : '#22c55e'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: '#6b7280', fontWeight: 600 }}>
          {pct <= 25 ? '🔥 Almost Gone!' : pct <= 50 ? '⚡ Selling Fast' : '✅ In Stock'}
        </span>
        <span style={{ fontSize: 10, color, fontWeight: 700 }}>{stock} left</span>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: '#f3f4f6', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  )
}

// ── Product Card ──────────────────────────────────────────────────────
function FlashCard({ product, index }: { product: typeof FLASH_PRODUCTS[0]; index: number }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const handleCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      style={{
        position: 'relative',
        background: 'white',
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'
        el.style.transform = 'translateY(-6px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{
          background: 'linear-gradient(135deg, #ef4444, #f97316)',
          color: 'white', fontSize: 11, fontWeight: 800,
          padding: '3px 10px', borderRadius: 99,
          display: 'flex', alignItems: 'center', gap: 4,
          boxShadow: '0 3px 10px rgba(239,68,68,0.45)',
        }}>
          <TrendingDown size={10} /> -{product.discount}% OFF
        </div>
        {product.hot && (
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            color: 'white', fontSize: 10, fontWeight: 700,
            padding: '2px 8px', borderRadius: 99,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            <Flame size={9} /> HOT DEAL
          </div>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          height: 32,
          width: 32,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(4px)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'scale(1)'
        }}
      >
        <Heart style={{
          width: 16,
          height: 16,
          fill: wishlisted ? '#ef4444' : 'none',
          color: wishlisted ? '#ef4444' : '#9ca3af',
        }} />
      </button>

      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div style={{ position: 'relative', aspectRatio: '1', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)', overflow: 'hidden' }}>
          {!imgFailed ? (
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'scale(1)'
              }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
              📦
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, bottom: 0, height: 64, background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }} />
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {/* Shop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.shop}
          </span>
          {product.verified && <BadgeCheck size={12} style={{ color: '#3b82f6' }} />}
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 style={{ fontWeight: 600, color: '#1f2937', fontSize: 14, lineHeight: 1.4, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', cursor: 'pointer' }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {[...Array(5)].map((_, j) => (
              <Star key={j} style={{ width: 12, height: 12, fill: j < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb', color: j < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb' }} />
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#ef4444', fontFamily: "'Space Grotesk', sans-serif" }}>
              {formatPKR(product.price)}
            </span>
            <span style={{ fontSize: 12, color: '#d1d5db', textDecoration: 'line-through', fontWeight: 500 }}>
              {formatPKR(product.original)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Tag size={11} style={{ color: '#16a34a' }} />
            <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>
              {formatPKR(product.installment)}/mo · 12-month plan
            </span>
          </div>
        </div>

        {/* Stock bar */}
        <div style={{ marginBottom: 12 }}>
          <StockBar stock={product.stock} total={product.totalStock} />
        </div>

        {/* CTA */}
        <button
          onClick={handleCart}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px',
            borderRadius: 12,
            color: 'white',
            fontSize: 14,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: added
              ? 'linear-gradient(135deg, #16a34a, #15803d)'
              : 'linear-gradient(135deg, #ef4444, #f97316)',
            boxShadow: added
              ? '0 4px 14px rgba(22,163,74,0.4)'
              : '0 4px 14px rgba(239,68,68,0.4)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.opacity = '0.9'
            el.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }}
        >
          <ShoppingCart size={15} />
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function FlashSalePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSort, setActiveSort] = useState('discount')

  // End time: 6 hours from now
  const [endTime] = useState(() => Date.now() + 6 * 3_600_000)
  const { h, m, s } = useCountdown(endTime)

  const filtered = FLASH_PRODUCTS
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (activeSort === 'discount') return b.discount - a.discount
      if (activeSort === 'price-asc') return a.price - b.price
      if (activeSort === 'price-desc') return b.price - a.price
      if (activeSort === 'ending') return a.stock - b.stock
      return 0
    })

  const totalSaved = FLASH_PRODUCTS.reduce((acc, p) => acc + (p.original - p.price), 0)

  return (
    <FlexiLayout>
      <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: 80, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ── HERO BANNER ── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1a0533 0%, #7c0b0b 40%, #c2410c 70%, #1a0533 100%)',
          minHeight: 320,
        }}>
          {/* Animated grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          {/* Glow orbs */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '25%',
            width: 384,
            height: 384,
            borderRadius: '50%',
            opacity: 0.2,
            pointerEvents: 'none',
            background: 'radial-gradient(circle, #f97316 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: '25%',
            width: 256,
            height: 256,
            borderRadius: '50%',
            opacity: 0.2,
            pointerEvents: 'none',
            background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
            transform: 'translate(50%, 50%)',
          }} />

          <div style={{ maxWidth: 1340, margin: '0 auto', padding: '48px 16px', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>

              {/* Left: Title */}
              <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 16 }}>
                  <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = 'white'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}>
                    Home
                  </Link>
                  <ChevronRight size={12} />
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Flash Sale</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    height: 48, width: 48, borderRadius: 14,
                    background: 'linear-gradient(135deg, #ef4444, #f97316)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(239,68,68,0.5)',
                  }}>
                    <Zap size={24} color="white" fill="white" />
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      Limited Time Only
                    </p>
                    <h1 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      fontWeight: 900, color: 'white', lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}>
                      ⚡ Flash Sale
                    </h1>
                  </div>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, maxWidth: 400, lineHeight: 1.6 }}>
                  Massive discounts up to <strong style={{ color: '#fbbf24' }}>30% OFF</strong> on top brands. Buy on easy installments — limited stock!
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
                  {[
                    { val: `${FLASH_PRODUCTS.length}`, label: 'Hot Deals' },
                    { val: `PKR ${(totalSaved / 1000).toFixed(0)}K+`, label: 'Total Savings' },
                    { val: 'Up to 30%', label: 'Max Discount' },
                  ].map(({ val, label }) => (
                    <div key={label} style={{
                      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 12, padding: '8px 16px', textAlign: 'center',
                    }}>
                      <p style={{ color: 'white', fontWeight: 800, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }}>{val}</p>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Countdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{
                  background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 24, padding: '28px 32px', textAlign: 'center',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
                  alignSelf: 'flex-end',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                  <Timer size={16} style={{ color: '#f97316' }} />
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Sale Ends In
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, justifyContent: 'center' }}>
                  <CountBox val={h} label="Hours" />
                  <span style={{ color: '#f97316', fontSize: 28, fontWeight: 900, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>:</span>
                  <CountBox val={m} label="Mins" />
                  <span style={{ color: '#f97316', fontSize: 28, fontWeight: 900, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>:</span>
                  <CountBox val={s} label="Secs" />
                </div>
                <div style={{
                  marginTop: 16, background: 'rgba(239,68,68,0.2)', borderRadius: 10,
                  padding: '8px 16px',
                }}>
                  <p style={{ color: '#fca5a5', fontSize: 11, fontWeight: 600 }}>
                    🔥 {filtered.length} deals active right now
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── FILTERS BAR ── */}
        <div style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 73,
          zIndex: 40,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}>
          <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingY: 12, overflowX: 'auto', scrollBehavior: 'smooth' }}>

              {/* Category pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '7px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease',
                      border: `1.5px solid ${activeCategory === cat.id ? 'transparent' : 'rgba(0,0,0,0.1)'}`,
                      background: activeCategory === cat.id
                        ? 'linear-gradient(135deg, #ef4444, #f97316)'
                        : 'transparent',
                      color: activeCategory === cat.id ? 'white' : '#6b7280',
                      boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(239,68,68,0.35)' : 'none',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 24, width: 1, background: '#e5e7eb', flexShrink: 0, display: 'none' }} />

              {/* Sort */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
                <SlidersHorizontal size={14} style={{ color: '#9ca3af' }} />
                <select
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                  style={{
                    fontSize: 12, fontWeight: 600, color: '#374151',
                    border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 10,
                    padding: '6px 12px', outline: 'none', cursor: 'pointer',
                    background: 'white', fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {SORTS.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Count */}
              <div style={{
                padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                background: 'rgba(239,68,68,0.08)', color: '#ef4444',
              }}>
                {filtered.length} deals
              </div>
            </div>
          </div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '40px 16px' }}>

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                height: 36, width: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #ef4444, #f97316)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(239,68,68,0.4)',
              }}>
                <Flame size={18} color="white" />
              </div>
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 20, color: '#111827' }}>
                  {activeCategory === 'all' ? 'All Flash Deals' : CATEGORIES.find(c => c.id === activeCategory)?.label}
                </h2>
                <p style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
                  Showing {filtered.length} of {FLASH_PRODUCTS.length} deals
                </p>
              </div>
            </div>
            <Link href="/products"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: '#ef4444',
                textDecoration: 'none',
              }}>
              Browse All Products <ArrowRight size={14} />
            </Link>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {filtered.map((product, i) => (
                <FlashCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 96, textAlign: 'center' }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>⚡</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: '#111827' }}>
                No deals in this category
              </h3>
              <p style={{ color: '#6b7280', marginTop: 8 }}>Try a different category or check back soon!</p>
              <button
                onClick={() => setActiveCategory('all')}
                style={{
                  marginTop: 20, padding: '10px 24px', borderRadius: 12,
                  background: 'linear-gradient(135deg, #ef4444, #f97316)',
                  color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
                }}
              >
                View All Deals
              </button>
            </motion.div>
          )}

          {/* Bottom CTA banner */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 48,
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #1a0533 0%, #7c0b0b 60%, #c2410c 100%)',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.1,
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />
              <div style={{ position: 'relative', zIndex: 10, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Clock size={16} style={{ color: '#f97316' }} />
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Don't Miss Out
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 900, color: 'white' }}>
                    Sale ends in {h}:{m}:{s}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>
                    All items on easy 6–12 month installment plans. Apply now!
                  </p>
                </div>
                <Link href="/products"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px', borderRadius: 14,
                    background: 'linear-gradient(135deg, #f97316, #ef4444)',
                    color: 'white', fontWeight: 800, fontSize: 14,
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(239,68,68,0.5)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = '0 12px 32px rgba(239,68,68,0.6)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = '0 8px 24px rgba(239,68,68,0.5)'
                  }}
                >
                  Shop All Products <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </FlexiLayout>
  )
}
