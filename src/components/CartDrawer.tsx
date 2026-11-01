"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { RESTAURANT_CONFIG, formatPrice } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    promoCode,
    promoDiscountPercent,
    applyPromoCode,
    removePromoCode,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    grandTotal,
    totalItemCount,
  } = useCartStore();

  const [promoInput, setPromoInput] = React.useState("");
  const [promoMessage, setPromoMessage] = React.useState<string | null>(null);

  const count = totalItemCount();
  const currentSubtotal = subtotal();
  const currentDiscount = discount();
  const currentDelivery = deliveryFee();
  const currentGrandTotal = grandTotal();

  const freeDeliveryRemaining = Math.max(
    0,
    RESTAURANT_CONFIG.delivery.freeDeliveryThreshold - currentSubtotal
  );
  const freeDeliveryPercent = Math.min(
    100,
    (currentSubtotal / RESTAURANT_CONFIG.delivery.freeDeliveryThreshold) * 100
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage(res.message);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end">
          {/* Dim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-black/70 cursor-pointer"
          />

          {/* Drawer (bottom sheet on mobile, right slide-over on desktop) */}
          <motion.aside
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%", x: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative w-full sm:max-w-md h-[90vh] sm:h-full bg-cream-bg border-t-2 sm:border-t-0 sm:border-l-2 border-brand-black rounded-t-3xl sm:rounded-none flex flex-col z-10 text-brand-black overflow-hidden shadow-hard-lg"
          >
            {/* Mobile handle */}
            <div className="w-12 h-1.5 bg-brand-black/20 rounded-full mx-auto mt-2 sm:hidden shrink-0" />

            {/* Drawer Header */}
            <div className="shrink-0 p-4 sm:p-5 bg-cream-alt border-b-2 border-brand-black flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange border-2 border-brand-black flex items-center justify-center text-brand-black shadow-hard-sm">
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-chunky)] text-xl sm:text-2xl text-brand-black tracking-wide leading-none uppercase">
                    YOUR ORDER
                  </h3>
                  <p className="text-xs font-semibold text-text-muted mt-1 font-[family-name:var(--font-body)]">
                    {count} {count === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    title="Clear Cart"
                    className="px-3 py-1.5 rounded-full border border-brand-black bg-card-white hover:bg-cream-alt text-xs font-bold text-brand-black transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-card-white border-2 border-brand-black shadow-hard-sm text-brand-black hover:bg-brand-orange transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Free Delivery Bar */}
            {items.length > 0 && (
              <div className="shrink-0 bg-brand-orange border-b-2 border-brand-black px-4 py-2.5 text-xs text-brand-black font-bold">
                {freeDeliveryRemaining > 0 ? (
                  <div className="space-y-1">
                    <p className="flex items-center justify-between">
                      <span>
                        Add{" "}
                        <strong className="underline decoration-brand-black">
                          {formatPrice(freeDeliveryRemaining)}
                        </strong>{" "}
                        for Free Delivery
                      </span>
                      <span>{Math.round(freeDeliveryPercent)}%</span>
                    </p>
                    <div className="w-full h-2 rounded-full bg-cream-bg border border-brand-black overflow-hidden">
                      <div
                        className="h-full bg-brand-black transition-all duration-300"
                        style={{ width: `${freeDeliveryPercent}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 font-[family-name:var(--font-chunky)] uppercase">
                    <Sparkles className="w-4 h-4 text-brand-black" />
                    <span>Unlocked FREE Express Delivery!</span>
                  </div>
                )}
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-cream-alt border-2 border-brand-black shadow-hard flex items-center justify-center text-brand-black">
                    <ShoppingBag className="w-8 h-8 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-chunky)] text-xl text-brand-black tracking-wide uppercase">
                      YOUR CART IS EMPTY
                    </h4>
                    <p className="text-xs text-text-muted mt-1 max-w-xs font-medium font-[family-name:var(--font-body)]">
                      Pick some wood-fired pizzas, smash burgers, or crispy wings from the menu!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                items.map((cartItem) => (
                  <div
                    key={cartItem.cartItemId}
                    className="p-3.5 rounded-2xl bg-card-white border-2 border-brand-black shadow-hard-sm space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      {/* Food Photo Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-cream-alt border border-brand-black/20 flex items-center justify-center">
                        {cartItem.menuItem.image ? (
                          <Image
                            src={cartItem.menuItem.image}
                            alt={cartItem.menuItem.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <ShoppingBag className="w-6 h-6 stroke-[2] text-brand-orange" />
                        )}
                      </div>

                      {/* Item Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="font-[family-name:var(--font-chunky)] text-sm text-brand-black leading-tight uppercase truncate">
                            {cartItem.menuItem.name}
                          </h4>
                          <span className="font-[family-name:var(--font-chunky)] text-sm text-brand-black shrink-0">
                            {formatPrice(cartItem.totalPrice)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {cartItem.size && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-orange text-brand-black border border-brand-black">
                              Size {cartItem.size}
                            </span>
                          )}
                          {cartItem.crustName && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream-alt text-brand-black border border-brand-black">
                              {cartItem.crustName}
                            </span>
                          )}
                          {cartItem.toppings.map((t) => (
                            <span
                              key={t.id}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream-bg text-brand-black border border-brand-black"
                            >
                              +{t.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(cartItem.cartItemId)}
                        aria-label="Remove item"
                        className="text-text-muted hover:text-brand-orange p-1 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2 border-t border-cream-alt">
                      <span className="text-[11px] font-semibold text-text-muted">
                        {formatPrice(cartItem.unitPrice)} each
                      </span>
                      <div className="flex items-center border border-brand-black rounded-full bg-cream-bg p-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(cartItem.cartItemId, -1)
                          }
                          aria-label="Decrease quantity"
                          className="w-7 h-7 min-w-[28px] min-h-[28px] flex items-center justify-center rounded-full text-brand-black hover:bg-brand-orange transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3 stroke-[2.5]" />
                        </button>
                        <span className="w-6 text-center font-[family-name:var(--font-chunky)] text-xs text-brand-black">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 min-w-[28px] min-h-[28px] flex items-center justify-center rounded-full text-brand-black hover:bg-brand-orange transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Calculation & Checkout CTA */}
            {items.length > 0 && (
              <div className="shrink-0 p-4 sm:p-5 bg-cream-alt border-t-2 border-brand-black space-y-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                {/* Promo Field */}
                <div className="space-y-1">
                  {promoDiscountPercent > 0 ? (
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-brand-orange border border-brand-black text-xs font-bold text-brand-black">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        {promoCode} (10% OFF APPLIED)
                      </span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="underline font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (BONFIRE10)"
                          className="w-full pl-8 pr-3 py-1.5 rounded-full bg-card-white border border-brand-black text-xs font-bold uppercase placeholder:normal-case placeholder:font-normal outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border border-brand-black font-[family-name:var(--font-chunky)] text-xs uppercase"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoMessage && (
                    <p className="text-[10px] font-bold text-brand-black">
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Subtotal Breakdown */}
                <div className="space-y-1 text-xs border-t border-brand-black/15 pt-2 font-medium">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <span className="font-bold text-brand-black">
                      {formatPrice(currentSubtotal)}
                    </span>
                  </div>
                  {currentDiscount > 0 && (
                    <div className="flex justify-between text-brand-black font-bold">
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(currentDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-text-muted">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-brand-black">
                      {currentDelivery === 0 ? "FREE" : formatPrice(currentDelivery)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-brand-black pt-1.5 border-t border-brand-black">
                    <span className="font-[family-name:var(--font-chunky)] uppercase">
                      Total
                    </span>
                    <span className="font-[family-name:var(--font-chunky)] text-base text-brand-black">
                      {formatPrice(currentGrandTotal)}
                    </span>
                  </div>
                </div>

                {/* Orange Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black font-[family-name:var(--font-chunky)] text-sm uppercase tracking-wider border-2 border-brand-black shadow-hard transition-all cursor-pointer text-center active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
