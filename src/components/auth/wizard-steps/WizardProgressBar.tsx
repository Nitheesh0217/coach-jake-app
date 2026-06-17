"use client";

import { motion } from "framer-motion";

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = [
  { num: 1, label: "Account" },
  { num: 2, label: "Playing Style" },
  { num: 3, label: "Your Habits" },
  { num: 4, label: "Your Goals" },
];

export default function WizardProgressBar({
  currentStep,
  totalSteps,
}: WizardProgressBarProps) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-3">
      {/* Step labels + connector line */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0" />
        {/* Progress line */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 z-10 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentStep - 1) / (totalSteps - 1) }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", transformOrigin: "left" }}
        />

        {STEP_LABELS.map((step) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;

          return (
            <div
              key={step.num}
              className="relative z-20 flex flex-col items-center"
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-400 text-black"
                    : isCurrent
                      ? "bg-emerald-500 border-emerald-400 text-black ring-4 ring-emerald-400/25"
                      : "bg-zinc-900 border-zinc-700 text-zinc-600"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.num
                )}
              </motion.div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider mt-2 ${
                  isCurrent
                    ? "text-emerald-400"
                    : isCompleted
                      ? "text-zinc-400"
                      : "text-zinc-700"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Thin top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
