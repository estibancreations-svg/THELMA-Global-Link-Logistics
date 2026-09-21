import React, { useState, useEffect, useRef } from 'react';
import { Wrench, AlertTriangle, CheckCircle2, Truck, ClipboardList, Shield, ArrowRight, ArrowLeft, History, FileText, Activity, Sliders, Zap, Camera, Eye, X, Smartphone, Radio, Mic, Phone, CheckSquare, RotateCcw, Clock, RefreshCw, Layers, Database, Cpu, Bot, HeartPulse } from 'lucide-react';
import { MaintenanceRecord } from '../../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { UnitSchematic } from '../3d/UnitSchematic'; // Imported 3D Engine

interface MaintenanceProps {
  onBack?: () => void;
  onVocalize?: (text: string) => void; // Added for voice support
}

// MOCK DATA UPDATED to include schematic types
const mockUnits = [
    { 
        id: 'F-150-L', 
        name: 'Ford F-150 Lightning', 
        type: 'TRUCK',
        chassis: 'PICKUP_FULL',
        status: 'URGENT', 
        health: 82, 
        issues: ['FRUNK_LOCK_FAIL', 'TIRE_FL_LOW']
    },
    { 
        id: 'TUG-04', 
        name: 'Damen RSD-E', 
        type: 'SHIP',
        chassis: 'TUGBOAT_HARBOR',
        status: 'WARNING', 
        health: 89, 
        issues: ['THRUSTER_PORT_VIBRATION']
    },
    { 
        id: 'F-102', 
        name: 'Tesla Semi G2', 
        type: 'TRUCK',
        chassis: 'SEMI_STREAMLINED',
        status: 'OK', 
        health: 98, 
        issues: []
    }
];

const mockInventory = [
    { name: 'TIRE_275_65R20', stock: 12, bin: 'A-42', leadTime: '2h' },
    { name: 'FRUNK_ACTUATOR_V2', stock: 4, bin: 'B-12', leadTime: '6h' },
    { name: 'THRUSTER_SEAL_KIT', stock: 0, bin: 'C-01', leadTime: '48h' }
];

const initialHealingNodes = Array.from({ length: 24 }).map((_, i) => ({
    id: `NODE-${i}`,
    status: 'HEALTHY' as 'HEALTHY' | 'FAULT' | 'HEALING',
    health: 100,
    type: i % 3 === 0 ? 'SENSOR' : i % 3 === 1 ? 'MECHANICAL' : 'SOFTWARE'
}));

const Maintenance: React.FC<MaintenanceProps> = ({ onBack, onVocalize }) => {
    const [viewMode, setViewMode] = useState<'MANUAL' | 'NEURAL_HEALING'>('MANUAL');
    const [selectedUnitId, setSelectedUnitId] = useState(mockUnits[0].id);
    const [showInventory, setShowInventory] = useState(false);
    const [isRewinding, setIsRewinding] = useState(false);
    
    // 3D Diagnostics State
    const [isExploded, setIsExploded] = useState(false);
    const [inspectedPart, setInspectedPart] = useState<string | null>(null);
    
    // Self Healing State
    const [healingNodes, setHealingNodes] = useState(initialHealingNodes);
    const [healingLogs, setHealingLogs] = useState<string[]>([]);
    const [autonomyRate, setAutonomyRate] = useState(94.2);

    const selectedUnit = mockUnits.find(u => u.id === selectedUnitId);

    const handlePartClick = (part: string) => {
        setInspectedPart(part);
        if (onVocalize) onVocalize(`Diagnostic Focus: ${part}. Pulling service history.`);
    };

    const handleRewind = () => {
        setIsRewinding(true);
        setTimeout(() => setIsRewinding(false), 2500);
    };

    // Self Healing Simulation
    useEffect(() => {
        if (viewMode === 'NEURAL_HEALING') {
            const interval = setInterval(() => {
                setHealingNodes(prev => {
                    const newNodes = [...prev];
                    // Randomly damage a node
                    if (Math.random() > 0.7) {
                        const targetIdx = Math.floor(Math.random() * newNodes.length);
                        if (newNodes[targetIdx].status === 'HEALTHY') {
                            newNodes[targetIdx] = { ...newNodes[targetIdx], status: 'FAULT', health: Math.floor(Math.random() * 40) + 20 };
                            setHealingLogs(l => [`[ALERT] ${newNodes[targetIdx].id} (${newNodes[targetIdx].type}) Critical Fault Detected.`, ...l.slice(0, 8)]);
                        }
                    }

                    // Heal nodes
                    return newNodes.map(node => {
                        if (node.status === 'FAULT') {
                            setHealingLogs(l => [`[SCRIPT] Deploying Patch v4.0 to ${node.id}...`, ...l.slice(0, 8)]);
                            return { ...node, status: 'HEALING', health: node.health + 10 };
                        }
                        if (node.status === 'HEALING') {
                            if (node.health >= 95) {
                                setHealingLogs(l => [`[SUCCESS] ${node.id} Restored to Optimal State.`, ...l.slice(0, 8)]);
                                return { ...node, status: 'HEALTHY', health: 100 };
                            }
                            return { ...node, health: node.health + 5 };
                        }
                        return node;
                    });
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [viewMode]);

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            {/* Inventory Modal */}
            {showInventory && (
                <div className="fixed inset-0 z-[500] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
                            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-lg flex items-center gap-3"><Database size={24} className="text-orange-500"/> Hangar Parts Matrix</h3>
                            <button onClick={() => setShowInventory(false)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X size={24}/></button>
                        </div>
                        <div className="p-8 space-y-4">
                            {mockInventory.map((item, i) => (
                                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-all hover:border-orange-400">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Part ID</p>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{item.name}</p>
                                    </div>
                                    <div className="text-right flex items-center gap-8">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400">Stock</p>
                                            <p className={`text-sm font-black ${item.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>{item.stock} Units</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400">Bin</p>
                                            <p className="text-sm font-mono font-bold text-slate-600 dark:text-slate-300">{item.bin}</p>
                                        </div>
                                        <button disabled={item.stock === 0} className="px-4 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30">Pull</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-orange-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">T.H.E.L.M.A. Maintenance Core</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Wrench size={12} className="text-orange-500"/> Predictive Ops • v4.0.0 Handshake
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl">
                    <button 
                        onClick={() => setViewMode('MANUAL')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'MANUAL' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Wrench size={14}/> Manual Ops
                    </button>
                    <button 
                        onClick={() => setViewMode('NEURAL_HEALING')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'NEURAL_HEALING' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-emerald-500'}`}
                    >
                        <Bot size={14}/> Neural Healing
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 overflow-hidden">
                {/* Left Panel: Unit List */}
                <div className="lg:col-span-1 space-y-4 overflow-y-auto no-scrollbar pr-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-2"><Truck size={14}/> Active Asset Queue</h3>
                    {mockUnits.map(unit => (
                        <div key={unit.id} onClick={() => { setSelectedUnitId(unit.id); setInspectedPart(null); }} className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-300 relative group ${selectedUnitId === unit.id ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-orange-400 opacity-70 hover:opacity-100'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${selectedUnitId === unit.id ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-orange-500'} transition-colors`}>
                                        <Truck size={20}/>
                                    </div>
                                    <div>
                                        <p className="text-base font-black uppercase tracking-tight leading-none mb-1">{unit.id}</p>
                                        <p className="text-[10px] font-bold opacity-60 uppercase">{unit.name}</p>
                                    </div>
                                </div>
                                {unit.status === 'URGENT' && <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                                    <span className="opacity-50">Health Matrix</span>
                                    <span className={unit.health < 85 ? 'text-red-400' : 'text-emerald-400'}>{unit.health}%</span>
                                </div>
                                <div className="w-full bg-slate-700/20 h-1.5 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-1000 ${unit.health < 85 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${unit.health}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden h-full">
                    {viewMode === 'MANUAL' && selectedUnit ? (
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8 transition-colors flex-1 flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 shrink-0">
                                <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-[0.2em] flex items-center gap-3">
                                    <Camera size={20} className="text-blue-500"/> Interactive Diagnostics
                                </h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsExploded(!isExploded)} className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95">
                                        <Layers size={16}/> {isExploded ? 'Implode View' : 'Explode View'}
                                    </button>
                                    <button onClick={() => setShowInventory(true)} className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg active:scale-95">
                                        <Database size={16}/> Check Stock
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 relative rounded-[2.5rem] overflow-hidden bg-slate-950 border border-slate-800">
                                <UnitSchematic 
                                    type={selectedUnit.type as any} 
                                    subType={selectedUnit.chassis} 
                                    exploded={isExploded} 
                                    highlightPart={inspectedPart} 
                                    onPartClick={handlePartClick}
                                />
                                
                                {inspectedPart && (
                                    <div className="absolute top-6 left-6 p-6 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-white/10 max-w-sm animate-slideInRight shadow-2xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-xl font-black text-white uppercase tracking-tight">{inspectedPart}</h4>
                                            <button onClick={() => setInspectedPart(null)} className="text-slate-400 hover:text-white"><X size={20}/></button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                                                <Activity size={14} className="text-emerald-500"/> Performance: 92%
                                            </div>
                                            <div className="p-3 bg-white/5 rounded-xl text-[10px] text-slate-400 font-mono leading-relaxed">
                                                LAST SERVICE: 2025-01-02<br/>
                                                TECH: Marcus Cole<br/>
                                                NOTE: Minor wear detected on seals.
                                            </div>
                                            <button className="w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-colors">
                                                Schedule Replacement
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col gap-6 animate-fadeIn">
                            {/* Neural Healing View (Same as before) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-emerald-950 rounded-[3rem] border border-emerald-800 p-8 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Bot size={32} className="text-emerald-400"/>
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Self-Healing Grid</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Autonomy Rate</p>
                                                <p className="text-4xl font-mono font-black text-white">{autonomyRate}%</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-200">
                                                <Activity size={14} className="animate-pulse"/>
                                                <span>24 Active Healing Scripts</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 flex flex-col">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><HeartPulse size={16}/> Automated Logs</h3>
                                    <div className="flex-1 overflow-y-auto no-scrollbar font-mono text-[10px] space-y-2">
                                        {healingLogs.map((log, i) => (
                                            <p key={i} className={`pb-2 border-b border-slate-100 dark:border-slate-800 ${log.includes('ALERT') ? 'text-red-500 font-bold' : log.includes('SUCCESS') ? 'text-emerald-500 font-bold' : 'text-slate-500'}`}>
                                                {log}
                                            </p>
                                        ))}
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

export default Maintenance;
