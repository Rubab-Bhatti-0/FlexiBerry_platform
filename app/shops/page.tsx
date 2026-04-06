'use client'

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import FlexiLayout from "@/components/layout/FlexiLayout/FlexiLayout";
import { FlexiBerryLogo } from "@/components/ui/FlexiBerryLogo";
import {
  Search, Star, MapPin, Package, TrendingUp, Shield,
  ArrowUpRight, Zap, Store, ChevronRight, BadgeCheck,
  SlidersHorizontal, X, Sparkles, Grid3X3, List,
} from "lucide-react";
import { VENDORS } from "@/lib/vendors";
import { CATEGORY_THEMES } from "@/components/ui/carousel";

/* Global scrollbar styling */
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(37, 99, 235, 0.4);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(37, 99, 235, 0.6);
    }
  `;
  if (document.head) {
    document.head.appendChild(style);
  }
}

const CATEGORIES = ["All", ...Array.from(new Set(VENDORS.map(v => v.category)))];
const CITIES = ["All Cities", ...Array.from(new Set(VENDORS.map(v => v.city)))];

const PLATFORM_STATS = [
  { label: "Verified Sellers", value: "1,200+", icon: BadgeCheck, color: "#2563eb" },
  { label: "Products Listed", value: "85K+", icon: Package, color: "#7c3aed" },
  { label: "Happy Customers", value: "2.4M+", icon: Star, color: "#f59e0b" },
  { label: "Cities Covered", value: "120+", icon: MapPin, color: "#10b981" },
];

// Helper to get theme from CATEGORY_THEMES
const getThemeForCategory = (catName: string) => {
  if (catName === "All") return CATEGORY_THEMES.general;
  const slug = catName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  // Special mappings if needed
  if (slug === "home-living") return CATEGORY_THEMES.furniture;
  if (slug === "motors-energy") return CATEGORY_THEMES.cars;
  if (slug === "solar-energy") return CATEGORY_THEMES.solar;
  if (slug === "jahez-dowry") return CATEGORY_THEMES.jahez;
  if (slug === "bikes-scooters") return CATEGORY_THEMES.bikes;
  if (slug === "mobiles") return CATEGORY_THEMES.smartphones;
  if (slug === "electronics") return CATEGORY_THEMES.laptops;
  
  return CATEGORY_THEMES[slug] || CATEGORY_THEMES.general;
};

/* ─────────────────── SHOP CARD ─────────────────── */
const ShopCard = ({ vendor, index, view }: { vendor: typeof VENDORS[0]; index: number; view: "grid" | "list" }) => {
  const [hovered, setHovered] = useState(false);
  const theme = getThemeForCategory(vendor.category);

  if (view === "list") {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "white",
          borderRadius: "20px",
          border: `1.5px solid ${hovered ? `${theme.primary}40` : "rgba(37,99,235,0.08)"}`,
          boxShadow: hovered ? `0 12px 40px ${theme.primary}20, 0 2px 8px rgba(0,0,0,0.04)` : "0 2px 12px rgba(0,0,0,0.04)",
          padding: "20px 24px",
          display: "flex", alignItems: "center", gap: "20px",
          transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
          transform: hovered ? "translateY(-2px)" : "none",
          animation: `cardIn 0.4s ease forwards`,
          animationDelay: `${Math.min(index * 50, 350)}ms`,
          opacity: 0,
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          flexWrap: "wrap" as const,
        }}>
        {/* Logo */}
        <div style={{
          height: "60px", width: "60px", borderRadius: "16px", flexShrink: 0,
          background: vendor.bannerGrad,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
        }}>{vendor.emoji}</div>
        {/* Info */}
        <div style={{ flex: 1, minWidth: "160px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" as const }}>
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
              {vendor.name}
            </span>
            {vendor.verified && <BadgeCheck size={15} color={theme.primary} fill={`${theme.primary}26`} />}
            {vendor.featured && (
              <span style={{
                fontSize: "9px", fontWeight: 800, padding: "2px 7px", borderRadius: "99px",
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.alt})`, color: "white",
              }}>FEATURED</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" as const }}>
            <span style={{ fontSize: "12px", fontWeight: 700, padding: "2px 9px", borderRadius: "99px", background: theme.bg, color: theme.primary }}>{vendor.category}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#64748b" }}>
              <MapPin size={11} /> {vendor.city}
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0", lineHeight: 1.5 }}>{vendor.description}</p>
        </div>
        {/* Stats */}
        <div style={{ display: "flex", gap: "24px", flexShrink: 0, flexWrap: "wrap" as const }}>
          <div style={{ textAlign: "center" as const }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#f59e0b" }}>★ {vendor.rating}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>{vendor.reviews.toLocaleString()} reviews</div>
          </div>
          <div style={{ textAlign: "center" as const }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>{vendor.products}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>Products</div>
          </div>
          {vendor.installments && (
            <div style={{ textAlign: "center" as const }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: theme.primary }}>⚡ Kisti</div>
              <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>Available</div>
            </div>
          )}
        </div>
        {/* CTA */}
        <Link href={`/shop/${vendor.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "10px 20px", borderRadius: "12px",
            background: hovered ? `linear-gradient(135deg, ${theme.primary}, ${theme.alt})` : "transparent",
            border: `1.5px solid ${hovered ? "transparent" : `${theme.primary}33`}`,
            color: hovered ? "white" : theme.primary,
            fontSize: "13px", fontWeight: 700,
            cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: hovered ? `0 6px 20px ${theme.primary}50` : "none",
            transition: "all 0.2s ease",
          }}>
            Visit Shop <ArrowUpRight size={14} strokeWidth={2.5} />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "22px",
        border: `1.5px solid ${hovered ? `${theme.primary}38` : "rgba(37,99,235,0.07)"}`,
        boxShadow: hovered
          ? `0 20px 50px ${theme.primary}24, 0 6px 16px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.04)",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "none",
        animation: `cardIn 0.4s ease forwards`,
        animationDelay: `${Math.min(index * 60, 400)}ms`,
        opacity: 0,
        cursor: "pointer",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex", flexDirection: "column" as const,
      }}>
      {/* ── Banner ── */}
      <div style={{
        height: "100px", position: "relative",
        background: vendor.bannerGrad,
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", top: "-30px", right: "-20px" }} />
        <div style={{ position: "absolute", width: "70px", height: "70px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", bottom: "-20px", right: "40px" }} />
        <div style={{ position: "absolute", width: "50px", height: "50px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "10px", left: "30%" }} />
        <svg style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.12 }} width="160" height="100" viewBox="0 0 160 100">
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 22 + 11} cy={row * 22 + 11} r="1.5" fill="white" />
            ))
          )}
        </svg>
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", flexDirection: "column" as const, gap: "4px", alignItems: "flex-end" }}>
          {vendor.featured && (
            <span style={{
              fontSize: "9px", fontWeight: 800, padding: "3px 8px", borderRadius: "99px",
              background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.40)",
              color: "white", display: "flex", alignItems: "center", gap: "3px",
            }}>
              <Sparkles size={8} /> FEATURED
            </span>
          )}
          {vendor.installments && (
            <span style={{
              fontSize: "9px", fontWeight: 800, padding: "3px 8px", borderRadius: "99px",
              background: "rgba(255,255,255,0.20)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white", display: "flex", alignItems: "center", gap: "3px",
            }}>
              <Zap size={8} /> KISTI
            </span>
          )}
        </div>
        <div style={{
          position: "absolute", bottom: "-20px", left: "20px",
          height: "52px", width: "52px", borderRadius: "16px",
          background: "white",
          boxShadow: "0 6px 20px rgba(0,0,0,0.20)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px",
          border: "2px solid white",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1)",
        }}>{vendor.emoji}</div>
        {vendor.verified && (
          <div style={{
            position: "absolute", bottom: "-16px", left: "56px",
            height: "22px", width: "22px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.alt})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid white",
            boxShadow: `0 2px 8px ${theme.primary}66`,
          }}>
            <BadgeCheck size={12} color="white" fill="transparent" />
          </div>
        )}
      </div>
      {/* ── Body ── */}
      <div style={{ padding: "28px 18px 18px", flex: 1, display: "flex", flexDirection: "column" as const }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{vendor.name}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px", background: theme.bg, color: theme.primary }}>{vendor.category}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
                <MapPin size={10} /> {vendor.city}
              </span>
            </div>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#f59e0b" }}>★ {vendor.rating}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>{vendor.reviews.toLocaleString()}</div>
          </div>
        </div>
        
        <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 18px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {vendor.description}
        </p>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>{vendor.products}</div>
              <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Products</div>
            </div>
            {vendor.installments && (
              <div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: theme.primary }}>⚡ Kisti</div>
                <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Available</div>
              </div>
            )}
          </div>
          <Link href={`/shop/${vendor.id}`} style={{ textDecoration: "none" }}>
            <button style={{
              height: "34px", width: "34px", borderRadius: "10px",
              background: hovered ? theme.primary : "rgba(37,99,235,0.06)",
              border: "none", color: hovered ? "white" : theme.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s ease",
            }}>
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── MAIN PAGE ─────────────────── */
export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setCategory] = useState("All");
  const [activeCity, setCity] = useState("All Cities");
  const [verifiedOnly, setVerified] = useState(false);
  const [sortBy, setSort] = useState<"rating" | "products" | "reviews" | "newest">("rating");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [heroVisible, setHero] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHero(true), 80);
    return () => clearTimeout(t);
  }, []);

  const theme = useMemo(() => getThemeForCategory(activeCategory), [activeCategory]);

  const filtered = useMemo(() => {
    let list = [...VENDORS];
    if (search.trim()) {
      list = list.filter(v =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase()) ||
        v.city.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeCategory !== "All") list = list.filter(v => v.category === activeCategory);
    if (activeCity !== "All Cities") list = list.filter(v => v.city === activeCity);
    if (verifiedOnly) list = list.filter(v => v.verified);

    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "products") return b.products - a.products;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return ((b as any).established || "2023").localeCompare((a as any).established || "2023");
    });
    return list;
  }, [search, activeCategory, activeCity, verifiedOnly, sortBy]);

  const activeFilterCount = [
    activeCategory !== "All",
    activeCity !== "All Cities",
    verifiedOnly,
    sortBy !== "rating",
    !!search.trim(),
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearch(""); setCategory("All"); setCity("All Cities");
    setVerified(false); setSort("rating");
  };

  return (
    <FlexiLayout>
      <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.5s ease" }}>

        {/* ── HERO SECTION ── */}
        <section style={{
          background: `linear-gradient(135deg, ${theme.darkBg} 0%, ${theme.primary} 50%, ${theme.alt} 100%)`,
          padding: "64px 16px 80px",
          position: "relative", overflow: "hidden",
          transition: "background 0.5s ease"
        }}>
          {/* Animated orbs */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-150px", right: "-100px", animation: "floatOrb 8s ease-in-out infinite" }} />
            <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-80px", left: "10%", animation: "floatOrb 10s ease-in-out infinite 2s" }} />
            <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: `${theme.glow}40`, top: "20%", left: "40%", filter: "blur(40px)" }} />
            <svg style={{ position: "absolute", right: "5%", top: 0, opacity: 0.07 }} width="400" height="300" viewBox="0 0 400 300">
              {Array.from({ length: 12 }).map((_, row) =>
                Array.from({ length: 20 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 22 + 11} cy={row * 26 + 13} r="1.8" fill="white" />
                ))
              )}
            </svg>
          </div>

          <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 14px", borderRadius: "99px",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.25)",
              marginBottom: "20px",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(-8px)",
              transition: "all 0.5s ease",
            }}>
              <BadgeCheck size={13} color="rgba(255,255,255,0.9)" />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.10em", textTransform: "uppercase" }}>
                Verified Sellers
              </span>
            </div>

            {/* Headline + logo */}
            <div style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              flexWrap: "wrap" as const, gap: "24px",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(16px)",
              transition: "all 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "12px" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "20px",
                    padding: "8px",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
                    flexShrink: 0,
                  }}>
                    <FlexiBerryLogo size={52} />
                  </div>
                  <h1 style={{
                    color: "white", fontWeight: 900,
                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                    margin: 0, letterSpacing: "-0.04em", lineHeight: 1,
                    fontFamily: "'Space Grotesk', sans-serif",
                    textShadow: "0 4px 24px rgba(0,0,0,0.20)",
                  }}>
                    {activeCategory === "All" ? "All Shops" : activeCategory}
                  </h1>
                </div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(14px,2vw,17px)", margin: 0, fontWeight: 500, maxWidth: "480px", lineHeight: 1.55 }}>
                  {filtered.length} verified sellers • Shop with confidence on FlexiBerry
                </p>
              </div>

              {/* Platform stats */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px",
                opacity: heroVisible ? 1 : 0,
                transition: "all 0.55s ease 0.15s",
              }}>
                {PLATFORM_STATS.map(({ label, value, icon: Icon }) => (
                  <div key={label} style={{
                    padding: "12px 16px", borderRadius: "16px",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    display: "flex", alignItems: "center", gap: "10px",
                    minWidth: "140px",
                  }}>
                    <div style={{
                      height: "32px", width: "32px", borderRadius: "10px", flexShrink: 0,
                      background: "rgba(255,255,255,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={15} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 900, color: "white", lineHeight: 1 }}>{value}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", fontWeight: 600, marginTop: "2px" }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Search bar ── */}
            <div style={{
              marginTop: "32px",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(12px)",
              transition: "all 0.55s ease 0.20s",
            }}>
              <div style={{ position: "relative", maxWidth: "600px" }}>
                <Search size={16} color="rgba(255,255,255,0.55)"
                  style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  placeholder="Search shops by name, city, or category…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: "100%", height: "52px",
                    paddingLeft: "44px", paddingRight: search ? "44px" : "16px",
                    borderRadius: "16px",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.14)",
                    backdropFilter: "blur(16px)",
                    fontSize: "14px", fontWeight: 500, color: "white",
                    outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxSizing: "border-box",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    transition: "border-color 0.2s",
                  }}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{
                    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
                    cursor: "pointer", height: "26px", width: "26px",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                  }}>
                    <X size={11} strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Scroll Down Button */}
          <div style={{
            marginTop: "48px",
            display: "flex",
            justifyContent: "center",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(12px)",
            transition: "all 0.55s ease 0.30s",
            animation: "bounce 2s infinite",
          }}>
            <button
              onClick={() => {
                const element = document.querySelector('main');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.20)",
                border: "1.5px solid rgba(255,255,255,0.40)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                color: "white",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.30)";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.20)";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </section>

        {/* Curved bottom edge */}
        <div style={{
          position: "absolute", bottom: -1, left: 0, right: 0, height: "40px",
          background: theme.bg,
          borderRadius: "60% 60% 0 0 / 100% 100% 0 0",
          transition: "background 0.5s ease"
        }} />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── FILTERS TOOLBAR ── */}
        <div style={{ maxWidth: "1400px", margin: "-10px auto 0", padding: "0 16px 0" }}>
          <div style={{
            background: "white",
            borderRadius: "20px",
            border: `1.5px solid ${theme.primary}20`,
            boxShadow: `0 4px 24px ${theme.primary}15`,
            padding: "16px 20px",
            display: "flex", flexWrap: "wrap" as const, gap: "12px", alignItems: "center",
          }}>
            {/* Filter icon */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <div style={{
                height: "32px", width: "32px", borderRadius: "9px",
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.alt})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${theme.primary}40`,
              }}>
                <SlidersHorizontal size={14} color="white" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>Filter</span>
              {activeFilterCount > 0 && (
                <span style={{
                  height: "18px", minWidth: "18px", borderRadius: "99px",
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.alt})`,
                  fontSize: "10px", fontWeight: 800, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px",
                }}>{activeFilterCount}</span>
              )}
            </div>

            <div style={{ width: "1px", height: "28px", background: `${theme.primary}20`, flexShrink: 0 }} />

            {/* Category pills */}
            <div style={{ display: "flex", gap: "5px", overflowX: "auto" as const, scrollbarWidth: "none" as const, flex: 1, minWidth: 0 }}>
              {CATEGORIES.map(cat => {
                const active = activeCategory === cat;
                const catTheme = getThemeForCategory(cat);
                return (
                  <button key={cat} onClick={() => setCategory(cat)} style={{
                    padding: "6px 14px", borderRadius: "99px", flexShrink: 0,
                    fontSize: "12px", fontWeight: 700,
                    border: `1.5px solid ${active ? catTheme.primary : `${catTheme.primary}20`}`,
                    background: active ? `linear-gradient(135deg, ${catTheme.primary}, ${catTheme.alt})` : "transparent",
                    color: active ? "white" : "#64748b",
                    cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: active ? `0 4px 12px ${catTheme.primary}40` : "none",
                    transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>{cat}</button>
                );
              })}
            </div>

            <div style={{ width: "1px", height: "28px", background: `${theme.primary}20`, flexShrink: 0 }} />

            {/* Right side controls */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0, flexWrap: "wrap" as const }}>
              <select value={activeCity} onChange={e => setCity(e.target.value)} style={{
                height: "34px", padding: "0 10px", borderRadius: "10px",
                border: `1.5px solid ${theme.primary}30`,
                background: "#fafbff", fontSize: "12px", fontWeight: 600,
                color: "#374151", outline: "none", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>

              <select value={sortBy} onChange={e => setSort(e.target.value as any)} style={{
                height: "34px", padding: "0 10px", borderRadius: "10px",
                border: `1.5px solid ${theme.primary}30`,
                background: "#fafbff", fontSize: "12px", fontWeight: 600,
                color: "#374151", outline: "none", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <option value="rating">Top Rated</option>
                <option value="products">Most Products</option>
                <option value="reviews">Most Reviews</option>
                <option value="newest">Newest</option>
              </select>

              <button onClick={() => setVerified(!verifiedOnly)} style={{
                display: "flex", alignItems: "center", gap: "5px",
                height: "34px", padding: "0 12px", borderRadius: "10px",
                border: `1.5px solid ${verifiedOnly ? theme.primary : `${theme.primary}30`}`,
                background: verifiedOnly ? `${theme.primary}15` : "transparent",
                color: verifiedOnly ? theme.primary : "#64748b",
                fontSize: "12px", fontWeight: 700, cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.15s",
              }}>
                <BadgeCheck size={13} strokeWidth={2.5} /> Verified
              </button>

              {activeFilterCount > 0 && (
                <button onClick={resetFilters} style={{
                  height: "34px", padding: "0 12px", borderRadius: "10px",
                  border: "1.5px solid rgba(239,68,68,0.20)",
                  background: "rgba(239,68,68,0.07)",
                  color: "#ef4444", fontSize: "12px", fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  display: "flex", alignItems: "center", gap: "4px",
                }}>
                  <X size={11} strokeWidth={3} /> Reset
                </button>
              )}

              <div style={{
                display: "flex", borderRadius: "10px",
                border: `1.5px solid ${theme.primary}30`,
                overflow: "hidden",
              }}>
                {([["grid", Grid3X3], ["list", List]] as const).map(([mode, Icon]) => (
                  <button key={mode} onClick={() => setView(mode)} style={{
                    height: "34px", width: "34px", border: "none",
                    background: view === mode ? `linear-gradient(135deg, ${theme.primary}, ${theme.alt})` : "transparent",
                    color: view === mode ? "white" : "#94a3b8",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}>
                    <Icon size={14} strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 16px 60px" }}>

          {/* Results count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", margin: 0 }}>
              Showing <span style={{ fontWeight: 800, color: "#0f172a" }}>{filtered.length}</span> shop{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && ` in ${activeCategory}`}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center" as const, padding: "80px 24px",
              background: "white", borderRadius: "24px",
              border: `1.5px solid ${theme.primary}20`,
              boxShadow: `0 4px 24px ${theme.primary}10`,
            }}>
              <div style={{
                height: "80px", width: "80px", borderRadius: "24px",
                background: `${theme.primary}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", color: theme.primary,
              }}>
                <Store size={40} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>No shops found</h3>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 24px" }}>Try adjusting your filters or search terms to find what you're looking for.</p>
              <button onClick={resetFilters} style={{
                padding: "12px 24px", borderRadius: "12px",
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.alt})`,
                color: "white", border: "none", fontSize: "14px", fontWeight: 700,
                cursor: "pointer", boxShadow: `0 8px 20px ${theme.primary}40`,
              }}>Clear All Filters</button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: view === "grid" ? "repeat(auto-fill, minmax(300px, 1fr))" : "1fr",
              gap: "24px",
            }}>
              {filtered.map((vendor, i) => (
                <ShopCard key={vendor.id} vendor={vendor} index={i} view={view} />
              ))}
            </div>
          )}
        </main>
      </div>
    </FlexiLayout>
  );
}
