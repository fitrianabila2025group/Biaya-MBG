"use client";

import { motion } from "framer-motion";
import { metrics } from "@/lib/data";
import { StatCard } from "./stat-card";

export function MetricsStrip() {
  const displayMetrics = metrics.filter((m) => m.id !== "data-status");

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/50" id="metrics">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Key Metrics
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Core budget, realization, and derived figures underpinning this
            dashboard. Every metric is labeled with its source classification.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayMetrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <StatCard metric={metric} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
