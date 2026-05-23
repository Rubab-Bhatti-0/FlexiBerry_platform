'use client'

import React, { useState } from 'react'
import { Search, Eye, Download } from 'lucide-react'

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('')

  const orders = [
    {
      id: 1,
      orderId: 'ORD-001',
      customer: 'John Doe',
      totalAmount: 199999,
      status: 'active',
      date: '2024-06-01',
    },
    {
      id: 2,
      orderId: 'ORD-002',
      customer: 'Jane Smith',
      totalAmount: 149999,
      status: 'completed',
      date: '2024-05-28',
    },
    {
      id: 3,
      orderId: 'ORD-003',
      customer: 'Mike Johnson',
      totalAmount: 349999,
      status: 'overdue',
      date: '2024-05-25',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-500/10'
      case 'completed':
        return 'bg-green-100 text-green-600 dark:bg-green-500/10'
      case 'overdue':
        return 'bg-red-100 text-red-600 dark:bg-red-500/10'
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-500/10'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-xs text-gray-400 mt-1">View and manage all orders</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {orders
                .filter((o) => o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">{order.orderId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{order.customer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">Rs {order.totalAmount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{order.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all">
                          <Eye size={14} />
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
  )
}
