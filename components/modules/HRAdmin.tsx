
import React, { useState } from 'react';
/* Added Zap to the imports from lucide-react */
import { Users, UserPlus, Shield, Phone, Mail, X, UserCheck, CheckCircle2, ChevronRight, Search, Filter, Trash2, Edit3, Fingerprint, Lock, Zap } from 'lucide-react';
import { UserRole, PersonnelProfile } from '../../types';

const initialPersonnel: PersonnelProfile[] = [
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
    },
    { 
        id: 'BEE-102', 
        fullName: 'Marcus Cole', 
        role: UserRole.DRIVER, 
        email: 'm.cole@thelma.ai', 
        phone: '+1 (555) 020-1122',
        status: 'ACTIVE',
        identity: { ssn_ein: '***-**-4432', type: '1099_CONTRACTOR', dob: '1992-08-14', licenseNumber: 'CDL-A-110022', licenseExpiry: '2027-05-15', licenseClass: 'CLASS-A COMMERCIAL', licenseImageUploaded: true },
        financial: { payrollActivated: true, cardType: 'MASTERCARD', cardLastFour: '4432', payoutFrequency: 'WEEKLY' },
        dotCompliance: { lastReset: '2025-01-06 06:00', totalDriveTimeToday: 120, totalDutyTimeToday: 180, logs: [] },
        insurance: { provider: 'Almost Legal Agency', policyNumber: 'AL-CORP-995', coverageType: 'INDEPENDENT', expiry: '2025-12-01', status: 'VALID' },
        ledgerId: 'LEDGER-MC-102',
        systemTimestamp: new Date().toISOString()
    }
];

const HRAdmin: React.FC = () => {
  const [personnel, setPersonnel] = useState<PersonnelProfile[]>(initialPersonnel);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<PersonnelProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState(UserRole.DRIVER);
  const [newEmail, setNewEmail] = useState('');

  const addPerson = (e: React.FormEvent) => {
      e.preventDefault();
      const newBee: PersonnelProfile = {
          id: `BEE-${Math.floor(Math.random() * 900 + 100)}`,
          fullName: newName,
          role: newRole,
          email: newEmail,
          phone: '+1 (555) 000-0000',
          status: 'ONBOARDING',
          identity: { ssn_ein: '***-**-0000', type: 'W2_EMPLOYEE', dob: '1990-01-01', licenseNumber: 'PENDING', licenseExpiry: '2030-01-01', licenseClass: 'CLASS-B', licenseImageUploaded: false },
          financial: { payrollActivated: false, payoutFrequency: 'WEEKLY' },
          dotCompliance: { lastReset: 'N/A', totalDriveTimeToday: 0, totalDutyTimeToday: 0, logs: [] },
          insurance: { provider: 'TBD', policyNumber: 'TBD', coverageType: 'TBD', expiry: 'TBD', status: 'PENDING' },
          ledgerId: `LEDGER-${Date.now()}`,
          systemTimestamp: new Date().toISOString()
      };
      setPersonnel(prev => [newBee, ...prev]);
      setShowAddModal(false);
      setNewName('');
      setNewEmail('');
  };

  const filteredPersonnel = personnel.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 relative h-full flex flex-col">
      {showAddModal && (
          <div className="fixed inset-0 z-[400] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn">
                  <div className="p-8 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-lg flex items-center gap-3"><UserPlus size={24} className="text-blue-600"/> Onboard Personnel</h3>
                      <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24}/></button>
                  </div>
                  <form onSubmit={addPerson} className="p-8 space-y-6">
                      <div className="space-y-4">
                          <div>
                              <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Full Legal Name</label>
                              <input required value={newName} onChange={(e) => setNewName(e.target.value)} type="text" className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold outline-none focus:border-blue-500" placeholder="e.g. James Logan" />
                          </div>
                          <div>
                              <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Enterprise Email</label>
                              <input required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="email" className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold outline-none focus:border-blue-500" placeholder="j.logan@thelma.ai" />
                          </div>
                          <div>
                              <label className="text-[10px] font-black uppercase text-slate-500 block mb-1">Assigned Role</label>
                              <select value={newRole} onChange={(e) => setNewRole(e.target.value as UserRole)} className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold outline-none focus:border-blue-500 appearance-none">
                                  {Object.values(UserRole).map(role => <option key={role} value={role}>{role}</option>)}
                              </select>
                          </div>
                      </div>
                      <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
                          <UserCheck size={20}/> Initialize Onboarding Sync
                      </button>
                  </form>
              </div>
          </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Personnel Identity Matrix</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">The Hive v4.0.0 • Biometric Ledger Sync</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center gap-3">
              <UserPlus size={20} /> Add New Hire
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-colors">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-950/50">
                  <div className="relative w-full max-w-md">
                      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search roster..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold outline-none focus:border-blue-500"
                      />
                  </div>
                  <div className="flex gap-2">
                      <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-blue-500 transition-all"><Filter size={18}/></button>
                  </div>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                  <table className="w-full text-left">
                      <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                          <tr><th className="px-6 py-4">Identity</th><th className="px-6 py-4">Assigned Role</th><th className="px-6 py-4">Financials</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
                      </thead>
                      <tbody className="text-xs">
                          {filteredPersonnel.map(p => (
                              <tr key={p.id} onClick={() => setSelectedProfile(p)} className={`group cursor-pointer border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${selectedProfile?.id === p.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                                  <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-blue-600 shadow-sm">{p.fullName[0]}</div>
                                          <div><p className="font-black text-slate-800 dark:text-white uppercase tracking-tight">{p.fullName}</p><p className="text-[9px] text-slate-400 font-mono">{p.id}</p></div>
                                      </div>
                                  </td>
                                  <td className="px-6 py-4"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[9px] font-black uppercase">{p.role}</span></td>
                                  <td className="px-6 py-4">
                                      <div className="flex items-center gap-1 text-[9px] font-black uppercase text-slate-500">
                                          {p.financial.payrollActivated ? <Zap size={12} className="text-blue-500 fill-blue-500"/> : <X size={12} className="text-slate-300"/>}
                                          {p.financial.payoutFrequency}
                                      </div>
                                  </td>
                                  <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${p.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>{p.status}</span></td>
                                  <td className="px-6 py-4 text-right"><ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform inline" /></td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col gap-6">
              {selectedProfile ? (
                  <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl border border-slate-800 animate-slideInRight h-full flex flex-col overflow-hidden relative group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
                      <div className="relative z-10 flex flex-col items-center mb-8">
                          <div className="w-24 h-24 rounded-[2.5rem] bg-blue-600 flex items-center justify-center text-3xl font-black mb-6 shadow-xl border-4 border-white/10 group-hover:scale-105 transition-transform">{selectedProfile.fullName[0]}</div>
                          <h2 className="text-2xl font-black uppercase tracking-tighter text-center">{selectedProfile.fullName}</h2>
                          <p className="text-blue-400 font-black uppercase text-[10px] mt-1 tracking-widest">{selectedProfile.role}</p>
                      </div>
                      
                      <div className="relative z-10 space-y-3 flex-1 overflow-y-auto no-scrollbar pr-1">
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 transition-all hover:bg-white/10">
                              <Shield size={20} className="text-emerald-500"/>
                              <div><p className="text-[8px] text-slate-400 uppercase font-black">Security Vault</p><p className="text-xs font-bold">LEVEL {selectedProfile.id === 'BEE-001' ? '10 ARCHITECT' : '3 OPERATOR'}</p></div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 transition-all hover:bg-white/10">
                              <Phone size={20} className="text-blue-400"/>
                              <div><p className="text-[8px] text-slate-400 uppercase font-black">Secure Line</p><p className="text-xs font-bold">{selectedProfile.phone}</p></div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 transition-all hover:bg-white/10">
                              <Mail size={20} className="text-purple-400"/>
                              <div><p className="text-[8px] text-slate-400 uppercase font-black">Encryption PGP</p><p className="text-xs font-bold truncate max-w-[150px]">{selectedProfile.email}</p></div>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                              <div className="flex justify-between items-center"><p className="text-[8px] text-slate-400 uppercase font-black">ID Verification</p><CheckCircle2 size={12} className="text-emerald-500"/></div>
                              <p className="text-[10px] font-mono text-white/70">CDL: {selectedProfile.identity.licenseNumber}</p>
                              <p className="text-[10px] font-mono text-white/70">EXP: {selectedProfile.identity.licenseExpiry}</p>
                          </div>
                      </div>

                      <div className="pt-6 grid grid-cols-2 gap-3 shrink-0">
                          <button className="flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase transition-all"><Edit3 size={14}/> Edit</button>
                          <button className="flex items-center justify-center gap-2 py-4 bg-red-600/20 hover:bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase transition-all"><Trash2 size={14}/> Purge</button>
                      </div>
                  </div>
              ) : (
                  <div className="bg-slate-100/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center animate-pulse">
                      <Users size={48} className="mb-4 opacity-20"/>
                      <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Select a profile from the ledger to unlock encrypted identity data.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default HRAdmin;
