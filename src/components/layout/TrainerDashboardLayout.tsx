"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Menu, X } from "lucide-react";

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
    <div className="min-h-screen bg-transparent text-[#f9fafb]">
      {/* Background image layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.25 }}
        aria-hidden
      />

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="md:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <Topbar
          coachName={coachName}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 bg-black/40 px-4 py-4 text-center text-xs text-zinc-500">
          <p>Coach Jake © 2025. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
