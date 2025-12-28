export default function UpcomingSessionsSection() {
  const sessions = [
    { name: 'Guards skills clinic', datetime: 'Sat, Jan 10 · 10:00 AM', level: 'HS & AAU', href: '#reserve' },
    { name: 'Vertical power session', datetime: 'Sun, Jan 11 · 2:00 PM', level: 'Open level', href: '#reserve' },
    { name: 'Shooting mechanics', datetime: 'Wed, Jan 14 · 6:30 PM', level: 'All levels', href: '#reserve' },
  ];

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-50">Upcoming sessions</h3>
        <div className="text-sm text-zinc-400">Spaces limited • Reserve early</div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {sessions.map((s) => (
          <div key={s.name} className="min-w-[220px] rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition transform duration-250 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 hover:border-emerald-500/50 flex flex-col gap-2">
            <div className="text-sm font-semibold text-zinc-50">{s.name}</div>
            <div className="text-xs text-zinc-400">{s.datetime}</div>
            <div className="text-xs text-zinc-400">{s.level}</div>
            <a href={s.href} className="mt-3 inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-black transition transform hover:-translate-y-0.5 hover:shadow-emerald-500/30">Reserve spot</a>
          </div>
        ))}
      </div>
    </section>
  );
}
