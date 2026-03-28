
export interface ProductDetail {
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
  reviews: { id: string; name: string; initials: string; rating: number; date: string; comment: string; images?: string[] }[]
}

export const PRODUCTS_DATA: Record<string, ProductDetail> = {
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
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1505693419148-4071b56dc48b?w=800&q=80', 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'],
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
    images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80', 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80'],
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
  // Flash Sale Products
  'f1': {
    id: 'f1',
    name: 'iPhone 15 Pro Max 256GB',
    category: 'Electronics',
    categorySlug: 'smartphones',
    vendor: 'TechZone Official Store',
    vendorVerified: true,
    vendorLocation: 'Lahore',
    reference: 'IP15-PM-256',
    price: 549999,
    originalPrice: 599999,
    discount: 8,
    rating: 4.8,
    reviewCount: 234,
    images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80'],
    description: 'The latest iPhone 15 Pro Max with titanium design and A17 Pro chip.',
    features: ['Titanium design', 'A17 Pro chip', '48MP Main camera'],
    specifications: { 'Display': '6.7" Super Retina XDR', 'Chip': 'A17 Pro' },
    colors: [],
    variants: [],
    installmentPlans: [{ months: 12, monthly: 45834 }],
    inStock: true,
    stockCount: 10,
    warranty: '1 Year Apple Warranty',
    deliveryInfo: '24-48 hours delivery',
    reviews: []
  },
  'f2': {
    id: 'f2',
    name: 'MacBook Air M3 15"',
    category: 'Electronics',
    categorySlug: 'laptops',
    vendor: 'DigiWorld Electronics',
    vendorVerified: true,
    vendorLocation: 'Karachi',
    reference: 'MBA-M3-15',
    price: 429999,
    originalPrice: 459999,
    discount: 6,
    rating: 4.9,
    reviewCount: 156,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'],
    description: 'The new MacBook Air with M3 chip and 15-inch Liquid Retina display.',
    features: ['M3 chip', '15-inch display', '18 hours battery life'],
    specifications: { 'Chip': 'Apple M3', 'Display': '15.3" Liquid Retina' },
    colors: [],
    variants: [],
    installmentPlans: [{ months: 12, monthly: 35834 }],
    inStock: true,
    stockCount: 5,
    warranty: '1 Year Apple Warranty',
    deliveryInfo: '24-48 hours delivery',
    reviews: []
  },
  'f3': {
    id: 'f3',
    name: 'Honda CD 70 2026',
    category: 'Vehicles',
    categorySlug: 'bikes',
    vendor: 'SpeedRiders Pk',
    vendorVerified: true,
    vendorLocation: 'Faisalabad',
    reference: 'H-CD70-2026',
    price: 155000,
    originalPrice: 165000,
    discount: 6,
    rating: 4.5,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
    description: 'The most reliable bike in Pakistan, now in 2026 model.',
    features: ['Fuel efficient', 'Low maintenance', 'High resale value'],
    specifications: { 'Engine': '4-Stroke Single Cylinder', 'Displacement': '72cc' },
    colors: [],
    variants: [],
    installmentPlans: [{ months: 12, monthly: 12917 }],
    inStock: true,
    stockCount: 20,
    warranty: '6 Months Warranty',
    deliveryInfo: '3-5 days delivery',
    reviews: []
  }
}
