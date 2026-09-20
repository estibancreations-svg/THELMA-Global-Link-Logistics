
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Cpu, Shield, GraduationCap, Activity, Zap, MessageSquare, Database, Network, ArrowLeft, Terminal, Server, Share2 } from 'lucide-react';

interface AgentHubProps {
  onBack?: () => void;
}

const thoughts = {
    HENRY: ["Optimizing Route 404...", "Analyzing fuel viscosity...", "Checking bridge clearances...", "Re-calculating ETA...", "Syncing with Fleet Matrix..."],
    LILY: ["Reviewing biometric stress levels...", "Generating VR failure scenario...", "Updating training weights...", "Simulating hazardous weather...", "Calibrating Holo-Avatar..."],
    PERCY: ["Scrubbing inbound packets...", "Verifying ledger hash...", "Firewall integrity check...", "Auditing API keys...", "Isolating anomalous node..."]
};

const AgentHub: React.FC<AgentHubProps> = ({ onBack }) => {
    const [systemLoad, setSystemLoad] = useState(42);
    const [neuralActivity, setNeuralActivity] = useState<number[]>([10, 20, 15, 30, 25, 40, 35]);
    
    const [agents, setAgents] = useState({
        HENRY: { load: 45, task: 'Idle', status: 'ONLINE' },
        LILY: { load: 32, task: 'Idle', status: 'ONLINE' },
        PERCY: { load: 12, task: 'Idle', status: 'ONLINE' }
    });

    const [liveFeed, setLiveFeed] = useState<{agent: string, msg: string, time: string}[]>([]);
    const feedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Fluctuate System Load
            setSystemLoad(prev => Math.max(20, Math.min(99, prev + (Math.random() > 0.5 ? 2 : -2))));
            
            // Update Agents
            setAgents(prev => ({
                HENRY: { ...prev.HENRY, load: Math.max(10, Math.min(95, prev.HENRY.load + (Math.random() * 10 - 5))) },
                LILY: { ...prev.LILY, load: Math.max(10, Math.min(95, prev.LILY.load + (Math.random() * 10 - 5))) },
                PERCY: { ...prev.PERCY, load: Math.max(10, Math.min(95, prev.PERCY.load + (Math.random() * 10 - 5))) }
            }));

            // Inject Thought
            if (Math.random() > 0.6) {
                const agentKeys = ['HENRY', 'LILY', 'PERCY'];
                const agent = agentKeys[Math.floor(Math.random() * agentKeys.length)];
                const msg = thoughts[agent as keyof typeof thoughts][Math.floor(Math.random() * 5)];
                const time = new Date().toLocaleTimeString().split(' ')[0];
                
                setAgents(prev => ({
                    ...prev,
                    [agent]: { ...prev[agent as keyof typeof prev], task: msg }
                }));

                setLiveFeed(prev => [{ agent, msg, time }, ...prev.slice(0, 6)]);
            }

            // Visualizer Data
            setNeuralActivity(prev => [...prev.slice(1), Math.floor(Math.random() * 50)]);

        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 shrink-0">
                {onBack && (
                    <button 
                        onClick={onBack}
                        className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm shrink-0"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}
                <div>
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cognitive Mesh v4.0.0</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">Federated Agent Handshake Matrix</p>
                </div>
            </div>

            {/* Main Status Panel */}
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border border-slate-800 shrink-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Brain className="text-purple-400 animate-pulse" size={32} />
                            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight">Neural Core Active</h1>
                        </div>
                        <p className="text-slate-300 max-w-2xl text-xs md:text-sm font-medium">
                            Real-time monitoring of the Federated AI Mesh. Manage cognitive load, token consumption, and inter-agent handshakes.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-purple-300 uppercase tracking-widest font-black mb-1">Total System Load</p>
                        <div className="flex items-end justify-end gap-2">
                            <p className="text-5xl font-black font-mono">{systemLoad}%</p>
                            <Activity size={24} className={`mb-2 ${systemLoad > 80 ? 'text-red-500 animate-bounce' : 'text-emerald-500'}`}/>
                        </div>
                    </div>
                </div>
                
                {/* Visualizer */}
                <div className="flex items-end gap-1 h-12 mt-6 opacity-50">
                    {neuralActivity.map((h, i) => (
                        <div key={i} className="flex-1 bg-purple-500 rounded-t-sm transition-all duration-300" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
            </div>

            {/* Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* HENRY */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-500 transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight">H.E.N.R.Y.</h3>
                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Ops & Reasoning</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>
                    <div className="space-y-4 flex-1">
                        <div>
                            <div className="flex justify-between text-[9px] font-black uppercase mb-1">
                                <span className="text-slate-500">Heuristic Depth</span>
                                <span className="font-mono text-blue-600">Lvl 4</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${agents.HENRY.load}%` }}></div>
                            </div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Current Task</p>
                            <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate">{agents.HENRY.task}</p>
                        </div>
                    </div>
                </div>
                
                {/* LILY */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500 transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight">L.I.L.Y.</h3>
                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Training & Sim</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>
                    <div className="space-y-4 flex-1">
                        <div>
                            <div className="flex justify-between text-[9px] font-black uppercase mb-1">
                                <span className="text-slate-500">Learning Rate</span>
                                <span className="font-mono text-emerald-600">0.94 alpha</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-600 h-full transition-all duration-1000" style={{ width: `${agents.LILY.load}%` }}></div>
                            </div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Current Task</p>
                            <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate">{agents.LILY.task}</p>
                        </div>
                    </div>
                </div>

                {/* PERCY */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-red-500 transition-all flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-slate-800 text-white rounded-2xl">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight">P.E.R.C.Y.</h3>
                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Governance & Risk</p>
                            </div>
                        </div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    </div>
                    <div className="space-y-4 flex-1">
                        <div>
                            <div className="flex justify-between text-[9px] font-black uppercase mb-1">
                                <span className="text-slate-500">Policy Checks</span>
                                <span className="font-mono text-slate-900 dark:text-white">1,402 / min</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-slate-800 dark:bg-slate-500 h-full transition-all duration-1000" style={{ width: `${agents.PERCY.load}%` }}></div>
                            </div>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Current Task</p>
                            <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate">{agents.PERCY.task}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Neural Feed */}
            <div className="bg-black rounded-[2.5rem] p-6 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col h-48 shrink-0">
                <div className="absolute top-4 right-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live Neural Feed</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <Terminal size={20} className="text-slate-500"/>
                    <h3 className="text-white font-black uppercase text-sm tracking-widest">Inter-Agent Handshake</h3>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 font-mono text-[10px]" ref={feedRef}>
                    {liveFeed.map((log, i) => (
                        <div key={i} className="flex gap-4 animate-slideInRight">
                            <span className="text-slate-600">{log.time}</span>
                            <span className={`font-bold ${log.agent === 'HENRY' ? 'text-blue-400' : log.agent === 'LILY' ? 'text-emerald-400' : 'text-red-400'}`}>{log.agent}:</span>
                            <span className="text-slate-300">{log.msg}</span>
                        </div>
                    ))}
                    {liveFeed.length === 0 && <span className="text-slate-600 italic">Initializing neural streams...</span>}
                </div>
            </div>
        </div>
    );
};

export default AgentHub;
