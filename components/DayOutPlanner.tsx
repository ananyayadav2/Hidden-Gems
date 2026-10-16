'use client';

import React, { useState } from 'react';
import { Place } from '@/types';
import { Sparkles, Clock, IndianRupee, MapPin } from 'lucide-react';

interface DayOutPlannerProps {
  allPlaces: Place[];
}

export default function DayOutPlanner({ allPlaces }: DayOutPlannerProps) {
  const [budget, setBudget] = useState<number>(500);
  const [hours, setHours] = useState<number>(4);
  const [selectedVibe, setSelectedVibe] = useState<'any' | 'quiet' | 'lively'>('any');
  const [plan, setPlan] = useState<Place[] | null>(null);

  const generatePlan = () => {
    const candidates = allPlaces.filter((p) => {
      if (selectedVibe !== 'any' && p.atmosphere !== selectedVibe) return false;
      return true;
    });

    const selected: Place[] = [];
    let currentCost = 0;
    let currentHours = 0;

    for (const place of candidates) {
      const placeCost = place.costBreakdown 
        ? place.costBreakdown.travelEstimate + place.costBreakdown.foodEstimate + place.costBreakdown.entryFee
        : place.costPerPerson + 50;
      const placeDuration = place.idealDurationHours || 1.5;

      if (currentCost + placeCost <= budget && currentHours + placeDuration <= hours) {
        selected.push(place);
        currentCost += placeCost;
        currentHours += placeDuration;
      }
      if (selected.length === 3) break;
    }

    setPlan(selected);
  };

  const totalTravel = plan ? plan.reduce((acc, p) => acc + (p.costBreakdown?.travelEstimate || 40), 0) : 0;
  const totalFood = plan ? plan.reduce((acc, p) => acc + (p.costBreakdown?.foodEstimate || p.costPerPerson), 0) : 0;
  const totalEntry = plan ? plan.reduce((acc, p) => acc + p.entryFee, 0) : 0;
  const grandTotal = totalTravel + totalFood + totalEntry;
  const remainingBudget = budget - grandTotal;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Smart Day-Out Planner & Budget Guardian
          </h3>
          <p className="text-xs text-zinc-500">
            Enter your budget and available hours to generate a custom itinerary.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300">
            Total Budget: <span className="text-teal-600 font-bold">₹{budget}</span>
          </label>
          <input
            type="range"
            min="100"
            max="3000"
            step="50"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300">
            Time Available: <span className="text-teal-600 font-bold">{hours} Hours</span>
          </label>
          <input
            type="range"
            min="2"
            max="10"
            step="1"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-zinc-700 dark:text-zinc-300">
            Preferred Atmosphere
          </label>
          <select
            value={selectedVibe}
            onChange={(e) => setSelectedVibe(e.target.value as 'any' | 'quiet' | 'lively')}
            className="w-full px-3 py-1.5 border rounded-lg text-sm bg-transparent outline-none"
          >
            <option value="any">Any Vibe</option>
            <option value="quiet">Quiet & Peaceful</option>
            <option value="lively">Lively & Social</option>
          </select>
        </div>
      </div>

      <button
        onClick={generatePlan}
        className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-sm transition shadow-sm"
      >
        Plan My Outing
      </button>

      {plan && (
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
              Suggested Itinerary ({plan.length} Stops)
            </h4>
            <span className="text-xs text-zinc-400">Arranged in practical sequence</span>
          </div>

          <div className="space-y-4">
            {plan.map((place, idx) => (
              <div
                key={place.id}
                className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {place.name}
                    </h5>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-teal-600" />
                      {place.area}, {place.city} · <Clock className="w-3 h-3 ml-1" /> ~{place.idealDurationHours || 1.5} hrs
                    </p>
                    <div className="mt-2 text-[11px] text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200/50 dark:border-teal-900/50 inline-block">
                      Recommended based on your budget and {place.atmosphere} atmosphere preference.
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                    Est. Outing Cost
                  </span>
                  <span className="text-xs text-zinc-500">
                    ₹{(place.costBreakdown?.travelEstimate || 40) + (place.costBreakdown?.foodEstimate || place.costPerPerson) + place.entryFee}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="w-4 h-4 text-amber-600" />
              <h5 className="font-bold text-sm text-amber-950 dark:text-amber-200">
                Budget Guardian Breakdown
              </h5>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
              <div className="bg-white/70 dark:bg-zinc-900 p-2.5 rounded-xl border border-amber-200/50">
                <span className="text-zinc-500 block">Estimated Travel</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">₹{totalTravel}</span>
              </div>
              <div className="bg-white/70 dark:bg-zinc-900 p-2.5 rounded-xl border border-amber-200/50">
                <span className="text-zinc-500 block">Food & Refreshments</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">₹{totalFood}</span>
              </div>
              <div className="bg-white/70 dark:bg-zinc-900 p-2.5 rounded-xl border border-amber-200/50">
                <span className="text-zinc-500 block">Entry Tickets</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">₹{totalEntry}</span>
              </div>
              <div className="bg-white/70 dark:bg-zinc-900 p-2.5 rounded-xl border border-amber-200/50">
                <span className="text-zinc-500 block">Estimated Total</span>
                <span className="font-bold text-teal-700 dark:text-teal-400">₹{grandTotal}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-amber-200/60 dark:border-amber-900/60">
              <span className="text-zinc-600 dark:text-zinc-400">
                Budget: ₹{budget} | Remaining: <strong className="text-teal-700">₹{remainingBudget}</strong>
              </span>
              <span className="text-[11px] text-zinc-400 italic">
                *Costs are estimates based on local benchmarks.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}