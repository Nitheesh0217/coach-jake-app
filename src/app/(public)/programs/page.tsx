"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Lock, Zap, TrendingUp, CheckCircle2, X, Clock, Users, Flame, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TechCorners from "@/components/ui/TechCorners";

type Season = "off-season" | "in-season" | "tryout" | "youth";
type Role = "guard" | "wing" | "big" | "all-around" | null;

interface Program {
  id: string;
  name: string;
  hook: string;
  season: Season[];
  level: string;
  focus: string[];
  duration: string;
  frequency: string;
  tag?: string;
  athletes: string;
  context: string;
  bestFor: string[];
  before: string[];
  after: string[];
  dayPreview: {
    activation: string[];
    mainLift: string[];
    power: string[];
    conditioning: string[];
    coolDown: string[];
  };
  roleMatch?: { role: Role; match: "best" | "also" };
  recommendation: string;
  color: string;
  image: string;
}

const programs: Program[] = [
  {
    id: "off-season-build",
    name: "Off-Season Build Block",
    hook: "For hoopers who want to add real strength and bounce before next season.",
    season: ["off-season"],
    level: "Serious HS/College",
    focus: ["Strength", "Power", "Muscle gain", "Movement quality"],
    duration: "12 weeks",
    frequency: "3–4 days/week",
    tag: "Most popular",
    athletes: "27+",
    context: "HS playoff players over 3 seasons",
    bestFor: ["Want to build muscle safely", "Increasing vertical jump", "Starting fresh in summer"],
    before: [
      "Gassed by 3rd quarter",
      "Avoiding contact in the paint",
      "Legs dead after back-to-backs",
    ],
    after: [
      "Same energy in the 4th as the 1st",
      "Finishing through contact",
      "Confident going into tournament season",
    ],
    dayPreview: {
      activation: ["Band pull-aparts", "Glute bridges", "Cat-cows"],
      mainLift: ["Barbell back squat (4x5)", "Bench press (4x5)"],
      power: ["Box jumps (5x3)", "Dumbbell snatch (3x5)"],
      conditioning: ["Med ball slams", "Farmer carries"],
      coolDown: ["Foam roll", "Dynamic stretching"],
    },
    roleMatch: { role: "guard", match: "also" },
    recommendation: "Most of Coach Jake's varsity forwards start here in the off-season.",
    color: "from-emerald-600/20 to-emerald-950/20",
    image: "/programs/off-season.jpg.png",
  },
  {
    id: "in-season-ready",
    name: "In-Season Game Ready",
    hook: "For players who want to stay strong and fresh through every quarter, not just October.",
    season: ["in-season"],
    level: "JV/Varsity HS",
    focus: ["Low-dose strength", "Power maintenance", "Recovery"],
    duration: "8–16 weeks",
    frequency: "2 days/week",
    tag: "Best for balance",
    athletes: "34+",
    context: "HS varsity rosters during season",
    bestFor: ["Staying strong without overtraining", "Recovery between games", "Maintaining mobility"],
    before: [
      "Feeling weaker by playoffs",
      "Cramping in the 4th quarter",
      "Getting injured more often late season",
    ],
    after: [
      "Stopped cramping in 4th",
      "Still explosive in December",
      "Finishing the season strong",
    ],
    dayPreview: {
      activation: ["Lateral band walks", "Scap pushups", "Glute activation"],
      mainLift: ["Dumbbell goblet squat (3x6)", "Single-arm bench (3x5)"],
      power: ["Jump rope work", "Med ball chest pass"],
      conditioning: ["Court sprints (6x40ft)", "Recovery walk"],
      coolDown: ["Mobility work", "Compression recovery"],
    },
    roleMatch: { role: "guard", match: "best" },
    recommendation: "Varsity guards and wings rely on this block to stay fresh all season.",
    color: "from-blue-600/20 to-blue-950/20",
    image: "/programs/in-season.jpg.png",
  },
  {
    id: "tryout-prep",
    name: "Tryout Prep Sprint",
    hook: "For hoopers who have tryouts circled on the calendar and need to show up in the best shape of their life.",
    season: ["tryout"],
    level: "Middle school / HS bubble players",
    focus: ["Conditioning", "Court speed", "Repeat sprints", "Confidence"],
    duration: "4 weeks",
    frequency: "4 days/week",
    tag: "Fast results",
    athletes: "18+",
    context: "HS bubble players preparing for AAU/showcase events",
    bestFor: ["Tryout season prep", "Making an impression", "Intense 4-week blocks"],
    before: [
      "Not confident in conditioning",
      "Falling off late in showcase games",
      "Playing tentatively",
    ],
    after: [
      "Finishing every possession strong",
      "Scouts noticing relentless energy",
      "Confidence showing on tape",
    ],
    dayPreview: {
      activation: ["Full dynamic warmup", "Court agility ladder"],
      mainLift: ["Compound pairs (squat + row)"],
      power: ["Agility circuits", "Lateral bounds"],
      conditioning: ["Court shuttles", "On/off court sprints", "Game-tempo circuits"],
      coolDown: ["Active recovery", "Mental reset"],
    },
    roleMatch: { role: "wing", match: "also" },
    recommendation: "This block is designed for athletes who want to stand out at showcases.",
    color: "from-orange-600/20 to-orange-950/20",
    image: "/images/Screenshot 2026-06-15 014417.png",
  },
  {
    id: "youth-foundations",
    name: "Youth Foundations",
    hook: "For youth hoopers who need strong movement basics before heavy weights.",
    season: ["youth"],
    level: "Beginner youth (10–13)",
    focus: ["Bodyweight strength", "Coordination", "Landing mechanics", "Fun competition"],
    duration: "8 weeks",
    frequency: "2–3 days/week",
    tag: "New to training",
    athletes: "40+",
    context: "Youth AAU and middle school players",
    bestFor: ["Building movement foundations", "Young players (10–13)", "Setting habits early"],
    before: [
      "Awkward landing patterns",
      "Avoiding contact",
      "Not understanding effort",
    ],
    after: [
      "Land with confidence",
      "Moving like older players",
      "Love training and competing",
    ],
    dayPreview: {
      activation: ["Dynamic games", "Agility drills"],
      mainLift: ["Bodyweight circuits", "Push-up variations"],
      power: ["Jump mechanics practice", "Box step-ups"],
      conditioning: ["Fun court sprints", "Games-based conditioning"],
      coolDown: ["Stretching games", "Cool-down activities"],
    },
    roleMatch: { role: "all-around", match: "best" },
    recommendation: "Youth foundations is the foundation for every serious young player.",
    color: "from-purple-600/20 to-purple-950/20",
    image: "/programs/youth.jpg.png",
  },
  {
    id: "vertical-firstStep",
    name: "Vertical & First Step Lab",
    hook: "For guards and wings who want their first step and vertical to pop on film.",
    season: ["off-season"],
    level: "HS/College guards & wings",
    focus: ["Jump mechanics", "Power", "Decel/accel", "Plyometrics"],
    duration: "6–8 weeks",
    frequency: "3 days/week",
    tag: "Elite edge",
    athletes: "16+",
    context: "College-recruited HS guards and wings",
    bestFor: ["Guard development", "Vertical jump gains", "First-step quickness"],
    before: [
      "Vertical stuck at same level",
      "Getting beaten off the dribble",
      "Not athletic on tape",
    ],
    after: [
      "+3–5 inches on vertical",
      "Beating defenders off the dribble consistently",
      "Standing out on film",
    ],
    dayPreview: {
      activation: ["Plyometric prep", "Proprioceptive work"],
      mainLift: ["Single-leg work (lunges, step-ups)", "Calf raises"],
      power: ["Depth jumps", "Bounding sequences", "Med ball throws"],
      conditioning: ["Court-based explosiveness", "Stop-start drills"],
      coolDown: ["Plyometric recovery", "Mobility focus"],
    },
    roleMatch: { role: "guard", match: "best" },
    recommendation: "College coaches specifically look for this combination of first step + vertical.",
    color: "from-red-600/20 to-red-950/20",
    image: "/images/Screenshot 2026-06-15 014849.png",
  },
  {
    id: "year-round-hooper",
    name: "Year-Round Hooper Path",
    hook: "For serious athletes who want a full 12-month plan, not random blocks.",
    season: ["off-season", "in-season"],
    level: "HS/College, multi-sport allowed",
    focus: ["Sequenced training", "Ongoing membership", "Periodization"],
    duration: "Ongoing subscription",
    frequency: "Varies by phase",
    tag: "Most committed",
    athletes: "12+",
    context: "Multi-sport HS athletes and college players",
    bestFor: ["Year-round commitment", "Multi-sport athletes", "Long-term development"],
    before: [
      "Random training blocks",
      "Not knowing what comes next",
      "Falling off in the offseason",
    ],
    after: [
      "Clear path for 12 months",
      "Staying sharp year-round",
      "Building over time, not resetting",
    ],
    dayPreview: {
      activation: ["Season-specific warmup"],
      mainLift: ["Periodized strength blocks"],
      power: ["Phase-appropriate power work"],
      conditioning: ["Sport-specific conditioning"],
      coolDown: ["Recovery based on phase"],
    },
    roleMatch: { role: "all-around", match: "best" },
    recommendation: "This is for athletes who are serious about long-term development.",
    color: "from-violet-600/20 to-violet-950/20",
    image: "/images/Screenshot 2026-06-15 014918.png",
  },
];

const caseStudies = [
  {
    playerType: "JR guard",
    level: "Varsity",
    timeline: "8 weeks (off-season)",
    result: '+3" vert, stopped cramping in 4th',
    program: "off-season-build",
  },
  {
    playerType: "Stretch big",
    level: "D1 recruit",
    timeline: "One off-season",
    result: "+8 lbs muscle, still mobile",
    program: "off-season-build",
  },
  {
    playerType: "2-sport athlete",
    level: "Junior HS",
    timeline: "Full year",
    result: "Made varsity, stayed strong through both seasons",
    program: "year-round-hooper",
  },
  {
    playerType: "Wing, AAU showcase",
    level: "8th grade",
    timeline: "4 weeks",
    result: "D1 coaches noticed; offering full ride as freshman",
    program: "tryout-prep",
  },
];

const roadmapPhases = [
  {
    phase: "Off-Season Build",
    programs: ["Off-Season Build Block", "Vertical & First Step Lab"],
    timeline: "June–August",
  },
  {
    phase: "Pre-Season Ramp",
    programs: ["Tryout Prep Sprint", "Year-Round Hooper Path"],
    timeline: "August–September",
  },
  {
    phase: "In-Season Maintain",
    programs: ["In-Season Game Ready", "Year-Round Hooper Path"],
    timeline: "October–March",
  },
  {
    phase: "Playoff Peak",
    programs: ["In-Season Game Ready", "Year-Round Hooper Path"],
    timeline: "March–April",
  },
];

export default function ProgramsPage() {
  const [selectedSeason, setSelectedSeason] = useState<Season>("off-season");
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [previewOpen, setPreviewOpen] = useState<string | null>(null);

  const filteredPrograms = programs.filter((p) =>
    p.season.includes(selectedSeason)
  );

  const getRoleMatch = (program: Program, role: Role) => {
    if (!role || !program.roleMatch) return null;
    if (program.roleMatch.role === role) return program.roleMatch.match;
    return null;
  };

  return (
    <main className="relative text-zinc-50 bg-transparent min-h-screen">
      {/* Translucent background overlay to let WebGL show through */}
      <div className="fixed inset-0 bg-[#050816]/75 backdrop-blur-[2px] pointer-events-none -z-10" />

      {/* ===== HERO / SEASON PICKER ===== */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-12">
            {/* Hero Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300"
                >
                  Training catalog
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white"
                >
                  Pick Your Season
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl text-zinc-300 max-w-2xl"
                >
                  Every program is built from real seasons, real athletes, and real results. Choose your moment, and let's get you there.
                </motion.p>
              </div>

              {/* Season Toggle */}
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { label: "Off-Season", value: "off-season" as Season },
                  { label: "In-Season", value: "in-season" as Season },
                  { label: "Tryout Prep", value: "tryout" as Season },
                  { label: "Youth", value: "youth" as Season },
                ].map((season) => (
                  <button
                    key={season.value}
                    onClick={() => {
                      setSelectedSeason(season.value);
                      setPreviewOpen(null);
                    }}
                    className={`px-6 py-3.5 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer ${
                      selectedSeason === season.value
                        ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/40"
                        : "bg-zinc-900 text-zinc-300 border border-zinc-700/50 hover:border-zinc-600"
                    }`}
                  >
                    {season.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROLE-BASED RECOMMENDATION BAND ===== */}
      <section className="relative py-12 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-550">
              What position do you play?
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: "Guard", value: "guard" as Role },
                { label: "Wing", value: "wing" as Role },
                { label: "Big", value: "big" as Role },
                { label: "All-around", value: "all-around" as Role },
              ].map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(selectedRole === role.value ? null : role.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedRole === role.value
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                      : "bg-zinc-900/50 text-zinc-405 border border-zinc-700/30 hover:border-zinc-650"
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAM CARDS ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-850">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-12">
            {filteredPrograms.map((program) => {
              const roleMatch = selectedRole ? getRoleMatch(program, selectedRole) : null;
              return (
                <div key={program.id} className="space-y-6">
                  {/* Program Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className={`glass-card relative rounded-2xl overflow-hidden border border-zinc-850/80 bg-zinc-950/45 backdrop-blur-md group/card hover:border-emerald-500/25 transition-all duration-300 shadow-2xl cyber-scanlines`}
                  >
                    <TechCorners color="border-emerald-500/25" size="w-4 h-4" />
                    
                    <div className="grid lg:grid-cols-12 gap-8 p-6 lg:p-8 items-center">
                      {/* Left: Program Copy / Details */}
                      <div className="lg:col-span-8 space-y-6 relative z-10">
                        {/* Header with badges */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2.5">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                              {program.name}
                            </span>
                            <h3 className="text-xl font-black text-white group-hover/card:text-emerald-100 transition-colors tracking-tight">
                              {program.hook}
                            </h3>
                            <p className="text-xs text-zinc-500 font-semibold">
                              Built from working with {program.athletes}+ {program.context}
                            </p>
                          </div>
                          
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 sm:self-start">
                            {program.tag && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {program.tag}
                              </span>
                            )}
                            {roleMatch && (
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                roleMatch === "best" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              }`}>
                                {roleMatch === "best" ? "Best match" : "Also works"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Details grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-zinc-800/60 font-mono text-xs">
                          <div>
                            <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-bold">Duration</p>
                            <p className="text-sm font-semibold text-zinc-200 mt-1">{program.duration}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-bold">Frequency</p>
                            <p className="text-sm font-semibold text-zinc-200 mt-1">{program.frequency}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-bold">Best For</p>
                            <p className="text-sm font-semibold text-zinc-350 mt-1 truncate">{program.bestFor[0]}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-bold">Focus</p>
                            <p className="text-sm font-semibold text-zinc-350 mt-1 truncate">{program.focus[0]}</p>
                          </div>
                        </div>

                        {/* Recommendation */}
                        {selectedRole && (
                          <p className="text-xs text-zinc-400 italic">
                            👉 {program.recommendation}
                          </p>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => setPreviewOpen(previewOpen === program.id ? null : program.id)}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs transition-colors cursor-pointer"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            {previewOpen === program.id ? "Hide Day" : "View a Day"}
                          </button>
                          <Link
                            href="/signup"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Lock spot
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Graphic Console with Screenshot or Program Image */}
                      <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-zinc-850 bg-zinc-900 group-hover/card:border-emerald-500/25 transition-colors duration-300">
                        <img
                          src={program.image}
                          alt={program.name}
                          className="w-full h-full object-cover aspect-video lg:aspect-[4/3] opacity-75 group-hover/card:scale-105 group-hover/card:opacity-90 transition-all duration-700"
                        />
                        <div className="absolute inset-0 cyber-grid opacity-[0.08] pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Day Preview Overlay */}
                  <AnimatePresence>
                    {previewOpen === program.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass-card relative border border-zinc-800 bg-zinc-950/60 backdrop-blur-sm p-8 rounded-2xl overflow-hidden group/preview cyber-scanlines"
                      >
                        <TechCorners color="border-zinc-700" size="w-3.5 h-3.5" />
                        <div className="flex items-center justify-between mb-6 relative z-10">
                          <h4 className="text-lg font-black text-white">Sample Training Day</h4>
                          <button
                            onClick={() => setPreviewOpen(null)}
                            className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4 text-zinc-400" />
                          </button>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                          {[
                            { title: "Activation", icon: Zap, items: program.dayPreview.activation },
                            { title: "Main Lift", icon: Dumbbell, items: program.dayPreview.mainLift },
                            { title: "Power", icon: Flame, items: program.dayPreview.power },
                            { title: "Conditioning", icon: Users, items: program.dayPreview.conditioning },
                            { title: "Cool Down", icon: CheckCircle2, items: program.dayPreview.coolDown },
                          ].map((phase, idx) => {
                            const Icon = phase.icon;
                            return (
                              <div key={idx} className="space-y-3">
                                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                                  <Icon className="w-4.5 h-4.5 text-emerald-400" />
                                  <p className="text-xs font-black text-white uppercase tracking-wider">
                                    {phase.title}
                                  </p>
                                </div>
                                <ul className="space-y-2 font-mono text-[11px] text-zinc-400">
                                  {phase.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                      • {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Before → After Transformation Strip */}
                  <div className="grid lg:grid-cols-2 gap-5">
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="rounded-xl bg-zinc-950/30 border border-red-950/20 p-5 space-y-3 relative overflow-hidden"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500">
                        Before
                      </p>
                      <ul className="space-y-2.5">
                        {program.before.map((item, idx) => (
                          <li key={idx} className="text-xs text-zinc-350 flex gap-2.5 items-start">
                            <span className="text-red-500 font-bold leading-none select-none">−</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="rounded-xl bg-zinc-950/30 border border-emerald-950/20 p-5 space-y-3 relative overflow-hidden"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                        After
                      </p>
                      <ul className="space-y-2.5">
                        {program.after.map((item, idx) => (
                          <li key={idx} className="text-xs text-zinc-350 flex gap-2.5 items-start">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 animate-pulse" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BENTO APP SHOWCASE ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-850">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest block font-mono">Mobile App HUD</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">The Athlete Interface</h2>
            <p className="text-zinc-500">Track every rep, watch custom film, and climb the leaderboard in real time.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: "/images/Screenshot 2026-06-15 014500.png", title: "Daily Workouts", desc: "Interactive session timers and progress tracking." },
              { img: "/images/Screenshot 2026-06-15 014601.png", title: "Video Telemetry", desc: "Actionable film clips synced directly to your drills." },
              { img: "/images/Screenshot 2026-06-15 014730.png", title: "Athlete Profiles", desc: "Digital cards showing playing style and physical metrics." }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass-card relative border border-zinc-850 bg-zinc-950/40 rounded-2xl overflow-hidden group/showcase cursor-pointer cyber-scanlines"
              >
                <TechCorners color="border-zinc-800" size="w-3.5 h-3.5" />
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-zinc-850 relative">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-75 group-hover/showcase:scale-105 group-hover/showcase:opacity-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 cyber-grid opacity-[0.06] pointer-events-none" />
                </div>
                <div className="p-5 space-y-1 relative z-10">
                  <h4 className="text-base font-black text-white group-hover/showcase:text-emerald-400 transition-colors">{card.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUILT FROM REAL PLAYERS ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-widest block">Case Studies</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Built from real seasons, not theory</h2>
            <p className="text-zinc-500">Here's how athletes just like you transformed their game.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseStudies.map((study, idx) => {
              const linkedProgram = programs.find((p) => p.id === study.program);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="glass-card relative border border-zinc-800/60 bg-zinc-950/40 p-6 space-y-3 rounded-xl hover:border-zinc-700 transition-all duration-200"
                >
                  <TechCorners color="border-zinc-850" size="w-3 h-3" />
                  <div className="space-y-1 bg-transparent">
                    <p className="text-sm font-black text-white">{study.playerType}</p>
                    <p className="text-xs text-zinc-500 font-semibold">{study.level}</p>
                  </div>

                  <div className="pt-2.5 space-y-1 border-t border-zinc-800/80">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Timeline</p>
                    <p className="text-xs font-semibold text-zinc-300">{study.timeline}</p>
                  </div>

                  <div className="pt-2.5 space-y-1 border-t border-zinc-800/80">
                    <p className="text-[10px] text-zinc-550 uppercase tracking-widest font-bold">Result</p>
                    <p className="text-xs font-black text-emerald-400">{study.result}</p>
                  </div>

                  {linkedProgram && (
                    <div className="pt-2.5 border-t border-zinc-800/80">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-350 border border-emerald-500/20">
                        {linkedProgram.tag || "Program"}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW PROGRAMS CONNECT ROADMAP ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-violet-400 text-xs font-black uppercase tracking-widest block">Periodization</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">How programs connect</h2>
            <p className="text-zinc-500">Your 12-month periodization roadmap with Coach Jake.</p>
          </div>

          {/* Desktop roadmap */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connector line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/30 to-emerald-500/5" />

              {/* Phases */}
              <div className="grid grid-cols-4 gap-4 relative z-10">
                {roadmapPhases.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="space-y-4"
                  >
                    {/* Phase dot */}
                    <div className="flex justify-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#050816] shadow-lg shadow-emerald-500/40 animate-pulse" />
                    </div>

                    {/* Phase card */}
                    <div className="glass-card relative border border-zinc-800 bg-zinc-950/40 p-5 rounded-xl space-y-3 text-center overflow-hidden group/road">
                      <TechCorners color="border-zinc-850" size="w-3 h-3" />
                      <div>
                        <p className="text-sm font-black text-white">{item.phase}</p>
                        <p className="text-[10px] text-zinc-500 pt-1 font-bold uppercase tracking-wider">{item.timeline}</p>
                      </div>

                      <div className="space-y-1.5 border-t border-zinc-800/80 pt-3 text-xs text-zinc-400 font-medium">
                        {item.programs.map((prog, pIdx) => (
                          <p key={pIdx}>
                            {prog}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile roadmap */}
          <div className="lg:hidden space-y-4">
            {roadmapPhases.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-sm font-black text-white">{item.phase}</p>
                    <p className="text-xs text-zinc-500 font-semibold">{item.timeline}</p>
                  </div>
                </div>
                <div className="ml-7 space-y-1.5 text-xs text-zinc-400 font-medium">
                  {item.programs.map((prog, pIdx) => (
                    <p key={pIdx}>
                      → {prog}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STICKY CTA BAR ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-850 bg-black/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="#"
              className="text-xs font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-350 transition-colors"
            >
              ❓ Not sure? Take 30-sec quiz
            </Link>

            <Link
              href="/signup"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              Start Off-Season Build
              <ChevronRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for sticky bar */}
      <div className="h-20" />
    </main>
  );
}
