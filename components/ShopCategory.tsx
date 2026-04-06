'use client'

import React from 'react'
import { 
  Smartphone, Laptop, Bike, Wind, Sun, 
  Armchair, Package, Car, Box, ShoppingBag 
} from 'lucide-react'

interface Category {
  id: string
  name: string
  items: number
  icon: React.ElementType
  color: string
  bgColor: string
  iconBg: string
}

const categories: Category[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    items: 0,
    icon: Smartphone,
    color: '#FF3B5C', // From CATEGORY_THEMES.smartphones.primary
    bgColor: '#fff1f2', // From CATEGORY_THEMES.smartphones.bg
    iconBg: '#ffe4e6' // Rose-100
  },
  {
    id: 'laptops',
    name: 'Laptops',
    items: 0,
    icon: Laptop,
    color: '#7C3AED', // From CATEGORY_THEMES.laptops.primary
    bgColor: '#f5f3ff', // From CATEGORY_THEMES.laptops.bg
    iconBg: '#ede9fe' // Violet-100
  },
  {
    id: 'scotty-bikes',
    name: 'Scotty & Bikes',
    items: 1,
    icon: Bike,
    color: '#F97316', // From CATEGORY_THEMES.bikes.primary
    bgColor: '#fff7ed', // From CATEGORY_THEMES.bikes.bg
    iconBg: '#fed7aa' // Orange-100
  },
  {
    id: 'appliances',
    name: 'Appliances',
    items: 2,
    icon: Wind,
    color: '#92400e', // From CATEGORY_THEMES.appliances.primary
    bgColor: '#fffbeb', // From CATEGORY_THEMES.appliances.bg
    iconBg: '#fef3c7' // Amber-100
  },
  {
    id: 'solar-systems',
    name: 'Solar Systems',
    items: 0,
    icon: Sun,
    color: '#EAB308', // From CATEGORY_THEMES.solar.primary
    bgColor: '#fefce8', // From CATEGORY_THEMES.solar.bg
    iconBg: '#fef08a' // Yellow-100
  },
  {
    id: 'furniture',
    name: 'Furniture',
    items: 0,
    icon: Armchair,
    color: '#10B981', // From CATEGORY_THEMES.furniture.primary
    bgColor: '#f0fdfa', // From CATEGORY_THEMES.furniture.bg
    iconBg: '#d1fae5' // Emerald-100
  },
  {
    id: 'jahez-packages',
    name: 'Jahez Packages',
    items: 1,
    icon: Package,
    color: '#EC4899', // From CATEGORY_THEMES.jahez.primary
    bgColor: '#fdf2f8', // From CATEGORY_THEMES.jahez.bg
    iconBg: '#fbcfe8' // Pink-100
  },
  {
    id: 'car-financing',
    name: 'Car Financing',
    items: 0,
    icon: Car,
    color: '#0EA5E9', // From CATEGORY_THEMES.cars.primary
    bgColor: '#ecfeff', // From CATEGORY_THEMES.cars.bg
    iconBg: '#cffafe' // Cyan-100
  },
  {
    id: 'business-stock',
    name: 'Business Stock',
    items: 0,
    icon: Box,
    color: '#84CC16', // From CATEGORY_THEMES.business.primary
    bgColor: '#f7fee7', // From CATEGORY_THEMES.business.bg
    iconBg: '#ecfccb' // Lime-100
  },
  {
    id: 'general-store',
    name: 'General Store',
    items: 0,
    icon: ShoppingBag,
    color: '#0EA5E9', // From CATEGORY_THEMES.general.primary
    bgColor: '#ecfeff', // From CATEGORY_THEMES.general.bg
    iconBg: '#cffafe' // Cyan-100
  }
]

const ShopCategory = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {categories.map((cat) => (
          <div 
            key={cat.id}
            style={{
              backgroundColor: cat.bgColor,
              borderRadius: '24px',
              padding: '24px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: cat.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: cat.color
            }}>
              <cat.icon size={28} strokeWidth={1.5} />
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: cat.color,
              margin: '0 0 4px 0'
            }}>
              {cat.name}
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#94a3b8',
              margin: 0,
              fontWeight: 500
            }}>
              {cat.items} items
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopCategory
