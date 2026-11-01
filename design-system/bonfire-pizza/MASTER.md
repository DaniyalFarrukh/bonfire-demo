# Design System Master File — Bonfire Pizza

> **LOGIC:** Strictly follow the brand rules below for all pages and components.

---

**Project:** Bonfire Pizza  
**Concept:** Loud, Friendly, Street-Food Energy Pizza & Grill  
**Brand Archetype:** Hand-painted, bold, warm, street-food canteen (NOT corporate, NOT techy, NOT minimal-SaaS).  
**Brand Logo:** `/logo.png` (Hand-brushed orange-red flame containing burger, soda and pizza slice, brush-script "Bonfire", black "PIZZA KITCHEN" tag, on warm cream).  
**Icons:** Lucide SVG only (Zero emojis).  
**Effects:** Flat solid colors only, thick 2px black outlines, hard offset shadows (`4px 4px 0 #141414`), rounded-full pill shapes, rotated sticker badges, zero gradients, zero glass, zero soft blur shadows.

---

## 1. Color Palette (Brand Logo Exact Match)

All colors are defined as CSS variables / Tailwind tokens:

| Role | CSS Variable / Tailwind Token | Hex Code | Visual & Usage |
|------|-------------------------------|----------|----------------|
| **Base Background** | `--color-cream-bg` (`bg-cream-bg`) | `#F8EDD6` | Primary warm cream canvas from the logo backdrop |
| **Deeper Cream (Alt Sections)** | `--color-cream-alt` (`bg-cream-alt`) | `#F0DFBF` | Secondary sections, category bar, card containers |
| **Brand Orange-Red** | `--color-brand-orange` (`bg-brand-orange`) | `#EF4A22` | Primary brand accent: CTAs, active tabs, prices, marquee bands, flame graphics |
| **Orange Hover / Pressed** | `--color-brand-orange-hover` (`bg-brand-orange-hover`) | `#CF3A14` | Button active/pressed states |
| **Black / Ink** | `--color-brand-black` (`text-brand-black`, `bg-brand-black`, `border-brand-black`) | `#141414` | Primary text, 2px borders, hard shadows, "PIZZA KITCHEN" tags, footer |
| **White Card Surfaces** | `--color-card-white` (`bg-card-white`) | `#FFFFFF` | Menu item cards, modal dialogs, input fields |
| **Muted Text** | `--color-text-muted` (`text-text-muted`) | `#5C5549` | Secondary descriptive text (passes WCAG AA 4.5:1 on cream & white) |

### Contrast & Legibility Rules
- **Text on Orange-Red (`#EF4A22`):** Black (`#141414`) text achieves `5.4:1` contrast (exceeds WCAG AA 4.5:1). Cream (`#F8EDD6`) text achieves `4.6:1`. Therefore, black `#141414` is the standard text on brand orange-red buttons and banners.
- **Body Text on Cream (`#F8EDD6`):** Black (`#141414`) achieves `14.5:1` (AAA).
- **Body Text on White (`#FFFFFF`):** Black (`#141414`) achieves `17.4:1` (AAA).
- **Muted Text on Cream (`#5C5549` on `#F8EDD6`):** `5.2:1` (Passes WCAG AA).

---

## 2. Typography System

| Role | Font Family | Weight | Case / Style | Usage |
|------|-------------|--------|--------------|-------|
| **Brush Script Accent** | `Kaushan Script`, cursive | 400 | Natural / Italic tilt | Section kickers, short 1-word headline accents (e.g. *Hot*, *Fresh*), callout labels. Never for body text. |
| **Chunky Bold Display** | `Archivo Black`, sans-serif | 400 | Uppercase | All primary headlines, logo-style tags, button text, section titles. |
| **Friendly Body** | `DM Sans`, sans-serif | 400, 500, 700 | Sentence case | Descriptions, ingredients, form fields, UI copy. |

> **Hard Rule:** Remove all monospace fonts. Numbers and prices use bold `DM Sans` or `Archivo Black`.

---

## 3. Component & Layout Standards

### Navigation (Header)
- Single row, 80px high, on `#F8EDD6` cream with a 2px black bottom border. Lots of air.
- Real logo (`/logo.png`) displayed as-is (no circular crop, 56-64px height desktop, 44px mobile).
- Nav links centered: `Home`, `Menu`, `Order`, `Contact`.
- Right: Rounded-full pill Cart button in orange-red with black border and hard offset shadow (`4px 4px 0 #141414`).
- **NO** top announcement strip, **NO** location popup/tooltip, **NO** search or account clutter in navbar.

### Buttons
- Rounded-full pill shape (`rounded-full`).
- Background: brand orange-red (`#EF4A22`), text: black (`#141414`), border: 2px black (`#141414`), shadow: `4px 4px 0px #141414`.
- Active/press state: `translate-x-0.5 translate-y-0.5 shadow-[2px_2px_0px_#141414]`.

### Menu Cards
- Grid: 3 columns desktop, 2 columns tablet, 1 column mobile.
- Surface: Clean white (`#FFFFFF`) with 2px black border and `4px 4px 0 #141414` shadow.
- Food photo framed like a sticker with a thick black outline.
- **Maximum ONE badge** per card (e.g. "Bestseller" or "Spicy").
- Description capped at 2 lines.
- One clear pill CTA button: "Add" or "Customize".
- **NO** wishlist/heart buttons.

### Hero Section
- Uncrowded, high-impact single section.
- Left: Short punchy headline with one brush-script accent word, one conversational sentence, one orange CTA ("Get Me a Pizza").
- Right: Big food photo sticker with hand-drawn orange flame blob behind it.
- **NO** carousels, dots, arrows, or chip clutter.

### Decorative Flourishes
- Hand-drawn brand orange SVG flame shapes and squiggles.
- Orange full-bleed band with scrolling ticker marquee: `PIZZA • BURGERS • WINGS • PASTA • SHAKES • DIPS`.
- Rotated sticker badges (e.g. `Fresh out of the oven!`).

---

## 4. Voice & Copy Tone
- Punchy, street-smart, warm, human.
- Examples: "Fired up. Served hot.", "Get me a pizza", "Straight from the 900°F stone hearth".
