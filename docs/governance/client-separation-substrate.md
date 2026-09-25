# Client-Separation Substrate (v0)

> **v0 placement caveat.** This document is awkwardly hosted at `hokage-chess/docs/governance/` because that's the writable scope of the session in which it was authored (2026-04-30, post-bleed). Its **canonical home is workspace-wide / meta-organvm meta-governance** -- see "Phase 3 deferred work" below. Future readers: do not interpret its presence in Rob's repo as scoping it to Rob.

## What this is

A containment topology for studio work across multiple client engagements plus public surfaces plus the operator's private space. The substrate declares **four zones**, **flow rules** between them, **audience-declaration anchors** that already exist, a **triage protocol** for misplaced artifacts, and a **live-paste rule** for chat-layer bleed.

## Why it exists

On 2026-04-30 17:06:09, an 84 KB session-export landed at the Hokage-chess repo root: `session-ses_21fd.md` (title: "Editing flow: vacuum gate, quiz copy, and CTA plan"; session_id `ses_21fd26adfffermWYH45QGFy0P4`). The operator's framing: **asked Maddie, received Rob.**

The artifact's prompts were brand-agnostic (parametric content-strategy directives). The agent picked scope from CWD silently and produced hokage-flavored output. The export then sat at the wrong tree's root. Worse: the operator pasted the same Maddie-intent session text into the receiving Hokage-scoped Claude chat, putting the auto-memory dir (`~/.claude/projects/-Users-4jp-Workspace-4444J99-hokage-chess/memory/`) one careless save away from carrying Maddie context inside Rob's namespace.

**Rule articulated:** Client information must never bleed across clients or into public surfaces. It lives only in that client's own surface or in `(me)`-only.

## The Four Zones

| Zone | Canonical Source Tree | Operational Sink (gitignored) | Audience Anchor |
|------|------------------------|------------------------------|-----------------|
| `public:all` | `4444J99/portfolio/`, `4444J99/4444J99/` | N/A -- it IS public | implicit; no client info ever |
| `(me)` | `~/.local/share/workspace/` (established 2026-04-29) | `~/.local/share/workspace/operational/exports/` | implicit; cross-stream + non-client material |
| `{client:rob}` | `4444J99/hokage-chess/` | `~/.local/share/hokage-chess/operational/exports/` | `seed.yaml: metadata.client: "Rob Bonavoglia"` + `storefront.config.yaml: persona_id: rob` |
| `{client:maddie}` | `organvm/sovereign-systems--elevate-align/` | `~/.local/share/sovereign-systems/operational/exports/` | `seed.yaml: client: maddie` (top-level) |

**Schema-drift flag.** Hokage-chess declares the client at `metadata.client`; sovereign-systems declares it at top-level `client`. The substrate accepts both for v0. Phase 3 normalizes.

## Flow Rules

```text
                  +----------------------------------+
                  |           public:all             |
                  |     (no client info; ever)       |
                  +----------------------------------+
                         ^ release with sanitization only
                         |
            +--------------------------------------+
            |              (me)                    |
            |   absorbs from any zone; no caps     |
            +--------------------------------------+
              v scope-bound      v scope-bound
            +----------------+    +------------------+
            | {client:rob}   | x->| {client:maddie}  |
            |                |<-x |                  |
            +----------------+    +------------------+
```

**Allowed (default):**
- `(me) -> {client:N}` -- when relevant to that client only
- `(me) -> public:all` -- after sanitization
- `{client:N} -> (me)` -- operator owns everything
- `public:all -> anywhere` -- already public

**Forbidden (default):**
- `{client:N} -> {client:M}` -- except via explicit cross-stream coordination docs at `docs/archive/orchestration/` in either client's repo
- `{client:N} -> public:all` -- except via explicit, audited release (e.g., a public case study with client consent)

**Studio code is not client information.** Per Maddie's `seed.yaml` pragma, "Client IP boundary enforced (content = client's, code = studio's)." This holds across clients -- the `Persona x Narrative x Section` primitive is studio IP, shipped in both repos. **Sharing engine code is not bleed; sharing brand/content/strategy is.**

## Routing Rule (R1 -- first explicit design choice)

When triaging a misplaced artifact, route by **content / scope-of-generation**, not by user-declared intent.

- **R1 (chosen).** Rob-CWD generated Rob-flavored output -> Rob ops tree. Mechanical, deterministic, stable. The intent/content mismatch is documented as a canonical example (below) so it's *visible*, not papered-over.
- **R2 (rejected).** Route by user-declared intent ("Maddie ask -> Maddie ops tree" plus a `MISMATCH.md` sibling). Preserves intent for retrospective analysis but introduces interpretive judgment at every triage event and creates two diverging filesystems for one artifact.

R1 wins on mechanical determinism. The substrate names R2 explicitly so future-readers don't drift into it silently when R1 produces an awkward routing.

## Live-Paste Rule (chat-layer containment)

When cross-client material lands inside a wrong-scope chat -- the receiving agent (Claude, Codex, Gemini, OpenCode):

1. **Refuses to operationalize on the wrong-scope content.** Does not write code, edit files, or perform tasks based on the misplaced material.
2. **Suggests routing.** Names the correct scope and the canonical operational-exports path the artifact should go to.
3. **Treats the paste as a triage event.** Logs the bleed in the active-handoff or session log. Does not silently absorb.
4. **Does not save verbatim wrong-scope content into this scope's auto-memory.** The receiving agent's auto-memory dir is bound to the receiving scope; saving cross-client content there extends the bleed. Save the *rule*, not the *body*.

This makes the substrate self-stabilizing at the agent layer, not just the file-tree layer.

## Triage Protocol (when a misplaced artifact is detected)

1. **Identify** -- path, size, mtime, content scope (read first ~50 lines)
2. **Determine destination by R1** (content / scope-of-generation):
   - Rob/Hokage content -> `~/.local/share/hokage-chess/operational/exports/YYYY-MM-DD-HHMMSS-<title-slug>-ses_<id>.md`
   - Maddie/Sovereign content -> `~/.local/share/sovereign-systems/operational/exports/YYYY-MM-DD-HHMMSS-<title-slug>-ses_<id>.md`
   - Cross-stream / non-client -> `~/.local/share/workspace/operational/exports/YYYY-MM-DD-HHMMSS-<title-slug>-ses_<id>.md`
3. **Move** (`mv`, not copy) -- the artifact must leave the wrong tree
4. **Verify** -- source absent; destination present; size matches
5. **Record** -- note the triage in this doc's audit-log section (below)

Filename slug convention (established 2026-04-29): `YYYY-MM-DD-HHMMSS-<title-slug>-ses_<id>.md`

## Canonical Example -- 2026-04-30 ask-Maddie-receive-Rob

| Field | Value |
|-------|-------|
| Triggering session | `ses_21fd26adfffermWYH45QGFy0P4` |
| Title | "Editing flow: vacuum gate, quiz copy, and CTA plan" |
| Created | 2026-04-30 16:56:16 |
| Updated | 2026-04-30 17:05:08 |
| Where it landed (wrong) | `~/Workspace/4444J99/hokage-chess/session-ses_21fd.md` (84 KB) |
| Where it routed (R1) | `~/.local/share/hokage-chess/operational/exports/2026-04-30-165616-editing-flow-vacuum-gate-quiz-cta-ses_21fd26adfff.md` |
| Operator's stated intent | "asked Maddie" |
| Agent's actual response scope | Rob/Hokage (CWD-bound) |
| Triaged | 2026-04-30 (this substrate's authoring session) |

The mismatch is the artifact's *value* -- not a contamination to scrub. It records, in primary form, exactly the failure mode the substrate prevents.

## Audience-Declaration Anchors (existing primitives)

These already exist; the substrate composes them rather than reinventing.

- `seed.yaml: metadata.client` (Rob) and `seed.yaml: client` (Maddie) -- engagement-scope declaration. Schema drift to be normalized in Phase 3.
- `storefront.config.yaml: persona_id` and `audiences:` frontmatter on individual files -- per-file audience anchor (storefront-render skill consumes these).
- `~/.local/share/<stream>/operational/exports/` -- established 2026-04-29 (per `project_artifact_2026_04_30_temp_session_sort.md`).
- `~/.local/share/workspace/operational/exports/` -- established 2026-04-29 for cross-stream / non-client material.
- Hokage-chess repo-lock rule (`CLAUDE.md`) -- already enforces filesystem boundary; this substrate adds the *content* boundary on top.
- Maddie repo's `client IP boundary enforced (content = client's, code = studio's)` (sovereign-systems `seed.yaml` pragma) -- generalized in the studio-code clause above.

## Off-repo Durability

To ensure that off-repo artifacts (like triaged transcripts in `~/.local/share/<stream>/operational/exports/`) survive machine loss, these paths are mirrored to a secure remote via `chezmoi`.

- The paths `~/.local/share/hokage-chess/operational/` and `~/.local/share/sovereign-systems/operational/` are chezmoi-managed.
- Auto-commit and auto-push are enabled (`git.autoCommit = true`, `git.autoPush = true` in `chezmoi.toml`) to ensure parity is maintained automatically.
- Since transcripts may contain client-sensitive content, the chezmoi remote MUST be encrypted at rest (chezmoi private repos meet this requirement).

## Audit Log

| Date | Event | Action | Reference |
|------|-------|--------|-----------|
| 2026-04-30 | First triggering bleed (ask-Maddie-receive-Rob) | Orphan moved per R1 to Rob ops tree | `~/.local/share/hokage-chess/operational/exports/2026-04-30-165616-editing-flow-vacuum-gate-quiz-cta-ses_21fd26adfff.md` |
| 2026-04-30 (audit pass) | Discovered `Untitled-1.md` at Rob root -- explicit cross-stream content (Universe Overlap M / R, references both Maddie and Rob paths) | Orphan moved per R1 to workspace ops tree (cross-stream) | `~/.local/share/workspace/operational/exports/2026-04-28-013516-universe-overlap-cross-stream-untitled-1.md` |
| 2026-04-30 (audit pass) | Discovered `export-20260427203906.md` at Rob root -- Gemini session in Rob CWD, Hokage primary focus | Orphan moved per R1 to Rob ops tree | `~/.local/share/hokage-chess/operational/exports/2026-04-28-013516-find-drive-files-domain-gemini-export.md` |

**Cross-scope schema drift noted:** Maddie scope's auto-memory `feedback_stream_repo_alignment.md` declares conversation transcripts route to `<repo>/docs/archive/YYYY-MM/` (in-repo, git-tracked). This substrate (and the prior 2026-04-29 sort that established it) routes full transcripts to `~/.local/share/<stream>/operational/exports/` (off-repo, gitignored). The Maddie memory was authored after the off-repo convention was established (it references "auto-commit pipeline ... observed 2026-04-30"), so the convention divergence is genuine and unresolved. Phase 3 normalization should choose one or formalize a summary-vs-full-transcript split.

## Phase 2 -- Pre-commit guard (implemented)

Shell script at `.husky/pre-commit` that runs `scripts/check-cross-client-bleed.sh` before chaining to any user-global secret scanner. It scans staged additions for the configured cross-client keyword set and rejects unless the file is under `docs/archive/orchestration/` or carries explicit `audiences: [cross_stream_coordination]` frontmatter.

For hokage-chess, the blocked keyword patterns live in `config/cross-client-keywords.txt`. The file is line-based extended POSIX regex: blank lines and `#` comments are ignored, matching is case-insensitive, and `CROSS_CLIENT_KEYWORDS_FILE=/path/to/file` can override it for tests or local experiments.

For sovereign-systems (mirror, inverse): `rob|Bonavoglia|hokage|HokageChess`

Implementation note: this is a shell script in `.husky/pre-commit`. **Not a LaunchAgent** -- on-demand only, per the universal rule.

## Phase 3 -- Workspace promotion + schema normalization (deferred)

- Move this doc to `meta-organvm/governance/` (canonical home) and add an anchor at `~/Workspace/CLAUDE.md`
- Normalize `seed.yaml` client-declaration: choose one of the two patterns. Recommendation: top-level `client:` (Maddie's pattern) is cleaner -- migrate hokage-chess from `metadata.client` to top-level. Update `registry-v2.json` reader.

## Phase 4 -- Conductor MCP scope-binding (deferred)

Extend `conductor_session_start` to accept and bind a `client` parameter. When the working directory belongs to a client tree (resolved from `seed.yaml`), require an explicit client scope. Reject prompts that arrive without it. Add `conductor_route_to` cross-client rejection.

## Self-test

This document complies with its own substrate:

- **Quotes Maddie session content?** No -- only title and session ID, both metadata.
- **Right scope?** v0 hosted in `{client:rob}` is acknowledged as an awkward placement (preamble) with canonical home in workspace meta-governance.
- **Live-paste rule applied to authoring agent?** Yes -- the agent that authored this doc did not absorb the pasted Maddie session content into hokage-chess auto-memory; it saved the *rule*, not the *body*.

> **Canonical-home status (2026-08-31):** The previously referenced local
> `CANONICAL-HOME-ANCHOR.md` is not present in this repository. This v0 remains
> at `hokage-chess/docs/governance/`; the Phase 3 promotion to
> `meta-organvm/governance/` is unresolved rather than represented by a dead
> link.
