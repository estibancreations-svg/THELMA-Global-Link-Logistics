
import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, Box, CheckCircle, Server, Terminal, UploadCloud, RefreshCw, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

const Deployment: React.FC = () => {
    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const [buildStep, setBuildStep] = useState(0);
    const [latency, setLatency] = useState(24);
    const scrollRef = useRef<HTMLDivElement>(null);

    const buildSequence = [
        "Initializing T.H.E.L.M.A. Core...",
        "Fetching origin/main...",
        "Validating Architect Signature BEE-001...",
        "Compiling React Fiber nodes...",
        "Optimizing assets (3.4s)...",
        "Running P.E.R.C.Y. Security Scan...",
        "0 Vulnerabilities Found.",
        "Containerizing Docker image...",
        "Pushing to Google Cloud Run...",
        "Routing traffic to US-CENTRAL1...",
        "Deployment Successful. Hash: 8821a9"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Latency Jitter
            setLatency(prev => Math.max(12, Math.min(90, prev + (Math.random() * 10 - 5))));

            // Terminal Logic
            if (Math.random() > 0.7) {
                setBuildStep(prev => {
                    const next = (prev + 1) % buildSequence.length;
                    const newLine = `[${new Date().toLocaleTimeString()}] ${buildSequence[next]}`;
                    setTerminalLines(lines => [...lines.slice(-8), newLine]); // Keep last 9 lines
                    return next;
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll terminal
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [terminalLines]);

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden border border-white/10">
                <div className="relative z-10">
                     <h1 className="text-3xl font-black uppercase tracking-tight mb-2">System Deployment</h1>
                     <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-blue-200">
                         <span className="flex items-center gap-1 text-emerald-400"><CheckCircle size={14}/> Production: Healthy</span>
                         <span className="flex items-center gap-1"><GitBranch size={14}/> Branch: main</span>
                         <span className="flex items-center gap-1"><Box size={14}/> v4.0.0-stable</span>
                     </div>
                </div>
                <div className="relative z-10 mt-6 md:mt-0 flex gap-4">
                    <button className="px-6 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                        <RefreshCw size={14} className="animate-spin"/> Rolling Restart
                    </button>
                </div>
                <UploadCloud className="absolute right-8 bottom-[-20px] opacity-10" size={160} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <h3 className="font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3 uppercase text-xs tracking-widest">
                        <Server size={18} className="text-blue-600"/> Environment Matrix
                    </h3>
                    <div className="space-y-4 flex-1">
                        <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-2xl">
                            <div>
                                <p className="font-black text-slate-800 dark:text-white text-xs uppercase">US-East-1 (Primary)</p>
                                <p className="text-[10px] text-slate-500 font-mono mt-1">Latency: {Math.floor(latency)}ms</p>
                            </div>
                            <span className="text-emerald-600 dark:text-emerald-400 font-black text-[9px] bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Online
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-2xl opacity-70">
                            <div>
                                <p className="font-black text-slate-800 dark:text-white text-xs uppercase">EU-West-2 (Failover)</p>
                                <p className="text-[10px] text-slate-500 font-mono mt-1">Latency: {Math.floor(latency * 2.5)}ms</p>
                            </div>
                            <span className="text-emerald-600 dark:text-emerald-400 font-black text-[9px] bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full uppercase tracking-widest">
                                Standby
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl">
                            <div>
                                <p className="font-black text-slate-800 dark:text-white text-xs uppercase">Staging / QA</p>
                                <p className="text-[10px] text-slate-500 font-mono mt-1">v4.1.0-alpha</p>
                            </div>
                            <span className="text-blue-600 dark:text-blue-400 font-black text-[9px] bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                                Deploying...
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-black rounded-[3rem] p-8 shadow-xl border border-slate-800 flex flex-col overflow-hidden relative min-h-[400px]">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <Terminal size={64} className="text-emerald-500"/>
                    </div>
                    <h3 className="font-black text-white mb-6 flex items-center gap-3 uppercase text-xs tracking-widest relative z-10">
                        <Activity size={18} className="text-emerald-500"/> Live Build Stream
                    </h3>
                    <div className="flex-1 overflow-y-auto no-scrollbar font-mono text-[10px] space-y-2 relative z-10" ref={scrollRef}>
                        {terminalLines.map((line, i) => (
                            <div key={i} className="flex gap-3 text-emerald-500/80 border-l-2 border-emerald-900/50 pl-3">
                                <ArrowRight size={12} className="shrink-0 mt-0.5"/>
                                <span className="break-all">{line}</span>
                            </div>
                        ))}
                        <div className="h-4 w-2 bg-emerald-500 animate-pulse ml-6"></div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Runner: GH-Actions-8821</span>
                        <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                            <ShieldCheck size={12}/> Secure Pipeline
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deployment;
