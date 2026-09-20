
import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Rewind, Clock, RotateCcw, Radio } from 'lucide-react';

interface TimeControllerProps {
  isReplayMode: boolean;
  onToggleReplay: () => void;
  simulatedTime: Date;
  setSimulatedTime: (date: Date) => void;
}

const TimeController: React.FC<TimeControllerProps> = ({ isReplayMode, onToggleReplay, simulatedTime, setSimulatedTime }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 10x, 100x

  // Playback Logic
  useEffect(() => {
    let interval: any;
    if (isPlaying && isReplayMode) {
      interval = setInterval(() => {
        setSimulatedTime(new Date(simulatedTime.getTime() + (1000 * playbackSpeed)));
      }, 100); // Update every 100ms
    }
    return () => clearInterval(interval);
  }, [isPlaying, isReplayMode, playbackSpeed, simulatedTime, setSimulatedTime]);

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value);
    const newDate = new Date(simulatedTime);
    // Reset to start of day then add hours (simple 24h scrub for demo)
    newDate.setHours(0, 0, 0, 0);
    newDate.setSeconds(hours); 
    // Actually map slider 0-86400 (seconds in day)
    const startOfDay = new Date(simulatedTime);
    startOfDay.setHours(0,0,0,0);
    setSimulatedTime(new Date(startOfDay.getTime() + parseInt(e.target.value) * 1000));
  };

  // Get seconds since midnight for slider value
  const getSliderValue = () => {
    const startOfDay = new Date(simulatedTime);
    startOfDay.setHours(0,0,0,0);
    return (simulatedTime.getTime() - startOfDay.getTime()) / 1000;
  };

  if (!isReplayMode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] p-6 flex justify-center animate-slideUp">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] rounded-[2rem] p-6 w-full max-w-4xl flex items-center gap-8 relative overflow-hidden">
        
        {/* CRT Scanline Effect for the Controller */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-amber-500/5 to-transparent animate-scan"></div>

        <div className="flex flex-col items-center gap-1 min-w-[120px]">
            <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest flex items-center gap-2">
                <Clock size={12}/> Forensic Replay
            </p>
            <p className="text-2xl font-mono font-black text-white tracking-widest">
                {simulatedTime.toLocaleTimeString([], {hour12: false})}
            </p>
            <p className="text-[9px] font-mono text-amber-400/60 uppercase">
                {simulatedTime.toLocaleDateString()}
            </p>
        </div>

        <div className="flex-1 flex flex-col gap-3">
            {/* Scrubber */}
            <input 
                type="range" 
                min="0" 
                max="86400" 
                value={getSliderValue()} 
                onChange={handleScrub}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 transition-all"
            />
            
            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-all shadow-lg active:scale-95">
                        {isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
                    </button>
                    <button onClick={() => setSimulatedTime(new Date(simulatedTime.getTime() - 3600000))} className="p-3 bg-slate-800 text-amber-500 rounded-full hover:bg-slate-700 transition-all">
                        <Rewind size={18}/>
                    </button>
                    <button onClick={() => setSimulatedTime(new Date(simulatedTime.getTime() + 3600000))} className="p-3 bg-slate-800 text-amber-500 rounded-full hover:bg-slate-700 transition-all">
                        <FastForward size={18}/>
                    </button>
                </div>

                <div className="flex gap-2">
                    {[1, 10, 100].map(speed => (
                        <button 
                            key={speed} 
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`px-3 py-1 rounded text-[10px] font-black font-mono transition-all border ${playbackSpeed === speed ? 'bg-amber-500/20 text-amber-400 border-amber-500' : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300'}`}
                        >
                            {speed}x
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <button 
            onClick={onToggleReplay} 
            className="flex flex-col items-center gap-2 p-4 bg-red-900/20 border border-red-500/50 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all group min-w-[100px]"
        >
            <Radio size={20} className="animate-pulse"/>
            <span className="text-[9px] font-black uppercase tracking-widest group-hover:animate-none">Return to Live</span>
        </button>

      </div>
    </div>
  );
};

export default TimeController;
