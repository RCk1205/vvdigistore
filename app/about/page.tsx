import Navbar from "../../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
            About Us
          </p>

          <h1 className="font-serif text-6xl mb-10">
            Our Story
          </h1>

          <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
            Luxury Store is dedicated to creating exceptional products that
            combine craftsmanship, innovation, and timeless elegance.
          </p>
        </div>
      </main>
    </>
  );
}