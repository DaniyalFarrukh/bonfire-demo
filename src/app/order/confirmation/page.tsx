"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Flame,
  Clock,
  Bike,
  Store,
  Copy,
  Printer,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { RESTAURANT_CONFIG, formatPrice } from "@/lib/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function OrderConfirmationPage() {
  const { lastPlacedOrder } = useCartStore();
  const [copied, setCopied] = useState(false);

  const order = lastPlacedOrder || {
    orderNumber: "BF-58921",
    orderType: "delivery" as const,
    items: [
      {
        cartItemId: "mock-1",
        menuItem: {
          id: "piz-bonfire-special",
          name: "Bonfire Signature Special",
          description: "Extra cheese, sausages, tikka boti, olives & mushrooms",
          category: "pizzas" as const,
          basePrice: 1850,
        },
        size: "L" as const,
        crustName: "Cheese Stuffed Crust",
        crustPriceDelta: 250,
        toppings: [
          {
            id: "extra-mozzarella",
            name: "Extra Mozzarella Cheese",
            price: 180,
          },
        ],
        specialInstructions: "Extra crispy crust please",
        unitPrice: 2280,
        quantity: 1,
        totalPrice: 2280,
      },
      {
        cartItemId: "mock-2",
        menuItem: {
          id: "side-oven-baked-wings",
          name: "Oven Baked Wings",
          description: "Tender juicy wings with mayodip sauce",
          category: "sides" as const,
          basePrice: 800,
        },
        crustPriceDelta: 0,
        toppings: [],
        specialInstructions: "",
        unitPrice: 800,
        quantity: 1,
        totalPrice: 800,
      },
    ],
    customer: {
      fullName: "Daniyal Khan",
      phone: "0300 1234567",
      address: "House 42, Sector J, Street 8",
      area: "DHA Phase 6",
      notes: "Near the central park gate",
    },
    paymentMethod: "card" as const,
    promoCode: "BONFIRE10",
    subtotal: 3080,
    discount: 308,
    taxAmount: 222,
    deliveryFee: 0,
    grandTotal: 2994,
    createdAt: "Just now",
    eta: "35–45 mins",
  };

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg text-brand-black selection:bg-brand-orange selection:text-brand-black">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* ==================== CELEBRATION HEADER ==================== */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-orange border-2 border-brand-black shadow-hard mx-auto flex items-center justify-center text-brand-black"
            >
              <Flame className="w-10 h-10 sm:w-12 sm:h-12 fill-brand-black text-brand-black" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="inline-block text-xs font-[family-name:var(--font-chunky)] tracking-widest uppercase text-brand-black bg-cream-alt border-2 border-brand-black px-4 py-1.5 rounded-full shadow-hard-sm">
                ORDER CONFIRMED & FIRING UP 🔥
              </span>

              <h1 className="font-[family-name:var(--font-chunky)] text-4xl sm:text-6xl text-brand-black tracking-tight mt-4 leading-none uppercase">
                THANK YOU, {order.customer.fullName.toUpperCase()}!
              </h1>

              <p className="text-sm sm:text-base text-text-muted max-w-lg mx-auto mt-3 font-medium font-[family-name:var(--font-body)]">
                Your order is sliding onto our 900°F stone hearth. Our pitmaster
                is crafting each item fresh over seasoned hardwood embers.
              </p>
            </motion.div>
          </div>

          {/* ==================== ETA & ORDER NUMBER CARD ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 sm:p-8 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b-2 border-cream-alt">
              <div>
                <span className="text-xs text-text-muted uppercase font-[family-name:var(--font-chunky)] tracking-wider block">
                  Order Tracking Reference
                </span>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="font-[family-name:var(--font-chunky)] text-2xl sm:text-3xl text-brand-black">
                    #{order.orderNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyOrderNumber}
                    className="px-3.5 py-1.5 min-h-[44px] rounded-full bg-cream-bg hover:bg-brand-orange text-brand-black border-2 border-brand-black shadow-hard-sm transition-colors text-xs font-[family-name:var(--font-chunky)] cursor-pointer flex items-center gap-1.5"
                    title="Copy Order #"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span className="text-[10px] uppercase">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span className="text-[10px] uppercase">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-brand-orange p-4 rounded-2xl border-2 border-brand-black shadow-hard-sm text-brand-black">
                <div className="w-12 h-12 rounded-full bg-card-white border-2 border-brand-black flex items-center justify-center text-brand-black">
                  <Clock className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-black uppercase font-[family-name:var(--font-chunky)] tracking-wider block">
                    {order.orderType === "delivery"
                      ? "Estimated Delivery ETA"
                      : "Ready for Pickup"}
                  </span>
                  <span className="font-[family-name:var(--font-chunky)] text-xl text-brand-black">
                    {order.eta}
                  </span>
                </div>
              </div>
            </div>

            {/* ==================== 4-STEP LIVE PROGRESS TRACKER ==================== */}
            <div className="pt-8">
              <h3 className="font-[family-name:var(--font-chunky)] text-xl sm:text-2xl text-brand-black tracking-wide mb-6 uppercase">
                LIVE KITCHEN STATUS
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center space-y-2 p-3.5 rounded-2xl bg-cream-bg border-2 border-brand-black shadow-hard-sm">
                  <div className="w-10 h-10 rounded-full bg-brand-black text-cream-bg flex items-center justify-center">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <span className="font-[family-name:var(--font-chunky)] text-xs text-brand-black uppercase">
                    Order Received
                  </span>
                  <span className="text-[11px] font-bold text-text-muted">
                    Confirmed
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 p-3.5 rounded-2xl bg-brand-orange border-2 border-brand-black shadow-hard-sm text-brand-black">
                  <div className="w-10 h-10 rounded-full bg-card-white border-2 border-brand-black text-brand-black flex items-center justify-center">
                    <Flame className="w-5 h-5 fill-brand-black stroke-[2]" />
                  </div>
                  <span className="font-[family-name:var(--font-chunky)] text-xs text-brand-black uppercase">
                    In 900°F Hearth
                  </span>
                  <span className="text-[11px] font-extrabold text-brand-black underline decoration-brand-black">
                    Baking on Stone
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 p-3.5 rounded-2xl bg-cream-bg border-2 border-cream-alt">
                  <div className="w-10 h-10 rounded-full bg-card-white border border-brand-black text-text-muted flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-text-muted font-[family-name:var(--font-body)]">
                    Quality & Pack
                  </span>
                  <span className="text-[11px] text-text-muted">Pending</span>
                </div>

                <div className="flex flex-col items-center text-center space-y-2 p-3.5 rounded-2xl bg-cream-bg border-2 border-cream-alt">
                  <div className="w-10 h-10 rounded-full bg-card-white border border-brand-black text-text-muted flex items-center justify-center">
                    {order.orderType === "delivery" ? (
                      <Bike className="w-4 h-4" />
                    ) : (
                      <Store className="w-4 h-4" />
                    )}
                  </div>
                  <span className="font-bold text-xs text-text-muted font-[family-name:var(--font-body)]">
                    {order.orderType === "delivery"
                      ? "Out for Delivery"
                      : "Ready at Counter"}
                  </span>
                  <span className="text-[11px] text-text-muted">Pending</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ==================== DETAILED RECEIPT ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 sm:p-8 rounded-3xl bg-card-white border-2 border-brand-black space-y-6 shadow-hard-lg"
          >
            <div className="flex items-center justify-between pb-4 border-b-2 border-cream-alt">
              <h3 className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black tracking-wide uppercase">
                RECEIPT DETAILS
              </h3>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-full bg-cream-bg hover:bg-cream-alt text-xs font-[family-name:var(--font-chunky)] text-brand-black transition-colors border-2 border-brand-black shadow-hard-sm cursor-pointer uppercase"
              >
                <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Print Receipt</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-cream-bg border-2 border-brand-black text-xs font-[family-name:var(--font-body)]">
              <div className="space-y-1">
                <span className="text-text-muted uppercase font-bold text-[10px]">
                  Recipient
                </span>
                <p className="font-bold text-sm text-brand-black">
                  {order.customer.fullName}
                </p>
                <p className="text-text-muted font-bold">
                  {order.customer.phone}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-text-muted uppercase font-bold text-[10px]">
                  {order.orderType === "delivery"
                    ? "Delivery Destination"
                    : "Pickup Location"}
                </span>
                <p className="font-bold text-sm text-brand-black">
                  {order.orderType === "delivery"
                    ? `${order.customer.address}, ${order.customer.area}`
                    : RESTAURANT_CONFIG.address.full}
                </p>
                {order.customer.notes && (
                  <p className="text-[11px] text-brand-black font-semibold italic">
                    Note: &ldquo;{order.customer.notes}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {/* Ordered Items Table */}
            <div className="divide-y-2 divide-cream-alt">
              {order.items.map((item, idx) => (
                <div
                  key={item.cartItemId || idx}
                  className="py-3.5 flex items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <p className="font-[family-name:var(--font-chunky)] text-sm text-brand-black uppercase">
                      {item.quantity} × {item.menuItem.name}
                    </p>
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {item.size && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-orange text-brand-black border border-brand-black font-bold">
                          Size {item.size}
                        </span>
                      )}
                      {item.crustName && (
                        <span className="px-2 py-0.5 rounded-full bg-cream-alt text-brand-black border border-brand-black font-bold">
                          {item.crustName}
                        </span>
                      )}
                      {item.toppings?.map((t) => (
                        <span
                          key={t.id}
                          className="px-2 py-0.5 rounded-full bg-cream-bg text-brand-black border border-brand-black font-bold"
                        >
                          +{t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-[family-name:var(--font-chunky)] text-sm text-brand-black whitespace-nowrap">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            {/* Receipt Cost Totals */}
            <div className="space-y-2 pt-4 border-t-2 border-brand-black text-xs font-[family-name:var(--font-body)]">
              <div className="flex justify-between text-text-muted">
                <span>Food Subtotal</span>
                <span className="font-bold text-brand-black">
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-brand-black font-bold">
                  <span>Voucher Discount (BONFIRE10 - 10%)</span>
                  <span className="font-extrabold bg-brand-orange border border-brand-black px-2 py-0.5 rounded-full">
                    -{formatPrice(order.discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-text-muted">
                <span>
                  Delivery Fee{" "}
                  {order.orderType === "takeaway" ? "(Takeaway)" : ""}
                </span>
                <span className="font-bold text-brand-black">
                  {order.deliveryFee === 0 ? (
                    <span className="px-2 py-0.5 bg-brand-orange border border-brand-black rounded-full text-brand-black font-extrabold">
                      FREE
                    </span>
                  ) : (
                    formatPrice(order.deliveryFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-text-muted">
                <span>
                  Tax (
                  {order.paymentMethod === "card"
                    ? "8% Card POS"
                    : "16% Cash on Delivery"}
                  )
                </span>
                <span className="font-bold text-brand-black">
                  {formatPrice(order.taxAmount)}
                </span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-brand-black pt-3 border-t-2 border-brand-black">
                <span className="font-[family-name:var(--font-chunky)] text-2xl tracking-wider uppercase">
                  TOTAL AMOUNT
                </span>
                <span className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black">
                  {formatPrice(order.grandTotal)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ==================== ACTION BUTTONS ==================== */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard font-[family-name:var(--font-chunky)] text-sm uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
            >
              <span>Order More Items</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=Hi%20Bonfire%20Pizza,%20I%20am%20inquiring%20about%20my%20order%20%23${order.orderNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-card-white hover:bg-cream-alt text-brand-black border-2 border-brand-black shadow-hard font-[family-name:var(--font-chunky)] text-sm uppercase tracking-wider transition-all cursor-pointer min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 text-brand-black stroke-[2.5]" />
              <span>Track via WhatsApp Support</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
