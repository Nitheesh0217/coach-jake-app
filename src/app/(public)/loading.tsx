export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-spin border-t-emerald-400" />
          <div className="absolute inset-3 rounded-full bg-emerald-500/20 animate-pulse" />
        </div>
        <p className="text-zinc-500 text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}
