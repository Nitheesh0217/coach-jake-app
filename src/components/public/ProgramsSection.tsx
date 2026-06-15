"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProgramsSection() {
  const cards = [
    {
      badge: "MOST POPULAR",
      badgeColor: "emerald",
      icon: "⚡",
      title: "Vertical Jump Transformation",
      desc: "12-week program to add serious bounce and explosiveness off the floor.",
      duration: "12 Weeks",
      level: "Intermediate",
      image: "off-season.jpg.png",
      popular: true,
    },
    {
      badge: "STRENGTH",
      badgeColor: "cyan",
      icon: "💪",
      title: "Strength & Power Builder",
      desc: "Build foundational strength, explosiveness, and on-court power.",
      duration: "10 Weeks",
      level: "All Levels",
      image: "in-season.jpg.png",
      popular: false,
    },
    {
      badge: "SKILLS",
      badgeColor: "violet",
      icon: "🎯",
      title: "Hoop IQ & Skills Development",
      desc: "Sharpen your skills, decision-making, and overall game.",
      duration: "8 Weeks",
      level: "All Levels",
      image: "youth.jpg.png",
      popular: false,
    },
  ];

  const badgeStyles = {
    emerald: "border-emerald-500/50 bg-emerald-500/15 text-emerald-400",
    cyan: "border-cyan-500/50 bg-cyan-500/15 text-cyan-400",
    violet: "border-violet-500/50 bg-violet-500/15 text-violet-400",
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4 md:gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
              Programs
            </h2>
            <p className="text-zinc-400 text-lg">
              Structured. Proven. Built for Results.
            </p>
          </div>
          <a
            href="/programs"
            className="text-emerald-400 hover:text-emerald-300 font-bold text-sm whitespace-nowrap mt-2 transition-colors flex items-center gap-1.5"
          >
            View all programs <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="space-y-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`group flex flex-col md:flex-row gap-6 md:gap-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 p-6 md:p-8 ${
                card.popular
                  ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/8 to-emerald-500/3 shadow-lg shadow-emerald-500/20"
                  : "border-zinc-700/60 bg-zinc-900/40 shadow-lg shadow-black/30 hover:border-zinc-600 hover:bg-zinc-900/50"
              }`}
            >
              {/* Image Container */}
              <div className="flex-shrink-0 w-full md:w-48 h-40 md:h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
                <img
                  src={`/programs/${card.image}`}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content Container */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Top Section */}
                <div className="space-y-4">
                  {/* Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${badgeStyles[card.badgeColor as keyof typeof badgeStyles]}`}
                  >
                    <span className="text-base">{card.icon}</span>
                    {card.badge}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight max-w-2xl">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-300 text-base leading-relaxed max-w-2xl">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-zinc-700/40">
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span>📅</span>
                      <span className="font-semibold text-white">
                        {card.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span>📊</span>
                      <span className="font-semibold text-white">
                        {card.level}
                      </span>
                    </div>
                  </div>
                  <a
                    href="/programs"
                    className="text-emerald-400 hover:text-emerald-300 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-1.5"
                  >
                    View details <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
