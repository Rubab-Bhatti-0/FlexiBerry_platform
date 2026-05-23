import React from 'react'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">F</span>
      </div>
      <span className="font-bold text-slate-900 dark:text-white text-lg hidden sm:inline">
        FlexiBerry
      </span>
    </div>
  )
}
