"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { phases } from "@/lib/data";
import {
  getCumulativeEstimate,
  getCurrentPhase,
  getPhaseRates,
  isPhaseActive,
} from "@/lib/calculations";
import { formatRupiah, formatRupiahCompact } from "@/lib/format";
import { SourceBadge } from "./source-badge";
import { WarningBanner } from "./warning-banner";
import { Activity, Clock, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function LiveCounter() {
  const [now, setNow] = useState(() => new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(interval);
  }, []);

  const cumulative = getCumulativeEstimate(phases, now);
  const currentPhase = getCurrentPhase(phases, now);
  const rates = currentPhase ? getPhaseRates(currentPhase) : null;

  const formatCounter = useCallback((amount: number) => {
    const t = Math.floor(amount / 1e12);
    const remainder = amount % 1e12;
    const b = Math.floor(remainder / 1e9);
    const m = Math.floor((remainder % 1e9) / 1e6);
    const k = Math.floor((remainder % 1e6) / 1e3);

    return {
      trillions: t.toLocaleString("en-US"),
      billions: b.toString().padStart(3, "0"),
      millions: m.toString().padStart(3, "0"),
      thousands: k.toString().padStart(3, "0"),
    };
  }, []);

  const parts = formatCounter(cumulative);

  if (!mounted) {
    return (
      <div className="text-center py-12">
        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse max-w-2xl mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Counter Display */}
      <div className="relative">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            Estimated Cumulative MBG Spending
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-baseline gap-1 font-mono">
            <span className="text-2xl md:text-3xl font-semibold text-slate-500 dark:text-slate-400">
              Rp
            </span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
              {parts.trillions}
            </span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-400 dark:text-slate-500 tracking-tight tabular-nums">
              .{parts.billions}
            </span>
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-300 dark:text-slate-600 tracking-tight tabular-nums">
              .{parts.millions}
            </span>
            <span className="text-sm md:text-base font-medium text-slate-300 dark:text-slate-700 tracking-tight tabular-nums">
              .{parts.thousands}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            <SourceBadge type="derived" size="sm" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Linearized formula-based estimate
            </span>
          </div>
        </motion.div>
      </div>

      {/* Current Phase Indicator */}
      {currentPhase && (
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                isPhaseActive(currentPhase, now)
                  ? "bg-emerald-500 animate-pulse"
                  : "bg-slate-400"
              )}
            />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {currentPhase.label}
            </span>
            <SourceBadge type={currentPhase.badgeType} size="xs" />
          </div>
        </div>
      )}

      {/* Rate Metrics */}
      {rates && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            {
              label: "Per Second",
              value: rates.perSecond,
              icon: Zap,
            },
            {
              label: "Per Minute",
              value: rates.perMinute,
              icon: Clock,
            },
            {
              label: "Per Hour",
              value: rates.perHour,
              icon: TrendingUp,
            },
            {
              label: "Per Day",
              value: rates.perDay,
              icon: Activity,
            },
          ].map((r) => (
            <div
              key={r.label}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center"
            >
              <r.icon className="h-4 w-4 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                {formatRupiahCompact(r.value)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {r.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Phase Summary */}
      <div className="max-w-3xl mx-auto space-y-3">
        {phases.map((phase) => {
          const active = isPhaseActive(phase, now);
          const complete = now >= new Date(phase.endDate);

          return (
            <div
              key={phase.id}
              className={cn(
                "rounded-2xl border p-4 flex items-center justify-between gap-4",
                active
                  ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full shrink-0",
                    active
                      ? "bg-emerald-500 animate-pulse"
                      : complete
                      ? "bg-slate-400"
                      : "bg-slate-300"
                  )}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {phase.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatRupiah(phase.totalAmount)} ({phase.basisType})
                  </p>
                </div>
              </div>
              <SourceBadge type={phase.badgeType} size="xs" />
            </div>
          );
        })}
      </div>

      {/* Linearization Disclaimer */}
      <WarningBanner variant="info" className="max-w-3xl mx-auto">
        <strong>About this counter:</strong> Linearization divides a total
        budget or realization figure evenly across all seconds in the period.
        This is a mathematical simplification for illustrative purposes. Actual
        government disbursement does not occur at a constant per-second rate.
      </WarningBanner>
    </div>
  );
}
