export default function GamificationSection() {
  const badges = [
    {
      key: "iron",
      label: "Iron Core – 4 weeks completed",
      unlocked: true,
      color: "emerald",
    },
    {
      key: "clutch",
      label: "Clutch Time – 100% in‑season lifts",
      unlocked: true,
      color: "amber",
    },
    {
      key: "above",
      label: 'Above the Rim – +3" vertical',
      unlocked: false,
      color: "gray",
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Marcus T.",
      pts: 2840,
      badge: "🏆",
      color: "text-amber-400",
    },
    {
      rank: 2,
      name: "Jordan W.",
      pts: 2610,
      badge: "🥈",
      color: "text-zinc-300",
    },
    {
      rank: 3,
      name: "Devon A.",
      pts: 2390,
      badge: "🥉",
      color: "text-amber-600",
    },
    {
      rank: 4,
      name: "Isaiah R.",
      pts: 2100,
      badge: "",
      color: "text-zinc-400",
    },
    { rank: 5, name: "Caleb M.", pts: 1950, badge: "", color: "text-zinc-400" },
  ];

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-50">
        Gamification & consistency
      </h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">
        Streaks, badges, and private leaderboards help athletes build habits and
        compete with their squad.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Consistency scoreboard */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition transform duration-250 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-emerald-500/[0.04]">
          <div className="text-sm font-semibold text-zinc-50">
            Consistency scoreboard
          </div>
          <div className="mt-2 text-sm text-zinc-300">
            This week: <span className="font-medium text-zinc-100">3/4</span>{" "}
            sessions completed
          </div>
          <div className="mt-1 text-sm text-zinc-300">
            Week streak:{" "}
            <span className="font-medium text-zinc-100">5 days</span>
          </div>

          <div className="mt-4">
            <div className="h-3 rounded-full bg-gradient-to-r from-red-500/30 via-amber-400/30 to-emerald-500/30 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-red-500 to-emerald-500"
                style={{ width: "70%" }}
              />
            </div>
            <div className="mt-2 text-xs text-zinc-400">
              Progress toward weekly goal
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition transform duration-250 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-emerald-500/[0.04]">
          <div className="text-sm font-semibold text-zinc-50">
            Badges you can earn
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((b) => (
              <div
                key={b.key}
                className={`rounded-full px-3 py-1 text-xs font-medium ${b.unlocked ? (b.color === "emerald" ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/10 text-amber-300 border border-amber-500/30") : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}
              >
                {b.label}
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-zinc-400">
            Locked badges appear muted; earned badges glow with color.
          </div>
        </div>

        {/* Mini leaderboard */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition transform duration-250 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-emerald-500/[0.04]">
          <div className="text-sm font-semibold text-zinc-50">
            Mini leaderboard
          </div>
          <div className="mt-3 space-y-2">
            {leaderboard.map((p) => (
              <div
                key={p.rank}
                className={`rounded-xl px-3 py-2 flex items-center justify-between transition-all duration-150 ${p.rank === 1 ? "ring-1 ring-amber-500/30 bg-amber-500/[0.06]" : "bg-white/[0.02] hover:bg-white/[0.04]"}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${p.color}`}>
                    {p.badge || `#${p.rank}`}
                  </span>
                  <span className="text-xs text-zinc-100 font-medium">
                    {p.name}
                  </span>
                </div>
                <div className="text-xs text-amber-400 font-semibold">
                  ⚡ {p.pts}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-zinc-400">
            Leaderboards can be private to your team or group.
          </div>
        </div>
      </div>
    </section>
  );
}
