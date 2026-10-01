/**
 * Ki-Sho-Ten-Ketsu narrative framework for HokageChess videos.
 * Structures chess content as four-act stories.
 */

export type NarrativeAct = "ki" | "sho" | "ten" | "ketsu";

export type QuarterlyArc =
  | "climb_from_chaos"
  | "rival_wars"
  | "redemption_arc"
  | "authority_established";

export interface ActTimestamp {
  act: NarrativeAct;
  start_seconds: number;
  end_seconds: number;
  description: string;
}

export interface NarrativeStructure {
  video_id: string;
  arc: QuarterlyArc;
  acts: ActTimestamp[];
  has_rival: boolean;
  has_confession: boolean;
  total_duration_seconds: number;
}

export interface ArcPlan {
  arc: QuarterlyArc;
  description: string;
  video_count: number;
  key_beats: string[];
}

/**
 * Default narrative guidelines for each act.
 */
export const ACT_GUIDELINES: Record<NarrativeAct, { purpose: string; timing: string }> = {
  ki: {
    purpose: "Flashforward to dramatic moment — hook the viewer",
    timing: "0:00-0:10",
  },
  sho: {
    purpose: "Build context and stakes — explain the opponent, the position, the history",
    timing: "0:10-3:00",
  },
  ten: {
    purpose: "The twist — the critical moment the viewer didn't see coming",
    timing: "3:00-7:00",
  },
  ketsu: {
    purpose: "Resolution and reflection — what was learned, what comes next",
    timing: "7:00+",
  },
};

/**
 * Create a narrative structure for a video.
 */
export function createNarrative(params: {
  video_id: string;
  arc: QuarterlyArc;
  total_duration_seconds: number;
  has_rival: boolean;
  has_confession: boolean;
}): NarrativeStructure {
  const d = Math.max(0, params.total_duration_seconds);

  const t0 = 0;
  const t1 = Math.min(10, d);
  const t2 = Math.min(Math.max(t1, Math.floor(d * 0.35)), d);
  const t3 = Math.min(Math.max(t2, Math.floor(d * 0.75)), d);
  const t4 = d;

  const acts: ActTimestamp[] = [
    { act: "ki", start_seconds: t0, end_seconds: t1, description: "Hook" },
    { act: "sho", start_seconds: t1, end_seconds: t2, description: "Setup" },
    { act: "ten", start_seconds: t2, end_seconds: t3, description: "Twist" },
    { act: "ketsu", start_seconds: t3, end_seconds: t4, description: "Resolution" },
  ];

  return {
    video_id: params.video_id,
    arc: params.arc,
    acts,
    has_rival: params.has_rival,
    has_confession: params.has_confession,
    total_duration_seconds: params.total_duration_seconds,
  };
}

/**
 * Validate that a narrative structure covers the full video duration
 * and acts are in order.
 */
export function validateNarrative(narrative: NarrativeStructure): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const { acts, total_duration_seconds } = narrative;

  if (total_duration_seconds < 0) {
    errors.push("Total duration cannot be negative");
  }

  if (acts.length !== 4) {
    errors.push(`Expected 4 acts, found ${acts.length}`);
  }

  const expected_order: NarrativeAct[] = ["ki", "sho", "ten", "ketsu"];
  for (let i = 0; i < acts.length; i++) {
    if (acts[i]?.act !== expected_order[i]) {
      errors.push(`Act ${i + 1} should be ${expected_order[i]}, found ${acts[i]?.act}`);
    }
  }

  for (let i = 0; i < acts.length; i++) {
    const act = acts[i];
    if (!act) continue;
    if (act.start_seconds < 0 || act.end_seconds < 0) {
      errors.push(`Act ${i + 1} has negative timestamps`);
    }
    if (act.start_seconds > act.end_seconds) {
      errors.push(`Act ${i + 1} start_seconds exceeds end_seconds`);
    }
    if (act.start_seconds > total_duration_seconds || act.end_seconds > total_duration_seconds) {
      errors.push(`Act ${i + 1} exceeds total duration`);
    }
  }

  if (acts.length > 0 && acts[0].start_seconds !== 0) {
    errors.push("First act must start at 0");
  }

  if (acts.length > 0 && acts[acts.length - 1].end_seconds !== total_duration_seconds) {
    errors.push("Last act must end at total duration");
  }

  for (let i = 1; i < acts.length; i++) {
    if (acts[i].start_seconds < acts[i - 1].end_seconds) {
      errors.push(`Act ${i + 1} overlaps with act ${i}`);
    }
    if (acts[i].start_seconds > acts[i - 1].end_seconds) {
      errors.push(`Act ${i + 1} has a gap after act ${i}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Generate chapter timestamps in YouTube format from a narrative.
 */
export function generateChapters(narrative: NarrativeStructure): string {
  return narrative.acts
    .map((act) => {
      const mins = Math.floor(act.start_seconds / 60);
      const secs = act.start_seconds % 60;
      const timestamp = `${mins}:${secs.toString().padStart(2, "0")}`;
      return `${timestamp} ${act.description}`;
    })
    .join("\n");
}

/**
 * Get the quarterly arc plan.
 */
export function getArcPlan(arc: QuarterlyArc): ArcPlan {
  const plans: Record<QuarterlyArc, ArcPlan> = {
    climb_from_chaos: {
      arc: "climb_from_chaos",
      description: "Establishing the journey from struggle to first breakthrough",
      video_count: 12,
      key_beats: [
        "Current struggles (videos 1-3)",
        "Training + first rival (videos 4-8)",
        "Major loss or breakthrough (videos 9-10)",
        "New goal set (videos 11-12)",
      ],
    },
    rival_wars: {
      arc: "rival_wars",
      description: "Head-to-head competition driving engagement",
      video_count: 12,
      key_beats: [
        "New rival introduced (videos 1-2)",
        "Head-to-head matches (videos 3-8)",
        "Unexpected outcome (video 9)",
        "Rematch announced (videos 10-12)",
      ],
    },
    redemption_arc: {
      arc: "redemption_arc",
      description: "Overcoming setback through dedicated training",
      video_count: 12,
      key_beats: [
        "Setback/doubt (videos 1-3)",
        "Training montage (videos 4-8)",
        "Climactic match (videos 9-11)",
        "Victory + new challenge (video 12)",
      ],
    },
    authority_established: {
      arc: "authority_established",
      description: "Recognized voice in the community with sustainable revenue",
      video_count: 12,
      key_beats: [
        "Milestone celebration (videos 1-2)",
        "Teaching advanced concepts (videos 3-7)",
        "Community collaboration (videos 8-10)",
        "Looking ahead / Season 2 tease (videos 11-12)",
      ],
    },
  };

  return plans[arc];
}
