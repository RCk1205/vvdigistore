"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">

          <h1 className="font-serif text-6xl mb-6 text-yellow-500">
            Order Confirmed
          </h1>

          <p className="text-zinc-400 mb-6">
            Thank you for your purchase.
          </p>

          <div className="bg-zinc-900 p-6 rounded-2xl mb-8">
            <p className="text-zinc-400 mb-2">
              Tracking ID
            </p>

            <p className="text-lg break-all text-yellow-500">
              {orderId}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">

            <Link
              href="/products"
              className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold"
            >
              Continue Shopping
            </Link>

            <Link
              href={`/track-order?orderId=${orderId}`}
              className="bg-zinc-800 px-8 py-4 rounded-xl"
            >
              Track Order
            </Link>

          </div>

        </div>
      </main>
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}