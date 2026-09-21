
import React, { useState } from 'react';
import { ArrowLeft, Brain, Monitor, PlayCircle, Maximize2, Headphones, Database, Search, FileText, Activity, Zap } from 'lucide-react';
import { masterAssetCatalog } from '../../data/assetCatalog';
import { UnitSchematic } from '../3d/UnitSchematic';

interface HRTrainingHubProps {
    onBack?: () => void;
    onVocalize?: (text: string) => void;
    onLaunchWizard?: () => void;
}

const HRTrainingHub: React.FC<HRTrainingHubProps> = ({ onBack, onVocalize, onLaunchWizard }) => {
  const [selectedAsset, setSelectedAsset] = useState(masterAssetCatalog[0]);
  const [isExploded, setIsExploded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = masterAssetCatalog.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-950 min-h-screen pb-24 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
                {onBack && (
                    <button onClick={onBack} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-emerald-500 transition-all shadow-sm"><ArrowLeft size={20} /></button>
                )}
                <div>

            {onLaunchWizard && (
                <button onClick={onLaunchWizard} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all">
                    Launch Unit Setup
                </button>
            )}
                    <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">Tactical Academy</h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> L.I.L.Y. Instructor Active
                    </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6 h-auto">
                <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 shadow-2xl h-auto">
                    <div className="relative mb-6">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
                        <input 
                            type="text" 
                            placeholder="Search Assets..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-[10px] font-black uppercase text-white outline-none focus:border-emerald-500"
                        />
                    </div>
                    <div className="space-y-3">
                        {filteredAssets.map((asset) => (
                            <div 
                                key={asset.id}
                                onClick={() => setSelectedAsset(asset)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer ${selectedAsset.id === asset.id ? 'bg-emerald-600/20 border-emerald-500 shadow-lg' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                            >
                                <h3 className="font-black text-xs uppercase tracking-tight">{asset.name}</h3>
                                <p className="text-[9px] text-slate-500 mt-1">{asset.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
                <div className="bg-black rounded-[3.5rem] border border-slate-800 overflow-hidden relative shadow-2xl min-h-[600px] flex flex-col">
                    <div className="p-8 absolute top-0 left-0 z-20 pointer-events-none">
                        <h2 className="text-3xl font-black uppercase tracking-tighter">{selectedAsset.name}</h2>
                        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Holographic Diagnostic Matrix</p>
                    </div>
                    <div className="flex-1 relative z-10">
                        <UnitSchematic type={selectedAsset.type as any} exploded={isExploded} subType={selectedAsset.schematic.chassis} />
                    </div>
                    <div className="p-8 absolute bottom-0 right-0 z-20 flex gap-4">
                        <button onClick={() => setIsExploded(!isExploded)} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl active:scale-95 transition-all">
                            {isExploded ? 'Implode View' : 'Explode View'}
                        </button>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-sm h-auto">
                    <h3 className="font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-3 text-emerald-400"><FileText size={20}/> Tactical Summary</h3>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium uppercase tracking-tight">
                        {selectedAsset.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HRTrainingHub;
