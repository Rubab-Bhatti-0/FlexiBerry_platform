'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Moon, Sun, Menu, ChevronRight, ShoppingBag } from 'lucide-react'
import { useTheme } from 'next-themes'

interface AdminNavbarProps {
  onMenuToggle: () => void
}

export function AdminNavbar({ onMenuToggle }: AdminNavbarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Extract page name from pathname
  const getPageName = () => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length <= 1) return 'Dashboard'

    const lastSegment = segments[segments.length - 1]
    return lastSegment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0E1A]/80 backdrop-blur-xl h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-100 dark:border-white/5">
      {/* Left Section - Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
          <ShoppingBag size={14} />
          <span>FlexiBerry</span>
          <ChevronRight size={12} />
          <span className="text-gray-900 dark:text-white">{getPageName()}</span>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Live Status Badge */}
        <button className="hidden sm:flex px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 text-[10px] font-bold items-center gap-2 border border-green-100 dark:border-green-500/20">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          Live
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blue-600 transition-all border border-gray-100 dark:border-gray-700">
          <Bell size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blue-600 transition-all border border-gray-100 dark:border-gray-700"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20 shrink-0">
          FA
        </div>
      </div>
    </header>
  )
}
