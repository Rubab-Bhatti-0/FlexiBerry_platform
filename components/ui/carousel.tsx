"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — all category colors live here.
// FlexiLayout.tsx imports CATEGORY_THEMES from this file.
// ─────────────────────────────────────────────────────────────
export const CATEGORY_THEMES: Record<
  string,
  { primary: string; alt: string; bg: string; glow: string; glowOp: number; tint: string; darkBg: string }
> = {
  smartphones: {
    primary:  "#FF3B5C",
    alt:      "#FF8C69",
    bg:       "#fff1f2",
    glow:     "#FF3B5C",
    glowOp:   0.28,
    tint:     "rgba(255,59,92,0.18)",
    darkBg:   "#1f0008",   // deep crimson-black
  },
  laptops: {
    primary:  "#7C3AED",
    alt:      "#A78BFA",
    bg:       "#f5f3ff",
    glow:     "#6D28D9",
    glowOp:   0.30,
    tint:     "rgba(109,40,217,0.20)",
    darkBg:   "#0e0025",   // deep violet-black
  },
  bikes: {
    primary:  "#F97316",
    alt:      "#FDBA74",
    bg:       "#fff7ed",
    glow:     "#EA580C",
    glowOp:   0.28,
    tint:     "rgba(234,88,12,0.16)",
    darkBg:   "#1e0a00",   // deep burnt-orange black
  },
  appliances: {
    primary:  "#C026D3",
    alt:      "#E879F9",
    bg:       "#fdf4ff",
    glow:     "#A21CAF",
    glowOp:   0.26,
    tint:     "rgba(192,38,211,0.18)",
    darkBg:   "#1a0022",   // deep magenta-black
  },
  solar: {
    primary:  "#EAB308",
    alt:      "#FDE68A",
    bg:       "#fefce8",
    glow:     "#CA8A04",
    glowOp:   0.28,
    tint:     "rgba(202,138,4,0.18)",
    darkBg:   "#1a1400",   // deep golden-black
  },
  jahez: {
    primary:  "#EC4899",
    alt:      "#F9A8D4",
    bg:       "#fdf2f8",
    glow:     "#DB2777",
    glowOp:   0.26,
    tint:     "rgba(219,39,119,0.18)",
    darkBg:   "#1f001a",   // deep rose-black
  },
  furniture: {
    primary:  "#10B981",
    alt:      "#6EE7B7",
    bg:       "#f0fdfa",
    glow:     "#059669",
    glowOp:   0.28,
    tint:     "rgba(5,150,105,0.16)",
    darkBg:   "#001a0d",   // deep emerald-black
  },
  cars: {
    primary:  "#0EA5E9",
    alt:      "#7DD3FC",
    bg:       "#ecfeff",
    glow:     "#0284C7",
    glowOp:   0.28,
    tint:     "rgba(2,132,199,0.18)",
    darkBg:   "#00101f",   // deep ocean-black
  },
  business: {
    primary:  "#84CC16",
    alt:      "#BEF264",
    bg:       "#f7fee7",
    glow:     "#65A30D",
    glowOp:   0.28,
    tint:     "rgba(101,163,13,0.16)",
    darkBg:   "#0d1a00",   // deep lime-black
  },
  general: {
    primary:  "#F59E0B",
    alt:      "#FCD34D",
    bg:       "#fffbeb",
    glow:     "#D97706",
    glowOp:   0.26,
    tint:     "rgba(217,119,6,0.16)",
    darkBg:   "#1a1000",   // deep amber-black
  },
};

// ─────────────────────────────────────────────────────────────
// SLIDE DEFINITIONS
// image filenames must match what's actually in /public/
// ─────────────────────────────────────────────────────────────
interface Slide {
  image: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  cta: string;
  link: string;
  themeKey: keyof typeof CATEGORY_THEMES;
  gradientStops: string;
  gradientOpacities: string;
}

const slides: Slide[] = [
  {
    image:            "/carousel-1.jpg",
    titleLine1:       "Buy Smart,",
    titleLine2:       "Pay Easy",
    description:      "Latest iPhones & Samsung Galaxy with 6–12 month installment plans. No credit card needed.",
    cta:              "Shop Smartphones",
    link:             "/products?category=smartphones",
    themeKey:         "smartphones",
    gradientStops:    "0%,38%,50%,62%,76%,88%",
    gradientOpacities:"ff,f5,d0,99,44,00",
  },
  {
    image:            "/carousel-2.jpg",
    titleLine1:       "Work Smarter,",
    titleLine2:       "Pay Later",
    description:      "MacBooks, Dell, HP & more — premium laptops on easy monthly plans.",
    cta:              "Shop Laptops",
    link:             "/products?category=laptops",
    themeKey:         "laptops",
    gradientStops:    "0%,40%,52%,64%,78%,90%",
    gradientOpacities:"ff,f8,cc,88,33,00",
  },
  {
    image:            "/carousel-3.jpg",
    titleLine1:       "Ride Your",
    titleLine2:       "Dream Bike",
    description:      "Premium Scotty Motorcycles & Bikes with easy EMI available for all models.",
    cta:              "Shop Bikes",
    link:             "/products?category=bikes",
    themeKey:         "bikes",
    gradientStops:    "0%,36%,48%,60%,74%,88%",
    gradientOpacities:"ff,f2,cc,88,33,00",
  },
  {
    image:            "/carousel-4.jpg",
    titleLine1:       "Home",
    titleLine2:       "Essentials",
    description:      "AC, LED TV, Fridge, Washing Machine & Oven — complete home solutions on installments.",
    cta:              "Shop Appliances",
    link:             "/products?category=appliances",
    themeKey:         "appliances",
    gradientStops:    "0%,38%,50%,62%,76%,90%",
    gradientOpacities:"ff,f5,d0,88,33,00",
  },
  {
    image:            "/carousel-5.jpg",
    titleLine1:       "Go",
    titleLine2:       "Solar",
    description:      "Complete Solar Panel Systems — save on electricity bills with easy installments.",
    cta:              "Shop Solar",
    link:             "/products?category=solar",
    themeKey:         "solar",
    gradientStops:    "0%,38%,50%,62%,76%,90%",
    gradientOpacities:"ff,f5,d5,88,33,00",
  },
  {
    image:            "/carousel-6.jpg",
    titleLine1:       "Complete",
    titleLine2:       "Jahez Package",
    description:      "Fridge + Furniture + Appliances + More — complete home bundle solutions.",
    cta:              "Shop Jahez",
    link:             "/products?category=jahez",
    themeKey:         "jahez",
    gradientStops:    "0%,38%,50%,62%,76%,90%",
    gradientOpacities:"ff,f5,cc,88,33,00",
  },
  {
    image:            "/carousel-7.jpg",
    titleLine1:       "Furnish Your",
    titleLine2:       "Dream Home",
    description:      "Luxury Furniture — complete bedroom, living room & dining sets on easy plans.",
    cta:              "Shop Furniture",
    link:             "/products?category=furniture",
    themeKey:         "furniture",
    gradientStops:    "0%,38%,50%,62%,76%,90%",
    gradientOpacities:"ff,f5,cc,88,33,00",
  },
  {
    image:            "/carousel-8.jpg",
    titleLine1:       "Drive Your",
    titleLine2:       "Dream Car",
    description:      "Toyota, Honda, Suzuki & More — flexible car financing options available now.",
    cta:              "Shop Cars",
    link:             "/products?category=cars",
    themeKey:         "cars",
    gradientStops:    "0%,38%,50%,62%,76%,90%",
    gradientOpacities:"ff,f5,cc,88,33,00",
  },
  {
    image:            "/carousel-9.jpg",
    titleLine1:       "Grow Your",
    titleLine2:       "Business",
    description:      "Business Raw Materials & Stock — B2B wholesale pricing with bulk discounts.",
    cta:              "Shop B2B",
    link:             "/products?category=business",
    themeKey:         "business",
    gradientStops:    "0%,38%,50%,62%,76%,90%",
    gradientOpacities:"ff,f5,cc,88,33,00",
  },
];

// ─────────────────────────────────────────────────────────────
// Helper: build per-slide horizontal fade gradient
// ─────────────────────────────────────────────────────────────
function buildHorizontalGradient(bg: string, stops: string, opacities: string): string {
  const s = stops.split(",");
  const o = opacities.split(",");
  return s.map((stop, i) => `${bg}${o[i] ?? "00"} ${stop}`).join(", ");
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  const slide     = slides[current];
  const theme     = CATEGORY_THEMES[slide.themeKey];
  const hGradient = buildHorizontalGradient(theme.darkBg, slide.gradientStops, slide.gradientOpacities);

  return (
    <section
      className="relative overflow-hidden select-none"
      style={{
        height: "clamp(400px, 52vw, 580px)",
        backgroundColor: theme.darkBg,
        transition: "background-color 0.85s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LAYER 1 — Full-bleed image + masks */}
      <AnimatePresence>
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          <div className="absolute top-0 right-0 h-full w-[62%]">
            <Image
              src={slide.image}
              alt={slide.titleLine2}
              fill
              priority={current === 0}
              sizes="62vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: theme.tint, mixBlendMode: "color" }}
            />
          </div>

          {/* Horizontal fade */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${hGradient})` }}
          />
          {/* Top vignette */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${theme.darkBg}99 0%, transparent 18%)` }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${theme.darkBg}ee 0%, transparent 22%)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* LAYER 2 — Glow blobs */}
      <motion.div
        key={`glow1-${current}`}
        animate={{ opacity: theme.glowOp }}
        transition={{ duration: 1 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          zIndex: 2, width: "44%", aspectRatio: "1",
          top: "-28%", left: "-6%",
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />
      <motion.div
        key={`glow2-${current}`}
        animate={{ opacity: theme.glowOp * 0.55 }}
        transition={{ duration: 1.2 }}
        className="absolute rounded-full pointer-events-none"
        style={{
          zIndex: 2, width: "30%", aspectRatio: "1",
          bottom: "-15%", right: "10%",
          background: `radial-gradient(circle, ${theme.alt} 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      {/* LAYER 3 — Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* LAYER 4 — Left accent line */}
      <motion.div
        key={`line-${current}`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="absolute left-0 pointer-events-none"
        style={{
          zIndex: 4, top: "10%", width: 3, height: "80%",
          background: `linear-gradient(to bottom, transparent, ${theme.primary}, transparent)`,
          borderRadius: 2, transformOrigin: "top", opacity: 0.7,
        }}
      />

      {/* LAYER 5 — Text content */}
      <div className="relative h-full flex items-center" style={{ zIndex: 10 }}>
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div style={{ maxWidth: 520 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, x: direction * -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * 28 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-5"
              >
                {/* Category pill */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <span
                    className="inline-flex items-center text-[0.65rem] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full"
                    style={{
                      background: `${theme.primary}22`,
                      color: theme.primary,
                      border: `1px solid ${theme.primary}44`,
                    }}
                  >
                    {slide.cta}
                  </span>
                </motion.div>

                {/* Headline */}
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 }}
                    className="font-black text-white"
                    style={{ fontSize: "clamp(2.1rem, 5vw, 4.6rem)", lineHeight: 1.03, letterSpacing: "-0.02em" }}
                  >
                    {slide.titleLine1}
                  </motion.h1>

                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-black"
                    style={{
                      fontSize: "clamp(2.1rem, 5vw, 4.6rem)",
                      lineHeight: 1.03,
                      letterSpacing: "-0.02em",
                      color: theme.primary,
                      textShadow: `0 0 20px ${theme.primary}88, 0 0 60px ${theme.primary}33`,
                      transition: "color 0.5s, text-shadow 0.5s",
                    }}
                  >
                    {slide.titleLine2}
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                  style={{
                    color: "rgba(255,255,255,0.52)",
                    fontSize: "clamp(0.78rem, 1.3vw, 0.92rem)",
                    lineHeight: 1.75,
                    maxWidth: 380,
                  }}
                >
                  {slide.description}
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  className="flex items-center gap-3 pt-1 flex-wrap"
                >
                  <Link href={slide.link}>
                    <button
                      type="button"
                      className="group relative flex items-center gap-2.5 font-bold text-sm px-7 py-3.5 rounded-2xl overflow-hidden text-white"
                    >
                      <span
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primary}, ${theme.alt})`,
                          boxShadow: `0 8px 32px ${theme.primary}55`,
                          transition: "opacity 0.3s",
                        }}
                      />
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        {slide.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  </Link>

                  <Link
                    href={slide.link}
                    className="text-xs font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.32)" }}
                  >
                    Learn more
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* LAYER 6 — Prev / Next arrows */}
      {(
        [
          { fn: prev, Icon: ChevronLeft,  pos: "left-3"  },
          { fn: next, Icon: ChevronRight, pos: "right-3" },
        ] as const
      ).map(({ fn, Icon, pos }) => (
        <button
          key={pos}
          type="button"
          onClick={fn}
          aria-label={pos.startsWith("left") ? "Previous slide" : "Next slide"}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95`}
          style={{
            zIndex: 20,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            color: "#fff",
          }}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}

      {/* LAYER 7 — Dot navigation */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 items-center" style={{ zIndex: 20 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              height: 5,
              width: i === current ? 28 : 5,
              background: i === current
                ? `linear-gradient(90deg, ${theme.primary}, ${theme.alt})`
                : "rgba(255,255,255,0.18)",
              boxShadow: i === current ? `0 0 10px ${theme.primary}99` : "none",
            }}
          />
        ))}
      </div>

      {/* LAYER 8 — Slide counter */}
      <div
        className="absolute bottom-5 right-5 flex items-center gap-1 text-[10px] font-bold tabular-nums"
        style={{ zIndex: 20, color: "rgba(255,255,255,0.25)" }}
      >
        <span style={{ color: theme.primary, fontSize: 11 }}>{String(current + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* LAYER 9 — Auto-play progress bar */}
      {!isHovered && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            zIndex: 20,
            background: `linear-gradient(90deg, ${theme.primary}, ${theme.alt})`,
            boxShadow: `0 0 8px ${theme.primary}88`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5.5, ease: "linear" }}
        />
      )}
    </section>
  );
}
