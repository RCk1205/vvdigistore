import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: Request) {
  try {
    const client = await clientPromise;

    const { id, status } = await req.json();

    await client
      .db("luxurystore")
      .collection("orders")
      .updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            status,
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