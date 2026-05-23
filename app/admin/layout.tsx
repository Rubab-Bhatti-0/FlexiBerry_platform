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
    window.dispatchEvent(new Event('storage'))
    router.push('/auth/login')
  }

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ProtectedAdminRoute>
      <div className="flex min-h-screen bg-[#f0f4ff] dark:bg-[#0A0E1A]">
        {/* Red sidebar placeholder */}
        <aside className="fixed top-0 left-0 w-64 h-screen bg-red-600 z-50 flex items-center justify-center text-white text-2xl font-bold">
          SIDEBAR
        </aside>
        
        {/* Sidebar component */}
        <AdminSidebar onLogout={handleLogout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 md:ml-64 transition-all duration-300">
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
