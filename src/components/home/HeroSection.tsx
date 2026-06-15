import {
  CirclePlay,
  Dumbbell,
  Gauge,
  Globe,
  Medal,
  Sparkles,
  Zap,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "EXPLOSIVE POWER",
    desc: "Increase your vertical and first step quickness.",
  },
  {
    icon: Dumbbell,
    title: "STRENGTH & ATHLETICISM",
    desc: "Build lean muscle and move with control.",
  },
  {
    icon: Gauge,
    title: "GAME-READY RESULTS",
    desc: "Train with purpose. Perform with confidence.",
  },
];

const STATS = [
  { value: "120+", label: "athletes trained", icon: Medal },
  { value: "Average +3", label: "vertical in 12 weeks", icon: Sparkles },
  { value: "5+ years", label: "coaching experience", icon: Zap },
];

export default function HeroSection() {
  return (
    <section className="grid lg:grid-cols-[1fr_580px] xl:grid-cols-[1fr_620px] gap-8 items-start pt-6 lg:pt-12">
      <div className="space-y-7 pt-5 lg:pt-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.06em] text-emerald-300">
          <Globe className="h-4 w-4" />
          Basketball Performance Coaching
        </span>

        <h1 className="max-w-3xl text-[clamp(2.8rem,5.7vw,5.1rem)] leading-[0.98] font-black tracking-tight text-emerald-300">
          Explosive Basketball
          <br />
          Performance for
          <br />
          Serious Hoopers
        </h1>

        <p className="max-w-2xl text-zinc-300/95 leading-relaxed text-base md:text-lg lg:text-xl">
          Elite training programs designed to increase your vertical, build
          strength, and elevate your game on every level.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/signup"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-8 py-3.5 text-base font-bold text-black shadow-[0_0_28px_rgba(16,185,129,0.65)] hover:from-emerald-300 hover:to-emerald-400 transition-all"
          >
            Start training free
          </a>
          <a
            href="#overview"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-[#081225] px-6 py-3.5 text-base font-semibold text-zinc-100 hover:border-emerald-400/70 transition-all"
          >
            <CirclePlay className="h-5 w-5 text-zinc-200" />
            Watch 60s overview
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-zinc-900/90 to-zinc-950/80 p-4"
            >
              <stat.icon className="h-5 w-5 text-emerald-300" />
              <p className="mt-2 text-[2rem] leading-none font-extrabold text-zinc-100">
                {stat.value}
              </p>
              <p className="mt-1 text-lg text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative pt-4 lg:pt-8">
        <div className="absolute -inset-3 rounded-[1.85rem] bg-gradient-to-r from-cyan-500/20 via-emerald-500/10 to-cyan-500/15 blur-2xl" />
        <div className="relative overflow-hidden rounded-[1.7rem] border border-cyan-400/30 bg-zinc-950/95 shadow-[0_0_44px_rgba(6,182,212,0.18)]">
          <div className="grid grid-cols-[1fr_230px]">
            <div className="relative h-[520px] overflow-hidden border-r border-cyan-400/20">
              <img
                src="https://images.unsplash.com/photo-1519861155730-0b5fbf0dd889?w=1200&q=80&auto=format&fit=crop"
                alt="Basketball player dunking"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="bg-gradient-to-b from-emerald-500/18 to-zinc-950/70 p-6">
              <div className="space-y-6">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.title} className="space-y-2 pb-5 border-b border-zinc-700/60 last:border-b-0 last:pb-0">
                    <benefit.icon className="h-6 w-6 text-emerald-300" />
                    <p className="text-[1.05rem] font-bold text-zinc-100 leading-tight">
                      {benefit.title}
                    </p>
                    <p className="text-[1rem] text-zinc-300 leading-snug">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-zinc-700/60 pt-5">
                <p className="text-2xl italic text-emerald-300">Coach Jake</p>
                <p className="mt-1 text-xs uppercase tracking-[0.09em] text-zinc-400">
                  Basketball Performance Coach
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
