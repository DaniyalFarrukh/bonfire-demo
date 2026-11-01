"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export const MobileCartBar: React.FC = () => {
  const { totalItemCount, subtotal, openCart, hasHydrated } = useCartStore();

  const count = hasHydrated ? totalItemCount() : 0;
  const currentSubtotal = hasHydrated ? subtotal() : 0;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] inset-x-3 sm:inset-x-4 z-30 md:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            aria-label={`View Cart, ${count} items for ${formatPrice(currentSubtotal)}`}
            className="w-full min-h-[52px] flex items-center justify-between p-3 px-5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-black text-white flex items-center justify-center font-[family-name:var(--font-chunky)] text-xs">
                {count}
              </div>
              <span className="font-[family-name:var(--font-chunky)] text-sm uppercase tracking-wide text-brand-black">
                View Cart • {count} {count === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-chunky)] text-sm text-brand-black">
                {formatPrice(currentSubtotal)}
              </span>
              <ArrowRight className="w-4 h-4 text-brand-black stroke-[3]" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
