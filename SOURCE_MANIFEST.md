# Source Manifest — Original Hackathon Submission

This lists every file found in the Google Drive source archive `COPY-of-T.H.E.L.M.A.-AI-POST-GEMINI-3-HACKATHON-SUBMISSION-main.zip` (833,904 bytes, also present as a Replit-exported copy in Drive). Files already mirrored into this repository are marked **Mirrored**. Everything else exists only in the Drive-stored zip as of this writing.

## Mirrored into this repo

Root: `.gitignore`, `README.md`, `ROADMAP.md`, `MASTER_SYSTEM_PROMPT.md`, `types.ts`, `watchdog.js`, `main.py`, `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `index.tsx`, `metadata.json`, `drive-storage.json`, `deploy.sh`, `n8n_gemini_workflow.json`, `n8n_simulation_pipeline.json`, `App.tsx`

`services/`: `geminiService.ts`, `soundEngine.ts`
`data/`: `assetCatalog.ts`, `massDataGenerator.ts`
`mobile/`: `gps-manager.ts`
`mobile_app_v1/`: `.gitignore`, `App.tsx`, `README.md`, `app.json`, `index.ts`, `package.json`, `tsconfig.json`
`docs/`: all six `.md` planning documents (audit, roadmap map, MOTHER blueprint, authorization rules, update report, training/XR review)

`components/` UI shell (all 8 files): `AiAssistant.tsx`, `ErrorBoundary.tsx`, `Sidebar.tsx`, `TimeController.tsx`, `UnitSetupWizard.tsx`, `3d/UnitSchematic.tsx`, `ui/HoloAvatar.tsx`

`components/modules/` dashboard modules — all 30 files, complete: `AdaptationLayer.tsx` · `AgentHub.tsx` · `AiInsights.tsx` · `App.tsx` (module-scoped variant) · `AquaticDashboard.tsx` · `AviationDashboard.tsx` · `Billing.tsx` · `Communications.tsx` · `Deployment.tsx` · `DispatchHub.tsx` · `Documentation.tsx` · `EmergencyDashboard.tsx` · `FleetDashboard.tsx` · `GovernanceHub.tsx` · `HRAdmin.tsx` · `HRTrainingHub.tsx` · `ITControlCenter.tsx` · `Insurance.tsx` · `IntegrationsBuffer.tsx` · `MainHub.tsx` · `Maintenance.tsx` · `MobileFieldApp.tsx` · `NetZeroHub.tsx` · `OmniDashboard.tsx` · `OrbitalDashboard.tsx` · `Payroll.tsx` · `QuantumEdgeCenter.tsx` · `SecurityInfo.tsx` · `Settings.tsx` · `SystemCore.tsx` · `TeamSetup.tsx`

As of this update, every hand-written text/source file in the original archive has been mirrored into this repository. What remains unmirrored (below) is limited to duplicate binary exports, image assets, and regenerable lockfiles — none of which are source code.

## Not yet mirrored — duplicate Word exports (6 files, ~31KB)

Each `docs/*.md` file above also has a `.docx` twin with identical content (`MOTHER_Authorization_and_Operating_Rules_2026-02-28.docx`, `MOTHER_Master_Capability_Blueprint_2026-02-28.docx`, `MOTHER_Update_Report_2026-02-28.docx`, `THELMA_Audit_and_Phased_Plan_2026-02-28.docx`, `THELMA_Training_Sim_XR_Capabilities_2026-02-28.docx`, `THELMA_Working_Set_Map_2026-02-28.docx`). Skipped as redundant with the `.md` versions already mirrored, and because the GitHub API's file-write tools available in this workflow only accept text content — a `.docx` is a binary zip container and cannot be safely round-tripped through them without risking corruption. Can be added on request via a different upload path (e.g. git LFS or a direct binary commit tool).

## Not yet mirrored — binary assets (6 files, ~490KB)

`mobile_app_v1/assets/`: `android-icon-background.png`, `android-icon-foreground.png`, `android-icon-monochrome.png`, `favicon.png`, `icon.png` (393KB), `splash-icon.png` — Expo app icon set. Same binary-content limitation as the `.docx` files above: skipped from this text-only mirror; can be added on request via a different upload path.

## Not mirrored — regenerable

`package-lock.json` (root, 140,997 B) and `mobile_app_v1/package-lock.json` (271,139 B) — both regenerate deterministically from their respective `package.json` via `npm install`. Not carried over to keep the repo focused on hand-written source; also impractical to transcribe reliably through a text-based upload workflow given their size. Can be added on request.

## Origin note

Original zip created 2026-07-07 in Google Drive (owner: `estibancreations@gmail.com`, folder path under "The Tub" → "Documents"), file contents dated 2026-02-28. A Replit-exported copy of the same archive also exists in Drive, created 2026-07-01, byte-identical (833,904 bytes).
