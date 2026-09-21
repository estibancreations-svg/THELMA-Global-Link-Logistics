
import React, { useState, useEffect } from 'react';
import { Siren, MapPin, Phone, Clock, ShieldAlert, Truck, Activity, Radio, CheckCircle, AlertTriangle, Users, Timer, Zap, Navigation, Shield, Heart, HeartPulse, ChevronRight, Search, Crosshair, ArrowLeft, X, Droplets, Flame, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';

interface Incident {
    id: string;
    type: 'MEDICAL' | 'FIRE' | 'HAZMAT' | 'SECURITY' | 'AV_CRASH';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    location: string;
    status: 'NEW' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED';
    timestamp: string;
    unitsAssigned: string[];
    startTime: number;
    coordinates: { x: number, y: number };
}

const mockIncidents: Incident[] = [
    { id: 'INC-901', type: 'HAZMAT', severity: 'CRITICAL', location: 'Hwy 401, Mile 82', status: 'ON_SCENE', timestamp: '10m ago', unitsAssigned: ['F-101', 'R-01'], startTime: Date.now() - 600000, coordinates: { x: 42, y: 38 } },
    { id: 'INC-902', type: 'MEDICAL', severity: 'HIGH', location: 'Distribution Hub B', status: 'DISPATCHED', timestamp: '25m ago', unitsAssigned: ['EMS-4'], startTime: Date.now() - 1500000, coordinates: { x: 70, y: 55 } },
    { id: 'INC-903', type: 'SECURITY', severity: 'MEDIUM', location: 'Gate 4 Perimeter', status: 'NEW', timestamp: '2m ago', unitsAssigned: [], startTime: Date.now() - 120000, coordinates: { x: 25, y: 80 } },
];

const EmergencyDashboard: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(mockIncidents[0]);
    const [dispatcherStress, setDispatcherStress] = useState(62);
    const [activeTab, setActiveTab] = useState<'MAP' | 'LOGS'>('MAP');

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatDuration = (startTime: number) => {
        const diff = currentTime - startTime;
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-24 min-h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-red-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Tier-1 Emergency Command</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm flex items-center gap-2 font-medium">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            Priority Mesh v4.0.0 Active
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <button onClick={() => setActiveTab('MAP')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase ${activeTab === 'MAP' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500'}`}>Map</button>
                    <button onClick={() => setActiveTab('LOGS')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase ${activeTab === 'LOGS' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500'}`}>Logs</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
                <div className="lg:col-span-3 bg-slate-900 rounded-[3rem] border border-red-500/20 shadow-2xl relative overflow-hidden min-h-[500px]">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white p-10 z-10">
                         <Siren size={80} className="text-red-500 mx-auto mb-6 animate-pulse" />
                         <h2 className="text-2xl font-black uppercase tracking-widest">Active Incident Map</h2>
                         <p className="text-slate-400 mt-2 font-mono text-sm">Synchronizing Field Telemetry...</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><HeartPulse size={18} className="text-red-500" /> Dispatch Stress</h3>
                            <div className="px-2 py-1 bg-red-50 text-red-600 rounded text-[10px] font-mono font-black">{dispatcherStress}%</div>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full" style={{ width: `${dispatcherStress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyDashboard;
