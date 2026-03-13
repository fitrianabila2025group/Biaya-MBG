"use client";

import { motion } from "framer-motion";
import { LiveCounter } from "./live-counter";
import {
  ArrowDown,
  FileText,
  BookOpen,
  ShieldCheck,
  Tag,
  BarChart3,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden" id="hero">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/50 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-emerald-100/30 via-transparent to-amber-100/20 dark:from-emerald-900/10 dark:to-amber-900/10 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-5">
            Estimating the Scale of{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Indonesia&rsquo;s Free
            </span>{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Nutritious Meals Program
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A transparent public estimation dashboard built from official budget
            allocations, realized spending figures, and derived calculations.
          </p>
        </motion.div>

        {/* Live Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <LiveCounter />
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur px-6 py-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-900 dark:text-white">
                Important:
              </strong>{" "}
              This is a formula-based public estimate built from official budget
              and realization data. It is not a live state treasury transaction
              feed.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#methodology"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-900/10"
          >
            <FileText className="h-4 w-4" />
            View Methodology
          </a>
          <a
            href="#sources"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            View Source Registry
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400"
        >
          {[
            { icon: ShieldCheck, label: "Transparent Formula" },
            { icon: Tag, label: "Source-Labeled Metrics" },
            { icon: BarChart3, label: "Public-Interest Dashboard" },
          ].map((t) => (
            <span key={t.label} className="inline-flex items-center gap-1.5">
              <t.icon className="h-3.5 w-3.5 text-emerald-500" />
              {t.label}
            </span>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <div className="mt-16 flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5 text-slate-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
