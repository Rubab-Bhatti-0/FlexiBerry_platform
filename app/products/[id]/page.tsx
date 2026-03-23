// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useParams } from 'next/navigation'
// import FlexiLayout, { CATEGORY_THEMES } from '@/components/layout/FlexiLayout/FlexiLayout'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'

// // Extended mock product data with category-specific theming
// const PRODUCTS_DATA: Record<string, {
//   id: string
//   name: string
//   category: string
//   categorySlug: string
//   vendor: string
//   vendorVerified: boolean
//   vendorLocation: string
//   reference: string
//   price: number
//   originalPrice: number | null
//   discount: number | null
//   rating: number
//   reviewCount: number
//   images: string[]
//   description: string
//   features: string[]
//   specifications: Record<string, string>
//   colors: { name: string; hex: string }[]
//   variants: { label: string; options: string[] }[]
//   installmentPlans: { months: number; monthly: number }[]
//   inStock: boolean
//   stockCount: number
//   warranty: string
//   deliveryInfo: string
//   reviews: { id: string; name: string; initials: string; rating: number; date: string; comment: string }[]
// }> = {
//   '1': {
//     id: '1',
//     name: 'Samsung Galaxy S24 Ultra',
//     category: 'Electronics',
//     categorySlug: 'smartphones',
//     vendor: 'TechZone Official Store',
//     vendorVerified: true,
//     vendorLocation: 'Lahore',
//     reference: 'SM-S928BZKQPK',
//     price: 449999,
//     originalPrice: 499999,
//     discount: 10,
//     rating: 4.8,
//     reviewCount: 234,
//     images: ['/assets/carousel-1.jpg', '/assets/carousel-1.jpg', '/assets/carousel-1.jpg', '/assets/carousel-1.jpg'],
//     description: 'Experience the ultimate flagship smartphone with AI-powered features, S Pen integration, and the most advanced camera system ever in a Galaxy device.',
//     features: [
//       'Top-grade materials and certified build quality',
//       'Manufacturer tested - shipped in original packaging',
//       'Compatible with all standard accessories',
//       'Energy-efficient modern design',
//       "Backed by FlexiBerry's 7-day return policy"
//     ],
//     specifications: {
//       'Display': '6.8" Dynamic AMOLED 2X, 120Hz',
//       'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
//       'RAM': '12GB',
//       'Storage': '256GB / 512GB / 1TB',
//       'Camera': '200MP + 12MP + 50MP + 10MP',
//       'Battery': '5000mAh with 45W Fast Charging',
//     },
//     colors: [
//       { name: 'Titanium Black', hex: '#1a1a1a' },
//       { name: 'Titanium Gray', hex: '#7a7a7a' },
//       { name: 'Titanium Violet', hex: '#9d8ec9' },
//       { name: 'Titanium Yellow', hex: '#e8d084' },
//     ],
//     variants: [
//       { label: 'Storage', options: ['256GB', '512GB', '1TB'] }
//     ],
//     installmentPlans: [
//       { months: 6, monthly: 75000 },
//       { months: 12, monthly: 37500 },
//     ],
//     inStock: true,
//     stockCount: 15,
//     warranty: '1 Year Official Warranty',
//     deliveryInfo: 'Free delivery within 24-48 hours in all major cities',
//     reviews: [
//       { id: '1', name: 'Ahmed Raza', initials: 'AR', rating: 5, date: 'March 5, 2026', comment: 'Absolutely amazing product! Flexiberry delivered it next day and the installment plan was hassle-free. Build quality is exceptional and performance is unreal.' },
//       { id: '2', name: 'Fatima Sheikh', initials: 'FS', rating: 5, date: 'February 28, 2026', comment: 'Got it on 12-month installment - totally worth it. Packaging was perfect and support team was very helpful explaining all the features.' },
//       { id: '3', name: 'Hassan Ali', initials: 'HA', rating: 4, date: 'February 20, 2026', comment: 'Great phone, excellent camera quality. The S Pen is a game changer for productivity. Minor issue with delivery timing but overall satisfied.' },
//     ]
//   },
//   '2': {
//     id: '2',
//     name: 'Honda City 2024 Aspire',
//     category: 'Vehicles',
//     categorySlug: 'cars',
//     vendor: 'AutoMart Pakistan',
//     vendorVerified: true,
//     vendorLocation: 'Karachi',
//     reference: 'HC-2024-ASP',
//     price: 4850000,
//     originalPrice: 5100000,
//     discount: 5,
//     rating: 4.9,
//     reviewCount: 89,
//     images: ['/assets/carousel-8.jpg', '/assets/carousel-8.jpg', '/assets/carousel-8.jpg', '/assets/carousel-8.jpg'],
//     description: 'The all-new Honda City 2024 Aspire combines elegant design with powerful performance. Featuring the latest safety technologies and premium comfort features.',
//     features: [
//       'Honda Sensing safety suite included',
//       'Factory warranty with authorized service',
//       'Genuine Honda accessories package',
//       'Fuel-efficient 1.5L VTEC engine',
//       "Backed by FlexiBerry's 7-day return policy"
//     ],
//     specifications: {
//       'Engine': '1.5L i-VTEC',
//       'Transmission': 'CVT Automatic',
//       'Fuel Economy': '14-16 km/l',
//       'Seating': '5 passengers',
//       'Features': 'Sunroof, Leather Seats, Navigation',
//     },
//     colors: [
//       { name: 'Platinum White', hex: '#f5f5f5' },
//       { name: 'Crystal Black', hex: '#1a1a1a' },
//       { name: 'Lunar Silver', hex: '#c0c0c0' },
//       { name: 'Radiant Red', hex: '#c41e3a' },
//     ],
//     variants: [],
//     installmentPlans: [
//       { months: 6, monthly: 808334 },
//       { months: 12, monthly: 404167 },
//     ],
//     inStock: true,
//     stockCount: 3,
//     warranty: '3 Years / 100,000 km Warranty',
//     deliveryInfo: 'Vehicle registration and delivery within 7 days',
//     reviews: []
//   },
//   '3': {
//     id: '3',
//     name: 'Royal Bedroom Set',
//     category: 'Furniture',
//     categorySlug: 'furniture',
//     vendor: 'CraftHouse Furniture',
//     vendorVerified: true,
//     vendorLocation: 'Multan',
//     reference: '6-001',
//     price: 285000,
//     originalPrice: 320000,
//     discount: 11,
//     rating: 4.4,
//     reviewCount: 67,
//     images: ['/assets/carousel-6.jpg', '/assets/carousel-6.jpg', '/assets/carousel-6.jpg', '/assets/carousel-6.jpg'],
//     description: 'Complete bedroom furniture. Premium quality product with manufacturer warranty, fast nationwide delivery, and easy installment plans with 0% markup.',
//     features: [
//       'Top-grade materials and certified build quality',
//       'Manufacturer tested - shipped in original packaging',
//       'Compatible with all standard accessories',
//       'Energy-efficient modern design',
//       "Backed by FlexiBerry's 7-day return policy"
//     ],
//     specifications: {
//       'Material': 'Solid Sheesham Wood',
//       'Finish': 'Premium Lacquer',
//       'Bed Size': 'King Size (6x7 ft)',
//       'Includes': 'Bed, 2 Side Tables, Dresser, Mirror',
//       'Assembly': 'Free Professional Installation',
//     },
//     colors: [
//       { name: 'Natural Titanium', hex: '#c9b896' },
//       { name: 'Dark Walnut', hex: '#1a1a1a' },
//       { name: 'Oak White', hex: '#f5ebe0' },
//       { name: 'Teal Green', hex: '#2d7a7a' },
//     ],
//     variants: [],
//     installmentPlans: [
//       { months: 6, monthly: 47500 },
//       { months: 12, monthly: 23750 },
//     ],
//     inStock: true,
//     stockCount: 8,
//     warranty: '5 Years Manufacturer Warranty',
//     deliveryInfo: 'Free Home Delivery within 24-48 hours - All major cities covered',
//     reviews: []
//   },
//   '4': {
//     id: '4',
//     name: 'Complete Jahez Package Gold',
//     category: 'Jahez Packages',
//     categorySlug: 'jahez',
//     vendor: 'HomeKart Pakistan',
//     vendorVerified: true,
//     vendorLocation: 'Faisalabad',
//     reference: 'JP-GOLD-001',
//     price: 850000,
//     originalPrice: 950000,
//     discount: 11,
//     rating: 4.3,
//     reviewCount: 28,
//     images: ['/assets/carousel-7.jpg', '/assets/carousel-7.jpg', '/assets/carousel-7.jpg', '/assets/carousel-7.jpg'],
//     description: 'Complete wedding package including furniture, appliances, and electronics. Everything you need for your new home in one convenient bundle.',
//     features: [
//       'Complete 4-5 item bundle package',
//       'Premium quality products only',
//       'Free delivery and installation',
//       'Extended warranty on all items',
//       "Backed by FlexiBerry's 7-day return policy"
//     ],
//     specifications: {
//       'Bedroom Set': 'King Size Complete Set',
//       'Living Room': 'Sofa Set + Center Table',
//       'Appliances': 'LED TV 55" + AC 1.5 Ton + Refrigerator',
//       'Kitchen': 'Microwave + Oven',
//     },
//     colors: [],
//     variants: [],
//     installmentPlans: [
//       { months: 6, monthly: 141667 },
//       { months: 12, monthly: 70834 },
//     ],
//     inStock: true,
//     stockCount: 5,
//     warranty: 'Individual warranties on all items',
//     deliveryInfo: 'Scheduled delivery within 5-7 business days',
//     reviews: []
//   },
//   '5': {
//     id: '5',
//     name: '5KW Solar Panel System',
//     category: 'Solar Systems',
//     categorySlug: 'solar',
//     vendor: 'GreenPower Solutions',
//     vendorVerified: true,
//     vendorLocation: 'Islamabad',
//     reference: 'SP-5KW-001',
//     price: 650000,
//     originalPrice: null,
//     discount: null,
//     rating: 4.7,
//     reviewCount: 45,
//     images: ['/assets/carousel-4.jpg', '/assets/carousel-4.jpg', '/assets/carousel-4.jpg', '/assets/carousel-4.jpg'],
//     description: 'Complete 5KW on-grid solar system with premium panels, inverter, and professional installation. Start saving on electricity bills immediately.',
//     features: [
//       'Tier-1 solar panels with 25-year warranty',
//       'High-efficiency inverter included',
//       'Net metering assistance provided',
//       'Professional installation included',
//       "Backed by FlexiBerry's 7-day return policy"
//     ],
//     specifications: {
//       'Capacity': '5kW System',
//       'Panels': '10x 550W Mono PERC',
//       'Inverter': 'Hybrid 5kW',
//       'Average Generation': '20-25 units/day',
//       'Installation': 'Professional team, 2-3 days',
//     },
//     colors: [],
//     variants: [],
//     installmentPlans: [
//       { months: 6, monthly: 108334 },
//       { months: 12, monthly: 54167 },
//     ],
//     inStock: true,
//     stockCount: 10,
//     warranty: '25 Years Panel Warranty',
//     deliveryInfo: 'Installation within 7-10 business days',
//     reviews: []
//   }
// }

// export default function ProductDetailPage() {
//   const params = useParams()
//   const productId = params.id as string
//   const product = PRODUCTS_DATA[productId] || PRODUCTS_DATA['1']
  
//   const [selectedImg, setSelectedImg] = useState(0)
//   const [selectedColor, setSelectedColor] = useState(0)
//   const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
//   const [selectedPlan, setSelectedPlan] = useState(product.installmentPlans[1]?.months || 6)
//   const [quantity, setQuantity] = useState(1)
//   const [addedToCart, setAddedToCart] = useState(false)
//   const [addedToWishlist, setAddedToWishlist] = useState(false)
//   const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')

//   const theme = CATEGORY_THEMES[product.categorySlug] || CATEGORY_THEMES.general
//   const plan = product.installmentPlans.find(p => p.months === selectedPlan)

//   useEffect(() => {
//     // Initialize variants with first options
//     const initial: Record<string, string> = {}
//     product.variants.forEach(v => { initial[v.label] = v.options[0] })
//     setSelectedVariants(initial)
//   }, [product])

//   const handleAddToCart = () => {
//     setAddedToCart(true)
//     setTimeout(() => setAddedToCart(false), 3000)
//   }

//   return (
//     <FlexiLayout>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
//         body {
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           background-color: #fcfcfd;
//           color: #1a1a1a;
//         }

//         .product-container {
//           max-width: 1300px;
//           margin: 0 auto;
//           padding: 40px 20px;
//         }

//         .breadcrumb {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 13px;
//           color: #6b7280;
//           margin-bottom: 32px;
//         }

//         .breadcrumb a {
//           color: inherit;
//           text-decoration: none;
//           transition: color 0.2s;
//         }

//         .breadcrumb a:hover {
//           color: ${theme.primary};
//         }

//         .product-grid {
//           display: grid;
//           grid-template-columns: 1.1fr 0.9fr;
//           gap: 60px;
//           margin-bottom: 80px;
//         }

//         @media (max-width: 1024px) {
//           .product-grid {
//             grid-template-columns: 1fr;
//             gap: 40px;
//           }
//         }

//         .image-gallery {
//           position: sticky;
//           top: 100px;
//           align-self: flex-start;
//         }

//         .main-image {
//           width: 100%;
//           aspect-ratio: 1;
//           background: #fff;
//           border-radius: 24px;
//           border: 1px solid #f1f5f9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           margin-bottom: 20px;
//           box-shadow: 0 4px 20px rgba(0,0,0,0.02);
//         }

//         .main-image img {
//           width: 100%;
//           height: 100%;
//           object-fit: contain;
//           transition: transform 0.5s ease;
//         }

//         .main-image:hover img {
//           transform: scale(1.05);
//         }

//         .thumbnails {
//           display: flex;
//           gap: 12px;
//           overflow-x: auto;
//           padding-bottom: 10px;
//         }

//         .thumbnail {
//           width: 80px;
//           height: 80px;
//           border-radius: 12px;
//           border: 2px solid transparent;
//           cursor: pointer;
//           overflow: hidden;
//           flex-shrink: 0;
//           background: #fff;
//           transition: all 0.2s;
//         }

//         .thumbnail.active {
//           border-color: ${theme.primary};
//         }

//         .thumbnail img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .product-info h1 {
//           font-size: 36px;
//           font-weight: 800;
//           line-height: 1.2;
//           margin-bottom: 16px;
//           letter-spacing: -0.02em;
//         }

//         .vendor-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 6px 12px;
//           background: #f8fafc;
//           border-radius: 99px;
//           font-size: 13px;
//           font-weight: 600;
//           color: #475569;
//           margin-bottom: 24px;
//         }

//         .price-section {
//           margin-bottom: 32px;
//           padding-bottom: 32px;
//           border-bottom: 1px solid #f1f5f9;
//         }

//         .current-price {
//           font-size: 42px;
//           font-weight: 800;
//           color: #111827;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .original-price {
//           font-size: 20px;
//           color: #94a3b8;
//           text-decoration: line-through;
//           font-weight: 500;
//         }

//         .discount-tag {
//           font-size: 14px;
//           font-weight: 700;
//           color: #ef4444;
//           background: #fef2f2;
//           padding: 4px 10px;
//           border-radius: 6px;
//         }

//         .installment-highlight {
//           margin-top: 12px;
//           font-size: 15px;
//           font-weight: 600;
//           color: ${theme.primary};
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .option-label {
//           font-size: 14px;
//           font-weight: 700;
//           color: #111827;
//           margin-bottom: 12px;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//         }

//         .color-options {
//           display: flex;
//           gap: 12px;
//           margin-bottom: 32px;
//         }

//         .color-btn {
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           border: 2px solid #fff;
//           box-shadow: 0 0 0 1px #e2e8f0;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .color-btn.active {
//           box-shadow: 0 0 0 2px ${theme.primary};
//         }

//         .plan-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
//           gap: 12px;
//           margin-bottom: 32px;
//         }

//         .plan-card {
//           padding: 16px;
//           border-radius: 16px;
//           border: 1.5px solid #f1f5f9;
//           background: #fff;
//           cursor: pointer;
//           transition: all 0.2s;
//           text-align: center;
//         }

//         .plan-card.active {
//           border-color: ${theme.primary};
//           background: ${theme.bg};
//         }

//         .plan-card .months {
//           font-size: 13px;
//           color: #64748b;
//           margin-bottom: 4px;
//         }

//         .plan-card .amount {
//           font-size: 18px;
//           font-weight: 800;
//           color: #111827;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 16px;
//           margin-bottom: 40px;
//         }

//         .qty-selector {
//           display: flex;
//           align-items: center;
//           background: #f8fafc;
//           border-radius: 14px;
//           padding: 4px;
//           border: 1px solid #f1f5f9;
//         }

//         .qty-btn {
//           width: 40px;
//           height: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: none;
//           background: none;
//           font-size: 20px;
//           color: #64748b;
//           cursor: pointer;
//         }

//         .qty-value {
//           width: 40px;
//           text-align: center;
//           font-weight: 700;
//         }

//         .buy-btn {
//           flex: 1;
//           height: 56px;
//           background: ${theme.gradient};
//           color: #fff;
//           border: none;
//           border-radius: 14px;
//           font-size: 16px;
//           font-weight: 700;
//           cursor: pointer;
//           box-shadow: 0 10px 25px ${theme.primary}33;
//           transition: all 0.3s;
//         }

//         .buy-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 15px 30px ${theme.primary}44;
//         }

//         .tabs-section {
//           border-top: 1px solid #f1f5f9;
//           padding-top: 60px;
//         }

//         .tabs-header {
//           display: flex;
//           gap: 40px;
//           margin-bottom: 40px;
//           border-bottom: 1px solid #f1f5f9;
//         }

//         .tab-btn {
//           padding: 16px 0;
//           font-size: 16px;
//           font-weight: 700;
//           color: #94a3b8;
//           background: none;
//           border: none;
//           border-bottom: 2px solid transparent;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .tab-btn.active {
//           color: #111827;
//           border-bottom-color: ${theme.primary};
//         }

//         .spec-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//           gap: 24px;
//         }

//         .spec-item {
//           display: flex;
//           justify-content: space-between;
//           padding: 16px;
//           background: #f8fafc;
//           border-radius: 12px;
//         }

//         .spec-label {
//           color: #64748b;
//           font-weight: 600;
//         }

//         .spec-value {
//           color: #111827;
//           font-weight: 700;
//         }
//       `}</style>

//       <div className="product-container">
//         <div className="breadcrumb">
//           <Link href="/">Home</Link>
//           <span>/</span>
//           <Link href="/products">Products</Link>
//           <span>/</span>
//           <Link href={`/products?category=${product.categorySlug}`} style={{ color: theme.primary }}>{product.category}</Link>
//           <span>/</span>
//           <span style={{ color: '#111827', fontWeight: 700 }}>{product.name}</span>
//         </div>

//         <div className="product-grid">
//           {/* Left: Images */}
//           <div className="image-gallery">
//             <div className="main-image">
//               <span style={{ fontSize: 200 }}>{product.image || '📦'}</span>
//             </div>
//             <div className="thumbnails">
//               {[0, 1, 2, 3].map(i => (
//                 <div 
//                   key={i} 
//                   className={`thumbnail ${selectedImg === i ? 'active' : ''}`}
//                   onClick={() => setSelectedImg(i)}
//                 >
//                   <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
//                     {product.image || '📦'}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: Info */}
//           <div className="product-info">
//             <div className="vendor-badge">
//               <span style={{ color: '#22c55e' }}>●</span>
//               {product.vendor}
//               {product.vendorVerified && <span title="Verified Vendor">✅</span>}
//             </div>

//             <h1>{product.name}</h1>

//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
//               <div style={{ display: 'flex', gap: 2 }}>
//                 {[1, 2, 3, 4, 5].map(s => (
//                   <span key={s} style={{ color: s <= Math.floor(product.rating) ? '#f59e0b' : '#e2e8f0', fontSize: 18 }}>★</span>
//                 ))}
//               </div>
//               <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{product.rating}</span>
//               <span style={{ fontSize: 14, color: '#94a3b8' }}>({product.reviewCount} reviews)</span>
//             </div>

//             <div className="price-section">
//               <div className="current-price">
//                 PKR {product.price.toLocaleString()}
//                 {product.originalPrice && (
//                   <>
//                     <span className="original-price">PKR {product.originalPrice.toLocaleString()}</span>
//                     <span className="discount-tag">-{product.discount}%</span>
//                   </>
//                 )}
//               </div>
//               <div className="installment-highlight">
//                 <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                   <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//                 Available from PKR {plan?.monthly.toLocaleString()}/month - 0% markup
//               </div>
//             </div>

//             <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
//               {product.description}
//             </p>

//             {product.colors.length > 0 && (
//               <div>
//                 <div className="option-label">Color: <span style={{ color: '#64748b' }}>{product.colors[selectedColor].name}</span></div>
//                 <div className="color-options">
//                   {product.colors.map((c, i) => (
//                     <button 
//                       key={i} 
//                       className={`color-btn ${selectedColor === i ? 'active' : ''}`}
//                       style={{ background: c.hex }}
//                       onClick={() => setSelectedColor(i)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div>
//               <div className="option-label">Installment Plan</div>
//               <div className="plan-grid">
//                 {product.installmentPlans.map(p => (
//                   <div 
//                     key={p.months} 
//                     className={`plan-card ${selectedPlan === p.months ? 'active' : ''}`}
//                     onClick={() => setSelectedPlan(p.months)}
//                   >
//                     <div className="months">{p.months} Months</div>
//                     <div className="amount">PKR {p.monthly.toLocaleString()}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="action-buttons">
//               <div className="qty-selector">
//                 <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
//                 <div className="qty-value">{quantity}</div>
//                 <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
//               </div>
//               <button className="buy-btn" onClick={handleAddToCart}>
//                 {addedToCart ? '✓ Added to Cart' : 'Buy on Installment'}
//               </button>
//             </div>

//             <div style={{ display: 'flex', gap: 24 }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
//                 <span style={{ color: theme.primary }}>🛡️</span> {product.warranty}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748b' }}>
//                 <span style={{ color: theme.primary }}>🚚</span> {product.deliveryInfo}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="tabs-section">
//           <div className="tabs-header">
//             <button 
//               className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
//               onClick={() => setActiveTab('description')}
//             >
//               Description
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
//               onClick={() => setActiveTab('specifications')}
//             >
//               Specifications
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
//               onClick={() => setActiveTab('reviews')}
//             >
//               Reviews ({product.reviewCount})
//             </button>
//           </div>

//           <div className="tab-content">
//             {activeTab === 'description' && (
//               <div style={{ maxWidth: 800 }}>
//                 <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Product Overview</h3>
//                 <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>{product.description}</p>
//                 <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 0, listStyle: 'none' }}>
//                   {product.features.map((f, i) => (
//                     <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, color: '#334155' }}>
//                       <span style={{ color: theme.primary }}>✓</span> {f}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {activeTab === 'specifications' && (
//               <div className="spec-grid">
//                 {Object.entries(product.specifications).map(([key, val]) => (
//                   <div key={key} className="spec-item">
//                     <span className="spec-label">{key}</span>
//                     <span className="spec-value">{val}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === 'reviews' && (
//               <div>
//                 {product.reviews.length > 0 ? (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
//                     {product.reviews.map(r => (
//                       <div key={r.id} style={{ paddingBottom: 32, borderBottom: '1px solid #f1f5f9' }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                             <div style={{ width: 44, height: 44, borderRadius: '50%', background: theme.bg, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
//                               {r.initials}
//                             </div>
//                             <div>
//                               <div style={{ fontWeight: 700 }}>{r.name}</div>
//                               <div style={{ fontSize: 12, color: '#94a3b8' }}>{r.date}</div>
//                             </div>
//                           </div>
//                           <div style={{ display: 'flex', gap: 2 }}>
//                             {[1, 2, 3, 4, 5].map(s => (
//                               <span key={s} style={{ color: s <= r.rating ? '#f59e0b' : '#e2e8f0', fontSize: 14 }}>★</span>
//                             ))}
//                           </div>
//                         </div>
//                         <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>{r.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
//                     No reviews yet for this product.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </FlexiLayout>
//   )
// }



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

  const theme = CATEGORY_THEMES[product.categorySlug] || CATEGORY_THEMES.default
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
    <FlexiLayout categoryTheme={product.categorySlug}>
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
                  background: `linear-gradient(135deg, ${theme.bg}, #fff)`,
                }}>
                  <Image 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover', maxHeight: '100%' }}
                  />
                </div>
                <button style={{
                  position: 'absolute', bottom: 16, right: 16,
                  background: 'rgba(0,0,0,.7)', color: '#fff',
                  border: 'none', borderRadius: 10, padding: '10px 16px',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                  Zoom
                </button>
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} style={{
                    width: 80, height: 80, borderRadius: 12, overflow: 'hidden',
                    border: selectedImage === i ? `2.5px solid ${theme.primary}` : '1.5px solid #e5e7eb',
                    cursor: 'pointer', background: '#fff', padding: 0,
                  }}>
                    <Image src={img} alt="" width={80} height={80} style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>

              {/* Trust Badges */}
              <Card style={{ marginTop: 24, padding: 0, overflow: 'hidden' }}>
                {[
                  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: '100% Authentic', sub: 'Verified & KYC-protected' },
                  { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', title: 'Free Home Delivery', sub: '24-48 hrs, all major cities' },
                  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: '7-Day Easy Returns', sub: 'No questions asked' },
                  { icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', title: '0% Markup Installments', sub: '3, 6, 12 or 24 months' },
                ].map((badge, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                    borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none',
                  }}>
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

              {/* Reference & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Reference: <span style={{ color: '#374151' }}>{product.reference}</span></span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="16" height="16" fill={s <= Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <Link href="#reviews" style={{ fontSize: 13, color: theme.primary, textDecoration: 'none' }}>
                    Read reviews ({product.reviewCount})
                  </Link>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: '#111827' }}>
                    PKR {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span style={{ fontSize: 20, color: '#9ca3af', textDecoration: 'line-through' }}>
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                      <span style={{
                        background: '#dc2626', color: '#fff', padding: '4px 10px',
                        borderRadius: 6, fontSize: 12, fontWeight: 700,
                      }}>
                        -{product.discount}%
                      </span>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: theme.primary, fontSize: 14, fontWeight: 600 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Available from PKR {plan?.monthly.toLocaleString()}/month - 0% markup installment
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.7, marginBottom: 20 }}>
                {product.description}
              </p>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {product.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#374151' }}>
                    <span style={{ color: theme.primary, marginTop: 2 }}>-</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Color - <span style={{ color: '#111827' }}>{product.colors[selectedColor].name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {product.colors.map((c, i) => (
                      <button key={i} onClick={() => setSelectedColor(i)} style={{
                        width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
                        background: c.hex, border: selectedColor === i ? `3px solid ${theme.primary}` : '3px solid #e5e7eb',
                        boxShadow: selectedColor === i ? `0 0 0 2px #fff, 0 0 0 4px ${theme.primary}` : 'none',
                      }} title={c.name} />
                    ))}
                  </div>
                </div>
              )}

              {/* Variants */}
              {product.variants.map(v => (
                <div key={v.label} style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {v.label}
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {v.options.map(opt => (
                      <button key={opt} onClick={() => setSelectedVariants(p => ({...p, [v.label]: opt}))} style={{
                        padding: '10px 20px', borderRadius: 10, cursor: 'pointer',
                        background: selectedVariants[v.label] === opt ? '#fff' : '#fff',
                        border: selectedVariants[v.label] === opt ? `2px solid ${theme.primary}` : '1.5px solid #e5e7eb',
                        color: selectedVariants[v.label] === opt ? theme.primary : '#374151',
                        fontWeight: 600, fontSize: 14,
                      }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Installment Plans */}
              <Card style={{ background: theme.bg, border: `1.5px solid ${theme.primary}22`, padding: 24, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <svg width="20" height="20" fill="none" stroke={theme.primary} strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                  <span style={{ fontWeight: 700, fontSize: 16, color: theme.primary }}>Installment Plans</span>
                  <svg width="18" height="18" fill={theme.primary} viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                  {product.installmentPlans.map(p => (
                    <button key={p.months} onClick={() => setSelectedPlan(p.months)} style={{
                      padding: 16, borderRadius: 12, cursor: 'pointer',
                      background: selectedPlan === p.months ? '#fff' : 'transparent',
                      border: selectedPlan === p.months ? `2px solid ${theme.primary}` : '1.5px solid #e5e7eb',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>{p.months} Months</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: selectedPlan === p.months ? theme.primary : '#111827' }}>
                        PKR {p.monthly.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>per month</div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Quantity & Add to Cart */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e5e7eb', borderRadius: 12 }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                    width: 44, height: 44, border: 'none', background: 'transparent',
                    cursor: 'pointer', fontSize: 20, color: '#6b7280',
                  }}>-</button>
                  <span style={{ width: 44, textAlign: 'center', fontWeight: 700, fontSize: 16 }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{
                    width: 44, height: 44, border: 'none', background: 'transparent',
                    cursor: 'pointer', fontSize: 20, color: '#6b7280',
                  }}>+</button>
                </div>
                <button onClick={handleAddToCart} style={{
                  flex: 1, height: 52, borderRadius: 12, border: 'none',
                  background: theme.gradient, color: '#fff', fontSize: 16,
                  fontWeight: 700, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: `0 4px 20px ${theme.primary}44`,
                  transition: 'all .2s',
                }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                  {addedToCart ? 'Added to Cart!' : 'BUY ON INSTALLMENT'}
                </button>
              </div>

              {/* Vendor Link */}
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
                Verification form will be sent to <Link href="#" style={{ color: theme.primary, fontWeight: 600, textDecoration: 'none' }}>{product.vendor}</Link>
              </p>

              {/* Wishlist & Compare */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #e5e7eb' }}>
                <button onClick={() => setAddedToWishlist(!addedToWishlist)} style={{
                  display: 'flex', alignItems: 'center', gap: 6, background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: 14, color: '#6b7280',
                }}>
                  <svg width="18" height="18" fill={addedToWishlist ? '#dc2626' : 'none'} stroke={addedToWishlist ? '#dc2626' : 'currentColor'} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                  Add to wishlist
                </button>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6, background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: 14, color: '#6b7280',
                }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Add to compare
                </button>
              </div>

              {/* Share */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 14, color: '#6b7280' }}>Share:</span>
                {[
                  { bg: '#1877f2', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { bg: '#1da1f2', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                  { bg: '#ff4500', icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm5-10a3 3 0 11-6 0 3 3 0 016 0z' },
                ].map((s, i) => (
                  <a key={i} href="#" style={{
                    width: 36, height: 36, borderRadius: '50%', background: s.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d={s.icon}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <Card style={{ marginTop: 40, marginBottom: 40, padding: 0, overflow: 'hidden' }}>
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Payment & 100% Authentic Products', sub: 'Guaranteed by FlexiBerry' },
              { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', title: 'Free Home Delivery within 24-48 hours', sub: 'All major cities covered' },
              { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: '7-Day Easy Returns', sub: 'No questions asked' },
            ].map((badge, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px',
                borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: theme.bg, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" fill="none" stroke={theme.primary} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d={badge.icon}/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>{badge.title}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{badge.sub}</div>
                </div>
              </div>
            ))}
          </Card>

          {/* Tabs: Description, Details, Reviews */}
          <div id="reviews" style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', gap: 0 }}>
              {(['description', 'details', 'reviews'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '16px 32px', background: 'transparent', border: 'none',
                  cursor: 'pointer', fontSize: 15, fontWeight: 600,
                  color: activeTab === tab ? theme.primary : '#6b7280',
                  borderBottom: activeTab === tab ? `3px solid ${theme.primary}` : '3px solid transparent',
                  marginBottom: -2, textTransform: 'capitalize',
                }}>
                  {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab === 'details' ? 'Product Details' : 'Description'}
                </button>
              ))}
            </div>

            <div style={{ padding: '32px 0' }}>
              {activeTab === 'description' && (
                <div style={{ maxWidth: 800 }}>
                  <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, marginBottom: 24 }}>
                    {product.description}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {product.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: '#374151' }}>
                        <svg width="20" height="20" fill={theme.primary} viewBox="0 0 24 24" style={{ marginTop: 2, flexShrink: 0 }}>
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'details' && (
                <div style={{ maxWidth: 600 }}>
                  {Object.entries(product.specifications).map(([key, value], i) => (
                    <div key={key} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '14px 0', borderBottom: '1px solid #f3f4f6',
                    }}>
                      <span style={{ color: '#6b7280', fontSize: 14 }}>{key}</span>
                      <span style={{ color: '#111827', fontSize: 14, fontWeight: 600 }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
                  {/* Rating Summary */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 32 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 56, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{product.rating}</div>
                        <div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '8px 0' }}>
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} width="18" height="18" fill={s <= Math.floor(product.rating) ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <div style={{ fontSize: 13, color: '#6b7280' }}>{product.reviewCount} Reviews</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        {ratingDist.map(r => (
                          <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <span style={{ fontSize: 13, color: '#6b7280', width: 20 }}>{r.stars}*</span>
                            <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                              <div style={{ width: `${r.pct}%`, height: '100%', background: theme.primary, borderRadius: 4 }} />
                            </div>
                            <span style={{ fontSize: 12, color: '#9ca3af', width: 24 }}>{r.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      {product.reviews.map(review => (
                        <div key={review.id} style={{ paddingBottom: 24, borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div style={{
                              width: 44, height: 44, borderRadius: '50%',
                              background: theme.gradient, color: '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontWeight: 700, fontSize: 14,
                            }}>
                              {review.initials}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{review.name}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ display: 'flex', gap: 1 }}>
                                  {[1,2,3,4,5].map(s => (
                                    <svg key={s} width="12" height="12" fill={s <= review.rating ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 24 24">
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                  ))}
                                </div>
                                <span style={{ fontSize: 12, color: '#9ca3af' }}>{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.7 }}>{review.comment}</p>
                          <button style={{
                            marginTop: 10, background: 'none', border: 'none',
                            color: theme.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          }}>Reply</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Write Review Form */}
                  <Card style={{ padding: 28, height: 'fit-content' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Write a Review</h3>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Your rating:</label>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {[1,2,3,4,5].map(s => (
                          <button key={s} onClick={() => setReviewForm(p => ({...p, rating: s}))} style={{
                            background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                          }}>
                            <svg width="24" height="24" fill={s <= reviewForm.rating ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                      <input placeholder="Your Name" value={reviewForm.name}
                        onChange={e => setReviewForm(p => ({...p, name: e.target.value}))}
                        style={{
                          padding: '12px 16px', border: '1.5px solid #e5e7eb', borderRadius: 10,
                          fontSize: 14, outline: 'none',
                        }} />
                      <input placeholder="Your Email" type="email" value={reviewForm.email}
                        onChange={e => setReviewForm(p => ({...p, email: e.target.value}))}
                        style={{
                          padding: '12px 16px', border: '1.5px solid #e5e7eb', borderRadius: 10,
                          fontSize: 14, outline: 'none',
                        }} />
                    </div>
                    <textarea placeholder="Share your experience with this product..."
                      value={reviewForm.comment}
                      onChange={e => setReviewForm(p => ({...p, comment: e.target.value}))}
                      rows={4}
                      style={{
                        width: '100%', padding: '12px 16px', border: '1.5px solid #e5e7eb', borderRadius: 10,
                        fontSize: 14, outline: 'none', resize: 'none', marginBottom: 16,
                      }} />
                    <button style={{
                      width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                      background: theme.gradient, color: '#fff', fontSize: 15,
                      fontWeight: 700, cursor: 'pointer',
                    }}>SUBMIT REVIEW</button>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Recently Viewed */}
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <svg width="24" height="24" fill="none" stroke={theme.primary} strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>Recently Viewed</h2>
              <div style={{ width: 40, height: 3, background: theme.primary, borderRadius: 2 }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
              {RECENTLY_VIEWED.map(p => {
                const pTheme = CATEGORY_THEMES[p.categorySlug] || CATEGORY_THEMES.default
                return (
                  <Card key={p.id} style={{ overflow: 'hidden', cursor: 'pointer', transition: 'all .2s' }}>
                    <div style={{
                      aspectRatio: '1', background: `linear-gradient(135deg, ${pTheme.bg}, #fff)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      {p.badge && (
                        <span style={{
                          position: 'absolute', top: 10, left: 10,
                          background: p.badge === 'New' ? pTheme.primary : '#dc2626',
                          color: '#fff', padding: '4px 10px', borderRadius: 6,
                          fontSize: 11, fontWeight: 700,
                        }}>{p.badge}</span>
                      )}
                      <button style={{
                        position: 'absolute', top: 10, right: 10,
                        width: 32, height: 32, borderRadius: '50%',
                        background: '#fff', border: 'none', cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                        </svg>
                      </button>
                      <Image src={p.image} alt={p.name} width={150} height={150} style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: pTheme.primary, marginBottom: 4 }}>{p.brand}</div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 8, lineHeight: 1.4 }}>{p.name}</h3>
                      <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="12" height="12" fill={s <= Math.floor(p.rating) ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontWeight: 800, color: pTheme.primary }}>PKR {p.price.toLocaleString()}</span>
                        {p.originalPrice && (
                          <span style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'line-through' }}>
                            {p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button style={{
                          flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                          background: pTheme.gradient, color: '#fff', fontSize: 12,
                          fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                        }}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                          </svg>
                          Add to Cart
                        </button>
                        <button style={{
                          width: 40, height: 40, borderRadius: 8,
                          border: '1.5px solid #e5e7eb', background: '#fff',
                          cursor: 'pointer', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Zoom Modal */}
        {isZoomed && (
          <div onClick={() => setIsZoomed(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,.9)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
          }}>
            <button onClick={() => setIsZoomed(false)} style={{
              position: 'absolute', top: 20, right: 20,
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,.1)', border: 'none',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <Image 
              src={product.images[selectedImage]} 
              alt={product.name}
              width={800}
              height={800}
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </FlexiLayout>
  )
}

