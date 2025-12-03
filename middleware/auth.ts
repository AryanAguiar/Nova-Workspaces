import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const authenticate = async (req: Request) => {
    try {
        await connectDB();
        const authHeader = req.headers.get("authorization");
        if(!authHeader) throw new Error("No token provided");

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET! ) as { userId: string };
        const user = await User.findById((decoded as any).userId);
        if(!user) throw new Error("User not found");
        return user;
    } catch (err) {
        console.error(err);
        throw new Error("Unauthorized");
    }
}