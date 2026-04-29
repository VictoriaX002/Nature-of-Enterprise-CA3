"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Fictional users
const USERS = [
  { email: "student@tudublin.ie", password: "campus123", name: "Jamie O'Brien" },
  { email: "staff@tudublin.ie", password: "staff456", name: "Dr. Sarah Murphy" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const user = USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        router.push("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            🎓 Campus Companion
          </h1>
          <p className="text-blue-100 mt-2">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Welcome back</h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="student@tudublin.ie"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* Demo credentials */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
            <p className="font-semibold text-blue-700 mb-2">Demo credentials:</p>
            <p>📧 student@tudublin.ie</p>
            <p>🔑 campus123</p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}