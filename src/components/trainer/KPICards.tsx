import { Users, TrendingUp, AlertCircle, Calendar } from "lucide-react";

interface Athlete {
  id: string;
  full_name: string | null;
  email: string;
  completionPercent: number;
}

interface KPICardsProps {
  athletes: Athlete[];
}

export default function KPICards({ athletes }: KPICardsProps) {
  const activeAthletesThisWeek = athletes.length;
  const avgCompletion =
    athletes.length > 0
      ? Math.round(
          athletes.reduce((sum, a) => sum + a.completionPercent, 0) /
            athletes.length
        )
      : 0;

  const atRiskCount = athletes.filter((a) => a.completionPercent < 70).length;
  const upcomingSessionsToday = 8; // Placeholder - would need separate query

  const kpis = [
    {
      label: "Active athletes this week",
      value: activeAthletesThisWeek,
      trend: activeAthletesThisWeek > 0 ? "+1 new" : "No active athletes",
      icon: Users,
      color: "emerald",
      barValue: Math.min((activeAthletesThisWeek / 30) * 100, 100),
    },
    {
      label: "Avg. session completion",
      value: `${avgCompletion}%`,
      trend: avgCompletion >= 80 ? "On track" : "Room to improve",
      icon: TrendingUp,
      color: "emerald",
      barValue: avgCompletion,
    },
    {
      label: "At-risk athletes",
      value: atRiskCount,
      trend:
        atRiskCount === 0 ? "All on track" : `${atRiskCount} need attention`,
      icon: AlertCircle,
      color: atRiskCount > 0 ? "orange" : "emerald",
      barValue: Math.min((atRiskCount / 10) * 100, 100),
    },
    {
      label: "Upcoming sessions today",
      value: upcomingSessionsToday,
      trend: "All on track",
      icon: Calendar,
      color: "blue",
      barValue: 100,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        const colorMap = {
          emerald: {
            icon: "text-emerald-400",
            bar: "bg-emerald-500",
            bg: "bg-emerald-500/20",
            border: "border-emerald-500/30",
          },
          orange: {
            icon: "text-orange-400",
            bar: "bg-orange-500",
            bg: "bg-orange-500/20",
            border: "border-orange-500/30",
          },
          blue: {
            icon: "text-blue-400",
            bar: "bg-blue-500",
            bg: "bg-blue-500/20",
            border: "border-blue-500/30",
          },
        };

        const colors = colorMap[kpi.color as keyof typeof colorMap];

        return (
          <div
            key={idx}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
                  {kpi.label}
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-zinc-50">
                  {kpi.value}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bar}`}
                  style={{ width: `${kpi.barValue}%` }}
                ></div>
              </div>
            </div>

            {/* Trend */}
            <p className="text-xs text-zinc-400">{kpi.trend}</p>
          </div>
        );
      })}
    </div>
  );
}
