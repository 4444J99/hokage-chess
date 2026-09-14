# ADR-001: Initial Architecture and Technology Choices

## Status

Accepted

## Date

2026-02-13

> **Current-state note (2026-08-31):** This ADR records the historical
> TypeScript decision. The present dependency/configuration set does not pass a
> fresh install, test, build, or lint audit, and the CI workflow does not fail
> closed on every such error. See
> [`docs/evidence/audit-2026-08-31.md`](../evidence/audit-2026-08-31.md).

## Context

`hokage-chess` is a TypeScript-based project within ORGAN-III (Ergon) of the organvm eight-organ creative-institutional system. The project needed a technology foundation that balances rapid prototyping with long-term maintainability.

## Decision

We chose TypeScript as the primary implementation language. Key architectural choices:
- **Language**: TypeScript — selected for ecosystem fit and domain requirements
- **CI/CD**: GitHub Actions with graceful degradation (tests, linting, type checking)
- **Documentation**: Portfolio-quality README targeting grant reviewers and hiring managers
- **Governance**: Follows ORGAN-IV orchestration rules; no back-edges in dependency graph

## Consequences

### Positive

- Consistent with organvm system-wide conventions
- CI was intended to surface regressions while allowing selected non-critical checks to continue
- Documentation-first approach ensures discoverability and portfolio value

### Negative

- Node.js version matrix increases CI time
- Portfolio-quality documentation requires ongoing maintenance

## References

- Part of the [organvm eight-organ system](https://github.com/meta-organvm)
- Organ: ORGAN-III (Ergon)
