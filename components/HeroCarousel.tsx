'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ── CAROUSEL SLIDE DATA WITH CORRECTED IMAGE MAPPING ──────────────────── */
interface CarouselSlide {
  id: number
  img: string
  badge: string
  h: string
  a: string
  sub: string
  cta: string
  href: string
  accentColor: string
  gradientStart: string
  solidColor: string
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    img: '/assets/carousel-1.jpg', // Smartphones
    badge: '📱 Smartphones',
    h: 'Buy Smart,',
    a: 'Pay Easy',
    sub: 'Latest iPhones & Samsung Galaxy with 6–12 month plans. No credit card needed.',
    cta: 'Shop Smartphones',
    href: '/products?category=smartphones',
    accentColor: '#ef4444',
    gradientStart: '#dc2626',
    solidColor: 'rgba(31, 41, 55, 0.92)',
  },
  {
    id: 2,
    img: '/assets/carousel-2.jpg', // Laptops
    badge: '💻 Laptops',
    h: 'Work Smarter,',
    a: 'Pay Later',
    sub: 'MacBooks, Dell, HP & more — premium laptops on easy monthly plans.',
    cta: 'Shop Laptops',
    href: '/products?category=laptops',
    accentColor: '#8b5cf6',
    gradientStart: '#7c3aed',
    solidColor: 'rgba(30, 27, 75, 0.92)',
  },
  {
    id: 3,
    img: '/assets/carousel-3.jpg', // Bikes
    badge: '🏍️ Bikes',
    h: 'Ride Free,',
    a: 'Pay Monthly',
    sub: 'Honda CD 70, Yamaha, Suzuki — get your bike on easy installments today.',
    cta: 'Shop Bikes',
    href: '/products?category=bikes',
    accentColor: '#f97316',
    gradientStart: '#ea580c',
    solidColor: 'rgba(54, 33, 0, 0.92)',
  },
  {
    id: 4,
    img: '/assets/carousel-4.jpg', // SOLAR - Yellow/Golden
    badge: '☀️ Solar',
    h: 'Go Green,',
    a: 'Save More',
    sub: '5kW–20kW solar systems. Slash your electricity bill with flexible payment plans.',
    cta: 'Shop Solar',
    href: '/products?category=solar',
    accentColor: '#eab308',
    gradientStart: '#ca8a04',
    solidColor: 'rgba(51, 40, 0, 0.92)',
  },
  {
    id: 5,
    img: '/assets/carousel-5.jpg', // Appliances
    badge: '🏠 Appliances',
    h: 'Upgrade Home,',
    a: 'Affordably',
    sub: 'AC, Fridge, Washing Machine — top brands on 6 or 12 month installments.',
    cta: 'Shop Appliances',
    href: '/products?category=appliances',
    accentColor: '#06b6d4',
    gradientStart: '#0891b2',
    solidColor: 'rgba(6, 41, 58, 0.92)',
  },
  {
    id: 6,
    img: '/assets/carousel-6.jpg', // Furniture
    badge: '🛋️ Furniture',
    h: 'Furnish Dreams,',
    a: 'Pay Easy',
    sub: 'Complete home & office furniture sets. Beautiful spaces, flexible payments.',
    cta: 'Shop Furniture',
    href: '/products?category=furniture',
    accentColor: '#14b8a6',
    gradientStart: '#0d9488',
    solidColor: 'rgba(5, 46, 41, 0.92)',
  },
  {
    id: 7,
    img: '/assets/carousel-7.jpg', // Jahez
    badge: '📦 Jahez',
    h: 'Bundle Up,',
    a: 'Save Big',
    sub: '4–5 item Jahez packages for weddings & new homes. Save up to 50%.',
    cta: 'Shop Packages',
    href: '/products?category=jahez',
    accentColor: '#ec4899',
    gradientStart: '#db2777',
    solidColor: 'rgba(63, 13, 34, 0.92)',
  },
  {
    id: 8,
    img: '/assets/carousel-8.jpg', // Cars
    badge: '🚗 Cars',
    h: 'Drive Today,',
    a: 'Pay Monthly',
    sub: 'Car financing made easy. Honda, Toyota, Suzuki on flexible installment plans.',
    cta: 'Car Financing',
    href: '/products?category=cars',
    accentColor: '#3b82f6',
    gradientStart: '#1d4ed8',
    solidColor: 'rgba(15, 23, 42, 0.92)',
  },
  {
    id: 9,
    img: '/assets/carousel-9.jpg', // Business
    badge: '💼 Business',
    h: 'Grow Business,',
    a: 'Smart Way',
    sub: 'Raw materials, stock & business equipment. Fund your growth today.',
    cta: 'Shop Business',
    href: '/products?category=business',
    accentColor: '#10b981',
    gradientStart: '#059669',
    solidColor: 'rgba(5, 46, 22, 0.92)',
  },
]

/* ── COMPONENT ──────────────────────────────────────────────────────────── */
export default function HeroCarousel() {
  const [slide, setSlide] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Auto-play carousel
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setSlide(p => (p + 1) % CAROUSEL_SLIDES.length), 5200)
  }, [])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const goTo = (i: number) => {
    setSlide(i)
    startTimer()
  }

  const prev = () => goTo((slide - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)
  const next = () => goTo((slide + 1) % CAROUSEL_SLIDES.length)

  const currentSlide = CAROUSEL_SLIDES[slide]

  return (
    <>
      <style>{`
        /* ── Carousel text entrance animation ─────────────────── */
        @keyframes carouselIn {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel-badge {
          animation: carouselIn 0.5s 0.05s ease both;
        }

        .carousel-heading {
          animation: carouselIn 0.5s 0.18s ease both;
        }

        .carousel-accent {
          animation: carouselIn 0.5s 0.18s ease both;
        }

        .carousel-description {
          animation: carouselIn 0.5s 0.3s ease both;
        }

        .carousel-cta {
          animation: carouselIn 0.5s 0.42s ease both;
        }

        /* ── Navigation button styles ─────────────────────────── */
        .carousel-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(12px);
          z-index: 30;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .carousel-nav-btn:hover {
          background: rgba(255, 255, 255, 0.28);
          border-color: rgba(255, 255, 255, 0.5);
          transform: scale(1.15);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }

        .carousel-nav-btn:active {
          transform: scale(0.92);
        }

        .carousel-nav-btn svg {
          width: 24px;
          height: 24px;
          stroke-width: 2.5;
        }

        /* ── Dot indicators ──────────────────────────────────── */
        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background: #fff;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.7);
          transform: scale(1.2);
        }

        .carousel-dot:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        /* ── CTA Button ──────────────────────────────────────── */
        .carousel-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.3px;
        }

        .carousel-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.4);
        }

        .carousel-cta-btn:active {
          transform: translateY(-1px);
        }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width: 768px) {
          .carousel-heading {
            font-size: 36px !important;
          }

          .carousel-accent {
            font-size: 36px !important;
          }

          .carousel-description {
            font-size: 14px !important;
          }

          .carousel-nav-btn {
            width: 44px;
            height: 44px;
          }

          .carousel-nav-btn svg {
            width: 20px;
            height: 20px;
          }

          .carousel-cta-btn {
            padding: 12px 26px;
            font-size: 14px;
          }
        }

        @media (max-width: 500px) {
          .carousel-heading {
            font-size: 28px !important;
          }

          .carousel-accent {
            font-size: 28px !important;
          }

          .carousel-description {
            font-size: 13px !important;
          }

          .carousel-nav-btn {
            width: 40px;
            height: 40px;
          }

          .carousel-nav-btn svg {
            width: 18px;
            height: 18px;
          }

          .carousel-cta-btn {
            padding: 11px 22px;
            font-size: 13px;
          }
        }
      `}</style>

      {/* ── CAROUSEL CONTAINER ─────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: '460px',
          background: '#07040f',
        }}
      >
        {/* ── SLIDES ─────────────────────────────────────────────── */}
        {CAROUSEL_SLIDES.map((sl, i) => (
          <div
            key={sl.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 0.75s ease',
              pointerEvents: i === slide ? 'auto' : 'none',
            }}
          >
            {/* ── BACKGROUND IMAGE (RIGHT SIDE) ──────────────────── */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <Image
                src={sl.img}
                alt={sl.badge}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center right' }}
                priority={i === 0}
                sizes="100vw"
                onError={e => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>

            {/* ── LEFT GRADIENT OVERLAY (PRODUCT-SPECIFIC, SMOOTH BLEND) ─────── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, ${sl.solidColor} 0%, ${sl.solidColor} 32%, rgba(0,0,0,0.5) 55%, transparent 85%)`,
              }}
            />

            {/* ── CONTENT (LEFT SIDE) ────────────────────────────── */}
            {i === slide && (
              <div
                style={{
                  position: 'relative',
                  zIndex: 20,
                  maxWidth: 1340,
                  margin: '0 auto',
                  padding: '0 24px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <div style={{ maxWidth: 500, paddingRight: 60 }}>
                  {/* ── BADGE ──────────────────────────────────────── */}
                  <span
                    className="carousel-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 18px',
                      marginBottom: 20,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,.14)',
                      backdropFilter: 'blur(10px)',
                      border: '1.5px solid rgba(255,255,255,.25)',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.2px',
                    }}
                  >
                    {sl.badge}
                  </span>

                  {/* ── MAIN HEADING ──────────────────────────────── */}
                  <h1
                    className="carousel-heading"
                    style={{
                      fontSize: 'clamp(32px, 5vw, 56px)',
                      fontWeight: 900,
                      color: '#fff',
                      lineHeight: 1.15,
                      letterSpacing: -1.2,
                      marginBottom: 0,
                    }}
                  >
                    {sl.h}
                  </h1>

                  {/* ── ACCENT HEADING (COLORED) ──────────────────── */}
                  <h1
                    className="carousel-accent"
                    style={{
                      fontSize: 'clamp(32px, 5vw, 56px)',
                      fontWeight: 900,
                      background: `linear-gradient(135deg, ${sl.accentColor}, ${sl.gradientStart})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.15,
                      letterSpacing: -1.2,
                      marginBottom: 18,
                    }}
                  >
                    {sl.a}
                  </h1>

                  {/* ── DESCRIPTION ────────────────────────────────── */}
                  <p
                    className="carousel-description"
                    style={{
                      color: 'rgba(255,255,255,.85)',
                      fontSize: 'clamp(13px, 1.8vw, 15px)',
                      lineHeight: 1.8,
                      marginBottom: 32,
                      maxWidth: 450,
                      fontWeight: 400,
                      letterSpacing: '0.2px',
                    }}
                  >
                    {sl.sub}
                  </p>

                  {/* ── CTA BUTTON ────────────────────────────────── */}
                  <Link
                    href={sl.href}
                    className="carousel-cta carousel-cta-btn"
                    style={{
                      background: `linear-gradient(135deg, ${sl.accentColor}, ${sl.gradientStart})`,
                    }}
                  >
                    {sl.cta}
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            {/* ── SLIDE COUNTER ──────────────────────────────────── */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                color: 'rgba(255,255,255,.4)',
                fontSize: 13,
                fontWeight: 600,
                zIndex: 25,
                letterSpacing: '1.5px',
                fontFamily: 'monospace',
              }}
            >
              {String(slide + 1).padStart(2, '0')} / {String(CAROUSEL_SLIDES.length).padStart(2, '0')}
            </div>
          </div>
        ))}

        {/* ── NAVIGATION ARROWS (BOTTOM CORNERS) ──────────────────── */}
        <button
          onClick={prev}
          className="carousel-nav-btn"
          style={{
            position: 'absolute',
            left: 24,
            bottom: 24,
          }}
          aria-label="Previous slide"
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={next}
          className="carousel-nav-btn"
          style={{
            position: 'absolute',
            right: 24,
            bottom: 24,
          }}
          aria-label="Next slide"
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ── DOT INDICATORS (CENTER BOTTOM) ─────────────────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 12,
            zIndex: 25,
          }}
        >
          {CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === slide ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  )
}
