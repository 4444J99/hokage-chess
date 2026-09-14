# Hokage Chess

> A prototype TypeScript library that encodes content-planning, narrative,
> analytics, and growth heuristics for a chess creator without yet ingesting
> platform data or providing an end-user application.

[![Status: Prototype](https://img.shields.io/badge/status-prototype-orange)](project-record.yml)
[![Documentation class: B](https://img.shields.io/badge/docs-class%20B-blue)](project-record.yml)
[![Language: TypeScript](https://img.shields.io/badge/language-TypeScript-3178c6)](src/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[Two-minute explanation](docs/audiences/general.md) ·
[Technical inspection](docs/audiences/technical.md) ·
[Operational interpretation](docs/audiences/business.md) ·
[Evidence record](docs/evidence/README.md) ·
[Source](src/) · [Test source](tests/)

## What am I looking at?

This is the source repository and documented project record for Hokage Chess.
A repository is the organized collection of code, strategy documents, design
decisions, source materials, and revision history used to inspect how a project
was developed.

Hokage Chess is currently a **prototype library**, not an end-user product. The
repository contains TypeScript functions that model parts of a chess-content workflow, but it does not contain
the Python application, command-line interface, platform integrations,
dashboard, database, or operational deployment previously described here.

## Choose your reading path

| I am reading as… | Start here |
|---|---|
| A general or nontechnical reader | [What Hokage Chess is](docs/audiences/general.md) |
| A software engineer | [Actual architecture, interfaces, and verification state](docs/audiences/technical.md) |
| A creator, operator, or prospective client | [Proposed workflow and commercial boundaries](docs/audiences/business.md) |

Evaluators can use the [claim-level evidence record](docs/evidence/README.md),
the [revision history](https://github.com/4444J99/hokage-chess/commits/main),
and the technical inspection route together.

## Project at a glance

| | |
|---|---|
| **What it is** | A TypeScript library and strategy corpus for modeling chess-content decisions. |
| **Problem addressed** | Turning isolated content decisions into a repeatable narrative, review, and planning process. |
| **Current state** | `prototype`; substantive source modules exist, but there is no usable end-user application or verified deployment. |
| **Intended users** | Chess creators and content operators evaluating the model; engineers and evaluators inspecting the prototype. |
| **What Anthony built** | Project framing, repository and documentation architecture, strategy integration, and direction/integration of the TypeScript prototype. The core implementation commit records Claude Opus 4.6 as co-author. |
| **Evidence** | Five TypeScript source modules, six Jest suite files, provenance records, ADRs, and Git history. Current automated verification is blocked by toolchain conflicts. |
| **Known limitations** | No API clients, CLI, UI, persistence, authentication, production analytics, user-adoption evidence, or validated performance/outcome metrics. |

## Truth boundary

The current `main` branch supports a narrower claim than the earlier README.

| Capability | Current evidence | Boundary |
|---|---|---|
| Title, thumbnail, idea, checklist, and weekly-plan heuristics | [`src/content-strategy.ts`](src/content-strategy.ts) | Pure, caller-invoked functions; no content generation, scheduler, or platform connection. |
| CTR and retention classification, weekly scorecards, phase gates, and red flags | [`src/analytics.ts`](src/analytics.ts) | Operates only on metrics supplied by a caller; it does not fetch YouTube data. |
| Growth-target and revenue arithmetic | [`src/growth.ts`](src/growth.ts) | Encodes design assumptions and hard-coded targets; it does not track a real channel or income. |
| Ki-Shō-Ten-Ketsu structures and chapter labels | [`src/narrative.ts`](src/narrative.ts) | Produces data structures and strings; it does not analyze games or write scripts. |
| Automated tests | [`tests/`](tests/) | Test source exists, but the current TypeScript/`ts-jest` dependency combination prevents execution. |
| YouTube, Chess.com, Ko-fi, or scheduler integration | None in the current tree | Proposed only. |
| CLI, dashboard, backend, database, or packaged runtime | None in the current tree | Not implemented. |
| Product deployment, adoption, revenue, or channel-growth outcomes | No supporting record in the current tree | Not established. |

The full audit trail is in [the evidence record](docs/evidence/README.md).

## Canonical project documentation

### Project thesis

Hokage Chess explores a specific editorial proposition: chess content can be
structured as serial narrative and reviewed as a feedback system rather than
treated only as a sequence of isolated tutorials.

The strategy corpus connects four concerns:

1. **Narrative differentiation** — organize videos as continuing arcs with
   stakes, setbacks, rivals, and resolution.
2. **Decision heuristics** — make title, thumbnail, hook, and format choices
   inspectable rather than purely intuitive.
3. **Measurement discipline** — review caller-supplied click, retention, view,
   and subscriber data through explicit thresholds.
4. **Growth planning** — express milestones and revenue streams as a staged
   model whose assumptions can be challenged.

This is a design argument, not evidence that the model grows a channel or
produces revenue.

### Problem framing

The project began from three working hypotheses about independent chess
creators:

- instructional videos can become difficult to distinguish when their format,
  framing, and promise are interchangeable;
- platform dashboards provide measurements without necessarily producing a
  disciplined editorial decision loop;
- waiting for a single platform revenue threshold can make a creator's plan
  unnecessarily brittle.

Those hypotheses motivate the repository. They have not been validated here by
a market study, controlled content experiment, user cohort, or deployment
record.

### The four modeled domains

#### Content strategy

[`src/content-strategy.ts`](src/content-strategy.ts) implements deterministic
helpers for:

- checking a title for configured emotion/stakes patterns and a 60-character
  limit;
- scoring four boolean thumbnail criteria;
- ranking a caller-supplied video idea from `skip` through `must_make`;
- assembling an upload-readiness checklist; and
- selecting up to three long-form ideas and three shorts from supplied ideas.

These rules are editorial heuristics. The repository does not contain evidence
that they predict click-through rate or audience growth.

#### Analytics

[`src/analytics.ts`](src/analytics.ts) calculates click-through rate, assigns
configured CTR and 30-second-retention labels, aggregates supplied video
metrics into a weekly scorecard, evaluates caller-defined phase gates, and
returns red-flag messages for selected threshold conditions.

The module has no network client or ingestion layer. A consumer must obtain,
validate, and pass every metric into the library.

#### Growth

[`src/growth.ts`](src/growth.ts) defines four quarterly phase labels, target
objects, progress arithmetic, active-stream revenue sums, a simple annualized
revenue calculation, and a threshold check labeled for YouTube Partner Program
eligibility.

The values are repository assumptions, not live platform policy, forecasts, or
observed project results. They must be revalidated before operational use.

#### Narrative

[`src/narrative.ts`](src/narrative.ts) adapts Ki-Shō-Ten-Ketsu into four timed
segments—introduction, development, twist, and conclusion—and defines four
serial arc plans. It can construct and validate a narrative object and render
chapter timestamps.

The formal choice preserves the project's strongest original idea: a chess
video can be treated as narrative media. The code formalizes that idea without
claiming that one structure is universally optimal.

## Actual architecture

```text
hokage-chess/
├── src/
│   ├── analytics.ts
│   ├── content-strategy.ts
│   ├── growth.ts
│   ├── narrative.ts
│   └── index.ts
├── tests/
│   ├── analytics.test.ts
│   ├── content-strategy.test.ts
│   ├── cross-client-bleed-guard.test.ts
│   ├── growth.test.ts
│   ├── index.test.ts
│   └── narrative.test.ts
├── docs/
│   ├── adr/
│   ├── audiences/
│   ├── business/
│   ├── evidence/
│   ├── governance/
│   ├── pitch/
│   ├── source-materials/
│   └── strategy/
├── project-record.yml
├── package.json
├── jest.config.js
└── tsconfig.json
```

The domain modules are synchronous and in-memory. The normal data path is:

```text
caller-supplied objects → pure TypeScript heuristics → returned objects/strings
```

There is no external service, event stream, storage layer, or UI in that path.

## Development and verification state

The declared package scripts are:

```bash
npm run build
npm test
npm run lint
npm run dev
```

They do **not** currently form a clean quick start. A fresh audit on 2026-08-31
found:

| Check | Observed result |
|---|---|
| `npm ci` | Fails dependency resolution because TypeScript 7 conflicts with the declared `@typescript-eslint` peer range. |
| `npm ci --legacy-peer-deps` | Installs dependencies as a diagnostic workaround. |
| `npm test -- --runInBand` | Fails before running tests because `ts-jest` cannot use the installed TypeScript 7 compiler API. |
| `npm run build` | Fails because `console` is not provided by the configured `ES2022` library set. |
| `npm run lint` | Fails because ESLint 10 cannot find a flat configuration file. |

The GitHub Actions workflow currently treats several quality failures as
non-blocking. A green workflow should therefore not be read as proof that the
current source passes tests or builds.

See the [technical edition](docs/audiences/technical.md) for interfaces,
failure modes, security boundaries, and the repair sequence.

## Function-level example

This example describes the source interface; it is not a claim that the package
currently builds or is published to npm.

```ts
import { scoreTitleFormula } from "./src/content-strategy";

const result = scoreTitleFormula("I FINALLY Beat the 1500 Sicilian");
// { score: 3, has_emotion: true, has_stakes: true, length_ok: true, feedback: [] }
```

## Proposed operating model

The existing strategy documents describe a staged creator workflow. Every row
below remains proposed until supported by operational evidence.

| Stage | Proposed activity | Current repository support |
|---|---|---|
| Editorial planning | Rank ideas, plan an arc, prepare upload checks | Partial: deterministic helpers only |
| Measurement review | Import platform metrics and produce a scorecard | Partial: scorecard calculation; no import |
| Growth review | Compare supplied values with phase assumptions | Partial: arithmetic and labels only |
| Monetization | Track coaching, community, ads, and sponsorships | Proposed: data types and simple sums only |
| Automation | Connect platform APIs, persistence, and a user interface | Not implemented |

The operational and commercial interpretation is developed in
[the business edition](docs/audiences/business.md).

## Strategy and provenance materials

The repository preserves earlier project materials as a strategy corpus:

- [Avatar archetype canon](docs/business/2026-04-26-avatar-archetype.md)
- [Governance checklist](docs/strategy/HokageChess_Checklist_Governance.md)
- [Governance minimal](docs/strategy/HokageChess_Governance_Minimal.md)
- [Quick reference](docs/strategy/HokageChess_Quick_Reference.md)
- [Chess engine and GUI survey](docs/strategy/Chess%20Engine%20and%20GUI%20Survey.pdf)
- [Strategic growth blueprint](docs/strategy/Strategic%20Growth%20Blueprint%20for%20%40HokageChess.pdf)
- [Source-material provenance manifest](docs/source-materials/PROVENANCE.yaml)

These documents are inputs and design records. Their presence does not verify
that their recommendations were executed or that their projections occurred.

## Decisions, governance, and project record

- [ADR-001: TypeScript foundation](docs/adr/001-initial-architecture.md)
- [ADR-002: proposed cross-organ integration](docs/adr/002-integration-patterns.md)
- [Client-separation substrate](docs/governance/client-separation-substrate.md)
- [Canonical factual record](project-record.yml)
- [Claim-level evidence and limitations](docs/evidence/README.md)

## Authorship boundary

Git history attributes the initial repository, long-form framing, source
material ingestion, architecture decisions, and later documentation work to
Anthony James Padavano and his repository identities. Commit
[`ed8b20b`](https://github.com/4444J99/hokage-chess/commit/ed8b20bca0934193c3e39f73712f6a1a05ade0d7),
which introduced the substantive TypeScript modules and their test files,
records Claude Opus 4.6 as co-author. The project therefore presents the
prototype as agent-assisted work directed and integrated by Anthony, not as an
unassisted implementation claim.

## Roadmap from helper prototype to usable product

1. Reconcile the TypeScript, `ts-jest`, Jest, and ESLint versions.
2. Restore a clean install, build, lint, and test predicate that fails closed.
3. Add boundary and invalid-input tests to the heuristic functions.
4. Decide whether the deliverable is a library, CLI, web application, or a
   smaller combination; implement only the selected surface.
5. Add external adapters, persistence, authentication, and secret handling only
   if the selected surface requires them.
6. Validate editorial thresholds and platform-policy assumptions against dated
   sources and real, consented data.
7. Claim deployment, adoption, or outcomes only after an inspectable record
   exists.

## Contributing

Open an issue before making a large change. Contributions should keep proposed
capabilities distinct from implemented ones, add tests for behavior changes,
and update both [`project-record.yml`](project-record.yml) and the
[evidence record](docs/evidence/README.md) when a material claim changes.

## License and author

Licensed under the [MIT License](LICENSE).

Project owner: [Anthony James Padavano / @4444J99](https://github.com/4444J99).
Hokage Chess participates in ORGANVM's ORGAN III (Commerce) context, but its
current implementation status remains `prototype`.
