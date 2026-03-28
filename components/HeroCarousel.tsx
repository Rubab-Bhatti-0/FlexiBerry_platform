'use client'

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/assets/carousel-1.jpg",
    titleLine1: "Buy Smart,",
    titleLine2: "Pay Easy",
    description: "Latest iPhones & Samsung Galaxy with 6–12 month installment plans. No credit card needed.",
    cta: "Shop Smartphones",
    link: "/products?category=smartphones",
    accent: "#FF6B6B",
    bg: "#1a0a0a",
  },
  {
    image: "/assets/carousel-2.jpg",
    titleLine1: "Power Up",
    titleLine2: "Your Work",
    description: "MacBooks, Gaming Laptops & more on easy installment plans for every budget.",
    cta: "Shop Laptops",
    link: "/products?category=laptops",
    accent: "#A78BFA",
    bg: "#0f0a1e",
  },
  {
    image: "/assets/carousel-3.jpg",
    titleLine1: "Ride Your",
    titleLine2: "Dream Bike",
    description: "Premium Scotty Motorcycles & Bikes with easy EMI available for all models.",
    cta: "Shop Motorcycles",
    link: "/products?category=bikes",
    accent: "#FB923C",
    bg: "#1a0d04",
  },
  {
    image: "/assets/carousel-4.jpg",
    titleLine1: "Home",
    titleLine2: "Essentials",
    description: "AC, LED TV, Fridge, Washing Machine & Oven — complete home solutions on installments.",
    cta: "Shop Appliances",
    link: "/products?category=appliances",
    accent: "#F87171",
    bg: "#1a0808",
  },
  {
    image: "/assets/carousel-5.jpg",
    titleLine1: "Go",
    titleLine2: "Solar",
    description: "Complete Solar Panel Systems — save on electricity bills with easy installments.",
    cta: "Shop Solar",
    link: "/products?category=solar",
    accent: "#FBBF24",
    bg: "#141004",
  },
  {
    image: "/assets/carousel-6.jpg",
    titleLine1: "Complete",
    titleLine2: "Jahez Package",
    description: "Fridge + Furniture + Appliances + More — complete home bundle solutions.",
    cta: "Shop Bundles",
    link: "/products?category=jahez",
    accent: "#F472B6",
    bg: "#1a0812",
  },
  {
    image: "/assets/carousel-7.jpg",
    titleLine1: "Furnish Your",
    titleLine2: "Dream Home",
    description: "Luxury Furniture — complete bedroom, living room & dining sets on easy plans.",
    cta: "Shop Furniture",
    link: "/products?category=furniture",
    accent: "#34D399",
    bg: "#041410",
  },
  {
    image: "/assets/carousel-8.jpg",
    titleLine1: "Drive Your",
    titleLine2: "Dream Car",
    description: "Toyota, Honda, Suzuki & More — flexible car financing options available now.",
    cta: "Shop Cars",
    link: "/products?category=cars",
    accent: "#38BDF8",
    bg: "#041018",
  },
  {
    image: "/assets/carousel-9.jpg",
    titleLine1: "Grow Your",
    titleLine2: "Business",
    description: "Business Raw Materials & Stock — B2B wholesale pricing with bulk discounts.",
    cta: "Shop B2B",
    link: "/products?category=business",
    accent: "#A3E635",
    bg: "#0a1204",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "clamp(400px, 52vw, 560px)",
        backgroundColor: slide.bg,
        transition: "background-color 0.9s ease",
      }}
    >
      {/* ── FULL BLEED IMAGE on right, fading into background colour ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current + "-bg"}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          {/* Image occupies right 60% of the banner */}
          <div className="absolute top-0 right-0 h-full" style={{ width: "62%" }}>
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />
          </div>

          {/* Left-to-right gradient: solid bg colour → transparent */}
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

          {/* Top vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${slide.bg}88 0%, transparent 18%, transparent 78%, ${slide.bg}dd 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── ACCENT GLOW blob top-left ── */}
      <div
        className="absolute rounded-full blur-[160px] pointer-events-none"
        style={{
          zIndex: 2,
          width: "40%",
          aspectRatio: "1",
          top: "-25%",
          left: "-8%",
          background: slide.accent,
          opacity: 0.13,
          transition: "background 0.7s ease",
        }}
      />

      {/* ── SUBTLE GRID OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── LEFT TEXT CONTENT ── */}
      <div className="relative h-full flex items-center" style={{ zIndex: 10 }}>
        <div className="container mx-auto" style={{ paddingLeft: "clamp(32px, 8vw, 120px)", paddingRight: "clamp(32px, 8vw, 120px)" }}>
          <div style={{ maxWidth: 550, marginLeft: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction * -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * 30 }}
                transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-5"
              >
                {/* Headline */}
                <div>
                  <h1
                    className="font-black text-white"
                    style={{ fontSize: "clamp(2.6rem, 6.2vw, 5.2rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
                  >
                    {slide.titleLine1}
                  </h1>
                  <h1
                    className="font-black"
                    style={{
                      fontSize: "clamp(2.6rem, 6.2vw, 5.2rem)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.02em",
                      color: slide.accent,
                      textShadow: `0 0 48px ${slide.accent}55`,
                      transition: "color 0.5s, text-shadow 0.5s",
                    }}
                  >
                    {slide.titleLine2}
                  </h1>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.68)",
                    fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                    lineHeight: 1.75,
                    maxWidth: 420,
                    fontWeight: 400,
                  }}
                >
                  {slide.description}
                </p>

                {/* CTA + pill */}
                <div className="flex items-center gap-3 pt-4 flex-wrap">
                  <Link href={slide.link}>
                    <button
                      className="group flex items-center gap-3 font-bold text-base px-12 py-4.5 rounded-full hover:scale-[1.05] transition-transform whitespace-nowrap"
                      style={{
                        background: slide.accent,
                        color: "#fff",
                        boxShadow: `0 12px 36px ${slide.accent}50`,
                        transition: "background 0.4s, box-shadow 0.4s, transform 0.3s",
                        letterSpacing: "0.4px",
                        minWidth: "fit-content",
                      }}
                    >
                      {slide.cta}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── PREV / NEXT ARROWS ── */}
      {[{ fn: prev, Icon: ChevronLeft, side: "left-6 md:left-8" }, { fn: next, Icon: ChevronRight, side: "right-6 md:right-8" }].map(
        ({ fn, Icon, side }) => (
          <button
            key={side}
            onClick={fn}
            className={`absolute ${side} top-1/2 -translate-y-1/2 h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center transition-all hover:scale-110`}
            style={{
              zIndex: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              color: "#fff",
            }}
          >
            <Icon className="h-5 w-5" />
          </button>
        )
      )}

      {/* ── DOTS ── */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 items-center" style={{ zIndex: 20 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              height: 6,
              width: i === current ? 28 : 6,
              background: i === current ? slide.accent : "rgba(255,255,255,0.25)",
              boxShadow: i === current ? `0 0 12px ${slide.accent}88` : "none",
            }}
          />
        ))}
      </div>

      {/* ── SLIDE COUNTER ── */}
      <div
        className="absolute bottom-6 md:bottom-8 right-6 md:right-8 text-xs font-bold tabular-nums tracking-wider"
        style={{ zIndex: 20, color: "rgba(255,255,255,0.35)" }}
      >
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
};

export default HeroCarousel;
