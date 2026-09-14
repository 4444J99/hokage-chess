# Hokage Chess: technical edition

## Implementation status

Hokage Chess is a `PROTOTYPE`, not-deployed TypeScript library and strategy
corpus. The current `main` branch is not a Python project and does not provide a
CLI, API clients, server, browser UI, database, authentication, scheduler, or
published package.

Five source modules and six Jest suite files are tracked. The present dependency
and configuration set does not install, test, build, or lint cleanly. See the
[execution receipt](../evidence/audit-2026-08-31.md) before treating any CI badge
or test filename as verification.

## System architecture

The implemented code is a single-package, synchronous, in-memory library:

```text
caller-owned data
      ↓
typed domain objects
      ↓
deterministic calculations and configured heuristics
      ↓
returned objects, labels, arrays, or strings
```

There is no transport, storage, external service, event bus, background job, or
presentation layer.

## Components and boundaries

| Module | Exported behavior | Boundary |
|---|---|---|
| [`src/content-strategy.ts`](../../src/content-strategy.ts) | `scoreTitleFormula`, `scoreThumbnail`, `evaluateIdea`, `createUploadChecklist`, `planWeek` plus related types | No generation, image inspection, calendar persistence, platform publishing, or performance feedback. |
| [`src/analytics.ts`](../../src/analytics.ts) | `calculateCTR`, threshold labels, `generateWeeklyScorecard`, `evaluatePhaseGate`, `detectRedFlags` plus metric types | Caller supplies all data; no ingestion, schema validation, retention curves, visualization, or statistical analysis. |
| [`src/growth.ts`](../../src/growth.ts) | Fixed quarterly targets, phase selection, progress calculations, revenue aggregation/annualization, and a threshold check labeled for YPP | Hard-coded assumptions; no policy retrieval, forecasting model, revenue ledger, or live channel state. |
| [`src/narrative.ts`](../../src/narrative.ts) | Four-act construction/validation, chapter strings, and fixed arc plans | No game parsing, screenplay generation, semantic analysis, or editorial outcome evidence. |
| [`src/index.ts`](../../src/index.ts) | Version, console-printing `main`, and module re-exports | `main` is not wired to a package `bin`; the declared `dist` entrypoint is not produced by a successful fresh build. |
| [`scripts/check-cross-client-bleed.sh`](../../scripts/check-cross-client-bleed.sh) | Pre-commit scan for configured cross-client terms | Local Git hook safeguard, not a runtime product feature; its Jest wrapper is currently blocked with the rest of the suite. |

## Data flow and interfaces

### Content planning

`VideoIdea[]` → `evaluateIdea` → filtered/ranked arrays in `planWeek`.
`planWeek` accepts `week_start`, but the current function does not use that
argument. It returns selections only; it does not associate them with dates.

### Analytics

`VideoMetrics[]` → aggregate impressions/clicks/views/subscribers plus a simple
mean of supplied 30-second retention values → `WeeklyScorecard`.

The module does not verify that metrics share a week, that counts are
nonnegative, or that clicks do not exceed impressions. Dates are carried as
values rather than used to query or partition data.

### Growth

`GrowthSnapshot` → lookup of one hard-coded `GrowthTarget` → capped percentage
arithmetic. Revenue functions sum caller-supplied active streams and multiply a
monthly value by 12. This is arithmetic, not a forecast with uncertainty.

### Narrative

Caller-supplied duration and arc flags → four `ActTimestamp` values. Validation
checks act count/order, first/last boundaries, and overlap, but does not fully
validate negative durations, end-before-start segments, or gaps. Short-duration
edge cases need explicit tests and policy.

## Dependencies and requirements

`package.json` declares only development dependencies:

- TypeScript `^7.0.2`
- Jest `^30.4.2`
- `ts-jest` `^29.4.12`
- ESLint `^10.8.1`
- `@typescript-eslint` parser/plugin `^8.67.0`
- `@types/jest` `^30.0.0`

It declares no `engines`, runtime `dependencies`, `bin`, `exports`, or package
`files` field. CI lists Node 18, 20, and 22, but the current audit did not
establish support for any Node version because dependency compatibility fails
before meaningful verification.

## Install, build, and run

There is no successful fresh-checkout quick start at the audited head. To
reproduce the current state:

```bash
git clone https://github.com/4444J99/hokage-chess.git
cd hokage-chess
npm ci
```

The final command currently stops with `ERESOLVE`. This diagnostic workaround
installs dependencies without making them compatible:

```bash
npm ci --legacy-peer-deps
```

After that workaround, the declared checks still fail:

```bash
npm test -- --runInBand
npm run build
npm run lint
```

Do not present `npm ci --legacy-peer-deps` as the final installation contract.
The correct repair is to select compatible TypeScript/Jest/`ts-jest`/ESLint
versions and then commit a fail-closed predicate.

## Tests and verification

Test-source coverage by file:

| Test suite | Intended coverage |
|---|---|
| [`analytics.test.ts`](../../tests/analytics.test.ts) | Basic CTR/retention labels, scorecards, phase gates, and red flags. |
| [`content-strategy.test.ts`](../../tests/content-strategy.test.ts) | Title/thumbnail scores, idea verdicts, checklists, and selection. |
| [`growth.test.ts`](../../tests/growth.test.ts) | Phase boundaries, targets, progress, revenue sums, annualization, and eligibility booleans. |
| [`narrative.test.ts`](../../tests/narrative.test.ts) | Four-act structure/order, chapters, and arc lookup. |
| [`index.test.ts`](../../tests/index.test.ts) | Version and console output. |
| [`cross-client-bleed-guard.test.ts`](../../tests/cross-client-bleed-guard.test.ts) | Staged-content guard behavior in temporary Git repositories. |

Audit result on 2026-08-31: six suites failed during transformation and zero
tests ran because `ts-jest` cannot consume the installed TypeScript 7 compiler.

The CI workflow is not a reliable substitute: it uses `continue-on-error` for
some checks and shell fallbacks that convert test/build failures to notices.

## Observability and failure modes

The library has no logging, telemetry, tracing, persistence, audit ledger, or
error taxonomy. Most domain functions return synchronously and do not throw for
ordinary inputs. This keeps the prototype small but creates several risks:

- invalid or impossible numeric values can enter calculations;
- policy and editorial thresholds are embedded in source rather than versioned
  configuration;
- aggregate labels can imply authority that their simple rules do not possess;
- missing data and zero activity can be collapsed into the same result;
- the source does not preserve which rule version produced an earlier result;
- the package has no runtime health or data-freshness concept.

## Security and human-approval boundaries

The current domain modules make no network requests, handle no credentials, and
perform no external mutation. Their security exposure is therefore primarily
dependency/build integrity and the risk of treating unvalidated inputs as
decision-grade data.

The repository also includes a cross-client Git-hook guard. That safeguard is a
repository-governance control, not evidence of product authentication or tenant
isolation.

Any future platform adapter should add, before deployment:

- explicit OAuth/token custody and least-privilege scopes;
- consent and data-retention rules for channel/game data;
- schema validation and provenance on ingested metrics;
- human approval before publishing, outreach, or monetary actions;
- audit records that distinguish recommendations from executed changes; and
- rate-limit, retry, revocation, and partial-failure behavior.

## Known technical debt and repair order

1. Select a compatible TypeScript and test-transform stack.
2. Add an ESLint flat configuration or pin a compatible ESLint contract.
3. Add Node types or remove the console-only `main` from the library build.
4. Make CI fail on install, type, test, lint, and build failures.
5. Add `engines`, `exports`, package files, and a deliberate binary decision.
6. Add boundary tests for invalid numbers, short/negative durations, empty
   criteria, and unused inputs.
7. Move thresholds into dated, typed configuration with source citations.
8. Add adapters, persistence, and UI only after choosing the product surface.

## Inspection paths

- [Canonical README](../../README.md)
- [Project record](../../project-record.yml)
- [Claim-level evidence](../evidence/README.md)
- [Command audit](../evidence/audit-2026-08-31.md)
- [Source modules](../../src/)
- [Test source](../../tests/)
- [Package manifest](../../package.json)
- [CI workflow](../../.github/workflows/ci.yml)
- [Architecture decisions](../adr/)
