import type { PhaseConfig } from "./types";

/**
 * Compute the total number of seconds in a phase.
 */
export function getTotalSeconds(phase: PhaseConfig): number {
  const start = new Date(phase.startDate).getTime();
  const end = new Date(phase.endDate).getTime();
  return (end - start) / 1000;
}

/**
 * Compute the rate per second for a given phase.
 */
export function getRatePerSecond(phase: PhaseConfig): number {
  return phase.totalAmount / getTotalSeconds(phase);
}

/**
 * Compute elapsed seconds since phase start, clamped to [0, totalSeconds].
 */
export function getElapsedSeconds(phase: PhaseConfig, now: Date): number {
  const start = new Date(phase.startDate).getTime();
  const end = new Date(phase.endDate).getTime();
  const current = now.getTime();
  if (current < start) return 0;
  if (current > end) return (end - start) / 1000;
  return (current - start) / 1000;
}

/**
 * Compute the estimated amount for a single phase at a given time.
 */
export function getPhaseEstimate(phase: PhaseConfig, now: Date): number {
  const elapsed = getElapsedSeconds(phase, now);
  const rate = getRatePerSecond(phase);
  return elapsed * rate;
}

/**
 * Determine if a phase is complete at a given time.
 */
export function isPhaseComplete(phase: PhaseConfig, now: Date): boolean {
  return now.getTime() >= new Date(phase.endDate).getTime();
}

/**
 * Determine if a phase is active (started but not completed).
 */
export function isPhaseActive(phase: PhaseConfig, now: Date): boolean {
  const start = new Date(phase.startDate).getTime();
  const end = new Date(phase.endDate).getTime();
  const current = now.getTime();
  return current >= start && current <= end;
}

/**
 * Compute cumulative estimate across all phases.
 */
export function getCumulativeEstimate(
  phases: PhaseConfig[],
  now: Date
): number {
  return phases.reduce((sum, phase) => sum + getPhaseEstimate(phase, now), 0);
}

/**
 * Compute breakdown of rates for a phase.
 */
export function getPhaseRates(phase: PhaseConfig) {
  const perSecond = getRatePerSecond(phase);
  return {
    perSecond,
    perMinute: perSecond * 60,
    perHour: perSecond * 3600,
    perDay: perSecond * 86400,
  };
}

/**
 * Return the currently active phase, or the last completed phase.
 */
export function getCurrentPhase(
  phases: PhaseConfig[],
  now: Date
): PhaseConfig | undefined {
  return (
    phases.find((p) => isPhaseActive(p, now)) ||
    [...phases].reverse().find((p) => isPhaseComplete(p, now))
  );
}
