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
    description: 'Latest iPhones & Samsung Galaxy with 6–12 month installment plans.',
    cta: 'Shop Smartphones',
    link: '/category/smartphones',
    accent: '#FF6B6B',
    bg: '#1a0a0a',
  },
  {
    image: '/assets/carousel-2.jpg',
    titleLine1: 'Power Up',
    titleLine2: 'Your Work',
    description: 'MacBooks, Gaming Laptops & more.',
    cta: 'Shop Laptops',
    link: '/category/laptops',
    accent: '#A78BFA',
    bg: '#0f0a1e',
  },
]

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 8 })

  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newIndex = emblaApi.selectedScrollSnap()

    if (newIndex !== current) {
      setDirection(newIndex > current ? 1 : -1)
      setPrev(current)
      setCurrent(newIndex)
    }
  }, [emblaApi, current])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  // autoplay
  useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 5500)
    return () => clearInterval(id)
  }, [emblaApi])

  const next = () => emblaApi?.scrollNext()
  const prevSlide = () => emblaApi?.scrollPrev()

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
      {/* EMBLA VIEWPORT */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div key={i} className="min-w-full h-full" />
          ))}
        </div>
      </div>

      {/* BACKGROUND IMAGE (Framer Motion controlled) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current + '-bg'}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          <div className="absolute top-0 right-0 h-full w-[62%]">
            <Image src={slide.image} alt="" fill priority style={{ objectFit: 'cover' }} />
          </div>

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
        </motion.div>
      </AnimatePresence>

      {/* TEXT */}
      <div className="relative h-full flex items-center z-10">
        <div className="px-8 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * 30 }}
              transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-white text-5xl font-black">{slide.titleLine1}</h1>
              <h1 className="text-5xl font-black" style={{ color: slide.accent }}>
                {slide.titleLine2}
              </h1>

              <p className="text-gray-400 mt-4">{slide.description}</p>

              <Link href={slide.link}>
                <button
                  className="mt-6 px-6 py-3 rounded-full text-white flex items-center gap-2"
                  style={{ background: slide.accent }}
                >
                  {slide.cta} <ArrowRight size={14} />
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ARROWS */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <ChevronLeft />
      </button>

      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <ChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 26 : 6,
              height: 5,
              background: i === current ? slide.accent : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
