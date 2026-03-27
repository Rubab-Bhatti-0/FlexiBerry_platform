'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { VENDORS } from '@/lib/vendors'

/* ── DATA ───────────────────────────────────────────────────────────────── */
const TICKER = [
  '📱 iPhone 15 Pro — Starting PKR 45,833/mo','🏍️ Honda CD 70 on Easy Installments',
  '📦 Jahez Packages — Bundle & Save 50%','☀️ Solar Systems — Go Green Today',
  '🚚 Free Nationwide Delivery','🎉 0% Commission for first 90 days!',
  '📱 iPhone 15 Pro — Starting PKR 45,833/mo','🏍️ Honda CD 70 on Easy Installments',
  '📦 Jahez Packages — Bundle & Save 50%','☀️ Solar Systems — Go Green Today',
  '🚚 Free Nationwide Delivery','🎉 0% Commission for first 90 days!',
]

const SLIDES = [
  { id:1, img:'/assets/carousel-1.jpg', badge:'📱 Smartphones',  h:'Buy Smart,',      a:'Pay Easy',    sub:'Latest iPhones & Samsung Galaxy with 6–12 month plans. No credit card needed.',   cta:'Shop Smartphones', href:'/products?category=smartphones' },
  { id:2, img:'/assets/carousel-2.jpg', badge:'💻 Laptops',      h:'Work Smarter,',   a:'Pay Later',   sub:'MacBooks, Dell, HP & more — premium laptops on easy monthly plans.',               cta:'Shop Laptops',     href:'/products?category=laptops'     },
  { id:3, img:'/assets/carousel-3.jpg', badge:'🏍️ Bikes',        h:'Ride Free,',      a:'Pay Monthly', sub:'Honda CD 70, Yamaha, Suzuki — get your bike on easy installments today.',          cta:'Shop Bikes',       href:'/products?category=bikes'       },
  { id:4, img:'/assets/carousel-4.jpg', badge:'☀️ Solar',        h:'Go Green,',       a:'Save More',   sub:'5kW–20kW solar systems. Slash your electricity bill with flexible payment plans.',  cta:'Shop Solar',       href:'/products?category=solar'       },
  { id:5, img:'/assets/carousel-5.jpg', badge:'🏠 Appliances',   h:'Upgrade Home,',   a:'Affordably',  sub:'AC, Fridge, Washing Machine — top brands on 6 or 12 month installments.',           cta:'Shop Appliances',  href:'/products?category=appliances'  },
  { id:6, img:'/assets/carousel-6.jpg', badge:'🛋️ Furniture',    h:'Furnish Dreams,', a:'Pay Easy',    sub:'Complete home & office furniture sets. Beautiful spaces, flexible payments.',        cta:'Shop Furniture',   href:'/products?category=furniture'   },
  { id:7, img:'/assets/carousel-7.jpg', badge:'📦 Jahez',        h:'Bundle Up,',      a:'Save Big',    sub:'4–5 item Jahez packages for weddings & new homes. Save up to 50%.',                 cta:'Shop Packages',    href:'/products?category=jahez'       },
  { id:8, img:'/assets/carousel-8.jpg', badge:'🚗 Cars',         h:'Drive Today,',    a:'Pay Monthly', sub:'Car financing made easy. Honda, Toyota, Suzuki on flexible installment plans.',     cta:'Car Financing',    href:'/products?category=cars'        },
  { id:9, img:'/assets/carousel-9.jpg', badge:'💼 Business',     h:'Grow Business,',  a:'Smart Way',   sub:'Raw materials, stock & business equipment. Fund your growth today.',                 cta:'Shop Business',    href:'/products?category=business'    },
]

const CATS = [
  { name:'Smartphones',    sub:'Latest iPhones & Android',  e:'📱', bg:'#fff0f0', bd:'#fecdd3', slug:'smartphones' },
  { name:'Laptops',        sub:'MacBooks, Gaming & More',    e:'💻', bg:'#f5f3ff', bd:'#ddd6fe', slug:'laptops'     },
  { name:'Scotty & Bikes', sub:'Motor Cycles & Scotties',    e:'🏍️', bg:'#fff7ed', bd:'#fed7aa', slug:'bikes'       },
  { name:'Appliances',     sub:'AC, LED, Fridge & More',     e:'🌀', bg:'#eff6ff', bd:'#bfdbfe', slug:'appliances'  },
  { name:'Solar Systems',  sub:'Complete Solar Solutions',   e:'☀️', bg:'#fefce8', bd:'#fef08a', slug:'solar'       },
  { name:'Furniture',      sub:'Home & Office Furniture',    e:'🛋️', bg:'#f0fdfa', bd:'#99f6e4', slug:'furniture'   },
  { name:'Jahez Packages', sub:'Bundle 4–5 Item Packages',   e:'📦', bg:'#fdf2f8', bd:'#f9a8d4', slug:'jahez'       },
  { name:'Car Financing',  sub:'Easy Car Installments',      e:'🚗', bg:'#ecfeff', bd:'#a5f3fc', slug:'cars'        },
  { name:'Business Stock', sub:'Raw Materials & Stock',      e:'🏭', bg:'#f0fdf4', bd:'#bbf7d0', slug:'business'    },
  { name:'General Store',  sub:'Everything Else',            e:'🛒', bg:'#fffbeb', bd:'#fde68a', slug:'general'     },
]

const PRODUCTS = [
  { id:'1', img:'/assets/carousel-1.jpg', vendor:'TechZone Official Store', name:'iPhone 15 Pro Max 256GB',     price:549999, orig:599999,  mo:45834, rat:4.8, rv:234, disc:-8  },
  { id:'2', img:'/assets/carousel-2.jpg', vendor:'DigiWorld Electronics',   name:'MacBook Air M3 15"',          price:429999, orig:null,    mo:35834, rat:4.9, rv:156, disc:-6  },
  { id:'3', img:'/assets/carousel-3.jpg', vendor:'SpeedRiders Pk',          name:'Honda CD 70 2026',            price:155000, orig:165000,  mo:12917, rat:4.5, rv:89,  disc:-6  },
  { id:'4', img:'/assets/carousel-7.jpg', vendor:'StyleHub Fashion',        name:'Complete Jahez Package Gold', price:850000, orig:950000,  mo:70834, rat:4.3, rv:28,  disc:-11 },
  { id:'5', img:'/assets/carousel-4.jpg', vendor:'GreenPower Solutions',    name:'5KW Solar Panel System',      price:650000, orig:null,    mo:54167, rat:4.7, rv:45,  disc:null },
]

const FAQS = [
  { q:'How do installment plans work on FlexiBerry?',    a:'Choose any product, select 6 or 12 month plan, pay a small down payment today, and the rest splits into equal monthly installments. No hidden charges, no credit card needed.' },
  { q:'What documents are needed for KYC verification?', a:'You need your CNIC (front & back), a clear selfie, and a salary slip or bank statement. Verification usually takes 3–5 business days.' },
  { q:'Is there any interest on installment plans?',     a:'Selected items are 0% interest. For others, a small markup may apply depending on the product category. All charges are shown clearly before checkout.' },
  { q:'How can I become a vendor on FlexiBerry?',        a:"Click 'Sell as Vendor' in the navbar, fill out the registration form, submit your business documents, and our team will review within 48 hours." },
  { q:'What is the return and refund policy?',           a:'7-day return policy on most items. Products must be in original condition. Refunds are processed within 5–7 business days after inspection.' },
  { q:'Is my payment information secure?',              a:'Yes. We use bank-grade SSL encryption. We never store your full card details — all transactions are processed through verified payment gateways.' },
]

/* ── COMPONENT ──────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [slide,      setSlide     ] = useState(0)
  const [tab,        setTab       ] = useState<'featured'|'trending'|'new'>('featured')
  const [openFaq,    setOpenFaq   ] = useState<number|null>(null)
  const [wish,       setWish      ] = useState<Set<string>>(new Set())
  const [cartQty,    setCartQty   ] = useState(0)
  const [toast,      setToast     ] = useState('')
  const [menuOpen,   setMenuOpen  ] = useState(false)
  const [catOpen,    setCatOpen   ] = useState(false)
  const [vendOpen,   setVendOpen  ] = useState(false)
  const [scrolled,   setScrolled  ] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null)

  // scroll detection
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', h, { passive:true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  // carousel auto-play
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setSlide(p => (p+1) % SLIDES.length), 5200)
  }, [])
  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current) } }, [startTimer])

  const goTo = (i:number) => { setSlide(i); startTimer() }
  const prev = () => goTo((slide - 1 + SLIDES.length) % SLIDES.length)
  const next = () => goTo((slide + 1) % SLIDES.length)

  const toggleWish = (id:string) => setWish(p => { const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n })

  const addCart = (name:string) => {
    setCartQty(c => c+1)
    setToast(`✅  "${name.slice(0,22)}…" added to cart`)
    setTimeout(() => setToast(''), 2800)
  }

  // close dropdowns on outside click
  useEffect(() => {
    const h = (e:MouseEvent) => {
      if (!(e.target as Element).closest('[data-dd]')) { setCatOpen(false); setVendOpen(false) }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const S = SLIDES[slide]

  return (
    <FlexiLayout>
    <style>{`
      /* ── Reset & base ─────────────────────────────── */
      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0 }
      html { scroll-behavior:smooth }

      /* ── Ticker ───────────────────────────────────── */
      @keyframes tick{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
      .ticker-track{ display:inline-flex; white-space:nowrap; animation:tick 32s linear infinite }
      .ticker-track:hover{ animation-play-state:paused }

      /* ── Carousel text entrance ───────────────────── */
      @keyframes cIn{ from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
      .c-in-1{ animation:cIn .5s .05s ease both }
      .c-in-2{ animation:cIn .5s .18s ease both }
      .c-in-3{ animation:cIn .5s .30s ease both }
      .c-in-4{ animation:cIn .5s .42s ease both }

      /* ── Toast ────────────────────────────────────── */
      @keyframes toastAnim{ 0%{opacity:0;transform:translateY(10px)} 12%{opacity:1;transform:translateY(0)} 88%{opacity:1} 100%{opacity:0} }
      .toast-el{ animation:toastAnim 2.8s ease forwards }

      /* ── Shared helpers ───────────────────────────── */
      .lift{ transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease }
      .lift:hover{ transform:translateY(-5px); box-shadow:0 18px 40px -8px rgba(99,102,241,.2) }
      .cat-lift{ transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s ease }
      .cat-lift:hover{ transform:translateY(-4px) scale(1.025); box-shadow:0 10px 28px -6px rgba(0,0,0,.13) }
      .img-zoom{ overflow:hidden }
      .img-zoom img{ transition:transform .55s ease }
      .img-zoom:hover img{ transform:scale(1.07) }
      .wish-btn{ opacity:0; transition:opacity .2s }
      .img-zoom:hover .wish-btn{ opacity:1 }

      /* ── Buttons ──────────────────────────────────── */
      .btn-ind{
        display:inline-flex; align-items:center; gap:7px; cursor:pointer;
        background:linear-gradient(135deg,#6366f1,#4f46e5); color:#fff; border:none;
        font-family:inherit; font-weight:700; border-radius:999px;
        transition:all .2s; box-shadow:0 4px 14px rgba(99,102,241,.38);
      }
      .btn-ind:hover{ box-shadow:0 6px 22px rgba(99,102,241,.55); transform:translateY(-1px) }
      .btn-ora{
        display:inline-flex; align-items:center; gap:8px; cursor:pointer;
        background:linear-gradient(135deg,#f97316,#ea580c); color:#fff; border:none;
        font-family:inherit; font-weight:700; border-radius:999px;
        transition:all .2s; box-shadow:0 4px 14px rgba(249,115,22,.38);
      }
      .btn-ora:hover{ box-shadow:0 6px 22px rgba(249,115,22,.55); transform:translateY(-1px) }

      /* ── Shop Card Hover ──────────────────────────── */
      .shop-card{ 
        border-radius:16px; border:1px solid #e5e7eb; 
        transition:all .3s ease; cursor:pointer;
      }
      .shop-card:hover{ 
        transform:translateY(-6px); 
        box-shadow:0 16px 32px rgba(0,0,0,0.12); 
        border-color:#6366f1;
      }

      /* ── FAQ ──────────────────────────────────────── */
      .faq-box{
        background:#fff; border-radius:12px; border:1px solid #e5e7eb;
        transition:all .25s; margin-bottom:0;
      }
      .faq-box:hover{ border-color:#6366f1 }
      .faq-open{ background:#f8f9fd; border-color:#6366f1 }

      /* ── Vendor Card ──────────────────────────────── */
      .vc{
        background:#fff; border-radius:14px; border:1px solid #e5e7eb;
        transition:all .3s; cursor:pointer;
      }
      .vc:hover{ transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,.1); border-color:#6366f1 }

      /* ── Responsive ───────────────────────────────── */
      @media (max-width:768px) {
        .vg{ grid-template-columns:1fr !important }
      }
    `}</style>

    {/* REST OF THE PAGE CONTENT REMAINS THE SAME */}
    {/* ... (all the carousel, categories, products sections remain unchanged) ... */}

    {/* ── FEATURED SHOPS ROW (1 ROW OF 4 SHOPS) ────────────────────────── */}
    <section style={{ padding:'60px 16px', background:'#fff' }}>
      <div style={{ maxWidth:1340, margin:'0 auto' }}>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between',
                       alignItems:'flex-end', gap:16, marginBottom:28 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:900, letterSpacing:'0.18em', textTransform:'uppercase',
                           color:'#6366f1', marginBottom:6 }}>VERIFIED SELLERS</div>
            <h2 style={{ fontSize:'clamp(20px,2.8vw,32px)', fontWeight:900, color:'#111827', letterSpacing:-.5 }}>
              Featured Shops
            </h2>
            <p style={{ color:'#9ca3af', fontSize:13.5, marginTop:4 }}>Explore our top-rated sellers across categories</p>
          </div>
          <Link href="/shops" className="btn-ind" style={{ padding:'11px 22px', fontSize:13.5, textDecoration:'none' }}>
            View All Shops →
          </Link>
        </div>
        <div className="vg" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {VENDORS.filter(v => v.featured).slice(0, 4).map(v => (
            <Link key={v.id} href={`/shop/${v.id}`} style={{ textDecoration:'none' }}>
              <div className="shop-card vc" style={{ borderTop:`4px solid ${v.bar}`, height:'100%' }}>
                <div style={{ padding:20 }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{
                        width:48, height:48, borderRadius:12, flexShrink:0,
                        background:`linear-gradient(135deg,${v.g1},${v.g2})`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:22, boxShadow:`0 6px 20px ${v.g1}44`,
                      }}>{v.e}</div>
                      <div>
                        <h3 style={{ fontSize:14, fontWeight:900, color:'#111827', letterSpacing:-.2, margin:0 }}>{v.name}</h3>
                        <span style={{
                          display:'inline-block', padding:'2px 8px', borderRadius:999,
                          fontSize:10, fontWeight:700, color:v.catC, background:v.catBg, marginTop:3,
                        }}>{v.cat}</span>
                      </div>
                    </div>
                    <div style={{
                      width:32, height:32, borderRadius:8, border:'1.5px solid #e5e7eb',
                      background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#9ca3af', transition:'all .15s', flexShrink:0,
                    }}>
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </div>
                  </div>
                  <p style={{ fontSize:12.5, color:'#6b7280', marginBottom:14, lineHeight:1.6 }}>{v.desc}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', fontSize:12 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <span style={{ color:'#facc15' }}>★</span>
                      <span style={{ fontWeight:900, color:'#111827' }}>{v.rat}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <span>🧩</span>
                      <span style={{ fontWeight:900, color:'#111827' }}>{v.prods}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:3, fontWeight:700, color:'#059669' }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:'#10b981' }} />
                      Verified
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    </FlexiLayout>
    )
  }
