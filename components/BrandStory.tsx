"use client";

import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200"
            alt="Luxury Brand"
            className="rounded-[30px] shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-yellow-500 tracking-[0.35em] uppercase text-sm mb-4">
            Our Story
          </p>

          <h2 className="font-serif text-5xl md:text-6xl mb-8">
            Timeless Luxury,
            <span className="text-yellow-500"> Modern Vision</span>
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            We create exceptional products for individuals who value
            craftsmanship, elegance, and attention to detail.
          </p>

          <p className="text-zinc-500 leading-relaxed">
            Every piece is designed to blend modern innovation with
            timeless aesthetics, creating experiences that endure for
            generations.
          </p>
        </motion.div>

      </div>
    </section>
  );
}