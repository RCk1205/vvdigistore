import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  const values = [
    {
      title: "Premium Quality",
      description:
        "Every product is carefully selected to meet high standards of craftsmanship, durability, and design.",
    },
    {
      title: "Customer Trust",
      description:
        "We focus on transparency, secure shopping, and reliable service to create long-term customer relationships.",
    },
    {
      title: "Modern Innovation",
      description:
        "Our collection blends timeless elegance with modern functionality and contemporary design.",
    },
  ];

  const stats = [
    { number: "500+", label: "Satisfied Customers" },
    { number: "100+", label: "Premium Products" },
    { number: "24/7", label: "Customer Support" },
    { number: "99%", label: "Positive Feedback" },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40">

        {/* Hero Section */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto">

            <p className="text-yellow-500 uppercase tracking-[0.35em] mb-4">
              About Us
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-8">
              Crafted For Those
              <span className="text-yellow-500"> Who Value Excellence</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              VVDigiStore is a premium destination for carefully selected
              products that combine elegance, quality, and functionality.
              We believe exceptional products should deliver both beauty
              and performance while creating a memorable experience for
              every customer.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-6 py-32">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Our Story
              </p>

              <h2 className="font-serif text-4xl md:text-5xl mb-8">
                Built Around Quality
              </h2>

              <p className="text-zinc-400 leading-relaxed mb-6">
                VVDigiStore was founded with a vision to create an online
                destination where customers can discover products that
                stand apart from ordinary mass-market offerings.
              </p>

              <p className="text-zinc-400 leading-relaxed mb-6">
                We focus on quality, craftsmanship, and customer
                satisfaction. Every product is selected with attention to
                detail and a commitment to long-term value.
              </p>

              <p className="text-zinc-400 leading-relaxed">
                Our goal is simple: provide products that customers are
                proud to own and confident to recommend.
              </p>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1200"
                alt="Luxury Lifestyle"
                className="rounded-[30px] w-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Core Values
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                What Drives Us
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {values.map((value, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded-[30px] p-8 hover:border-yellow-500/40 transition"
                >
                  <h3 className="font-serif text-2xl mb-4">
                    {value.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Statistics */}
        <section className="px-6 py-32">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Our Impact
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Trusted By Customers
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center border border-zinc-800 rounded-[30px] p-8"
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-3">
                    {stat.number}
                  </div>

                  <div className="text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Mission Section */}
        <section className="px-6 pb-32">
          <div className="max-w-5xl mx-auto text-center">

            <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
              Our Mission
            </p>

            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              Elevating The Online Shopping Experience
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              We aim to create a destination where customers can confidently
              discover premium products, enjoy exceptional service, and
              experience a level of quality that exceeds expectations.
            </p>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}