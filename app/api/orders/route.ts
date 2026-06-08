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

const db =
  client.db(
    "luxurystore"
  );

const couponUsageCollection =
  db.collection(
    "couponUsage"
  );

    const productsCollection =
      db.collection("products");

    for (const item of order.items) {
      const product =
        await productsCollection.findOne({
          id: item.id,
        });

      if (!product) {
        return Response.json(
          {
            success: false,
            error: `${item.name} not found`,
          },
          {
            status: 400,
          }
        );
      }

      const currentStock =
        product.stock ?? 0;

      if (
        currentStock <
        item.quantity
      ) {
        return Response.json(
          {
            success: false,
            error: `Not enough stock for ${item.name}`,
          },
          {
            status: 400,
          }
        );
      }
    }

    for (const item of order.items) {
      await productsCollection.updateOne(
        {
          id: item.id,
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    const result = await db
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
          order.razorpayOrderId ||
          null,

        razorpayPaymentId:
          order.razorpayPaymentId ||
          null,

        status: "Pending",

        createdAt: new Date(),
      });
if (
  order.couponCode &&
  order.userEmail
) {
  await couponUsageCollection.insertOne(
    {
      couponCode:
        order.couponCode
          .toUpperCase(),

      userEmail:
        order.userEmail,

      usedAt:
        new Date(),
    }
  );

  await db
    .collection(
      "coupons"
    )
    .updateOne(
      {
        code:
          order.couponCode
            .toUpperCase(),
      },
      {
        $inc: {
          usedCount: 1,
        },
      }
    );
}
    return Response.json({
      success: true,
      orderId: result.insertedId,
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