'use client'

import React from 'react'
import { BarChart3, ShoppingBag, ShoppingCart, FileText, TrendingUp, Activity } from 'lucide-react'

export default function AdminDashboard() {
  const statCards = [
    {
      label: 'Total Products',
      value: '284',
      change: '+8%',
      icon: <ShoppingBag size={24} className="text-green-600" />,
      color: 'text-green-600',
    },
    {
      label: 'Orders Received',
      value: '847',
      change: '+23%',
      icon: <ShoppingCart size={24} className="text-blue-600" />,
      color: 'text-blue-600',
    },
    {
      label: 'Active Installments',
      value: '612',
      change: '+15%',
      icon: <FileText size={24} className="text-purple-600" />,
      color: 'text-purple-600',
    },
    {
      label: 'Monthly Revenue',
      value: 'Rs 8.4M',
      change: '+26%',
      icon: <Activity size={24} className="text-amber-600" />,
      color: 'text-amber-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Live Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Admin 👋</h1>
          <p className="text-xs text-gray-400 mt-1">Friday, March 13, 2026 · Here's your store overview</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl glass-card relative overflow-hidden group hover:scale-[1.02] transition-all cursor-default shadow-sm border border-black/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-black/20 flex items-center justify-center shadow-sm">
                {card.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-white/80 dark:bg-black/20 ${card.color}`}>
                  {card.change}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {card.label}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                vs last month
              </div>
              <TrendingUp size={14} className={card.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Content Placeholder */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Content</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Full dashboard implementation with charts and detailed analytics will be added in the next phase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
