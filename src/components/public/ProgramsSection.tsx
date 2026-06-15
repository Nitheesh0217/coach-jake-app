export default function ProgramsSection() {
  const cards = [
    {
      badge: "MOST POPULAR",
      badgeColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/20",
      badgeIcon: "⚡",
      title: "Vertical Jump Transformation",
      desc: "12-week program to add serious bounce and explosiveness off the floor.",
      meta: "12 Weeks",
      metaRight: "Intermediate",
      image: "off-season.jpg.png",
      popular: true,
    },
    {
      badge: "STRENGTH",
      badgeColor: "text-cyan-400",
      badgeBg: "bg-cyan-500/20",
      badgeIcon: "💪",
      title: "Strength & Power Builder",
      desc: "Build foundational strength, explosiveness, and on-court power.",
      meta: "10 Weeks",
      metaRight: "All Levels",
      image: "in-season.jpg.png",
      popular: false,
    },
    {
      badge: "SKILLS",
      badgeColor: "text-violet-400",
      badgeBg: "bg-violet-500/20",
      badgeIcon: "🎯",
      title: "Hoop IQ & Skills Development",
      desc: "Sharpen your skills, decision-making, and overall game.",
      meta: "8 Weeks",
      metaRight: "All Levels",
      image: "youth.jpg.png",
      popular: false,
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

      {/* Program Cards - Horizontal Layout */}
      <div className="space-y-4">
        {cards.map((c) => (
          <article
            key={c.title}
            className={`group flex gap-6 rounded-2xl border bg-zinc-900/60 p-6 shadow-lg shadow-black/40 transition-all duration-300 hover:bg-zinc-900 ${
              c.popular
                ? "border-emerald-500/50 shadow-emerald-glow-sm"
                : "border-zinc-800 hover:border-emerald-500/40 hover:shadow-emerald-glow-sm"
            }`}
          >
            {/* Image Thumbnail - Left */}
            <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 shadow-md">
              <img
                src={`/programs/${c.image}`}
                alt={c.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content - Right */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border ${c.badgeBg} border-current px-3 py-1 text-xs font-bold uppercase tracking-wide ${c.badgeColor}`}
                >
                  {c.badgeIcon}
                  {c.badge}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-zinc-50">{c.title}</h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                  {c.desc}
                </p>
              </div>

              {/* Footer - Meta and Link */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 font-medium">
                  📅 {c.meta} · 📊 {c.metaRight}
                </p>
                <a
                  href="/programs"
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
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
