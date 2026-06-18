"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1Profile from "./wizard-steps/Step1Profile";
import Step2PlayingStyle from "./wizard-steps/Step2PlayingStyle";
import Step3TrainingHabits from "./wizard-steps/Step3TrainingHabits";
import Step4Goals from "./wizard-steps/Step4Goals";
import confetti from "canvas-confetti";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";
import TechCorners from "@/components/ui/TechCorners";

export interface WizardData {
  fullName: string;
  age: string;
  height: string;
  weight: string;
  position: "guard" | "wing" | "forward" | "center" | null;
  teamPlay: number;
  shooter: number;
  finesse: number;
  sessionsPerWeek: number;
  sessionLength: number;
  sleepHours: number;
  trainingTimes: ("morning" | "afternoon" | "evening" | "weekend")[];
  goals: ("vertical" | "strength" | "conditioning" | "handles" | "court-iq" | "recruited")[];
  highlightTagline: string;
  instagramUrl: string;
  youtubeUrl: string;
}

interface OnboardingWizardProps {
  onComplete: (data: WizardData) => void;
}

const STEP_LABELS = ["Account", "Playing Style", "Your Habits", "Your Goals"];
const STEP_COUNT = 4;

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
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
    if (currentStep < STEP_COUNT) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#f59e0b", "#a855f7"],
    });
    onComplete(data);
  };

  const progressPercent = Math.round((currentStep / STEP_COUNT) * 100);

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">
      {/* Top thin progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/6 blur-[150px]"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full bg-emerald-500/5 blur-[180px]"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[150px]"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-8 pb-16 md:pt-12">
        {/* Logo + dots */}
        <div className="mb-10 flex items-center justify-between">
          <BrandLogo showSubtitle={true} logoSize="w-9 h-9" />
          <div className="flex items-center gap-2">
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i + 1 === currentStep
                    ? "w-5 h-5 bg-emerald-500 border-2 border-emerald-400"
                    : i + 1 < currentStep
                    ? "w-3 h-3 bg-emerald-500/60"
                    : "w-3 h-3 bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Horizontal step connector */}
        <div className="relative flex items-start justify-between mb-10">
          <div className="absolute left-4 right-4 top-4 h-0.5 bg-zinc-800" />
          <motion.div
            className="absolute left-4 top-4 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 origin-left"
            animate={{
              width: `${Math.max(0, (currentStep - 1) / (STEP_COUNT - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {Array.from({ length: STEP_COUNT }).map((_, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-400 text-black"
                    : isCurrent
                    ? "bg-emerald-500 border-emerald-400 text-black shadow-[0_0_14px_rgba(16,185,129,0.5)]"
                    : "bg-zinc-900 border-zinc-700 text-zinc-600"
                }`}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : step}
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${
                  isCurrent ? "text-emerald-400" : isCompleted ? "text-zinc-400" : "text-zinc-700"
                }`}>
                  {STEP_LABELS[i]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.38 }}
            className="glass-card relative p-6 md:p-8 border border-zinc-800/80 rounded-2xl bg-zinc-950/40 backdrop-blur-md overflow-hidden group/card cyber-scanlines"
          >
            <TechCorners color="border-emerald-500/40" size="w-3 h-3" />
            {currentStep === 1 && <Step1Profile data={data} setData={setData} />}
            {currentStep === 2 && <Step2PlayingStyle data={data} setData={setData} />}
            {currentStep === 3 && <Step3TrainingHabits data={data} setData={setData} />}
            {currentStep === 4 && <Step4Goals data={data} setData={setData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 font-semibold text-sm transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < STEP_COUNT ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_32px_rgba(16,185,129,0.6)] hover:-translate-y-0.5"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all duration-200 shadow-[0_0_24px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:-translate-y-0.5"
            >
              Finish Setup →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
