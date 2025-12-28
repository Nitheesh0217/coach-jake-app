"use client";

import { useState } from "react";
import { Menu, Search, Bell, Settings } from "lucide-react";

interface TopbarProps {
  coachName: string;
  onMenuClick: () => void;
}

export default function Topbar({ coachName, onMenuClick }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications] = useState(true);

  return (
    <div className="sticky top-0 z-20 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Menu + title */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 hover:bg-zinc-900 rounded-lg transition text-zinc-400 hover:text-zinc-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-zinc-50">Trainer Dashboard</h2>
            <p className="text-xs text-zinc-500">Welcome back, {coachName}</p>
          </div>
        </div>

        {/* Center/Right: Search + actions */}
        <div className="flex items-center gap-4 flex-1 md:flex-initial">
          {/* Search */}
          <div className="hidden sm:flex relative flex-1 md:flex-initial md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button
              className="relative p-2 hover:bg-zinc-900 rounded-lg transition text-zinc-400 hover:text-zinc-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {hasNotifications && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </button>

            {/* Settings */}
            <button
              className="p-2 hover:bg-zinc-900 rounded-lg transition text-zinc-400 hover:text-zinc-200"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile avatar */}
            <button className="ml-2 w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition">
              {coachName.charAt(0).toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
