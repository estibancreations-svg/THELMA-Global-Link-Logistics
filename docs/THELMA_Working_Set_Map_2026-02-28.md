# T.H.E.L.M.A. Working Set Map (Anchor View)

## Anchor commits

- 3984e72 (2026-02-19): security + module expansion
- 44d602a (2026-02-17): F-150 + schematic updates
- fe3768b (2026-02-17): UI refactor
- 90d0df2 (2026-02-17): Global Link v4 shift
- d515969 (2026-02-17): project initialization

## Core files to anchor on (high signal)

### Platform shell + behavior
- `App.tsx` (global state, module routing, boot/auth UX)
- `types.ts` (contracts + module enums)
- `components/Sidebar.tsx` (navigation topology)

### AI/system control
- `services/geminiService.ts` (model orchestration, tools, system instruction)
- `MASTER_SYSTEM_PROMPT.md` (persona + command doctrine)
- `watchdog.js` (integrity kill-switch behavior)

### Training + simulation
- `components/modules/HRTrainingHub.tsx` (training UI)
- `components/3d/UnitSchematic.tsx` (interactive exploded 3D)
- `data/assetCatalog.ts` (training unit inventory)

### Program intent/docs
- `README.md` (current declared architecture)
- `ROADMAP.md` (phase narrative)

## Risk heatmap (for overhaul)

- **Red (fix first):**
  - `components/3d/UnitSchematic.tsx` (was compile-broken)
  - `index.html` import map conflicts for AI Studio environment
  - `package.json` missing runtime dep (`recharts`)

- **Amber (refactor next):**
  - `App.tsx` monolith
  - module files with duplicated patterns and mixed domain concerns
  - mixed production/demo assumptions in UI text and behavior

- **Green (reference/spec):**
  - `README.md`, `ROADMAP.md`, prompt docs for intent anchoring

## Recommended "right working set" branch plan

- `overhaul/phase-0-stabilize` (compile + runtime baseline)
- `overhaul/phase-1-ux-ia` (journey simplification)
- `overhaul/phase-2-architecture` (feature slices + service boundaries)
- `overhaul/phase-3-integrations` (M.I.N.I.M.I. router)
- `overhaul/phase-4-training-xr` (VR/AR + training ecosystem)
