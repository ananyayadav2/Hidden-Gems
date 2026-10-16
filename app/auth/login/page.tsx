'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError('Please enter your email ID.');
      return;
    }

    // Attempt login / retrieve from database
    const profile = login('', cleanEmail);

    // Route to destination based on user's registered role
    if (profile.role === 'owner') {
      router.push('/owner');
    } else {
      router.push('/explore');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-sm">
        <div className="text-center mb-6">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-2">
            Welcome Back
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Direct Email Login · No Password Required
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Registered Email ID
            </label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-3.5 py-2.5 border rounded-xl text-sm bg-transparent outline-none focus:border-teal-600 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-sm transition shadow-sm mt-2"
          >
            Sign In & Restore Favourites →
          </button>
        </form>

        <p className="text-xs text-center text-zinc-500 mt-6">
          First time here?{' '}
          <Link href="/auth/register" className="text-teal-600 font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}