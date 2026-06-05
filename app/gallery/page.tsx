import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function GalleryPage() {
  const featuredCollection = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200",
  ];

  const customerFavorites = [
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
  ];

  const brandShowcase = [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40">

        {/* Hero Section */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto text-center">

            <p className="text-yellow-500 uppercase tracking-[0.35em] mb-4">
              Gallery
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-8">
              Visual
              <span className="text-yellow-500"> Experience</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection through carefully selected
              visuals that showcase quality, craftsmanship, elegance,
              and timeless design.
            </p>

          </div>
        </section>

        {/* Featured Collection */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">

            <div className="mb-12">

              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Featured Collection
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Signature Selection
              </h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {featuredCollection.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[30px] group"
                >
                  <img
                    src={image}
                    alt={`Featured Product ${index + 1}`}
                    className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Customer Favorites */}
        <section className="px-6 py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto">

            <div className="mb-12">

              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Customer Favorites
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Most Admired Products
              </h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {customerFavorites.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[30px] group"
                >
                  <img
                    src={image}
                    alt={`Favorite Product ${index + 1}`}
                    className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Brand Showcase */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">

              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Brand Showcase
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Lifestyle & Inspiration
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {brandShowcase.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[30px] group"
                >
                  <img
                    src={image}
                    alt={`Brand Showcase ${index + 1}`}
                    className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Closing Section */}
        <section className="px-6 pb-32">

          <div className="max-w-4xl mx-auto text-center">

            <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
              Excellence
            </p>

            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              Designed To Be Remembered
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Every image represents our commitment to quality,
              attention to detail, and the pursuit of products
              that deliver exceptional experiences.
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}