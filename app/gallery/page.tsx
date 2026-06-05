"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

type GalleryItem = {
  _id: string;
  id: number;
  title: string;
  category: string;
  image: string;
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<
    GalleryItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const response =
        await fetch("/api/gallery");

      const data =
        await response.json();

      setGallery(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Homepage Hero",
    "Gallery Showcase",
    "Customer Favorites",
    "Brand Story",
    "Blog Cover",
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40">

        {/* Hero */}
        <section className="px-6">

          <div className="max-w-7xl mx-auto text-center">

            <p className="text-yellow-500 uppercase tracking-[0.35em] mb-4">
              Gallery
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-8">
              Visual
              <span className="text-yellow-500">
                {" "}
                Experience
              </span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore our collection through
              carefully curated visuals,
              product highlights, customer
              favorites and brand stories.
            </p>

          </div>

        </section>

        {loading ? (
          <div className="text-center py-32 text-zinc-400">
            Loading Gallery...
          </div>
        ) : (
          categories.map(
            (category) => {
              const images =
                gallery.filter(
                  (item) =>
                    item.category ===
                    category
                );

              if (
                images.length === 0
              )
                return null;

              return (
                <section
                  key={category}
                  className="px-6 py-24"
                >

                  <div className="max-w-7xl mx-auto">

                    <div className="mb-12">

                      <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                        Collection
                      </p>

                      <h2 className="font-serif text-4xl md:text-5xl">
                        {category}
                      </h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                      {images.map(
                        (item) => (
                          <div
                            key={
                              item.id
                            }
                            className="group overflow-hidden rounded-[30px] bg-zinc-950 border border-zinc-800"
                          >

                            <div className="overflow-hidden">

                              <img
                                src={
                                  item.image
                                }
                                alt={
                                  item.title
                                }
                                className="w-full h-[450px] object-cover transition duration-700 group-hover:scale-110"
                              />

                            </div>

                            <div className="p-6">

                              <h3 className="font-serif text-2xl mb-2">
                                {
                                  item.title
                                }
                              </h3>

                              <p className="text-zinc-400">
                                {
                                  item.category
                                }
                              </p>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </section>
              );
            }
          )
        )}

        {/* Empty State */}
        {!loading &&
          gallery.length === 0 && (
            <section className="py-32">

              <div className="text-center">

                <h2 className="font-serif text-4xl mb-4">
                  Gallery Empty
                </h2>

                <p className="text-zinc-400">
                  Upload images from
                  Admin → Gallery to
                  populate this page.
                </p>

              </div>

            </section>
          )}

      </main>

      <Footer />
    </>
  );
}