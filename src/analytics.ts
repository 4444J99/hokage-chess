/**
 * Analytics calculation helpers for HokageChess.
 * Classifies caller-supplied CTR, retention, subscriber, and weekly values.
 */

export interface VideoMetrics {
  video_id: string;
  title: string;
  published_at: Date;
  impressions: number;
  clicks: number;
  views: number;
  retention_30s: number;
  avg_view_duration_seconds: number;
  likes: number;
  comments: number;
  subscribers_gained: number;
}

export interface WeeklyScorecard {
  week_start: Date;
  total_views: number;
  avg_ctr: number;
  avg_retention_30s: number;
  subscribers_gained: number;
  videos_published: number;
  best_video: string | null;
  worst_video: string | null;
  status: "on_track" | "watch" | "needs_fix";
}

export interface PhaseGate {
  phase: string;
  criteria: { label: string; target: number; actual: number; passed: boolean }[];
  verdict: "go" | "continue_with_adjustments" | "pause_and_audit";
}

/**
 * Calculate CTR (Click-Through Rate) as a percentage.
 */
export function calculateCTR(impressions: number, clicks: number): number {
  if (impressions <= 0) return 0;
  return Math.round((clicks / impressions) * 10000) / 100;
}

/**
 * Assess CTR health based on HokageChess targets.
 */
export function assessCTR(ctr: number): "healthy" | "watch" | "critical" {
  if (ctr >= 5) return "healthy";
  if (ctr >= 3) return "watch";
  return "critical";
}

/**
 * Assess retention health.
 */
export function assessRetention(retention_30s: number): "healthy" | "watch" | "critical" {
  if (retention_30s >= 50) return "healthy";
  if (retention_30s >= 40) return "watch";
  return "critical";
}

/**
 * Generate a weekly scorecard from video metrics.
 */
export function generateWeeklyScorecard(
  metrics: VideoMetrics[],
  week_start: Date,
  subscriber_target: number = 10
): WeeklyScorecard {
  if (metrics.length === 0) {
    return {
      week_start,
      total_views: 0,
      avg_ctr: 0,
      avg_retention_30s: 0,
      subscribers_gained: 0,
      videos_published: 0,
      best_video: null,
      worst_video: null,
      status: "needs_fix",
    };
  }

  const total_views = metrics.reduce((s, m) => s + m.views, 0);
  const total_impressions = metrics.reduce((s, m) => s + m.impressions, 0);
  const total_clicks = metrics.reduce((s, m) => s + m.clicks, 0);
  const avg_ctr = calculateCTR(total_impressions, total_clicks);
  const avg_retention_30s =
    metrics.reduce((s, m) => s + m.retention_30s, 0) / metrics.length;
  const subscribers_gained = metrics.reduce((s, m) => s + m.subscribers_gained, 0);

  const sorted_by_views = [...metrics].sort((a, b) => b.views - a.views);
  const best_video = sorted_by_views[0]?.title ?? null;
  const worst_video = sorted_by_views[sorted_by_views.length - 1]?.title ?? null;

  const ctr_health = assessCTR(avg_ctr);
  const retention_health = assessRetention(avg_retention_30s);
  const sub_health = subscribers_gained >= subscriber_target;

  let status: "on_track" | "watch" | "needs_fix";
  if (ctr_health === "healthy" && retention_health === "healthy" && sub_health) {
    status = "on_track";
  } else if (ctr_health === "critical" || retention_health === "critical") {
    status = "needs_fix";
  } else {
    status = "watch";
  }

  return {
    week_start,
    total_views,
    avg_ctr: Math.round(avg_ctr * 100) / 100,
    avg_retention_30s: Math.round(avg_retention_30s * 100) / 100,
    subscribers_gained,
    videos_published: metrics.length,
    best_video,
    worst_video,
    status,
  };
}

/**
 * Evaluate a phase gate (end-of-quarter checkpoint).
 */
export function evaluatePhaseGate(
  phase: string,
  criteria: { label: string; target: number; actual: number }[]
): PhaseGate {
  const evaluated = criteria.map((c) => ({
    ...c,
    passed: c.actual >= c.target,
  }));

  const passed_count = evaluated.filter((c) => c.passed).length;

  let verdict: "go" | "continue_with_adjustments" | "pause_and_audit";
  if (passed_count >= criteria.length - 1) {
    verdict = "go";
  } else if (passed_count >= Math.floor(criteria.length / 2)) {
    verdict = "continue_with_adjustments";
  } else {
    verdict = "pause_and_audit";
  }

  return { phase, criteria: evaluated, verdict };
}

/**
 * Detect red flags that require immediate action.
 */
export function detectRedFlags(
  scorecards: WeeklyScorecard[]
): { flag: string; action: string }[] {
  const flags: { flag: string; action: string }[] = [];

  // Check last 2 weeks for CTR < 3%
  const recent = scorecards.slice(-2);
  if (recent.length >= 2 && recent.every((s) => s.avg_ctr < 3)) {
    flags.push({
      flag: "CTR below 3% for 2+ weeks",
      action: "Stop uploading. Test 5 new thumbnail designs.",
    });
  }

  // Check retention
  if (recent.length >= 1 && recent[recent.length - 1].avg_retention_30s < 40) {
    flags.push({
      flag: "Retention below 40% at 30 seconds",
      action: "Hook is broken. Rewrite first 30 seconds.",
    });
  }

  // Check subscriber stagnation (4+ weeks)
  const last4 = scorecards.slice(-4);
  if (last4.length >= 4 && last4.every((s) => s.subscribers_gained === 0)) {
    flags.push({
      flag: "Zero subscriber growth for 4+ weeks",
      action: "Major visibility problem. Do 1 collaboration.",
    });
  }

  return flags;
}
