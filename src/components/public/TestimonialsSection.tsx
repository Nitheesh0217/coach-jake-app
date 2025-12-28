export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Noah M.',
      role: 'HS Guard',
      meta: 'Varsity starter',
      context: 'Spring 2025 · HS Guard · Coach J',
      shortQuote: 'Added <span class="font-semibold text-emerald-400">+4\" vertical</span> and earned a starting spot.',
      stat: '+4" vertical, earned first varsity start',
      video: true,
    },
    {
      name: 'Ethan R.',
      role: 'AAU Wing',
      meta: 'AAU All‑Tournament',
      context: 'Summer 2024 · AAU Wing · Coach T',
      shortQuote: 'Film breakdowns helped me <span class="font-semibold text-emerald-400">finish through contact</span>.',
      stat: 'Improved finishing and court IQ',
    },
    {
      name: 'Luca S.',
      role: 'College Guard',
      meta: 'Rotation player',
      context: 'Fall 2023 · College Guard · Strength Staff',
      shortQuote: 'Consistency tracking kept me honest — <span class="font-semibold text-emerald-400">+3 weighted sessions/week</span>.',
      stat: '+3 weighted sessions/week',
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-50">Player stories</h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">Trusted by high school, AAU, and college athletes.</p>

      {/* Ratings snapshot */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1 text-amber-400 text-sm" aria-hidden>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>☆</span>
          </div>
          <div className="text-sm text-zinc-300 font-medium">4.9 / 5 from 28 athlete reviews</div>

          <div className="flex gap-2 ml-0 sm:ml-4">
            <div className="rounded-full bg-zinc-700 px-3 py-1 text-xs text-zinc-100" role="note">More confident late in games</div>
            <div className="rounded-full bg-zinc-700 px-3 py-1 text-xs text-zinc-100" role="note">Got my first dunk</div>
          </div>
        </div>

      {/* Social proof logos */}
      <div className="mt-4 flex flex-wrap gap-3 opacity-70">
        <img src="/logos/high-school.png.png" alt="High school logo" className="h-7 object-contain" />
        <img src="/logos/aau.png.png" alt="AAU logo" className="h-7 object-contain" />
        <img src="/logos/college.png.png" alt="College logo" className="h-7 object-contain" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <article key={r.name} className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition transform duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-zinc-900">
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-100">{r.name.split(' ').map(n=>n[0]).join('')}</div>
              <div className="ml-3 text-xs">
                <div className="text-zinc-50 font-medium">{r.name} <span className="text-zinc-400">· {r.role}</span></div>
                <div className="text-xs text-zinc-400">{r.meta}{r.context ? <span className="text-zinc-500"> · {r.context}</span> : null}</div>
              </div>
            </div>

            {r.video ? (
              <div className="mt-3 relative rounded-lg overflow-hidden bg-zinc-800/40 h-40 flex items-center justify-center" role="img" aria-label={`Video thumbnail: 60s from ${r.name}`}>
                <img src="/testimonials/noah-video.jpg.png" alt={`Video thumbnail for ${r.name}`} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60" />
                <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-black font-semibold">▶</div>
                <div className="absolute left-4 bottom-3 text-xs text-zinc-200">60s from {r.name} · {r.role} · {r.meta}</div>
              </div>
            ) : (
              <p className="mt-3 text-sm italic text-zinc-300">
                <span dangerouslySetInnerHTML={{ __html: r.shortQuote }} />
              </p>
            )}

            <div className="mt-3 text-xs text-zinc-400">{r.stat}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
