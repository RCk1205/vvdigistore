"use client";

import { motion } from "framer-motion";

const images = [
  "https://picsum.photos/600/900?11",
  "https://picsum.photos/600/700?12",
  "https://picsum.photos/600/800?13",
  "https://picsum.photos/600/600?14",
  "https://picsum.photos/600/900?15",
  "https://picsum.photos/600/700?16",
];

export default function GalleryPreview() {
  return (
    <section className="bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-yellow-500 tracking-[0.35em] uppercase text-sm mb-4">
            Gallery
          </p>

          <h2 className="font-serif text-5xl md:text-6xl">
            Visual Experience
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">

          {images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="mb-6 overflow-hidden rounded-[30px] break-inside-avoid relative"
            >
              <img
                src={img}
                alt="Gallery"
                className="w-full rounded-[30px]"
              />

              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300"></div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}