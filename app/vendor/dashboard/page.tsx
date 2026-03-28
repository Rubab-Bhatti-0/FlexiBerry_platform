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
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FlexiBerryLogo } from '@/components/ui/FlexiBerryLogo';

// Mock vendor data
const initialVendorStats = {
  totalOrders: 128,
  totalRevenue: 2540000,
  activeProducts: 24,
  rating: 4.7,
  pendingOrders: 5,
  monthlyGrowth: 12.5,
  totalCustomers: 89,
};

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

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'shop' | 'settings'>('overview');
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
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'shop', label: 'Shop Profile', icon: Store },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col sticky top-0 h-screen z-40`}>
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
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
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
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
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
                className="pl-10 w-64 bg-slate-50 border-none focus-visible:ring-indigo-500 rounded-xl"
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
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
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
                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                      <ShoppingBag size={24} />
                    </div>
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                      <TrendingUp size={12} /> +{stats.monthlyGrowth}%
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">₨{(stats.totalRevenue / 1000).toLocaleString()}k</h3>
                </Card>

                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <Clock size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">Today</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Pending Orders</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.pendingOrders}</h3>
                </Card>

                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <Package size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">Live</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Active Products</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.activeProducts}</h3>
                </Card>

                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                      <Star size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">Avg.</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Store Rating</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.rating} <span className="text-slate-400 text-lg font-normal">/ 5.0</span></h3>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <Card className="lg:col-span-2 p-6 border-none shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900">Recent Orders</h3>
                    <Button variant="ghost" onClick={() => setActiveTab('orders')} className="text-indigo-600 font-bold text-sm">View All</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-slate-100">
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Order ID</th>
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Customer</th>
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Amount</th>
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                          <th className="pb-4 text-xs font-bold text-slate-400 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4">
                              <span className="text-sm font-bold text-slate-900">{order.orderNumber}</span>
                              <p className="text-[10px] text-slate-400">{order.date}</p>
                            </td>
                            <td className="py-4 text-sm text-slate-600 font-medium">{order.customerName}</td>
                            <td className="py-4 text-sm font-bold text-slate-900">₨{order.total.toLocaleString()}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4">
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

                {/* Quick Actions */}
                <div className="space-y-6">
                  <Card className="p-6 border-none shadow-sm bg-indigo-600 text-white">
                    <h3 className="font-bold text-lg mb-2">Grow Your Sales</h3>
                    <p className="text-indigo-100 text-sm mb-6">Add new products and optimize your listings to reach more customers.</p>
                    <Button 
                      onClick={() => setShowAddProductModal(true)}
                      className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl h-12"
                    >
                      <Plus size={18} className="mr-2" /> Add New Product
                    </Button>
                  </Card>

                  <Card className="p-6 border-none shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <button onClick={() => setActiveTab('shop')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <Store size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-700">View Shop Profile</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                      </button>
                      <button onClick={() => setActiveTab('settings')} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <BarChart3 size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-700">Sales Reports</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 font-bold h-11"
                >
                  <Plus size={18} className="mr-2" /> Add Product
                </Button>
              </div>

              <Card className="border-none shadow-sm overflow-hidden">
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
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-indigo-600 p-2" onClick={() => alert('Edit functionality coming soon')}>
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

              <Card className="border-none shadow-sm overflow-hidden">
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
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-indigo-600" onClick={() => alert(`Viewing details for ${order.orderNumber}`)}>
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-8 border-none shadow-sm space-y-6">
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 font-bold h-12"
                  >
                    <Save size={18} className="mr-2" /> Save Changes
                  </Button>
                </Card>

                <div className="space-y-6">
                  <Card className="p-6 border-none shadow-sm text-center">
                    <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-indigo-200">
                      <Store size={40} />
                    </div>
                    <h4 className="font-bold text-slate-900">Shop Logo</h4>
                    <p className="text-xs text-slate-500 mt-1 mb-4">PNG, JPG up to 5MB</p>
                    <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-600 font-bold" onClick={() => alert('Upload functionality coming soon')}>
                      Upload New
                    </Button>
                  </Card>

                  <Card className="p-6 border-none shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4">Shop Performance</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Trust Score</span>
                        <span className="text-sm font-bold text-emerald-600">98%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[98%]"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Response Rate</span>
                        <span className="text-sm font-bold text-indigo-600">92%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[92%]"></div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Account Settings</h3>
                <p className="text-slate-500">Manage your account preferences and security.</p>
              </div>

              <div className="space-y-6">
                <Card className="p-8 border-none shadow-sm space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Bell size={20} className="text-indigo-600" /> Notifications
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-800">Order Alerts</p>
                          <p className="text-xs text-slate-500">Get notified when a customer places a new order.</p>
                        </div>
                        <div 
                          onClick={() => setSettings({...settings, orderAlerts: !settings.orderAlerts})}
                          className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.orderAlerts ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.orderAlerts ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-800">Stock Alerts</p>
                          <p className="text-xs text-slate-500">Get notified when products are low on stock.</p>
                        </div>
                        <div 
                          onClick={() => setSettings({...settings, stockAlerts: !settings.stockAlerts})}
                          className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.stockAlerts ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.stockAlerts ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 space-y-6">
                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <CreditCard size={20} className="text-indigo-600" /> Payout Settings
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          🏦
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Bank Transfer</p>
                          <p className="text-xs text-slate-500">Ends in 4592</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto text-indigo-600 font-bold" onClick={() => alert('Edit payout method')}>Edit</Button>
                      </div>
                      <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center gap-2 text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => alert('Add payout method')}>
                        <Plus size={18} />
                        <span className="text-sm font-bold">Add Payout Method</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <Card className="w-full max-w-lg p-8 border-none shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Add New Product</h3>
              <button onClick={() => setShowAddProductModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Product Name</label>
                <Input 
                  required 
                  placeholder="e.g. iPhone 15 Pro" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="rounded-xl border-slate-200" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Price (₨)</label>
                  <Input 
                    required 
                    type="number" 
                    placeholder="0.00" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="rounded-xl border-slate-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Stock</label>
                  <Input 
                    required 
                    type="number" 
                    placeholder="0" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="rounded-xl border-slate-200" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">SKU (Optional)</label>
                <Input 
                  placeholder="e.g. PH-IP15-001" 
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  className="rounded-xl border-slate-200" 
                />
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddProductModal(false)} className="flex-1 rounded-xl h-12 font-bold">Cancel</Button>
                <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold">Create Product</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
