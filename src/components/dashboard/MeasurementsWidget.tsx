"use client";

import { TrendingDown, TrendingUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { addMeasurement } from "@/app/(app)/dashboard/measurements-actions";

interface Measurement {
  id: string;
  date: string;
  weight_kg: number;
}

interface MeasurementsWidgetProps {
  initialMeasurements: Measurement[];
}

export default function MeasurementsWidget({
  initialMeasurements,
}: MeasurementsWidgetProps) {
  const [measurements, setMeasurements] = useState<Measurement[]>(initialMeasurements);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [weight, setWeight] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!weight || parseFloat(weight) <= 0) {
      setError("Please enter a valid weight");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addMeasurement({
        date,
        weight_kg: parseFloat(weight),
      });

      if (!result.success) {
        setError(result.error || "Failed to add measurement");
        return;
      }

      setSuccessMessage("Weight logged successfully!");
      setWeight("");
      setDate(new Date().toISOString().split("T")[0]);

      // Add to local list optimistically
      const newMeasurement: Measurement = {
        id: `temp-${Date.now()}`,
        date,
        weight_kg: parseFloat(weight),
      };
      setMeasurements((prev) => [newMeasurement, ...prev].slice(0, 5));

      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(null), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const weightTrend =
    measurements.length >= 2
      ? measurements[0].weight_kg - measurements[1].weight_kg
      : null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">Track Weight</h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Log your weight to monitor progress over time
        </p>
      </div>

      {/* Current Weight */}
      {measurements.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
          <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-2">
            Latest Weight
          </p>
          <div className="flex items-end gap-3">
            <div>
              <p className="text-3xl font-bold text-zinc-50">
                {measurements[0].weight_kg.toFixed(1)}
              </p>
              <p className="text-xs text-zinc-400 mt-1">kg</p>
            </div>
            {weightTrend !== null && (
              <div className={`flex items-center gap-1 text-sm font-semibold`}>
                {weightTrend > 0.1 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400">+{weightTrend.toFixed(1)}</span>
                  </>
                ) : weightTrend < -0.1 ? (
                  <>
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">{weightTrend.toFixed(1)}</span>
                  </>
                ) : (
                  <span className="text-zinc-400">No change</span>
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            {formatDate(measurements[0].date)}
          </p>
        </div>
      )}

      {/* Add Measurement Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label htmlFor="meas-date" className="text-sm font-medium text-zinc-200">
              Date
            </label>
            <input
              id="meas-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="meas-weight" className="text-sm font-medium text-zinc-200">
              Weight (kg)
            </label>
            <input
              id="meas-weight"
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder="73.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            <p className="font-medium">{successMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition transform hover:bg-emerald-400 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:bg-emerald-500 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Logging...
            </>
          ) : (
            "Log Weight"
          )}
        </button>
      </form>

      {/* Measurements History */}
      {measurements.length > 0 ? (
        <div>
          <h4 className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-3">
            Last {measurements.length} Entries
          </h4>
          <div className="space-y-2">
            {measurements.map((measurement, idx) => {
              const prevMeasurement = measurements[idx + 1];
              const change = prevMeasurement
                ? (measurement.weight_kg - prevMeasurement.weight_kg).toFixed(1)
                : null;

              return (
                <div
                  key={measurement.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {measurement.weight_kg.toFixed(1)} kg
                    </p>
                    <p className="text-xs text-zinc-500">{formatDate(measurement.date)}</p>
                  </div>
                  {change && (
                    <div
                      className={`text-xs font-semibold flex items-center gap-1 ${
                        parseFloat(change) > 0
                          ? "text-orange-400"
                          : parseFloat(change) < 0
                            ? "text-emerald-400"
                            : "text-zinc-400"
                      }`}
                    >
                      {parseFloat(change) > 0 ? "+" : ""}
                      {change} kg
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-400 text-center py-4">
          No measurements yet. Start tracking your weight!
        </p>
      )}
    </div>
  );
}
