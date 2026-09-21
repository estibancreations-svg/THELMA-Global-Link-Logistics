
import React, { useState } from 'react';
import { CreditCard, DollarSign, Download, PieChart, Check, ArrowLeft, TrendingUp, TrendingDown, FileText, Activity } from 'lucide-react';

interface BillingProps {
  onBack?: () => void;
}

const Billing: React.FC<BillingProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'SUB' | 'PNL'>('PNL');
    const [simulateShock, setSimulateShock] = useState(false);

    const toggleShock = () => {
        setSimulateShock(!simulateShock);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-violet-600 transition-all shadow-sm shrink-0"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Enterprise Financial Ledger</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest mt-1">v4.0.0 Global Mesh • Consolidated P&L</p>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button onClick={() => setActiveTab('PNL')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PNL' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>P&L Report</button>
                    <button onClick={() => setActiveTab('SUB')} className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SUB' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>Subscription</button>
                </div>
            </div>

            {activeTab === 'PNL' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="flex justify-end">
                        <button 
                            onClick={toggleShock}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${simulateShock ? 'bg-red-600 text-white border-red-500 animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`}
                        >
                            <Activity size={14}/> {simulateShock ? 'Market Shock Active (-15%)' : 'Simulate Market Crash'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`p-6 rounded-2xl border shadow-sm transition-all duration-500 ${simulateShock ? 'bg-red-50 dark:bg-red-900/10 border-red-200' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Gross Revenue (Q1)</p>
                            <div className="flex items-end gap-2 mt-2">
                                <h3 className={`text-3xl font-black ${simulateShock ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                                    {simulateShock ? '$10.5M' : '$12.4M'}
                                </h3>
                                <span className={`text-xs font-bold mb-1 flex items-center ${simulateShock ? 'text-red-600' : 'text-green-500'}`}>
                                    {simulateShock ? <TrendingDown size={12}/> : <TrendingUp size={12}/>}
                                    {simulateShock ? ' -15%' : ' +14%'}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">OpEx (Fuel/Maint)</p>
                            <div className="flex items-end gap-2 mt-2">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white">$4.2M</h3>
                                <span className="text-xs font-bold text-green-500 mb-1 flex items-center"><TrendingDown size={12}/> -5%</span>
                            </div>
                        </div>
                        <div className={`p-6 rounded-2xl border shadow-sm transition-all duration-500 ${simulateShock ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200' : 'bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-900 border-slate-200 dark:border-slate-800'}`}>
                            <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Net Profit (EBITDA)</p>
                            <div className="flex items-end gap-2 mt-2">
                                <h3 className={`text-3xl font-black ${simulateShock ? 'text-orange-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                    {simulateShock ? '$6.3M' : '$7.8M'}
                                </h3>
                                <span className="text-xs font-bold text-slate-400 mb-1">PROJ</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-widest">Consolidated Earnings Statement</h3>
                            <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                                <Download size={14}/> Export CSV
                            </button>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Line Item</th>
                                    <th className="px-6 py-4 text-right">Proj. Q1</th>
                                    <th className="px-6 py-4 text-right">Actual Q1</th>
                                    <th className="px-6 py-4 text-right">Variance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-bold">Logistics Revenue</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs">$11,500,000</td>
                                    <td className={`px-6 py-4 text-right font-mono text-xs ${simulateShock ? 'text-red-500 font-bold' : ''}`}>
                                        {simulateShock ? '$9,775,000' : '$12,400,000'}
                                    </td>
                                    <td className={`px-6 py-4 text-right font-mono text-xs ${simulateShock ? 'text-red-500' : 'text-green-500'}`}>
                                        {simulateShock ? '-$1.7M' : '+$900k'}
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-bold">Fuel / Energy Costs</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs">($2,000,000)</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs">($1,850,000)</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs text-green-500">+$150k</td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-bold">Fleet Maintenance</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs">($800,000)</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs">($920,000)</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs text-red-500">-$120k</td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-bold">Carbon Tax Credits</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs">$200,000</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs">$450,000</td>
                                    <td className="px-6 py-4 text-right font-mono text-xs text-green-500">+$250k</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'SUB' && (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
                        <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-6">Current Plan</p>
                        <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">T.H.E.L.M.A. Enterprise</h2>
                        <p className="text-3xl font-black font-mono text-emerald-400 mb-8">$12,000 <span className="text-sm font-normal text-slate-400">/ mo</span></p>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Check size={16} className="text-emerald-400"/> Unlimited Agents</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Check size={16} className="text-emerald-400"/> Full Fleet Telemetry</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Check size={16} className="text-emerald-400"/> 24/7 Priority Support</div>
                        </div>
                        <button className="w-full py-4 bg-blue-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95">Manage Plan</button>
                    </div>

                    <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-[10px] mb-8">Usage Breakdown (Jan 2025)</h3>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                                    <span className="text-slate-500">AI Token Consumption (H.E.N.R.Y.)</span>
                                    <span className="text-slate-900 dark:text-white font-mono">8.2M / 10M</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full w-[82%] shadow-[0_0_10px_#3b82f6]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                                    <span className="text-slate-500">Storage (Logs & Telemetry)</span>
                                    <span className="text-slate-900 dark:text-white font-mono">450 GB / 1 TB</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-purple-500 h-full w-[45%] shadow-[0_0_10px_#a855f7]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billing;
