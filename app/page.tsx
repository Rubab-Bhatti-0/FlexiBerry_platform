import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const categories = [
  { name: 'Electronics', icon: '🖥️', color: 'bg-blue-50' },
  { name: 'Vehicles', icon: '🚗', color: 'bg-green-50' },
  { name: 'Furniture', icon: '🛋️', color: 'bg-purple-50' },
  { name: 'Energy', icon: '⚡', color: 'bg-yellow-50' },
  { name: 'Business', icon: '💼', color: 'bg-orange-50' },
  { name: 'Appliances', icon: '🏠', color: 'bg-pink-50' },
];

const features = [
  {
    title: 'Flexible Installments',
    description: 'Pay in 6 or 12 months with minimal down payment',
  },
  {
    title: 'Trusted Sellers',
    description: 'Verified multi-vendor marketplace with quality assurance',
  },
  {
    title: 'Instant Verification',
    description: 'Quick KYC process to get started immediately',
  },
  {
    title: 'Secure Checkout',
    description: 'Safe payment processing with multiple options',
  },
];

const testimonials = [
  {
    name: 'Ahmed Hassan',
    role: 'Business Owner',
    comment: 'FlexiBerry made it easy to upgrade my office equipment. The installment plans are very reasonable.',
    rating: 5,
  },
  {
    name: 'Fatima Khan',
    role: 'Homemaker',
    comment: 'I found the perfect furniture set at a great price with flexible payments. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Muhammad Ali',
    role: 'Student',
    comment: 'Getting my first laptop was never this easy. The down payment option helped a lot.',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-serif font-bold text-foreground">FlexiBerry</h1>
            <div className="hidden md:flex items-center gap-8">
              <a href="#categories" className="text-foreground hover:text-accent transition">Browse</a>
              <a href="#features" className="text-foreground hover:text-accent transition">Why Us</a>
              <Link href="/auth/login" className="text-foreground hover:text-accent transition">Sign In</Link>
              <Link href="/auth/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                Get Started
              </Link>
            </div>
            <div className="md:hidden">
              <Link href="/auth/login" className="text-accent hover:text-accent/80">Menu</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-background via-background to-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
                Shop Premium Products on <span className="text-accent">Your Terms</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get electronics, vehicles, furniture, and more with flexible installment payment plans. Buy what you need, pay comfortably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register?type=buyer">
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12 px-8">
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full sm:w-auto text-base h-12 px-8">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <div className="text-8xl">🛍️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-center">Shop by Category</h2>
          <p className="text-center text-muted-foreground mb-12">Explore our wide range of products and services</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`}>
                <Card className={`${cat.color} p-6 text-center hover:shadow-lg transition cursor-pointer h-full`}>
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <p className="font-medium text-foreground">{cat.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-center">Why Choose FlexiBerry?</h2>
          <p className="text-center text-muted-foreground mb-12">We make shopping affordable and accessible for everyone</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(feat => (
              <Card key={feat.title} className="p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">{feat.title}</h3>
                <p className="text-muted-foreground text-sm">{feat.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Shop Smart?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of happy customers who've made their purchases affordable.</p>
          <Link href="/auth/register">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base h-12 px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-12 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <Card key={testimonial.name} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-serif font-bold mb-4">FlexiBerry</h3>
              <p className="opacity-80 text-sm">Making premium products accessible to everyone.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Categories</a></li>
                <li><a href="#" className="hover:opacity-100">Best Sellers</a></li>
                <li><a href="#" className="hover:opacity-100">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">About Us</a></li>
                <li><a href="#" className="hover:opacity-100">Careers</a></li>
                <li><a href="#" className="hover:opacity-100">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100">Contact Us</a></li>
                <li><a href="#" className="hover:opacity-100">FAQ</a></li>
                <li><a href="#" className="hover:opacity-100">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 FlexiBerry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
