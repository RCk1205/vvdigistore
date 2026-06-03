export default function Stats() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-5xl font-bold text-yellow-500">25+</h3>
            <p className="text-zinc-400 mt-2">Years Experience</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-yellow-500">50K+</h3>
            <p className="text-zinc-400 mt-2">Customers</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-yellow-500">120+</h3>
            <p className="text-zinc-400 mt-2">Products</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-yellow-500">35</h3>
            <p className="text-zinc-400 mt-2">Countries</p>
          </div>

        </div>

      </div>
    </section>
  );
}