
import React, { useState, useEffect } from 'react';
import { Plane, Zap, Activity, AlertTriangle, FileText, Map as MapIcon, X, Rotate3D, TrendingDown, Shield, Bird, Wind, Navigation, Battery, Thermometer, Wrench, CheckCircle, ShieldAlert, RefreshCw, ArrowLeft, Crosshair, Package, Info, Orbit, Rocket, Hammer, Layers, Cpu, Eye, EyeOff, Radio, Atom } from 'lucide-react';
import { AviationAsset } from '../../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AviationDashboardProps {
  onBack?: () => void;
}

const initialAircraft: AviationAsset[] = [
  { 
    id: 'AP-X1', 
    callsign: 'JOBY-S4-EVTOL', 
    type: 'AIR_TAXI', 
    status: 'IN_FLIGHT', 
    altitude: '1,200 ft', 
    batteryLevel: 82, 
    coordinates: '34.0522° N, 118.2437° W',
    flightHours: 142.5,
    lastService: '2025-12-20',
    maintenanceLog: [{ id: 'M-1', date: '2025-12-20', service: 'Rotor Balance', note: 'Nominal.' }],
    description: "Five-seat eVTOL aircraft with six tilt-rotors. Designed for quiet urban air mobility.",
    specs: { "Max Speed": "200 mph", "Range": "150 miles", "Propulsion": "Electric", "Noise": "< 65 dBA" },
    systemTimestamp: new Date().toISOString()
  },
  { 
    id: 'AG-PROTO-01', 
    callsign: 'CLASSIFIED_PROJECT_Z', 
    type: 'ANTIGRAV', 
    status: 'TESTING', 
    altitude: '45,000 ft', 
    batteryLevel: 99, 
    coordinates: '51.1789° N, 115.5708° W',
    flightHours: 12.0,
    lastService: '2026-01-14',
    maintenanceLog: [],
    description: "Experimental logistics platform utilizing Zero-Point Energy. Non-aerodynamic propulsion.",
    specs: { "Propulsion": "Gravitic", "Payload": "MASSIVE", "Signature": "NULL", "Range": "GLOBAL" },
    systemTimestamp: new Date().toISOString()
  },
  { 
    id: 'AG-PROTO-02', 
    callsign: 'PROJECT_Z_MKII', 
    type: 'ANTIGRAV', 
    status: 'PRODUCTION', 
    altitude: '0 ft', 
    batteryLevel: 0, 
    coordinates: 'Foundry Sector 9',
    flightHours: 0,
    lastService: 'N/A',
    maintenanceLog: [],
    description: "Next-gen heavy lift graviton platform. Currently in Carbon-Weave Hull Assembly stage.",
    specs: { "Status": "Assembly", "Completion": "42%", "Core": "In-Sync", "Target": "Q3 2026" },
    systemTimestamp: new Date().toISOString()
  }
];

const AviationDashboard: React.FC<AviationDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'OPS' | 'HANGAR' | 'SPECIAL_PROJECTS'>('SPECIAL_PROJECTS');
  const [aircraftList, setAircraftList] = useState<AviationAsset[]>(initialAircraft);
  const [selectedAssetId, setSelectedAssetId] = useState<string>(initialAircraft[1].id);
  const [spectralMode, setSpectralMode] = useState(false);
  
  const [fieldCoherence, setFieldCoherence] = useState(99.77);
  const [gravitonFlux, setGravitonFlux] = useState(13.30);
  const [transMediumMode, setTransMediumMode] = useState<'ATMOS' | 'VACUUM' | 'HYDRO'>('ATMOS');
  const [flightPulse, setFlightPulse] = useState(0);

  const selectedAsset = aircraftList.find(a => a.id === selectedAssetId) || aircraftList[0];
  const filteredAssets = activeTab === 'SPECIAL_PROJECTS' ? aircraftList.filter(a => a.type === 'ANTIGRAV') : aircraftList.filter(a => a.type !== 'ANTIGRAV');

  useEffect(() => {
    const interval = setInterval(() => {
      setFlightPulse(p => (p + 1) % 100);
      setAircraftList(prevList => prevList.map(craft => {
        if (craft.status === 'IN_FLIGHT' || craft.status === 'TESTING') {
          const currentAlt = parseInt(craft.altitude.replace(/,/g, '').replace(' ft', ''));
          const fluctuation = Math.floor(Math.random() * 50) - 25;
          const newAlt = Math.max(0, currentAlt + fluctuation);
          const newBattery = Math.max(0, craft.batteryLevel - (Math.random() * 0.01));
          return { ...craft, altitude: `${newAlt.toLocaleString()} ft`, batteryLevel: parseFloat(newBattery.toFixed(2)), systemTimestamp: new Date().toISOString() };
        }
        return craft;
      }));
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-sky-600 shadow-sm shrink-0"><ArrowLeft size={20} /></button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Aviation Command Node</h1>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm font-black uppercase tracking-widest flex items-center gap-2">
               <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span> Sky Grid: ACTIVE
            </p>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
          <button onClick={() => setActiveTab('OPS')} className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'OPS' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500'}`}>Airspace</button>
          <button onClick={() => setActiveTab('HANGAR')} className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'HANGAR' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500'}`}>Hangar</button>
          <button onClick={() => setActiveTab('SPECIAL_PROJECTS')} className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'SPECIAL_PROJECTS' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500'}`}>Project Z</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* List - No internal scroll, contributes to page height */}
          <div className="lg:col-span-1 space-y-4">
             <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-2">{activeTab === 'SPECIAL_PROJECTS' ? 'Classified Assets' : 'Fleet Aviation'}</h3>
             <div className="space-y-4">
               {filteredAssets.map((craft) => (
                   <div 
                      key={craft.id}
                      onClick={() => setSelectedAssetId(craft.id)}
                      className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-300 group flex flex-col ${selectedAssetId === craft.id ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-500'}`}
                   >
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-4 flex-1">
                            <div className={`p-3 rounded-2xl ${selectedAssetId === craft.id ? 'bg-sky-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'} transition-colors shrink-0`}>
                               {craft.type === 'ANTIGRAV' ? <Atom size={24} className={selectedAssetId === craft.id ? "animate-spin-slow" : ""}/> : <Plane size={24}/>}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-black uppercase tracking-tight leading-tight mb-1 whitespace-normal break-words">{craft.callsign}</p>
                              <p className="text-[10px] font-bold opacity-60 uppercase">{craft.type}</p>
                            </div>
                         </div>
                         <span className={`w-2 h-2 rounded-full shrink-0 ml-2 ${craft.status.includes('FLIGHT') || craft.status.includes('TESTING') ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`}></span>
                      </div>
                      <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                          <div className="text-[10px] font-black uppercase tracking-widest opacity-40">ALT: {craft.altitude}</div>
                          <div className="flex items-center gap-2">
                              {craft.type === 'ANTIGRAV' ? <Zap size={14} className="text-purple-400"/> : <Battery size={14} className={craft.batteryLevel < 30 ? 'text-red-500' : 'text-emerald-500'} />}
                              <span className="text-[11px] font-mono font-bold">{craft.batteryLevel.toFixed(1)}%</span>
                          </div>
                      </div>
                   </div>
               ))}
             </div>
          </div>

          {/* Main Visualizer Area - Also contributor to vertical flow */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className={`min-h-[600px] rounded-[3rem] border shadow-2xl relative overflow-hidden transition-all duration-1000 ${selectedAsset.type === 'ANTIGRAV' ? 'bg-black border-purple-900' : spectralMode ? 'bg-indigo-950 border-purple-500/50' : 'bg-slate-950 border-slate-800'}`}>
                
                <div className="absolute inset-0 z-0">
                    <div className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${selectedAsset.type === 'ANTIGRAV' ? "bg-[url('https://mt1.google.com/vt/lyrs=s&x=1310&y=3166&z=12')] grayscale contrast-125" : "bg-[url('https://mt1.google.com/vt/lyrs=p&x=1310&y=3166&z=12')] grayscale-[20%]"}`}></div>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                        <path d="M 100 400 Q 400 300 700 100" stroke={selectedAsset.type === 'ANTIGRAV' ? '#a855f7' : '#0ea5e9'} strokeWidth="3" fill="none" strokeDasharray="10,5" />
                    </svg>
                    <div className="absolute transition-all duration-[2000ms] z-10" style={{ top: '30%', left: `${20 + (flightPulse % 60)}%` }}>
                        <div className="relative">
                            <div className={`p-4 rounded-full border-2 shadow-xl ${selectedAsset.type === 'ANTIGRAV' ? 'bg-purple-600 border-white text-white' : 'bg-sky-600 border-white text-white'}`}>
                                {selectedAsset.type === 'ANTIGRAV' ? <Atom size={32} className="animate-spin-slow"/> : <Plane size={32} />}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-10 left-10 z-20">
                   <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-[2rem] border border-slate-700 shadow-xl inline-block">
                        <h3 className={`font-black text-[13px] uppercase tracking-[0.3em] flex items-center gap-3 mb-2 ${selectedAsset.type === 'ANTIGRAV' ? 'text-purple-400' : 'text-sky-400'}`}>
                            {selectedAsset.type === 'ANTIGRAV' ? <Atom size={18} className="animate-spin"/> : <Plane size={18}/>} Airspace Control
                        </h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Live Radar Feed • Sector 7</p>
                   </div>
                </div>

                {selectedAsset.type === 'ANTIGRAV' && selectedAsset.status === 'TESTING' && (
                    <div className="absolute bottom-10 left-10 right-10 z-30 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="flex gap-6">
                            <div className="bg-slate-900/90 backdrop-blur border border-purple-500/30 p-8 rounded-[2.5rem] w-full md:w-72">
                                <p className="text-[11px] font-black uppercase text-purple-400 tracking-[0.2em] mb-2">Field Coherence</p>
                                <p className="text-4xl font-black font-mono text-white">{fieldCoherence.toFixed(2)}%</p>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
                                    <div className="bg-purple-500 h-full transition-all duration-500 shadow-[0_0_15px_#a855f7]" style={{ width: `${fieldCoherence}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <div className="flex justify-between items-start mb-6">
                      <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest flex items-center gap-3"><Info size={20} className="text-sky-500"/> Tactical Manifest</h3>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase animate-pulse shrink-0">LIVE</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-bold uppercase tracking-tight">{selectedAsset.description}</p>
                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Power</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white">{selectedAsset.batteryLevel.toFixed(1)}%</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Altitude</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white whitespace-nowrap">{selectedAsset.altitude}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Status</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white">{selectedAsset.status}</p>
                        </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                  <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest mb-6 flex items-center gap-3"><Activity size={20} className="text-emerald-500"/> Operational Yield</h3>
                  <div className="flex items-center gap-8">
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800 text-center flex-1">
                        <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2">In Air</p>
                        <p className="text-4xl font-black text-slate-900 dark:text-white font-mono">12</p>
                    </div>
                    <div className="p-6 bg-sky-50 dark:bg-sky-900/20 rounded-3xl border border-sky-100 dark:border-sky-800 text-center flex-1">
                        <p className="text-[11px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-[0.2em] mb-2">Ground</p>
                        <p className="text-4xl font-black text-slate-900 dark:text-white font-mono">4</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AviationDashboard;
