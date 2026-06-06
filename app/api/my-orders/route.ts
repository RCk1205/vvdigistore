import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session?.user?.email
    ) {
      return Response.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    const client =
      await clientPromise;

    const orders = await client
      .db("luxurystore")
      .collection("orders")
      .find({
        userEmail:
          session.user.email,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return Response.json({
      success: true,
      orders,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}