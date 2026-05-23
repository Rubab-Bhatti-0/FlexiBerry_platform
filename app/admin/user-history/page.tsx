'use client'

import React, { useState } from 'react'
import { Search, Eye } from 'lucide-react'

export default function AdminUserHistory() {
  const [searchTerm, setSearchTerm] = useState('')

  const history = [
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', activity: 'Login', details: 'Logged in from Chrome on Windows', date: '2024-05-19 09:15 AM' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', activity: 'Purchase', details: 'Purchased iPhone 15 Pro Max - Installment Plan', date: '2024-05-19 08:30 AM' },
    { id: 3, name: 'David Brown', email: 'david@email.com', activity: 'KYC Update', details: 'Uploaded new bank statement', date: '2024-05-18 04:45 PM' },
    { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', activity: 'Login', details: 'Logged in from Safari on iPhone', date: '2024-05-18 02:10 PM' },
    { id: 5, name: 'James Wilson', email: 'james@email.com', activity: 'Payment', details: 'Paid 1st installment for Order #ORD-772', date: '2024-05-18 11:00 AM' },
    { id: 6, name: 'Sarah Miller', email: 'sarah@email.com', activity: 'Account Created', details: 'New user registration completed', date: '2024-05-17 05:30 PM' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* History Table */}
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
              {history
                .filter((h) => 
                  h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  h.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  h.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  h.details.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 text-[10px] font-bold">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-gray-900 dark:text-white">{item.name}</div>
                          <div className="text-[9px] text-gray-400">{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                        item.activity === 'Purchase' ? 'bg-green-100 text-green-600 dark:bg-green-500/10' :
                        item.activity === 'Login' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10' :
                        item.activity === 'Payment' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10' :
                        'bg-purple-100 text-purple-600 dark:bg-purple-500/10'
                      }`}>
                        {item.activity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{item.details}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{item.date}</div>
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
  )
}
