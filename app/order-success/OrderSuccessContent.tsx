'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Printer, Download, ArrowRight, ShieldCheck, CreditCard, Package, Calendar, Home, ShoppingBag } from 'lucide-react';

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'FLX-001236';

  const [orderDate, setOrderDate] = React.useState<string>('');

  React.useEffect(() => {
    setOrderDate(new Date().toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4f5fb] py-6 md:py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-2xl mx-auto">
        {/* Compact Success Header */}
        <div className="text-center mb-6 print:hidden">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100/50">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-[#111827] mb-2 tracking-tight">Order Confirmed!</h1>
          <p className="text-[#6b7280] font-bold text-sm uppercase tracking-widest">Digital Receipt & Confirmation</p>
        </div>

        {/* Condensed Receipt Card */}
        <Card className="overflow-hidden border-none shadow-2xl shadow-indigo-100/30 rounded-[2rem] bg-white relative">
          <div className="h-2 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#4f46e5]" />
          
          <div className="p-6 md:p-10">
            {/* Header: Brand & Order Ref */}
            <div className="flex justify-between items-center mb-8 border-b border-dashed border-[#e5e7eb] pb-6">
              <div>
                <h2 className="text-2xl font-serif font-black text-[#111827] tracking-tight">FlexiBerry</h2>
                <p className="text-[#9ca3af] text-[10px] font-black uppercase tracking-widest">Transaction Success</p>
              </div>
              <div className="text-right">
                <p className="text-[#9ca3af] text-[10px] uppercase tracking-widest font-black mb-1">Order Ref</p>
                <p className="text-xl font-mono font-black text-[#6366f1]">{orderId}</p>
              </div>
            </div>

            {/* Compact Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-[#9ca3af] text-[9px] uppercase tracking-widest font-black">Date</p>
                <p className="font-black text-[#111827] text-sm">{orderDate || '...'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#9ca3af] text-[9px] uppercase tracking-widest font-black">Status</p>
                <div className="font-black text-green-600 flex items-center gap-1.5 text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full" />
                  Paid
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#9ca3af] text-[9px] uppercase tracking-widest font-black">Method</p>
                <p className="font-black text-[#111827] flex items-center gap-1.5 text-sm">
                  <CreditCard className="w-3.5 h-3.5 text-[#6366f1]" />
                  Card
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[#9ca3af] text-[9px] uppercase tracking-widest font-black">Plan</p>
                <p className="font-black text-[#6366f1] text-sm">12 Months</p>
              </div>
            </div>

            {/* Items Summary (Compact) */}
            <div className="mb-8">
              <div className="bg-[#f8f9fd] rounded-2xl p-5 border border-[#f0f0f6] space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📺</span>
                    <span className="font-bold text-[#111827] text-sm">Samsung 55" Smart TV</span>
                  </div>
                  <span className="font-black text-[#111827] text-sm">₨45,000</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#e5e7eb]">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🛏️</span>
                    <span className="font-bold text-[#111827] text-sm">Complete Bedroom Set</span>
                  </div>
                  <span className="font-black text-[#111827] text-sm">₨85,000</span>
                </div>
              </div>
            </div>

            {/* Payment Highlights (Single Row) */}
            <div className="bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 mb-8 relative overflow-hidden">
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <p className="text-indigo-100 text-[9px] uppercase tracking-widest font-black mb-1">Down Payment Paid</p>
                  <p className="text-3xl font-black">₨26,000</p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-100 text-[9px] uppercase tracking-widest font-black mb-1">Monthly EMI</p>
                  <p className="text-xl font-black">₨10,833<span className="text-xs font-medium opacity-80 ml-1">/mo</span></p>
                </div>
              </div>
            </div>

            {/* Next Step Info (Condensed) */}
            <div className="flex items-center gap-4 p-4 bg-[#f5f3ff] rounded-2xl border border-[#ddd6fe] mb-8">
              <Calendar className="w-5 h-5 text-[#6366f1] flex-shrink-0" />
              <p className="text-xs text-[#1e1b4b] font-bold">
                Next payment of <span className="text-[#6366f1]">₨10,833</span> due on {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}. We'll email you a reminder.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4 print:hidden">
              <Button onClick={handlePrint} variant="outline" className="flex-1 h-12 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 hover:bg-[#f8f9fd] transition-all">
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 hover:bg-[#f8f9fd] transition-all">
                <Download className="w-4 h-4" />
                Save PDF
              </Button>
            </div>
          </div>
        </Card>

        {/* Simple Navigation */}
        <div className="mt-8 flex flex-col items-center gap-6 print:hidden">
          <div className="flex gap-4">
            <Link href="/buyer/dashboard">
              <Button className="h-12 px-6 bg-white text-[#111827] hover:bg-muted rounded-xl font-black text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105">
                <Home className="w-4 h-4 text-[#6366f1]" />
                Dashboard
              </Button>
            </Link>
            <Link href="/products">
              <Button className="h-12 px-6 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white rounded-xl font-black text-xs shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all hover:scale-105">
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[#9ca3af] text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Verified Secure Transaction
          </div>
        </div>
      </div>
    </div>
  );
}
