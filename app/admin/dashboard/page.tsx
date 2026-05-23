'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts'
import { Menu, X, Moon, Sun, LogOut, Bell, Search, Plus, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Download, FileText, Check, AlertCircle, Lock, User, Mail, ShieldCheck, ShoppingBag, Pause, Play, Save, XCircle, TrendingUp, BarChart3, Users, ShoppingCart, DollarSign, Activity, RefreshCw, Zap, PieChart, Calendar, MessageSquare, Star } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Logo } from '@/components/admin/admin-logo'

const PAGES = {
  DASHBOARD: 'dashboard',
  SHOPS: 'shops',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  ADMINS: 'admins',
  USERS: 'users',
  BUYER_KYC: 'buyer_kyc',
  VENDOR_KYC: 'vendor_kyc',
  USER_HISTORY: 'user_history',
  CATEGORIES: 'categories',
  INSTALLMENTS: 'installments',
  RECOVERY: 'recovery',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
  CONTACT_MESSAGES: 'contact_messages',
}

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState(PAGES.DASHBOARD)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const itemsPerPage = 8

  // Login form states
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Modal states
  const [showAddShopModal, setShowAddShopModal] = useState(false)
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showEditShopModal, setShowEditShopModal] = useState<any>(null)
  const [showEditAdminModal, setShowEditAdminModal] = useState<any>(null)
  const [showEditUserModal, setShowEditUserModal] = useState<any>(null)
  const [viewDocModal, setViewDocModal] = useState<{ open: boolean, item: any | null, type: 'user' | 'vendor' }>({ open: false, item: null, type: 'user' })
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showEditProductModal, setShowEditProductModal] = useState<any>(null)
  const [showAddOrderModal, setShowAddOrderModal] = useState(false)
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState<any>(null)

  // Form states
  const [newShop, setNewShop] = useState({ name: '', owner: '', revenue: '', status: 'active' })
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' })
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', status: 'active' })
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' })
  const [newProduct, setNewProduct] = useState({ name: '', shop: '', category: '', price: '', downPayment: '', stock: '', status: 'active', sku: '' })
  const [newOrder, setNewOrder] = useState({ customer: '', totalAmount: '', monthlyAmount: '', duration: '', status: 'active' })
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'FlexiBerry',
    supportEmail: 'support@flexiberry.com',
    contactNumber: '+92-300-1234567',
    commissionRate: '5%',
    taxRate: '17%',
    currency: 'PKR',
    maintenanceMode: false,
    twoFactorAuth: true,
  })

  useEffect(() => {
    setMounted(true)
    const status = localStorage.getItem('isLoggedIn')
    if (status === 'true') setIsLoggedIn(true)
  }, [])

  // Mock data
  const [shops, setShops] = useState([
    { id: 1, name: 'Electronics Store', owner: 'John Doe', revenue: 45000, status: 'active', date: '2024-01-15' },
    { id: 2, name: 'Fashion Hub', owner: 'Jane Smith', revenue: 32000, status: 'active', date: '2024-01-16' },
    { id: 3, name: 'Home Goods', owner: 'Mike Johnson', revenue: 28000, status: 'suspended', date: '2024-01-17' },
    { id: 4, name: 'Tech Solutions', owner: 'Sarah Davis', revenue: 56000, status: 'active', date: '2024-01-18' },
  ])

  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', phone: '+1-555-0001', status: 'active', joined: '2024-01-10' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', phone: '+1-555-0002', status: 'active', joined: '2024-01-12' },
    { id: 3, name: 'David Brown', email: 'david@email.com', phone: '+1-555-0003', status: 'suspended', joined: '2024-01-08' },
    { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1-555-0004', status: 'active', joined: '2024-01-14' },
  ])

  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@flexiberry.com', role: 'Super Admin', status: 'active', lastLogin: '2024-01-20 14:30' },
    { id: 2, name: 'Support Lead', email: 'support@flexiberry.com', role: 'Admin', status: 'active', lastLogin: '2024-01-20 10:15' },
    { id: 3, name: 'Manager', email: 'manager@flexiberry.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-19 09:00' },
    { id: 4, name: 'Technical Lead', email: 'tech@flexiberry.com', role: 'Admin', status: 'active', lastLogin: '2024-01-18 16:45' },
    { id: 5, name: 'Operations Manager', email: 'ops@flexiberry.com', role: 'Manager', status: 'active', lastLogin: '2024-01-18 11:20' },
  ])

  const [userHistory, setUserHistory] = useState([
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', activity: 'Login', details: 'Logged in from Chrome on Windows', date: '2024-05-19 09:15 AM' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', activity: 'Purchase', details: 'Purchased iPhone 15 Pro Max - Installment Plan', date: '2024-05-19 08:30 AM' },
    { id: 3, name: 'David Brown', email: 'david@email.com', activity: 'KYC Update', details: 'Uploaded new bank statement', date: '2024-05-18 04:45 PM' },
    { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', activity: 'Login', details: 'Logged in from Safari on iPhone', date: '2024-05-18 02:10 PM' },
    { id: 5, name: 'James Wilson', email: 'james@email.com', activity: 'Payment', details: 'Paid 1st installment for Order #ORD-772', date: '2024-05-18 11:00 AM' },
    { id: 6, name: 'Sarah Miller', email: 'sarah@email.com', activity: 'Account Created', details: 'New user registration completed', date: '2024-05-17 05:30 PM' },
  ])

  // Search and Filter states for Admins
  const [adminSearchTerm, setAdminSearchTerm] = useState('')
  const [adminRoleFilter, setAdminRoleFilter] = useState('All Roles')
  const [adminStatusFilter, setAdminStatusFilter] = useState('All Status')

  // Search state for User History
  const [userHistorySearchTerm, setUserHistorySearchTerm] = useState('')

  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', icon: '🔌', items: 234, status: 'active' },
    { id: 2, name: 'Fashion', icon: '👗', items: 456, status: 'active' },
    { id: 3, name: 'Home & Garden', icon: '🏠', items: 189, status: 'active' },
    { id: 4, name: 'Sports', icon: '⚽', items: 123, status: 'active' },
  ])

  const [userVerifications, setUserVerifications] = useState([
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'], status: 'pending', date: '2024-01-21' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'], status: 'approved', date: '2024-01-19' },
  ])

  const [vendorVerifications, setVendorVerifications] = useState([
    { id: 1, shopName: 'Tech Innovations', owner: 'John Doe', docs: ['Shop License'], status: 'pending', date: '2024-01-20' },
    { id: 2, shopName: 'Fashion Forward', owner: 'Jane Smith', docs: ['Shop License'], status: 'approved', date: '2024-01-19' },
  ])

  const [installments, setInstallments] = useState([
    { id: 1, order: 'ORD-001', customer: 'John Doe', amount: 1200, plan: '3 x $400', paid: 1, total: 3, nextDue: '2024-02-15', status: 'active' },
    { id: 2, order: 'ORD-002', customer: 'Jane Smith', amount: 850, plan: '2 x $425', paid: 2, total: 2, nextDue: 'Completed', status: 'completed' },
    { id: 3, order: 'ORD-003', customer: 'Mike Johnson', amount: 2500, plan: '5 x $500', paid: 2, total: 5, nextDue: '2024-01-25', status: 'overdue' },
  ])

  const [recoveryRequests, setRecoveryRequests] = useState([
    { id: 1, email: 'user@email.com', username: 'user_123', method: 'Email', status: 'pending', date: '2024-01-20', expiresAt: '2024-01-22' },
    { id: 2, email: 'alex@email.com', username: 'alex_profile', method: 'Phone', status: 'verified', date: '2024-01-19', expiresAt: '2024-01-26' },
    { id: 3, email: 'emma@email.com', username: 'emma_store', method: 'Email', status: 'completed', date: '2024-01-18', expiresAt: 'N/A' },
  ])

  const [contactMessages, setContactMessages] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Inquiry about products', message: 'I would like to know more about your electronics section and if you have any upcoming sales on laptops.', date: '2024-05-18 10:30 AM', status: 'unread' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Shipping delay', message: 'My order #12345 has been delayed for 3 days. Can you please check the status?', date: '2024-05-17 02:15 PM', status: 'read' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Partnership opportunity', message: 'We are interested in a vendor partnership. Who should we contact for this?', date: '2024-05-16 09:45 AM', status: 'unread' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', subject: 'Account access issue', message: 'I am unable to log in to my buyer account. I have tried resetting my password but no luck.', date: '2024-05-15 04:20 PM', status: 'read' },
  ])
  const [viewMessageModal, setViewMessageModal] = useState<any>(null)

  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 15 Pro Max', shop: 'Electronics Store', category: 'Electronics', price: 199999, downPayment: 49999, stock: 45, status: 'active', sku: 'IPHONE15PM001', featured: true },
    { id: 2, name: 'Samsung Galaxy S24', shop: 'Tech Solutions', category: 'Electronics', price: 149999, downPayment: 37499, stock: 32, status: 'active', sku: 'SAMS24001', featured: false },
    { id: 3, name: 'Winter Jacket', shop: 'Fashion Hub', category: 'Fashion', price: 8999, downPayment: 2249, stock: 120, status: 'active', sku: 'WINTJACK001', featured: true },
    { id: 4, name: 'Leather Sofa', shop: 'Home Goods', category: 'Home & Garden', price: 45000, downPayment: 11250, stock: 8, status: 'draft', sku: 'LEATHERSOFA001', featured: false },
    { id: 5, name: 'MacBook Pro 16', shop: 'Tech Solutions', category: 'Electronics', price: 349999, downPayment: 87499, stock: 15, status: 'active', sku: 'MACBOOKPRO16', featured: true },
  ])

  const [orders, setOrders] = useState([
    { id: 1, orderId: 'ORD-001', customer: 'John Doe', totalAmount: 199999, monthlyAmount: 66666, duration: 3, paidInstallments: 1, nextDueDate: '2024-06-15', status: 'active' },
    { id: 2, orderId: 'ORD-002', customer: 'Jane Smith', totalAmount: 149999, monthlyAmount: 74999, duration: 2, paidInstallments: 2, nextDueDate: 'Completed', status: 'completed' },
    { id: 3, orderId: 'ORD-003', customer: 'Mike Johnson', totalAmount: 349999, monthlyAmount: 69999, duration: 5, paidInstallments: 2, nextDueDate: '2024-05-25', status: 'overdue' },
    { id: 4, orderId: 'ORD-004', customer: 'Sarah Davis', totalAmount: 45000, monthlyAmount: 15000, duration: 3, paidInstallments: 0, nextDueDate: '2024-06-01', status: 'active' },
  ])

  const [productsSearchTerm, setProductsSearchTerm] = useState('')
  const [productsCategoryFilter, setProductsCategoryFilter] = useState('All Categories')
  const [productsStatusFilter, setProductsStatusFilter] = useState('All Status')
  const [ordersSearchTerm, setOrdersSearchTerm] = useState('')
  const [ordersStatusFilter, setOrdersStatusFilter] = useState('All Status')

  // Analytics data
  const analyticsData = {
    totalProducts: 284,
    totalOrders: 847,
    activeInstallments: 612,
    monthlyRevenue: 8400000,
    weeklyRevenue: 2100000,
    lastWeekRevenue: 1770000,
    salesTrend: [45, 52, 48, 61, 55, 70, 85],
    lastWeekSales: [35, 42, 38, 51, 45, 60, 75],
    orderFulfillment: 94,
    kycApprovalRate: 78,
    customerSatisfaction: 88,
  }

  const statCards = [
    { label: 'Total Products', value: '284', change: '+8%', type: 'up', icon: <ShoppingBag size={24} className="text-green-600" />, color: 'text-green-600', bgColor: 'glass-card-light' },
    { label: 'Orders Received', value: '847', change: '+23%', type: 'up', icon: <ShoppingCart size={24} className="text-blue-600" />, color: 'text-blue-600', bgColor: 'glass-card-blue' },
    { label: 'Active Installments', value: '612', change: '+15%', type: 'up', icon: <FileText size={24} className="text-purple-600" />, color: 'text-purple-600', bgColor: 'glass-card-purple' },
    { label: 'Monthly Revenue', value: 'Rs 8.4M', change: '+26%', type: 'up', icon: <DollarSign size={24} className="text-amber-600" />, color: 'text-amber-600', bgColor: 'glass-card-amber' },
  ]

  const navSections = [
    {
      title: 'MAIN MENU',
      items: [
        { id: PAGES.DASHBOARD, label: 'Dashboard', icon: <BarChart3 size={18} /> },
        { id: PAGES.PRODUCTS, label: 'Products', icon: <ShoppingBag size={18} />, badge: 284 },
        { id: PAGES.ORDERS, label: 'Orders', icon: <ShoppingCart size={18} />, badge: 4 },
        { id: PAGES.INSTALLMENTS, label: 'Installments', icon: <FileText size={18} /> },
	        { id: PAGES.USERS, label: 'Buyers', icon: <Users size={18} /> },
	        { id: PAGES.USER_HISTORY, label: 'User History', icon: <Activity size={18} /> },
        { id: PAGES.ANALYTICS, label: 'Analytics', icon: <Activity size={18} /> },
        { id: PAGES.CONTACT_MESSAGES, label: 'Messages', icon: <MessageSquare size={18} />, badge: contactMessages.filter(m => m.status === 'unread').length },
        { id: PAGES.SETTINGS, label: 'Settings', icon: <Activity size={18} /> },
      ],
    },
    {
      title: 'KYC VERIFICATION',
      items: [
        { id: PAGES.BUYER_KYC, label: 'Buyer KYC', icon: <ShieldCheck size={18} />, badge: userVerifications.filter(v => v.status === 'pending').length },
        { id: PAGES.VENDOR_KYC, label: 'Vendor KYC', icon: <ShieldCheck size={18} />, badge: vendorVerifications.filter(v => v.status === 'pending').length },
      ],
    },
  ]

  // Reusable Chart Components
  const RevenueChart = ({ data }: { data: any[] }) => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: '#94a3b8' }} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: '#94a3b8' }} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
            border: 'none', 
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
        />
        <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
        <Area type="monotone" dataKey="profit" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
      </AreaChart>
    </ResponsiveContainer>
  )

  const DevicePieChart = ({ data }: { data: any[] }) => (
    <ResponsiveContainer width="100%" height={200}>
      <RePieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
            border: 'none', 
            borderRadius: '12px'
          }}
        />
      </RePieChart>
    </ResponsiveContainer>
  )

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', 'true')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  if (!mounted) return null

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0A0E1A] flex items-center justify-center p-4 md:p-8">
        <div className="max-w-md w-full glass-card p-6 md:p-10">
          <div className="flex justify-center mb-8">
            <Logo size={48} />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Admin Sign In</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter your credentials to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Mail size={18} /></div>
                <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="admin@flexiberry.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={18} /></div>
                <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Sign In</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f0f4ff] dark:bg-[#0A0E1A]">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-72 md:w-64 flex flex-col sidebar-bg z-50 transition-transform duration-300 md:translate-x-0 shadow-2xl ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="px-6 py-8 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-blue-600/30 blur-[60px] pointer-events-none" />
          <Logo />
        </div>
        
        <div className="px-4 py-4 mb-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">FA</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">FlexiBerry Admin</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="text-[10px] text-green-500 font-bold">Active · Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-6 relative z-10">
          {navSections.map(section => (
            <div key={section.title}>
              <h3 className="px-4 text-[9px] font-bold text-white/30 uppercase tracking-[0.1em] mb-3">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map(item => (
                  <button 
                    key={item.label} 
                    onClick={() => { setCurrentPage(item.id); setCurrentPageNum(1); setSearchTerm(''); }} 
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${currentPage === item.id ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
                  >
                    {currentPage === item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-blue-600 to-purple-600" />}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${currentPage === item.id ? 'bg-white/15' : 'bg-white/5'}`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${currentPage === item.id ? 'bg-white/25' : 'bg-red-500/80'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 space-y-4 relative z-10">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-indigo-500/25 rounded-2xl p-4 relative overflow-hidden group">
            <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-purple-600/30 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-white mb-2">
              <Zap size={14} className="text-amber-400" fill="currentColor" />
              <span className="text-xs font-bold">Pro Features</span>
            </div>
            <p className="text-[11px] text-white/55 mb-4 leading-relaxed">Unlock advanced analytics, bulk uploads & priority support</p>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all">Upgrade Plan</button>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5 pt-6">
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} min-w-0 overflow-hidden`}>
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0E1A]/80 backdrop-blur-xl h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
              <ShoppingBag size={14} />
              <span>FlexiBerry</span>
              <ChevronRight size={12} />
              <span className="text-gray-900 dark:text-white capitalize">{currentPage.replace('_', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:flex px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 text-[10px] font-bold items-center gap-2 border border-green-100 dark:border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>Live
            </button>
            <button className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blue-600 transition-all border border-gray-100 dark:border-gray-700">
              <Bell size={18} />
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blue-600 transition-all border border-gray-100 dark:border-gray-700">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20 shrink-0">FA</div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
          {/* Dashboard */}
          {currentPage === PAGES.DASHBOARD && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Live Dashboard
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Admin 👋</h1>
                  <p className="text-xs text-gray-400 mt-1">Friday, March 13, 2026 · Here's your store overview</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="Search orders..." className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" />
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
                      <Plus size={16} /> Add Product
                    </button>
                    <button className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 shrink-0">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className={`p-6 rounded-3xl ${card.bgColor} relative overflow-hidden group hover:scale-[1.02] transition-all cursor-default shadow-sm border border-black/5`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-white/80 dark:bg-black/20 flex items-center justify-center shadow-sm`}>
                        {card.icon}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-white/80 dark:bg-black/20 ${card.color}`}>{card.change}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        vs last month <ChevronRight size={10} className="rotate-[-45deg]" />
                      </div>
                      <div className="h-8 w-24">
                        <svg viewBox="0 0 100 30" className="w-full h-full">
                          <path d="M0,25 Q25,10 50,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2" className={card.color} />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sales Overview</h3>
                      <p className="text-[11px] text-gray-400 mt-1 font-medium">Last 7 days performance</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">Rs 2.1M</p>
                        <p className="text-[10px] font-bold text-green-500 flex items-center justify-end gap-1">
                          <TrendingUp size={12} /> +18.4% vs last week
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-100 dark:border-blue-500/20">
                        <Activity size={20} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-64 px-1 md:px-2">
                    <RevenueChart 
                      data={analyticsData.salesTrend.map((val, i) => ({
                        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                        revenue: val,
                        profit: analyticsData.lastWeekSales[i]
                      }))} 
                    />
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">This Week <span className="text-gray-900 dark:text-white ml-1">Rs 2.1M</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-100 dark:bg-blue-900/40"></span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Last Week <span className="text-gray-900 dark:text-white ml-1">Rs 1.77M</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                      <BarChart3 size={14} /> Daily revenue
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="glass-card p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Quick Actions</h3>
                      <Zap size={14} className="text-amber-500" fill="currentColor" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                        <ShoppingBag size={20} />
                        <span className="text-[10px] font-bold">Add Product</span>
                      </button>
                      <button onClick={() => setCurrentPage(PAGES.BUYER_KYC)} className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-bold">Review KYC</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20 transition-all">
                        <Users size={20} />
                        <span className="text-[10px] font-bold">View Buyers</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                        <ShoppingCart size={20} />
                        <span className="text-[10px] font-bold">All Orders</span>
                      </button>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="glass-card p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Performance</h3>
                      <span className="text-[10px] font-bold text-gray-400">This month</span>
                    </div>
                    <div className="space-y-6">
                      {[
                        { label: 'Order Fulfillment', val: 94, color: 'bg-green-500' },
                        { label: 'KYC Approval Rate', val: 78, color: 'bg-blue-500' },
                        { label: 'Customer Satisfaction', val: 88, color: 'bg-purple-500' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full border-2 border-gray-100 dark:border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-900 dark:text-white`}>{item.val}%</div>
                              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{item.label}</span>
                            </div>
                          </div>
                          <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Page */}
          {currentPage === PAGES.PRODUCTS && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Products Management</h1>
                  <p className="text-xs text-gray-400 mt-1">Manage all products across your platform</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      value={productsSearchTerm}
                      onChange={(e) => setProductsSearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                  <select 
                    value={productsCategoryFilter}
                    onChange={(e) => setProductsCategoryFilter(e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home & Garden</option>
                    <option>Sports</option>
                  </select>
                  <select 
                    value={productsStatusFilter}
                    onChange={(e) => setProductsStatusFilter(e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Status</option>
                    <option>active</option>
                    <option>draft</option>
                  </select>
                  <button 
                    onClick={() => setShowAddProductModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shop/Vendor</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Down Payment</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {products
                        .filter(p => 
                          (p.name.toLowerCase().includes(productsSearchTerm.toLowerCase()) || p.shop.toLowerCase().includes(productsSearchTerm.toLowerCase())) &&
                          (productsCategoryFilter === 'All Categories' || p.category === productsCategoryFilter) &&
                          (productsStatusFilter === 'All Status' || p.status === productsStatusFilter)
                        )
                        .map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {product.name.charAt(0)}
                              </div>
                              <div className="text-[11px] font-bold text-gray-900 dark:text-white">{product.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{product.shop}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{product.category}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">Rs {product.price.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">Rs {product.downPayment.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{product.stock}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              product.status === 'active' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-500/10' 
                                : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
                            }`}>
                              {product.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setShowEditProductModal(product)}
                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                                title="Edit"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => setProducts(products.map(p => p.id === product.id ? { ...p, featured: !p.featured } : p))}
                                className={`p-2 rounded-lg transition-all ${
                                  product.featured 
                                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600' 
                                    : 'hover:bg-amber-50 dark:hover:bg-amber-500/10 text-gray-400'
                                }`}
                                title="Toggle Featured"
                              >
                                <Star size={14} fill={product.featured ? 'currentColor' : 'none'} />
                              </button>
                              <button 
                                onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders Page */}
          {currentPage === PAGES.ORDERS && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
                  <p className="text-xs text-gray-400 mt-1">Monitor and manage all customer orders</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search orders..." 
                      value={ordersSearchTerm}
                      onChange={(e) => setOrdersSearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                  <select 
                    value={ordersStatusFilter}
                    onChange={(e) => setOrdersStatusFilter(e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Status</option>
                    <option>active</option>
                    <option>completed</option>
                    <option>overdue</option>
                  </select>
                  <button 
                    onClick={() => setShowAddOrderModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Plus size={16} />
                    Add Order
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Amount</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Monthly Amount</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Paid</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Next Due</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {orders
                        .filter(o => 
                          (o.orderId.toLowerCase().includes(ordersSearchTerm.toLowerCase()) || o.customer.toLowerCase().includes(ordersSearchTerm.toLowerCase())) &&
                          (ordersStatusFilter === 'All Status' || o.status === ordersStatusFilter)
                        )
                        .map((order) => (
                        <tr key={order.id} className={`hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors ${
                          order.status === 'overdue' ? 'bg-red-50/30 dark:bg-red-500/5' : ''
                        }`}>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{order.orderId}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {order.customer.charAt(0)}
                              </div>
                              <div className="text-[11px] font-bold text-gray-900 dark:text-white">{order.customer}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">Rs {order.totalAmount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">Rs {order.monthlyAmount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{order.duration} months</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{order.paidInstallments}/{order.duration}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{order.nextDueDate}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              order.status === 'active' 
                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10' 
                                : order.status === 'completed'
                                ? 'bg-green-100 text-green-600 dark:bg-green-500/10'
                                : 'bg-red-100 text-red-600 dark:bg-red-500/10'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setShowOrderDetailsModal(order)}
                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                                title="View Details"
                              >
                                <Eye size={14} />
                              </button>
                              {order.status === 'active' && (
                                <button 
                                  onClick={() => setOrders(orders.map(o => o.id === order.id ? { ...o, paidInstallments: Math.min(o.paidInstallments + 1, o.duration) } : o))}
                                  className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-500/10 text-green-600 transition-all"
                                  title="Mark as Paid"
                                >
                                  <Check size={14} />
                                </button>
                              )}
                              <button 
                                onClick={() => setOrders(orders.filter(o => o.id !== order.id))}
                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Page */}
          {currentPage === PAGES.ANALYTICS && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                  <p className="text-xs text-gray-400 mt-1">Comprehensive insights into your platform performance</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                    <Download size={16} /> Export Report
                  </button>
                  <select className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold outline-none border-none">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Revenue Chart */}
                  <div className="glass-card p-8 rounded-3xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Growth</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                            <span className="text-[10px] font-bold text-gray-500">Revenue</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                            <span className="text-[10px] font-bold text-gray-500">Profit</span>
                          </div>
                        </div>
                      </div>
                    <div className="h-72">
                      <RevenueChart 
                        data={[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 85, 100].map((val, i) => ({
                          name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
                          revenue: val,
                          profit: val * 0.7
                        }))}
                      />
                    </div>
                  </div>

                  {/* User Activity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-3xl">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">User Acquisition</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Direct', val: 45, color: 'bg-blue-500' },
                          { label: 'Social Media', val: 25, color: 'bg-purple-500' },
                          { label: 'Referral', val: 20, color: 'bg-green-500' },
                          { label: 'Others', val: 10, color: 'bg-amber-500' },
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold text-gray-500">{item.label}</span>
                              <span className="text-[10px] font-bold text-gray-900 dark:text-white">{item.val}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-6 rounded-3xl">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Device Usage</h3>
                      <div className="h-40">
                        <DevicePieChart 
                          data={[
                            { name: 'Mobile', value: 60, color: '#2563eb' },
                            { name: 'Desktop', value: 30, color: '#7c3aed' },
                            { name: 'Tablet', value: 10, color: '#fbbf24' },
                          ]}
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-blue-500">60%</div>
                          <div className="text-[8px] text-gray-400">Mobile</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-purple-500">30%</div>
                          <div className="text-[8px] text-gray-400">Desktop</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-amber-500">10%</div>
                          <div className="text-[8px] text-gray-400">Tablet</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Top Products */}
                  <div className="glass-card p-6 rounded-3xl">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Top Performing Shops</h3>
                    <div className="space-y-6">
                      {shops.map((shop, i) => (
                        <div key={i} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-blue-600 font-bold text-[10px] md:text-xs border border-gray-100 dark:border-gray-700">
                              {shop.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <div className="text-[10px] md:text-[11px] font-bold text-gray-900 dark:text-white truncate">{shop.name}</div>
                              <div className="text-[8px] md:text-[9px] text-gray-400 truncate">{shop.owner}</div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[10px] md:text-[11px] font-bold text-gray-900 dark:text-white">Rs {(shop.revenue / 1000).toFixed(1)}k</div>
                            <div className="text-[8px] md:text-[9px] text-green-500 font-bold">+12%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 text-[10px] font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">View All Shops</button>
                  </div>

                  {/* Recent Activity */}
                  <div className="glass-card p-6 rounded-3xl">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                      {[
                        { user: 'Alex Taylor', action: 'New Order', time: '2 mins ago', icon: <ShoppingCart size={14} />, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-500/10' },
                        { user: 'Emma Wilson', action: 'KYC Verified', time: '15 mins ago', icon: <ShieldCheck size={14} />, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-500/10' },
                        { user: 'John Doe', action: 'Payment Received', time: '1 hour ago', icon: <DollarSign size={14} />, color: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-500/10' },
                        { user: 'Sarah Davis', action: 'Shop Approved', time: '3 hours ago', icon: <Check size={14} />, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-500/10' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <div className={`w-8 h-8 rounded-lg ${item.bgColor} ${item.color} flex items-center justify-center shrink-0`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{item.user} <span className="font-medium text-gray-400">{item.action}</span></div>
                            <div className="text-[9px] text-gray-400 mt-0.5">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Admins Page */}
          {currentPage === PAGES.ADMINS && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Admin Management</h1>
                  <p className="text-xs text-gray-400 mt-1">Manage platform administrators and their permissions</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search admins..." 
                      value={adminSearchTerm}
                      onChange={(e) => setAdminSearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                  <select 
                    value={adminRoleFilter}
                    onChange={(e) => setAdminRoleFilter(e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Roles</option>
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>Manager</option>
                  </select>
                  <select 
                    value={adminStatusFilter}
                    onChange={(e) => setAdminStatusFilter(e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Status</option>
                    <option>active</option>
                    <option>inactive</option>
                  </select>
                  <button 
                    onClick={() => setShowAddAdminModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Plus size={16} />
                    Add Admin
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {admins
                        .filter(admin => {
                          const matchesSearch = admin.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || 
                                              admin.email.toLowerCase().includes(adminSearchTerm.toLowerCase());
                          const matchesRole = adminRoleFilter === 'All Roles' || admin.role === adminRoleFilter;
                          const matchesStatus = adminStatusFilter === 'All Status' || admin.status === adminStatusFilter;
                          return matchesSearch && matchesRole && matchesStatus;
                        })
                        .map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {admin.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-[11px] font-bold text-gray-900 dark:text-white">{admin.name}</div>
                                <div className="text-[9px] text-gray-400">{admin.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{admin.role}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              admin.status === 'active' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-500/10' 
                                : 'bg-red-100 text-red-600 dark:bg-red-500/10'
                            }`}>
                              {admin.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{admin.lastLogin}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setShowEditAdminModal(admin)}
                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this admin?')) {
                                    setAdmins(admins.filter(a => a.id !== admin.id));
                                  }
                                }}
                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* User History Page */}
          {currentPage === PAGES.USER_HISTORY && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">User Recent History</h1>
                  <p className="text-xs text-gray-400 mt-1">Track recent user activities, logins, and purchases</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search user activity..." 
                      value={userHistorySearchTerm}
                      onChange={(e) => setUserHistorySearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Activity</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Details</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {userHistory
                        .filter(history => 
                          history.name.toLowerCase().includes(userHistorySearchTerm.toLowerCase()) || 
                          history.email.toLowerCase().includes(userHistorySearchTerm.toLowerCase()) ||
                          history.activity.toLowerCase().includes(userHistorySearchTerm.toLowerCase()) ||
                          history.details.toLowerCase().includes(userHistorySearchTerm.toLowerCase())
                        )
                        .map((history) => (
                        <tr key={history.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 text-[10px] font-bold">
                                {history.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-[11px] font-bold text-gray-900 dark:text-white">{history.name}</div>
                                <div className="text-[9px] text-gray-400">{history.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              history.activity === 'Purchase' ? 'bg-green-100 text-green-600 dark:bg-green-500/10' :
                              history.activity === 'Login' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10' :
                              history.activity === 'Payment' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10' :
                              'bg-purple-100 text-purple-600 dark:bg-purple-500/10'
                            }`}>
                              {history.activity}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{history.details}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{history.date}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                              <Eye size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Contact Messages Page */}
          {currentPage === PAGES.CONTACT_MESSAGES && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
                  <p className="text-xs text-gray-400 mt-1">Manage and respond to user inquiries</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search messages..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {contactMessages
                        .filter(m => 
                          m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((msg) => (
                        <tr key={msg.id} className={`hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors ${msg.status === 'unread' ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {msg.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-[11px] font-bold text-gray-900 dark:text-white">{msg.name}</div>
                                <div className="text-[9px] text-gray-400">{msg.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{msg.subject}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{msg.message}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{msg.date}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              msg.status === 'read' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-500/10' 
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10'
                            }`}>
                              {msg.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => {
                                  setViewMessageModal(msg);
                                  if (msg.status === 'unread') {
                                    setContactMessages(contactMessages.map(m => m.id === msg.id ? { ...m, status: 'read' } : m));
                                  }
                                }}
                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                                title="View Message"
                              >
                                <Eye size={14} />
                              </button>
                              <button 
                                onClick={() => {
                                  setContactMessages(contactMessages.map(m => 
                                    m.id === msg.id ? { ...m, status: m.status === 'read' ? 'unread' : 'read' } : m
                                  ));
                                }}
                                className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-500/10 text-amber-600 transition-all"
                                title={msg.status === 'read' ? "Mark as Unread" : "Mark as Read"}
                              >
                                {msg.status === 'read' ? <Mail size={14} /> : <Check size={14} />}
                              </button>
                              <button 
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this message?')) {
                                    setContactMessages(contactMessages.filter(m => m.id !== msg.id));
                                  }
                                }}
                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                                title="Delete Message"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Buyer KYC Page */}
          {currentPage === PAGES.BUYER_KYC && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Buyer KYC Verification</h1>
                  <p className="text-xs text-gray-400 mt-1">Review and manage buyer identity verification documents</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search buyers..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buyer Name</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Documents</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Submission Date</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {userVerifications
                        .filter(v => 
                          v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.email.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((verification) => (
                        <tr key={verification.id} className={`hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors ${verification.status === 'pending' ? 'bg-amber-50/30 dark:bg-amber-500/5' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {verification.name.charAt(0)}
                              </div>
                              <div className="text-[11px] font-bold text-gray-900 dark:text-white">{verification.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{verification.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[10px] text-gray-600 dark:text-gray-300">
                              {verification.docs.map((doc, i) => (
                                <div key={i} className="text-[9px] text-gray-500 dark:text-gray-400">• {doc}</div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{verification.date}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              verification.status === 'approved' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-500/10' 
                                : verification.status === 'pending'
                                ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
                                : 'bg-red-100 text-red-600 dark:bg-red-500/10'
                            }`}>
                              {verification.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setViewDocModal({ open: true, item: verification, type: 'user' })}
                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                                title="View Documents"
                              >
                                <Eye size={14} />
                              </button>
                              {verification.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => setUserVerifications(userVerifications.map(v => v.id === verification.id ? { ...v, status: 'approved' } : v))}
                                    className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-500/10 text-green-600 transition-all"
                                    title="Approve"
                                  >
                                    <Check size={14} />
                                  </button>
                                  <button 
                                    onClick={() => setUserVerifications(userVerifications.map(v => v.id === verification.id ? { ...v, status: 'rejected' } : v))}
                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                                    title="Reject"
                                  >
                                    <XCircle size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Vendor KYC Page */}
          {currentPage === PAGES.VENDOR_KYC && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Vendor KYC Verification</h1>
                  <p className="text-xs text-gray-400 mt-1">Review and manage vendor business verification documents</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search vendors..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shop Name</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Documents</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Submission Date</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {vendorVerifications
                        .filter(v => 
                          v.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.owner.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((verification) => (
                        <tr key={verification.id} className={`hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors ${verification.status === 'pending' ? 'bg-amber-50/30 dark:bg-amber-500/5' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {verification.shopName.charAt(0)}
                              </div>
                              <div className="text-[11px] font-bold text-gray-900 dark:text-white">{verification.shopName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{verification.owner}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[10px] text-gray-600 dark:text-gray-300">
                              {verification.docs.map((doc, i) => (
                                <div key={i} className="text-[9px] text-gray-500 dark:text-gray-400">• {doc}</div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{verification.date}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              verification.status === 'approved' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-500/10' 
                                : verification.status === 'pending'
                                ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
                                : 'bg-red-100 text-red-600 dark:bg-red-500/10'
                            }`}>
                              {verification.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setViewDocModal({ open: true, item: verification, type: 'vendor' })}
                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                                title="View Documents"
                              >
                                <Eye size={14} />
                              </button>
                              {verification.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => setVendorVerifications(vendorVerifications.map(v => v.id === verification.id ? { ...v, status: 'approved' } : v))}
                                    className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-500/10 text-green-600 transition-all"
                                    title="Approve"
                                  >
                                    <Check size={14} />
                                  </button>
                                  <button 
                                    onClick={() => setVendorVerifications(vendorVerifications.map(v => v.id === verification.id ? { ...v, status: 'rejected' } : v))}
                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                                    title="Reject"
                                  >
                                    <XCircle size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Buyers Page */}
          {currentPage === PAGES.USERS && (
            <div className="space-y-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Buyers Management</h1>
                  <p className="text-xs text-gray-400 mt-1">Manage and monitor all platform buyers</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search buyers..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" 
                    />
                  </div>
                  <button 
                    onClick={() => setShowAddUserModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                  >
                    <Plus size={16} />
                    Add Buyer
                  </button>
                </div>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buyer Name</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Joined Date</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {users
                        .filter(user => 
                          user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <div className="text-[11px] font-bold text-gray-900 dark:text-white">{user.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{user.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{user.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-500/10' 
                                : 'bg-red-100 text-red-600 dark:bg-red-500/10'
                            }`}>
                              {user.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-[11px] text-gray-500 dark:text-gray-400">{user.joined}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => setShowEditUserModal(user)}
                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                                title="Edit"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this buyer?')) {
                                    setUsers(users.filter(u => u.id !== user.id));
                                  }
                                }}
                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Page */}
          {currentPage === PAGES.SETTINGS && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
                <p className="text-xs text-gray-400 mt-1">Manage platform-wide configuration and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Settings Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* General Settings */}
                  <div className="glass-card p-8 rounded-3xl">
                    <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">⚙️</span>
                        General Settings
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">Configure basic platform information</p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Platform Name</label>
                        <input 
                          type="text" 
                          value={platformSettings.platformName}
                          onChange={(e) => setPlatformSettings({...platformSettings, platformName: e.target.value})}
                          className="w-full mt-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Support Email</label>
                        <input 
                          type="email" 
                          value={platformSettings.supportEmail}
                          onChange={(e) => setPlatformSettings({...platformSettings, supportEmail: e.target.value})}
                          className="w-full mt-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Number</label>
                        <input 
                          type="tel" 
                          value={platformSettings.contactNumber}
                          onChange={(e) => setPlatformSettings({...platformSettings, contactNumber: e.target.value})}
                          className="w-full mt-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Commerce Settings */}
                  <div className="glass-card p-8 rounded-3xl">
                    <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600">💳</span>
                        Commerce Settings
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">Configure payment and commerce options</p>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Commission Rate (%)</label>
                          <input 
                            type="text" 
                            value={platformSettings.commissionRate}
                            onChange={(e) => setPlatformSettings({...platformSettings, commissionRate: e.target.value})}
                            className="w-full mt-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tax Rate (%)</label>
                          <input 
                            type="text" 
                            value={platformSettings.taxRate}
                            onChange={(e) => setPlatformSettings({...platformSettings, taxRate: e.target.value})}
                            className="w-full mt-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Currency</label>
                        <select 
                          value={platformSettings.currency}
                          onChange={(e) => setPlatformSettings({...platformSettings, currency: e.target.value})}
                          className="w-full mt-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>PKR</option>
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                          <option>AED</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="glass-card p-8 rounded-3xl">
                    <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600">🔒</span>
                        Security Settings
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">Configure security and authentication options</p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500 mt-1">Require 2FA for all admin accounts</p>
                        </div>
                        <button 
                          onClick={() => setPlatformSettings({...platformSettings, twoFactorAuth: !platformSettings.twoFactorAuth})}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ${
                            platformSettings.twoFactorAuth 
                              ? 'bg-green-500' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            platformSettings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password Policy</label>
                        <select 
                          className="w-full mt-2 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Strong (12+ chars, mixed case, numbers, symbols)</option>
                          <option>Medium (8+ chars, mixed case, numbers)</option>
                          <option>Basic (6+ chars)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance Settings */}
                  <div className="glass-card p-8 rounded-3xl">
                    <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">🔧</span>
                        Maintenance Settings
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">Configure system maintenance and cache options</p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Maintenance Mode</p>
                          <p className="text-xs text-gray-500 mt-1">Take platform offline for maintenance</p>
                        </div>
                        <button 
                          onClick={() => setPlatformSettings({...platformSettings, maintenanceMode: !platformSettings.maintenanceMode})}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ${
                            platformSettings.maintenanceMode 
                              ? 'bg-red-500' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            platformSettings.maintenanceMode ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <button className="w-full px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-bold hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                        Clear Cache
                      </button>
                    </div>
                  </div>
                </div>

                {/* Settings Sidebar */}
                <div className="space-y-6">
                  {/* Quick Info */}
                  <div className="glass-card p-6 rounded-3xl">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Configuration Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">General Settings</span>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Commerce Settings</span>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Security Settings</span>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Maintenance Settings</span>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    <Save size={16} />
                    Save All Changes
                  </button>

                  {/* Info Box */}
                  <div className="glass-card p-6 rounded-3xl border border-blue-100 dark:border-blue-500/20">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 text-lg">ℹ️</div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">Important</p>
                        <p className="text-xs text-gray-500 mt-1">Changes to security settings will take effect immediately. Please ensure you have proper backup before making critical changes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other pages would go here, following the same pattern */}
          {currentPage !== PAGES.DASHBOARD && currentPage !== PAGES.ANALYTICS && currentPage !== PAGES.CONTACT_MESSAGES && currentPage !== PAGES.BUYER_KYC && currentPage !== PAGES.VENDOR_KYC && currentPage !== PAGES.USERS && currentPage !== PAGES.SETTINGS && (
            <div className="glass-card p-6 md:p-12 rounded-3xl min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6">
                <Activity size={32} className="md:size-10" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white capitalize">{currentPage.replace('_', ' ')} Page</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-2 max-w-md px-4">This page is currently being updated to match the new design system. Please check back soon!</p>
              <button onClick={() => setCurrentPage(PAGES.DASHBOARD)} className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">Back to Dashboard</button>
            </div>
          )}
        </div>
      </main>
      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Admin</h3>
              <button onClick={() => setShowAddAdminModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newAdminData = {
                id: admins.length + 1,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role,
                status: 'active',
                lastLogin: 'Never'
              };
              setAdmins([...admins, newAdminData]);
              setShowAddAdminModal(false);
              setNewAdmin({ name: '', email: '', role: 'Admin' });
            }} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="john@flexiberry.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</label>
                <select 
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
                </select>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Add Admin Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditAdminModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Admin</h3>
              <button onClick={() => setShowEditAdminModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setAdmins(admins.map(a => a.id === showEditAdminModal.id ? showEditAdminModal : a));
              setShowEditAdminModal(null);
            }} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={showEditAdminModal.name}
                  onChange={(e) => setShowEditAdminModal({...showEditAdminModal, name: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={showEditAdminModal.email}
                  onChange={(e) => setShowEditAdminModal({...showEditAdminModal, email: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</label>
                <select 
                  value={showEditAdminModal.role}
                  onChange={(e) => setShowEditAdminModal({...showEditAdminModal, role: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <select 
                  value={showEditAdminModal.status}
                  onChange={(e) => setShowEditAdminModal({...showEditAdminModal, status: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>active</option>
                  <option>inactive</option>
                </select>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Buyer</h3>
              <button onClick={() => setShowAddUserModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newUserData = {
                id: users.length + 1,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                status: newUser.status,
                joined: new Date().toISOString().split('T')[0]
              };
              setUsers([...users, newUserData]);
              setShowAddUserModal(false);
              setNewUser({ name: '', email: '', phone: '', status: 'active' });
            }} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="john@email.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="+1-555-0001"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <select 
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Add Buyer Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Buyer</h3>
              <button onClick={() => setShowEditUserModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setUsers(users.map(u => u.id === showEditUserModal.id ? showEditUserModal : u));
              setShowEditUserModal(null);
            }} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={showEditUserModal.name}
                  onChange={(e) => setShowEditUserModal({...showEditUserModal, name: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={showEditUserModal.email}
                  onChange={(e) => setShowEditUserModal({...showEditUserModal, email: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={showEditUserModal.phone}
                  onChange={(e) => setShowEditUserModal({...showEditUserModal, phone: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <select 
                  value={showEditUserModal.status}
                  onChange={(e) => setShowEditUserModal({...showEditUserModal, status: e.target.value})}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddProductModal || showEditProductModal) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{showEditProductModal ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => { setShowAddProductModal(false); setShowEditProductModal(null); }} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (showEditProductModal) {
                setProducts(products.map(p => p.id === showEditProductModal.id ? showEditProductModal : p));
                setShowEditProductModal(null);
              } else {
                setProducts([...products, { ...newProduct, id: Math.max(...products.map(p => p.id), 0) + 1 }]);
                setNewProduct({ name: '', shop: '', category: '', price: '', downPayment: '', stock: '', status: 'active', sku: '' });
                setShowAddProductModal(false);
              }
            }} className="p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Name</label>
                  <input 
                    type="text" 
                    required
                    value={showEditProductModal ? showEditProductModal.name : newProduct.name}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shop/Vendor</label>
                  <input 
                    type="text" 
                    required
                    value={showEditProductModal ? showEditProductModal.shop : newProduct.shop}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, shop: e.target.value}) : setNewProduct({...newProduct, shop: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</label>
                  <select 
                    required
                    value={showEditProductModal ? showEditProductModal.category : newProduct.category}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, category: e.target.value}) : setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home & Garden</option>
                    <option>Sports</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SKU</label>
                  <input 
                    type="text" 
                    required
                    value={showEditProductModal ? showEditProductModal.sku : newProduct.sku}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, sku: e.target.value}) : setNewProduct({...newProduct, sku: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price (Rs)</label>
                  <input 
                    type="number" 
                    required
                    value={showEditProductModal ? showEditProductModal.price : newProduct.price}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, price: e.target.value}) : setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Down Payment (Rs)</label>
                  <input 
                    type="number" 
                    required
                    value={showEditProductModal ? showEditProductModal.downPayment : newProduct.downPayment}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, downPayment: e.target.value}) : setNewProduct({...newProduct, downPayment: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stock</label>
                  <input 
                    type="number" 
                    required
                    value={showEditProductModal ? showEditProductModal.stock : newProduct.stock}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, stock: e.target.value}) : setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                  <select 
                    value={showEditProductModal ? showEditProductModal.status : newProduct.status}
                    onChange={(e) => showEditProductModal ? setShowEditProductModal({...showEditProductModal, status: e.target.value}) : setNewProduct({...newProduct, status: e.target.value})}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  {showEditProductModal ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetailsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Details</h3>
              <button onClick={() => setShowOrderDetailsModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{showOrderDetailsModal.orderId}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{showOrderDetailsModal.customer}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Amount</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">Rs {showOrderDetailsModal.totalAmount.toLocaleString()}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Monthly Amount</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">Rs {showOrderDetailsModal.monthlyAmount.toLocaleString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{showOrderDetailsModal.duration} months</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Paid Installments</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{showOrderDetailsModal.paidInstallments}/{showOrderDetailsModal.duration}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                      showOrderDetailsModal.status === 'active' 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10' 
                        : showOrderDetailsModal.status === 'completed'
                        ? 'bg-green-100 text-green-600 dark:bg-green-500/10'
                        : 'bg-red-100 text-red-600 dark:bg-red-500/10'
                    }`}>
                      {showOrderDetailsModal.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Next Due Date</label>
                <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{showOrderDetailsModal.nextDueDate}</div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button 
                onClick={() => setShowOrderDetailsModal(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Message Modal */}
      {viewMessageModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Details</h3>
              <button onClick={() => setViewMessageModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">From</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{viewMessageModal.name}</div>
                  <div className="text-xs text-gray-500">{viewMessageModal.email}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</label>
                  <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{viewMessageModal.date}</div>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                <div className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{viewMessageModal.subject}</div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message</label>
                <div className="mt-2 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {viewMessageModal.message}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button 
                onClick={() => setViewMessageModal(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
          </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
