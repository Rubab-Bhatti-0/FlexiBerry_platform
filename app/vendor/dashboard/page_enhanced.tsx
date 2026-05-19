'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Bell, 
  ChevronRight, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Store,
  CreditCard,
  BarChart3,
  ExternalLink,
  Edit,
  Trash2,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Image as ImageIcon,
  Save,
  TrendingDown,
  Activity,
  Eye,
  ShoppingCart as ShoppingCartIcon,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FlexiBerryLogo } from '@/components/ui/FlexiBerryLogo';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

// Enhanced mock vendor data
const initialVendorStats = {
  totalOrders: 128,
  totalRevenue: 2540000,
  activeProducts: 24,
  rating: 4.7,
  pendingOrders: 5,
  monthlyGrowth: 12.5,
  totalCustomers: 89,
  conversionRate: 3.2,
  avgOrderValue: 19844,
  repeatCustomers: 34,
};

// Revenue trend data
const revenueData = [
  { date: 'Mar 1', revenue: 85000, orders: 4 },
  { date: 'Mar 5', revenue: 120000, orders: 6 },
  { date: 'Mar 10', revenue: 180000, orders: 9 },
  { date: 'Mar 15', revenue: 250000, orders: 12 },
  { date: 'Mar 20', revenue: 210000, orders: 10 },
  { date: 'Mar 25', revenue: 320000, orders: 16 },
  { date: 'Mar 30', revenue: 395000, orders: 20 },
];

// Product performance data
const productPerformance = [
  { name: 'Samsung 55" TV', sales: 42, revenue: 1890000, views: 1240 },
  { name: 'Dell Laptop Stand', sales: 89, revenue: 489500, views: 2150 },
  { name: 'LG 32" Monitor', sales: 15, revenue: 420000, views: 890 },
];

// Customer demographics
const customerDemographics = [
  { city: 'Lahore', customers: 35, percentage: 39 },
  { city: 'Karachi', customers: 28, percentage: 31 },
  { city: 'Islamabad', customers: 15, percentage: 17 },
  { city: 'Others', customers: 11, percentage: 13 },
];

// Inventory forecast
const inventoryForecast = [
  { product: 'Samsung 55" TV', current: 8, forecast: 3, daysLeft: 5 },
  { product: 'Dell Laptop Stand', current: 45, forecast: 12, daysLeft: 18 },
  { product: 'LG 32" Monitor', current: 0, forecast: 0, daysLeft: 0 },
];

const initialProducts = [
  {
    id: '1',
    name: 'Samsung 55" Smart TV',
    sku: 'TV-SS-55-001',
    price: 45000,
    stock: 8,
    sales: 42,
    rating: 4.8,
    status: 'active',
    image: '/assets/carousel-5.jpg'
  },
  {
    id: '2',
    name: 'LG 32" Monitor',
    sku: 'MON-LG-32-001',
    price: 28000,
    stock: 0,
    sales: 15,
    rating: 4.5,
    status: 'out_of_stock',
    image: '/assets/carousel-2.jpg'
  },
  {
    id: '3',
    name: 'Dell Laptop Stand',
    sku: 'STAND-DL-001',
    price: 5500,
    stock: 45,
    sales: 89,
    rating: 4.9,
    status: 'active',
    image: '/assets/carousel-2.jpg'
  },
];

const initialOrders = [
  {
    id: '1',
    orderNumber: 'FLX-001230',
    customerName: 'Ali Khan',
    product: 'Samsung 55" Smart TV',
    total: 45000,
    status: 'confirmed',
    date: '2024-03-15',
  },
  {
    id: '2',
    orderNumber: 'FLX-001231',
    customerName: 'Fatima Hassan',
    product: 'Dell Laptop Stand',
    total: 5500,
    status: 'shipped',
    date: '2024-03-14',
  },
  {
    id: '3',
    orderNumber: 'FLX-001232',
    customerName: 'Muhammad Ahmed',
    product: 'Samsung 55" Smart TV',
    total: 45000,
    status: 'delivered',
    date: '2024-03-10',
  },
  {
    id: '4',
    orderNumber: 'FLX-001233',
    customerName: 'Sarah Williams',
    product: 'LG 32" Monitor',
    total: 28000,
    status: 'pending',
    date: '2024-03-16',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
    case 'delivered':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'shipped':
    case 'confirmed':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'out_of_stock':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export default function VendorDashboardPageEnhanced() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'products' | 'orders' | 'shop' | 'settings'>('overview');
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [stats, setStats] = useState(initialVendorStats);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', sku: '', category: 'Electronics' });
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [shopInfo, setShopInfo] = useState({
    name: 'ElectroHub Pakistan',
    email: 'contact@electrohub.pk',
    description: "Pakistan's leading electronics retailer offering premium products on easy installment plans. We specialize in home appliances, smartphones, and IT equipment.",
    location: 'Gulberg III, Lahore, Pakistan'
  });
  const [settings, setSettings] = useState({
    orderAlerts: true,
    stockAlerts: false
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      setStats({ ...stats, activeProducts: stats.activeProducts - 1 });
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      sku: newProduct.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      sales: 0,
      rating: 0,
      status: parseInt(newProduct.stock) > 0 ? 'active' : 'out_of_stock',
      image: '/assets/carousel-1.jpg'
    };
    setProducts([productToAdd, ...products]);
    setStats({ ...stats, activeProducts: stats.activeProducts + 1 });
    setShowAddProductModal(false);
    setNewProduct({ name: '', price: '', stock: '', sku: '', category: 'Electronics' });
  };

  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleSaveShopInfo = () => {
    alert('Shop information updated successfully!');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'shop', label: 'Shop Profile', icon: Store },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white/50 backdrop-blur-xl border-r border-slate-200/50 transition-all duration-300 flex flex-col sticky top-0 h-screen z-40`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FlexiBerryLogo size={32} />
            {sidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-900">FlexiBerry</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
            <ChevronRight className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-semibold text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 bg-white/50 backdrop-blur-xl border-b border-slate-200/50 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder={`Search ${activeTab}...`} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
              />
            </div>
            <button 
              onClick={() => { setNotifications(0); alert('Notifications cleared'); }}
              className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user?.firstName || 'Vendor'} {user?.lastName || ''}</p>
                <p className="text-xs text-slate-500">Verified Seller</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 flex items-center justify-center font-bold">
                {user?.firstName?.[0] || 'V'}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 rounded-2xl">
                      <DollarSign size={24} />
                    </div>
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                      <TrendingUp size={12} /> +{stats.monthlyGrowth}%
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">₨{(stats.totalRevenue / 1000).toLocaleString()}k</h3>
                </Card>

                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 rounded-2xl">
                      <Clock size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">Today</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Pending Orders</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.pendingOrders}</h3>
                </Card>

                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 rounded-2xl">
                      <Package size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">Live</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Active Products</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.activeProducts}</h3>
                </Card>

                <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 rounded-2xl">
                      <Star size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">Avg.</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Store Rating</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.rating} <span className="text-slate-400 text-lg font-normal">/ 5.0</span></h3>
                </Card>
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Total Orders</p>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.totalOrders}</h3>
                    </div>
                    <ShoppingCartIcon className="text-indigo-600" size={32} />
                  </div>
                </Card>

                <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Total Customers</p>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.totalCustomers}</h3>
                    </div>
                    <Users className="text-purple-600" size={32} />
                  </div>
                </Card>

                <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Avg Order Value</p>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">₨{(stats.avgOrderValue / 1000).toFixed(0)}k</h3>
                    </div>
                    <CreditCard className="text-emerald-600" size={32} />
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <Card className="lg:col-span-2 p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Recent Orders</h3>
                    <Button variant="ghost" onClick={() => setActiveTab('orders')} className="text-indigo-600 font-bold text-sm">View All →</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-slate-100">
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Order ID</th>
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Customer</th>
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Amount</th>
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4">
                              <span className="text-sm font-bold text-slate-900">{order.orderNumber}</span>
                            </td>
                            <td className="py-4 text-sm text-slate-600 font-medium">{order.customerName}</td>
                            <td className="py-4 text-sm font-bold text-slate-900">₨{order.total.toLocaleString()}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-6">
                  <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
                    <h3 className="font-bold text-lg mb-2">Grow Your Sales</h3>
                    <p className="text-indigo-100 text-sm mb-6">Add new products and optimize your listings to reach more customers.</p>
                    <Button 
                      onClick={() => setShowAddProductModal(true)}
                      className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl h-12"
                    >
                      <Plus size={18} className="mr-2" /> Add New Product
                    </Button>
                  </Card>

                  <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <button onClick={() => setActiveTab('analytics')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <BarChart3 size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-700">View Analytics</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                      </button>
                      <button onClick={() => setActiveTab('shop')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <Store size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-700">Shop Profile</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Revenue Trend Chart */}
              <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      formatter={(value) => `₨${(value / 1000).toFixed(0)}k`}
                    />
                    <Legend />
                    <Bar dataKey="orders" fill="#a78bfa" radius={[8, 8, 0, 0]} name="Orders" />
                    <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} name="Revenue" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>

              {/* Product Performance & Customer Demographics */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Top Products */}
                <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Top Products</h3>
                  <div className="space-y-4">
                    {productPerformance.map((product, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-slate-50 to-transparent rounded-lg border border-slate-200 hover:border-indigo-200 transition">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <span className="text-sm font-bold text-indigo-600">{product.sales} sales</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex gap-4">
                            <span className="text-slate-600">Revenue: ₨{(product.revenue / 1000).toFixed(0)}k</span>
                            <span className="text-slate-600">Views: {product.views}</span>
                          </div>
                          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-600 to-blue-600" style={{ width: `${(product.sales / 100) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Customer Demographics */}
                <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Customer Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={customerDemographics}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ city, percentage }) => `${city}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="customers"
                      >
                        {customerDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#4f46e5', '#7c3aed', '#06b6d4', '#f59e0b'][index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} customers`} />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Inventory Forecast */}
              <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Inventory Forecast</h3>
                <div className="space-y-4">
                  {inventoryForecast.map((item, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg hover:border-indigo-200 transition">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-slate-900">{item.product}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.daysLeft === 0 ? 'bg-red-50 text-red-700' :
                          item.daysLeft < 10 ? 'bg-orange-50 text-orange-700' :
                          'bg-emerald-50 text-emerald-700'
                        }`}>
                          {item.daysLeft === 0 ? 'Out of Stock' : `${item.daysLeft} days left`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Current: {item.current} units</span>
                        <span className="text-slate-600">Forecast: {item.forecast} units</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">My Products</h3>
                  <p className="text-slate-500">Manage your inventory and product listings.</p>
                </div>
                <Button 
                  onClick={() => setShowAddProductModal(true)}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl px-6 font-bold h-11"
                >
                  <Plus size={18} className="mr-2" /> Add Product
                </Button>
              </div>

              <Card className="border-0 shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Product</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">SKU</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Price</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Stock</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Sales</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="group hover:bg-slate-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</p>
                                <div className="flex items-center gap-1 text-amber-500">
                                  <Star size={10} fill="currentColor" />
                                  <span className="text-[10px] font-bold">{product.rating}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 font-medium">{product.sku}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">₨{product.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`text-sm font-bold ${product.stock === 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-medium">{product.sales}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(product.status)}`}>
                              {product.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-indigo-600 p-2">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-rose-600 p-2" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Order Management</h3>
                <p className="text-slate-500">Track and process your customer orders.</p>
              </div>

              <Card className="border-0 shadow-lg overflow-hidden bg-white/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-slate-50/50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Order Details</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Customer</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Product</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Total</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="group hover:bg-slate-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">{order.orderNumber}</p>
                            <p className="text-xs text-slate-400">{order.date}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-medium">{order.customerName}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-medium line-clamp-1">{order.product}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">₨{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <select 
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider outline-none cursor-pointer ${getStatusColor(order.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-indigo-600">
                              <ExternalLink size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Shop Profile Tab */}
          {activeTab === 'shop' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Shop Profile</h3>
                <p className="text-slate-500">Manage your public shop information and branding.</p>
              </div>

              <Card className="p-8 border-0 shadow-lg bg-white/50 backdrop-blur-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Shop Name</label>
                    <Input 
                      value={shopInfo.name} 
                      onChange={(e) => setShopInfo({...shopInfo, name: e.target.value})}
                      className="rounded-xl border-slate-200" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Contact Email</label>
                    <Input 
                      value={shopInfo.email} 
                      onChange={(e) => setShopInfo({...shopInfo, email: e.target.value})}
                      className="rounded-xl border-slate-200" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Shop Description</label>
                  <textarea 
                    className="w-full h-32 rounded-xl border border-slate-200 p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={shopInfo.description}
                    onChange={(e) => setShopInfo({...shopInfo, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Shop Location</label>
                  <Input 
                    value={shopInfo.location} 
                    onChange={(e) => setShopInfo({...shopInfo, location: e.target.value})}
                    className="rounded-xl border-slate-200" 
                  />
                </div>
                <Button 
                  onClick={handleSaveShopInfo}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl px-8 font-bold h-12"
                >
                  <Save size={18} className="mr-2" /> Save Changes
                </Button>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Settings</h3>
                <p className="text-slate-500">Manage your preferences and notifications.</p>
              </div>

              <Card className="p-8 border-0 shadow-lg bg-white/50 backdrop-blur-sm space-y-6">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Order Alerts</p>
                    <p className="text-sm text-slate-600">Receive notifications for new orders</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={settings.orderAlerts}
                    onChange={(e) => setSettings({...settings, orderAlerts: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Stock Alerts</p>
                    <p className="text-sm text-slate-600">Get notified when stock is running low</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={settings.stockAlerts}
                    onChange={(e) => setSettings({...settings, stockAlerts: e.target.checked})}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
