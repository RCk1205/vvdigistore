"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center pt-36 overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-yellow-500 mb-6 tracking-[0.35em] uppercase text-sm">
            PREMIUM COLLECTION
          </p>

          <h1 className="font-serif text-6xl md:text-8xl leading-none mb-6">
            Crafted For
            <span className="text-yellow-500"> Excellence</span>
          </h1>

          <p className="text-zinc-400 mb-10 text-lg max-w-xl leading-relaxed">
            Discover luxury products designed with elegance,
            precision and timeless craftsmanship.
          </p>

          <Link
            href="/products"
            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Explore Collection
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>

          <div className="relative bg-zinc-900/80 backdrop-blur-md p-4 rounded-[40px] border border-yellow-500/20 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200"
              alt="Luxury Product"
              className="rounded-[30px] w-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
} 