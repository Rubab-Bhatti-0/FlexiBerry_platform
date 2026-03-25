'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import FlexiLayout, { CATEGORY_THEMES } from '@/components/layout/FlexiLayout/FlexiLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Extended mock product data with category-specific theming
const PRODUCTS_DATA: Record<string, {
  id: string
  name: string
  category: string
  categorySlug: string
  vendor: string
  vendorVerified: boolean
  vendorLocation: string
  reference: string
  price: number
  originalPrice: number | null
  discount: number | null
  rating: number
  reviewCount: number
  images: string[]
  description: string
  features: string[]
  specifications: Record<string, string>
  colors: { name: string; hex: string }[]
  variants: { label: string; options: string[] }[]
  installmentPlans: { months: number; monthly: number }[]
  inStock: boolean
  stockCount: number
  warranty: string
  deliveryInfo: string
  reviews: { id: string; name: string; initials: string; rating: number; date: string; comment: string }[]
}> = {
  '1': {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Electronics',
    categorySlug: 'smartphones',
    vendor: 'TechZone Official Store',
    vendorVerified: true,
    vendorLocation: 'Lahore',
    reference: 'SM-S928BZKQPK',
    price: 449999,
    originalPrice: 499999,
    discount: 10,
    rating: 4.8,
    reviewCount: 234,
    images: ['/assets/carousel-1.jpg', '/assets/carousel-1.jpg', '/assets/carousel-1.jpg', '/assets/carousel-1.jpg'],
    description: 'Experience the ultimate flagship smartphone with AI-powered features, S Pen integration, and the most advanced camera system ever in a Galaxy device.',
    features: [
      'Top-grade materials and certified build quality',
      'Manufacturer tested - shipped in original packaging',
      'Compatible with all standard accessories',
      'Energy-efficient modern design',
      "Backed by FlexiBerry's 7-day return policy"
    ],
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X, 120Hz',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'RAM': '12GB',
      'Storage': '256GB / 512GB / 1TB',
      'Camera': '200MP + 12MP + 50MP + 10MP',
      'Battery': '5000mAh with 45W Fast Charging',
    },
    colors: [
      { name: 'Titanium Black', hex: '#1a1a1a' },
      { name: 'Titanium Gray', hex: '#7a7a7a' },
      { name: 'Titanium Violet', hex: '#9d8ec9' },
      { name: 'Titanium Yellow', hex: '#e8d084' },
    ],
    variants: [
      { label: 'Storage', options: ['256GB', '512GB', '1TB'] }
    ],
    installmentPlans: [
      { months: 6, monthly: 75000 },
      { months: 12, monthly: 37500 },
    ],
    inStock: true,
    stockCount: 15,
    warranty: '1 Year Official Warranty',
    deliveryInfo: 'Free delivery within 24-48 hours in all major cities',
    reviews: [
      { id: '1', name: 'Ahmed Raza', initials: 'AR', rating: 5, date: 'March 5, 2026', comment: 'Absolutely amazing product! Flexiberry delivered it next day and the installment plan was hassle-free. Build quality is exceptional and performance is unreal.' },
      { id: '2', name: 'Fatima Sheikh', initials: 'FS', rating: 5, date: 'February 28, 2026', comment: 'Got it on 12-month installment - totally worth it. Packaging was perfect and support team was very helpful explaining all the features.' },
      { id: '3', name: 'Hassan Ali', initials: 'HA', rating: 4, date: 'February 20, 2026', comment: 'Great phone, excellent camera quality. The S Pen is a game changer for productivity. Minor issue with delivery timing but overall satisfied.' },
    ]
  },
  '2': {
    id: '2',
    name: 'Honda City 2024 Aspire',
    category: 'Vehicles',
    categorySlug: 'cars',
    vendor: 'AutoMart Pakistan',
    vendorVerified: true,
    vendorLocation: 'Karachi',
    reference: 'HC-2024-ASP',
    price: 4850000,
    originalPrice: 5100000,
    discount: 5,
    rating: 4.9,
    reviewCount: 89,
    images: ['/assets/carousel-8.jpg', '/assets/carousel-8.jpg', '/assets/carousel-8.jpg', '/assets/carousel-8.jpg'],
    description: 'The all-new Honda City 2024 Aspire combines elegant design with powerful performance. Featuring the latest safety technologies and premium comfort features.',
    features: [
      'Honda Sensing safety suite included',
      'Factory warranty with authorized service',
      'Genuine Honda accessories package',
      'Fuel-efficient 1.5L VTEC engine',
      "Backed by FlexiBerry's 7-day return policy"
    ],
    specifications: {
      'Engine': '1.5L i-VTEC',
      'Transmission': 'CVT Automatic',
      'Fuel Economy': '14-16 km/l',
      'Seating': '5 passengers',
      'Features': 'Sunroof, Leather Seats, Navigation',
    },
    colors: [
      { name: 'Platinum White', hex: '#f5f5f5' },
      { name: 'Crystal Black', hex: '#1a1a1a' },
      { name: 'Lunar Silver', hex: '#c0c0c0' },
      { name: 'Radiant Red', hex: '#c41e3a' },
    ],
    variants: [],
    installmentPlans: [
      { months: 6, monthly: 808334 },
      { months: 12, monthly: 404167 },
    ],
    inStock: true,
    stockCount: 3,
    warranty: '3 Years / 100,000 km Warranty',
    deliveryInfo: 'Vehicle registration and delivery within 7 days',
    reviews: []
  },
  '3': {
    id: '3',
    name: 'Royal Bedroom Set',
    category: 'Furniture',
    categorySlug: 'furniture',
    vendor: 'CraftHouse Furniture',
    vendorVerified: true,
    vendorLocation: 'Multan',
    reference: '6-001',
    price: 285000,
    originalPrice: 320000,
    discount: 11,
    rating: 4.4,
    reviewCount: 67,
    images: ['/assets/carousel-6.jpg', '/assets/carousel-6.jpg', '/assets/carousel-6.jpg', '/assets/carousel-6.jpg'],
    description: 'Complete bedroom furniture. Premium quality product with manufacturer warranty, fast nationwide delivery, and easy installment plans with 0% markup.',
    features: [
      'Top-grade materials and certified build quality',
      'Manufacturer tested - shipped in original packaging',
      'Compatible with all standard accessories',
      'Energy-efficient modern design',
      "Backed by FlexiBerry's 7-day return policy"
    ],
    specifications: {
      'Material': 'Solid Sheesham Wood',
      'Finish': 'Premium Lacquer',
      'Bed Size': 'King Size (6x7 ft)',
      'Includes': 'Bed, 2 Side Tables, Dresser, Mirror',
      'Assembly': 'Free Professional Installation',
    },
    colors: [
      { name: 'Natural Titanium', hex: '#c9b896' },
      { name: 'Dark Walnut', hex: '#1a1a1a' },
      { name: 'Oak White', hex: '#f5ebe0' },
      { name: 'Teal Green', hex: '#2d7a7a' },
    ],
    variants: [
      { label: 'Storage', options: ['128GB', '256GB', '512GB', '1TB'] }
    ],
    installmentPlans: [
      { months: 6, monthly: 47500 },
      { months: 12, monthly: 23750 },
    ],
    inStock: true,
    stockCount: 8,
    warranty: '5 Years Manufacturer Warranty',
    deliveryInfo: 'Free Home Delivery within 24-48 hours - All major cities covered',
    reviews: [
      { id: '1', name: 'Ahmed Raza', initials: 'AR', rating: 5, date: 'March 5, 2026', comment: 'Absolutely amazing product! Flexiberry delivered it next day and the installment plan was hassle-free. Build quality is exceptional and performance is unreal.' },
      { id: '2', name: 'Fatima Sheikh', initials: 'FS', rating: 5, date: 'February 28, 2026', comment: 'Got it on 12-month installment - totally worth it. Packaging was perfect and support team was very helpful explaining all the features.' },
    ]
  },
  '4': {
    id: '4',
    name: 'Complete Jahez Package Gold',
    category: 'Jahez Packages',
    categorySlug: 'jahez',
    vendor: 'HomeKart Pakistan',
    vendorVerified: true,
    vendorLocation: 'Faisalabad',
    reference: 'JP-GOLD-001',
    price: 850000,
    originalPrice: 950000,
    discount: 11,
    rating: 4.3,
    reviewCount: 28,
    images: ['/assets/carousel-7.jpg', '/assets/carousel-7.jpg', '/assets/carousel-7.jpg', '/assets/carousel-7.jpg'],
    description: 'Complete wedding package including furniture, appliances, and electronics. Everything you need for your new home in one convenient bundle.',
    features: [
      'Complete 4-5 item bundle package',
      'Premium quality products only',
      'Free delivery and installation',
      'Extended warranty on all items',
      "Backed by FlexiBerry's 7-day return policy"
    ],
    specifications: {
      'Bedroom Set': 'King Size Complete Set',
      'Living Room': 'Sofa Set + Center Table',
      'Appliances': 'LED TV 55" + AC 1.5 Ton + Refrigerator',
      'Kitchen': 'Microwave + Oven',
    },
    colors: [],
    variants: [
      { label: 'Package', options: ['Gold', 'Platinum', 'Diamond'] }
    ],
    installmentPlans: [
      { months: 6, monthly: 141667 },
      { months: 12, monthly: 70834 },
    ],
    inStock: true,
    stockCount: 5,
    warranty: 'Individual warranties on all items',
    deliveryInfo: 'Scheduled delivery within 5-7 business days',
    reviews: []
  },
  '5': {
    id: '5',
    name: '5KW Solar Panel System',
    category: 'Solar Systems',
    categorySlug: 'solar',
    vendor: 'GreenPower Solutions',
    vendorVerified: true,
    vendorLocation: 'Islamabad',
    reference: 'SP-5KW-001',
    price: 650000,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviewCount: 45,
    images: ['/assets/carousel-4.jpg', '/assets/carousel-4.jpg', '/assets/carousel-4.jpg', '/assets/carousel-4.jpg'],
    description: 'Complete 5KW on-grid solar system with premium panels, inverter, and professional installation. Start saving on electricity bills immediately.',
    features: [
      'Tier-1 solar panels with 25-year warranty',
      'High-efficiency inverter included',
      'Net metering assistance provided',
      'Professional installation included',
      "Backed by FlexiBerry's 7-day return policy"
    ],
    specifications: {
      'Capacity': '5kW System',
      'Panels': '10x 550W Mono PERC',
      'Inverter': 'Hybrid 5kW',
      'Average Generation': '20-25 units/day',
      'Installation': 'Professional team, 2-3 days',
    },
    colors: [],
    variants: [
      { label: 'System Size', options: ['3KW', '5KW', '10KW', '15KW'] }
    ],
    installmentPlans: [
      { months: 6, monthly: 108334 },
      { months: 12, monthly: 54167 },
    ],
    inStock: true,
    stockCount: 12,
    warranty: '25 Years Panel Warranty, 5 Years Inverter',
    deliveryInfo: 'Site survey within 48 hours, installation within 1 week',
    reviews: []
  },
}

// Recently viewed products
const RECENTLY_VIEWED = [
  { id: 'r1', name: 'Samsung Galaxy S24 Ultra', brand: 'SAMSUNG', price: 449999, originalPrice: 499999, rating: 4.8, image: '/assets/carousel-1.jpg', badge: '-10%', categorySlug: 'smartphones' },
  { id: 'r2', name: 'MacBook Pro M3 14"', brand: 'APPLE', price: 649999, originalPrice: null, rating: 5, image: '/assets/carousel-2.jpg', badge: 'New', categorySlug: 'laptops' },
  { id: 'r3', name: 'Sony WH-1000XM5', brand: 'SONY', price: 89999, originalPrice: 109999, rating: 5, image: '/assets/carousel-1.jpg', badge: '-18%', categorySlug: 'electronics' },
  { id: 'r4', name: 'iPad Pro M2 12.9"', brand: 'APPLE', price: 379999, originalPrice: null, rating: 5, image: '/assets/carousel-2.jpg', badge: 'New', categorySlug: 'electronics' },
  { id: 'r5', name: 'Google Pixel 8 Pro', brand: 'GOOGLE', price: 199999, originalPrice: 229999, rating: 4.9, image: '/assets/carousel-1.jpg', badge: '-13%', categorySlug: 'smartphones' },
  { id: 'r6', name: 'Samsung 65" QLED 4K', brand: 'SAMSUNG', price: 329999, originalPrice: 389999, rating: 4.7, image: '/assets/carousel-5.jpg', badge: '-15%', categorySlug: 'appliances' },
]

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
  const [isZoomed, setIsZoomed] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToWishlist, setAddedToWishlist] = useState(false)

  // Initialize variants
  useEffect(() => {
    if (product?.variants) {
      const initial: Record<string, string> = {}
      product.variants.forEach(v => {
        initial[v.label] = v.options[0]
      })
      setSelectedVariants(initial)
    }
  }, [product])

  if (!product) {
    return (
      <FlexiLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">404</div>
            <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
            <Link href="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </FlexiLayout>
    )
  }

  const theme = CATEGORY_THEMES[product.categorySlug as keyof typeof CATEGORY_THEMES] || CATEGORY_THEMES.default
  const plan = product.installmentPlans.find(p => p.months === selectedPlan)

  // Calculate rating distribution (mock)
  const ratingDist = [
    { stars: 5, count: Math.floor(product.reviewCount * 0.7), pct: 70 },
    { stars: 4, count: Math.floor(product.reviewCount * 0.2), pct: 20 },
    { stars: 3, count: Math.floor(product.reviewCount * 0.07), pct: 7 },
    { stars: 2, count: Math.floor(product.reviewCount * 0.02), pct: 2 },
    { stars: 1, count: Math.floor(product.reviewCount * 0.01), pct: 1 },
  ]

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <FlexiLayout>
      <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 0' }}>
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
        <div style={{ maxWidth: 1340, margin: '0 auto', padding: '32px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: 40 }}>
            
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div style={{
                position: 'relative', borderRadius: 20, overflow: 'hidden',
                background: '#fff', border: '1.5px solid #e5e7eb',
                aspectRatio: '1', cursor: 'zoom-in',
              }} onClick={() => setIsZoomed(true)}>
                {product.discount && (
                  <span style={{
                    position: 'absolute', top: 16, left: 16, zIndex: 10,
                    background: '#dc2626', color: '#fff', padding: '6px 14px',
                    borderRadius: 8, fontSize: 13, fontWeight: 700,
                  }}>
                    -{product.discount}% OFF
                  </span>
                )}
                <div style={{
                  width: '100%', height: '100%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    width={600}
                    height={600}
                    style={{ objectFit: 'contain', padding: 40 }}
                  />
                </div>
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: 80, height: 80, borderRadius: 12, overflow: 'hidden',
                      border: `2px solid ${selectedImage === i ? theme.primary : '#e5e7eb'}`,
                      background: '#fff', padding: 8, cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Image src={img} alt="" width={80} height={80} style={{ objectFit: 'contain' }} />
                  </button>
                ))}
              </div>

              {/* Trust Badges */}
              <Card style={{ marginTop: 32, padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  { title: 'Official Warranty', sub: product.warranty, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                  { title: 'Fast Delivery', sub: '24-48 Hours', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                  { title: '7-Day Returns', sub: 'Hassle-free', icon: 'M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3' },
                  { title: 'Secure Payment', sub: '0% Markup', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                ].map((badge, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: theme.bg, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="20" height="20" fill="none" stroke={theme.primary} strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d={badge.icon}/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{badge.title}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            {/* Product Details */}
            <div>
              <h1 style={{
                fontSize: 28, fontWeight: 800, color: '#111827',
                fontFamily: "'Playfair Display', serif", marginBottom: 16, lineHeight: 1.3,
              }}>
                {product.name}
              </h1>

              {/* Vendor Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: theme.gradient, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: theme.primary }}>{product.vendor}</span>
                    {product.vendorVerified && (
                      <svg width="16" height="16" fill={theme.primary} viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {product.vendorLocation}
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <Card style={{ padding: 24, background: theme.bg, border: `1.5px solid ${theme.border}`, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: '#111827' }}>₨{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span style={{ fontSize: 18, color: '#94a3b8', textDecoration: 'line-through' }}>₨{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: theme.primary, fontWeight: 700, fontSize: 15 }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Pay in easy installments from ₨{Math.floor(product.price / 12).toLocaleString()}/month
                </div>
              </Card>

              {/* Installment Plans */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontWeight: 700, color: '#111827' }}>Select Installment Plan</h3>
                  <Link href="/how-it-works" style={{ fontSize: 13, color: theme.primary, fontWeight: 600 }}>How it works?</Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {product.installmentPlans.map(p => (
                    <button
                      key={p.months}
                      onClick={() => setSelectedPlan(p.months)}
                      style={{
                        padding: '16px', borderRadius: 12, border: `2px solid ${selectedPlan === p.months ? theme.primary : '#e5e7eb'}`,
                        background: selectedPlan === p.months ? '#fff' : 'transparent', textAlign: 'left', cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>{p.months} Months</div>
                      <div style={{ fontWeight: 800, color: '#111827' }}>₨{p.monthly.toLocaleString()}/mo</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Variants */}
              {product.variants.map(v => (
                <div key={v.label} style={{ marginBottom: 24 }}>
                  <h3 style={{ fontWeight: 700, color: '#111827', marginBottom: 12 }}>{v.label}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {v.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [v.label]: opt }))}
                        style={{
                          padding: '8px 16px', borderRadius: 8, border: `1.5px solid ${selectedVariants[v.label] === opt ? theme.primary : '#e5e7eb'}`,
                          background: selectedVariants[v.label] === opt ? theme.bg : '#fff', color: selectedVariants[v.label] === opt ? theme.primary : '#4b5563',
                          fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity & Actions */}
              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px',
                  borderRadius: 12, border: '1.5px solid #e5e7eb', background: '#fff',
                }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: '#6b7280' }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: '#6b7280' }}>+</button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1, height: 52, borderRadius: 12, fontSize: 16, fontWeight: 700,
                    background: addedToCart ? '#10b981' : theme.primary,
                    boxShadow: `0 4px 14px ${theme.primary}40`,
                  }}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </Button>
                <button
                  onClick={() => setAddedToWishlist(!addedToWishlist)}
                  style={{
                    width: 52, height: 52, borderRadius: 12, border: '1.5px solid #e5e7eb',
                    background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: addedToWishlist ? '#ef4444' : '#94a3b8', transition: 'all 0.2s',
                  }}
                >
                  <svg width="24" height="24" fill={addedToWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div style={{ marginTop: 64 }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', gap: 40, marginBottom: 32 }}>
              {[
                { id: 'description', label: 'Description' },
                { id: 'details', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '16px 0', border: 'none', background: 'none', cursor: 'pointer',
                    fontSize: 16, fontWeight: 700, color: activeTab === tab.id ? theme.primary : '#6b7280',
                    position: 'relative', transition: 'all 0.2s',
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 3, background: theme.primary, borderRadius: 3 }} />
                  )}
                </button>
              ))}
            </div>

            <div style={{ maxWidth: 800 }}>
              {activeTab === 'description' && (
                <div style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 24 }}>{product.description}</p>
                  <h4 style={{ fontWeight: 700, color: '#111827', marginBottom: 16 }}>Key Features:</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
                    {product.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ color: theme.primary, fontWeight: 900 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'details' && (
                <div style={{ display: 'grid', gap: 1 }}>
                  {Object.entries(product.specifications).map(([key, val], i) => (
                    <div key={key} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', padding: '16px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontWeight: 600, color: '#6b7280' }}>{key}</span>
                      <span style={{ color: '#111827' }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {product.reviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                      {product.reviews.map(r => (
                        <div key={r.id} style={{ paddingBottom: 32, borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div style={{ width: 44, height: 44, borderRadius: '50%', background: theme.bg, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                                {r.initials}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700 }}>{r.name}</div>
                                <div style={{ fontSize: 12, color: '#94a3b8' }}>{r.date}</div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 2 }}>
                              {[1, 2, 3, 4, 5].map(s => (
                                <span key={s} style={{ color: s <= r.rating ? '#f59e0b' : '#e2e8f0', fontSize: 14 }}>★</span>
                              ))}
                            </div>
                          </div>
                          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                      No reviews yet for this product.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  )
}
