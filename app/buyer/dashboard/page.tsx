'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Mock data
const mockOrders = [
  {
    id: '1',
    number: 'FLX-001234',
    date: '2024-03-15',
    items: [{ name: 'Samsung 55" Smart TV', quantity: 1, price: 45000 }],
    total: 45000,
    status: 'delivered',
    paymentStatus: 'partial',
  },
  {
    id: '2',
    number: 'FLX-001235',
    date: '2024-03-10',
    items: [{ name: 'Office Furniture Bundle', quantity: 1, price: 125000 }],
    total: 125000,
    status: 'shipped',
    paymentStatus: 'pending',
  },
];

const mockInstallments = [
  {
    id: '1',
    orderId: 'FLX-001234',
    product: 'Samsung 55" Smart TV',
    number: 4,
    total: 12,
    dueDate: '2024-04-15',
    amount: 3750,
    status: 'pending',
  },
  {
    id: '2',
    orderId: 'FLX-001234',
    product: 'Samsung 55" Smart TV',
    number: 5,
    total: 12,
    dueDate: '2024-05-15',
    amount: 3750,
    status: 'pending',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'shipped':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'pending':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'cancelled':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function BuyerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'installments' | 'profile'>('orders');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/products" className="text-foreground hover:text-accent transition">
                Browse
              </Link>
              <button className="text-destructive hover:text-destructive/80">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Welcome Back, Ahmed!</h1>
          <p className="text-muted-foreground">Manage your orders, payments, and account</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Active Orders</p>
            <p className="text-3xl font-bold text-foreground">{mockOrders.length}</p>
            <p className="text-muted-foreground text-xs mt-2">Updates every hour</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Upcoming Payments</p>
            <p className="text-3xl font-bold text-foreground">{mockInstallments.length}</p>
            <p className="text-accent text-xs mt-2">Next due: April 15, 2024</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-foreground">₨170,000</p>
            <p className="text-muted-foreground text-xs mt-2">All time</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {(['orders', 'installments', 'profile'] as const).map(tab => (
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

        {/* Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-foreground">Your Orders</h2>
              <Link href="/products">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {mockOrders.length > 0 ? (
              mockOrders.map(order => (
                <Card key={order.id} className="p-6">
                  <div className="grid md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Order Number</p>
                      <p className="font-mono font-bold text-foreground">{order.number}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Date</p>
                      <p className="font-medium text-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Total Amount</p>
                      <p className="font-bold text-foreground">₨{order.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-sm font-medium text-foreground mb-3">Items</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                        <span className="font-medium text-foreground">₨{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Track Shipment
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No orders yet</p>
                <Link href="/products">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Shopping
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'installments' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">Payment Schedule</h2>

            {mockInstallments.length > 0 ? (
              <div className="space-y-4">
                {mockInstallments.map(inst => (
                  <Card
                    key={inst.id}
                    className={`p-6 ${
                      inst.status === 'pending' ? 'border-2 border-accent/30' : ''
                    }`}
                  >
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Order</p>
                        <p className="font-mono font-bold text-foreground">{inst.orderId}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Product</p>
                        <p className="font-medium text-foreground text-sm">{inst.product}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Installment</p>
                        <p className="font-bold text-foreground">{inst.number}/{inst.total}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Due Date</p>
                        <p className="font-medium text-foreground">
                          {new Date(inst.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground text-sm mb-1">Amount</p>
                        <p className="text-xl font-bold text-accent">₨{inst.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        Pay Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No upcoming payments</p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Account Settings</h2>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-serif font-bold text-foreground mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">First Name</p>
                    <p className="font-medium text-foreground">Ahmed</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Last Name</p>
                    <p className="font-medium text-foreground">Hassan</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Email</p>
                    <p className="font-medium text-foreground">ahmed@example.com</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Phone</p>
                    <p className="font-medium text-foreground">+92 300 1234567</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">Edit Information</Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-serif font-bold text-foreground mb-4">Address</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  123 Main Street, Karachi, Pakistan
                </p>
                <Button variant="outline" className="w-full">Edit Address</Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-serif font-bold text-foreground mb-4">Security</h3>
                <Button variant="outline" className="w-full mb-3">Change Password</Button>
                <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
