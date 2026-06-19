"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Activity, TrendingUp, Target, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Measurement {
  date: string;
  weight_kg: number;
}

interface ProgressChartsProps {
  measurements: Measurement[];
  consistencyData: Array<{ week: string; sessions: number }>;
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export function ProgressCharts({
  measurements,
  consistencyData,
}: ProgressChartsProps) {
  const chartData = measurements.map((m) => ({
    date: new Date(m.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: m.weight_kg,
  }));

  return (
    <>
      {/* Stats Cards */}
      <motion.div
        {...fade(0.1)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            icon: Activity,
            label: "Total Workouts",
            value: measurements.length || 0,
            color: "text-emerald-400",
          },
          {
            icon: Target,
            label: "Current Weight",
            value:
              measurements[measurements.length - 1]?.weight_kg.toFixed(1) ||
              "—",
            suffix: "kg",
            color: "text-cyan-400",
          },
          {
            icon: Calendar,
            label: "Tracking Since",
            value:
              measurements.length > 0
                ? new Date(measurements[0]?.date).toLocaleDateString()
                : "—",
            color: "text-violet-400",
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 + idx * 0.06 }}
              className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {stat.label}
                </span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-black ${stat.color}`}>
                {stat.value}
                {stat.suffix && (
                  <span className="text-sm ml-1">{stat.suffix}</span>
                )}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Weight Chart */}
      {chartData.length > 0 ? (
        <motion.div
          {...fade(0.15)}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8"
        >
          <h2 className="text-2xl font-black text-white mb-6">
            Weight Progress
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      ) : (
        <motion.div
          {...fade(0.15)}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 p-8 text-center"
        >
          <Activity className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500">No measurements recorded yet</p>
        </motion.div>
      )}

      {/* Consistency Chart */}
      {consistencyData.length > 0 ? (
        <motion.div
          {...fade(0.2)}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8"
        >
          <h2 className="text-2xl font-black text-white mb-6">
            Weekly Consistency
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consistencyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="week"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#10b981" }}
              />
              <Bar
                dataKey="sessions"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      ) : (
        <motion.div
          {...fade(0.2)}
          className="rounded-3xl border border-white/10 bg-zinc-900/40 p-8 text-center"
        >
          <Activity className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500">No workout data available yet</p>
        </motion.div>
      )}
    </>
  );
}
