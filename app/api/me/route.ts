import { NextResponse } from "next/server";
import { authenticate } from "@/middleware/auth";

export async function GET(req: Request) {
    try {
        const user = await authenticate(req);
        return NextResponse.json({ user: {email: user.email, role: user.role, name: user.name } });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 401 });
    }
}