import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import AuthProvider from "../components/AuthProvider";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://vvdigistore.vercel.app"
  ),

  title: {
    default: "VVDigiStore",
    template: "%s | VVDigiStore",
  },

  description:
    "Premium ecommerce platform featuring luxury products, secure payments, inventory management, coupons, and fast checkout.",

  keywords: [
    "luxury store",
    "ecommerce",
    "online shopping",
    "premium products",
    "watches",
    "accessories",
    "bags",
    "perfumes",
    "VVDigiStore",
  ],

  authors: [
    {
      name: "VVDigiStore",
    },
  ],

  creator: "VVDigiStore",

  openGraph: {
    title: "VVDigiStore",
    description:
      "Luxury ecommerce experience with premium products and secure checkout.",
    url: "https://vvdigistore.vercel.app",
    siteName: "VVDigiStore",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VVDigiStore",
    description:
      "Luxury ecommerce experience with premium products and secure checkout.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}