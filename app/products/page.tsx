'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Samsung 55" Smart TV',
    category: 'Electronics',
    price: 45000,
    downPayment: 15000,
    installment: 1500,
    rating: 4.8,
    image: '📺',
  },
  {
    id: '2',
    name: 'Honda City 2023',
    category: 'Vehicles',
    price: 3500000,
    downPayment: 700000,
    installment: 175000,
    rating: 4.9,
    image: '🚗',
  },
  {
    id: '3',
    name: 'Complete Bedroom Set',
    category: 'Furniture',
    price: 85000,
    downPayment: 25000,
    installment: 5000,
    rating: 4.6,
    image: '🛏️',
  },
  {
    id: '4',
    name: 'Solar Panel System 5kW',
    category: 'Energy',
    price: 450000,
    downPayment: 90000,
    installment: 30000,
    rating: 4.7,
    image: '⚡',
  },
  {
    id: '5',
    name: 'Office Furniture Bundle',
    category: 'Business',
    price: 125000,
    downPayment: 30000,
    installment: 8000,
    rating: 4.5,
    image: '🖥️',
  },
  {
    id: '6',
    name: 'High-End Washing Machine',
    category: 'Appliances',
    price: 95000,
    downPayment: 25000,
    installment: 5800,
    rating: 4.8,
    image: '🧺',
  },
];

const categories = ['All', 'Electronics', 'Vehicles', 'Furniture', 'Energy', 'Business', 'Appliances'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
            </Link>
            <Link href="/auth/login" className="text-accent hover:text-accent/80">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-secondary/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Browse Products</h1>
          <p className="text-muted-foreground">Discover amazing products with flexible payment plans</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Search */}
              <div>
                <h3 className="font-serif font-bold text-foreground mb-3">Search</h3>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-serif font-bold text-foreground mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary/50 text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <Card className="bg-accent/10 border-accent/20 p-4">
                <h4 className="font-medium text-foreground mb-2">Flexible Payments</h4>
                <p className="text-sm text-muted-foreground">Choose between 6 or 12-month installment plans with minimal down payment.</p>
              </Card>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">{filteredProducts.length} products found</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition h-full flex flex-col cursor-pointer">
                      <div className="bg-gradient-to-br from-accent/20 to-primary/20 h-48 flex items-center justify-center text-6xl">
                        {product.image}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-serif font-bold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-accent mb-4">{product.category}</p>
                        
                        <div className="mb-4 flex-1">
                          <p className="text-muted-foreground text-sm">Price</p>
                          <p className="text-2xl font-bold text-foreground">₨{product.price.toLocaleString()}</p>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Down Payment:</span>
                            <span className="font-medium text-foreground">₨{product.downPayment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">12-Month EMI:</span>
                            <span className="font-medium text-accent">₨{product.installment.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-accent">★</span>
                          <span className="text-sm text-foreground">{product.rating}</span>
                        </div>

                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          View Details
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="text-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
