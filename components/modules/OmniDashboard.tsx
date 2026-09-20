
import React, { useState, useEffect } from 'react';
import { Globe, Truck, Plane, Ship, Rocket, Layers, Ghost, Search, ArrowLeft, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { generateOmniAssets } from '../../data/massDataGenerator';

interface OmniDashboardProps {
  onBack?: () => void;
}

const OmniDashboard: React.FC<OmniDashboardProps> = ({ onBack }) => {
    const [layers, setLayers] = useState({ LAND: true, SEA: true, AIR: true, SPACE: true });
    const [activeAssets, setActiveAssets] = useState<any[]>([]);

    useEffect(() => {
        setActiveAssets(generateOmniAssets());
    }, []);

    const toggleLayer = (key: keyof typeof layers) => {
        setLayers(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const filteredAssets = activeAssets.filter(a => layers[a.type as keyof typeof layers]);

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-black text-white min-h-screen pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter flex items-center gap-4 text-white">
                            <Globe size={36} className="text-blue-500 animate-pulse"/> Omni-Presence
                        </h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mt-1">God View Enabled • {filteredAssets.length} Active</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-3">
                    <div className="bg-slate-950 rounded-[3.5rem] border border-slate-800 h-[700px] relative overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.15)] group">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center opacity-20 grayscale invert"></div>
                        
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <div className="w-[500px] h-[500px] border border-blue-500/10 rounded-full animate-ping"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-7xl font-black text-white/5 uppercase tracking-[0.5em] select-none">MESH</h2>
                            </div>
                        </div>

                        {filteredAssets.slice(0, 50).map((asset, i) => (
                            <div 
                                key={i}
                                className="absolute transition-all duration-1000"
                                style={{
                                    top: `${50 - (asset.lat / 90) * 45}%`,
                                    left: `${50 + (asset.lng / 180) * 45}%`,
                                }}
                            >
                                <div className={`p-2 rounded-full border-2 shadow-[0_0_15px_currentColor] ${asset.type === 'LAND' ? 'bg-blue-600 border-blue-400' : 'bg-purple-600 border-purple-400'}`}>
                                    {asset.type === 'LAND' ? <Truck size={8} /> : <Plane size={8} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6 h-auto">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-3"><Layers size={18}/> Domains</h3>
                        <div className="space-y-4">
                            {Object.entries(layers).map(([key, val]) => (
                                <button key={key} onClick={() => toggleLayer(key as any)} className={`w-full p-4 rounded-2xl flex items-center justify-between border transition-all ${val ? 'bg-white/5 border-blue-500/50 text-blue-400' : 'bg-transparent border-slate-800 text-slate-600'}`}>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{key}</span>
                                    <div className={`w-2 h-2 rounded-full ${val ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OmniDashboard;
