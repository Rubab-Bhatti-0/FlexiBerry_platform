'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const allProducts = [
  { id: '1', name: 'Samsung 55" Smart TV',        category: 'Electronics', price: 45000,   downPayment: 9000,   installment: 3750,  rating: 4.8, reviews: 324, image: '📺', badge: 'Best Seller', inStock: true  },
  { id: '2', name: 'Honda City 2023',              category: 'Vehicles',    price: 3500000, downPayment: 700000, installment: 233333,rating: 4.9, reviews: 156, image: '🚗', badge: 'Popular',     inStock: true  },
  { id: '3', name: 'Complete Bedroom Set',         category: 'Furniture',   price: 85000,   downPayment: 17000,  installment: 7083,  rating: 4.6, reviews: 89,  image: '🛏️', badge: '',            inStock: true  },
  { id: '4', name: 'Solar Panel System 5kW',       category: 'Energy',      price: 450000,  downPayment: 90000,  installment: 37500, rating: 4.7, reviews: 212, image: '⚡', badge: 'Hot Deal',    inStock: true  },
  { id: '5', name: 'Office Furniture Bundle',      category: 'Business',    price: 125000,  downPayment: 25000,  installment: 10417, rating: 4.5, reviews: 67,  image: '🖥️', badge: '',            inStock: true  },
  { id: '6', name: 'High-End Washing Machine',     category: 'Appliances',  price: 95000,   downPayment: 19000,  installment: 7917,  rating: 4.8, reviews: 178, image: '🧺', badge: 'New',         inStock: true  },
  { id: '7', name: 'iPhone 15 Pro Max 256GB',      category: 'Electronics', price: 320000,  downPayment: 64000,  installment: 26667, rating: 4.9, reviews: 543, image: '📱', badge: 'Premium',     inStock: true  },
  { id: '8', name: 'Split AC 1.5 Ton Inverter',   category: 'Appliances',  price: 75000,   downPayment: 15000,  installment: 6250,  rating: 4.7, reviews: 291, image: '❄️', badge: '',            inStock: false },
  { id: '9', name: 'Suzuki Cultus 2024',           category: 'Vehicles',    price: 2800000, downPayment: 560000, installment: 186667,rating: 4.6, reviews: 98,  image: '🚙', badge: '',            inStock: true  },
  { id:'10', name: 'L-Shaped Office Sofa',         category: 'Furniture',   price: 65000,   downPayment: 13000,  installment: 5417,  rating: 4.4, reviews: 44,  image: '🛋️', badge: '',            inStock: true  },
  { id:'11', name: '10kW Solar System Complete',   category: 'Energy',      price: 850000,  downPayment: 170000, installment: 70833, rating: 4.8, reviews: 132, image: '☀️', badge: 'Eco Choice',  inStock: true  },
  { id:'12', name: 'POS & Billing System',         category: 'Business',    price: 45000,   downPayment: 9000,   installment: 3750,  rating: 4.6, reviews: 55,  image: '💻', badge: '',            inStock: true  },
]

const categories = ['All', 'Electronics', 'Vehicles', 'Furniture', 'Energy', 'Business', 'Appliances']
const sortOptions = [
  { value: 'featured',     label: 'Featured'        },
  { value: 'price-asc',   label: 'Price: Low → High'},
  { value: 'price-desc',  label: 'Price: High → Low'},
  { value: 'rating-desc', label: 'Top Rated'        },
  { value: 'newest',      label: 'Newest'           },
]

export default function ProductsPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category')
      ? categories.find(c => c.toLowerCase() === searchParams.get('category')) || 'All'
      : 'All',
  )
  const [searchTerm,  setSearchTerm ] = useState('')
  const [sortBy,      setSortBy     ] = useState('featured')
  const [priceMax,    setPriceMax   ] = useState(5000000)
  const [wishlist,    setWishlist   ] = useState<Set<string>>(new Set())
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode,    setViewMode   ] = useState<'grid' | 'list'>('grid')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Filter + sort
  const filtered = allProducts
    .filter(p => {
      const matchCat    = selectedCategory === 'All' || p.category === selectedCategory
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchPrice  = p.price <= priceMax
      return matchCat && matchSearch && matchPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':   return a.price   - b.price
        case 'price-desc':  return b.price   - a.price
        case 'rating-desc': return b.rating  - a.rating
        default: return 0
      }
    })

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAddToCart = (id: string) => {
    setAddedToCart(prev => new Set([...prev, id]))
    setTimeout(() => {
      setAddedToCart(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🫐</span>
              <span className="text-xl font-serif font-bold text-foreground">FlexiBerry</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/"        className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/about"   className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link href="/auth/login" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Sign In</Link>
              <Link href="/auth/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all">
                Get Started
              </Link>
            </div>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`w-5 h-0.5 bg-foreground mb-1 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-5 h-0.5 bg-foreground mb-1 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-foreground transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-56' : 'max-h-0'}`}>
          <div className="px-4 pb-4 space-y-3 bg-background/95 border-t border-border">
            <Link href="/" className="block py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="block py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block py-2 text-foreground" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="flex gap-3 pt-1">
              <Link href="/auth/login"    className="flex-1 text-center py-2 border border-border rounded-lg text-sm">Sign In</Link>
              <Link href="/auth/register" className="flex-1 text-center py-2 bg-primary text-primary-foreground rounded-lg text-sm">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            {' / '}
            <span className="text-foreground font-medium">Products</span>
            {selectedCategory !== 'All' && (
              <> {' / '} <span className="text-accent">{selectedCategory}</span> </>
            )}
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <p className="text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found — flexible installments available on all items
          </p>
        </div>
      </div>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex justify-between items-center p-4 border border-border rounded-xl mb-4 bg-card"
            >
              <span className="font-medium">Filters & Search</span>
              <span className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}>▼</span>
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>

              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Search Products</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Category</label>
                <div className="space-y-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'hover:bg-secondary/60 text-foreground'
                      }`}
                    >
                      {cat}
                      <span className="float-right text-xs opacity-60">
                        {cat === 'All' ? allProducts.length : allProducts.filter(p => p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Max Price: <span className="text-accent">₨{priceMax.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={45000}
                  max={5000000}
                  step={5000}
                  value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₨45K</span>
                  <span>₨50L</span>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              {(selectedCategory !== 'All' || searchTerm || sortBy !== 'featured') && (
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchTerm(''); setSortBy('featured'); setPriceMax(5000000) }}
                  className="w-full py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/30"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products grid */}
          <div className="lg:col-span-3">

            {/* Toolbar */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}`}
                  aria-label="Grid view"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}`}
                  aria-label="List view"
                >
                  ☰
                </button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
                <Button
                  onClick={() => { setSelectedCategory('All'); setSearchTerm(''); setPriceMax(5000000) }}
                  variant="outline"
                  className="rounded-full"
                >
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <Card className="overflow-hidden card-hover h-full flex flex-col p-0 group">
                      <div className="product-img-wrapper bg-gradient-to-br from-accent/20 to-primary/10 h-44 flex items-center justify-center relative">
                        <span className="product-emoji text-6xl select-none">{product.image}</span>

                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                            {product.badge}
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                            <span className="text-sm font-semibold text-muted-foreground">Out of Stock</span>
                          </div>
                        )}

                        {/* Wishlist */}
                        <button
                          onClick={e => { e.preventDefault(); toggleWishlist(product.id) }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                          aria-label="Add to wishlist"
                        >
                          {wishlist.has(product.id) ? '❤️' : '🤍'}
                        </button>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs text-accent font-medium">{product.category}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="text-accent">★</span>
                            <span>{product.rating}</span>
                            <span>({product.reviews})</span>
                          </div>
                        </div>

                        <h3 className="font-serif font-bold text-foreground mb-3 flex-1 line-clamp-2 leading-snug">
                          {product.name}
                        </h3>

                        <div className="space-y-1 mb-4">
                          <p className="text-xl font-bold text-foreground">
                            ₨{product.price.toLocaleString()}
                          </p>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Down Payment:</span>
                            <span className="font-medium text-foreground">₨{product.downPayment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">12-Mo EMI:</span>
                            <span className="font-semibold text-accent">₨{product.installment.toLocaleString()}/mo</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/products/${product.id}`} className="flex-1">
                            <Button
                              variant="outline"
                              className="w-full text-sm h-9 rounded-lg hover:border-accent hover:text-accent transition-colors"
                              disabled={!product.inStock}
                            >
                              View Details
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleAddToCart(product.id)}
                            className="flex-1 text-sm h-9 rounded-lg bg-primary hover:bg-primary/90 transition-all"
                            disabled={!product.inStock}
                          >
                            {addedToCart.has(product.id) ? '✓ Added' : 'Add to Cart'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              /* List view */
              <div className="space-y-4">
                {filtered.map((product, i) => (
                  <Card
                    key={product.id}
                    className="p-5 hover:shadow-md transition-all animate-fade-in"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="flex gap-5 items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {product.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-xs text-accent font-medium">{product.category}</span>
                            <h3 className="font-serif font-bold text-foreground">{product.name}</h3>
                          </div>
                          <button onClick={() => toggleWishlist(product.id)} className="text-lg flex-shrink-0">
                            {wishlist.has(product.id) ? '❤️' : '🤍'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm">
                          <span className="font-bold text-foreground">₨{product.price.toLocaleString()}</span>
                          <span className="text-accent">₨{product.installment.toLocaleString()}/mo × 12</span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="text-accent">★</span>{product.rating}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Link href={`/products/${product.id}`}>
                          <Button variant="outline" size="sm" className="rounded-lg">View</Button>
                        </Link>
                        <Button
                          size="sm"
                          className="rounded-lg bg-primary"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={!product.inStock}
                        >
                          {addedToCart.has(product.id) ? '✓' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}