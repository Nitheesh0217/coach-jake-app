export default function CoachCredibilityBand() {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-4 bg-[#050816]">
      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] group">
        {/* Left: Coach identity */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
            CJ
          </div>
          <div>
            <div className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Coach Jake · Strength &amp; Conditioning
            </div>
            <ul className="mt-1.5 text-sm text-zinc-400 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block"></span>
                7+ years coaching high school, AAU, and college athletes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block"></span>
                Former D1 strength staff · Certified S&amp;C Coach (NSCA-CSCS)
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Badges + tagline */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-2 items-center">
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300">
              High School
            </div>
            <div className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300">
              AAU
            </div>
            <div className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300">
              College
            </div>
          </div>
          <div className="text-sm font-medium text-zinc-300 group-hover:text-emerald-300 transition-colors duration-300">
            Built for athletes who want more minutes, not just bigger lifts.
          </div>
        </div>
      </div>
    </section>
  );
}
