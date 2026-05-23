'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  BarChart3,
  ShoppingBag,
  ShoppingCart,
  FileText,
  TrendingUp,
  Activity,
  Zap,
  ChevronRight,
  Search,
  Plus,
  RefreshCw,
  Users,
  ShieldCheck,
  DollarSign,
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function AdminDashboard() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

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
    {
      label: 'Total Products',
      value: '284',
      change: '+8%',
      type: 'up',
      icon: <ShoppingBag size={24} className="text-green-600" />,
      color: 'text-green-600',
      bgColor: 'glass-card-light',
    },
    {
      label: 'Orders Received',
      value: '847',
      change: '+23%',
      type: 'up',
      icon: <ShoppingCart size={24} className="text-blue-600" />,
      color: 'text-blue-600',
      bgColor: 'glass-card-blue',
    },
    {
      label: 'Active Installments',
      value: '612',
      change: '+15%',
      type: 'up',
      icon: <FileText size={24} className="text-purple-600" />,
      color: 'text-purple-600',
      bgColor: 'glass-card-purple',
    },
    {
      label: 'Monthly Revenue',
      value: 'Rs 8.4M',
      change: '+26%',
      type: 'up',
      icon: <DollarSign size={24} className="text-amber-600" />,
      color: 'text-amber-600',
      bgColor: 'glass-card-amber',
    },
  ]

  // Reusable Chart Components
  const RevenueChart = ({ data }: { data: any[] }) => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
        />
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
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}
          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#2563eb"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorRev)"
        />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#7c3aed"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorProfit)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Live Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, Admin 👋
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Friday, March 13, 2026 · Here's your store overview
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
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

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className={`p-6 rounded-3xl glass-card relative overflow-hidden group hover:scale-[1.02] transition-all cursor-default shadow-sm border border-black/5`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-white/80 dark:bg-black/20 flex items-center justify-center shadow-sm`}>
                {card.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-white/80 dark:bg-black/20 ${card.color}`}>
                  {card.change}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {card.value}
              </h3>
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {card.label}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                vs last month <ChevronRight size={10} className="rotate-[-45deg]" />
              </div>
              <div className="h-8 w-24">
                <svg viewBox="0 0 100 30" className="w-full h-full">
                  <path
                    d="M0,25 Q25,10 50,20 T100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={card.color}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Overview Chart */}
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
                profit: analyticsData.lastWeekSales[i],
              }))}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                  This Week <span className="text-gray-900 dark:text-white ml-1">Rs 2.1M</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-100 dark:bg-blue-900/40"></span>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                  Last Week <span className="text-gray-900 dark:text-white ml-1">Rs 1.77M</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
              <BarChart3 size={14} /> Daily revenue
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Performance */}
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
              <button className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
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

          {/* Performance Metrics */}
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
                      <div className={`w-8 h-8 rounded-full border-2 border-gray-100 dark:border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-900 dark:text-white`}>
                        {item.val}%
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                        {item.label}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
