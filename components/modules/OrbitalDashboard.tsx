
import React, { useState, useEffect } from 'react';
import { Rocket, Globe, Satellite, Activity, AlertTriangle, Radio, ShieldCheck, ArrowLeft, RefreshCw, Zap, Crosshair, Map as MapIcon, Database, Layers } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface OrbitalDashboardProps {
  onBack?: () => void;
}

const mockSatellites = [
    { id: 'SAT-01', name: 'THELMA-RELAY-ALPHA', type: 'COMMS', alt: '35,786 km', status: 'ONLINE', latency: '24ms' },
    { id: 'SAT-02', name: 'PROJECT-Z-OBSERVER', type: 'SURVEILLANCE', alt: '400 km', status: 'ACTIVE', latency: '12ms' },
    { id: 'SAT-03', name: 'DISPATCH-LINK-BETA', type: 'LOGISTICS', alt: '1,200 km', status: 'MAINTENANCE', latency: '45ms' },
];

const launchTelemetry = [
    { t: 0, alt: 0, vel: 0 },
    { t: 10, alt: 2, vel: 400 },
    { t: 20, alt: 10, vel: 1200 },
    { t: 30, alt: 25, vel: 3000 },
    { t: 40, alt: 50, vel: 5500 },
    { t: 50, alt: 80, vel: 9000 },
    { t: 60, alt: 120, vel: 14000 },
    { t: 70, alt: 180, vel: 22000 },
];

const OrbitalDashboard: React.FC<OrbitalDashboardProps> = ({ onBack }) => {
    const [activeView, setActiveView] = useState<'GLOBE' | 'LAUNCH' | 'KESSLER'>('GLOBE');
    const [globeRotation, setGlobeRotation] = useState(0);
    const [debrisCount, setDebrisCount] = useState(14205);
    const [isLaunching, setIsLaunching] = useState(false);
    const [launchProgress, setLaunchProgress] = useState(0);

    // Rotate Globe
    useEffect(() => {
        const interval = setInterval(() => {
            setGlobeRotation(prev => (prev + 0.2) % 360);
            if (Math.random() > 0.9) setDebrisCount(prev => prev + 1);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const initiateLaunch = () => {
        setIsLaunching(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            setLaunchProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsLaunching(false);
                setLaunchProgress(0);
            }
        }, 100);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 flex flex-col h-full bg-slate-950 text-white relative overflow-hidden">
            {/* Starfield Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            width: Math.random() * 2 + 'px',
                            height: Math.random() * 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDuration: Math.random() * 3 + 2 + 's'
                        }}
                    ></div>
                ))}
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 transition-all backdrop-blur-md"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                            <Rocket size={24} className="text-orange-500"/> Orbital Command
                        </h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            Exosphere Logistics • Project Z Uplink Active
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-xl backdrop-blur-md border border-white/10">
                    <button onClick={() => setActiveView('GLOBE')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'GLOBE' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Holo-Globe</button>
                    <button onClick={() => setActiveView('LAUNCH')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'LAUNCH' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Launch Pad</button>
                    <button onClick={() => setActiveView('KESSLER')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'KESSLER' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>Debris Matrix</button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10 min-h-0">
                
                {/* Left Panel: Satellite List */}
                <div className="lg:col-span-1 space-y-4 overflow-y-auto no-scrollbar pr-2">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Satellite size={16} /> Asset Constellation</h3>
                        <div className="space-y-3">
                            {mockSatellites.map(sat => (
                                <div key={sat.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500/50 transition-colors group cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-[10px] font-black text-white uppercase">{sat.name}</p>
                                        <div className={`w-1.5 h-1.5 rounded-full ${sat.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                                        <span>ALT: {sat.alt}</span>
                                        <span>LAT: {sat.latency}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Activity size={16} /> Uplink Status</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 mb-1">
                                    <span>Signal Strength</span>
                                    <span className="text-emerald-400">98%</span>
                                </div>
                                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[98%] shadow-[0_0_10px_#10b981]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 mb-1">
                                    <span>Bandwidth</span>
                                    <span className="text-blue-400">45 TB/s</span>
                                </div>
                                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[75%] shadow-[0_0_10px_#3b82f6]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Visualization */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    {activeView === 'GLOBE' && (
                        <div className="flex-1 bg-black rounded-[3rem] border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-2xl group">
                            {/* Simulated 3D Globe */}
                            <div className="relative w-[500px] h-[500px] rounded-full shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.9),0_0_50px_rgba(59,130,246,0.3)] overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Earthmap1000x500.jpg/1000px-Earthmap1000x500.jpg')] bg-cover opacity-80"
                                    style={{ 
                                        backgroundPosition: `${globeRotation}% 50%`,
                                        backgroundSize: '200% 100%'
                                    }}
                                ></div>
                                {/* Atmosphere Halo */}
                                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(59,130,246,0.6)]"></div>
                                
                                {/* Orbit Rings */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] border border-white/20 rounded-[50%] rotate-12"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-orange-500/30 rounded-full animate-spin-slow"></div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute top-8 left-8">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Orbital Population</p>
                                <p className="text-3xl font-black font-mono text-white">4,821 <span className="text-xs text-slate-500">Units</span></p>
                            </div>
                            
                            <div className="absolute bottom-8 right-8 text-right">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Project Z Status</p>
                                <p className="text-xl font-black text-purple-400 uppercase tracking-widest flex items-center justify-end gap-2">
                                    <Zap size={16} className="animate-pulse"/> Gravitic Lock
                                </p>
                            </div>
                        </div>
                    )}

                    {activeView === 'LAUNCH' && (
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                            <div className="bg-slate-900 rounded-[3rem] border border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Heavy Lift Command</h3>
                                    <p className="text-slate-400 text-xs mb-8">Sequence: T-MINUS {isLaunching ? 'LAUNCH' : 'READY'}</p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <span className="text-[10px] font-black uppercase text-slate-400">Payload</span>
                                            <span className="text-sm font-bold">140 Tons</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <span className="text-[10px] font-black uppercase text-slate-400">Orbit Target</span>
                                            <span className="text-sm font-bold">LEO-4</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={initiateLaunch}
                                    disabled={isLaunching}
                                    className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl transition-all ${isLaunching ? 'bg-orange-600/50 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 text-white hover:scale-105 active:scale-95'}`}
                                >
                                    {isLaunching ? `IGNITION ${launchProgress}%` : 'INITIATE LAUNCH SEQUENCE'}
                                </button>

                                {isLaunching && (
                                    <div className="absolute bottom-0 left-0 h-2 bg-orange-500 transition-all duration-100" style={{ width: `${launchProgress}%` }}></div>
                                )}
                            </div>

                            <div className="bg-slate-900 rounded-[3rem] border border-slate-800 p-8 relative overflow-hidden">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 absolute top-8 left-8">Telemetry Stream</h3>
                                <div className="absolute inset-0 pt-20 px-4 pb-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={launchTelemetry}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                                            <XAxis dataKey="t" hide />
                                            <YAxis hide />
                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                                            <Line type="monotone" dataKey="alt" stroke="#f97316" strokeWidth={3} dot={false} />
                                            <Line type="monotone" dataKey="vel" stroke="#3b82f6" strokeWidth={3} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeView === 'KESSLER' && (
                        <div className="flex-1 bg-red-950/20 rounded-[3rem] border border-red-900/50 p-8 relative overflow-hidden flex flex-col items-center justify-center text-center animate-fadeIn">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            <AlertTriangle size={64} className="text-red-500 mb-6 animate-pulse"/>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Kessler Syndrome Monitor</h2>
                            <p className="text-red-400 text-sm font-bold uppercase tracking-widest mb-8">Critical Debris Density Warning</p>
                            
                            <div className="grid grid-cols-3 gap-8 w-full max-w-2xl relative z-10">
                                <div className="p-6 bg-red-900/30 rounded-3xl border border-red-500/30">
                                    <p className="text-[10px] font-black text-red-300 uppercase mb-2">Tracked Objects</p>
                                    <p className="text-3xl font-mono font-black text-white">{debrisCount.toLocaleString()}</p>
                                </div>
                                <div className="p-6 bg-red-900/30 rounded-3xl border border-red-500/30">
                                    <p className="text-[10px] font-black text-red-300 uppercase mb-2">Collision Risk</p>
                                    <p className="text-3xl font-mono font-black text-white">4.2%</p>
                                </div>
                                <div className="p-6 bg-red-900/30 rounded-3xl border border-red-500/30">
                                    <p className="text-[10px] font-black text-red-300 uppercase mb-2">Safe Windows</p>
                                    <p className="text-3xl font-mono font-black text-white">3 / 24h</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrbitalDashboard;
