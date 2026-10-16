'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'tourist' | 'owner'>('tourist');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Save to global auth state
    login(name.trim(), email.trim(), role);

    // If owner -> redirect to Place Owner dashboard, else -> explore page with favorites unlocked
    if (role === 'owner') {
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
            Create Your Account
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Instant sign-up · No OTP · No KYC required
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Full Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Ananya"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 border rounded-xl text-sm bg-transparent outline-none focus:border-teal-600 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Email ID
            </label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 border rounded-xl text-sm bg-transparent outline-none focus:border-teal-600 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setRole('tourist')}
                className={`p-3.5 border rounded-2xl cursor-pointer text-left transition ${
                  role === 'tourist'
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200 ring-2 ring-teal-600/30'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">🎒 Tourist / Student</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">Save favourites & plan outings</div>
              </div>

              <div
                onClick={() => setRole('owner')}
                className={`p-3.5 border rounded-2xl cursor-pointer text-left transition ${
                  role === 'owner'
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200 ring-2 ring-teal-600/30'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">🏪 Place Owner</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">List & manage hidden places</div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-sm transition shadow-sm mt-4"
          >
            Sign Up & Continue →
          </button>
        </form>

        <p className="text-xs text-center text-zinc-500 mt-6">
          Already registered?{' '}
          <Link href="/auth/login" className="text-teal-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}