import { BarChart3 } from "lucide-react";

export default function FocusBreakdownWidget() {
  const focusData = [
    { label: "Strength", value: 35, color: "bg-emerald-500", icon: "💪" },
    { label: "Shooting", value: 30, color: "bg-orange-500", icon: "🎯" },
    { label: "Conditioning", value: 20, color: "bg-blue-500", icon: "🔥" },
    { label: "Recovery", value: 15, color: "bg-purple-500", icon: "☘️" },
  ];

  const total = focusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">Focus breakdown</h3>
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-zinc-400" />
        </div>
      </div>

      {/* Ring chart (simplified with bars) */}
      <div className="space-y-3 mb-5">
        {focusData.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-medium text-zinc-300">{item.label}</span>
              </div>
              <span className="text-xs font-semibold text-zinc-400">{item.value}%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend chips */}
      <div className="pt-4 border-t border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-2.5">
          Last 10 sessions
        </p>
        <div className="flex flex-wrap gap-2">
          {focusData.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium"
              style={{
                borderColor: `${item.color}50`,
                backgroundColor: `${item.color}10`,
              }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${item.color} mr-1.5`}></div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
