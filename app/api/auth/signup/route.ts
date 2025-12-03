import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password, username } = await req.json();

    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword, username });

    return Response.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}
