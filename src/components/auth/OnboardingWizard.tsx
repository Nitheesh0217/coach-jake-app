"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
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

function Step3InteractionNotes() {
  const notes = [
    {
      title: "Pill Tap (Toggle)",
      icon: Sparkles,
      points: [
        "On tap, pill scales to 0.94 then springs to 1.06 before settling at 1.00",
        "Border glow intensifies with a soft emerald aura",
      ],
    },
    {
      title: "Multi-Select Behavior",
      icon: Layers,
      points: [
        "Each pill is independent and maintains its own state",
        "Selecting or deselecting one pill does not affect others",
      ],
    },
    {
      title: "Bounce Feedback",
      icon: Activity,
      points: [
        "When a pill is selected, a subtle bounce occurs",
        "Accent lines fade out after interaction",
      ],
    },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="h-fit rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-[#0c1530]/85 to-[#070e21]/85 p-6 backdrop-blur-xl"
    >
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-emerald-300">
        Animation & Interaction Notes
      </h3>

      <div className="space-y-4">
        {notes.map((note) => {
          const Icon = note.icon;

          return (
            <div
              key={note.title}
              className="rounded-2xl border border-white/10 bg-[#060d20]/70 p-4"
            >
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <Icon className="h-4 w-4" />
                <h4 className="text-sm font-semibold uppercase tracking-wide">
                  {note.title}
                </h4>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                {note.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 text-emerald-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}

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
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#f59e0b", "#a855f7"],
    });

    onComplete(data);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-28 top-1/3 h-80 w-80 rounded-full bg-emerald-400/20 blur-[110px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[130px]"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[120px]"
          animate={{ x: [0, 35, 0] }}
          transition={{ duration: 11, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1220px] px-6 py-8 md:px-10 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.5)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                COACH <span className="text-emerald-400">JAKE</span>
              </h1>
              <p className="text-sm text-zinc-400">Train Smarter. Win More.</p>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto max-w-[980px]">
          <WizardProgressBar currentStep={currentStep} totalSteps={STEP_COUNT} />
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
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

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 flex justify-between rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-[#0a132c]/80 to-[#070d21]/90 px-5 py-5"
            >
              {currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 rounded-2xl border border-zinc-600 px-7 py-3 text-lg font-medium text-zinc-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < STEP_COUNT ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-10 py-3 text-lg font-semibold text-[#03210f] shadow-[0_8px_30px_rgba(16,185,129,0.4)] transition hover:brightness-110"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-10 py-3 text-lg font-semibold text-[#03210f] shadow-[0_8px_30px_rgba(16,185,129,0.4)] transition hover:brightness-110"
                >
                  Finish Setup
                  <Check className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          </div>

          <div className="hidden lg:block">
            {currentStep === 3 ? <Step3InteractionNotes /> : null}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between px-2 text-sm text-zinc-400">
          <span>Your data is secure and never shared.</span>
          <span>
            Need help? <a className="text-emerald-400">Contact support ↗</a>
          </span>
        </div>
      </div>
    </div>
  );
}
