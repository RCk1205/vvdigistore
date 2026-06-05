"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import ImageUpload from "../../../components/ImageUpload";

export default function GalleryAdminPage() {
  const [gallery, setGallery] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState("Gallery Showcase");

  const [image, setImage] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const loadGallery = async () => {
    const response =
      await fetch("/api/gallery");

    const data =
      await response.json();

    setGallery(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const deleteImage = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Delete this image?"
      );

    if (!confirmed) return;

    await fetch("/api/gallery", {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadGallery();
  };

  const editImage = (
    item: any
  ) => {
    setEditingId(item.id);

    setTitle(item.title);
    setCategory(item.category);
    setImage(item.image);
  };

  const saveImage = async () => {
    if (
      !title ||
      !image
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    const imageData = {
      id:
        editingId ??
        Date.now(),

      title,
      category,
      image,
    };

    if (
      editingId !== null
    ) {
      await fetch(
        "/api/gallery",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            imageData
          ),
        }
      );

      alert(
        "Gallery Updated"
      );

      setEditingId(null);
    } else {
      await fetch(
        "/api/gallery",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            imageData
          ),
        }
      );

      alert(
        "Image Added"
      );
    }

    setTitle("");
    setCategory(
      "Gallery Showcase"
    );
    setImage("");

    loadGallery();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Gallery Admin
          </h1>

          <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

            <h2 className="text-3xl mb-6">
              Add Image
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Image Title"
                value={title}
                onChange={(e) =>
                  setTitle(
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
                  Homepage Hero
                </option>

                <option>
                  Gallery Showcase
                </option>

                <option>
                  Customer Favorites
                </option>

                <option>
                  Brand Story
                </option>

                <option>
                  Blog Cover
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
                saveImage
              }
              className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
            >
              {editingId !== null
                ? "Save Changes"
                : "Add Image"}
            </button>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl mb-6">
              Gallery Images
            </h2>

            <div className="space-y-6">

              {gallery.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-zinc-800 pb-4"
                  >

                    <div className="flex gap-4 items-center">

                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.title
                        }
                        className="w-20 h-20 object-cover rounded-xl"
                      />

                      <div>

                        <p className="font-semibold">
                          {
                            item.title
                          }
                        </p>

                        <p className="text-zinc-400">
                          {
                            item.category
                          }
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          editImage(
                            item
                          )
                        }
                        className="bg-blue-600 px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteImage(
                            item.id
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