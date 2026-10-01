import {
  createNarrative,
  validateNarrative,
  generateChapters,
  getArcPlan,
  ACT_GUIDELINES,
} from "../src/narrative";

describe("ACT_GUIDELINES", () => {
  it("should have all 4 acts", () => {
    expect(Object.keys(ACT_GUIDELINES)).toEqual(["ki", "sho", "ten", "ketsu"]);
  });

  it("should have purpose and timing for each act", () => {
    for (const act of Object.values(ACT_GUIDELINES)) {
      expect(act.purpose).toBeTruthy();
      expect(act.timing).toBeTruthy();
    }
  });
});

describe("createNarrative", () => {
  it("should create a 4-act narrative structure", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: 600,
      has_rival: true,
      has_confession: true,
    });

    expect(narrative.acts).toHaveLength(4);
    expect(narrative.acts[0].act).toBe("ki");
    expect(narrative.acts[3].act).toBe("ketsu");
    expect(narrative.has_rival).toBe(true);
  });

  it("should set ki act to first 10 seconds for 600s video", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "rival_wars",
      total_duration_seconds: 600,
      has_rival: false,
      has_confession: false,
    });

    expect(narrative.acts[0].start_seconds).toBe(0);
    expect(narrative.acts[0].end_seconds).toBe(10);
  });

  it.each([0, 1, 10, 28, 29, 600])(
    "should create a valid narrative with monotonic boundaries for duration %i seconds",
    (duration) => {
      const narrative = createNarrative({
        video_id: "test",
        arc: "rival_wars",
        total_duration_seconds: duration,
        has_rival: false,
        has_confession: false,
      });

      for (const act of narrative.acts) {
        expect(act.start_seconds).toBeLessThanOrEqual(act.end_seconds);
      }

      for (let i = 1; i < narrative.acts.length; i++) {
        expect(narrative.acts[i].start_seconds).toBe(narrative.acts[i - 1].end_seconds);
      }

      expect(narrative.acts[0].start_seconds).toBe(0);
      expect(narrative.acts[3].end_seconds).toBe(duration);

      const validation = validateNarrative(narrative);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    }
  );

  it("should construct expected intervals for short durations 5, 10, 28, and 29 seconds", () => {
    const n5 = createNarrative({
      video_id: "v5",
      arc: "rival_wars",
      total_duration_seconds: 5,
      has_rival: false,
      has_confession: false,
    });
    expect(n5.acts.map((a) => [a.start_seconds, a.end_seconds])).toEqual([
      [0, 5],
      [5, 5],
      [5, 5],
      [5, 5],
    ]);

    const n10 = createNarrative({
      video_id: "v10",
      arc: "rival_wars",
      total_duration_seconds: 10,
      has_rival: false,
      has_confession: false,
    });
    expect(n10.acts.map((a) => [a.start_seconds, a.end_seconds])).toEqual([
      [0, 10],
      [10, 10],
      [10, 10],
      [10, 10],
    ]);

    const n28 = createNarrative({
      video_id: "v28",
      arc: "rival_wars",
      total_duration_seconds: 28,
      has_rival: false,
      has_confession: false,
    });
    expect(n28.acts.map((a) => [a.start_seconds, a.end_seconds])).toEqual([
      [0, 10],
      [10, 10],
      [10, 21],
      [21, 28],
    ]);

    const n29 = createNarrative({
      video_id: "v29",
      arc: "rival_wars",
      total_duration_seconds: 29,
      has_rival: false,
      has_confession: false,
    });
    expect(n29.acts.map((a) => [a.start_seconds, a.end_seconds])).toEqual([
      [0, 10],
      [10, 10],
      [10, 21],
      [21, 29],
    ]);
  });
});

describe("validateNarrative", () => {
  it("should validate a correct narrative", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: 600,
      has_rival: false,
      has_confession: false,
    });

    const result = validateNarrative(narrative);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should catch wrong act order", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: 600,
      has_rival: false,
      has_confession: false,
    });

    // Swap acts
    const temp = narrative.acts[1];
    narrative.acts[1] = narrative.acts[2];
    narrative.acts[2] = temp;

    const result = validateNarrative(narrative);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("should reject backwards intervals", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: 10,
      has_rival: false,
      has_confession: false,
    });

    narrative.acts[1] = {
      act: "sho",
      start_seconds: 10,
      end_seconds: 3,
      description: "Setup",
    };

    const result = validateNarrative(narrative);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Act 2 start_seconds exceeds end_seconds");
  });

  it("should reject gapped intervals", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: 600,
      has_rival: false,
      has_confession: false,
    });

    narrative.acts[2].start_seconds = 220; // Gap between 210 and 220

    const result = validateNarrative(narrative);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Act 3 has a gap after act 2");
  });

  it("should reject overlapping intervals", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: 600,
      has_rival: false,
      has_confession: false,
    });

    narrative.acts[2].start_seconds = 200; // Overlap with 210

    const result = validateNarrative(narrative);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Act 3 overlaps with act 2");
  });

  it("should reject negative durations and out-of-range timestamps", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: -10,
      has_rival: false,
      has_confession: false,
    });

    const result = validateNarrative(narrative);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Total duration cannot be negative");
  });
});

describe("generateChapters", () => {
  it("should generate YouTube-format chapter timestamps", () => {
    const narrative = createNarrative({
      video_id: "v1",
      arc: "climb_from_chaos",
      total_duration_seconds: 600,
      has_rival: false,
      has_confession: false,
    });

    const chapters = generateChapters(narrative);
    expect(chapters).toContain("0:00 Hook");
    expect(chapters.split("\n")).toHaveLength(4);
  });
});

describe("getArcPlan", () => {
  it("should return plan for climb_from_chaos", () => {
    const plan = getArcPlan("climb_from_chaos");
    expect(plan.video_count).toBe(12);
    expect(plan.key_beats).toHaveLength(4);
  });

  it("should return plan for each arc type", () => {
    const arcs = [
      "climb_from_chaos",
      "rival_wars",
      "redemption_arc",
      "authority_established",
    ] as const;

    for (const arc of arcs) {
      const plan = getArcPlan(arc);
      expect(plan.arc).toBe(arc);
      expect(plan.description).toBeTruthy();
    }
  });
});
