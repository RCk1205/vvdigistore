"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async () => {
    if (!email) {
      setMessage("Enter an email address");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          data.message || "Successfully subscribed!"
        );
        setEmail("");
      } else {
        setMessage(data.error);
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-zinc-950 py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">

        <p className="text-yellow-500 tracking-[0.35em] uppercase text-sm mb-4">
          Newsletter
        </p>

        <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
          Stay Updated
        </h2>

        <p className="text-zinc-400 mb-10">
          Get exclusive updates, product launches and luxury insights.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="bg-black border border-zinc-700 text-white px-6 py-4 rounded-xl md:w-96"
          />

          <button
            onClick={subscribe}
            disabled={loading}
            className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <p className="mt-6 text-zinc-300">
            {message}
          </p>
        )}

      </div>
    </section>
  );
}