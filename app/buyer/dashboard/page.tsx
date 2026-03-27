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
  ChevronDown, RefreshCw, X, ShoppingCart, Menu, Plus, Edit2, Trash2
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
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* ── TOP NAV ── */}
      <nav className="bg-white border-b border-blue-600/10 shadow-sm sticky top-0 z-50 px-4 md:px-6 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <FlexiBerryLogo size={32} />
            <div className="hidden sm:block">
              <div className="flex items-baseline gap-0.5">
                <span className="font-['Space_Grotesk',sans-serif] font-extrabold text-lg bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">Flexi</span>
                <span className="font-['Space_Grotesk',sans-serif] font-extrabold text-lg text-[#0f172a]">Berry</span>
              </div>
              <div className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">Customer Portal</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden lg:flex items-center">
            <Search size={14} className="absolute left-3 text-slate-400" />
            <input 
              placeholder="Search orders…" 
              className="h-9 pl-9 pr-3 rounded-xl border-1.5 border-blue-600/15 text-xs outline-none bg-blue-50/30 w-40 xl:w-60 focus:border-blue-500 transition-colors"
            />
          </div>

          <button onClick={() => setActiveTab("notifications")} className="relative p-2 hover:bg-gray-100 rounded-xl text-slate-500">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full border-1.5 border-blue-600/15 bg-blue-600/5 hover:bg-blue-600/10 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-extrabold">
              {customer.avatar}
            </div>
            <span className="text-xs font-bold text-gray-700 hidden sm:inline">{customer.name.split(" ")[0]}</span>
            <ChevronDown size={12} className="text-slate-400" />
          </div>

          <Link href="/">
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
              <ShoppingCart size={13} /> <span className="hidden md:inline">Browse Products</span>
            </button>
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
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* ── SIDEBAR ── */}
        <aside className={`
          fixed md:sticky top-[60px] left-0 h-[calc(100vh-60px)] z-40
          w-[240px] bg-white border-r border-blue-600/10 p-4 flex flex-col gap-1 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {nav.map(item => {
            const active = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button 
                key={item.id} 
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-blue-600/10 text-blue-600' : 'text-slate-500 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                  <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="mt-auto pt-4 border-t border-gray-100">
            <button className="flex w-full items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 font-bold text-sm transition-colors">
              <RefreshCw size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          
          {/* ════════ OVERVIEW tab ════════ */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {customer.name.split(" ")[0]}! 👋</h1>
                  <p className="text-sm text-slate-500">Here's what's happening with your orders and installments.</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-blue-600/10 shadow-sm">
                  <button className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm">Last 30 Days</button>
                  <button className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-gray-50">All Time</button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Spent", val: formatPKR(totalSpend), icon: Wallet, color: "#2563eb", bg: "#dbeafe" },
                  { label: "Active Orders", val: orders.filter(o=>o.status!=='delivered').length, icon: ShoppingBag, color: "#7c3aed", bg: "#ede9fe" },
                  { label: "Monthly Due", val: formatPKR(totalMonthlyDue), icon: Calendar, color: "#d97706", bg: "#fef3c7" },
                  { label: "Loyalty Points", val: customer.loyaltyPoints, icon: Star, color: "#059669", bg: "#d1fae5" },
                ].map(s => (
                  <div key={s.label} className="bg-white p-5 rounded-2xl border border-blue-600/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                    if (s.label === "Active Orders") setActiveTab("orders");
                    if (s.label === "Monthly Due") setActiveTab("installments");
                  }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl" style={{ background: s.bg }}>
                        <s.icon size={20} style={{ color: s.color }} />
                      </div>
                      <ArrowUpRight size={14} className="text-slate-300" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">{s.val}</p>
                  </div>
                ))}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-blue-600/5 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Recent Orders</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Product</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.slice(0, 3).map(o => {
                          const status = statusConfig[o.status];
                          return (
                            <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img src={o.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                  <div>
                                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{o.product}</p>
                                    <p className="text-[10px] text-slate-400">{o.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-xs text-slate-500 hidden sm:table-cell">{o.date}</td>
                              <td className="p-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold" style={{ background: status.bg, color: status.color }}>
                                  <status.icon size={10} /> {status.label}
                                </span>
                              </td>
                              <td className="p-4 text-xs font-bold text-slate-900 text-right">{formatPKR(o.price)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white rounded-2xl border border-blue-600/5 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Recent Notifications</h3>
                    <button onClick={() => setActiveTab("notifications")} className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                    {notifications.slice(0, 4).map(n => {
                      const NotifIcon = n.icon;
                      const typeColors = {
                        warning: { bg: '#fef3c7', color: '#d97706', icon: '#d97706' },
                        success: { bg: '#d1fae5', color: '#059669', icon: '#059669' },
                        info: { bg: '#dbeafe', color: '#2563eb', icon: '#2563eb' }
                      };
                      const colors = typeColors[n.type as keyof typeof typeColors];
                      return (
                        <div key={n.id} className="flex gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                          <div className="p-2 rounded-lg flex-shrink-0" style={{ background: colors.bg }}>
                            <NotifIcon size={14} style={{ color: colors.icon }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-700 leading-relaxed line-clamp-2">{n.text}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════ ORDERS tab ════════ */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-slate-900">My Orders</h1>
                <div className="flex items-center gap-2">
                  <div className="relative hidden sm:block">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input placeholder="Filter orders..." className="h-9 pl-9 pr-3 rounded-xl border-1.5 border-blue-600/15 text-xs outline-none bg-white w-48" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {orders.map(o => {
                  const status = statusConfig[o.status];
                  const isExpanded = expandedOrder === o.id;
                  return (
                    <div key={o.id} className="bg-white rounded-2xl border border-blue-600/5 shadow-sm overflow-hidden transition-all">
                      <div className="p-4 md:p-5 flex flex-wrap md:flex-nowrap items-center gap-4">
                        <img src={o.image} className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover bg-gray-100" />
                        <div className="flex-1 min-w-[200px]">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{o.id}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{o.date}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm md:text-base">{o.product}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Home size={10} /> {o.shop}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-auto">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold" style={{ background: status.bg, color: status.color }}>
                            <status.icon size={12} /> {status.label}
                          </span>
                          <p className="font-extrabold text-slate-900">{formatPKR(o.price)}</p>
                        </div>
                        <button 
                          onClick={() => setExpandedOrder(isExpanded ? null : o.id)}
                          className="p-2 hover:bg-gray-50 rounded-xl text-slate-400"
                        >
                          <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-0 border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
                            <div className="space-y-3">
                              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payment Plan</h5>
                              <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Total Installments</span>
                                  <span className="font-bold text-slate-900">{o.installments.total} months</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-500">Paid to date</span>
                                  <span className="font-bold text-emerald-600">{o.installments.paid} paid</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                  <div className="h-full bg-blue-600" style={{ width: `${(o.installments.paid/o.installments.total)*100}%` }} />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Next Payment</h5>
                              {o.nextDue ? (
                                <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                                  <p className="text-xs font-bold text-amber-900">{formatPKR(o.installments.amount)}</p>
                                  <p className="text-[10px] text-amber-700 mt-1 flex items-center gap-1"><Clock size={10} /> Due on {o.nextDue}</p>
                                </div>
                              ) : (
                                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                  <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 size={10} /> Plan Fully Paid</p>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 justify-end">
                              <button className="w-full h-10 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                                <Eye size={14} /> View Invoice
                              </button>
                              <button className="w-full h-10 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                <Truck size={14} /> Track Order
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════ INSTALLMENTS tab ════════ */}
          {activeTab === "installments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">My Installments</h1>
                  <p className="text-sm text-slate-500 mt-1">Manage and track all your active payment plans</p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl border border-blue-200">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Active Plans</p>
                  <p className="text-3xl font-extrabold text-blue-900">{activeInstallments.length}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-2xl border border-amber-200">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Total Monthly Due</p>
                  <p className="text-3xl font-extrabold text-amber-900">{formatPKR(totalMonthlyDue)}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-2xl border border-emerald-200">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Fully Paid</p>
                  <p className="text-3xl font-extrabold text-emerald-900">{orders.filter(o => o.installments.paid === o.installments.total).length}</p>
                </div>
              </div>

              {/* Installment Cards */}
              <div className="space-y-4">
                {orders.map(o => (
                  <div key={o.id} className="bg-white rounded-2xl border border-blue-600/5 shadow-sm overflow-hidden">
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <img src={o.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{o.product}</h4>
                            <p className="text-xs text-slate-500">{o.id}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total</p>
                          <p className="text-sm font-extrabold text-slate-900">{o.installments.total}M</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Paid</p>
                          <p className="text-sm font-extrabold text-emerald-600">{o.installments.paid}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Remaining</p>
                          <p className="text-sm font-extrabold text-amber-600">{o.installments.total - o.installments.paid}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setExpandedInstallment(expandedInstallment === o.id ? null : o.id)}
                        className="p-2 hover:bg-gray-50 rounded-xl text-slate-400"
                      >
                        <ChevronDown size={20} className={`transition-transform duration-300 ${expandedInstallment === o.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-5 py-3 bg-slate-50 border-t border-gray-100">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{ width: `${(o.installments.paid/o.installments.total)*100}%` }} />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{Math.round((o.installments.paid/o.installments.total)*100)}% Complete</p>
                    </div>

                    {/* Expanded Details */}
                    {expandedInstallment === o.id && (
                      <div className="px-5 py-5 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <p className="text-xs font-bold text-blue-600 uppercase mb-2">Monthly Payment</p>
                            <p className="text-2xl font-extrabold text-blue-900">{formatPKR(o.installments.amount)}</p>
                          </div>
                          {o.nextDue && (
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                              <p className="text-xs font-bold text-amber-600 uppercase mb-2">Next Due Date</p>
                              <p className="text-2xl font-extrabold text-amber-900">{o.nextDue}</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-xs font-bold text-slate-600 uppercase">Payment Schedule</h5>
                          <div className="grid grid-cols-6 gap-1">
                            {Array.from({ length: o.installments.total }).map((_, i) => (
                              <div 
                                key={i}
                                className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                                  i < o.installments.paid 
                                    ? 'bg-emerald-500 text-white' 
                                    : i === o.installments.paid
                                    ? 'bg-amber-500 text-white border-2 border-amber-600'
                                    : 'bg-gray-200 text-slate-500'
                                }`}
                              >
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="flex-1 h-10 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
                            Pay Now
                          </button>
                          <button className="flex-1 h-10 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ NOTIFICATIONS tab ════════ */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>
                <p className="text-sm text-slate-500 mt-1">Stay updated with your orders and account activity</p>
              </div>

              <div className="space-y-3">
                {notifications.map(n => {
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
                      className="bg-white rounded-2xl border border-blue-600/5 shadow-sm p-5 flex gap-4 hover:shadow-md transition-all"
                    >
                      <div className="p-3 rounded-xl flex-shrink-0 h-fit" style={{ background: colors.bg, borderLeft: `4px solid ${colors.border}` }}>
                        <NotifIcon size={20} style={{ color: colors.icon }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-2">{n.time}</p>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <X size={18} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════ SETTINGS / PROFILE tab ════════ */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-2xl font-extrabold text-slate-900">Account Settings</h1>
              
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-6 border border-blue-600/5 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
                      {customer.avatar}
                    </div>
                    <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full border border-gray-100 shadow-md text-blue-600 hover:scale-110 transition-transform">
                      <Edit2 size={14} />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-extrabold text-slate-900">{customer.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{customer.tier} · Member since {customer.memberSince}</p>
                    <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                      <button className="px-4 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 transition-colors">Update Photo</button>
                      <button className="px-4 py-1.5 border border-gray-200 text-slate-600 text-[11px] font-bold rounded-lg hover:bg-gray-50 transition-colors">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", value: customer.name, icon: User, name: "name" },
                    { label: "Email Address", value: customer.email, icon: Mail, name: "email" },
                    { label: "Phone Number", value: customer.phone, icon: Phone, name: "phone" },
                    { label: "City", value: customer.city, icon: MapPin, name: "city" },
                  ].map((field) => (
                    <div key={field.label} className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1">{field.label}</label>
                      <div className="relative">
                        <field.icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          defaultValue={field.value} 
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-blue-600/10 bg-blue-50/20 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <button className="px-6 h-11 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-white rounded-2xl p-6 border border-blue-600/5 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-blue-600" />
                    <h3 className="font-bold text-slate-900">Delivery Addresses</h3>
                  </div>
                  <button 
                    onClick={() => { setEditingAddress(null); setIsAddingAddress(true); }}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus size={14} /> Add New
                  </button>
                </div>

                {(isAddingAddress || editingAddress) && (
                  <motion.form 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSaveAddress}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Address Type</label>
                        <select name="type" defaultValue={editingAddress?.type || "Home"} className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-500">
                          <option>Home</option>
                          <option>Office</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Street Address</label>
                        <input name="street" defaultValue={editingAddress?.street} required placeholder="House #, Street, Area" className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">City</label>
                        <input name="city" defaultValue={editingAddress?.city} required className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Province</label>
                          <input name="province" defaultValue={editingAddress?.province} required className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-500" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">ZIP Code</label>
                          <input name="zip" defaultValue={editingAddress?.zip} required className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={() => { setIsAddingAddress(false); setEditingAddress(null); }} className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                      <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-600/10 hover:bg-blue-700 transition-colors">
                        {editingAddress ? "Update Address" : "Save Address"}
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {customer.addresses.map(addr => (
                    <div key={addr.id} className={`p-4 rounded-2xl border transition-all ${addr.isDefault ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-white'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${addr.type === 'Home' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            {addr.type}
                          </span>
                          {addr.isDefault && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Default</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditingAddress(addr)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteAddress(addr.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{addr.street}</p>
                      <p className="text-xs text-slate-500 mt-1">{addr.city}, {addr.province} {addr.zip}</p>
                    </div>
                  ))}
                  {customer.addresses.length === 0 && !isAddingAddress && (
                    <div className="sm:col-span-2 py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <MapPin size={24} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-sm text-slate-400 font-medium">No addresses saved yet.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-2xl p-6 border border-blue-600/5 shadow-sm space-y-6">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900">Security & Privacy</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Change Password", desc: "Update your account password", icon: Shield },
                    { label: "Two-Factor Authentication", desc: "Add an extra layer of security", icon: Shield },
                    { label: "Active Sessions", desc: "Manage devices logged into your account", icon: Shield },
                  ].map(({ label, desc }) => (
                    <div key={label} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{label}</p>
                        <p className="text-xs text-slate-400">{desc}</p>
                      </div>
                      <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">Manage</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════ WISHLIST tab ════════ */}
          {activeTab === "wishlist" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4">
                <Heart size={32} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Your Wishlist</h2>
              <p className="text-sm text-slate-500 mt-2 max-w-xs">You have {wishlistCount} items saved in your wishlist.</p>
              <Link href="/wishlist">
                <button className="mt-6 px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">View Wishlist Page</button>
              </Link>
            </div>
          )}

        </main>
      </div>


    </div>
  );
}
