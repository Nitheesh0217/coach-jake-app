"use client";

import React, { useRef, useState } from "react";
import { Zap, Shield, Target, Flame } from "lucide-react";
import TechCorners from "@/components/ui/TechCorners";

const ROLES = [
  {
    name: "Guard",
    desc: "Quick, agile, and shifty. Primary playmaker.",
    stats: { TeamPlay: 85, Shooter: 90, Finesse: 95 },
    color: "from-emerald-500/20 to-emerald-400/5",
    themeColor: "#10b981",
    img: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Wing",
    desc: "Versatile, athletic scorer and solid defender.",
    stats: { TeamPlay: 75, Shooter: 85, Finesse: 80 },
    color: "from-cyan-500/20 to-cyan-400/5",
    themeColor: "#06b6d4",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Forward",
    desc: "Strong, tough, and relentless inside-out scorer.",
    stats: { TeamPlay: 70, Shooter: 60, Finesse: 75 },
    color: "from-amber-500/20 to-amber-400/5",
    themeColor: "#f59e0b",
    img: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Center",
    desc: "Big, dominant force in the paint. Rebound king.",
    stats: { TeamPlay: 80, Shooter: 40, Finesse: 55 },
    color: "from-violet-500/20 to-violet-400/5",
    themeColor: "#8b5cf6",
    img: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=400&auto=format&fit=crop&q=80",
  },
];

export default function PlayerCard3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);

  const role = ROLES[activeRoleIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !reflectionRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Calculate rotation angles (max 15 degrees tilt)
    const tiltX = -(y / (height / 2)) * 12;
    const tiltY = (x / (width / 2)) * 12;

    // Apply rotation
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move reflection spotlight
    const reflectX = (e.clientX - rect.left) / width * 100;
    const reflectY = (e.clientY - rect.top) / height * 100;
    reflectionRef.current.style.background = `radial-gradient(circle at ${reflectX}% ${reflectY}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)`;

    // Apply translation to inner parallax elements (stats/badges)
    const innerElements = card.querySelectorAll(".parallax-el");
    innerElements.forEach((el: any) => {
      const depth = parseFloat(el.getAttribute("data-depth") || "0.1");
      const moveX = (x / (width / 2)) * 10 * depth;
      const moveY = (y / (height / 2)) * 10 * depth;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, ${depth * 30}px)`;
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !reflectionRef.current) return;
    const card = cardRef.current;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    reflectionRef.current.style.background = "transparent";

    const innerElements = card.querySelectorAll(".parallax-el");
    innerElements.forEach((el: any) => {
      el.style.transform = "translate3d(0px, 0px, 0px)";
    });
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-6">
      {/* ── Role Selector HUD Tabs ── */}
      <div className="flex gap-2 w-full p-1 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
        {ROLES.map((r, i) => (
          <button
            key={r.name}
            onClick={() => setActiveRoleIdx(i)}
            className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              activeRoleIdx === i
                ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                : "border border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* ── 3D Card Wrapper ── */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative group/card cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={cardRef}
          className="relative w-full rounded-[2rem] border border-white/10 bg-zinc-950/90 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glass Reflection Layer */}
          <div
            ref={reflectionRef}
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/card:opacity-100"
          />

          {/* Futuristic Corner Brackets */}
          <TechCorners color={`border-[${role.themeColor}]/40`} size="w-3 h-3" />

          {/* 1. Header Image Area */}
          <div className="relative h-[220px] overflow-hidden bg-black">
            <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10`} />
            <img
              src={role.img}
              alt={role.name}
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover/card:scale-105 transition-transform duration-700"
            />
            
            {/* Hologram Overlay Mesh */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10b981]/5 to-transparent opacity-35 mix-blend-overlay pointer-events-none" />

            {/* Parallax Badge */}
            <div
              data-depth="0.15"
              className="absolute top-4 left-4 z-10 parallax-el transition-transform duration-300 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span
                style={{ borderColor: `${role.themeColor}50`, backgroundColor: `${role.themeColor}15`, color: role.themeColor }}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-md backdrop-blur-md"
              >
                <span style={{ backgroundColor: role.themeColor }} className="h-1.5 w-1.5 rounded-full animate-pulse" />
                PLAYING STYLE
              </span>
            </div>

            {/* Parallax Main Label */}
            <div
              data-depth="0.22"
              className="absolute bottom-4 left-5 z-10 parallax-el transition-transform duration-300 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h2 className="text-3xl font-black text-white uppercase tracking-tight hologram-glow">
                {role.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-[260px] leading-tight font-semibold">
                {role.desc}
              </p>
            </div>
          </div>

          {/* 2. Interactive Telemetry Stats Area */}
          <div className="px-5 py-5 space-y-4 bg-zinc-950/95 relative z-10 border-t border-white/5">
            {/* Stat Bars */}
            <div className="space-y-3">
              {Object.entries(role.stats).map(([statName, val], i) => (
                <div key={statName} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span className="text-zinc-400 flex items-center gap-1">
                      {i === 0 ? <Zap className="w-3 h-3 text-emerald-400" /> : i === 1 ? <Target className="w-3 h-3 text-cyan-400" /> : <Flame className="w-3 h-3 text-amber-400" />}
                      {statName.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-white stat-value">{val}%</span>
                  </div>
                  {/* Glowing Meter Bar */}
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden relative">
                    <div
                      style={{
                        width: `${val}%`,
                        backgroundImage: `linear-gradient(to right, ${role.themeColor}90, ${role.themeColor})`,
                        boxShadow: `0 0 10px ${role.themeColor}`,
                      }}
                      className="h-full rounded-full transition-all duration-500 ease-out"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Telemetry Card Metadata Footer */}
            <div
              data-depth="0.1"
              className="pt-3 border-t border-zinc-900 flex items-center justify-between parallax-el transition-transform duration-300 ease-out"
            >
              <div>
                <p className="text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-widest leading-none">
                  TELEMETRY ID
                </p>
                <p className="text-xs font-black text-white font-mono uppercase tracking-wider mt-1">
                  SYS.CJ-{role.name.toUpperCase()}-09
                </p>
              </div>
              <div
                style={{
                  borderColor: `${role.themeColor}35`,
                  backgroundColor: `${role.themeColor}10`,
                  color: role.themeColor,
                }}
                className="h-9 px-3.5 rounded-xl border flex items-center justify-center font-black text-xs uppercase tracking-widest font-mono"
              >
                STABLE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
