'use client'

import React, { useState } from 'react'
import { Search, Eye, Mail, Check, Trash2 } from 'lucide-react'

export default function AdminMessages() {
  const [searchTerm, setSearchTerm] = useState('')

  const messages = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Inquiry about products',
      message: 'I would like to know more about your electronics section...',
      date: '2024-05-18 10:30 AM',
      status: 'unread',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Shipping delay',
      message: 'My order #12345 has been delayed for 3 days...',
      date: '2024-05-17 02:15 PM',
      status: 'read',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      subject: 'Partnership opportunity',
      message: 'We are interested in a vendor partnership...',
      date: '2024-05-16 09:45 AM',
      status: 'unread',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-xs text-gray-400 mt-1">Manage contact messages and inquiries</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">From</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {messages
                .filter(
                  (m) =>
                    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors ${
                      msg.status === 'unread' ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                          {msg.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-gray-900 dark:text-white">{msg.name}</div>
                          <div className="text-[9px] text-gray-400">{msg.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">{msg.subject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{msg.message}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{msg.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold ${
                          msg.status === 'read'
                            ? 'bg-green-100 text-green-600 dark:bg-green-500/10'
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10'
                        }`}
                      >
                        {msg.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-500/10 text-amber-600 transition-all">
                          <Mail size={14} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-500/10 text-green-600 transition-all">
                          <Check size={14} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all">
                          <Trash2 size={14} />
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
