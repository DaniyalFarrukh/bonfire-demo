"use client";

import React from "react";
import Image from "next/image";
import { MenuSection } from "@/data/sections";

interface CategoryBannerProps {
  section: MenuSection;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({ section }) => {
  const isLight = section.bgColor === "#EF4A22";

  return (
    <div
      style={{ backgroundColor: section.bgColor }}
      className={`relative w-full rounded-2xl overflow-hidden border-2 border-brand-black shadow-hard-sm mb-6 sm:mb-8 min-h-[140px] sm:min-h-[170px] flex items-center justify-between p-4 sm:p-7 ${
        isLight ? "text-brand-black" : "text-white"
      }`}
    >
      {/* Left Column: Headlines & Copy */}
      <div className="space-y-1.5 sm:space-y-2 z-10 max-w-lg">
        <div className="flex items-center gap-2">
          <span
            className={`font-[family-name:var(--font-brush)] text-2xl sm:text-3xl normal-case ${
              isLight ? "text-brand-black" : "text-brand-orange"
            }`}
          >
            {section.accentWord}
          </span>
          <span
            className={`text-[10px] font-[family-name:var(--font-chunky)] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              isLight
                ? "border-brand-black text-brand-black bg-card-white"
                : "border-white/30 text-white/90 bg-black/40"
            }`}
          >
            {section.badge}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-chunky)] text-2xl sm:text-4xl uppercase tracking-tight leading-none">
          {section.title}
        </h3>

        <p
          className={`text-xs sm:text-sm font-medium font-[family-name:var(--font-body)] max-w-sm line-clamp-2 ${
            isLight ? "text-brand-black/85" : "text-white/80"
          }`}
        >
          {section.subtitle}
        </p>
      </div>

      {/* Right Column: Featured Visual */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border-2 border-brand-black shadow-hard-sm bg-cream-bg shrink-0 ml-3 flex items-center justify-center p-1">
        <Image
          src={section.bannerImage}
          alt={section.title}
          fill
          sizes="(max-width: 768px) 120px, 180px"
          className="object-contain p-1"
        />
      </div>
    </div>
  );
};

