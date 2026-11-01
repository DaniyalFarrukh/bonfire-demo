"use client";

import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useSearchStore } from "@/lib/search-store";

const POPULAR_SEARCHES = ["Pizzas", "Deals", "Burgers", "Wings", "Pastas", "Drinks"];

interface NavbarSearchProps {
  autoFocus?: boolean;
  onClose?: () => void;
  className?: string;
}

export const NavbarSearch: React.FC<NavbarSearchProps> = ({
  autoFocus = false,
  onClose,
  className = "",
}) => {
  const { query, setQuery, clearQuery } = useSearchStore();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Results live on the home page; other pages jump there on submit
  const showResults = () => {
    if (pathname !== "/") router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    inputRef.current?.blur();
    showResults();
  };

  const handlePopular = (tag: string) => {
    setQuery(tag);
    inputRef.current?.blur();
    showResults();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Escape") return;
    if (query) {
      clearQuery();
    } else {
      inputRef.current?.blur();
      onClose?.();
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`relative w-full ${className}`}
    >
      <Search className="w-4 h-4 text-brand-black/60 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.5] pointer-events-none" />
      <input
        ref={inputRef}
        type="search"
        enterKeyHint="search"
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Search pizzas, burgers, wings..."
        aria-label="Search the menu"
        className="w-full h-10 pl-10 pr-9 rounded-full bg-card-white border border-brand-black/30 shadow-xs text-base lg:text-sm text-brand-black placeholder:text-text-muted outline-none font-medium font-[family-name:var(--font-body)] focus:border-brand-orange transition-colors [&::-webkit-search-cancel-button]:appearance-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            clearQuery();
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand-orange p-1 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Popular searches, shown while the empty input is focused */}
      {focused && !query.trim() && (
        <div className="absolute left-0 right-0 top-full mt-2 p-3 rounded-2xl bg-card-white border-2 border-brand-black shadow-hard-sm z-50">
          <p className="text-[10px] font-[family-name:var(--font-chunky)] text-text-muted uppercase tracking-wider mb-2">
            Popular searches
          </p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag}
                type="button"
                // Keep the input focused until the click lands
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handlePopular(tag)}
                className="px-3 py-1 rounded-full border border-brand-black/25 bg-card-white hover:bg-cream-alt text-brand-black text-xs font-[family-name:var(--font-chunky)] uppercase tracking-wider shadow-xs cursor-pointer transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};
