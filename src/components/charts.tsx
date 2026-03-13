"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { phases } from "@/lib/data";
import { computeCredibilitySummary, metrics } from "@/lib/data";
import { formatRupiahCompact } from "@/lib/format";
import { getCumulativeEstimate } from "@/lib/calculations";
import { SourceBadge } from "./source-badge";

export function Charts() {
  // Cumulative spending over time data
  const cumulativeData = useMemo(() => {
    const points: { month: string; estimate: number; label: string }[] = [];
    const startDate = new Date("2025-01-06T00:00:00+07:00");

    for (let m = 0; m <= 24; m++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + m);
      const monthLabel = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
      });
      const estimate = getCumulativeEstimate(phases, date);
      points.push({
        month: monthLabel,
        estimate,
        label:
          estimate > 52_900_000_000_000
            ? "Includes 2026 allocated estimate"
            : "2025 realized phase",
      });
    }
    return points;
  }, []);

  // Budget comparison data
  const comparisonData = [
    {
      name: "2025 Ceiling",
      value: 71_000_000_000_000,
      type: "Official",
    },
    {
      name: "2025 Realized",
      value: 52_900_000_000_000,
      type: "Official",
    },
    {
      name: "2026 Allocation",
      value: 335_000_000_000_000,
      type: "Official",
    },
  ];

  // Source composition
  const credibility = computeCredibilitySummary();
  const compositionData = [
    { name: "Official", value: credibility.official, color: "#10b981" },
    { name: "Derived", value: credibility.derived, color: "#f59e0b" },
    { name: "Secondary", value: credibility.secondary, color: "#3b82f6" },
    { name: "Cautionary", value: credibility.cautionary, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload?: { label?: string } }>;
    label?: string;
  }) => {
    if (!active || !payload?.length) return null;
    const value = payload[0].value;
    const dataLabel = payload[0].payload?.label;
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-3 text-sm">
        <p className="font-medium text-slate-900 dark:text-white">{label}</p>
        <p className="text-emerald-600 dark:text-emerald-400 font-mono">
          {formatRupiahCompact(value)}
        </p>
        {dataLabel && (
          <p className="text-xs text-slate-500 mt-1">
            {dataLabel}
          </p>
        )}
        <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
          Derived Estimate
        </p>
      </div>
    );
  };

  const BarTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload?: { name: string; type: string } }>;
  }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-3 text-sm">
        <p className="font-medium text-slate-900 dark:text-white">
          {item.payload?.name}
        </p>
        <p className="text-emerald-600 dark:text-emerald-400 font-mono">
          {formatRupiahCompact(item.value)}
        </p>
        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">
          {item.payload?.type}
        </p>
      </div>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/50" id="charts">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Visual Analysis
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Charts illustrating the estimated spending trajectory, budget
            comparisons, and data composition of this dashboard.
          </p>
        </div>

        <div className="space-y-8">
          {/* Cumulative Spending Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Cumulative Estimated Spending
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Linearized estimate across 2025 realized + 2026 allocated
                  phases
                </p>
              </div>
              <SourceBadge type="derived" size="sm" />
            </div>
            <div className="h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cumulativeData}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tickFormatter={(v) => formatRupiahCompact(v)}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="estimate"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#areaGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Budget Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    Budget Comparison
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    2025 vs 2026 amounts
                  </p>
                </div>
                <SourceBadge type="official" size="xs" />
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => formatRupiahCompact(v)}
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      tickLine={false}
                      axisLine={false}
                      width={70}
                    />
                    <Tooltip content={<BarTooltip />} />
                    <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Source Composition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    Source Classification
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Composition of {credibility.total} dashboard metrics
                  </p>
                </div>
              </div>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={compositionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {compositionData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {value}
                        </span>
                      )}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value} metric${Number(value) > 1 ? "s" : ""}`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
