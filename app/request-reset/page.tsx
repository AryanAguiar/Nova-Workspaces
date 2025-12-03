"use client";
import { useState } from 'react';

export default function RequestResetPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/auth/request-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setMessage("Email has been sent to you registered email address if it exists.");
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-6 border rounded shadow-md'>
                <h2 className='text-2xl font-bold mb-4'>Request Password Reset</h2>
                <input
                    className="border p-2 rounded w-full mb-3"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Send Reset Link
                </button>
                <a href="/login" className="text-sm text-blue-500 hover:underline">
                    Back to Login
                </a>
                {message && <p className="text-green-500 mt-4">{message}</p>}
            </form>
        </div>
    )
}