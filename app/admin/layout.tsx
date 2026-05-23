'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminNavbar } from '@/components/admin/AdminNavbar'
import { ProtectedAdminRoute } from '@/components/admin/ProtectedAdminRoute'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    // Dispatch storage event for other tabs
    window.dispatchEvent(new Event('storage'))
    router.push('/auth/login')
  }

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex min-h-screen bg-[#f0f4ff] dark:bg-[#0A0E1A]">
        {/* Sidebar */}
        <AdminSidebar onLogout={handleLogout} />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} min-w-0 overflow-hidden`}>
          {/* Navbar */}
          <AdminNavbar onMenuToggle={handleMenuToggle} />

          {/* Page Content */}
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedAdminRoute>
  )
}
