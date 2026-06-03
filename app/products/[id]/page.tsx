import Navbar from "../../../components/Navbar";
import { allProducts } from "../../../data/allProducts";
import AddToCartButton from "../../../components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = allProducts.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white pt-40 px-6">
          Product not found
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">

          <img
            src={product.image}
            alt={product.name}
            className="rounded-3xl w-full"
          />

          <div>

            <h1 className="font-serif text-6xl mb-6">
              {product.name}
            </h1>

            <p className="text-yellow-500 text-3xl mb-8">
              {product.price}
            </p>

            <p className="text-zinc-400 mb-10 leading-relaxed">
              Premium craftsmanship, timeless design and
              exceptional quality for discerning customers.
            </p>

<AddToCartButton product={product} />

          </div>

        </div>

      </main>
    </>
  );
}