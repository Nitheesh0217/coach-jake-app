"use client";

import { motion } from "framer-motion";
import { WizardData } from "../OnboardingWizard";

interface Props { data: WizardData; setData: (d: WizardData) => void; }

export default function Step1Profile({ data, setData }: Props) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val } as WizardData);

  const fields = [
    { key:"fullName", label:"Full Name", placeholder:"Enter your full name", type:"text" },
    { key:"age",      label:"Age",       placeholder:"Enter your age",       type:"number" },
    { key:"height",   label:"Height",    placeholder:"Enter your height",    type:"number", suffix:"cm" },
    { key:"weight",   label:"Weight",    placeholder:"Enter your weight",    type:"number", suffix:"kg" },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl p-7 sm:p-10 shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent rounded-t-2xl" />

      <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} className="mb-8">
        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">Step 1 of 4 · Tell us about you</p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Build your player profile</h1>
        <p className="text-zinc-500">We use this to personalize your training plan</p>
      </motion.div>

      <div className="space-y-5">
        {fields.map((f, i) => (
          <motion.div key={f.key} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15+i*0.06 }}>
            <label className="text-sm font-bold text-zinc-300 block mb-2">{f.label}</label>
            <div className="relative">
              <input type={f.type} placeholder={f.placeholder}
                value={(data as any)[f.key] ?? ""}
                onChange={e => set(f.key, e.target.value)}
                className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 text-sm focus:border-emerald-500/60 focus:ring-[3px] focus:ring-emerald-500/20 focus:outline-none transition-all pr-14" />
              {f.suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 font-semibold text-sm">{f.suffix}</span>}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-zinc-700 mt-6">🔒 Your data is secure and never shared.</p>
    </div>
  );
}
