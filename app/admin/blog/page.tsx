"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import ImageUpload from "../../../components/ImageUpload";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [content, setContent] =
    useState("");

  const [author, setAuthor] =
    useState("VVDigiStore");

  const [image, setImage] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const loadBlogs = async () => {
    const response =
      await fetch("/api/blog");

    const data =
      await response.json();

    setBlogs(data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const deleteBlog = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Delete this blog?"
      );

    if (!confirmed) return;

    await fetch("/api/blog", {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadBlogs();
  };

  const editBlog = (
    blog: any
  ) => {
    setEditingId(blog.id);

    setTitle(blog.title);
    setDescription(
      blog.description
    );
    setContent(blog.content);
    setAuthor(blog.author);
    setImage(blog.image);
  };

  const saveBlog = async () => {
    if (
      !title ||
      !description ||
      !content ||
      !image
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    const blogData = {
      id:
        editingId ??
        Date.now(),

      title,
      description,
      content,
      image,
      author,
      date:
        new Date().toLocaleDateString(),
    };

    if (
      editingId !== null
    ) {
      await fetch(
        "/api/blog",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            blogData
          ),
        }
      );

      alert(
        "Blog Updated"
      );

      setEditingId(null);
    } else {
      await fetch(
        "/api/blog",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            blogData
          ),
        }
      );

      alert(
        "Blog Published"
      );
    }

    setTitle("");
    setDescription("");
    setContent("");
    setAuthor(
      "VVDigiStore"
    );
    setImage("");

    loadBlogs();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="font-serif text-6xl mb-10">
            Blog Admin
          </h1>

          <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

            <h2 className="text-3xl mb-6">
              Create Blog
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full bg-black p-4 rounded-xl"
              />

              <input
                type="text"
                placeholder="Short Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full bg-black p-4 rounded-xl"
              />

              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) =>
                  setAuthor(
                    e.target.value
                  )
                }
                className="w-full bg-black p-4 rounded-xl"
              />

              <textarea
                rows={10}
                placeholder="Full Blog Content"
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                className="w-full bg-black p-4 rounded-xl"
              />

              <div>

                <ImageUpload
                  setImage={
                    setImage
                  }
                />

                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-xl mt-4"
                  />
                )}

              </div>

            </div>

            <button
              onClick={
                saveBlog
              }
              className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
            >
              {editingId !== null
                ? "Save Changes"
                : "Publish Blog"}
            </button>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-3xl mb-6">
              Published Blogs
            </h2>

            <div className="space-y-6">

              {blogs.map(
                (blog) => (
                  <div
                    key={blog.id}
                    className="flex justify-between items-center border-b border-zinc-800 pb-4"
                  >

                    <div>

                      <p className="font-semibold text-xl">
                        {
                          blog.title
                        }
                      </p>

                      <p className="text-zinc-400">
                        {
                          blog.author
                        }
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          editBlog(
                            blog
                          )
                        }
                        className="bg-blue-600 px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteBlog(
                            blog.id
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