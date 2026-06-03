import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } =
      await req.json();

    const client = await clientPromise;

    const users = client
      .db("luxurystore")
      .collection("users");

    const existingUser =
      await users.findOne({ email });

    if (existingUser) {
      return Response.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await users.insertOne({
  name,
  email,
  password: hashedPassword,
  role: "customer",
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