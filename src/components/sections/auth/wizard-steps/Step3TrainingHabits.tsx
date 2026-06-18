"use client";

import { motion } from "framer-motion";
import { Sun, Cloud, Moon, Calendar } from "lucide-react";
import { WizardData } from "../OnboardingWizard";

interface Props { data: WizardData; setData: (d: WizardData) => void; }

const SESSION_LENGTHS = [30, 45, 60, 90];
const TIMES = [
  { id:"morning",   label:"Morning",   icon: Sun },
  { id:"afternoon", label:"Afternoon", icon: Cloud },
  { id:"evening",   label:"Evening",   icon: Moon },
  { id:"weekend",   label:"Weekend",   icon: Calendar },
];

export default function Step3TrainingHabits({ data, setData }: Props) {
  const toggleTime = (t: string) => {
    const times = data.trainingTimes as string[];
    setData({ ...data, trainingTimes: (times.includes(t) ? times.filter(x=>x!==t) : [...times, t]) as any });
  };

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl p-7 sm:p-10 shadow-2xl">
      <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} className="mb-8">
        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">Step 3 of 4 · Your Training Habits</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">How do you train?</h1>
      </motion.div>

      <div className="space-y-7">
        {/* Sessions per week */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
          <p className="text-sm font-bold text-zinc-300 mb-3">Sessions per week</p>
          <div className="flex gap-2 flex-wrap">
            {[1,2,3,4,5,6,7].map(n => (
              <button key={n} type="button" onClick={() => setData({ ...data, sessionsPerWeek:n })}
                className={`w-11 h-11 rounded-xl font-black text-sm transition-all duration-200 ${
                  data.sessionsPerWeek===n
                    ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    : "bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}>{n}</button>
            ))}
          </div>
        </motion.div>

        {/* Typical session length */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.17 }}>
          <p className="text-sm font-bold text-zinc-300 mb-3">Typical session length</p>
          <div className="flex gap-3 flex-wrap">
            {SESSION_LENGTHS.map(l => (
              <button key={l} type="button" onClick={() => setData({ ...data, sessionLength:l })}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  data.sessionLength===l
                    ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400"
                    : "bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}>{l} min</button>
            ))}
          </div>
        </motion.div>

        {/* Sleep slider */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.24 }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-zinc-300">How many hours of sleep do you get?</p>
            <span className="text-emerald-400 font-black text-sm">{data.sleepHours} hrs</span>
          </div>
          <div className="relative h-2 rounded-full bg-zinc-800 mb-2">
            <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              style={{ width:`${((data.sleepHours - 4) / 6) * 100}%` }} />
            <input type="range" min="4" max="10" step="0.5" value={data.sleepHours}
              onChange={e => setData({ ...data, sleepHours:+e.target.value })}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full" />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-md pointer-events-none"
              style={{ left:`calc(${((data.sleepHours - 4) / 6) * 100}% - 8px)` }} />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-700 font-semibold">
            <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
        </motion.div>

        {/* Training times */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.31 }}>
          <p className="text-sm font-bold text-zinc-300 mb-3">When do you train? <span className="text-zinc-600 font-normal">(Select all that apply)</span></p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TIMES.map(t => {
              const sel = (data.trainingTimes as string[]).includes(t.id);
              const Icon = t.icon;
              return (
                <button key={t.id} type="button" onClick={() => toggleTime(t.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                    sel ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                        : "bg-zinc-800/60 border border-zinc-700/60 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                  }`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />{t.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <p className="text-xs text-zinc-700 mt-6 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        Your data is secure and never shared.
      </p>
    </div>
  );
}
