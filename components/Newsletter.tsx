export default function Newsletter() {
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
            className="bg-black border border-zinc-700 text-white px-6 py-4 rounded-xl md:w-96"
          />

          <button className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold">
            Subscribe
          </button>
        </div>

      </div>
    </section>
  );
}