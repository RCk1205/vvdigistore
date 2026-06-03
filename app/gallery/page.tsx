import Navbar from "../../components/Navbar";

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
            Gallery
          </p>

          <h1 className="font-serif text-6xl mb-10">
            Collection
          </h1>
        </div>
      </main>
    </>
  );
}