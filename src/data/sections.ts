export interface MenuSection {
  id: string;
  category: "deals" | "pizzas" | "burgers" | "sides" | "pasta" | "drinks";
  title: string;
  accentWord: string;
  subtitle: string;
  badge: string;
  bgColor: string;
  bannerImage: string;
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "deals",
    category: "deals",
    title: "MONEY SAVING DEALS",
    accentWord: "Saving Deals",
    subtitle: "Pizzas, zinger burgers, hot wings & 1.5L drinks bundled together with big savings.",
    badge: "OFFICIAL COMBOS",
    bgColor: "#23140C",
    bannerImage: "/images/menu/family-fun-deal.jpg",
  },
  {
    id: "pizzas",
    category: "pizzas",
    title: "WOOD-FIRED PIZZAS",
    accentWord: "Stone Fired",
    subtitle: "Signature Malai Boti, Premium Collection, Special Crusts & Regular Pizzas.",
    badge: "S • M • L • P SIZES",
    bgColor: "#2E1208",
    bannerImage: "/images/menu/bonfire-signature-pizza.jpg",
  },
  {
    id: "burgers",
    category: "burgers",
    title: "BURGERS & ROLLS",
    accentWord: "Crispy",
    subtitle: "Boneless thigh zinger, crispy chicken burger, club sandwich & kabab paratha roll.",
    badge: "HOT & FRESH",
    bgColor: "#27170E",
    bannerImage: "/images/menu/zinger-burger.jpg",
  },
  {
    id: "sides",
    category: "sides",
    title: "APPETIZERS & WINGS",
    accentWord: "Sizzlers",
    subtitle: "Oven baked wings, BBQ wings, hot wings, spin rolls, platters & loaded fries.",
    badge: "10 PCS / PLATTERS",
    bgColor: "#2A1509",
    bannerImage: "/images/menu/special-platter.jpg",
  },
  {
    id: "pasta",
    category: "pasta",
    title: "OVEN PASTAS",
    accentWord: "Cheesy",
    subtitle: "Crunchy chicken pasta in white sauce and macaroni with cheddar & mozzarella.",
    badge: "OVEN BAKED",
    bgColor: "#221107",
    bannerImage: "/images/menu/crunchy-pasta.jpg",
  },
  {
    id: "drinks",
    category: "drinks",
    title: "SOFT DRINKS & JUICES",
    accentWord: "Chilled",
    subtitle: "1.5L and 345ml soft drinks, water cans, slice juice and garlic mayo dip sauce.",
    badge: "ICE COLD",
    bgColor: "#1B0E07",
    bannerImage: "/images/menu/soft-drinks.jpg",
  },
];
