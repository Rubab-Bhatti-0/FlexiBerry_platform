'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'

/* ── DATA ───────────────────────────────────────────────────────────────── */

const FLASH_PRODUCTS = [
  {
    id: 'fs1',
    name: 'iPhone 15 Pro Max - 256GB',
    brand: 'APPLE',
    price: 485000,
    originalPrice: 525000,
    discount: 8,
    image: '/assets/carousel-1.jpg',
    sold: 85,
    endsIn: 3600 * 4, // 4 hours
    category: 'Smartphones'
  },
  {
    id: 'fs2',
    name: 'Sony Bravia 65" 4K HDR LED',
    brand: 'SONY',
    price: 245000,
    originalPrice: 295000,
    discount: 17,
    image: '/assets/carousel-5.jpg',
    sold: 42,
    endsIn: 3600 * 2,
    category: 'Appliances'
  },
  {
    id: 'fs3',
    name: 'MacBook Air M2 - 13.6"',
    brand: 'APPLE',
    price: 315000,
    originalPrice: 345000,
    discount: 9,
    image: '/assets/carousel-2.jpg',
    sold: 64,
    endsIn: 3600 * 6,
    category: 'Laptops'
  },
  {
    id: 'fs4',
    name: 'Honda CD 70 2024 Model',
    brand: 'HONDA',
    price: 157900,
    originalPrice: 157900,
    discount: 0,
    image: '/assets/carousel-8.jpg',
    sold: 92,
    endsIn: 3600 * 1,
    category: 'Vehicles'
  },
  {
    id: 'fs5',
    name: 'Haier 1.5 Ton Inverter AC',
    brand: 'HAIER',
    price: 165000,
    originalPrice: 185000,
    discount: 11,
    image: '/assets/carousel-5.jpg',
    sold: 28,
    endsIn: 3600 * 8,
    category: 'Appliances'
  },
  {
    id: 'fs6',
    name: 'Samsung Galaxy Watch 6',
    brand: 'SAMSUNG',
    price: 65000,
    originalPrice: 85000,
    discount: 24,
    image: '/assets/carousel-1.jpg',
    sold: 76,
    endsIn: 3600 * 3,
    category: 'Electronics'
  }
]

const CATEGORIES = [
  { name: 'All Deals', icon: '🔥' },
  { name: 'Smartphones', icon: '📱' },
  { name: 'Laptops', icon: '💻' },
  { name: 'Appliances', icon: '📺' },
  { name: 'Vehicles', icon: '🏍️' },
  { name: 'Furniture', icon: '🛋️' }
]

/* ── COMPONENTS ─────────────────────────────────────────────────────────── */

const CountdownTimer = ({ seconds: initialSeconds }: { seconds: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const h = Math.floor(timeLeft / 3600)
  const m = Math.floor((timeLeft % 3600) / 60)
  const s = timeLeft % 60

  const format = (n: number) => n.toString().padStart(2, '0')

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {[h, m, s].map((v, i) => (
        <React.Fragment key={i}>
          <div style={{
            background: '#111827', color: '#fff', padding: '4px 8px',
            borderRadius: 6, fontWeight: 800, fontSize: 14, minWidth: 32, textAlign: 'center'
          }}>
            {format(v)}
          </div>
          {i < 2 && <span style={{ fontWeight: 900, color: '#111827' }}>:</span>}
        </React.Fragment>
      ))}
    </div>
  )
}

export default function FlashSalePage() {
  const [activeCat, setActiveCat] = useState('All Deals')

  return (
    <FlexiLayout>
      <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 80 }}>
        
        {/* Hero Header */}
        <section style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
          padding: '60px 16px', color: '#fff', textAlign: 'center', position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -20, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
          
          <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)',
              padding: '6px 16px', borderRadius: 99, fontSize: 14, fontWeight: 700, marginBottom: 20,
              backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <span style={{ fontSize: 18 }}>⚡</span> LIMITED TIME OFFERS
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, marginBottom: 16,
              fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em'
            }}>
              Flash <span style={{ color: '#818cf8' }}>Sale</span>
            </h1>
            <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 600, margin: '0 auto 32px' }}>
              Grab the best deals on FlexiBerry before they're gone. 
              New offers added every hour!
            </p>
            
            <div style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              background: '#fff', padding: '20px 40px', borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ color: '#6b7280', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Ending In
              </div>
              <CountdownTimer seconds={3600 * 3 + 1420} />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <div style={{
          position: 'sticky', top: 64, zIndex: 50, background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)', borderBottom: '1px solid #e5e7eb', padding: '12px 0'
        }}>
          <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 16px', display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCat(cat.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                  borderRadius: 12, border: 'none', whiteSpace: 'nowrap', cursor: 'pointer',
                  background: activeCat === cat.name ? '#4338ca' : '#fff',
                  color: activeCat === cat.name ? '#fff' : '#374151',
                  fontWeight: 700, fontSize: 14, transition: 'all 0.2s',
                  boxShadow: activeCat === cat.name ? '0 4px 12px rgba(67, 56, 202, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <main style={{ maxWidth: 1340, margin: '40px auto', padding: '0 16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24
          }}>
            {FLASH_PRODUCTS.filter(p => activeCat === 'All Deals' || p.category === activeCat).map(product => (
              <div key={product.id} style={{
                background: '#fff', borderRadius: 24, overflow: 'hidden',
                border: '1.5px solid #e5e7eb', transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column'
              }} className="product-card">
                {/* Image Area */}
                <div style={{ position: 'relative', aspectRatio: '1.2', background: '#f1f5f9', padding: 24 }}>
                  <div style={{
                    position: 'absolute', top: 12, left: 12, zIndex: 10,
                    background: '#ef4444', color: '#fff', padding: '6px 12px',
                    borderRadius: 8, fontSize: 12, fontWeight: 800, boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                  }}>
                    -{product.discount}% OFF
                  </div>
                  <div style={{
                    position: 'absolute', top: 12, right: 12, zIndex: 10,
                    background: 'rgba(255,255,255,0.9)', padding: '6px 10px',
                    borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#111827',
                    display: 'flex', alignItems: 'center', gap: 4, backdropFilter: 'blur(4px)'
                  }}>
                    <span style={{ color: '#ef4444' }}>●</span> LIVE
                  </div>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      width={200} 
                      height={200} 
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                    {product.brand}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 12, lineHeight: 1.4 }}>
                    {product.name}
                  </h3>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                      <span style={{ color: '#6b7280' }}>Sold: {product.sold}%</span>
                      <span style={{ color: '#ef4444' }}>Only few left!</span>
                    </div>
                    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${product.sold}%`, height: '100%', background: 'linear-gradient(90deg, #ef4444, #f87171)', borderRadius: 4 }} />
                    </div>
                  </div>

                  {/* Price & Timer */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: '#111827' }}>
                        ₨{product.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'line-through' }}>
                        ₨{product.originalPrice.toLocaleString()}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Ends In</span>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444' }}>
                          {Math.floor(product.endsIn / 3600)}h {Math.floor((product.endsIn % 3600) / 60)}m left
                        </div>
                      </div>
                      <Link href={`/products/${product.id.replace('fs', '')}`} style={{
                        background: '#111827', color: '#fff', padding: '12px 20px',
                        borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none',
                        transition: 'all 0.2s', textAlign: 'center'
                      }}>
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Newsletter / Alert */}
        <section style={{ maxWidth: 1340, margin: '60px auto 0', padding: '0 16px' }}>
          <div style={{
            background: '#fff', borderRadius: 32, padding: '48px 32px',
            border: '1.5px solid #e5e7eb', textAlign: 'center',
            backgroundImage: 'radial-gradient(circle at top right, #f5f3ff 0%, transparent 40%)'
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔔</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111827', marginBottom: 12 }}>Never Miss a Flash Sale</h2>
            <p style={{ color: '#6b7280', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Get notified 15 minutes before our biggest deals go live. 
              Join 50,000+ shoppers saving daily.
            </p>
            <div style={{ display: 'flex', gap: 12, maxWidth: 450, margin: '0 auto', flexDirection: 'column' }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                style={{
                  padding: '16px 24px', borderRadius: 16, border: '1.5px solid #e5e7eb',
                  fontSize: 15, outline: 'none', width: '100%'
                }}
              />
              <button style={{
                background: '#4338ca', color: '#fff', padding: '16px 32px',
                borderRadius: 16, border: 'none', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 10px 20px rgba(67, 56, 202, 0.2)'
              }}>
                Notify Me
              </button>
            </div>
          </div>
        </section>
      </div>
    </FlexiLayout>
  )
}
