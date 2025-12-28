"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Star, Check, Quote, TrendingUp, User2, Calendar, Zap, ArrowDown } from "lucide-react";

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / window.innerHeight, 0), 1);
      const min = 0.5;
      const max = 0.75;
      const opacity = min + (max - min) * progress;
      if (overlay) {
        overlay.style.opacity = opacity.toFixed(2);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ===== DATA =====

  const philosophyPillars = [
    {
      icon: "🎯",
      title: "Movement First",
      desc: "You should feel better in the 4th than you used to in the 3rd, not beat up by the work.",
    },
    {
      icon: "💪",
      title: "Strength That Translates",
      desc: "Every lift connects to your game. More power off the floor, stronger on contact, fresher late.",
    },
    {
      icon: "📊",
      title: "Data, Not Guesswork",
      desc: "We track what matters: vert gains, sprint times, strength jumps. You see the proof weekly.",
    },
    {
      icon: "🛡️",
      title: "Long-Term Athlete, Not Quick Fix",
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
      a: "Strength and power gains show within 4–6 weeks if you're consistent. Bigger jumps (like vert or conditioning) take 8–12 weeks.",
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
    <main className="relative text-zinc-50">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.5, transition: "opacity 0.1s linear" }}
        aria-hidden
      />

      {/* ===== SECTION 1: HERO + MISSION ===== */}
      <section className="relative py-16 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  Meet Coach Jake
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Building stronger hoopers, one season at a time.
                </h1>

                <p className="text-xl text-zinc-300">
                  Coach Jake helps dedicated players get stronger, last longer, and show up confident in big games.
                </p>

                <p className="text-base text-zinc-400 leading-relaxed">
                  Whether you're a middle schooler building your foundation, a varsity player fighting for minutes, or a college athlete chasing the next level—Jake's programs are built around you, not generic templates. You'll train 2–4 days a week, see measurable progress, and most importantly: feel the difference on the court.
                </p>
              </div>

              {/* Stats Strip */}
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-3xl sm:text-4xl font-bold text-emerald-400">5+</p>
                    <p className="text-xs uppercase tracking-widest text-zinc-400">Years coaching</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl sm:text-4xl font-bold text-emerald-400">120+</p>
                    <p className="text-xs uppercase tracking-widest text-zinc-400">Athletes trained</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl sm:text-4xl font-bold text-emerald-400">HS–D1</p>
                    <p className="text-xs uppercase tracking-widest text-zinc-400">Levels coached</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button
                  onClick={() => scrollToSection("proof")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
                >
                  See how the system works
                  <ArrowDown className="w-4 h-4" />
                </button>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-zinc-700 text-white hover:border-emerald-500/40 hover:bg-zinc-900/40 font-semibold transition-all duration-200"
                >
                  View programs
                </Link>
              </div>
            </div>

            {/* Right: Image/Visual */}
            <div className="hidden lg:block relative group rounded-2xl overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-black/40 p-1 shadow-2xl shadow-black/60">
              <div className="rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-zinc-800/40 to-black/40 flex items-center justify-center">
                <img
                  src="/hero.jpg"
                  alt="Coach Jake coaching"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity duration-300"
                />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: COACHING PHILOSOPHY ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold">How Jake coaches your game</h2>
            <p className="text-lg text-zinc-400">
              Four principles that guide every program he builds.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-6 space-y-3 hover:border-emerald-500/40 transition-all duration-200 group hover:-translate-y-1"
              >
                <p className="text-4xl">{pillar.icon}</p>
                <h3 className="text-lg font-bold text-zinc-100">{pillar.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: JOURNEY/TIMELINE ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold">From hooper to Coach Jake</h2>
            <p className="text-lg text-zinc-400">
              How a player's obsession became a coaching system.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-emerald-500/40 to-transparent" />

            <div className="space-y-8">
              {journeyMilestones.map((milestone, idx) => (
                <div key={idx} className="relative lg:pl-32">
                  {/* Dot */}
                  <div className="absolute left-4 top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#050816] shadow-lg shadow-emerald-500/40 lg:left-0" />

                  {/* Card */}
                  <div className="rounded-lg border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-6 space-y-2 hover:border-emerald-500/40 transition-all duration-200">
                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                      {milestone.year}
                    </p>
                    <h3 className="text-lg font-bold text-zinc-100">{milestone.title}</h3>
                    <p className="text-sm text-zinc-400">{milestone.desc}</p>
                  </div>
                </div>
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
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">On the court</h3>
              <div className="space-y-3">
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>High energy, clear expectations. Every rep has game context.</span>
                </p>
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Strength work that translates. No ego lifts, just what works on the court.</span>
                </p>
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>You'll feel the difference—faster, stronger, more confident in contact.</span>
                </p>
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Compete hard, support each other. This is a team mentality.</span>
                </p>
              </div>
            </div>

            {/* Off the court */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Off the court</h3>
              <div className="space-y-3">
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>We plan around your school and team schedule, not against it.</span>
                </p>
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Recovery matters as much as the work. You'll learn why sleep and nutrition matter.</span>
                </p>
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Open communication. Parents included. You'll always know where you stand.</span>
                </p>
                <p className="text-sm text-zinc-300 flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-0.5">→</span>
                  <span>Character and consistency are part of the program.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Pull quotes */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="rounded-lg border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-black/30 p-8 space-y-4">
              <Quote className="w-8 h-8 text-emerald-400/50" />
              <p className="text-lg font-bold text-zinc-100 leading-relaxed">
                "You get stronger when you're consistent, and you stay consistent when you see progress."
              </p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-black/30 p-8 space-y-4">
              <Quote className="w-8 h-8 text-emerald-400/50" />
              <p className="text-lg font-bold text-zinc-100 leading-relaxed">
                "I'm building long-term athletes, not just getting you through this month."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PROOF (CASE STUDIES) ===== */}
      <section id="proof" className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold">Proof the system works</h2>
            <p className="text-lg text-zinc-400">
              Real players. Real timelines. Real results.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-6 space-y-4 hover:border-emerald-500/40 transition-all duration-200 group hover:-translate-y-1"
              >
                <div className="space-y-1">
                  <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                    {study.playerType}
                  </p>
                  <p className="text-xs text-zinc-500">{study.level}</p>
                </div>

                <div className="space-y-3 border-t border-zinc-800 pt-3">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                      Starting point
                    </p>
                    <p className="text-sm text-zinc-400">{study.issue}</p>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                      Result
                    </p>
                    <p className="text-sm text-emerald-300 italic">"{study.outcome}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: IS JAKE RIGHT FOR YOU ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold">Is Jake the right coach for you?</h2>
            <p className="text-lg text-zinc-400">
              Be honest with yourself. This program works best for a specific type of athlete.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Good fit */}
            <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-black/40 p-8 space-y-6">
              <h3 className="text-2xl font-bold text-emerald-400 flex items-center gap-3">
                <Check className="w-7 h-7" />
                This is for you if…
              </h3>
              <ul className="space-y-3">
                {goodFitItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not a fit */}
            <div className="rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-8 space-y-6">
              <h3 className="text-2xl font-bold text-zinc-300 flex items-center gap-3">
                <span className="text-zinc-500">✕</span>
                Probably not the right fit if…
              </h3>
              <ul className="space-y-3">
                {notFitItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="text-zinc-600 font-bold mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 text-center">
            <p className="text-zinc-400 mb-4">If this sounds like you, check out the programs:</p>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
            >
              See programs
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: LETTER + FINAL CTA ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl lg:text-5xl font-bold">A letter from Coach Jake</h2>
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-8 lg:p-12 space-y-6 text-lg text-zinc-300 leading-relaxed">
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

            <p className="text-emerald-400 font-semibold">— Jake</p>
          </div>
        </div>
      </section>

      {/* ===== CTA BAR ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl lg:text-4xl font-bold">Want Jake to look at your situation?</h3>
              <p className="text-lg text-zinc-400">
                Start with a program or schedule a conversation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                View programs
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-zinc-700 text-white hover:border-emerald-500/40 hover:bg-zinc-900/40 font-semibold transition-all duration-200"
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
            <h2 className="text-4xl lg:text-5xl font-bold">Common questions</h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full text-left rounded-lg border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-6 hover:border-emerald-500/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-semibold text-zinc-100">{item.q}</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFaq === idx && (
                  <p className="pt-4 text-sm text-zinc-400">{item.a}</p>
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
