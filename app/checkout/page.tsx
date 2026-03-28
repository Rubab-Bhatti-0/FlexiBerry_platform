'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout';
import { CheckCircle2, CreditCard, Truck, ShieldCheck, ArrowLeft, ArrowRight, Lock, MapPin, Calendar } from 'lucide-react';

// Mock cart data
const cartTotal = 130000;
const downPayment = 26000;
const monthlyPayment = 10833;

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [loading, setLoading] = useState(false);

  const [shippingData, setShippingData] = useState({
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567',
    address: '123 Main Street',
    city: 'Karachi',
    postalCode: '75000',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    installmentMonths: 12,
  });

  const [agreed, setAgreed] = useState(false);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleContinueToPayment = () => {
    if (!shippingData.firstName || !shippingData.email || !shippingData.address) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    if (!agreed) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    router.push('/order-success?orderId=FLX-001236');
  };

  return (
    <FlexiLayout>
      <div className="min-h-screen bg-[#f4f5fb]">
        {/* Progress Header */}
        <div className="bg-white py-12 px-4 border-b border-[#e5e7eb] shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-black text-[#111827] mb-2 tracking-tight">Secure Checkout</h1>
                <p className="text-[#6b7280] text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                  <Lock size={20} className="text-[#6366f1]" />
                  Secure 256-bit SSL Encrypted Transaction
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-2xl font-black transition-all ${
                    step === 'shipping' || step === 'payment' 
                      ? 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white shadow-xl shadow-indigo-200 scale-110' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step === 'payment' ? <CheckCircle2 className="w-8 h-8" /> : '1'}
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-black ${step === 'shipping' ? 'text-[#6366f1]' : 'text-[#9ca3af]'}`}>Shipping</span>
                </div>
                <div className={`w-16 h-1 rounded-full ${step === 'payment' ? 'bg-[#6366f1]' : 'bg-[#e5e7eb]'}`}></div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-2xl font-black transition-all ${
                    step === 'payment' 
                      ? 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white shadow-xl shadow-indigo-200 scale-110' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-black ${step === 'payment' ? 'text-[#6366f1]' : 'text-[#9ca3af]'}`}>Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Form Content */}
            <div className="lg:col-span-2">
              {step === 'shipping' ? (
                <Card className="p-8 md:p-12 border-none shadow-2xl shadow-gray-200/50 rounded-[2.5rem] bg-white">
                  <div className="flex items-center gap-4 mb-10 border-b border-[#f3f4f6] pb-8">
                    <div className="p-4 bg-[#f5f3ff] rounded-[1.25rem] text-[#6366f1]">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif font-black text-[#111827]">Shipping Information</h2>
                      <p className="text-[#6b7280] font-medium">Where should we deliver your order?</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">First Name</label>
                        <Input
                          name="firstName"
                          value={shippingData.firstName}
                          onChange={handleShippingChange}
                          placeholder="Ahmed"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Last Name</label>
                        <Input
                          name="lastName"
                          value={shippingData.lastName}
                          onChange={handleShippingChange}
                          placeholder="Hassan"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Email Address</label>
                        <Input
                          name="email"
                          type="email"
                          value={shippingData.email}
                          onChange={handleShippingChange}
                          placeholder="ahmed@example.com"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Phone Number</label>
                        <Input
                          name="phone"
                          value={shippingData.phone}
                          onChange={handleShippingChange}
                          placeholder="+92 300 1234567"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Street Address</label>
                      <Input
                        name="address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        placeholder="123 Main Street, Block 4"
                        className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">City</label>
                        <Input
                          name="city"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          placeholder="Karachi"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Postal Code</label>
                        <Input
                          name="postalCode"
                          value={shippingData.postalCode}
                          onChange={handleShippingChange}
                          placeholder="75000"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                        />
                      </div>
                    </div>

                    <div className="pt-8">
                      <Button
                        onClick={handleContinueToPayment}
                        className="w-full bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white text-lg h-16 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] font-black flex items-center justify-center gap-3"
                      >
                        Continue to Payment
                        <ArrowRight size={22} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 md:p-12 border-none shadow-2xl shadow-gray-200/50 rounded-[2.5rem] bg-white">
                  <div className="flex items-center gap-4 mb-10 border-b border-[#f3f4f6] pb-8">
                    <div className="p-4 bg-[#f5f3ff] rounded-[1.25rem] text-[#6366f1]">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif font-black text-[#111827]">Payment Details</h2>
                      <p className="text-[#6b7280] font-medium">Initial down payment processing</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                      <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                      <div className="relative z-10">
                        <p className="text-indigo-100 text-[10px] uppercase tracking-widest font-black mb-2">Down Payment Due Today</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black">
                            ₨{downPayment.toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-3">
                          <div className="p-2 bg-white/10 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-indigo-100" />
                          </div>
                          <p className="text-indigo-100 text-sm font-medium">
                            Remaining ₨{monthlyPayment.toLocaleString()}/mo for 12 months
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Card Number</label>
                      <Input
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="0000 0000 0000 0000"
                        className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-mono text-lg"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Cardholder Name</label>
                      <Input
                        name="cardHolder"
                        value={paymentData.cardHolder}
                        onChange={handlePaymentChange}
                        placeholder="MUHAMMAD AHMED"
                        className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">Expiry Date</label>
                        <Input
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-mono"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-[#374151] ml-1 uppercase tracking-widest">CVV</label>
                        <Input
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-[#f8f9fd] rounded-[1.5rem] border border-[#f0f0f6] mt-8">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-6 h-6 rounded-lg border-[#e5e7eb] text-[#6366f1] focus:ring-[#6366f1]"
                      />
                      <label htmlFor="terms" className="text-sm text-[#6b7280] leading-relaxed font-medium">
                        I agree to the <Link href="#" className="text-[#6366f1] font-black hover:underline">Terms of Service</Link> and authorize the initial down payment of ₨{downPayment.toLocaleString()}.
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                      <Button
                        variant="outline"
                        onClick={() => setStep('shipping')}
                        className="flex-1 h-16 rounded-2xl border-2 font-black text-lg hover:bg-[#f5f3ff] hover:text-[#6366f1] transition-all flex items-center justify-center gap-2"
                      >
                        <ArrowLeft size={22} />
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="flex-[2.5] bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white text-lg h-16 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] font-black"
                      >
                        {loading ? (
                          <span className="flex items-center gap-3">
                            <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </span>
                        ) : `Pay ₨${downPayment.toLocaleString()} & Confirm Order`}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <Card className="p-8 border-none shadow-2xl shadow-indigo-100/30 rounded-[2.5rem] bg-white sticky top-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6366f1] to-[#4f46e5]" />
                
                <h2 className="text-2xl font-serif font-black text-[#111827] mb-8">Order Summary</h2>
                
                <div className="space-y-5 mb-8 pb-8 border-b border-[#f3f4f6]">
                  <div className="flex justify-between items-center text-[#6b7280]">
                    <span className="font-medium">Product Total</span>
                    <span className="font-black text-[#111827]">₨{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6b7280] font-medium">Shipping Fee</span>
                    <span className="text-green-600 font-black uppercase text-xs tracking-widest">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-[#6b7280]">
                    <span className="font-medium">Processing Fee</span>
                    <span className="font-black text-[#111827]">₨0</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center p-5 bg-[#f8f9fd] rounded-2xl border border-[#f0f0f6]">
                    <span className="font-black text-[#111827]">Total Payable</span>
                    <span className="text-2xl font-black text-[#111827]">₨{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-6 bg-[#f5f3ff] rounded-[1.5rem] border border-[#ddd6fe] space-y-4">
                  <h3 className="text-xs font-black text-[#4f46e5] uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Installment Plan
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280] font-medium">Down Payment</span>
                      <span className="font-black text-[#111827]">₨{downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280] font-medium">Monthly EMI</span>
                      <span className="font-black text-[#111827]">₨{monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b7280] font-medium">Duration</span>
                      <span className="font-black text-[#6366f1]">12 Months</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 text-center">
                   <div className="flex items-center gap-2 text-xs text-[#9ca3af] font-bold uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Verified Security</span>
                   </div>
                   <p className="text-[10px] text-[#9ca3af] leading-relaxed">
                      By completing this purchase, you agree to our 12-month installment contract and terms.
                   </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  );
}
