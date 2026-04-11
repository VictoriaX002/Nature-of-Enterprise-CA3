'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CanteenMenuItem } from '@/app/lib/canteen-data';

type MenuApiResponse = {
  data: CanteenMenuItem[];
  message?: string;
};

const days: Array<CanteenMenuItem['day'] | 'All'> = [
  'All',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

export default function CanteenMenuClient() {
  const [menu, setMenu] = useState<CanteenMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [dayFilter, setDayFilter] = useState<(typeof days)[number]>('All');

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch('/api/canteen-menu', { cache: 'no-store' });
        if (!response.ok) throw new Error('Could not fetch menu');
        const payload = (await response.json()) as MenuApiResponse;
        setMenu(payload.data);
      } catch {
        setErrorText('Could not load live menu right now. Try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    }

    loadMenu();
  }, []);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      return dayFilter === 'All' || item.day === dayFilter;
    });
  }, [dayFilter, menu]);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 md:p-6" aria-live="polite">
      <h2 className="text-xl font-semibold text-slate-900">This Week&apos;s Menu</h2>

      <div className="mt-4">
        <fieldset className="rounded border border-slate-300 p-3">
          <legend className="px-1 text-sm font-medium text-slate-800">Filter by day</legend>
          <div className="mt-2 flex flex-wrap gap-3">
            {days.map((day) => (
              <label key={day} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="day-filter"
                  value={day}
                  checked={dayFilter === day}
                  onChange={() => setDayFilter(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {isLoading ? (
        <p className="mt-4 text-sm text-slate-700">Loading menu...</p>
      ) : errorText ? (
        <p className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">{errorText}</p>
      ) : (
        <div id="menu-results" tabIndex={-1} className="mt-4 overflow-x-auto rounded border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Filtered canteen menu for the week</caption>
            <thead className="bg-slate-100">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Day
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Meal
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Description
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Dietary tags
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Allergens
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.length === 0 ? (
                <tr>
                  <td className="px-3 py-4 text-slate-700" colSpan={6}>
                    No meals match your current filters.
                  </td>
                </tr>
              ) : (
                filteredMenu.map((item) => (
                  <tr key={item.id} className="border-t border-slate-200 align-top">
                    <td className="px-3 py-3">{item.day}</td>
                    <td className="px-3 py-3">
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-slate-600">{item.mealPeriod}</p>
                    </td>
                    <td className="px-3 py-3 text-slate-700">{item.description}</td>
                    <td className="px-3 py-3 text-slate-700">{item.dietaryTags.join(', ')}</td>
                    <td className="px-3 py-3 text-slate-700">
                      {item.allergens.length > 0 ? item.allergens.join(', ') : 'None listed'}
                    </td>
                    <td className="px-3 py-3">{item.priceLabel}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
