'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_GEMS } from '@/data/initialGems';
import { Place, Atmosphere } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Navigation, Heart, Search, X, ExternalLink } from 'lucide-react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [gems] = useState<Place[]>(INITIAL_GEMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(25000);
  const [unlimitedBudget, setUnlimitedBudget] = useState<boolean>(true);
  const [atmosphere, setAtmosphere] = useState<Atmosphere | 'all'>('all');
  const [studyOnly, setStudyOnly] = useState<boolean>(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q) setSearchTerm(q);
    if (cat) setCategoryFilter(cat);
  }, [searchParams]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredGems = gems.filter((g) => {
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      const matches =
        g.name.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query) ||
        g.area.toLowerCase().includes(query) ||
        g.city.toLowerCase().includes(query) ||
        g.category.toLowerCase().includes(query);
      if (!matches) return false;
    }

    if (categoryFilter !== 'all' && g.category !== categoryFilter) return false;
    if (!unlimitedBudget && g.costPerPerson > maxBudget) return false;
    if (atmosphere !== 'all' && g.atmosphere !== atmosphere) return false;
    if (studyOnly && !g.isStudyFriendly) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Tourist Filter Sidebar */}
      <aside className="md:col-span-4 space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 h-fit">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Tourist Finder</h2>
          <p className="text-xs text-zinc-500 mt-1">Search 100+ spots across Mumbai & within 200 km</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search fort, waterfall, caves, cafe, beach..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border rounded-xl text-sm bg-transparent outline-none focus:border-teal-600"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none"
          >
            <option value="all">All Categories</option>
            <option value="scenic_viewpoints">Scenic Viewpoints & Seafronts</option>
            <option value="art_culture">Caves, Heritage & Art Galleries</option>
            <option value="parks_peaceful">Waterfalls, Forts & Nature</option>
            <option value="cheap_eats">Food Places & Cafes</option>
            <option value="study_work">Study & Work Spaces</option>
            <option value="bookshops">Bookshops & Reading Corners</option>
            <option value="local_markets">Local Bazaars & Hidden Shops</option>
            <option value="stay_accommodation">Hostels & Stays</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{t('budgetLabel')}</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">
              {unlimitedBudget ? 'Any Budget (No Limit)' : `Up to ₹${maxBudget}`}
            </span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={unlimitedBudget}
              onChange={(e) => setUnlimitedBudget(e.target.checked)}
              className="accent-teal-700 rounded w-3.5 h-3.5"
            />
            Show places with no price restrictions
          </label>

          {!unlimitedBudget && (
            <input
              type="range"
              min="0"
              max="25000"
              step="250"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Atmosphere</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['all', 'quiet', 'moderate', 'lively'] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAtmosphere(a)}
                className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition ${
                  atmosphere === a
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={studyOnly}
              onChange={(e) => setStudyOnly(e.target.checked)}
              className="accent-teal-700 rounded w-4 h-4"
            />
            Study & Work Friendly Only
          </label>
        </div>
      </aside>

      {/* Recommended Places */}
      <main className="md:col-span-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">
            Recommended Hidden Gems ({filteredGems.length})
          </h3>
          <span className="text-xs text-zinc-500">Sorted by Upvotes · Click any place name to Google Search</span>
        </div>

        {filteredGems.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-sm text-zinc-500">No matching spots found for your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setUnlimitedBudget(true);
                setAtmosphere('all');
                setStudyOnly(false);
              }}
              className="mt-3 px-4 py-2 bg-teal-700 text-white rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGems.map((place) => (
              <div
                key={place.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition group"
              >
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    {/* Clickable link on place name to Google Search */}
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(`${place.name} ${place.area}${place.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-base text-zinc-900 dark:text-zinc-100 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1.5 transition"
                      title="Search on Google"
                    >
                      <span>{place.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition text-teal-600 flex-shrink-0" />
                    </a>

                    <button
                      onClick={() => toggleSave(place.id)}
                      className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex-shrink-0"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          savedIds.includes(place.id)
                            ? 'fill-rose-500 text-rose-500'
                            : 'text-zinc-400'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{place.area}, {place.city}</span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {place.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[11px] px-2 py-0.5 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded font-medium">
                      {place.costPerPerson === 0 ? 'Free Entry' : `~₹${place.costPerPerson.toLocaleString()} per person`}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded capitalize">
                      {place.atmosphere}
                    </span>
                    {place.isStudyFriendly && (
                      <span className="text-[11px] px-2 py-0.5 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded font-medium">
                        Study Spot
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Recommended Route
                  </a>
                  <span className="text-zinc-400">▲ {place.upvotes} upvotes</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">Loading places...</div>}>
      <ExploreContent />
    </Suspense>
  );
}