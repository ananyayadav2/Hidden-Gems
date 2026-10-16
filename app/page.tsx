'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import SplashScreen from '@/components/SplashScreen';
import Link from 'next/link';
import { 
  Utensils, 
  BookOpen, 
  Trees, 
  Mountain, 
  Palette, 
  BookMarked, 
  ShoppingBag, 
  Hotel,
  Search,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  const categories = [
    { key: 'cheap_eats', icon: Utensils, label: t('cheapEats'), count: '45+ spots' },
    { key: 'study_work', icon: BookOpen, label: t('studySpaces'), count: '28+ spots' },
    { key: 'parks_peaceful', icon: Trees, label: t('parks'), count: '32+ spots' },
    { key: 'scenic_viewpoints', icon: Mountain, label: t('scenic'), count: '18+ spots' },
    { key: 'art_culture', icon: Palette, label: t('art'), count: '24+ spots' },
    { key: 'bookshops', icon: BookMarked, label: t('books'), count: '15+ spots' },
    { key: 'local_markets', icon: ShoppingBag, label: t('markets'), count: '39+ spots' },
    { key: 'stay_accommodation', icon: Hotel, label: t('stay'), count: '20+ spots' },
  ];

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-zinc-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              {t('verifiedBhashini')}
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              {t('appName')}
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 font-light max-w-2xl mx-auto">
              {t('tagline')}
            </p>

            {/* Live Search Form */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center bg-white text-zinc-800 rounded-full shadow-2xl p-2 pl-4">
              <Search className="w-5 h-5 text-zinc-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search food, Marine Drive, caves, waterfalls, art galleries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-zinc-900"
              />
              <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition flex-shrink-0"
              >
                Search
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/explore"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <Compass className="w-5 h-5" />
                {t('findGems')}
              </Link>
              <Link
                href="/explore?filter=community"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition"
              >
                {t('communityFavorites')}
              </Link>
            </div>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-teal-700/50 max-w-3xl mx-auto text-center">
              <div>
                <div className="text-3xl font-extrabold text-amber-300">120+</div>
                <div className="text-xs text-teal-200">Hidden Places</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-teal-300">75+</div>
                <div className="text-xs text-teal-200">Budget Spots</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-amber-300">40+</div>
                <div className="text-xs text-teal-200">Peaceful Corners</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-teal-300">3.5k</div>
                <div className="text-xs text-teal-200">Community Picks</div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 Categories */}
        <section className="max-w-7xl mx-auto py-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Explore Curated Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.key}
                  href={`/explore?category=${c.key}`}
                  className="group p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-teal-600 dark:hover:border-teal-500 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-700 dark:text-teal-400 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                      {c.label}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">{c.count}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}