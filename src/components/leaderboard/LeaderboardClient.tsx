// FILE: src/components/leaderboard/LeaderboardClient.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, TrendingUp, Zap } from "lucide-react";
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

export default function LeaderboardClient({
  entries,
  currentUserId,
}: LeaderboardClientProps) {
  const [timeframe, setTimeframe] = useState<"week" | "month">("week");

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
          className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black font-semibold rounded-full px-6 py-2.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          Go to Workouts →
        </a>
      </div>
    );
  }

  const top3 = entries.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]]; // Reorder for podium (silver, gold, bronze)
  const podiumHeights = ["h-32", "h-40", "h-24"];
  const podiumColors = ["bg-slate-600", "bg-amber-600", "bg-orange-600"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-12">
      {/* Timeframe Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3"
      >
        {(["week", "month"] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
              timeframe === tf
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-emerald-500/40"
            }`}
          >
            This {tf === "week" ? "Week" : "Month"}
          </button>
        ))}
      </motion.div>

      {/* Podium */}
      {top3.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-end justify-center gap-4 mb-8">
            {podiumOrder.map((entry, idx) => {
              const podiumIdx = idx;
              const actualRank = entry?.rank || idx + 1;
              return (
                <div
                  key={entry?.user_id || idx}
                  className="flex flex-col items-center"
                >
                  {/* Crown Icon for 1st */}
                  {actualRank === 1 && (
                    <motion.div
                      initial={{ scale: 0, y: -20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: 0.3,
                      }}
                      className="mb-2"
                    >
                      <Crown className="w-8 h-8 text-amber-400" />
                    </motion.div>
                  )}

                  {/* Podium Card */}
                  <motion.div
                    className={`${podiumHeights[podiumIdx]} ${podiumColors[podiumIdx]} rounded-t-2xl flex flex-col items-center justify-between pt-4 pb-6 px-4 w-28 relative group cursor-pointer hover:shadow-2xl transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Avatar Image */}
                    <motion.img
                      src={getAvatarImage(entry?.full_name || "User", 56)}
                      alt={entry?.full_name}
                      className="w-14 h-14 rounded-full border-2 border-white/30 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: 0.1 * podiumIdx,
                      }}
                    />

                    {/* Rank Badge */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">
                        {actualRank}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="text-center mt-2">
                      <p className="text-white font-bold text-sm line-clamp-1">
                        {entry?.full_name}
                      </p>
                      <p className="text-white/80 text-xs font-semibold">
                        {entry?.sessions_7d} workouts
                      </p>
                    </div>
                  </motion.div>

                  {/* Podium Step Number */}
                  <div className="h-1 bg-white/20 w-full mt-0.5 text-center text-white font-bold text-xs">
                    #{actualRank}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Podium Base */}
          <div className="flex justify-center gap-4">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`${
                  idx === 0 ? "w-32 h-6" : idx === 1 ? "w-40 h-8" : "w-28 h-4"
                } bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-3xl border-t-2 border-white/10`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Full Rankings List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold mb-4">Full Rankings</h2>
        <div className="space-y-2">
          <AnimatePresence mode="wait">
            {entries.map((entry, idx) => {
              const isMe = entry.user_id === currentUserId;
              const isTopThree = entry.rank <= 3;

              return (
                <motion.div
                  key={entry.user_id}
                  variants={itemVariants}
                  className={`rounded-xl border p-4 flex items-center justify-between group transition-all duration-300 ${
                    isMe
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : isTopThree
                        ? "border-zinc-700 bg-zinc-800/40 hover:border-zinc-600"
                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Avatar Image */}
                    <motion.img
                      src={getAvatarImage(entry.full_name, 40)}
                      alt={entry.full_name}
                      className="w-10 h-10 rounded-full border border-zinc-700 shadow-md shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold capitalize ${
                          isMe
                            ? "text-emerald-300"
                            : isTopThree
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
                      <p className="text-xs text-zinc-500 mt-1">
                        {entry.sessions_30d} sessions last 30 days
                      </p>
                    </div>
                  </div>

                  {/* This Week Stats */}
                  <div className="flex items-center gap-6 ml-4">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <p className="text-2xl font-bold text-amber-400">
                          {entry.sessions_7d}
                        </p>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">this week</p>
                    </div>

                    {/* Trend */}
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
