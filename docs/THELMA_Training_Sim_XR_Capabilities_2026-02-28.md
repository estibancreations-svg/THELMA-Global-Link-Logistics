# T.H.E.L.M.A. Training / Simulation / XR Capability Review

## Current capability snapshot (as-is)

## 1) Training hub UI (implemented)
- Module: `components/modules/HRTrainingHub.tsx`
- Features live now:
  - Search/select asset from catalog
  - Tactical summary display
  - Embedded 3D schematic panel
  - Explode/implode switch for component analysis

## 2) 3D unit schematic engine (implemented)
- File: `components/3d/UnitSchematic.tsx`
- Features live now:
  - Multiple unit types: TRUCK, DRONE, SHIP
  - Subtype-aware geometry variants (pickup/semi, tug/freighter, fixed-wing/multirotor)
  - Exploded view animation
  - Part highlighting hooks (`highlightPart`, `onPartClick`)
  - Orbit camera controls + environment lighting

## 3) Simulation/agent framing (partially implemented)
- `services/geminiService.ts` includes:
  - Agent role model (HENRY/PERCY/LILY/VERITAS etc.)
  - Decision-card / authorization framing
  - Driver-performance evaluation function scaffold
- Gaps:
  - No persistent simulation scenario engine yet
  - No graded scoring pipeline yet
  - No replay + telemetry timeline linked to training outcomes yet

## 4) Mobile field telemetry (prototype-level)
- File: `mobile/gps-manager.ts`
- Features:
  - Battery-aware location profile switching
  - Interval-based tracking modes
  - Local notification feedback for profile changes

---

## What this can become (target architecture)

## A) Training stack maturity model

### Stage 1 (near-term)
- Scenario library with tags (safety, dispatch, compliance, weather)
- Pass/fail and scorecards per scenario
- Instructor mode: assign scenario to user/team
- Debrief report auto-generated from telemetry + decisions

### Stage 2 (mid-term)
- 3D interactive maintenance/troubleshooting drills
- Time-compressed incident replay
- Synthetic sensor streams (inject faults intentionally)
- Multi-role simulation (driver + dispatcher + compliance officer)

### Stage 3 (advanced)
- Adaptive training plans by observed weakness
- Fleet digital twin with unit-specific behavior profiles
- Cross-modal training (desktop + mobile + headset)

## B) VR / Oculus / Meta AI glasses enablement plan

## Oculus/Meta Quest (VR/MR)

### Recommended approach
- Use **WebXR** first (browser-based) to minimize app-friction.
- Reuse existing Three.js scene graph from `UnitSchematic`.
- Add controller/hand interactions for part inspection and procedure steps.

### Technical requirements
- Add WebXR support path (e.g., `@react-three/xr`)
- Build 90 FPS performance budget profile (LOD, draw-call limits)
- Interaction model:
  - Grab/rotate part
  - Explode depth slider
  - Procedural step checklist pinned in 3D space
- Session telemetry:
  - time in task
  - errors per step
  - hint requests

## Meta AI Glasses (heads-up guidance)

### Recommended approach
- Treat glasses as a **companion guidance endpoint**, not full 3D renderer initially.
- Stream step prompts, warnings, and contextual overlays from T.H.E.L.M.A.
- Voice command + confirmation loop for hands-free tasks.

### Attachment needs
- Device identity and pairing layer
- Secure session token exchange and revocation
- Minimal-latency voice pipeline (ASR + intent + TTS)
- Notification schema for glanceable cues (severity, asset, action)

---

## Practical execution plan for XR

1. Build `training-scenario` data model (JSON schema)
2. Add scoring and replay timeline in desktop hub
3. Introduce WebXR prototype for one high-value unit (e.g., F-150 battery workflow)
4. Add voice-guided headset mode
5. Add glasses companion notifications + acknowledgements

## Definition of done (XR MVP)
- One unit fully trainable in 3 modes:
  - Desktop simulation
  - VR immersive drill
  - Glasses-guided field checklist
- Unified scorecard recorded in same learner profile
