export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-serif text-4xl text-yellow-500 mb-6">
          LUXURY
        </h2>

        <p className="text-zinc-400 max-w-xl mb-10">
          Crafted for those who appreciate exceptional quality,
          timeless elegance and modern sophistication.
        </p>

        <div className="flex flex-wrap gap-8 text-zinc-400">
          <a href="#">About</a>
          <a href="#">Products</a>
          <a href="#">Gallery</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>

        <div className="mt-12 text-zinc-600">
          © 2026 Luxury Store. All rights reserved.
        </div>

      </div>
    </footer>
  );
}