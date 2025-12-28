"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Lock, Zap, TrendingUp, CheckCircle2, X, Clock, Users, Flame } from "lucide-react";

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
      power: ["Plyometric circuits", "Lateral bounds"],
      conditioning: ["Court shuttles", "On/off court sprints", "Game-tempo circuits"],
      coolDown: ["Active recovery", "Mental reset"],
    },
    roleMatch: { role: "wing", match: "also" },
    recommendation: "This block is designed for athletes who want to stand out at showcases.",
    color: "from-orange-600/20 to-orange-950/20",
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
    <main className="relative text-zinc-50">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />
      <div
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.6 }}
        aria-hidden
      />

      {/* ===== HERO / SEASON PICKER ===== */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-12">
            {/* Hero Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Pick Your Season
                </h1>
                <p className="text-xl text-zinc-300 max-w-2xl">
                  Every program is built from real seasons, real athletes, and real results.
                  Choose your moment, and let's get you there.
                </p>
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
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
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
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
              What do you play?
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Guard", value: "guard" as Role },
                { label: "Wing", value: "wing" as Role },
                { label: "Big", value: "big" as Role },
                { label: "All-around", value: "all-around" as Role },
              ].map((role) => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(selectedRole === role.value ? null : role.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedRole === role.value
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                      : "bg-zinc-900/50 text-zinc-400 border border-zinc-700/30 hover:border-zinc-600"
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
      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-12">
            {filteredPrograms.map((program) => {
              const roleMatch = selectedRole ? getRoleMatch(program, selectedRole) : null;
              return (
                <div key={program.id} className="space-y-6">
                  {/* Program Card */}
                  <div
                    className={`relative rounded-2xl overflow-hidden border border-zinc-800/60 bg-gradient-to-br ${program.color} backdrop-blur-sm group hover:border-zinc-700/80 transition-all duration-300`}
                  >
                    <div className="p-8 lg:p-10 space-y-6">
                      {/* Header with badges */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          {/* Story Hook */}
                          <p className="text-lg font-semibold text-zinc-100 leading-snug">
                            {program.hook}
                          </p>

                          {/* Meta line */}
                          <p className="text-sm text-zinc-400">
                            Built from working with {program.athletes}+ {program.context}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {program.tag && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {program.tag}
                              </span>
                            )}
                            {roleMatch && (
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  roleMatch === "best"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                }`}
                              >
                                {roleMatch === "best" ? "Best match" : "Also works"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right side info */}
                        <div className="space-y-2 lg:text-right">
                          <p className="text-sm font-semibold text-zinc-300">{program.name}</p>
                          <p className="text-xs text-zinc-500 uppercase tracking-widest">
                            {program.level}
                          </p>
                        </div>
                      </div>

                      {/* Key details grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-700/30">
                        <div className="space-y-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-widest">
                            Duration
                          </p>
                          <p className="text-sm font-semibold">{program.duration}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-widest">
                            Frequency
                          </p>
                          <p className="text-sm font-semibold">{program.frequency}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-widest">
                            Best for
                          </p>
                          <p className="text-sm font-semibold text-zinc-300">
                            {program.bestFor[0]}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-zinc-500 uppercase tracking-widest">
                            Focus
                          </p>
                          <p className="text-sm font-semibold text-zinc-300">
                            {program.focus[0]}
                          </p>
                        </div>
                      </div>

                      {/* Role recommendation */}
                      {selectedRole && (
                        <div className="pt-4 border-t border-zinc-700/30">
                          <p className="text-sm text-zinc-300 italic">
                            👉 {program.recommendation}
                          </p>
                        </div>
                      )}

                      {/* CTA buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-700/30">
                        <button
                          onClick={() =>
                            setPreviewOpen(previewOpen === program.id ? null : program.id)
                          }
                          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors duration-200"
                        >
                          <Clock className="w-4 h-4" />
                          {previewOpen === program.id ? "Hide" : "View a day"}
                        </button>
                        <Link
                          href="/signup"
                          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
                        >
                          Lock in my spot
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Day Preview Overlay */}
                  {previewOpen === program.id && (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-8 space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-bold">Sample Training Day</h4>
                        <button
                          onClick={() => setPreviewOpen(null)}
                          className="p-1 hover:bg-zinc-800 rounded transition-colors"
                        >
                          <X className="w-5 h-5 text-zinc-400" />
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                          {
                            title: "Activation",
                            icon: Zap,
                            items: program.dayPreview.activation,
                          },
                          {
                            title: "Main Lift",
                            icon: TrendingUp,
                            items: program.dayPreview.mainLift,
                          },
                          {
                            title: "Power",
                            icon: Flame,
                            items: program.dayPreview.power,
                          },
                          {
                            title: "Conditioning",
                            icon: Users,
                            items: program.dayPreview.conditioning,
                          },
                          {
                            title: "Cool Down",
                            icon: CheckCircle2,
                            items: program.dayPreview.coolDown,
                          },
                        ].map((phase, idx) => {
                          const Icon = phase.icon;
                          return (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Icon className="w-5 h-5 text-emerald-400" />
                                <p className="text-sm font-semibold text-zinc-200">
                                  {phase.title}
                                </p>
                              </div>
                              <ul className="space-y-2">
                                {phase.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-xs text-zinc-400">
                                    • {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Before → After Transformation Strip */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="rounded-lg bg-zinc-950/50 border border-red-900/20 p-6 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
                        Before
                      </p>
                      <ul className="space-y-2">
                        {program.before.map((item, idx) => (
                          <li key={idx} className="text-sm text-zinc-300 flex gap-2">
                            <span className="text-red-500 font-bold mt-0.5">−</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg bg-zinc-950/50 border border-emerald-900/20 p-6 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                        After
                      </p>
                      <ul className="space-y-2">
                        {program.after.map((item, idx) => (
                          <li key={idx} className="text-sm text-zinc-300 flex gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BUILT FROM REAL PLAYERS ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Built from real seasons, not theory.
            </h2>
            <p className="text-lg text-zinc-400">
              Here's how athletes just like you transformed their game.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {caseStudies.map((study, idx) => {
              const linkedProgram = programs.find((p) => p.id === study.program);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-6 space-y-3 hover:border-zinc-700 transition-all duration-200"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-zinc-200">{study.playerType}</p>
                    <p className="text-xs text-zinc-500">{study.level}</p>
                  </div>

                  <div className="pt-2 space-y-2 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">
                      Timeline
                    </p>
                    <p className="text-sm font-semibold text-zinc-300">{study.timeline}</p>
                  </div>

                  <div className="pt-2 space-y-2 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">Result</p>
                    <p className="text-sm font-semibold text-emerald-300">{study.result}</p>
                  </div>

                  {linkedProgram && (
                    <div className="pt-2 border-t border-zinc-800">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {linkedProgram.tag || "Program"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW PROGRAMS CONNECT ROADMAP ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold">
              How programs connect.
            </h2>
            <p className="text-lg text-zinc-400">
              Your 12-month roadmap with Coach Jake.
            </p>
          </div>

          {/* Desktop roadmap */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connector line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5" />

              {/* Phases */}
              <div className="grid grid-cols-4 gap-4 relative z-10">
                {roadmapPhases.map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    {/* Phase dot */}
                    <div className="flex justify-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#050816] shadow-lg shadow-emerald-500/40" />
                    </div>

                    {/* Phase card */}
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 space-y-3 text-center">
                      <div>
                        <p className="text-sm font-bold text-white">{item.phase}</p>
                        <p className="text-xs text-zinc-500 pt-1">{item.timeline}</p>
                      </div>

                      <div className="space-y-1 border-t border-zinc-800 pt-3">
                        {item.programs.map((prog, pIdx) => (
                          <p key={pIdx} className="text-xs text-zinc-400">
                            {prog}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile roadmap */}
          <div className="lg:hidden space-y-4">
            {roadmapPhases.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-sm font-bold text-white">{item.phase}</p>
                    <p className="text-xs text-zinc-500">{item.timeline}</p>
                  </div>
                </div>
                <div className="ml-7 space-y-1">
                  {item.programs.map((prog, pIdx) => (
                    <p key={pIdx} className="text-xs text-zinc-400">
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
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-black/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              ❓ Not sure? Take 30-sec quiz
            </Link>

            <Link
              href="/signup"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/30"
            >
              Start Off-Season Build
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for sticky bar */}
      <div className="h-20" />
    </main>
  );
}
