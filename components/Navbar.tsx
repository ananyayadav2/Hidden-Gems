'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, MapPin } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-teal-800 dark:text-teal-400">
          <span className="text-2xl">💎</span>
          <span>{t('appName')}</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs">
            <Globe className="w-3.5 h-3.5 text-zinc-500 ml-1.5" />
            {(['en', 'hi', 'mr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full font-medium transition ${
                  lang === l
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {l === 'en' ? 'EN' : l === 'hi' ? 'हिंदी' : 'मराठी'}
              </button>
            ))}
          </div>

          <Link
            href="/explore"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline"
          >
            <MapPin className="w-4 h-4" />
            {t('findGems')}
          </Link>

          <Link
            href="/auth/register"
            className="text-xs sm:text-sm px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white font-medium rounded-lg transition"
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    </header>
  );
}