'use client'

import React, { useState } from 'react'
import { Search, Eye, Check, XCircle } from 'lucide-react'

export default function AdminBuyerKYC() {
  const [searchTerm, setSearchTerm] = useState('')

  const verifications = [
    {
      id: 1,
      name: 'Alex Taylor',
      email: 'alex@email.com',
      docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'],
      status: 'pending',
      date: '2024-01-21',
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma@email.com',
      docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'],
      status: 'approved',
      date: '2024-01-19',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-600 dark:bg-green-500/10'
      case 'pending':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
      case 'rejected':
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Buyer KYC Verification</h1>
          <p className="text-xs text-gray-400 mt-1">Review and manage buyer identity verification documents</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search buyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Verifications Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buyer Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Submission Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {verifications
                .filter((v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.email.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((verification) => (
                  <tr
                    key={verification.id}
                    className={`hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors ${
                      verification.status === 'pending' ? 'bg-amber-50/30 dark:bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                          {verification.name.charAt(0)}
                        </div>
                        <div className="text-[11px] font-bold text-gray-900 dark:text-white">{verification.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{verification.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] text-gray-600 dark:text-gray-300">
                        {verification.docs.map((doc, i) => (
                          <div key={i} className="text-[9px] text-gray-500 dark:text-gray-400">
                            • {doc}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{verification.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${getStatusColor(verification.status)}`}>
                        {verification.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all">
                          <Eye size={14} />
                        </button>
                        {verification.status === 'pending' && (
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
