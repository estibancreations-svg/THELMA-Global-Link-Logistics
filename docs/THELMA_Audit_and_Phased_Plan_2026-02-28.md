# T.H.E.L.M.A. AI Overhaul — Audit + Phased Plan

Date: 2026-02-28
Analyst: Sebastian (OpenClaw)
Project Path: `/Users/stevenhenry/Desktop/thelma-ai-copy`

## 1) Terminal Work Log (what I ran)

```bash
cd ~/Desktop/thelma-ai-copy
npm install
npm run build
npm exec tsc --noEmit
gog auth list
```

### Key command results

- `gog auth list` → `No tokens stored` (Google auth not configured on host yet)
- `npm install` → installs succeed, 2 moderate warnings reported by npm (general), but:
- `npm audit --omit=dev --json` → production dependencies currently show `0` vulnerabilities
- `npm run build` fails with missing package import:
  - `Rollup failed to resolve import "recharts" from components/modules/FleetDashboard.tsx`
- `npm exec tsc --noEmit` fails with syntax errors in:
  - `components/3d/UnitSchematic.tsx`
  - root cause: invalid `if (...) { ... } else { ... }` inserted directly in JSX instead of `{ condition ? (...) : (...) }`.

## 2) What the current system appears designed to do

From README / ROADMAP / prompt files and historical saved project notes:

- A multi-agent logistics command UI (Thelma/Henry/Percy/Lily/Core/Veritas personas)
- Decision-matrix style workflow with human authorization gates
- Modules for fleet, aviation, aquatic, HR/training, finance, governance, integrations, deployment
- Optional 3D schematic visualizations
- Optional mobile companion concept (field node / memory node)
- n8n integration intent for air-gapped routing and external automation

## 3) Related conversation/history artifacts reviewed

I reviewed saved local notes indicating your intended direction:

- `.../History/16dec966/UJV5.md` — desktop + mobile split strategy (core + companion)
- `.../History/-6f6c97a6/O6KV.md` — memory node + paperless/camera/signature concept
- `.../History/7367d9e5/fe9e.md` — M.I.N.I.M.I. barrier/router design separating credentials from core AI
- `.../History/6aa4a5f8/ogqR.md` — PWA/home-screen install path for mobile access

### Direction trend (synthesized)

Your trajectory is consistent:
1. Move from themed POC into reliable operations platform
2. Separate concerns (core UI, mobile companion, workflow router)
3. Keep human-approval model for critical actions
4. Integrate external systems through a guarded orchestration layer (n8n/M.I.N.I.M.I.)

## 4) Current technical risks and breakpoints

### A. Build/compile blockers (high priority)
- Missing dependency: `recharts` (imported, not in `package.json`)
- Syntax-broken JSX in `UnitSchematic.tsx`

### B. Architecture drift / cohesion issues
- Monolithic front-end with many module screens and mixed concerns
- Legacy/demo narrative and production aspirations are blended in same code paths
- Backend (`main.py`) references modules/paths (`core.*`, `tools.n8n_uplink`, `frontend/dist`) that are not represented as a clean packaged backend service in this repo state

### C. Integration readiness gaps
- Google auth not configured (`gog` has no tokens)
- Secret management appears inconsistent (`process.env.API_KEY`, browser `window.aistudio`, drive json placeholders)

### D. Product UX risk
- Very broad module map, but no clear “critical user journeys first” implementation constraint
- High chance of feature sprawl over reliability

## 5) Recommended phased plan (report-first)

## Phase 0 — Stabilize and Baseline (1–2 days)
Goal: project compiles, runs, and is measurable.

- Fix TypeScript/JSX hard errors (`UnitSchematic.tsx`)
- Add missing runtime deps (`recharts` etc.)
- Produce green checks: `npm run build` + `tsc --noEmit`
- Add a simple health checklist script + baseline README updates
- Create branch strategy (`main` protected, `overhaul/phase-0` working)

Deliverable: Buildable app snapshot + known issues list + baseline metrics

## Phase 1 — UX/IA Reframe (2–4 days)
Goal: simplify into operator-first flows.

- Define top 3 user journeys (e.g., Dispatch, Incident, Compliance)
- Re-map modules into clear navigation hierarchy
- Build design tokens + component contract for visual consistency
- Reduce cognitive load in dashboard and action flows

Deliverable: UX map + wireframe set + clickable flow skeleton

## Phase 2 — Core App Refactor (4–7 days)
Goal: modular code architecture that can scale.

- Move to feature-based folders (domain slices)
- Separate UI state from domain logic/services
- Introduce typed API client and integration adapters
- Add route guards/error boundaries/loading states consistently

Deliverable: cleaner codebase with testable boundaries

## Phase 3 — Integration Layer (3–5 days)
Goal: secure, deterministic external integrations.

- Implement M.I.N.I.M.I.-style router layer for external actions
- Define “intent packet” schema and validation
- Wire n8n/github/drive integrations through guarded endpoints only
- Add audit trail logging for every external mutation

Deliverable: integration contract + audited action path

## Phase 4 — Mobile Companion + PWA (3–6 days)
Goal: field utility and mobile-ready access.

- Decide: PWA-first vs Expo app-first (recommend PWA-first for speed)
- Deliver mobile-critical screens: alerts, assignments, capture
- Add offline-safe sync strategy + retries

Deliverable: installable mobile surface with scoped capabilities

## Phase 5 — Hardening + Launch (2–4 days)
Goal: reliability and controlled rollout.

- Accessibility/performance pass
- QA scripts + smoke tests + rollback plan
- Observability dashboard and error reporting

Deliverable: release candidate + cutover playbook

## 6) Team-of-6 execution mapping

1. UX Strategist — IA, journeys, wireframes
2. UI Systems Engineer — design system + components
3. Frontend Lead — architecture refactor + app shell
4. Backend/Integrations Engineer — router/API contracts/n8n
5. QA/Performance Engineer — test harness + perf/accessibility
6. DevOps/Release Engineer — envs, CI, deploy, rollback

## 7) Immediate next actions (I can start now)

1. Create `overhaul/phase-0` branch
2. Fix compile blockers (`UnitSchematic`, missing deps)
3. Run build/typecheck and return exact diff + proof output
4. Draft UX journey map v1 from existing module inventory

---

If approved, I’ll execute Phase 0 immediately and then report with a clean before/after technical delta.
