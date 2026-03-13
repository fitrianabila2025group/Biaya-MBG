"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data";
import { SourceBadge } from "./source-badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  Rocket,
  Wallet,
  Building2,
  ShieldAlert,
  FileText,
} from "lucide-react";
import type { TimelineCategory } from "@/lib/types";

const categoryConfig: Record<
  TimelineCategory,
  { icon: React.ElementType; color: string }
> = {
  launch: { icon: Rocket, color: "text-emerald-500" },
  budget: { icon: Wallet, color: "text-blue-500" },
  operational: { icon: Building2, color: "text-purple-500" },
  "food-safety": { icon: ShieldAlert, color: "text-red-500" },
  policy: { icon: FileText, color: "text-slate-500" },
};

export function Timeline() {
  const sorted = [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <section className="py-20 md:py-28" id="timeline">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Program Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Key milestones in the MBG program from launch through 2026
            implementation.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-8">
            {sorted.map((entry, i) => {
              const { icon: Icon, color } = categoryConfig[entry.category];

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-6 top-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700 shadow-sm z-10" />

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-4 w-4", color)} />
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {entry.category}
                        </span>
                      </div>
                      <SourceBadge type={entry.sourceType} size="xs" />
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                      {entry.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {formatDate(entry.date)}
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
