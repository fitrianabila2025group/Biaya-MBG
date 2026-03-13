"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";

export function WarningBanner({
  children,
  variant = "warning",
  className,
}: {
  children: React.ReactNode;
  variant?: "warning" | "info";
  className?: string;
}) {
  const isWarning = variant === "warning";

  return (
    <div
      className={cn(
        "rounded-2xl border px-5 py-4 flex items-start gap-3",
        isWarning
          ? "bg-red-50/80 border-red-200 dark:bg-red-950/30 dark:border-red-900"
          : "bg-blue-50/80 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
        className
      )}
      role="alert"
    >
      {isWarning ? (
        <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 shrink-0" />
      ) : (
        <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
      )}
      <p
        className={cn(
          "text-sm leading-relaxed",
          isWarning
            ? "text-red-800 dark:text-red-200"
            : "text-blue-800 dark:text-blue-200"
        )}
      >
        {children}
      </p>
    </div>
  );
}
