"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setMessage("");
        const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || 'Something went wrong');
            return;
        }

        setMessage("Password has been reset successfully. Redirecting to login...");
        setTimeout(() => {
            router.push('/login');
        }, 2000);
    };

    if (!token || !email) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <p className='text-red-500'>Invalid password reset link.</p>
            </div>
        );
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 p-6 border rounded shadow-md bg-white'
            >
                <h2 className='text-2xl font-bold mb-4'>Reset Password</h2>

                <input
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Reset Password
                </button>
                <a href="/login" className="text-sm text-blue-500 hover:underline">
                    Back to Login
                </a>
                {message && <p className="text-green-500 mt-4">{message}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
}