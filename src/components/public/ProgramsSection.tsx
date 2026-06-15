export default function ProgramsSection() {
  const cards = [
    {
      badge: "MOST POPULAR",
      badgeClass: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
      title: "Vertical Jump Transformation",
      desc: "12-week program to add serious bounce and explosiveness off the floor.",
      meta: "12 Weeks · Intermediate",
      image: "off-season.jpg.png",
    },
    {
      badge: "STRENGTH",
      badgeClass: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300",
      title: "Strength & Power Builder",
      desc: "Build foundational strength, explosiveness, and on-court power.",
      meta: "10 Weeks · All Levels",
      image: "in-season.jpg.png",
    },
    {
      badge: "SKILLS",
      badgeClass: "bg-violet-500/20 border-violet-500/40 text-violet-300",
      title: "Hoop IQ & Skills Development",
      desc: "Sharpen your skills, decision-making, and overall game.",
      meta: "8 Weeks · All Levels",
      image: "youth.jpg.png",
    },
  ];

  return (
    <section className="mx-auto mt-24 max-w-6xl px-4">
      {/* Header with View all programs link */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black text-zinc-50">Programs</h2>
          <p className="text-zinc-400 text-base mt-2">
            Structured. Proven. Built for Results.
          </p>
        </div>
        <a
          href="/programs"
          className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
        >
          View all programs →
        </a>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, idx) => (
          <article
            key={c.title}
            className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden shadow-lg shadow-black/40 transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-900 hover:shadow-emerald-glow-sm"
          >
            {/* Image Area */}
            <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700">
              <img
                src={`/programs/${c.image}`}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Badge */}
              <div
                className={`absolute top-4 left-4 inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${c.badgeClass}`}
              >
                {c.badge}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-zinc-50 mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-3">
                <p className="text-xs text-zinc-500 font-medium">📅 {c.meta}</p>
                <a
                  href="/programs"
                  className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View details →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
