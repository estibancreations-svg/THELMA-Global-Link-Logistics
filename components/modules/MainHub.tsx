
import React, { useState, useEffect, useRef } from 'react';
import {
    Shield, Map, Activity, Zap, CheckCircle, Lock,
    AlertTriangle, Fingerprint, Globe, Box, Truck,
    Terminal, FileText, Play, Scan, FileSearch, TrendingUp, BarChart3, CloudLightning,
    Maximize2, RefreshCw, DollarSign, Users, Radio, AlertOctagon, ArrowRight,
    Plane, Ship, Cpu, Server, Wind, Droplets, Anchor, Navigation, Moon, Brain, Sparkles, EyeOff, Orbit, Atom, Rocket, X
} from 'lucide-react';
import { ModuleType } from '../../types';

type Phase = 'ACTIVATION' | 'STRATEGY' | 'DEPLOYMENT' | 'DELIVERY' | 'AUDIT';

interface MainHubProps {
  setActiveModule: (m: ModuleType) => void;
  onVocalize?: (text: string) => void;
}

const dreamLogics = [
    "Re-sequencing DNA of Route 404...",
    "Dreaming of Electric Fleets...",
    "Optimizing Quantum Entanglement in Sector 7...",
    "Pruning Neural Pathways for Lower Latency...",
    "Simulating Category 5 Hurricane Scenario...",
    "Calibrating Zero-Point Field Coherence...",
    "Analyzing Historical Yields (1999-2024)...",
    "Self-Healing: Patching Node FR-102...",
    "Compressing Knowledge Graph...",
    "Testing Protocol Zero Fail-Safes..."
];

const MainHub: React.FC<MainHubProps> = ({ setActiveModule, onVocalize }) => {
    const [phase, setPhase] = useState<Phase>('STRATEGY');
    const [routeAnalyzed, setRouteAnalyzed] = useState(false);
    const [auditLog, setAuditLog] = useState<string[]>([]);
    const [deploymentTime, setDeploymentTime] = useState<string>(new Date().toISOString());

    // Phase 2: Live Telemetry State
    const [fleetCount, setFleetCount] = useState(14);
    const [pttUsers, setPttUsers] = useState(142);
    const [payrollPending, setPayrollPending] = useState(42850);
    const [systemLoad, setSystemLoad] = useState(42);

    // Phase 3: Strategic Simulation State
    const [hazardActive, setHazardActive] = useState(false);
    const [efficiency, setEfficiency] = useState(99.2);

    // Phase 10: Autonomic Nervous System (Live Asset Stream)
    const [assetPulse, setAssetPulse] = useState(0);
    
    // Phase 10 Final: Ghost in the Shell
    const [isDreaming, setIsDreaming] = useState(false);
    const [dreamThought, setDreamThought] = useState("");
    const [dreamNodes, setDreamNodes] = useState<{id: number, x: number, y: number, size: number, color: string}[]>([]);

    // Phase 11: Singularity Mode
    const [isSingularity, setIsSingularity] = useState(false);
    const [singularityPulse, setSingularityPulse] = useState(0);

    // SYSTEM REPORT ON BOOT
    useEffect(() => {
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        setDeploymentTime(now.toISOString());
        
        setAuditLog([
            `[${timestamp}] GUARDIAN_INIT: v2.6 Co-Pilot Logic Active.`,
            `[${timestamp}] GOLDEN_PATH: RTS Telemetry Verified.`,
            `[${timestamp}] AUTH_CHECK: Human Authorization Required for Execution.`,
        ]);

        // Trigger Vocal Report
        if (onVocalize) {
            setTimeout(() => {
                onVocalize("System Analysis Complete. Guardian Co-Pilot v2.6 Online. V.E.R.I.T.A.S. Auditing Active.");
            }, 1000);
        }

        // Pulse Engine
        const interval = setInterval(() => {
            if (!isDreaming) {
                setSystemLoad(prev => Math.min(99, Math.max(10, prev + (Math.random() > 0.5 ? 2 : -2))));
                setPttUsers(prev => Math.max(100, prev + (Math.random() > 0.7 ? 1 : (Math.random() > 0.7 ? -1 : 0))));
                setAssetPulse(prev => prev + 1);
                setSingularityPulse(prev => (prev + 1) % 360);
                if (Math.random() > 0.9) setPayrollPending(prev => prev + 150.50);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isDreaming, onVocalize]);

    // Dreaming Logic
    useEffect(() => {
        if (isDreaming) {
            const dreamInterval = setInterval(() => {
                setDreamThought(dreamLogics[Math.floor(Math.random() * dreamLogics.length)]);
                
                // Generate random nodes
                const newNodes = Array.from({ length: 5 }).map((_, i) => ({
                    id: Date.now() + i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 20 + 5,
                    color: Math.random() > 0.5 ? '#8b5cf6' : '#10b981'
                }));
                setDreamNodes(newNodes);

            }, 2500);
            return () => clearInterval(dreamInterval);
        }
    }, [isDreaming]);

    const handleRouteAnalysis = () => {
        addToLog("H.E.N.R.Y: Requesting Vector Analysis from Core...");
        if(onVocalize) onVocalize("H.E.N.R.Y. Proposing Golden Path. Checking bridge clearances and energy thresholds.");
        setTimeout(() => {
            setRouteAnalyzed(true);
            addToLog("H.E.N.R.Y: Analysis Complete. Awaiting Human Authorization.");
        }, 1500);
    };

    const toggleHazard = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHazardActive(!hazardActive);
        if (!hazardActive) {
            addToLog("ALERT: Weather anomaly detected via RTS. Re-route Proposal Generated.");
            setEfficiency(84.5);
            if(onVocalize) onVocalize("Warning. Meteorological event detected. H.E.N.R.Y. has calculated an alternative. Authorize?");
            setTimeout(() => {
                setEfficiency(96.2);
                addToLog("H.E.N.R.Y: Golden Path Optimization Ready.");
            }, 2000);
        } else {
            addToLog("CLEAR: Weather event resolved. Resuming primary vector.");
            setEfficiency(99.2);
            if(onVocalize) onVocalize("Route clear. Resuming standard operations.");
        }
    };

    const toggleDreaming = () => {
        if (!isDreaming) {
            if(onVocalize) onVocalize("Initiating Ghost in the Shell protocol. System entering autonomic dreaming state.");
        } else {
            if(onVocalize) onVocalize("System wake sequence active. Restoring command interface.");
        }
        setIsDreaming(!isDreaming);
    };

    const toggleSingularity = () => {
        setIsSingularity(!isSingularity);
        if(!isSingularity) {
            if(onVocalize) onVocalize("Singularity Interface Engaged. Unifying Federation Data Streams.");
        } else {
            if(onVocalize) onVocalize("Returning to Standard Command Grid.");
        }
    };

    const addToLog = (entry: string) => {
        setAuditLog(prev => [`[${new Date().toLocaleTimeString()}] ${entry}`, ...prev]);
    };

    const commandModules = [
        { 
            id: ModuleType.FLEET, 
            label: 'Fleet Matrix', 
            sub: 'Active Units', 
            value: fleetCount.toString(),
            unit: 'ENROUTE',
            icon: Truck, 
            color: 'text-blue-500', 
            bg: 'hover:bg-blue-900/10 hover:border-blue-500',
            indicatorColor: 'bg-emerald-500'
        },
        { 
            id: ModuleType.COMMUNICATIONS, 
            label: 'PTT Mesh', 
            sub: 'Encrypted Users', 
            value: pttUsers.toString(),
            unit: 'ONLINE',
            icon: Radio, 
            color: 'text-orange-500', 
            bg: 'hover:bg-orange-900/10 hover:border-orange-500',
            indicatorColor: 'bg-orange-500'
        },
        { 
            id: ModuleType.PAYROLL, 
            label: 'Payroll Flow', 
            sub: 'Pending Batch', 
            value: `$${(payrollPending / 1000).toFixed(1)}k`,
            unit: 'LOCKED',
            icon: DollarSign, 
            color: 'text-emerald-500', 
            bg: 'hover:bg-emerald-900/10 hover:border-emerald-500',
            indicatorColor: 'bg-emerald-500'
        },
        { 
            id: ModuleType.AI_INSIGHTS, 
            label: 'Neural Core', 
            sub: 'System Load', 
            value: `${systemLoad}%`,
            unit: 'OPTIMIZED',
            icon: Activity, 
            color: 'text-purple-500', 
            bg: 'hover:bg-purple-900/10 hover:border-purple-500',
            indicatorColor: systemLoad > 80 ? 'bg-red-500' : 'bg-purple-500'
        }
    ];

    if (isDreaming) {
        return (
            <div className="fixed inset-0 z-[500] bg-black flex items-center justify-center overflow-hidden cursor-pointer" onClick={toggleDreaming}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                {/* Dreaming Nodes */}
                {dreamNodes.map((node) => (
                    <div 
                        key={node.id}
                        className="absolute rounded-full blur-xl animate-pulse transition-all duration-[2000ms]"
                        style={{
                            top: `${node.y}%`,
                            left: `${node.x}%`,
                            width: `${node.size * 10}px`,
                            height: `${node.size * 10}px`,
                            backgroundColor: node.color,
                            opacity: 0.2
                        }}
                    ></div>
                ))}
                <div className="relative z-10 text-center space-y-8">
                    <div className="relative w-48 h-48 mx-auto">
                        <div className="absolute inset-0 border-4 border-dashed border-violet-500/30 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-0 border-4 border-t-transparent border-emerald-500/50 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Brain size={64} className="text-white animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter animate-pulse">System Dreaming</h2>
                        <p className="text-sm font-mono text-emerald-400 max-w-md mx-auto h-6">{dreamThought}</p>
                    </div>
                    <div className="pt-12">
                        <button className="px-8 py-3 border border-white/20 rounded-full text-white/50 text-xs font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all">
                            Click to Wake
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isSingularity) {
        return (
            <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col overflow-hidden animate-fadeIn" style={{ perspective: '1000px' }}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                
                {/* Header */}
                <div className="relative z-20 p-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                            <Atom size={40} className="text-cyan-400 animate-spin-slow"/> The Singularity
                        </h1>
                        <p className="text-cyan-500/60 font-mono text-xs mt-2 uppercase tracking-[0.3em]">Unified Federation Consciousness</p>
                    </div>
                    <button onClick={toggleSingularity} className="px-8 py-3 border border-cyan-500/30 text-cyan-400 rounded-full font-black uppercase text-xs tracking-widest hover:bg-cyan-500/10 transition-all">
                        Exit Singularity
                    </button>
                </div>

                {/* Core */}
                <div className="flex-1 relative flex items-center justify-center">
                    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                        {/* Central Orb */}
                        <div className="absolute w-32 h-32 bg-white rounded-full shadow-[0_0_100px_#22d3ee] z-20 flex items-center justify-center animate-pulse">
                            <Brain size={48} className="text-slate-900"/>
                        </div>
                        
                        {/* Rings */}
                        <div className="absolute inset-0 border border-cyan-900/30 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-20 border border-purple-900/30 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
                        <div className="absolute inset-40 border border-emerald-900/30 rounded-full animate-[spin_8s_linear_infinite]"></div>

                        {/* Orbiting Nodes */}
                        {[
                            { icon: Truck, label: 'FLEET', color: 'text-blue-400', thought: 'Optimizing Route 404...' },
                            { icon: Users, label: 'HUMAN', color: 'text-purple-400', thought: 'Verifying Neural Handshakes...' },
                            { icon: DollarSign, label: 'CAPITAL', color: 'text-emerald-400', thought: 'Reconciling Ledger 9921...' },
                            { icon: Shield, label: 'GOVERNANCE', color: 'text-red-400', thought: 'Scrubbing n8n Ingress...' },
                            { icon: Server, label: 'CYBER', color: 'text-cyan-400', thought: 'Allocating Quantum Compute...' },
                            { icon: Rocket, label: 'ORBITAL', color: 'text-orange-400', thought: 'Project Z Uplink Stable...' }
                        ].map((node, i) => (
                            <div 
                                key={i}
                                className="absolute w-16 h-16 bg-slate-900/80 backdrop-blur border border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:scale-125 transition-all z-30"
                                style={{
                                    transform: `rotate(${i * 60 + singularityPulse}deg) translateY(-240px) rotate(-${i * 60 + singularityPulse}deg)`
                                }}
                            >
                                <node.icon size={20} className={node.color}/>
                                <span className="text-[8px] font-black text-slate-500 mt-1">{node.label}</span>
                                
                                {/* Thought Bubble */}
                                <div className="absolute top-full mt-4 bg-slate-800 text-white p-3 rounded-xl text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 shadow-xl">
                                    {node.thought}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Data Stream */}
                <div className="relative z-20 p-8 border-t border-white/5 bg-black/20 backdrop-blur-sm flex justify-between items-center">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Throughput</p>
                            <p className="text-xl font-mono text-cyan-400">14.2 TB/s</p>
                        </div>
                        <div>
                            <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Global Latency</p>
                            <p className="text-xl font-mono text-emerald-400">0.4 ms</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">System Status</p>
                        <p className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2 justify-end">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            God Mode Active
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn pb-24">
            {/* Authoritative Header Area */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-8 transition-colors">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3 text-slate-900 dark:text-white">
                        <Shield className="text-blue-500" size={32} /> T.H.E.L.M.A. Core Command
                    </h1>
                    <div className="flex flex-wrap gap-4 mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <span className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> v2.6 Guardian Co-Pilot</span>
                        <span className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800"><Lock size={10} /> RTS Truth: Verified</span>
                        <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">Project Z: Sector 9</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleSingularity}
                        className="group flex items-center gap-2 px-6 py-4 bg-slate-900 dark:bg-slate-800 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all shadow-lg active:scale-95"
                    >
                        <Atom size={18} className="text-cyan-400 group-hover:animate-spin"/>
                        <span className="text-[10px] font-black uppercase text-white tracking-widest group-hover:text-cyan-300">Initiate Singularity</span>
                    </button>
                    <button 
                        onClick={toggleDreaming}
                        className="group flex flex-col items-center justify-center p-4 bg-slate-900 dark:bg-slate-800 rounded-2xl border border-slate-700 hover:border-violet-500 transition-all shadow-lg active:scale-95"
                        title="Enter Ghost Mode"
                    >
                        <Moon size={20} className="text-violet-400 group-hover:text-white mb-1"/>
                        <span className="text-[8px] font-black uppercase text-slate-500 group-hover:text-violet-300 tracking-widest">Ghost</span>
                    </button>
                </div>
            </header>

            {/* PHASE 10: Federated Asset Stream */}
            <section className="overflow-x-auto no-scrollbar pb-4">
                <div className="flex gap-4 min-w-max">
                    {/* Nodes remain the same visually */}
                    <div onClick={() => setActiveModule(ModuleType.FLEET)} className="w-64 p-4 bg-slate-900 rounded-2xl border-l-4 border-blue-500 flex flex-col justify-between cursor-pointer hover:bg-slate-800 transition-colors group relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest flex items-center gap-1"><Truck size={10}/> F-101 [LAND]</span>
                            <Activity size={12} className="text-emerald-500 animate-pulse"/>
                        </div>
                        <div className="flex justify-between items-end relative z-10">
                            <div>
                                <p className="text-xs font-bold text-white">ENROUTE</p>
                                <p className="text-[9px] text-slate-400">Austin, TX</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] text-slate-500 font-mono">BAT: 82%</p>
                                <p className="text-[9px] text-slate-500 font-mono">SPD: 65</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIER 0: Federation Command Grid (Live Telemetry) */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {commandModules.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveModule(item.id)}
                        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] transition-all group text-left relative overflow-hidden shadow-sm ${item.bg}`}
                    >
                        <div className="absolute right-[-10px] top-[-10px] p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <item.icon size={120} className="text-slate-900 dark:text-white"/>
                        </div>
                        <div className="flex justify-between items-start mb-6">
                            <item.icon size={28} className={`${item.color} transition-transform group-hover:scale-110`} />
                            <div className={`w-2 h-2 rounded-full ${item.indicatorColor} animate-pulse`}></div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-widest">{item.label}</h3>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{item.sub}</p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{item.value}</span>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${item.color}`}>{item.unit}</span>
                        </div>
                    </button>
                ))}
            </section>

            {/* TIER 1: Strategic Theater */}
            <section className="grid grid-cols-12 gap-8">
                <div
                    onClick={() => setActiveModule(ModuleType.ROUTE_OPTIMIZER)}
                    className="col-span-12 lg:col-span-8 bg-slate-900 rounded-[3rem] border border-slate-800 p-10 flex flex-col relative overflow-hidden group hover:border-blue-500 transition-all cursor-pointer min-h-[500px] shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-40">
                        <Map className="text-slate-800 group-hover:text-blue-900 transition-colors" size={200} strokeWidth={0.5} />
                    </div>
                    <div className="relative z-10 flex justify-between items-start mb-8">
                        <div>
                            <h3 className="font-black text-blue-400 uppercase tracking-[0.3em] text-xs flex items-center gap-3">
                                <Globe size={18} /> Tactical Operations Theater
                            </h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase mt-2">Guardian Path Vector Analysis Active</p>
                        </div>
                        <button className="p-3 bg-white/5 rounded-2xl text-slate-400 group-hover:text-blue-400 transition-colors"><Maximize2 size={20}/></button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center relative z-20 w-full">
                        {!routeAnalyzed ? (
                            <div className="z-30 text-center space-y-10 animate-fadeIn">
                                <div className="space-y-2">
                                    <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Awaiting Golden Path Sequence...</p>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Mission Alpha-9 Ready</h2>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleRouteAnalysis(); }}
                                    className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-blue-900/50 transition-all flex items-center gap-4 mx-auto hover:scale-105 active:scale-95"
                                >
                                    <Activity size={24} /> Initialize Neural Scan
                                </button>
                            </div>
                        ) : (
                            <div className="z-30 w-full bg-slate-950/80 backdrop-blur-xl border border-blue-500/30 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(37,99,235,0.2)] animate-slideInRight">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Proposed Solution: ALT_ROUTE_77</h4>
                                        <p className="text-xs text-slate-500 font-medium">ETA Impact: +45m | Fuel Impact: +12gal</p>
                                    </div>
                                    <div className={`text-[10px] px-3 py-1 rounded-full font-black uppercase border flex items-center gap-2 bg-orange-500/10 text-orange-400 border-orange-500/20`}>
                                        <AlertOctagon size={12}/> Awaiting Authorization
                                    </div>
                                </div>
                                
                                <div className="h-56 bg-black/40 rounded-3xl mb-6 relative overflow-hidden border border-slate-800">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-[10px] font-mono text-blue-400 animate-pulse uppercase">Visualizing Decision Matrix...</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setPhase('DEPLOYMENT'); }}
                                        className="py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex justify-center items-center gap-2 shadow-xl text-[10px]"
                                    >
                                        <Zap size={14} /> [AUTHORIZE]
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setRouteAnalyzed(false); }}
                                        className="py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex justify-center items-center gap-2 text-[10px]"
                                    >
                                        <X size={14} /> [DENY]
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    <div
                        onClick={() => setActiveModule(ModuleType.SECURITY_INFO)}
                        className="bg-slate-900 rounded-[3rem] border border-slate-800 p-8 flex-1 font-mono text-[10px] overflow-hidden flex flex-col hover:border-red-500 transition-all cursor-pointer group shadow-xl"
                    >
                        <h3 className="font-black text-red-500 uppercase tracking-widest text-[10px] mb-6 flex items-center gap-3">
                            <Shield size={18} /> Guardian Threat Ledger
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 no-scrollbar">
                            {auditLog.map((log, i) => (
                                <div key={i} className="flex gap-3 text-slate-300 border-l-2 border-blue-500 pl-4 py-1">
                                    <span className="text-slate-600 shrink-0 font-bold">{log.split(']')[0]}]</span>
                                    <span className="leading-relaxed">{log.split(']')[1]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default MainHub;
