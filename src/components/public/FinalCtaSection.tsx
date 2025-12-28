import Link from "next/link";

export default function FinalCtaSection() {
  return (
    <>
      <section className="mt-20 border-y border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-emerald-500/10">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-zinc-50">Ready to transform your game?</h3>
            <p className="text-sm sm:text-base text-zinc-300 mt-1">No long-term contracts. Start with a free call and a simple 4-week plan.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/contact" className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30">Book a free call</Link>
            <Link href="/programs" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">View programs</Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered by PublicLayout -> PublicFooter; remove duplicate footer here */}
    </>
  );
}
