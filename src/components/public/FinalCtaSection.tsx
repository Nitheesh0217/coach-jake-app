"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function FinalCtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#050816] relative overflow-hidden">
      {/* Big glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-emerald-500/8 blur-[120px]" />
      </div>

      <motion.div initial={{ opacity:0, scale:0.93 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
        className="relative rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-zinc-900/90 to-cyan-500/5 backdrop-blur-sm p-10 sm:p-16 text-center overflow-hidden">
        {/* Top + bottom border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {/* Floating orbs */}
        <motion.div animate={{ y:[-10,10,-10], x:[-5,5,-5] }} transition={{ duration:6, repeat:Infinity }}
          className="absolute top-8 left-8 w-32 h-32 rounded-full bg-emerald-500/8 blur-2xl" />
        <motion.div animate={{ y:[10,-10,10], x:[5,-5,5] }} transition={{ duration:8, repeat:Infinity }}
          className="absolute bottom-8 right-8 w-48 h-48 rounded-full bg-cyan-500/6 blur-3xl" />

        <div className="relative z-10">
          <motion.div initial={{ opacity:0, y:-20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-emerald-300 mb-6">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Start your journey today
          </motion.div>

          <motion.h2 initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            Ready to transform<br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-400 bg-clip-text text-transparent">your game?</span>
          </motion.h2>

          <motion.p initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.4 }}
            className="text-zinc-400 text-lg mb-10 max-w-md mx-auto">
            No long-term contracts. Start with a free plan and a simple 4-week program.
          </motion.p>

          <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}>
              <Link href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-10 py-4 text-sm font-black text-black shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_rgba(16,185,129,0.9)] transition-all duration-300">
                Start training free <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
              <Link href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all duration-300">
                Talk to Coach Jake
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
