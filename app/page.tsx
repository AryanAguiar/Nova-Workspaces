'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // redirect if not logged in
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Nova Workspaces!</h1>
      <p>You are logged in.</p>
      <button onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}>
        Logout
      </button>
    </div>
  );
}
