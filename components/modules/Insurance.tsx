
import React, { useState } from 'react';
import { Shield, FileText, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Activity, ArrowLeft, Umbrella, Siren, Briefcase, ChevronRight, PieChart, RefreshCw, Clock, MapPin, X, FilePlus, Zap } from 'lucide-react';

interface InsuranceProps {
  onBack?: () => void;
}

const mockPolicies = [
    { id: 'POL-930', type: 'GENERAL_STASIS_LIABILITY', provider: 'Almost Legal Agency', coverage: '$25,000,000', premium: '$12,500/mo', status: 'SYNC_REQUIRED', renewal: '45 Days', critical: true },
    { id: 'POL-9921-A', type: 'FLEET_LIABILITY', provider: 'Almost Legal Agency', coverage: '$10,000,000', premium: '$42,000/mo', status: 'ACTIVE', renewal: '2026-12-01' },
    { id: 'POL-8812-B', type: 'DRONE_HULL', provider: 'SkyGuard Underwriters', coverage: '$2,500,000', premium: '$8,500/mo', status: 'ACTIVE', renewal: '2026-06-15' },
    { id: 'POL-1102-D', type: 'CYBER_RANSOM', provider: 'P.E.R.C.Y. Reassurance', coverage: '$50,000,000', premium: '$1,200/mo', status: 'ACTIVE', renewal: '2027-01-01' }
];

const Insurance: React.FC<InsuranceProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CLAIMS' | 'RISK'>('OVERVIEW');
    const [isSyncing, setIsSyncing] = useState(false);
    const [showClaimModal, setShowClaimModal] = useState(false);
    const [claimAsset, setClaimAsset] = useState('');

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    const submitClaim = () => {
        alert("Claim submitted to H.E.N.R.Y. for initial assessment.");
        setShowClaimModal(false);
        setClaimAsset('');
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 relative">
            
            {/* File Claim Modal */}
            {showClaimModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-lg flex items-center gap-2">
                                <FilePlus size={20} className="text-blue-500"/> Initiate Claim
                            </h3>
                            <button onClick={() => setShowClaimModal(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24}/></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Select Affected Asset</label>
                                <select 
                                    className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold uppercase outline-none focus:ring-2 ring-blue-500"
                                    value={claimAsset}
                                    onChange={(e) => setClaimAsset(e.target.value)}
                                >
                                    <option value="">-- Select Asset ID --</option>
                                    <option value="F-101">F-101 (Tesla Semi)</option>
                                    <option value="S-4">S-4 (Yara Ship)</option>
                                    <option value="AP-X1">AP-X1 (Joby S4)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Incident Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">Collision</button>
                                    <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">Theft / Loss</button>
                                    <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">Weather</button>
                                    <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">Cyber Event</button>
                                </div>
                            </div>
                            <button onClick={submitClaim} disabled={!claimAsset} className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                                <Zap size={16}/> Submit to Adjuster AI
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Risk & Liability Shield</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            v4.0.0 Risk Mesh • Policy Sync: ACTIVE
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
                    <button onClick={() => setActiveTab('OVERVIEW')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'OVERVIEW' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Policies</button>
                    <button onClick={() => setActiveTab('RISK')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'RISK' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Risk Map</button>
                    <button onClick={() => setActiveTab('CLAIMS')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CLAIMS' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Claims</button>
                </div>
            </div>

            {activeTab === 'OVERVIEW' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-orange-600 text-white p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full"></div>
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-orange-200 mb-1">Critical Renewal Notice</p>
                                <h3 className="text-2xl font-black font-mono">POL-930</h3>
                                <div className="flex items-center gap-2 mt-4">
                                    <Clock size={16}/>
                                    <span className="text-xs font-black uppercase tracking-widest">45 Days Remaining</span>
                                </div>
                                <button onClick={handleSync} className="mt-6 w-full py-3 bg-white text-orange-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                    {isSyncing ? <RefreshCw className="animate-spin" size={14}/> : <CheckCircle size={14}/>} {isSyncing ? 'Syncing...' : 'Perform Manual Sync'}
                                </button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Coverage Value</p>
                            <h3 className="text-3xl font-black font-mono text-slate-800 dark:text-white">$87.5M</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly Premium</p>
                            <h3 className="text-3xl font-black font-mono text-slate-800 dark:text-white">$76,600</h3>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
                            <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest flex items-center gap-3">
                                <Briefcase size={20} className="text-blue-500"/> Federation Policy Ledger
                            </h3>
                        </div>
                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="px-8 py-4">Policy ID / Type</th>
                                        <th className="px-8 py-4">Provider</th>
                                        <th className="px-8 py-4">Coverage</th>
                                        <th className="px-8 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {mockPolicies.map(pol => (
                                        <tr key={pol.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${pol.id === 'POL-930' ? 'bg-orange-50/30 dark:bg-orange-900/5' : ''}`}>
                                            <td className="px-8 py-6">
                                                <div className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{pol.type.replace('_', ' ')}</div>
                                                <div className="text-[10px] font-mono text-slate-400 mt-1">{pol.id}</div>
                                            </td>
                                            <td className="px-8 py-6 text-slate-600 dark:text-slate-300 font-bold uppercase">{pol.provider}</td>
                                            <td className="px-8 py-6 font-mono font-black text-slate-800 dark:text-white">{pol.coverage}</td>
                                            <td className="px-8 py-6 text-right">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                    pol.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' : 
                                                    pol.status === 'SYNC_REQUIRED' ? 'bg-orange-100 text-orange-600 border-orange-200 animate-pulse' :
                                                    'bg-yellow-100 text-yellow-600 border-yellow-200'
                                                }`}>
                                                    {pol.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'RISK' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="bg-slate-900 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden h-[600px] group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute inset-0 opacity-40 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i4!2i4!3i6!2m3!1e0!2sm!3i633215263!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover grayscale invert"></div>
                        
                        {/* Risk Zones Overlay */}
                        <div className="absolute top-[30%] left-[20%] w-32 h-32 bg-red-600/30 rounded-full blur-2xl animate-pulse"></div>
                        <div className="absolute top-[30%] left-[20%] flex flex-col items-center">
                            <AlertTriangle className="text-red-500 animate-bounce" size={32}/>
                            <span className="text-[10px] font-black text-red-400 uppercase bg-black/60 px-2 py-1 rounded mt-2">Zone: High Theft</span>
                        </div>

                        <div className="absolute bottom-[20%] right-[30%] w-48 h-48 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-[20%] right-[30%] flex flex-col items-center">
                            <Siren className="text-orange-500" size={32}/>
                            <span className="text-[10px] font-black text-orange-400 uppercase bg-black/60 px-2 py-1 rounded mt-2">Zone: Severe Weather</span>
                        </div>

                        <div className="absolute top-10 left-10 z-10 bg-slate-900/90 backdrop-blur-md p-6 rounded-[2rem] border border-slate-700">
                            <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-3 mb-4">
                                <Shield size={20} className="text-blue-500"/> Geospatial Risk Layer
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-xs text-slate-300">
                                    <span className="w-3 h-3 rounded-full bg-red-500"></span> High Risk (Theft/War)
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-300">
                                    <span className="w-3 h-3 rounded-full bg-orange-500"></span> Weather Hazard
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-300">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Safe Corridor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'CLAIMS' && (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 animate-fadeIn">
                    <Umbrella size={64} className="text-blue-200 dark:text-slate-800 mb-6"/>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Claims Center</h3>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-8">No active claims requiring attention.</p>
                    <button onClick={() => setShowClaimModal(true)} className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 flex items-center gap-2">
                        <FilePlus size={16}/> File New Claim
                    </button>
                </div>
            )}
        </div>
    );
};

export default Insurance;
