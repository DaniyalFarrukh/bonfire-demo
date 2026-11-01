"use client";

import React, { useRef, useEffect } from "react";
import { Flame, ChevronRight } from "lucide-react";
import { MENU_SECTIONS } from "@/data/sections";

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const btn = buttonRefs.current[activeCategory];
    const container = containerRef.current;
    if (btn && container) {
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScrollLeft = btnLeft - containerWidth / 2 + btnWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-[72px] sm:top-[84px] z-30 w-full bg-brand-black border-b border-brand-black shadow-md">
      <div className="relative max-w-[1200px] mx-auto px-3 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar touch-scroll scroll-smooth py-1 pr-12 sm:pr-8"
          role="tablist"
          aria-label="Menu Sections"
        >
          {MENU_SECTIONS.map((sec) => {
            const isActive = activeCategory === sec.id;
            return (
              <button
                key={sec.id}
                ref={(el) => {
                  buttonRefs.current[sec.id] = el;
                }}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onSelectCategory(sec.id)}
                className={`shrink-0 relative py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <Flame className="w-3.5 h-3.5 text-brand-orange fill-brand-orange shrink-0 animate-pulse" />
                )}
                <span>{sec.title}</span>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-2 h-1 bg-brand-orange rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Edge Fade Hint */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-brand-black via-brand-black/80 to-transparent flex items-center justify-end pr-2 text-white/50">
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};

