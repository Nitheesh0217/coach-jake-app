import { ChevronRight } from "lucide-react";

interface Athlete {
  id: string;
  full_name: string | null;
  email: string;
  completionPercent: number;
}

interface AthletesPanelProps {
  athletes: Athlete[];
}

export default function AthletesPanel({ athletes }: AthletesPanelProps) {
  const getStatusBadge = (completion: number) => {
    if (completion >= 85) return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    if (completion >= 70) return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

  const getComplianceColor = (completion: number) => {
    if (completion >= 85) return "text-emerald-400";
    if (completion >= 70) return "text-orange-400";
    return "text-red-400";
  };

  const getStatusLabel = (completion: number) => {
    if (completion >= 85) return "On track";
    if (completion >= 70) return "At risk";
    return "Needs help";
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-black/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800 px-5 sm:px-6 py-4">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">Athletes</h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Track compliance and session progress ({athletes.length} total)
        </p>
      </div>

      {athletes.length === 0 ? (
        <div className="px-5 sm:px-6 py-12 text-center">
          <p className="text-sm text-zinc-400">No athletes yet.</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/30 border-b border-zinc-800">
                <tr>
                  <th className="px-5 sm:px-6 py-3 text-left text-xs uppercase tracking-wide font-semibold text-zinc-400">
                    Name
                  </th>
                  <th className="hidden sm:table-cell px-5 sm:px-6 py-3 text-left text-xs uppercase tracking-wide font-semibold text-zinc-400">
                    Email
                  </th>
                  <th className="px-5 sm:px-6 py-3 text-left text-xs uppercase tracking-wide font-semibold text-zinc-400">
                    Completion
                  </th>
                  <th className="px-5 sm:px-6 py-3 text-center text-xs uppercase tracking-wide font-semibold text-zinc-400">
                    Status
                  </th>
                  <th className="px-5 sm:px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {athletes.map((athlete) => (
                  <tr
                    key={athlete.id}
                    className="hover:bg-zinc-900/50 transition cursor-pointer"
                  >
                    <td className="px-5 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-black">
                          {(athlete.full_name ?? "A").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-zinc-200">
                          {athlete.full_name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-5 sm:px-6 py-4 text-sm text-zinc-400">
                      {athlete.email}
                    </td>
                    <td className="px-5 sm:px-6 py-4">
                      <span className={`text-sm font-semibold ${getComplianceColor(athlete.completionPercent)}`}>
                        {athlete.completionPercent}%
                      </span>
                    </td>
                    <td className="px-5 sm:px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusBadge(athlete.completionPercent)}`}
                      >
                        {getStatusLabel(athlete.completionPercent)}
                      </span>
                    </td>
                    <td className="px-5 sm:px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-zinc-800 rounded-lg transition text-zinc-400 hover:text-zinc-200">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-800 px-5 sm:px-6 py-3 bg-black/30">
            <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition">
              View all athletes →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
