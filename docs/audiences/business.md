# Hokage Chess: operational and business edition

## Existing operational problem

Hokage Chess begins from a proposed creator-operations problem: a small chess
channel may possess ideas, footage, platform metrics, and ambitions without a
repeatable system connecting them.

The friction appears between activities:

- a game happens, but no rule identifies whether it contains a usable story;
- a video is planned, but packaging choices remain implicit;
- platform metrics arrive, but review does not produce a clear next action;
- milestones are named, but assumptions and evidence are mixed together; and
- monetization ideas accumulate without an operating sequence.

This is the repository's design hypothesis. It is not supported here by a user
study, customer cohort, or deployment record.

## Who experiences it

The intended operator is an independent or small-team chess creator building a
serial public practice. The strategy documents especially imagine a near-peer
creator whose authority comes from a visible climb rather than grandmaster
status: games, losses, corrections, rating milestones, training blocks, and
community participation become recurring story material.

No current user, customer, or buyer is established by the repository evidence.

## Current workaround

A plausible current workflow uses a mix of notebooks or spreadsheets, platform
dashboards, memory, ad hoc title/thumbnail choices, and manual weekly review.
That description is an inferred market workflow, not a documented observation
from a deployed Hokage Chess engagement.

## Proposed changed workflow

If developed into an operational system, Hokage Chess could connect the work in
five steps:

1. Enter candidate games, formats, stakes, rival/twist flags, and content ideas.
2. Apply explicit editorial checks while leaving the creator as final decision
   maker.
3. Organize selected ideas into a serial narrative arc and publishing plan.
4. Import consented platform metrics after publication and compute a review.
5. Record which assumption or packaging choice will change next.

Only fragments of steps 2, 3, and 4 exist as TypeScript calculations. There is
no interface, data import, saved plan, or closed feedback loop.

## Inputs and outputs

| Workflow area | Inputs today | Outputs today | Missing operational layer |
|---|---|---|---|
| Idea review | Caller-created `VideoIdea` objects and boolean judgments | Scores, verdicts, and up to three long-form/three short selections | Intake UI, evidence for the boolean judgments, dates, ownership, and persistence |
| Packaging review | Title string and four caller-supplied thumbnail booleans | Rule-match score and checklist flags | Image analysis, experimentation, variant history, and actual performance linkage |
| Narrative planning | Duration, fixed arc label, and two flags | Four timed act records or a fixed 12-video arc plan | Game/story extraction, editor workflow, revision history, and quality evaluation |
| Weekly analytics | Caller-supplied video metrics | Aggregate scorecard and configured alerts | Platform connectors, validation, provenance, time filtering, dashboards, and action tracking |
| Growth review | Caller-supplied snapshot and revenue-stream values | Phase label, percentage arithmetic, sums, and annualization | Policy freshness, forecasting, accounting integration, uncertainty, and decisions |

## Integration requirements

### Current integration

There is no deployable integration contract. A developer would first need to
repair the TypeScript toolchain and then embed the functions directly in another
application. The package is not established as published, buildable, or
supported.

### Required for a usable pilot

A bounded pilot would need at least:

- one authenticated data source or an explicit manual CSV/form intake;
- a dated metric schema with source and freshness fields;
- persistent plans, measurements, rule versions, and decision notes;
- a creator-facing review surface;
- human approval before any publishing or outreach;
- a clear definition of the pilot's user, duration, and success/failure
  criteria; and
- a toolchain and CI predicate that passes from a fresh checkout.

No Chess.com, YouTube, Ko-fi, sponsorship, scheduler, or social-platform adapter
currently exists.

## Business model status

The strategy corpus discusses multiple possible revenue streams—community,
coaching, platform ads, and sponsorships—and a staged growth model. In the
current code, these appear only as labels, target constants, and arithmetic over
caller-supplied numbers.

| Business element | Status |
|---|---|
| Creator content system | Proposed |
| Software product or SaaS | Not implemented |
| Consulting/service workflow | Possible application; no engagement evidence in the current tree |
| Coaching/community offer | Strategy concept; no launch, customer, or revenue record |
| Ads/sponsorship tracking | Data labels only; no operational pipeline |
| Pricing, acquisition, conversion, retention, or unit economics | Not established |

## Risks and constraints

- **Heuristic risk:** simple scores may produce false confidence or homogenize
  creative choices.
- **Evidence risk:** goals and example numbers can be mistaken for observed
  results unless every surface preserves the prototype and no-deployment boundaries.
- **Platform risk:** API permissions, metric definitions, monetization policies,
  and rate limits change and require dated validation.
- **Data risk:** channel and game data may contain personal or commercially
  sensitive information; consent and retention policy are absent.
- **Brand risk:** the shonen/Naruto-adjacent visual vocabulary must remain
  directional rather than derivative; the avatar canon explicitly warns
  against copying protected designs or symbols.
- **Operational risk:** current install/build/test/lint failures make even a
  private technical pilot premature.
- **Outcome risk:** no repository evidence ties a rule to improved clicks,
  retention, subscribers, revenue, or creator sustainability.

## Current deployment status

`PROTOTYPE`; `not-deployed`.

The repository has a GitHub Pages workflow for documentation and a generated
pitch page, but the delivery manifest marks the web application `not_started`.
A published documentation page is not the proposed creator product.

## Evidence versus projected value

| Statement | Evidence state |
|---|---|
| The repository formalizes selected content, analytics, growth, and narrative rules in TypeScript. | Verified in source. |
| Those rules can support a coherent manual or software-assisted review process. | Proposed application. |
| The project integrates platform data or automates a creator workflow. | Not implemented. |
| The system improves content performance or reduces operating effort. | Unknown; no outcome study. |
| The system has users, customers, revenue, or a live product deployment. | Not established. |
| The model transfers to creators or industries beyond this chess context. | Proposed; not piloted here. |

The appropriate next business proof is not a larger projection. It is a small,
consented pilot with one creator, a fixed review cadence, manually auditable
inputs, predeclared measures, and a record of which decisions actually changed.
That pilot should begin only after the software verification predicate is
repaired.

## Technical appendix and evidence

- [Actual architecture and current failures](technical.md)
- [Claim-level evidence record](../evidence/README.md)
- [Command-level audit receipt](../evidence/audit-2026-08-31.md)
- [Canonical README](../../README.md)
- [Strategy materials and provenance](../../README.md#strategy-and-provenance-materials)
