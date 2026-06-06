"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white pt-40 px-6">
          <div className="max-w-7xl mx-auto">
            Loading products...
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-7xl mx-auto">

          <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
            Products
          </p>

          <h1 className="font-serif text-6xl mb-10">
            Collection
          </h1>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500"
          />

          <div className="flex flex-wrap gap-3 mb-10">
            {[
              "All",
              "Watches",
              "Bags",
              "Perfumes",
              "Accessories",
              "Jewelry",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-xl transition-all ${
                  category === cat
                    ? "bg-yellow-500 text-black"
                    : "bg-zinc-900 text-white border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-xl">
                No products found.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-2xl font-semibold mb-2">
                      {product.name}
                    </h3>

                    <p className="text-yellow-500 mb-2">
  ₹{product.price}
</p>

<p className="text-zinc-400 text-sm">
  {product.category}
</p>

<p
  className={`text-sm font-semibold mt-2 mb-4 ${
    (product.stock ?? 0) <= 0
      ? "text-red-500"
      : (product.stock ?? 0) <= 10
      ? "text-orange-400"
      : "text-green-500"
  }`}
>
  {(product.stock ?? 0) <= 0
    ? "Out Of Stock"
    : (product.stock ?? 0) <= 10
    ? `Only ${product.stock} Left`
    : "In Stock"}
</p>

                    <Link
                      href={`/products/${product.id}`}
                      className="inline-block bg-yellow-500 text-black px-5 py-2 rounded-lg"
                    >
                      View Product
                    </Link>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </main>
    </>
  );
}