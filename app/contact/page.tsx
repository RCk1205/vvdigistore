import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const supportCards = [
    {
      title: "Customer Support",
      description:
        "Get assistance with orders, products, payments, and account-related questions.",
    },
    {
      title: "Order Assistance",
      description:
        "Need help tracking or managing an order? Our team is here to help.",
    },
    {
      title: "Business Inquiries",
      description:
        "Contact us regarding partnerships, collaborations, or business opportunities.",
    },
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Most orders are delivered within 3–7 business days depending on location.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Products may be returned according to our return policy within the specified return window.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Use the Track Order page and enter your order details to view status updates.",
    },
    {
      question: "How quickly do you respond?",
      answer:
        "Our support team typically responds within 24 business hours.",
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
              Contact
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-8">
              Let's Start A
              <span className="text-yellow-500"> Conversation</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              Whether you have a question about a product, an order, or a
              partnership opportunity, our team is ready to assist you.
            </p>

          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="border border-zinc-800 rounded-[30px] p-8 bg-zinc-950">

              <h2 className="font-serif text-3xl mb-8">
                Send A Message
              </h2>

              <form className="space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-500"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-500"
                />

                <textarea
                  rows={6}
                  placeholder="Your Message"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 outline-none focus:border-yellow-500 resize-none"
                />

                <button
                  type="button"
                  className="bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Send Message
                </button>

              </form>

            </div>

            {/* Contact Information */}
            <div className="space-y-8">

              <div className="border border-zinc-800 rounded-[30px] p-8">
                <h3 className="font-serif text-2xl mb-4">
                  Contact Information
                </h3>

                <div className="space-y-4 text-zinc-400">
                  <p>
                    <span className="text-white font-medium">
                      Support Email:
                    </span>
                    <br />
                    support@vvdigistore.com
                  </p>

                  <p>
                    <span className="text-white font-medium">
                      Business Email:
                    </span>
                    <br />
                    business@vvdigistore.com
                  </p>

                  <p>
                    <span className="text-white font-medium">
                      Phone:
                    </span>
                    <br />
                    +91 98765 43210
                  </p>

                  <p>
                    <span className="text-white font-medium">
                      Address:
                    </span>
                    <br />
                    Premium Business Center,
                    <br />
                    Your City, India
                  </p>
                </div>
              </div>

              <div className="border border-zinc-800 rounded-[30px] p-8">
                <h3 className="font-serif text-2xl mb-4">
                  Business Hours
                </h3>

                <div className="space-y-3 text-zinc-400">
                  <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                  <p className="text-yellow-500 mt-4">
                    Average response time: Within 24 hours
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Support Cards */}
        <section className="px-6 py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                Support
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                How We Can Help
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {supportCards.map((card, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded-[30px] p-8 hover:border-yellow-500/40 transition"
                >
                  <h3 className="font-serif text-2xl mb-4">
                    {card.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-16">
              <p className="text-yellow-500 uppercase tracking-[0.3em] mb-4">
                FAQ
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">

              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-zinc-800 rounded-[24px] p-6"
                >
                  <h3 className="font-semibold text-xl mb-3">
                    {faq.question}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}