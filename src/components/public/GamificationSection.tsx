export default function GamificationSection() {
  const badges = [
    { key: 'iron', label: 'Iron Core – 4 weeks completed', unlocked: true, color: 'emerald' },
    { key: 'clutch', label: 'Clutch Time – 100% in‑season lifts', unlocked: true, color: 'amber' },
    { key: 'above', label: 'Above the Rim – +3" vertical', unlocked: false, color: 'gray' },
  ];

  const leaderboard = [
    { initials: 'J.M.', role: 'Guard', metric: '4/4 sessions' },
    { initials: 'K.S.', role: 'Wing', metric: '3/4 sessions' },
    { initials: 'R.D.', role: 'Forward', metric: '3/4 sessions' },
  ];

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-50">Gamification & consistency</h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">Streaks, badges, and private leaderboards help athletes build habits and compete with their squad.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Consistency scoreboard */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition transform duration-250 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-zinc-900">
          <div className="text-sm font-semibold text-zinc-50">Consistency scoreboard</div>
          <div className="mt-2 text-sm text-zinc-300">This week: <span className="font-medium text-zinc-100">3/4</span> sessions completed</div>
          <div className="mt-1 text-sm text-zinc-300">Week streak: <span className="font-medium text-zinc-100">5 days</span></div>

          <div className="mt-4">
            <div className="h-3 rounded-full bg-gradient-to-r from-red-500/30 via-amber-400/30 to-emerald-500/30 overflow-hidden">
              <div className="h-3 rounded-full bg-gradient-to-r from-red-500 to-emerald-500" style={{ width: '70%' }} />
            </div>
            <div className="mt-2 text-xs text-zinc-400">Progress toward weekly goal</div>
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition transform duration-250 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-zinc-900">
          <div className="text-sm font-semibold text-zinc-50">Badges you can earn</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((b) => (
              <div key={b.key} className={`rounded-full px-3 py-1 text-xs font-medium ${b.unlocked ? (b.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30') : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                {b.label}
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-zinc-400">Locked badges appear muted; earned badges glow with color.</div>
        </div>

        {/* Mini leaderboard */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition transform duration-250 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-zinc-900">
          <div className="text-sm font-semibold text-zinc-50">Mini leaderboard</div>
          <div className="mt-3 space-y-2">
            {leaderboard.map((p, i) => (
              <div key={p.initials} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-100">{p.initials}</div>
                  <div className="text-xs text-zinc-300">{p.initials} · {p.role}</div>
                </div>
                <div className="text-xs text-zinc-300">{p.metric}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-zinc-400">Leaderboards can be private to your team or group.</div>
        </div>
      </div>
    </section>
  );
}
