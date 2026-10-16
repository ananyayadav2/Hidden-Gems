'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'fail') {
      setError('Invalid credentials. Please verify your email/phone or password.');
    } else {
      router.push('/explore');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-center">Welcome Back</h2>
        <p className="text-xs text-zinc-500 text-center mt-1 mb-6">
          Sign in to access your saved gems and community dashboard
        </p>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Email or Mobile Number</label>
            <input
              required
              type="text"
              placeholder="name@example.com or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold">Password</label>
              <button
                type="button"
                onClick={() => alert('Password reset instructions sent to your registered contact!')}
                className="text-xs text-teal-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg text-sm transition"
          >
            Verify Credentials & Login
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