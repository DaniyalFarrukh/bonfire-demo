"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Search,
  Sparkles,
  Pizza,
  UtensilsCrossed,
  Soup,
  Cookie,
  Coffee,
  ShieldCheck,
  Clock,
} from "lucide-react";
import {
  MENU_ITEMS,
  CATEGORY_TABS,
  MenuItem,
  MenuCategoryType,
} from "@/data/menu";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileCartBar } from "@/components/MobileCartBar";
import { ItemModal } from "@/components/ItemModal";
import { MenuItemCard } from "@/components/MenuItemCard";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<
    MenuCategoryType | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "bestseller"
  >("all");
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item: MenuItem) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== "all") {
        if (activeCategory === "popular") {
          if (!item.isBestseller) return false;
        } else if (item.category !== activeCategory) {
          return false;
        }
      }

      if (selectedFilter === "bestseller" && !item.isBestseller) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      return true;
    });
  }, [activeCategory, selectedFilter, searchQuery]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Pizza":
        return <Pizza className="w-4 h-4" />;
      case "UtensilsCrossed":
        return <UtensilsCrossed className="w-4 h-4" />;
      case "Soup":
        return <Soup className="w-4 h-4" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "Cookie":
        return <Cookie className="w-4 h-4" />;
      case "Coffee":
        return <Coffee className="w-4 h-4" />;
      case "Flame":
      default:
        return <Flame className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg text-brand-black selection:bg-brand-orange selection:text-brand-black">
      <Navbar />

      <main className="flex-1">
        {/* ==================== HERO HEADER ==================== */}
        <section className="bg-cream-alt pt-12 pb-14 sm:pt-16 sm:pb-20 border-b-2 border-brand-black">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-bg border-2 border-brand-black shadow-hard-sm text-xs font-[family-name:var(--font-chunky)] text-brand-black mb-6">
              <Flame className="w-4 h-4 text-brand-orange fill-brand-orange" />
              <span className="uppercase tracking-wider">
                900°F HARDWOOD EMBERS
              </span>
              <span>•</span>
              <span>DHA Phase 6, Lahore</span>
            </div>

            <h1 className="font-[family-name:var(--font-chunky)] text-4xl sm:text-6xl lg:text-7xl tracking-tight text-brand-black uppercase leading-[0.96] max-w-4xl mx-auto">
              REAL WOOD-FIRED CRUST.{" "}
              <span className="font-[family-name:var(--font-brush)] text-brand-orange normal-case text-5xl sm:text-7xl lg:text-8xl inline-block px-1">
                Fired
              </span>{" "}
              BY FLAME.
            </h1>

            <p className="mt-5 text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed font-medium font-[family-name:var(--font-body)]">
              Hand-stretched 48-hour fermented sourdough, slow-marinated chicken
              tikka, whole milk mozzarella, and signature stuffed roll crusts baked
              on refractory stone.
            </p>

            {/* Feature Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-bold font-[family-name:var(--font-body)]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card-white border-2 border-brand-black shadow-hard-sm">
                <Flame className="w-4 h-4 text-brand-orange fill-brand-orange" />
                <span>Wood-Fired Hearth</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card-white border-2 border-brand-black shadow-hard-sm">
                <ShieldCheck className="w-4 h-4 text-brand-black" />
                <span>100% Halal Ingredients</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card-white border-2 border-brand-black shadow-hard-sm">
                <Clock className="w-4 h-4 text-brand-black" />
                <span>35–45 Min Hot Delivery</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SEARCH & DIETARY FILTERS BAR ==================== */}
        <section id="menu" className="pt-8 pb-4 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-brand-black absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pizzas, malai boti, wings, deals..."
                aria-label="Search menu items"
                className="w-full pl-11 pr-14 py-3 min-h-[48px] rounded-full bg-card-white border-2 border-brand-black shadow-hard-sm text-sm text-brand-black placeholder:text-text-muted outline-none font-medium font-[family-name:var(--font-body)] focus:border-brand-orange"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-[family-name:var(--font-chunky)] text-brand-black hover:text-brand-orange cursor-pointer uppercase"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Tag Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2.5 min-h-[44px] rounded-full text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-2 border-brand-black ${
                  selectedFilter === "all"
                    ? "bg-brand-orange text-brand-black shadow-hard-sm"
                    : "bg-card-white text-brand-black hover:bg-cream-alt"
                }`}
              >
                All Items
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedFilter(
                    selectedFilter === "bestseller" ? "all" : "bestseller"
                  )
                }
                className={`flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border-2 border-brand-black ${
                  selectedFilter === "bestseller"
                    ? "bg-brand-orange text-brand-black shadow-hard-sm"
                    : "bg-card-white text-brand-black hover:bg-cream-alt"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Bestsellers</span>
              </button>
            </div>
          </div>
        </section>

        {/* ==================== STICKY CATEGORY TABS (NO ITEM COUNTS, NO OVERLAP) ==================== */}
        <div className="sticky top-20 z-30 bg-cream-alt border-y-2 border-brand-black">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-[family-name:var(--font-chunky)] uppercase tracking-wider whitespace-nowrap transition-all duration-150 cursor-pointer border-2 border-brand-black ${
                  activeCategory === "all"
                    ? "bg-brand-orange text-brand-black shadow-hard-sm"
                    : "bg-card-white text-brand-black hover:bg-cream-bg"
                }`}
              >
                <span>ALL CATEGORIES</span>
              </button>

              {CATEGORY_TABS.map((tab) => {
                const isSelected = activeCategory === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-[family-name:var(--font-chunky)] uppercase tracking-wider whitespace-nowrap transition-all duration-150 cursor-pointer border-2 border-brand-black ${
                      isSelected
                        ? "bg-brand-orange text-brand-black shadow-hard-sm"
                        : "bg-card-white text-brand-black hover:bg-cream-bg"
                    }`}
                  >
                    <span>{getCategoryIcon(tab.iconName)}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== MENU ITEMS GRID (3 COLS DESKTOP, 2 TABLET, 1 MOBILE) ==================== */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-card-white border-2 border-brand-black rounded-3xl p-8 shadow-hard max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-cream-alt border-2 border-brand-black flex items-center justify-center mx-auto text-brand-black">
                <Search className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-[family-name:var(--font-chunky)] text-3xl text-brand-black tracking-wide uppercase">
                NO DISHES MATCH
              </h3>
              <p className="text-sm text-text-muted max-w-sm mx-auto font-medium font-[family-name:var(--font-body)]">
                No matching dishes found for &ldquo;{searchQuery}&rdquo;. Try
                another keyword or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                  setActiveCategory("all");
                }}
                className="px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onSelect={handleOpenModal}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <CartDrawer />
      <MobileCartBar />
      <ItemModal
        item={modalItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
