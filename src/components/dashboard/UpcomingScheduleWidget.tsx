import { Calendar, Zap } from "lucide-react";

export default function UpcomingScheduleWidget() {
  const upcomingEvents = [
    { id: 1, title: "Upper body power", type: "Strength", date: "Dec 22", time: "6:00 PM" },
    { id: 2, title: "3PT shooting drill", type: "Shooting", date: "Dec 23", time: "5:30 PM" },
    { id: 3, title: "Recovery & mobility", type: "Recovery", date: "Dec 24", time: "10:00 AM" },
    { id: 4, title: "Basketball game", type: "Game", date: "Dec 26", time: "7:00 PM" },
    { id: 5, title: "Off-season transition", type: "Program", date: "Dec 27", time: "— " },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Strength":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Shooting":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Conditioning":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Recovery":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Game":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      case "Program":
        return "bg-zinc-700/50 text-zinc-300 border-zinc-600";
      default:
        return "bg-zinc-700/50 text-zinc-300 border-zinc-600";
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">Upcoming schedule</h3>
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-zinc-400" />
        </div>
      </div>

      {/* Events list */}
      <div className="space-y-2.5">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 flex items-start justify-between hover:border-zinc-700 transition group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-zinc-50 transition">
                    {event.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {event.date} {event.time !== "— " && `· ${event.time}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-2 flex-shrink-0">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getTypeColor(
                  event.type
                )}`}
              >
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-5 pt-5 border-t border-zinc-800 text-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition py-2">
        View full schedule →
      </button>
    </div>
  );
}
