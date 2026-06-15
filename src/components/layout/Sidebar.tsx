"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Trophy,
  BarChart3,
  X,
  Zap,
  LogOut,
} from "lucide-react";
import { supabaseBrowser } from "@/lib/supabaseClient";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Workouts", href: "/workouts", icon: Dumbbell },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Progress", href: "#", icon: BarChart3 },
];

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    onClose();
    router.push("/login");
  };

  return (
    <>
      <div className="px-6 py-8 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40">
            <Zap className="h-5 w-5" />
          </span>
          <h1 className="text-[2rem] leading-none font-extrabold bg-linear-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent italic">
            Coach Jake
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href !== "#" && pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-lg transition-all ${
                isActive
                  ? "border-emerald-400/75 bg-emerald-500/12 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                  : "border-transparent text-slate-400 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-slate-200"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "text-emerald-300" : "text-slate-500 group-hover:text-cyan-300"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-4 mb-6 rounded-2xl border border-cyan-500/25 bg-[#040d1f]/90 p-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full border border-cyan-400/60 bg-cyan-400/10 flex items-center justify-center text-lg font-semibold text-cyan-200">
            ND
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-white">Nitheesh D.</p>
            <span className="inline-flex rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-xs text-amber-300">
              Athlete
            </span>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 w-full rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-left text-sm text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
        >
          <span className="inline-flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </span>
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside className="hidden md:flex md:fixed md:left-0 md:top-0 md:z-40 md:h-screen md:w-60 md:flex-col border-r border-cyan-500/20 bg-[#020817]/95 backdrop-blur-xl">
        <SidebarContent onClose={() => {}} />
      </aside>

      {open && (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-cyan-500/20 bg-[#020817] md:hidden">
          <div className="flex justify-end px-4 py-3 border-b border-cyan-500/20">
            <button
              onClick={onClose}
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-1.5 text-cyan-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <SidebarContent onClose={onClose} />
        </aside>
      )}
    </>
  );
}
