"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { LayoutDashboard, Dumbbell, Trophy, BarChart2, LogOut, Zap } from "lucide-react";

const navItems = [
  { href: "/dashboard",    label: "Dashboard",   icon: LayoutDashboard },
  { href: "/workouts",     label: "Workouts",    icon: Dumbbell },
  { href: "/leaderboard",  label: "Leaderboard", icon: Trophy },
  { href: "/progress",     label: "Progress",    icon: BarChart2 },
];

export default function AppSidebarLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const supabase = supabaseBrowser();

  const logout = async () => { await supabase.auth.signOut(); router.push("/login"); };
  const active  = (href: string) => pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <div className="min-h-screen bg-[#050816] flex">
      {/* ── SIDEBAR (desktop) ── */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-[220px] border-r border-zinc-800/60 bg-[#050816] z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-zinc-800/60">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          </div>
          <span className="font-black text-sm text-white tracking-tight">
            COACH <span className="text-emerald-400">JAKE</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active(href)
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}>
              <Icon className={`w-4 h-4 flex-shrink-0 ${active(href) ? "text-emerald-400" : "text-zinc-600"}`} />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-3 py-4 border-t border-zinc-800/60 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-black text-emerald-400">CJ</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Coach Jake</p>
              <p className="text-[10px] text-zinc-600 truncate">coachjake@hoops.com</p>
            </div>
          </div>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/8 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 md:ml-[220px] min-h-screen overflow-auto pb-20 md:pb-0">
        {children}
      </main>

      {/* ── BOTTOM TAB BAR (mobile) ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#050816]/95 backdrop-blur-xl border-t border-zinc-800/60 z-50 flex items-center justify-around px-2 py-2">
        {navItems.slice(0, 4).map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${active(href) ? "text-emerald-400" : "text-zinc-600"}`}>
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-semibold">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
