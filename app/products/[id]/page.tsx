'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import FlexiLayout, { CATEGORY_THEMES } from '@/components/layout/FlexiLayout/FlexiLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PRODUCTS_DATA, ProductDetail } from '@/lib/products'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = PRODUCTS_DATA[productId]
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [selectedPlan, setSelectedPlan] = useState(12)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description')
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', rating: 5, comment: '' })
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToWishlist, setAddedToWishlist] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<ProductDetail[]>([])

  // Initialize variants and handle recently viewed
  useEffect(() => {
    if (product) {
      // Initialize variants
      if (product.variants) {
        const initial: Record<string, string> = {}
        product.variants.forEach(v => {
          initial[v.label] = v.options[0]
        })
        setSelectedVariants(initial)
      }

      // Handle recently viewed
      const stored = localStorage.getItem('recentlyViewed')
      let list: string[] = stored ? JSON.parse(stored) : []
      
      // Remove current if exists and add to front
      list = list.filter(id => id !== product.id)
      list.unshift(product.id)
      
      // Keep only last 6
      list = list.slice(0, 6)
      localStorage.setItem('recentlyViewed', JSON.stringify(list))
      
      // Load full product data for recently viewed
      const fullList = list
        .filter(id => id !== product.id) // Don't show current product in recently viewed
        .map(id => PRODUCTS_DATA[id])
        .filter(Boolean)
      setRecentlyViewed(fullList)
    }
  }, [product])

  if (!product) {
    return (
      <FlexiLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">404</div>
            <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </FlexiLayout>
    )
  }

  const theme = CATEGORY_THEMES[product.categorySlug as keyof typeof CATEGORY_THEMES] || CATEGORY_THEMES.default

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Review submitted successfully!')
    setReviewForm({ name: '', email: '', rating: 5, comment: '' })
  }

  // Calculate rating distribution for display
  const ratingCounts = [0, 0, 0, 0, 0]
  product.reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[5 - r.rating]++
    }
  })
  const totalReviews = product.reviews.length || product.reviewCount

  return (
    <FlexiLayout>
      <div style={{ background: '#fcfcfc', minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f1f1f1', padding: '16px 0' }}>
          <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 16px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#6b7280' }}>
              <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              <Link href={`/products?category=${product.categorySlug}`} style={{ color: '#6b7280', textDecoration: 'none' }}>{product.category}</Link>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              <span style={{ color: theme.primary, fontWeight: 600 }}>{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Product Section */}
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '40px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: 60 }}>
            
            {/* Image Gallery */}
            <div>
              <div style={{
                position: 'relative', borderRadius: 24, overflow: 'hidden',
                background: '#fff', border: '1px solid #f1f1f1',
                aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {product.discount && (
                  <span style={{
                    position: 'absolute', top: 20, left: 20, zIndex: 10,
                    background: '#dc2626', color: '#fff', padding: '6px 14px',
                    borderRadius: 10, fontSize: 13, fontWeight: 700,
                  }}>
                    -{product.discount}% OFF
                  </span>
                )}
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  style={{ objectFit: 'contain', padding: 20 }}
                />
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: 90, height: 90, borderRadius: 16, overflow: 'hidden',
                      border: `2px solid ${selectedImage === i ? theme.primary : '#f1f1f1'}`,
                      background: '#fff', padding: 10, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Image src={img} alt="" width={90} height={90} style={{ objectFit: 'contain' }} />
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {[
                  { title: 'Official Warranty', sub: product.warranty, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                  { title: 'Fast Delivery', sub: product.deliveryInfo, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                ].map((badge, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #f1f1f1' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      background: theme.bg, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="24" height="24" fill="none" stroke={theme.primary} strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d={badge.icon}/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{badge.title}</div>
                      <div style={{ fontSize: 13, color: '#6b7280' }}>{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ 
                  background: theme.bg, color: theme.primary, 
                  padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' 
                }}>
                  {product.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} style={{ color: s <= Math.round(product.rating) ? '#f59e0b' : '#e2e8f0', fontSize: 14 }}>★</span>
                  ))}
                  <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 4 }}>({product.reviewCount} Reviews)</span>
                </div>
              </div>

              <h1 style={{
                fontSize: 36, fontWeight: 800, color: '#111827',
                marginBottom: 20, lineHeight: 1.2,
              }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: theme.primary }}>₨{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span style={{ fontSize: 20, color: '#94a3b8', textDecoration: 'line-through' }}>₨{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                {product.discount && (
                  <span style={{ color: '#dc2626', fontWeight: 700, fontSize: 16 }}>Save {product.discount}%</span>
                )}
              </div>

              <div style={{ background: '#fff', border: '1px solid #f1f1f1', borderRadius: 24, padding: 24, marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: theme.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827' }}>Flexi Installment Plan</div>
                    <div style={{ fontSize: 14, color: '#6b7280' }}>Pay as low as ₨{Math.floor(product.price / 12).toLocaleString()}/mo</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {product.installmentPlans.map(p => (
                    <button
                      key={p.months}
                      onClick={() => setSelectedPlan(p.months)}
                      style={{
                        padding: '16px', borderRadius: 16, border: `2px solid ${selectedPlan === p.months ? theme.primary : '#f1f1f1'}`,
                        background: selectedPlan === p.months ? theme.bg : '#fff', textAlign: 'left', cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: 13, color: selectedPlan === p.months ? theme.primary : '#6b7280', marginBottom: 4, fontWeight: 600 }}>{p.months} Months</div>
                      <div style={{ fontWeight: 800, color: '#111827', fontSize: 16 }}>₨{p.monthly.toLocaleString()}/mo</div>
                    </button>
                  ))}
                </div>
              </div>

              {product.colors.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <h3 style={{ fontWeight: 700, color: '#111827', marginBottom: 16, fontSize: 16 }}>Available Colors</h3>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {product.colors.map((color, i) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(i)}
                        title={color.name}
                        style={{
                          width: 44, height: 44, borderRadius: '50%', padding: 4,
                          border: `2px solid ${selectedColor === i ? theme.primary : '#f1f1f1'}`,
                          background: '#fff', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: color.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants.map(v => (
                <div key={v.label} style={{ marginBottom: 32 }}>
                  <h3 style={{ fontWeight: 700, color: '#111827', marginBottom: 16, fontSize: 16 }}>{v.label}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {v.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [v.label]: opt }))}
                        style={{
                          padding: '12px 24px', borderRadius: 12, border: `2px solid ${selectedVariants[v.label] === opt ? theme.primary : '#f1f1f1'}`,
                          background: selectedVariants[v.label] === opt ? theme.bg : '#fff', color: selectedVariants[v.label] === opt ? theme.primary : '#4b5563',
                          fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 20, padding: '0 20px',
                  borderRadius: 16, border: '2px solid #f1f1f1', background: '#fff',
                }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ border: 'none', background: 'none', fontSize: 24, cursor: 'pointer', color: '#6b7280' }}>−</button>
                  <span style={{ fontWeight: 800, minWidth: 30, textAlign: 'center', fontSize: 18 }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ border: 'none', background: 'none', fontSize: 24, cursor: 'pointer', color: '#6b7280' }}>+</button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1, height: 60, borderRadius: 16, fontSize: 18, fontWeight: 800,
                    background: addedToCart ? '#10b981' : theme.primary,
                    boxShadow: `0 8px 20px ${theme.primary}30`,
                  }}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </Button>
                <button
                  onClick={() => setAddedToWishlist(!addedToWishlist)}
                  style={{
                    width: 60, height: 60, borderRadius: 16, border: '2px solid #f1f1f1',
                    background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: addedToWishlist ? '#ef4444' : '#94a3b8', transition: 'all 0.2s',
                  }}
                >
                  <svg width="28" height="28" fill={addedToWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div style={{ marginTop: 80, background: '#fff', borderRadius: 32, padding: 48, border: '1px solid #f1f1f1' }}>
            <div style={{ display: 'flex', gap: 60, borderBottom: '1px solid #f1f1f1', marginBottom: 40 }}>
              {['Description', 'Specifications'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as any)}
                  style={{
                    padding: '20px 0', border: 'none', background: 'none', cursor: 'pointer',
                    fontSize: 18, fontWeight: 800, color: activeTab === tab.toLowerCase() ? theme.primary : '#94a3b8',
                    position: 'relative', transition: 'all 0.2s',
                  }}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 4, background: theme.primary, borderRadius: 4 }} />
                  )}
                </button>
              ))}
            </div>

            <div style={{ maxWidth: 900 }}>
              {activeTab === 'description' ? (
                <div style={{ fontSize: 17, color: '#4b5563', lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 32 }}>{product.description}</p>
                  <h4 style={{ fontWeight: 800, color: '#111827', marginBottom: 20, fontSize: 20 }}>Key Features:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {product.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#f8fafc', padding: '16px 20px', borderRadius: 16 }}>
                        <div style={{ color: theme.primary, fontWeight: 900, fontSize: 20 }}>✓</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 1 }}>
                  {Object.entries(product.specifications).map(([key, val], i) => (
                    <div key={key} style={{ display: 'grid', gridTemplateColumns: '250px 1fr', padding: '24px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontWeight: 700, color: '#64748b' }}>{key}</span>
                      <span style={{ color: '#111827', fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section - New Design */}
          <div style={{ marginTop: 80 }}>
            <div style={{ display: 'flex', gap: 40, borderBottom: '1px solid #f1f1f1', marginBottom: 40 }}>
              <button
                style={{
                  padding: '20px 0', border: 'none', background: 'none', cursor: 'pointer',
                  fontSize: 18, fontWeight: 800, color: theme.primary,
                  position: 'relative',
                }}
              >
                Reviews ({totalReviews})
                <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 4, background: theme.primary, borderRadius: 4 }} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'start' }}>
              {/* Reviews List & Stats */}
              <div>
                <div style={{ display: 'flex', gap: 48, marginBottom: 48, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 64, fontWeight: 900, color: theme.primary, lineHeight: 1 }}>{product.rating}</div>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center', margin: '12px 0' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} style={{ color: s <= Math.round(product.rating) ? '#f59e0b' : '#e2e8f0', fontSize: 20 }}>★</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>{totalReviews} Reviews</div>
                  </div>

                  <div style={{ flex: 1, display: 'grid', gap: 10 }}>
                    {[5, 4, 3, 2, 1].map((s, i) => (
                      <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b', minWidth: 20 }}>{s}★</span>
                        <div style={{ flex: 1, height: 8, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${(ratingCounts[i] / totalReviews) * 100 || 0}%`, 
                            background: '#f59e0b', borderRadius: 10 
                          }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8', minWidth: 30 }}>{ratingCounts[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 40 }}>
                  {product.reviews.map(r => (
                    <div key={r.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 32 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <div style={{ 
                            width: 56, height: 56, borderRadius: '50%', background: theme.primary, 
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            fontWeight: 800, fontSize: 18 
                          }}>
                            {r.initials}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: 16 }}>{r.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ display: 'flex', gap: 2 }}>
                                {[1, 2, 3, 4, 5].map(s => (
                                  <span key={s} style={{ color: s <= r.rating ? '#f59e0b' : '#e2e8f0', fontSize: 14 }}>★</span>
                                ))}
                              </div>
                              <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>{r.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>{r.comment}</p>
                      <button style={{ background: 'none', border: 'none', color: theme.primary, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Reply</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write a Review Card */}
              <div style={{ background: '#f8fafc', borderRadius: 32, padding: 40, border: '1px solid #f1f1f1', position: 'sticky', top: 40 }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 8 }}>Write a Review</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>Your rating:</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setReviewForm({...reviewForm, rating: s})}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        <span style={{ color: s <= reviewForm.rating ? '#f59e0b' : '#e2e8f0', fontSize: 24 }}>★</span>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleReviewSubmit} style={{ display: 'grid', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={reviewForm.name}
                      onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                      style={{ padding: '16px 20px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff', fontSize: 15 }}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      required
                      value={reviewForm.email}
                      onChange={e => setReviewForm({ ...reviewForm, email: e.target.value })}
                      style={{ padding: '16px 20px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff', fontSize: 15 }}
                    />
                  </div>
                  <textarea
                    placeholder="Share your experience with this product..."
                    required
                    rows={6}
                    value={reviewForm.comment}
                    onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    style={{ padding: '16px 20px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff', fontSize: 15, resize: 'none' }}
                  />
                  <Button 
                    type="submit" 
                    style={{ 
                      background: theme.primary, height: 60, borderRadius: 16, 
                      fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1
                    }}
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  )
}
