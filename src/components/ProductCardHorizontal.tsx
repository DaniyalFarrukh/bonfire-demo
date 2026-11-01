"use client";

import React from "react";
import Image from "next/image";
import { Heart, Plus, SlidersHorizontal } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/config";
import { useCartStore } from "@/lib/cart-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import { FoodImage } from "./FoodImage";

interface ProductCardHorizontalProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({
  item,
  onSelect,
}) => {
  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorited = isFavorite(item.id);

  const hasMultipleSizes = item.category === "pizzas" && item.sizePrices;
  const isCustomizable =
    Boolean(hasMultipleSizes) ||
    Boolean(item.customizableCrust);

  const startingPrice = hasMultipleSizes
    ? Math.min(...Object.values(item.sizePrices!))
    : item.basePrice;

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCustomizable) {
      onSelect(item);
    } else {
      // Direct add to cart
      addItem(item, {}, 1);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <article
      onClick={() => onSelect(item)}
      className="group relative flex gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-card-white border border-brand-black/15 hover:border-brand-black/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden min-h-[148px]"
    >
      {/* Left Column: Food Image on a Pale Tile */}
      <div className="relative w-24 sm:w-28 h-24 sm:h-28 aspect-square rounded-xl overflow-hidden shrink-0 bg-cream-alt border border-brand-black/10 flex items-center justify-center p-1">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
            className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <FoodImage
            src={item.image}
            alt={item.name}
            category={item.category}
            aspectRatio="square"
          />
        )}
      </div>

      {/* Right Column: Details, Price, Buttons */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Item Name (max 2 lines, clean without tags) */}
          <h4 className="font-[family-name:var(--font-chunky)] text-sm sm:text-base text-brand-black uppercase leading-tight line-clamp-2 group-hover:text-brand-orange transition-colors">
            {item.name}
          </h4>

          {/* Item Description (1-2 lines) */}
          <p className="text-xs text-text-muted font-medium font-[family-name:var(--font-body)] line-clamp-1 sm:line-clamp-2 mt-1 leading-snug">
            {item.description}
          </p>
        </div>

        {/* Bottom Bar: Black Price Pill + Orange Button + Heart Icon */}
        <div className="pt-2 sm:pt-2.5 flex items-center justify-between gap-1.5">
          {/* Black Price Pill */}
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-brand-black text-white text-[11px] sm:text-xs font-[family-name:var(--font-chunky)] tracking-wide whitespace-nowrap shrink-0">
            {formatPrice(startingPrice)}
          </span>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Orange Button (Customize or Add) */}
            <button
              type="button"
              onClick={handleActionClick}
              className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 min-h-[32px] sm:min-h-[34px] rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-brand-black border border-brand-black/20 font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wide transition-transform active:scale-95 cursor-pointer shadow-sm whitespace-nowrap shrink-0"
            >
              {isCustomizable ? (
                <>
                  <SlidersHorizontal className="w-3 h-3 stroke-[2.5]" />
                  <span>Customize</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add</span>
                </>
              )}
            </button>

            {/* Small Heart Icon */}
            <button
              type="button"
              onClick={handleHeartClick}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              className="p-1 text-text-muted hover:text-brand-orange transition-colors cursor-pointer shrink-0"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  favorited
                    ? "fill-brand-orange text-brand-orange"
                    : "text-text-muted hover:text-brand-orange"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

