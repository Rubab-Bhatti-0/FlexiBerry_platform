'use client'

import React, { useState } from 'react'
import { Search, Eye, AlertCircle } from 'lucide-react'

export default function AdminInstallments() {
  const [searchTerm, setSearchTerm] = useState('')

  const installments = [
    {
      id: 1,
      order: 'ORD-001',
      customer: 'John Doe',
      amount: 1200,
      plan: '3 x 400',
      paid: 1,
      total: 3,
      nextDue: '2024-02-15',
      status: 'active',
    },
    {
      id: 2,
      order: 'ORD-002',
      customer: 'Jane Smith',
      amount: 850,
      plan: '2 x 425',
      paid: 2,
      total: 2,
      nextDue: 'Completed',
      status: 'completed',
    },
    {
      id: 3,
      order: 'ORD-003',
      customer: 'Mike Johnson',
      amount: 2500,
      plan: '5 x 500',
      paid: 2,
      total: 5,
      nextDue: '2024-01-25',
      status: 'overdue',
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Installments</h1>
          <p className="text-xs text-gray-400 mt-1">Monitor and manage installment plans</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search installments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Installments Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Next Due</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {installments
                .filter((i) => i.order.toLowerCase().includes(searchTerm.toLowerCase()) || i.customer.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((installment) => (
                  <tr
                    key={installment.id}
                    className={`hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors ${
                      installment.status === 'overdue' ? 'bg-red-50/30 dark:bg-red-500/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">{installment.order}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{installment.customer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">Rs {installment.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{installment.plan}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">
                        {installment.paid}/{installment.total}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{installment.nextDue}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${getStatusColor(installment.status)}`}>
                        {installment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all">
                          <Eye size={14} />
                        </button>
                        {installment.status === 'overdue' && (
                          <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all">
                            <AlertCircle size={14} />
                          </button>
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
  )
}
