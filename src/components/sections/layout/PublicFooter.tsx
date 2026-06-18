import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-zinc-800/60 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-[10px] font-black text-emerald-400">CJ</span>
          </div>
          <span className="text-sm text-zinc-400">© 2025 Coach Jake Hoops. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5 text-sm text-zinc-600">
          {[["Contact","/contact"],["Instagram","#"],["YouTube","#"],["Discord","#"]].map(([l,h]) => (
            <Link key={l} href={h} className="hover:text-zinc-300 transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
