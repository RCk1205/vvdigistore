"use client";

import Navbar from "../../components/Navbar";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } =
    useCart();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Wishlist
          </h1>

          {wishlist.length === 0 ? (
            <p className="text-zinc-400">
              Your wishlist is empty.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">

              {wishlist.map(
                (item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900 rounded-3xl overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-6">

                      <h2 className="text-2xl mb-2">
                        {item.name}
                      </h2>

                      <p className="text-yellow-500 mb-6">
                        ₹{item.price}
                      </p>

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            addToCart({
                              ...item,
                              quantity: 1,
                            })
                          }
                          className="bg-yellow-500 text-black px-4 py-2 rounded-xl"
                        >
                          Move To Cart
                        </button>

                        <button
                          onClick={() =>
                            removeFromWishlist(
                              item.id
                            )
                          }
                          className="bg-red-600 px-4 py-2 rounded-xl"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </main>
    </>
  );
}