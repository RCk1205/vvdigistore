"use client";

import Navbar from "../../components/Navbar";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-12">
            Admin Dashboard
          </h1>

          <div className="grid md:grid-cols-2 gap-8">

            <Link
              href="/admin/products"
              className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition"
            >
              <h2 className="text-3xl mb-4">
                Products
              </h2>

              <p className="text-zinc-400">
                Add, edit and delete products.
              </p>
            </Link>

            <Link
              href="/admin/orders"
              className="bg-zinc-900 p-10 rounded-3xl hover:bg-zinc-800 transition"
            >
              <h2 className="text-3xl mb-4">
                Orders
              </h2>

              <p className="text-zinc-400">
                View and manage customer orders.
              </p>
            </Link>

          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-12 bg-red-600 px-6 py-3 rounded-xl"
          >
            Logout
          </button>

        </div>
      </main>
    </>
  );
}