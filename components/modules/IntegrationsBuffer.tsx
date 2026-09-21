
import React, { useState, useEffect } from 'react';
import { Workflow, Globe, Shield, Activity, X, CheckCircle2, ShieldAlert, AlertOctagon, Server, Code, ArrowLeft } from 'lucide-react';
import { N8nWorkflow, IntegrationRequestLog } from '../../types';

interface IntegrationsBufferProps {
  onBack?: () => void;
}

const mockWorkflows: N8nWorkflow[] = [
  { id: 'THELMA_RELAY_V3', name: 'THELMA_Master_Relay_v3', status: 'ACTIVE', lastRun: '10s ago', trigger: 'WEBHOOK', nodes: 5, connectorType: 'NERVE_CENTER', successRate: 100, latency: 24 },
  { id: 'FLOW_VEO_PIPE', name: 'THELMA_FLOW_VEO_Pipeline', status: 'ACTIVE', lastRun: '1m ago', trigger: 'WEBHOOK', nodes: 4, connectorType: 'SIMULATION', successRate: 98.5, latency: 1240 },
  { id: 'WF-01', name: 'Insurance Claims Sync', status: 'ACTIVE', lastRun: '2 mins ago', trigger: 'WEBHOOK', nodes: 14, connectorType: 'INSURANCE', successRate: 99.8, latency: 45 },
  { id: 'WF-02', name: 'EMS Dispatch Handshake', status: 'PAUSED', lastRun: '1 hour ago', trigger: 'EVENT', nodes: 8, connectorType: 'EMS', successRate: 94.2, latency: 120 },
  { id: 'WF-03', name: 'GitHub Master Mesh Sync', status: 'ACTIVE', lastRun: 'Just now', trigger: 'SCHEDULE', nodes: 6, connectorType: 'REGULATORY', successRate: 100, latency: 12 },
];

const mockRules = [
    { id: 'RULE-101', name: 'SQL Injection Guard', active: true, hits: 1420, level: 'CRITICAL' },
    { id: 'RULE-102', name: 'Geo-Block (Non-Domestic)', active: true, hits: 850, level: 'HIGH' },
    { id: 'RULE-103', name: 'Rate Limiting (100/s)', active: true, hits: 45, level: 'MEDIUM' },
    { id: 'RULE-104', name: 'PII Redaction (GDPR)', active: true, hits: 3200, level: 'CRITICAL' },
];

const IntegrationsBuffer: React.FC<IntegrationsBufferProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'PIPELINE' | 'RULES'>('PIPELINE');
  const [throughput, setThroughput] = useState(420);
  const [isolationActive, setIsolationActive] = useState(true);
  const [selectedLog, setSelectedLog] = useState<IntegrationRequestLog | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
        if (!isolationActive) {
            setThroughput(0);
            return; 
        }
        setThroughput(prev => Math.max(0, prev + (Math.random() > 0.5 ? Math.floor(Math.random() * 50) : -Math.floor(Math.random() * 20))));
    }, 800);
    return () => clearInterval(interval);
  }, [isolationActive]);

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 relative">
       {selectedLog && (
           <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                   <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                       <h3 className="text-white font-mono font-bold flex items-center gap-2">
                           <Code size={16} className="text-blue-500"/> n8n Inspector
                       </h3>
                       <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-white"><X size={20}/></button>
                   </div>
                   <div className="p-6 space-y-4">
                       <div className="bg-black p-4 rounded-lg border border-slate-800 overflow-x-auto">
                           <pre className="text-[10px] text-blue-400 font-mono">
{`{
  "node": "🧠 The_Brain",
  "decision": "DEPLOY",
  "routing": "https://api.antigravity.dev/deploy"
}`}
                           </pre>
                       </div>
                   </div>
               </div>
           </div>
       )}

       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="flex items-center gap-4">
              {onBack && (
                <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm shrink-0">
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">n8n Buffer Layer • v4.0.0</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2">
                    <Shield size={12} className="text-blue-500"/>
                    Friendly Fortress Protocol • Air-Gap Active
                </p>
              </div>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
               <button onClick={() => setIsolationActive(!isolationActive)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all shadow-lg ${isolationActive ? 'bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-500/50 hover:bg-blue-900/30' : 'bg-red-600 text-white border-red-500 animate-pulse shadow-red-500/50'}`}>
                   {isolationActive ? <CheckCircle2 size={16}/> : <AlertOctagon size={16}/>}
                   {isolationActive ? 'Air-Gap: ACTIVE' : 'BUFFER SEVERED'}
               </button>
               <div className="bg-white dark:bg-slate-900 p-2 px-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                   <Activity size={16} className={isolationActive ? "text-blue-500 animate-pulse" : "text-slate-400"}/>
                   <span className="font-mono font-black text-slate-800 dark:text-white">{throughput} req/s</span>
               </div>
           </div>
       </div>

       <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
           <button onClick={() => setActiveTab('PIPELINE')} className={`pb-2 px-2 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'PIPELINE' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>The Nerve Center</button>
           <button onClick={() => setActiveTab('RULES')} className={`pb-2 px-2 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'RULES' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>P.E.R.C.Y. Rules</button>
       </div>

       {activeTab === 'PIPELINE' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
               <div className="lg:col-span-2 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {mockWorkflows.map(wf => (
                           <div key={wf.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 transition-all group relative overflow-hidden">
                               <div className="flex justify-between items-start mb-4">
                                   <div className="flex items-center gap-3">
                                       <div className={`p-2 rounded-lg ${wf.id.includes('RELAY') || wf.id.includes('PIPE') ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                                           <Workflow size={18}/>
                                       </div>
                                       <div>
                                           <h4 className="font-bold text-sm text-slate-800 dark:text-white leading-tight">{wf.name}</h4>
                                           <p className="text-[10px] text-slate-500 font-mono mt-0.5">{wf.id} • {wf.connectorType}</p>
                                       </div>
                                   </div>
                               </div>
                               <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                                   <div>
                                       <p className="text-[9px] text-slate-400 uppercase font-black">Success</p>
                                       <p className="text-xs font-mono font-bold text-emerald-500">{wf.successRate}%</p>
                                   </div>
                                   {wf.id.includes('RELAY') && (
                                       <div className="col-span-2">
                                           <p className="text-[9px] text-slate-400 uppercase font-black">Logic</p>
                                           <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">The_Brain → The_Router</p>
                                       </div>
                                   )}
                                   {wf.id.includes('PIPE') && (
                                       <div className="col-span-2">
                                           <p className="text-[9px] text-slate-400 uppercase font-black">Logic</p>
                                           <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">Gemini FLOW → VEO</p>
                                       </div>
                                   )}
                               </div>
                           </div>
                       ))}
                   </div>
               </div>
           </div>
       )}

       {activeTab === 'RULES' && (
           <div className="space-y-6 animate-fadeIn">
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-900/30 text-slate-500 font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Rule ID</th>
                                <th className="px-6 py-4">Constraint</th>
                                <th className="px-6 py-4">Risk Level</th>
                                <th className="px-6 py-4">Hits (24h)</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {mockRules.map((rule) => (
                                <tr key={rule.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-blue-500">{rule.id}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{rule.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                                            rule.level === 'CRITICAL' ? 'bg-red-100 text-red-600' :
                                            rule.level === 'HIGH' ? 'bg-orange-100 text-orange-600' :
                                            'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            {rule.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono">{rule.hits.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[9px]">
                                            <CheckCircle2 size={12}/> Active
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </div>
       )}
    </div>
  );
};

export default IntegrationsBuffer;
