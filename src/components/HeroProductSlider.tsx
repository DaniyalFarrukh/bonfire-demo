"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Flame, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSlide {
  id: string;
  badge: string;
  stampPrice: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  image: string;
  ctaText: string;
  targetCategory: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "wood-fired-pizza",
    badge: "900°F STONE HEARTH",
    stampPrice: "FROM RS. 600",
    titlePrefix: "WOOD-FIRED AT 900°F.",
    titleHighlight: "BORN FROM THE EMBERS.",
    description:
      "Hand-stretched 48-hour fermented sourdough, blistered directly on refractory stone over seasoned hardwood, laden with whole-milk mozzarella.",
    image: "/images/hero-pizza-1.jpg",
    ctaText: "Order Wood-Fired Pizzas",
    targetCategory: "pizzas",
  },
  {
    id: "crispy-zinger",
    badge: "FRESH CRUNCH GUARANTEE",
    stampPrice: "ONLY RS. 450",
    titlePrefix: "CRUNCH WITH EVERY BITE.",
    titleHighlight: "CRISPY ZINGER DELUXE.",
    description:
      "Double-breaded boneless chicken thigh, crisp iceberg lettuce, and cracked pepper mayo in a warm butter-toasted brioche bun.",
    image: "/images/hero-burger.jpg",
    ctaText: "Order Zinger Burgers",
    targetCategory: "burgers",
  },
  {
    id: "sizzling-wings",
    badge: "FLAME-KISSED APPETIZERS",
    stampPrice: "10 PCS • RS. 800",
    titlePrefix: "SMOKY SIZZLERS.",
    titleHighlight: "OVEN WINGS & PLATTERS.",
    description:
      "Slow-baked chicken wings tossed in fiery cayenne or smoky hickory BBQ glaze, paired with house garlic mayo dip.",
    image: "/images/hero-wings.jpg",
    ctaText: "Order Wings & Sides",
    targetCategory: "sides",
  },
  {
    id: "fizzi-drinks",
    badge: "CHILLED REFRESHMENT",
    stampPrice: "FROM RS. 80",
    titlePrefix: "COOL DOWN THE HEAT.",
    titleHighlight: "FIZZI COOLERS & SODAS.",
    description:
      "Chilled fruit coolers, ice-cold soft drinks, and warm wood-fired desserts crafted to pair with every smoky slice.",
    image: "/images/hero-drinks.jpg",
    ctaText: "Browse Drinks & Dips",
    targetCategory: "drinks",
  },
];

interface HeroProductSliderProps {
  onCategorySelect?: (categoryId: string) => void;
}

export const HeroProductSlider: React.FC<HeroProductSliderProps> = ({
  onCategorySelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleCtaClick = (targetCat: string) => {
    if (onCategorySelect) {
      onCategorySelect(targetCat);
    } else {
      const el = document.getElementById(targetCat);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border-2 border-ink bg-ash-surface shadow-hard-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] sm:min-h-[440px]"
        >
          {/* Left Column: Tactile Print Editorial Copy on Solid Ash Surface */}
          <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center bg-ash-surface order-2 lg:order-1">
            <div className="space-y-4 max-w-xl">
              {/* Stamp Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-tint border-2 border-ink text-xs font-extrabold text-ink shadow-hard-sm">
                <Flame className="w-3.5 h-3.5 text-orange fill-orange" />
                <span className="font-mono tracking-wider uppercase">
                  {currentSlide.badge}
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="font-[family-name:var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl tracking-wider text-ink uppercase leading-[0.94]">
                {currentSlide.titlePrefix}{" "}
                <span className="block text-ink underline decoration-orange decoration-4 underline-offset-4 mt-1">
                  {currentSlide.titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base text-muted leading-relaxed font-medium">
                {currentSlide.description}
              </p>

              {/* CTA & Price Stamp */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleCtaClick(currentSlide.targetCategory)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[44px] rounded-lg bg-orange hover:bg-orange-hover text-ink font-extrabold text-xs sm:text-sm uppercase tracking-wider border-2 border-ink shadow-hard transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <span className="px-3.5 py-2 rounded-lg bg-ash-bg border-2 border-ink font-mono text-xs sm:text-sm font-extrabold text-ink">
                  {currentSlide.stampPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Warm Product Photography */}
          <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[300px] lg:min-h-full border-b-2 lg:border-b-0 lg:border-l-2 border-ink bg-ash-bg order-1 lg:order-2 overflow-hidden">
            <Image
              src={currentSlide.image}
              alt={currentSlide.titleHighlight}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center food-photo-warm"
            />
            {/* Solid Corner Stamp */}
            <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-md bg-orange text-ink border-2 border-ink shadow-hard-sm font-mono text-xs font-extrabold uppercase tracking-wider">
              Fresh Fired
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls Bar */}
      <div className="border-t-2 border-ink bg-ash-bg px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Pagination Indicators */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`min-h-[28px] px-2 flex items-center justify-center cursor-pointer transition-all ${
                index === currentIndex ? "scale-105" : "opacity-75 hover:opacity-100"
              }`}
            >
              <span
                className={`block h-2.5 border border-ink transition-all ${
                  index === currentIndex
                    ? "w-8 bg-orange"
                    : "w-2.5 bg-ash-surface"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Left / Right Hard-Shadow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-ash-surface hover:bg-orange text-ink border-2 border-ink shadow-hard-sm flex items-center justify-center transition-colors cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-ash-surface hover:bg-orange text-ink border-2 border-ink shadow-hard-sm flex items-center justify-center transition-colors cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
