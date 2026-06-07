"use client";

import { useWishlist } from "../context/WishlistContext";

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

export default function AddToWishlistButton({
  product,
}: Props) {
  const { addToWishlist } =
    useWishlist();

  return (
    <button
      onClick={() => {
        addToWishlist(product);

        alert(
          "Added to wishlist!"
        );
      }}
      className="bg-zinc-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-zinc-700 transition"
    >
      Add To Wishlist
    </button>
  );
}