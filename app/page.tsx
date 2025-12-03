'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) return router.push('/login');

    fetch('/api/me', {
      headers: {
        'Authorization': `Bearer ${token}`},
      }).then((res) => res.json())
      .then((data) => {
        if(data.error) {
          localStorage.removeItem('token');
          return router.push('/login');
        }
        setUser(data.user);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        localStorage.removeItem('token');
        router.push('/login');
      });
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
