"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomTabBar() {
  const pathname = usePathname();

  const isTrainer = pathname.startsWith("/trainer-dashboard");
  const tabs = [
    { href: isTrainer ? "/trainer-dashboard" : "/dashboard", icon: Home, label: "Home" },
    { href: "/workouts", icon: Dumbbell, label: "Workouts" },
    { href: "/leaderboard", icon: Trophy, label: "Board" },
    { href: isTrainer ? "/trainer-dashboard?settings=true" : "/dashboard?settings=true", icon: User, label: "Profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-[rgba(5,8,22,0.95)] backdrop-blur-xl border-t border-zinc-800/60 pb-safe flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          (pathname.startsWith(tab.href.split("?")[0]) && tab.href.split("?")[0] !== "/") ||
          (tab.href.split("?")[0] === "/" && pathname === "/");

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 relative"
          >
            <motion.div
              animate={{ scale: isActive ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-emerald-400" : "text-zinc-500"}`}
              />
            </motion.div>
            <span
              className={`text-[10px] font-semibold leading-none ${isActive ? "text-emerald-400" : "text-zinc-500"}`}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-emerald-500 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
