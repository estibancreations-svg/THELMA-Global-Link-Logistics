
import React, { useState, useEffect } from 'react';
import { Link, Server, Database, RefreshCw, CheckCircle, XCircle, Activity, Lock, Shield, FileText, ArrowRight } from 'lucide-react';
import { LegacySystem } from '../../types';

const AdaptationLayer: React.FC = () => {
    const [systems, setSystems] = useState<LegacySystem[]>([
        { id: 'LEG-01', name: 'SAP Enterprise ERP', type: 'ERP', connectionStatus: 'CONNECTED', lastSync: 'Just now', dataPoints: 145000 },
        { id: 'LEG-02', name: 'Oracle Logistics Cloud', type: 'TELEMATICS', connectionStatus: 'SYNCING', lastSync: 'Streaming...', dataPoints: 4200 },
        { id: 'LEG-03', name: 'Geotab Legacy Fleet', type: 'TELEMATICS', connectionStatus: 'CONNECTED', lastSync: '5s ago', dataPoints: 8900 },
        { id: 'LEG-04', name: 'On-Premises HR SQL', type: 'HR', connectionStatus: 'ERROR', lastSync: '2 days ago', dataPoints: 0 }
    ]);

    const [totalPackets, setTotalPackets] = useState(145000);

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalPackets(prev => prev + Math.floor(Math.random() * 50));
            setSystems(prev => prev.map(sys => {
                if (sys.connectionStatus === 'CONNECTED' || sys.connectionStatus === 'SYNCING') {
                    return {
                        ...sys,
                        dataPoints: sys.dataPoints + Math.floor(Math.random() * 10),
                        lastSync: 'Just now'
                    };
                }
                return sys;
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 animate-fadeIn pb-12">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="inline-flex p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4 relative z-10 animate-pulse">
                    <Link size={48} />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white relative z-10">Adaptation Layer v4.0.0</h1>
                <p className="text-slate-500 max-w-2xl mx-auto mt-2 text-xs font-medium relative z-10 uppercase tracking-widest">
                    "Friendly Fortress" Legacy Bridge Active. Connects T.H.E.L.M.A. to existing ERP/TMS infrastructure via P.E.R.C.Y. scrubbed tunnels.
                </p>
                <div className="mt-8 flex justify-center gap-4 relative z-10">
                     <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg active:scale-95 transition-all flex items-center gap-2">
                        <Link size={14}/> Establish Connection
                     </button>
                     <div className="px-8 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Activity size={14} className="text-emerald-500 animate-pulse"/>
                        {totalPackets.toLocaleString()} Packets Ingested
                     </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
                    <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs flex items-center gap-3">
                        <Server size={18} className="text-blue-500"/> Legacy System Matrix
                    </h3>
                    <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                        <Lock size={10} /> TLS 1.3 Tunnel Verified
                    </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {systems.map(sys => (
                        <div key={sys.id} className="p-6 flex flex-col md:flex-row items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 ${
                                    sys.type === 'ERP' ? 'bg-purple-100 text-purple-600' :
                                    sys.type === 'TELEMATICS' ? 'bg-orange-100 text-orange-600' :
                                    'bg-slate-100 text-slate-600'
                                }`}>
                                    <Database size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">{sys.name}</h4>
                                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1 font-mono">
                                        <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{sys.type}</span>
                                        <span>•</span>
                                        <span>{sys.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Ingested Nodes</p>
                                    <p className="font-mono font-black text-slate-700 dark:text-slate-300 text-xs">{sys.dataPoints.toLocaleString()}</p>
                                </div>
                                
                                <div className="w-32 flex justify-end">
                                    {sys.connectionStatus === 'CONNECTED' && (
                                        <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-200">
                                            <CheckCircle size={10} /> Active
                                        </span>
                                    )}
                                    {sys.connectionStatus === 'SYNCING' && (
                                        <span className="flex items-center gap-1 text-[9px] font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-200 animate-pulse">
                                            <RefreshCw size={10} className="animate-spin" /> Syncing
                                        </span>
                                    )}
                                    {sys.connectionStatus === 'ERROR' && (
                                        <span className="flex items-center gap-1 text-[9px] font-black text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase tracking-widest border border-red-200">
                                            <XCircle size={10} /> Fault
                                        </span>
                                    )}
                                </div>

                                <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                                    <Activity size={18} className={sys.connectionStatus === 'SYNCING' ? 'animate-pulse text-blue-500' : ''}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdaptationLayer;
