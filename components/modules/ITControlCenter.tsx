
import React, { useState } from 'react';
import { Globe, Cpu, ArrowLeft, CheckCircle2, Key, Database, RefreshCw, Zap, Server, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { ApiKey } from '../../types';
import { UnitSchematic } from '../3d/UnitSchematic';

interface ITControlCenterProps {
  onBack?: () => void;
  onVocalize?: (text: string) => void;
}

const initialKeys: ApiKey[] = [
    { id: 'k_flow_stream', serviceName: 'FLOW: External Event Stream', preview: '...o-segment', status: 'ACTIVE', created: '2025-01-04' },
];

const ITControlCenter: React.FC<ITControlCenterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'CONTROL' | 'HARDWARE'>('CONTROL');
  const [isExploded, setIsExploded] = useState(false);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm"><ArrowLeft size={20} /></button>
            )}
            <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">IT Infrastructure</h1>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span> v4.0.0 Distributed Core
                </p>
            </div>
          </div>
          <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-full md:w-auto self-start">
              <button onClick={() => setActiveTab('CONTROL')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CONTROL' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500'}`}>Security</button>
              <button onClick={() => setActiveTab('HARDWARE')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'HARDWARE' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500'}`}>Hardware</button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-3 space-y-8 h-auto">
              {activeTab === 'HARDWARE' ? (
                  <div className="bg-slate-950 rounded-[3.5rem] border border-slate-800 p-10 shadow-2xl flex flex-col min-h-[600px] relative overflow-hidden">
                      <div className="flex justify-between items-center mb-8 relative z-10">
                          <h3 className="text-white font-black uppercase tracking-widest text-lg flex items-center gap-3"><Server size={24} className="text-violet-500"/> Node Schematic</h3>
                          <button onClick={() => setIsExploded(!isExploded)} className="bg-violet-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95">
                              {isExploded ? 'Assemble' : 'Explode View'}
                          </button>
                      </div>
                      <div className="flex-1 relative z-10">
                          <UnitSchematic type="SERVER" exploded={isExploded} />
                      </div>
                  </div>
              ) : (
                  <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                      <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30">
                          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">Security Credentials</h3>
                      </div>
                      <div className="overflow-x-auto">
                          <table className="w-full text-left">
                              <thead className="bg-slate-50 dark:bg-slate-900/50 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                  <tr><th className="px-8 py-5">Service</th><th className="px-8 py-5">Status</th><th className="px-8 py-5 text-right">Last Sync</th></tr>
                              </thead>
                              <tbody className="text-xs">
                                  {initialKeys.map(k => (
                                      <tr key={k.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50">
                                          <td className="px-8 py-5 font-bold uppercase">{k.serviceName}</td>
                                          <td className="px-8 py-5"><span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded text-[9px] font-black">{k.status}</span></td>
                                          <td className="px-8 py-5 text-right font-mono text-slate-400">{k.created}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}
          </div>

          <div className="lg:col-span-1 space-y-6 sticky top-24">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Cluster Telemetry</h3>
                  <div className="space-y-6">
                      <div>
                          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2"><span>Memory Load</span><span>42%</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-violet-500 h-full w-[42%]"></div></div>
                      </div>
                      <div>
                          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2"><span>Network Flow</span><span>14 TB/s</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full w-[78%]"></div></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ITControlCenter;
