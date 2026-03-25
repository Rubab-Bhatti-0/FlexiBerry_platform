'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout';

const mockCartItems = [
  { id: '1', productId: '1', productName: 'Samsung 55" Smart TV', price: 45000, quantity: 1, installmentDuration: 12, image: '📺', seller: 'ElectroHub' },
  { id: '2', productId: '3', productName: 'Complete Bedroom Set', price: 85000, quantity: 1, installmentDuration: 12, image: '🛏️', seller: 'FurniPro' },
];

export default function CartPage() {
  const [items, setItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const downPayment = Math.round(subtotal * 0.2);
  const remaining = subtotal - downPayment;
  const monthlyPayment = Math.round(remaining / 12);

  const handleRemove = (id: string) => setItems(items.filter(i => i.id !== id));
  const handleQty = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems(items.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const handlePromo = () => { if (promoCode === 'SAVE10') setDiscount(Math.round(subtotal * 0.1)) };

  return (
    <FlexiLayout>
      <div className="min-h-screen bg-background">
        <div className="bg-secondary/10 py-8 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">Review your items before checkout</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map(item => (
                    <Card key={item.id} className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg w-full sm:w-32 h-32 flex items-center justify-center text-5xl flex-shrink-0">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-serif font-bold text-foreground">{item.productName}</h3>
                            <button onClick={() => handleRemove(item.id)} className="sm:hidden text-destructive hover:text-destructive/80">
                              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">by {item.seller}</p>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-muted-foreground text-xs md:text-sm mb-1">Unit Price</p>
                              <p className="font-bold text-foreground text-sm md:text-base">₨{item.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs md:text-sm mb-1">Installment</p>
                              <p className="font-bold text-accent text-sm md:text-base">{item.installmentDuration} months</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-start gap-3">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleQty(item.id, item.quantity - 1)} className="w-8 h-8 border border-border rounded-lg hover:bg-secondary/50 transition flex items-center justify-center">−</button>
                              <Input type="number" value={item.quantity} onChange={e => handleQty(item.id, parseInt(e.target.value) || 1)} className="w-12 md:w-16 text-center h-8" min="1" />
                              <button onClick={() => handleQty(item.id, item.quantity + 1)} className="w-8 h-8 border border-border rounded-lg hover:bg-secondary/50 transition flex items-center justify-center">+</button>
                            </div>
                            <div className="sm:hidden text-right">
                              <p className="text-lg font-bold text-foreground">₨{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:block text-right">
                          <p className="text-muted-foreground text-sm mb-4">Total</p>
                          <p className="text-2xl font-bold text-foreground mb-8">₨{(item.price * item.quantity).toLocaleString()}</p>
                          <button onClick={() => handleRemove(item.id)} className="text-destructive hover:text-destructive/80 text-sm font-medium">Remove</button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link href="/products"><Button className="bg-primary text-primary-foreground hover:bg-primary/90">Continue Shopping</Button></Link>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="font-serif font-bold text-foreground mb-6">Order Summary</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="flex-1" />
                    <Button onClick={handlePromo} variant="outline" className="px-4">Apply</Button>
                  </div>
                  {discount > 0 && <p className="text-green-600 text-sm mt-2">Discount applied: ₨{discount.toLocaleString()}</p>}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₨{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-green-600 font-medium">-₨{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">Free</span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 mb-6">
                  <div className="mb-3">
                    <p className="text-muted-foreground text-sm mb-1">Down Payment (20%)</p>
                    <p className="text-2xl font-bold text-accent">₨{downPayment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">12-Month EMI</p>
                    <p className="text-xl font-bold text-foreground">₨{monthlyPayment.toLocaleString()}/month</p>
                  </div>
                </div>

                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif font-bold text-foreground">Total</span>
                    <span className="text-3xl font-bold text-foreground">₨{(subtotal - discount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12">Proceed to Checkout</Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="w-full h-12">Continue Shopping</Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  );
}
