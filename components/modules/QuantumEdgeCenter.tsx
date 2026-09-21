
import React, { useState, useEffect } from 'react';
import { Network, Zap, Cpu, Activity, ShieldCheck, Map, SignalHigh, Globe, RefreshCw, Layers, Database, Radio, ArrowLeft, Power, ToggleLeft, ToggleRight, WifiOff, Cloud, Share2, MessageSquare, ThumbsUp, AlertTriangle, CheckCircle, Infinity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface QuantumEdgeCenterProps {
  onBack?: () => void;
}

const EdgeNode = ({ id, status, load, lat, lon, localMode, entangled }: { id: string, status: string, load: number, lat: string, lon: string, localMode: boolean, entangled?: boolean }) => (
    <div className={`p-5 border rounded-2xl shadow-sm transition-all duration-500 ${entangled ? 'bg-purple-900/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : localMode ? 'bg-emerald-900/10 border-emerald-500/50' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-500'}`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg transition-all ${entangled ? 'bg-purple-600 text-white' : localMode ? 'bg-emerald-100 text-emerald-600' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-600'}`}>
                {entangled ? <Infinity size={20} className="animate-pulse" /> : localMode ? <Cpu size={20} /> : <Cloud size={20} />}
            </div>
            <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
        </div>
        <h4 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-tight">{id}</h4>
        <p className="text-[9px] text-slate-500 font-mono mt-1">{lat}, {lon}</p>
        <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase">
                <span className={entangled ? 'text-purple-400' : 'text-slate-400'}>{entangled ? 'Quantum Load' : localMode ? 'Local Load' : 'Cloud Uplink'}</span>
                <span className="text-slate-700 dark:text-slate-300">{load}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`${entangled ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : localMode ? 'bg-emerald-500' : 'bg-violet-500'} h-full transition-all duration-1000`} style={{ width: `${load}%` }}></div>
            </div>
        </div>
    </div>
);

const QuantumEdgeCenter: React.FC<QuantumEdgeCenterProps> = ({ onBack }) => {
    const [throughput, setThroughput] = useState(14.2);
    const [localInference, setLocalInference] = useState(false);
    const [nodeLoad, setNodeLoad] = useState([45, 62, 28, 91]);
    
    // Phase 8: Quantum States
    const [quantumEntangled, setQuantumEntangled] = useState(false);
    const [projectZUplink, setProjectZUplink] = useState(false);
    
    // Swarm State
    const [swarmConsensus, setSwarmConsensus] = useState<number>(0);
    const [showConsensusModal, setShowConsensusModal] = useState(false);
    const [consensusApproved, setConsensusApproved] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setThroughput(prev => prev + (Math.random() > 0.5 ? 0.2 : -0.1));
            
            setNodeLoad(prev => prev.map(n => {
                let load = n + (Math.random() * 10 - 5);
                if (projectZUplink) load = 98 + Math.random(); // Spike load when Project Z is active
                return Math.max(10, Math.min(99, load));
            }));
            
            // Simulate Swarm Consensus Building randomly
            if (localInference && !consensusApproved && Math.random() > 0.8 && !projectZUplink) {
                setSwarmConsensus(prev => {
                    const next = Math.min(100, prev + 25);
                    if (next === 100) setTimeout(() => setShowConsensusModal(true), 500);
                    return next;
                });
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [localInference, consensusApproved, projectZUplink]);

    const toggleInference = () => {
        setLocalInference(!localInference);
        setSwarmConsensus(0); 
        setConsensusApproved(false);
        setShowConsensusModal(false);
    };

    const handleApproveSwarm = () => {
        setConsensusApproved(true);
        setShowConsensusModal(false);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 relative">
            
            {/* Swarm Consensus Notification */}
            {showConsensusModal && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md border border-purple-500/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)] p-6 max-w-md w-full animate-bounce-in text-white">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-600 rounded-xl shadow-lg shrink-0 animate-pulse">
                            <Share2 size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-1">Swarm Consensus Reached</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                5 nearby units (Trucks F-101, F-105, & 3 Drones) have identified a localized weather event at Mile 45. They recommend a synchronized detour.
                            </p>
                            
                            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-4">
                                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-1">
                                    <span>Consensus Confidence</span>
                                    <span className="text-white">98.4%</span>
                                </div>
                                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 h-full w-[98%]"></div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={handleApproveSwarm}
                                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                                >
                                    <ThumbsUp size={14} /> Approve Detour
                                </button>
                                <button 
                                    onClick={() => setShowConsensusModal(false)}
                                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    Ignore
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header: Context */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm shrink-0"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Quantum & Edge Intelligence</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                            <span className={`w-2 h-2 rounded-full animate-pulse ${quantumEntangled ? 'bg-purple-500' : localInference ? 'bg-emerald-500' : 'bg-violet-500'}`}></span>
                            v4.0.0 Global Mesh Deployment • {quantumEntangled ? 'ENTANGLED' : localInference ? 'LOCAL MESH' : 'CLOUD HYBRID'}
                        </p>
                    </div>
                </div>
                
                {/* Control Array */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <button 
                        onClick={() => { setProjectZUplink(!projectZUplink); setQuantumEntangled(!projectZUplink); }}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all shadow-lg ${projectZUplink ? 'bg-purple-600 border-purple-500 text-white animate-pulse' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'}`}
                    >
                        {projectZUplink ? <Infinity size={18} /> : <Zap size={18} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{projectZUplink ? 'Project Z Uplink' : 'Standard Compute'}</span>
                    </button>

                    <button 
                        onClick={toggleInference}
                        className={`flex items-center justify-between gap-4 p-3 rounded-xl border shadow-sm transition-all ${localInference ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}
                    >
                        <div className="text-left">
                            <p className="text-[9px] font-black uppercase tracking-widest">{localInference ? 'Local Inference' : 'Cloud Processing'}</p>
                            <p className="text-[8px] opacity-70">{localInference ? 'Zero-Latency • Offline Capable' : 'Centralized • High Bandwidth'}</p>
                        </div>
                        {localInference ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Visualization Map */}
                <div className="lg:col-span-3 space-y-6">
                    <div className={`bg-slate-950 rounded-3xl border h-[300px] md:h-[500px] relative overflow-hidden shadow-2xl group transition-all duration-1000 ${quantumEntangled ? 'border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.2)]' : 'border-slate-800'}`}>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${quantumEntangled ? '#a855f7' : localInference ? '#10b981' : '#8b5cf6'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
                        
                        {/* Overlay Status */}
                        <div className="absolute top-8 left-8 z-20 pointer-events-none">
                            <h3 className={`font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-2 ${quantumEntangled ? 'text-purple-400' : localInference ? 'text-emerald-400' : 'text-violet-400'}`}>
                                <Globe size={16} /> {quantumEntangled ? 'Quantum Entanglement Grid' : localInference ? 'Distributed Inference Mesh' : 'Global Cloud Topology'}
                            </h3>
                            <p className="text-slate-500 text-[9px] max-w-[200px] mb-4">
                                {quantumEntangled ? 'Q-Links Active. Hyper-compute resources diverted to Project Z gravitic calculations.' : localInference 
                                    ? 'Processing data at the edge. 0ms latency hop. Privacy scrubbing active.' 
                                    : 'Standard routing via US-EAST-1. Full data retention active.'}
                            </p>
                            
                            {localInference && !quantumEntangled && (
                                <div className="bg-slate-900/80 backdrop-blur border border-purple-500/30 p-3 rounded-xl max-w-[220px]">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[9px] font-black uppercase text-purple-400 flex items-center gap-1">
                                            <Share2 size={10} /> Swarm Consensus
                                        </span>
                                        <span className="text-[9px] font-mono text-white">{swarmConsensus}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-purple-500 h-full transition-all duration-300" 
                                            style={{ width: `${swarmConsensus}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Animated Nodes */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[
                                { t: '20%', l: '30%' }, { t: '50%', l: '50%' }, { t: '70%', l: '20%' }, { t: '40%', l: '80%' }
                            ].map((pos, i) => (
                                <div key={i} className="absolute transition-all duration-1000" style={{ top: pos.t, left: pos.l }}>
                                    <div className={`w-3 h-3 rounded-full animate-ping absolute ${quantumEntangled ? 'bg-purple-500 duration-500' : localInference ? 'bg-emerald-500' : 'bg-violet-500'}`}></div>
                                    <div className={`w-3 h-3 rounded-full relative z-10 ${quantumEntangled ? 'bg-purple-400 shadow-[0_0_30px_#a855f7] scale-125' : localInference ? 'bg-emerald-400 shadow-[0_0_20px_#10b981]' : 'bg-violet-400 shadow-[0_0_20px_#8b5cf6]'}`}></div>
                                    
                                    {/* Connectivity Lines */}
                                    {(localInference || quantumEntangled) && (
                                        <svg className="absolute top-1.5 left-1.5 w-[400px] h-[400px] overflow-visible opacity-40">
                                            <line 
                                                x1="0" y1="0" 
                                                x2={i === 0 ? 150 : i === 1 ? -100 : 50} 
                                                y2={80} 
                                                stroke={quantumEntangled ? '#a855f7' : '#10b981'} 
                                                strokeWidth={quantumEntangled ? 3 : 1} 
                                                strokeDasharray={quantumEntangled ? "none" : "2 2"} 
                                                className={quantumEntangled ? "animate-pulse" : ""}
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Node Status Column */}
                <div className="space-y-4">
                    <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-widest">Active Edge Nodes</h3>
                    <EdgeNode id="NODE-NY-01" status="Active" load={nodeLoad[0]} lat="40.71" lon="-74.00" localMode={localInference} entangled={quantumEntangled} />
                    <EdgeNode id="NODE-LA-04" status="Active" load={nodeLoad[1]} lat="34.05" lon="-118.24" localMode={localInference} entangled={quantumEntangled} />
                    <EdgeNode id="NODE-TX-09" status="Active" load={nodeLoad[2]} lat="31.96" lon="-99.90" localMode={localInference} entangled={quantumEntangled} />
                    <EdgeNode id="NODE-EU-02" status="Warning" load={nodeLoad[3]} lat="51.50" lon="-0.12" localMode={localInference} entangled={quantumEntangled} />
                </div>
            </div>
        </div>
    );
};

export default QuantumEdgeCenter;
