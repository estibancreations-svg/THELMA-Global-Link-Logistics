import React from 'react';
import { AlertTriangle, FolderArchive, FileCode2 } from 'lucide-react';

/**
 * PLACEHOLDER ROOT COMPONENT
 * ---------------------------------------------------------
 * The real App.tsx for this system (27,393 bytes) plus the 7 UI-shell
 * components and 37 dashboard modules described in SOURCE_MANIFEST.md
 * were never copied from the original hackathon submission zip into
 * this repository. This file exists only so the site builds and
 * deploys instead of failing outright — it intentionally shows no
 * fake dispatch/fleet/billing data.
 *
 * Real source location (confirmed present, 833,904 bytes):
 *   Google Drive → "COPY-of-T.H.E.L.M.A.-AI-POST-GEMINI-3-HACKATHON-SUBMISSION-main.zip"
 *
 * To finish this: extract that zip and add, at minimum:
 *   App.tsx, components/AiAssistant.tsx, components/ErrorBoundary.tsx,
 *   components/Sidebar.tsx, components/TimeController.tsx,
 *   components/UnitSetupWizard.tsx, components/3d/UnitSchematic.tsx,
 *   components/ui/HoloAvatar.tsx, and components/modules/*.tsx (37 files)
 * then this file can be deleted/replaced by the real App.tsx.
 */
export default function App() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-950 text-slate-200 p-8">
      <div className="max-w-xl w-full space-y-6 text-center">
        <div className="flex justify-center">
          <AlertTriangle className="w-12 h-12 text-amber-500" />
        </div>
        <h1 className="text-2xl font-semibold text-white">
          T.H.E.L.M.A. — Global Link Logistics
        </h1>
        <p className="text-slate-400 leading-relaxed">
          This deployment is connected and building correctly, but the
          dashboard UI itself (37 modules) hasn't been ported into this
          repository yet. This placeholder exists so the site loads
          instead of showing a failed build.
        </p>
        <div className="text-left bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3 text-sm">
          <div className="flex gap-2 items-start">
            <FolderArchive className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
            <span>
              Real source (App.tsx + 37 dashboard modules, ~550KB) is
              confirmed sitting in Google Drive as the original hackathon
              submission zip — it was never extracted into this repo.
            </span>
          </div>
          <div className="flex gap-2 items-start">
            <FileCode2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
            <span>
              See <code className="text-slate-300">SOURCE_MANIFEST.md</code> in
              this repo for the exact file list still to port.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
