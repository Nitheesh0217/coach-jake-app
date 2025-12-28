import { AlertCircle, TrendingUp, Zap } from "lucide-react";

export default function CoachInsightsWidget() {
  const insights = [
    {
      icon: AlertCircle,
      text: "3 athletes have dropped below 60% completion in the last 2 weeks.",
      color: "orange",
    },
    {
      icon: TrendingUp,
      text: "Guards have the highest load this week; consider lightening Thursday sessions.",
      color: "blue",
    },
    {
      icon: Zap,
      text: "Tyler Chen hasn't logged a session in 3 days. Consider a check-in call.",
      color: "red",
    },
  ];

  const colorMap = {
    orange: {
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
      icon: "text-orange-400",
    },
    blue: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
      icon: "text-blue-400",
    },
    red: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      icon: "text-red-400",
    },
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-black/40 backdrop-blur-sm p-5 sm:p-6">
      {/* Header */}
      <h3 className="text-lg sm:text-xl font-semibold text-zinc-50 mb-5">
        Coach insights
      </h3>

      {/* Insights list */}
      <div className="space-y-4">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          const colors = colorMap[insight.color as keyof typeof colorMap];

          return (
            <div
              key={idx}
              className={`rounded-lg border ${colors.border} ${colors.bg} p-4 flex items-start gap-3`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.icon}`} />
              <p className="text-sm text-zinc-100 leading-relaxed">{insight.text}</p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <button className="w-full mt-6 pt-4 border-t border-zinc-800 text-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition py-2">
        View all insights →
      </button>
    </div>
  );
}
