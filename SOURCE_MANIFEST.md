# Source Manifest — Original Hackathon Submission

This lists every file found in the Google Drive source archive `COPY-of-T.H.E.L.M.A.-AI-POST-GEMINI-3-HACKATHON-SUBMISSION-main.zip` (833,904 bytes, also present as a Replit-exported copy in Drive). Files already mirrored into this repository are marked **Mirrored**. Everything else exists only in the Drive-stored zip as of this writing.

## Mirrored into this repo

Root: `.gitignore`, `README.md`, `ROADMAP.md`, `MASTER_SYSTEM_PROMPT.md`, `types.ts`, `watchdog.js`, `main.py`, `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `index.tsx`, `metadata.json`, `drive-storage.json`, `deploy.sh`, `n8n_gemini_workflow.json`, `n8n_simulation_pipeline.json`

`services/`: `geminiService.ts`, `soundEngine.ts`
`data/`: `assetCatalog.ts`, `massDataGenerator.ts`
`mobile/`: `gps-manager.ts`
`mobile_app_v1/`: `.gitignore`, `App.tsx`, `README.md`, `app.json`, `index.ts`, `package.json`, `tsconfig.json`
`docs/`: all six `.md` planning documents (audit, roadmap map, MOTHER blueprint, authorization rules, update report, training/XR review)

## Not yet mirrored — UI shell (7 files, ~90KB)

| Path | Size | Purpose |
|---|---|---|
| `App.tsx` | 27,393 B | Root component: global state, module routing, boot/auth UX |
| `components/AiAssistant.tsx` | 26,333 B | Conversational AI assistant panel |
| `components/ErrorBoundary.tsx` | 1,943 B | React error boundary |
| `components/Sidebar.tsx` | 6,356 B | Navigation topology |
| `components/TimeController.tsx` | 5,697 B | Time/simulation controller |
| `components/UnitSetupWizard.tsx` | 32,029 B | Asset onboarding wizard |
| `components/3d/UnitSchematic.tsx` | 14,303 B | Interactive exploded 3D schematic (Three.js) — was the audit's top compile-error flag, since fixed |
| `components/ui/HoloAvatar.tsx` | 2,090 B | Avatar UI element |

## Not yet mirrored — dashboard modules (37 files, ~460KB)

All under `components/modules/`. One file per operational domain; names are self-describing:

`AdaptationLayer.tsx` · `AgentHub.tsx` · `AiInsights.tsx` · `App.tsx` (module-scoped variant) · `AquaticDashboard.tsx` · `AviationDashboard.tsx` · `Billing.tsx` · `Communications.tsx` · `Deployment.tsx` · `DispatchHub.tsx` · `Documentation.tsx` · `EmergencyDashboard.tsx` · `FleetDashboard.tsx` · `GovernanceHub.tsx` · `HRAdmin.tsx` · `HRTrainingHub.tsx` · `ITControlCenter.tsx` · `Insurance.tsx` · `IntegrationsBuffer.tsx` · `MainHub.tsx` · `Maintenance.tsx` · `MobileFieldApp.tsx` · `NetZeroHub.tsx` · `OmniDashboard.tsx` · `OrbitalDashboard.tsx` · `Payroll.tsx` · `QuantumEdgeCenter.tsx` · `SecurityInfo.tsx` · `Settings.tsx` · `SystemCore.tsx` · `TeamSetup.tsx`

These were deliberately not ported in the first pass: the Feb 28, 2026 audit's own Phase 1–2 plan calls for re-mapping and refactoring this exact module set (reduce cognitive load, feature-based folders, typed API client) before it's worth treating as stable. Porting 1:1 now would just have to be redone. They're catalogued here so nothing is lost; porting them (as-is or refactored) is a next step to decide on.

## Not yet mirrored — duplicate Word exports (6 files, ~31KB)

Each `docs/*.md` file above also has a `.docx` twin with identical content (`MOTHER_Authorization_and_Operating_Rules_2026-02-28.docx`, `MOTHER_Master_Capability_Blueprint_2026-02-28.docx`, `MOTHER_Update_Report_2026-02-28.docx`, `THELMA_Audit_and_Phased_Plan_2026-02-28.docx`, `THELMA_Training_Sim_XR_Capabilities_2026-02-28.docx`, `THELMA_Working_Set_Map_2026-02-28.docx`). Skipped as redundant with the `.md` versions already mirrored.

## Not yet mirrored — binary assets (6 files, ~490KB)

`mobile_app_v1/assets/`: `android-icon-background.png`, `android-icon-foreground.png`, `android-icon-monochrome.png`, `favicon.png`, `icon.png` (393KB), `splash-icon.png` — Expo app icon set. Skipped from the initial text-only mirror; can be added on request.

## Not mirrored — regenerable

`package-lock.json` (root, 140,997 B) and `mobile_app_v1/package-lock.json` (271,139 B) — both regenerate from their respective `package.json` via `npm install`. Not carried over to keep the repo focused on hand-written source.

## Origin note

Original zip created 2026-07-07 in Google Drive (owner: `estibancreations@gmail.com`, folder path under "The Tub" → "Documents"), file contents dated 2026-02-28. A Replit-exported copy of the same archive also exists in Drive, created 2026-07-01, byte-identical (833,904 bytes).
