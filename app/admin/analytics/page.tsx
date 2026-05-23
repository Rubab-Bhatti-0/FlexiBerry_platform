'use client';

import { useState } from 'react';
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
  ComposedChart,
  ScatterChart,
  Scatter,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  Heart,
  ShoppingBag,
  Zap,
  BarChart3,
} from 'lucide-react';

// Comprehensive analytics data
const monthlyRevenueData = [
  { month: 'Jan', revenue: 12500000, orders: 245, customers: 189 },
  { month: 'Feb', revenue: 14800000, orders: 312, customers: 234 },
  { month: 'Mar', revenue: 18200000, orders: 385, customers: 298 },
  { month: 'Apr', revenue: 16900000, orders: 356, customers: 267 },
  { month: 'May', revenue: 21300000, orders: 421, customers: 315 },
  { month: 'Jun', revenue: 19700000, orders: 398, customers: 289 },
];

const categoryData = [
  { name: 'Electronics', value: 8400000, orders: 1240, growth: 15.3 },
  { name: 'Furniture', value: 3150000, orders: 456, growth: 8.2 },
  { name: 'Clothing', value: 1800000, orders: 380, growth: 5.1 },
  { name: 'Home & Garden', value: 2400000, orders: 312, growth: 12.7 },
];

const vendorRankingData = [
  { vendor: 'ElectroHub', sales: 4560, revenue: 8400000, rating: 4.8, growth: 12.5 },
  { vendor: 'FurniMax', sales: 2340, revenue: 3150000, rating: 4.6, growth: 8.3 },
  { vendor: 'Fashion Hub', sales: 1890, revenue: 1800000, rating: 4.5, growth: 5.2 },
  { vendor: 'HomeStyle', sales: 1560, revenue: 2400000, rating: 4.7, growth: 10.1 },
  { vendor: 'SportGear', sales: 1230, revenue: 1500000, rating: 4.4, growth: 3.8 },
];

const userBehaviorData = [
  { hour: '00:00', visits: 120, conversions: 8, bounce: 45 },
  { hour: '04:00', visits: 85, conversions: 5, bounce: 52 },
  { hour: '08:00', visits: 340, conversions: 28, bounce: 38 },
  { hour: '12:00', visits: 520, conversions: 42, bounce: 32 },
  { hour: '16:00', visits: 610, conversions: 51, bounce: 28 },
  { hour: '20:00', visits: 480, conversions: 39, bounce: 35 },
];

const conversionFunnelData = [
  { stage: 'Visitors', value: 10000, percentage: 100 },
  { stage: 'Product Views', value: 7200, percentage: 72 },
  { stage: 'Add to Cart', value: 2880, percentage: 40 },
  { stage: 'Checkout', value: 1440, percentage: 20 },
  { stage: 'Purchase', value: 1008, percentage: 14 },
];

const COLORS = ['#4f46e5', '#7c3aed', '#06b6d4', '#f59e0b', '#ef4444'];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">Platform Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Comprehensive insights and performance metrics</p>
      </div>
      {/* Time Range Filter */}
        <div className="flex gap-4 mb-8">
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
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl">
                <DollarSign className="text-emerald-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +15.7%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">₨15.75M</h3>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl">
                <ShoppingCart className="text-blue-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +12.3%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Orders</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">3,456</h3>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl">
                <Users className="text-purple-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +8.5%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Active Users</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">1,240</h3>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl">
                <Zap className="text-amber-600" size={24} />
              </div>
              <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> +3.2%
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Conversion Rate</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">3.2%</h3>
          </Card>
        </div>

        {/* Revenue Trend */}
        <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue & Orders Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyRevenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="orders" fill="#a78bfa" radius={[8, 8, 0, 0]} name="Orders" />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} name="Revenue (₨)" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Performance & Vendor Rankings */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Category Performance */}
          <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Category Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => `₨${(value / 1000000).toFixed(1)}M`}
                />
                <Legend />
                <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution Pie */}
          <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₨${(value / 1000000).toFixed(1)}M`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₨${(value / 1000000).toFixed(1)}M`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* User Behavior & Conversion Funnel */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* User Behavior by Hour */}
          <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">User Behavior by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={userBehaviorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="visits" fill="#a78bfa" radius={[8, 8, 0, 0]} name="Visits" />
                <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          {/* Conversion Funnel */}
          <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Conversion Funnel</h3>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{stage.stage}</span>
                    <span className="text-sm text-slate-600">{stage.value.toLocaleString()} ({stage.percentage}%)</span>
                  </div>
                  <div className="w-full h-8 bg-slate-200 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg transition-all"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Vendors */}
        <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Top Performing Vendors</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-slate-600 font-semibold">Vendor</th>
                  <th className="text-right py-3 text-slate-600 font-semibold">Sales</th>
                  <th className="text-right py-3 text-slate-600 font-semibold">Revenue</th>
                  <th className="text-center py-3 text-slate-600 font-semibold">Rating</th>
                  <th className="text-right py-3 text-slate-600 font-semibold">Growth</th>
                </tr>
              </thead>
              <tbody>
                {vendorRankingData.map((vendor, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                    <td className="py-3 font-semibold text-slate-900">{vendor.vendor}</td>
                    <td className="py-3 text-right text-slate-900">{vendor.sales.toLocaleString()}</td>
                    <td className="py-3 text-right font-semibold text-slate-900">₨{(vendor.revenue / 1000000).toFixed(1)}M</td>
                    <td className="py-3 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        {vendor.rating}/5.0
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="flex items-center justify-end gap-1 text-emerald-600 font-semibold">
                        <TrendingUp size={14} /> +{vendor.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Additional Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Eye className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Total Page Views</p>
                <h3 className="text-2xl font-bold text-slate-900">245.8K</h3>
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-semibold">↑ 18.2% from last month</p>
          </Card>

          <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-2xl">
                <Heart className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Wishlist Adds</p>
                <h3 className="text-2xl font-bold text-slate-900">12.3K</h3>
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-semibold">↑ 9.5% from last month</p>
          </Card>

          <Card className="p-6 border-0 shadow-lg bg-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <ShoppingBag className="text-rose-600" size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">Avg Order Value</p>
                <h3 className="text-2xl font-bold text-slate-900">₨4.6K</h3>
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-semibold">↑ 5.3% from last month</p>
          </Card>
        </div>
      </div>
    )
  )
}
