"use client";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 flex items-center justify-center px-4">
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

      {/* Error container */}
      <div className="relative z-0 max-w-md w-full">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl p-8 shadow-2xl">
          {/* Error icon */}
          <div className="text-5xl mb-4 text-center">⚠️</div>

          {/* Error message */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Something went wrong
          </h1>
          <p className="text-red-200/80 text-center mb-6">
            We encountered an unexpected error. Please try again or contact support.
          </p>

          {/* Error details (dev only) */}
          {error.message && (
            <div className="mb-6 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-xs text-zinc-400 max-h-24 overflow-auto">
              <p className="font-mono">{error.message}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition shadow-lg shadow-emerald-500/30"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.href = "/"}
              className="flex-1 py-3 px-4 border border-zinc-700 hover:bg-zinc-900 text-white font-semibold rounded-lg transition"
            >
              Go home
            </button>
          </div>

          {/* Support link */}
          <p className="text-xs text-zinc-500 text-center mt-4">
            Error ID: {error.digest || "unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
