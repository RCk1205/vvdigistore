"use client";

import { useCart } from "../context/CartContext";

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
};

export default function AddToCartButton({
  product,
}: Props) {
  const { addToCart } = useCart();

  const isOutOfStock =
    product.stock <= 0;

  return (
    <button
      disabled={isOutOfStock}
      onClick={() => {
        if (isOutOfStock) return;

        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });

        alert("Added to cart!");
      }}
      className={`px-8 py-4 rounded-xl font-semibold transition ${
        isOutOfStock
          ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
          : "bg-yellow-500 text-black hover:bg-yellow-400"
      }`}
    >
      {isOutOfStock
        ? "Out Of Stock"
        : "Add To Cart"}
    </button>
  );
}