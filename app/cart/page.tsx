'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, ShieldCheck } from 'lucide-react';

const mockCartItems = [
  { id: '1', productId: '1', productName: 'Samsung 55" Smart TV', price: 45000, quantity: 1, installmentDuration: 12, image: '📺', seller: 'ElectroHub' },
  { id: '2', productId: '3', productName: 'Complete Bedroom Set', price: 85000, quantity: 1, installmentDuration: 12, image: '🛏️', seller: 'FurniPro' },
];

export default function CartPage() {
  const router = useRouter();
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

  const handleProceedToCheckout = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      // Redirect to login with return path back to cart
      router.push('/auth/login?redirect=/cart');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <FlexiLayout>
      <div className="min-h-screen bg-[#f4f5fb]">
        {/* Header Section */}
        <div className="bg-white py-12 px-4 border-b border-[#e5e7eb] shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-[#111827] mb-2 tracking-tight">Shopping Cart</h1>
              <p className="text-[#6b7280] text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                <ShoppingBag size={20} className="text-[#6366f1]" />
                Review your items before securing your plan
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
               <div className="bg-[#f5f3ff] border border-[#ddd6fe] px-6 py-3 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <ShieldCheck className="text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-[#4f46e5]">Secure Checkout</p>
                    <p className="text-xs font-bold text-[#111827]">0% Interest Available</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              {items.length > 0 ? (
                <div className="space-y-6">
                  {items.map(item => (
                    <Card key={item.id} className="p-5 md:p-8 border-none shadow-xl shadow-gray-200/50 rounded-[2rem] bg-white transition-all hover:shadow-2xl hover:shadow-indigo-100/50 group">
                      <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                        {/* Product Image Wrapper */}
                        <div className="bg-[#f8f9fd] rounded-[1.5rem] w-full sm:w-40 h-40 flex items-center justify-center text-6xl flex-shrink-0 border border-[#f0f0f6] group-hover:scale-105 transition-transform duration-500">
                          {item.image}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-2xl font-serif font-bold text-[#111827] group-hover:text-[#6366f1] transition-colors">{item.productName}</h3>
                              <button onClick={() => handleRemove(item.id)} className="p-2 text-[#9ca3af] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <Trash2 size={20} />
                              </button>
                            </div>
                            <p className="text-sm font-bold text-[#6366f1] mb-6 flex items-center gap-1">
                              <span className="text-[#9ca3af] font-medium">Verified Seller:</span> {item.seller}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-8 mb-6">
                              <div className="space-y-1">
                                <p className="text-[#9ca3af] text-xs uppercase tracking-widest font-bold">Unit Price</p>
                                <p className="text-xl font-black text-[#111827]">₨{item.price.toLocaleString()}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[#9ca3af] text-xs uppercase tracking-widest font-bold">Plan Duration</p>
                                <div className="inline-flex items-center gap-2 bg-[#f5f3ff] text-[#4f46e5] px-3 py-1 rounded-lg text-sm font-bold">
                                  {item.installmentDuration} Months
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-start gap-6 pt-4 border-t border-[#f3f4f6]">
                            <div className="flex items-center gap-4 bg-[#f8f9fd] p-1.5 rounded-2xl border border-[#f0f0f6]">
                              <button onClick={() => handleQty(item.id, item.quantity - 1)} className="w-10 h-10 bg-white shadow-sm border border-[#e5e7eb] rounded-xl hover:text-[#6366f1] hover:border-[#6366f1] transition-all flex items-center justify-center text-xl font-bold">
                                <Minus size={18} />
                              </button>
                              <Input type="number" value={item.quantity} onChange={e => handleQty(item.id, parseInt(e.target.value) || 1)} className="w-12 text-center border-none bg-transparent font-black text-lg focus-visible:ring-0" min="1" />
                              <button onClick={() => handleQty(item.id, item.quantity + 1)} className="w-10 h-10 bg-white shadow-sm border border-[#e5e7eb] rounded-xl hover:text-[#6366f1] hover:border-[#6366f1] transition-all flex items-center justify-center text-xl font-bold">
                                <Plus size={18} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-[#9ca3af] text-xs uppercase tracking-widest font-bold mb-1">Total</p>
                              <p className="text-2xl font-black text-[#111827]">₨{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-20 text-center border-none shadow-xl shadow-gray-200/50 rounded-[3rem] bg-white">
                  <div className="w-24 h-24 bg-[#f5f3ff] rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShoppingBag size={48} className="text-[#6366f1]" />
                  </div>
                  <h2 className="text-3xl font-serif font-black text-[#111827] mb-4">Your cart is empty</h2>
                  <p className="text-[#6b7280] mb-10 text-lg">Looks like you haven't added anything to your cart yet.</p>
                  <Link href="/products">
                    <Button className="h-16 px-10 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white rounded-2xl text-lg font-bold shadow-xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                      Explore Products
                    </Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-8 sticky top-24 border-none shadow-2xl shadow-indigo-100/30 rounded-[2.5rem] bg-white overflow-hidden">
                {/* Decorative Top Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6366f1] to-[#4f46e5]" />
                
                <h2 className="text-2xl font-serif font-black text-[#111827] mb-8 flex items-center gap-2">
                  <Tag size={24} className="text-[#6366f1]" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <label className="block text-sm font-bold text-[#374151] ml-1">Have a Promo Code?</label>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="SAVE10" 
                      value={promoCode} 
                      onChange={e => setPromoCode(e.target.value)} 
                      className="h-14 rounded-2xl bg-[#f8f9fd] border-[#e5e7eb] focus:border-[#6366f1] focus:ring-[#6366f1]/10 font-bold" 
                    />
                    <Button onClick={handlePromo} variant="outline" className="h-14 px-6 rounded-2xl border-2 font-bold hover:bg-[#f5f3ff] hover:text-[#6366f1] transition-all">Apply</Button>
                  </div>
                  {discount > 0 && <p className="text-green-600 text-sm font-bold flex items-center gap-1 ml-1">✅ 10% Discount Applied!</p>}
                </div>

                <div className="space-y-4 mb-8 pb-8 border-b border-[#f3f4f6]">
                  <div className="flex justify-between items-center text-[#6b7280]">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-black text-[#111827]">₨{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#6b7280] font-medium">Discount</span>
                      <span className="text-green-600 font-black">-₨{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-[#6b7280]">
                    <span className="font-medium">Shipping</span>
                    <span className="text-green-600 font-black uppercase text-xs tracking-widest">Free</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#6366f1]/5 to-[#4f46e5]/5 rounded-3xl p-6 mb-8 border border-indigo-50">
                  <div className="mb-6">
                    <p className="text-[#4f46e5] text-[10px] uppercase tracking-widest font-black mb-2">Down Payment (20%)</p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#4f46e5]">₨{downPayment.toLocaleString()}</p>
                  </div>
                  <div className="pt-5 border-t border-indigo-100">
                    <p className="text-[#6b7280] text-[10px] uppercase tracking-widest font-black mb-2">Monthly Installment</p>
                    <p className="text-2xl font-black text-[#111827]">₨{monthlyPayment.toLocaleString()}<span className="text-sm font-medium text-[#9ca3af]">/mo</span></p>
                  </div>
                </div>

                <div className="mb-10">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-lg font-serif font-bold text-[#111827]">Total Payable</span>
                    <span className="text-3xl font-black text-[#111827]">₨{(subtotal - discount).toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-[#9ca3af] font-bold uppercase tracking-widest text-right">Includes all taxes</p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleProceedToCheckout}
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white text-lg h-16 rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold flex items-center justify-center gap-3"
                  >
                    Proceed to Checkout
                    <ArrowRight size={22} />
                  </Button>
                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-bold hover:bg-muted transition-all">Continue Shopping</Button>
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
