import { CheckCircle2, Circle, Clock } from "lucide-react";

type AthleteRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  sessions_this_week: number;
  sessions_30d: number;
  last_workout_date: string | null;
};

interface AthletesPanelProps {
  athletes: AthleteRow[];
}

export default function AthletesPanel({ athletes }: AthletesPanelProps) {
  const sorted = [...athletes].sort(
    (a, b) => b.sessions_this_week - a.sessions_this_week,
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-zinc-50">Athlete Roster</h3>
        <span className="text-xs text-zinc-500">
          {athletes.length} athletes
        </span>
      </div>

      {athletes.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-zinc-500 text-sm">No athletes yet.</p>
          <p className="text-zinc-600 text-xs mt-1">
            Athletes will appear here once they sign up.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((athlete) => {
            const initials = (athlete.full_name ?? athlete.email)
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            const activeToday = athlete.sessions_this_week > 0;
            const lastDate = athlete.last_workout_date
              ? new Date(athlete.last_workout_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                )
              : null;

            return (
              <div
                key={athlete.user_id}
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-200">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">
                      {athlete.full_name ?? athlete.email}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {lastDate ? (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Last active {lastDate}
                        </span>
                      ) : (
                        "No activity yet"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-zinc-100">
                      {athlete.sessions_this_week}
                    </p>
                    <p className="text-xs text-zinc-500">this week</p>
                  </div>
                  {activeToday ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
