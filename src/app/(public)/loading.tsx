export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-transparent text-[#f9fafb] flex items-center justify-center px-4">
      {/* Background image layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.25 }}
        aria-hidden
      />

      {/* Loading content */}
      <div className="relative z-0 text-center">
        {/* Animated logo/spinner */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 rounded-full animate-pulse"></div>
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-xl font-semibold mb-2">Loading…</h2>
        <p className="text-zinc-400 text-sm">Bringing Coach Jake's training platform to life</p>
      </div>
    </div>
  );
}
