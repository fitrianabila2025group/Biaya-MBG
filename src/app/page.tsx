"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MetricsStrip } from "@/components/metrics-strip";
import { ExplanationSection } from "@/components/explanation-section";
import { MethodologyPanel } from "@/components/methodology-panel";
import { SourceRegistry } from "@/components/source-registry";
import { CredibilityPanel } from "@/components/credibility-panel";
import { ProgramScale } from "@/components/program-scale";
import { RiskSection } from "@/components/risk-section";
import { Timeline } from "@/components/timeline";
import { Charts } from "@/components/charts";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MetricsStrip />
        <ExplanationSection />
        <MethodologyPanel />
        <SourceRegistry />
        <CredibilityPanel />
        <ProgramScale />
        <RiskSection />
        <Timeline />
        <Charts />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
