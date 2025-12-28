export default function InsideAppSection() {
  const cards = [
    {
      title: "Today’s workout",
      subtitle: "Warmup → Strength → Conditioning",
      type: "workout",
    },
    {
      title: "Consistency streak",
      subtitle: "7-day streak · 5 checks",
      type: "streak",
    },
    {
      title: "Leaderboard snapshot",
      subtitle: "Top performers this week",
      type: "leaderboard",
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-50">Inside the app</h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">Athletes get daily workouts, streak tracking, and leaderboards to stay accountable and competitive.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article key={c.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-50">{c.title}</h3>
              <div className="text-xs text-zinc-400">{c.subtitle}</div>
            </div>

            <div className="flex-1">
              {c.type === 'workout' && (
                <ul className="space-y-2">
                  <li className="h-3 rounded bg-zinc-800/60 w-3/4"></li>
                  <li className="h-3 rounded bg-zinc-800/60 w-1/2"></li>
                  <li className="h-3 rounded bg-zinc-800/60 w-2/3"></li>
                </ul>
              )}

              {c.type === 'streak' && (
                <div className="flex items-center gap-3">
                  <div className="h-3 w-full bg-zinc-800/50 rounded overflow-hidden">
                    <div className="h-3 bg-emerald-500/70 rounded" style={{ width: '70%' }} />
                  </div>
                  <div className="text-xs text-zinc-300">+7</div>
                </div>
              )}

              {c.type === 'leaderboard' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-300">
                    <span>Player A</span>
                    <span>24</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Player B</span>
                    <span>18</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-right">
              <a href="/signup" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300">Try the app</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
