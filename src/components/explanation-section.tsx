"use client";

import { motion } from "framer-motion";
import { explanationCards } from "@/lib/data";
import { Landmark, Receipt, Calculator, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { WarningBanner } from "./warning-banner";

const iconMap: Record<string, React.ElementType> = {
  landmark: Landmark,
  receipt: Receipt,
  calculator: Calculator,
  "shield-check": ShieldCheck,
};

export function ExplanationSection() {
  return (
    <section className="py-20 md:py-28" id="explanation">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            What This Number Is — And Is Not
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Understanding the difference between budget allocation, realized
            spending, formula-based estimation, and audited actuals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {explanationCards.map((card, i) => {
            const Icon = iconMap[card.icon || ""] || Calculator;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "rounded-3xl border p-6 transition-all",
                  card.isHighlighted
                    ? "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20 ring-1 ring-amber-200/50 dark:ring-amber-800/50"
                    : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      card.isHighlighted
                        ? "bg-amber-100 dark:bg-amber-900/40"
                        : "bg-slate-100 dark:bg-slate-800"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        card.isHighlighted
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-slate-600 dark:text-slate-400"
                      )}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <WarningBanner variant="warning">
          <strong>Key distinction:</strong> The live counter is not a direct live
          feed of government disbursement transactions. It is a formula-based
          linear estimate derived from known budget and realization totals.
        </WarningBanner>
      </div>
    </section>
  );
}
