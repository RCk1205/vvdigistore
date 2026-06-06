import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-serif text-4xl text-yellow-500 mb-6">
          VV Digi Store
        </h2>

        <p className="text-zinc-400 max-w-xl mb-10">
          Crafted for those who appreciate exceptional quality,
          timeless elegance and modern sophistication.
        </p>

        <div className="flex flex-wrap gap-8 text-zinc-400">

          <Link
            href="/about"
            className="hover:text-yellow-500 transition"
          >
            About
          </Link>

          <Link
            href="/products"
            className="hover:text-yellow-500 transition"
          >
            Products
          </Link>

          <Link
            href="/gallery"
            className="hover:text-yellow-500 transition"
          >
            Gallery
          </Link>

          <Link
            href="/blog"
            className="hover:text-yellow-500 transition"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="hover:text-yellow-500 transition"
          >
            Contact
          </Link>

        </div>

        <div className="mt-12 text-zinc-600">
          © 2026 VV Digi Store. All rights reserved.
        </div>

      </div>
    </footer>
  );
}