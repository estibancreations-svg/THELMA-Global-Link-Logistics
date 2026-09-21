
import React, { useState, useEffect } from 'react';
import { Scale, FileText, Download, Clock, ShieldCheck, Search, Shield, AlertTriangle, CheckCircle2, Lock, Hash, Loader2, ArrowLeft } from 'lucide-react';
import { AuditLogEntry, UserRole, AuditResult } from '../../types';

interface GovernanceHubProps {
  onBack?: () => void;
}

const GovernanceHub: React.FC<GovernanceHubProps> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState<AuditLogEntry[]>([]);

    useEffect(() => {
        const seedLogs: AuditLogEntry[] = Array.from({ length: 50 }).map((_, i) => ({
            id: `AUD-${Date.now() - (i*60000)}`,
            timestamp: new Date(Date.now() - (i * 60000)).toISOString(), 
            user_id: i % 2 === 0 ? 'steve@thelma.ai' : 'AUTO_BOT_PERCY',
            role: i % 2 === 0 ? UserRole.ARCHITECT : UserRole.IT_SPECIALIST,
            action: i % 3 === 0 ? 'POLICY_UPDATE' : 'ACCESS_REQUEST',
            module: 'SECURITY_CORE',
            evidence: [`SHA256:e3b...99${i}`],
            result: AuditResult.SUCCESS,
            metadata: {},
            systemTimestamp: new Date().toISOString()
        }));
        setLogs(seedLogs);
    }, []);

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Governance Core</h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Immutable Federation Ledger</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden h-auto">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50 dark:bg-slate-950/50">
                    <h3 className="font-black uppercase tracking-widest text-[11px] text-slate-800 dark:text-white flex items-center gap-2">
                        <Clock size={16} className="text-blue-500"/> Live Event Stream
                    </h3>
                    <div className="relative w-full md:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search Ledger..." 
                            className="w-full pl-9 pr-4 py-3 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-bold border border-slate-200 dark:border-slate-700 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-8 py-6">Timestamp</th>
                                <th className="px-8 py-6">Event ID</th>
                                <th className="px-8 py-6">Actor</th>
                                <th className="px-8 py-6">Action</th>
                                <th className="px-8 py-6 text-right">Ledger Proof</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-8 py-6 font-mono text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                                    <td className="px-8 py-6 font-mono font-bold text-blue-600">{log.id}</td>
                                    <td className="px-8 py-6 font-bold text-slate-800 dark:text-slate-200">{log.user_id}</td>
                                    <td className="px-8 py-6 uppercase font-black text-[10px]">{log.action}</td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-[9px] font-black uppercase text-emerald-600 hover:text-emerald-500 flex items-center gap-1 justify-end ml-auto">
                                            <ShieldCheck size={12}/> Verified Hash
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GovernanceHub;
