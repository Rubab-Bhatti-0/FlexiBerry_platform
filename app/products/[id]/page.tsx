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
    variants: [],
    installmentPlans: [
      { months: 6, monthly: 47500 },
      { months: 12, monthly: 23750 },
    ],
    inStock: true,
    stockCount: 8,
    warranty: '5 Years Manufacturer Warranty',
    deliveryInfo: 'Free Home Delivery within 24-48 hours - All major cities covered',
    reviews: []
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
    variants: [],
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
    variants: [],
    installmentPlans: [
      { months: 6, monthly: 108334 },
      { months: 12, monthly: 54167 },
    ],
    inStock: true,
    stockCount: 10,
    warranty: '25 Years Panel Warranty',
    deliveryInfo: 'Installation within 7-10 business days',
    reviews: []
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = PRODUCTS_DATA[productId] || PRODUCTS_DATA['1']
  
  const [selectedImg, setSelectedImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [selectedPlan, setSelectedPlan] = useState(product.installmentPlans[1]?.months || 6)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToWishlist, setAddedToWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')

  const theme = CATEGORY_THEMES[product.categorySlug] || CATEGORY_THEMES.general
  const plan = product.installmentPlans.find(p => p.months === selectedPlan)

  useEffect(() => {
    // Initialize variants with first options
    const initial: Record<string, string> = {}
    product.variants.forEach(v => { initial[v.label] = v.options[0] })
    setSelectedVariants(initial)
  }, [product])

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <FlexiLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #fcfcfd;
          color: #1a1a1a;
        }

        .product-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 32px;
        }

        .breadcrumb a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb a:hover {
          color: ${theme.primary};
        }

        .product-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          margin-bottom: 80px;
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .image-gallery {
          position: sticky;
          top: 100px;
          align-self: flex-start;
        }

        .main-image {
          width: 100%;
          aspect-ratio: 1;
          background: #fff;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }

        .main-image:hover img {
          transform: scale(1.05);
        }

        .thumbnails {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          border: 2px solid transparent;
          cursor: pointer;
          overflow: hidden;
          flex-shrink: 0;
          background: #fff;
          transition: all 0.2s;
        }

        .thumbnail.active {
          border-color: ${theme.primary};
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info h1 {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .vendor-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #f8fafc;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 24px;
        }

        .price-section {
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid #f1f5f9;
        }

        .current-price {
          font-size: 42px;
          font-weight: 800;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .original-price {
          font-size: 20px;
          color: #94a3b8;
          text-decoration: line-through;
          font-weight: 500;
        }

        .discount-tag {
          font-size: 14px;
          font-weight: 700;
          color: #ef4444;
          background: #fef2f2;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .installment-highlight {
          margin-top: 12px;
          font-size: 15px;
          font-weight: 600;
          color: ${theme.primary};
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .option-label {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .color-options {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }

        .color-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #e2e8f0;
          cursor: pointer;
          transition: all 0.2s;
        }

        .color-btn.active {
          box-shadow: 0 0 0 2px ${theme.primary};
        }

        .plan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 32px;
        }

        .plan-card {
          padding: 16px;
          border-radius: 16px;
          border: 1.5px solid #f1f5f9;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .plan-card.active {
          border-color: ${theme.primary};
          background: ${theme.bg};
        }

        .plan-card .months {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .plan-card .amount {
          font-size: 18px;
          font-weight: 800;
          color: #111827;
        }

        .action-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }

        .qty-selector {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border-radius: 14px;
          padding: 4px;
          border: 1px solid #f1f5f9;
        }

        .qty-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: none;
          font-size: 20px;
          color: #64748b;
          cursor: pointer;
        }

        .qty-value {
          width: 40px;
          text-align: center;
          font-weight: 700;
        }

        .buy-btn {
          flex: 1;
          height: 56px;
          background: ${theme.gradient};
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 25px ${theme.primary}33;
          transition: all 0.3s;
        }

        .buy-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px ${theme.primary}44;
        }

        .tabs-section {
          border-top: 1px solid #f1f5f9;
          padding-top: 60px;
        }

        .tabs-header {
          display: flex;
          gap: 40px;
          margin-bottom: 40px;
          border-bottom: 1px solid #f1f5f9;
        }

        .tab-btn {
          padding: 16px 0;
          font-size: 16px;
          font-weight: 700;
          color: #94a3b8;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          color: #111827;
          border-bottom-color: ${theme.primary};
        }

        .spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .spec-label {
          color: #64748b;
          font-weight: 600;
        }

        .spec-value {
          color: #111827;
          font-weight: 700;
        }
      `}</style>

      <div className="product-container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.categorySlug}`} style={{ color: theme.primary }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 700 }}>{product.name}</span>
        </div>

        <div className="product-grid">
          {/* Left: Images */}
          <div className="image-gallery">
            <div className="main-image">
              <span style={{ fontSize: 200 }}>{product.image || '📦'}</span>
            </div>
            <div className="thumbnails">
              {[0, 1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`thumbnail ${selectedImg === i ? 'active' : ''}`}
                  onClick={() => setSelectedImg(i)}
                >
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
                    {product.image || '📦'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="product-info">
            <div className="vendor-badge">
              <span style={{ color: '#22c55e' }}>●</span>
              {product.vendor}
              {product.vendorVerified && <span title="Verified Vendor">✅</span>}
            </div>

            <h1>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} style={{ color: s <= Math.floor(product.rating) ? '#f59e0b' : '#e2e8f0', fontSize: 18 }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{product.rating}</span>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>({product.reviewCount} reviews)</span>
            </div>

            <div className="price-section">
              <div className="current-price">
                PKR {product.price.toLocaleString()}
                {product.originalPrice && (
                  <>
                    <span className="original-price">PKR {product.originalPrice.toLocaleString()}</span>
                    <span className="discount-tag">-{product.discount}%</span>
                  </>
                )}
              </div>
              <div className="installment-highlight">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Available from PKR {plan?.monthly.toLocaleString()}/month - 0% markup
              </div>
            </div>

            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
              {product.description}
            </p>

            {product.colors.length > 0 && (
              <div>
                <div className="option-label">Color: <span style={{ color: '#64748b' }}>{product.colors[selectedColor].name}</span></div>
                <div className="color-options">
                  {product.colors.map((c, i) => (
                    <button 
                      key={i} 
                      className={`color-btn ${selectedColor === i ? 'active' : ''}`}
                      style={{ background: c.hex }}
                      onClick={() => setSelectedColor(i)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="option-label">Installment Plan</div>
              <div className="plan-grid">
                {product.installmentPlans.map(p => (
                  <div 
                    key={p.months} 
                    className={`plan-card ${selectedPlan === p.months ? 'active' : ''}`}
                    onClick={() => setSelectedPlan(p.months)}
                  >
                    <div className="months">{p.months} Months</div>
                    <div className="amount">PKR {p.monthly.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <div className="qty-selector">
                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <div className="qty-value">{quantity}</div>
                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="buy-btn" onClick={handleAddToCart}>
                {addedToCart ? '✓ Added to Cart' : 'Buy on Installment'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
                <span style={{ color: theme.primary }}>🛡️</span> {product.warranty}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
                <span style={{ color: theme.primary }}>🚚</span> {product.deliveryInfo}
              </div>
            </div>
          </div>
        </div>

        <div className="tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div style={{ maxWidth: 800 }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Product Overview</h3>
                <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>{product.description}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 0, listStyle: 'none' }}>
                  {product.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: '#334155' }}>
                      <span style={{ color: theme.primary }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="spec-grid">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key}</span>
                    <span className="spec-value">{val}</span>
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
    </FlexiLayout>
  )
}
