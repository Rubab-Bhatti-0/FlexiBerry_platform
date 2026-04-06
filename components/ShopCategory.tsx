'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Smartphone, Laptop, Bike, Wind, Sun, 
  Armchair, Package, Car, Box, ShoppingBag 
} from 'lucide-react'
import { CATEGORY_THEMES } from '@/components/ui/carousel'

interface Category {
  id: string
  name: string
  slug: string
  icon: React.ElementType
}

const categories: Category[] = [
  { id: 'smartphones', name: 'Smartphones', slug: 'smartphones', icon: Smartphone },
  { id: 'laptops', name: 'Laptops', slug: 'laptops', icon: Laptop },
  { id: 'bikes', name: 'Scotty & Bikes', slug: 'bikes', icon: Bike },
  { id: 'appliances', name: 'Appliances', slug: 'appliances', icon: Wind },
  { id: 'solar', name: 'Solar Systems', slug: 'solar', icon: Sun },
  { id: 'furniture', name: 'Furniture', slug: 'furniture', icon: Armchair },
  { id: 'jahez', name: 'Jahez Packages', slug: 'jahez', icon: Package },
  { id: 'cars', name: 'Car Financing', slug: 'cars', icon: Car },
  { id: 'business', name: 'Business Stock', slug: 'business', icon: Box },
  { id: 'general', name: 'General Store', slug: 'general', icon: ShoppingBag }
]

const ShopCategory = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {categories.map((cat) => {
          const theme = CATEGORY_THEMES[cat.slug] || CATEGORY_THEMES.general
          
          // Generate light icon background from primary color
          const iconBgColor = `${theme.primary}15`
          
          return (
            <Link 
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div 
                style={{
                  backgroundColor: theme.bg,
                  borderRadius: '24px',
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  border: `1.5px solid ${theme.primary}1a`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-6px) scale(1.02)'
                  el.style.boxShadow = `0 16px 32px ${theme.primary}26`
                  el.style.borderColor = `${theme.primary}33`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0) scale(1)'
                  el.style.boxShadow = 'none'
                  el.style.borderColor = `${theme.primary}1a`
                }}
              >
                {/* Accent glow blob */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-30%',
                    right: '-20%',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: theme.primary,
                    opacity: theme.glowOp * 0.5,
                    filter: 'blur(50px)',
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Icon container */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  backgroundColor: iconBgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: theme.primary,
                  border: `1.5px solid ${theme.primary}2a`,
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.3s ease'
                }}>
                  <cat.icon size={32} strokeWidth={1.5} />
                </div>
                
                {/* Category name */}
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: theme.primary,
                  margin: '0 0 4px 0',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {cat.name}
                </h3>
                
                {/* Accent line */}
                <div 
                  style={{
                    height: '2px',
                    width: '24px',
                    background: theme.primary,
                    borderRadius: '1px',
                    margin: '8px 0 0 0',
                    opacity: 0.3,
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ShopCategory
