"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = [
  { num: 1, label: "ACCOUNT" },
  { num: 2, label: "PLAYING STYLE" },
  { num: 3, label: "YOUR GOALS" },
  { num: 4, label: "REVIEW" },
];

export default function WizardProgressBar({
  currentStep,
  totalSteps,
}: WizardProgressBarProps) {
  const progressPercent =
    totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <div className="relative mx-5 h-1 rounded-full bg-slate-700/70">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-cyan-300"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="absolute inset-0 flex items-center justify-between">
          {STEP_LABELS.map((step) => {
            const done = step.num < currentStep;
            const active = step.num === currentStep;

            return (
              <div
                key={step.num}
                className="relative flex -translate-y-1/2 flex-col items-center"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-base font-bold transition-all md:h-11 md:w-11 ${
                    active
                      ? "border-cyan-300 bg-cyan-500/25 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                      : done
                        ? "border-emerald-300 bg-emerald-500/40 text-emerald-100"
                        : "border-slate-600 bg-slate-900 text-slate-400"
                  }`}
                >
                  {done ? <Check className="h-5 w-5" /> : step.num}
                </div>

                {active && (
                  <span className="absolute inset-0 h-10 w-10 rounded-full border border-cyan-300/80 md:h-11 md:w-11" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 text-center">
        {STEP_LABELS.map((step) => {
          const done = step.num < currentStep;
          const active = step.num === currentStep;

          return (
            <p
              key={step.num}
              className={`flex-1 text-[11px] font-bold uppercase tracking-[0.14em] md:text-xs ${
                active
                  ? "text-emerald-300"
                  : done
                    ? "text-slate-300"
                    : "text-slate-500"
              }`}
            >
              {step.label}
            </p>
          );
        })}
      </div>
    </motion.div>
  );
}
