"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CalendarPanel() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 21)); // Dec 21, 2025

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Mock events for calendar
  const eventDays: { [key: number]: string } = {
    1: "session",
    5: "game",
    8: "session",
    12: "session",
    15: "game",
    18: "session",
    22: "session",
    26: "game",
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = firstDay.toLocaleDateString("en-US", { month: "short" });

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-black/40 backdrop-blur-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
          {monthName} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-1.5 hover:bg-zinc-800 rounded-lg transition text-zinc-400 hover:text-zinc-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 hover:bg-zinc-800 rounded-lg transition text-zinc-400 hover:text-zinc-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-zinc-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {calendarDays.map((day, idx) => {
          const hasEvent = day && eventDays[day];

          return (
            <div
              key={idx}
              className={`aspect-square rounded-lg border text-xs font-medium flex items-center justify-center transition ${
                day
                  ? isToday(day)
                    ? "ring-2 ring-emerald-500/50 bg-emerald-500/20 border-emerald-500/60 text-emerald-200"
                    : hasEvent
                    ? eventDays[day] === "game"
                      ? "bg-pink-500/20 border-pink-500/40 text-pink-200"
                      : "bg-blue-500/20 border-blue-500/40 text-blue-200"
                    : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                  : "bg-transparent border-transparent"
              }`}
            >
              {day && <span>{day}</span>}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-2 pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span>Workouts</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
          <span>Games</span>
        </div>
      </div>
    </div>
  );
}
