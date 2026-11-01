import type { Metadata, Viewport } from "next";
import { Kaushan_Script, Archivo_Black, DM_Sans } from "next/font/google";
import "./globals.css";

const kaushanScript = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brush",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-chunky",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bonfire Pizza Kitchen | Fired Up & Served Hot",
  description:
    "Hand-tossed wood-fired pizzas, crispy smashed zingers, and sizzling wings fired up at 900°F. DHA Lahore.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8EDD6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${kaushanScript.variable} ${archivoBlack.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-bg text-brand-black selection:bg-brand-orange selection:text-brand-black overflow-x-hidden touch-manipulation">
        {children}
      </body>
    </html>
  );
}
