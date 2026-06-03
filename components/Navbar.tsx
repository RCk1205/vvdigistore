"use client";

import Link from "next/link";
import { ShoppingBag, Search, User } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-4xl text-yellow-500 tracking-wide"
        >
          LUXURY
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-white">

          <li>
            <Link
              href="/"
              className="transition-all duration-300 hover:text-yellow-500 hover:-translate-y-1"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="transition-all duration-300 hover:text-yellow-500 hover:-translate-y-1"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              className="transition-all duration-300 hover:text-yellow-500 hover:-translate-y-1"
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              href="/gallery"
              className="transition-all duration-300 hover:text-yellow-500 hover:-translate-y-1"
            >
              Gallery
            </Link>
          </li>

          <li>
            <Link
              href="/blog"
              className="transition-all duration-300 hover:text-yellow-500 hover:-translate-y-1"
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="transition-all duration-300 hover:text-yellow-500 hover:-translate-y-1"
            >
              Contact
            </Link>
          </li>

        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4 text-white">

          <Link href="/products">
  <Search
    size={20}
    className="cursor-pointer hover:text-yellow-500 transition-colors"
  />
</Link>

          <Link href="/cart" className="relative">
            <ShoppingBag
              size={20}
              className="cursor-pointer hover:text-yellow-500 transition-colors"
            />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <User
            size={20}
            className="cursor-pointer hover:text-yellow-500 transition-colors"
          />

        </div>

      </div>
    </nav>
  );
}