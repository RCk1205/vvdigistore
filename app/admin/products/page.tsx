"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import ImageUpload from "../../../components/ImageUpload";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] =
    useState("Watches");

  const [image, setImage] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const loadProducts = async () => {
    const response =
      await fetch("/api/products");

    const data =
      await response.json();

    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmed) return;

    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadProducts();
  };

  const editProduct = (
    product: any
  ) => {
    setEditingId(product.id);

    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category);
    setImage(product.image);
  };

  const addProduct = async () => {
    if (
      !name ||
      !price ||
      !image
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    const productData = {
      id:
        editingId ??
        Date.now(),

      name,

      price: Number(price),

      category,

      image,
    };

    if (
      editingId !== null
    ) {
      await fetch(
        "/api/products",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            productData
          ),
        }
      );

      alert(
        "Product Updated"
      );

      setEditingId(null);
    } else {
      await fetch(
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            productData
          ),
        }
      );

      alert(
        "Product Added"
      );
    }

    setName("");
    setPrice("");
    setCategory(
      "Watches"
    );
    setImage("");

    loadProducts();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Products
          </h1>

          <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

            <h2 className="text-3xl mb-6">
              Add Product
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="bg-black p-4 rounded-xl"
              >
                <option>
                  Watches
                </option>
                <option>
                  Bags
                </option>
                <option>
                  Perfumes
                </option>
                <option>
                  Accessories
                </option>
                <option>
                  Jewelry
                </option>
              </select>

              <div className="space-y-2">

                <ImageUpload
                  setImage={
                    setImage
                  }
                />

                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                )}

              </div>

            </div>

            <button
              onClick={
                addProduct
              }
              className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
            >
              {editingId !== null
                ? "Save Changes"
                : "Add Product"}
            </button>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl mb-6">
              Products
            </h2>

            <div className="space-y-4">

              {products.map(
                (product) => (
                  <div
                    key={
                      product.id
                    }
                    className="flex justify-between items-center border-b border-zinc-800 pb-4"
                  >
                    <div>

                      <p className="font-semibold">
                        {
                          product.name
                        }
                      </p>

                      <p className="text-yellow-500">
                        ₹
                        {
                          product.price
                        }
                      </p>

                      <p className="text-zinc-400">
                        {
                          product.category
                        }
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          editProduct(
                            product
                          )
                        }
                        className="bg-blue-600 px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                        className="bg-red-600 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </main>
    </>
  );
}