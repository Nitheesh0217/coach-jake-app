"use client";

import { motion } from "framer-motion";
import { WizardData } from "../OnboardingWizard";

interface Props { data: WizardData; setData: (d: WizardData) => void; }

const POSITIONS = [
  { id:"guard",   label:"Guard",   icon:"🏃", desc:"Quick, agile, and shifty. I run the offense and create opportunities." },
  { id:"wing",    label:"Wing",    icon:"🏃‍♂️", desc:"Versatile and athletic. I can score from anywhere and defend anyone." },
  { id:"forward", label:"Forward", icon:"💪", desc:"Strong, tough, and relentless. I score inside and out and do the dirty work." },
  { id:"center",  label:"Center",  icon:"🏋️", desc:"Big, physical, and dominant. I protect the paint and control the boards." },
];

const SLIDERS = [
  { key:"teamPlay", label:"TEAM PLAY",  right:"ISOLATION", color:"from-emerald-500 to-emerald-400" },
  { key:"shooter",  label:"SHOOTER",    right:"SLASHER",   color:"from-cyan-500 to-cyan-400" },
  { key:"finesse",  label:"FINESSE",    right:"POWER",     color:"from-violet-500 to-violet-400" },
];

export default function Step2PlayingStyle({ data, setData }: Props) {
  const setPos = (pos: typeof data.position) => setData({ ...data, position: pos });
  const setSlider = (key: keyof WizardData, val: number) => setData({ ...data, [key]: val });

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl p-7 sm:p-10 shadow-2xl">
      <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} className="mb-8">
        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">Step 2 of 4 · Your Playing Style</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">What kind of player are you?</h1>
      </motion.div>

      {/* Position grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {POSITIONS.map((p, i) => {
          const sel = data.position === p.id;
          return (
            <motion.button key={p.id} type="button" onClick={() => setPos(p.id as any)}
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.06 }}
              className={`relative rounded-2xl border p-4 text-left transition-all duration-200 ${
                sel ? "border-emerald-500 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "border-zinc-800 bg-zinc-800/40 hover:border-zinc-700"
              }`}>
              {sel && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              )}
              <span className="text-2xl mb-2 block">{p.icon}</span>
              <p className="font-black text-white text-base">{p.label}</p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{p.desc}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Sliders */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }} className="space-y-5">
        {SLIDERS.map(s => {
          const val = (data as any)[s.key] as number;
          return (
            <div key={s.key}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">{s.label}</span>
                <div className="flex items-center gap-3">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-0.5">
                    <span className="text-xs font-black text-white">{val}%</span>
                  </div>
                  <span className="text-[11px] font-black text-zinc-600 uppercase tracking-widest">{s.right}</span>
                </div>
              </div>
              <div className="relative h-2 rounded-full bg-zinc-800">
                <div className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${s.color}`} style={{ width:`${val}%` }} />
                <input type="range" min="0" max="100" value={val}
                  onChange={e => setSlider(s.key as keyof WizardData, +e.target.value)}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" />
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-zinc-400 shadow-md pointer-events-none"
                  style={{ left:`calc(${val}% - 8px)` }} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
