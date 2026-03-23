'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout';
import { 
  Star, Heart, Share2, ShieldCheck, Truck, 
  RotateCcw, CreditCard, ChevronRight, Info,
  CheckCircle2, ShoppingCart, Zap
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────── */
const categories = [
  { id: 'smartphones', name: 'Smartphones', e: '📱', bg: '#fff0f0', bd: '#fecdd3', theme: '#ef4444' },
  { id: 'laptops',     name: 'Laptops',     e: '💻', bg: '#f5f3ff', bd: '#ddd6fe', theme: '#8b5cf6' },
  { id: 'bikes',       name: 'Bikes',       e: '🏍️', bg: '#fff7ed', bd: '#fed7aa', theme: '#f97316' },
  { id: 'appliances',  name: 'Appliances',  e: '🌀', bg: '#eff6ff', bd: '#bfdbfe', theme: '#3b82f6' },
  { id: 'solar',       name: 'Solar',       e: '☀️', bg: '#fefce8', bd: '#fef08a', theme: '#eab308' },
  { id: 'furniture',   name: 'Furniture',   e: '🛋️', bg: '#f0fdfa', bd: '#99f6e4', theme: '#14b8a6' },
  { id: 'jahez',       name: 'Jahez',       e: '📦', bg: '#fdf2f8', bd: '#f9a8d4', theme: '#ec4899' },
  { id: 'cars',        name: 'Cars',        e: '🚗', bg: '#ecfeff', bd: '#a5f3fc', theme: '#06b6d4' },
  { id: 'business',    name: 'Business',    e: '🏭', bg: '#f0fdf4', bd: '#bbf7d0', theme: '#22c55e' },
  { id: 'general',     name: 'General',     e: '🛒', bg: '#fffbeb', bd: '#fde68a', theme: '#f59e0b' },
];

const mockProductDetails = {
  '1': {
    id: '1',
    name: 'Samsung 55" Smart TV',
    categoryId: 'appliances',
    seller: 'ElectroHub Official',
    price: 45000,
    originalPrice: 50000,
    downPayment: 9000,
    rating: 4.8,
    reviewCount: 324,
    image: '📺',
    description: 'Experience stunning 4K picture quality with HDR support. Smart TV with built-in streaming apps, voice control, and seamless connectivity for all your devices.',
    specifications: [
      { label: 'Screen Size', value: '55 inches' },
      { label: 'Resolution', value: '4K UHD (3840 x 2160)' },
      { label: 'HDR Support', value: 'Yes, HDR10+' },
      { label: 'Smart Features', value: 'Tizen OS, Built-in Apps' },
      { label: 'Warranty', value: '2 Years Official' },
    ],
    installmentOptions: [
      { months: 6, monthly: 6000, total: 45000 },
      { months: 12, monthly: 3750, total: 45000 },
    ],
    inStock: true,
  },
  '2': {
    id: '2',
    name: 'Honda City 2023',
    categoryId: 'cars',
    seller: 'Auto Motors Pk',
    price: 3500000,
    originalPrice: 3800000,
    downPayment: 700000,
    rating: 4.9,
    reviewCount: 156,
    image: '🚗',
    description: 'Brand new Honda City 2023 model. Fuel efficient, reliable, and perfect for family use. Features advanced safety systems and premium interior comfort.',
    specifications: [
      { label: 'Engine', value: '1.5L i-VTEC Petrol' },
      { label: 'Transmission', value: 'CVT Automatic' },
      { label: 'Fuel Efficiency', value: '16-18 km/l' },
      { label: 'Seating', value: '5 passengers' },
      { label: 'Warranty', value: '5 Years / 100,000 km' },
    ],
    installmentOptions: [
      { months: 12, monthly: 233333, total: 3500000 },
      { months: 24, monthly: 116667, total: 3500000 },
    ],
    inStock: true,
  },
  '7': {
    id: '7',
    name: 'iPhone 15 Pro Max 256GB',
    categoryId: 'smartphones',
    seller: 'TechZone Official',
    price: 320000,
    originalPrice: 350000,
    downPayment: 64000,
    rating: 4.9,
    reviewCount: 543,
    image: '📱',
    description: 'The ultimate iPhone. Titanium design, A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.',
    specifications: [
      { label: 'Display', value: '6.7-inch Super Retina XDR' },
      { label: 'Chip', value: 'A17 Pro chip' },
      { label: 'Camera', value: '48MP Main | Ultra Wide | Telephoto' },
      { label: 'Storage', value: '256GB' },
      { label: 'Connector', value: 'USB-C (USB 3)' },
    ],
    installmentOptions: [
      { months: 6, monthly: 42667, total: 320000 },
      { months: 12, monthly: 21333, total: 320000 },
    ],
    inStock: true,
  }
};

/* ─── Components ─────────────────────────────────────── */
const StatBox = ({ icon: Icon, label, value, color }: any) => (
  <div style={{
    background: "white", padding: "16px", borderRadius: "16px",
    border: "1.5px solid rgba(0,0,0,0.04)", flex: 1, minWidth: "140px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
      <div style={{
        height: "28px", width: "28px", borderRadius: "8px",
        background: `${color}10`, color: color,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={14} strokeWidth={2.5} />
      </div>
      <span style={{ fontSize: "11px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
    </div>
    <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a" }}>{value}</div>
  </div>
);

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = mockProductDetails[productId as keyof typeof mockProductDetails] || mockProductDetails['1'];
  
  const [quantity, setQuantity] = useState(1);
  const [selectedInstallment, setSelectedInstallment] = useState(product.installmentOptions[1]?.months || 12);
  const [wish, setWish] = useState(false);
  const [added, setAdded] = useState(false);

  const cat = useMemo(() => categories.find(c => c.id === product.categoryId) || categories[0], [product.categoryId]);
  const selectedPlan = useMemo(() => product.installmentOptions.find(opt => opt.months === selectedInstallment), [selectedInstallment, product.installmentOptions]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <FlexiLayout>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .product-main-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
        }
        @media (max-width: 992px) {
          .product-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ background: "#f8faff", minHeight: "100vh", paddingBottom: "80px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        
        {/* Breadcrumb */}
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: "#94a3b8" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: "#64748b", textDecoration: "none" }}>Products</Link>
            <ChevronRight size={14} />
            <Link href={`/products?category=${cat.id}`} style={{ color: cat.theme, textDecoration: "none" }}>{cat.name}</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#0f172a", fontWeight: 800 }}>{product.name}</span>
          </div>
        </div>

        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 16px" }}>
          <div className="product-main-grid">
            
            {/* Left Column: Visuals */}
            <div style={{ animation: "slideUp 0.6s ease both" }}>
              <div style={{
                background: "white", borderRadius: "32px", padding: "40px",
                border: "1.5px solid rgba(0,0,0,0.04)", boxShadow: "0 10px 40px rgba(0,0,0,0.02)",
                position: "relative", marginBottom: "24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                minHeight: "500px", background: `linear-gradient(135deg, white 0%, ${cat.bg} 100%)`,
              }}>
                <span style={{ fontSize: "200px", userSelect: "none" }}>{product.image}</span>
                
                {/* Floating Actions */}
                <div style={{ position: "absolute", top: "24px", right: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button onClick={() => setWish(!wish)} style={{
                    height: "44px", width: "44px", borderRadius: "14px", background: "white",
                    border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                  }}>
                    <Heart size={20} fill={wish ? "#ef4444" : "none"} color={wish ? "#ef4444" : "#94a3b8"} strokeWidth={2.5} />
                  </button>
                  <button style={{
                    height: "44px", width: "44px", borderRadius: "14px", background: "white",
                    border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Share2 size={20} color="#94a3b8" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Badge */}
                <div style={{
                  position: "absolute", top: "24px", left: "24px",
                  padding: "8px 16px", borderRadius: "12px", background: "white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <div style={{ height: "8px", width: "8px", borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a" }}>In Stock & Ready to Ship</span>
                </div>
              </div>

              {/* Stats Row */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <StatBox icon={ShieldCheck} label="Warranty" value="2 Years Official" color="#2563eb" />
                <StatBox icon={Truck} label="Delivery" value="Free Nationwide" color="#059669" />
                <StatBox icon={RotateCcw} label="Returns" value="7 Days Easy" color="#7c3aed" />
              </div>
            </div>

            {/* Right Column: Details */}
            <div style={{ animation: "slideUp 0.6s 0.1s ease both" }}>
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: "8px", background: `${cat.theme}15`,
                    color: cat.theme, fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em"
                  }}>{cat.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>{product.rating}</span>
                    <span style={{ fontSize: "14px", color: "#94a3b8" }}>({product.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <h1 style={{ fontSize: "36px", fontWeight: 900, color: "#0f172a", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                  {product.name}
                </h1>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#64748b", margin: "0 0 20px" }}>
                  Sold by <span style={{ color: "#2563eb", cursor: "pointer" }}>{product.seller}</span>
                </p>
                <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  {product.description}
                </p>
              </div>

              {/* Pricing Card */}
              <div style={{
                background: "white", borderRadius: "24px", padding: "24px",
                border: "1.5px solid rgba(0,0,0,0.04)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                marginBottom: "24px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Full Price</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontSize: "32px", fontWeight: 900, color: "#0f172a" }}>₨{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span style={{ fontSize: "16px", color: "#94a3b8", textDecoration: "line-through" }}>₨{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Down Payment</span>
                    <span style={{ fontSize: "20px", fontWeight: 900, color: "#059669" }}>₨{product.downPayment.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#f1f5f9", margin: "0 0 20px" }} />

                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <CreditCard size={16} color="#2563eb" />
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>Flexible Installment Plans</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {product.installmentOptions.map(opt => (
                      <button
                        key={opt.months}
                        onClick={() => setSelectedInstallment(opt.months)}
                        style={{
                          padding: "16px", borderRadius: "16px", cursor: "pointer",
                          border: `2.5px solid ${selectedInstallment === opt.months ? "#2563eb" : "#f1f5f9"}`,
                          background: selectedInstallment === opt.months ? "rgba(37,99,235,0.03)" : "white",
                          textAlign: "left", transition: "all 0.2s",
                        }}
                      >
                        <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", marginBottom: "4px" }}>{opt.months} Months</div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#2563eb" }}>₨{opt.monthly.toLocaleString()}/mo</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{
                    display: "flex", alignItems: "center", background: "#f8fafc",
                    borderRadius: "14px", padding: "4px", border: "1.5px solid #f1f5f9",
                  }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: "36px", height: "36px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", fontWeight: 700, color: "#64748b" }}>−</button>
                    <span style={{ width: "30px", textAlign: "center", fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: "36px", height: "36px", border: "none", background: "none", cursor: "pointer", fontSize: "18px", fontWeight: 700, color: "#64748b" }}>+</button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    style={{
                      flex: 1, height: "52px", borderRadius: "14px", border: "none",
                      background: added ? "#059669" : "linear-gradient(135deg, #2563eb, #7c3aed)",
                      color: "white", fontSize: "15px", fontWeight: 800, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      boxShadow: "0 8px 20px rgba(37,99,235,0.25)", transition: "all 0.3s",
                    }}
                  >
                    {added ? <CheckCircle2 size={20} /> : <ShoppingCart size={20} />}
                    {added ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>

              {/* Specifications */}
              <div style={{
                background: "white", borderRadius: "24px", padding: "24px",
                border: "1.5px solid rgba(0,0,0,0.04)",
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Specifications</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {product.specifications.map((spec, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                      <span style={{ fontWeight: 700, color: "#94a3b8" }}>{spec.label}</span>
                      <span style={{ fontWeight: 800, color: "#0f172a" }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </FlexiLayout>
  );
}
