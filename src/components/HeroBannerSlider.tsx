"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromoSlide {
  id: string;
  headline: string;
  accentWord: string;
  subtitle: string;
  badgeText: string;
  badgeSub: string;
  targetId: string;
  image: string;
  bgColor: string;
  glowColor?: string;
  textColor?: string;
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: "slide-woodfired",
    headline: "WOOD-FIRED PIZZAS",
    accentWord: "Stone Fired",
    subtitle: "Blistered at 900°F over hardwood embers with 48-hour fermented sourdough.",
    badgeText: "20% OFF",
    badgeSub: "FLAME SPECIAL",
    targetId: "pizzas",
    image: "/images/hero-pizza-1.jpg",
    bgColor: "#220F06",
    glowColor: "rgba(239, 74, 34, 0.28)",
  },
  {
    id: "slide-deals",
    headline: "MONEY SAVING DEALS",
    accentWord: "Value Feasts",
    subtitle: "Pizzas, zinger burgers, hot wings & 1.5L drinks bundled together with big savings.",
    badgeText: "FROM RS. 1,200",
    badgeSub: "HOT COMBOS",
    targetId: "deals",
    image: "/images/menu/family-fun-deal.jpg",
    bgColor: "#190D06",
    glowColor: "rgba(239, 74, 34, 0.25)",
  },
  {
    id: "slide-free-delivery",
    headline: "FREE EXPRESS DELIVERY",
    accentWord: "Fast",
    subtitle: "Piping hot delivery on all orders above Rs. 2,500 across DHA & Lahore.",
    badgeText: "FREE",
    badgeSub: "RS. 0 DELIVERY",
    targetId: "deals",
    image: "/images/hero-wings.jpg",
    bgColor: "#EF4A22",
    glowColor: "rgba(255, 255, 255, 0.2)",
    textColor: "#141414",
  },
  {
    id: "slide-midnight",
    headline: "MIDNIGHT DEALS",
    accentWord: "Cravings",
    subtitle: "Late-night hunger conquered. Roaring ovens and hot delivery till 2:00 AM.",
    badgeText: "FROM RS. 990",
    badgeSub: "NIGHT SIZZLERS",
    targetId: "deals",
    image: "/images/hero-pizza-3.jpg",
    bgColor: "#141210",
    glowColor: "rgba(239, 74, 34, 0.22)",
  },
];

export const HeroBannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartX.current = null;
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 135;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const currentSlide = PROMO_SLIDES[currentIndex];
  const isLightSlide = currentSlide.textColor === "#141414";

  return (
    <div
      className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] overflow-hidden select-none bg-brand-black border-b-2 border-brand-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: currentSlide.bgColor,
            backgroundImage: currentSlide.glowColor
              ? `radial-gradient(circle at 75% 50%, ${currentSlide.glowColor} 0%, transparent 65%)`
              : undefined,
          }}
        >
          {/* Designed Full Bleed Banner Content (stretches to both extents) */}
          <div className="w-full h-full max-w-[1240px] mx-auto px-9 sm:px-16 lg:px-20 flex items-center justify-between gap-6 relative z-10">
            {/* Left Column: Headlines & CTA */}
            <div
              className={`max-w-xl space-y-2 sm:space-y-4 ${
                isLightSlide ? "text-brand-black" : "text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-[family-name:var(--font-brush)] text-2xl sm:text-4xl md:text-5xl normal-case ${
                    isLightSlide ? "text-brand-black" : "text-brand-orange"
                  }`}
                >
                  {currentSlide.accentWord}
                </span>
                <span
                  className={`text-[10px] sm:text-[11px] font-[family-name:var(--font-chunky)] uppercase tracking-wider px-2.5 sm:px-3 py-0.5 rounded-full border ${
                    isLightSlide
                      ? "border-brand-black text-brand-black bg-card-white"
                      : "border-white/40 text-white bg-black/40"
                  }`}
                >
                  Featured Special
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-chunky)] text-xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.96]">
                {currentSlide.headline}
              </h2>

              <p
                className={`text-xs sm:text-sm md:text-base font-medium max-w-md leading-relaxed font-[family-name:var(--font-body)] line-clamp-2 sm:line-clamp-none ${
                  isLightSlide ? "text-brand-black/85" : "text-white/80"
                }`}
              >
                {currentSlide.subtitle}
              </p>

              <div className="pt-0.5 sm:pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection(currentSlide.targetId)}
                  className="inline-flex items-center gap-2 px-5 sm:px-8 py-2 sm:py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm font-[family-name:var(--font-chunky)] text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Right Column: Featured Visual & Price Sticker (Tablet/Desktop) */}
            <div className="hidden sm:flex relative shrink-0 items-center justify-center p-2 sm:p-4">
              {/* Round Price Badge */}
              <div className="absolute top-2 right-0 sm:top-6 sm:right-2 z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-orange text-brand-black border-2 border-brand-black shadow-hard flex flex-col items-center justify-center text-center -rotate-12 animate-pulse">
                <span className="font-[family-name:var(--font-chunky)] text-xs sm:text-sm font-black leading-tight uppercase">
                  {currentSlide.badgeText}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mt-0.5">
                  {currentSlide.badgeSub}
                </span>
              </div>

              <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-76 md:h-76 lg:w-84 lg:h-84 rounded-2xl overflow-hidden border-2 border-brand-black shadow-hard bg-card-white">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.headline}
                  fill
                  sizes="(max-width: 768px) 240px, 360px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Edge Flush Arrow Button */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 sm:w-11 h-12 sm:h-20 rounded-r-xl bg-brand-orange hover:bg-brand-orange-hover text-brand-black flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95 border-y-2 border-r-2 border-brand-black"
      >
        <ChevronLeft className="w-4 sm:w-7 h-4 sm:h-7 stroke-[3]" />
      </button>

      {/* Right Edge Flush Arrow Button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 sm:w-11 h-12 sm:h-20 rounded-l-xl bg-brand-orange hover:bg-brand-orange-hover text-brand-black flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95 border-y-2 border-l-2 border-brand-black"
      >
        <ChevronRight className="w-4 sm:w-7 h-4 sm:h-7 stroke-[3]" />
      </button>

      {/* Bottom Indicator Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {PROMO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all rounded-full border border-brand-black cursor-pointer ${
              currentIndex === idx
                ? "w-8 h-2.5 bg-brand-orange"
                : "w-2.5 h-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
