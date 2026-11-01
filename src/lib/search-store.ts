"use client";

import { create } from "zustand";

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

// Shared between the navbar search and the home page results (not persisted)
export const useSearchStore = create<SearchState>()((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
  clearQuery: () => set({ query: "" }),
}));
