
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import AiAssistant from './components/AiAssistant';
import MainHub from './components/modules/MainHub';
import FleetDashboard from './components/modules/FleetDashboard';
import AviationDashboard from './components/modules/AviationDashboard';
import ITControlCenter from './components/modules/ITControlCenter';
import AquaticDashboard from './components/modules/AquaticDashboard';
import OrbitalDashboard from './components/modules/OrbitalDashboard';
import EmergencyDashboard from './components/modules/EmergencyDashboard';
import HRTrainingHub from './components/modules/HRTrainingHub';
import HRAdmin from './components/modules/HRAdmin';
import IntegrationsBuffer from './components/modules/IntegrationsBuffer';
import GovernanceHub from './components/modules/GovernanceHub';
import NetZeroHub from './components/modules/NetZeroHub';
import AdaptationLayer from './components/modules/AdaptationLayer';
import AgentHub from './components/modules/AgentHub';
import AiInsights from './components/modules/AiInsights';
import TeamSetup from './components/modules/TeamSetup';
import Billing from './components/modules/Billing';
import Settings from './components/modules/Settings';
import SecurityInfo from './components/modules/SecurityInfo';
import Documentation from './components/modules/Documentation';
import Deployment from './components/modules/Deployment';
import UnitSetupWizard from './components/UnitSetupWizard';
import QuantumEdgeCenter from './components/modules/QuantumEdgeCenter';
import Payroll from './components/modules/Payroll';
import Communications from './components/modules/Communications';
import Maintenance from './components/modules/Maintenance';
import Insurance from './components/modules/Insurance';
import DispatchHub from './components/modules/DispatchHub';
import MobileFieldApp from './components/modules/MobileFieldApp';
import OmniDashboard from './components/modules/OmniDashboard';
import SystemCore from './components/modules/SystemCore';
import TimeController from './components/TimeController';
import { TacticalErrorBoundary } from './components/ErrorBoundary';
import { ModuleType, User, UserRole, SystemMode, AlertLevel, SystemAlert, RULES_OF_ENGAGEMENT } from './types';
import { Bell, Cpu, ShieldCheck, Activity, Check, Zap, Github, X, Terminal, Menu, Moon, Sun, RefreshCw, Power, Search, ChevronRight, Hash, Truck, DollarSign, GraduationCap, Users, Clock, Fingerprint, Lock, ShieldAlert, Key, CheckCircle, Smartphone, AlertTriangle, Trash2, Shield, CreditCard, FileText } from 'lucide-react';
import { soundEngine } from './services/soundEngine'; 

interface LogEntry {
    id: string;
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    timestamp: string;
    module?: ModuleType;
}

const App: React.FC = () => {
  const [isSpinningUp, setIsSpinningUp] = useState(true);
  const [spinUpStep, setSpinUpStep] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [authStep, setAuthStep] = useState<'IDLE' | 'SCANNING' | 'REPORT_REVIEW' | 'SUCCESS'>('IDLE');
  const [hasApiKey, setHasApiKey] = useState(true);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [navHistory, setNavHistory] = useState<ModuleType[]>([]);
  const [systemMode, setSystemMode] = useState<SystemMode>('NORMAL');

  const [isReplayMode, setIsReplayMode] = useState(false);
  const [simulatedTime, setSimulatedTime] = useState(new Date());

  const [isAiOpen, setIsAiOpen] = useState(false);
  const [alertLevel, setAlertLevel] = useState<AlertLevel>('IDLE');
  const [activeAlert, setActiveAlert] = useState<SystemAlert | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const [notifications, setNotifications] = useState<LogEntry[]>([
      { id: 'log-1', title: 'Guardian Co-Pilot', message: 'v2.6 Logic Injected. RTS Handshake Active.', type: 'SUCCESS', timestamp: 'Just now', module: ModuleType.TRAINING_HUB },
      { id: 'log-2', title: 'P.E.R.C.Y. Protocol', message: 'Firewall integrity verification complete. n8n Air-gap stable.', type: 'INFO', timestamp: '2m ago', module: ModuleType.SECURITY_INFO },
      { id: 'log-3', title: 'Fleet Advisory', message: 'Unit F-101 detected heavy crosswinds in Sector 4.', type: 'WARNING', timestamp: '15m ago', module: ModuleType.FLEET },
      { id: 'log-4', title: 'Logic Injection', message: 'Architect Signature detected. 1500 logic gates synced.', type: 'SUCCESS', timestamp: '1h ago', module: ModuleType.SYSTEM_CORE }
  ]);

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('thelma-dark-mode') === 'true');
  const [voiceSettings, setVoiceSettings] = useState(() => {
    const saved = localStorage.getItem('thelma-voice-settings');
    return saved ? JSON.parse(saved) : { enabled: true, volume: 1.0, rate: 1.1 };
  });

  const [hasGreeted, setHasGreeted] = useState(false);
  const [showUnitWizard, setShowUnitWizard] = useState(false);

  const [currentUser] = useState<User>({
    email: 'steve@thelma.ai',
    fullName: RULES_OF_ENGAGEMENT.ARCHITECT_NAME,
    role: UserRole.ARCHITECT,
    department: 'Architecture',
    clearanceLevel: 10
  });

  const bootSteps = [
    { label: "T.H.E.L.M.A. v2.6 GUARDIAN INIT...", icon: <Power size={16} className="text-blue-500" /> },
    { label: "LOADING GOLDEN PATH PROTOCOLS...", icon: <Fingerprint size={16} className="text-orange-400" /> },
    { label: "VERITAS AUDIT ENGINE ONLINE", icon: <ShieldCheck size={16} className="text-emerald-400" /> },
    { label: "RTS HARDWARE HANDSHAKE: LOCKED", icon: <Activity size={16} className="text-purple-400" /> },
    { label: "SOVEREIGN MESH SYNCHRONIZED", icon: <Check size={16} className="text-blue-400" /> }
  ];

  useEffect(() => {
    const checkKey = async () => {
      const win = window as any;
      if (win.aistudio) {
        const selected = await win.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button, a, input, select, [role="button"]')) {
            soundEngine.playClick();
        }
    };
    window.addEventListener('click', handleGlobalClick);
    if (!isLocked) soundEngine.startAmbient();
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isLocked]);

  useEffect(() => {
      if (alertLevel === 'WARNING' || alertLevel === 'CRITICAL') {
          soundEngine.playAlert();
      }
  }, [alertLevel]);

  const vocalize = useCallback((text: string) => {
    if (voiceSettings.enabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = voiceSettings.volume;
      utterance.rate = voiceSettings.rate;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, [voiceSettings]);

  useEffect(() => {
    if (isSpinningUp) {
      soundEngine.playStartup(); 
      const interval = setInterval(() => {
        setSpinUpStep(prev => {
          if (prev >= bootSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => { 
                setIsSpinningUp(false);
                soundEngine.playSuccess(); 
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isSpinningUp]);

  const selectKey = async () => {
    const win = window as any;
    if (win.aistudio) {
      await win.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const verifyLogin = () => {
      soundEngine.playClick();
      setAuthStep('SCANNING');
      
      setTimeout(() => {
          setAuthStep('REPORT_REVIEW');
          soundEngine.playClick();
          vocalize("Reviewing Architect Injection Manifest v2.6. Verifying logic gates.");
          
          setTimeout(() => {
              setAuthStep('SUCCESS');
              soundEngine.playSuccess();
              setTimeout(() => {
                  setIsLocked(false);
                  if (!hasGreeted) {
                      setHasGreeted(true);
                      const greeting = `Sovereign Matrix Handshake Successful. Welcome home, Architect Henry. Guardian Co-Pilot v2.6 is active. RTS Hardware Truth engaged.`;
                      vocalize(greeting);
                  }
              }, 1000);
          }, 2500); // Allow time for manifest review
      }, 1500);
  };

  const handleModuleChange = (m: ModuleType) => {
    if (m !== activeModule) {
      setNavHistory(prev => [...prev, activeModule]);
      setActiveModule(m);
      soundEngine.playClick();
      document.querySelector('.main-area')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setSidebarOpen(false);
  };

  const handleBack = useCallback(() => {
    soundEngine.playClick();
    if (navHistory.length > 0) {
      const newStack = [...navHistory];
      const prev = newStack.pop();
      if (prev) {
        setNavHistory(newStack);
        setActiveModule(prev);
        document.querySelector('.main-area')?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveModule(ModuleType.DASHBOARD);
    }
  }, [navHistory]);

  const handleGlobalCommand = (cmd: string, params?: any) => {
    if (cmd === 'NAVIGATE' && params) {
        handleModuleChange(params as ModuleType);
    }
  };

  const toggleReplayMode = () => {
      soundEngine.playClick();
      setIsReplayMode(!isReplayMode);
      if(!isReplayMode) {
          vocalize("Forensic Replay Mode Activated. Timeline unlocked.");
      } else {
          vocalize("Returning to Live Telemetry.");
          setSimulatedTime(new Date());
      }
  };

  const accessLog = (log: LogEntry) => {
      soundEngine.playSuccess();
      vocalize(`Accessing Record: ${log.title}.`);
      if (log.module) {
          handleModuleChange(log.module);
          setShowNotifications(false);
      }
  };

  const renderModule = () => {
    const commonProps = { onBack: handleBack, onVocalize: vocalize };
    const replayProps = { isReplayMode, simulatedTime };

    const moduleMap: Record<ModuleType, React.ReactNode> = {
      [ModuleType.DASHBOARD]: <MainHub setActiveModule={handleModuleChange} onVocalize={vocalize} />,
      [ModuleType.OMNI_PRESENCE]: <OmniDashboard onBack={handleBack} />,
      [ModuleType.FLEET]: <FleetDashboard {...commonProps} {...replayProps} />, 
      [ModuleType.AVIATION_CONTROL]: <AviationDashboard {...commonProps} />, 
      [ModuleType.DISPATCH]: <DispatchHub {...commonProps} />,
      [ModuleType.AI_INSIGHTS]: <AiInsights onBack={handleBack} />,
      [ModuleType.TRAINING_HUB]: <HRTrainingHub {...commonProps} onLaunchWizard={() => setShowUnitWizard(true)} />,
      [ModuleType.AGENT_HUB]: <AgentHub onBack={handleBack} />,
      [ModuleType.IT_CONTROL]: <ITControlCenter onBack={handleBack} />,
      [ModuleType.HR_ADMIN]: <HRAdmin />,
      [ModuleType.ROUTE_OPTIMIZER]: <FleetDashboard onBack={handleBack} {...replayProps} />,
      [ModuleType.DOCUMENT_HUB]: <Documentation onBack={handleBack} />,
      [ModuleType.ANALYTICS]: <NetZeroHub onBack={handleBack} />,
      [ModuleType.TEAM_SETUP]: <TeamSetup onBack={handleBack} />,
      [ModuleType.BILLING]: <Billing onBack={handleBack} />,
      [ModuleType.SETTINGS]: <Settings darkMode={darkMode} setDarkMode={setDarkMode} voiceSettings={voiceSettings} setVoiceSettings={setVoiceSettings} onVocalize={vocalize} setActiveModule={handleModuleChange} onBack={handleBack} systemMode={systemMode} />,
      [ModuleType.SECURITY_INFO]: <SecurityInfo onBack={handleBack} />,
      [ModuleType.DOCUMENTATION]: <Documentation onBack={handleBack} />,
      [ModuleType.DEPLOYMENT]: <Deployment />,
      [ModuleType.AVIATION]: <AviationDashboard onBack={handleBack} />, 
      [ModuleType.AQUATIC]: <AquaticDashboard onBack={handleBack} />,
      [ModuleType.ORBITAL]: <OrbitalDashboard onBack={handleBack} />,
      [ModuleType.EMERGENCY]: <EmergencyDashboard onBack={handleBack} />,
      [ModuleType.HR_TRAINING]: <HRTrainingHub {...commonProps} onLaunchWizard={() => setShowUnitWizard(true)} />,
      [ModuleType.IT_INFRA]: <ITControlCenter onBack={handleBack} />,
      [ModuleType.INTEGRATIONS]: <IntegrationsBuffer onBack={handleBack} />,
      [ModuleType.GOVERNANCE]: <GovernanceHub />,
      [ModuleType.NET_ZERO]: <NetZeroHub onBack={handleBack} />,
      [ModuleType.ADAPTATION]: <AdaptationLayer />,
      [ModuleType.EDGE_CONTROL]: <QuantumEdgeCenter onBack={handleBack} />,
      [ModuleType.PAYROLL]: <Payroll onBack={handleBack} />,
      [ModuleType.COMMUNICATIONS]: <Communications onBack={handleBack} />,
      [ModuleType.MAINTENANCE]: <Maintenance onBack={handleBack} />,
      [ModuleType.INSURANCE]: <Insurance onBack={handleBack} />,
      [ModuleType.FIELD_RELAY]: <MobileFieldApp {...commonProps} />,
      [ModuleType.SYSTEM_CORE]: <SystemCore onBack={handleBack} />
    };

    return (
      <div className="module-container">
        <TacticalErrorBoundary module={activeModule}>
          {moduleMap[activeModule] || <MainHub setActiveModule={handleModuleChange} />}
        </TacticalErrorBoundary>
      </div>
    );
  };

  if (isSpinningUp) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-mono p-4">
        <Cpu size={56} className="text-blue-600 animate-pulse mb-8" />
        <h1 className="text-4xl font-black tracking-[0.2em] mb-2 text-blue-400 uppercase">T.H.E.L.M.A. AI</h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mb-12">v2.6 • GUARDIAN CO-PILOT</p>
        <div className="w-80 space-y-4">
            {bootSteps.map((step, idx) => (
                <div key={idx} className={`flex items-center gap-3 text-xs transition-opacity duration-500 ${idx <= spinUpStep ? 'opacity-100' : 'opacity-0'}`}>
                    {step.icon}
                    <span className={idx === spinUpStep ? 'text-blue-500 font-bold' : 'text-slate-500'}>{step.label}</span>
                </div>
            ))}
        </div>
      </div>
    );
  }

  if (isLocked) {
      return (
          <div className="h-screen bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[40px] p-10 text-center shadow-2xl space-y-8 animate-fadeIn relative z-10">
                  <div className="p-4 bg-slate-800 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-blue-500 border border-slate-700 shadow-xl">
                      <Lock size={40} className={authStep === 'SCANNING' ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Guardian Identity Hub</h2>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-2">Architect Signature: BEE-001 Required</p>
                  </div>
                  <div className="space-y-4 pt-6">
                       {!hasApiKey ? (
                          <div className="space-y-4">
                            <button onClick={selectKey} className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
                               <CreditCard size={20} /> Configure Paid API Key
                            </button>
                            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] text-slate-400 uppercase font-bold hover:text-white transition-colors block">
                              Required for Veo & Project Z Ops
                            </a>
                          </div>
                       ) : authStep === 'IDLE' && (
                           <button onClick={verifyLogin} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
                               <Fingerprint size={20} /> Handshake Signature
                           </button>
                       )}
                       {authStep === 'SCANNING' && (
                           <div className="space-y-4 animate-pulse">
                               <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500 w-1/2 animate-[progress_1s_infinite]"></div>
                               </div>
                               <p className="text-[10px] font-black text-blue-400 uppercase">Verifying Architect Identity...</p>
                           </div>
                       )}
                       {authStep === 'REPORT_REVIEW' && (
                           <div className="space-y-4">
                               <div className="flex items-center gap-3 p-4 bg-blue-900/30 border border-blue-500/50 rounded-2xl animate-pulse">
                                   <FileText size={20} className="text-blue-400" />
                                   <div className="text-left">
                                       <p className="text-[10px] font-black text-white uppercase">Architect Report Review</p>
                                       <p className="text-[9px] text-blue-300 font-mono">Verifying v2.6 Injection Manifest...</p>
                                   </div>
                               </div>
                               <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500 animate-[progress_2s_linear_forwards]"></div>
                               </div>
                           </div>
                       )}
                       {authStep === 'SUCCESS' && (
                           <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl animate-bounce text-emerald-400 font-black uppercase text-xs">
                               Welcome Back, Architect Henry
                           </div>
                       )}
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className={`app-container font-sans ${darkMode ? 'dark' : ''} transition-all duration-700 h-screen w-screen flex flex-col overflow-hidden relative
      ${alertLevel === 'WARNING' ? 'warning-glow' : ''}
    `}>
      {isReplayMode && (
          <div className="absolute inset-0 z-[250] pointer-events-none mix-blend-overlay opacity-30 bg-amber-900/20">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-amber-600 text-black px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs border-2 border-black/20 shadow-xl animate-pulse">
                  Forensic Replay Active
              </div>
          </div>
      )}

      <header className="header-area bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 py-6 h-16 transition-colors shadow-sm z-[100] sticky top-0">
         <div className="flex items-center text-slate-400 text-sm">
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="xl:hidden p-2 mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
             <Menu size={24} />
           </button>
           <span className="mr-2 font-black tracking-widest text-slate-900 dark:text-white uppercase cursor-pointer" onClick={() => handleModuleChange(ModuleType.DASHBOARD)}>T.H.E.L.M.A.</span>
           <span className="mx-2 text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
           <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter hidden sm:inline">{activeModule.replace('_', ' ')}</span>
         </div>

         <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full" title="Aegis Integrity Verified">
                <ShieldCheck size={16} className="text-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest">Guardian v2.6 Active</span>
            </div>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => handleModuleChange(ModuleType.SYSTEM_CORE)}
                    className="p-2 text-slate-500 hover:text-blue-500 transition-colors rounded-lg"
                    title="System Core"
                >
                    <Cpu size={20} />
                </button>
                <button 
                    onClick={toggleReplayMode} 
                    className={`p-2 transition-colors rounded-lg flex items-center gap-2 ${isReplayMode ? 'text-amber-500 bg-amber-500/10' : 'text-slate-500 hover:text-blue-500'}`}
                    title="Toggle Forensic Replay"
                >
                    <Clock size={20} />
                </button>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-500 hover:text-blue-500 transition-colors rounded-lg">
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="relative p-2 text-slate-500 hover:text-blue-500 cursor-pointer" onClick={() => setShowNotifications(true)}>
                    <Bell size={20} />
                    {notifications.length > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                    )}
                </div>
            </div>
         </div>
      </header>

      {showNotifications && (
        <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[110]" onClick={() => setShowNotifications(false)}></div>
            <div className="fixed inset-y-0 right-0 w-80 lg:w-96 bg-white dark:bg-slate-900 shadow-2xl z-[120] border-l border-slate-200 dark:border-slate-800 animate-slideInRight flex flex-col">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                    <Terminal size={18} className="text-blue-600" />
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-800 dark:text-white">Orchestration Logs</h3>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"><X size={20}/></button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                        <CheckCircle size={32} className="mb-2 opacity-50"/>
                        <p className="text-[10px] font-black uppercase tracking-widest">All Systems Nominal</p>
                    </div>
                ) : (
                    notifications.map(log => (
                        <div 
                            key={log.id} 
                            onClick={() => accessLog(log)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.02] active:scale-95 ${
                                log.type === 'SUCCESS' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20' :
                                log.type === 'WARNING' ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/20' :
                                'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                           <div className="flex justify-between items-start pr-6">
                               <p className={`text-[10px] font-black uppercase mb-1 ${
                                   log.type === 'SUCCESS' ? 'text-emerald-700 dark:text-emerald-400' :
                                   log.type === 'WARNING' ? 'text-orange-700 dark:text-orange-400' :
                                   'text-blue-700 dark:text-blue-400'
                               }`}>
                                   {log.title}
                               </p>
                               <span className="text-[9px] font-mono text-slate-400">{log.timestamp}</span>
                           </div>
                           <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                               {log.message}
                           </p>
                        </div>
                    ))
                )}
              </div>
            </div>
        </>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        <div className={`sidebar-area fixed lg:static inset-y-0 left-0 z-[150] lg:z-50 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <Sidebar activeModule={activeModule} setActiveModule={handleModuleChange} currentUser={currentUser} onClose={() => setSidebarOpen(false)} />
        </div>
        <main className="main-area flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors flex flex-col min-w-0 no-scrollbar relative">
            {renderModule()}
        </main>
      </div>

      <TimeController 
        isReplayMode={isReplayMode} 
        onToggleReplay={toggleReplayMode}
        simulatedTime={simulatedTime}
        setSimulatedTime={setSimulatedTime}
      />

      <AiAssistant 
        currentModule={activeModule} 
        isOpen={isAiOpen}
        setIsOpen={setIsAiOpen}
        alertLevel={alertLevel}
        activeAlert={activeAlert}
        onDismissAlert={() => { setAlertLevel('IDLE'); setActiveAlert(null); }}
        onCommand={handleGlobalCommand} 
      />
      
      {showUnitWizard && (
        <UnitSetupWizard onClose={() => setShowUnitWizard(false)} onComplete={() => setShowUnitWizard(false)} />
      )}
    </div>
  );
};

export default App;
