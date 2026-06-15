import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Dumbbell,
  Target,
  Zap,
} from "lucide-react";

const PROGRAMS = [
  {
    badge: "MOST POPULAR",
    title: "Vertical Jump Transformation",
    desc: "12-week program to add serious bounce and explode off the floor.",
    duration: "12 Weeks",
    level: "Intermediate",
    image: "/programs/off-season.jpg.png",
    Icon: Zap,
    badgeClass: "border-emerald-500/45 bg-emerald-500/15 text-emerald-300",
    cardClass:
      "border-emerald-500/40 bg-gradient-to-r from-emerald-500/[0.08] to-zinc-950 shadow-[0_0_34px_rgba(16,185,129,0.16)]",
  },
  {
    badge: "STRENGTH",
    title: "Strength & Power Builder",
    desc: "Build foundational strength, explosiveness, and on-court power.",
    duration: "10 Weeks",
    level: "All Levels",
    image: "/programs/in-season.jpg.png",
    Icon: Dumbbell,
    badgeClass: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    cardClass: "border-zinc-700/70 bg-zinc-900/45 hover:border-zinc-600",
  },
  {
    badge: "SKILLS",
    title: "Hoop IQ & Skills Development",
    desc: "Sharpen your skills, decision making, and overall game.",
    duration: "8 Weeks",
    level: "All Levels",
    image: "/programs/youth.jpg.png",
    Icon: Target,
    badgeClass: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    cardClass: "border-zinc-700/70 bg-zinc-900/45 hover:border-zinc-600",
  },
];

export default function ProgramsSection() {
  return (
    <section className="pb-20 pt-12 bg-[#050816]">
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div className="flex items-end gap-4">
          <h2 className="text-4xl font-black text-zinc-100">Programs</h2>
          <p className="mb-1 text-zinc-400">Structured. Proven. Built for Results.</p>
        </div>
        <a
          href="/programs"
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
        >
          View all programs <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {PROGRAMS.map((program) => (
          <article
            key={program.title}
            className={`overflow-hidden rounded-2xl border p-4 transition-all ${program.cardClass}`}
          >
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.06em] ${program.badgeClass}">
              <program.Icon className="h-3.5 w-3.5" />
              {program.badge}
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-4">
              <img
                src={program.image}
                alt={program.title}
                className="h-[110px] w-[110px] rounded-xl object-cover border border-zinc-700/60"
              />

              <div className="flex flex-col">
                <h3 className="text-[1.9rem] leading-tight font-bold text-zinc-100">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{program.desc}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-800/70 pt-4 text-sm text-zinc-400">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {program.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4" />
                  {program.level}
                </span>
              </div>
              <a
                href="/programs"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300"
              >
                View details <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
