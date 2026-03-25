// 'use client';

// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

// export default function OrderSuccessPage() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('orderId') || 'FLX-001236';

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navigation */}
//       <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link href="/">
//               <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Success Content */}
//       <div className="max-w-2xl mx-auto px-4 py-20">
//         <div className="text-center mb-12">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Order Confirmed!</h1>
//           <p className="text-lg text-muted-foreground">
//             Thank you for your purchase. Your order has been successfully placed.
//           </p>
//         </div>

//         {/* Order Details */}
//         <Card className="p-8 mb-8 bg-secondary/10 border-primary/20">
//           <h2 className="font-serif font-bold text-foreground mb-6">Order Details</h2>

//           <div className="grid md:grid-cols-2 gap-8 mb-6 pb-6 border-b border-border">
//             <div>
//               <p className="text-muted-foreground text-sm mb-1">Order Number</p>
//               <p className="text-2xl font-mono font-bold text-foreground">{orderId}</p>
//             </div>
//             <div>
//               <p className="text-muted-foreground text-sm mb-1">Order Date</p>
//               <p className="text-xl font-medium text-foreground">{new Date().toLocaleDateString()}</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Samsung 55" Smart TV</span>
//               <span className="font-medium text-foreground">₨45,000</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Complete Bedroom Set</span>
//               <span className="font-medium text-foreground">₨85,000</span>
//             </div>
//             <div className="flex justify-between border-t border-border pt-4 mt-4">
//               <span className="font-bold text-foreground">Order Total</span>
//               <span className="text-2xl font-bold text-accent">₨130,000</span>
//             </div>
//           </div>
//         </Card>

//         {/* Payment Info */}
//         <Card className="p-8 mb-8">
//           <h2 className="font-serif font-bold text-foreground mb-6">Payment Schedule</h2>

//           <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-border">
//             <div className="bg-accent/10 rounded-lg p-4">
//               <p className="text-muted-foreground text-sm mb-2">Down Payment (Due Today)</p>
//               <p className="text-3xl font-bold text-accent">₨26,000</p>
//             </div>
//             <div className="bg-primary/10 rounded-lg p-4">
//               <p className="text-muted-foreground text-sm mb-2">12 Monthly Payments</p>
//               <p className="text-3xl font-bold text-foreground">₨10,833</p>
//             </div>
//           </div>

//           <p className="text-muted-foreground text-sm">
//             Your next installment will be due on April 15, 2024. Payment reminders will be sent to your email.
//           </p>
//         </Card>

//         {/* What's Next */}
//         <Card className="p-8 bg-secondary/10 border-border mb-8">
//           <h2 className="font-serif font-bold text-foreground mb-6">What's Next?</h2>

//           <div className="space-y-4">
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
//               <div>
//                 <p className="font-medium text-foreground">Order Confirmation</p>
//                 <p className="text-sm text-muted-foreground">You'll receive a confirmation email shortly with all details.</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
//               <div>
//                 <p className="font-medium text-foreground">Processing & Packing</p>
//                 <p className="text-sm text-muted-foreground">Your items will be prepared for shipment within 24-48 hours.</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
//               <div>
//                 <p className="font-medium text-foreground">Shipment</p>
//                 <p className="text-sm text-muted-foreground">Track your shipment in real-time from your dashboard.</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
//               <div>
//                 <p className="font-medium text-foreground">Delivery</p>
//                 <p className="text-sm text-muted-foreground">Receive your items and start enjoying them!</p>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Actions */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <Link href="/buyer/dashboard">
//             <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
//               View Order in Dashboard
//             </Button>
//           </Link>
//           <Link href="/products">
//             <Button variant="outline" className="w-full h-12">
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>

//         {/* Support */}
//         <div className="mt-12 text-center">
//           <p className="text-muted-foreground mb-2">Need help?</p>
//           <Link href="/support" className="text-accent hover:underline font-medium">
//             Contact our support team
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { Suspense } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

// function OrderSuccessContent() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('orderId') || 'FLX-001236';

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Navigation */}
//       <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link href="/">
//               <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Success Content */}
//       <div className="max-w-2xl mx-auto px-4 py-20">
//         <div className="text-center mb-12">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Order Confirmed!</h1>
//           <p className="text-lg text-muted-foreground">
//             Thank you for your purchase. Your order has been successfully placed.
//           </p>
//         </div>

//         {/* Order Details */}
//         <Card className="p-8 mb-8 bg-secondary/10 border-primary/20">
//           <h2 className="font-serif font-bold text-foreground mb-6">Order Details</h2>

//           <div className="grid md:grid-cols-2 gap-8 mb-6 pb-6 border-b border-border">
//             <div>
//               <p className="text-muted-foreground text-sm mb-1">Order Number</p>
//               <p className="text-2xl font-mono font-bold text-foreground">{orderId}</p>
//             </div>
//             <div>
//               <p className="text-muted-foreground text-sm mb-1">Order Date</p>
//               <p className="text-xl font-medium text-foreground">{new Date().toLocaleDateString()}</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Samsung 55" Smart TV</span>
//               <span className="font-medium text-foreground">₨45,000</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Complete Bedroom Set</span>
//               <span className="font-medium text-foreground">₨85,000</span>
//             </div>
//             <div className="flex justify-between border-t border-border pt-4 mt-4">
//               <span className="font-bold text-foreground">Order Total</span>
//               <span className="text-2xl font-bold text-accent">₨130,000</span>
//             </div>
//           </div>
//         </Card>

//         {/* Payment Info */}
//         <Card className="p-8 mb-8">
//           <h2 className="font-serif font-bold text-foreground mb-6">Payment Schedule</h2>

//           <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-border">
//             <div className="bg-accent/10 rounded-lg p-4">
//               <p className="text-muted-foreground text-sm mb-2">Down Payment (Due Today)</p>
//               <p className="text-3xl font-bold text-accent">₨26,000</p>
//             </div>
//             <div className="bg-primary/10 rounded-lg p-4">
//               <p className="text-muted-foreground text-sm mb-2">12 Monthly Payments</p>
//               <p className="text-3xl font-bold text-foreground">₨10,833</p>
//             </div>
//           </div>

//           <p className="text-muted-foreground text-sm">
//             Your next installment will be due on April 15, 2024. Payment reminders will be sent to your email.
//           </p>
//         </Card>

//         {/* What's Next */}
//         <Card className="p-8 bg-secondary/10 border-border mb-8">
//           <h2 className="font-serif font-bold text-foreground mb-6">What's Next?</h2>

//           <div className="space-y-4">
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
//               <div>
//                 <p className="font-medium text-foreground">Order Confirmation</p>
//                 <p className="text-sm text-muted-foreground">You'll receive a confirmation email shortly with all details.</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
//               <div>
//                 <p className="font-medium text-foreground">Processing & Packing</p>
//                 <p className="text-sm text-muted-foreground">Your items will be prepared for shipment within 24-48 hours.</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
//               <div>
//                 <p className="font-medium text-foreground">Shipment</p>
//                 <p className="text-sm text-muted-foreground">Track your shipment in real-time from your dashboard.</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
//               <div>
//                 <p className="font-medium text-foreground">Delivery</p>
//                 <p className="text-sm text-muted-foreground">Receive your items and start enjoying them!</p>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Actions */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <Link href="/buyer/dashboard">
//             <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
//               View Order in Dashboard
//             </Button>
//           </Link>
//           <Link href="/products">
//             <Button variant="outline" className="w-full h-12">
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>

//         {/* Support */}
//         <div className="mt-12 text-center">
//           <p className="text-muted-foreground mb-2">Need help?</p>
//           <Link href="/support" className="text-accent hover:underline font-medium">
//             Contact our support team
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function OrderSuccessPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
//       <OrderSuccessContent />
//     </Suspense>
//   );
// }


// import { Suspense } from 'react';
// import OrderSuccessContent from './OrderSuccessContent';

// export default function OrderSuccessPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
//       <OrderSuccessContent />
//     </Suspense>
//   );
// }


'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component, disable SSR
const OrderSuccessContent = dynamic(() => import('./OrderSuccessContent'), { ssr: false });

export default function OrderSuccessPage() {
  return <OrderSuccessContent />;
}
