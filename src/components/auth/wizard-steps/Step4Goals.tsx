"use client";

import { motion } from "framer-motion";
import { TrendingUp, Dumbbell, Zap, Crosshair, Brain, Award } from "lucide-react";
import { WizardData } from "../OnboardingWizard";
import { Instagram, Youtube } from "lucide-react";

interface Props { data: WizardData; setData: (d: WizardData) => void; }

const GOALS = [
  { id:"vertical",     label:"Increase Vertical",    icon: TrendingUp, color:"emerald" },
  { id:"strength",     label:"Build Strength",        icon: Dumbbell,   color:"amber" },
  { id:"conditioning", label:"Improve Conditioning",  icon: Zap,        color:"cyan" },
  { id:"handles",      label:"Sharpen Handles",       icon: Crosshair,  color:"green" },
  { id:"court-iq",     label:"Improve Court IQ",      icon: Brain,      color:"blue" },
  { id:"recruited",    label:"Get Recruited",         icon: Award,      color:"purple" },
];

const colorMap: Record<string,string> = {
  emerald:"border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.2)]",
  amber:  "border-amber-500  bg-amber-500/15  text-amber-400  shadow-[0_0_16px_rgba(245,158,11,0.2)]",
  cyan:   "border-cyan-500   bg-cyan-500/15   text-cyan-400   shadow-[0_0_16px_rgba(6,182,212,0.2)]",
  green:  "border-green-500  bg-green-500/15  text-green-400  shadow-[0_0_16px_rgba(34,197,94,0.2)]",
  blue:   "border-blue-500   bg-blue-500/15   text-blue-400   shadow-[0_0_16px_rgba(59,130,246,0.2)]",
  purple: "border-purple-500 bg-purple-500/15 text-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.2)]",
};

export default function Step4Goals({ data, setData }: Props) {
  const toggle = (id: string) => {
    const goals = data.goals as string[];
    setData({ ...data, goals: (goals.includes(id) ? goals.filter(g=>g!==id) : [...goals, id]) as any });
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl p-7 sm:p-10 shadow-2xl">
      <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} className="mb-8">
        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">Step 4 of 4 · Your Goals</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">What are you training for?</h1>
      </motion.div>

      {/* Goals grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {GOALS.map((g, i) => {
          const sel = (data.goals as string[]).includes(g.id);
          const Icon = g.icon;
          return (
            <motion.button key={g.id} type="button" onClick={() => toggle(g.id)}
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.05*i }}
              className={`relative rounded-2xl border p-5 text-center transition-all duration-200 ${
                sel ? colorMap[g.color] : "border-zinc-800 bg-zinc-800/40 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              }`}>
              {sel && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              )}
              <Icon className="w-8 h-8 mx-auto mb-2" />
              <p className="font-black text-sm text-white">{g.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Optional fields */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }} className="space-y-3">
        <p className="text-[11px] font-black text-zinc-600 uppercase tracking-widest mb-4">Optional: Help us personalize your experience</p>
        {[
          { key:"highlightTagline", label:"Highlight tagline", placeholder:"e.g. Point guard with a 36-inch vertical", icon: null },
          { key:"instagramUrl",     label:"Instagram URL",    placeholder:"https://instagram.com/yourhandle",     icon: Instagram },
          { key:"youtubeUrl",       label:"YouTube URL",      placeholder:"https://youtube.com/@yourchannel",    icon: Youtube },
        ].map(f => (
          <div key={f.key} className="flex items-center gap-3 bg-zinc-800/40 border border-zinc-700/60 rounded-xl px-4 py-3">
            {f.icon && <f.icon className="w-4 h-4 text-zinc-600 flex-shrink-0" />}
            {!f.icon && <span className="w-4 text-zinc-600 text-sm font-semibold flex-shrink-0">{f.label.slice(0,1)}</span>}
            <input type="text" placeholder={f.placeholder}
              value={(data as any)[f.key] ?? ""}
              onChange={e => setData({ ...data, [f.key]: e.target.value } as WizardData)}
              className="flex-1 bg-transparent text-sm text-white placeholder-zinc-700 focus:outline-none" />
          </div>
        ))}
      </motion.div>

      <div className="mt-6 p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/60 flex items-start gap-3">
        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
        <div>
          <p className="text-xs font-bold text-white">Your data is secure</p>
          <p className="text-xs text-zinc-600">We never share your information.</p>
        </div>
      </div>
    </div>
  );
}
