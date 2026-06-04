"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  useRouter,
} from "next/navigation";

import { getSession } from "next-auth/react";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    setLoading(false);

    if (result?.error) {
      alert("Invalid email or password");
      return;
    }

    alert("Login successful");
    const session =
  await getSession();
  
  if (
      (session?.user as any)
          ?.role === "admin"
        ) {
  router.push("/admin");
} else {
    router.push("/products");
  }
  }
  
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md"
        >
          <h1 className="text-4xl font-serif mb-8 text-center">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-4 rounded-xl font-semibold"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

      </main>
    </>
  );
}