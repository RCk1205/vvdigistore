import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const gallery = await client
      .db("luxurystore")
      .collection("gallery")
      .find({})
      .toArray();

    return Response.json(gallery);
  } catch (error) {
    return Response.json({
      error: String(error),
    });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;

    const galleryItem = await req.json();

    await client
      .db("luxurystore")
      .collection("gallery")
      .insertOne(galleryItem);

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
      .collection("gallery")
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

    const galleryItem = await req.json();

    await client
      .db("luxurystore")
      .collection("gallery")
      .updateOne(
        { id: galleryItem.id },
        {
          $set: {
            title: galleryItem.title,
            category: galleryItem.category,
            image: galleryItem.image,
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