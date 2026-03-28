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
      month: 'long',
      year: 'numeric'
    }));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4f5fb] py-12 md:py-24 px-4 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12 print:hidden">
          <div className="w-24 h-24 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100/50 scale-110">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#111827] mb-6 tracking-tight">Payment Confirmed!</h1>
          <p className="text-xl text-[#6b7280] font-medium max-w-lg mx-auto leading-relaxed">
            Your order has been secured and your initial down payment was processed successfully.
          </p>
        </div>

        {/* Receipt Card */}
        <Card className="overflow-hidden border-none shadow-2xl shadow-indigo-100/50 rounded-[3rem] bg-white relative">
          {/* Decorative Top Bar */}
          <div className="h-4 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#4f46e5]" />
          
          <div className="p-8 md:p-16">
            {/* Receipt Branding */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 border-b border-dashed border-[#e5e7eb] pb-12">
              <div>
                <h2 className="text-4xl font-serif font-black text-[#111827] tracking-tight">FlexiBerry</h2>
                <p className="text-[#6b7280] text-sm font-bold mt-1 uppercase tracking-widest">Official Digital Receipt</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[#9ca3af] text-xs uppercase tracking-[0.2em] font-black mb-2">Order Reference</p>
                <p className="text-3xl font-mono font-black text-[#6366f1]">{orderId}</p>
              </div>
            </div>

            {/* Transaction Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
              <div className="space-y-2">
                <p className="text-[#9ca3af] text-[10px] uppercase tracking-widest font-black">Date</p>
                <p className="font-black text-[#111827] text-lg">{orderDate || '...'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#9ca3af] text-[10px] uppercase tracking-widest font-black">Status</p>
                <div className="font-black text-green-600 flex items-center gap-2 text-lg">
                  <span className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                  Paid
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[#9ca3af] text-[10px] uppercase tracking-widest font-black">Method</p>
                <p className="font-black text-[#111827] flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5 text-[#6366f1]" />
                  Card
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[#9ca3af] text-[10px] uppercase tracking-widest font-black">Plan</p>
                <p className="font-black text-[#6366f1] text-lg">12 Months</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-8 mb-16">
              <h3 className="text-2xl font-serif font-black text-[#111827] flex items-center gap-3">
                <Package className="w-6 h-6 text-[#6366f1]" />
                Purchased Items
              </h3>
              <div className="bg-[#f8f9fd] rounded-[2rem] p-8 md:p-10 space-y-6 border border-[#f0f0f6]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-[#f0f0f6]">📺</div>
                    <div>
                      <p className="font-black text-[#111827] text-xl">Samsung 55" Smart TV</p>
                      <p className="text-sm font-bold text-[#9ca3af] uppercase tracking-widest">Quantity: 1</p>
                    </div>
                  </div>
                  <span className="font-black text-[#111827] text-xl">₨45,000</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-[#e5e7eb]">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-[#f0f0f6]">🛏️</div>
                    <div>
                      <p className="font-black text-[#111827] text-xl">Complete Bedroom Set</p>
                      <p className="text-sm font-bold text-[#9ca3af] uppercase tracking-widest">Quantity: 1</p>
                    </div>
                  </div>
                  <span className="font-black text-[#111827] text-xl">₨85,000</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-6 mb-16">
              <div className="flex justify-between items-center text-[#6b7280] font-bold">
                <span className="uppercase tracking-widest text-xs">Order Subtotal</span>
                <span className="text-xl text-[#111827]">₨130,000</span>
              </div>
              <div className="flex justify-between items-center text-[#6b7280] font-bold">
                <span className="uppercase tracking-widest text-xs">Shipping Fee</span>
                <span className="text-green-600 uppercase tracking-widest text-xs font-black">Free Delivery</span>
              </div>
              <div className="flex justify-between items-center pt-8 border-t border-[#f3f4f6]">
                <span className="text-2xl font-serif font-black text-[#111827]">Total Order Value</span>
                <span className="text-3xl font-black text-[#111827]">₨130,000</span>
              </div>
              
              <div className="bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-200 mt-12 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-black/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="text-center md:text-left">
                    <p className="text-indigo-100 text-[10px] uppercase tracking-[0.2em] font-black mb-3">Down Payment Processed</p>
                    <p className="text-6xl font-black">₨26,000</p>
                  </div>
                  <div className="h-16 w-px bg-white/20 hidden md:block" />
                  <div className="text-center md:text-right">
                    <p className="text-indigo-100 text-[10px] uppercase tracking-[0.2em] font-black mb-3">Monthly Installment</p>
                    <p className="text-4xl font-black">₨10,833<span className="text-lg font-medium opacity-80 ml-1">/mo</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Payment Info */}
            <div className="flex items-start gap-6 p-8 bg-[#f5f3ff] rounded-[2rem] border border-[#ddd6fe] mb-16">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Calendar className="w-8 h-8 text-[#6366f1]" />
              </div>
              <div>
                <p className="font-black text-[#4f46e5] mb-2 uppercase tracking-widest text-sm">Next Installment Due</p>
                <p className="text-lg text-[#1e1b4b] leading-relaxed font-bold">
                  Your first monthly installment of ₨10,833 is scheduled for {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}.
                </p>
                <p className="text-[#6b7280] text-sm mt-2 font-medium">We will send a reminder to your email 3 days before the due date.</p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-6 print:hidden">
              <Button onClick={handlePrint} variant="outline" className="flex-1 h-16 rounded-2xl border-2 font-black text-lg flex items-center justify-center gap-3 hover:bg-[#f8f9fd] transition-all">
                <Printer className="w-6 h-6" />
                Print Receipt
              </Button>
              <Button variant="outline" className="flex-1 h-16 rounded-2xl border-2 font-black text-lg flex items-center justify-center gap-3 hover:bg-[#f8f9fd] transition-all">
                <Download className="w-6 h-6" />
                Download PDF
              </Button>
            </div>
          </div>
          
          {/* Receipt Bottom Cutout Effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#f4f5fb] rounded-t-full print:hidden" />
        </Card>

        {/* Post-Checkout Navigation */}
        <div className="mt-16 flex flex-col items-center gap-10 print:hidden">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/buyer/dashboard">
              <Button className="px-10 h-16 bg-white text-[#111827] hover:bg-muted rounded-2xl font-black text-lg shadow-xl shadow-gray-200/50 flex items-center gap-3 transition-all hover:scale-105 active:scale-95">
                <Home className="w-6 h-6 text-[#6366f1]" />
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/products">
              <Button className="px-10 h-16 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white hover:from-[#4f46e5] hover:to-[#4338ca] rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 flex items-center gap-3 transition-all hover:scale-105 active:scale-95">
                <ShoppingBag className="w-6 h-6" />
                Continue Shopping
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 text-[#9ca3af] text-sm font-black uppercase tracking-widest">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            Verified Secure Transaction
          </div>
        </div>
      </div>
      
      {/* Print Footer */}
      <div className="hidden print:block mt-16 text-center text-[#9ca3af] text-xs font-bold uppercase tracking-[0.2em]">
        <p>This is an automated digital receipt generated by FlexiBerry Platform.</p>
        <p className="mt-2">© {new Date().getFullYear()} FlexiBerry - Pakistan's Leading Installment Marketplace</p>
      </div>
    </div>
  );
}
