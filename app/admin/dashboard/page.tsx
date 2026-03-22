'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const mockAdminStats = {
  totalUsers: 1240,
  totalVendors: 85,
  totalOrders: 3456,
  totalRevenue: 15750000,
  pendingVerifications: 12,
  activeTickets: 8,
};

const mockPendingVendors = [
  {
    id: '1',
    name: 'ElectroHub Electronics',
    owner: 'Ali Ahmed',
    category: 'Electronics',
    verified: false,
    registeredDate: '2024-03-10',
  },
  {
    id: '2',
    name: 'FurniMax Furniture',
    owner: 'Sarah Khan',
    category: 'Furniture',
    verified: false,
    registeredDate: '2024-03-12',
  },
];

const mockSupportTickets = [
  {
    id: '1',
    subject: 'Product quality complaint',
    priority: 'high',
    status: 'open',
    created: '2024-03-16',
    customer: 'Ahmed Hassan',
  },
  {
    id: '2',
    subject: 'Payment issue on order',
    priority: 'urgent',
    status: 'in_progress',
    created: '2024-03-15',
    customer: 'Fatima Khan',
  },
  {
    id: '3',
    subject: 'Delivery delay assistance',
    priority: 'medium',
    status: 'open',
    created: '2024-03-14',
    customer: 'Muhammad Ali',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'high':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'in_progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'resolved':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'users' | 'support'>('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry Admin</h1>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-foreground">Super Admin</span>
              <button className="text-destructive hover:text-destructive/80">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Administration Panel</h1>
          <p className="text-muted-foreground">Monitor and manage the platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Users</p>
            <p className="text-3xl font-bold text-foreground">{mockAdminStats.totalUsers.toLocaleString()}</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Vendors</p>
            <p className="text-3xl font-bold text-foreground">{mockAdminStats.totalVendors}</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-foreground">{mockAdminStats.totalOrders.toLocaleString()}</p>
          </Card>
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-foreground">₨{(mockAdminStats.totalRevenue / 1000000).toFixed(1)}M</p>
          </Card>
          <Card className="p-6 border-2 border-orange-200 bg-orange-50">
            <p className="text-muted-foreground text-sm mb-2">Pending Verifications</p>
            <p className="text-3xl font-bold text-orange-700">{mockAdminStats.pendingVerifications}</p>
          </Card>
          <Card className="p-6 border-2 border-red-200 bg-red-50">
            <p className="text-muted-foreground text-sm mb-2">Active Tickets</p>
            <p className="text-3xl font-bold text-red-700">{mockAdminStats.activeTickets}</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8">
            {(['overview', 'vendors', 'users', 'support'] as const).map(tab => (
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
              <Button variant="outline" className="w-full h-12">
                View All Users
              </Button>
              <Button variant="outline" className="w-full h-12">
                Manage Vendors
              </Button>
              <Button variant="outline" className="w-full h-12">
                Verify Documents
              </Button>
              <Button variant="outline" className="w-full h-12">
                Platform Settings
              </Button>
            </div>

            {/* Pending Vendors */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-foreground">Pending Vendor Verifications</h2>
                <Link href="#" className="text-accent hover:underline text-sm">View All</Link>
              </div>

              <div className="space-y-4">
                {mockPendingVendors.map(vendor => (
                  <div key={vendor.id} className="p-4 border border-border rounded-lg hover:bg-secondary/30 transition">
                    <div className="grid md:grid-cols-5 gap-4 items-center mb-4">
                      <div>
                        <p className="font-medium text-foreground">{vendor.name}</p>
                        <p className="text-muted-foreground text-sm">Owner: {vendor.owner}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Category</p>
                        <p className="font-medium text-foreground">{vendor.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Registered</p>
                        <p className="font-medium text-foreground">{vendor.registeredDate}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          vendor.verified
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {vendor.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          Verify
                        </Button>
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

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
                      <th className="text-right py-3 text-muted-foreground font-medium">Amount</th>
                      <th className="text-center py-3 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'FLX-001234', customer: 'Ahmed Hassan', amount: 130000, status: 'delivered' },
                      { id: 'FLX-001235', customer: 'Fatima Khan', amount: 85000, status: 'shipped' },
                      { id: 'FLX-001236', customer: 'Muhammad Ali', amount: 45000, status: 'confirmed' },
                    ].map(order => (
                      <tr key={order.id} className="border-b border-border hover:bg-secondary/30 transition">
                        <td className="py-3 font-mono text-foreground">{order.id}</td>
                        <td className="py-3 text-foreground">{order.customer}</td>
                        <td className="py-3 text-right font-medium text-foreground">₨{order.amount.toLocaleString()}</td>
                        <td className="py-3 text-center">
                          <span className="px-3 py-1 rounded-full text-xs font-medium border capitalize bg-blue-50 text-blue-700 border-blue-200">
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

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-foreground">Manage Vendors</h2>
              <Button variant="outline">Export List</Button>
            </div>

            <div className="space-y-4">
              {mockPendingVendors.map(vendor => (
                <Card key={vendor.id} className="p-6">
                  <div className="grid md:grid-cols-5 gap-6 items-center">
                    <div>
                      <p className="font-serif font-bold text-foreground">{vendor.name}</p>
                      <p className="text-muted-foreground text-sm">Owner: {vendor.owner}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Category</p>
                      <p className="font-bold text-foreground">{vendor.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Registered</p>
                      <p className="font-medium text-foreground">{vendor.registeredDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        vendor.verified
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {vendor.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">Manage Users</h2>

            <Card className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Ahmed Hassan', email: 'ahmed@example.com', role: 'buyer', joined: '2024-01-15' },
                  { name: 'Fatima Khan', email: 'fatima@example.com', role: 'seller', joined: '2024-02-20' },
                  { name: 'Muhammad Ali', email: 'mali@example.com', role: 'buyer', joined: '2024-03-05' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-muted-foreground text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Joined: {user.joined}</p>
                      <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">Support Tickets</h2>

            <div className="space-y-4">
              {mockSupportTickets.map(ticket => (
                <Card key={ticket.id} className="p-6">
                  <div className="grid md:grid-cols-5 gap-6 items-center mb-4">
                    <div>
                      <p className="font-serif font-bold text-foreground">{ticket.subject}</p>
                      <p className="text-muted-foreground text-sm">by {ticket.customer}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Priority</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize inline-block ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize inline-block ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Created</p>
                      <p className="font-medium text-foreground">{ticket.created}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Assign</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
