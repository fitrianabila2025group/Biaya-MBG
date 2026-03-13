"use client";

import { type MetricEntry } from "@/lib/types";
import { SourceBadge } from "./source-badge";
import { cn } from "@/lib/utils";
import {
  Landmark,
  Receipt,
  TrendingUp,
  Wallet,
  Users,
  Building2,
  CalendarClock,
  Activity,
  Clock,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "budget-2025-ceiling": Landmark,
  "realized-2025": Receipt,
  "realization-pct-2025": TrendingUp,
  "budget-2026": Wallet,
  "target-beneficiaries-2026": Users,
  "target-sppg": Building2,
  "daily-estimate-2026": CalendarClock,
  "per-beneficiary-daily": Users,
  "per-sppg-annual": Building2,
  "data-status": Clock,
};

export function StatCard({
  metric,
  className,
}: {
  metric: MetricEntry;
  className?: string;
}) {
  const Icon = iconMap[metric.id] || Activity;

  return (
    <div
      className={cn(
        "group relative rounded-3xl border bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all duration-300",
        "border-slate-200 dark:border-slate-800",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        </div>
        <SourceBadge type={metric.sourceType} size="xs" />
      </div>

      <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
        {metric.displayValue}
      </p>

      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
        {metric.label}
      </p>

      <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-2">
        {metric.methodologyNote}
      </p>

      {metric.caveat && (
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 italic">
          {metric.caveat}
        </p>
      )}
    </div>
  );
}
