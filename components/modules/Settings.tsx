
import React, { useState, useMemo } from 'react';
import { 
  Settings as SettingsIcon, Bell, Lock, Database, Save, RefreshCw, 
  Network, UserCircle, Monitor, Zap, ArrowLeft, Leaf, AlertTriangle, 
  Eye, Smartphone, QrCode, Sparkles, Search, Sliders, ShieldCheck, 
  Cpu, Activity, Radio, Target, Camera, Filter, CheckCircle2, Cloud, Brain, Orbit, Volume2, Truck, Gauge, Siren
} from 'lucide-react';
import { ModuleType, SystemMode } from '../../types';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  voiceSettings: { enabled: boolean; volume: number; rate: number };
  setVoiceSettings: (val: any) => void;
  onVocalize?: (text: string) => void;
  setActiveModule: (m: ModuleType) => void;
  onBack?: () => void;
  systemMode: SystemMode;
}

const Settings: React.FC<SettingsProps> = ({ 
  darkMode, 
  setDarkMode, 
  voiceSettings, 
  setVoiceSettings, 
  onVocalize,
  onBack,
  systemMode
}) => {
  const [activeTab, setActiveTab] = useState('General');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        if (onVocalize) onVocalize("Global configuration Matrix synchronized.");
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-24 min-h-full">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all shadow-sm">
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                <SettingsIcon size={24} className="text-blue-600" /> Command Matrix
              </h1>
              <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest font-black mt-1">
                Nexus v4.0 Active
              </p>
            </div>
          </div>
          <button onClick={handleSave} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">
             {isSaving ? 'Syncing...' : 'Save Matrix'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
            <section className="space-y-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">Interaction Protocols</h3>
                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                    <div className="flex items-center gap-4">
                        <Monitor className="text-blue-600" size={24}/>
                        <span className="text-sm font-black text-slate-800 dark:text-white uppercase">High Contrast Visuals</span>
                    </div>
                    <button onClick={() => setDarkMode(!darkMode)} className={`w-14 h-7 rounded-full relative transition-all ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}>
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${darkMode ? 'left-8' : 'left-1'}`}/>
                    </button>
                </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default Settings;
