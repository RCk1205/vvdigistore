import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const products = await client
      .db("luxurystore")
      .collection("products")
      .find({})
      .toArray();

    return Response.json(products);
  } catch (error) {
    return Response.json({
      error: String(error),
    });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;

    const product = await req.json();

    await client
      .db("luxurystore")
      .collection("products")
      .insertOne(product);

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const client = await clientPromise;

    const { id } = await req.json();

    await client
      .db("luxurystore")
      .collection("products")
      .deleteOne({ id });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}

export async function PUT(req: Request) {
  try {
    const client = await clientPromise;

    const product = await req.json();

    await client
      .db("luxurystore")
      .collection("products")
      .updateOne(
        { id: product.id },
        {
          $set: {
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
          },
        }
      );

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}