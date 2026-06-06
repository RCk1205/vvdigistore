import Navbar from "../../../components/Navbar";
import AddToCartButton from "../../../components/AddToCartButton";

async function getProduct(id: string) {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  const response = await fetch(
    `${baseUrl}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black text-white pt-40 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-serif mb-4">
              Product Not Found
            </h1>

            <p className="text-zinc-400">
              The requested product does not exist.
            </p>
          </div>
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
              ₹{product.price}
            </p>

            <p className="text-zinc-400 mb-4">
              Category: {product.category}
            </p>

            <p className="text-zinc-400 mb-10 leading-relaxed">
              Premium craftsmanship, timeless design and
              exceptional quality for discerning customers.
            </p>

            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              }}
            />

          </div>

        </div>

      </main>
    </>
  );
}