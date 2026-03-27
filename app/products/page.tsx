'use client'

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import FlexiLayout from "@/components/layout/FlexiLayout/FlexiLayout";
import {
  Search, SlidersHorizontal, X, Grid3X3, List,
  ChevronDown, Sparkles, Package, Star, TrendingUp, Zap,
  Heart, ShoppingCart, ArrowRight
} from "lucide-react";

/* ─── Types & Constants ──────────────────────────────── */
type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "reviews" | "discount";

interface Filters {
  search: string;
  category: string;
  sortBy: SortOption;
  priceMin: number;
  priceMax: number;
  minRating: number;
  installmentOnly: boolean;
  inStockOnly: boolean;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  category: "all",
  sortBy: "featured",
  priceMin: 0,
  priceMax: 2000000,
  minRating: 0,
  installmentOnly: false,
  inStockOnly: false,
};

const SORT_LABELS: Record<SortOption, string> = {
  featured:     "Featured",
  "price-asc":  "Price: Low → High",
  "price-desc": "Price: High → Low",
  rating:       "Top Rated",
  reviews:      "Most Reviewed",
  discount:     "Biggest Discount",
};

const PRICE_PRESETS = [
  { label: "Under 50K",   min: 0,       max: 50000   },
  { label: "50K–200K",    min: 50000,   max: 200000  },
  { label: "200K–500K",   min: 200000,  max: 500000  },
  { label: "500K–1M",     min: 500000,  max: 1000000 },
  { label: "Above 1M",    min: 1000000, max: 2000000 },
];

const formatPKR = (n: number) =>
  n >= 1000000 ? `PKR ${(n / 1000000).toFixed(1)}M`
  : n >= 1000  ? `PKR ${(n / 1000).toFixed(0)}K`
  : `PKR ${n}`;

/* ─── Data ───────────────────────────────────────────── */
const categories = [
  { id: 'smartphones', name: 'Smartphones', e: '📱', bg: '#fff0f0', bd: '#fecdd3' },
  { id: 'laptops',     name: 'Laptops',     e: '💻', bg: '#f5f3ff', bd: '#ddd6fe' },
  { id: 'bikes',       name: 'Bikes',       e: '🏍️', bg: '#fff7ed', bd: '#fed7aa' },
  { id: 'appliances',  name: 'Appliances',  e: '🌀', bg: '#eff6ff', bd: '#bfdbfe' },
  { id: 'solar',       name: 'Solar',       e: '☀️', bg: '#fefce8', bd: '#fef08a' },
  { id: 'furniture',   name: 'Furniture',   e: '🛋️', bg: '#f0fdfa', bd: '#99f6e4' },
  { id: 'jahez',       name: 'Jahez',       e: '📦', bg: '#fdf2f8', bd: '#f9a8d4' },
  { id: 'cars',        name: 'Cars',        e: '🚗', bg: '#ecfeff', bd: '#a5f3fc' },
  { id: 'business',    name: 'Business',    e: '🏭', bg: '#f0fdf4', bd: '#bbf7d0' },
  { id: 'general',     name: 'General',     e: '🛒', bg: '#fffbeb', bd: '#fde68a' },
];

const featuredProducts = [
  { id: '1', name: 'Samsung 55" Smart TV', categoryId: 'appliances', price: 45000, originalPrice: 50000, downPayment: 9000, installment: 3750, rating: 4.8, reviews: 324, image: '📺', badge: 'Best Seller', inStock: true },
  { id: '2', name: 'Honda City 2023', categoryId: 'cars', price: 3500000, originalPrice: 3800000, downPayment: 700000, installment: 233333, rating: 4.9, reviews: 156, image: '🚗', badge: 'Popular', inStock: true },
  { id: '3', name: 'Complete Bedroom Set', categoryId: 'furniture', price: 85000, originalPrice: 95000, downPayment: 17000, installment: 7083, rating: 4.6, reviews: 89, image: '🛏️', badge: '', inStock: true },
  { id: '4', name: 'Solar Panel System 5kW', categoryId: 'solar', price: 450000, originalPrice: 500000, downPayment: 90000, installment: 37500, rating: 4.7, reviews: 212, image: '⚡', badge: 'Hot Deal', inStock: true },
  { id: '5', name: 'Office Furniture Bundle', categoryId: 'business', price: 125000, originalPrice: 140000, downPayment: 25000, installment: 10417, rating: 4.5, reviews: 67, image: '🖥️', badge: '', inStock: true },
  { id: '6', name: 'High-End Washing Machine', categoryId: 'appliances', price: 95000, originalPrice: 110000, downPayment: 19000, installment: 7917, rating: 4.8, reviews: 178, image: '🧺', badge: 'New', inStock: true },
  { id: '7', name: 'iPhone 15 Pro Max 256GB', categoryId: 'smartphones', price: 320000, originalPrice: 350000, downPayment: 64000, installment: 26667, rating: 4.9, reviews: 543, image: '📱', badge: 'Premium', inStock: true },
  { id: '8', name: 'Split AC 1.5 Ton Inverter', categoryId: 'appliances', price: 75000, originalPrice: 85000, downPayment: 15000, installment: 6250, rating: 4.7, reviews: 291, image: '❄️', badge: '', inStock: false },
  { id: '9', name: 'Suzuki Cultus 2024', categoryId: 'cars', price: 2800000, originalPrice: 3000000, downPayment: 560000, installment: 186667, rating: 4.6, reviews: 98, image: '🚙', badge: '', inStock: true },
  { id: '10', name: 'L-Shaped Office Sofa', categoryId: 'furniture', price: 65000, originalPrice: 75000, downPayment: 13000, installment: 5417, rating: 4.4, reviews: 44, image: '🛋️', badge: '', inStock: true },
  { id: '11', name: '10kW Solar System Complete', categoryId: 'solar', price: 850000, originalPrice: 950000, downPayment: 170000, installment: 70833, rating: 4.8, reviews: 132, image: '☀️', badge: 'Eco Choice', inStock: true },
  { id: '12', name: 'POS & Billing System', categoryId: 'business', price: 45000, originalPrice: 55000, downPayment: 9000, installment: 3750, rating: 4.6, reviews: 55, image: '💻', badge: '', inStock: true },
];

/* ─── Components ─────────────────────────────────────── */
const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "4px 10px", borderRadius: "99px",
    background: "rgba(37,99,235,0.08)",
    border: "1.5px solid rgba(37,99,235,0.18)",
    fontSize: "11px", fontWeight: 700, color: "#2563eb",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }}>
    {label}
    <button onClick={onRemove} style={{
      background: "none", border: "none", cursor: "pointer",
      color: "#94a3b8", padding: 0, display: "flex", alignItems: "center",
    }}>
      <X size={11} strokeWidth={2.5} />
    </button>
  </span>
);

const Section = ({
  title, open, toggle, children,
}: {
  title: string; open: boolean; toggle: () => void; children: React.ReactNode;
}) => (
  <div style={{ borderBottom: "1px solid rgba(37,99,235,0.07)", paddingBottom: "14px", marginBottom: "14px" }}>
    <button onClick={toggle} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      width: "100%", background: "none", border: "none", cursor: "pointer",
      padding: "0 0 10px", fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {title}
      </span>
      <ChevronDown size={14} color="#94a3b8"
        style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
    </button>
    {open && children}
  </div>
);

const FilterSidebar = ({
  filters, onChange, onReset, activeCount,
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onReset: () => void;
  activeCount: number;
}) => {
  const [sortOpen,    setSortOpen]    = useState(true);
  const [catOpen,     setCatOpen]     = useState(true);
  const [priceOpen,   setPriceOpen]   = useState(true);
  const [ratingOpen,  setRatingOpen]  = useState(true);
  const [extrasOpen,  setExtrasOpen]  = useState(true);

  return (
    <aside style={{
      width: "240px", flexShrink: 0,
      background: "white",
      borderRadius: "18px",
      border: "1.5px solid rgba(37,99,235,0.10)",
      boxShadow: "0 4px 24px rgba(37,99,235,0.07)",
      padding: "18px",
      alignSelf: "flex-start",
      position: "sticky",
      top: "90px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            height: "28px", width: "28px", borderRadius: "8px",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SlidersHorizontal size={13} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>Filters</span>
          {activeCount > 0 && (
            <span style={{
              height: "18px", minWidth: "18px", borderRadius: "99px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              fontSize: "10px", fontWeight: 800, color: "white",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px",
            }}>{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset} style={{
            fontSize: "11px", fontWeight: 700, color: "#ef4444",
            background: "rgba(239,68,68,0.07)", border: "none", cursor: "pointer",
            padding: "3px 9px", borderRadius: "7px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Reset</button>
        )}
      </div>

      <Section title="Sort By" open={sortOpen} toggle={() => setSortOpen(!sortOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([val, label]) => (
            <button key={val} onClick={() => onChange({ sortBy: val })} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "7px 10px", borderRadius: "9px", border: "none",
              cursor: "pointer", textAlign: "left", width: "100%",
              background: filters.sortBy === val ? "rgba(37,99,235,0.08)" : "transparent",
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.15s",
            }}>
              <div style={{
                height: "14px", width: "14px", borderRadius: "50%",
                border: `2px solid ${filters.sortBy === val ? "#2563eb" : "#cbd5e1"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {filters.sortBy === val && (
                  <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#2563eb" }} />
                )}
              </div>
              <span style={{ fontSize: "12px", fontWeight: filters.sortBy === val ? 700 : 500, color: filters.sortBy === val ? "#2563eb" : "#475569" }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Category" open={catOpen} toggle={() => setCatOpen(!catOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {[{ id: "all", name: "All Categories" }, ...categories].map(cat => {
            const active = filters.category === cat.id;
            const count = cat.id === "all"
              ? featuredProducts.length
              : featuredProducts.filter(p => p.categoryId === cat.id).length;
            return (
              <button key={cat.id} onClick={() => onChange({ category: cat.id })} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "7px 10px", borderRadius: "9px", border: "none",
                cursor: "pointer", background: active ? "rgba(37,99,235,0.08)" : "transparent",
                fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    height: "14px", width: "14px", borderRadius: "50%",
                    border: `2px solid ${active ? "#2563eb" : "#cbd5e1"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {active && <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#2563eb" }} />}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: active ? 700 : 500, color: active ? "#2563eb" : "#475569" }}>
                    {cat.name}
                  </span>
                </div>
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "1px 6px", borderRadius: "99px",
                  background: active ? "rgba(37,99,235,0.15)" : "rgba(0,0,0,0.05)",
                  color: active ? "#2563eb" : "#94a3b8",
                }}>{count}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Price Range" open={priceOpen} toggle={() => setPriceOpen(!priceOpen)}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {PRICE_PRESETS.map(p => {
            const active = filters.priceMin === p.min && filters.priceMax === p.max;
            return (
              <button key={p.label} onClick={() => onChange({ priceMin: p.min, priceMax: p.max })} style={{
                padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                border: `1.5px solid ${active ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
                background: active ? "rgba(37,99,235,0.08)" : "transparent",
                color: active ? "#2563eb" : "#64748b",
                cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.15s",
              }}>{p.label}</button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {([["Min", "priceMin", filters.priceMin], ["Max", "priceMax", filters.priceMax]] as const).map(([label, key, val]) => (
            <div key={key}>
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", display: "block", marginBottom: "4px" }}>{label}</span>
              <input
                type="number"
                value={val}
                onChange={e => onChange({ [key]: Number(e.target.value) })}
                style={{
                  width: "100%", padding: "8px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
                  fontSize: "12px", fontWeight: 600, outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Rating" open={ratingOpen} toggle={() => setRatingOpen(!ratingOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[4, 3, 2].map(star => (
            <button key={star} onClick={() => onChange({ minRating: star })} style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px",
              borderRadius: "9px", border: "none", cursor: "pointer", background: filters.minRating === star ? "rgba(37,99,235,0.08)" : "transparent",
              fontFamily: "inherit",
            }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={11} fill={i <= star ? "#f59e0b" : "none"} color={i <= star ? "#f59e0b" : "#cbd5e1"} />
                ))}
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: filters.minRating === star ? "#2563eb" : "#64748b" }}>& Up</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Extras" open={extrasOpen} toggle={() => setExtrasOpen(!extrasOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {([["installmentOnly", "Installment Plans"], ["inStockOnly", "In Stock Only"]] as const).map(([key, label]) => (
            <label key={key} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div style={{ position: "relative", height: "18px", width: "18px" }}>
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={e => onChange({ [key]: e.target.checked })}
                  style={{ opacity: 0, position: "absolute", inset: 0, cursor: "pointer" }}
                />
                <div style={{
                  height: "100%", width: "100%", borderRadius: "5px",
                  border: `1.5px solid ${filters[key] ? "#2563eb" : "#cbd5e1"}`,
                  background: filters[key] ? "#2563eb" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
                }}>
                  {filters[key] && <X size={12} color="white" strokeWidth={3} />}
                </div>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>{label}</span>
            </label>
          ))}
        </div>
      </Section>
    </aside>
  );
};

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const [wish, setWish] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const cat = categories.find(c => c.id === product.categoryId) || categories[0];

  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "white", borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          padding: "0", position: "relative",
          transition: "all 0.3s ease",
          animation: "cardIn 0.5s ease forwards",
          animationDelay: `${Math.min(index * 50, 400)}ms`,
          opacity: 0, height: "100%", display: "flex", flexDirection: "column",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          overflow: "hidden",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-6px)";
          el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "none";
          el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        }}
      >
        {/* Badges */}
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {discount > 0 && (
            <div style={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              color: "white", fontSize: 11, fontWeight: 800,
              padding: "3px 10px", borderRadius: 99,
              display: "flex", alignItems: "center", gap: 4,
              boxShadow: "0 3px 10px rgba(239,68,68,0.45)",
            }}>
              📉 -{discount}% OFF
            </div>
          )}
          {product.badge && (
            <div style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              color: "white", fontSize: 10, fontWeight: 700,
              padding: "2px 8px", borderRadius: 99,
              display: "flex", alignItems: "center", gap: 3,
            }}>
              ⭐ {product.badge.toUpperCase()}
            </div>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setWish(!wish); }}
          style={{
            position: "absolute", top: 12, right: 12,
            zIndex: 10,
            height: 32, width: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.9)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease",
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1.1)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1)";
          }}
        >
          <Heart size={16} fill={wish ? "#ef4444" : "none"} color={wish ? "#ef4444" : "#9ca3af"} />
        </button>

        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "1", background: "linear-gradient(to bottom right, #f9fafb, #f3f4f6)", overflow: "hidden" }}>
          <span style={{ fontSize: "64px", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>{product.image}</span>
          <div style={{ position: "absolute", inset: 0, bottom: 0, height: 64, background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)" }} />
        </div>

        {/* Content */}
        <div style={{ padding: 16 }}>
          {/* Category */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {cat.name}
            </span>
          </div>

          <h3 style={{ fontWeight: 600, color: "#1f2937", fontSize: 14, lineHeight: 1.4, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", cursor: "pointer" }}>
            {product.name}
          </h3>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {[...Array(5)].map((_, j) => (
                <Star key={j} style={{ width: 12, height: 12, fill: j < Math.floor(product.rating) ? "#fbbf24" : "#e5e7eb", color: j < Math.floor(product.rating) ? "#fbbf24" : "#e5e7eb" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: cat.id === "smartphones" ? "#ef4444" : cat.id === "laptops" ? "#2563eb" : cat.id === "bikes" ? "#f97316" : cat.id === "appliances" ? "#0369a1" : cat.id === "solar" ? "#ea580c" : cat.id === "furniture" ? "#92400e" : cat.id === "jahez" ? "#be185d" : cat.id === "cars" ? "#0c4a6e" : cat.id === "business" ? "#059669" : "#1f2937", fontFamily: "'Space Grotesk', sans-serif" }}>
                ₨{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: 12, color: "#d1d5db", textDecoration: "line-through", fontWeight: 500 }}>
                  ₨{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>
                💳 ₨{product.installment.toLocaleString()}/mo · 12-month plan
              </span>
            </div>
          </div>

          {!product.inStock && (
            <div style={{
              padding: "6px 10px", background: "#475569", color: "white",
              borderRadius: "6px", fontSize: "10px", fontWeight: 800,
              textAlign: "center", marginTop: 8,
            }}>OUT OF STOCK</div>
          )}
        </div>
      </div>
    </Link>
  );
};

/* ─── Main Page ──────────────────────────────────────── */
export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilter = (f: Partial<Filters>) => setFilters(prev => ({ ...prev, ...f }));
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return featuredProducts
      .filter(p => {
        if (filters.category !== "all" && p.categoryId !== filters.category) return false;
        if (filters.search.trim() && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
        if (p.rating < filters.minRating) return false;
        if (filters.inStockOnly && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating") return b.rating - a.rating;
        if (filters.sortBy === "reviews") return b.reviews - a.reviews;
        if (filters.sortBy === "discount") {
          const da = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const db = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return db - da;
        }
        return 0;
      });
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.search.trim()) count++;
    if (filters.sortBy !== "featured") count++;
    if (filters.priceMin !== 0 || filters.priceMax !== 2000000) count++;
    if (filters.minRating > 0) count++;
    if (filters.installmentOnly) count++;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters]);

  return (
    <FlexiLayout>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* ── HERO / HEADER ── */}
      <section style={{
        background: "linear-gradient(160deg, #f8faff 0%, #f3f0ff 60%, #f0fff8 100%)",
        padding: "60px 16px 80px", position: "relative", overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "rgba(37,99,235,0.04)", borderRadius: "50%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "300px", height: "300px", background: "rgba(124,58,237,0.04)", borderRadius: "50%", filter: "blur(60px)" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", animation: "fadeIn 0.6s ease" }}>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #2563eb, transparent)" }} />
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              FlexiBerry Marketplace
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "40px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h1 style={{
                fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#0f172a",
                margin: "0 0 16px", letterSpacing: "-0.04em", lineHeight: 1.1,
                animation: "cardIn 0.6s ease both",
              }}>
                Browse Our <span style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Collection</span>
              </h1>
              <p style={{
                fontSize: "16px", color: "#64748b", maxWidth: "500px", lineHeight: 1.6,
                margin: 0, animation: "cardIn 0.6s 0.1s ease both",
              }}>
                Discover premium products with flexible payment plans. Shop today and pay in easy monthly installments.
              </p>
            </div>

            <div style={{
              background: "white", padding: "8px", borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1.5px solid white",
              display: "flex", alignItems: "center", gap: "8px", width: "100%", maxWidth: "400px",
              animation: "cardIn 0.6s 0.2s ease both",
            }}>
              <div style={{ padding: "0 12px", color: "#94a3b8" }}><Search size={18} /></div>
              <input
                type="text"
                placeholder="Search for products..."
                value={filters.search}
                onChange={e => updateFilter({ search: e.target.value })}
                style={{
                  flex: 1, border: "none", outline: "none", fontSize: "14px",
                  fontWeight: 600, padding: "10px 0", fontFamily: "inherit",
                }}
              />
              {filters.search && (
                <button onClick={() => updateFilter({ search: "" })} style={{
                  background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "8px",
                }}><X size={16} /></button>
              )}
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div style={{
          position: "absolute", bottom: -1, left: 0, right: 0, height: "40px",
          background: "#f4f5fb",
          borderRadius: "60% 60% 0 0 / 100% 100% 0 0",
        }} />
      </section>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 16px 60px", background: "#f4f5fb" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

          {/* ── SIDEBAR (desktop) ── */}
          <div className="hidden md:block">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onReset={resetFilters}
              activeCount={activeFilterCount}
            />
          </div>

          {/* ── CONTENT ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Toolbar row */}
            <div style={{
              background: "white", borderRadius: "16px",
              border: "1.5px solid rgba(37,99,235,0.08)",
              boxShadow: "0 2px 12px rgba(37,99,235,0.06)",
              padding: "10px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "10px", marginBottom: "16px", flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {/* Mobile filter btn */}
                <button
                  className="md:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "6px 12px", borderRadius: "10px", cursor: "pointer",
                    border: `1.5px solid ${activeFilterCount > 0 ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
                    background: activeFilterCount > 0 ? "rgba(37,99,235,0.07)" : "transparent",
                    color: activeFilterCount > 0 ? "#2563eb" : "#374151",
                    fontSize: "12px", fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                  <SlidersHorizontal size={13} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span style={{
                      height: "16px", minWidth: "16px", borderRadius: "99px",
                      background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                      fontSize: "9px", fontWeight: 800, color: "white",
                      display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
                    }}>{activeFilterCount}</span>
                  )}
                </button>

                <p style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", margin: 0 }}>
                  <span style={{ fontWeight: 800, color: "#0f172a" }}>{filtered.length}</span>
                  {" "}product{filtered.length !== 1 ? "s" : ""}
                  {filters.category !== "all" && ` in ${categories.find(c => c.id === filters.category)?.name}`}
                </p>
              </div>

              {/* View toggle */}
              <div style={{
                display: "flex", borderRadius: "10px",
                border: "1.5px solid rgba(37,99,235,0.12)", overflow: "hidden",
              }}>
                {([["grid", Grid3X3], ["list", List]] as const).map(([mode, Icon]) => (
                  <button key={mode} onClick={() => setView(mode)} style={{
                    height: "32px", width: "32px", border: "none",
                    background: view === mode ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "transparent",
                    color: view === mode ? "white" : "#94a3b8",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}>
                    <Icon size={13} strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile filter panel */}
            {mobileFiltersOpen && (
              <div className="md:hidden" style={{ marginBottom: "14px" }}>
                <FilterSidebar
                  filters={filters}
                  onChange={updateFilter}
                  onReset={resetFilters}
                  activeCount={activeFilterCount}
                />
              </div>
            )}

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                {filters.search.trim() && (
                  <Chip label={`"${filters.search}"`} onRemove={() => updateFilter({ search: "" })} />
                )}
                {filters.category !== "all" && (
                  <Chip label={categories.find(c => c.id === filters.category)?.name ?? filters.category} onRemove={() => updateFilter({ category: "all" })} />
                )}
                {filters.sortBy !== "featured" && (
                  <Chip label={SORT_LABELS[filters.sortBy]} onRemove={() => updateFilter({ sortBy: "featured" })} />
                )}
                {(filters.priceMin !== 0 || filters.priceMax !== 2000000) && (
                  <Chip label={`${formatPKR(filters.priceMin)} – ${formatPKR(filters.priceMax)}`} onRemove={() => updateFilter({ priceMin: 0, priceMax: 2000000 })} />
                )}
                {filters.minRating > 0 && (
                  <Chip label={`${filters.minRating}★+`} onRemove={() => updateFilter({ minRating: 0 })} />
                )}
                {filters.installmentOnly && (
                  <Chip label="Installments Only" onRemove={() => updateFilter({ installmentOnly: false })} />
                )}
                {filters.inStockOnly && (
                  <Chip label="In Stock Only" onRemove={() => updateFilter({ inStockOnly: false })} />
                )}
                <button onClick={resetFilters} style={{
                  padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                  color: "#ef4444", background: "rgba(239,68,68,0.07)",
                  border: "1.5px solid rgba(239,68,68,0.15)", cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>Clear all</button>
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "80px 24px",
                background: "white", borderRadius: "24px",
                border: "1.5px solid rgba(37,99,235,0.08)",
                boxShadow: "0 4px 24px rgba(37,99,235,0.06)",
              }}>
                <div style={{
                  height: "80px", width: "80px", borderRadius: "24px",
                  background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <Package size={36} color="#2563eb" strokeWidth={1.5} />
                </div>
                <p style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
                  No products found
                </p>
                <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 28px" }}>
                  Try adjusting your filters or search terms
                </p>
                <button onClick={resetFilters} style={{
                  padding: "12px 32px", borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  border: "none", color: "white", fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
                }}>Reset Filters</button>
              </div>

            /* Grid view */
            ) : view === "grid" ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}>
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>

            /* List view */
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filtered.map((product, i) => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;
                  const cat = categories.find(c => c.id === product.categoryId) || categories[0];
                  return (
                    <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          background: "white", borderRadius: "18px",
                          border: "1.5px solid rgba(37,99,235,0.08)",
                          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                          padding: "14px 18px",
                          display: "flex", alignItems: "center", gap: "16px",
                          transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
                          animation: "cardIn 0.4s ease forwards",
                          animationDelay: `${Math.min(i * 40, 300)}ms`,
                          opacity: 0,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "translateY(-2px)";
                          el.style.boxShadow = "0 12px 40px rgba(37,99,235,0.12)";
                          el.style.borderColor = "rgba(37,99,235,0.22)";
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "none";
                          el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                          el.style.borderColor = "rgba(37,99,235,0.08)";
                        }}
                      >
                        <div style={{
                          height: "80px", width: "80px", borderRadius: "12px", flexShrink: 0,
                          background: cat.bg, border: `1px solid ${cat.bd}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <span style={{ fontSize: "40px" }}>{product.image}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                              {product.name}
                            </span>
                            {discount > 0 && (
                              <span style={{
                                fontSize: "10px", fontWeight: 800, padding: "2px 7px", borderRadius: "99px",
                                background: "rgba(239,68,68,0.10)", color: "#ef4444",
                              }}>-{discount}%</span>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb" }}>{cat.name}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <Star size={12} fill="#f59e0b" color="#f59e0b" />
                              <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a" }}>{product.rating}</span>
                              <span style={{ fontSize: "12px", color: "#94a3b8" }}>({product.reviews})</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: "18px", fontWeight: 900, color: "#0f172a" }}>₨{product.price.toLocaleString()}</div>
                          <div style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb" }}>₨{product.installment.toLocaleString()}/mo</div>
                        </div>
                        <div style={{
                          height: "36px", width: "36px", borderRadius: "10px",
                          background: "rgba(37,99,235,0.08)", color: "#2563eb",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </FlexiLayout>
  );
}
