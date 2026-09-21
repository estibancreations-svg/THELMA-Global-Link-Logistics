
import React, { useState, useEffect } from 'react';
import { Leaf, Wind, Sun, Battery, DollarSign, Award, Database, Zap, TrendingUp, Cpu, RefreshCw, Lock, ArrowRight, CheckCircle2, AlertTriangle, ArrowLeft, ShieldCheck, Orbit, Bot, Activity, Binary } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface NetZeroHubProps {
  onBack?: () => void;
}

const marketData = Array.from({ length: 24 }).map((_, i) => ({
    time: `${i}:00`,
    price: 140 + Math.random() * 20 - 10,
    predicted: 140 + Math.random() * 20 - 10 + (Math.sin(i) * 5)
}));

const NetZeroHub: React.FC<NetZeroHubProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState<'COMMAND' | 'MARKET'>('COMMAND');
  const [liveEmissions, setLiveEmissions] = useState(14520.45);
  const [spotPrice, setSpotPrice] = useState(145.50);

  useEffect(() => {
    const interval = setInterval(() => {
        setLiveEmissions(prev => prev + 0.05);
        setSpotPrice(prev => Math.max(50, prev + (Math.random() - 0.5) * 1.5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen pb-24">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div className="flex items-center gap-4">
                 {onBack && (
                    <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-500 transition-all shadow-sm"><ArrowLeft size={20} /></button>
                 )}
                 <div>
                    <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white flex items-center gap-3">
                        <Leaf size={28} className="text-emerald-500"/> Net Zero Hub
                    </h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> ESG H.E.N.R.Y. Core Active
                    </p>
                 </div>
             </div>
       </div>

       <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 w-full md:w-auto self-start">
            <button onClick={() => setActiveView('COMMAND')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'COMMAND' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md' : 'text-slate-500'}`}>Overview</button>
            <button onClick={() => setActiveView('MARKET')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'MARKET' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500'}`}>Carbon Market</button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2 mb-8">
                        <Activity size={20} className="text-emerald-500"/> Capture Yield Performance
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={marketData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="time" hide />
                                <YAxis hide />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.1} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 text-white p-8 rounded-[3rem] border border-slate-800 shadow-xl">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-blue-400"><Orbit size={18}/> Project Z Offset</h3>
                        <p className="text-4xl font-black font-mono">14.20 <span className="text-sm text-slate-500">TONS</span></p>
                        <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold">Atmospheric scrubbing in Sector 9 is operating at 94% coherence.</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2"><DollarSign size={18} className="text-emerald-500"/> Tradeable Assets</h3>
                        <p className="text-4xl font-black font-mono text-slate-900 dark:text-white">4,822 <span className="text-sm text-slate-500">CREDITS</span></p>
                        <button className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">Market Access</button>
                    </div>
                </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-[3.5rem] border border-slate-800 shadow-2xl sticky top-24">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-8 flex items-center gap-3">
                      <Bot size={20} className="animate-pulse"/> ESG Auditor
                  </h3>
                  <div className="space-y-6">
                      <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                          <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Live Emissions</p>
                          <p className="text-2xl font-black font-mono text-white">{liveEmissions.toFixed(2)}t</p>
                      </div>
                      <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                          <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Audit Trail</p>
                          <p className="text-xs font-mono text-emerald-400 break-all">0x7f2c8...verified</p>
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  );
};

export default NetZeroHub;
