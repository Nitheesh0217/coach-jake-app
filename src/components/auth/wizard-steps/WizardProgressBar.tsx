"use client";

import { motion } from "framer-motion";

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function WizardProgressBar({
  currentStep,
  totalSteps,
}: WizardProgressBarProps) {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-7"
    >
      <div className="relative h-1 rounded-full bg-zinc-800/80 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_14px_rgba(16,185,129,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center justify-center gap-12 md:gap-16">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <motion.div
              key={stepNum}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: stepNum * 0.05 }}
            >
              <motion.div
                className={`h-4 w-4 rounded-full border transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-300"
                    : isCurrent
                      ? "bg-emerald-400 border-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.95)]"
                      : "bg-zinc-700 border-zinc-600"
                }`}
                animate={
                  isCurrent
                    ? {
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(16, 185, 129, 0.45)",
                          "0 0 0 10px rgba(16, 185, 129, 0.08)",
                          "0 0 0 0 rgba(16, 185, 129, 0.45)",
                        ],
                      }
                    : {}
                }
                transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
