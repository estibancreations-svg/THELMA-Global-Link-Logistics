
import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, MapPin, Navigation, AlertTriangle, ShieldCheck, Camera, Mic, 
  ArrowLeft, RefreshCw, Power, Zap, Clock, Bluetooth, SignalHigh, 
  Battery, Wind, CheckCircle2, Truck, ShieldAlert, 
  ScanLine, Radio, FileText, Settings, Layers, 
  Check, Activity, Search, Sun, Moon, Database, 
  Ghost, ArrowUp, DollarSign, UploadCloud, X,
  User, Briefcase, GraduationCap, Users, FileCheck, Minimize2,
  Fingerprint, AlertOctagon, Maximize2, Map, Satellite, Shield, ClipboardCheck, Play, Key, Printer, Volume2,
  Brain, PenTool
} from 'lucide-react';
import { DutyStatus } from '../../types';

interface MobileFieldAppProps {
  onBack?: () => void;
  onVocalize?: (text: string) => void;
}

type AppMode = 'ONBOARDING' | 'ACTIVE_TRIP';
type OnboardingStep = 'IDENTITY' | 'DOCUMENTS' | 'TRAINING' | 'HARDWARE' | 'ACTIVE';

const MobileFieldApp: React.FC<MobileFieldAppProps> = ({ onBack, onVocalize }) => {
  // --- STATE ---
  const [mode, setMode] = useState<AppMode>('ONBOARDING');
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('IDENTITY');
  const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Active Trip State
  const [hosTime, setHosTime] = useState('07:42:15');
  const [speed, setSpeed] = useState(65);
  const [btStatus, setBtStatus] = useState<'DISCONNECTED' | 'SCANNING' | 'CONNECTED'>('DISCONNECTED');
  const [isSpatialLocked, setIsSpatialLocked] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  
  const [tripEvents, setTripEvents] = useState([
      { id: 1, type: 'SYSTEM', msg: 'Tactical Path Alpha-9 Engaged.', time: '14:30', icon: Navigation, color: 'text-blue-500' },
      { id: 2, type: 'AUDIT', msg: 'V.E.R.I.T.A.S. Spatial Lock Confirmed.', time: '14:32', icon: ShieldCheck, color: 'text-emerald-500' }
  ]);

  // --- ACTIONS ---

  const simulateHardwarePairing = () => {
      setBtStatus('SCANNING');
      setTimeout(() => {
          setBtStatus('CONNECTED');
          if (onVocalize) onVocalize("Bluetooth Handshake Verified. ELD and Thermal Printer linked.");
      }, 2000);
  };

  const completeStep = (step: OnboardingStep, next?: OnboardingStep) => {
    setCompletedSteps(prev => [...prev, step]);
    if (next) setCurrentStep(next);
    
    if (onVocalize) {
        const msgs: Record<string, string> = {
            IDENTITY: "Identity Verified.",
            DOCUMENTS: "Compliance Stack Ingested.",
            TRAINING: "Academy Certification Complete.",
            HARDWARE: "Mesh Handshake Active."
        };
        if (msgs[step]) onVocalize(msgs[step]);
    }
  };

  const startTrip = () => {
      if (btStatus !== 'CONNECTED') {
          if (onVocalize) onVocalize("Error. Hardware handshake required to engage route.");
          return;
      }
      setMode('ACTIVE_TRIP');
      setIsSpatialLocked(true);
      if (onVocalize) onVocalize("Route engaged. All systems nominal. Safety protocol LILY is monitoring telemetry.");
  };

  const handlePrintBOL = () => {
      if (onVocalize) onVocalize("Generating physical manifest. Sending to Bluetooth Thermal Printer.");
      setTripEvents(prev => [{
          id: Date.now(),
          type: 'HARDWARE',
          msg: 'Physical BOL Printed via BT-Direct.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: Printer,
          color: 'text-orange-400'
      }, ...prev]);
  };

  // --- UI COMPONENTS ---

  if (mode === 'ACTIVE_TRIP') {
      return (
          <div className="min-h-screen bg-slate-950 text-white font-sans pb-32 animate-fadeIn">
              {/* STICKY HUD */}
              <div className="sticky top-0 z-[100] bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">ON DUTY - DRIVING</span>
                      </div>
                      <div className="flex items-center gap-4">
                          <Bluetooth size={16} className={btStatus === 'CONNECTED' ? 'text-blue-500' : 'text-slate-600'} />
                          <SignalHigh size={16} className="text-blue-500" />
                          <Battery size={16} className="text-emerald-500" />
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-4">
                      <div className="text-center">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Speed</p>
                          <p className="text-2xl font-black font-mono">{speed}<span className="text-[10px] ml-1 opacity-50">MPH</span></p>
                      </div>
                      <div className="text-center border-x border-slate-800">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">HOS Rem.</p>
                          <p className="text-2xl font-black font-mono text-orange-500">{hosTime.split(':')[0]}:{hosTime.split(':')[1]}</p>
                      </div>
                      <div className="text-center">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">ETA</p>
                          <p className="text-2xl font-black font-mono text-blue-400">18:24</p>
                      </div>
                  </div>
              </div>

              {/* TACTICAL STREAM (The Infinite Feed) */}
              <div className="p-6 space-y-8">
                  {/* Current Position Map Snippet */}
                  <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 h-64 overflow-hidden relative shadow-2xl">
                      <div className="absolute inset-0 bg-[url('https://mt1.google.com/vt/lyrs=m&x=1310&y=3166&z=13')] bg-cover grayscale invert opacity-40"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">
                              <Truck size={24} className="text-white" />
                          </div>
                      </div>
                      <div className="absolute bottom-4 left-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          <p className="text-[9px] font-black uppercase text-blue-400">I-80 East • Mile 142</p>
                      </div>
                  </div>

                  {/* Dynamic Action: Digital Custody */}
                  {!completedSteps.includes('ACTIVE') && (
                      <div className="p-8 bg-emerald-600 rounded-[2.5rem] shadow-xl space-y-6 animate-bounce-in">
                          <div className="flex items-center gap-4">
                              <PenTool size={32} className="text-white"/>
                              <div>
                                  <h4 className="text-lg font-black uppercase text-white tracking-tight">Digital Custody</h4>
                                  <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Sign to accept Load #9921-X</p>
                              </div>
                          </div>
                          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                              <p className="text-xs font-bold text-emerald-50 mb-4">I hereby acknowledge receipt of goods in nominal condition.</p>
                              <button 
                                onClick={() => {
                                    completeStep('ACTIVE');
                                    handlePrintBOL();
                                }}
                                className="w-full py-4 bg-white text-emerald-600 rounded-xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all"
                              >
                                  Sign & Authenticate
                              </button>
                          </div>
                      </div>
                  )}

                  {/* Dynamic Event Feed */}
                  <div className="space-y-4">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 px-2">Timeline of Truth</h3>
                      {tripEvents.map(event => (
                          <div key={event.id} className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-start gap-4 animate-slideInRight">
                              <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 ${event.color}`}>
                                  <event.icon size={20} />
                              </div>
                              <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                      <p className="text-[9px] font-black uppercase text-slate-500">{event.type}</p>
                                      <p className="text-[9px] font-mono text-slate-600">{event.time}</p>
                                  </div>
                                  <p className="text-sm font-bold uppercase tracking-tight">{event.msg}</p>
                              </div>
                          </div>
                      ))}
                      
                      {/* Live Proactive AI Card */}
                      <div className="p-8 bg-blue-600 rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.4)] space-y-4">
                          <div className="flex items-center gap-3">
                              <Brain size={24} />
                              <h4 className="text-lg font-black uppercase tracking-tight">H.E.N.R.Y. PROPOSAL</h4>
                          </div>
                          <p className="text-sm font-bold">Weather anomaly detected at Mile 180. Recommendation: Adjust heading 15° South to preserve 4% battery.</p>
                          <div className="flex gap-3 pt-2">
                              <button onClick={() => onVocalize?.("Reroute Authorized.")} className="flex-1 py-4 bg-white text-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all">Authorize</button>
                              <button className="px-6 py-4 bg-blue-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest">Ignore</button>
                          </div>
                      </div>
                  </div>
              </div>

              {/* BOTTOM CONTROLS */}
              <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent flex justify-between items-center gap-6">
                  <button className="w-20 h-20 bg-slate-900 border border-slate-700 rounded-full flex flex-col items-center justify-center text-slate-500 hover:text-red-500 transition-all">
                      <ShieldAlert size={24} />
                      <span className="text-[8px] font-black uppercase mt-1">SOS</span>
                  </button>
                  
                  <button 
                    onMouseDown={() => onVocalize?.("Transmitting to Mesh.")}
                    className="flex-1 h-20 bg-blue-600 border-4 border-blue-400 rounded-[2.5rem] flex items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all"
                  >
                      <Radio size={32} />
                      <span className="text-xl font-black uppercase tracking-widest">PTT MESH</span>
                  </button>

                  <button 
                    onClick={() => setMode('ONBOARDING')}
                    className="w-20 h-20 bg-slate-900 border border-slate-700 rounded-full flex flex-col items-center justify-center text-slate-500 hover:text-white transition-all"
                  >
                      <Power size={24} />
                      <span className="text-[8px] font-black uppercase mt-1">OFF</span>
                  </button>
              </div>
          </div>
      );
  }

  // --- ONBOARDING MODE ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans pb-32">
        <div className="sticky top-0 z-[100] bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Field Relay v4.0</span>
            </div>
            <div className="flex gap-1">
                {['IDENTITY', 'DOCUMENTS', 'TRAINING', 'HARDWARE', 'ACTIVE'].map((s, i) => (
                    <div key={s} className={`h-1 w-6 rounded-full transition-all ${completedSteps.includes(s as any) ? 'bg-emerald-500' : currentStep === s ? 'bg-blue-600 animate-pulse' : 'bg-slate-800'}`}></div>
                ))}
            </div>
        </div>

        <div className="p-6 space-y-12">
            
            {/* 1. IDENTITY VAULT */}
            <section id="identity">
                <div className={`bg-slate-900 rounded-[2.5rem] border p-8 transition-all ${currentStep === 'IDENTITY' ? 'border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.15)]' : 'border-slate-800 opacity-60'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <Fingerprint className="text-blue-500" />
                        <h3 className="text-xl font-black uppercase text-white">Bio-Identity Vault</h3>
                    </div>
                    {completedSteps.includes('IDENTITY') ? (
                        <div className="flex items-center gap-4 text-emerald-400">
                            <CheckCircle2 size={32} />
                            <p className="text-sm font-black uppercase">Identity Verified</p>
                        </div>
                    ) : (
                        <button 
                            onClick={() => completeStep('IDENTITY', 'DOCUMENTS')}
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all"
                        >
                            Initiate Handshake
                        </button>
                    )}
                </div>
            </section>

            {/* 4. HARDWARE HANDSHAKE (Active Lock Enforced) */}
            <section id="hardware" className={`animate-fadeIn ${completedSteps.includes('TRAINING') ? '' : 'pointer-events-none'}`}>
                <div className={`bg-slate-900 rounded-[2.5rem] border p-8 space-y-6 transition-all ${currentStep === 'HARDWARE' ? 'border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.15)]' : 'border-slate-800 opacity-60'}`}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black uppercase text-white">Hardware Handshake</h3>
                        <Bluetooth size={20} className={btStatus === 'CONNECTED' ? 'text-blue-500' : 'text-slate-600 animate-pulse'} />
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-slate-500">BT Status:</span>
                            <span className={`text-[10px] font-black uppercase ${btStatus === 'CONNECTED' ? 'text-emerald-500' : 'text-orange-500'}`}>{btStatus}</span>
                        </div>
                        {btStatus !== 'CONNECTED' && (
                            <button 
                                onClick={simulateHardwarePairing}
                                className="w-full py-4 bg-slate-800 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-700 transition-all"
                            >
                                Scan for Local Peripherals
                            </button>
                        )}
                    </div>
                    
                    <button 
                        onClick={startTrip}
                        disabled={btStatus !== 'CONNECTED'}
                        className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl transition-all ${btStatus === 'CONNECTED' ? 'bg-emerald-600 text-white animate-bounce-in' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
                    >
                        {btStatus === 'CONNECTED' ? 'Engage Matrix' : 'Locked: Pair Hardware'}
                    </button>
                </div>
            </section>
        </div>

        <button onClick={onBack} className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 bg-slate-900/80 backdrop-blur rounded-full border border-slate-700 text-slate-500 hover:text-red-500 z-[150]"><Power size={24}/></button>
    </div>
  );
};

export default MobileFieldApp;
