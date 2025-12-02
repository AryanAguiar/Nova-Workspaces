import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("users").findOne({ email });
        if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return NextResponse.json({ token }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
