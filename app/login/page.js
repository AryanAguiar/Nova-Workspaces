'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Store JWT in localStorage
                localStorage.setItem('token', data.token);
                router.push('/'); // redirect to dashboard/home
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            <div style={{ height: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p style={{ marginTop: "1rem" }}>
                    Don’t have an account yet?{" "}
                    <Link href="/signup" style={{ color: "blue" }}>
                        Sign Up!
                    </Link>
                </p>

                <p style={{ marginTop: "1rem", justifyContent: "center", alignItems: "center" }}>
                    <Link href="/request-reset" style={{ color: "blue" }}>
                        Forgot password?
                    </Link>
                </p>
            </div>
        </div>
    );
}
