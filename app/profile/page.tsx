'use client';

import { useAuth } from '@/context/AuthContext';
import { INITIAL_GEMS } from '@/data/initialGems';
import Link from 'next/link';
import { Heart, MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';

export default function ProfilePage() {
  const { user, toggleFavorite, isFavorite } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <span className="text-4xl">🔒</span>
        <h2 className="text-2xl font-bold">Please Sign In</h2>
        <p className="text-sm text-zinc-500">
          Create an account or log in to view your saved hidden gems collection and trip plans.
        </p>
        <Link
          href="/auth/register"
          className="inline-block px-6 py-2.5 bg-teal-700 text-white rounded-xl text-sm font-semibold"
        >
          Sign Up / Login
        </Link>
      </div>
    );
  }

  const favoritePlaces = INITIAL_GEMS.filter((p) => user.savedGems.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-full">
            {user.role === 'owner' ? '🏪 Place Owner Profile' : '🎒 Tourist / Student Explorer'}
          </span>
          <h1 className="text-3xl font-bold mt-2 text-zinc-900 dark:text-zinc-100">
            Welcome, {user.name}
          </h1>
          <p className="text-xs text-zinc-500 mt-1">{user.email}</p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/explore"
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Compass className="w-4 h-4" />
            Discover More Places
          </Link>
        </div>
      </div>

      {/* Favourites Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            My Saved Favourites ({favoritePlaces.length})
          </h2>
          <span className="text-xs text-zinc-400">Stored safely in your profile</span>
        </div>

        {favoritePlaces.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-3">
            <Heart className="w-8 h-8 text-zinc-300 mx-auto" />
            <h4 className="font-bold text-zinc-700 dark:text-zinc-300">No favourites saved yet</h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Tap the heart icon on any place card while exploring to bookmark it here for your upcoming outings!
            </p>
            <Link
              href="/explore"
              className="inline-block px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-semibold"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoritePlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {place.name}
                    </h4>
                    <button
                      onClick={() => toggleFavorite(place.id)}
                      className="p-1 rounded-full hover:bg-zinc-100"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{place.area}, {place.city}</span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {place.description}
                  </p>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-teal-600 font-semibold hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Get Route
                  </a>
                  <span className="text-[11px] text-zinc-400 font-medium capitalize">
                    {place.atmosphere}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}