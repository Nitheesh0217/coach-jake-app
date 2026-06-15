export default function AuthLoading() {
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
        {/* Animated spinner */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-semibold mb-2">Preparing your account…</h2>
        <p className="text-zinc-400">This should only take a moment</p>

        {/* Dots animation */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
