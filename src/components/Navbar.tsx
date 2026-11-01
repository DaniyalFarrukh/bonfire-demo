"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ChevronDown, MapPin, User, Search, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useSearchStore } from "@/lib/search-store";
import { DeliveryModal } from "./DeliveryModal";
import { NavbarSearch } from "./NavbarSearch";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Keep the mobile search row open when arriving home with an active search
  const [mobileSearchOpen, setMobileSearchOpen] = useState(
    () => isHome && useSearchStore.getState().query.trim().length > 0
  );
  const clearQuery = useSearchStore((state) => state.clearQuery);

  // Results only show on the home page, so don't carry a search to other pages
  useEffect(() => {
    if (!isHome) clearQuery();
  }, [isHome, clearQuery]);

  const closeMobileSearch = () => {
    clearQuery();
    setMobileSearchOpen(false);
  };

  const {
    openCart,
    hasHydrated,
    totalItemCount,
    deliveryArea,
    orderType,
  } = useCartStore();

  const count = hasHydrated ? totalItemCount() : 0;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cream-bg border-b border-brand-black/20 shadow-xs">
        {/* Responsive Single Row with clean spacing and prominent logo */}
        <div className="max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 h-[64px] sm:h-[76px] flex items-center justify-between gap-2 sm:gap-3">
          {/* Left: Prominent Logo & Location Selector */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
            {/* Pure, Transparent Bonfire Flame Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0 group py-0.5"
              aria-label="Bonfire Pizza Kitchen - Return to Home"
            >
              <Image
                src="/logo.png"
                alt="Bonfire Pizza Kitchen"
                width={74}
                height={74}
                className="h-11 w-auto sm:h-14 sm:w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                priority
              />
            </Link>

            {/* Delivery / Takeaway Location Selector Pill */}
            <button
              type="button"
              onClick={() => setDeliveryModalOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-card-white hover:bg-cream-alt border border-brand-black/30 shadow-xs transition-colors text-left cursor-pointer min-w-0 max-w-[175px] xs:max-w-[210px] sm:max-w-none"
              aria-label="Change delivery location"
            >
              <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-brand-orange text-brand-black flex items-center justify-center shrink-0">
                <MapPin className="w-3 h-3 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-[9px] sm:text-[10px] font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black">
                    {orderType === "takeaway" ? "Takeaway" : "Delivery to"}
                  </span>
                  <ChevronDown className="w-2.5 h-2.5 text-brand-orange stroke-[3]" />
                </div>
                <p className="text-[11px] sm:text-xs font-bold text-brand-black truncate max-w-[100px] xs:max-w-[140px] sm:max-w-[210px] mt-0.5">
                  {orderType === "takeaway"
                    ? "DHA Phase 6 Kitchen"
                    : deliveryArea || "DHA Phase 6, Lahore"}
                  <span className="text-[11px] font-medium text-text-muted hidden sm:inline">
                    {" "}
                    • {orderType === "takeaway" ? "15-20 min" : "eta 45 mins"}
                  </span>
                </p>
              </div>
            </button>
          </div>

          {/* Center: Search bar (desktop) */}
          <NavbarSearch className="hidden lg:block flex-1 max-w-[420px]" />

          {/* Right: Search Icon (mobile), Sign In Outlined Pill & Orange Square Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Search the menu"
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-card-white hover:bg-cream-alt text-brand-black border-2 border-brand-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Outlined Sign In / Register Pill (UI Only) */}
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[38px] rounded-full border border-brand-black bg-transparent hover:bg-cream-alt text-brand-black text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Sign In / Register</span>
            </button>

            {/* Cart Button: Orange Rounded Square with bag icon & count badge */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`View Cart, ${count} items`}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm flex items-center justify-center transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.5] text-brand-black" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-brand-black text-cream-bg font-extrabold text-[10px] min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center border-2 border-card-white font-[family-name:var(--font-body)] shadow-sm"
                >
                  {count}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search row: covers the navbar row so nothing below shifts */}
        {mobileSearchOpen && (
          <div className="lg:hidden absolute inset-0 bg-cream-bg flex items-center gap-2 px-3 sm:px-6">
            <NavbarSearch autoFocus onClose={closeMobileSearch} className="flex-1" />
            <button
              type="button"
              onClick={closeMobileSearch}
              aria-label="Close search"
              className="w-10 h-10 shrink-0 rounded-xl bg-card-white hover:bg-cream-alt text-brand-black border-2 border-brand-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}
      </header>

      {/* Delivery / Takeaway Location Modal */}
      <DeliveryModal
        isOpen={deliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
      />

      {/* Simple UI-only Sign In Modal */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-brand-black/60 cursor-pointer"
              onClick={() => setAuthModalOpen(false)}
            />
            <div className="relative w-full max-w-sm bg-card-white border-2 border-brand-black rounded-3xl p-6 shadow-hard z-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-orange border-2 border-brand-black flex items-center justify-center mx-auto text-brand-black">
                <User className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black uppercase">
                Welcome to Bonfire
              </h3>
              <p className="text-xs text-text-muted">
                Order fast as guest or save your favorite DHA addresses for quick re-ordering.
              </p>
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="w-full py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider border-2 border-brand-black shadow-hard-sm cursor-pointer"
                >
                  Continue as Guest
                </button>
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="w-full py-3 rounded-full bg-card-white hover:bg-cream-alt text-brand-black font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider border-2 border-brand-black cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
