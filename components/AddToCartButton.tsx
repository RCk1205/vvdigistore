"use client";

import { useCart } from "../context/CartContext";

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart({
  ...product,
  quantity: 1,
});
        alert("Added to cart!");
      }}
      className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold"
    >
      Add to Cart
    </button>
  );
}