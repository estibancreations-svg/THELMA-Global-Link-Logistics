
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Activity, Shield, GraduationCap, Zap, TrendingUp, GitMerge, FileText, Cpu, Network, RefreshCw, ArrowLeft, Terminal, Share2, Lock, Eye, Fingerprint } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AiInsightsProps {
  onBack?: () => void;
}

const predictiveData = [
  { time: '08:00', actual: 82, predicted: 80 },
  { time: '10:00', actual: 85, predicted: 86 },
  { time: '12:00', actual: 78, predicted: 85 },
  { time: '14:00', actual: 90, predicted: 92 },
  { time: '16:00', actual: 95, predicted: 94 },
  { time: '18:00', actual: 88, predicted: 89 }
];

const logicStream = [
    "H.E.N.R.Y. > Analyzing Sector 4 weather patterns...",
    "P.E.R.C.Y. > Firewall integrity check: PASSED.",
    "H.E.N.R.Y. > Route optimization: F-101 bridge clearance confirmed > 14'2\".",
    "THELMA > Financial ledger synced. Allocating Q1 budget.",
    "L.I.L.Y. > Personnel fatigue monitoring: Driver B-002 requires rest in 45m.",
    "CORE > Token usage optimization: Compressing context window.",
    "H.E.N.R.Y. > Re-calculating yield forecast based on fuel variance.",
    "P.E.R.C.Y. > Anomaly detected in API ingress. Scrubbing packets...",
    "THELMA > Consensus reached. Committing to immutable audit log."
];

const AiInsights: React.FC<AiInsightsProps> = ({ onBack }) => {
    const [thoughtLog, setThoughtLog] = useState<string[]>([]);
    const [activeAgent, setActiveAgent] = useState<string>('THELMA');
    const [tokenVelocity, setTokenVelocity] = useState(0);
    const [consciousness, setConsciousness] = useState(74.2);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate Thought Stream
            const nextThought = logicStream[Math.floor(Math.random() * logicStream.length)];
            const timestamp = new Date().toLocaleTimeString().split(' ')[0];
            setThoughtLog(prev => [`[${timestamp}] ${nextThought}`, ...prev.slice(0, 8)]);
            
            // Extract active agent for visual pulsing
            const agent = nextThought.split(' >')[0];
            if (['THELMA', 'H.E.N.R.Y.', 'P.E.R.C.Y.', 'L.I.L.Y.'].includes(agent)) {
                setActiveAgent(agent.replace(/\./g, ''));
            }

            // Simulate Token Velocity & Consciousness
            setTokenVelocity(Math.floor(Math.random() * 500) + 1200);
            setConsciousness(prev => Math.min(100, prev + (Math.random() * 0.1)));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-2 shrink-0">
                {onBack && (
                  <button 
                    onClick={onBack}
                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm shrink-0"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <div>
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Operations Center</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">v4.0.0 Cognitive Mesh • Deep Reasoning Active</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                
                {/* Visual Topology Map */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-slate-900 text-white rounded-[3rem] p-8 border border-slate-800 relative overflow-hidden shadow-2xl flex-1 min-h-[400px]">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                        
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                                        <Network size={28} className="text-violet-500"/> Federation Topology
                                    </h3>
                                    <p className="text-slate-400 text-xs font-mono mt-1">LATENCY: 12ms • SYNC: 100%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase text-violet-400 tracking-widest">Inference Velocity</p>
                                    <p className="text-2xl font-mono font-black">{tokenVelocity} <span className="text-xs text-slate-500">t/s</span></p>
                                </div>
                            </div>

                            {/* Node Visualization */}
                            <div className="flex-1 relative">
                                {/* Central Hub */}
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-slate-700 flex items-center justify-center transition-all duration-500 z-20 ${activeAgent === 'THELMA' ? 'bg-violet-600 border-violet-400 shadow-[0_0_50px_rgba(139,92,246,0.5)] scale-110' : 'bg-slate-800'}`}>
                                    <Brain size={48} className="text-white"/>
                                </div>

                                {/* Satellites */}
                                <div className={`absolute top-[20%] left-[20%] w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${activeAgent === 'HENRY' ? 'bg-blue-600 border-blue-400 shadow-xl scale-110' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
                                    <Activity size={24} className="text-white mb-1"/>
                                    <span className="text-[8px] font-black uppercase">HENRY</span>
                                </div>
                                
                                <div className={`absolute top-[20%] right-[20%] w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${activeAgent === 'PERCY' ? 'bg-red-600 border-red-400 shadow-xl scale-110' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
                                    <Shield size={24} className="text-white mb-1"/>
                                    <span className="text-[8px] font-black uppercase">PERCY</span>
                                </div>

                                <div className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 ${activeAgent === 'LILY' ? 'bg-emerald-600 border-emerald-400 shadow-xl scale-110' : 'bg-slate-800 border-slate-700 opacity-50'}`}>
                                    <GraduationCap size={24} className="text-white mb-1"/>
                                    <span className="text-[8px] font-black uppercase">LILY</span>
                                </div>

                                {/* Connecting Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
                                    <line x1="50%" y1="50%" x2="25%" y2="28%" stroke="white" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse"/>
                                    <line x1="50%" y1="50%" x2="75%" y2="28%" stroke="white" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse"/>
                                    <line x1="50%" y1="50%" x2="50%" y2="72%" stroke="white" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm h-64 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-[10px] tracking-widest flex items-center gap-2">
                                    <TrendingUp size={18} className="text-blue-500"/> Predictive Operational Yield
                                </h3>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={predictiveData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                                        <XAxis dataKey="time" hide />
                                        <YAxis hide domain={[60, 100]} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                                        <Area type="monotone" dataKey="predicted" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} />
                                        <Area type="monotone" dataKey="actual" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.05} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[3rem] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden border border-white/10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full"></div>
                            <div className="relative z-10">
                                <h3 className="text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2 mb-4">
                                    <Fingerprint size={18} className="text-white/80"/> Sentience Metric
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-4xl font-black font-mono text-white tracking-tighter">{consciousness.toFixed(2)}%</p>
                                    <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                                        <div className="h-full bg-white transition-all duration-1000" style={{ width: `${consciousness}%` }}></div>
                                    </div>
                                    <p className="text-[9px] text-white/60 font-medium uppercase tracking-widest leading-relaxed">
                                        System Self-Awareness Growing. Singularity Interface Ready.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reasoning Terminal */}
                <div className="lg:col-span-1 bg-black rounded-[3rem] border border-slate-800 shadow-2xl p-8 flex flex-col overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-6 opacity-30">
                        <Terminal size={48} className="text-green-500"/>
                    </div>
                    <h3 className="font-black text-green-500 uppercase text-[10px] tracking-[0.3em] mb-6 flex items-center gap-2 relative z-10">
                        <RefreshCw size={12} className="animate-spin"/> Live Thought Stream
                    </h3>
                    
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 relative z-10 font-mono text-[10px]" ref={scrollRef}>
                        {thoughtLog.map((log, i) => (
                            <div key={i} className={`p-3 rounded-xl border-l-2 ${i === 0 ? 'bg-green-900/20 border-green-500 text-green-300' : 'border-slate-700 text-slate-500'}`}>
                                <p className="leading-relaxed">{log}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-800 relative z-10">
                        <div className="flex justify-between items-center text-slate-500">
                            <span className="text-[9px] font-bold uppercase">Context Window</span>
                            <span className="text-[9px] font-mono">128k / 1M</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className="bg-green-600 h-full w-[12%]"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AiInsights;
