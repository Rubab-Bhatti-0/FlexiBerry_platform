'use client';

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, ShoppingBag, CreditCard, Heart, Bell, Settings,
  ChevronRight, Package, CheckCircle2, Clock, AlertCircle,
  TrendingUp, Star, MapPin, Phone, Mail,
  Home, BarChart3, Truck, Gift, Shield, Eye, Download,
  Calendar, Wallet, ArrowUpRight, MoreHorizontal, Search,
  ChevronDown, RefreshCw, X, ShoppingCart
} from "lucide-react";

/* ── FlexiBerry Logo ── */
const FlexiBerryLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="db-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="db-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.22"/><stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="26" fill="url(#db-grad)"/>
    <rect width="100" height="100" rx="26" fill="url(#db-sh)"/>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#db-grad)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#db-grad)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#db-grad)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#db-grad)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#db-grad)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#db-grad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#db-grad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/><circle cx="35" cy="86" r="3.8" fill="url(#db-grad)"/><circle cx="35" cy="86" r="1.5" fill="white"/>
      <circle cx="70" cy="86" r="7.5" fill="#10b981"/><circle cx="70" cy="86" r="3.8" fill="white"/><circle cx="70" cy="86" r="1.5" fill="#10b981"/>
      <circle cx="43" cy="92" r="2.2" fill="white" opacity="0.7"/><circle cx="52" cy="92" r="2.2" fill="white" opacity="0.4"/><circle cx="61" cy="92" r="2.2" fill="white" opacity="0.18"/>
    </g>
    <rect width="100" height="100" rx="26" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.15"/>
  </svg>
);

/* ── Mock Data ── */
const customer = {
  name: "Muhammad Ali",
  email: "ali@example.com",
  phone: "+92 311 2345678",
  city: "Lahore, Punjab",
  memberSince: "Jan 2024",
  avatar: "MA",
  tier: "Gold Member",
  loyaltyPoints: 2450,
};

const orders = [
  {
    id: "FBR-10042",
    product: "Samsung Galaxy S24 Ultra 256GB",
    shop: "TechZone Electronics",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=80&q=80",
    price: 299999,
    date: "Mar 8, 2026",
    status: "delivered",
    installments: { total: 12, paid: 3, amount: 24999 },
    nextDue: "Apr 8, 2026",
  },
  {
    id: "FBR-09871",
    product: 'LG OLED C3 65" Smart TV',
    shop: "Home Appliance Hub",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=80&q=80",
    price: 499999,
    date: "Feb 14, 2026",
    status: "delivered",
    installments: { total: 12, paid: 2, amount: 41666 },
    nextDue: "Mar 14, 2026",
  },
  {
    id: "FBR-09102",
    product: "Sony WH-1000XM5 Headphones",
    shop: "Audio Vision",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80",
    price: 89999,
    date: "Jan 20, 2026",
    status: "in_transit",
    installments: { total: 6, paid: 1, amount: 14999 },
    nextDue: "Apr 20, 2026",
  },
  {
    id: "FBR-08554",
    product: "Dyson V15 Detect Vacuum",
    shop: "Home Appliance Hub",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80",
    price: 149999,
    date: "Dec 5, 2025",
    status: "completed",
    installments: { total: 6, paid: 6, amount: 24999 },
    nextDue: null,
  },
];

const wishlistCount = 6;
const notifications = [
  { id: 1, text: "Your installment for FBR-10042 is due on Apr 8", type: "warning", time: "2 days ago" },
  { id: 2, text: "Order FBR-09102 is out for delivery!", type: "success", time: "5 hours ago" },
  { id: 3, text: "Flash Sale starts tomorrow — items in your wishlist are on discount", type: "info", time: "1 day ago" },
];

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  delivered:   { label: "Delivered",   color: "#059669", bg: "#d1fae5", icon: CheckCircle2 },
  in_transit:  { label: "In Transit",  color: "#2563eb", bg: "#dbeafe", icon: Truck },
  processing:  { label: "Processing",  color: "#d97706", bg: "#fef3c7", icon: RefreshCw },
  completed:   { label: "Completed",   color: "#7c3aed", bg: "#ede9fe", icon: CheckCircle2 },
};

type Tab = "overview" | "orders" | "installments" | "wishlist" | "notifications" | "settings";

export default function BuyerDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const totalSpend = orders.reduce((s, o) => s + o.price, 0);
  const activeInstallments = orders.filter(o => o.installments.paid < o.installments.total);
  const totalMonthlyDue = activeInstallments.reduce((s, o) => s + o.installments.amount, 0);

  const nav: { id: Tab; icon: any; label: string; badge?: number }[] = [
    { id: "overview",      icon: Home,       label: "Overview" },
    { id: "orders",        icon: ShoppingBag, label: "My Orders",     badge: orders.length },
    { id: "installments",  icon: CreditCard,  label: "Installments",  badge: activeInstallments.length },
    { id: "wishlist",      icon: Heart,       label: "Wishlist",       badge: wishlistCount },
    { id: "notifications", icon: Bell,        label: "Notifications",  badge: notifications.length },
    { id: "settings",      icon: Settings,    label: "Settings" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP NAV ── */}
      <nav style={{ background: "white", borderBottom: "1px solid rgba(37,99,235,0.10)", boxShadow: "0 2px 12px rgba(37,99,235,0.07)", position: "sticky", top: 0, zIndex: 50, padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FlexiBerryLogo size={36} />
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.1rem", background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Flexi</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>Berry</span>
            </div>
            <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "-2px" }}>Customer Portal</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "10px" }} />
            <input placeholder="Search orders…" style={{ height: "34px", paddingLeft: "30px", paddingRight: "12px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", background: "#f8faff", width: "160px", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
          </div>

          <button onClick={() => setActiveTab("notifications")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "9px", color: "#64748b" }}>
            <Bell size={18} />
            <span style={{ position: "absolute", top: "2px", right: "2px", width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", border: "2px solid white" }} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "4px 10px 4px 4px", borderRadius: "50px", border: "1.5px solid rgba(37,99,235,0.15)", background: "rgba(37,99,235,0.03)" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 800 }}>
              {customer.avatar}
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>{customer.name.split(" ")[0]}</span>
            <ChevronDown size={12} color="#94a3b8" />
          </div>

          <Link href="/">
            <button style={{ display: "flex", alignItems: "center", gap: "5px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", borderRadius: "9px", padding: "8px 16px", cursor: "pointer", color: "white", fontSize: "12px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}>
              <ShoppingCart size={13} /> Browse Products
            </button>
          </Link>
        </div>
      </nav>

      <div style={{ display: "flex", flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: "220px", background: "white", borderRight: "1px solid rgba(37,99,235,0.08)", padding: "20px 12px", display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0, position: "sticky", top: "60px", height: "calc(100vh - 60px)", overflowY: "auto" }}>
          {nav.map(item => {
            const active = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "12px", background: active ? "rgba(37,99,235,0.08)" : "transparent", border: "none", cursor: "pointer", color: active ? "#2563eb" : "#64748b", transition: "all 0.2s", textAlign: "left" }}>
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                <span style={{ fontSize: "13.5px", fontWeight: active ? 700 : 600, flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: "10px", fontWeight: 800, background: active ? "#2563eb" : "#f1f5f9", color: active ? "white" : "#64748b", padding: "2px 6px", borderRadius: "6px" }}>{item.badge}</span>
                )}
              </button>
            );
          })}
          
          <div style={{ marginTop: "auto", padding: "16px", borderRadius: "16px", background: "linear-gradient(135deg,rgba(37,99,235,0.05),rgba(124,58,237,0.05))", border: "1px solid rgba(37,99,235,0.1)" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", marginBottom: "8px" }}>Loyalty Points</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <Gift size={16} color="#7c3aed" />
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{customer.loyaltyPoints}</p>
                <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>Points earned</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: "32px 40px", maxWidth: "1100px" }}>
          
          {/* ════════ OVERVIEW tab ════════ */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Welcome back, {customer.name.split(" ")[0]}! 👋</h1>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>Here's what's happening with your orders and installments.</p>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
                {[
                  { label: "Total Spent", val: formatPKR(totalSpend), icon: Wallet, color: "#2563eb", bg: "#eff6ff" },
                  { label: "Monthly Due", val: formatPKR(totalMonthlyDue), icon: Calendar, color: "#7c3aed", bg: "#f5f3ff" },
                  { label: "Active Orders", val: orders.length.toString(), icon: Package, color: "#10b981", bg: "#f0fdf4" },
                  { label: "Wishlist", val: wishlistCount.toString(), icon: Heart, color: "#ef4444", bg: "#fef2f2" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "white", padding: "20px", borderRadius: "20px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                      <s.icon size={18} color={s.color} />
                    </div>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", margin: "0 0 4px" }}>{s.label}</p>
                    <p style={{ fontSize: "18px", fontWeight: 900, color: "#0f172a", margin: 0 }}>{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Two Column Section */}
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "24px" }}>
                {/* Recent Orders */}
                <div style={{ background: "white", borderRadius: "24px", padding: "24px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Recent Orders</h2>
                    <button onClick={() => setActiveTab("orders")} style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}>View All</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {orders.slice(0, 3).map(order => {
                      const cfg = statusConfig[order.status] || statusConfig.processing;
                      return (
                        <div key={order.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px", borderRadius: "16px", background: "#f8faff", border: "1px solid rgba(37,99,235,0.05)" }}>
                          <img src={order.image} alt="" style={{ width: "48px", height: "48px", borderRadius: "12px", objectCover: "cover" }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: "0 0 2px" }}>{order.product}</p>
                            <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{order.shop} • {order.date}</p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{formatPKR(order.price)}</p>
                            <span style={{ fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "99px", background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next Installment */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)", borderRadius: "24px", padding: "24px", color: "white", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                    <h2 style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.8)", margin: "0 0 16px" }}>Upcoming Payment</h2>
                    <p style={{ fontSize: "28px", fontWeight: 900, margin: "0 0 4px" }}>{formatPKR(totalMonthlyDue)}</p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", margin: "0 0 20px" }}>Next due date: Apr 8, 2026</p>
                    <button style={{ width: "100%", height: "40px", borderRadius: "12px", background: "white", border: "none", color: "#2563eb", fontSize: "13px", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>Pay Now</button>
                  </div>
                  
                  <div style={{ background: "white", borderRadius: "24px", padding: "20px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <h2 style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: "0 0 14px" }}>Quick Actions</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {[
                        { label: "Track Order", icon: Truck },
                        { label: "Help Center", icon: Shield },
                        { label: "Statements", icon: Download },
                        { label: "Invite Friend", icon: Gift },
                      ].map((a, i) => (
                        <button key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "12px", borderRadius: "14px", background: "#f8faff", border: "1px solid rgba(37,99,235,0.05)", cursor: "pointer" }}>
                          <a.icon size={16} color="#2563eb" />
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#374151" }}>{a.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ ORDERS tab ════════ */}
          {activeTab === "orders" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: 0 }}>My Orders</h1>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ height: "36px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #e5e7eb", background: "white", fontSize: "12px", fontWeight: 700, color: "#64748b", cursor: "pointer" }}>All Time</button>
                  <button style={{ height: "36px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #e5e7eb", background: "white", fontSize: "12px", fontWeight: 700, color: "#64748b", cursor: "pointer" }}>Filter Status</button>
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {orders.map(order => {
                  const cfg = statusConfig[order.status] || statusConfig.processing;
                  const Icon = cfg.icon;
                  return (
                    <div key={order.id} style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(37,99,235,0.07)", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                      <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafbff" }}>
                        <div style={{ display: "flex", gap: "24px" }}>
                          <div>
                            <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: "2px" }}>Order ID</p>
                            <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>#{order.id}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: "2px" }}>Placed On</p>
                            <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>{order.date}</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: cfg.bg, color: cfg.color, padding: "5px 12px", borderRadius: "99px" }}>
                          <Icon size={14} />
                          <span style={{ fontSize: "11px", fontWeight: 800 }}>{cfg.label}</span>
                        </div>
                      </div>
                      <div style={{ padding: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
                        <img src={order.image} alt="" style={{ width: "80px", height: "80px", borderRadius: "16px", objectCover: "cover", background: "#f8faff" }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{order.product}</p>
                          <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 12px" }}>Sold by {order.shop}</p>
                          <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#059669", fontWeight: 700 }}>
                              <CreditCard size={14} /> {order.installments.total} Months Installment
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#2563eb", fontWeight: 700 }}>
                              <BarChart3 size={14} /> {order.installments.paid}/{order.installments.total} Paid
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: "18px", fontWeight: 900, color: "#0f172a", margin: "0 0 12px" }}>{formatPKR(order.price)}</p>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button style={{ height: "34px", padding: "0 16px", borderRadius: "10px", border: "1.5px solid #e5e7eb", background: "white", fontSize: "12px", fontWeight: 700, color: "#374151", cursor: "pointer" }}>Track</button>
                            <button style={{ height: "34px", padding: "0 16px", borderRadius: "10px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", fontSize: "12px", fontWeight: 700, color: "white", cursor: "pointer" }}>Details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════ INSTALLMENTS tab ════════ */}
          {activeTab === "installments" && (
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 24px" }}>Installment Plans</h1>
              {orders.map(order => {
                const pct = Math.round((order.installments.paid / order.installments.total) * 100);
                const remaining = order.installments.total - order.installments.paid;
                const isComplete = order.installments.paid === order.installments.total;
                return (
                  <div key={order.id} style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(37,99,235,0.07)", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                      <div style={{ display: "flex", gap: "16px" }}>
                        <img src={order.image} alt="" style={{ width: "56px", height: "56px", borderRadius: "14px", objectCover: "cover" }} />
                        <div>
                          <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{order.product}</h3>
                          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>#{order.id} • {order.shop}</p>
                        </div>
                      </div>
                      {!isComplete && (
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: "4px" }}>Next Payment</p>
                          <p style={{ fontSize: "15px", fontWeight: 900, color: "#ef4444", margin: 0 }}>{formatPKR(order.installments.amount)}</p>
                          <p style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>Due: {order.nextDue}</p>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{order.installments.paid} of {order.installments.total} installments paid</span>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: isComplete ? "#059669" : "#2563eb" }}>{pct}% complete</span>
                      </div>
                      <div style={{ height: "10px", borderRadius: "99px", background: "#f1f5f9", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: isComplete ? "linear-gradient(90deg,#059669,#10b981)" : "linear-gradient(90deg,#2563eb,#7c3aed)", borderRadius: "99px", transition: "width 1s" }} />
                      </div>
                    </div>

                    {/* Month-by-month chips */}
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {Array.from({ length: order.installments.total }).map((_, i) => (
                        <div key={i} title={`Month ${i + 1}: ${formatPKR(order.installments.amount)}`} style={{ width: "28px", height: "28px", borderRadius: "7px", background: i < order.installments.paid ? (isComplete ? "linear-gradient(135deg,#059669,#10b981)" : "linear-gradient(135deg,#2563eb,#7c3aed)") : "#f1f5f9", border: i === order.installments.paid && !isComplete ? "2px dashed #2563eb" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: i < order.installments.paid ? "white" : "#94a3b8", cursor: "default", flexShrink: 0 }}>
                          {i < order.installments.paid ? "✓" : i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Summary row */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {[
                        { label: "Total", value: formatPKR(order.price) },
                        { label: "Paid", value: formatPKR(order.installments.paid * order.installments.amount), highlight: true },
                        { label: "Remaining", value: formatPKR(remaining * order.installments.amount) },
                      ].map(({ label, value, highlight }) => (
                        <div key={label} style={{ flex: 1, minWidth: "80px", background: highlight ? "linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.06))" : "#f8faff", borderRadius: "10px", padding: "8px 12px", border: `1px solid ${highlight ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.06)"}` }}>
                          <p style={{ fontSize: "10px", color: "#94a3b8", margin: "0 0 2px" }}>{label}</p>
                          <p style={{ fontSize: "12px", fontWeight: 800, color: highlight ? "#2563eb" : "#374151", margin: 0 }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ════════ NOTIFICATIONS tab ════════ */}
          {activeTab === "notifications" && (
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 20px" }}>Notifications</h1>
              {notifications.map(n => {
                const configs: Record<string, { bg: string; border: string; dot: string; icon: any }> = {
                  warning: { bg: "#fffbeb", border: "#fde68a", dot: "#d97706", icon: AlertCircle },
                  success: { bg: "#f0fdf4", border: "#bbf7d0", dot: "#059669", icon: CheckCircle2 },
                  info:    { bg: "#eff6ff", border: "#bfdbfe", dot: "#2563eb", icon: Bell },
                };
                const c = configs[n.type];
                const Icon = c.icon;
                return (
                  <div key={n.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "14px", padding: "14px 16px", marginBottom: "10px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: c.dot, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={15} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: "0 0 4px" }}>{n.text}</p>
                      <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ════════ SETTINGS tab ════════ */}
          {activeTab === "settings" && (
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 20px" }}>Account Settings</h1>
              <div style={{ background: "white", borderRadius: "18px", padding: "24px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid rgba(37,99,235,0.07)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "22px", fontWeight: 800 }}>{customer.avatar}</div>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>{customer.name}</p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 6px" }}>{customer.tier} · Member since {customer.memberSince}</p>
                    <button style={{ fontSize: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "white", border: "none", borderRadius: "8px", padding: "5px 12px", cursor: "pointer", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Change Photo</button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {[
                    { label: "Full Name", value: customer.name, icon: User },
                    { label: "Email Address", value: customer.email, icon: Mail },
                    { label: "Phone Number", value: customer.phone, icon: Phone },
                    { label: "City", value: customer.city, icon: MapPin },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>{label}</label>
                      <div style={{ position: "relative" }}>
                        <Icon size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                        <input defaultValue={value} style={{ width: "100%", height: "38px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "10px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fafbff", boxSizing: "border-box" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: "18px", height: "40px", padding: "0 24px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "13px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: "0 6px 16px rgba(37,99,235,0.3)" }}>
                  Save Changes
                </button>
              </div>

              {/* Security */}
              <div style={{ background: "white", borderRadius: "18px", padding: "20px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "6px" }}><Shield size={15} color="#2563eb"/>Security</h3>
                {[
                  { label: "Change Password", desc: "Update your account password" },
                  { label: "Two-Factor Authentication", desc: "Add an extra layer of security" },
                  { label: "Active Sessions", desc: "Manage devices logged into your account" },
                ].map(({ label, desc }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(37,99,235,0.06)" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151", margin: "0 0 2px" }}>{label}</p>
                      <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{desc}</p>
                    </div>
                    <button style={{ background: "rgba(37,99,235,0.07)", border: "none", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", color: "#2563eb", fontSize: "11px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Manage</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ WISHLIST tab ════════ */}
          {activeTab === "wishlist" && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Heart size={32} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>Your Wishlist</h2>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px" }}>You have {wishlistCount} items saved in your wishlist.</p>
              <Link href="/wishlist">
                <button style={{ height: "44px", padding: "0 32px", borderRadius: "12px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", color: "white", fontSize: "14px", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 20px rgba(37,99,235,0.25)" }}>View Wishlist Page</button>
              </Link>
            </div>
          )}

        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .db-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
