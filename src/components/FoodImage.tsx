"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MenuCategoryType } from "@/data/menu";

interface FoodImageProps {
  src?: string;
  alt: string;
  category?: MenuCategoryType;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
  priority?: boolean;
}

export const FoodImage: React.FC<FoodImageProps> = ({
  src,
  alt,
  category = "pizzas",
  className = "",
  aspectRatio = "video",
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "wide"
      ? "aspect-[21/9]"
      : "aspect-[16/10]";

  const renderCategoryGraphic = () => {
    switch (category) {
      case "pizzas":
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-24 h-24 text-brand-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M80 20 L135 125 A65 65 0 0 1 25 125 Z"
              className="fill-brand-orange stroke-brand-black"
            />
            <circle cx="80" cy="65" r="8" className="fill-card-white stroke-brand-black" />
            <circle cx="62" cy="100" r="7" className="fill-card-white stroke-brand-black" />
            <circle cx="98" cy="102" r="7" className="fill-card-white stroke-brand-black" />
          </svg>
        );

      case "burgers":
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-24 h-24 text-brand-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M40 70 C 40 40, 120 40, 120 70 Z"
              className="fill-brand-orange stroke-brand-black"
            />
            <rect
              x="36"
              y="75"
              width="88"
              height="14"
              rx="7"
              className="fill-brand-black stroke-brand-black"
            />
            <rect
              x="42"
              y="94"
              width="76"
              height="16"
              rx="6"
              className="fill-brand-orange stroke-brand-black"
            />
          </svg>
        );

      case "sides":
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-24 h-24 text-brand-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <ellipse
              cx="80"
              cy="95"
              rx="55"
              ry="24"
              className="fill-brand-orange stroke-brand-black"
            />
            <circle cx="80" cy="75" r="10" className="fill-card-white stroke-brand-black" />
            <circle cx="55" cy="85" r="8" className="fill-card-white stroke-brand-black" />
            <circle cx="105" cy="85" r="8" className="fill-card-white stroke-brand-black" />
          </svg>
        );

      case "pasta":
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-24 h-24 text-brand-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <ellipse
              cx="80"
              cy="90"
              rx="50"
              ry="20"
              className="fill-brand-orange stroke-brand-black"
            />
            <path d="M50 85 Q 80 60 110 85" className="stroke-card-white" strokeWidth="5" />
          </svg>
        );

      case "drinks":
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-24 h-24 text-brand-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <path
              d="M55 45 L65 125 L95 125 L105 45 Z"
              className="fill-brand-orange stroke-brand-black"
            />
            <line
              x1="85"
              y1="20"
              x2="75"
              y2="70"
              className="stroke-card-white"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        );

      default:
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-24 h-24 text-brand-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <circle
              cx="80"
              cy="80"
              r="50"
              className="fill-brand-orange stroke-brand-black"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden bg-cream-alt flex items-center justify-center select-none ${className}`}
    >
      {src && !imageError ? (
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            priority={priority}
          />
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center bg-cream-alt w-full h-full">
          <div className="p-2 rounded-2xl bg-card-white border-2 border-brand-black shadow-hard-sm">
            {renderCategoryGraphic()}
          </div>
          <span className="mt-2.5 px-3 py-1 rounded-full bg-brand-orange border-2 border-brand-black text-[11px] font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black">
            {category.toUpperCase()} • 900°F
          </span>
        </div>
      )}
    </div>
  );
};
