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
  ChevronDown, RefreshCw, X, ShoppingCart, Menu, Plus, Edit2, Trash2,
  LogOut, ChevronLeft
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
const initialCustomer = {
  name: "Muhammad Ali",
  email: "ali@example.com",
  phone: "+92 311 2345678",
  city: "Lahore, Punjab",
  memberSince: "Jan 2024",
  avatar: "MA",
  tier: "Gold Member",
  loyaltyPoints: 2450,
  addresses: [
    { id: 1, type: "Home", street: "House #123, Block-A, Model Town", city: "Lahore", province: "Punjab", zip: "54000", isDefault: true },
    { id: 2, type: "Office", street: "Suite 402, Arfa Software Technology Park", city: "Lahore", province: "Punjab", zip: "54700", isDefault: false }
  ]
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
  { id: 1, text: "Your installment for FBR-10042 is due on Apr 8", type: "warning", time: "2 days ago", icon: AlertCircle },
  { id: 2, text: "Order FBR-09102 is out for delivery!", type: "success", time: "5 hours ago", icon: Truck },
  { id: 3, text: "Flash Sale starts tomorrow — items in your wishlist are on discount", type: "info", time: "1 day ago", icon: Gift },
  { id: 4, text: "Payment received for FBR-08554. Thank you!", type: "success", time: "3 days ago", icon: CheckCircle2 },
  { id: 5, text: "Your order FBR-10042 has been confirmed", type: "info", time: "5 days ago", icon: Package },
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
  const [customer, setCustomer] = useState(initialCustomer);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [expandedInstallment, setExpandedInstallment] = useState<string | null>(null);

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

  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAddress = {
      id: editingAddress ? editingAddress.id : Date.now(),
      type: formData.get("type") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      province: formData.get("province") as string,
      zip: formData.get("zip") as string,
      isDefault: editingAddress ? editingAddress.isDefault : customer.addresses.length === 0
    };

    if (editingAddress) {
      setCustomer({
        ...customer,
        addresses: customer.addresses.map(a => a.id === editingAddress.id ? newAddress : a)
      });
    } else {
      setCustomer({
        ...customer,
        addresses: [...customer.addresses, newAddress]
      });
    }
    setEditingAddress(null);
    setIsAddingAddress(false);
  };

  const handleDeleteAddress = (id: number) => {
    setCustomer({
      ...customer,
      addresses: customer.addresses.filter(a => a.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* ── TOP NAV ── */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-blue-100/50 sticky top-0 z-50 px-4 md:px-6 h-[70px] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 md:gap-4">
          <motion.button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={22} className="text-slate-600" />
          </motion.button>
          <div className="flex items-center gap-2.5">
            <FlexiBerryLogo size={36} />
            <div className="hidden sm:block">
              <div className="flex items-baseline gap-0.5">
                <span className="font-['Space_Grotesk',sans-serif] font-extrabold text-lg bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">Flexi</span>
                <span className="font-['Space_Grotesk',sans-serif] font-extrabold text-lg text-slate-900">Berry</span>
              </div>
              <div className="text-[8px] text-slate-400 font-semibold tracking-widest uppercase -mt-1">Dashboard</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative hidden lg:flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input 
              placeholder="Search orders…" 
              className="h-10 pl-10 pr-4 rounded-xl border border-slate-200 text-sm outline-none bg-white/50 backdrop-blur-sm w-48 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>

          <motion.button 
            onClick={() => setActiveTab("notifications")} 
            className="relative p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
          </motion.button>

          <motion.div 
            className="flex items-center gap-2 cursor-pointer p-1.5 pr-3 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 hover:border-blue-300 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-extrabold shadow-md">
              {customer.avatar}
            </div>
            <span className="text-sm font-semibold text-slate-700 hidden sm:inline">{customer.name.split(" ")[0]}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </motion.div>

          <Link href="/">
            <motion.button 
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
            >
              <ShoppingCart size={16} /> <span className="hidden md:inline">Browse</span>
            </motion.button>
          </Link>
        </div>
      </nav>

      <div className="flex flex-1 relative overflow-hidden">
        
        {/* ── SIDEBAR OVERLAY ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* ── FIXED SIDEBAR ── */}
        <motion.aside 
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`
            fixed md:static md:translate-x-0 top-[70px] left-0 bottom-0 z-40
            w-72 bg-white/95 backdrop-blur-xl border-r border-blue-100/50 p-6 flex flex-col gap-2 
            overflow-y-auto md:overflow-y-visible
          `}
        >
          {/* Navigation Items */}
          <div className="space-y-1">
            {nav.map(item => {
              const active = activeTab === item.id;
              const Icon = item.icon;
              return (
                <motion.button 
                  key={item.id} 
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                    active 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                    <span className={`text-sm font-semibold`}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <motion.span 
                      className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                        active 
                          ? 'bg-white/30 text-white' 
                          : 'bg-blue-100 text-blue-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* User Profile Section */}
          <div className="mt-auto pt-4 space-y-3">
            <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100/50">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Member Status</p>
              <p className="text-sm font-bold text-slate-900">{customer.tier}</p>
              <p className="text-xs text-slate-500 mt-1">{customer.loyaltyPoints} loyalty points</p>
            </div>
            
            <motion.button 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold text-sm transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={18} /> Logout
            </motion.button>
          </div>
        </motion.aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          
          {/* ════════ OVERVIEW tab ════════ */}
          {activeTab === "overview" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Welcome back, {customer.name.split(" ")[0]}! 👋</h1>
                  <p className="text-slate-500 mt-2">Here's your shopping dashboard at a glance</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Total Spent", val: formatPKR(totalSpend), icon: Wallet, color: "#2563eb", bg: "#dbeafe", tab: "orders" },
                  { label: "Active Orders", val: orders.filter(o=>o.status!=='delivered').length, icon: ShoppingBag, color: "#7c3aed", bg: "#ede9fe", tab: "orders" },
                  { label: "Monthly Due", val: formatPKR(totalMonthlyDue), icon: Calendar, color: "#d97706", bg: "#fef3c7", tab: "installments" },
                  { label: "Loyalty Points", val: customer.loyaltyPoints, icon: Star, color: "#059669", bg: "#d1fae5", tab: "overview" },
                ].map(s => (
                  <motion.div 
                    key={s.label} 
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-100/50 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setActiveTab(s.tab as Tab)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className="p-3 rounded-xl"
                        style={{ background: s.bg }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <s.icon size={24} style={{ color: s.color }} />
                      </motion.div>
                      <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="text-2xl font-extrabold text-slate-900">{s.val}</p>
                  </motion.div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <motion.div 
                  className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-sm overflow-hidden"
                  whileHover={{ shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                >
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900">Recent Orders</h3>
                    <motion.button 
                      onClick={() => setActiveTab("orders")} 
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      whileHover={{ x: 4 }}
                    >
                      View All →
                    </motion.button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                          <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 3).map(o => {
                          const status = statusConfig[o.status];
                          return (
                            <motion.tr 
                              key={o.id} 
                              className="hover:bg-slate-50/50 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img src={o.image} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900 line-clamp-1">{o.product}</p>
                                    <p className="text-xs text-slate-400">{o.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell">{o.date}</td>
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: status.bg, color: status.color }}>
                                  <status.icon size={12} /> {status.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{formatPKR(o.price)}</td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Recent Notifications */}
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-sm overflow-hidden"
                  whileHover={{ shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                >
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900">Recent Updates</h3>
                    <motion.button 
                      onClick={() => setActiveTab("notifications")} 
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      whileHover={{ x: 4 }}
                    >
                      All →
                    </motion.button>
                  </div>
                  <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
                    {notifications.slice(0, 4).map((n, idx) => {
                      const NotifIcon = n.icon;
                      const typeColors = {
                        warning: { bg: '#fef3c7', color: '#d97706', icon: '#d97706' },
                        success: { bg: '#d1fae5', color: '#059669', icon: '#059669' },
                        info: { bg: '#dbeafe', color: '#2563eb', icon: '#2563eb' }
                      };
                      const colors = typeColors[n.type as keyof typeof typeColors];
                      return (
                        <motion.div 
                          key={n.id} 
                          className="flex gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <motion.div 
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{ background: colors.bg }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <NotifIcon size={16} style={{ color: colors.icon }} />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-700 leading-relaxed line-clamp-2">{n.text}</p>
                            <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ════════ ORDERS tab ════════ */}
          {activeTab === "orders" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-slate-900">My Orders</h1>
              </div>

              <div className="space-y-4">
                {orders.map(o => {
                  const status = statusConfig[o.status];
                  const isExpanded = expandedOrder === o.id;
                  return (
                    <motion.div 
                      key={o.id} 
                      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-sm overflow-hidden"
                      whileHover={{ y: -2, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    >
                      <motion.div 
                        className="p-5 md:p-6 flex flex-wrap md:flex-nowrap items-center gap-4 cursor-pointer"
                        onClick={() => setExpandedOrder(isExpanded ? null : o.id)}
                      >
                        <img src={o.image} className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover bg-slate-100" />
                        <div className="flex-1 min-w-[200px]">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{o.id}</span>
                            <span className="text-xs text-slate-400 font-medium">{o.date}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-base">{o.product}</h4>
                          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Home size={12} /> {o.shop}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-auto">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: status.bg, color: status.color }}>
                            <status.icon size={14} /> {status.label}
                          </span>
                          <p className="font-extrabold text-slate-900">{formatPKR(o.price)}</p>
                        </div>
                        <motion.button 
                          className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                        >
                          <ChevronDown size={22} />
                        </motion.button>
                      </motion.div>
                      
                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6 pt-2 border-t border-slate-100"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Plan</h5>
                              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl space-y-3 border border-blue-100/50">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">Total Installments</span>
                                  <span className="font-bold text-slate-900">{o.installments.total} months</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-600">Paid to date</span>
                                  <span className="font-bold text-emerald-600">{o.installments.paid} paid</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(o.installments.paid/o.installments.total)*100}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Payment</h5>
                              {o.nextDue ? (
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                                  <p className="text-sm font-bold text-amber-900">{formatPKR(o.installments.amount)}</p>
                                  <p className="text-xs text-amber-700 mt-2 flex items-center gap-1"><Clock size={12} /> Due on {o.nextDue}</p>
                                </div>
                              ) : (
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Plan Fully Paid</p>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-3 justify-end">
                              <motion.button 
                                className="w-full bg-slate-900 text-white rounded-xl text-sm font-semibold py-3 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Eye size={16} /> View Invoice
                              </motion.button>
                              <motion.button 
                                className="w-full border-2 border-slate-200 text-slate-700 rounded-xl text-sm font-semibold py-3 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Truck size={16} /> Track Order
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════ INSTALLMENTS tab ════════ */}
          {activeTab === "installments" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">My Installments</h1>
                <p className="text-slate-500 mt-2">Manage and track all your active payment plans</p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { title: "Active Plans", value: activeInstallments.length, gradient: "from-blue-600 to-blue-500", icon: CreditCard },
                  { title: "Total Monthly Due", value: formatPKR(totalMonthlyDue), gradient: "from-amber-600 to-amber-500", icon: Calendar },
                  { title: "Fully Paid", value: orders.filter(o => o.installments.paid === o.installments.total).length, gradient: "from-emerald-600 to-emerald-500", icon: CheckCircle2 },
                ].map((card, idx) => (
                  <motion.div 
                    key={idx}
                    className={`bg-gradient-to-br ${card.gradient} text-white p-6 rounded-2xl shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold opacity-90">{card.title}</p>
                      <card.icon size={24} className="opacity-60" />
                    </div>
                    <p className="text-3xl font-extrabold">{card.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Installment Cards */}
              <div className="space-y-4">
                {orders.map((o, idx) => (
                  <motion.div 
                    key={o.id} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -2, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  >
                    <motion.div 
                      className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                      onClick={() => setExpandedInstallment(expandedInstallment === o.id ? null : o.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={o.image} className="w-14 h-14 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{o.product}</h4>
                            <p className="text-xs text-slate-500">{o.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 md:gap-8 text-center">
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Total</p>
                          <p className="text-lg font-extrabold text-slate-900">{o.installments.total}M</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Paid</p>
                          <p className="text-lg font-extrabold text-emerald-600">{o.installments.paid}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Remaining</p>
                          <p className="text-lg font-extrabold text-amber-600">{o.installments.total - o.installments.paid}</p>
                        </div>
                      </div>
                      <motion.button 
                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
                        animate={{ rotate: expandedInstallment === o.id ? 180 : 0 }}
                      >
                        <ChevronDown size={22} />
                      </motion.button>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${(o.installments.paid/o.installments.total)*100}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-2 font-medium">{Math.round((o.installments.paid/o.installments.total)*100)}% Complete</p>
                    </div>

                    {/* Expanded Details */}
                    {expandedInstallment === o.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-6 border-t border-slate-100 space-y-5"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                            <p className="text-xs font-bold text-blue-600 uppercase mb-2">Monthly Payment</p>
                            <p className="text-2xl font-extrabold text-blue-900">{formatPKR(o.installments.amount)}</p>
                          </div>
                          {o.nextDue && (
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200">
                              <p className="text-xs font-bold text-amber-600 uppercase mb-2">Next Due Date</p>
                              <p className="text-2xl font-extrabold text-amber-900">{o.nextDue}</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-slate-600 uppercase">Payment Schedule</h5>
                          <div className="grid grid-cols-6 gap-2">
                            {Array.from({ length: o.installments.total }).map((_, i) => (
                              <motion.div 
                                key={i}
                                className={`h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                  i < o.installments.paid 
                                    ? 'bg-emerald-500 text-white' 
                                    : i === o.installments.paid
                                    ? 'bg-amber-500 text-white border-2 border-amber-600'
                                    : 'bg-slate-200 text-slate-500'
                                }`}
                                whileHover={{ scale: 1.1 }}
                              >
                                {i + 1}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <motion.button 
                            className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Pay Now
                          </motion.button>
                          <motion.button 
                            className="flex-1 h-12 border-2 border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Details
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════════ NOTIFICATIONS tab ════════ */}
          {activeTab === "notifications" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Notifications</h1>
                <p className="text-slate-500 mt-2">Stay updated with your orders and account activity</p>
              </div>

              <div className="space-y-3">
                {notifications.map((n, idx) => {
                  const NotifIcon = n.icon;
                  const typeColors = {
                    warning: { bg: '#fef3c7', border: '#fcd34d', color: '#d97706', icon: '#d97706' },
                    success: { bg: '#d1fae5', border: '#6ee7b7', color: '#059669', icon: '#059669' },
                    info: { bg: '#dbeafe', border: '#7dd3fc', color: '#2563eb', icon: '#2563eb' }
                  };
                  const colors = typeColors[n.type as keyof typeof typeColors];
                  
                  return (
                    <motion.div 
                      key={n.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 shadow-sm p-5 flex gap-4 hover:shadow-lg transition-all"
                      whileHover={{ y: -2, x: 4 }}
                    >
                      <motion.div 
                        className="p-3 rounded-xl flex-shrink-0 h-fit"
                        style={{ background: colors.bg, borderLeft: `4px solid ${colors.border}` }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <NotifIcon size={22} style={{ color: colors.icon }} />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-slate-900">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-2">{n.time}</p>
                      </div>
                      <motion.button 
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X size={20} />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════ SETTINGS / PROFILE tab ════════ */}
          {activeTab === "settings" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-4xl"
            >
              <h1 className="text-3xl font-extrabold text-slate-900">Account Settings</h1>
              
              {/* Profile Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                  <div className="relative">
                    <motion.div 
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      {customer.avatar}
                    </motion.div>
                    <motion.button 
                      className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full border-2 border-blue-600 shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit2 size={16} />
                    </motion.button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-extrabold text-slate-900">{customer.name}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">{customer.tier} · Member since {customer.memberSince}</p>
                    <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                      <motion.button 
                        className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Update Photo
                      </motion.button>
                      <motion.button 
                        className="px-5 py-2 border-2 border-slate-300 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", value: customer.name, icon: User, name: "name" },
                    { label: "Email Address", value: customer.email, icon: Mail, name: "email" },
                    { label: "Phone Number", value: customer.phone, icon: Phone, name: "phone" },
                    { label: "City", value: customer.city, icon: MapPin, name: "city" },
                  ].map((field) => (
                    <motion.div 
                      key={field.label} 
                      className="space-y-2"
                      whileHover={{ y: -2 }}
                    >
                      <label className="text-sm font-bold text-slate-700 ml-1">{field.label}</label>
                      <div className="relative">
                        <field.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          defaultValue={field.value} 
                          className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-white text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button 
                  className="px-8 h-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </div>

              {/* Address Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin size={24} className="text-blue-600" />
                    <h3 className="font-bold text-lg text-slate-900">Delivery Addresses</h3>
                  </div>
                  <motion.button 
                    onClick={() => { setEditingAddress(null); setIsAddingAddress(true); }}
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={16} /> Add New
                  </motion.button>
                </div>

                {(isAddingAddress || editingAddress) && (
                  <motion.form 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSaveAddress}
                    className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase ml-1">Address Type</label>
                        <select name="type" defaultValue={editingAddress?.type || "Home"} className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10">
                          <option>Home</option>
                          <option>Office</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase ml-1">Street Address</label>
                        <input name="street" defaultValue={editingAddress?.street} required placeholder="House #, Street, Area" className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase ml-1">City</label>
                        <input name="city" defaultValue={editingAddress?.city} required className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600 uppercase ml-1">Province</label>
                          <input name="province" defaultValue={editingAddress?.province} required className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600 uppercase ml-1">ZIP Code</label>
                          <input name="zip" defaultValue={editingAddress?.zip} required className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <motion.button 
                        type="button" 
                        onClick={() => { setIsAddingAddress(false); setEditingAddress(null); }} 
                        className="px-6 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button 
                        type="submit" 
                        className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {editingAddress ? "Update Address" : "Save Address"}
                      </motion.button>
                    </div>
                  </motion.form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {customer.addresses.map(addr => (
                    <motion.div 
                      key={addr.id} 
                      className={`p-5 rounded-2xl border-2 transition-all ${addr.isDefault ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200 bg-white'}`}
                      whileHover={{ y: -4, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-extrabold uppercase px-3 py-1.5 rounded-lg ${addr.type === 'Home' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            {addr.type}
                          </span>
                          {addr.isDefault && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">Default</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button 
                            onClick={() => setEditingAddress(addr)} 
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button 
                            onClick={() => handleDeleteAddress(addr.id)} 
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                      <p className="text-base font-bold text-slate-900">{addr.street}</p>
                      <p className="text-sm text-slate-500 mt-2">{addr.city}, {addr.province} {addr.zip}</p>
                    </motion.div>
                  ))}
                  {customer.addresses.length === 0 && !isAddingAddress && (
                    <div className="sm:col-span-2 py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
                      <MapPin size={32} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-base text-slate-500 font-medium">No addresses saved yet.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-blue-600" />
                  <h3 className="font-bold text-lg text-slate-900">Security & Privacy</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { label: "Change Password", desc: "Update your account password", icon: Shield },
                    { label: "Two-Factor Authentication", desc: "Add an extra layer of security", icon: Shield },
                    { label: "Active Sessions", desc: "Manage devices logged into your account", icon: Shield },
                  ].map(({ label, desc }) => (
                    <div key={label} className="py-5 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-slate-900">{label}</p>
                        <p className="text-sm text-slate-500">{desc}</p>
                      </div>
                      <motion.button 
                        className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Manage
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ WISHLIST tab ════════ */}
          {activeTab === "wishlist" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Heart size={40} />
              </motion.div>
              <h2 className="text-2xl font-extrabold text-slate-900">Your Wishlist</h2>
              <p className="text-slate-500 mt-3 max-w-xs">You have {wishlistCount} items saved in your wishlist.</p>
              <Link href="/wishlist">
                <motion.button 
                  className="mt-8 px-8 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Wishlist Page
                </motion.button>
              </Link>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}
