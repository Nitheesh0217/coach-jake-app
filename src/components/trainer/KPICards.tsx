import { Users, Activity, TrendingUp, Zap } from "lucide-react";

type AthleteRow = {
  user_id: string;
  sessions_this_week: number;
  sessions_30d: number;
};

interface KPICardsProps {
  athletes: AthleteRow[];
  totalSessions7d: number;
}

export default function KPICards({ athletes, totalSessions7d }: KPICardsProps) {
  const totalAthletes = athletes.length;
  const activeThisWeek = athletes.filter(
    (a) => a.sessions_this_week > 0,
  ).length;
  const avgSessions30d =
    totalAthletes > 0
      ? (
          athletes.reduce((s, a) => s + a.sessions_30d, 0) / totalAthletes
        ).toFixed(1)
      : "0";

  const cards = [
    {
      label: "Total Athletes",
      value: totalAthletes,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Active This Week",
      value: activeThisWeek,
      icon: Zap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Sessions This Week",
      value: totalSessions7d,
      icon: Activity,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
    },
    {
      label: "Avg Sessions / 30d",
      value: avgSessions30d,
      icon: TrendingUp,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl border ${card.bg} p-5 flex flex-col gap-3`}
        >
          <card.icon className={`w-5 h-5 ${card.color}`} />
          <div>
            <p className="text-3xl font-bold text-zinc-50">{card.value}</p>
            <p className="text-xs text-zinc-400 mt-1">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
