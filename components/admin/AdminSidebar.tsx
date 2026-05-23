'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  BarChart3,
  ShoppingBag,
  ShoppingCart,
  FileText,
  Users,
  Activity,
  MessageSquare,
  Settings,
  ShieldCheck,
  LogOut,
  Zap,
  RefreshCw,
} from 'lucide-react'
import { Logo } from '@/components/logo'

interface AdminSidebarProps {
  onLogout: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AdminSidebar({ onLogout, sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  const navSections = [
    {
      title: 'MAIN MENU',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} />, href: '/admin/dashboard' },
        { id: 'products', label: 'Products', icon: <ShoppingBag size={18} />, href: '/admin/products' },
        { id: 'orders', label: 'Orders', icon: <ShoppingCart size={18} />, href: '/admin/orders' },
        { id: 'installments', label: 'Installments', icon: <FileText size={18} />, href: '/admin/installments' },
        { id: 'admins', label: 'Admin Management', icon: <Users size={18} />, href: '/admin/admins' },
        { id: 'buyers', label: 'Buyers', icon: <Users size={18} />, href: '/admin/buyers' },
        { id: 'users', label: 'All Users', icon: <Users size={18} />, href: '/admin/users' },
        { id: 'user-history', label: 'User History', icon: <Activity size={18} />, href: '/admin/user-history' },
        { id: 'recovery', label: 'Account Recovery', icon: <RefreshCw size={18} />, href: '/admin/recovery' },
        { id: 'analytics', label: 'Analytics', icon: <Activity size={18} />, href: '/admin/analytics' },
        { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} />, href: '/admin/messages' },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} />, href: '/admin/settings' },
      ],
    },
    {
      title: 'KYC VERIFICATION',
      items: [
        { id: 'buyer-kyc', label: 'Buyer KYC', icon: <ShieldCheck size={18} />, href: '/admin/kyc/buyer' },
        { id: 'vendor-kyc', label: 'Vendor KYC', icon: <ShieldCheck size={18} />, href: '/admin/kyc/vendor' },
      ],
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 md:w-64 flex flex-col sidebar-bg z-50 transition-transform duration-300 shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="px-6 py-8 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-blue-600/30 blur-[60px] pointer-events-none" />
          <Logo />
        </div>

        {/* User Info Card */}
        <div className="px-4 py-4 mb-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              FA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">FlexiBerry Admin</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="text-[10px] text-green-500 font-bold">Active · Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 space-y-6 relative z-10">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="px-4 text-[9px] font-bold text-white/30 uppercase tracking-[0.1em] mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                        active ? 'sidebar-item-active' : 'sidebar-item-inactive'
                      }`}
                    >
                      {active && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-blue-600 to-purple-600" />
                      )}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                            active ? 'bg-white/15' : 'bg-white/5'
                          }`}
                        >
                          {item.icon}
                        </div>
                        {item.label}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="p-4 space-y-4 relative z-10">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-indigo-500/25 rounded-2xl p-4 relative overflow-hidden group">
            <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-purple-600/30 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-white mb-2">
              <Zap size={14} className="text-amber-400" fill="currentColor" />
              <span className="text-xs font-bold">Pro Features</span>
            </div>
            <p className="text-[11px] text-white/55 mb-4 leading-relaxed">
              Unlock advanced analytics, bulk uploads & priority support
            </p>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              Upgrade Plan
            </button>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5 pt-6"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 md:hidden p-3 rounded-xl bg-blue-600 text-white shadow-lg z-40 hover:bg-blue-700 transition-colors"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  )
}
