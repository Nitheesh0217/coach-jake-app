"use client";

import { motion } from "framer-motion";
import { WizardData } from "../OnboardingWizard";
import {
  ArrowUp,
  Basketball,
  Check,
  GraduationCap,
  Dumbbell,
  Zap,
  Brain,
} from "lucide-react";

interface Step4GoalsProps {
  data: WizardData;
  setData: (data: WizardData) => void;
  onFinish: () => void;
}

const GOALS = [
  {
    id: "vertical",
    label: "Increase Vertical",
    icon: ArrowUp,
  },
  {
    id: "strength",
    label: "Build Strength",
    icon: Dumbbell,
  },
  {
    id: "conditioning",
    label: "Improve Conditioning",
    icon: Zap,
  },
  {
    id: "handles",
    label: "Sharpen Handles",
    icon: Basketball,
  },
  {
    id: "court-iq",
    label: "Improve Court IQ",
    icon: Brain,
  },
  {
    id: "recruited",
    label: "Get Recruited",
    icon: GraduationCap,
  },
];

export default function Step4Goals({ data, setData, onFinish }: Step4GoalsProps) {
  const handleGoalToggle = (goalId: string) => {
    setData({
      ...data,
      goals: data.goals.includes(goalId as any)
        ? data.goals.filter((g) => g !== goalId)
        : [...data.goals, goalId as any],
    });
  };

  const handleOptionalFieldChange = (
    field: "highlightTagline" | "instagramUrl" | "youtubeUrl",
    value: string,
  ) => {
    setData({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-3xl border border-cyan-400/25 bg-gradient-to-b from-[#071028]/95 via-[#050d21]/95 to-[#040a1b]/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-cyan-950/40"
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-7"
      >
        <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.18em] mb-2">
          Step 4 of 4 · Your Goals
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-white">
          What are you training for?
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
        {GOALS.map((goal, idx) => {
          const isSelected = data.goals.includes(goal.id as any);
          const Icon = goal.icon;

          return (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
              onClick={() => handleGoalToggle(goal.id)}
              className={`relative group text-left rounded-2xl border p-6 transition-all duration-300 min-h-[132px] ${
                isSelected
                  ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_24px_rgba(52,211,153,0.25)]"
                  : "border-cyan-950/80 bg-slate-950/70 hover:border-emerald-500/45 hover:bg-emerald-500/5"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-emerald-400 flex items-center justify-center text-black"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}

              <motion.div
                className="w-12 h-12 rounded-lg bg-slate-900/90 flex items-center justify-center mb-4 border border-cyan-900/60"
                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                transition={isSelected ? { duration: 0.5, delay: 0.1 } : {}}
              >
                <Icon className="w-6 h-6 text-emerald-400" />
              </motion.div>

              <h3 className="text-2xl font-semibold text-white leading-tight">
                {goal.label}
              </h3>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="border-t border-cyan-950/70 pt-6"
      >
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.15em] mb-4">
          Optional: Help us personalize your experience
        </h3>

        <div className="space-y-3.5">
          <input
            type="text"
            placeholder="e.g. Point guard with a 36-inch vertical"
            value={data.highlightTagline}
            onChange={(e) =>
              handleOptionalFieldChange("highlightTagline", e.target.value)
            }
            className="w-full bg-slate-950/80 border border-cyan-950/75 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/25 transition-all duration-300"
          />
          <input
            type="url"
            placeholder="https://instagram.com/yourhandle"
            value={data.instagramUrl}
            onChange={(e) =>
              handleOptionalFieldChange("instagramUrl", e.target.value)
            }
            className="w-full bg-slate-950/80 border border-cyan-950/75 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/25 transition-all duration-300"
          />
          <input
            type="url"
            placeholder="https://youtube.com/yourchannel"
            value={data.youtubeUrl}
            onChange={(e) =>
              handleOptionalFieldChange("youtubeUrl", e.target.value)
            }
            className="w-full bg-slate-950/80 border border-cyan-950/75 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/25 transition-all duration-300"
          />
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        onClick={onFinish}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-green-400 py-4 text-4xl font-bold text-black shadow-[0_0_28px_rgba(74,222,128,0.38)] hover:from-emerald-300 hover:to-green-300 transition-all duration-300 active:scale-[0.99] flex items-center justify-center gap-3"
      >
        Finish Setup <span className="text-3xl">→</span>
      </motion.button>
    </motion.div>
  );
}
