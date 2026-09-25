# Hokage Chess: claim-level evidence

This is the auditable record behind the README and audience editions. A
`verified` assertion means the cited evidence supports the bounded statement;
it does **not** mean the product is deployed or that every source function has a
currently passing test.

The canonical identity, status, authorship boundary, routes, and limitations
live in [`project-record.yml`](../../project-record.yml). Machine-readable
assertions use the `assertion-evidence.v1` contract in
[`docs/evidence/assertions/`](assertions/).

## Material claims

| Project-record ID | Bounded claim | State | Evidence | Limitation or consequence |
|---|---|---|---|---|
| `current-implementation` | The audited tree contains synchronous TypeScript helpers for content strategy, supplied analytics, growth arithmetic, and narrative structures, plus test source. | Verified | [Assertion](assertions/current-implementation.json); [`src/`](../../src/); [`tests/`](../../tests/) | Source presence does not establish a clean build, passing tests, usefulness, or outcomes. |
| `runtime-boundary` | No CLI binary, API client, backend, dashboard, persistence, authentication, scheduler, or runtime dependency set is present. | Verified | [Assertion](assertions/runtime-boundary.json); [audit receipt](audit-2026-08-31.md) | This directly contradicts the former README's executable Python/CLI/API/dashboard claims. Those claims were removed. |
| `verification-state` | Standard install, tests, build, and lint fail on the audited checkout. | Verified | [Assertion](assertions/verification-state.json); [audit receipt](audit-2026-08-31.md); [CI workflow](../../.github/workflows/ci.yml) | Six test files exist, but zero tests ran in the current audit; permissive CI can mask failures. |
| `project-status` | The project is `PROTOTYPE`; substantive TypeScript helpers exist, but no runnable end-user product deployment is evidenced, and the delivery manifest says `not_started`. | Verified | [Assertion](assertions/project-status.json); [`ecosystem.yaml`](../../ecosystem.yaml) | A documentation-oriented GitHub Pages workflow, if active, would not itself be a product deployment. |
| `implementation-authorship` | The substantive TypeScript commit is attributed to Anthony's repository identity and records Claude Opus 4.6 as co-author. | Verified | [Assertion](assertions/authorship.json); [local commit receipt](git-commit-snapshot-ed8b20b.json) | Commit attribution supports an agent-assisted, owner-directed claim, not unassisted authorship or a line-by-line labor allocation. |
| `source-material-provenance` | Six earlier Hokage Chess artifacts have a repository provenance manifest. | Verified | [Assertion](assertions/provenance.json); [provenance manifest](../source-materials/PROVENANCE.yaml) | Provenance records custody and file identity; it does not validate the documents' research claims or show execution. |
| `outcomes-boundary` | The audited repository does not establish adoption, revenue, channel growth, predictive performance, or successful use of the heuristics. | Verified | [Assertion](assertions/outcomes-boundary.json); [audit receipt](audit-2026-08-31.md) | All business value and industry applicability remains proposed. |

## Implemented source, precisely bounded

| Module | Inspectable implementation | What is not evidenced |
|---|---|---|
| [`content-strategy.ts`](../../src/content-strategy.ts) | Regex/length title scoring, four-boolean thumbnail scoring, idea classification, checklist assembly, and supplied-idea selection. | Title generation, thumbnail image analysis, publishing, calendar persistence, or measured CTR lift. |
| [`analytics.ts`](../../src/analytics.ts) | CTR arithmetic, configured labels, supplied-metric aggregation, caller-defined phase evaluation, and selected red-flag rules. | API ingestion, dashboards, data validation, statistical inference, or real channel analysis. |
| [`growth.ts`](../../src/growth.ts) | Four hard-coded target objects, phase selection, progress arithmetic, revenue sums, annualization, and one eligibility threshold check. | Current policy authority, forecasts, real revenue tracking, subscription velocity, or sponsorship operations. |
| [`narrative.ts`](../../src/narrative.ts) | Four-act object construction, limited validation, timestamp strings, and fixed arc-plan objects. | Game analysis, script generation, editorial quality evaluation, or evidence that the structure improves retention. |
| [`index.ts`](../../src/index.ts) | Version constant, console-printing `main`, and re-exports. | A declared package binary or currently successful package build. |

## Retired claim map

The reader-mode migration removed or replaced these unsupported claims from the
former README and pitch surface:

| Former representation | Audited reality |
|---|---|
| Python 3.11 project with `pyproject.toml` | TypeScript project with `package.json`; no Python source or manifest. |
| `hokage` command-line commands | No `bin` manifest entry or CLI implementation. |
| YouTube and Chess.com API integrations | No imports, runtime dependencies, or client modules. |
| Ko-fi webhooks and social schedulers | No webhook or scheduler implementation. |
| Analytics and revenue dashboards | Calculation helpers only; no UI, server, or persistence. |
| Working examples with channel metrics, donations, and subscriber counts | Illustrative numbers without an evidence record; removed as project results. |
| Python test, lint, typing, and CI commands | Current scripts are TypeScript/Jest/ESLint, and all audited checks require repair. |
| Production/active product status | `PROTOTYPE`, `not-deployed`; web-app delivery marked `not_started`. |

## Verification receipt

The full command-level audit is preserved in
[`audit-2026-08-31.md`](audit-2026-08-31.md). It is also the hashed verifier
receipt referenced by the claim records.

## Updating this record

When a material claim changes:

1. rerun the relevant check against an identified commit;
2. create or update an `assertion-evidence.v1` record with fresh hashes;
3. update the reference in [`project-record.yml`](../../project-record.yml);
4. update every audience edition that places the claim; and
5. retain the limitation until evidence actually closes it.

[Canonical README](../../README.md) ·
[General edition](../audiences/general.md) ·
[Technical edition](../audiences/technical.md) ·
[Business edition](../audiences/business.md)
