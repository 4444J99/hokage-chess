/**
 * Growth-target and monetization arithmetic helpers for HokageChess.
 * Four-phase model with configured targets and simple revenue calculations.
 */

export type GrowthPhase = "q1_setup" | "q2_rivals" | "q3_redemption" | "q4_authority";

export interface GrowthTarget {
  phase: GrowthPhase;
  subscriber_start: number;
  subscriber_target: number;
  monthly_views_target: number;
  ctr_target: number;
  revenue_target: number;
}

export interface RevenueStream {
  source: "ads" | "kofi" | "coaching" | "sponsorship" | "memberships";
  monthly_amount: number;
  active: boolean;
}

export interface GrowthSnapshot {
  date: Date;
  subscribers: number;
  monthly_views: number;
  avg_ctr: number;
  revenue_streams: RevenueStream[];
  current_phase: GrowthPhase;
}

/**
 * Default quarterly targets from the HokageChess growth plan.
 */
export const QUARTERLY_TARGETS: GrowthTarget[] = [
  {
    phase: "q1_setup",
    subscriber_start: 33,
    subscriber_target: 250,
    monthly_views_target: 500,
    ctr_target: 5,
    revenue_target: 50,
  },
  {
    phase: "q2_rivals",
    subscriber_start: 250,
    subscriber_target: 1000,
    monthly_views_target: 3000,
    ctr_target: 6,
    revenue_target: 300,
  },
  {
    phase: "q3_redemption",
    subscriber_start: 1000,
    subscriber_target: 3500,
    monthly_views_target: 10000,
    ctr_target: 6,
    revenue_target: 450,
  },
  {
    phase: "q4_authority",
    subscriber_start: 3500,
    subscriber_target: 10000,
    monthly_views_target: 20000,
    ctr_target: 6,
    revenue_target: 1000,
  },
];

/**
 * Determine which growth phase applies based on subscriber count.
 */
export function determinePhase(subscribers: number): GrowthPhase {
  if (subscribers >= 3500) return "q4_authority";
  if (subscribers >= 1000) return "q3_redemption";
  if (subscribers >= 250) return "q2_rivals";
  return "q1_setup";
}

/**
 * Get the target for a given phase.
 */
export function getTarget(phase: GrowthPhase): GrowthTarget {
  const target = QUARTERLY_TARGETS.find((t) => t.phase === phase);
  if (!target) throw new Error(`Unknown phase: ${phase}`);
  return target;
}

/**
 * Calculate progress toward current phase targets (0-100%).
 */
export function calculateProgress(snapshot: GrowthSnapshot): {
  subscriber_progress: number;
  views_progress: number;
  revenue_progress: number;
  overall: number;
} {
  const target = getTarget(snapshot.current_phase);

  const sub_range = target.subscriber_target - target.subscriber_start;
  const sub_progress = sub_range > 0
    ? Math.min(100, Math.round(((snapshot.subscribers - target.subscriber_start) / sub_range) * 100))
    : 100;

  const views_progress = Math.min(
    100,
    Math.round((snapshot.monthly_views / target.monthly_views_target) * 100)
  );

  const total_revenue = snapshot.revenue_streams
    .filter((r) => r.active)
    .reduce((s, r) => s + r.monthly_amount, 0);
  const revenue_progress = target.revenue_target > 0
    ? Math.min(100, Math.round((total_revenue / target.revenue_target) * 100))
    : 100;

  const overall = Math.round((sub_progress + views_progress + revenue_progress) / 3);

  return {
    subscriber_progress: Math.max(0, sub_progress),
    views_progress,
    revenue_progress,
    overall,
  };
}

/**
 * Calculate total monthly revenue.
 */
export function totalRevenue(streams: RevenueStream[]): number {
  return streams.filter((s) => s.active).reduce((sum, s) => sum + s.monthly_amount, 0);
}

/**
 * Project annual revenue based on current streams.
 */
export function projectAnnualRevenue(streams: RevenueStream[]): number {
  return totalRevenue(streams) * 12;
}

/**
 * Determine if YPP (YouTube Partner Program) eligibility criteria are met.
 * Requires 1000 subscribers and 4000 watch hours (approximated from views).
 */
export function checkYPPEligibility(
  subscribers: number,
  total_watch_hours: number
): { eligible: boolean; subscribers_ok: boolean; watch_hours_ok: boolean } {
  return {
    eligible: subscribers >= 1000 && total_watch_hours >= 4000,
    subscribers_ok: subscribers >= 1000,
    watch_hours_ok: total_watch_hours >= 4000,
  };
}
