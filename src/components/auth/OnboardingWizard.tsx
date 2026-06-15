"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const progressPercent = Math.round((currentStep / STEP_COUNT) * 100);

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

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-black font-bold">
              CJ
            </div>
            <div>
              <h1 className="text-xl font-bold">Coach Jake</h1>
              <p className="text-xs text-zinc-400">Build Different.</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <WizardProgressBar currentStep={currentStep} totalSteps={STEP_COUNT} />

        {/* Step Content */}
        <div className="mt-12">
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
          className="mt-12 flex gap-4 justify-between"
        >
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-8 py-3.5 rounded-full border border-zinc-700 text-zinc-300 font-semibold hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEP_COUNT ? (
            <button
              onClick={handleNext}
              className="px-8 py-3.5 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              Next <span>→</span>
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-8 py-3.5 rounded-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 w-full justify-center"
            >
              Finish Setup <span>→</span>
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
