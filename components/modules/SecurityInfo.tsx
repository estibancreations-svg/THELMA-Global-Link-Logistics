
import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, CheckCircle, Globe, Server, AlertTriangle, Activity, ArrowLeft, Radar, ShieldAlert, Scan, Fingerprint, Eye, Power, Zap, Infinity } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar, Tooltip } from 'recharts';

interface SecurityInfoProps {
    onBack?: () => void;
}

const initialThreatData = [
  { subject: 'DDoS', A: 120, fullMark: 150 },
  { subject: 'SQL Inj', A: 98, fullMark: 150 },
  { subject: 'Phishing', A: 86, fullMark: 150 },
  { subject: 'Malware', A: 99, fullMark: 150 },
  { subject: 'Insider', A: 45, fullMark: 150 },
  { subject: 'Zero-Day', A: 65, fullMark: 150 },
];

const SecurityInfo: React.FC<SecurityInfoProps> = ({ onBack }) => {
    const [coherence, setCoherence] = useState(99.42);
    const [threatData, setThreatData] = useState(initialThreatData);
    const [packetsScrubbed, setPacketsScrubbed] = useState(14520);
    const [activeThreat, setActiveThreat] = useState<string | null>(null);
    const [protocolZeroArmed, setProtocolZeroArmed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCoherence(prev => {
                const noise = (Math.random() - 0.5) * 0.1;
                return Math.min(100, Math.max(98, prev + noise));
            });

            setPacketsScrubbed(prev => prev + Math.floor(Math.random() * 50));

            setThreatData(prev => prev.map(item => ({
                ...item,
                A: Math.max(20, Math.min(140, item.A + (Math.random() - 0.5) * 15))
            })));

            if (Math.random() > 0.95) {
                const threats = ['IP_SPOOF_SECTOR_7', 'BRUTE_FORCE_AUTH', 'ANOMALOUS_PAYLOAD_DETECTED'];
                setActiveThreat(threats[Math.floor(Math.random() * threats.length)]);
                setTimeout(() => setActiveThreat(null), 3000);
            }

        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 animate-fadeIn pb-12 overflow-y-auto h-full no-scrollbar">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
                <div className="flex items-center gap-4">
                    {onBack && (
                      <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-green-600 transition-all shadow-sm shrink-0"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Defense Matrix</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium uppercase tracking-widest">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> P.E.R.C.Y. Protocol Zero: STANDBY
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => setProtocolZeroArmed(!protocolZeroArmed)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all shadow-2xl ${protocolZeroArmed ? 'bg-red-600 border-red-400 text-white animate-pulse' : 'bg-slate-900 border-slate-700 text-red-500 hover:border-red-500 hover:bg-red-500/10'}`}
                >
                    <Power size={20}/>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{protocolZeroArmed ? 'ARMED: PROTOCOL ZERO' : 'ARM KILL-SWITCH'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Shield className="text-emerald-400" size={32} />
                                <h2 className="text-3xl font-black uppercase tracking-tight">Mesh Coherence</h2>
                            </div>
                            <p className="text-slate-400 font-mono text-xs">SECURITY LAYER: <span className="text-emerald-400 font-bold">SHA-384</span> • AIR-GAP: <span className="text-blue-400 font-bold">STABLE</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Inference Risk Score</p>
                            <p className={`text-2xl font-black font-mono uppercase ${activeThreat ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>0.042 / 10.0</p>
                        </div>
                    </div>

                    <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                        {activeThreat && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/30 border border-red-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 animate-bounce shadow-2xl">
                                <ShieldAlert size={20} className="animate-pulse"/> <span className="text-xs font-black uppercase tracking-widest">Blocked: {activeThreat}</span>
                            </div>
                        )}
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={threatData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                    <RechartsRadar name="Threats" dataKey="A" stroke={activeThreat ? '#ef4444' : '#10b981'} strokeWidth={3} fill={activeThreat ? '#ef4444' : '#10b981'} fillOpacity={0.3} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Packet Scrub Log</p>
                            <p className="text-xl font-mono font-black text-white">{packetsScrubbed.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Quantum Stability</p>
                            <p className="text-xl font-mono font-black text-blue-400">{coherence.toFixed(2)}%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Encryption Strength</p>
                            <p className="text-xl font-mono font-black text-emerald-400">P-521</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex-1 relative overflow-hidden group">
                        <h3 className="font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3 text-xs uppercase tracking-widest"><Globe size={18} className="text-blue-500"/> Geo-Security</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Non-US IP Block</span>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2"><Zap size={14} className="text-blue-500" /> API Air-Gap Sync</span>
                                <Activity size={14} className="text-blue-500 animate-pulse"/>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-red-950/20 rounded-2xl border border-red-500/20">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2"><ShieldAlert size={14} /> Anomaly Response</span>
                                <span className="text-[9px] font-mono text-red-400 font-black">AUTO_DEPLOY</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                             <Infinity size={200}/>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[3.5rem] border border-slate-800 p-8 flex-1 relative overflow-hidden group shadow-xl">
                        <h3 className="font-black text-white mb-6 flex items-center gap-3 text-xs uppercase tracking-widest"><Fingerprint size={18} className="text-purple-500"/> Bio-Verification</h3>
                        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 text-center space-y-4">
                             <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mx-auto text-blue-500 animate-pulse">
                                 <Scan size={32}/>
                             </div>
                             <div>
                                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Identity</p>
                                 <p className="text-sm font-black text-white uppercase tracking-tight">Architect BEE-001</p>
                             </div>
                             <button className="w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Re-Authenticate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityInfo;
