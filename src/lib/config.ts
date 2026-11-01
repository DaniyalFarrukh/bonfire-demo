export interface RestaurantConfig {
  name: string;
  tagline: string;
  subTagline: string;
  description: string;
  currency: string;
  currencySymbol: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    country: string;
    full: string;
    mapsUrl: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
    ramadan?: string;
  };
  delivery: {
    standardFee: number;
    freeDeliveryThreshold: number;
    estimatedMinutes: string;
    minOrderAmount: number;
  };
  tax: {
    cardPercent: number;
    cashPercent: number;
    notice: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  navLinks: Array<{ label: string; href: string }>;
}

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "Bonfire Pizza",
  tagline: "Wood-Fired & Ember Craft Pizza Kitchen",
  subTagline: "Baked at 900°F over seasoned hardwood embers",
  description:
    "Experience blistered thin crusts, signature stuffed roll rims, slow-marinated chicken tikka, and bubbling mozzarella baked directly on stone.",
  currency: "PKR",
  currencySymbol: "Rs.",
  phone: "+923001234567",
  phoneDisplay: "+92 300 1234567",
  whatsapp: "923001234567",
  whatsappDisplay: "+92 300 1234567",
  email: "orders@bonfirepizza.pk",
  address: {
    street: "Plot 42-C, Main Commercial Boulevard",
    area: "Phase 6, DHA",
    city: "Lahore",
    country: "Pakistan",
    full: "Plot 42-C, Main Commercial Boulevard, Phase 6, DHA, Lahore",
    mapsUrl: "https://maps.google.com/?q=Lahore+Pakistan",
  },
  hours: {
    weekdays: "12:00 PM – 02:00 AM",
    weekends: "12:00 PM – 03:00 AM",
  },
  delivery: {
    standardFee: 150,
    freeDeliveryThreshold: 2500,
    estimatedMinutes: "35–45 min",
    minOrderAmount: 500,
  },
  tax: {
    cardPercent: 8,
    cashPercent: 16,
    notice: "*8% Tax on Card, 16% Tax on cash will be charged accordingly",
  },
  socials: {
    instagram: "https://instagram.com/bonfirepizza",
    facebook: "https://facebook.com/bonfirepizzapk",
    tiktok: "https://tiktok.com/@bonfirepizza",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Order", href: "/order" },
    { label: "Contact", href: "/contact" },
  ],
};

export function formatPrice(amount: number): string {
  return `${RESTAURANT_CONFIG.currencySymbol} ${amount.toLocaleString()}`;
}

export function calculateOrderTotals(
  subtotal: number,
  paymentMethod: "card" | "cash"
) {
  const taxRate =
    paymentMethod === "card"
      ? RESTAURANT_CONFIG.tax.cardPercent
      : RESTAURANT_CONFIG.tax.cashPercent;

  const taxAmount = Math.round((subtotal * taxRate) / 100);
  const deliveryFee =
    subtotal >= RESTAURANT_CONFIG.delivery.freeDeliveryThreshold || subtotal === 0
      ? 0
      : RESTAURANT_CONFIG.delivery.standardFee;

  const grandTotal = subtotal + taxAmount + deliveryFee;

  return {
    subtotal,
    taxRate,
    taxAmount,
    deliveryFee,
    grandTotal,
    freeDeliveryRemaining: Math.max(
      0,
      RESTAURANT_CONFIG.delivery.freeDeliveryThreshold - subtotal
    ),
  };
}

