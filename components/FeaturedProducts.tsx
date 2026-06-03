"use client";

import { motion } from "framer-motion";
import { products } from "../data/products";

export default function FeaturedProducts() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800"
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
                  {product.price}
                </p>

                <button className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}