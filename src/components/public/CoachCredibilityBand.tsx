"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, TrendingUp, Star } from "lucide-react";

const CREDS = [
  { icon:Users,    value:"120+", label:"Athletes Trained" },
  { icon:TrendingUp, value:'+3"', label:"Avg Vertical Gain" },
  { icon:Award,    value:"7+",   label:"Years Coaching" },
  { icon:Star,     value:"98%",  label:"Athlete Satisfaction" },
];

export default function CoachCredibilityBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="py-20 bg-[#050816] relative overflow-hidden">
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.7 }}
        className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/8 via-zinc-900/80 to-cyan-500/5 backdrop-blur-sm p-8 sm:p-10 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          {/* Left: identity */}
          <div className="flex items-start gap-5">
            <motion.div whileHover={{ scale:1.05, rotate:3 }} transition={{ type:"spring", stiffness:300 }}
              className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="text-xl font-black text-emerald-300">CJ</span>
            </motion.div>
            <div>
              <h3 className="text-xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Coach Jake</h3>
              <p className="text-zinc-500 text-sm mt-0.5 mb-3">Basketball Performance Coach</p>
              <ul className="space-y-1.5">
                {["7+ years coaching HS, AAU, and college athletes","Specializes in vertical jump & skill development","Remote & in-person programs available"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {CREDS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.label}
                  initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2+i*0.08 }}
                  whileHover={{ scale:1.04 }} 
                  className="rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-4 text-center">
                  <Icon className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                  <p className="text-2xl font-black text-emerald-400">{c.value}</p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">{c.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
