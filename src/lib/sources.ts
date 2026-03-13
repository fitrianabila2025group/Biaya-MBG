import type { SourceEntry } from "./types";

export const sources: SourceEntry[] = [
  {
    id: "bgn-juknis",
    title: "BGN Technical Guidance (Juknis) for MBG Program",
    organization: "Badan Gizi Nasional (BGN)",
    url: "https://www.bgn.go.id/juknis",
    publishedAt: "2025-01-01",
    sourceType: "official",
    supportsMetrics: [
      "target-sppg",
      "target-beneficiaries",
      "program-governance",
    ],
    confidence: "high",
    note: "Official technical guidance document for MBG program governance, target scale, and operational standards.",
  },
  {
    id: "bgn-juknis-pdf",
    title: "BGN Technical Guidance PDF Document",
    organization: "Badan Gizi Nasional (BGN)",
    url: "https://cdn-web.bgn.go.id/juknis/01KFZQGR85YKY1HRMNDK4RRM1P.pdf",
    publishedAt: "2025-01-01",
    sourceType: "official",
    supportsMetrics: ["target-sppg", "program-governance", "food-safety-cert"],
    confidence: "high",
    note: "Detailed PDF version of BON technical guidance including SPPG targets and food safety certification requirements.",
  },
  {
    id: "bgn-operational-sppg",
    title: "BGN Operational SPPG Listing",
    organization: "Badan Gizi Nasional (BGN)",
    url: "https://www.bgn.go.id/operasional-sppg",
    publishedAt: "2025-12-15",
    sourceType: "official",
    supportsMetrics: ["operational-sppg"],
    confidence: "high",
    note: "Official BGN page listing currently operational SPPG locations. This is a live page and counts may change.",
  },
  {
    id: "bgn-food-safety-press",
    title: "BGN Press Release: Vice Chair Apologizes & Confirms Kitchen Closures for SOP Violations",
    organization: "Badan Gizi Nasional (BGN)",
    url: "https://www.bgn.go.id/news/siaran-pers/waka-bgn-sampaikan-permintaan-maaf-dan-pastikan-tutup-dapur-yang-langgar-sop",
    publishedAt: "2025-06-01",
    sourceType: "official",
    supportsMetrics: ["food-safety-incidents"],
    confidence: "high",
    note: "Official BGN press release regarding food safety incident response and kitchen closure actions.",
  },
  {
    id: "bgn-head-press",
    title: "BGN Head Press Release on MBG Implementation",
    organization: "Badan Gizi Nasional (BGN)",
    url: "https://www.bgn.go.id/news/siaran-pers/siaran-pers-kepala-badan-gizi-nasional",
    publishedAt: "2025-06-01",
    sourceType: "official",
    supportsMetrics: ["program-governance", "food-safety-response"],
    confidence: "high",
    note: "Press release from the Head of BGN addressing MBG implementation progress and governance.",
  },
  {
    id: "antara-2026-allocation",
    title: "Indonesia Allocates Rp335 Trillion for Free Meals Program in 2026",
    organization: "Antara News Agency",
    url: "https://en.antaranews.com/news/399809/indonesia-allocates-rp335-trillion-for-free-meals-program-in-2026",
    publishedAt: "2025-09-01",
    sourceType: "official",
    supportsMetrics: [
      "budget-2026",
      "target-beneficiaries-2026",
    ],
    confidence: "high",
    note: "Primary-linked reporting of the 2026 budget allocation (Rp335T) and 82.9M beneficiary target. Antara is Indonesia's national news agency.",
  },
  {
    id: "antara-2025-realization",
    title: "MoF: MBG Absorbs Rp52.9 Trillion by December 2025 (74.6% of Ceiling)",
    organization: "Antara News Agency",
    url: "https://www.antaranews.com/berita/5311804/kemenkeu-mbg-serap-rp529-triliun-per-desember-746-persen-dari-pagu",
    publishedAt: "2025-12-15",
    sourceType: "official",
    supportsMetrics: [
      "budget-2025-ceiling",
      "realized-2025",
      "realization-pct-2025",
    ],
    confidence: "high",
    note: "Primary-linked reporting of 2025 realization figures from Ministry of Finance. 74.6% absorption of Rp71T ceiling = Rp52.9T realized.",
  },
  {
    id: "reference-site",
    title: "BiayaMBG Reference Estimation Site",
    organization: "Independent / Community",
    url: "https://biayambg.vercel.app/",
    publishedAt: "2025-01-06",
    sourceType: "secondary",
    supportsMetrics: ["counter-methodology"],
    confidence: "medium",
    note: "Community-built reference estimation site. The counter methodology linearizes allocated/realized budgets over time. This is the conceptual reference for this dashboard's counter logic.",
  },
];

export function getSourceById(id: string): SourceEntry | undefined {
  return sources.find((s) => s.id === id);
}

export function getSourcesByType(type: SourceEntry["sourceType"]): SourceEntry[] {
  return sources.filter((s) => s.sourceType === type);
}
