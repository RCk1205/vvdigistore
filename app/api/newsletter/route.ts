import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;

    const db = client.db();

    const existing = await db
      .collection("newsletter")
      .findOne({ email });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already subscribed",
      });
    }

    await db.collection("newsletter").insertOne({
      email,
      subscribedAt: new Date(),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "New VVDigiStore Newsletter Subscriber",
      html: `
        <h2>New Subscriber</h2>
        <p>Email: ${email}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Welcome to VVDigiStore",
      html: `
        <h2>Welcome to VVDigiStore</h2>
        <p>Thank you for subscribing.</p>
        <p>You will receive updates about new products and launches.</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 500 }
    );
  }
}