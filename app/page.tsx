'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'

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

const VENDORS = [
  { id:'techzone', name:'TechZone Electronics', cat:'Electronics',    catC:'#4f46e5', catBg:'#eef2ff', desc:'Premium electronics & gadgets',   rat:4.8, prods:156, g1:'#6366f1', g2:'#4f46e5', e:'⚡', bar:'#6366f1' },
  { id:'homekart', name:'HomeKart Pakistan',    cat:'Home & Living',  catC:'#059669', catBg:'#ecfdf5', desc:'Appliances, furniture & packages', rat:4.6, prods:243, g1:'#10b981', g2:'#0d9488', e:'🏠', bar:'#10b981' },
  { id:'megadeal', name:'MegaDeal Motors',      cat:'Motors & Energy',catC:'#7c3aed', catBg:'#f5f3ff', desc:'Vehicles, solar & heavy items',    rat:4.7, prods:89,  g1:'#8b5cf6', g2:'#6d28d9', e:'🚗', bar:'#8b5cf6' },
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
      .btn-sml{
        display:inline-flex; align-items:center; gap:6px; cursor:pointer;
        background:linear-gradient(135deg,#6366f1,#4f46e5); color:#fff; border:none;
        font-family:inherit; font-weight:700; font-size:12.5px;
        padding:7px 14px; border-radius:10px; transition:all .18s;
        box-shadow:0 3px 10px rgba(99,102,241,.3);
      }
      .btn-sml:hover{ box-shadow:0 5px 16px rgba(99,102,241,.45); transform:translateY(-1px) }

      /* ── Nav link ─────────────────────────────────── */
      .nav-lnk{
        display:flex; align-items:center; gap:5px; padding:0 12px; height:44px;
        font-size:13.5px; font-weight:600; color:#374151; text-decoration:none;
        border-radius:10px; transition:all .15s; white-space:nowrap;
      }
      .nav-lnk:hover{ color:#6366f1; background:rgba(99,102,241,.08) }

      /* ── Dropdown ─────────────────────────────────── */
      .dd-menu{
        position:absolute; top:calc(100% + 6px); left:0; background:#fff;
        border:1.5px solid #e5e7eb; border-radius:18px; box-shadow:0 20px 60px rgba(0,0,0,.13);
        z-index:200; overflow:hidden;
      }
      .dd-row{ display:flex; align-items:center; gap:10px; padding:10px 14px; text-decoration:none; transition:background .12s }
      .dd-row:hover{ background:#f5f3ff }

      /* ── Search ───────────────────────────────────── */
      .srch{ display:flex; border:1.5px solid #e5e7eb; border-radius:13px; overflow:hidden; transition:all .2s; background:#fff }
      .srch:focus-within{ border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,.13) }
      .srch input{ flex:1; padding:10px 15px; font-size:13.5px; outline:none; background:transparent; font-family:inherit; color:#374151 }
      .srch input::placeholder{ color:#9ca3af }
      .srch button{ padding:0 16px; background:#6366f1; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s }
      .srch button:hover{ background:#4f46e5 }

      /* ── EMI pill ─────────────────────────────────── */
      .emi-pill{ display:flex; align-items:center; gap:5px; background:rgba(99,102,241,.09); border-radius:9px; padding:6px 10px; font-size:11.5px; font-weight:700; color:#4f46e5 }

      /* ── FAQ ──────────────────────────────────────── */
      .faq-box{ background:#fff; border:1.5px solid #e5e7eb; border-radius:14px; overflow:hidden; transition:all .2s }
      .faq-box:hover{ border-color:#c7d2fe; box-shadow:0 4px 18px rgba(99,102,241,.09) }
      .faq-box.faq-open{ border-color:#6366f1; box-shadow:0 6px 24px rgba(99,102,241,.13) }

      /* ── Vendor card ──────────────────────────────── */
      .vc{ background:#fff; border:1.5px solid #f0f0f6; border-radius:20px; overflow:hidden; transition:all .25s }
      .vc:hover{ transform:translateY(-4px); box-shadow:0 18px 48px rgba(0,0,0,.12) }

      /* ── Responsive ───────────────────────────────── */
      @media(max-width:1024px){
        .pg{grid-template-columns:repeat(3,1fr)!important}
        .cg{grid-template-columns:repeat(4,1fr)!important}
      }
      @media(max-width:768px){
        .hide-sm{display:none!important}
        .show-sm{display:flex!important}
        .pg{grid-template-columns:repeat(2,1fr)!important}
        .cg{grid-template-columns:repeat(2,1fr)!important}
        .vg{grid-template-columns:1fr!important}
        .sg{grid-template-columns:repeat(2,1fr)!important}
        .fg{grid-template-columns:1fr!important}
        .ig{grid-template-columns:1fr!important}
        .hero-h{font-size:clamp(28px,8vw,44px)!important}
        .carousel-wrap{height:320px!important}
      }
      @media(max-width:500px){
        .pg{grid-template-columns:1fr!important}
        .sg{grid-template-columns:1fr!important}
        .carousel-wrap{height:260px!important}
        .hero-h{font-size:26px!important}
      }
    `}</style>

    <div style={{ background:'#f4f5fb', minHeight:'100vh' }}>

      {/* ── TOAST ─────────────────────────────────────────────────────── */}
      {toast && (
        <div className="toast-el" style={{
          position:'fixed', bottom:24, right:24, zIndex:9999,
          background:'#1e1b4b', color:'#fff', padding:'12px 20px', borderRadius:14,
          fontSize:13.5, fontWeight:600, boxShadow:'0 10px 36px rgba(0,0,0,.28)',
          maxWidth:320, display:'flex', alignItems:'center', gap:8,
        }}>{toast}</div>
      )}

      {/* ── TICKER ────────────────────────────────────────────────────── */}
      <div style={{ background:'linear-gradient(90deg,#1e1b4b,#2e2a7a)', overflow:'hidden', padding:'9px 0' }}>
        <div className="ticker-track">
          {TICKER.map((t,i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', padding:'0 18px',
              fontSize:11.5, fontWeight:500, color:'rgba(255,255,255,.88)', gap:4 }}>
              {t}<span style={{ opacity:.2, marginLeft:14 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADER REMOVED - USING FLEXILAYOUT ── */}

      {/* ── HERO CAROUSEL ─────────────────────────────────────────────── */}
      <section className="carousel-wrap" style={{ position:'relative', height:460, overflow:'hidden', background:'#07040f' }}>
        {SLIDES.map((sl, i) => (
          <div key={sl.id} style={{
            position:'absolute', inset:0, opacity: i===slide?1:0,
            transition:'opacity .75s ease', pointerEvents: i===slide?'auto':'none',
          }}>
            <div style={{ position:'absolute', inset:0 }}>
              <Image src={sl.img} alt={sl.h} fill style={{ objectFit:'cover', objectPosition:'center' }}
                     priority={i===0} sizes="100vw"
                     onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
              <div style={{ position:'absolute', inset:0,
                background:'linear-gradient(90deg,rgba(7,4,15,.88) 0%,rgba(7,4,15,.58) 48%,rgba(7,4,15,.12) 100%)' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120,
                background:'linear-gradient(to top,rgba(7,4,15,.55),transparent)' }} />
            </div>

            {i === slide && (
              <div style={{ position:'relative', zIndex:2, maxWidth:1340, margin:'0 auto',
                             padding:'0 24px', height:'100%', display:'flex', alignItems:'center' }}>
                <div style={{ maxWidth:510 }}>
                  <span className="c-in-1" style={{
                    display:'inline-flex', alignItems:'center', gap:6, padding:'7px 16px', marginBottom:18,
                    borderRadius:999, background:'rgba(255,255,255,.12)', backdropFilter:'blur(8px)',
                    border:'1.5px solid rgba(255,255,255,.22)', color:'#fff', fontSize:12.5, fontWeight:700,
                  }}>{sl.badge}</span>

                  <h1 className="hero-h c-in-2" style={{
                    fontSize:'clamp(30px,4.5vw,54px)', fontWeight:900, color:'#fff',
                    lineHeight:1.1, letterSpacing:-1, marginBottom:0,
                  }}>{sl.h}</h1>
                  <h1 className="hero-h c-in-2" style={{
                    fontSize:'clamp(30px,4.5vw,54px)', fontWeight:900, color:'#fb923c',
                    lineHeight:1.1, letterSpacing:-1, marginBottom:16,
                  }}>{sl.a}</h1>

                  <p className="c-in-3" style={{
                    color:'rgba(255,255,255,.72)', fontSize:'clamp(13px,1.8vw,15px)',
                    lineHeight:1.75, marginBottom:28, maxWidth:390,
                  }}>{sl.sub}</p>

                  <Link href={sl.href} className="btn-ora c-in-4"
                        style={{ padding:'13px 28px', fontSize:14.5, textDecoration:'none' }}>
                    {sl.cta}
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            <div style={{ position:'absolute', bottom:16, right:20, color:'rgba(255,255,255,.3)',
                           fontSize:11, fontFamily:'monospace', letterSpacing:2, zIndex:2 }}>
              {String(i+1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
            </div>
          </div>
        ))}

        {/* Arrows */}
        {[{fn:prev, d:'M15 19l-7-7 7-7', pos:{left:16}}, {fn:next, d:'M9 5l7 7-7 7', pos:{right:16}}].map((btn,i) => (
          <button key={i} onClick={btn.fn} aria-label={i===0?'Prev':'Next'} style={{
            position:'absolute', top:'50%', ...btn.pos, transform:'translateY(-50%)', zIndex:10,
            width:44, height:44, borderRadius:'50%', border:'1.5px solid rgba(255,255,255,.22)',
            background:'rgba(255,255,255,.1)', backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', color:'#fff', transition:'all .2s',
          }}
          onMouseOver={e => { const el=e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.22)'; el.style.transform='translateY(-50%) scale(1.1)' }}
          onMouseOut={e  => { const el=e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.1)';  el.style.transform='translateY(-50%) scale(1)' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d={btn.d}/>
            </svg>
          </button>
        ))}

        {/* Dots */}
        <div style={{ position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)',
                       zIndex:10, display:'flex', gap:6, alignItems:'center' }}>
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`} style={{
              borderRadius:999, border:'none', cursor:'pointer', transition:'all .3s ease',
              width: i===slide?28:8, height:8,
              background: i===slide?'#fb923c':'rgba(255,255,255,.35)',
            }} />
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────── */}
      <section style={{ padding:'52px 16px', background:'#fff' }}>
        <div style={{ maxWidth:1340, margin:'0 auto' }}>
          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontSize:'clamp(20px,2.8vw,26px)', fontWeight:900, color:'#111827', letterSpacing:-.5 }}>
              Shop by Category
            </h2>
            <p style={{ color:'#9ca3af', fontSize:13.5, marginTop:4 }}>
              Find what you need across 10+ categories
            </p>
          </div>
          <div className="cg" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14 }}>
            {CATS.map(cat => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="cat-lift"
                    style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
                             padding:'22px 10px 18px', borderRadius:18, textDecoration:'none',
                             background:cat.bg, border:`1.5px solid ${cat.bd}` }}>
                <div style={{ width:52, height:52, borderRadius:14, background:'#fff',
                               boxShadow:`0 4px 16px ${cat.bd}80`, display:'flex',
                               alignItems:'center', justifyContent:'center', fontSize:26,
                               marginBottom:10, border:`1px solid ${cat.bd}` }}>
                  {cat.e}
                </div>
                <div style={{ fontSize:13, fontWeight:800, color:'#111827', lineHeight:1.3 }}>{cat.name}</div>
                <div style={{ fontSize:11.5, color:'#9ca3af', marginTop:3, lineHeight:1.4 }}>{cat.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ──────────────────────────────────────────────────── */}
      <section style={{ padding:'8px 16px 52px', background:'#f4f5fb' }}>
        <div style={{ maxWidth:1340, margin:'0 auto' }}>
          {/* Tabs */}
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between',
                         alignItems:'center', gap:12, marginBottom:22 }}>
            <div style={{ display:'flex', gap:3, background:'#fff', borderRadius:14, padding:4,
                           border:'1.5px solid #e5e7eb', boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
              {(['featured','trending','new'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  display:'flex', alignItems:'center', gap:5, padding:'8px 15px', borderRadius:10,
                  border:'none', cursor:'pointer', fontSize:12.5, fontWeight:700, fontFamily:'inherit',
                  transition:'all .2s',
                  background: tab===t ? '#6366f1' : 'transparent',
                  color: tab===t ? '#fff' : '#6b7280',
                  boxShadow: tab===t ? '0 3px 12px rgba(99,102,241,.32)' : 'none',
                }}>
                  {t==='featured'?'⭐ Featured Products':t==='trending'?'📈 Trending':'🆕 New'}
                </button>
              ))}
            </div>
            <Link href="/products" style={{ fontSize:13.5, fontWeight:700, color:'#6366f1',
                                             textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.textDecoration='underline'}
                  onMouseOut={e  => (e.currentTarget as HTMLElement).style.textDecoration='none'}>
              View All
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="pg" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:16 }}>
            {PRODUCTS.map(p => (
              <div key={p.id} className="lift" style={{
                background:'#fff', borderRadius:18, border:'1.5px solid #eeeef4',
                overflow:'hidden', display:'flex', flexDirection:'column',
              }}>
                <div className="img-zoom" style={{ position:'relative', aspectRatio:'4/3', background:'#f8f8fc', flexShrink:0 }}>
                  <Image src={p.img} alt={p.name} fill style={{ objectFit:'cover' }}
                         sizes="(max-width:768px) 50vw,20vw"
                         onError={e => { (e.target as HTMLImageElement).style.display='none' }} />
                  {p.disc && (
                    <span style={{
                      position:'absolute', top:10, left:10, background:'#1e1b4b', color:'#fff',
                      fontSize:11, fontWeight:900, padding:'3px 9px', borderRadius:7, letterSpacing:.3,
                    }}>{p.disc}%</span>
                  )}
                  <button onClick={() => toggleWish(p.id)} className="wish-btn" aria-label="Wishlist" style={{
                    position:'absolute', top:10, right:10, width:32, height:32, borderRadius:'50%',
                    background:'rgba(255,255,255,.92)', backdropFilter:'blur(4px)',
                    border:'1.5px solid rgba(0,0,0,.07)', display:'flex', alignItems:'center',
                    justifyContent:'center', cursor:'pointer', fontSize:15,
                    transition:'transform .2s',
                  }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.transform='scale(1.12)'}
                  onMouseOut={e  => (e.currentTarget as HTMLElement).style.transform='scale(1)'}>
                    {wish.has(p.id)?'❤️':'🤍'}
                  </button>
                </div>
                <div style={{ padding:'14px 14px 16px', flex:1, display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:6,
                                 fontSize:11.5, fontWeight:700, color:'#5855eb' }}>
                    <span style={{ width:16, height:16, borderRadius:5, background:'rgba(99,102,241,.1)',
                                    display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:9 }}>🏪</span>
                    {p.vendor}
                  </div>
                  <h3 style={{ fontSize:13.5, fontWeight:800, color:'#111827', lineHeight:1.4, flex:1,
                                marginBottom:10, display:'-webkit-box', WebkitLineClamp:2,
                                WebkitBoxOrient:'vertical' as any, overflow:'hidden' }}>
                    {p.name}
                  </h3>
                  <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:8 }}>
                    <span style={{ fontSize:15.5, fontWeight:900, color:'#111827', letterSpacing:-.3 }}>
                      PKR {p.price.toLocaleString()}
                    </span>
                    {p.orig && (
                      <span style={{ fontSize:12, color:'#9ca3af', textDecoration:'line-through' }}>
                        PKR {p.orig.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="emi-pill" style={{ marginBottom:12 }}>
                    💳 PKR {p.mo.toLocaleString()}/mo × 12
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#9ca3af' }}>
                      <span style={{ color:'#facc15', fontSize:13 }}>★</span>
                      <span style={{ fontWeight:700, color:'#374151' }}>{p.rat}</span>
                      <span>({p.rv})</span>
                    </div>
                    <button onClick={() => addCart(p.name)} className="btn-sml">
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
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

      {/* ── INSTALLMENTS BANNER ───────────────────────────────────────── */}
      <section style={{ padding:'0 16px 52px', background:'#f4f5fb' }}>
        <div style={{ maxWidth:1340, margin:'0 auto' }}>
          <div style={{
            borderRadius:28, overflow:'hidden', position:'relative',
            background:'linear-gradient(135deg,#3730a3,#6d28d9 48%,#065f46)',
            padding:'clamp(28px,5vw,56px) clamp(20px,4vw,52px)',
          }}>
            {/* Blobs */}
            {[['-20%','32%','none','none',280,.09],['-10%','none','none','18%',200,.07],['22%','none','none','6%',120,.05]].map((b,i)=>(
              <div key={i} style={{ position:'absolute', width:b[4] as number, height:b[4] as number,
                borderRadius:'50%', background:'rgba(255,255,255,.8)', opacity:b[5] as number,
                top:b[0] as string, bottom:b[1] as string, left:b[2] as string, right:b[3] as string,
                pointerEvents:'none' }} />
            ))}

            <div className="ig" style={{ position:'relative', zIndex:1, display:'grid',
              gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center' }}>
              <div>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:6, padding:'7px 16px',
                  background:'rgba(255,255,255,.13)', backdropFilter:'blur(8px)',
                  border:'1.5px solid rgba(255,255,255,.22)', borderRadius:999,
                  color:'#fff', fontSize:12.5, fontWeight:700, marginBottom:20,
                }}>✨ Easy Installments</span>
                <h2 style={{ fontSize:'clamp(22px,3.2vw,38px)', fontWeight:900, color:'#fff',
                              lineHeight:1.2, letterSpacing:-.5, marginBottom:14 }}>
                  Buy Anything on<br/>6 or 12 Month Plans
                </h2>
                <p style={{ color:'rgba(255,255,255,.75)', fontSize:'clamp(13px,1.4vw,15px)',
                             lineHeight:1.75, marginBottom:22, maxWidth:440 }}>
                  No credit card needed. Just upload your CNIC and bank statement, get approved in 3–5 days, and start paying in easy monthly installments.
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
                  {['Zero interest on selected items','KYC verification in 3–5 days','Automated payment reminders'].map(item => (
                    <div key={item} style={{ display:'flex', alignItems:'center', gap:10, fontSize:14, color:'rgba(255,255,255,.9)' }}>
                      <div style={{ width:20, height:20, borderRadius:'50%', flexShrink:0, display:'flex',
                        alignItems:'center', justifyContent:'center',
                        background:'rgba(52,211,153,.2)', border:'1.5px solid rgba(52,211,153,.5)' }}>
                        <svg width="10" height="10" fill="none" stroke="#34d399" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <button style={{
                  display:'inline-flex', alignItems:'center', gap:8, padding:'13px 26px',
                  background:'rgba(255,255,255,.15)', backdropFilter:'blur(8px)',
                  border:'1.5px solid rgba(255,255,255,.35)', borderRadius:999,
                  color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit',
                  transition:'all .2s',
                }}
                onMouseOver={e => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.24)'}
                onMouseOut={e  => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.15)'}>
                  Learn How It Works →
                </button>
              </div>
              <div style={{ background:'rgba(255,255,255,.1)', backdropFilter:'blur(12px)',
                             border:'1.5px solid rgba(255,255,255,.18)', borderRadius:24, padding:28 }}>
                <p style={{ color:'rgba(255,255,255,.65)', fontSize:13, fontWeight:600, marginBottom:16 }}>
                  Sample Payment Plan
                </p>
                <div style={{ background:'rgba(255,255,255,.12)', borderRadius:16, padding:'16px 20px', marginBottom:16 }}>
                  <div style={{ color:'rgba(255,255,255,.55)', fontSize:12, marginBottom:4 }}>Product Price</div>
                  <div style={{ fontSize:'clamp(22px,3vw,32px)', fontWeight:900, color:'#fff', letterSpacing:-.5 }}>
                    PKR 120,000
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[{l:'6 Months',v:20000},{l:'12 Months',v:10000}].map(plan => (
                    <div key={plan.l} style={{ background:'rgba(255,255,255,.12)', borderRadius:14, padding:'16px 12px', textAlign:'center' }}>
                      <div style={{ color:'rgba(255,255,255,.6)', fontSize:11.5, marginBottom:8 }}>{plan.l}</div>
                      <div style={{ fontSize:'clamp(18px,2vw,24px)', fontWeight:900, color:'#fff', letterSpacing:-.3 }}>
                        PKR {plan.v.toLocaleString()}
                      </div>
                      <div style={{ color:'rgba(255,255,255,.45)', fontSize:11, marginTop:4 }}>per month</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section id="how-it-works" style={{
        padding:'64px 16px', background:'linear-gradient(180deg,#eef2ff,#f4f5fb)',
      }}>
        <div style={{ maxWidth:1340, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:11, fontWeight:900, letterSpacing:'0.18em', textTransform:'uppercase', color:'#6366f1', marginBottom:8 }}>
            SIMPLE PROCESS
          </div>
          <h2 style={{ fontSize:'clamp(20px,2.8vw,32px)', fontWeight:900, color:'#111827', letterSpacing:-.5, marginBottom:8 }}>
            How FlexiBerry Works
          </h2>
          <p style={{ color:'#9ca3af', fontSize:14.5, maxWidth:400, margin:'0 auto 12px' }}>
            Get started in 4 simple steps and start shopping on easy installments
          </p>
          <div style={{ width:48, height:3, background:'linear-gradient(90deg,#6366f1,#8b5cf6)',
                         borderRadius:99, margin:'0 auto 44px' }} />

          <div className="sg" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
            {[
              { n:1, g1:'#3b82f6', g2:'#4f46e5', e:'👤', t:'Create Account',       d:'Sign up in minutes with your basic details. No paperwork, no hassle.' },
              { n:2, g1:'#8b5cf6', g2:'#6d28d9', e:'📄', t:'Upload Documents',     d:'Submit CNIC, selfie & salary slip for fast KYC verification.' },
              { n:3, g1:'#10b981', g2:'#0d9488', e:'✅', t:'Get Approved',         d:'Our team reviews and approves your application in 3–5 business days.' },
              { n:4, g1:'#f59e0b', g2:'#ea580c', e:'🛒', t:'Shop on Installments', d:'Purchase anything with flexible 6 or 12 month monthly plans.' },
            ].map((step,i) => (
              <div key={step.n} className="lift" style={{
                background:'#fff', borderRadius:20, border:'1.5px solid #eeeef4',
                padding:'26px 20px', textAlign:'left', position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', top:8, right:12, fontSize:62, fontWeight:900,
                               color:'#f5f3ff', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>
                  {String(step.n).padStart(2,'0')}
                </div>
                <span style={{
                  display:'inline-flex', gap:5, padding:'5px 11px', borderRadius:999,
                  fontSize:10.5, fontWeight:900, color:'#fff', marginBottom:14,
                  background:`linear-gradient(135deg,${step.g1},${step.g2})`,
                }}>STEP {step.n}</span>
                <div style={{
                  width:46, height:46, borderRadius:13, marginBottom:14, fontSize:22,
                  background:`linear-gradient(135deg,${step.g1},${step.g2})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow:`0 6px 18px ${step.g1}55`,
                }}>{step.e}</div>
                <h3 style={{ fontSize:15, fontWeight:900, color:'#111827', marginBottom:8, letterSpacing:-.2 }}>
                  {step.t}
                </h3>
                <p style={{ fontSize:13, color:'#9ca3af', lineHeight:1.65 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP VENDORS ───────────────────────────────────────────────── */}
      <section style={{ padding:'60px 16px', background:'#fff' }}>
        <div style={{ maxWidth:1340, margin:'0 auto' }}>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between',
                         alignItems:'flex-end', gap:16, marginBottom:28 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:900, letterSpacing:'0.18em', textTransform:'uppercase',
                             color:'#6366f1', marginBottom:6 }}>VERIFIED SELLERS</div>
              <h2 style={{ fontSize:'clamp(20px,2.8vw,32px)', fontWeight:900, color:'#111827', letterSpacing:-.5 }}>
                Top Vendors
              </h2>
              <p style={{ color:'#9ca3af', fontSize:13.5, marginTop:4 }}>Trusted sellers with verified products</p>
            </div>
            <Link href="/shops" className="btn-ind" style={{ padding:'11px 22px', fontSize:13.5, textDecoration:'none' }}>
              View All Shops →
            </Link>
          </div>
          <div className="vg" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {VENDORS.map(v => (
              <Link key={v.id} href={`/shop/${v.id}`} style={{ textDecoration:'none' }}>
                <div className="vc" style={{ borderTop:`3px solid ${v.bar}`, height:'100%' }}>
                  <div style={{ padding:24 }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{
                          width:50, height:50, borderRadius:14, flexShrink:0,
                          background:`linear-gradient(135deg,${v.g1},${v.g2})`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:24, boxShadow:`0 6px 20px ${v.g1}44`,
                        }}>{v.e}</div>
                        <div>
                          <h3 style={{ fontSize:15, fontWeight:900, color:'#111827', letterSpacing:-.2 }}>{v.name}</h3>
                          <span style={{
                            display:'inline-block', padding:'3px 10px', borderRadius:999,
                            fontSize:11, fontWeight:700, color:v.catC, background:v.catBg, marginTop:4,
                          }}>{v.cat}</span>
                        </div>
                      </div>
                      <div style={{
                        width:34, height:34, borderRadius:10, border:'1.5px solid #e5e7eb',
                        background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
                        color:'#9ca3af', transition:'all .15s', flexShrink:0,
                      }}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                      </div>
                    </div>
                    <p style={{ fontSize:13.5, color:'#6b7280', marginBottom:18, lineHeight:1.65 }}>{v.desc}</p>
                    <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:13 }}>
                        <span style={{ color:'#facc15', fontSize:15 }}>★</span>
                        <span style={{ fontWeight:900, color:'#111827' }}>{v.rat}</span>
                        <span style={{ color:'#9ca3af' }}>rating</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:13 }}>
                        <span style={{ fontSize:15 }}>🧩</span>
                        <span style={{ fontWeight:900, color:'#111827' }}>{v.prods}</span>
                        <span style={{ color:'#9ca3af' }}>Products</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:'#059669' }}>
                        <div style={{ width:7, height:7, borderRadius:'50%', background:'#10b981' }} />
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

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ padding:'60px 16px', background:'#f4f5fb' }}>
        <div style={{ maxWidth:740, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <h2 style={{ fontSize:'clamp(20px,2.8vw,32px)', fontWeight:900, color:'#111827', letterSpacing:-.5 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color:'#9ca3af', fontSize:14.5, marginTop:8 }}>
              Everything you need to know about FlexiBerry
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {FAQS.map((faq,i) => (
              <div key={i} className={`faq-box${openFaq===i?' faq-open':''}`}>
                <button onClick={() => setOpenFaq(openFaq===i?null:i)} style={{
                  width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'18px 22px', background:'none', border:'none', cursor:'pointer',
                  textAlign:'left', gap:14, fontFamily:'inherit',
                }}>
                  <span style={{ fontSize:14.5, fontWeight:700, color:'#111827', lineHeight:1.5 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width:28, height:28, borderRadius:8, flexShrink:0, display:'flex',
                    alignItems:'center', justifyContent:'center', transition:'all .25s',
                    background: openFaq===i ? '#6366f1' : '#f3f4f6',
                    transform: openFaq===i ? 'rotate(180deg)' : 'none',
                  }}>
                    <svg width="14" height="14" fill="none" stroke={openFaq===i?'#fff':'#6b7280'} strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </button>
                <div style={{ maxHeight: openFaq===i?200:0, overflow:'hidden', transition:'max-height .32s ease' }}>
                  <p style={{ padding:'0 22px 20px', fontSize:14, color:'#6b7280', lineHeight:1.78 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign:'center', marginTop:28, fontSize:14, color:'#9ca3af' }}>
            Still have questions?{' '}
            <Link href="/contact" style={{ color:'#6366f1', fontWeight:700, textDecoration:'none' }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.textDecoration='underline'}
                  onMouseOut={e  => (e.currentTarget as HTMLElement).style.textDecoration='none'}>
              Contact our support team
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ background:'#0d1117', color:'#fff' }}>
        {/* CTA strip */}
        <div style={{ background:'linear-gradient(90deg,#312e81,#4c1d95)', padding:'18px 16px' }}>
          <div style={{ maxWidth:1340, margin:'0 auto', display:'flex', flexWrap:'wrap',
                         justifyContent:'center', alignItems:'center', gap:14 }}>
            <span style={{ fontSize:14.5, color:'rgba(255,255,255,.9)', fontWeight:500 }}>
              🚀 Ready to start shopping on installments?
            </span>
            <Link href="/auth/register" className="btn-ind" style={{ padding:'9px 22px', fontSize:13.5, textDecoration:'none' }}>
              Get Started Free →
            </Link>
          </div>
        </div>

        <div style={{ maxWidth:1340, margin:'0 auto', padding:'48px 16px 32px' }}>
          <div className="fg" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:36, marginBottom:36 }}>
            {/* Brand */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:40, height:40, borderRadius:12, flexShrink:0,
                               background:'linear-gradient(135deg,#6366f1,#4338ca)',
                               display:'flex', alignItems:'center', justifyContent:'center',
                               boxShadow:'0 4px 14px rgba(99,102,241,.4)' }}>
                  <span style={{ color:'#fff', fontWeight:900, fontSize:14 }}>FB</span>
                </div>
                <span style={{ fontSize:18, fontWeight:900, color:'#fff' }}>FlexiBerry</span>
              </div>
              <p style={{ color:'#6b7280', fontSize:13.5, lineHeight:1.75, marginBottom:20, maxWidth:270 }}>
                Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments across Pakistan.
              </p>
              <div style={{ display:'flex', gap:8 }}>
                {[['f','Facebook'],['📸','Instagram'],['𝕏','Twitter'],['▶','YouTube']].map(([ic,lb]) => (
                  <a key={lb} href="#" title={lb} style={{
                    width:36, height:36, borderRadius:10, background:'rgba(255,255,255,.07)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:13, color:'rgba(255,255,255,.55)', textDecoration:'none', transition:'all .18s',
                  }}
                  onMouseOver={e => { const el=e.currentTarget as HTMLElement; el.style.background='#6366f1'; el.style.color='#fff'; el.style.transform='translateY(-2px)' }}
                  onMouseOut={e  => { const el=e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.07)'; el.style.color='rgba(255,255,255,.55)'; el.style.transform='none' }}>
                    {ic}
                  </a>
                ))}
              </div>
            </div>

            {[
              { h:'Quick Links',   links:['About Us','Contact','Careers','Blog','Vendor Registration'] },
              { h:'Customer Care', links:['Help Center','How to Buy on Installments','Returns Policy','KYC Guide','Payment Methods'] },
              { h:'Contact Us',    links:['support@flexiberry.com','+92 300 1234567','Lahore, Punjab, Pakistan'] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontSize:14, fontWeight:800, color:'#fff', marginBottom:16, letterSpacing:-.2 }}>
                  {col.h}
                </h4>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ color:'#6b7280', fontSize:13.5, textDecoration:'none', transition:'color .15s' }}
                         onMouseOver={e => (e.currentTarget as HTMLElement).style.color='#a5b4fc'}
                         onMouseOut={e  => (e.currentTarget as HTMLElement).style.color='#6b7280'}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:22,
                         display:'flex', flexWrap:'wrap', justifyContent:'space-between',
                         alignItems:'center', gap:10 }}>
            <p style={{ color:'#4b5563', fontSize:13 }}>© 2026 FlexiBerry. All rights reserved.</p>
            <div style={{ display:'flex', gap:20 }}>
              {['Privacy Policy','Terms of Service'].map(l => (
                <a key={l} href="#" style={{ color:'#4b5563', fontSize:13, textDecoration:'none', transition:'color .15s' }}
                   onMouseOver={e => (e.currentTarget as HTMLElement).style.color='#a5b4fc'}
                   onMouseOut={e  => (e.currentTarget as HTMLElement).style.color='#4b5563'}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
    </FlexiLayout>
  )
}
