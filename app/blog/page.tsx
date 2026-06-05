import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Newsletter from "../../components/Newsletter";

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Premium Online Shopping",
    date: "June 2026",
    description:
      "Discover how modern consumers are redefining luxury, quality, and online shopping experiences in a rapidly evolving digital marketplace.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
  };

  const posts = [
    {
      title: "5 Signs of a Truly Premium Product",
      date: "May 2026",
      description:
        "Learn how to identify craftsmanship, quality materials, and lasting value before making a purchase.",
    },
    {
      title: "Why Craftsmanship Still Matters",
      date: "April 2026",
      description:
        "Explore the role of attention to detail and expert craftsmanship in creating exceptional products.",
    },
    {
      title: "Choosing Quality Over Trends",
      date: "March 2026",
      description:
        "A guide to building a collection of products that remain valuable long after trends fade.",
    },
    {
      title: "The Psychology of Premium Design",
      date: "February 2026",
      description:
        "Understanding why thoughtful design creates stronger customer experiences and satisfaction.",
    },
    {
      title: "Building Trust in E-Commerce",
      date: "January 2026",
      description:
        "The essential elements every premium online store needs to establish long-term customer confidence.",
    },
    {
      title: "Luxury Meets Technology",
      date: "December 2025",
      description:
        "How innovation is transforming the future of premium consumer products and shopping experiences.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40">

        {/* Hero Section */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto">

            <p className="text-yellow-500 uppercase tracking-[0.35em] mb-4">
              Blog
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-8">
              Insights &
              <span className="text-yellow-500"> Inspiration</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              Explore ideas, trends, craftsmanship, and insights that
              shape the future of premium products and exceptional customer
              experiences.
            </p>

          </div>
        </section>

        {/* Featured Article */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full rounded-[30px] object-cover"
                />
              </div>

              <div>

                <p className="text-yellow-500 uppercase tracking-[0.2em] mb-4">
                  Featured Article
                </p>

                <p className="text-zinc-500 mb-4">
                  {featuredPost.date}
                </p>

                <h2 className="font-serif text-4xl md:text-5xl mb-6">
                  {featuredPost.title}
                </h2>

                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  {featuredPost.description}
                </p>

                <button className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition">
                  Read Article
                </button>

              </div>

            </div>

          </div>
        </section>

        {/* Latest Articles */}
        <section className="px-6 py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">

              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Latest Posts
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Knowledge & Perspectives
              </h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {posts.map((post, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded-[30px] p-8 hover:border-yellow-500/40 transition"
                >

                  <p className="text-zinc-500 text-sm mb-4">
                    {post.date}
                  </p>

                  <h3 className="font-serif text-2xl mb-4">
                    {post.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed mb-8">
                    {post.description}
                  </p>

                  <button className="text-yellow-500 font-medium hover:text-yellow-400 transition">
                    Read More →
                  </button>

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* Quote Section */}
        <section className="px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">

            <p className="text-yellow-500 uppercase tracking-[0.3em] mb-6">
              Philosophy
            </p>

            <blockquote className="font-serif text-3xl md:text-5xl leading-relaxed">
              "Quality is never an accident; it is always the result of
              intelligent effort and attention to detail."
            </blockquote>

          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />

      </main>

      <Footer />
    </>
  );
}