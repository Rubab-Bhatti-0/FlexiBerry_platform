'use client'

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FlexiLayout from "@/components/layout/FlexiLayout/FlexiLayout";
import { PRODUCTS_DATA } from "@/lib/products";
import { CATEGORY_THEMES } from "@/components/ui/carousel";
import {
  Search, SlidersHorizontal, X, Grid3X3, List,
  ChevronDown, Sparkles, Package, Star, TrendingUp, Zap,
  Heart, ShoppingCart, ArrowRight, ChevronRight
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
  inStockOnly: boolean;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  category: "all",
  sortBy: "featured",
  priceMin: 0,
  priceMax: 2000000,
  minRating: 0,
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
  { id: 'smartphones', name: 'Smartphones', e: '📱' },
  { id: 'laptops',     name: 'Laptops',     e: '💻' },
  { id: 'bikes',       name: 'Bikes',       e: '🏍️' },
  { id: 'appliances',  name: 'Appliances',  e: '🌀' },
  { id: 'solar',       name: 'Solar',       e: '☀️' },
  { id: 'furniture',   name: 'Furniture',   e: '🛋️' },
  { id: 'jahez',       name: 'Jahez',       e: '📦' },
  { id: 'cars',        name: 'Cars',        e: '🚗' },
  { id: 'business',    name: 'Business',    e: '🏭' },
  { id: 'general',     name: 'General',     e: '🛒' },
];

const featuredProducts = Object.values(PRODUCTS_DATA).map(p => ({
  id: p.id,
  name: p.name,
  categoryId: p.categorySlug,
  price: p.price,
  originalPrice: p.originalPrice || p.price,
  downPayment: Math.floor(p.price * 0.2),
  installment: p.installmentPlans[0]?.monthly || 0,
  rating: p.rating,
  reviews: p.reviewCount,
  image: p.images[0],
  badge: p.discount ? `${p.discount}% OFF` : '',
  inStock: p.inStock
}));

/* ─── Components ─────────────────────────────────────── */
const Chip = ({ label, onRemove, color }: { label: string; onRemove: () => void; color: string }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "4px 10px", borderRadius: "99px",
    background: `${color}14`,
    border: `1.5px solid ${color}2e`,
    fontSize: "11px", fontWeight: 700, color: color,
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
  <div style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "14px", marginBottom: "14px" }}>
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
  filters, onChange, onReset, activeCount, themeColor
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onReset: () => void;
  activeCount: number;
  themeColor: string;
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
      border: `1.5px solid ${themeColor}1a`,
      boxShadow: `0 4px 24px ${themeColor}12`,
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
            background: themeColor,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SlidersHorizontal size={13} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>Filters</span>
          {activeCount > 0 && (
            <span style={{
              height: "18px", minWidth: "18px", borderRadius: "99px",
              background: themeColor,
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
              padding: "7px 10px", borderRadius: "99px", border: "none",
              cursor: "pointer", textAlign: "left", width: "100%",
              background: filters.sortBy === val ? `${themeColor}14` : "transparent",
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.15s",
            }}>
              <div style={{
                height: "14px", width: "14px", borderRadius: "50%",
                border: `2px solid ${filters.sortBy === val ? themeColor : "#cbd5e1"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {filters.sortBy === val && (
                  <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: themeColor }} />
                )}
              </div>
              <span style={{ fontSize: "12px", fontWeight: filters.sortBy === val ? 700 : 500, color: filters.sortBy === val ? themeColor : "#475569" }}>
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
                padding: "7px 10px", borderRadius: "99px", border: "none",
                cursor: "pointer", background: active ? `${themeColor}14` : "transparent",
                fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    height: "14px", width: "14px", borderRadius: "50%",
                    border: `2px solid ${active ? themeColor : "#cbd5e1"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {active && <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: themeColor }} />}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: active ? 700 : 500, color: active ? themeColor : "#475569" }}>
                    {cat.name}
                  </span>
                </div>
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "1px 6px", borderRadius: "99px",
                  background: active ? `${themeColor}26` : "rgba(0,0,0,0.05)",
                  color: active ? themeColor : "#94a3b8",
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
                border: `1.5px solid ${active ? themeColor : `${themeColor}26`}`,
                background: active ? `${themeColor}14` : "transparent",
                color: active ? themeColor : "#64748b",
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
              borderRadius: "99px", border: "none", cursor: "pointer", background: filters.minRating === star ? `${themeColor}14` : "transparent",
              fontFamily: "inherit",
            }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={11} fill={i <= star ? "#f59e0b" : "none"} color={i <= star ? "#f59e0b" : "#cbd5e1"} />
                ))}
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: filters.minRating === star ? themeColor : "#64748b" }}>& Up</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Extras" open={extrasOpen} toggle={() => setExtrasOpen(!extrasOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {([["inStockOnly", "In Stock Only"]] as const).map(([key, label]) => (
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
                  border: `1.5px solid ${filters[key] ? themeColor : "#cbd5e1"}`,
                  background: filters[key] ? themeColor : "transparent",
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

const ProductCard = ({ product, index, themeColor }: { product: any; index: number; themeColor: string }) => {
  const [wish, setWish] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const cat = categories.find(c => c.id === product.categoryId) || categories[0];
  const categoryTheme = CATEGORY_THEMES[product.categoryId] || CATEGORY_THEMES.general;
  const cardThemeColor = categoryTheme.primary;

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
          el.style.boxShadow = `0 20px 40px ${themeColor}1a`;
          el.style.borderColor = `${themeColor}33`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "none";
          el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
          el.style.borderColor = "#e5e7eb";
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
              background: `linear-gradient(135deg, ${themeColor}, #2563eb)`,
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
        <div style={{ position: "relative", aspectRatio: "1", background: `linear-gradient(135deg, ${categoryTheme.bg} 0%, ${categoryTheme.tint} 100%)`, overflow: "hidden" }}>
          <Image src={product.image} alt={product.name} fill style={{ objectFit: 'contain', padding: '12px' }} />
          <div style={{ position: "absolute", inset: 0, bottom: 0, height: 64, background: `linear-gradient(to top, ${categoryTheme.primary}15, transparent)` }} />
        </div>

        {/* Content */}
        <div style={{ padding: 16 }}>
          {/* Category */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
            <div style={{ height: 6, width: 6, borderRadius: "50%", background: cardThemeColor }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: cardThemeColor, textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
              <span style={{ fontSize: 20, fontWeight: 800, color: cardThemeColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                ₨{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
                  ₨{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ height: 16, width: 1, background: "#e5e7eb" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>
                ₨{product.installment.toLocaleString()}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "0 16px 16px", marginTop: "auto" }}>
          <button style={{
            width: "100%", padding: "10px", borderRadius: "10px",
            background: `${cardThemeColor}0d`, border: `1.5px solid ${cardThemeColor}1a`,
            color: cardThemeColor, fontSize: "12px", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            cursor: "pointer", transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = cardThemeColor;
            el.style.color = "white";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = `${cardThemeColor}0d`;
            el.style.color = cardThemeColor;
          }}
          >
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
};

/* ─── Main Page ──────────────────────────────────────── */
export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [view, setView] = useState<"grid" | "list">("grid");

  // Sync with URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setFilters(f => ({ ...f, category: cat }));
  }, []);

  const activeCategory = useMemo(() => 
    categories.find(c => c.id === filters.category) || { id: 'all', name: 'All Products', e: '🛍️' }
  , [filters.category]);

  const theme = useMemo(() => 
    CATEGORY_THEMES[filters.category] || CATEGORY_THEMES.general
  , [filters.category]);

  const filteredProducts = useMemo(() => {
    let res = [...featuredProducts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q));
    }
    if (filters.category !== "all") {
      res = res.filter(p => p.categoryId === filters.category);
    }
    if (filters.priceMin > 0) res = res.filter(p => p.price >= filters.priceMin);
    if (filters.priceMax < 2000000) res = res.filter(p => p.price <= filters.priceMax);
    if (filters.minRating > 0) res = res.filter(p => p.rating >= filters.minRating);
    if (filters.inStockOnly) res = res.filter(p => p.inStock);

    switch (filters.sortBy) {
      case "price-asc":  res.sort((a, b) => a.price - b.price); break;
      case "price-desc": res.sort((a, b) => b.price - a.price); break;
      case "rating":     res.sort((a, b) => b.rating - a.rating); break;
      case "reviews":    res.sort((a, b) => b.reviews - a.reviews); break;
      case "discount":
        res.sort((a, b) => {
          const da = ((a.originalPrice - a.price) / a.originalPrice);
          const db = ((b.originalPrice - b.price) / b.originalPrice);
          return db - da;
        });
        break;
    }
    return res;
  }, [filters]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.priceMin > 0 || filters.priceMax < 2000000) count++;
    if (filters.minRating > 0) count++;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters]);

  const updateFilters = (f: Partial<Filters>) => setFilters(prev => ({ ...prev, ...f }));
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <FlexiLayout>
      <div style={{ background: theme.bg, minHeight: "100vh", padding: "20px 0 80px", transition: "background 0.5s ease", backgroundImage: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.tint} 100%)` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "13px", fontWeight: 600, color: "#64748b" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: theme.primary }}>Products</span>
            {filters.category !== "all" && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: theme.primary }}>{activeCategory.name}</span>
              </>
            )}
          </div>

          {/* Header Section */}
          <div style={{ 
            background: "white", borderRadius: "24px", padding: "32px", marginBottom: "32px",
            border: `1.5px solid ${theme.primary}1a`, boxShadow: `0 10px 30px ${theme.primary}0d`,
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "150px", height: "150px", borderRadius: "50%", background: `${theme.primary}08`, filter: `blur(80px)` }} />
            <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: `${theme.glow}`, opacity: theme.glowOp, filter: `blur(60px)` }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span style={{ fontSize: "32px" }}>{activeCategory.e}</span>
                <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                  {activeCategory.name}
                </h1>
              </div>
              <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "600px", lineHeight: 1.6 }}>
                Browse our premium collection of {activeCategory.name.toLowerCase()} with flexible installment plans tailored for your budget.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "32px" }}>
            {/* Sidebar */}
            <div style={{ display: "block" }}>
              <FilterSidebar
                filters={filters}
                onChange={updateFilters}
                onReset={resetFilters}
                activeCount={activeCount}
                themeColor={theme.primary}
              />
            </div>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
              {/* Toolbar */}
              <div style={{ 
                display: "flex", alignItems: "center", justifyContent: "space-between", 
                marginBottom: "24px", background: "white", padding: "12px 20px", 
                borderRadius: "16px", border: `1.5px solid ${theme.primary}20` 
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                  <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
                    <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={e => updateFilters({ search: e.target.value })}
                      style={{
                        width: "100%", padding: "10px 10px 10px 40px", borderRadius: "10px",
                        border: "1.5px solid #e2e8f0", fontSize: "14px", fontWeight: 500,
                        outline: "none", transition: "all 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = theme.primary}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748b" }}>
                    {filteredProducts.length} Products
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ display: "flex", background: "#f1f5f9", padding: "4px", borderRadius: "10px" }}>
                    <button
                      onClick={() => setView("grid")}
                      style={{
                        padding: "6px", borderRadius: "7px", border: "none", cursor: "pointer",
                        background: view === "grid" ? "white" : "transparent",
                        color: view === "grid" ? theme.primary : "#94a3b8",
                        boxShadow: view === "grid" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                        display: "flex", alignItems: "center",
                      }}
                    ><Grid3X3 size={18} /></button>
                    <button
                      onClick={() => setView("list")}
                      style={{
                        padding: "6px", borderRadius: "7px", border: "none", cursor: "pointer",
                        background: view === "list" ? "white" : "transparent",
                        color: view === "list" ? theme.primary : "#94a3b8",
                        boxShadow: view === "list" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                        display: "flex", alignItems: "center",
                      }}
                    ><List size={18} /></button>
                  </div>
                </div>
              </div>

              {/* Active Chips */}
              {activeCount > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                  {filters.category !== "all" && (
                    <Chip label={`Category: ${activeCategory.name}`} onRemove={() => updateFilters({ category: "all" })} color={theme.primary} />
                  )}
                  {(filters.priceMin > 0 || filters.priceMax < 2000000) && (
                    <Chip label={`Price: ${formatPKR(filters.priceMin)} - ${formatPKR(filters.priceMax)}`} onRemove={() => updateFilters({ priceMin: 0, priceMax: 2000000 })} color={theme.primary} />
                  )}
                  {filters.minRating > 0 && (
                    <Chip label={`Rating: ${filters.minRating}+ Stars`} onRemove={() => updateFilters({ minRating: 0 })} color={theme.primary} />
                  )}
                  {filters.inStockOnly && (
                    <Chip label="In Stock Only" onRemove={() => updateFilters({ inStockOnly: false })} color={theme.primary} />
                  )}
                </div>
              )}

              {/* Grid */}
              {filteredProducts.length > 0 ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: view === "grid" ? "repeat(auto-fill, minmax(240px, 1fr))" : "1fr",
                  gap: "24px"
                }}>
                  {filteredProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} themeColor={theme.primary} />
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: "center", padding: "80px 20px", background: "white",
                  borderRadius: "24px", border: `1.5px dashed ${theme.primary}40`
                }}>
                  <div style={{ 
                    height: "64px", width: "64px", borderRadius: "20px", background: `${theme.primary}10`,
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px"
                  }}>
                    <Package size={32} color={theme.primary} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>No products found</h3>
                  <p style={{ color: "#64748b", marginBottom: "24px" }}>Try adjusting your filters or search query to find what you're looking for.</p>
                  <button
                    onClick={resetFilters}
                    style={{
                      padding: "10px 24px", borderRadius: "12px", background: theme.primary,
                      color: "white", border: "none", fontWeight: 700, cursor: "pointer",
                      boxShadow: `0 8px 20px ${theme.primary}33`
                    }}
                  >Clear All Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </FlexiLayout>
  );
}
