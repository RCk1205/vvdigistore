import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
   const {
  code,
  total,
  userEmail,
} = await req.json();

    const client =
      await clientPromise;

    const coupon =
      await client
        .db("luxurystore")
        .collection("coupons")
        .findOne({
          code:
            code.toUpperCase(),
        });
        const existingUsage =
  await client
    .db("luxurystore")
    .collection(
      "couponUsage"
    )
    .findOne({
      couponCode:
        code.toUpperCase(),
      userEmail,
    });

if (existingUsage) {
  return Response.json({
    success: false,
    message:
      "You have already used this coupon",
  });
}

    if (!coupon) {
      return Response.json({
        success: false,
        message:
          "Invalid coupon",
      });
    }

    if (!coupon.active) {
      return Response.json({
        success: false,
        message:
          "Coupon inactive",
      });
    }

    if (
      coupon.expiryDate &&
      new Date(
        coupon.expiryDate
      ) < new Date()
    ) {
      return Response.json({
        success: false,
        message:
          "Coupon expired",
      });
    }

    if (
      coupon.usageLimit &&
      coupon.usedCount >=
        coupon.usageLimit
    ) {
      return Response.json({
        success: false,
        message:
          "Coupon limit reached",
      });
    }

    if (
      total <
      (coupon.minimumOrder ||
        0)
    ) {
      return Response.json({
        success: false,
        message: `Minimum order ₹${coupon.minimumOrder}`,
      });
    }

    let discount = 0;

    if (
      coupon.type ===
      "percentage"
    ) {
      discount =
        Math.round(
          total *
            (coupon.value /
              100)
        );
    } else {
      discount =
        coupon.value;
    }

    return Response.json({
      success: true,
      coupon,
      discount,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    });
  }
}