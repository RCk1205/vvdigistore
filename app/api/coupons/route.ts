import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const coupons = await client
      .db("luxurystore")
      .collection("coupons")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(coupons);
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;

    const coupon = await req.json();

    await client
      .db("luxurystore")
      .collection("coupons")
      .insertOne({
        ...coupon,
        createdAt: new Date(),
      });

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

    const { code } = await req.json();

    await client
      .db("luxurystore")
      .collection("coupons")
      .deleteOne({
        code,
      });

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