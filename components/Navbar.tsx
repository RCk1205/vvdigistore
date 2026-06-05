"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  User,
  LogOut,
  Menu,
  X,
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

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          href="/"
          className="font-serif text-3xl md:text-4xl text-yellow-500 tracking-wide"
        >
          VVDigiStore
        </Link>

        {/* Desktop Menu */}
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
              <span className="hidden lg:block text-sm text-yellow-500">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
          >
            {mobileMenuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-t border-white/10">

          <div className="flex flex-col px-6 py-6 space-y-5 text-white">

            <Link
              href="/"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              About
            </Link>

            <Link
              href="/products"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Products
            </Link>

            <Link
              href="/gallery"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Gallery
            </Link>

            <Link
              href="/blog"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Contact
            </Link>

            <Link
              href="/cart"
              onClick={() =>
                setMobileMenuOpen(false)
              }
            >
              Cart ({cart.length})
            </Link>

            {!session ? (
              <Link
                href="/login"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() =>
                  signOut({
                    callbackUrl:
                      "/login",
                  })
                }
                className="text-left text-red-400"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}