'use client'

import { useEffect, useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    image: '/assets/carousel-1.jpg',
    titleLine1: 'Buy Smart,',
    titleLine2: 'Pay Easy',
    description: 'Latest iPhones & Samsung Galaxy with 6–12 month installment plans. No credit card needed.',
    cta: 'Shop Smartphones',
    link: '/category/smartphones',
    accent: '#FF6B6B',
    bg: '#1a0a0a',
  },
  {
    image: '/assets/carousel-2.jpg',
    titleLine1: 'Power Up',
    titleLine2: 'Your Work',
    description: 'MacBooks, Gaming Laptops & more on easy installment plans for every budget.',
    cta: 'Shop Laptops',
    link: '/category/laptops',
    accent: '#A78BFA',
    bg: '#0f0a1e',
  },
]

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    emblaApi?.scrollNext()
  }, [emblaApi])

  const prev = useCallback(() => {
    setDirection(-1)
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()
    setDirection(newIndex > current ? 1 : -1)
    setCurrent(newIndex)
  }, [emblaApi, current])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => next(), 5500)
    return () => clearInterval(timer)
  }, [emblaApi, next])

  const slide = slides[current]

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: 'clamp(400px, 52vw, 560px)',
        backgroundColor: slide.bg,
        transition: 'background-color 0.9s ease',
      }}
    >
      {/* Invisible Embla */}
      <div ref={emblaRef} className="absolute inset-0 opacity-0 pointer-events-none">
        <div className="flex h-full">
          {slides.map((_, i) => (
            <div key={i} className="min-w-full" />
          ))}
        </div>
      </div>

      {/* BACKGROUND IMAGE + GRADIENT BLEND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          {/* Right image */}
          <div className="absolute top-0 right-0 h-full" style={{ width: '62%' }}>
            <Image
              src={slide.image}
              alt=""
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* LEFT → RIGHT COLOR BLEND */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to right,
                ${slide.bg} 0%,
                ${slide.bg} 36%,
                ${slide.bg}f0 45%,
                ${slide.bg}bb 52%,
                ${slide.bg}66 60%,
                ${slide.bg}22 72%,
                transparent 85%
              )`,
            }}
          />

          {/* TOP/BOTTOM VIGNETTE */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${slide.bg}88 0%, transparent 18%, transparent 78%, ${slide.bg}dd 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ACCENT GLOW */}
      <div
        className="absolute rounded-full blur-[160px] pointer-events-none"
        style={{
          zIndex: 2,
          width: '40%',
          aspectRatio: '1',
          top: '-25%',
          left: '-8%',
          background: slide.accent,
          opacity: 0.13,
          transition: 'background 0.7s ease',
        }}
      />

      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* TEXT */}
      <div className="relative h-full flex items-center" style={{ zIndex: 10 }}>
        <div className="px-6 md:px-12 lg:px-16 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * 30 }}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-5"
            >
              <div>
                <h1 className="font-black text-white" style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.8rem)', lineHeight: 1.04 }}>
                  {slide.titleLine1}
                </h1>
                <h1
                  className="font-black"
                  style={{
                    fontSize: 'clamp(2.2rem, 5.2vw, 4.8rem)',
                    lineHeight: 1.04,
                    color: slide.accent,
                    textShadow: `0 0 48px ${slide.accent}55`,
                  }}
                >
                  {slide.titleLine2}
                </h1>
              </div>

              <p
                style={{
                  color: 'rgba(255,255,255,0.58)',
                  fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)',
                  lineHeight: 1.7,
                  maxWidth: 390,
                }}
              >
                {slide.description}
              </p>

              <Link href={slide.link}>
                <button
                  className="flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-2xl hover:scale-[1.03] transition-transform"
                  style={{
                    background: slide.accent,
                    color: '#fff',
                    boxShadow: `0 8px 28px ${slide.accent}45`,
                  }}
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center"
        style={{
          zIndex: 20,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center"
        style={{
          zIndex: 20,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.13)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 items-center" style={{ zIndex: 20 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              emblaApi?.scrollTo(i)
            }}
            className="rounded-full transition-all duration-300"
            style={{
              height: 5,
              width: i === current ? 26 : 5,
              background: i === current ? slide.accent : 'rgba(255,255,255,0.22)',
              boxShadow: i === current ? `0 0 8px ${slide.accent}80` : 'none',
            }}
          />
        ))}
      </div>

      {/* COUNTER */}
      <div
        className="absolute bottom-5 right-6 text-xs font-bold tabular-nums"
        style={{ zIndex: 20, color: 'rgba(255,255,255,0.28)' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  )
}
