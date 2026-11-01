export type MenuCategoryType =
  | "deals"
  | "pizzas"
  | "burgers"
  | "sides"
  | "pasta"
  | "drinks"
  | "popular";

export type PizzaSize = "S" | "M" | "L" | "P";

export interface CrustOption {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategoryType;
  basePrice: number;
  sizePrices?: Partial<Record<PizzaSize, number>>;
  portion?: string;
  isVeg?: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  isSignature?: boolean;
  customizableCrust?: boolean;
  image?: string;
}

export interface CategoryTab {
  id: MenuCategoryType;
  label: string;
  iconName: string;
  badgeCount?: number;
}

export const CRUST_OPTIONS: CrustOption[] = [
  {
    id: "regular",
    name: "Classic Regular Crust",
    priceDelta: 0,
    description: "Traditional sourdough crust baked at 900°F",
  },
  {
    id: "stuffed",
    name: "Stuffed Crust",
    priceDelta: 230,
    description: "Chicken tikka & molten cheese rolled into the rim",
  },
  {
    id: "kabab",
    name: "Kabab Crust",
    priceDelta: 380,
    description: "Chicken tikka kabab roll embedded around the rim",
  },
  {
    id: "royal",
    name: "Royal Crust",
    priceDelta: 510,
    description: "Kabab roll with black olives, cheese & mayo sauce",
  },
];

export const EXTRA_TOPPINGS: ToppingOption[] = [
  { id: "extra-cheese", name: "Extra Mozzarella Cheese", price: 180 },
  { id: "mayo-sauce", name: "Special Mayo Dip Sauce", price: 80 },
  { id: "jalapenos", name: "Sliced Green Jalapenos", price: 60 },
  { id: "mushrooms", name: "Sautéed Button Mushrooms", price: 90 },
  { id: "black-olives", name: "Sliced Black Olives", price: 70 },
];

export const CATEGORY_TABS: CategoryTab[] = [
  { id: "deals", label: "Money Saving Deals", iconName: "Flame", badgeCount: 9 },
  { id: "pizzas", label: "Wood-Fired Pizzas", iconName: "Pizza", badgeCount: 16 },
  { id: "burgers", label: "Burgers & Rolls", iconName: "UtensilsCrossed", badgeCount: 4 },
  { id: "sides", label: "Appetizers & Wings", iconName: "Soup", badgeCount: 9 },
  { id: "pasta", label: "Oven Pastas", iconName: "UtensilsCrossed", badgeCount: 2 },
  { id: "drinks", label: "Soft Drinks", iconName: "Coffee", badgeCount: 5 },
];

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // 1. MONEY SAVING DEALS (from Screenshots 1 & 2)
  // ==========================================
  {
    id: "deal-1",
    name: "Deal-1",
    description: "1 Medium Kabab Crust Pizza + 2 Drinks 345ml",
    category: "deals",
    basePrice: 1500,
    image: "/images/menu/deal-1.jpg",
  },
  {
    id: "deal-2",
    name: "Deal-2",
    description: "2 Small Pizzas (Regular Flavours) + 2 Drinks 345ml",
    category: "deals",
    basePrice: 1200,
    image: "/images/menu/deal-2.jpg",
  },
  {
    id: "deal-3",
    name: "Deal-3",
    description: "1 Small Pizza (Regular Flavours) + 2 Chicken Burgers + 2 Drinks 345ml",
    category: "deals",
    basePrice: 1320,
    image: "/images/menu/deal-3.jpg",
  },
  {
    id: "deal-sunday-special",
    name: "Sunday Special",
    description: "1 Large Mayo Special Pizza + 10 HOT Wings + 1 Drink 1.5L",
    category: "deals",
    basePrice: 2680,
    image: "/images/menu/sunday-special.jpg",
  },
  {
    id: "deal-fine",
    name: "Fine Deal",
    description: "4 Small Pizzas (Regular Flavours) + 1 Drink 1.5 Liter",
    category: "deals",
    basePrice: 2370,
    image: "/images/menu/fine-deal.jpg",
  },
  {
    id: "deal-double-up",
    name: "Double Up",
    description: "2 Large Pizzas (Regular Flavours) + 1 Drink 1.5 Liter",
    category: "deals",
    basePrice: 3170,
    image: "/images/menu/double-up.jpg",
  },
  {
    id: "deal-do-it",
    name: "Do It Deal",
    description: "1 Medium Pizza (Regular Flavours) + 1 Special Platter + 1 Drink 1.5 Liter",
    category: "deals",
    basePrice: 2220,
    image: "/images/menu/do-it-deal.jpg",
  },
  {
    id: "deal-combo",
    name: "Combo Deal",
    description: "3 Zinger Burgers + 10 Hot Wings + 1 Large Fries + 1 Drink 1.5 Liter",
    category: "deals",
    basePrice: 2500,
    image: "/images/menu/combo-deal.jpg",
  },
  {
    id: "deal-family-fun",
    name: "Family Fun Deal",
    description: "2 Large Pizzas + 2 Zinger Burgers + 10 Hot Wings + 1 Family Fries + 1 Drink 1.5 Liter",
    category: "deals",
    basePrice: 5250,
    image: "/images/menu/family-fun-deal.jpg",
  },

  // ==========================================
  // 2. WOOD-FIRED PIZZAS (from Screenshots 3 & 4)
  // ==========================================
  // Signature & Square Pizzas
  {
    id: "piz-bonfire-signature",
    name: "Bonfire Signature Pizza",
    description: "Malai Boti Chicken, Cheese Mozzarella & Green olive, Capsicum with Mayo Sauce",
    category: "pizzas",
    basePrice: 1300,
    sizePrices: { M: 1300, L: 1800, P: 2990 },
    customizableCrust: true,
    image: "/images/menu/bonfire-signature-pizza.jpg",
  },
  {
    id: "piz-square-euro",
    name: "Square Euro Pizza",
    description: "Yummy chicken, Cheese Mozzarella & Green Chilli with Mustard Sauce",
    category: "pizzas",
    basePrice: 1860,
    sizePrices: { L: 1860 },
    customizableCrust: false,
    image: "/images/menu/square-euro-pizza.jpg",
  },

  // Premium Collection (M: 1300 | L: 1850 | P: 2860)
  {
    id: "piz-bonfire-special",
    name: "Bonfire Special",
    description: "Extra cheese, chicken, olives, mushroom, capsicum, chicken sausages & tasty pizza sauce with special sauce",
    category: "pizzas",
    basePrice: 1300,
    sizePrices: { M: 1300, L: 1850, P: 2860 },
    customizableCrust: true,
    image: "/images/menu/bonfire-special.jpg",
  },
  {
    id: "piz-malai-boti",
    name: "Malai Boti",
    description: "Extra malai chicken, cheese, hot sauce, milk cream with spicy tomato sauce",
    category: "pizzas",
    basePrice: 1300,
    sizePrices: { M: 1300, L: 1850, P: 2860 },
    customizableCrust: true,
    image: "/images/menu/malai-boti.jpg",
  },
  {
    id: "piz-best-bbq",
    name: "Best BBQ",
    description: "Extra special BBQ chicken & cheese, onion, hot chilli sauce with BBQ sauce",
    category: "pizzas",
    basePrice: 1300,
    sizePrices: { M: 1300, L: 1850, P: 2860 },
    customizableCrust: true,
    image: "/images/menu/best-bbq.jpg",
  },
  {
    id: "piz-mayo-special",
    name: "Mayo Special",
    description: "Extra special marinated chicken, cheese, black olives, mushrooms, onion with yummy special mayo sauce",
    category: "pizzas",
    basePrice: 1300,
    sizePrices: { M: 1300, L: 1850, P: 2860 },
    customizableCrust: true,
    image: "/images/menu/mayo-special.jpg",
  },
  {
    id: "piz-kabab-2-night",
    name: "Kabab 2 Night",
    description: "Extra chicken kabab, chicken, cheese, onion, capsicum with pizza sauce",
    category: "pizzas",
    basePrice: 1300,
    sizePrices: { M: 1300, L: 1850, P: 2860 },
    customizableCrust: true,
    image: "/images/menu/kabab-2-night.jpg",
  },

  // Special Crust Pizzas
  {
    id: "piz-stuffed-crust",
    name: "Stuffed Crust Pizza",
    description: "Yummy chicken tikka, cheese rolls & capsicum",
    category: "pizzas",
    basePrice: 1530,
    sizePrices: { M: 1530, L: 2260 },
    customizableCrust: false,
    image: "/images/menu/stuffed-crust.jpg",
  },
  {
    id: "piz-kabab-crust",
    name: "Kabab Crust Pizza",
    description: "Chicken tikka, kabab roll, cheese, green chilli, onion, capsicum with tasty sauce",
    category: "pizzas",
    basePrice: 1530,
    sizePrices: { M: 1530, L: 2260, P: 3240 },
    customizableCrust: false,
    image: "/images/menu/kabab-crust.jpg",
  },
  {
    id: "piz-royal-crust",
    name: "Royal Crust Pizza",
    description: "Chicken fajita, kabab roll, cheese, black olives, mushroom, onion, capsicum with mayo sauce",
    category: "pizzas",
    basePrice: 2360,
    sizePrices: { L: 2360, P: 3300 },
    customizableCrust: false,
    image: "/images/menu/royal-crust.jpg",
  },

  // Pizza Regular Collection (S: 600 | M: 1150 | L: 1600)
  {
    id: "piz-chicken-tikka",
    name: "Chicken Tikka",
    description: "Special tikka boti, cheese, onion with hot chilli tomato sauce",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/chicken-tikka.jpg",
  },
  {
    id: "piz-chicken-fajita",
    name: "Chicken Fajita",
    description: "A great aroma of Mexican with fajita chicken, cheese, capsicum, onion with pizza sauce",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/chicken-fajita.jpg",
  },
  {
    id: "piz-chicken-supreme",
    name: "Chicken Supreme",
    description: "Spicy smoked chicken, cheese, capsicum, onion, olives, mushroom with pizza sauce",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/chicken-supreme.jpg",
  },
  {
    id: "piz-chicken-tandoori",
    name: "Chicken Tandoori",
    description: "Our traditionally developed tandoori chicken, cheese, jalapeno, onion with tandoori sauce",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/chicken-tandoori.jpg",
  },
  {
    id: "piz-hot-n-spicy",
    name: "Hot N Spicy",
    description: "Spicy chicken, cheese, capsicum, jalapeno with spicy pizza sauce",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/hot-n-spicy.jpg",
  },
  {
    id: "piz-veggie-max",
    name: "Veggie Max",
    description: "Cheese, black olives, mushroom, onion, capsicum, jalapeno and fresh veggies with tasty sauce",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/veggie-max.jpg",
  },
  {
    id: "piz-pickle-punjabi",
    name: "Pickle Punjabi",
    description: "Extra yummy chicken & mozzarella cheese, mushroom, olives, capsicum, onion, pickle & achar pizza sauce",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/pickle-punjabi.jpg",
  },
  {
    id: "piz-cheezy-cheese",
    name: "Cheezy Cheese",
    description: "Lot of mozzarella cheese — a real treat for cheese lovers",
    category: "pizzas",
    basePrice: 600,
    sizePrices: { S: 600, M: 1150, L: 1600 },
    customizableCrust: true,
    image: "/images/menu/cheezy-cheese.jpg",
  },

  // ==========================================
  // 3. BURGERS & ROLLS (from Screenshots 1 & 5)
  // ==========================================
  {
    id: "bur-zinger",
    name: "Zinger Burger",
    description: "Boneless Thigh Chicken, Fresh Salad & Mayo Sauce",
    category: "burgers",
    basePrice: 450,
    image: "/images/menu/zinger-burger.jpg",
  },
  {
    id: "bur-chicken",
    name: "Chicken Burger",
    description: "Chicken Crispy Patty, Fresh Salad & Mayo Sauce",
    category: "burgers",
    basePrice: 350,
    image: "/images/menu/chicken-burger.jpg",
  },
  {
    id: "bur-chicken-sandwich",
    name: "Chicken Sandwich",
    description: "Yummy Chicken, Cheese, Capsicum, Onion, Mayodip Sauce & Bonfire Special Sauce with French Fries",
    category: "burgers",
    basePrice: 820,
    image: "/images/menu/chicken-sandwich.jpg",
  },
  {
    id: "bur-kabab-paratha-roll",
    name: "Kabab Paratha Roll",
    description: "Juicy spicy chicken kabab, fresh salad and garlic mayo sauce",
    category: "burgers",
    basePrice: 390,
    image: "/images/menu/kabab-paratha-roll.jpg",
  },

  // ==========================================
  // 4. APPETIZERS & WINGS (from Screenshots 4 & 5)
  // ==========================================
  {
    id: "side-special-platter",
    name: "Special Platter",
    description: "Our specially 6 oven baked chicken wings and 4 spin rolls, lovely portion of french fries with special mayodip sauce",
    category: "sides",
    basePrice: 1200,
    image: "/images/menu/special-platter.jpg",
  },
  {
    id: "side-oven-baked-wings",
    name: "Oven Baked Wings",
    description: "Tender juicy chicken wings marinated in our special recipe with mayodip sauce (10 Pcs)",
    category: "sides",
    basePrice: 800,
    portion: "10 Pcs",
    image: "/images/menu/oven-baked-wings.jpg",
  },
  {
    id: "side-bbq-wings",
    name: "BBQ Wings",
    description: "Juicy chicken wings marinated in our special recipe with BBQ sauce (10 Pcs)",
    category: "sides",
    basePrice: 800,
    portion: "10 Pcs",
    image: "/images/menu/bbq-wings.jpg",
  },
  {
    id: "side-hot-wings",
    name: "Hot Wings",
    description: "Chicken wings marinated in our special recipe and fried (10 Pcs)",
    category: "sides",
    basePrice: 800,
    portion: "10 Pcs",
    image: "/images/menu/hot-wings.jpg",
  },
  {
    id: "side-chicken-spin-rolls",
    name: "Chicken Spin Rolls",
    description: "Juicy spicy chicken, cheese, olives & special sauce with mayodip sauce (4 Pieces)",
    category: "sides",
    basePrice: 800,
    portion: "4 Pieces",
    image: "/images/menu/chicken-spin-rolls.jpg",
  },
  {
    id: "side-french-fries",
    name: "French Fries",
    description: "French Fries Perfectly Making like home Crispy and Tangy",
    category: "sides",
    basePrice: 400,
    portion: "Large Size",
    image: "/images/menu/french-fries.jpg",
  },
  {
    id: "side-loaded-fries",
    name: "Loaded Fries",
    description: "Fries, Yummy chicken, cheese, capsicum, olive with special sauce",
    category: "sides",
    basePrice: 650,
    image: "/images/menu/loaded-fries.jpg",
  },
  {
    id: "side-nuggets",
    name: "Nuggets",
    description: "Chicken nuggets starter dish (10 Pcs)",
    category: "sides",
    basePrice: 700,
    portion: "10 Pcs",
    image: "/images/menu/nuggets.jpg",
  },
  {
    id: "side-mayo-dip-sauce",
    name: "Mayo / Dip Sauce",
    description: "Special house-made mayo / dip sauce",
    category: "sides",
    basePrice: 80,
    image: "/images/menu/mayo-dip-sauce.jpg",
  },

  // ==========================================
  // 5. OVEN PASTAS (from Screenshot 5)
  // ==========================================
  {
    id: "pas-crunchy",
    name: "Crunchy Pasta",
    description: "Generous arrangement of yummy chicken, macaroni pasta in white sauce topped with crispy chicken & cheese",
    category: "pasta",
    basePrice: 880,
    image: "/images/menu/crunchy-pasta.jpg",
  },
  {
    id: "pas-macaroni",
    name: "Macaroni Pasta",
    description: "Generous arrangement of yummy chicken, macaroni, black olive, capsicum with special sauce topped with cheddar & mozzarella",
    category: "pasta",
    basePrice: 800,
    image: "/images/menu/macaroni-pasta.jpg",
  },

  // ==========================================
  // 6. SOFT DRINKS & JUICE (from Screenshot 2)
  // ==========================================
  {
    id: "drk-1500ml",
    name: "1.5 Liter Drink",
    description: "Chilled 1.5 Liter soft drink bottle",
    category: "drinks",
    basePrice: 220,
    image: "/images/menu/soft-drinks.jpg",
  },
  {
    id: "drk-345ml",
    name: "345ml Drink",
    description: "Chilled 345ml drink bottle",
    category: "drinks",
    basePrice: 90,
    image: "/images/menu/soft-drinks.jpg",
  },
  {
    id: "drk-water-can",
    name: "Water Can",
    description: "Pure mineral water can",
    category: "drinks",
    basePrice: 80,
    image: "/images/menu/water-and-juice.jpg",
  },
  {
    id: "drk-slice-juice",
    name: "Slice Juice",
    description: "Refreshing mango slice juice",
    category: "drinks",
    basePrice: 80,
    image: "/images/menu/water-and-juice.jpg",
  },
  {
    id: "drk-unlimited-refill",
    name: "Regular Drink (Unlimited Refills)",
    description: "Regular fountain drink with unlimited refills (* Dine in only)",
    category: "drinks",
    basePrice: 160,
    image: "/images/menu/unlimited-refill.jpg",
  },
];
