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
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: "slide-woodfired",
    headline: "WOOD-FIRED PIZZAS",
    accentWord: "Stone Hearth",
    subtitle: "Blistered at 900°F over hardwood embers with 48-hr fermented sourdough.",
    badgeText: "20% OFF",
    badgeSub: "FLAME SPECIAL",
    targetId: "pizzas",
    image: "/images/hero-pizza-1.jpg",
    bgColor: "#140A04",
    glowColor: "rgba(239, 74, 34, 0.35)",
  },
  {
    id: "slide-deals",
    headline: "MONEY SAVING DEALS",
    accentWord: "Value Combos",
    subtitle: "Pizzas, zinger burgers, hot wings & drinks bundled together with big savings.",
    badgeText: "FROM RS. 1,200",
    badgeSub: "HOT COMBOS",
    targetId: "deals",
    image: "/images/menu/family-fun-deal.jpg",
    bgColor: "#120803",
    glowColor: "rgba(239, 74, 34, 0.3)",
  },
  {
    id: "slide-burgers-wings",
    headline: "SMASH BURGERS & WINGS",
    accentWord: "Crispy Sizzlers",
    subtitle: "Crispy fried boneless thigh zingers and saucy flaming buffalo wings.",
    badgeText: "HOT CRUNCH",
    badgeSub: "FRESHLY FRIED",
    targetId: "burgers",
    image: "/images/hero-wings.jpg",
    bgColor: "#170A03",
    glowColor: "rgba(239, 74, 34, 0.32)",
  },
  {
    id: "slide-free-delivery",
    headline: "FREE EXPRESS DELIVERY",
    accentWord: "Piping Hot",
    subtitle: "Fast doorstep delivery on all orders above Rs. 2,500 across DHA & Lahore.",
    badgeText: "FREE RS. 0",
    badgeSub: "EXPRESS DISPATCH",
    targetId: "deals",
    image: "/images/hero-pizza-3.jpg",
    bgColor: "#1A0903",
    glowColor: "rgba(239, 74, 34, 0.38)",
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
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
    touchStartX.current = null;
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 640;
      const navOffset = isDesktop ? 136 : 116;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const currentSlide = PROMO_SLIDES[currentIndex];

  return (
    <div
      className="relative w-full h-[165px] xs:h-[185px] sm:h-[250px] md:h-[320px] lg:h-[380px] overflow-hidden select-none bg-brand-black border-b border-brand-black/30"
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={() => scrollToSection(currentSlide.targetId)}
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden cursor-pointer"
          style={{
            backgroundColor: currentSlide.bgColor,
            backgroundImage: currentSlide.glowColor
              ? `radial-gradient(circle at 75% 50%, ${currentSlide.glowColor} 0%, transparent 70%)`
              : undefined,
          }}
        >
          {/* Daily Deli Co Style Landscape Food Banner */}
          <div className="w-full h-full max-w-[1240px] mx-auto px-4 xs:px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-3 sm:gap-6 relative z-10">
            {/* Left Column: Headlines & Callout */}
            <div className="flex-1 min-w-0 py-2 sm:py-4 space-y-1 xs:space-y-1.5 sm:space-y-3 text-white">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-[family-name:var(--font-brush)] text-base xs:text-xl sm:text-3xl md:text-4xl text-brand-orange leading-none">
                  {currentSlide.accentWord}
                </span>
                <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-[family-name:var(--font-chunky)] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/30 text-white/90 bg-black/40 shrink-0">
                  {currentSlide.badgeSub}
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-chunky)] text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight leading-tight text-white line-clamp-1 xs:line-clamp-none">
                {currentSlide.headline}
              </h2>

              <p className="text-[11px] sm:text-xs md:text-sm text-white/75 font-medium font-[family-name:var(--font-body)] line-clamp-1 sm:line-clamp-2 max-w-xs sm:max-w-md leading-relaxed hidden xs:block">
                {currentSlide.subtitle}
              </p>

              <div className="pt-0.5 sm:pt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-1 sm:py-2 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border border-brand-black/30 font-[family-name:var(--font-chunky)] text-[10px] sm:text-xs uppercase tracking-wide transition-all shadow-sm">
                  <span>Order Now</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-brand-orange hidden sm:inline">
                  {currentSlide.badgeText}
                </span>
              </div>
            </div>

            {/* Right Column: Hero Food Visual (Prominently displayed on BOTH mobile and desktop) */}
            <div className="relative shrink-0 flex items-center justify-center p-1 sm:p-2">
              {/* Badge sticker on desktop/tablet */}
              <div className="hidden sm:flex absolute -top-1 -right-1 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-orange text-brand-black border-2 border-brand-black shadow-hard flex-col items-center justify-center text-center -rotate-12 animate-pulse">
                <span className="font-[family-name:var(--font-chunky)] text-[10px] sm:text-xs font-black leading-tight uppercase">
                  {currentSlide.badgeText}
                </span>
              </div>

              {/* Crisp Food Photo Tile */}
              <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-2xl overflow-hidden border-2 border-brand-black/40 shadow-md bg-card-white/10 backdrop-blur-xs">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.headline}
                  fill
                  sizes="(max-width: 640px) 130px, (max-width: 768px) 200px, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Desktop/Tablet Arrow Paddles (Hidden on mobile to avoid screen clutter, touch swipeable instead) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-16 rounded-r-xl bg-brand-orange/90 hover:bg-brand-orange text-brand-black items-center justify-center cursor-pointer shadow-md transition-all active:scale-95 border-y border-r border-brand-black"
      >
        <ChevronLeft className="w-5 h-5 stroke-[3]" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next slide"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-16 rounded-l-xl bg-brand-orange/90 hover:bg-brand-orange text-brand-black items-center justify-center cursor-pointer shadow-md transition-all active:scale-95 border-y border-l border-brand-black"
      >
        <ChevronRight className="w-5 h-5 stroke-[3]" />
      </button>

      {/* Sleek Minimal Indicator Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
        {PROMO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`pointer-events-auto transition-all rounded-full cursor-pointer ${
              currentIndex === idx
                ? "w-5 h-1.5 bg-brand-orange shadow-xs"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
