
import React, { useState, useEffect } from 'react';
import { Ship, Anchor, Wind, Navigation, Radio, Play, Activity, Droplets, Zap, ShieldCheck, Waves, SignalHigh, AlertTriangle, Radar, Info, ArrowLeft } from 'lucide-react';
import { AquaticAsset } from '../../types';

interface AquaticDashboardProps {
  onBack?: () => void;
}

const mockShips: AquaticAsset[] = [
    { 
        id: 'S-1', 
        name: 'YARA-BIRKELAND-G2', 
        type: 'AUTONOMOUS_CARGO', 
        status: 'AT_SEA', 
        coordinates: '34.05° N, 118.24° W', 
        fuelLevel: 68,
        description: "Zero-emission autonomous container ship. Fully electric.",
        specs: { "Capacity": "150 TEU", "Battery": "9 MWh", "Speed": "15 Knots" },
        systemTimestamp: new Date().toISOString()
    },
    { 
        id: 'S-2', 
        name: 'SAILDRONE-SURVEYOR', 
        type: 'USV_MAPPING', 
        status: 'SURVEYING', 
        coordinates: 'Pacific Sector 4', 
        fuelLevel: 98,
        description: "Uncrewed Surface Vehicle powered by wind and solar.",
        specs: { "Power": "Wind + Solar", "Sensor": "Sonar", "Endurance": "180 Days" },
        systemTimestamp: new Date().toISOString()
    }
];

const AquaticDashboard: React.FC<AquaticDashboardProps> = ({ onBack }) => {
    const [selectedShip, setSelectedShip] = useState<AquaticAsset>(mockShips[0]);

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  {onBack && (
                    <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-cyan-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                  )}
                  <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Maritime Operations</h1>
                      <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span> Sea Grid: ACTIVE
                      </p>
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-1 space-y-4 h-auto">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Vessel Constellation</h3>
                    {mockShips.map((ship) => (
                         <div 
                            key={ship.id}
                            onClick={() => setSelectedShip(ship)}
                            className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-300 ${selectedShip.id === ship.id ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-500 opacity-70'}`}
                         >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${selectedShip.id === ship.id ? 'bg-cyan-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'} transition-colors`}>
                                        <Ship size={20}/>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black uppercase tracking-tight truncate">{ship.name}</p>
                                        <p className="text-[10px] font-bold opacity-60 uppercase">{ship.type}</p>
                                    </div>
                                </div>
                                <span className={`w-2 h-2 rounded-full ${ship.status === 'AT_SEA' ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                            </div>
                            <div className="flex justify-between items-end mt-4 text-[9px] font-black uppercase tracking-widest">
                                <span className="opacity-40">Fuel Reserve</span>
                                <span className="text-cyan-500">{ship.fuelLevel}%</span>
                            </div>
                         </div>
                    ))}
                </div>

                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-slate-950 rounded-[3.5rem] border border-slate-800 h-[500px] relative overflow-hidden group shadow-2xl transition-all">
                        <div className="absolute inset-0 bg-[url('https://mt1.google.com/vt/lyrs=s&x=1310&y=3166&z=10')] bg-cover grayscale contrast-125"></div>
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        
                        <div className="absolute top-10 left-10 z-20">
                            <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-[2rem] border border-cyan-500/30">
                                <h3 className="text-cyan-400 font-black text-[12px] uppercase tracking-[0.3em] flex items-center gap-3 mb-1">
                                    <Radar size={18} className="animate-spin-slow" /> Surface Radar Feed
                                </h3>
                                <p className="text-[9px] text-slate-400 font-black uppercase">Coordinates Locked • Sector 4</p>
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                            <div className="p-5 bg-cyan-700 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.6)] text-white border-4 border-cyan-400 animate-pulse">
                                <Ship size={32} />
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase text-cyan-400 border border-cyan-900">
                                    {selectedShip.name}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm h-auto transition-colors">
                       <h3 className="font-black text-slate-800 dark:text-white text-[12px] uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                           <Info size={24} className="text-cyan-500"/> Vessel Schematic Port
                       </h3>
                       <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-tight mb-8">
                           {selectedShip.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
                           {Object.entries(selectedShip.specs).map(([key, val], i) => (
                               <div key={i} className="text-center">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                                   <p className="text-lg font-black text-slate-900 dark:text-white uppercase">{val}</p>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AquaticDashboard;
