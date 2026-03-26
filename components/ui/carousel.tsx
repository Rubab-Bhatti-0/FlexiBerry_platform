'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
  const [prev, setPrev] = React.useState<number | null>(null)
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const [animating, setAnimating] = React.useState(false)

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()

    if (newIndex !== index) {
      setDirection(newIndex > index ? 1 : -1)
      setPrev(index)
      setAnimating(true)
      setIndex(newIndex)
    }
  }, [emblaApi, index])

  React.useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  React.useEffect(() => {
    if (!animating) return
    const t = setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 700)
    return () => clearTimeout(t)
  }, [animating])

  React.useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => clearInterval(id)
  }, [emblaApi])

  return (
    <section style={{ position: 'relative', overflow: 'hidden', height: '520px' }}>
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {slides.map((s, i) => {
            const isActive = i === index
            const isPrev = i === prev

            let textClass = ''
            if (isActive) {
              textClass = direction === 1 ? 'hero-text-enter-fwd' : 'hero-text-enter-back'
            } else if (isPrev) {
              textClass = direction === 1 ? 'hero-text-exit-fwd' : 'hero-text-exit-back'
            }

            return (
              <div key={i} className="min-w-full relative">

                {/* IMAGE */}
                <Image
                  src={s.image}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  className={isActive ? 'hero-img-enter' : isPrev ? 'hero-img-exit' : ''}
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
                  <div className={textClass}>

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
            )
          })}
        </div>
      </div>

      {/* ARROWS */}
      <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-4 top-1/2">
        <ChevronLeft />
      </button>

      <button onClick={() => emblaApi?.scrollNext()} className="absolute right-4 top-1/2">
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
              background: i === index ? slides[index].accent : '#555'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideInRight  { from { opacity:0; transform:translateX(32px) } to { opacity:1; transform:translateX(0) } }
        @keyframes slideInLeft   { from { opacity:0; transform:translateX(-32px) } to { opacity:1; transform:translateX(0) } }
        @keyframes slideOutRight { from { opacity:1 } to { opacity:0; transform:translateX(32px) } }
        @keyframes slideOutLeft  { from { opacity:1 } to { opacity:0; transform:translateX(-32px) } }

        .hero-text-enter-fwd  { animation: slideInRight .5s ease both }
        .hero-text-enter-back { animation: slideInLeft  .5s ease both }
        .hero-text-exit-fwd   { animation: slideOutLeft  .4s ease both }
        .hero-text-exit-back  { animation: slideOutRight .4s ease both }

        @keyframes imgIn  { from { opacity:0; transform:scale(1.06) } to { opacity:1; transform:scale(1) } }
        @keyframes imgOut { from { opacity:1 } to { opacity:0 } }

        .hero-img-enter { animation: imgIn .7s ease both }
        .hero-img-exit  { animation: imgOut .4s ease both }
      `}</style>
    </section>
  )
}
