"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import Step1Profile from "./wizard-steps/Step1Profile";
import Step2PlayingStyle from "./wizard-steps/Step2PlayingStyle";
import Step3TrainingHabits from "./wizard-steps/Step3TrainingHabits";
import Step4Goals from "./wizard-steps/Step4Goals";
import WizardProgressBar from "./wizard-steps/WizardProgressBar";
import confetti from "canvas-confetti";

export interface WizardData {
  // Step 1
  fullName: string;
  age: string;
  height: string;
  weight: string;

  // Step 2
  position: "guard" | "wing" | "forward" | "center" | null;
  teamPlay: number;
  shooter: number;
  finesse: number;

  // Step 3
  sessionsPerWeek: number;
  sessionLength: number;
  sleepHours: number;
  trainingTimes: ("morning" | "afternoon" | "evening" | "weekend")[];

  // Step 4
  goals: (
    | "vertical"
    | "strength"
    | "conditioning"
    | "handles"
    | "court-iq"
    | "recruited"
  )[];
  highlightTagline: string;
  instagramUrl: string;
  youtubeUrl: string;
}

interface OnboardingWizardProps {
  onComplete: (data: WizardData) => void;
}

const STEP_COUNT = 4;

export default function OnboardingWizard({
  onComplete,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    fullName: "",
    age: "",
    height: "",
    weight: "",
    position: null,
    teamPlay: 35,
    shooter: 60,
    finesse: 45,
    sessionsPerWeek: 3,
    sessionLength: 45,
    sleepHours: 7.5,
    trainingTimes: ["morning", "evening"],
    goals: ["vertical", "strength"],
    highlightTagline: "",
    instagramUrl: "",
    youtubeUrl: "",
  });

  const handleNext = () => {
    if (currentStep < STEP_COUNT) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Trigger confetti celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#f59e0b", "#a855f7"],
    });

    // Call the completion handler
    onComplete(data);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">
      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[120px]"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/8 blur-[150px]"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/6 blur-[120px]"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:py-10">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/70 bg-emerald-500/10 text-emerald-300">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-none md:text-4xl">Coach Jake</h1>
            </div>
          </div>

          <span className="rounded-full border border-slate-600 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200">
            Built Different.
          </span>
        </motion.div>

        {/* Progress Bar */}
        <WizardProgressBar currentStep={currentStep} totalSteps={STEP_COUNT} />

        {/* Step Content */}
        <div className="mt-9">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Step1Profile data={data} setData={setData} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Step2PlayingStyle data={data} setData={setData} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Step3TrainingHabits data={data} setData={setData} />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Step4Goals data={data} setData={setData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 flex justify-between gap-4"
        >
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="rounded-2xl border border-slate-600 bg-slate-900/70 px-7 py-3 text-xl font-semibold text-slate-300 transition-all duration-300 hover:border-slate-400 hover:bg-slate-800/90"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEP_COUNT ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-9 py-3 text-2xl font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/50 active:scale-[0.98]"
            >
              Next <span>→</span>
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-9 py-3 text-2xl font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-500/50 active:scale-[0.98]"
            >
              Finish Setup <span>→</span>
            </button>
          )}
        </motion.div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Data drives development. <span className="px-2">|</span> We build
          winners.
        </div>
      </div>
    </div>
  );
}
