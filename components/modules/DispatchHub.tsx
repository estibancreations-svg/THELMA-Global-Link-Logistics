
import React, { useState, useEffect } from 'react';
import { 
    Truck, Plane, Ship, MapPin, Search, Filter, ArrowLeft, RefreshCw, Layers, DollarSign, Users, Zap, CheckCircle2, AlertTriangle, Clock, ChevronRight, Package, UserCheck, X, Check, ShieldCheck, Printer, FileText, Share2, Brain, Sparkles, TrendingUp, Lock
} from 'lucide-react';
import { DispatchOrder, Bid, ModuleType } from '../../types';
import { generateLoadBoard } from '../../data/massDataGenerator';

interface DispatchHubProps {
    onBack?: () => void;
}

const preCogOrders = [
    { id: 'PRE-882', probability: 94, origin: 'Port of LA', destination: 'Phoenix, AZ', payload: 'EV Battery Cells', value: 32000, reason: 'Ship arrival in 4h correlated with factory demand spike.' },
    { id: 'PRE-885', probability: 88, origin: 'Chicago, IL', destination: 'Miami, FL', payload: 'Pharma Cold Chain', value: 68000, reason: 'Flu season pattern analysis indicates inventory depletion.' },
    { id: 'PRE-901', probability: 72, origin: 'Seattle, WA', destination: 'Denver, CO', payload: 'Aerospace Comp.', value: 120000, reason: 'Production line schedule scrape detected gap.' }
];

const DispatchHub: React.FC<DispatchHubProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'LIVE' | 'PRE_COG'>('LIVE');
    const [orders, setOrders] = useState<DispatchOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<DispatchOrder | null>(null);
    const [bidAmount, setBidAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isGeneratingBOL, setIsGeneratingBOL] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const generated = generateLoadBoard();
        setOrders(generated);
    }, []);

    const submitBid = () => {
        if (!selectedOrder || !bidAmount) return;
        setIsProcessing(true);
        setTimeout(() => {
            const newBid: Bid = { 
                id: `BID-${Date.now()}`,
                driverName: 'Steve Henry (You)', 
                driverId: 'BEE-001',
                amount: parseFloat(bidAmount), 
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'PENDING'
            };
            setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, bids: [...(o.bids || []), newBid] } : o));
            setSelectedOrder(prev => prev ? { ...prev, bids: [...(prev.bids || []), newBid] } : null);
            setIsProcessing(false);
            setBidAmount('');
        }, 1200);
    };

    const finalizeDispatch = (bid: Bid) => {
        if (!selectedOrder) return;
        setIsProcessing(true);
        setTimeout(() => {
            setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: 'ASSIGNED', assignedAssetId: bid.driverId === 'BEE-001' ? 'T-900' : 'F-102' } : o));
            setSelectedOrder(prev => prev ? { ...prev, status: 'ASSIGNED', assignedAssetId: bid.driverId === 'BEE-001' ? 'T-900' : 'F-102' } : null);
            setIsProcessing(false);
        }, 1500);
    };

    const filteredOrders = orders.filter(o => 
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        o.origin.toLowerCase().includes(searchTerm.toLowerCase()) || 
        o.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">T.H.E.L.M.A. Load Board</h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Layers size={12} className="text-blue-500"/> Real-Time Logistics Mesh • {orders.length} Active
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setActiveTab('LIVE')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'LIVE' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-200'}`}>Live Market</button>
                    <button onClick={() => setActiveTab('PRE_COG')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'PRE_COG' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-purple-500 border border-purple-200'}`}>
                        <Brain size={12} /> Pre-Cog
                    </button>
                </div>
            </div>

            {activeTab === 'PRE_COG' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {preCogOrders.map(pre => (
                        <div key={pre.id} className="bg-slate-900 p-8 rounded-[3rem] border border-purple-500/30 relative overflow-hidden group hover:border-purple-500 transition-all">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-purple-900/30 text-purple-400 rounded-2xl border border-purple-500/20">
                                        <Sparkles size={24} className="animate-pulse"/>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-purple-400 tracking-widest">Confidence</p>
                                        <p className="text-3xl font-black font-mono text-white">{pre.probability}%</p>
                                    </div>
                                </div>
                                <div className="space-y-4 mb-8">
                                    <p className="text-lg font-bold text-white uppercase">{pre.origin} → {pre.destination}</p>
                                    <p className="text-sm font-bold text-white uppercase">{pre.payload}</p>
                                    <p className="text-[10px] font-mono text-purple-200 italic">{pre.reason}</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-purple-500/20 pt-6">
                                    <p className="text-2xl font-black font-mono text-white">${pre.value.toLocaleString()}</p>
                                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Pre-Book</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'LIVE' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50 dark:bg-slate-950/50">
                            <div className="relative w-full max-w-sm">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search 200+ manifests..." 
                                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-600 dark:text-slate-300"><Filter size={14}/> Domain Filter</button>
                            </div>
                        </div>
                        
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900 z-10 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-8 py-6">Manifest ID</th>
                                    <th className="px-8 py-6">Status & Domain</th>
                                    <th className="px-8 py-6 text-right">Est. Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {filteredOrders.map(order => (
                                    <tr key={order.id} onClick={() => setSelectedOrder(order)} className={`group cursor-pointer border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${selectedOrder?.id === order.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                                                    {order.domain === 'LAND' ? <Truck size={20}/> : order.domain === 'AIR' ? <Plane size={20}/> : <Ship size={20}/>}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{order.id}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{order.client}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${order.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>{order.status}</span>
                                                <p className="text-[9px] text-slate-400 uppercase font-black">{order.origin.split(',')[0]} → {order.destination.split(',')[0]}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right font-mono font-black text-slate-800 dark:text-white text-lg">${order.value.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Detail Sidebar - Now flows with page */}
                    <div className="lg:col-span-1 h-auto">
                        {selectedOrder ? (
                            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-slideInRight flex flex-col transition-all sticky top-24">
                                <div className="p-8 bg-slate-900 text-white relative">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter">{selectedOrder.id}</h3>
                                        <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20}/></button>
                                    </div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-blue-400">{selectedOrder.payload}</p>
                                </div>
                                <div className="p-8 space-y-8 bg-slate-50 dark:bg-slate-900">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Bid on Load</p>
                                        <div className="relative">
                                            <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                                            <input 
                                                type="number" 
                                                value={bidAmount} 
                                                onChange={(e) => setBidAmount(e.target.value)} 
                                                placeholder="Amount" 
                                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-black outline-none focus:border-blue-600"
                                            />
                                        </div>
                                        <button 
                                            onClick={submitBid} 
                                            disabled={isProcessing || !bidAmount} 
                                            className="w-full mt-4 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 flex items-center justify-center gap-3 transition-all"
                                        >
                                            {isProcessing ? <RefreshCw className="animate-spin" size={20}/> : <ShieldCheck size={20}/>} Commit Bid
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-100/50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 sticky top-24">
                                <Layers size={48} className="mx-auto mb-4 opacity-20"/>
                                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Select a manifest to view routing details and bid hall.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DispatchHub;
