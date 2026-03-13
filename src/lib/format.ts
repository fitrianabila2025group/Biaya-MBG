/**
 * Format a number as Indonesian Rupiah.
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a large Rupiah number in compact notation with a scale suffix.
 */
export function formatRupiahCompact(amount: number): string {
  if (amount >= 1e15) {
    return `Rp${(amount / 1e12).toFixed(1)} T+`;
  }
  if (amount >= 1e12) {
    return `Rp${(amount / 1e12).toFixed(2)} T`;
  }
  if (amount >= 1e9) {
    return `Rp${(amount / 1e9).toFixed(1)} B`;
  }
  if (amount >= 1e6) {
    return `Rp${(amount / 1e6).toFixed(1)} M`;
  }
  return formatRupiah(amount);
}

/**
 * Format a number with locale-aware thousand separators.
 */
export function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/**
 * Format a large number with compact suffix (M, B, T).
 */
export function formatCompact(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toFixed(0);
}

/**
 * Format a rate per unit time for display.
 */
export function formatRate(amount: number, unit: string): string {
  return `${formatRupiahCompact(amount)} / ${unit}`;
}

/**
 * Split a large Rupiah amount into integer and decimal parts for animated display.
 * Returns [wholePart, decimalPart] as strings.
 */
export function splitRupiahForDisplay(amount: number): {
  prefix: string;
  trillions: string;
  billions: string;
  millions: string;
  suffix: string;
} {
  const t = Math.floor(amount / 1e12);
  const b = Math.floor((amount % 1e12) / 1e9);
  const m = Math.floor((amount % 1e9) / 1e6);

  return {
    prefix: "Rp",
    trillions: t.toLocaleString("en-US"),
    billions: b.toString().padStart(3, "0"),
    millions: m.toString().padStart(3, "0"),
    suffix: "T",
  };
}

/**
 * Format date for display.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
