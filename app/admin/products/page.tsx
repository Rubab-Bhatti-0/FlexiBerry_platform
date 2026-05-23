'use client'

import React, { useState } from 'react'
import { Plus, Search, Eye, Edit2, Trash2 } from 'lucide-react'

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('')

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      shop: 'Electronics Store',
      category: 'Electronics',
      price: 199999,
      stock: 45,
      status: 'active',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      shop: 'Tech Solutions',
      category: 'Electronics',
      price: 149999,
      stock: 32,
      status: 'active',
    },
    {
      id: 3,
      name: 'Winter Jacket',
      shop: 'Fashion Hub',
      category: 'Fashion',
      price: 8999,
      stock: 120,
      status: 'active',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-xs text-gray-400 mt-1">Manage all products across the platform</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shop</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {products
                .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">{product.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{product.shop}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{product.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white">Rs {product.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">{product.stock} units</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-lg text-[9px] font-bold bg-green-100 text-green-600 dark:bg-green-500/10">
                        {product.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-all">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-500/10 text-amber-600 transition-all">
                          <Edit2 size={14} />
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
