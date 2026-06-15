// FILE: src/components/leaderboard/LeaderboardClient.tsx
"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Zap } from "lucide-react";

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

export default function LeaderboardClient({
  entries,
  currentUserId,
}: LeaderboardClientProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-12 text-center">
        <Trophy className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-zinc-300 mb-2">
          Be the first on the board
        </h3>
        <p className="text-sm text-zinc-500 mb-6">
          Complete your workouts to earn a spot on the leaderboard.
        </p>
        <a
          href="/workouts"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black font-semibold rounded-full px-6 py-2.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          Go to Workouts →
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, idx) => {
        const isMe = entry.user_id === currentUserId;
        const isRank1 = entry.rank === 1;
        const isTopThree = entry.rank <= 3;

        return (
          <motion.div
            key={entry.user_id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            className={`rounded-2xl border p-6 flex items-center justify-between transition-all duration-200 ${
              isMe
                ? "border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                : isRank1
                  ? "border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-transparent shadow-lg shadow-amber-500/10"
                  : isTopThree
                    ? "border-zinc-700 bg-zinc-800/40 hover:border-zinc-600"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="text-center">
                {isRank1 ? (
                  <Medal className="w-8 h-8 text-amber-400" />
                ) : (
                  <span className="text-2xl font-bold text-zinc-400">
                    #{entry.rank}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-semibold capitalize ${
                    isMe
                      ? "text-emerald-300"
                      : isRank1
                        ? "text-amber-300"
                        : "text-zinc-100"
                  }`}
                >
                  {entry.full_name}
                  {isMe && (
                    <span className="text-xs font-normal text-emerald-400 ml-2 lowercase">
                      (You)
                    </span>
                  )}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  {entry.sessions_30d} sessions last 30 days
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <p className="text-2xl font-bold text-amber-400">
                  {entry.sessions_7d}
                </p>
              </div>
              <p className="text-xs text-zinc-400 mt-1">this week</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
