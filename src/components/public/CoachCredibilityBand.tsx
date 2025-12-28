export default function CoachCredibilityBand() {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-4">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between transition transform duration-250 hover:-translate-y-0.5">
        <div>
          <div className="text-sm font-semibold text-zinc-50">Coach Jake · Strength & Conditioning for Basketball</div>
          <ul className="mt-2 text-sm text-zinc-300 list-inside space-y-1">
            <li>7+ years coaching high school, AAU, and college athletes</li>
            <li>Former D1 strength staff (assistant) · Certified S&C coach (stub)</li>
          </ul>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-2 items-center">
            <img src="/credentials/hs-badge.png.png" alt="High school badge" className="h-7 w-10 object-contain rounded-md bg-zinc-800" />
            <img src="/logos/aau.png.png" alt="AAU badge" className="h-7 w-10 object-contain rounded-md bg-zinc-800" />
            <img src="/credentials/college-badge.png.png" alt="College badge" className="h-7 w-10 object-contain rounded-md bg-zinc-800" />
          </div>

          <div className="text-sm font-medium text-emerald-300">Built for athletes who want more minutes, not just bigger lifts.</div>
        </div>
      </div>
    </section>
  );
}
