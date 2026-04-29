import Link from 'next/link';

const hubLinks = [
  { href: '/canteen', label: 'View Canteen Menu' },
  { href: '/hpage', label: 'Helpdesk' },
  { href: '/events', label: 'Society Events' },
  { href: '/canteenmachinelearning', label: 'Canteen Machine Learning' },
] as const;

export default function Page() {
  return (
    <main className="min-h-screen bg-blue-900 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-2xl bg-white p-5 shadow-lg">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Student Hub</h1>
          <p className="mt-2 max-w-3xl text-slate-700">
            Jump to campus services, the helpdesk, society events, and learning tools.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-lg md:p-6" aria-labelledby="hub-links-heading">
          <h2 id="hub-links-heading" className="text-xl font-semibold text-slate-900">
            Quick links
          </h2>
          <nav className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap" aria-label="Student hub sections">
            {hubLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 md:text-base"
              >
                {label}
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
