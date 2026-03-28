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
    color: '#b91c1c', // Red-700
    bgColor: '#fff1f2', // Rose-50
    iconBg: '#ffe4e6' // Rose-100
  },
  {
    id: 'laptops',
    name: 'Laptops',
    items: 0,
    icon: Laptop,
    color: '#6d28d9', // Violet-700
    bgColor: '#f5f3ff', // Violet-50
    iconBg: '#ede9fe' // Violet-100
  },
  {
    id: 'scotty-bikes',
    name: 'Scotty & Bikes',
    items: 1,
    icon: Bike,
    color: '#92400e', // Amber-800
    bgColor: '#fffbeb', // Amber-50
    iconBg: '#fef3c7' // Amber-100
  },
  {
    id: 'appliances',
    name: 'Appliances',
    items: 2,
    icon: Wind,
    color: '#b91c1c', // Red-700
    bgColor: '#fff1f2', // Rose-50
    iconBg: '#ffe4e6' // Rose-100
  },
  {
    id: 'solar-systems',
    name: 'Solar Systems',
    items: 0,
    icon: Sun,
    color: '#92400e', // Amber-800
    bgColor: '#fffbeb', // Amber-50
    iconBg: '#fef3c7' // Amber-100
  },
  {
    id: 'furniture',
    name: 'Furniture',
    items: 0,
    icon: Armchair,
    color: '#065f46', // Emerald-800
    bgColor: '#f0fdf4', // Emerald-50
    iconBg: '#dcfce7' // Emerald-100
  },
  {
    id: 'jahez-packages',
    name: 'Jahez Packages',
    items: 1,
    icon: Package,
    color: '#9d174d', // Pink-700
    bgColor: '#fdf2f8', // Pink-50
    iconBg: '#fce7f3' // Pink-100
  },
  {
    id: 'car-financing',
    name: 'Car Financing',
    items: 0,
    icon: Car,
    color: '#1e40af', // Blue-800
    bgColor: '#eff6ff', // Blue-50
    iconBg: '#dbeafe' // Blue-100
  },
  {
    id: 'business-stock',
    name: 'Business Stock',
    items: 0,
    icon: Box,
    color: '#3f6212', // Lime-800
    bgColor: '#f7fee7', // Lime-50
    iconBg: '#ecfccb' // Lime-100
  },
  {
    id: 'general-store',
    name: 'General Store',
    items: 0,
    icon: ShoppingBag,
    color: '#1e40af', // Blue-800
    bgColor: '#eff6ff', // Blue-50
    iconBg: '#dbeafe' // Blue-100
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
