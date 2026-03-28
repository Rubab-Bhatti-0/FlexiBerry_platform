'use client'

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import FlexiLayout from "@/components/layout/FlexiLayout/FlexiLayout";
import { CATEGORY_THEMES } from "@/components/ui/carousel";
import { PRODUCTS_DATA, ProductDetail } from "@/lib/products";
import {
  Star,
  Heart,
  ShoppingCart,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Share2,
  Minus,
  Plus,
  MessageSquare,
  Facebook,
  Twitter,
  BadgeCheck,
  Store,
  MapPin,
  X,
  Search,
} from "lucide-react";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{
            width: size, height: size,
            fill: s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb",
            color: s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb",
          }}
        />
      ))}
    </span>
  );
}

interface LightboxProps {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
  theme: any;
}

function ZoomLightbox({ images, activeIndex, onClose, onChangeIndex, theme }: LightboxProps) {
  const [scale, setScale]       = useState(1);
  const [pos, setPos]           = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOrigin              = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [activeIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChangeIndex((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onChangeIndex((activeIndex - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, images.length, onClose, onChangeIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: dragOrigin.current.px + (e.clientX - dragOrigin.current.mx),
      y: dragOrigin.current.py + (e.clientY - dragOrigin.current.my),
    });
  };
  const onMouseUp = () => setDragging(false);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 9998 }} />
      <button onClick={onClose} style={{ position: "fixed", top: 16, right: 16, zIndex: 10001, width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <X size={20} />
      </button>
      <div onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default" }}>
        <div onMouseDown={onMouseDown} style={{ transform: "translate(" + pos.x + "px, " + pos.y + "px) scale(" + scale + ")", transition: dragging ? "none" : "transform 0.2s ease-out", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={images[activeIndex]} alt="" onClick={(e) => { e.stopPropagation(); setScale(scale === 1 ? 2 : 1); setPos({ x: 0, y: 0 }); }} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", userSelect: "none", pointerEvents: "auto" }} />
        </div>
      </div>
    </>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = PRODUCTS_DATA[productId];

  const [activeImg, setActiveImg]       = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [qty, setQty]                   = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [activeTab, setActiveTab]       = useState<"desc" | "details" | "reviews">("desc");
  const [wishlist, setWishlist]         = useState(false);
  const [addedToCart, setAddedToCart]   = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<ProductDetail[]>([]);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0].name);
      if (product.variants && product.variants.length > 0) {
        const storageVariant = product.variants.find(v => v.label.toLowerCase() === 'storage');
        if (storageVariant) setSelectedStorage(storageVariant.options[0]);
      }
      const stored = localStorage.getItem('recentlyViewed');
      let list: string[] = stored ? JSON.parse(stored) : [];
      list = list.filter(id => id !== product.id);
      list.unshift(product.id);
      list = list.slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(list));
      const fullList = list.filter(id => id !== product.id).map(id => PRODUCTS_DATA[id]).filter(Boolean);
      setRecentlyViewed(fullList);
    }
  }, [product]);

  if (!product) {
    return (
      <FlexiLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
          </div>
        </div>
      </FlexiLayout>
    );
  }

  const theme = CATEGORY_THEMES[product.categorySlug] || CATEGORY_THEMES.general;
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) * 100) / product.originalPrice) : 0;
  const formatPrice = (p: number) => "₨" + p.toLocaleString();
  const getMonthlyInstallment = (p: number, m: number) => "₨" + Math.round(p / m).toLocaleString();

  return (
    <FlexiLayout>
      <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="border-b border-gray-100 py-3.5">
          <div className="max-w-[1240px] mx-auto px-5 flex items-center gap-2 text-[13px] text-gray-400 font-medium">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href={"/products?category=" + product.categorySlug} className="hover:text-gray-900 transition-colors">{product.category}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-bold truncate">{product.name}</span>
          </div>
        </div>

        <section className="max-w-[1240px] mx-auto px-5 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-white group cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
                  <Image src={product.images[activeImg]} alt={product.name} fill className="object-contain p-8 transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex gap-3 mt-5 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white" style={{ borderColor: activeImg === i ? theme.primary : "transparent" }}>
                      <Image src={img} alt="" fill className="object-contain p-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-col">
                <h1 className="text-[28px] lg:text-[36px] font-black text-gray-900 leading-[1.15] mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>{product.name}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all hover:shadow-sm group" style={{ background: theme.bg, borderColor: theme.primary + "30" }}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: theme.primary }}><Store className="w-3.5 h-3.5 text-white" /></div>
                    <span className="text-[13px] font-bold leading-none" style={{ color: theme.primary }}>{product.vendor}</span>
                    {product.vendorVerified && <BadgeCheck className="w-3.5 h-3.5 shrink-0" style={{ color: "#16a34a" }} />}
                    <span className="text-gray-300 text-[11px] mx-0.5">•</span>
                    <span className="flex items-center gap-0.5 text-[11px] text-gray-400"><MapPin className="w-3 h-3" />{product.vendorLocation}</span>
                  </div>
                </div>
                <p className="text-[13px] text-gray-400 mb-3"><span className="font-semibold text-gray-500">Reference:</span> {product.reference || (product.id.toUpperCase() + "-001")}</p>
                <div className="flex items-center gap-2.5 mb-5">
                  <Stars rating={product.rating} size={16} />
                  <button onClick={() => setActiveTab("reviews")} className="text-[13px] flex items-center gap-1 hover:underline" style={{ color: theme.primary }}><MessageSquare className="w-3.5 h-3.5" /> Read reviews ({product.reviewCount})</button>
                </div>
                <div className="mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[32px] font-black leading-none" style={{ color: theme.primary, fontFamily: "'Nunito', sans-serif" }}>{formatPrice(product.price)}</span>
                    {product.originalPrice && <span className="text-lg text-gray-400 line-through font-medium">{formatPrice(product.originalPrice)}</span>}
                    {discount > 0 && <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-500 text-white">-{discount}%</span>}
                  </div>
                  <p className="text-[13px] font-semibold mt-1.5 flex items-center gap-1.5" style={{ color: "#16a34a" }}><BadgeCheck className="w-4 h-4" /> Available from {getMonthlyInstallment(product.price, 12)} {"/"} month — 0% markup installment</p>
                </div>
                <div className="text-[14px] text-gray-500 leading-7 mb-5 pt-4 border-t border-gray-100">
                  <p className="mb-2">{product.description}</p>
                </div>
                <div className="rounded-xl p-4 mb-5 border" style={{ background: theme.bg, borderColor: theme.primary + "20" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-4 h-4" style={{ color: theme.primary }} />
                    <span className="text-[13px] font-bold" style={{ color: theme.primary }}>Installment Plans</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(product.installmentPlans || [{months: 3}, {months: 6}, {months: 12}, {months: 24}]).map((plan) => (
                      <div key={plan.months} className="bg-white rounded-lg p-3 text-center border" style={{ borderColor: theme.primary + "15" }}>
                        <p className="text-[11px] text-gray-400 mb-1">{plan.months} Months</p>
                        <p className="text-base font-black" style={{ color: theme.primary }}>{plan.monthly ? formatPrice(plan.monthly) : getMonthlyInstallment(product.price, plan.months)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3.5 mb-5">
                  <button onClick={() => { setAddedToCart(true); setTimeout(() => { window.location.href = "/checkout?product=" + product.id; }, 800); }} className="flex-1 h-11 flex items-center justify-center gap-2 text-white text-[13px] font-black uppercase tracking-wide rounded-lg transition-all hover:opacity-90" style={{ background: addedToCart ? "#16a34a" : theme.primary, boxShadow: "0 6px 20px " + theme.primary + "40" }}>
                    <CreditCard className="w-4 h-4" /> {addedToCart ? "✓ Redirecting…" : "Buy on Installment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-100 py-12 bg-gray-50/50">
          <div className="max-w-[1240px] mx-auto px-5">
            <div className="flex border-b border-gray-200 mb-8">
              {(["desc", "details", "reviews"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="px-8 py-4 text-[14px] font-bold transition-all relative" style={{ color: activeTab === tab ? theme.primary : "#9ca3af" }}>
                  {tab === "desc" ? "Description" : tab === "details" ? "Details" : "Reviews"}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: theme.primary }} />}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm min-h-[300px]">
              {activeTab === "desc" && <p className="text-gray-600 leading-relaxed">{product.description}</p>}
              {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50">
                      <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">{key}</span>
                      <span className="text-[14px] font-semibold text-gray-700">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {product.reviews.map((rev, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-bold text-gray-900">{rev.name}</p>
                        <Stars rating={rev.rating} size={14} />
                      </div>
                      <p className="text-[14px] text-gray-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {lightboxOpen && <ZoomLightbox images={product.images} activeIndex={activeImg} onClose={() => setLightboxOpen(false)} onChangeIndex={setActiveImg} theme={theme} />}
      </div>
    </FlexiLayout>
  );
}
