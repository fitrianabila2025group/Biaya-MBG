"use client";

import { motion } from "framer-motion";
import { incidents } from "@/lib/data";
import { SourceBadge } from "./source-badge";
import { WarningBanner } from "./warning-banner";
import { formatDate } from "@/lib/format";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export function RiskSection() {
  return (
    <section
      className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/50"
      id="risk"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider mb-3">
            <ShieldAlert className="h-4 w-4" />
            Contextual Section
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Implementation &amp; Food Safety Risk
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Factual reporting on food safety and implementation incidents. This
            section is clearly separated from the main spending estimation model.
          </p>
        </div>

        <WarningBanner variant="warning" className="mb-8">
          <strong>Important:</strong> Incident data is dynamic and may change as
          investigations, reporting standards, and official confirmations evolve.
          This data should not be conflated with official budget metrics in terms
          of certainty or provenance.
        </WarningBanner>

        <div className="space-y-4">
          {incidents.map((incident, i) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-red-100 dark:border-red-900/50 bg-white dark:bg-slate-900 p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {incident.title}
                  </h3>
                </div>
                <SourceBadge
                  type={incident.verificationStatus}
                  size="xs"
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {formatDate(incident.date)} · Reported by:{" "}
                {incident.reportingSource}
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {incident.description}
              </p>

              {incident.affectedPersons !== undefined && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
                  Affected persons: {incident.affectedPersons.toLocaleString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {incidents.length === 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No incident data currently loaded. This section will populate when
              food safety or implementation risk entries are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
