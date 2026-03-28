'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout';
import { CheckCircle2, CreditCard, Truck, ShieldCheck } from 'lucide-react';

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
      <div className="min-h-screen bg-background">
        {/* Progress Header */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-12 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">Checkout</h1>
                <p className="text-muted-foreground text-lg">Secure your items with easy installments</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                    step === 'shipping' || step === 'payment' 
                      ? 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white shadow-lg shadow-indigo-200' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step === 'payment' ? <CheckCircle2 className="w-6 h-6" /> : '1'}
                  </div>
                  <span className={`font-bold ${step === 'shipping' ? 'text-foreground' : 'text-muted-foreground'}`}>Shipping</span>
                </div>
                <div className={`w-12 h-1 rounded-full ${step === 'payment' ? 'bg-[#6366f1]' : 'bg-muted'}`}></div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                    step === 'payment' 
                      ? 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white shadow-lg shadow-indigo-200' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                  <span className={`font-bold ${step === 'payment' ? 'text-foreground' : 'text-muted-foreground'}`}>Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Content */}
            <div className="lg:col-span-2">
              {step === 'shipping' ? (
                <Card className="p-6 md:p-10 rounded-3xl border-none shadow-xl shadow-gray-100/50">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-50 rounded-2xl text-[#6366f1]">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-foreground">Shipping Information</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">First Name</label>
                        <Input
                          name="firstName"
                          value={shippingData.firstName}
                          onChange={handleShippingChange}
                          placeholder="Ahmed"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">Last Name</label>
                        <Input
                          name="lastName"
                          value={shippingData.lastName}
                          onChange={handleShippingChange}
                          placeholder="Hassan"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">Email Address</label>
                        <Input
                          name="email"
                          type="email"
                          value={shippingData.email}
                          onChange={handleShippingChange}
                          placeholder="ahmed@example.com"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">Phone Number</label>
                        <Input
                          name="phone"
                          value={shippingData.phone}
                          onChange={handleShippingChange}
                          placeholder="+92 300 1234567"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70 ml-1">Street Address</label>
                      <Input
                        name="address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        placeholder="123 Main Street, Block 4"
                        className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">City</label>
                        <Input
                          name="city"
                          value={shippingData.city}
                          onChange={handleShippingChange}
                          placeholder="Karachi"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">Postal Code</label>
                        <Input
                          name="postalCode"
                          value={shippingData.postalCode}
                          onChange={handleShippingChange}
                          placeholder="75000"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleContinueToPayment}
                      className="w-full bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white text-base h-14 rounded-2xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-[0.99] font-bold mt-4"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 md:p-10 rounded-3xl border-none shadow-xl shadow-gray-100/50">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-50 rounded-2xl text-[#6366f1]">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-foreground">Payment Details</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#6366f1]/5 to-[#4f46e5]/5 border border-indigo-100 rounded-3xl p-6 md:p-8 mb-8">
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-2">Down Payment Due Today</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#4f46e5]">
                          ₨{downPayment.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-4 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        Remaining ₨{monthlyPayment.toLocaleString()}/mo for 12 months
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70 ml-1">Card Number</label>
                      <Input
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="0000 0000 0000 0000"
                        className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20 font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70 ml-1">Cardholder Name</label>
                      <Input
                        name="cardHolder"
                        value={paymentData.cardHolder}
                        onChange={handlePaymentChange}
                        placeholder="MUHAMMAD AHMED"
                        className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">Expiry Date</label>
                        <Input
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20 font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground/70 ml-1">CVV</label>
                        <Input
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="h-12 rounded-xl bg-muted/30 border-none focus:ring-2 focus:ring-[#6366f1]/20 font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-2xl mt-6">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                        I agree to the <Link href="#" className="text-[#6366f1] font-bold hover:underline">Terms of Service</Link> and authorize the initial down payment of ₨{downPayment.toLocaleString()}.
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep('shipping')}
                        className="flex-1 h-14 rounded-2xl border-2 font-bold"
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white text-base h-14 rounded-2xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-[0.99] font-bold"
                      >
                        {loading ? 'Processing...' : `Pay ₨${downPayment.toLocaleString()} & Place Order`}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 md:p-8 rounded-3xl border-none shadow-xl shadow-gray-100/50 sticky top-24">
                <h2 className="text-xl font-serif font-bold text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-muted">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Product Total</span>
                    <span className="font-bold text-foreground">₨{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="font-bold text-foreground">₨0</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-2xl">
                    <span className="font-bold text-foreground">Total Payable</span>
                    <span className="text-2xl font-bold text-foreground">₨{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <h3 className="text-sm font-bold text-[#6366f1] uppercase tracking-wider mb-3">Installment Plan</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Down Payment</span>
                      <span className="font-bold text-foreground">₨{downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly EMI</span>
                      <span className="font-bold text-foreground">₨{monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-bold text-foreground">12 Months</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Secure 256-bit SSL Encrypted Payment</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  );
}
