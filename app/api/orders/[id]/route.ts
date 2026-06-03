import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await clientPromise;

    const order = await client
      .db("luxurystore")
      .collection("orders")
      .findOne({
        _id: new ObjectId(id),
      });

    return Response.json(order);
  } catch (error) {
    return Response.json({
      error: String(error),
    });
  }
}