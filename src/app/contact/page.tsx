"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  Send,
  Check,
  ArrowLeft,
  Navigation,
  Compass,
} from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileCartBar } from "@/components/MobileCartBar";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("general");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg text-brand-black selection:bg-brand-orange selection:text-brand-black">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black hover:text-brand-orange transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Back to Home</span>
            </Link>
            <span className="text-xs text-text-muted font-bold font-[family-name:var(--font-body)]">
              DHA Phase 6 • Lahore, Pakistan
            </span>
          </div>

          {/* Header Banner */}
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-[family-name:var(--font-chunky)] tracking-widest uppercase text-brand-black bg-cream-alt border-2 border-brand-black px-4 py-1.5 rounded-full shadow-hard-sm">
              REACH THE HEARTH 🔥
            </span>
            <h1 className="font-[family-name:var(--font-chunky)] text-4xl sm:text-6xl text-brand-black tracking-tight mt-4 leading-none uppercase">
              CONTACT & KITCHEN LOCATION
            </h1>
            <p className="text-sm sm:text-base text-text-muted mt-3 leading-relaxed font-medium font-[family-name:var(--font-body)]">
              Have questions about catering, private party orders, or need assistance
              with a hot delivery order? Our pitmasters and support desk are here for you.
            </p>
          </div>

          {/* Contact Methods Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Phone Card */}
            <div className="p-6 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-orange border-2 border-brand-black shadow-hard-sm flex items-center justify-center text-brand-black">
                  <Phone className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-chunky)] text-base text-brand-black uppercase">
                    Call Front Desk
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-medium font-[family-name:var(--font-body)]">
                    For direct phone orders & table reservations
                  </p>
                </div>
              </div>
              <div>
                <a
                  href={`tel:${RESTAURANT_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-chunky)] text-brand-black underline decoration-brand-orange decoration-2 underline-offset-4 min-h-[44px]"
                >
                  <span>{RESTAURANT_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* 2. WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-cream-alt border-2 border-brand-black shadow-hard-sm flex items-center justify-center text-brand-black">
                  <MessageCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-chunky)] text-base text-brand-black uppercase">
                    WhatsApp Chat
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-medium font-[family-name:var(--font-body)]">
                    Fast inquiries, live location sharing & catering
                  </p>
                </div>
              </div>
              <div>
                <a
                  href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=Hi%20Bonfire%20Pizza,%20I%20have%20an%20inquiry!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* 3. Hours Card */}
            <div className="p-6 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-cream-alt border-2 border-brand-black shadow-hard-sm flex items-center justify-center text-brand-black">
                  <Clock className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-chunky)] text-base text-brand-black uppercase">
                    Opening Hours
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-medium font-[family-name:var(--font-body)]">
                    Open 7 days a week, every day of the year
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-[family-name:var(--font-chunky)] text-brand-black uppercase">
                  {RESTAURANT_CONFIG.hours.weekdays}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-orange text-brand-black border border-brand-black text-[10px] font-[family-name:var(--font-chunky)] uppercase">
                  <span className="w-2 h-2 rounded-full bg-brand-black animate-pulse" />
                  <span>Stone Oven Active Now</span>
                </div>
              </div>
            </div>

            {/* 4. Address Card */}
            <div className="p-6 rounded-3xl bg-card-white border-2 border-brand-black shadow-hard flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-orange border-2 border-brand-black shadow-hard-sm flex items-center justify-center text-brand-black">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-chunky)] text-base text-brand-black uppercase">
                    Kitchen Address
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-medium font-[family-name:var(--font-body)]">
                    Plot 42-C, Main Commercial Blvd, Phase 6, DHA Lahore
                  </p>
                </div>
              </div>
              <div>
                <a
                  href={RESTAURANT_CONFIG.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-[family-name:var(--font-chunky)] text-brand-black underline decoration-brand-orange decoration-2 underline-offset-4 min-h-[44px] uppercase"
                >
                  <Navigation className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map Placeholder & Contact Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Map Canvas Placeholder */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-chunky)] text-2xl sm:text-3xl text-brand-black tracking-wide leading-none uppercase">
                  HEARTH MAP & AREA
                </h2>
                <span className="text-xs text-text-muted flex items-center gap-1 font-bold font-[family-name:var(--font-body)]">
                  <Compass className="w-3.5 h-3.5 text-brand-orange" />
                  31.4722° N, 74.4533° E
                </span>
              </div>

              {/* Styled Map Canvas Container */}
              <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl bg-cream-alt border-2 border-brand-black overflow-hidden shadow-hard-lg flex flex-col justify-between p-6">
                {/* SVG Street Grid Lines representing DHA Phase 6 */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="street-grid"
                      width="80"
                      height="80"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 80 0 L 0 0 0 80"
                        fill="none"
                        className="stroke-brand-black/30"
                        strokeWidth="2"
                      />
                      <circle cx="0" cy="0" r="3" className="fill-brand-black" />
                      <circle cx="80" cy="0" r="3" className="fill-brand-black" />
                      <circle cx="0" cy="80" r="3" className="fill-brand-black" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#street-grid)" />
                  <line
                    x1="0"
                    y1="380"
                    x2="600"
                    y2="50"
                    className="stroke-brand-orange"
                    strokeWidth="5"
                  />
                  <line
                    x1="100"
                    y1="440"
                    x2="700"
                    y2="100"
                    className="stroke-brand-black"
                    strokeWidth="3"
                  />
                  <line
                    x1="200"
                    y1="0"
                    x2="450"
                    y2="440"
                    className="stroke-brand-black"
                    strokeWidth="2.5"
                  />
                </svg>

                {/* Center Pin Marker for Bonfire Pizza */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-brand-orange text-brand-black flex items-center justify-center border-2 border-brand-black shadow-hard animate-bounce">
                    <MapPin className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div className="mt-2 px-4 py-1.5 rounded-full bg-card-white border-2 border-brand-black text-xs font-[family-name:var(--font-chunky)] text-brand-black shadow-hard-sm whitespace-nowrap uppercase">
                    Bonfire Pizza Kitchen (DHA Phase 6)
                  </div>
                </div>

                {/* Top Overlay Stamp */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="px-4 py-1.5 rounded-full bg-card-white border-2 border-brand-black shadow-hard-sm text-xs font-[family-name:var(--font-chunky)] text-brand-black uppercase">
                    <span className="text-brand-orange">Area:</span> Commercial Blvd, Phase 6
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-brand-orange border-2 border-brand-black shadow-hard-sm text-xs font-[family-name:var(--font-chunky)] text-brand-black uppercase">
                    Valet Parking Available
                  </div>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-card-white p-4 rounded-2xl border-2 border-brand-black shadow-hard">
                  <div className="text-xs text-left font-[family-name:var(--font-body)]">
                    <p className="font-bold text-sm text-brand-black">
                      Plot 42-C, Commercial Boulevard
                    </p>
                    <p className="text-xs font-medium text-text-muted mt-0.5">
                      Near Phase 6 Main Roundabout & Central Commercial Hub
                    </p>
                  </div>
                  <a
                    href={RESTAURANT_CONFIG.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider transition-colors shrink-0 min-h-[44px] cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact & Event Form */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-card-white border-2 border-brand-black space-y-6 shadow-hard-lg">
              <div>
                <h3 className="font-[family-name:var(--font-chunky)] text-2xl sm:text-3xl text-brand-black tracking-wide leading-none uppercase">
                  DROP US A LINE
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-1.5 font-medium font-[family-name:var(--font-body)]">
                  Inquire about bulk party orders, catering, or share your dining feedback.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-3xl bg-cream-alt border-2 border-brand-black shadow-hard-sm text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-brand-orange border-2 border-brand-black text-brand-black flex items-center justify-center mx-auto shadow-hard-sm">
                    <Check className="w-7 h-7 stroke-[3]" />
                  </div>
                  <h4 className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black tracking-wide uppercase">
                    MESSAGE RECEIVED!
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-brand-black font-[family-name:var(--font-body)]">
                    Thank you, {name}. Our desk manager will contact you at{" "}
                    {phone || email} within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage("");
                    }}
                    className="text-xs font-[family-name:var(--font-chunky)] text-brand-black underline decoration-brand-orange decoration-2 pt-2 min-h-[44px] inline-flex items-center cursor-pointer uppercase"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                    >
                      Your Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none min-h-[48px] font-medium font-[family-name:var(--font-body)] focus:border-brand-orange"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-phone"
                        className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0300 1234567"
                        className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none min-h-[48px] font-bold font-[family-name:var(--font-body)] focus:border-brand-orange"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none min-h-[48px] font-medium font-[family-name:var(--font-body)] focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="inquiry-type"
                      className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                    >
                      Inquiry Subject
                    </label>
                    <select
                      id="inquiry-type"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-sm text-brand-black font-bold transition-colors outline-none min-h-[48px] cursor-pointer font-[family-name:var(--font-body)]"
                    >
                      <option value="general" className="bg-card-white text-brand-black">
                        General Inquiry
                      </option>
                      <option value="catering" className="bg-card-white text-brand-black">
                        Party Catering / Event Booking
                      </option>
                      <option value="order" className="bg-card-white text-brand-black">
                        Order Support / Inquiry
                      </option>
                      <option value="feedback" className="bg-card-white text-brand-black">
                        Dining Experience Feedback
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider text-brand-black block"
                    >
                      Message <span className="text-brand-orange">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Write your inquiry or event details here..."
                      className="w-full px-4 py-3 rounded-2xl bg-cream-bg border-2 border-brand-black text-sm text-brand-black placeholder:text-text-muted transition-colors outline-none resize-none font-medium font-[family-name:var(--font-body)] focus:border-brand-orange"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard font-[family-name:var(--font-chunky)] text-sm uppercase tracking-wider transition-all min-h-[48px] cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

              <div className="pt-4 border-t-2 border-cream-alt flex items-center justify-between text-xs text-text-muted font-medium font-[family-name:var(--font-body)]">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-black" />
                  <span>{RESTAURANT_CONFIG.email}</span>
                </span>
                <span>Fast response guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CartDrawer />
      <MobileCartBar />
      <Footer />
    </div>
  );
}
