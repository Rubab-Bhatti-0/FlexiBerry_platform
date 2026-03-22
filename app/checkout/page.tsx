'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
    // Validate shipping data
    if (!shippingData.firstName || !shippingData.email || !shippingData.address) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    if (!agreed) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);

    // Redirect to success page
    router.push('/order-success?orderId=FLX-001236');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
            </Link>
            <Link href="/cart" className="text-accent hover:text-accent/80">← Back to Cart</Link>
          </div>
        </div>
      </nav>

      {/* Progress */}
      <div className="bg-secondary/10 py-8 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              step === 'shipping' || step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 ${step === 'payment' ? 'bg-primary' : 'bg-border'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className={step === 'shipping' ? 'font-bold text-foreground' : 'text-muted-foreground'}>Shipping</span>
            <span className={step === 'payment' ? 'font-bold text-foreground' : 'text-muted-foreground'}>Payment</span>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <Card className="p-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Shipping Address</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <Input
                        name="firstName"
                        value={shippingData.firstName}
                        onChange={handleShippingChange}
                        placeholder="John"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <Input
                        name="lastName"
                        value={shippingData.lastName}
                        onChange={handleShippingChange}
                        placeholder="Doe"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={shippingData.email}
                      onChange={handleShippingChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      placeholder="+92 300 1234567"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Street Address</label>
                    <Input
                      name="address"
                      value={shippingData.address}
                      onChange={handleShippingChange}
                      placeholder="123 Main Street"
                      className="w-full"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City</label>
                      <Input
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        placeholder="Karachi"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Postal Code</label>
                      <Input
                        name="postalCode"
                        value={shippingData.postalCode}
                        onChange={handleShippingChange}
                        placeholder="75000"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleContinueToPayment}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12 mt-8"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {step === 'payment' && (
              <Card className="p-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Payment Method</h2>

                <div className="space-y-6">
                  {/* Down Payment */}
                  <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-6 mb-8">
                    <h3 className="font-serif font-bold text-foreground mb-4">Down Payment Due Today</h3>
                    <p className="text-4xl font-bold text-accent mb-2">₨{downPayment.toLocaleString()}</p>
                    <p className="text-muted-foreground text-sm">
                      After this, pay ₨{monthlyPayment.toLocaleString()} per month for 12 months
                    </p>
                  </div>

                  {/* Card Details */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                    <Input
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name</label>
                    <Input
                      name="cardHolder"
                      value={paymentData.cardHolder}
                      onChange={handlePaymentChange}
                      placeholder="JOHN DOE"
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                      <Input
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        className="w-full font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                      <Input
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        className="w-full font-mono"
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3 pt-6 border-t border-border">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <a href="#" className="text-accent hover:underline">
                        Terms of Service
                      </a>
                      {' '}and{' '}
                      <a href="#" className="text-accent hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setStep('shipping')}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h3 className="font-serif font-bold text-foreground mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground text-sm">Samsung 55" Smart TV</p>
                    <p className="text-muted-foreground text-xs">Qty: 1</p>
                  </div>
                  <p className="font-medium text-foreground">₨45,000</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground text-sm">Complete Bedroom Set</p>
                    <p className="text-muted-foreground text-xs">Qty: 1</p>
                  </div>
                  <p className="font-medium text-foreground">₨85,000</p>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₨{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">Free</span>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-muted-foreground text-sm mb-3">Payment Plan (12 Months)</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Down Payment</p>
                    <p className="text-xl font-bold text-accent">₨{downPayment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly EMI</p>
                    <p className="text-lg font-bold text-foreground">₨{monthlyPayment.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
