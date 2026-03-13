"use client";

import { type SourceType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Calculator,
  Newspaper,
  AlertTriangle,
} from "lucide-react";

const config: Record<
  SourceType,
  { label: string; className: string; icon: React.ElementType }
> = {
  official: {
    label: "Official",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
    icon: ShieldCheck,
  },
  derived: {
    label: "Derived Estimate",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
    icon: Calculator,
  },
  secondary: {
    label: "Secondary Report",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800",
    icon: Newspaper,
  },
  "not-verified": {
    label: "Not Fully Verified",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800",
    icon: AlertTriangle,
  },
};

export function SourceBadge({
  type,
  size = "sm",
  className: extraClass,
}: {
  type: SourceType;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const { label, className, icon: Icon } = config[type];

  const sizeClasses = {
    xs: "text-[10px] px-1.5 py-0.5 gap-0.5",
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
  };

  const iconSizes = { xs: 10, sm: 12, md: 14 };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border whitespace-nowrap",
        sizeClasses[size],
        className,
        extraClass
      )}
    >
      <Icon size={iconSizes[size]} />
      {label}
    </span>
  );
}
