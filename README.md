# T.H.E.L.M.A. — Global Link Logistics

**Tactical Holistic Enforcement Learning Management Architecture**

This is Sire's **logistics THELMA** system — the Land / Air / Sea / Orbital fleet-dispatch and AI command platform, separate from `estibancreations-svg/-THELMA-AI` (the private, book/video/podcast production-coordinator system of the same name). It was originally built as a hackathon submission and is now mid-rebrand toward an assistant identity called **MOTHER**.

## What this system is

A multi-agent logistics command UI (React 18 + TypeScript + Vite) built around a "Guardian Co-Pilot" doctrine: the AI proposes, a human authorizes, nothing executes without a signed-off decision card. It covers dispatch, fleet, aviation, aquatic, HR/training, billing/payroll, insurance, governance, IT/security, and integrations — modeled as one federation of named sub-agents:

- **T.H.E.L.M.A.** — primary orchestrator, ledger and command validation
- **H.E.N.R.Y.** — route/fuel/time strategist (propose-only, cannot execute)
- **P.E.R.C.Y.** — n8n air-gap guard, sanitizes external data
- **L.I.L.Y.** — training enforcer, locks workflow into a micro-simulation after unsafe telemetry (hard braking, speeding)
- **C.O.R.E.** — regulatory/compliance engine
- **V.E.R.I.T.A.S.** — auditor, cross-checks hardware telemetry (RTS) against digital manifests

The core interaction loop is the **Golden Path Protocol**: Ingest → Verify → Think → Check → **Ask (human authorization)** → Execute. Nothing auto-executes on a critical path.

## History

- **Jan 4, 2025** — v4.0.0 "Global Link" baseline shipped; branding pivoted to EstibanCreations. Architect of record: Steve/Steven Henry.
- Built for and submitted to a **Google Gemini 3 hackathon** ("POST-GEMINI-3-HACKATHON-SUBMISSION") — this is the "contest" build referenced in the Master System Buildout record.
- **Feb 18, 2026** — v2.6 "Guardian Co-Pilot" deployed: the propose/authorize model (Golden Path Protocol), the V.E.R.I.T.A.S. auditor agent, and authorization cards replacing prior auto-execute logic.
- **Feb 28, 2026** — an external technical audit (by "Sebastian," working from a local copy at `~/Desktop/thelma-ai-copy`) diagnosed the build, found real compile blockers, and proposed a 6-phase stabilization plan (see `docs/THELMA_Audit_and_Phased_Plan_2026-02-28.md`). Per the same day's `docs/MOTHER_Update_Report_2026-02-28.md`, the two flagged blockers — missing `recharts` dependency and broken JSX in `UnitSchematic.tsx` — were already fixed at that point, and `npm run build` / `tsc --noEmit` were passing.
- Same date — a rebrand track opened: **T.H.E.L.M.A. → MOTHER**, repositioning the system as a general-purpose autonomous assistant platform (see `docs/MOTHER_Master_Capability_Blueprint_2026-02-28.md`) while keeping existing module names for backward compatibility during migration. `index.html`'s page title and the `mobile_app_v1/` Expo app are already MOTHER-branded.

## Current known state (as of the Feb 28, 2026 audit + update report)

- Frontend (React/Vite) core builds and typechecks.
- **Backend is incomplete in this snapshot.** `main.py` is a Flask app that imports `core.henry`, `core.percy`, `core.thelma`, `core.inception`, and `tools.n8n_uplink` — none of those modules are present in this source tree. The audit doc flags this explicitly: "Backend references modules/paths that are not represented as a clean packaged backend service in this repo state." Until that backend is supplied or rebuilt, this repo is a frontend prototype, not a deployable full-stack system.
- The system is architecturally broad (30+ dashboard modules) with acknowledged "feature sprawl over reliability" risk and mixed demo/production assumptions in the UI — the audit's Phase 0–2 plan exists specifically to address this before further build-out.
- n8n integration, Google Veo 3.1 video generation, and Capacitor mobile sync are wired at the code level but not verified end-to-end in this snapshot.

## Relationship to "Motive Next"

Sire referred to this system informally as **Motive Next** before recalling its THELMA name. Separately, Google Drive also holds a distinct, simpler artifact under the literal name "Motive Next" — a Netlify-deployable transportation app (`MOTIVE TRUCKING PRO` + `MOTIVE DRIVEAWAY`) with serverless functions for trip dispatch, VIN verification, billing, and weather monitoring, possibly deployed at one point to Base44. **Whether that Netlify bundle was an earlier prototype of this same system, a parallel attempt, or an unrelated build has not been confirmed** — it's flagged here as an open question rather than assumed. That Netlify-deployment bundle has not been mirrored into any repository yet.

## Relationship to OSIRIS

`estibancreations-svg/OSIRIS` implements a governed adapter that reads selected open-source intelligence signals (earthquakes, wildfires, weather, maritime reference data) into a Supabase table (`osiris_world_signals`), filtered by active transit corridor relevance, specifically to feed **this** system as a risk overlay. As of this writing, OSIRIS's integration foundation (Supabase schema, RLS, sync Edge Function) is implemented but marked `IMPLEMENTED_UNVERIFIED`, waiting on this repository to exist as the "canonical logistics T.H.E.L.M.A. runtime" it can attach to. That blocker is resolved by this repo's creation — the next step is wiring an actual consumer read against `osiris_world_signals` from this codebase.

## Directory index

| Path | Contents |
|---|---|
| `README.md` | This file |
| `ROADMAP.md` | Phase history and change log (Phase 1–22) |
| `MASTER_SYSTEM_PROMPT.md` | The system's core AI persona/doctrine ("v2.6 Guardian") |
| `types.ts` | Full domain model — modules, agents, dispatch/fleet/aviation/aquatic asset types, personnel, payroll, audit log |
| `index.tsx`, `index.html` | App boot, import map |
| `services/geminiService.ts` | Gemini model orchestration, agent routing, system-instruction builder, Veo video + TTS calls |
| `services/soundEngine.ts` | Procedural UI audio/haptics |
| `data/assetCatalog.ts` | Fleet/aviation/aquatic asset catalog (Land/Sea/Air reference units) |
| `data/massDataGenerator.ts` | Demo data generators for load board, omni-presence map, fleet matrix |
| `mobile/gps-manager.ts` | Battery-aware GPS polling profiles for field telemetry |
| `mobile_app_v1/` | Standalone Expo/React Native companion app, MOTHER-branded |
| `n8n_gemini_workflow.json`, `n8n_simulation_pipeline.json` | n8n automation workflows (command relay, Veo simulation pipeline) |
| `watchdog.js` | "Project Aegis" integrity kill-switch — hard-kills the app if `MASTER_SYSTEM_PROMPT.md` is tampered with |
| `main.py` | Flask backend entrypoint (references a `core/` package not present in this snapshot — see Current known state) |
| `deploy.sh` | Google Cloud Run deployment script |
| `docs/` | The Feb 28, 2026 audit, phased plan, working-set map, MOTHER capability blueprint, authorization rules, and XR/training capability review |
| `09-source-conversations/` | Preserved record of how this repository was located and assembled |
| `SOURCE_MANIFEST.md` | Full file inventory of the original hackathon submission zip, including the ~37 dashboard module files and binary assets not yet mirrored into this repo |

## Ownership and authorization model

Per `docs/MOTHER_Authorization_and_Operating_Rules_2026-02-28.md`: sole owner/controller is Steven Henry (the Architect). External, destructive, account-level, or public actions require explicit written authorization with agreed code words; absent that, the system stays in propose-only mode. Deny-by-default on ambiguous authority.

## Decision trail

- **2025-01-04** — v4.0.0 Global Link baseline shipped under EstibanCreations branding.
- **2026-02 (hackathon)** — Submitted as `T.H.E.L.M.A.-AI-POST-GEMINI-3-HACKATHON-SUBMISSION` for a Google Gemini 3 hackathon.
- **2026-02-18** — Guardian Co-Pilot (v2.6) architecture deployed: propose/authorize model, V.E.R.I.T.A.S. auditor, authorization cards.
- **2026-02-28** — External audit performed; Phase 0–5 stabilization plan proposed. Build blockers identified and fixed same day. MOTHER rebrand track opened (identity migration, assistant modes, autonomous execution runbook).
- **2026-09-17/18** — Located via Claude session (Cowork) while auditing Sire's full GitHub/Drive footprint. Confirmed via source inspection that the "ThelmaApp" React code and LAND/AIR domain views found earlier in Drive search are this exact codebase (`types.ts` `DispatchOrder.domain: 'LAND' | 'AIR' | 'SEA'`). Repository created on GitHub to give this system a version-controlled home, in support of the OSIRIS integration's stated dependency on a "canonical logistics T.H.E.L.M.A. runtime." High-signal architecture files (per the audit's own Working Set Map) mirrored in first; the ~37 dashboard module screens catalogued in `SOURCE_MANIFEST.md` but not yet ported, pending a decision on whether to port as-is or rebuild per the Phase 0–2 plan.
- **Still open:** relationship between this system and the separately-found "Motive Next" Netlify deployment bundle; whether to complete the THELMA→MOTHER rebrand or hold at THELMA naming; whether to execute the audit's Phase 0 stabilization before adding the OSIRIS data feed, or wire OSIRIS in first.
