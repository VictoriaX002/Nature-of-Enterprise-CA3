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
  const [selectedItem1, setSelectedItem1] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [selectedItem3, setSelectedItem3] = useState('');

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

  const menuById = useMemo(() => {
    return new Map(menu.map((item) => [item.id, item]));
  }, [menu]);

  const selectedTotal = useMemo(() => {
    const selectedIds = [selectedItem1, selectedItem2, selectedItem3].filter(Boolean);
    const parsePriceLabel = (priceLabel: string) => Number(priceLabel.replace(/[^0-9.]/g, '')) || 0;

    return selectedIds.reduce((total, id) => {
      const item = menuById.get(id);
      if (!item) return total;
      return total + parsePriceLabel(item.priceLabel);
    }, 0);
  }, [menuById, selectedItem1, selectedItem2, selectedItem3]);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-lg md:p-6" aria-live="polite">
      <h2 className="text-xl font-semibold text-slate-900">This Week&apos;s Menu</h2>

      <div className="mt-4">
        <fieldset className="rounded-lg border border-slate-300 bg-slate-50 p-3">
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
        <>
          <div
            id="menu-results"
            tabIndex={-1}
            className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white"
          >
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Filtered canteen menu for the week</caption>
              <thead className="bg-blue-50">
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
                    <tr key={item.id} className="border-t border-slate-200 align-top hover:bg-slate-50">
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

          <form
            className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-4"
            aria-label="Meal total calculator"
          >
            <h3 className="text-lg font-semibold text-slate-900">Build Your Meal Total</h3>
            <p className="mt-1 text-sm text-slate-700">Select up to three items to calculate your total.</p>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label className="text-sm text-slate-800">
                Item 1
                <select
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={selectedItem1}
                  onChange={(event) => setSelectedItem1(event.target.value)}
                >
                  <option value="">No item selected</option>
                  {filteredMenu.map((item) => (
                    <option key={`slot-1-${item.id}`} value={item.id}>
                      {item.name} ({item.priceLabel})
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm text-slate-800">
                Item 2
                <select
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={selectedItem2}
                  onChange={(event) => setSelectedItem2(event.target.value)}
                >
                  <option value="">No item selected</option>
                  {filteredMenu.map((item) => (
                    <option key={`slot-2-${item.id}`} value={item.id}>
                      {item.name} ({item.priceLabel})
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm text-slate-800">
                Item 3
                <select
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={selectedItem3}
                  onChange={(event) => setSelectedItem3(event.target.value)}
                >
                  <option value="">No item selected</option>
                  {filteredMenu.map((item) => (
                    <option key={`slot-3-${item.id}`} value={item.id}>
                      {item.name} ({item.priceLabel})
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <p className="mt-4 text-base font-semibold text-blue-900" aria-live="polite">
              Total: ${selectedTotal.toFixed(2)}
            </p>
          </form>
        </>
      )}
    </section>
  );
}
