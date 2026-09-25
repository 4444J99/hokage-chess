# Hokage Chess: a two-minute explanation

## What is this?

Hokage Chess is a prototype attempt to turn the recurring decisions behind a
chess creator's channel into an explicit system.

It combines two kinds of material:

- a strategy corpus about serial storytelling, creator identity, publishing
  discipline, measurement, and staged growth; and
- a small TypeScript library that represents selected rules from that strategy
  as functions and data structures.

This repository is the organized project record. It is not a chess game, a
finished creator dashboard, or a working automation service.

## What problem led to it?

A creator can see views, clicks, retention, and subscriber counts in platform
dashboards while still lacking a repeatable answer to questions such as:

- Which idea should become the next video?
- How should the video create stakes rather than merely present instruction?
- Which packaging choices should be reviewed before publishing?
- Which weekly numbers require a change in approach?
- Which growth assumptions are real, and which are simply targets?

Hokage Chess makes those choices explicit enough to inspect. The project does
not establish that its answers are correct or universally useful.

## What happens when someone uses it?

There is no end-user application to open today. A software developer can read
or call the TypeScript helpers after repairing the current build toolchain.

For example, the library can receive a proposed title and report whether it
matches the repository's configured emotion/stakes patterns and length limit.
It can receive manually supplied channel metrics and aggregate them into a
weekly scorecard. It can divide a proposed video duration into four narrative
acts.

Every input must be supplied by a caller. Nothing in the current repository
signs into YouTube, downloads Chess.com games, schedules a post, creates a
thumbnail, writes a video, or stores results.

## A concrete example

Suppose a creator is considering this title:

> I FINALLY Beat the 1500 Sicilian

The title-scoring function recognizes a configured emotional term (`FINALLY`),
a configured stakes pattern (`Beat` and `1500`), and a length below 60
characters. It returns a three-part pass score.

That result means only: “this title matches the repository's rule.” It does not
mean the title will achieve a particular click-through rate. The repository has
no experiment showing that it will.

## Why it matters

The useful idea is not that creativity should be surrendered to a formula. It
is that recurring editorial assumptions can be named, encoded, reviewed, and
replaced instead of operating invisibly.

The same distinction applies to metrics. A dashboard supplies numbers; a
decision model states what those numbers are supposed to change. Hokage Chess
begins to model the second layer while leaving its assumptions open to audit.

## What exists now

| State | What belongs here |
|---|---|
| **Present in source** | TypeScript helpers for title/thumbnail checks, idea selection, supplied-metric scorecards, growth arithmetic, and four-act narrative objects. |
| **Present as documentation** | Strategy, research, provenance, architecture decisions, an avatar canon, and governance material. |
| **Defined but not currently verified** | Six Jest test-suite files; the present `ts-jest`/TypeScript combination prevents them from running. |
| **Proposed** | Platform ingestion, automation, a usable creator interface, persistent history, and operational/commercial workflows. |
| **Not evidenced** | Product deployment, active users, revenue, channel growth, or improved content performance. |

The exact status is `PROTOTYPE` and `not-deployed`. The command-level reasons
are recorded in the [2026-08-31 audit](../evidence/audit-2026-08-31.md).

## Authorship in one paragraph

Anthony James Padavano owns and directs the project and is credited in history
for its initial repository, framing, source-material integration, architecture
records, and documentation. The commit that added the substantive TypeScript
modules and their tests explicitly records Claude Opus 4.6 as co-author. The
prototype is therefore presented as agent-assisted, owner-directed work.

## Where to go next

- [Inspect the actual architecture and verification state](technical.md)
- [Read the proposed operational workflow](business.md)
- [Check every material claim and limitation](../evidence/README.md)
- [Return to the canonical README](../../README.md)
