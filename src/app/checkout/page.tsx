"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ArrowLeft,
  Bike,
  Store,
  CreditCard,
  Banknote,
  Smartphone,
  Tag,
  Check,
  AlertCircle,
  Plus,
  Minus,
  Trash2,
  Clock,
  MapPin,
  ShieldCheck,
  Flame,
  ArrowRight,
} from "lucide-react";
import { useCartStore, PlacedOrder } from "@/lib/cart-store";
import { RESTAURANT_CONFIG, formatPrice } from "@/lib/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileCartBar } from "@/components/MobileCartBar";

const PICKUP_TIME_SLOTS = [
  { id: "asap", label: "ASAP", time: "Ready in 15–20 mins", isDefault: true },
  { id: "in-30", label: "In 30 Minutes", time: "Approx. 30 mins" },
  { id: "in-45", label: "In 45 Minutes", time: "Approx. 45 mins" },
  { id: "in-60", label: "In 1 Hour", time: "Approx. 60 mins" },
];

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

function createOrderReference(): string {
  const ts = Date.now().toString().slice(-5);
  return `BF-${ts}`;
}

export default function CheckoutPage() {
  const router = useRouter();

  const {
    items,
    orderType,
    setOrderType,
    setPaymentMethod,
    deliveryArea,
    deliveryAddress,
    setDeliveryLocation,
    promoCode,
    promoDiscountPercent,
    applyPromoCode,
    removePromoCode,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discount,
    taxAmount,
    deliveryFee,
    grandTotal,
    setLastPlacedOrder,
    hasHydrated,
  } = useCartStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState(deliveryAddress || "");
  const [selectedArea, setSelectedArea] = useState(
    deliveryArea || LAHORE_AREAS[0]
  );
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [selectedPickupSlot, setSelectedPickupSlot] = useState(
    PICKUP_TIME_SLOTS[0].label
  );
  const [paymentChoice, setPaymentChoice] = useState<
    "cash" | "card" | "wallet"
  >("card");

  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSubtotal = hasHydrated ? subtotal() : 0;
  const currentDiscount = hasHydrated ? discount() : 0;
  const currentDelivery = hasHydrated ? deliveryFee() : 0;
  const currentTax = hasHydrated ? taxAmount() : 0;
  const currentGrandTotal = hasHydrated ? grandTotal() : 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage({ type: "success", text: res.message });
    } else {
      setPromoMessage({ type: "error", text: res.message });
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoInput("");
    setPromoMessage(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    }

    if (!phone.trim()) {
      errors.phone = "Please enter your contact phone number.";
    } else if (phone.trim().length < 10) {
      errors.phone = "Please enter a valid phone number (10-11 digits).";
    }

    if (orderType === "delivery") {
      if (!streetAddress.trim()) {
        errors.streetAddress = "Please provide your street or house address.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty. Please add items from the menu first!");
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    const orderNumber = createOrderReference();
    const eta =
      orderType === "takeaway"
        ? selectedPickupSlot.includes("ASAP")
          ? "15–20 mins"
          : selectedPickupSlot
        : RESTAURANT_CONFIG.delivery.estimatedMinutes;

    // Save location to store
    if (orderType === "delivery") {
      setDeliveryLocation(selectedArea, streetAddress.trim());
    }

    const placedOrder: PlacedOrder = {
      orderNumber,
      orderType,
      items: [...items],
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: orderType === "delivery" ? streetAddress.trim() : undefined,
        area: orderType === "delivery" ? selectedArea : undefined,
        pickupSlot: orderType === "takeaway" ? selectedPickupSlot : undefined,
        notes: deliveryNotes.trim() || undefined,
      },
      paymentMethod: paymentChoice === "card" ? "card" : "cash",
      promoCode: promoCode || undefined,
      subtotal: currentSubtotal,
      discount: currentDiscount,
      deliveryFee: currentDelivery,
      taxAmount: currentTax,
      grandTotal: currentGrandTotal,
      createdAt: "Just now",
      eta,
    };

    setLastPlacedOrder(placedOrder);
    clearCart();

    setTimeout(() => {
      router.push("/order/confirmation");
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg text-brand-black selection:bg-brand-orange selection:text-brand-black">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Menu Link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black hover:text-brand-orange transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to Menu</span>
            </Link>
            <span className="text-xs text-text-muted font-bold font-[family-name:var(--font-body)]">
              Direct Kitchen Dispatch • DHA Phase 6
            </span>
          </div>

          <div className="mb-8 pb-4 border-b-2 border-brand-black">
            <h1 className="font-[family-name:var(--font-chunky)] text-3xl sm:text-5xl text-brand-black tracking-tight leading-none uppercase">
              CHECKOUT
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-2 font-medium font-[family-name:var(--font-body)]">
              Confirm your delivery location, contact details, and payment mode.
            </p>
          </div>

          {/* Empty Cart Notice */}
          {hasHydrated && items.length === 0 ? (
            <div className="max-w-xl mx-auto py-16 text-center space-y-4 p-8 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard">
              <div className="w-16 h-16 rounded-full bg-brand-orange border-2 border-brand-black flex items-center justify-center mx-auto text-brand-black shadow-hard-sm">
                <ShoppingBag className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h2 className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black tracking-wide uppercase">
                YOUR CART IS EMPTY
              </h2>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto font-medium font-[family-name:var(--font-body)]">
                Browse our wood-fired pizzas, smash burgers, and family feast boxes to start your order.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          ) : (
            /* Two-Column Checkout Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Form Details */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Delivery / Takeaway Toggle */}
                <div className="p-1.5 rounded-full bg-cream-alt border-2 border-brand-black shadow-hard grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-all cursor-pointer border-2 ${
                      orderType === "delivery"
                        ? "bg-brand-orange text-brand-black border-brand-black shadow-hard-sm"
                        : "bg-card-white text-brand-black border-transparent hover:border-brand-black"
                    }`}
                  >
                    <Bike className="w-4 h-4 stroke-[2.5]" />
                    <span>Home Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("takeaway")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-all cursor-pointer border-2 ${
                      orderType === "takeaway"
                        ? "bg-brand-orange text-brand-black border-brand-black shadow-hard-sm"
                        : "bg-card-white text-brand-black border-transparent hover:border-brand-black"
                    }`}
                  >
                    <Store className="w-4 h-4 stroke-[2.5]" />
                    <span>Kitchen Takeaway</span>
                  </button>
                </div>

                {/* 2. Customer & Address Details */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-cream-alt">
                    <h3 className="font-[family-name:var(--font-chunky)] text-xl sm:text-2xl text-brand-black tracking-wide uppercase">
                      {orderType === "delivery"
                        ? "DELIVERY ADDRESS"
                        : "PICKUP DETAILS"}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-cream-alt border border-brand-black text-xs text-brand-black font-bold flex items-center gap-1.5 font-[family-name:var(--font-body)]">
                      <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                      {orderType === "delivery"
                        ? "Est: 35–45 min"
                        : "Ready: 15–20 min"}
                    </span>
                  </div>

                  {/* Customer Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-fullname"
                        className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                      >
                        Full Name <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="checkout-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Daniyal Khan"
                        className={`w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 text-base sm:text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none font-medium ${
                          formErrors.fullName
                            ? "border-brand-orange"
                            : "border-brand-black"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] font-bold text-brand-black bg-cream-alt border border-brand-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          <span>{formErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-phone"
                        className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                      >
                        Phone Number <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0300 1234567"
                        className={`w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 text-base sm:text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none font-bold ${
                          formErrors.phone
                            ? "border-brand-orange"
                            : "border-brand-black"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] font-bold text-brand-black bg-cream-alt border border-brand-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Specific Fields */}
                  {orderType === "delivery" ? (
                    <div className="space-y-4 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="checkout-area"
                            className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                          >
                            Delivery Area (Lahore){" "}
                            <span className="text-brand-orange">*</span>
                          </label>
                          <select
                            id="checkout-area"
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
                            htmlFor="checkout-street"
                            className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                          >
                            Street / House # / Flat{" "}
                            <span className="text-brand-orange">*</span>
                          </label>
                          <input
                            id="checkout-street"
                            type="text"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="e.g. House 14-B, Street 5, Sector C"
                            className={`w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 text-base sm:text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none font-medium ${
                              formErrors.streetAddress
                                ? "border-brand-orange"
                                : "border-brand-black"
                            }`}
                          />
                          {formErrors.streetAddress && (
                            <p className="text-[11px] font-bold text-brand-black bg-cream-alt border border-brand-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                              <span>{formErrors.streetAddress}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="checkout-notes"
                          className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                        >
                          Delivery Notes / Landmark (Optional)
                        </label>
                        <input
                          id="checkout-notes"
                          type="text"
                          value={deliveryNotes}
                          onChange={(e) => setDeliveryNotes(e.target.value)}
                          placeholder="e.g. Near the main park, please ring doorbell twice"
                          className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-base sm:text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none font-medium"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Takeaway Specific Fields */
                    <div className="space-y-4 pt-1">
                      <div className="p-4 rounded-2xl bg-cream-alt border-2 border-brand-black space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-brand-black font-[family-name:var(--font-chunky)] uppercase">
                          <MapPin className="w-4 h-4 text-brand-orange stroke-[2.5]" />
                          <span>Pickup Counter</span>
                        </div>
                        <p className="text-sm text-brand-black font-bold">
                          {RESTAURANT_CONFIG.name} — Stone Hearth Kitchen
                        </p>
                        <p className="text-text-muted">{RESTAURANT_CONFIG.address.full}</p>
                        <p className="text-brand-black font-bold">
                          Direct Hotline: {RESTAURANT_CONFIG.phoneDisplay}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block">
                          Select Pickup Time Slot
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PICKUP_TIME_SLOTS.map((slot) => {
                            const isSelected = selectedPickupSlot === slot.label;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => setSelectedPickupSlot(slot.label)}
                                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-brand-orange border-brand-black text-brand-black shadow-hard-sm"
                                    : "bg-cream-bg border-cream-alt hover:border-brand-black text-brand-black"
                                }`}
                              >
                                <span className="block font-[family-name:var(--font-chunky)] text-xs text-brand-black uppercase">
                                  {slot.label}
                                </span>
                                <span className="block text-[10px] text-text-muted mt-0.5 font-medium">
                                  {slot.time}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Payment Method Choice */}
                <div className="p-6 sm:p-8 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-cream-alt">
                    <h3 className="font-[family-name:var(--font-chunky)] text-xl sm:text-2xl text-brand-black tracking-wide uppercase">
                      PAYMENT METHOD
                    </h3>
                    <span className="text-xs font-bold text-text-muted">
                      Card: 8% Tax | Cash: 16% Tax
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Card */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentChoice("card");
                        setPaymentMethod("card");
                      }}
                      className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paymentChoice === "card"
                          ? "bg-brand-orange border-brand-black text-brand-black shadow-hard-sm"
                          : "bg-cream-bg border-transparent text-brand-black hover:border-brand-black"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-brand-black stroke-[2.5]" />
                      <div className="mt-2">
                        <span className="font-[family-name:var(--font-chunky)] text-xs uppercase block">
                          Card (8% Tax)
                        </span>
                        <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                          Visa, Mastercard on rider POS
                        </p>
                      </div>
                    </button>

                    {/* Cash */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentChoice("cash");
                        setPaymentMethod("cash");
                      }}
                      className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paymentChoice === "cash"
                          ? "bg-brand-orange border-brand-black text-brand-black shadow-hard-sm"
                          : "bg-cream-bg border-transparent text-brand-black hover:border-brand-black"
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-brand-black stroke-[2.5]" />
                      <div className="mt-2">
                        <span className="font-[family-name:var(--font-chunky)] text-xs uppercase block">
                          Cash (16% Tax)
                        </span>
                        <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                          Pay exact cash to rider
                        </p>
                      </div>
                    </button>

                    {/* JazzCash / Easypaisa */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentChoice("wallet");
                        setPaymentMethod("card"); // uses lower tax for digital
                      }}
                      className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paymentChoice === "wallet"
                          ? "bg-brand-orange border-brand-black text-brand-black shadow-hard-sm"
                          : "bg-cream-bg border-transparent text-brand-black hover:border-brand-black"
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-brand-black stroke-[2.5]" />
                      <div className="mt-2">
                        <span className="font-[family-name:var(--font-chunky)] text-xs uppercase block">
                          JazzCash / Easypaisa
                        </span>
                        <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                          Pay via Mobile Wallet
                        </p>
                      </div>
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-text-muted pt-1">
                    {RESTAURANT_CONFIG.tax.notice}
                  </p>
                </div>
              </div>

              {/* Right Column: Sticky Order Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-card-white border-2 border-brand-black space-y-6 shadow-hard-lg sticky top-28">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-cream-alt">
                    <h3 className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black tracking-wide uppercase">
                      ORDER SUMMARY ({items.length})
                    </h3>
                    <Link
                      href="/"
                      className="text-xs text-brand-black font-[family-name:var(--font-chunky)] uppercase underline decoration-brand-orange decoration-2 underline-offset-4"
                    >
                      + Add More
                    </Link>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((cartItem) => (
                      <div
                        key={cartItem.cartItemId}
                        className="p-3.5 rounded-2xl bg-cream-bg border-2 border-brand-black space-y-2 text-xs shadow-hard-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-[family-name:var(--font-chunky)] text-sm text-brand-black uppercase">
                              {cartItem.menuItem.name}
                            </p>
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
                                  className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-card-white text-brand-black border border-brand-black"
                                >
                                  +{t.name}
                                </span>
                              ))}
                            </div>
                            {cartItem.specialInstructions && (
                              <p className="text-[11px] text-text-muted italic mt-1 font-[family-name:var(--font-body)]">
                                &ldquo;{cartItem.specialInstructions}&rdquo;
                              </p>
                            )}
                          </div>

                          <span className="font-[family-name:var(--font-chunky)] text-sm text-brand-black whitespace-nowrap">
                            {formatPrice(cartItem.totalPrice)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t-2 border-cream-alt">
                          <span className="text-xs font-semibold text-text-muted">
                            {formatPrice(cartItem.unitPrice)} each
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(cartItem.cartItemId, -1)
                              }
                              aria-label="Decrease quantity"
                              className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-card-white border-2 border-brand-black flex items-center justify-center text-brand-black hover:bg-brand-orange cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <span className="w-6 text-center font-[family-name:var(--font-chunky)] text-xs text-brand-black">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(cartItem.cartItemId, 1)
                              }
                              aria-label="Increase quantity"
                              className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-card-white border-2 border-brand-black flex items-center justify-center text-brand-black hover:bg-brand-orange cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(cartItem.cartItemId)}
                              aria-label="Remove item"
                              className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-card-white border-2 border-brand-black flex items-center justify-center ml-1 text-text-muted hover:text-brand-orange transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Form */}
                  <div className="pt-3 border-t-2 border-cream-alt space-y-2">
                    <span className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-brand-orange stroke-[2.5]" />
                      <span>Promo Voucher</span>
                    </span>

                    {promoDiscountPercent > 0 ? (
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-orange text-brand-black border-2 border-brand-black text-xs font-[family-name:var(--font-chunky)] uppercase">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>{promoCode} (10% OFF APPLIED)</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="font-bold underline decoration-brand-black cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Try BONFIRE10"
                          aria-label="Promo code"
                          className="flex-1 px-4 py-2.5 rounded-full bg-cream-bg border-2 border-brand-black text-xs text-brand-black uppercase placeholder:normal-case placeholder:text-text-muted outline-none font-bold"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {promoMessage && (
                      <p className="text-xs font-bold text-brand-black flex items-center gap-1">
                        {promoMessage.type === "success" ? (
                          <Check className="w-3.5 h-3.5 text-brand-orange stroke-[3]" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-brand-orange stroke-[2.5]" />
                        )}
                        <span>{promoMessage.text}</span>
                      </p>
                    )}
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2 pt-3 border-t-2 border-cream-alt text-xs font-[family-name:var(--font-body)]">
                    <div className="flex justify-between text-text-muted">
                      <span>Subtotal</span>
                      <span className="font-bold text-brand-black">
                        {formatPrice(currentSubtotal)}
                      </span>
                    </div>

                    {currentDiscount > 0 && (
                      <div className="flex justify-between text-brand-black font-bold">
                        <span>Promo Discount (10%)</span>
                        <span className="font-extrabold bg-brand-orange border border-brand-black px-2 py-0.5 rounded-full">
                          -{formatPrice(currentDiscount)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-text-muted">
                      <span>
                        Delivery Fee{" "}
                        {orderType === "takeaway" ? "(Takeaway)" : ""}
                      </span>
                      <span className="font-bold text-brand-black">
                        {currentDelivery === 0 ? (
                          <span className="px-2 py-0.5 bg-brand-orange border border-brand-black rounded-full text-brand-black font-extrabold text-[10px]">
                            FREE
                          </span>
                        ) : (
                          formatPrice(currentDelivery)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-text-muted">
                      <span>
                        Tax ({paymentChoice === "card" || paymentChoice === "wallet" ? "8% Digital" : "16% Cash"})
                      </span>
                      <span className="font-bold text-brand-black">
                        {formatPrice(currentTax)}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-extrabold text-brand-black pt-3 border-t-2 border-brand-black">
                      <span className="font-[family-name:var(--font-chunky)] text-2xl tracking-wider uppercase">
                        GRAND TOTAL
                      </span>
                      <span className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black">
                        {formatPrice(currentGrandTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Place Order CTA Button */}
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-50 text-brand-black font-[family-name:var(--font-chunky)] text-base uppercase tracking-wider border-2 border-brand-black shadow-hard transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 min-h-[52px]"
                  >
                    <Flame className="w-5 h-5 fill-brand-black text-brand-black" />
                    <span>
                      {isSubmitting ? "Firing Up Order..." : "Place Order"}
                    </span>
                    <span>•</span>
                    <span>{formatPrice(currentGrandTotal)}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-text-muted pt-1">
                    <ShieldCheck className="w-4 h-4 text-brand-black stroke-[2.5]" />
                    <span>Live kitchen confirmation with instant tracking</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <CartDrawer />
      <MobileCartBar />
      <Footer />
    </div>
  );
}

