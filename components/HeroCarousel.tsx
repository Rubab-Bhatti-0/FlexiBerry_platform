'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ── CAROUSEL SLIDE DATA WITH COLOR THEMES ─────────────────────────────── */
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
  gradientEnd: string
  solidColor: string
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    img: '/assets/carousel-1.jpg',
    badge: '📱 Smartphones',
    h: 'Buy Smart,',
    a: 'Pay Easy',
    sub: 'Latest iPhones & Samsung Galaxy with 6–12 month plans. No credit card needed.',
    cta: 'Shop Smartphones',
    href: '/products?category=smartphones',
    accentColor: '#ef4444',
    gradientStart: '#dc2626',
    gradientEnd: '#991b1b',
    solidColor: 'rgba(31, 41, 55, 0.95)',
  },
  {
    id: 2,
    img: '/assets/carousel-2.jpg',
    badge: '💻 Laptops',
    h: 'Work Smarter,',
    a: 'Pay Later',
    sub: 'MacBooks, Dell, HP & more — premium laptops on easy monthly plans.',
    cta: 'Shop Laptops',
    href: '/products?category=laptops',
    accentColor: '#8b5cf6',
    gradientStart: '#7c3aed',
    gradientEnd: '#5b21b6',
    solidColor: 'rgba(30, 27, 75, 0.95)',
  },
  {
    id: 3,
    img: '/assets/carousel-3.jpg',
    badge: '🏍️ Bikes',
    h: 'Ride Free,',
    a: 'Pay Monthly',
    sub: 'Honda CD 70, Yamaha, Suzuki — get your bike on easy installments today.',
    cta: 'Shop Bikes',
    href: '/products?category=bikes',
    accentColor: '#f97316',
    gradientStart: '#ea580c',
    gradientEnd: '#92400e',
    solidColor: 'rgba(54, 33, 0, 0.95)',
  },
  {
    id: 4,
    img: '/assets/carousel-4.jpg',
    badge: '☀️ Solar',
    h: 'Go Green,',
    a: 'Save More',
    sub: '5kW–20kW solar systems. Slash your electricity bill with flexible payment plans.',
    cta: 'Shop Solar',
    href: '/products?category=solar',
    accentColor: '#eab308',
    gradientStart: '#ca8a04',
    gradientEnd: '#713f12',
    solidColor: 'rgba(51, 40, 0, 0.95)',
  },
  {
    id: 5,
    img: '/assets/carousel-5.jpg',
    badge: '🏠 Appliances',
    h: 'Upgrade Home,',
    a: 'Affordably',
    sub: 'AC, Fridge, Washing Machine — top brands on 6 or 12 month installments.',
    cta: 'Shop Appliances',
    href: '/products?category=appliances',
    accentColor: '#06b6d4',
    gradientStart: '#0891b2',
    gradientEnd: '#164e63',
    solidColor: 'rgba(6, 41, 58, 0.95)',
  },
  {
    id: 6,
    img: '/assets/carousel-6.jpg',
    badge: '🛋️ Furniture',
    h: 'Furnish Dreams,',
    a: 'Pay Easy',
    sub: 'Complete home & office furniture sets. Beautiful spaces, flexible payments.',
    cta: 'Shop Furniture',
    href: '/products?category=furniture',
    accentColor: '#14b8a6',
    gradientStart: '#0d9488',
    gradientEnd: '#134e4a',
    solidColor: 'rgba(5, 46, 41, 0.95)',
  },
  {
    id: 7,
    img: '/assets/carousel-7.jpg',
    badge: '📦 Jahez',
    h: 'Bundle Up,',
    a: 'Save Big',
    sub: '4–5 item Jahez packages for weddings & new homes. Save up to 50%.',
    cta: 'Shop Packages',
    href: '/products?category=jahez',
    accentColor: '#ec4899',
    gradientStart: '#db2777',
    gradientEnd: '#831843',
    solidColor: 'rgba(63, 13, 34, 0.95)',
  },
  {
    id: 8,
    img: '/assets/carousel-8.jpg',
    badge: '🚗 Cars',
    h: 'Drive Today,',
    a: 'Pay Monthly',
    sub: 'Car financing made easy. Honda, Toyota, Suzuki on flexible installment plans.',
    cta: 'Car Financing',
    href: '/products?category=cars',
    accentColor: '#3b82f6',
    gradientStart: '#1d4ed8',
    gradientEnd: '#1e3a8a',
    solidColor: 'rgba(15, 23, 42, 0.95)',
  },
  {
    id: 9,
    img: '/assets/carousel-9.jpg',
    badge: '💼 Business',
    h: 'Grow Business,',
    a: 'Smart Way',
    sub: 'Raw materials, stock & business equipment. Fund your growth today.',
    cta: 'Shop Business',
    href: '/products?category=business',
    accentColor: '#10b981',
    gradientStart: '#059669',
    gradientEnd: '#064e3b',
    solidColor: 'rgba(5, 46, 22, 0.95)',
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
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          z-index: 30;
        }

        .carousel-nav-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .carousel-nav-btn:active {
          transform: scale(0.95);
        }

        /* ── Dot indicators ──────────────────────────────────── */
        .carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background: #fff;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
        }

        .carousel-dot:hover {
          background: rgba(255, 255, 255, 0.6);
        }

        /* ── CTA Button ──────────────────────────────────────── */
        .carousel-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          font-size: 14.5px;
          font-weight: 700;
          color: #fff;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .carousel-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .carousel-cta-btn:active {
          transform: translateY(0);
        }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width: 768px) {
          .carousel-heading {
            font-size: 32px !important;
          }

          .carousel-accent {
            font-size: 32px !important;
          }

          .carousel-description {
            font-size: 14px !important;
          }

          .carousel-nav-btn {
            width: 40px;
            height: 40px;
          }

          .carousel-nav-btn svg {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 500px) {
          .carousel-heading {
            font-size: 26px !important;
          }

          .carousel-accent {
            font-size: 26px !important;
          }

          .carousel-description {
            font-size: 13px !important;
          }

          .carousel-nav-btn {
            width: 36px;
            height: 36px;
          }

          .carousel-nav-btn svg {
            width: 16px;
            height: 16px;
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
                alt={sl.h}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center right' }}
                priority={i === 0}
                sizes="100vw"
                onError={e => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>

            {/* ── LEFT GRADIENT OVERLAY (PRODUCT-SPECIFIC) ─────────── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(90deg, ${sl.solidColor} 0%, ${sl.solidColor} 35%, rgba(0,0,0,0.4) 65%, transparent 100%)`,
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
                <div style={{ maxWidth: 480, paddingRight: 40 }}>
                  {/* ── BADGE ──────────────────────────────────────── */}
                  <span
                    className="carousel-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '7px 16px',
                      marginBottom: 18,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,.12)',
                      backdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(255,255,255,.22)',
                      color: '#fff',
                      fontSize: 12.5,
                      fontWeight: 700,
                    }}
                  >
                    {sl.badge}
                  </span>

                  {/* ── MAIN HEADING ──────────────────────────────── */}
                  <h1
                    className="carousel-heading"
                    style={{
                      fontSize: 'clamp(30px, 4.5vw, 54px)',
                      fontWeight: 900,
                      color: '#fff',
                      lineHeight: 1.1,
                      letterSpacing: -1,
                      marginBottom: 0,
                    }}
                  >
                    {sl.h}
                  </h1>

                  {/* ── ACCENT HEADING (COLORED) ──────────────────── */}
                  <h1
                    className="carousel-accent"
                    style={{
                      fontSize: 'clamp(30px, 4.5vw, 54px)',
                      fontWeight: 900,
                      background: `linear-gradient(135deg, ${sl.accentColor}, ${sl.gradientStart})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.1,
                      letterSpacing: -1,
                      marginBottom: 16,
                    }}
                  >
                    {sl.a}
                  </h1>

                  {/* ── DESCRIPTION ────────────────────────────────── */}
                  <p
                    className="carousel-description"
                    style={{
                      color: 'rgba(255,255,255,.82)',
                      fontSize: 'clamp(13px, 1.8vw, 15px)',
                      lineHeight: 1.75,
                      marginBottom: 28,
                      maxWidth: 420,
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
                      width="16"
                      height="16"
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
                bottom: 16,
                right: 20,
                color: 'rgba(255,255,255,.3)',
                fontSize: 12,
                fontWeight: 600,
                zIndex: 25,
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
            left: 20,
            bottom: 20,
          }}
          aria-label="Previous slide"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
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
            right: 20,
            bottom: 20,
          }}
          aria-label="Next slide"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ── DOT INDICATORS (CENTER BOTTOM) ─────────────────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 10,
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
