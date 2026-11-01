"use client";

import React, { useState } from "react";
import { X, Bike, Store, MapPin, Clock, Check } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { RESTAURANT_CONFIG } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

const LAHORE_AREAS = [
  "DHA Phase 6, Lahore",
  "DHA Phase 5, Lahore",
  "DHA Phase 8, Lahore",
  "DHA Phase 1–4, Lahore",
  "Gulberg II & III, Lahore",
  "Cantt / Cavalry Ground, Lahore",
  "Model Town, Lahore",
  "Askari 10 & 11, Lahore",
  "Johar Town, Lahore",
];

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    orderType,
    setOrderType,
    deliveryArea,
    deliveryAddress,
    setDeliveryLocation,
  } = useCartStore();

  const [selectedType, setSelectedType] = useState<"delivery" | "takeaway">(
    orderType || "delivery"
  );
  const [selectedArea, setSelectedArea] = useState(
    deliveryArea || LAHORE_AREAS[0]
  );
  const [street, setStreet] = useState(deliveryAddress || "");

  const handleConfirm = () => {
    setOrderType(selectedType);
    setDeliveryLocation(selectedArea, street.trim());
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/60 cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-card-white border-2 border-brand-black rounded-3xl p-6 sm:p-8 shadow-hard z-10 text-brand-black"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close delivery modal"
              className="absolute top-5 right-5 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-cream-bg hover:bg-brand-orange border border-brand-black text-brand-black transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <h3 className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black uppercase tracking-wide">
              ORDER METHOD & LOCATION
            </h3>
            <p className="text-xs sm:text-sm text-text-muted mt-1 font-medium font-[family-name:var(--font-body)]">
              Choose whether you want hot delivery or quick kitchen takeaway.
            </p>

            {/* Toggle Delivery vs Takeaway */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-cream-alt border-2 border-brand-black mt-6">
              <button
                type="button"
                onClick={() => setSelectedType("delivery")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-all cursor-pointer ${
                  selectedType === "delivery"
                    ? "bg-brand-orange text-brand-black shadow-hard-sm"
                    : "bg-card-white text-brand-black hover:bg-cream-bg"
                }`}
              >
                <Bike className="w-4 h-4 stroke-[2.5]" />
                <span>Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedType("takeaway")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-all cursor-pointer ${
                  selectedType === "takeaway"
                    ? "bg-brand-orange text-brand-black shadow-hard-sm"
                    : "bg-card-white text-brand-black hover:bg-cream-bg"
                }`}
              >
                <Store className="w-4 h-4 stroke-[2.5]" />
                <span>Takeaway</span>
              </button>
            </div>

            {selectedType === "delivery" ? (
              <div className="space-y-4 mt-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="delivery-area-select"
                    className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wide text-brand-black block"
                  >
                    Select Lahore Area
                  </label>
                  <select
                    id="delivery-area-select"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-base sm:text-sm text-brand-black font-bold outline-none cursor-pointer"
                  >
                    {LAHORE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="delivery-street-input"
                    className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wide text-brand-black block"
                  >
                    Street / House / Landmark
                  </label>
                  <input
                    id="delivery-street-input"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. Sector J, Street 4, House 21"
                    className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-base sm:text-sm text-brand-black placeholder:text-text-muted outline-none font-medium"
                  />
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-cream-alt border border-brand-black text-xs font-bold text-brand-black">
                  <Clock className="w-4 h-4 text-brand-orange stroke-[2.5]" />
                  <span>Estimated Delivery Time: 35–45 minutes</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mt-6">
                <div className="p-4 rounded-2xl bg-cream-alt border-2 border-brand-black space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 font-[family-name:var(--font-chunky)] uppercase text-brand-black">
                    <MapPin className="w-4 h-4 text-brand-orange stroke-[2.5]" />
                    <span>Kitchen Pickup Counter</span>
                  </div>
                  <p className="font-bold text-brand-black text-sm">
                    {RESTAURANT_CONFIG.name} — Stone Hearth Kitchen
                  </p>
                  <p className="text-text-muted">{RESTAURANT_CONFIG.address.full}</p>
                  <p className="text-brand-black font-bold">
                    Hotline: {RESTAURANT_CONFIG.phoneDisplay}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card-white border border-brand-black text-xs font-bold text-brand-black">
                  <Clock className="w-4 h-4 text-brand-orange stroke-[2.5]" />
                  <span>Ready at counter in 15–20 minutes</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full mt-6 py-3.5 px-6 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black font-[family-name:var(--font-chunky)] text-sm uppercase tracking-wider border-2 border-brand-black shadow-hard flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Confirm Location</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

