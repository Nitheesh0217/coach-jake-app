import { BookOpen, Trophy, TrendingUp, Zap } from "lucide-react";

export default function NotesHighlightsWidget() {
  const notes = [
    {
      id: 1,
      date: "Dec 20",
      title: "Knee felt strong today",
      tags: ["knee", "strength"],
      excerpt: "Trap-bar work felt good. Ramped up to 315 lbs.",
    },
    {
      id: 2,
      date: "Dec 18",
      title: "3PT hot from deep",
      tags: ["shooting", "3PT"],
      excerpt: "Hit 24/30 from three. Form is consistent.",
    },
    {
      id: 3,
      date: "Dec 16",
      title: "Game recovery notes",
      tags: ["conditioning", "game"],
      excerpt: "Played 28 minutes without gassing. Great conditioning.",
    },
  ];

  const highlights = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Last week: +10 kg trap-bar PR",
      color: "emerald",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "First time playing 32+ min without gassing out",
      color: "orange",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Hit 80% of planned sessions this month",
      color: "blue",
    },
  ];

  const tagColorMap: { [key: string]: string } = {
    knee: "bg-red-500/20 text-red-300 border-red-500/30",
    strength: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    shooting: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "3PT": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    conditioning: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    game: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  };

  return (
    <div className="space-y-8">
      {/* Highlights strip */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50 mb-4">Recent highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-4 flex items-start gap-3 ${
                highlight.color === "emerald"
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : highlight.color === "orange"
                  ? "border-orange-500/30 bg-orange-500/10"
                  : "border-blue-500/30 bg-blue-500/10"
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  highlight.color === "emerald"
                    ? "text-emerald-400"
                    : highlight.color === "orange"
                    ? "text-orange-400"
                    : "text-blue-400"
                }`}
              >
                {highlight.icon}
              </div>
              <p className="text-sm font-medium text-zinc-100">{highlight.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes section */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50 mb-4">Recent notes</h3>
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 hover:border-zinc-700 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200">{note.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">{note.date}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mb-3">{note.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tagColorMap[tag] || tagColorMap["strength"]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full mt-4 rounded-lg border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900 transition">
          View all notes →
        </button>
      </div>
    </div>
  );
}
