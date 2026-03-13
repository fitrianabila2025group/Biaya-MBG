// ─── Source Classification ───────────────────────────────────────────────────

export type SourceType = "official" | "derived" | "secondary" | "not-verified";

export type Confidence = "high" | "medium" | "low" | "unverified";

export interface SourceEntry {
  id: string;
  title: string;
  organization: string;
  url: string;
  publishedAt: string;
  sourceType: SourceType;
  supportsMetrics: string[];
  confidence: Confidence;
  note: string;
}

// ─── Metrics ─────────────────────────────────────────────────────────────────

export interface MetricEntry {
  id: string;
  label: string;
  value: number;
  unit: string;
  displayValue: string;
  sourceType: SourceType;
  sourceIds: string[];
  methodologyNote: string;
  lastReviewed: string;
  confidence: Confidence;
  caveat?: string;
  icon?: string;
}

// ─── Phases ──────────────────────────────────────────────────────────────────

export type BasisType = "realized" | "allocated";

export interface PhaseConfig {
  id: string;
  label: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  totalAmount: number; // in Rupiah
  basisType: BasisType;
  formulaNote: string;
  sourceIds: string[];
  badgeType: SourceType;
}

// ─── Timeline ────────────────────────────────────────────────────────────────

export type TimelineCategory =
  | "launch"
  | "budget"
  | "operational"
  | "food-safety"
  | "policy";

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  category: TimelineCategory;
  description: string;
  sourceType: SourceType;
  sourceId?: string;
}

// ─── Incidents ───────────────────────────────────────────────────────────────

export interface IncidentEntry {
  id: string;
  title: string;
  date: string;
  affectedPersons?: number;
  reportingSource: string;
  verificationStatus: SourceType;
  description: string;
  sourceId?: string;
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FAQEntry {
  id: string;
  question: string;
  answer: string;
}

// ─── Explanation Cards ───────────────────────────────────────────────────────

export interface ExplanationCard {
  title: string;
  description: string;
  isHighlighted?: boolean;
  icon?: string;
}

// ─── Credibility ─────────────────────────────────────────────────────────────

export interface CredibilitySummary {
  official: number;
  derived: number;
  secondary: number;
  cautionary: number;
  total: number;
}
