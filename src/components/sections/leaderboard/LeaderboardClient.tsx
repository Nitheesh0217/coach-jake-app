"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getAvatarImage } from "@/lib/imageUtils";

type Entry = {
  user_id: string;
  full_name: string;
  sessions_7d: number;
  sessions_30d: number;
  sessions_all_time: number;
  rank: number;
  archetype?: string;
};

interface Props {
  entries: Entry[];
  currentUserId: string | null;
}

const POS = ["SG", "PG", "SF", "PF", "C", "PG", "SF", "PF", "SG", "PG"];

export default function LeaderboardClient({ entries, currentUserId }: Props) {
  const [tf, setTf] = useState<"week" | "month" | "all">("week");

  const sorted = [...entries].sort((a, b) => {
    if (tf === "month") return b.sessions_30d - a.sessions_30d;
    if (tf === "all") return b.sessions_all_time - a.sessions_all_time;
    return b.sessions_7d - a.sessions_7d;
  });

  const ses = (e: Entry) => {
    if (tf === "month") return e.sessions_30d;
    if (tf === "all") return e.sessions_all_time;
    return e.sessions_7d;
  };
  const top3 = sorted.slice(0, 3);

  // Podium: 2nd left, 1st center, 3rd right
  const podium = [top3[1], top3[0], top3[2]].filter(Boolean);
  const podRanks = [2, 1, 3];
  const podH = ["h-[110px]", "h-[150px]", "h-[90px]"];
  const podColors = [
    "bg-zinc-700",
    "bg-gradient-to-t from-amber-700 to-amber-500",
    "bg-amber-900/80",
  ];

  if (!entries.length)
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center">
        <Trophy className="w-14 h-14 text-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-300 font-semibold mb-1">
          Be the first on the board
        </p>
        <p className="text-zinc-600 text-sm mb-6">
          Complete workouts to earn a spot.
        </p>
        <a
          href="/workouts"
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full px-6 py-2.5 transition-all"
        >
          Go to Workouts →
        </a>
      </div>
    );

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400 fill-amber-400" />
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Leaderboard
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1">
            {(["week", "month", "all"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTf(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  tf === t
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "text-zinc-600 hover:text-zinc-300"
                }`}
              >
                {t === "week"
                  ? "This Week"
                  : t === "month"
                    ? "This Month"
                    : "All Time"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Podium */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-end justify-center gap-6"
        >
          {podium.map((entry, pi) => {
            if (!entry) return null;
            const rank = podRanks[pi];
            const isFirst = rank === 1;
            return (
              <div
                key={entry.user_id}
                className={`flex flex-col items-center ${
                  isFirst ? "order-2" : pi === 0 ? "order-1" : "order-3"
                }`}
              >
                {isFirst && (
                  <Trophy className="w-7 h-7 text-amber-400 fill-amber-400 mb-1" />
                )}
                <div
                  className={`font-black mb-2 ${
                    isFirst
                      ? "text-3xl text-amber-400"
                      : "text-2xl text-zinc-400"
                  }`}
                >
                  {rank}
                </div>
                <img
                  src={getAvatarImage(entry.full_name)}
                  alt={entry.full_name}
                  className={`rounded-full object-cover border-2 mb-2 ${
                    isFirst
                      ? "w-20 h-20 border-amber-400"
                      : "w-14 h-14 border-zinc-600"
                  }`}
                  style={
                    isFirst
                      ? { boxShadow: "0 0 20px rgba(245,158,11,0.4)" }
                      : {}
                  }
                />
                <p
                  className={`font-black ${
                    isFirst ? "text-2xl text-amber-400" : "text-xl text-white"
                  }`}
                >
                  {ses(entry)}
                </p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-wider">
                  SESSIONS
                </p>
                <div
                  className={`mt-3 w-20 rounded-t-lg flex items-end justify-center pb-2 ${podH[pi]} ${podColors[pi]}`}
                >
                  <span className="text-xl font-black text-white/80">
                    {rank}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Top Performers label */}
        <p className="text-[11px] uppercase tracking-widest text-zinc-600 font-bold">
          Top Performers
        </p>

        {/* Full list */}
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-widest text-zinc-600 font-bold mb-4">
            Full Leaderboard
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={tf}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {sorted.map((e, i) => {
                const isMe = e.user_id === currentUserId;
                const up = i < 3,
                  down = i > 5;
                return (
                  <motion.div
                    key={e.user_id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.035 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                      isMe
                        ? "border-emerald-500/40 bg-emerald-500/8"
                        : "border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className={`text-base font-black w-6 text-center flex-shrink-0 ${i === 0 ? "text-amber-400" : i === 1 ? "text-zinc-300" : i === 2 ? "text-amber-700" : "text-zinc-700"}`}
                    >
                      {i + 1}
                    </span>
                    <img
                      src={getAvatarImage(e.full_name)}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border border-zinc-700 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <span
                        className={`text-sm font-bold ${isMe ? "text-emerald-400" : "text-white"}`}
                      >
                        {isMe ? "You" : e.full_name}
                      </span>
                      {isMe && (
                        <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded uppercase">
                          YOU
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-zinc-700">
                        {e.archetype ?? POS[i] ?? ""}
                      </span>
                    </div>
                    <div className="text-right mr-2">
                      <p className="text-sm font-black text-white">{ses(e)}</p>
                      <p className="text-[10px] text-zinc-600">sessions</p>
                    </div>
                    <div className="w-7 flex items-center justify-center flex-shrink-0">
                      {up ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> {i === 0 ? 2 : 1}
                        </span>
                      ) : down ? (
                        <span className="text-xs font-bold text-red-400 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" /> {i > 7 ? 2 : 1}
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
          <p className="text-center text-[11px] text-zinc-700 mt-4 flex items-center justify-center gap-1.5">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" />
            </svg>
            Leaderboard updates every 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
