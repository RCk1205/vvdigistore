"use client";

import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        item.price.toString().replace(/[$,]/g, "")
      ) *
        item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <p className="text-zinc-400">
              Your cart is empty.
            </p>
          ) : (
            <>
              <div className="grid gap-6">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900 rounded-2xl p-6 flex items-center gap-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />

                    <div className="flex-1">

                      <h2 className="text-2xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="text-yellow-500 mt-2">
                        {item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-4">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="bg-zinc-800 px-3 py-1 rounded"
                        >
                          -
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="bg-zinc-800 px-3 py-1 rounded"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>

                  </div>
                ))}

              </div>

              <div className="mt-10 border-t border-zinc-800 pt-8">

                <h2 className="text-3xl font-serif mb-4">
                  Order Summary
                </h2>

                <p className="text-zinc-400 mb-2">
                  Items: {cart.length}
                </p>

                <p className="text-yellow-500 text-2xl">
                  Total: ₹{total.toLocaleString()}
                  <Link
  href="/checkout"
  className="inline-block mt-6 bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold"
>
  Proceed to Checkout
</Link>
                </p>

              </div>
            </>
          )}

        </div>
      </main>
    </>
  );
}