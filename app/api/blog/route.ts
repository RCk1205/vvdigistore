import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const blogs = await client
      .db("luxurystore")
      .collection("blogs")
      .find({})
      .sort({ id: -1 })
      .toArray();

    return Response.json(blogs);
  } catch (error) {
    return Response.json({
      error: String(error),
    });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;

    const blog = await req.json();

    await client
      .db("luxurystore")
      .collection("blogs")
      .insertOne(blog);

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

    const { id } = await req.json();

    await client
      .db("luxurystore")
      .collection("blogs")
      .deleteOne({ id });

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

export async function PUT(req: Request) {
  try {
    const client = await clientPromise;

    const blog = await req.json();

    await client
      .db("luxurystore")
      .collection("blogs")
      .updateOne(
        { id: blog.id },
        {
          $set: {
            title: blog.title,
            description: blog.description,
            content: blog.content,
            image: blog.image,
            author: blog.author,
          },
        }
      );

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