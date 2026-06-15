"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { LayoutDashboard, Dumbbell, Trophy, BarChart2, LogOut, Zap, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workouts", label: "Workouts", icon: Dumbbell },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/progress", label: "Progress", icon: BarChart2 },
];

export default function AppSidebarLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = supabaseBrowser();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const isActive = (path: string) => pathname === path || (path !== "/dashboard" && pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-[#050816] flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen md:w-[220px] border-r border-zinc-800/60 bg-[#050816] z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-6 border-b border-zinc-800/60">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-black text-white tracking-tight leading-none">
              Coach <span className="text-emerald-400">Jake</span>
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user + logout */}
        <div className="px-3 py-4 border-t border-zinc-800/60 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-emerald-400">CJ</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Coach Jake</p>
              <p className="text-[10px] text-zinc-600 truncate">coachjake@hoops.com</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-[220px] overflow-auto">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050816]/95 backdrop-blur-xl border-t border-zinc-800/60 z-50 flex items-center justify-around px-2 py-2">
        {navItems.slice(0, 4).map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 ${
                active ? "text-emerald-400" : "text-zinc-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
