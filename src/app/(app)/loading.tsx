export default function AppLoading() {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      {/* Background layers */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />
      <div
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.25 }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-0 max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Header skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-10 bg-zinc-800/50 rounded-lg w-1/3 animate-pulse"></div>
          <div className="h-4 bg-zinc-800/50 rounded-lg w-1/4 animate-pulse"></div>
        </div>

        {/* Dashboard grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-6 space-y-4 animate-pulse">
            <div className="h-6 bg-zinc-800/50 rounded w-1/3"></div>
            <div className="h-12 bg-zinc-800/50 rounded"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-1/2"></div>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-6 space-y-4 animate-pulse">
            <div className="h-6 bg-zinc-800/50 rounded w-1/3"></div>
            <div className="h-12 bg-zinc-800/50 rounded"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-1/2"></div>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-6 space-y-4 animate-pulse">
            <div className="h-6 bg-zinc-800/50 rounded w-1/3"></div>
            <div className="h-12 bg-zinc-800/50 rounded"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-1/2"></div>
          </div>
        </div>

        {/* Bottom section skeleton */}
        <div className="mt-8 bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-6 space-y-4 animate-pulse">
          <div className="h-6 bg-zinc-800/50 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-zinc-800/50 rounded"></div>
            <div className="h-4 bg-zinc-800/50 rounded"></div>
            <div className="h-4 bg-zinc-800/50 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
