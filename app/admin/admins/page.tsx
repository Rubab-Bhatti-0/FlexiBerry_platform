'use client'

import React, { useState } from 'react'
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react'

interface Admin {
  id: number
  name: string
  email: string
  role: 'Super Admin' | 'Admin' | 'Manager'
  status: 'active' | 'inactive'
  lastLogin: string
}

export default function AdminManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<Admin | null>(null)

  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, name: 'Admin User', email: 'admin@flexiberry.com', role: 'Super Admin', status: 'active', lastLogin: '2024-01-20 14:30' },
    { id: 2, name: 'Support Lead', email: 'support@flexiberry.com', role: 'Admin', status: 'active', lastLogin: '2024-01-20 10:15' },
    { id: 3, name: 'Manager', email: 'manager@flexiberry.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-19 09:00' },
    { id: 4, name: 'Technical Lead', email: 'tech@flexiberry.com', role: 'Admin', status: 'active', lastLogin: '2024-01-18 16:45' },
    { id: 5, name: 'Operations Manager', email: 'ops@flexiberry.com', role: 'Manager', status: 'active', lastLogin: '2024-01-18 11:20' },
  ])

  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' as const })

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-600 dark:bg-green-500/10'
      : 'bg-red-100 text-red-600 dark:bg-red-500/10'
  }

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All Roles' || admin.role === roleFilter
    const matchesStatus = statusFilter === 'All Status' || admin.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    const newAdminData: Admin = {
      id: Math.max(...admins.map(a => a.id), 0) + 1,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role as 'Super Admin' | 'Admin' | 'Manager',
      status: 'active',
      lastLogin: new Date().toLocaleString()
    }
    setAdmins([...admins, newAdminData])
    setNewAdmin({ name: '', email: '', role: 'Admin' })
    setShowAddModal(false)
  }

  const handleEditAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    if (showEditModal) {
      setAdmins(admins.map(a => a.id === showEditModal.id ? showEditModal : a))
      setShowEditModal(null)
    }
  }

  const handleDeleteAdmin = (id: number) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      setAdmins(admins.filter(a => a.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Admin Management</h1>
          <p className="text-xs text-gray-400 mt-1">Manage platform administrators and their permissions</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Roles</option>
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Manager</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Status</option>
            <option>active</option>
            <option>inactive</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <Plus size={16} />
            Add Admin
          </button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-900 dark:text-white">{admin.name}</div>
                        <div className="text-[9px] text-gray-400">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px] font-bold text-gray-900 dark:text-white">{admin.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${getStatusColor(admin.status)}`}>
                      {admin.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{admin.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowEditModal(admin)}
                        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                      >
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

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Admin</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAdmin} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@flexiberry.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Add Admin Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Admin</h3>
              <button onClick={() => setShowEditModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditAdmin} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={showEditModal.name}
                  onChange={(e) => setShowEditModal({ ...showEditModal, name: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={showEditModal.email}
                  onChange={(e) => setShowEditModal({ ...showEditModal, email: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</label>
                <select
                  value={showEditModal.role}
                  onChange={(e) => setShowEditModal({ ...showEditModal, role: e.target.value as 'Super Admin' | 'Admin' | 'Manager' })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Admin</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                <select
                  value={showEditModal.status}
                  onChange={(e) => setShowEditModal({ ...showEditModal, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
