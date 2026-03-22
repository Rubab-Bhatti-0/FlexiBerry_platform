'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ── DATA ───────────────────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  { emoji: '📱', text: 'iPhone 15 Pro — Starting PKR 45,833/mo' },
  { emoji: '🏍️', text: 'Honda CD 70 on Easy Installments' },
  { emoji: '📦', text: 'Jahez Packages — Bundle & Save 50%' },
  { emoji: '☀️', text: 'Solar Systems — Go Green Today' },
  { emoji: '🚚', text: 'Free Nationwide Delivery' },
  { emoji: '🎉', text: '0% Commission for first 90 days!' },
  { emoji: '📱', text: 'iPhone 15 Pro — Starting PKR 45,833/mo' },
  { emoji: '🏍️', text: 'Honda CD 70 on Easy Installments' },
  { emoji: '📦', text: 'Jahez Packages — Bundle & Save 50%' },
  { emoji: '☀️', text: 'Solar Systems — Go Green Today' },
  { emoji: '🚚', text: 'Free Nationwide Delivery' },
  { emoji: '🎉', text: '0% Commission for first 90 days!' },
]

const SLIDES = [
  {
    id: 1,
    img: '/assets/carousel-1.jpg',
    badge: '📱 Smartphones',
    heading: 'Buy Smart,',
    accent: 'Pay Easy',
    sub: 'Latest iPhones & Samsung Galaxy with 6–12 month installment plans. No credit card needed.',
    cta: 'Shop Smartphones',
    href: '/products?category=smartphones',
  },
  {
    id: 2,
    img: '/assets/carousel-2.jpg',
    badge: '💻 Laptops',
    heading: 'Work Smarter,',
    accent: 'Pay Later',
    sub: 'MacBooks, Dell, HP & more — premium laptops on easy monthly plans.',
    cta: 'Shop Laptops',
    href: '/products?category=laptops',
  },
  {
    id: 3,
    img: '/assets/carousel-3.jpg',
    badge: '🏍️ Bikes',
    heading: 'Ride Free,',
    accent: 'Pay Monthly',
    sub: 'Honda CD 70, Yamaha, Suzuki — get your bike on easy installments today.',
    cta: 'Shop Bikes',
    href: '/products?category=bikes',
  },
  {
    id: 4,
    img: '/assets/carousel-4.jpg',
    badge: '☀️ Solar',
    heading: 'Go Green,',
    accent: 'Save More',
    sub: '5kW–20kW solar systems. Slash your electricity bill with flexible payment plans.',
    cta: 'Shop Solar',
    href: '/products?category=solar',
  },
  {
    id: 5,
    img: '/assets/carousel-5.jpg',
    badge: '🏠 Appliances',
    heading: 'Upgrade Home,',
    accent: 'Affordably',
    sub: 'AC, Fridge, Washing Machine — top brands on 6 or 12 month installments.',
    cta: 'Shop Appliances',
    href: '/products?category=appliances',
  },
  {
    id: 6,
    img: '/assets/carousel-6.jpg',
    badge: '🛋️ Furniture',
    heading: 'Furnish Dreams,',
    accent: 'Pay Easy',
    sub: 'Complete home & office furniture sets. Beautiful spaces, flexible payments.',
    cta: 'Shop Furniture',
    href: '/products?category=furniture',
  },
  {
    id: 7,
    img: '/assets/carousel-7.jpg',
    badge: '📦 Jahez',
    heading: 'Bundle Up,',
    accent: 'Save Big',
    sub: '4–5 item Jahez packages for weddings & new homes. Save up to 50% on bundles.',
    cta: 'Shop Packages',
    href: '/products?category=jahez',
  },
  {
    id: 8,
    img: '/assets/carousel-8.jpg',
    badge: '🚗 Cars',
    heading: 'Drive Today,',
    accent: 'Pay Monthly',
    sub: 'Car financing made easy. Honda, Toyota, Suzuki on flexible installment plans.',
    cta: 'Car Financing',
    href: '/products?category=cars',
  },
  {
    id: 9,
    img: '/assets/carousel-9.jpg',
    badge: '💼 Business',
    heading: 'Grow Business,',
    accent: 'Smart Way',
    sub: 'Raw materials, stock & business equipment. Fund your growth today.',
    cta: 'Shop Business',
    href: '/products?category=business',
  },
]

const CATEGORIES = [
  { name: 'Smartphones',    sub: 'Latest iPhones & Android',     emoji: '📱', bg: 'bg-rose-50',    slug: 'smartphones' },
  { name: 'Laptops',        sub: 'MacBooks, Gaming & More',       emoji: '💻', bg: 'bg-violet-50',  slug: 'laptops'     },
  { name: 'Scotty & Bikes', sub: 'Motor Cycles & Scotties',       emoji: '🏍️', bg: 'bg-orange-50',  slug: 'bikes'       },
  { name: 'Appliances',     sub: 'AC, LED, Fridge & More',        emoji: '🌀', bg: 'bg-blue-50',    slug: 'appliances'  },
  { name: 'Solar Systems',  sub: 'Complete Solar Solutions',      emoji: '☀️', bg: 'bg-yellow-50',  slug: 'solar'       },
  { name: 'Furniture',      sub: 'Home & Office Furniture',       emoji: '🛋️', bg: 'bg-teal-50',    slug: 'furniture'   },
  { name: 'Jahez Packages', sub: 'Bundle 4–5 Item Packages',      emoji: '📦', bg: 'bg-pink-50',    slug: 'jahez'       },
  { name: 'Car Financing',  sub: 'Easy Car Installments',         emoji: '🚗', bg: 'bg-cyan-50',    slug: 'cars'        },
  { name: 'Business Stock', sub: 'Raw Materials & Stock',         emoji: '🏭', bg: 'bg-green-50',   slug: 'business'    },
  { name: 'General Store',  sub: 'Everything Else',               emoji: '🛒', bg: 'bg-amber-50',   slug: 'general'     },
]

const PRODUCTS = [
  {
    id: '1',
    img: '/assets/carousel-1.jpg',
    vendor: 'TechZone Official Store',
    name: 'iPhone 15 Pro Max 256GB',
    price: 549999,
    original: 599999,
    monthly: 45834,
    rating: 4.8,
    reviews: 234,
    badge: -8,
  },
  {
    id: '2',
    img: '/assets/carousel-2.jpg',
    vendor: 'DigiWorld Electronics',
    name: 'MacBook Air M3 15"',
    price: 429999,
    original: null,
    monthly: 35834,
    rating: 4.9,
    reviews: 156,
    badge: -6,
  },
  {
    id: '3',
    img: '/assets/carousel-3.jpg',
    vendor: 'SpeedRiders Pk',
    name: 'Honda CD 70 2026',
    price: 155000,
    original: 165000,
    monthly: 12917,
    rating: 4.5,
    reviews: 89,
    badge: -6,
  },
  {
    id: '4',
    img: '/assets/carousel-7.jpg',
    vendor: 'StyleHub Fashion',
    name: 'Complete Jahez Package Gold',
    price: 850000,
    original: 950000,
    monthly: 70834,
    rating: 4.3,
    reviews: 28,
    badge: -11,
  },
  {
    id: '5',
    img: '/assets/carousel-4.jpg',
    vendor: 'GreenPower Solutions',
    name: '5KW Solar Panel System',
    price: 650000,
    original: null,
    monthly: 54167,
    rating: 4.7,
    reviews: 45,
    badge: null,
  },
]

const VENDORS = [
  {
    name: 'TechZone Electronics',
    cat: 'Electronics',
    catColor: 'text-blue-600 bg-blue-50',
    desc: 'Premium electronics & gadgets',
    rating: 4.8,
    products: 156,
    gradient: 'from-blue-500 to-indigo-600',
    topBar: 'bg-blue-500',
    emoji: '⚡',
  },
  {
    name: 'HomeKart Pakistan',
    cat: 'Home & Living',
    catColor: 'text-emerald-600 bg-emerald-50',
    desc: 'Appliances, furniture & packages',
    rating: 4.6,
    products: 243,
    gradient: 'from-emerald-500 to-teal-600',
    topBar: 'bg-emerald-500',
    emoji: '🏠',
  },
  {
    name: 'MegaDeal Motors',
    cat: 'Motors & Energy',
    catColor: 'text-violet-600 bg-violet-50',
    desc: 'Vehicles, solar & heavy items',
    rating: 4.7,
    products: 89,
    gradient: 'from-violet-500 to-purple-600',
    topBar: 'bg-violet-500',
    emoji: '🚗',
  },
]

const FAQS = [
  { q: 'How do installment plans work on FlexiBerry?',    a: 'Choose any product, select 6 or 12 month plan, pay a small down payment today, and the rest splits into equal monthly installments. No hidden charges, no credit card needed.' },
  { q: 'What documents are needed for KYC verification?', a: 'You need your CNIC (front & back), a clear selfie, and a salary slip or bank statement. Verification usually takes 3–5 business days.' },
  { q: 'Is there any interest on installment plans?',     a: 'Selected items are 0% interest. For others, a small markup may apply depending on the product category. All charges are shown clearly before checkout.' },
  { q: 'How can I become a vendor on FlexiBerry?',        a: 'Click "Sell as Vendor" in the navbar, fill out the registration form, submit your business documents, and our team will review your application within 48 hours.' },
  { q: 'What is the return and refund policy?',           a: '7-day return policy on most items. Products must be in original condition. Refunds are processed within 5–7 business days after inspection.' },
  { q: 'Is my payment information secure?',              a: 'Yes. We use bank-grade SSL encryption. We never store your full card details — all transactions are processed through verified payment gateways.' },
]

const SAMPLE_PRICE = 120000

/* ── PAGE ───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [slide,        setSlide       ] = useState(0)
  const [productTab,   setProductTab  ] = useState<'featured'|'trending'|'new'>('featured')
  const [openFaq,      setOpenFaq     ] = useState<number|null>(null)
  const [wishlist,     setWishlist    ] = useState<Set<string>>(new Set())
  const [mobileOpen,   setMobileOpen  ] = useState(false)
  const [catOpen,      setCatOpen     ] = useState(false)
  const [vendorOpen,   setVendorOpen  ] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval>|null>(null)

  const startAuto = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setSlide(p => (p + 1) % SLIDES.length), 5000)
  }
  useEffect(() => { startAuto(); return () => { if (timer.current) clearInterval(timer.current) } }, [])

  const goTo = (i: number) => { setSlide(i); startAuto() }
  const prev = () => goTo((slide - 1 + SLIDES.length) % SLIDES.length)
  const next = () => goTo((slide + 1) % SLIDES.length)

  const toggleWish = (id: string) =>
    setWishlist(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })

  const s = SLIDES[slide]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>

      {/* ── TICKER ─────────────────────────────────────────────────────── */}
      <div className="bg-[#1a1f5e] text-white text-xs font-medium overflow-hidden py-2">
        <div style={{ display: 'flex', animation: 'marquee 32s linear infinite', whiteSpace: 'nowrap' }}>
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-5">
              <span>{item.emoji}</span>
              <span>{item.text}</span>
              <span className="opacity-25 pl-4">•</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Top row */}
          <div className="flex items-center gap-3 h-[62px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                   style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>FB</div>
              <div>
                <div className="font-bold text-gray-900 text-[17px] leading-none">
                  Flexi<span style={{ color: '#6366f1' }}>Berry</span>
                </div>
                <div className="text-[9px] text-gray-400 tracking-widest uppercase">Shop · Pay · Smile</div>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-3 hidden md:flex">
              <div className="flex w-full rounded-xl border border-gray-200 overflow-hidden hover:border-indigo-400 transition-colors">
                <input className="flex-1 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none bg-white"
                       placeholder="Search products, brands and categories..." />
                <button className="px-4 flex items-center justify-center" style={{ background: '#6366f1' }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">
              <Link href="/auth/login" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Login
              </Link>
              <button className="hidden md:flex w-9 h-9 rounded-full border border-gray-200 hover:border-indigo-400 items-center justify-center text-gray-500 hover:text-indigo-500 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
              <Link href="/cart"
                    className="relative flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-opacity hover:opacity-90"
                    style={{ background: '#6366f1' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Cart
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">0</span>
              </Link>
              {/* Mobile menu btn */}
              <button className="md:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Nav row */}
          <div className="flex items-center h-11 gap-0.5 border-t border-gray-100">

            {/* All Categories */}
            <div className="relative">
              <button
                onClick={() => { setCatOpen(!catOpen); setVendorOpen(false) }}
                className="flex items-center gap-2 h-11 px-4 text-sm font-semibold text-white"
                style={{ background: '#6366f1' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                All Categories
                <svg className={`w-3.5 h-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 w-72 bg-white border border-gray-100 shadow-2xl rounded-b-2xl z-50 py-2 max-h-80 overflow-y-auto">
                  {CATEGORIES.map(c => (
                    <Link key={c.slug} href={`/products?category=${c.slug}`}
                          onClick={() => setCatOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                      <span className="text-xl">{c.emoji}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/" className="flex items-center gap-1.5 px-4 h-11 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              🏠 Home
            </Link>
            <Link href="/products?sale=true" className="flex items-center gap-1.5 px-4 h-11 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              ⚡ Flash Sale
            </Link>
            <Link href="/products?sort=new" className="flex items-center gap-1.5 px-4 h-11 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              ✨ New Arrivals
            </Link>

            {/* Sell as Vendor */}
            <div className="relative ml-1">
              <button
                onClick={() => { setVendorOpen(!vendorOpen); setCatOpen(false) }}
                className="flex items-center gap-1.5 px-4 h-9 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-all"
              >
                🏪 Sell as Vendor
                <svg className={`w-3.5 h-3.5 transition-transform ${vendorOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {vendorOpen && (
                <div className="absolute top-full left-0 w-52 bg-white border border-gray-100 shadow-xl rounded-xl z-50 py-2 mt-1">
                  <Link href="/auth/register?type=seller" onClick={() => setVendorOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                    Register as Vendor
                  </Link>
                  <Link href="/vendor/dashboard" onClick={() => setVendorOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                    Vendor Dashboard
                  </Link>
                  <Link href="#how-it-works" onClick={() => setVendorOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                    How to Sell
                  </Link>
                </div>
              )}
            </div>

            {/* Shop Now pill */}
            <div className="ml-auto">
              <Link href="/products"
                    className="flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-full transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6)' }}>
                <span>⚡</span>
                Shop Now · Pay in Installments
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-screen' : 'max-h-0'} border-t border-gray-100 bg-white`}>
          <div className="px-4 py-3">
            <input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none mb-3" placeholder="Search..." />
            <div className="space-y-1">
              {CATEGORIES.map(c => (
                <Link key={c.slug} href={`/products?category=${c.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  <span>{c.emoji}</span><span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO CAROUSEL ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black" style={{ height: 460 }}>
        {SLIDES.map((sl, i) => (
          <div key={sl.id}
               className="absolute inset-0 transition-opacity duration-700"
               style={{ opacity: i === slide ? 1 : 0, pointerEvents: i === slide ? 'auto' : 'none' }}>
            {/* BG image */}
            <div className="absolute inset-0">
              <Image src={sl.img} alt={sl.heading} fill className="object-cover object-center"
                     priority={i === 0} sizes="100vw"
                     onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.45) 55%,transparent 100%)' }} />
            </div>
            {/* Text */}
            <div className="relative z-10 max-w-screen-xl mx-auto px-6 h-full flex items-center">
              <div style={{ maxWidth: 520 }}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-medium mb-4 border border-white/25"
                      style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}>
                  {sl.badge}
                </span>
                <h1 className="text-5xl font-bold text-white leading-tight mb-0">{sl.heading}</h1>
                <h1 className="text-5xl font-bold leading-tight mb-4" style={{ color: '#f97316' }}>{sl.accent}</h1>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">{sl.sub}</p>
                <Link href={sl.href}
                      className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl"
                      style={{ background: '#f97316' }}>
                  {sl.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
            </div>
            {/* Counter */}
            <div className="absolute bottom-4 right-5 text-white/35 text-xs font-mono">
              {String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </div>
          </div>
        ))}

        {/* Arrows */}
        {[{ fn: prev, d: 'M15 19l-7-7 7-7', side: 'left-4' }, { fn: next, d: 'M9 5l7 7-7 7', side: 'right-4' }].map((btn, i) => (
          <button key={i} onClick={btn.fn}
                  className={`absolute ${btn.side} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110`}
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.d}/>
            </svg>
          </button>
        ))}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{ width: i === slide ? 24 : 8, height: 8, background: i === slide ? '#f97316' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-gray-50/60">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Shop by Category</h2>
          <p className="text-gray-500 text-sm mb-7">Find what you need across 10+ categories</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map(cat => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`}
                    className={`${cat.bg} rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md group border border-transparent hover:border-gray-200`}>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cat.emoji}
                </div>
                <div className="font-semibold text-gray-800 text-sm">{cat.name}</div>
                <div className="text-gray-500 text-xs mt-0.5">{cat.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ───────────────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-1 border border-gray-200 rounded-xl p-1">
              {(['featured', 'trending', 'new'] as const).map(tab => (
                <button key={tab} onClick={() => setProductTab(tab)}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize"
                        style={productTab === tab ? { background: '#6366f1', color: 'white' } : { color: '#4b5563' }}>
                  {tab === 'featured' ? '⭐ Featured Products' : tab === 'trending' ? '📈 Trending' : '🆕 New'}
                </button>
              ))}
            </div>
            <Link href="/products" className="text-sm font-medium flex items-center gap-1 hover:underline" style={{ color: '#6366f1' }}>
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PRODUCTS.map(p => (
              <div key={p.id}
                   className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                {/* Image */}
                <div className="relative bg-gray-50 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                         sizes="(max-width:768px) 50vw,20vw"
                         onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  {p.badge && (
                    <span className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded"
                          style={{ background: 'rgba(0,0,0,0.65)' }}>
                      {p.badge}%
                    </span>
                  )}
                  <button onClick={() => toggleWish(p.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-sm shadow-sm">
                    {wishlist.has(p.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center gap-1 text-xs font-semibold mb-1" style={{ color: '#6366f1' }}>
                    <span className="w-3.5 h-3.5 rounded flex items-center justify-center text-[10px]"
                          style={{ background: 'rgba(99,102,241,0.1)' }}>🏪</span>
                    {p.vendor}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-snug">{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base font-bold text-gray-900">PKR {p.price.toLocaleString()}</span>
                    {p.original && <span className="text-xs text-gray-400 line-through">PKR {p.original.toLocaleString()}</span>}
                  </div>
                  {/* EMI pill */}
                  <div className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 mb-3" style={{ background: 'rgba(99,102,241,0.08)' }}>
                    <span className="text-[11px]">💳</span>
                    <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>
                      PKR {p.monthly.toLocaleString()}/mo × 12
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="text-yellow-400">★</span>
                      {p.rating} ({p.reviews})
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-lg transition-opacity hover:opacity-90"
                            style={{ background: '#6366f1' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALLMENTS BANNER ────────────────────────────────────────── */}
      <section className="py-6 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-white"
               style={{ background: 'linear-gradient(135deg,#3730d9 0%,#7c3aed 50%,#059669 100%)' }}>
            {/* Blobs */}
            <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full opacity-10 -translate-y-1/2"
                 style={{ background: 'white' }} />
            <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full opacity-10 translate-y-1/2"
                 style={{ background: 'white' }} />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/25"
                      style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}>
                  ✨ Easy Installments
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                  Buy Anything on<br />6 or 12 Month Plans
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-md">
                  No credit card needed. Just upload your CNIC and bank statement, get approved in 3–5 days, and start paying in easy monthly installments.
                </p>
                <div className="space-y-2 mb-6">
                  {['Zero interest on selected items', 'KYC verification in 3–5 days', 'Automated payment reminders'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/90">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#6ee7b7' }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all hover:scale-105 text-sm"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(6px)' }}>
                  Learn How It Works →
                </button>
              </div>

              {/* Right — payment card */}
              <div className="rounded-2xl p-6 border border-white/20" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                <h3 className="text-white/70 text-sm font-medium mb-4">Sample Payment Plan</h3>
                <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <div className="text-white/60 text-xs mb-1">Product Price</div>
                  <div className="text-3xl font-bold text-white">PKR {SAMPLE_PRICE.toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: '6 Months', val: Math.round(SAMPLE_PRICE / 6) }, { label: '12 Months', val: Math.round(SAMPLE_PRICE / 12) }].map(plan => (
                    <div key={plan.label} className="rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
                      <div className="text-white/60 text-xs mb-2">{plan.label}</div>
                      <div className="text-2xl font-bold text-white">PKR {plan.val.toLocaleString()}</div>
                      <div className="text-white/50 text-xs mt-1">per month</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 px-4"
               style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f0f0ff 100%)' }}>
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>SIMPLE PROCESS</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">How FlexiBerry Works</h2>
          <p className="text-gray-500 text-sm mb-3">Get started in 4 simple steps and start shopping on easy installments</p>
          <div className="w-12 h-0.5 mx-auto mb-12" style={{ background: '#6366f1' }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: 1, grad: 'from-blue-500 to-indigo-600',   emoji: '👤', title: 'Create Account',       desc: 'Sign up in minutes with your basic details. No paperwork, no hassle.'         },
              { n: 2, grad: 'from-violet-500 to-purple-600', emoji: '📄', title: 'Upload Documents',     desc: 'Submit CNIC, selfie & salary slip for fast KYC verification.'               },
              { n: 3, grad: 'from-emerald-500 to-teal-600',  emoji: '✅', title: 'Get Approved',         desc: 'Our team reviews and approves your application in 3–5 business days.'      },
              { n: 4, grad: 'from-orange-400 to-amber-500',  emoji: '🛒', title: 'Shop on Installments', desc: 'Purchase anything with flexible 6 or 12 month monthly plans.'              },
            ].map(step => (
              <div key={step.n} className="bg-white rounded-2xl border border-gray-100 p-6 text-left relative overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-6xl font-black text-gray-50 select-none leading-none">
                  {String(step.n).padStart(2, '0')}
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${step.grad} mb-3`}>
                  STEP {step.n}
                </span>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.grad} flex items-center justify-center text-xl shadow-md mb-4`}>
                  {step.emoji}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP VENDORS ────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#6366f1' }}>VERIFIED SELLERS</div>
              <h2 className="text-3xl font-bold text-gray-900">Top Vendors</h2>
              <p className="text-gray-500 text-sm mt-1">Trusted sellers with verified products</p>
            </div>
            <Link href="/vendors"
                  className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-full transition-opacity hover:opacity-90"
                  style={{ background: '#6366f1' }}>
              View All Shops →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {VENDORS.map(v => (
              <div key={v.name}
                   className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
                {/* Color bar */}
                <div className={`h-1 w-full ${v.topBar}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center text-2xl shadow-md`}>
                        {v.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{v.name}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${v.catColor}`}>{v.cat}</span>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full border border-gray-200 hover:border-indigo-400 hover:text-indigo-500 flex items-center justify-center text-gray-400 transition-all group-hover:scale-110">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{v.desc}</p>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <span className="flex items-center gap-1 text-gray-700">
                      <span className="text-yellow-400">★</span>
                      <strong>{v.rating}</strong>
                      <span className="text-gray-400 font-normal">rating</span>
                    </span>
                    <span className="flex items-center gap-1 text-gray-700">
                      <span>🧩</span>
                      <strong>{v.products}</strong>
                      <span className="text-gray-400 font-normal">Products</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-gray-50/70">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm">Everything you need to know about FlexiBerry</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium text-gray-800 pr-4">{faq.q}</span>
                  <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                       fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       style={openFaq === i ? { color: '#6366f1' } : {}}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Still have questions?{' '}
            <Link href="/contact" className="font-medium hover:underline" style={{ color: '#6366f1' }}>
              Contact our support team
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ background: '#0f1729', color: 'white' }}>
        <div className="max-w-screen-xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                     style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>FB</div>
                <span className="font-bold text-lg">FlexiBerry</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments across Pakistan.
              </p>
              <div className="flex gap-2">
                {[
                  { icon: 'f',  label: 'Facebook'  },
                  { icon: '📸', label: 'Instagram' },
                  { icon: '𝕏',  label: 'Twitter'   },
                  { icon: '▶',  label: 'YouTube'   },
                ].map(s => (
                  <a key={s.label} href="#" title={s.label}
                     className="w-8 h-8 rounded-lg flex items-center justify-center text-xs text-white/60 hover:text-white transition-all"
                     style={{ background: 'rgba(255,255,255,0.08)' }}
                     onMouseOver={e => (e.currentTarget.style.background = '#6366f1')}
                     onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {['About Us', 'Contact', 'Careers', 'Blog', 'Vendor Registration'].map(l => (
                  <li key={l}><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="font-semibold text-white mb-4">Customer Care</h4>
              <ul className="space-y-2.5">
                {['Help Center', 'How to Buy on Installments', 'Returns Policy', 'KYC Guide', 'Payment Methods'].map(l => (
                  <li key={l}><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Us</h4>
              <div className="space-y-3">
                {[
                  { icon: '✉️', t: 'support@flexiberry.com' },
                  { icon: '📞', t: '+92 300 1234567'        },
                  { icon: '📍', t: 'Lahore, Punjab, Pakistan'},
                ].map(item => (
                  <div key={item.t} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <span>{item.icon}</span><span>{item.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500 pt-6 border-t border-white/10">
            <p>© 2026 FlexiBerry. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}