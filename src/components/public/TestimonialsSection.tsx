"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  { name:"Noah M.",  role:"HS Guard · Varsity Starter",   quote:'Added <span class="text-emerald-400 font-black">+4\" vertical</span> and earned a starting spot after 12 weeks. The program is structured and actually works.', stat:'+4" Vertical', avatar:"NM" },
  { name:"Ethan R.", role:"AAU Wing · All-Tournament",    quote:'Film breakdowns helped me <span class="text-emerald-400 font-black">finish through contact</span>. My court IQ jumped massively. Best investment I made.', stat:"Court IQ +", avatar:"ER" },
  { name:"Luca S.",  role:"College Guard · Rotation",     quote:'Consistency tracking kept me honest — <span class="text-emerald-400 font-black">+3 training sessions per week</span> on average. Saw results in 6 weeks.', stat:"+3 sessions/wk", avatar:"LS" },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#050816] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-violet-500/4 blur-[150px]" />
      </div>

      <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="mb-14 text-center">
        <span className="text-violet-400 text-xs font-black uppercase tracking-widest mb-3 block">Real Results</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Athletes Who Leveled Up</h2>
        <p className="mt-3 text-zinc-500">Real players. Real gains. No fluff.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {REVIEWS.map((r, i) => (
          <motion.div key={r.name}
            initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.12 }}
            whileHover={{ y:-8, transition:{ type:"spring", stiffness:300, damping:22 } }}
            className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-6 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-400 overflow-hidden">
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            <Quote className="w-8 h-8 text-violet-500/30 mb-4" />

            <p className="text-sm text-zinc-300 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: r.quote }} />

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
                  <span className="text-xs font-black text-violet-300">{r.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-black text-white">{r.name}</p>
                  <p className="text-[11px] text-zinc-600">{r.role}</p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">{r.stat}</span>
            </div>

            {/* Stars */}
            <div className="flex gap-0.5 mt-3">
              {Array(5).fill(0).map((_,si) => <Star key={si} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
