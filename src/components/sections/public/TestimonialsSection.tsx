"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import TechCorners from "@/components/ui/TechCorners";

const REVIEWS = [
  { name:"Noah M.",  role:"HS Guard · Varsity Starter",   quote:'Added <span class="text-emerald-400 font-black">+4\" vertical</span> and earned a starting spot after 12 weeks. The program is structured and actually works.', stat:'+4" Vertical', avatar:"NM" },
  { name:"Ethan R.", role:"AAU Wing · All-Tournament",    quote:'Film breakdowns helped me <span class="text-emerald-400 font-black">finish through contact</span>. My court IQ jumped massively. Best investment I made.', stat:"Court IQ +", avatar:"ER" },
  { name:"Luca S.",  role:"College Guard · Rotation",     quote:'Consistency tracking kept me honest — <span class="text-emerald-400 font-black">+3 training sessions per week</span> on average. Saw results in 6 weeks.', stat:"+3 sessions/wk", avatar:"LS" },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-violet-500/4 blur-[150px]" />
      </div>

      <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="mb-14 text-center">
        <span className="text-violet-400 text-xs font-black uppercase tracking-widest mb-3 block">Real Results</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Athletes Who Leveled Up</h2>
        <p className="mt-3 text-zinc-500">Real players. Real gains. No fluff.</p>
      </motion.div>

      {/* Featured Video Testimonial Console */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="glass-card relative max-w-4xl mx-auto border border-zinc-800/85 rounded-2xl bg-zinc-950/40 backdrop-blur-md p-6 md:p-8 overflow-hidden group/video shadow-2xl mb-12 cyber-scanlines"
      >
        <TechCorners color="border-violet-500/40" size="w-3.5 h-3.5" />
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left: Video Console Player */}
          <div className="md:col-span-7 relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 group-hover/video:border-violet-500/30 transition-all duration-300">
            <img
              src="/testimonials/noah-video.jpg.png"
              alt="Noah vertical jump check"
              className="w-full h-full object-cover aspect-video opacity-80 group-hover/video:scale-105 group-hover/video:opacity-95 transition-all duration-500"
            />
            {/* Holographic HUD grid lines over video */}
            <div className="absolute inset-0 cyber-grid opacity-[0.08] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            {/* Play Button HUD */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover/video:scale-110 group-hover/video:bg-violet-500 group-hover/video:text-black group-hover/video:shadow-[0_0_32px_rgba(139,92,246,0.6)] transition-all duration-300">
                <span className="text-lg ml-1 text-violet-300 group-hover/video:text-black">▶</span>
              </div>
            </div>

            {/* Video HUD status bar */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[9px] font-black text-zinc-400 tracking-wider">
              <span>REC 🔴 [00:42/01:15]</span>
              <span>TELEMETRY SYNCED</span>
            </div>
          </div>

          {/* Right: Telemetry & Quote */}
          <div className="md:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-violet-300">
              Featured Case Study
            </span>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Noah's Vertical Lab</h3>
              <p className="text-xs text-zinc-500 font-semibold">12 Weeks Plyometrics Program</p>
            </div>
            
            <p className="text-sm text-zinc-300 italic leading-relaxed">
              "The jump mechanics and strength progressions were insane. I went from barely touching the rim to flushing it consistently in games."
            </p>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-white">Noah M.</p>
                <p className="text-[10px] text-zinc-500">HS Guard · Varsity Starter</p>
              </div>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                +4" Vertical
              </span>
            </div>
          </div>
        </div>
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
