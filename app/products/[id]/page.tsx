'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';

const mockProductDetails = {
  '1': {
    name: 'Samsung 55" Smart TV',
    category: 'Electronics',
    seller: 'ElectroHub',
    price: 45000,
    downPayment: 15000,
    rating: 4.8,
    reviewCount: 324,
    image: '📺',
    description: 'Experience stunning 4K picture quality with HDR support. Smart TV with built-in streaming apps.',
    specifications: [
      'Screen Size: 55 inches',
      'Resolution: 4K UHD (3840 x 2160)',
      'HDR Support: Yes',
      'Smart Features: Built-in Apps',
      'Warranty: 2 Years',
    ],
    installmentOptions: [
      { months: 6, monthly: 5000, total: 45000 },
      { months: 12, monthly: 3750, total: 45000 },
    ],
    inStock: true,
  },
  '2': {
    name: 'Honda City 2023',
    category: 'Vehicles',
    seller: 'Auto Motors',
    price: 3500000,
    downPayment: 700000,
    rating: 4.9,
    reviewCount: 156,
    image: '🚗',
    description: 'Brand new Honda City 2023 model. Fuel efficient, reliable, and perfect for family use.',
    specifications: [
      'Engine: 1.5L Petrol',
      'Transmission: Automatic',
      'Fuel Efficiency: 16 km/l',
      'Seating: 5 passengers',
      'Warranty: 5 Years',
    ],
    installmentOptions: [
      { months: 6, monthly: 466666, total: 3500000 },
      { months: 12, monthly: 233333, total: 3500000 },
    ],
    inStock: true,
  },
  '3': {
    name: 'Complete Bedroom Set',
    category: 'Furniture',
    seller: 'FurniPro',
    price: 85000,
    downPayment: 25000,
    rating: 4.6,
    reviewCount: 89,
    image: '🛏️',
    description: 'Beautiful bedroom set including bed frame, mattress, and two nightstands. Premium quality materials.',
    specifications: [
      'Materials: Solid Wood',
      'Bed Size: Queen Size',
      'Includes: Bed, Mattress, 2 Nightstands',
      'Finish: Walnut',
      'Delivery: Free Installation',
    ],
    installmentOptions: [
      { months: 6, monthly: 10000, total: 85000 },
      { months: 12, monthly: 7083, total: 85000 },
    ],
    inStock: true,
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = mockProductDetails[productId as keyof typeof mockProductDetails];
  const [quantity, setQuantity] = useState(1);
  const [selectedInstallment, setSelectedInstallment] = useState(12);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/">
                <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-96">
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </div>
    );
  }

  const selectedPlan = product.installmentOptions.find(opt => opt.months === selectedInstallment);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
            </Link>
            <Link href="/products" className="text-accent hover:text-accent/80">← Back to Products</Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-secondary/10 py-4 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto text-sm text-muted-foreground">
          <Link href="/products" className="hover:text-foreground">Products</Link>
          {' > '}
          <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
            {product.category}
          </Link>
          {' > '}
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg h-96 flex items-center justify-center text-9xl mb-6">
              {product.image}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg h-24 flex items-center justify-center text-4xl cursor-pointer hover:opacity-80 transition"
                >
                  {product.image}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <p className="text-accent text-sm font-medium mb-2">{product.category} by {product.seller}</p>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-accent">★</span>
                  <span className="text-foreground font-medium">{product.rating}</span>
                  <span className="text-muted-foreground text-sm">({product.reviewCount} reviews)</span>
                </div>
                {product.inStock && (
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    In Stock
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-8">{product.description}</p>
            </div>

            {/* Pricing */}
            <Card className="p-6 mb-6 bg-primary/5 border-primary/10">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm mb-2">Total Price</p>
                <p className="text-4xl font-bold text-foreground mb-4">₨{product.price.toLocaleString()}</p>
                <p className="text-muted-foreground text-sm">
                  Down Payment: <span className="font-medium text-foreground">₨{product.downPayment.toLocaleString()}</span>
                </p>
              </div>
            </Card>

            {/* Installment Options */}
            <div className="mb-8">
              <h3 className="font-serif font-bold text-foreground mb-4">Choose Payment Plan</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.installmentOptions.map(option => (
                  <button
                    key={option.months}
                    onClick={() => setSelectedInstallment(option.months)}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedInstallment === option.months
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <p className="font-medium text-foreground mb-1">{option.months} Months</p>
                    <p className="text-sm text-accent">₨{Math.round(option.monthly).toLocaleString()}/month</p>
                  </button>
                ))}
              </div>

              {selectedPlan && (
                <Card className="p-4 bg-secondary/30 border-border mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Monthly Payment</p>
                      <p className="font-bold text-foreground">₨{Math.round(selectedPlan.monthly).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Total Payments</p>
                      <p className="font-bold text-foreground">{selectedPlan.months}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-secondary/50 transition flex items-center justify-center"
                >
                  −
                </button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-secondary/50 transition flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => setAddedToCart(true)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12"
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </Button>
              <Link href="/auth/login" className="block">
                <Button variant="outline" className="w-full h-12 text-base">
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Specifications</h2>
            <div className="space-y-3">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-muted-foreground">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Seller Information</h2>
            <Card className="p-6">
              <h3 className="text-lg font-serif font-bold text-foreground mb-4">{product.seller}</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>✓ Verified Seller</p>
                <p>✓ {product.reviewCount}+ Happy Customers</p>
                <p>✓ Fast & Reliable Delivery</p>
                <p>✓ 100% Secure Checkout</p>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Seller Shop
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
