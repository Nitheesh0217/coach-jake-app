"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Workouts", href: "/workouts", icon: BookOpen },
  { label: "Leaderboard", href: "/leaderboard", icon: Users },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:fixed md:left-0 md:top-0 md:h-screen md:w-60 md:flex-col md:border-r md:border-zinc-800 md:bg-black/90 md:backdrop-blur-sm z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <span className="text-sm font-bold text-emerald-400">CJ</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-50">Coach Jake</p>
            <p className="text-xs text-zinc-500">Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/20 border-l-2 border-emerald-500 text-emerald-300"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 px-3 py-4 text-xs text-zinc-500">
          <p className="text-center">v1.0.0</p>
        </div>
      </div>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed left-0 top-0 h-screen w-60 flex flex-col border-r border-zinc-800 bg-black z-50 md:hidden">
          {/* Close button */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <span className="text-sm font-bold text-emerald-400">CJ</span>
              </div>
              <p className="text-sm font-semibold text-zinc-50">Coach Jake</p>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-zinc-900 rounded-lg">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-500/20 border-l-2 border-emerald-500 text-emerald-300"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
