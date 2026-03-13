"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sources } from "@/lib/sources";
import { SourceBadge } from "./source-badge";
import { formatDate } from "@/lib/format";
import type { SourceType } from "@/lib/types";
import {
  ExternalLink,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const filterOptions: { label: string; value: SourceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Official", value: "official" },
  { label: "Derived", value: "derived" },
  { label: "Secondary", value: "secondary" },
  { label: "Not Verified", value: "not-verified" },
];

export function SourceRegistry() {
  const [filter, setFilter] = useState<SourceType | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = sources.filter((s) => {
    if (filter !== "all" && s.sourceType !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.organization.toLowerCase().includes(q) ||
        s.note.toLowerCase().includes(q) ||
        s.supportsMetrics.some((m) => m.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section className="py-20 md:py-28" id="sources">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Source Registry
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Every metric on this dashboard is traceable to one or more entries
            below. Each source is classified by type and confidence level.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search sources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-colors"
              aria-label="Search sources"
            />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <Filter className="h-4 w-4 text-slate-400 mr-1" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  filter === opt.value
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filtered.map((source, i) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 leading-snug">
                    {source.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {source.organization} · Published{" "}
                    {formatDate(source.publishedAt)}
                  </p>
                </div>
                <SourceBadge type={source.sourceType} size="sm" />
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {source.note}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {source.supportsMetrics.map((metric) => (
                  <span
                    key={metric}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                  >
                    {metric}
                  </span>
                ))}
                <span className="ml-auto">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                  >
                    View source
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-12">
            No sources match your current filter.
          </p>
        )}
      </div>
    </section>
  );
}
