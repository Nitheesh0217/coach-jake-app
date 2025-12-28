export default function BenefitsSection() {
  const features = [
    {
      title: "Drills & Skill Work",
      body: "Daily curated drills focused on ball-handling, finishing, and decision-making.",
    },
    {
      title: "Film Breakdown",
      body: "Short, actionable clips showing how to apply drills to game situations.",
    },
    {
      title: "Strength Plans",
      body: "Periodized strength blocks with clear progressions and recovery cues.",
    },
    {
      title: "Accountability",
      body: "Coach check-ins, workout completion tracking, and reminders to keep you consistent.",
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-50">What you get</h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">A complete athlete workflow: skill work, strength, film, and coach-driven accountability.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition transform duration-250 ease-out hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold">{f.title.charAt(0)}</div>

            <div>
              <div className="text-sm font-semibold text-zinc-50">{f.title}</div>
              <div className="mt-1 text-sm text-zinc-300">{f.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
