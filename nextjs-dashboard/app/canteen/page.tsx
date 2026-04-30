import Link from 'next/link';
import CanteenMenuClient from '@/app/ui/canteen/menu-client';
import {
  HighContrastToggleButton,
  LargeTextMain,
  LargeTextProvider,
  LargeTextToggleButton,
} from '@/app/ui/large-text-mode';

export default function CanteenPage() {
  return (
    <LargeTextProvider>
      <LargeTextMain className="min-h-screen bg-blue-900 px-4 py-6 md:px-8 md:py-10">
        <a
          href="#menu-results"
          className="sr-only rounded bg-blue-700 px-3 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to menu results
        </a>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <header className="rounded-2xl bg-white p-5 shadow-lg">
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Campus Canteen Menu</h1>
            <p className="mt-2 max-w-3xl text-slate-700">
              Browse this week&apos;s meals for students. Use the keyboard to tab through filters, then
              press arrow keys on radio options to refine results quickly.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <LargeTextToggleButton />
              <HighContrastToggleButton />
              <Link
                href="/canteenmachinelearning"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-100"
              >
                Canteen machine learning
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-100"
              >
                Back to home
              </Link>
            </div>
          </header>

          <CanteenMenuClient />
        </div>
      </LargeTextMain>
    </LargeTextProvider>
  );
}
