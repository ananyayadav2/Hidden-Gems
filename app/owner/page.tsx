'use client';

import { useState } from 'react';
import { Category, Atmosphere } from '@/types';
import { Upload, CheckCircle2 } from 'lucide-react';

export default function PlaceOwnerDashboard() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    placeName: '',
    description: '',
    location: '',
    category: 'cheap_eats' as Category,
    cost: 100,
    atmosphere: 'quiet' as Atmosphere,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Place Owner Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Add your hidden spot or local cafe for community review.
        </p>

        {submitted ? (
          <div className="mt-8 p-6 bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-900 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-teal-600 dark:text-teal-400 mx-auto" />
            <h3 className="font-bold text-lg text-teal-950 dark:text-teal-200">
              Submitted for Admin Review
            </h3>
            <p className="text-xs text-teal-800 dark:text-teal-300 max-w-md mx-auto">
              Your spot has been queued for verification. Once approved, it will go live on the community map.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-lg"
            >
              Add Another Place
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block text-xs font-semibold mb-1">Place Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Hidden Rooftop Tea Room"
                value={formData.placeName}
                onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Area / Locality</label>
              <input
                required
                type="text"
                placeholder="e.g. Bandra West, Mumbai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none focus:border-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none"
                >
                  <option value="cheap_eats">Cheap Eats</option>
                  <option value="study_work">Study & Work Spaces</option>
                  <option value="parks_peaceful">Parks & Peaceful</option>
                  <option value="scenic_viewpoints">Scenic Viewpoints</option>
                  <option value="art_culture">Art & Culture</option>
                  <option value="bookshops">Bookshops</option>
                  <option value="stay_accommodation">Stay & Accommodation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Atmosphere</label>
                <select
                  value={formData.atmosphere}
                  onChange={(e) => setFormData({ ...formData, atmosphere: e.target.value as Atmosphere })}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none"
                >
                  <option value="quiet">Quiet & Peaceful</option>
                  <option value="moderate">Moderate</option>
                  <option value="lively">Lively & Social</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Estimated Cost per Person (₹)</label>
              <input
                type="number"
                min="0"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Description</label>
              <textarea
                required
                rows={3}
                placeholder="Tell travelers what makes this spot unique..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Upload Photos</label>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 text-center cursor-pointer hover:border-teal-500 transition">
                <Upload className="w-6 h-6 mx-auto text-zinc-400 mb-2" />
                <span className="text-xs text-zinc-500">Drag & drop or click to upload photos</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl transition text-sm shadow-md"
            >
              Submit Place Details for Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}