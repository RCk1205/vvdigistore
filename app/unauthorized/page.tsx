import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function UnauthorizedPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">

          <h1 className="font-serif text-6xl text-red-500 mb-6">
            Access Denied
          </h1>

          <p className="text-zinc-400 text-lg mb-8">
            You do not have permission to access this page.
          </p>

          <Link
            href="/"
            className="inline-block bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold"
          >
            Return Home
          </Link>

        </div>
      </main>
    </>
  );
}