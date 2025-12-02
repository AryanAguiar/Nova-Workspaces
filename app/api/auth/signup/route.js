import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    return Response.json(
      { message: "User created", userId: user.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
