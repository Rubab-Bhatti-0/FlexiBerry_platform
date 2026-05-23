'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  PieChart as PieChartIcon,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
  Activity,
  BarChart3,
  PieChart as PieChartIconLucide,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
} from 'lucide-react';

// Enhanced mock data with time series
const mockAdminStats = {
  totalUsers: 1240,
  totalVendors: 85,
  totalOrders: 3456,
  totalRevenue: 15750000,
  pendingVerifications: 12,
  activeTickets: 8,
  userGrowth: 8.5,
  orderGrowth: 12.3,
  revenueGrowth: 15.7,
};

const revenueData = [
  { date: 'Mar 1', revenue: 1200000, target: 1000000 },
  { date: 'Mar 5', revenue: 1800000, target: 1200000 },
  { date: 'Mar 10', revenue: 2400000, target: 1500000 },
  { date: 'Mar 15', revenue: 3100000, target: 2000000 },
  { date: 'Mar 20', revenue: 2800000, target: 1800000 },
  { date: 'Mar 25', revenue: 3500000, target: 2200000 },
  { date: 'Mar 30', revenue: 4750000, target: 3000000 },
];

const orderStatusData = [
  { status: 'Pending', count: 234, fill: '#f59e0b' },
  { status: 'Confirmed', count: 567, fill: '#3b82f6' },
  { status: 'Shipped', count: 892, fill: '#8b5cf6' },
  { status: 'Delivered', count: 1763, fill: '#10b981' },
];

const categoryPerformance = [
  { category: 'Electronics', sales: 4200, revenue: 8400000 },
  { category: 'Furniture', sales: 2100, revenue: 3150000 },
  { category: 'Clothing', sales: 1800, revenue: 1800000 },
  { category: 'Home', sales: 1200, revenue: 2400000 },
  { category: 'Sports', sales: 856, revenue: 1000000 },
];

const vendorPerformance = [
  { id: '1', name: 'ElectroHub', sales: 456, rating: 4.8, growth: 12.5 },
  { id: '2', name: 'FurniMax', sales: 234, rating: 4.6, growth: 8.3 },
  { id: '3', name: 'Fashion Hub', sales: 189, rating: 4.5, growth: 5.2 },
  { id: '4', name: 'HomeStyle', sales: 156, rating: 4.7, growth: 10.1 },
  { id: '5', name: 'SportGear', sales: 123, rating: 4.4, growth: 3.8 },
];

const mockPendingVendors = [
  {
    id: '1',
    name: 'ElectroHub Electronics',
    owner: 'Ali Ahmed',
    category: 'Electronics',
    verified: false,
    registeredDate: '2024-03-10',
  },
  {
    id: '2',
    name: 'FurniMax Furniture',
    owner: 'Sarah Khan',
    category: 'Furniture',
    verified: false,
    registeredDate: '2024-03-12',
  },
];

const mockSupportTickets = [
  {
    id: '1',
    subject: 'Product quality complaint',
    priority: 'high',
    status: 'open',
    created: '2024-03-16',
    customer: 'Ahmed Hassan',
  },
  {
    id: '2',
    subject: 'Payment issue on order',
    priority: 'urgent',
    status: 'in_progress',
    created: '2024-03-15',
    customer: 'Fatima Khan',
  },
  {
    id: '3',
    subject: 'Delivery delay assistance',
    priority: 'medium',
    status: 'open',
    created: '2024-03-14',
    customer: 'Muhammad Ali',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'high':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'in_progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'resolved':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'vendors' | 'support'>('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                FlexiBerry Admin
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600">Super Admin</span>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/10 via-blue-600/10 to-purple-600/10 py-8 px-4 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Administration Panel</h1>
          <p className="text-slate-600 font-medium">Monitor and manage the platform in real-time</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl">
                <Users className="text-blue-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +{mockAdminStats.userGrowth}%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Users</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{mockAdminStats.totalUsers.toLocaleString()}</h3>
          </Card>

          {/* Total Vendors Card */}
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl">
                <Store className="text-purple-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +5.2%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Vendors</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{mockAdminStats.totalVendors}</h3>
          </Card>

          {/* Total Orders Card */}
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl">
                <ShoppingCart className="text-amber-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +{mockAdminStats.orderGrowth}%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Orders</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">{mockAdminStats.totalOrders.toLocaleString()}</h3>
          </Card>

          {/* Total Revenue Card */}
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl">
                <DollarSign className="text-emerald-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +{mockAdminStats.revenueGrowth}%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">₨{(mockAdminStats.totalRevenue / 1000000).toFixed(1)}M</h3>
          </Card>
        </div>

        {/* Alert Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-200 rounded-2xl">
                <AlertCircle className="text-orange-700" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600">Pending Verifications</p>
                <h3 className="text-2xl font-bold text-orange-700">{mockAdminStats.pendingVerifications}</h3>
              </div>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">Action</Button>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-200 rounded-2xl">
                <Clock className="text-red-700" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600">Active Support Tickets</p>
                <h3 className="text-2xl font-bold text-red-700">{mockAdminStats.activeTickets}</h3>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">Manage</Button>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-8">
            {(['overview', 'analytics', 'vendors', 'support'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 border-b-2 transition font-semibold capitalize text-sm ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
                View All Users
              </Button>
              <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
                Manage Vendors
              </Button>
              <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
                Verify Documents
              </Button>
              <Button variant="outline" className="w-full h-12 border-slate-200 hover:bg-slate-50">
                Platform Settings
              </Button>
            </div>

            {/* Pending Vendors */}
            <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-slate-900">Pending Vendor Verifications</h2>
                <Link href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">View All →</Link>
              </div>

              <div className="space-y-4">
                {mockPendingVendors.map(vendor => (
                  <div key={vendor.id} className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                    <div className="grid md:grid-cols-5 gap-4 items-center mb-4">
                      <div>
                        <p className="font-semibold text-slate-900">{vendor.name}</p>
                        <p className="text-slate-600 text-sm">Owner: {vendor.owner}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-1">Category</p>
                        <p className="font-medium text-slate-900">{vendor.category}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-sm mb-1">Registered</p>
                        <p className="font-medium text-slate-900">{vendor.registeredDate}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          vendor.verified
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {vendor.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          Verify
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-200">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Orders Table */}
            <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-slate-900">Recent Orders</h2>
                <Link href="#" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold">View All →</Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 text-slate-600 font-semibold">Order ID</th>
                      <th className="text-left py-3 text-slate-600 font-semibold">Customer</th>
                      <th className="text-right py-3 text-slate-600 font-semibold">Amount</th>
                      <th className="text-center py-3 text-slate-600 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'FLX-001234', customer: 'Ahmed Hassan', amount: 130000, status: 'delivered' },
                      { id: 'FLX-001235', customer: 'Fatima Khan', amount: 85000, status: 'shipped' },
                      { id: 'FLX-001236', customer: 'Muhammad Ali', amount: 45000, status: 'confirmed' },
                    ].map(order => (
                      <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                        <td className="py-3 font-mono text-slate-900">{order.id}</td>
                        <td className="py-3 text-slate-900">{order.customer}</td>
                        <td className="py-3 text-right font-semibold text-slate-900">₨{order.amount.toLocaleString()}</td>
                        <td className="py-3 text-center">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold border capitalize bg-blue-50 text-blue-700 border-blue-200">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Time Range Filter */}
            <div className="flex gap-4">
              {(['week', 'month', 'year'] as const).map(range => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? 'bg-indigo-600' : 'border-slate-200'}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="border-slate-200 ml-auto">
                <Download size={16} className="mr-2" /> Export
              </Button>
            </div>

            {/* Revenue Chart */}
            <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
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
                    formatter={(value) => `₨${(value / 1000000).toFixed(1)}M`}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRevenue)" name="Actual Revenue" />
                  <Area type="monotone" dataKey="target" stroke="#94a3b8" fillOpacity={0.1} fill="#94a3b8" name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Order Status & Category Performance */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Status Distribution */}
              <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Order Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} orders`} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Category Performance */}
              <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Category Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      formatter={(value) => `₨${(value / 1000000).toFixed(1)}M`}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#4f46e5" radius={[8, 8, 0, 0]} name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Vendor Performance Leaderboard */}
            <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Top Vendor Performance</h3>
              <div className="space-y-4">
                {vendorPerformance.map((vendor, index) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-transparent rounded-lg border border-slate-200 hover:border-indigo-200 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{vendor.name}</p>
                        <p className="text-sm text-slate-600">{vendor.sales} sales</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Rating</p>
                        <p className="font-bold text-slate-900">{vendor.rating}/5.0</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Growth</p>
                        <p className="font-bold text-emerald-600 flex items-center gap-1">
                          <TrendingUp size={14} /> +{vendor.growth}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-slate-900">Manage Vendors</h2>
              <Button variant="outline" className="border-slate-200">Export List</Button>
            </div>

            <div className="space-y-4">
              {mockPendingVendors.map(vendor => (
                <Card key={vendor.id} className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition">
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    <div>
                      <p className="font-serif font-bold text-slate-900">{vendor.name}</p>
                      <p className="text-slate-600 text-sm">Owner: {vendor.owner}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Category</p>
                      <p className="font-bold text-slate-900">{vendor.category}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Registered</p>
                      <p className="font-medium text-slate-900">{vendor.registeredDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        vendor.verified
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {vendor.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" className="border-slate-200">View</Button>
                      <Button size="sm" variant="outline" className="border-slate-200">Edit</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Support Tickets</h2>

            <div className="space-y-4">
              {mockSupportTickets.map(ticket => (
                <Card key={ticket.id} className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{ticket.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm">From: {ticket.customer} • {ticket.created}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Reply</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
