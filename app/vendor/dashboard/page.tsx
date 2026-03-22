'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Mock vendor data
const mockVendorStats = {
  totalOrders: 128,
  totalRevenue: 2540000,
  activeProducts: 24,
  rating: 4.7,
  pendingOrders: 5,
};

const mockProducts = [
  {
    id: '1',
    name: 'Samsung 55" Smart TV',
    sku: 'TV-SS-55-001',
    price: 45000,
    stock: 8,
    sales: 42,
    rating: 4.8,
    status: 'active',
  },
  {
    id: '2',
    name: 'LG 32" Monitor',
    sku: 'MON-LG-32-001',
    price: 28000,
    stock: 0,
    sales: 15,
    rating: 4.5,
    status: 'out_of_stock',
  },
  {
    id: '3',
    name: 'Dell Laptop Stand',
    sku: 'STAND-DL-001',
    price: 5500,
    stock: 45,
    sales: 89,
    rating: 4.9,
    status: 'active',
  },
];

const mockOrders = [
  {
    id: '1',
    orderNumber: 'FLX-001230',
    customerName: 'Ali Khan',
    product: 'Samsung 55" Smart TV',
    total: 45000,
    status: 'confirmed',
    date: '2024-03-15',
  },
  {
    id: '2',
    orderNumber: 'FLX-001231',
    customerName: 'Fatima Hassan',
    product: 'Dell Laptop Stand',
    total: 5500,
    status: 'shipped',
    date: '2024-03-14',
  },
  {
    id: '3',
    orderNumber: 'FLX-001232',
    customerName: 'Muhammad Ahmed',
    product: 'Samsung 55" Smart TV',
    total: 45000,
    status: 'delivered',
    date: '2024-03-10',
  },
  {
    id: '4',
    orderNumber: 'FLX-001233',
    customerName: 'Sarah Williams',
    product: 'LG 32" Monitor',
    total: 28000,
    status: 'pending',
    date: '2024-03-16',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'delivered':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'shipped':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'confirmed':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'pending':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'out_of_stock':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics'>('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry Vendor</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/vendor/products" className="text-foreground hover:text-accent transition">
                Shop
              </Link>
              <button className="text-destructive hover:text-destructive/80">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">ElectroHub Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, orders, and sales</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-foreground">{mockVendorStats.totalOrders}</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-foreground">₨{(mockVendorStats.totalRevenue / 1000000).toFixed(1)}M</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Active Products</p>
            <p className="text-3xl font-bold text-foreground">{mockVendorStats.activeProducts}</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Rating</p>
            <p className="text-3xl font-bold text-accent">{mockVendorStats.rating} ★</p>
          </Card>
          <Card className="p-6 border-2 border-accent/20 bg-accent/5">
            <p className="text-muted-foreground text-sm mb-2">Pending Orders</p>
            <p className="text-3xl font-bold text-accent">{mockVendorStats.pendingOrders}</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {(['overview', 'products', 'orders', 'analytics'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-4 border-b-2 transition capitalize font-medium ${
                  activeTab === tab
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/vendor/products/new">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Product
                </Button>
              </Link>
              <Link href="/vendor/analytics">
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                Manage Settings
              </Button>
              <Button variant="outline" className="w-full">
                Shop Profile
              </Button>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-foreground">Recent Orders</h2>
                <Link href="#" className="text-accent hover:underline text-sm">View All</Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-muted-foreground font-medium">Order ID</th>
                      <th className="text-left py-3 text-muted-foreground font-medium">Customer</th>
                      <th className="text-left py-3 text-muted-foreground font-medium">Product</th>
                      <th className="text-right py-3 text-muted-foreground font-medium">Amount</th>
                      <th className="text-center py-3 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map(order => (
                      <tr key={order.id} className="border-b border-border hover:bg-secondary/30 transition">
                        <td className="py-3 font-mono text-foreground">{order.orderNumber}</td>
                        <td className="py-3 text-foreground">{order.customerName}</td>
                        <td className="py-3 text-foreground">{order.product}</td>
                        <td className="py-3 text-right font-medium text-foreground">₨{order.total.toLocaleString()}</td>
                        <td className="py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize inline-block ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-foreground">Your Products</h2>
              <Link href="/vendor/products/new">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Add New Product
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {mockProducts.map(product => (
                <Card key={product.id} className="p-6">
                  <div className="grid md:grid-cols-6 gap-6 items-center">
                    <div>
                      <p className="font-serif font-bold text-foreground">{product.name}</p>
                      <p className="text-muted-foreground text-sm">SKU: {product.sku}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Price</p>
                      <p className="font-bold text-foreground">₨{product.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Stock</p>
                      <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Sales</p>
                      <p className="font-bold text-foreground">{product.sales}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Rating</p>
                      <p className="font-bold text-accent">{product.rating} ★</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">Edit</Button>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">All Orders</h2>

            <div className="space-y-4">
              {mockOrders.map(order => (
                <Card key={order.id} className="p-6">
                  <div className="grid md:grid-cols-5 gap-6 items-center mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Order ID</p>
                      <p className="font-mono font-bold text-foreground">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Customer</p>
                      <p className="font-medium text-foreground">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Product</p>
                      <p className="font-medium text-foreground">{order.product}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Amount</p>
                      <p className="font-bold text-foreground">₨{order.total.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize inline-block ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Update Status</Button>
                    {order.status !== 'delivered' && (
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Mark Shipped
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">Analytics</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <p className="text-muted-foreground text-sm mb-4">Sales This Month</p>
                <p className="text-4xl font-bold text-foreground mb-2">₨892,500</p>
                <p className="text-green-600 text-sm font-medium">+12.5% vs last month</p>
              </Card>
              <Card className="p-6">
                <p className="text-muted-foreground text-sm mb-4">Orders This Month</p>
                <p className="text-4xl font-bold text-foreground mb-2">42</p>
                <p className="text-green-600 text-sm font-medium">+8.3% vs last month</p>
              </Card>
              <Card className="p-6">
                <p className="text-muted-foreground text-sm mb-4">Average Order Value</p>
                <p className="text-4xl font-bold text-foreground mb-2">₨21,250</p>
                <p className="text-green-600 text-sm font-medium">Stable performance</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-serif font-bold text-foreground mb-6">Top Selling Products</h3>
              <div className="space-y-4">
                {[
                  { name: 'Dell Laptop Stand', sales: 89, revenue: 489500 },
                  { name: 'Samsung 55" Smart TV', sales: 42, revenue: 1890000 },
                  { name: 'LG 32" Monitor', sales: 15, revenue: 420000 },
                ].map((product, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">₨{product.revenue.toLocaleString()}</p>
                      <div className="w-24 h-2 bg-secondary rounded-full mt-2">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${(product.sales / 89) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
