"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomTabBar from "./BottomTabBar";

interface TrainerDashboardLayoutProps {
  children: React.ReactNode;
  coachName: string;
}

export default function TrainerDashboardLayout({
  children,
  coachName,
}: TrainerDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#010510] text-[#f9fafb]">
      <div
        className="fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(16,185,129,0.14), transparent 35%), radial-gradient(circle at 80% 10%, rgba(56,189,248,0.14), transparent 34%), radial-gradient(circle at 70% 75%, rgba(59,130,246,0.12), transparent 40%), #010510",
        }}
        aria-hidden
      />
      <div className="fixed inset-0 -z-10 bg-[url('/file.svg')] opacity-[0.04]" aria-hidden />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:ml-60 flex min-h-screen flex-col border-l border-cyan-500/20">
        <Topbar
          coachName={coachName}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 pb-16 md:pb-0">{children}</main>

        <BottomTabBar />

        <footer className="border-t border-cyan-500/20 bg-[#020817]/70 px-4 py-3 text-center text-xs text-cyan-100/55 md:ml-0">
          <p>Coach Jake © 2026</p>
        </footer>
      </div>
    </div>
  );
}
