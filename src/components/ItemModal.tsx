"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Minus,
  Check,
  ShoppingBag,
} from "lucide-react";
import {
  MenuItem,
  PizzaSize,
  CRUST_OPTIONS,
  EXTRA_TOPPINGS,
  CrustOption,
  ToppingOption,
} from "@/data/menu";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/config";
import { FoodImage } from "./FoodImage";
import { motion, AnimatePresence } from "framer-motion";

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ItemModalDialogProps {
  item: MenuItem;
  onClose: () => void;
}

const ItemModalDialog: React.FC<ItemModalDialogProps> = ({ item, onClose }) => {
  const { addItem } = useCartStore();

  const isPizza = item.category === "pizzas";
  const defaultSize: PizzaSize =
    isPizza && item.sizePrices
      ? Object.keys(item.sizePrices).includes("M")
        ? "M"
        : (Object.keys(item.sizePrices)[0] as PizzaSize)
      : "M";

  const [selectedSize, setSelectedSize] = useState<PizzaSize>(defaultSize);
  const [selectedCrust, setSelectedCrust] = useState<CrustOption>(
    CRUST_OPTIONS[0]
  );
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const baseSizePrice =
    isPizza && item.sizePrices && item.sizePrices[selectedSize]
      ? item.sizePrices[selectedSize]!
      : item.basePrice;

  const crustDelta =
    isPizza && item.customizableCrust ? selectedCrust.priceDelta : 0;
  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = baseSizePrice + crustDelta + toppingsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (topping: ToppingOption) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    addItem(
      item,
      {
        size: isPizza ? selectedSize : undefined,
        crust: isPizza && item.customizableCrust ? selectedCrust : undefined,
        toppings: selectedToppings,
        specialInstructions,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-black/70 cursor-pointer"
      />

      {/* Modal Dialog (Bottom sheet on mobile, centered modal on desktop) */}
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="relative w-full max-w-xl max-h-[88vh] flex flex-col bg-card-white border-2 border-brand-black rounded-t-3xl sm:rounded-3xl shadow-hard-lg overflow-hidden z-10 text-brand-black"
      >
        {/* Mobile Pull Indicator */}
        <div className="w-12 h-1.5 bg-brand-black/20 rounded-full mx-auto mt-2 sm:hidden shrink-0" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 z-20 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-cream-bg hover:bg-brand-orange text-brand-black border-2 border-brand-black shadow-hard-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Header & Image */}
        <div className="relative shrink-0 border-b-2 border-brand-black bg-cream-alt">
          <FoodImage
            src={item.image}
            alt={item.name}
            category={item.category}
            aspectRatio="wide"
          />
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-[family-name:var(--font-chunky)] text-xl sm:text-2xl text-brand-black tracking-wide leading-tight uppercase">
                {item.name}
              </h3>
              <span className="px-3 py-1 rounded-full bg-brand-black text-white text-base font-[family-name:var(--font-chunky)] whitespace-nowrap shadow-sm">
                {formatPrice(unitPrice)}
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-text-muted leading-relaxed font-medium font-[family-name:var(--font-body)]">
              {item.description}
            </p>
            {item.portion && (
              <p className="mt-2 inline-block px-2.5 py-0.5 bg-cream-alt border border-brand-black rounded-full text-xs font-bold text-brand-black">
                Portion: {item.portion}
              </p>
            )}
          </div>

          {/* Pizza Size Selection */}
          {isPizza && item.sizePrices && (
            <div className="space-y-3 pt-4 border-t-2 border-cream-alt">
              <div className="flex items-center justify-between">
                <span className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black">
                  Choose Size <span className="text-brand-orange">*</span>
                </span>
                <span className="text-xs font-semibold text-text-muted">Required</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(
                  Object.entries(item.sizePrices) as [PizzaSize, number][]
                ).map(([size, price]) => {
                  const sizeLabels: Record<
                    PizzaSize,
                    { label: string; desc: string }
                  > = {
                    S: { label: "Small", desc: '8" • 4 Slices' },
                    M: { label: "Medium", desc: '10" • 6 Slices' },
                    L: { label: "Large", desc: '12" • 8 Slices' },
                    P: { label: "Party", desc: '14" • 12 Slices' },
                  };
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand-orange text-brand-black border-brand-black shadow-hard-sm"
                          : "bg-cream-alt border-transparent hover:border-brand-black text-brand-black"
                      }`}
                    >
                      <span className="font-[family-name:var(--font-chunky)] text-sm tracking-wide text-brand-black uppercase">
                        {sizeLabels[size]?.label || size}
                      </span>
                      <span className="text-[10px] text-text-muted mt-0.5 font-medium">
                        {sizeLabels[size]?.desc}
                      </span>
                      <span className="mt-1.5 text-xs font-extrabold text-brand-black">
                        {formatPrice(price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust Selection */}
          {isPizza && item.customizableCrust && (
            <div className="space-y-3 pt-4 border-t-2 border-cream-alt">
              <div className="flex items-center justify-between">
                <span className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black">
                  Select Crust Style
                </span>
                <span className="text-xs font-semibold text-text-muted">Optional</span>
              </div>
              <div className="space-y-2">
                {CRUST_OPTIONS.map((crust) => {
                  const isSelected = selectedCrust.id === crust.id;
                  return (
                    <button
                      key={crust.id}
                      type="button"
                      onClick={() => setSelectedCrust(crust)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-cream-alt border-brand-black text-brand-black shadow-hard-sm"
                          : "bg-card-white border-cream-alt hover:border-brand-black text-brand-black"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 border-brand-black flex items-center justify-center ${
                            isSelected ? "bg-brand-orange" : "bg-card-white"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-black" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brand-black">
                            {crust.name}
                          </p>
                          <p className="text-xs text-text-muted">
                            {crust.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-brand-black">
                        {crust.priceDelta > 0
                          ? `+${formatPrice(crust.priceDelta)}`
                          : "Included"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Add-ons & Toppings */}
          {(isPizza || item.category === "burgers" || item.category === "deals") && (
            <div className="space-y-3 pt-4 border-t-2 border-cream-alt">
              <div className="flex items-center justify-between">
                <span className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black">
                  Add Extra Toppings & Dips
                </span>
                <span className="text-xs font-semibold text-text-muted">
                  Optional
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EXTRA_TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.some(
                    (t) => t.id === topping.id
                  );
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping)}
                      className={`flex items-center justify-between p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-cream-alt border-brand-black text-brand-black shadow-hard-sm"
                          : "bg-card-white border-cream-alt hover:border-brand-black text-brand-black"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border-2 border-brand-black flex items-center justify-center ${
                            isSelected ? "bg-brand-orange text-brand-black" : "bg-card-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold text-brand-black">
                          {topping.name}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-brand-black">
                        +{formatPrice(topping.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2 pt-4 border-t-2 border-cream-alt">
            <label
              htmlFor="special-instructions"
              className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
            >
              Kitchen Notes (Optional)
            </label>
            <textarea
              id="special-instructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra well-done crust, easy on red onions, garlic sauce on the side..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-cream-bg border-2 border-brand-black text-xs text-brand-black placeholder:text-text-muted transition-colors resize-none outline-none font-[family-name:var(--font-body)]"
            />
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="shrink-0 p-4 sm:p-5 bg-cream-bg border-t-2 border-brand-black flex items-center justify-between gap-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          {/* Quantity Stepper */}
          <div className="flex items-center border-2 border-brand-black rounded-full bg-card-white p-1 shadow-hard-sm">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-brand-black hover:bg-brand-orange transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>
            <span className="w-8 text-center font-[family-name:var(--font-chunky)] text-sm text-brand-black">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-brand-black hover:bg-brand-orange transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Add to Cart CTA with Live Total */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 min-h-[48px] flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black font-[family-name:var(--font-chunky)] text-xs sm:text-sm uppercase tracking-wider border-2 border-brand-black shadow-hard transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Add to Cart</span>
            <span>•</span>
            <span>{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && item && (
        <ItemModalDialog key={item.id} item={item} onClose={onClose} />
      )}
    </AnimatePresence>
  );
};
