import Link from 'next/link';
import CanteenMenuClient from '@/app/ui/canteen/menu-client';

export default function CanteenPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-4 md:p-8">
      <a
        href="#menu-results"
        className="sr-only rounded bg-blue-700 px-3 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to menu results
      </a>

      <header className="rounded-lg bg-sky-50 p-5">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Campus Canteen Menu</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          Browse this week&apos;s meals for first-year students. Use the keyboard to tab through filters, then
          press arrow keys on radio options to refine results quickly.
        </p>
        <div className="mt-4">
          <Link href="/" className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100">
            Back to home
          </Link>
        </div>
      </header>

      <CanteenMenuClient />
    </main>
  );
}
