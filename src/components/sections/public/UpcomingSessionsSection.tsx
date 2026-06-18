export default function UpcomingSessionsSection() {
  const today = new Date();
  const addDays = (d: Date, n: number) => {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const sessions = [
    {
      title: "Speed & Agility",
      type: "Athletic Development",
      spots: 4,
      date: addDays(today, 2),
    },
    {
      title: "Strength & Power",
      type: "Weight Room",
      spots: 6,
      date: addDays(today, 4),
    },
    {
      title: "Ball Handling",
      type: "On-Court Skills",
      spots: 3,
      date: addDays(today, 7),
    },
  ];

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4 bg-transparent">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-50">
          Upcoming sessions
        </h3>
        <div className="text-sm text-zinc-400">
          Spaces limited • Reserve early
        </div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {sessions.map((s) => (
          <div
            key={s.title}
            className="min-w-[280px] flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-200"
          >
            <div className="flex-1">
              <div className="text-sm font-semibold text-zinc-50">
                {s.title}
              </div>
              <div className="text-xs text-zinc-400 mt-1">{s.date}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.type}</div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <div className="text-right">
                <div className="text-xs font-medium text-emerald-400">
                  {s.spots} spots
                </div>
              </div>
              <a
                href="#reserve"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3 py-2 text-xs font-semibold text-black transition-all duration-200"
              >
                Reserve
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
