"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, X } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "@/data/menu";
import { MENU_SECTIONS } from "@/data/sections";
import { useSearchStore } from "@/lib/search-store";
import { Navbar } from "@/components/Navbar";
import { HeroBannerSlider } from "@/components/HeroBannerSlider";
import { CategoryBar } from "@/components/CategoryBar";
import { CategoryBanner } from "@/components/CategoryBanner";
import { ProductCardHorizontal } from "@/components/ProductCardHorizontal";
import { ItemModal } from "@/components/ItemModal";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileCartBar } from "@/components/MobileCartBar";
import { FloatingControls } from "@/components/FloatingControls";
import { Footer } from "@/components/Footer";

export default function SinglePageMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("deals");
  const { query: searchQuery, setQuery: setSearchQuery } = useSearchStore();
  const isSearching = searchQuery.trim().length > 0;
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToCategory = (sectionId: string) => {
    if (searchQuery) {
      setSearchQuery("");
    }
    setActiveCategory(sectionId);
    isManualScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 700);

    const target = document.getElementById(sectionId);
    if (target) {
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 640;
      const navOffset = isDesktop ? 132 : 112; // Navbar + CategoryBar + padding
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = MENU_SECTIONS.map((sec) => sec.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // Sections remount after a search is cleared, so observe them again
  }, [isSearching]);

  // Bring the results into view when a search starts from the navbar
  const resultsRef = useRef<HTMLDivElement>(null);
  const wasSearchingRef = useRef(false);
  useEffect(() => {
    if (isSearching && !wasSearchingRef.current && resultsRef.current) {
      const isDesktop = window.innerWidth >= 640;
      const navOffset = isDesktop ? 132 : 112; // Navbar + CategoryBar + padding
      const top =
        resultsRef.current.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    wasSearchingRef.current = isSearching;
  }, [isSearching]);

  // Smart relevance-ranked search results
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const queryTerms = query.split(/\s+/).filter(Boolean);

    const scored = MENU_ITEMS.map((item) => {
      const nameLower = item.name.toLowerCase();
      const descLower = item.description.toLowerCase();
      const catLower = item.category.toLowerCase();
      let score = 0;

      // Direct category alias match (e.g. "pizza" -> "pizzas")
      const isCategoryMatch =
        catLower === query ||
        catLower.includes(query) ||
        (query.startsWith("pizza") && catLower === "pizzas") ||
        (query.startsWith("burger") && catLower === "burgers") ||
        (query.startsWith("wing") && catLower === "wings") ||
        (query.startsWith("pasta") && catLower === "pastas") ||
        (query.startsWith("box") && catLower === "boxes") ||
        (query.startsWith("deal") && catLower === "deals") ||
        (query.startsWith("drink") && catLower === "drinks") ||
        (query.startsWith("dessert") && catLower === "desserts");

      if (isCategoryMatch) {
        score += 80;
      }

      // Name matches
      if (nameLower === query) {
        score += 100;
      } else if (nameLower.startsWith(query)) {
        score += 70;
      } else if (nameLower.includes(query)) {
        score += 50;
      }

      // Term by term matches
      queryTerms.forEach((term) => {
        if (nameLower.includes(term)) score += 25;
        if (catLower.includes(term)) score += 20;
        if (descLower.includes(term)) score += 5;
      });

      return { item, score };
    });

    return scored
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item);
  }, [searchQuery]);

  // Regular category mapping when not searching
  const sectionItemsMap = useMemo(() => {
    const map: Record<string, MenuItem[]> = {};
    MENU_SECTIONS.forEach((sec) => {
      map[sec.id] = MENU_ITEMS.filter((item) => item.category === sec.category);
    });
    return map;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg text-brand-black selection:bg-brand-orange selection:text-brand-black">
      {/* 1. Top Bar */}
      <Navbar />

      <main className="flex-1 pb-16">
        {/* 2. Hero Banner Slider */}
        <HeroBannerSlider />

        {/* 3. Sticky Category Bar directly under slider */}
        <CategoryBar
          activeCategory={activeCategory}
          onSelectCategory={scrollToCategory}
        />

        {/* 4. Menu Sections OR Search Results Grid */}
        <div
          ref={resultsRef}
          className="max-w-[1200px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8"
        >
          {searchQuery.trim().length > 0 ? (
            /* ==================== SEARCH RESULTS VIEW ==================== */
            searchResults.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-card-white border-2 border-brand-black rounded-3xl p-8 shadow-hard max-w-md mx-auto my-6">
                <div className="w-14 h-14 rounded-full bg-cream-alt border-2 border-brand-black flex items-center justify-center mx-auto text-brand-black">
                  <Search className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-[family-name:var(--font-chunky)] text-2xl text-brand-black uppercase">
                  No dishes found
                </h3>
                <p className="text-xs text-text-muted max-w-xs mx-auto font-medium font-[family-name:var(--font-body)]">
                  We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try another term or pick a category above.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard-sm font-[family-name:var(--font-chunky)] text-xs uppercase tracking-wider cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-6 pt-2">
                {/* Search Results Header */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-brand-black">
                  <div className="flex items-center gap-3">
                    <h2 className="font-[family-name:var(--font-chunky)] text-2xl sm:text-3xl text-brand-black uppercase tracking-tight">
                      Search Results
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-brand-orange text-brand-black border-2 border-brand-black text-xs font-[family-name:var(--font-chunky)] shadow-hard-sm">
                      {searchResults.length} {searchResults.length === 1 ? "dish" : "dishes"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-brand-black bg-card-white hover:bg-cream-alt text-xs font-bold font-[family-name:var(--font-chunky)] uppercase cursor-pointer shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Search</span>
                  </button>
                </div>

                {/* Direct Clean Grid of Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {searchResults.map((item) => (
                    <ProductCardHorizontal
                      key={item.id}
                      item={item}
                      onSelect={handleOpenModal}
                    />
                  ))}
                </div>
              </div>
            )
          ) : (
            /* ==================== NORMAL CATEGORY SECTIONS VIEW ==================== */
            <div className="space-y-8 sm:space-y-14 pt-2">
              {MENU_SECTIONS.map((sec) => {
                const items = sectionItemsMap[sec.id] || [];
                if (items.length === 0) return null;

                return (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-32 transition-all"
                  >
                    {/* Bold Section Heading */}
                    <div className="flex items-center justify-between pb-2 sm:pb-3 mb-3 sm:mb-4 border-b border-brand-black/20">
                      <div className="flex items-center gap-2.5">
                        <h2 className="font-[family-name:var(--font-chunky)] text-xl sm:text-3xl text-brand-black uppercase tracking-tight">
                          {sec.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-cream-alt border border-brand-black/30 text-[10px] sm:text-[11px] font-[family-name:var(--font-chunky)] text-brand-black">
                          {items.length}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-text-muted hidden sm:inline font-[family-name:var(--font-body)]">
                        {sec.subtitle}
                      </span>
                    </div>

                    {/* Promo Banner Image (Rounded 12px, designed placeholder) */}
                    <CategoryBanner section={sec} />

                    {/* Product Cards Grid: 3 columns desktop, 2 tablet, 1 mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                      {items.map((item) => (
                        <ProductCardHorizontal
                          key={item.id}
                          item={item}
                          onSelect={handleOpenModal}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Floating Back to top Button */}
      <FloatingControls />

      {/* Slide-over / Bottom sheet Cart Drawer */}
      <CartDrawer />

      {/* Mobile Sticky Floating Cart Bar */}
      <MobileCartBar />

      {/* Item Customization Modal (Bottom sheet on mobile, dialog on desktop) */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
