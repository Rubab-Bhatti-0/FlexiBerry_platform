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
    accent: '#3b82f6',
    accentDim: '#1d4ed8',
    bg: '#04091a',
  },
  {
    image: '/assets/carousel-2.jpg',
    titleLine1: 'Power Up',
    titleLine2: 'Your Work',
    description: 'MacBooks, Gaming Laptops & more on easy installment plans.',
    cta: 'Shop Laptops',
    link: '/category/laptops',
    accent: '#7c3aed',
    accentDim: '#5b21b6',
    bg: '#0a0515',
  },
]

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

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
    const id = setInterval(() => emblaApi.scrollNext(), 5500)
    return () => clearInterval(id)
  }, [emblaApi])

  const slide = slides[current]

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 'clamp(400px, 52vw, 560px)',
        backgroundColor: slide.bg,
        transition: 'background-color 0.9s ease',
      }}
    >
      {/* EMBLA (invisible layer) */}
      <div ref={emblaRef} className="absolute inset-0 opacity-0 pointer-events-none">
        <div className="flex h-full">
          {slides.map((_, i) => (
            <div key={i} className="min-w-full" />
          ))}
        </div>
      </div>

      {/* BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          {/* IMAGE RIGHT */}
          <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '62%' }}>
            <Image src={slide.image} alt="" fill priority style={{ objectFit: 'cover' }} />
          </div>

          {/* GRADIENT (EXACT STYLE) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
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

          {/* VIGNETTE */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, ${slide.bg}88 0%, transparent 18%, transparent 78%, ${slide.bg}dd 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* GLOW BLOBS */}
      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          width: '40%',
          aspectRatio: '1',
          top: '-25%',
          left: '-8%',
          borderRadius: '50%',
          filter: 'blur(160px)',
          background: slide.accent,
          opacity: 0.13,
          transition: 'background 0.7s ease',
        }}
      />

      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          width: '28%',
          aspectRatio: '1',
          bottom: '-18%',
          right: '5%',
          borderRadius: '50%',
          filter: 'blur(120px)',
          background: slide.accentDim,
          opacity: 0.18,
          transition: 'background 0.7s ease',
        }}
      />

      {/* TEXT */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: '0 60px', maxWidth: 520 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * 32 }}
              transition={{ duration: 0.5, ease: [0.22, 0.68, 0, 1.2] }}
            >
              <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#fff' }}>{slide.titleLine1}</h1>
              <h1
                style={{
                  fontSize: '4rem',
                  fontWeight: 800,
                  color: slide.accent,
                  textShadow: `0 0 48px ${slide.accent}55`,
                }}
              >
                {slide.titleLine2}
              </h1>

              <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: 12 }}>{slide.description}</p>

              <Link href={slide.link}>
                <button
                  style={{
                    marginTop: 20,
                    padding: '12px 24px',
                    borderRadius: 999,
                    background: slide.accent,
                    color: '#fff',
                    boxShadow: `0 8px 28px ${slide.accent}45`,
                  }}
                >
                  {slide.cta} <ArrowRight size={14} />
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CONTROLS */}
      <button onClick={() => emblaApi?.scrollPrev()} style={{ position: 'absolute', left: 20, top: '50%', zIndex: 20 }}>
        <ChevronLeft />
      </button>

      <button onClick={() => emblaApi?.scrollNext()} style={{ position: 'absolute', right: 20, top: '50%', zIndex: 20 }}>
        <ChevronRight />
      </button>
    </section>
  )
}
