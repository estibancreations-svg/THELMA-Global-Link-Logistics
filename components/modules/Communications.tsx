
import React, { useState, useEffect } from 'react';
import { Radio, Mic, ArrowLeft, RadioTower, Zap, Ear, ShieldAlert, Wifi, Activity } from 'lucide-react';

interface CommunicationsProps {
  onBack?: () => void;
}

const mockChannels = [
    { id: 'GLOBAL_DISPATCH', name: 'Global Dispatch', users: 142, active: true, freq: '462.56 MHz' },
    { id: 'TACTICAL_MESH', name: 'Squad Link', users: 12, active: true, freq: '902.15 MHz' },
    { id: 'DIRECT_WHISPER', name: 'L10 Architect', users: 2, active: true, freq: 'NULL_HOP' },
];

const Communications: React.FC<CommunicationsProps> = ({ onBack }) => {
    const [selectedChannel, setSelectedChannel] = useState(mockChannels[0]);
    const [isTransmitting, setIsTransmitting] = useState(false);

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fadeIn bg-slate-50 dark:bg-slate-950 min-h-screen pb-24 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">PTT Comms Mesh</h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mt-2">
                            <RadioTower size={12} className="text-blue-500"/> Secure Field Relay Active
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-1 space-y-4 h-auto">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">RF Channels</h3>
                    {mockChannels.map(channel => (
                        <button 
                            key={channel.id} 
                            onClick={() => setSelectedChannel(channel)} 
                            className={`w-full p-6 rounded-[2.5rem] flex flex-col transition-all ${selectedChannel.id === channel.id ? 'bg-blue-600 text-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'}`}
                        >
                            <div className="flex items-center gap-4 text-left">
                                <div className={`p-3 rounded-2xl ${selectedChannel.id === channel.id ? 'bg-blue-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                    <Radio size={20}/>
                                </div>
                                <div>
                                    <p className="text-sm font-black uppercase tracking-tight mb-0.5">{channel.name}</p>
                                    <p className="text-[9px] font-bold opacity-60">{channel.freq}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="lg:col-span-3 bg-slate-950 rounded-[3.5rem] border border-slate-800 shadow-2xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden h-auto min-h-[500px]">
                    <div className="absolute top-10 left-10 text-left">
                        <h2 className="text-white font-black uppercase text-xl tracking-tighter">{selectedChannel.name}</h2>
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> {selectedChannel.users} Units Online
                        </p>
                    </div>

                    <div className="relative py-20">
                        {isTransmitting && <div className="absolute inset-0 bg-red-600/30 blur-3xl animate-pulse rounded-full scale-150"></div>}
                        <button 
                            onMouseDown={() => setIsTransmitting(true)}
                            onMouseUp={() => setIsTransmitting(false)}
                            className={`w-48 h-48 md:w-64 md:h-64 rounded-full border-[16px] flex items-center justify-center transition-all duration-300 shadow-2xl relative z-10 ${isTransmitting ? 'bg-red-600 border-red-900 scale-90' : 'bg-slate-800 border-slate-700 hover:border-slate-500 active:scale-95'}`}
                        >
                            <Mic size={80} className={isTransmitting ? 'text-white animate-pulse' : 'text-slate-500'} />
                        </button>
                    </div>
                    
                    <p className={`text-[11px] font-black uppercase tracking-[0.5em] transition-all ${isTransmitting ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                        {isTransmitting ? 'TRANSMITTING...' : 'READY TO BROADCAST'}
                    </p>

                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
                         <button className="p-4 bg-yellow-500 text-black rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all"><Zap size={20} className="mx-auto mb-2"/> Chirp</button>
                         <button className="p-4 bg-slate-800 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest"><Ear size={20} className="mx-auto mb-2 text-blue-400"/> Listen</button>
                         <button className="p-4 bg-red-900/40 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border border-red-900/50"><ShieldAlert size={20} className="mx-auto mb-2 text-red-500"/> SOS</button>
                         <button className="p-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest"><Wifi size={20} className="mx-auto mb-2"/> SAT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Communications;
