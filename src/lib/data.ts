import type {
  PhaseConfig,
  MetricEntry,
  TimelineEntry,
  IncidentEntry,
  FAQEntry,
  ExplanationCard,
  CredibilitySummary,
} from "./types";

// ─── Phase Configuration ─────────────────────────────────────────────────────

export const phases: PhaseConfig[] = [
  {
    id: "2025-realized",
    label: "2025 Realized Spending",
    startDate: "2025-01-06T00:00:00+07:00",
    endDate: "2025-12-31T23:59:59+07:00",
    totalAmount: 52_900_000_000_000, // Rp52.9 trillion
    basisType: "realized",
    formulaNote:
      "Based on Ministry of Finance reported realization of Rp52.9 trillion (74.6% of Rp71T ceiling) as of 15 December 2025. Linearized across the full 2025 program period for estimation purposes.",
    sourceIds: ["antara-2025-realization"],
    badgeType: "official",
  },
  {
    id: "2026-allocated",
    label: "2026 Allocated Budget",
    startDate: "2026-01-01T00:00:00+07:00",
    endDate: "2026-12-31T23:59:59+07:00",
    totalAmount: 335_000_000_000_000, // Rp335 trillion
    basisType: "allocated",
    formulaNote:
      "Based on the official 2026 budget allocation of Rp335 trillion for MBG. Linearized across 365 days for estimation purposes. Actual disbursement patterns will differ.",
    sourceIds: ["antara-2026-allocation"],
    badgeType: "derived",
  },
];

// ─── Key Metrics ─────────────────────────────────────────────────────────────

export const metrics: MetricEntry[] = [
  {
    id: "budget-2025-ceiling",
    label: "2025 MBG Budget Ceiling",
    value: 71_000_000_000_000,
    unit: "IDR",
    displayValue: "Rp71 T",
    sourceType: "official",
    sourceIds: ["antara-2025-realization"],
    methodologyNote:
      "The approved budget ceiling (pagu) for MBG in fiscal year 2025.",
    lastReviewed: "2025-12-15",
    confidence: "high",
  },
  {
    id: "realized-2025",
    label: "2025 Realized Spending",
    value: 52_900_000_000_000,
    unit: "IDR",
    displayValue: "Rp52.9 T",
    sourceType: "official",
    sourceIds: ["antara-2025-realization"],
    methodologyNote:
      "Reported realization of MBG spending through 15 December 2025 per Ministry of Finance.",
    lastReviewed: "2025-12-15",
    confidence: "high",
  },
  {
    id: "realization-pct-2025",
    label: "2025 Realization Rate",
    value: 74.6,
    unit: "%",
    displayValue: "74.6%",
    sourceType: "official",
    sourceIds: ["antara-2025-realization"],
    methodologyNote:
      "Rp52.9T realized out of Rp71T ceiling = 74.6% budget absorption.",
    lastReviewed: "2025-12-15",
    confidence: "high",
  },
  {
    id: "budget-2026",
    label: "2026 MBG Allocation",
    value: 335_000_000_000_000,
    unit: "IDR",
    displayValue: "Rp335 T",
    sourceType: "official",
    sourceIds: ["antara-2026-allocation"],
    methodologyNote:
      "Officially allocated annual budget for MBG in fiscal year 2026.",
    lastReviewed: "2025-12-15",
    confidence: "high",
  },
  {
    id: "target-beneficiaries-2026",
    label: "2026 Target Beneficiaries",
    value: 82_900_000,
    unit: "persons",
    displayValue: "82.9 M",
    sourceType: "official",
    sourceIds: ["antara-2026-allocation"],
    methodologyNote:
      "Target number of beneficiaries for MBG in 2026 as stated in official allocation reports.",
    lastReviewed: "2025-12-15",
    confidence: "high",
  },
  {
    id: "target-sppg",
    label: "Target Kitchens (SPPG)",
    value: 37_500,
    unit: "SPPG",
    displayValue: "35,000–40,000",
    sourceType: "official",
    sourceIds: ["bgn-juknis"],
    methodologyNote:
      "BGN technical guidance targets 35,000–40,000 SPPG. Midpoint of 37,500 is used for derived calculations.",
    lastReviewed: "2025-12-15",
    confidence: "high",
    caveat:
      "Range target; the midpoint is used for derived per-SPPG calculations.",
  },
  {
    id: "daily-estimate-2026",
    label: "Estimated Daily Allocation (2026)",
    value: 917_808_219_178,
    unit: "IDR/day",
    displayValue: "~Rp917.8 B/day",
    sourceType: "derived",
    sourceIds: ["antara-2026-allocation"],
    methodologyNote:
      "Rp335T / 365 days = ~Rp917.8 billion per day. This is a linearized estimate; actual daily disbursement will vary.",
    lastReviewed: "2025-12-15",
    confidence: "medium",
    caveat: "Linearized estimate. Actual daily disbursements will differ.",
  },
  {
    id: "per-beneficiary-daily",
    label: "Est. Daily per Beneficiary (2026)",
    value: 11_072,
    unit: "IDR/person/day",
    displayValue: "~Rp11,072",
    sourceType: "derived",
    sourceIds: ["antara-2026-allocation"],
    methodologyNote:
      "Rp335T / 365 / 82.9M = ~Rp11,072 per beneficiary per day. A very rough estimate assuming uniform distribution.",
    lastReviewed: "2025-12-15",
    confidence: "medium",
    caveat:
      "Highly simplified. Does not account for actual distribution, operational costs, or phased rollout.",
  },
  {
    id: "per-sppg-annual",
    label: "Est. Annual per SPPG (2026)",
    value: 8_933_333_333,
    unit: "IDR/SPPG/year",
    displayValue: "~Rp8.93 B",
    sourceType: "derived",
    sourceIds: ["antara-2026-allocation", "bgn-juknis"],
    methodologyNote:
      "Rp335T / 37,500 (midpoint SPPG target) = ~Rp8.93 billion per SPPG per year. Highly approximate.",
    lastReviewed: "2025-12-15",
    confidence: "medium",
    caveat:
      "Uses a midpoint estimate for SPPG count. Actual per-kitchen allocations depend on many factors.",
  },
  {
    id: "data-status",
    label: "Last Source Review",
    value: 0,
    unit: "date",
    displayValue: "15 Dec 2025",
    sourceType: "official",
    sourceIds: [],
    methodologyNote: "Date when the source registry for this dashboard was last reviewed.",
    lastReviewed: "2025-12-15",
    confidence: "high",
  },
];

// ─── Explanation Cards ───────────────────────────────────────────────────────

export const explanationCards: ExplanationCard[] = [
  {
    title: "Allocated Budget",
    description:
      "The amount approved by the government for MBG in a given fiscal year. This is a spending ceiling — it represents the maximum authorized, not what has actually been spent.",
    icon: "landmark",
  },
  {
    title: "Realized Spending",
    description:
      "The amount that has actually been disbursed or booked as expenditure, based on official reports from the Ministry of Finance or related agencies. Only available periodically.",
    icon: "receipt",
  },
  {
    title: "Formula-Based Running Estimate",
    description:
      "A linearized approximation of cumulative spending, derived by spreading a known total evenly over the time period. Useful for illustrating scale, but not a representation of actual treasury outflow patterns.",
    isHighlighted: true,
    icon: "calculator",
  },
  {
    title: "Audited Actual Cash Spending",
    description:
      "This would be verified, transaction-level government disbursement data confirmed by official audit bodies (e.g., BPK). This dashboard does NOT provide this. No public dashboard currently shows this in real time.",
    icon: "shield-check",
  },
];

// ─── Timeline ────────────────────────────────────────────────────────────────

export const timeline: TimelineEntry[] = [
  {
    id: "tl-1",
    date: "2025-01-06",
    title: "MBG Program Officially Launched",
    category: "launch",
    description:
      "The Makan Bergizi Gratis (Free Nutritious Meals) program officially begins operations in Indonesia.",
    sourceType: "official",
    sourceId: "bgn-juknis",
  },
  {
    id: "tl-2",
    date: "2025-01-01",
    title: "2025 MBG Budget Ceiling Approved: Rp71 Trillion",
    category: "budget",
    description:
      "The 2025 fiscal year budget ceiling for MBG is set at Rp71 trillion.",
    sourceType: "official",
    sourceId: "antara-2025-realization",
  },
  {
    id: "tl-3",
    date: "2025-06-01",
    title: "BGN Addresses Food Safety Incidents",
    category: "food-safety",
    description:
      "BGN Vice Chair issues public apology and confirms closure of kitchens violating standard operating procedures.",
    sourceType: "official",
    sourceId: "bgn-food-safety-press",
  },
  {
    id: "tl-4",
    date: "2025-09-01",
    title: "2026 Allocation Announced: Rp335 Trillion",
    category: "budget",
    description:
      "Government announces Rp335 trillion allocation for MBG in 2026, targeting 82.9 million beneficiaries.",
    sourceType: "official",
    sourceId: "antara-2026-allocation",
  },
  {
    id: "tl-5",
    date: "2025-12-15",
    title: "2025 Realization Report: 74.6% Absorption",
    category: "budget",
    description:
      "Ministry of Finance reports Rp52.9 trillion in MBG spending realized — 74.6% of the Rp71T ceiling.",
    sourceType: "official",
    sourceId: "antara-2025-realization",
  },
  {
    id: "tl-6",
    date: "2026-01-01",
    title: "2026 MBG Budget Phase Begins",
    category: "budget",
    description:
      "The 2026 fiscal year budget phase for MBG commences with Rp335 trillion allocated.",
    sourceType: "official",
    sourceId: "antara-2026-allocation",
  },
  {
    id: "tl-7",
    date: "2026-12-31",
    title: "Target: 35,000–40,000 SPPG Operational",
    category: "operational",
    description:
      "BGN's technical guidance targets 35,000–40,000 operational SPPG (kitchens) for the mature program.",
    sourceType: "official",
    sourceId: "bgn-juknis",
  },
];

// ─── Incidents ───────────────────────────────────────────────────────────────

export const incidents: IncidentEntry[] = [
  {
    id: "inc-1",
    title: "Food Safety SOP Violations Identified",
    date: "2025-06-01",
    reportingSource: "Badan Gizi Nasional (BGN)",
    verificationStatus: "official",
    description:
      "BGN confirmed closure of kitchens found violating standard operating procedures. Number of affected locations and persons addressed in official press release.",
    sourceId: "bgn-food-safety-press",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqs: FAQEntry[] = [
  {
    id: "faq-1",
    question: "Is this real-time government spending?",
    answer:
      "No. The live counter is a formula-based estimate that spreads known budget or realization figures evenly over time. It does not connect to any government treasury system or provide actual transaction-level data.",
  },
  {
    id: "faq-2",
    question: "What is the formula behind the counter?",
    answer:
      "For each phase, the counter calculates: rate_per_second = total_amount / total_seconds_in_phase. The displayed number is elapsed_seconds × rate_per_second, plus any completed prior phase totals. This is a linear simplification.",
  },
  {
    id: "faq-3",
    question:
      "What is the difference between allocated budget and realized spending?",
    answer:
      "Allocated budget is the approved spending ceiling for a fiscal year — the maximum authorized. Realized spending is the amount actually disbursed or booked as expenditure, as reported by official sources. The two can differ significantly.",
  },
  {
    id: "faq-4",
    question: "Why does the number keep increasing every second?",
    answer:
      "The counter uses linearized estimation: it divides the total budget or realization figure by the number of seconds in the period and ticks upward continuously. This is a visualization model, not a reflection of actual moment-by-moment government disbursements.",
  },
  {
    id: "faq-5",
    question: "Are all numbers on this dashboard official?",
    answer:
      "No. Each metric is labeled with a source classification badge: Official, Derived Estimate, Secondary Report, or Not Fully Verified. Check the badge on each metric to understand its provenance.",
  },
  {
    id: "faq-6",
    question: "Which metrics are estimates?",
    answer:
      "Derived estimates include daily allocation rates, per-beneficiary costs, per-SPPG costs, and the live running counter itself. These are calculated from official figures using transparent formulas, but are not independently verified expenditure data.",
  },
  {
    id: "faq-7",
    question: "How should readers interpret the risk section?",
    answer:
      "The Implementation & Food Safety Risk section uses data from official BGN press releases and, where noted, secondary media reporting. Incident counts are dynamic and may change as investigations continue. This data is not equivalent in certainty to official budget figures.",
  },
  {
    id: "faq-8",
    question: "How often should the source registry be reviewed?",
    answer:
      "Ideally, the source registry should be reviewed whenever new official reports, budget revisions, or realization data are published. The 'Last Source Review' date on this dashboard indicates when the underlying data was last checked.",
  },
];

// ─── Credibility Summary ─────────────────────────────────────────────────────

export function computeCredibilitySummary(): CredibilitySummary {
  const official = metrics.filter((m) => m.sourceType === "official").length;
  const derived = metrics.filter((m) => m.sourceType === "derived").length;
  const secondary = metrics.filter((m) => m.sourceType === "secondary").length;
  const cautionary = metrics.filter(
    (m) => m.sourceType === "not-verified"
  ).length;
  return {
    official,
    derived,
    secondary,
    cautionary,
    total: metrics.length,
  };
}
