"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getAvatarImage } from "@/lib/imageUtils";

type LeaderboardEntry = {
  user_id: string;
  full_name: string;
  sessions_7d: number;
  sessions_30d: number;
  rank: number;
};

interface LeaderboardClientProps {
  entries: LeaderboardEntry[];
  currentUserId: string | null;
}

const POSITIONS = ["SG", "PG", "SF", "PF", "C", "PG", "SF", "PF", "SG", "PG"];

export default function LeaderboardClient({ entries, currentUserId }: LeaderboardClientProps) {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week");

  const sorted = [...entries].sort((a, b) => {
    const aVal = timeframe === "month" ? a.sessions_30d : a.sessions_7d;
    const bVal = timeframe === "month" ? b.sessions_30d : b.sessions_7d;
    return bVal - aVal;
  });

  const getSessions = (e: LeaderboardEntry) =>
    timeframe === "month" ? e.sessions_30d : e.sessions_7d;

  const top3 = sorted.slice(0, 3);
  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
  const podiumRanks = [2, 1, 3];
  const podiumHeights = ["h-[120px]", "h-[160px]", "h-[100px]"];
  const podiumColors = [
    "bg-zinc-600",
    "bg-gradient-to-t from-amber-700 to-amber-500",
    "bg-amber-900",
  ];

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center">
        <Trophy className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">Be the first on the board</h3>
        <p className="text-sm text-zinc-500 mb-6">Complete workouts to earn a spot.</p>
        <a
          href="/workouts"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full px-6 py-2.5 transition-all duration-200"
        >
          Go to Workouts →
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400 fill-amber-400" />
            <h1 className="text-3xl sm:text-4xl font-black text-white">Leaderboard</h1>
          </div>
          {/* Timeframe selector */}
          <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1">
            {(["week", "month", "all"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
                  timeframe === tf
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tf === "week" ? "This Week" : tf === "month" ? "This Month" : "All Time"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Top Performers label */}
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Top Performers</p>

        {/* Podium */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-end justify-center gap-4"
        >
          {podiumOrder.map((entry, pIdx) => {
            if (!entry) return null;
            const rank = podiumRanks[pIdx];
            const sessions = getSessions(entry);
            const isFirst = rank === 1;
            const isCurrentUser = entry.user_id === currentUserId;

            return (
              <div key={entry.user_id} className={`flex flex-col items-center ${isFirst ? "order-2" : pIdx === 0 ? "order-1" : "order-3"}`}>
                {/* Crown for 1st */}
                {isFirst && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-1"
                  >
                    <Crown className="w-7 h-7 text-amber-400 fill-amber-400" />
                  </motion.div>
                )}

                {/* Rank number */}
                <div className={`text-3xl font-black mb-2 ${isFirst ? "text-amber-400" : "text-zinc-400"}`}>
                  {rank}
                </div>

                {/* Avatar */}
                <div className={`relative mb-2 ${isFirst ? "w-20 h-20" : "w-16 h-16"}`}>
                  <img
                    src={getAvatarImage(entry.full_name)}
                    alt={entry.full_name}
                    className="w-full h-full rounded-full object-cover border-2 border-zinc-700"
                    style={isFirst ? { borderColor: "#f59e0b", boxShadow: "0 0 20px rgba(245,158,11,0.4)" } : {}}
                  />
                </div>

                {/* Name */}
                <p className={`font-bold text-sm text-center mb-1 ${isCurrentUser ? "text-emerald-400" : "text-white"}`}>
                  {entry.full_name.split(" ")[0]}
                  {isCurrentUser && " (You)"}
                </p>

                {/* Sessions */}
                <div className={`text-2xl font-black ${isFirst ? "text-amber-400" : "text-white"}`}>
                  {sessions}
                </div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">SESSIONS</p>

                {/* Podium base */}
                <div className={`mt-3 w-24 rounded-t-lg flex items-end justify-center ${podiumHeights[pIdx]} ${podiumColors[pIdx]}`}>
                  <span className="text-2xl font-black text-white/80 pb-2">{rank}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Full Leaderboard</p>

          <AnimatePresence mode="wait">
            <motion.div key={timeframe} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {sorted.map((entry, idx) => {
                const sessions = getSessions(entry);
                const isCurrentUser = entry.user_id === currentUserId;
                const trendUp = idx < 3;
                const trendDown = idx > 5;
                const pos = POSITIONS[idx] || "PG";

                return (
                  <motion.div
                    key={entry.user_id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                      isCurrentUser
                        ? "border-emerald-500/40 bg-emerald-500/8"
                        : "border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700"
                    }`}
                  >
                    {/* Rank */}
                    <span className={`text-lg font-black w-6 text-center ${
                      idx === 0 ? "text-amber-400" : idx === 1 ? "text-zinc-300" : idx === 2 ? "text-amber-700" : "text-zinc-600"
                    }`}>
                      {idx + 1}
                    </span>

                    {/* Avatar */}
                    <img
                      src={getAvatarImage(entry.full_name)}
                      alt={entry.full_name}
                      className="w-9 h-9 rounded-full object-cover border border-zinc-700 flex-shrink-0"
                    />

                    {/* Name + position */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isCurrentUser ? "text-emerald-400" : "text-white"}`}>
                          {isCurrentUser ? "You" : entry.full_name}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                            YOU
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-zinc-600">{pos}</span>
                      </div>
                    </div>

                    {/* Sessions */}
                    <div className="text-right mr-2">
                      <span className="text-sm font-black text-white">{sessions}</span>
                      <p className="text-[10px] text-zinc-600">sessions</p>
                    </div>

                    {/* Trend */}
                    <div className="w-8 flex items-center justify-center">
                      {trendUp ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          {idx === 0 ? 2 : 1}
                        </span>
                      ) : trendDown ? (
                        <span className="text-xs font-bold text-red-400 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />
                          {idx > 7 ? 2 : 1}
                        </span>
                      ) : (
                        <Minus className="w-3 h-3 text-zinc-700" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-xs text-zinc-600 mt-4 flex items-center justify-center gap-1.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Leaderboard updates every 10 minutes
          </p>
        </motion.div>
      </div>
    </div>
  );
}
