"use client";

import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Zap } from "lucide-react";

interface CalendarHubProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarHub({ selectedDate, onSelectDate }: CalendarHubProps) {
  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const prevMonth = () => {
    onSelectDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    onSelectDate(new Date(year, month + 1, 1));
  };

  const monthName = firstDay.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Mock workout data for the calendar
  const workoutDays: { [key: number]: "completed" | "scheduled" | "game" | "rest" } = {
    1: "completed",
    2: "completed",
    3: "rest",
    4: "scheduled",
    5: "completed",
    6: "completed",
    7: "game",
    8: "rest",
    9: "completed",
    10: "scheduled",
    11: "completed",
    12: "completed",
    13: "rest",
    14: "completed",
    15: "completed",
    16: "scheduled",
    17: "completed",
    18: "rest",
    19: "completed",
    20: "completed",
    21: "completed",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/30 border-emerald-500/50 text-emerald-200";
      case "scheduled":
        return "bg-orange-500/30 border-orange-500/50 text-orange-200";
      case "game":
        return "bg-blue-500/30 border-blue-500/50 text-blue-200";
      case "rest":
        return "bg-zinc-700/50 border-zinc-600 text-zinc-300";
      default:
        return "bg-zinc-900/50 border-zinc-800";
    }
  };

  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">{monthName}</h3>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-zinc-800 rounded-lg transition text-zinc-400 hover:text-zinc-200"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-zinc-800 rounded-lg transition text-zinc-400 hover:text-zinc-200"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs uppercase tracking-wide font-semibold text-zinc-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, idx) => (
            <div
              key={idx}
              onClick={() => day && onSelectDate(new Date(year, month, day))}
              className={`aspect-square rounded-lg border transition flex items-center justify-center text-sm font-medium cursor-pointer ${
                day
                  ? isToday(day)
                    ? "ring-2 ring-emerald-500/50 bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold"
                    : workoutDays[day]
                    ? `${getStatusColor(workoutDays[day])}`
                    : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  : "bg-transparent border-transparent"
              }`}
            >
              {day && <span>{day}</span>}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-zinc-400">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-zinc-400">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-zinc-400">Game</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <span className="text-xs text-zinc-400">Rest</span>
          </div>
        </div>
      </div>

      {/* Today/Selected day card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-zinc-500 mb-1">
              {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
              {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </h3>
          </div>
          {isToday(selectedDate.getDate()) && (
            <div className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-xs font-semibold text-emerald-300 uppercase tracking-wide">
              Today
            </div>
          )}
        </div>

        {/* Today's focus tag */}
        <div className="mb-4">
          <div className="inline-flex items-center rounded-full bg-orange-500/20 border border-orange-500/40 px-3 py-1.5 text-xs font-semibold text-orange-300 uppercase tracking-wide">
            Strength + Shooting
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 space-y-2">
          <p className="text-sm text-zinc-300">
            Skill work + lower body strength
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="w-4 h-4" />
            <span>~70 minutes</span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition transform hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-emerald-500/50">
          View full plan
        </button>
      </div>

      {/* Next up section */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">Next up</h4>
        <div className="space-y-2">
          {[
            { title: "Upper body power", type: "Strength", date: "Tomorrow" },
            { title: "Court work", type: "Shooting", date: "Dec 23" },
            { title: "Rest day", type: "Recovery", date: "Dec 24" },
          ].map((session, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 flex items-start justify-between hover:border-zinc-700 transition"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200">{session.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{session.date}</p>
              </div>
              <div className="ml-2 flex-shrink-0">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    session.type === "Strength"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : session.type === "Shooting"
                      ? "bg-orange-500/20 text-orange-300"
                      : "bg-zinc-700/50 text-zinc-300"
                  }`}
                >
                  {session.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
