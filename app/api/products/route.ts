import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const products = await client
      .db("luxurystore")
      .collection("products")
      .find({})
      .toArray();

    const formattedProducts = products.map((product) => ({
      ...product,
      description: product.description ?? "",
      stock: product.stock ?? 0,
    }));

    return Response.json(formattedProducts);
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;

    const product = await req.json();

    await client
      .db("luxurystore")
      .collection("products")
      .insertOne({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        category: product.category,
        image: product.image,

        description:
          product.description ?? "",

        stock:
          Number(product.stock) ?? 0,

        createdAt: new Date(),
      });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
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
        {
          id: product.id,
        },
        {
          $set: {
            name: product.name,
            price: Number(product.price),
            category: product.category,
            image: product.image,

            description:
              product.description ?? "",

            stock:
              Number(product.stock) ?? 0,

            updatedAt: new Date(),
          },
        }
      );

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const client = await clientPromise;

    const { id } = await req.json();

    await client
      .db("luxurystore")
      .collection("products")
      .deleteOne({
        id,
      });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}