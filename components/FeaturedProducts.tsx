"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          Loading products...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-yellow-500 mt-2">
                    ₹{product.price}
                  </p>

                  <span className="inline-block mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
                    View Details
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}