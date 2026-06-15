"use client";

import { Menu } from "lucide-react";

interface TopbarProps {
  coachName: string;
  onMenuClick: () => void;
}

export default function Topbar({ coachName, onMenuClick }: TopbarProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#020817]/90 backdrop-blur-xl md:hidden">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="text-right min-w-0">
          <p className="text-xs text-cyan-200/70">Welcome back</p>
          <p className="text-sm font-semibold text-white truncate">{coachName}</p>
        </div>
      </div>
    </div>
  );
}
