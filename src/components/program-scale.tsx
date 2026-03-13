"use client";

import { motion } from "framer-motion";
import { metrics } from "@/lib/data";
import { SourceBadge } from "./source-badge";
import {
  Users,
  Building2,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { formatNumber } from "@/lib/format";

export function ProgramScale() {
  const beneficiaries = metrics.find(
    (m) => m.id === "target-beneficiaries-2026"
  );
  const targetSppg = metrics.find((m) => m.id === "target-sppg");
  const perBeneficiary = metrics.find((m) => m.id === "per-beneficiary-daily");
  const perSppg = metrics.find((m) => m.id === "per-sppg-annual");
  const budget2026 = metrics.find((m) => m.id === "budget-2026");

  const scaleItems = [
    {
      icon: Users,
      label: "Target Beneficiaries (2026)",
      value: beneficiaries?.displayValue || "82.9 M",
      note: "Persons targeted to receive free nutritious meals",
      sourceType: beneficiaries?.sourceType || ("official" as const),
    },
    {
      icon: Building2,
      label: "Target Kitchens (SPPG)",
      value: targetSppg?.displayValue || "35,000–40,000",
      note: "Satuan Pelayanan Pangan Gratis kitchens per BGN guidance",
      sourceType: targetSppg?.sourceType || ("official" as const),
    },
    {
      icon: Banknote,
      label: "2026 Total Allocation",
      value: budget2026?.displayValue || "Rp335 T",
      note: "Total budget allocated for MBG in fiscal year 2026",
      sourceType: budget2026?.sourceType || ("official" as const),
    },
    {
      icon: Users,
      label: "Est. Daily per Beneficiary",
      value: perBeneficiary?.displayValue || "~Rp11,072",
      note: "Derived: Rp335T / 365 / 82.9M — highly simplified",
      sourceType: perBeneficiary?.sourceType || ("derived" as const),
    },
    {
      icon: Building2,
      label: "Est. Annual per SPPG",
      value: perSppg?.displayValue || "~Rp8.93 B",
      note: "Derived: Rp335T / 37,500 (midpoint target) — approximate",
      sourceType: perSppg?.sourceType || ("derived" as const),
    },
  ];

  return (
    <section className="py-20 md:py-28" id="scale">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Program Scale
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The national scope of Indonesia&rsquo;s Free Nutritious Meals
            program and implied per-unit allocations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {scaleItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <SourceBadge type={item.sourceType} size="xs" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {item.value}
              </p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                {item.label}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
