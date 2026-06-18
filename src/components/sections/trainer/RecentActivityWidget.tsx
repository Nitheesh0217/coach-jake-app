import { Activity } from "lucide-react";

type AthleteRow = {
  user_id: string;
  full_name: string | null;
  email: string;
  last_workout_date: string | null;
  sessions_this_week: number;
};

interface RecentActivityWidgetProps {
  athletes: AthleteRow[];
}

export default function RecentActivityWidget({
  athletes,
}: RecentActivityWidgetProps) {
  const recentlyActive = [...athletes]
    .filter((a) => a.last_workout_date !== null)
    .sort((a, b) =>
      (b.last_workout_date ?? "").localeCompare(a.last_workout_date ?? ""),
    )
    .slice(0, 6);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 h-full">
      <h3 className="text-lg font-semibold text-zinc-50 mb-5">
        Recent Activity
      </h3>

      {recentlyActive.length === 0 ? (
        <div className="py-6 text-center">
          <Activity className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
          <p className="text-zinc-500 text-sm">No activity logged yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentlyActive.map((a) => {
            const name = a.full_name ?? a.email;
            const initials = name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            const when = a.last_workout_date
              ? new Date(a.last_workout_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "";

            return (
              <div key={a.user_id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-200 flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-200 truncate">{name}</p>
                  <p className="text-xs text-zinc-500">
                    logged a session · {when}
                  </p>
                </div>
                <span className="text-xs text-emerald-400 font-medium flex-shrink-0">
                  {a.sessions_this_week}w
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
