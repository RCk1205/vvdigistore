import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    await client.db("luxurystore").command({
      ping: 1,
    });

    return Response.json({
      success: true,
      message: "MongoDB Connected",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}