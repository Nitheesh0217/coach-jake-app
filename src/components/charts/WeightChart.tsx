"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Measurement {
  date: string;
  weight_kg: number;
}

interface WeightChartProps {
  measurements: Measurement[];
}

export default function WeightChart({ measurements }: WeightChartProps) {
  // Get last 30 data points
  const chartData = measurements.slice(-30).map((m) => ({
    date: new Date(m.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: m.weight_kg,
    fullDate: m.date,
  }));

  // Show placeholder if fewer than 2 data points
  if (chartData.length < 2) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-400 text-sm">
        Log more weigh-ins to see your trend
      </div>
    );
  }

  // Calculate min/max for domain with 2kg padding
  const weights = chartData.map((d) => d.weight);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const padding = 2;
  const yMin = Math.floor(minWeight - padding);
  const yMax = Math.ceil(maxWeight + padding);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#27272a"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          stroke="#a1a1aa"
          style={{ fontSize: "12px" }}
          tick={{ fill: "#a1a1aa" }}
        />
        <YAxis
          domain={[yMin, yMax]}
          stroke="#a1a1aa"
          style={{ fontSize: "12px" }}
          tick={{ fill: "#a1a1aa" }}
          label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "8px",
            color: "#e4e4e7",
          }}
          labelStyle={{ color: "#a1a1aa" }}
          formatter={(value) => {
            if (typeof value === "number") {
              return `${value.toFixed(1)} kg`;
            }
            return value;
          }}
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
  );
}
