'use client'
import React, { useState } from 'react'
import { Search, Eye, Mail, Phone, Check, XCircle } from 'lucide-react'

interface RecoveryRequest {
  id: number
  email: string
  username: string
  method: 'Email' | 'Phone'
  status: 'pending' | 'verified' | 'completed'
  date: string
  expiresAt: string
}

export default function AdminRecovery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [requests] = useState<RecoveryRequest[]>([
    { id: 1, email: 'user@email.com', username: 'user_123', method: 'Email', status: 'pending', date: '2024-01-20', expiresAt: '2024-01-22' },
    { id: 2, email: 'alex@email.com', username: 'alex_profile', method: 'Phone', status: 'verified', date: '2024-01-19', expiresAt: '2024-01-26' },
    { id: 3, email: 'emma@email.com', username: 'emma_store', method: 'Email', status: 'completed', date: '2024-01-18', expiresAt: 'N/A' },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600 dark:bg-green-500/10'
      case 'verified': return 'bg-blue-100 text-blue-600 dark:bg-blue-500/10'
      case 'pending': return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-500/10'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Account Recovery</h1>
          <p className="text-xs text-gray-400 mt-1">Manage password reset and account recovery requests</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">User Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Expires At</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {requests
                .filter(r => r.email.toLowerCase().includes(searchTerm.toLowerCase()) || r.username.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-[11px] font-bold text-gray-900 dark:text-white">{request.username}</div>
                        <div className="text-[9px] text-gray-400">{request.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-300">
                        {request.method === 'Email' ? <Mail size={12} /> : <Phone size={12} />}
                        {request.method}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{request.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{request.expiresAt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${getStatusColor(request.status)}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all">
                          <Eye size={14} />
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-500/10 text-green-600 transition-all">
                              <Check size={14} />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all">
                              <XCircle size={14} />
                            </button>
                          </>
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
