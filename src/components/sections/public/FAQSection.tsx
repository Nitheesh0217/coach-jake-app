"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const ITEMS = [
  { q:"Do I need a full gym?", a:"No — many sessions use bodyweight and minimal equipment. We provide alternatives for home or limited-gear setups." },
  { q:"Can I use this in-season?", a:"Yes. Plans adjust volume for in-season maintenance while protecting recovery and keeping you fresh for games." },
  { q:"What ages do you work with?", a:"We work with middle school through college athletes. Programs are scaled by age, maturity, and experience level." },
  { q:"Is this in-person or online?", a:"Primarily online with structured video guidance, but in-person sessions are available in select locations." },
  { q:"How quickly will I see results?", a:"Most athletes notice measurable gains within 4–6 weeks. Vertical jump and explosiveness improvements are typically tracked at the 8-week mark." },
  { q:"What if I miss a week?", a:"Life happens. The program is designed with flexibility — your coach will adjust your plan if you miss time due to illness, travel, or games." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number|null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="mb-14 text-center">
        <span className="text-amber-400 text-xs font-black uppercase tracking-widest mb-3 block">Got Questions?</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">FAQ</h2>
        <p className="mt-3 text-zinc-500">Everything you need to know before you start.</p>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-3">
        {ITEMS.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:i*0.07 }}
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${open===i ? "border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700"}`}>
            <button onClick={() => setOpen(open===i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-bold text-white text-sm pr-4">{item.q}</span>
              <motion.div animate={{ rotate: open===i ? 45 : 0 }} transition={{ duration:0.2 }}
                className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${open===i ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400" : "border-zinc-700 text-zinc-500"}`}>
                <Plus className="w-3.5 h-3.5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {open===i && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }}>
                  <p className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
