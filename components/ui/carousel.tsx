'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Slides (same as yours)
const slides = [
  {
    image: "/assets/carousel-1.jpg",
    titleLine1: "Buy Smart,",
    titleLine2: "Pay Easy",
    description: "Latest iPhones & Samsung Galaxy with easy installment plans.",
    cta: "Shop Smartphones",
    link: "/category/smartphones",
    accent: "#3b82f6",
    bg: "#04091a",
    tag: "Smartphones",
  },
  {
    image: "/assets/carousel-2.jpg",
    titleLine1: "Power Up",
    titleLine2: "Your Work",
    description: "MacBooks, Gaming Laptops & more.",
    cta: "Shop Laptops",
    link: "/category/laptops",
    accent: "#7c3aed",
    bg: "#0a0515",
    tag: "Laptops",
  },
]

export default function HeroEmbla() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [index, setIndex] = React.useState(0)

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  // Auto play
  React.useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => clearInterval(id)
  }, [emblaApi])

  const slide = slides[index]

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '520px',
        background: slide.bg,
        transition: 'background 0.6s ease'
      }}
    >
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div key={i} className="min-w-full relative">

              {/* IMAGE */}
              <Image
                src={s.image}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                className="hero-img-enter"
              />

              {/* OVERLAY */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to right, ${s.bg}, transparent)`
                }}
              />

              {/* CONTENT */}
              <div className="relative z-10 p-16 max-w-xl">
                <div className="hero-text-enter-fwd">

                  <span style={{ color: s.accent }}>{s.tag}</span>

                  <h1 style={{ color: '#fff', fontSize: '48px' }}>
                    {s.titleLine1}
                  </h1>
                  <h1 style={{ color: s.accent, fontSize: '48px' }}>
                    {s.titleLine2}
                  </h1>

                  <p style={{ color: '#aaa' }}>{s.description}</p>

                  <Link href={s.link}>
                    <button
                      style={{
                        background: s.accent,
                        padding: '10px 20px',
                        borderRadius: '999px',
                        color: '#fff'
                      }}
                    >
                      {s.cta} <ArrowRight size={14} />
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2"
      >
        <ChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            style={{
              width: i === index ? 24 : 6,
              height: 6,
              background: i === index ? slide.accent : '#555'
            }}
          />
        ))}
      </div>

      {/* ANIMATIONS (UNCHANGED STYLE HOOKS) */}
      <style>{`
        @keyframes slideInRight {
          from { opacity:0; transform:translateX(40px) }
          to { opacity:1; transform:translateX(0) }
        }

        .hero-text-enter-fwd {
          animation: slideInRight .5s ease both;
        }

        @keyframes imgIn {
          from { opacity:0; transform:scale(1.05) }
          to { opacity:1; transform:scale(1) }
        }

        .hero-img-enter {
          animation: imgIn .7s ease both;
        }
      `}</style>
    </section>
  )
}
