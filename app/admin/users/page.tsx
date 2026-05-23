'use client'
import React, { useState } from 'react'
import { Search, Eye, Edit2, Trash2, Plus, X, Mail, Phone, Calendar } from 'lucide-react'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  role: 'buyer' | 'seller' | 'admin' | 'super_admin'
  status: 'active' | 'inactive' | 'banned'
  created_at: string
}

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<User | null>(null)
  const [showViewModal, setShowViewModal] = useState<User | null>(null)

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      first_name: 'Alex',
      last_name: 'Taylor',
      email: 'alex@email.com',
      phone: '+1-555-0001',
      role: 'buyer',
      status: 'active',
      created_at: '2024-01-10',
    },
    {
      id: '2',
      first_name: 'Emma',
      last_name: 'Wilson',
      email: 'emma@email.com',
      phone: '+1-555-0002',
      role: 'buyer',
      status: 'active',
      created_at: '2024-01-12',
    },
    {
      id: '3',
      first_name: 'David',
      last_name: 'Brown',
      email: 'david@email.com',
      phone: '+1-555-0003',
      role: 'seller',
      status: 'inactive',
      created_at: '2024-01-08',
    },
    {
      id: '4',
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@flexiberry.com',
      role: 'super_admin',
      status: 'active',
      created_at: '2024-01-01',
    }
  ])

  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: 'buyer' as const,
    status: 'active' as const,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600 dark:bg-green-500/10'
      case 'inactive': return 'bg-amber-100 text-amber-600 dark:bg-amber-500/10'
      case 'banned': return 'bg-red-100 text-red-600 dark:bg-red-500/10'
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-500/10'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-600 dark:bg-purple-500/10'
      case 'admin': return 'bg-blue-100 text-blue-600 dark:bg-blue-500/10'
      case 'seller': return 'bg-orange-100 text-orange-600 dark:bg-orange-500/10'
      case 'buyer': return 'bg-green-100 text-green-600 dark:bg-green-500/10'
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-500/10'
    }
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: newUser.status,
      created_at: new Date().toISOString().split('T')[0],
    }
    setUsers([...users, user])
    setShowAddModal(false)
    setNewUser({ first_name: '', last_name: '', email: '', phone: '', role: 'buyer', status: 'active' })
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!showEditModal) return
    setUsers(users.map(u => u.id === showEditModal.id ? showEditModal : u))
    setShowEditModal(null)
  }

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-xs text-gray-400 mt-1">Manage all platform users including buyers, sellers, and admins</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
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
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
          >
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                        {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-gray-900 dark:text-white">{user.first_name} {user.last_name}</div>
                        <div className="text-[9px] text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-bold ${getStatusColor(user.status)}`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{user.created_at}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowViewModal(user)}
                        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => setShowEditModal(user)}
                        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-all"
                        title="Delete"
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New User</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1-555-0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value as any })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit User</h3>
              <button onClick={() => setShowEditModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditUser} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    required
                    value={showEditModal.first_name}
                    onChange={(e) => setShowEditModal({ ...showEditModal, first_name: e.target.value })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    required
                    value={showEditModal.last_name}
                    onChange={(e) => setShowEditModal({ ...showEditModal, last_name: e.target.value })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={showEditModal.phone || ''}
                  onChange={(e) => setShowEditModal({ ...showEditModal, phone: e.target.value })}
                  className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Role</label>
                  <select
                    value={showEditModal.role}
                    onChange={(e) => setShowEditModal({ ...showEditModal, role: e.target.value as any })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</label>
                  <select
                    value={showEditModal.status}
                    onChange={(e) => setShowEditModal({ ...showEditModal, status: e.target.value as any })}
                    className="w-full mt-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="banned">Banned</option>
                  </select>
                </div>
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

      {/* View User Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Details</h3>
              <button onClick={() => setShowViewModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {showViewModal.first_name.charAt(0)}{showViewModal.last_name.charAt(0)}
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{showViewModal.first_name} {showViewModal.last_name}</div>
                  <span className={`inline-block px-2 py-1 rounded-lg text-[9px] font-bold ${getRoleColor(showViewModal.role)}`}>
                    {showViewModal.role.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Email</div>
                    <div className="text-sm text-gray-900 dark:text-white">{showViewModal.email}</div>
                  </div>
                </div>
                {showViewModal.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400" />
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase">Phone</div>
                      <div className="text-sm text-gray-900 dark:text-white">{showViewModal.phone}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Joined</div>
                    <div className="text-sm text-gray-900 dark:text-white">{showViewModal.created_at}</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Status</div>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${getStatusColor(showViewModal.status)}`}>
                  {showViewModal.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
