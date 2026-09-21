
import React, { useState } from 'react';
import { DollarSign, CreditCard, Shield, TrendingUp, Users, ArrowLeft, Building2, CheckCircle, AlertCircle, FileText, Download, Fingerprint, Lock, RefreshCw, Power, Zap, X, Receipt, Hash, UserCheck } from 'lucide-react';
import { PayrollEntry } from '../../types';

interface PayrollProps {
  onBack?: () => void;
}

const mockEntries: PayrollEntry[] = [
    { id: 'PAY-001', recipientId: 'BEE-001', name: 'Steve Henry', type: 'SALARY', amount: 8500.00, status: 'PROCESSED', date: '2026-01-15', notes: 'Monthly Architect Retainer', systemTimestamp: new Date().toISOString() },
    { id: 'PAY-002', recipientId: 'BEE-002', name: 'Marcus Cole', type: 'LOAD_COMMISSION', amount: 1240.50, status: 'PENDING', date: '2026-01-16', notes: 'Route R1-North completion', systemTimestamp: new Date().toISOString() },
    { id: 'PAY-003', recipientId: 'BEE-004', name: 'James T. Kirk', type: 'BONUS', amount: 500.00, status: 'HELD', date: '2026-01-16', notes: 'Pending safety review', systemTimestamp: new Date().toISOString() },
];

const Payroll: React.FC<PayrollProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'BUSINESS' | 'WORKER' | 'EMERGENCY'>('WORKER');
    const [isReleasing, setIsReleasing] = useState(false);
    const [releaseStep, setReleaseStep] = useState(0); // 0: Idle, 1: Confirm, 2: Auth, 3: Success
    const [isBatchProcessing, setIsBatchProcessing] = useState(false);
    
    // Phase 6: Transaction Detail View
    const [selectedTx, setSelectedTx] = useState<PayrollEntry | null>(null);

    const handleRelease = () => {
        setIsReleasing(true);
        setReleaseStep(1);
    };

    const confirmRelease = () => {
        setReleaseStep(2);
        setTimeout(() => {
            setReleaseStep(3);
            setTimeout(() => {
                setReleaseStep(0);
                setIsReleasing(false);
            }, 3000);
        }, 2000);
    };

    const runBatchRelease = () => {
        setIsBatchProcessing(true);
        setTimeout(() => {
            setIsBatchProcessing(false);
            // In a real app, this would update statuses
        }, 2500);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 relative">
            {/* Phase 6: Transaction Ledger Modal */}
            {selectedTx && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm flex items-center gap-2">
                                <Receipt size={16} className="text-emerald-500"/> Digital Ledger
                            </h3>
                            <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={20}/></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-50 dark:border-emerald-900/50">
                                    <DollarSign size={32}/>
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">${selectedTx.amount.toFixed(2)}</h2>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{selectedTx.type.replace('_', ' ')} • {selectedTx.recipientId}</p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase text-slate-500">Gross Amount</span>
                                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">${selectedTx.amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase text-slate-500">Tax (Est. 22%)</span>
                                    <span className="text-xs font-mono font-bold text-red-500">-${(selectedTx.amount * 0.22).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase text-slate-500">Platform Fee</span>
                                    <span className="text-xs font-mono font-bold text-red-500">-$2.50</span>
                                </div>
                                <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase text-slate-800 dark:text-white">Net Payout</span>
                                    <span className="text-sm font-mono font-black text-emerald-500">${(selectedTx.amount * 0.78 - 2.50).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <Hash size={12} className="text-blue-500"/>
                                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Blockchain Proof</p>
                                </div>
                                <p className="font-mono text-[9px] text-slate-400 break-all leading-relaxed">
                                    0x7f2c8...9921a_block_4821_verified
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-emerald-500 text-[9px] font-black uppercase">
                                    <CheckCircle size={10}/> Confirmed on Ledger
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">
                                Download Tax Slip
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Batch Processing Overlay */}
            {isBatchProcessing && (
                <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center animate-fadeIn p-8 text-center">
                    <div className="relative w-32 h-32 mb-8">
                        <div className="absolute inset-0 border-4 border-emerald-500/30 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Zap size={40} className="text-emerald-500 animate-pulse"/>
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Batching 856 Payments</h2>
                    <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Routing via ACH • Hashing to Percy Core</p>
                    <div className="mt-8 w-full max-w-md bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div className="h-full bg-emerald-500 w-3/4 animate-[progress_2s_ease-in-out_infinite]"></div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-600 transition-all shadow-sm shrink-0">
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Financial Command</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            Ledger v4.0.0 • Automated ACH Active
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto">
                    <button onClick={() => setActiveTab('BUSINESS')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'BUSINESS' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Business Expense</button>
                    <button onClick={() => setActiveTab('WORKER')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'WORKER' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Worker Payroll</button>
                    <button onClick={() => setActiveTab('EMERGENCY')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'EMERGENCY' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Emergency Fund</button>
                </div>
            </div>

            {activeTab === 'WORKER' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Next Payout</p>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">$42,850.00</h3>
                            <button onClick={runBatchRelease} className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                                <Zap size={14}/> Release Batch ACH
                            </button>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Personnel</p>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">856</h3>
                            <p className="text-xs text-green-500 mt-1 flex items-center gap-1 uppercase font-bold"><Users size={12}/> +4 this period</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pending Bonuses</p>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">$2,400.00</h3>
                            <p className="text-xs text-orange-500 mt-1 uppercase font-bold">Needs Approval</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
                            <h3 className="font-black text-slate-800 dark:text-white text-xs uppercase tracking-widest">Global Payout Ledger</h3>
                            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors uppercase">
                                <Download size={14}/> Export Batch
                            </button>
                        </div>
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Recipient</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Notes</th>
                                    <th className="px-6 py-4 text-right">Audit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {mockEntries.map((entry) => (
                                    <tr 
                                        key={entry.id} 
                                        onClick={() => setSelectedTx(entry)}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{entry.name}</p>
                                            <p className="text-[10px] text-slate-400 font-mono">{entry.recipientId}</p>
                                        </td>
                                        <td className="px-6 py-4 font-black uppercase text-[10px] text-slate-600 dark:text-slate-400">{entry.type.replace('_', ' ')}</td>
                                        <td className="px-6 py-4 font-mono font-black text-slate-800 dark:text-white">${entry.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                                entry.status === 'PROCESSED' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' :
                                                entry.status === 'HELD' ? 'bg-red-100 text-red-600 border-red-200' :
                                                'bg-yellow-100 text-yellow-600 border-yellow-200'
                                            }`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 italic font-medium">{entry.notes}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-slate-400 group-hover:text-blue-500 transition-colors"><FileText size={14}/></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'BUSINESS' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Corporate Operating Account</h3>
                            <p className="text-slate-400 font-mono text-sm mb-8">IBAN: **** **** **** 8821 • Routing: 021***</p>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Available Capital</p>
                                    <p className="text-4xl font-mono font-black">$1,250,420.00</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Projected OpEx (30d)</p>
                                    <p className="text-4xl font-mono font-black">$320,000.00</p>
                                </div>
                            </div>
                        </div>
                        <Building2 className="absolute right-[-20px] bottom-[-40px] text-slate-800 opacity-20" size={240}/>
                    </div>
                </div>
            )}

            {activeTab === 'EMERGENCY' && (
                <div className="space-y-6 animate-fadeIn">
                    {releaseStep === 0 && (
                        <div className="bg-red-900 text-white p-10 rounded-[3rem] border border-red-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black uppercase tracking-tight flex items-center gap-4 mb-4">
                                    <Shield size={40} className="text-red-400"/> Strategic Reserve
                                </h3>
                                <p className="text-red-200 text-sm max-w-xl font-medium leading-relaxed uppercase">
                                    Capital allocated for immediate deployment during Tier-1 incidents. Release requires L10 Architect authentication.
                                </p>
                                <div className="mt-8">
                                    <p className="text-[10px] font-black text-red-300 uppercase tracking-[0.4em]">Locked Capital Assets</p>
                                    <p className="text-6xl font-mono font-black">$5,000,000</p>
                                </div>
                            </div>
                            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
                                <button onClick={handleRelease} className="w-full md:w-64 py-6 bg-white text-red-900 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                                    <Power size={20} /> Initiate Release
                                </button>
                            </div>
                        </div>
                    )}

                    {releaseStep === 1 && (
                        <div className="bg-slate-900 text-white p-10 rounded-[3rem] border border-slate-800 shadow-2xl text-center max-w-2xl mx-auto animate-fadeIn">
                            <AlertCircle size={64} className="mx-auto text-orange-500 mb-6 animate-pulse" />
                            <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Capital Movement Confirmation</h3>
                            <p className="text-slate-400 mb-10 font-medium uppercase tracking-widest text-xs leading-relaxed">
                                You are about to initiate a transfer of <span className="text-white">$5,000,000.00</span> from the Strategic Reserve to the General Ledger. This action is immutable and logged to the Governance Core.
                            </p>
                            <div className="flex gap-4">
                                <button onClick={confirmRelease} className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95">Verify & Commit</button>
                                <button onClick={() => setReleaseStep(0)} className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs border border-slate-700">Cancel</button>
                            </div>
                        </div>
                    )}

                    {releaseStep === 2 && (
                        <div className="bg-slate-900 text-white p-10 rounded-[3rem] border border-blue-500/30 shadow-2xl text-center max-w-md mx-auto animate-fadeIn">
                            <Fingerprint size={80} className="mx-auto text-blue-500 animate-pulse mb-8" />
                            <h3 className="text-xl font-black uppercase tracking-[0.3em] mb-2 text-blue-400">Verifying Architect</h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-10">Neural Handshake in progress...</p>
                            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out_forwards]"></div>
                            </div>
                        </div>
                    )}

                    {releaseStep === 3 && (
                        <div className="bg-emerald-900 text-white p-10 rounded-[3rem] border border-emerald-800 shadow-2xl text-center max-w-md mx-auto animate-bounce-in">
                            <CheckCircle size={80} className="mx-auto text-emerald-400 mb-6" />
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Funds Released</h3>
                            <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">Ledger Entry: TXN-RES-9921-X</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Payroll;
