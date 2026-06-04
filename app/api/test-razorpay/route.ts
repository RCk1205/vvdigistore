export async function GET() {
  return Response.json({
    keyPresent:
      !!process.env.RAZORPAY_KEY_ID,
    secretPresent:
      !!process.env.RAZORPAY_KEY_SECRET,
  });
}