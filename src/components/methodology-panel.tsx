"use client";

import { motion } from "framer-motion";
import { SourceBadge } from "./source-badge";
import { WarningBanner } from "./warning-banner";
import { cn } from "@/lib/utils";

export function MethodologyPanel() {
  return (
    <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/50" id="methodology">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Methodology
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            How the estimation model works, what it assumes, and where its
            limitations lie.
          </p>
        </div>

        <div className="space-y-8">
          {/* Model Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Estimation Model
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              This dashboard uses a <strong>linearized estimation model</strong>{" "}
              that distributes known budget or realization totals evenly across
              the time period of each phase. The model operates in two phases:
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    Phase 1: 2025 Realized
                  </span>
                  <SourceBadge type="official" size="xs" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Uses the reported realization of{" "}
                  <strong>Rp52.9 trillion</strong> (74.6% of the Rp71T budget
                  ceiling), linearized across the 2025 program period (6 Jan –
                  31 Dec 2025).
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    Phase 2: 2026 Allocated
                  </span>
                  <SourceBadge type="derived" size="xs" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Uses the official 2026 allocation of{" "}
                  <strong>Rp335 trillion</strong>, linearized across the full
                  calendar year 2026. This is an allocated (not yet realized)
                  estimate.
                </p>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
              Formulas
            </h4>

            <div className="space-y-3 mb-6">
              {[
                {
                  label: "Daily Rate",
                  formula: "daily_rate = total_amount / number_of_days",
                  example:
                    "Rp335T / 365 = ~Rp917.8B per day (2026 phase)",
                },
                {
                  label: "Second Rate",
                  formula: "second_rate = total_amount / total_seconds_in_phase",
                  example:
                    "Rp335T / 31,536,000 = ~Rp10.6M per second (2026 phase)",
                },
                {
                  label: "Cumulative Estimate",
                  formula:
                    "cumulative = Σ(completed_phase_totals) + current_phase_elapsed × rate_per_second",
                  example:
                    "Rp52.9T (2025) + elapsed_2026 × Rp10.6M/s",
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4"
                >
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    {f.label}
                  </p>
                  <pre className="text-sm font-mono text-slate-800 dark:text-slate-200 mb-2 overflow-x-auto">
                    {f.formula}
                  </pre>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Example: {f.example}
                  </p>
                </div>
              ))}
            </div>

            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
              Key Assumptions
            </h4>
            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2 mb-6">
              <li>
                Spending is distributed uniformly across each phase period
                (linearization).
              </li>
              <li>
                The 2025 realization figure (Rp52.9T) represents total spending
                for the full program year.
              </li>
              <li>
                The 2026 allocation (Rp335T) is used in full as the basis for
                the Phase 2 estimate, though actual realization may differ.
              </li>
              <li>
                Operational factors (holidays, ramp-up periods, regional
                variation) are not modeled.
              </li>
            </ul>

            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
              Source Mapping
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Phase 1 relies on Ministry of Finance data as reported by Antara.
              Phase 2 relies on the official 2026 budget allocation announcement.
              All source entries are available in the{" "}
              <a
                href="#sources"
                className="underline text-emerald-600 dark:text-emerald-400 hover:no-underline"
              >
                Source Registry
              </a>
              .
            </p>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20 p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-200 mb-4">
              Methodological Limitations
            </h3>
            <ul className="space-y-3">
              {[
                "Linearized estimation does not reflect real disbursement timing. Government spending is typically uneven, with seasonal patterns and procurement cycles.",
                "Realized spending data may be available only periodically (e.g., quarterly or semi-annually). The model uses the latest available figure.",
                "Budget revisions by the government may change the total for a phase. The model uses the allocation at the time of last review.",
                "Implementation interruptions (e.g., kitchen closures) do not automatically mean spending stopped — overhead and fixed costs may continue.",
                "Secondary risk data (incidents, food safety reports) may evolve after investigation. Numbers cited from press reports may be updated later.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
