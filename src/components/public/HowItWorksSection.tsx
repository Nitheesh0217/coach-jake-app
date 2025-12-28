export default function HowItWorksSection() {
  const steps = [
    {
      label: '1. Sign up',
      title: 'Create your athlete profile',
      body: 'Tell us your level, goals, and availability — it takes 60 seconds.',
    },
    {
      label: '2. Get your plan',
      title: 'Receive a weekly plan',
      body: 'A clear, prioritized plan with strength, drills, and recovery blocks.',
    },
    {
      label: '3. Train & track',
      title: 'Complete sessions and log progress',
      body: 'Daily workouts, streaks, and short film cues to improve quickly.',
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-zinc-50">How it works</h2>
      <p className="text-sm sm:text-base text-zinc-300 mt-2">Sign up, get a focused plan, and follow short daily sessions to see measurable gains.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition transform duration-250 hover:-translate-y-0.5 hover:border-emerald-500/50">
            <div className="text-xs font-semibold uppercase tracking-wide text-emerald-400">{s.label}</div>
            <div className="mt-1 text-sm font-semibold text-zinc-50">{s.title}</div>
            <div className="mt-2 text-sm text-zinc-300">{s.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
