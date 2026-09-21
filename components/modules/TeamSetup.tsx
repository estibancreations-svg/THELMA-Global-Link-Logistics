
import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail, Briefcase, ChevronRight, Zap, CheckCircle, Fingerprint, Network, ArrowLeft, FileText, AlertTriangle, Phone, Hash, Upload, Check , ShieldCheck } from 'lucide-react';
import { UserRole, PersonnelProfile } from '../../types';

interface TeamSetupProps {
  onBack?: () => void;
}

const mockPersonnel: PersonnelProfile[] = [
    { 
        id: 'BEE-001', 
        fullName: 'Steven Henry', 
        role: UserRole.ARCHITECT, 
        email: 'steve@thelma.ai', 
        phone: '+1 (555) 019-9922',
        status: 'ACTIVE',
        identity: { ssn_ein: '***-**-8821', type: 'W2_EMPLOYEE', dob: '1985-04-12', licenseNumber: 'CDL-A-9921200', licenseExpiry: '2028-04-12', licenseClass: 'CLASS-A COMMERCIAL', licenseImageUploaded: true },
        financial: { payrollActivated: true, cardType: 'VISA DEBIT', cardLastFour: '8821', payoutFrequency: 'INSTANT' },
        dotCompliance: { lastReset: '2025-01-05 22:00', totalDriveTimeToday: 282, totalDutyTimeToday: 340, logs: [] },
        insurance: { provider: 'Almost Legal Agency', policyNumber: 'AL-CORP-992', coverageType: 'COMPANY_FLEET', expiry: '2026-01-01', status: 'VALID' },
        ledgerId: 'LEDGER-SH-001',
        systemTimestamp: new Date().toISOString()
    }
];

const TeamSetup: React.FC<TeamSetupProps> = ({ onBack }) => {
    const [selectedProfile, setSelectedProfile] = useState<PersonnelProfile | null>(mockPersonnel[0]);

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-purple-600 transition-all shadow-sm"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Identity Vault</h1>
                        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black flex items-center gap-2">
                           <Users size={12} className="text-purple-500"/> Personnel Management • v4.0.0
                        </p>
                    </div>
                </div>
                <button className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all">
                    <UserPlus size={16}/> New Enrollment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 space-y-4 h-auto">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Personnel Ledger</h3>
                    {mockPersonnel.map(person => (
                        <div 
                            key={person.id} 
                            onClick={() => setSelectedProfile(person)}
                            className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-300 ${selectedProfile?.id === person.id ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-500 opacity-80'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-sm shadow-xl ${selectedProfile?.id === person.id ? 'bg-purple-600' : 'bg-slate-800'}`}>
                                    {person.fullName[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black uppercase tracking-tight truncate">{person.fullName}</p>
                                    <p className="text-[10px] font-bold opacity-60 uppercase">{person.role}</p>
                                </div>
                                <ChevronRight size={16} className="opacity-40" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-8 space-y-8">
                    {selectedProfile && (
                        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-10 transition-colors h-auto">
                            <div className="flex justify-between items-start mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-[2rem] bg-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl">{selectedProfile.fullName[0]}</div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{selectedProfile.fullName}</h2>
                                        <p className="text-xs font-black text-purple-500 uppercase tracking-[0.2em] mt-1">{selectedProfile.id} • {selectedProfile.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">System Status</p>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[9px] font-black uppercase">ACTIVE</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2"><Fingerprint size={16}/> Identity Verification</h4>
                                        <div className="space-y-4">
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">CDL Class-A</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">{selectedProfile.identity.licenseNumber}</p>
                                            </div>
                                            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Expiration</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">{selectedProfile.identity.licenseExpiry}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest flex items-center gap-2"><Zap size={16}/> Financial Matrix</h4>
                                        <div className="p-8 bg-slate-950 rounded-[2.5rem] border border-slate-800 text-white relative overflow-hidden">
                                            <div className="relative z-10 space-y-8">
                                                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Linked Card</p>
                                                <p className="text-2xl font-mono font-black">**** **** **** {selectedProfile.financial.cardLastFour}</p>
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Instant Pay Active</span>
                                                    <CheckCircle size={20} className="text-emerald-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamSetup;
