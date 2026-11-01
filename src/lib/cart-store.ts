"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MenuItem, PizzaSize } from "@/data/menu";
import { RESTAURANT_CONFIG } from "./config";

export interface CartCustomization {
  size?: PizzaSize;
  crust?: { id: string; name: string; priceDelta: number };
  toppings?: Array<{ id: string; name: string; price: number }>;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  size?: PizzaSize;
  crustName?: string;
  crustPriceDelta: number;
  toppings: Array<{ id: string; name: string; price: number }>;
  specialInstructions: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface PlacedOrder {
  orderNumber: string;
  orderType: "delivery" | "takeaway";
  items: CartItem[];
  customer: {
    fullName: string;
    phone: string;
    address?: string;
    area?: string;
    pickupSlot?: string;
    notes?: string;
  };
  paymentMethod: "card" | "cash";
  promoCode?: string;
  subtotal: number;
  discount: number;
  taxAmount: number;
  deliveryFee: number;
  grandTotal: number;
  createdAt: string;
  eta: string;
}

interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;
  paymentMethod: "card" | "cash";
  orderType: "delivery" | "takeaway";
  deliveryArea: string;
  deliveryAddress: string;
  promoCode: string | null;
  promoDiscountPercent: number;
  lastPlacedOrder: PlacedOrder | null;
  hasHydrated: boolean;
  
  // Actions
  addItem: (
    item: MenuItem,
    customization: CartCustomization,
    quantity: number
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setPaymentMethod: (method: "card" | "cash") => void;
  setOrderType: (type: "delivery" | "takeaway") => void;
  setDeliveryLocation: (area: string, address: string) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  setLastPlacedOrder: (order: PlacedOrder) => void;
  setHasHydrated: (state: boolean) => void;

  // Computed values
  totalItemCount: () => number;
  subtotal: () => number;
  discount: () => number;
  discountedSubtotal: () => number;
  taxAmount: () => number;
  deliveryFee: () => number;
  grandTotal: () => number;
}

export function generateCartItemId(
  itemId: string,
  size?: string,
  crustId?: string,
  toppingIds: string[] = []
): string {
  const sortedToppings = [...toppingIds].sort().join("-");
  return `${itemId}_${size || "std"}_${crustId || "none"}_${sortedToppings}`;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      paymentMethod: "card",
      orderType: "delivery",
      deliveryArea: "DHA Phase 6, Lahore",
      deliveryAddress: "",
      promoCode: null,
      promoDiscountPercent: 0,
      lastPlacedOrder: null,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setOrderType: (type) => set({ orderType: type }),

      setDeliveryLocation: (area: string, address: string) =>
        set({ deliveryArea: area, deliveryAddress: address }),

      setPaymentMethod: (method) => set({ paymentMethod: method }),

      applyPromoCode: (code: string) => {
        const trimmed = code.trim().toUpperCase();
        if (trimmed === "BONFIRE10") {
          set({ promoCode: "BONFIRE10", promoDiscountPercent: 10 });
          return {
            success: true,
            message: "Promo code BONFIRE10 applied! 10% discount added.",
          };
        }
        return {
          success: false,
          message: "Invalid promo code. Try 'BONFIRE10' for 10% off.",
        };
      },

      removePromoCode: () => {
        set({ promoCode: null, promoDiscountPercent: 0 });
      },

      setLastPlacedOrder: (order) => {
        set({ lastPlacedOrder: order });
      },

      addItem: (item, custom, quantity) => {
        const sizePrice =
          custom.size && item.sizePrices && item.sizePrices[custom.size]
            ? item.sizePrices[custom.size]!
            : item.basePrice;

        const crustDelta = custom.crust ? custom.crust.priceDelta : 0;
        const toppingsCost = (custom.toppings || []).reduce(
          (sum, t) => sum + t.price,
          0
        );
        const unitPrice = sizePrice + crustDelta + toppingsCost;

        const toppingIds = (custom.toppings || []).map((t) => t.id);
        const cartItemId = generateCartItemId(
          item.id,
          custom.size,
          custom.crust?.id,
          toppingIds
        );

        const existingItem = get().items.find(
          (i) => i.cartItemId === cartItemId
        );

        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) =>
              i.cartItemId === cartItemId
                ? {
                    ...i,
                    quantity: i.quantity + quantity,
                    totalPrice: (i.quantity + quantity) * i.unitPrice,
                  }
                : i
            ),
            isOpen: true,
          }));
        } else {
          const newItem: CartItem = {
            cartItemId,
            menuItem: item,
            size: custom.size,
            crustName: custom.crust?.name,
            crustPriceDelta: crustDelta,
            toppings: custom.toppings || [],
            specialInstructions: custom.specialInstructions?.trim() || "",
            unitPrice,
            quantity,
            totalPrice: unitPrice * quantity,
          };

          set((state) => ({
            items: [...state.items, newItem],
            isOpen: true,
          }));
        }
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, delta) => {
        set((state) => {
          const target = state.items.find((i) => i.cartItemId === cartItemId);
          if (!target) return state;

          const newQty = target.quantity + delta;
          if (newQty <= 0) {
            return {
              items: state.items.filter((i) => i.cartItemId !== cartItemId),
            };
          }

          return {
            items: state.items.map((i) =>
              i.cartItemId === cartItemId
                ? {
                    ...i,
                    quantity: newQty,
                    totalPrice: newQty * i.unitPrice,
                  }
                : i
            ),
          };
        });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },

      discount: () => {
        const sub = get().subtotal();
        const percent = get().promoDiscountPercent;
        if (percent <= 0 || sub === 0) return 0;
        return Math.round((sub * percent) / 100);
      },

      discountedSubtotal: () => {
        return Math.max(0, get().subtotal() - get().discount());
      },

      taxAmount: () => {
        const taxable = get().discountedSubtotal();
        const rate =
          get().paymentMethod === "card"
            ? RESTAURANT_CONFIG.tax.cardPercent
            : RESTAURANT_CONFIG.tax.cashPercent;
        return Math.round((taxable * rate) / 100);
      },

      deliveryFee: () => {
        if (get().orderType === "takeaway") return 0;
        const sub = get().subtotal();
        if (sub === 0 || sub >= RESTAURANT_CONFIG.delivery.freeDeliveryThreshold) {
          return 0;
        }
        return RESTAURANT_CONFIG.delivery.standardFee;
      },

      grandTotal: () => {
        const taxable = get().discountedSubtotal();
        if (get().subtotal() === 0) return 0;
        return taxable + get().taxAmount() + get().deliveryFee();
      },
    }),
    {
      name: "bonfire-cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        items: state.items,
        paymentMethod: state.paymentMethod,
        orderType: state.orderType,
        promoCode: state.promoCode,
        promoDiscountPercent: state.promoDiscountPercent,
        lastPlacedOrder: state.lastPlacedOrder,
      }),
    }
  )
);
