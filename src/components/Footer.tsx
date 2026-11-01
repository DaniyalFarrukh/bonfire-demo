"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Flame,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-brand-black border-t-2 border-brand-black pt-16 pb-28 sm:pb-16 text-cream-bg">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b-2 border-cream-bg/20">
          {/* Col 1: Large Brand Logo & Street Tag */}
          <div className="space-y-4">
            <div>
              <Image
                src="/logo.png"
                alt="Bonfire Pizza Kitchen"
                width={112}
                height={112}
                className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
              />
            </div>
            <p className="text-sm text-cream-bg/80 leading-relaxed font-[family-name:var(--font-body)]">
              Hand-tossed sourdough, blistered in a 900°F stone hearth with
              molten mozzarella and slow-marinated meats. Fired up, served hot.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-orange">
              <Flame className="w-4 h-4 fill-brand-orange" />
              <span>Real Hardwood Embers • DHA Phase 6</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-chunky)] text-lg uppercase tracking-wider text-cream-bg mb-4">
              THE MENU
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-cream-bg/85 font-[family-name:var(--font-body)]">
              <li>
                <Link
                  href="/menu"
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-brand-orange stroke-[3]" />
                  <span>Wood-Fired Pizzas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-brand-orange stroke-[3]" />
                  <span>Crispy Smashed Burgers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-brand-orange stroke-[3]" />
                  <span>Oven Wings & Loaded Fries</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-brand-orange stroke-[3]" />
                  <span>Money-Saving Feast Deals</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-4 h-4 text-brand-orange stroke-[3]" />
                  <span>Ice-Cold Drinks & Dips</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timings */}
          <div>
            <h4 className="font-[family-name:var(--font-chunky)] text-lg uppercase tracking-wider text-cream-bg mb-4">
              OPENING HOURS
            </h4>
            <div className="space-y-3 text-sm font-[family-name:var(--font-body)]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-cream-bg">Monday – Sunday</p>
                  <p className="text-xs text-cream-bg/75">
                    {RESTAURANT_CONFIG.hours.weekdays}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Flame className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-cream-bg">Late-Night Doorstep</p>
                  <p className="text-xs text-cream-bg/75">
                    Deliveries rolling hot until 02:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Visit & WhatsApp */}
          <div>
            <h4 className="font-[family-name:var(--font-chunky)] text-lg uppercase tracking-wider text-cream-bg mb-4">
              CONTACT & ORDER
            </h4>
            <div className="space-y-3 text-sm text-cream-bg/85 font-[family-name:var(--font-body)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {RESTAURANT_CONFIG.address.full}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a
                  href={`tel:${RESTAURANT_CONFIG.phone}`}
                  className="text-xs font-bold text-cream-bg hover:text-brand-orange transition-colors"
                >
                  {RESTAURANT_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=Hi%20Bonfire%20Pizza,%20I%20would%20like%20to%20order!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider border-2 border-cream-bg shadow-hard transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-bg/70 font-[family-name:var(--font-body)]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
            <span className="text-cream-bg font-medium">
              {RESTAURANT_CONFIG.tax.notice}
            </span>
          </div>
          <p>© 2026 Bonfire Pizza Kitchen • Demo by Hexalogic</p>
        </div>
      </div>
    </footer>
  );
};
