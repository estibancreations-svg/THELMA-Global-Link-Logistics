
import React, { useState, useEffect } from 'react';
import { 
  Truck, Activity, Battery, Info, Navigation, Satellite, Zap, ArrowLeft, 
  Clock, MapPin, CheckCircle2, AlertTriangle, X, Brain, RefreshCw, 
  ToggleLeft, ToggleRight, ShieldCheck, DollarSign, Receipt as ReceiptIcon, 
  AlertOctagon, ScanSearch, Sliders, FileText, User, Fuel, Gauge, AlertCircle,
  Thermometer, Droplets, Box, Wrench, GraduationCap
} from 'lucide-react';
import { FleetVehicle, DutyStatus, DOTLogEntry, ModuleType } from '../../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { generateFleetMatrix } from '../../data/massDataGenerator';

interface FleetDashboardProps {
  onBack?: () => void;
  onVocalize?: (text: string) => void;
  isReplayMode?: boolean; 
  simulatedTime?: Date;   
  isLockedDown?: boolean;
}

const mockDOTLogs: DOTLogEntry[] = [
    { id: 'LOG-001', timestamp: '08:00 AM', status: DutyStatus.ENROUTE, location: 'San Francisco, CA', notes: 'Pre-trip inspection complete.' },
    { id: 'LOG-002', timestamp: '12:30 PM', status: DutyStatus.STOPPED, location: 'Fresno, CA', notes: '30 min mandatory break.' },
    { id: 'LOG-003', timestamp: '04:15 PM', status: DutyStatus.ENROUTE, location: 'Bakersfield, CA', notes: 'Traffic delay - construction.' },
    { id: 'LOG-004', timestamp: '08:00 PM', status: DutyStatus.SLEEPER, location: 'Los Angeles, CA', notes: 'Post-trip inspection. Sleeper berth.' },
];

const mockExpenses = [
    { category: 'Fuel/Energy', amount: 4500, budget: 5000 },
    { category: 'Maintenance', amount: 1200, budget: 2000 },
    { category: 'Tolls', amount: 850, budget: 600 },
    { category: 'Permits', amount: 300, budget: 300 },
];

const FleetDashboard: React.FC<FleetDashboardProps> = ({ onBack, isReplayMode = false, simulatedTime = new Date(), isLockedDown = false }) => {
  const [activeTab, setActiveTab] = useState<'MAP' | 'MATRIX' | 'ELD' | 'EXPENSES'>('MAP');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null);
  const [mapLayers, setMapLayers] = useState({ traffic: true, radar: false, satellite: false });

  useEffect(() => {
      const generated = generateFleetMatrix();
      setVehicles(generated);
      setSelectedUnit(generated[0]);
  }, []);

  useEffect(() => {
      if (isLockedDown) return;
      let interval: any;
      if (isReplayMode) {
          const timeValue = simulatedTime.getTime();
          setVehicles(prev => prev.map((v, i) => {
              const offset = i * 1000000;
              const latOffset = Math.sin((timeValue + offset) / 10000000) * 0.1;
              const lngOffset = Math.cos((timeValue + offset) / 10000000) * 0.1;
              return { ...v, lat: 34.05 + latOffset, lng: -118.24 + lngOffset, heading: (Math.atan2(lngOffset, latOffset) * 180 / Math.PI + 360) % 360 };
          }));
      } else {
          interval = setInterval(() => {
              setVehicles(prev => prev.map(v => (v.status === 'ENROUTE' || v.status === 'ACTIVE') ? { ...v, lat: v.lat + (Math.random() - 0.5) * 0.0005, lng: v.lng + (Math.random() - 0.5) * 0.0005, heading: (v.heading + (Math.random() * 10 - 5)) % 360 } : v));
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [isReplayMode, simulatedTime, isLockedDown]);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm"><ArrowLeft size={20} /></button>
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Fleet Intelligence • v2.6</h1>
            <p className="text-slate-500 text-[10px] md:text-sm font-black uppercase tracking-widest flex items-center gap-2">
               <span className={`w-2 h-2 rounded-full animate-pulse ${isLockedDown ? 'bg-red-500' : 'bg-emerald-500'}`}></span> {vehicles.length} Units Active
            </p>
          </div>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-auto">
             {['MAP', 'MATRIX', 'ELD', 'EXPENSES'].map((tab) => (
                 <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-900 shadow-md text-blue-600' : 'text-slate-500'}`}>{tab}</button>
             ))}
        </div>
      </div>

      <div className="space-y-8">
      {activeTab === 'MAP' && selectedUnit && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                  <div className="bg-slate-950 rounded-[3.5rem] border border-slate-800 shadow-2xl overflow-hidden min-h-[600px] relative group">
                      <div className={`absolute inset-0 transition-all duration-1000 ${mapLayers.satellite ? "bg-[url('https://mt1.google.com/vt/lyrs=s&x=1310&y=3166&z=13')] bg-cover grayscale-[20%]" : "bg-[url('https://mt1.google.com/vt/lyrs=m&x=1310&y=3166&z=13')] bg-cover grayscale-[10%]"}`}></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md p-8 rounded-[2rem] border border-slate-700 text-center z-40">
                          <MapPin className="mx-auto text-blue-500 mb-4" size={40}/>
                          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-1">Global Mesh View</h3>
                          <p className="text-slate-400 text-xs font-mono">Lat: {selectedUnit.lat.toFixed(4)} • Lng: {selectedUnit.lng.toFixed(4)}</p>
                      </div>
                  </div>
              </div>
              <div className="lg:col-span-1 space-y-6">
                  <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] border border-slate-800 shadow-2xl sticky top-24">
                      <h3 className="text-[10px] font-black uppercase text-blue-400 mb-8 tracking-[0.3em] flex items-center gap-3"><Activity size={16} /> Unit Focus</h3>
                      <div className="space-y-8">
                          <div>
                              <p className="text-[10px] uppercase text-slate-500 font-black tracking-widest mb-1">Unit ID</p>
                              <p className="text-4xl font-black tracking-tighter uppercase">{selectedUnit.id}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                              <div className="p-4 bg-slate-800 rounded-2xl">
                                  <p className="text-[9px] uppercase text-slate-500 font-black mb-1">Operator</p>
                                  <p className="text-xs font-black uppercase">{selectedUnit.driver}</p>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-2xl">
                                  <p className="text-[9px] uppercase text-slate-500 font-black mb-1">Status</p>
                                  <p className="text-xs font-black text-emerald-400 uppercase">{selectedUnit.status}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'MATRIX' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {vehicles.slice(0, 100).map(vehicle => (
                  <div key={vehicle.id} className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02] group">
                      <div className="flex justify-between items-start mb-6">
                          <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Truck size={24}/>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${vehicle.status === 'MAINTENANCE' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>{vehicle.status}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">{vehicle.id}</h3>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-6">{vehicle.driver}</p>
                      <div className="space-y-4">
                          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                              <span>Energy State</span>
                              <span>{vehicle.fuelLevel}%</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full ${vehicle.fuelLevel < 20 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${vehicle.fuelLevel}%` }}></div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {activeTab === 'ELD' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 bg-slate-900 text-white p-10 rounded-[3.5rem] border border-slate-800 shadow-2xl sticky top-24">
                  <h3 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3"><Clock size={24} className="text-blue-500"/> Driver HOS</h3>
                  <div className="relative w-56 h-56 mx-auto mb-10">
                      <svg className="w-full h-full -rotate-90">
                          <circle cx="50%" cy="50%" r="45%" stroke="#1e293b" strokeWidth="15" fill="transparent"/>
                          <circle cx="50%" cy="50%" r="45%" stroke="#3b82f6" strokeWidth="15" fill="transparent" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-black font-mono">08:42</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">Rem. Drive</span>
                      </div>
                  </div>
                  <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Certify Logs</button>
              </div>

              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30">
                      <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs flex items-center gap-3"><FileText size={20} className="text-emerald-500"/> Digital Record Set</h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {mockDOTLogs.map((log) => (
                          <div key={log.id} className="p-10 flex gap-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                              <div className="flex flex-col items-center gap-1 min-w-[70px]">
                                  <span className="text-lg font-black text-slate-900 dark:text-white">{log.timestamp.split(' ')[0]}</span>
                                  <span className="text-[10px] font-black text-slate-400 uppercase">{log.timestamp.split(' ')[1]}</span>
                              </div>
                              <div className="flex-1">
                                  <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase mb-2">{log.status}</h4>
                                  <p className="text-xs text-slate-500 font-bold uppercase flex items-center gap-2 mb-4"><MapPin size={14}/> {log.location}</p>
                                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs italic text-slate-600 dark:text-slate-400">"{log.notes}"</div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'EXPENSES' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs mb-10 flex items-center gap-3"><DollarSign size={20} className="text-emerald-500"/> Expenditure Analysis</h3>
                  <div className="h-96 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={mockExpenses} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                              <XAxis type="number" hide />
                              <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} axisLine={false} tickLine={false} />
                              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: 'none', color: 'white' }} />
                              <Bar dataKey="amount" fill="#3b82f6" radius={[0, 8, 8, 0]} barSize={40} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </div>
              <div className="space-y-6">
                  {mockExpenses.map((exp, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all hover:border-blue-500">
                          <div className="flex items-center gap-6">
                              <div className={`p-4 rounded-2xl ${exp.amount > exp.budget ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}><AlertCircle size={24}/></div>
                              <div>
                                  <p className="text-sm font-black uppercase text-slate-800 dark:text-white">{exp.category}</p>
                                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Cap: ${exp.budget}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">${exp.amount}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
      </div>
    </div>
  );
};

export default FleetDashboard;
