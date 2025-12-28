import { Clock } from "lucide-react";

export default function RecentActivityWidget() {
  const activities = [
    {
      id: 1,
      athlete: "Marcus Johnson",
      action: "Completed session",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      athlete: "DeShawn Davis",
      action: "Added workout note",
      time: "4 hours ago",
      type: "note",
    },
    {
      id: 3,
      athlete: "Brandon Moore",
      action: "Uploaded video",
      time: "1 day ago",
      type: "upload",
    },
    {
      id: 4,
      athlete: "Jamal Williams",
      action: "Missed session",
      time: "2 days ago",
      type: "alert",
    },
    {
      id: 5,
      athlete: "Tyler Chen",
      action: "Updated profile",
      time: "3 days ago",
      type: "info",
    },
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-500/20 text-emerald-300";
      case "note":
        return "bg-blue-500/20 text-blue-300";
      case "upload":
        return "bg-purple-500/20 text-purple-300";
      case "alert":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-zinc-700/50 text-zinc-300";
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-black/40 backdrop-blur-sm p-5 sm:p-6">
      {/* Header */}
      <h3 className="text-lg sm:text-xl font-semibold text-zinc-50 mb-5">
        Recent activity
      </h3>

      {/* Activity feed */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 hover:border-zinc-700 transition"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200">
                  {activity.athlete}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">{activity.action}</p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium flex-shrink-0 ml-2 ${getTypeBadge(activity.type)}`}
              >
                {activity.type === "success" && "✓"}
                {activity.type === "note" && "📝"}
                {activity.type === "upload" && "📹"}
                {activity.type === "alert" && "⚠"}
                {activity.type === "info" && "ℹ"}
              </span>
            </div>
            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {activity.time}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full mt-6 pt-4 border-t border-zinc-800 text-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition py-2">
        View all activity →
      </button>
    </div>
  );
}
