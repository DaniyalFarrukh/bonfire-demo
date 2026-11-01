"use client";

import React from "react";
import { MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/config";
import { FoodImage } from "./FoodImage";
import { Plus, SlidersHorizontal } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => {
  const hasMultipleSizes = item.category === "pizzas" && item.sizePrices;
  const startingPrice = hasMultipleSizes
    ? Math.min(...Object.values(item.sizePrices!))
    : item.basePrice;

  return (
    <article
      onClick={() => onSelect(item)}
      className="group relative flex flex-col justify-between rounded-2xl bg-card-white border-2 border-brand-black shadow-hard hover:-translate-y-1 hover:shadow-hard-lg transition-all duration-150 overflow-hidden cursor-pointer"
    >
      {/* Top Image area framed like a sticker with thick border */}
      <div className="relative overflow-hidden border-b-2 border-brand-black bg-cream-alt">
        <FoodImage
          src={item.image}
          alt={item.name}
          category={item.category}
          aspectRatio="video"
          className="group-hover:scale-104 transition-transform duration-300 ease-out"
        />

        {item.portion && (
          <div className="absolute bottom-2.5 right-3 z-10">
            <span className="px-2 py-0.5 rounded-md bg-card-white text-brand-black border-2 border-brand-black text-[11px] font-bold font-[family-name:var(--font-body)] shadow-hard-sm">
              {item.portion}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-card-white">
        <div className="space-y-1">
          <h3 className="font-[family-name:var(--font-chunky)] text-xl text-brand-black tracking-wide leading-tight group-hover:text-brand-orange transition-colors line-clamp-1 uppercase">
            {item.name}
          </h3>
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed font-medium font-[family-name:var(--font-body)]">
            {item.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t-2 border-cream-alt flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block leading-none font-[family-name:var(--font-body)]">
              {hasMultipleSizes ? "From" : "Price"}
            </span>
            <span className="inline-block mt-0.5 font-[family-name:var(--font-chunky)] text-lg sm:text-xl text-brand-black">
              {formatPrice(startingPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[44px] rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            {hasMultipleSizes || item.customizableCrust ? (
              <>
                <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Customize</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
