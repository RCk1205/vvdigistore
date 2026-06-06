import clientPromise from "../../../../lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await clientPromise;

    const product = await client
      .db("luxurystore")
      .collection("products")
      .findOne({
        id: Number(id),
      });

    if (!product) {
      return Response.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(product);
  } catch (error) {
    return Response.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}