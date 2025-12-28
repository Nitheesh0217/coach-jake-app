export default function ProgramsSection() {
  const cards = [
    {
      type: "In‑Season",
      title: "Performance Maintenance",
      desc: "Keep strength, speed, and on-court explosiveness while reducing cumulative fatigue.",
      meta: "8–10 weeks · 3 sessions/week · Ideal for HS & college players",
      popular: true,
      image: "in-season.jpg.png",
    },
    {
      type: "Off‑Season",
      title: "Strength & Power",
      desc: "Build a bigger engine: hypertrophy, power lifts, and velocity work for next season.",
      meta: "10–16 weeks · 4 sessions/week · Ideal for athletes seeking mass & power",
      image: "off-season.jpg.png",
    },
    {
      type: "Youth Development",
      title: "Foundations Program",
      desc: "Movement literacy, mobility, and habit coaching for young athletes starting their journey.",
      meta: "6–12 weeks · 2–3 sessions/week · Ideal for middle & high school athletes",
      image: "youth.jpg.png",
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-50">Programs</h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">Outcome-focused plans for athletes: in‑season readiness, off‑season growth, and long-term development.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c, idx) => (
          <article key={c.title} className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-lg shadow-black/40 transition transform duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-zinc-900">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-300">{c.type}</div>
                  {c.popular && (
                    <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">Most popular</span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-zinc-50 mt-3">{c.title}</h3>
                <p className="text-sm text-zinc-300 mt-2">{c.desc}</p>
              </div>

              <div className="hidden sm:block w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 flex-shrink-0">
                <img src={`/programs/${c.image}`} alt={`${c.title} thumbnail`} className="w-full h-full object-cover" />
              </div>
            </div>

            <div>
              <div className="mt-3 text-xs text-zinc-400">{c.meta}</div>
              <a href="/programs" className="mt-4 inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300">View details</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
