"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Check, Quote, ArrowDown, Trophy, Dumbbell, Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";
import TechCorners from "@/components/ui/TechCorners";

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ===== DATA =====
  const philosophyPillars = [
    {
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      title: "Movement First",
      desc: "You should feel better in the 4th than you used to in the 3rd, not beat up by the work.",
    },
    {
      icon: <Dumbbell className="w-8 h-8 text-cyan-400" />,
      title: "Strength That Translates",
      desc: "Every lift connects to your game. More power off the floor, stronger on contact, fresher late.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-amber-400" />,
      title: "Data, Not Guesswork",
      desc: "We track what matters: vert gains, sprint times, strength jumps. You see the proof weekly.",
    },
    {
      icon: <Flame className="w-8 h-8 text-violet-400" />,
      title: "Long-Term Athlete",
      desc: "Building your game for next season and beyond, not just getting you through this month.",
    },
  ];

  const journeyMilestones = [
    {
      year: "2018",
      title: "First Hooper",
      desc: "Started training as a serious player. Fell in love with the game, obsessed with getting better.",
    },
    {
      year: "2019",
      title: "Started Coaching",
      desc: "Coached first high school team. Saw firsthand how bad programming leaves kids behind.",
    },
    {
      year: "2021",
      title: "100+ Athletes",
      desc: "Expanded to private coaching. Helped 3 varsity players add 10+ lbs of muscle without losing quickness.",
    },
    {
      year: "2023",
      title: "D1 Placements",
      desc: "Multiple athletes committed to college programs with documented strength + athleticism gains.",
    },
    {
      year: "2024",
      title: "Coach Jake App",
      desc: "Launched remote coaching system. Now working with hoopers across 15+ states, same standard of care.",
    },
  ];

  const caseStudies = [
    {
      playerType: "Sophomore guard",
      level: "Varsity",
      issue: "Gassed late in games",
      outcome: 'Now playing 28+ mins with same energy. "I feel stronger in the 4th."',
    },
    {
      playerType: "Stretch big",
      level: "College recruit",
      issue: "Under-sized in the lane",
      outcome: "+8 lbs muscle in 12 weeks, maintained mobility. Three D1 offers.",
    },
    {
      playerType: "Youth wing",
      level: "AAU Elite",
      issue: "Avoiding contact",
      outcome: "Added 4 inches to vertical. Now confidently finishing through defenders.",
    },
    {
      playerType: "Junior forward",
      level: "HS Varsity",
      issue: "No access to real coaching",
      outcome: "+3\" vert in 8 weeks using remote system. Scouts noticed at showcase.",
    },
    {
      playerType: "Multi-sport athlete",
      level: "High school",
      issue: "Juggling football + basketball",
      outcome: "Sport-specific programming. Stronger in both, avoided injury.",
    },
    {
      playerType: "High school guard",
      level: "First-year varsity",
      issue: "Raw strength, weak fundamentals",
      outcome: "Movement patterns fixed in 3 weeks. Injury-proof and confident.",
    },
  ];

  const goodFitItems = [
    "You're willing to train 2–4 days/week consistently",
    "You care about measurable progress, not just 'getting swole'",
    "You want coaching, not just a program",
    "You're willing to show up in person or remote and do the work",
    "You want to get stronger AND smarter on the court",
    "You're serious about your game, and it shows",
  ];

  const notFitItems = [
    "You're looking for shortcuts or quick fixes",
    "You want to train 1 day a week and expect major changes",
    "You won't commit past 2–3 weeks",
    "You don't care about tracking progress",
    "You want a generic program, not personalized coaching",
    "You're not actually ready to change your habits",
  ];

  const faqItems = [
    {
      q: "What age groups do you work with?",
      a: "I coach athletes from middle school (12+) all the way through college and pros. Every program is tailored to your level and timeline.",
    },
    {
      q: "Do I need a full gym?",
      a: "No. My programs work with dumbbells, a bench, and bodyweight. I'll customize to whatever you have access to.",
    },
    {
      q: "How long before I see results?",
      a: "Strength and power gains show within 4–6 weeks if you're consistent. Bigger gains (like vert or conditioning) take 8–12 weeks.",
    },
    {
      q: "Can this work alongside my team training?",
      a: "Absolutely. I structure programs to complement your team's schedule and intensity, not fight it.",
    },
    {
      q: "What if I've never lifted before?",
      a: "Perfect. We start with solid movement patterns and build from there. You'll learn the right way from day one.",
    },
    {
      q: "Do you work with parents or just players?",
      a: "Both. I've worked with middle school parents who want to set up their kids right, and college players fine-tuning for the next level.",
    },
  ];

  return (
    <main className="relative text-zinc-50 bg-transparent min-h-screen">
      {/* Translucent background overlay to let WebGL show through */}
      <div className="fixed inset-0 bg-transparent/75 backdrop-blur-[2px] pointer-events-none -z-10" />

      {/* ===== SECTION 1: HERO + MISSION ===== */}
      <section className="relative py-16 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300"
                >
                  Meet Coach Jake
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white"
                >
                  Building stronger hoopers, one season at a time.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl text-zinc-300"
                >
                  Coach Jake helps dedicated players get stronger, last longer, and show up confident in big games.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base text-zinc-400 leading-relaxed"
                >
                  Whether you're a middle schooler building your foundation, a varsity player fighting for minutes, or a college athlete chasing the next level—Jake's programs are built around you, not generic templates. You'll train 2–4 days a week, see measurable progress, and most importantly: feel the difference on the court.
                </motion.p>
              </div>

              {/* Stats Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400">5+</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Years coaching</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black text-cyan-400">120+</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Athletes trained</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black text-violet-400">HS–D1</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Levels coached</p>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 pt-4"
              >
                <button
                  onClick={() => scrollToSection("proof")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                >
                  See the system
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </button>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-zinc-700 text-white hover:border-emerald-500/40 hover:bg-zinc-900/40 font-semibold transition-all duration-200"
                >
                  View programs
                </Link>
              </motion.div>
            </div>

            {/* Right: Premium Graphic Console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative group rounded-2xl overflow-hidden border border-emerald-500/20 bg-zinc-950/60 p-2 shadow-2xl cyber-scanlines"
            >
              <TechCorners color="border-emerald-500/40" size="w-3.5 h-3.5" />
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-zinc-900 flex items-center justify-center relative">
                <img
                  src="/images/coach-jake.jpg"
                  alt="Coach Jake coaching"
                  className="w-full h-full object-cover opacity-75 group-hover:scale-110 group-hover:rotate-[-0.5deg] group-hover:translate-x-1 transition-all duration-700"
                />
                <div className="absolute inset-0 cyber-grid opacity-[0.08] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-65" />
                
                {/* Overlay HUD Telemetry */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-400 tracking-wider bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5">
                  SYSTEM ACTIVE // 5.0.4
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-emerald-400 font-black tracking-widest bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded border border-emerald-500/20">
                  TRAIN SMARTER. WIN MORE.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: COACHING PHILOSOPHY ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest block">Core Principles</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">How Jake coaches your game</h2>
            <p className="text-zinc-500">Four principles that guide every program he builds.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass-card relative p-6 space-y-3 border border-zinc-800/60 rounded-2xl bg-zinc-950/40 backdrop-blur-sm group/card overflow-hidden cursor-pointer"
              >
                <TechCorners color="border-emerald-500/30" size="w-3.5 h-3.5" />
                <div className="p-2 w-fit rounded-lg bg-zinc-900/60 border border-white/5 mb-2">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-black text-white group-hover/card:text-emerald-300 transition-colors">{pillar.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: JOURNEY/TIMELINE ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-cyan-400 text-xs font-black uppercase tracking-widest block">The Evolution</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">From hooper to Coach Jake</h2>
            <p className="text-zinc-500">How a player's obsession became a remote coaching system.</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-emerald-500/40 to-transparent" />

            <div className="space-y-8">
              {journeyMilestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="relative lg:pl-32"
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#050816] shadow-lg shadow-emerald-500/40 lg:left-0" />

                  {/* Card */}
                  <div className="glass-card relative border border-zinc-800/60 rounded-xl bg-zinc-950/45 p-6 space-y-2 hover:border-emerald-500/35 transition-all duration-300 group/card overflow-hidden">
                    <TechCorners color="border-emerald-500/20" size="w-3 h-3" />
                    <p className="text-sm font-black uppercase tracking-widest text-emerald-400">
                      {milestone.year}
                    </p>
                    <h3 className="text-lg font-black text-white group-hover/card:text-emerald-200 transition-colors">{milestone.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: ON & OFF COURT ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* On the court */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-black text-white tracking-tight border-b border-zinc-800 pb-3 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                On The Court
              </h3>
              <div className="space-y-4">
                {[
                  "High energy, clear expectations. Every rep has game context.",
                  "Strength work that translates. No ego lifts, just what works on the court.",
                  "You'll feel the difference—faster, stronger, more confident in contact.",
                  "Compete hard, support each other. This is a team mentality."
                ].map((item, i) => (
                  <p key={i} className="text-sm text-zinc-300 flex items-start gap-3">
                    <span className="text-emerald-400 font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Off the court */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-black text-white tracking-tight border-b border-zinc-800 pb-3 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                Off The Court
              </h3>
              <div className="space-y-4">
                {[
                  "We plan around your school and team schedule, not against it.",
                  "Recovery matters as much as the work. You'll learn why sleep and nutrition matter.",
                  "Open communication. Parents included. You'll always know where you stand.",
                  "Character and consistency are part of the program."
                ].map((item, i) => (
                  <p key={i} className="text-sm text-zinc-300 flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Pull quotes */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card relative border border-emerald-500/20 bg-zinc-950/45 p-8 space-y-4 rounded-2xl overflow-hidden group/card"
            >
              <TechCorners color="border-emerald-500/30" size="w-4 h-4" />
              <Quote className="w-8 h-8 text-emerald-500/30" />
              <p className="text-lg font-black text-white leading-relaxed group-hover/card:text-emerald-300 transition-colors">
                "You get stronger when you're consistent, and you stay consistent when you see progress."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card relative border border-emerald-500/20 bg-zinc-950/45 p-8 space-y-4 rounded-2xl overflow-hidden group/card"
            >
              <TechCorners color="border-emerald-500/30" size="w-4 h-4" />
              <Quote className="w-8 h-8 text-emerald-500/30" />
              <p className="text-lg font-black text-white leading-relaxed group-hover/card:text-emerald-300 transition-colors">
                "I'm building long-term athletes, not just getting you through this month."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PROOF (CASE STUDIES) ===== */}
      <section id="proof" className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest block">Proven Outcomes</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Proof the system works</h2>
            <p className="text-zinc-500">Real players. Real timelines. Real results.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="glass-card relative border border-zinc-800/60 rounded-2xl bg-zinc-950/40 p-6 space-y-4 hover:border-emerald-500/35 transition-all duration-300 group/card overflow-hidden cursor-pointer"
              >
                <TechCorners color="border-emerald-500/30" size="w-3.5 h-3.5" />
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-widest text-emerald-400">
                    {study.playerType}
                  </p>
                  <p className="text-xs text-zinc-500 font-semibold">{study.level}</p>
                </div>

                <div className="space-y-3 border-t border-zinc-800/80 pt-3">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">
                      Starting point
                    </p>
                    <p className="text-sm text-zinc-400">{study.issue}</p>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">
                      Result
                    </p>
                    <p className="text-sm text-emerald-300 font-medium italic">"{study.outcome}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: IS JAKE RIGHT FOR YOU ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-violet-400 text-xs font-black uppercase tracking-widest block">Fit Check</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Is Jake the right coach?</h2>
            <p className="text-zinc-500">Be honest. This program works best for a specific type of athlete.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Good fit */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="glass-card relative border border-emerald-500/40 rounded-2xl bg-zinc-950/45 p-8 space-y-6 overflow-hidden group/card shadow-xl shadow-emerald-500/5"
            >
              <TechCorners color="border-emerald-500/40" size="w-4 h-4" />
              <h3 className="text-2xl font-black text-emerald-400 flex items-center gap-3">
                <Check className="w-6 h-6 text-emerald-400" />
                This is for you if…
              </h3>
              <ul className="space-y-3.5">
                {goodFitItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not a fit */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="glass-card relative border border-zinc-800/60 rounded-2xl bg-zinc-950/40 p-8 space-y-6 overflow-hidden group/card"
            >
              <TechCorners color="border-zinc-800" size="w-4 h-4" />
              <h3 className="text-2xl font-black text-zinc-300 flex items-center gap-3">
                <span className="text-zinc-500 font-bold text-lg">✕</span>
                Probably not a fit if…
              </h3>
              <ul className="space-y-3.5">
                {notFitItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="text-zinc-600 font-bold mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="pt-6 text-center">
            <p className="text-zinc-500 mb-4 text-sm font-semibold uppercase tracking-wider">Ready to make a choice?</p>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
            >
              See programs
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: LETTER ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-amber-400 text-xs font-black uppercase tracking-widest block">Personal Message</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">A letter from Coach Jake</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="glass-card relative border border-zinc-800/60 rounded-2xl bg-zinc-950/45 p-8 lg:p-12 space-y-6 text-lg text-zinc-300 leading-relaxed overflow-hidden group/card shadow-2xl"
          >
            <TechCorners color="border-emerald-500/30" size="w-4 h-4" />
            <p>
              I got into coaching because I remember what it feels like to want it badly and not know where to go. I trained with a lot of mediocre programs, wasted time on stuff that didn't work, and fell behind. When I finally found the right structure—the right coaching—everything changed. That's why I do this.
            </p>
            <p>
              Every athlete I work with is somebody's kid, somebody's teammate, somebody who's got dreams. I don't take that lightly. When you train with me, you're getting my full attention. Not a template program, not guesswork—actually coaching.
            </p>
            <p>
              After a season together, I want you to feel different. Stronger, faster, more confident. But more than that: I want you to understand *why* you're stronger. I want you to know how to keep the progress going. And I want you to see that consistency works. That effort pays off. That you can be the athlete you imagined.
            </p>
            <p>
              That's what Coach Jake Performance is about. Let's build something real.
            </p>
            <p className="text-emerald-400 font-black tracking-wide">— Jake</p>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA BAR ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl lg:text-4xl font-black text-white">Want Jake to look at your situation?</h3>
              <p className="text-zinc-500">Start with a program or schedule a conversation.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
              >
                View programs
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-zinc-700 text-white hover:border-emerald-500/40 hover:bg-zinc-900/40 font-semibold transition-all duration-200"
              >
                Talk to Coach Jake
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest block">Support</span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">Common questions</h2>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full text-left rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-6 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer relative overflow-hidden group/faq"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-black text-zinc-100 group-hover/faq:text-emerald-400 transition-colors">{item.q}</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFaq === idx && (
                  <p className="pt-4 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 mt-3 animate-in fade-in duration-350">{item.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12" />
    </main>
  );
}
