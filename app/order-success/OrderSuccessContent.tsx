'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Printer, Download, Share2, ArrowRight, ShieldCheck, CreditCard, Package, Calendar } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f8f9fd] py-8 md:py-16 px-4 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10 print:hidden">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100/50">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your order has been confirmed and your down payment was processed securely.
          </p>
        </div>

        {/* Receipt Card */}
        <Card className="overflow-hidden border-none shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] bg-white relative">
          {/* Decorative Top Bar */}
          <div className="h-3 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#4f46e5]" />
          
          <div className="p-8 md:p-12">
            {/* Receipt Branding */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-dashed border-muted pb-8">
              <div>
                <h2 className="text-3xl font-serif font-black text-[#111827] tracking-tight">FlexiBerry</h2>
                <p className="text-muted-foreground text-sm font-medium mt-1">Official Digital Receipt</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-1">Order Reference</p>
                <p className="text-2xl font-mono font-bold text-[#6366f1]">{orderId}</p>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Date</p>
                <p className="font-bold text-foreground">{orderDate || '...'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Status</p>
                <p className="font-bold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  Paid
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Method</p>
                <p className="font-bold text-foreground flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  Card
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Plan</p>
                <p className="font-bold text-[#6366f1]">12 Months</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-6 mb-12">
              <h3 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
                <Package className="w-5 h-5 text-[#6366f1]" />
                Purchased Items
              </h3>
              <div className="bg-muted/30 rounded-3xl p-6 md:p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">📺</div>
                    <div>
                      <p className="font-bold text-foreground">Samsung 55" Smart TV</p>
                      <p className="text-xs text-muted-foreground">Qty: 1</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground">₨45,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">🛏️</div>
                    <div>
                      <p className="font-bold text-foreground">Complete Bedroom Set</p>
                      <p className="text-xs text-muted-foreground">Qty: 1</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground">₨85,000</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-4 mb-12">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium">₨130,000</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-muted">
                <span className="text-lg font-serif font-bold text-foreground">Total Order Value</span>
                <span className="text-2xl font-bold text-foreground">₨130,000</span>
              </div>
              <div className="bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 mt-8 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 bg-black/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-center md:text-left">
                    <p className="text-indigo-100 text-xs uppercase tracking-widest font-bold mb-2">Down Payment Paid</p>
                    <p className="text-5xl font-black">₨26,000</p>
                  </div>
                  <div className="h-12 w-px bg-white/20 hidden md:block" />
                  <div className="text-center md:text-right">
                    <p className="text-indigo-100 text-xs uppercase tracking-widest font-bold mb-2">Monthly Installment</p>
                    <p className="text-3xl font-bold">₨10,833<span className="text-sm font-normal opacity-80">/mo</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Installment Schedule Hint */}
            <div className="flex items-start gap-4 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 mb-12">
              <Calendar className="w-6 h-6 text-[#6366f1] flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-[#6366f1] mb-1">Next Payment Due</p>
                <p className="text-sm text-indigo-900/70 leading-relaxed">
                  Your first monthly installment of <strong>₨10,833</strong> is scheduled for <strong>{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>. We'll send you a reminder 3 days before.
                </p>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="flex flex-col sm:flex-row gap-4 print:hidden">
              <Button onClick={handlePrint} variant="outline" className="flex-1 h-14 rounded-2xl border-2 font-bold flex items-center gap-2 hover:bg-muted transition-all">
                <Printer className="w-5 h-5" />
                Print Receipt
              </Button>
              <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 font-bold flex items-center gap-2 hover:bg-muted transition-all">
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </div>
          </div>
          
          {/* Bottom Receipt Notch */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#f8f9fd] rounded-t-full print:hidden" />
        </Card>

        {/* Post-Checkout Actions */}
        <div className="mt-12 flex flex-col items-center gap-8 print:hidden">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/buyer/dashboard">
              <Button className="px-8 h-14 bg-white text-foreground hover:bg-muted rounded-2xl font-bold shadow-lg shadow-gray-200/50 flex items-center gap-2 transition-all hover:scale-[1.02]">
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button className="px-8 h-14 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white hover:opacity-90 rounded-2xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all hover:scale-[1.02]">
                Continue Shopping
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Verified Purchase by FlexiBerry Security
          </div>
        </div>
      </div>
      
      {/* Print-only footer */}
      <div className="hidden print:block mt-12 text-center text-muted-foreground text-xs">
        <p>This is a computer-generated receipt. No signature required.</p>
        <p>© {new Date().getFullYear()} FlexiBerry Platform - Pakistan's Leading Installment Marketplace</p>
      </div>
    </div>
  );
}
