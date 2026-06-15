"use client";

import {
  Calendar,
  TrendingUp,
  Crosshair,
  Flame,
  ArrowUp,
  CheckCircle2,
  Circle,
  Clock3,
  ChevronRight,
  Activity,
} from "lucide-react";
import { Workout } from "@/types";
import WeightChart from "./WeightChart";

interface Measurement {
  id: string;
  date: string;
  weight_kg: number;
}

interface AthleteDashboardProps {
  todayWorkout: Workout | null;
  weekLogsCount: number;
  last30DaysCount: number;
  measurements: Measurement[];
  currentStreak: number;
  longestStreak: number;
  userName?: string;
  recentSessions?: any[];
  hasLoggedToday?: boolean;
}

export default function AthleteDashboard({
  todayWorkout,
  weekLogsCount,
  last30DaysCount,
  measurements,
  currentStreak,
  userName = "Athlete",
  recentSessions = [],
  hasLoggedToday = false,
}: AthleteDashboardProps) {
  const firstName = userName.split(" ")[0];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const readableDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const completionRate = Math.min(Math.round((last30DaysCount / 30) * 100), 100);
  const drills = [
    { label: "Dynamic Warm-up", mins: "10 min", done: true },
    { label: "Ball Handling Circuit", mins: "20 min", done: true },
    { label: "Finishing Drills", mins: "20 min", done: true },
    { label: "Conditioning Finisher", mins: "10 min", done: hasLoggedToday },
  ];

  const progress = Math.round((drills.filter((d) => d.done).length / drills.length) * 100);

  const latestMeasurement = measurements.at(-1);
  const oldestMeasurement = measurements[0];
  const weightDelta =
    latestMeasurement && oldestMeasurement
      ? Number((latestMeasurement.weight_kg - oldestMeasurement.weight_kg).toFixed(1))
      : 0;

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 md:py-8 text-slate-100">
      <div className="mx-auto max-w-[1120px] space-y-4 md:space-y-5">
        <div className="rounded-2xl border border-cyan-500/20 bg-[#020817]/80 px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3 text-2xl md:text-[2rem] font-semibold">
            <span>{greeting()},</span>
            <span className="text-white">{firstName}</span>
            <span>👋</span>
            <span className="ml-0 md:ml-4 text-sm md:text-xl font-medium text-slate-400">
              {readableDate.replace(",", " ·")}
            </span>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "SESSIONS THIS WEEK",
              value: weekLogsCount,
              icon: Calendar,
              accent: "emerald",
              delta: "+50%",
              meta: "vs last week",
            },
            {
              title: "THIS MONTH",
              value: last30DaysCount,
              icon: TrendingUp,
              accent: "cyan",
              delta: "+33%",
              meta: "vs last month",
            },
            {
              title: "COMPLETION %",
              value: `${completionRate}%`,
              icon: Crosshair,
              accent: "emerald",
              delta: "+12%",
              meta: "vs last month",
            },
            {
              title: "🔥 STREAK",
              value: currentStreak,
              icon: Flame,
              accent: "amber",
              delta: `${Math.max(currentStreak - 1, 0)}`,
              meta: "Days in a row",
            },
          ].map((card) => {
            const Icon = card.icon;
            const accentClass =
              card.accent === "amber"
                ? "border-amber-400/45 text-amber-300 shadow-[0_0_26px_rgba(245,158,11,0.2)]"
                : card.accent === "cyan"
                  ? "border-cyan-400/30 text-cyan-300"
                  : "border-emerald-400/30 text-emerald-300";

            return (
              <article
                key={card.title}
                className={`rounded-2xl border bg-[#041022]/85 px-5 py-4 backdrop-blur-xl ${accentClass}`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm tracking-wide text-slate-300">{card.title}</p>
                  <div className="rounded-full border border-current/40 p-2">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <p
                  className={`mt-4 text-6xl font-bold leading-none ${
                    card.accent === "amber" ? "text-amber-300" : "text-cyan-300"
                  }`}
                >
                  {card.value}
                </p>
                <p className="mt-2 flex items-center gap-1 text-lg text-emerald-300">
                  <ArrowUp className="h-4 w-4" /> {card.delta}
                  <span className="text-base text-slate-400">{card.meta}</span>
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <article className="xl:col-span-2 rounded-2xl border border-cyan-500/25 bg-[#041022]/85 p-5 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-semibold text-white">Today&apos;s Workout</h3>
                <h4 className="mt-2 text-4xl font-bold text-cyan-100">
                  {todayWorkout?.title || "Explosive Handles & Finishing"}
                </h4>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                <Clock3 className="h-4 w-4" /> 60 MIN
              </span>
            </div>

            <div className="mt-5 space-y-2">
              {drills.map((drill) => (
                <div
                  key={drill.label}
                  className="flex items-center justify-between rounded-lg border border-cyan-500/15 bg-[#020817]/60 px-3 py-2"
                >
                  <span className="inline-flex items-center gap-2 text-lg text-slate-200">
                    {drill.done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-500" />
                    )}
                    {drill.label}
                  </span>
                  <span className="text-base text-slate-400">{drill.mins}</span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm uppercase tracking-wider text-slate-300">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-900">
                <div
                  className="h-2 rounded-full bg-linear-to-r from-emerald-400 to-cyan-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <a
              href="/workouts"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-emerald-400/50 bg-emerald-500/10 py-3 text-2xl font-semibold text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition hover:bg-emerald-500/20"
            >
              {hasLoggedToday ? "Session Completed" : "Mark Session Complete"}
            </a>
          </article>

          <article className="rounded-2xl border border-amber-400/40 bg-[#120b03]/70 p-5 backdrop-blur-xl">
            <h3 className="text-3xl font-semibold text-white">Streak Badge</h3>
            <div className="mt-6 flex justify-center">
              <div className="relative h-56 w-56 rounded-full border-2 border-amber-400/60">
                <div className="absolute inset-4 rounded-full border border-amber-400/40" />
                <div className="absolute inset-8 rounded-full border border-amber-300/50 shadow-[0_0_30px_rgba(245,158,11,0.45)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-300">
                  <p className="text-7xl font-extrabold leading-none">{currentStreak}</p>
                  <p className="text-4xl font-bold">DAYS</p>
                  <p className="mt-1 text-4xl">🔥</p>
                </div>
              </div>
            </div>
            <p className="mt-5 text-center text-2xl text-amber-100/80">
              {currentStreak > 0
                ? "Unstoppable! Keep it rolling."
                : "Start your streak today."}
            </p>
          </article>
        </section>

        <section id="progress-section" className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <article className="xl:col-span-2 rounded-2xl border border-cyan-500/25 bg-[#041022]/85 p-5 backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-white">Weight / Measurements</h3>
              <span className="rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-1 text-sm text-slate-300">
                Weight (kg)
              </span>
            </div>
            <div className="h-72">
              <WeightChart measurements={measurements} />
            </div>
            <div className="mt-3 flex items-center justify-between text-lg">
              <span className={weightDelta <= 0 ? "text-emerald-300" : "text-amber-300"}>
                {weightDelta === 0
                  ? "No change tracked yet"
                  : `${weightDelta > 0 ? "+" : ""}${weightDelta} kg overall`}
              </span>
              <a
                href="/workouts"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-1 text-slate-300 hover:border-cyan-400/50"
              >
                <Activity className="h-4 w-4" /> View Full Progress
              </a>
            </div>
          </article>

          <article className="rounded-2xl border border-cyan-500/25 bg-[#041022]/85 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-white">Recent Sessions</h3>
              <a href="/workouts" className="inline-flex items-center gap-1 text-base text-cyan-200">
                View All <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-3">
              {(recentSessions.length > 0
                ? recentSessions
                : [
                    { id: "fallback-1", workouts: { title: "Explosive Handles & Finishing" }, date: new Date().toISOString() },
                    { id: "fallback-2", workouts: { title: "Strength & Power" }, date: new Date(Date.now() - 86400000).toISOString() },
                    { id: "fallback-3", workouts: { title: "Speed & Agility" }, date: new Date(Date.now() - 172800000).toISOString() },
                    { id: "fallback-4", workouts: { title: "Shooting Day" }, date: new Date(Date.now() - 259200000).toISOString() },
                  ]
              )
                .slice(0, 4)
                .map((session: any) => (
                  <div
                    key={session.id}
                    className="rounded-xl border border-cyan-500/20 bg-[#020817]/65 px-3 py-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xl text-slate-100">
                          {session.workouts?.title || "Workout Session"}
                        </p>
                        <p className="text-sm text-slate-400">
                          {new Date(session.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          <span className="px-2">•</span>60 min
                        </p>
                      </div>
                      <span className="rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                        COMPLETED
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
