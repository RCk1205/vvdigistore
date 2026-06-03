"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      email === "admin@luxury.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="bg-zinc-900 p-8 rounded-3xl w-full max-w-md">

        <h1 className="text-4xl font-serif mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-black p-4 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-black p-4 rounded-xl mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-black py-3 rounded-xl font-semibold"
        >
          Login
        </button>

      </div>

    </main>
  );
}