"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  hasHydrated: boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: ["piz-bonfire-special", "bgr-zinger"],
      hasHydrated: false,
      toggleFavorite: (id: string) => {
        const current = get().favorites;
        if (current.includes(id)) {
          set({ favorites: current.filter((item) => item !== id) });
        } else {
          set({ favorites: [...current, id] });
        }
      },
      isFavorite: (id: string) => get().favorites.includes(id),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: "bonfire_favorites_v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
