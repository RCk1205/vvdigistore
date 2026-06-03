"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Search,
  User,
  LogOut,
} from "lucide-react";

import { useCart } from "../context/CartContext";

import {
  useSession,
  signOut,
} from "next-auth/react";

export default function Navbar() {
  const { cart } = useCart();

  const { data: session } =
    useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        <Link
          href="/"
          className="font-serif text-4xl text-yellow-500 tracking-wide"
        >
          LUXURY
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-white">

          <li>
            <Link href="/">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about">
              About
            </Link>
          </li>

          <li>
            <Link href="/products">
              Products
            </Link>
          </li>

          <li>
            <Link href="/gallery">
              Gallery
            </Link>
          </li>

          <li>
            <Link href="/blog">
              Blog
            </Link>
          </li>

          <li>
            <Link href="/contact">
              Contact
            </Link>
          </li>

        </ul>

        <div className="flex items-center gap-4 text-white">

          <Link href="/products">
            <Search
              size={20}
              className="cursor-pointer hover:text-yellow-500"
            />
          </Link>

          <Link
            href="/cart"
            className="relative"
          >
            <ShoppingBag
              size={20}
              className="cursor-pointer hover:text-yellow-500"
            />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {session ? (
            <>
              <span className="hidden md:block text-sm text-yellow-500">
                {session.user?.email}
              </span>

              <button
                onClick={() =>
                  signOut({
                    callbackUrl:
                      "/login",
                  })
                }
              >
                <LogOut
                  size={20}
                  className="cursor-pointer hover:text-red-500"
                />
              </button>
            </>
          ) : (
            <Link href="/login">
              <User
                size={20}
                className="cursor-pointer hover:text-yellow-500"
              />
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}