"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = supabaseBrowser();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Coach Jake
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/workouts", label: "Workouts" },
            { href: "/leaderboard", label: "Leaderboard" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors shadow-lg hover:shadow-red-600/50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
