import clientPromise from "../../../lib/mongodb";
import { allProducts } from "../../../data/allProducts";

export async function GET() {
  try {
    const client = await clientPromise;

    await client
      .db("luxurystore")
      .collection("products")
      .deleteMany({});

    await client
      .db("luxurystore")
      .collection("products")
      .insertMany(allProducts);

    return Response.json({
      success: true,
      inserted: allProducts.length,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}