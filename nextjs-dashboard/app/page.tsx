import { ArrowRightIcon, BellAlertIcon, BookOpenIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const announcements = [
  { emoji: "📢", title: "Library extended hours", desc: "Grangegorman library open until midnight during exam season.", date: "Today", color: "blue" },
  { emoji: "🏆", title: "Dance Society wins national award", desc: "TU Dublin Dance Society took home 6 awards at BICS 2025!", date: "2 days ago", color: "green" },
  { emoji: "🍕", title: "New canteen meal added", desc: "Try the new Spicy Chickpea Wrap — available every Wednesday.", date: "3 days ago", color: "purple" },
];

const features = [
  {
    href: "/events",
    emoji: "📅",
    title: "Society Events",
    desc: "Discover CS++, Drama Soc, Dance Society and more. ML-powered similar event recommendations included.",
    color: "from-blue-600 to-blue-800",
    badge: "ML Powered",
    link: "Browse Events",
  },
  {
    href: "/canteen",
    emoji: "🍽️",
    title: "Canteen Menu",
    desc: "Browse this week's meals with dietary tags, allergen info, and pricing. Filter by day and meal period.",
    color: "from-green-600 to-green-800",
    badge: "Updated Weekly",
    link: "View Menu",
  },
  {
    href: "/hpage",
    emoji: "🎫",
    title: "Helpdesk",
    desc: "Submit IT issues, facilities requests, or general queries. Track your ticket status and priority.",
    color: "from-purple-600 to-purple-800",
    badge: "24/7 Support",
    link: "Get Help",
  },
  {
    href: "/accessibility",
    emoji: "♿",
    title: "Accessibility",
    desc: "Customise text size, high contrast mode, reduced motion and dyslexia-friendly font settings.",
    color: "from-orange-500 to-orange-700",
    badge: "WCAG AA",
    link: "Open Settings",
  },
];

const quickLinks = [
  { emoji: "📅", label: "Society Events", href: "/events" },
  { emoji: "🍽️", label: "Canteen Menu", href: "/canteen" },
  { emoji: "🎫", label: "Helpdesk", href: "/hpage" },
  { emoji: "♿", label: "Accessibility", href: "/accessibility" },
  { emoji: "🔐", label: "Sign In", href: "/login" },
  { emoji: "📆", label: "Timetable", href: "#", comingSoon: true },
];

const tips = [
  { emoji: "💡", tip: "Use the Helpdesk for any IT issues — most are resolved within 24 hours." },
  { emoji: "🎯", tip: "Join at least one society — it's the best way to meet people on campus." },
  { emoji: "🍽️", tip: "Check the canteen menu the night before to plan your meals." },
  { emoji: "📅", tip: "Filter society events by category to find what interests you most." },
];

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <span className="font-bold text-blue-700 text-lg">Campus Companion</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/events" className="hover:text-blue-600 transition-colors">Events</Link>
            <Link href="/canteen" className="hover:text-blue-600 transition-colors">Canteen</Link>
            <Link href="/hpage" className="hover:text-blue-600 transition-colors">Helpdesk</Link>
            <Link href="/accessibility" className="hover:text-blue-600 transition-colors">Accessibility</Link>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Sign In <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 px-6 py-24 md:px-16 md:py-36 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400 opacity-10 rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] bg-yellow-400 opacity-5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              TU Dublin — Campus Companion — Group 5
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-white md:text-7xl leading-[1.1] tracking-tight">
            Your Campus,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              All in One Place.
            </span>
          </h1>

          <p className="mt-6 text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
            Society events, canteen menus, helpdesk support and accessibility tools — built for TU Dublin students, by TU Dublin students.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl hover:-translate-y-0.5 hover:shadow-yellow-400/20"
            >
              Explore Now <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all border border-white/25 backdrop-blur"
            >
              Sign In <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Hero stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "8+", label: "Society Events", color: "text-yellow-300" },
              { value: "7", label: "Canteen Meals", color: "text-green-300" },
              { value: "24/7", label: "Helpdesk", color: "text-purple-300" },
              { value: "WCAG AA", label: "Accessible", color: "text-orange-300" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                <p className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-blue-200 mt-1 font-medium uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full px-6 py-16 space-y-16">

        {/* Feature Cards */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <SparklesIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-extrabold text-gray-900">Everything you need</h2>
          </div>
          <p className="text-gray-500 mb-8">All your campus tools in one place</p>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f, i) => (
              <Link key={i} href={f.href}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${f.color} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="absolute -top-8 -right-8 text-[10rem] opacity-10 group-hover:opacity-20 transition-opacity leading-none">
                  {f.emoji}
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                      {f.emoji}
                    </div>
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-white/75 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-yellow-300 font-semibold text-sm group-hover:gap-3 transition-all">
                    {f.link} <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Two column section */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Announcements */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BellAlertIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-extrabold text-gray-900">Campus Announcements</h2>
            </div>
            <div className="space-y-3">
              {announcements.map((a, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start hover:shadow-md hover:border-blue-100 transition-all cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                    {a.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-gray-800 text-sm">{a.title}</h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{a.date}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpenIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-extrabold text-gray-900">Quick Links</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, i) => (
                link.comingSoon ? (
                  <div key={i} className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3 opacity-40 cursor-not-allowed select-none">
                    <span className="text-xl">{link.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">{link.label}</p>
                      <p className="text-xs text-gray-400">Coming soon</p>
                    </div>
                  </div>
                ) : (
                  <Link key={i} href={link.href}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md hover:border-blue-200 hover:bg-blue-50 transition-all group">
                    <span className="text-xl">{link.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 truncate">{link.label}</p>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-gray-300 group-hover:text-blue-400 flex-shrink-0" />
                  </Link>
                )
              ))}
            </div>

            {/* Tips */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-100">
              <h3 className="font-bold text-blue-800 text-sm mb-3">💡 Student Tips</h3>
              <div className="space-y-2">
                {tips.map((t, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-base flex-shrink-0">{t.emoji}</span>
                    <p className="text-xs text-blue-700 leading-relaxed">{t.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheckIcon className="w-8 h-8 text-green-500" />
              <h3 className="font-bold text-gray-800">GDPR Compliant</h3>
              <p className="text-sm text-gray-500">No real personal data collected. All data is fictional.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">♿</span>
              <h3 className="font-bold text-gray-800">WCAG AA Accessible</h3>
              <p className="text-sm text-gray-500">Built with keyboard navigation, aria labels, and focus states.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">⚡</span>
              <h3 className="font-bold text-gray-800">Built with Next.js</h3>
              <p className="text-sm text-gray-500">Fast, modern, and deployed on Netlify with auto-deploy.</p>
            </div>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-white">Ready to explore campus life?</h2>
        <p className="text-blue-200 mt-3 mb-10 text-lg">
          No account needed for most features — just jump in!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/events"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-10 py-4 rounded-2xl transition-all shadow-xl">
            Browse Events <ArrowRightIcon className="w-5 h-5" />
          </Link>
          <Link href="/login"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-10 py-4 rounded-2xl transition-all border border-white/30">
            Sign In <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">🎓 Campus Companion</p>
            <p className="text-gray-400 text-sm mt-1">TU Dublin — Group 5 — CA3 2025</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <Link href="/canteen" className="hover:text-white transition-colors">Canteen</Link>
            <Link href="/hpage" className="hover:text-white transition-colors">Helpdesk</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
          <p className="text-gray-600 text-xs">Built with Next.js · TypeScript · Tailwind · Supabase</p>
        </div>
      </footer>

    </main>
  );
}