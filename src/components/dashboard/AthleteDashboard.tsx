import TodaysWorkout from "./TodaysWorkout";
import MeasurementsWidget from "./MeasurementsWidget";

interface Workout {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

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
  userName?: string;
}

export default function AthleteDashboard({
  todayWorkout,
  weekLogsCount,
  last30DaysCount,
  measurements,
  userName = "Athlete",
}: AthleteDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8">
      {/* Header with role badge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50">
            Welcome back, {userName.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-zinc-400 mt-2">Stay consistent, track progress, crush your goals</p>
        </div>
        <div className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="text-sm font-semibold text-emerald-300">Athlete</span>
        </div>
      </div>

      {/* Today's Workout */}
      {todayWorkout && (
        <TodaysWorkout
          workout={{
            id: todayWorkout.id,
            title: todayWorkout.title,
            description: todayWorkout.description,
          }}
        />
      )}

      {/* Progress Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sessions This Week */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
              Sessions This Week
            </p>
            <p className="text-4xl font-bold text-emerald-400">{weekLogsCount}</p>
            <p className="text-xs text-zinc-400 mt-3">
              Keep your streak alive
            </p>
          </div>
        </div>

        {/* Sessions Last 30 Days */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
              Last 30 Days
            </p>
            <p className="text-4xl font-bold text-blue-400">{last30DaysCount}</p>
            <p className="text-xs text-zinc-400 mt-3">
              Total sessions completed
            </p>
          </div>
        </div>

        {/* Consistency Score */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
              Consistency Rate
            </p>
            <p className="text-4xl font-bold text-purple-400">
              {last30DaysCount > 0 ? Math.min(Math.round((last30DaysCount / 30) * 100), 100) : 0}%
            </p>
            <p className="text-xs text-zinc-400 mt-3">
              Average sessions per day
            </p>
          </div>
        </div>
      </div>

      {/* Measurements Widget */}
      <MeasurementsWidget initialMeasurements={measurements} />

      {/* Quick Tips Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-zinc-50 mb-4">Next Steps</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-zinc-200">Complete today's workout</p>
              <p className="text-xs text-zinc-400 mt-1">Click "Mark Complete" above to log your session</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-zinc-200">Log your weight weekly</p>
              <p className="text-xs text-zinc-400 mt-1">Track progress with the weight widget above</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-zinc-200">Check the workouts library</p>
              <p className="text-xs text-zinc-400 mt-1">View all available programs in the Workouts section</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
