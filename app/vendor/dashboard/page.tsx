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
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FlexiBerryLogo } from '@/components/ui/FlexiBerryLogo';

// Mock vendor data
const mockVendorStats = {
  totalOrders: 128,
  totalRevenue: 2540000,
  activeProducts: 24,
  rating: 4.7,
  pendingOrders: 5,
  monthlyGrowth: 12.5,
  totalCustomers: 89,
};

const mockProducts = [
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

const mockOrders = [
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
        <div className="p-6 flex items-center gap-3">
          <FlexiBerryLogo size={32} />
          {sidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-900">FlexiBerry</span>}
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
                placeholder="Search orders, products..." 
                className="pl-10 w-64 bg-slate-50 border-none focus-visible:ring-indigo-500 rounded-xl"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
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
                      <TrendingUp size={12} /> +{mockVendorStats.monthlyGrowth}%
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">₨{(mockVendorStats.totalRevenue / 1000).toLocaleString()}k</h3>
                </Card>

                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <Clock size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
                      Today
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Pending Orders</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{mockVendorStats.pendingOrders}</h3>
                </Card>

                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <Package size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
                      Live
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Active Products</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{mockVendorStats.activeProducts}</h3>
                </Card>

                <Card className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                      <Star size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
                      Avg.
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Store Rating</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{mockVendorStats.rating} <span className="text-slate-400 text-lg font-normal">/ 5.0</span></h3>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <Card className="lg:col-span-2 p-6 border-none shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                          <th className="pb-4">Order ID</th>
                          <th className="pb-4">Customer</th>
                          <th className="pb-4">Product</th>
                          <th className="pb-4">Amount</th>
                          <th className="pb-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="text-sm">
                            <td className="py-4 font-mono text-slate-600">#{order.orderNumber}</td>
                            <td className="py-4 font-semibold text-slate-900">{order.customerName}</td>
                            <td className="py-4 text-slate-600">{order.product}</td>
                            <td className="py-4 font-bold text-slate-900">₨{order.total.toLocaleString()}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Top Products */}
                <Card className="p-6 border-none shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Top Selling Products</h3>
                  <div className="space-y-6">
                    {mockProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.sales} sales</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">₨{product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-8 rounded-xl border-slate-200 text-slate-600 font-bold" onClick={() => setActiveTab('products')}>
                    Manage Inventory
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Product Inventory</h3>
                  <p className="text-slate-500">You have {mockVendorStats.activeProducts} active products in your shop.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 font-bold h-12 shadow-lg shadow-indigo-100">
                  <Plus size={20} className="mr-2" /> Add New Product
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {mockProducts.map((product) => (
                  <Card key={product.id} className="p-4 border-none shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-bold text-slate-900">{product.name}</h4>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase ${getStatusColor(product.status)}`}>
                            {product.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">SKU: {product.sku}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pr-4">
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Price</p>
                          <p className="text-sm font-bold text-slate-900">₨{product.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Stock</p>
                          <p className={`text-sm font-bold ${product.stock > 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                            {product.stock} units
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Sales</p>
                          <p className="text-sm font-bold text-slate-900">{product.sales}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Rating</p>
                          <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                            <Star size={14} fill="currentColor" /> {product.rating}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 lg:border-l lg:pl-6 border-slate-100">
                        <Button variant="outline" size="icon" className="rounded-xl border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200">
                          <Edit size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200">
                          <Trash2 size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl border-slate-200 text-slate-400">
                          <MoreVertical size={18} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Orders Management</h3>
                  <p className="text-slate-500">Track and manage your customer orders.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-bold">
                    Export CSV
                  </Button>
                </div>
              </div>

              <Card className="border-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Order Details</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">#{order.orderNumber}</p>
                            <p className="text-xs text-slate-500">{order.product}</p>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-700">{order.customerName}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900">₨{order.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50 rounded-lg">
                              View Details
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

          {/* Shop Tab */}
          {activeTab === 'shop' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Shop Profile</h3>
                <p className="text-slate-500">Control how your shop appears to customers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-2 p-8 border-none shadow-sm space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Shop Name</label>
                      <Input defaultValue="ElectroHub Official" className="rounded-xl border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Contact Email</label>
                      <Input defaultValue="contact@electrohub.pk" className="rounded-xl border-slate-200" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Shop Description</label>
                    <textarea 
                      className="w-full h-32 rounded-xl border border-slate-200 p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      defaultValue="Pakistan's leading electronics retailer offering premium products on easy installment plans. We specialize in home appliances, smartphones, and IT equipment."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Shop Location</label>
                    <Input defaultValue="Gulberg III, Lahore, Pakistan" className="rounded-xl border-slate-200" />
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 font-bold h-12">
                    Save Changes
                  </Button>
                </Card>

                <div className="space-y-6">
                  <Card className="p-6 border-none shadow-sm text-center">
                    <div className="w-24 h-24 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-indigo-200">
                      <Store size={40} />
                    </div>
                    <h4 className="font-bold text-slate-900">Shop Logo</h4>
                    <p className="text-xs text-slate-500 mt-1 mb-4">PNG, JPG up to 5MB</p>
                    <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-600 font-bold">
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
                        <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-800">Stock Alerts</p>
                          <p className="text-xs text-slate-500">Get notified when products are low on stock.</p>
                        </div>
                        <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
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
                        <Button variant="ghost" size="sm" className="ml-auto text-indigo-600 font-bold">Edit</Button>
                      </div>
                      <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center gap-2 text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
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
    </div>
  );
}
