"use client";

import { motion } from "framer-motion";
import { computeCredibilitySummary, metrics } from "@/lib/data";
import { ShieldCheck, Calculator, Newspaper, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function CredibilityPanel() {
  const summary = computeCredibilitySummary();

  const items = [
    {
      label: "Official Metrics",
      count: summary.official,
      icon: ShieldCheck,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      description: "Backed by official government or agency data",
    },
    {
      label: "Derived Estimates",
      count: summary.derived,
      icon: Calculator,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      description: "Calculated from official figures using transparent formulas",
    },
    {
      label: "Secondary Reports",
      count: summary.secondary,
      icon: Newspaper,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      description: "Based on media or third-party reporting",
    },
    {
      label: "Needs Caution",
      count: summary.cautionary,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/30",
      description: "Not fully verified or pending stronger confirmation",
    },
  ];

  const officialPct = Math.round((summary.official / summary.total) * 100);

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/50" id="credibility">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Data Integrity
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            An at-a-glance summary of the provenance and confidence levels
            across all {summary.total} metrics on this dashboard.
          </p>
        </div>

        {/* Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Source Classification Composition
            </h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {summary.total} total metrics
            </span>
          </div>

          {/* Stacked bar */}
          <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 mb-4">
            {summary.official > 0 && (
              <div
                className="bg-emerald-500 h-full transition-all duration-1000"
                style={{
                  width: `${(summary.official / summary.total) * 100}%`,
                }}
                title={`Official: ${summary.official}`}
              />
            )}
            {summary.derived > 0 && (
              <div
                className="bg-amber-500 h-full transition-all duration-1000"
                style={{
                  width: `${(summary.derived / summary.total) * 100}%`,
                }}
                title={`Derived: ${summary.derived}`}
              />
            )}
            {summary.secondary > 0 && (
              <div
                className="bg-blue-500 h-full transition-all duration-1000"
                style={{
                  width: `${(summary.secondary / summary.total) * 100}%`,
                }}
                title={`Secondary: ${summary.secondary}`}
              />
            )}
            {summary.cautionary > 0 && (
              <div
                className="bg-red-500 h-full transition-all duration-1000"
                style={{
                  width: `${(summary.cautionary / summary.total) * 100}%`,
                }}
                title={`Cautionary: ${summary.cautionary}`}
              />
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>{officialPct}%</strong> of metrics are backed by official
            sources. Remaining metrics rely on derived calculations or secondary
            reporting, each clearly labeled.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center",
                item.bg
              )}
            >
              <item.icon className={cn("h-8 w-8 mx-auto mb-3", item.color)} />
              <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {item.count}
              </p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {item.label}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
