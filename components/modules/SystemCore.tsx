
import React, { useState, useEffect } from 'react';
import { 
  Shield, Atom, Lock, Zap, Activity, Database, Fingerprint, 
  ArrowLeft, Search, Filter, CheckCircle2, AlertTriangle, 
  Terminal, Share2, Orbit, Cpu, Network, Infinity, Layers, Binary, Key, ShieldCheck
} from 'lucide-react';
import { InjectionManifest, RULES_OF_ENGAGEMENT } from '../../types';

interface SystemCoreProps {
  onBack?: () => void;
}

const generateManifest = (): InjectionManifest[] => {
    return Array.from({ length: 1500 }, (_, i) => {
        const categories: any[] = ['SECURITY', 'LOGISTICS', 'GOVERNANCE', 'PERSONNEL', 'EXPERIMENTAL', 'FINANCIAL'];
        const cat = categories[Math.floor(Math.random() * categories.length)];
        return {
            id: `INJ-${1000 + i}`,
            category: cat,
            title: `${cat} Directive ${i + 1}`,
            description: `Auto-generated system hardening protocol for ${cat.toLowerCase()} matrix efficiency. Gate ${i+1}/1500.`,
            codeHash: `SHA256:${Math.random().toString(36).substring(7).toUpperCase()}`,
            status: Math.random() > 0.3 ? 'DEPLOYED' : 'SIMULATED',
            author: 'ARCHITECT BEE-001'
        };
    });
};

const SystemCore: React.FC<SystemCoreProps> = ({ onBack }) => {
    const [manifest, setManifest] = useState<InjectionManifest[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('ALL');

    useEffect(() => {
        setManifest(generateManifest());
    }, []);

    const filtered = manifest.filter(m => 
        (activeFilter === 'ALL' || m.category === activeFilter) &&
        (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white flex items-center gap-4">
                            <Cpu size={36} className="text-blue-600 animate-pulse"/> Sovereign Logic Core
                        </h1>
                        <p className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mt-1 flex items-center gap-3">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> 1500+ Immutible Injections • Build v9.1-R
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all h-auto">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="relative flex-1 group w-full">
                            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search manifest..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl text-xs font-black outline-none focus:border-blue-600"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900 z-10 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-10 py-6">ID</th>
                                    <th className="px-10 py-6">Directive</th>
                                    <th className="px-10 py-6">Hash</th>
                                    <th className="px-10 py-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {filtered.slice(0, 100).map((inj) => (
                                    <tr key={inj.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                                        <td className="px-10 py-6 font-mono font-black text-blue-600 dark:text-blue-400">{inj.id}</td>
                                        <td className="px-10 py-6">
                                            <p className="font-black text-slate-800 dark:text-white uppercase tracking-tight text-sm">{inj.title}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{inj.category} Domain</p>
                                        </td>
                                        <td className="px-10 py-6 font-mono text-[9px] text-slate-400 truncate max-w-[150px]">{inj.codeHash}</td>
                                        <td className="px-10 py-6 text-right">
                                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${inj.status === 'DEPLOYED' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>{inj.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <div className="bg-slate-900 text-white p-8 rounded-[3.5rem] border border-slate-800 shadow-2xl">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-6 flex items-center gap-3">
                            <Shield size={20} /> Rules of Engagement
                        </h3>
                        <div className="space-y-6">
                            <div className="pl-4 border-l-2 border-blue-500/50">
                                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Architect Access</p>
                                <p className="text-xs font-bold text-slate-300">Locked to BEE-001 signature only.</p>
                            </div>
                            <div className="pl-4 border-l-2 border-red-500/50">
                                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Protocol Zero</p>
                                <p className="text-xs font-bold text-slate-300">Kill-switch armed for unauthorized SQL patterns.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemCore;
