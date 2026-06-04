import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const orders = await client
      .db("luxurystore")
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(orders);
  } catch (error) {
    return Response.json({
      error: String(error),
    });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;

    const order = await req.json();

    const result = await client
      .db("luxurystore")
      .collection("orders")
      .insertOne({
        ...order,

        paymentStatus:
          order.paymentStatus ??
          (order.paymentMethod ===
          "Cash on Delivery"
            ? "Pending"
            : "Paid"),

        razorpayOrderId:
          order.razorpayOrderId || null,

        razorpayPaymentId:
          order.razorpayPaymentId || null,

        status: "Pending",

        createdAt: new Date(),
      });

    return Response.json({
      success: true,
      orderId: result.insertedId,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}