"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Account created successfully!"
        );

        window.location.href =
          "/login";
      } else {
        alert(
          data.message ||
            "Signup failed"
        );
      }
    } catch (error) {
      alert(
        "Something went wrong."
      );
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-md mx-auto">

          <h1 className="font-serif text-5xl mb-10 text-center">
            Create Account
          </h1>

          <form
            onSubmit={handleSignup}
            className="space-y-6"
          >

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
              className="w-full p-4 bg-zinc-900 rounded-xl outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
              className="w-full p-4 bg-zinc-900 rounded-xl outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
              className="w-full p-4 bg-zinc-900 rounded-xl outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black p-4 rounded-xl font-semibold"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

        </div>
      </main>
    </>
  );
}