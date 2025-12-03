import crypto from 'crypto';
import User from '@/models/User';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return Response.json({ message: "ok" });

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

    console.log("Reset URL: ", resetUrl);
    return Response.json({ message: "Email sent" });
}