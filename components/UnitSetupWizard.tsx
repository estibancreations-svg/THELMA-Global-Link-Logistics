
import React, { useState, useEffect, useRef } from 'react';
import { Truck, MapPin, Camera, Check, X, ShieldCheck, FileText, Zap, DollarSign, Navigation, Leaf, Clock, Key, AlertTriangle, Scale, ScanLine, Printer, Lock, CheckCircle2, Orbit, Ship, Crosshair, PenTool, UploadCloud, Download } from 'lucide-react';
import { UnitConfiguration, UnitType, PowerSource, CatalogItem } from '../types';
import { masterAssetCatalog } from '../data/assetCatalog';
import { sendMessageToGemini } from '../services/geminiService';

interface UnitSetupWizardProps {
  onComplete: (config: UnitConfiguration) => void;
  onClose: () => void;
  mode?: 'PICKUP' | 'DROPOFF' | 'REGISTRATION';
}

type WizardStep = 'BID' | 'CERT_CHECK' | 'INTAKE_PHOTOS' | 'VIN_VERIFY' | 'WEIGHT_CONFIRM' | 'ROUTE_SELECT' | 'BOL_SIGN' | 'ACTIVE_MONITOR' | 'DROPOFF_CODE' | 'FINANCE_SUBMIT';

const UnitSetupWizard: React.FC<UnitSetupWizardProps> = ({ onComplete, onClose, mode = 'REGISTRATION' }) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('BID');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  
  // Data State
  const [bidData] = useState({
      id: 'BID-9921-X',
      origin: 'Port of Los Angeles, Berth 54',
      destination: 'Tesla Gigafactory, Austin, TX',
      unit: 'F-101 (Class 8 EV)',
      type: 'TRUCK' as UnitType,
      pay: 4200.50,
      client: 'Tesla Logistics',
      weight: 42000
  });

  // Photo State - Now stores actual file URLs or blobs
  const [photos, setPhotos] = useState<Record<string, string | null>>({});
  const [inspectionPoints, setInspectionPoints] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activePhotoPoint, setActivePhotoPoint] = useState<string | null>(null);

  // Signature State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const [vin, setVin] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [receiverCode, setReceiverCode] = useState(['', '', '', '']);
  const [exceptionMode, setExceptionMode] = useState(false);

  const [routes, setRoutes] = useState([
      { id: 1, name: 'Thelma Eco', time: '22h 14m', co2: '140kg', hazard: 'None', type: 'RECOMMENDED' },
      { id: 2, name: 'Thelma Speed', time: '19h 40m', co2: '210kg', hazard: 'High Traffic', type: 'FASTEST' },
      { id: 3, name: 'Driver Choice', time: '24h 00m', co2: 'Unknown', hazard: 'Unverified', type: 'MANUAL' }
  ]);

  useEffect(() => {
      // Dynamic Inspection Points based on Asset Type
      let points = ['Front', 'Back', 'Left Side', 'Right Side', 'Dashboard'];
      if (bidData.type === 'TRUCK') {
          points = ['Front Bumper', 'Rear Axle', 'Left Flank', 'Right Flank', 'Dashboard', 'VIN Plate', 'Tire Tread'];
      } else if (bidData.type === 'DRONE' || bidData.type === 'EVTOL') {
          points = ['Rotor Housing', 'Battery Cell', 'Landing Gear', 'Gimbal', 'Nav Sensors'];
      } else if (bidData.type === 'SHIP') {
          points = ['Hull Bow', 'Propeller', 'Bilge Pump', 'Bridge Controls', 'Safety Raft'];
      }
      setInspectionPoints(points);
      
      const initialPhotos: Record<string, string | null> = {};
      points.forEach(p => initialPhotos[p] = null);
      setPhotos(initialPhotos);
  }, [bidData.type]);

  // Step 1: Secure Bid
  const handleSecureBid = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setCurrentStep('CERT_CHECK');
      }, 1000);
  };

  // Step 2: Cert Check (Auto)
  useEffect(() => {
      if (currentStep === 'CERT_CHECK') {
          setTimeout(() => {
              setCurrentStep('INTAKE_PHOTOS');
          }, 2000); // Simulated API check
      }
  }, [currentStep]);

  // Step 3: Photo Logic
  const handlePhotoClick = (point: string) => {
      setActivePhotoPoint(point);
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && activePhotoPoint) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              setPhotos(prev => ({ ...prev, [activePhotoPoint]: ev.target?.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  const allPhotosTaken = Object.values(photos).length > 0 && Object.values(photos).every(val => val !== null);

  // Step 4: Routing (Call Gemini)
  useEffect(() => {
      if (currentStep === 'ROUTE_SELECT') {
          const fetchRoutes = async () => {
              setIsLoading(true);
              // Simulating API latency for H.E.N.R.Y. calculation
              setTimeout(() => {
                  setAiSuggestion("H.E.N.R.Y. has analyzed 14,000 path vectors. Route 1 avoids the Grapevine elevation change, saving 14% battery.");
                  setIsLoading(false);
              }, 1500);
          };
          fetchRoutes();
      }
  }, [currentStep, bidData]);

  // Step 6: Signature Logic
  const getCoordinates = (event: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setIsSigning(true);
      const { x, y } = getCoordinates(e, canvas);
      
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000000'; // Ensure black ink
      if (document.documentElement.classList.contains('dark')) {
          ctx.strokeStyle = '#ffffff'; // White ink for dark mode if canvas is dark, but usually signature pad is white
      }
      
      ctx.beginPath();
      ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isSigning) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(e, canvas);

      ctx.lineTo(x, y);
      ctx.stroke();
  };

  const stopDrawing = () => {
      setIsSigning(false);
      if (canvasRef.current) {
          setSignatureData(canvasRef.current.toDataURL());
      }
  };

  const clearSignature = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSignatureData(null);
  };

  // Handle Dropoff Code
  const handleCodeChange = (index: number, val: string) => {
      if (val.length > 1) return;
      const newCode = [...receiverCode];
      newCode[index] = val;
      setReceiverCode(newCode);
      
      // Auto-advance focus
      if (val && index < 3) {
          document.getElementById(`code-${index + 1}`)?.focus();
      }
  };

  const submitDropoff = () => {
      if (receiverCode.join('') === '8821') {
          setCurrentStep('FINANCE_SUBMIT');
      } else {
          alert("Invalid Receiver Code. Please verify with dock clerk.");
      }
  };

  const finalizeTransaction = () => {
      setIsLoading(true);
      setTimeout(() => {
          onComplete({
              id: bidData.id,
              name: bidData.unit,
              type: bidData.type,
              powerSource: 'ELECTRIC',
              dimensions: { length: 72, width: 8.5, height: 13.5, weight: bidData.weight },
              hazmatCertified: false,
              mileage: 0,
              fuelLevel: 100,
              documents: {},
              releaseCode: receiverCode.join('')
          });
          setIsLoading(false);
      }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center shrink-0">
            <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Tactical Intake Protocol</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{currentStep.replace('_', ' ')}</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={24}/></button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-100 dark:bg-slate-950/30">
            
            {/* STEP 1: BID */}
            {currentStep === 'BID' && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Load Origin</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-white">{bidData.origin}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Destination</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-white">{bidData.destination}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Gross Pay</p>
                                <p className="text-3xl font-black text-emerald-500 font-mono">${bidData.pay.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Payload Weight</p>
                                <p className="text-xl font-black text-slate-800 dark:text-white font-mono">{bidData.weight.toLocaleString()} lbs</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSecureBid} disabled={isLoading} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 flex items-center justify-center gap-3 transition-all">
                        {isLoading ? <Zap className="animate-spin" size={20}/> : <Lock size={20}/>} Secure Bid & Lock Rate
                    </button>
                </div>
            )}

            {/* STEP 2: CERT CHECK */}
            {currentStep === 'CERT_CHECK' && (
                <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fadeIn">
                    <ShieldCheck size={80} className="text-emerald-500 animate-bounce" />
                    <div>
                        <h3 className="text-2xl font-black uppercase text-slate-900 dark:text-white">Verifying Credentials</h3>
                        <p className="text-slate-500 mt-2 font-mono text-xs">Checking User Wallet vs. Unit Type: {bidData.type}</p>
                    </div>
                    <div className="w-64 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full animate-[progress_1.5s_ease-in-out]"></div>
                    </div>
                </div>
            )}

            {/* STEP 3: PHOTOS - LIVE INPUT */}
            {currentStep === 'INTAKE_PHOTOS' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="flex justify-between items-center">
                        <h3 className="font-black uppercase text-slate-700 dark:text-slate-300">Live Vehicle Inspection (DVI)</h3>
                        <span className="text-xs font-bold text-blue-500">{Object.values(photos).filter(Boolean).length} / {inspectionPoints.length} Captured</span>
                    </div>
                    
                    {/* Hidden File Input */}
                    <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileChange} 
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {inspectionPoints.map((point) => (
                            <button 
                                key={point}
                                onClick={() => handlePhotoClick(point)}
                                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden group ${photos[point] ? 'border-emerald-500' : 'bg-white dark:bg-slate-900 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500'}`}
                            >
                                {photos[point] ? (
                                    <>
                                        <img src={photos[point]!} alt={point} className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="text-white" size={24} />
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-emerald-500 text-white rounded-full p-1"><Check size={12}/></div>
                                    </>
                                ) : (
                                    <>
                                        <Camera size={24} className="text-slate-400 group-hover:text-blue-500"/>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-center px-2 text-slate-500">{point}</span>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl"><ScanLine size={24} className="text-blue-500"/></div>
                        <input 
                            type="text" 
                            placeholder="SCAN OR ENTER VIN / SERIAL" 
                            value={vin}
                            onChange={(e) => setVin(e.target.value)}
                            className="flex-1 bg-transparent outline-none font-mono font-bold uppercase text-slate-900 dark:text-white"
                        />
                    </div>
                    <button onClick={() => setCurrentStep('WEIGHT_CONFIRM')} disabled={!allPhotosTaken || !vin} className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 transition-all">
                        Commit Inspection & Upload
                    </button>
                </div>
            )}

            {/* STEP 4: WEIGHT CONFIRM */}
            {currentStep === 'WEIGHT_CONFIRM' && (
                <div className="space-y-8 animate-fadeIn">
                    <h3 className="text-xl font-black uppercase text-center">Confirm Load Physics</h3>
                    <div className="bg-slate-900 p-8 rounded-[3rem] text-center space-y-6">
                        <Scale size={48} className="mx-auto text-blue-500"/>
                        <div>
                            <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2">Registered Gross Weight</p>
                            <p className="text-5xl font-black text-white font-mono">{bidData.weight.toLocaleString()} <span className="text-lg text-slate-500">lbs</span></p>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-xs font-bold text-white uppercase">Re-Weigh</button>
                            <button onClick={() => setCurrentStep('ROUTE_SELECT')} className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-bold text-white uppercase shadow-lg">Confirm & Route</button>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 5: ROUTE SELECT */}
            {currentStep === 'ROUTE_SELECT' && (
                <div className="space-y-6 animate-fadeIn">
                    {isLoading ? (
                        <div className="text-center py-20">
                            <Zap size={48} className="mx-auto text-blue-500 animate-bounce mb-4"/>
                            <p className="font-black uppercase tracking-widest text-slate-500">H.E.N.R.Y. Calculating Optimal Paths...</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl flex gap-3">
                                <Leaf size={20} className="text-emerald-500 shrink-0"/>
                                <p className="text-xs text-blue-800 dark:text-blue-200 font-medium leading-relaxed">
                                    "{aiSuggestion}"
                                </p>
                            </div>
                            <div className="space-y-3">
                                {routes.map(r => (
                                    <div key={r.id} onClick={() => setSelectedRoute(r.id)} className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between group ${selectedRoute === r.id ? 'bg-slate-900 border-slate-900 dark:bg-white dark:border-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400'}`}>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${r.id === 1 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{r.type}</span>
                                                <h4 className={`font-black uppercase ${selectedRoute === r.id ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-white'}`}>{r.name}</h4>
                                            </div>
                                            <p className={`text-xs font-mono ${selectedRoute === r.id ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500'}`}>{r.time} • {r.co2} CO2</p>
                                        </div>
                                        {selectedRoute === r.id && <CheckCircle2 size={24} className="text-blue-500 dark:text-blue-600"/>}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setCurrentStep('BOL_SIGN')} disabled={!selectedRoute} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-widest disabled:opacity-50 transition-all shadow-xl active:scale-95">
                                Lock Route & Generate BOL
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* STEP 6: BOL SIGN - LIVE CANVAS */}
            {currentStep === 'BOL_SIGN' && (
                <div className="space-y-6 animate-fadeIn text-center flex flex-col h-full">
                    <FileText size={48} className="mx-auto text-slate-400"/>
                    <div>
                        <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white">Digital Bill of Lading</h3>
                        <p className="text-slate-500 text-xs font-mono mt-1">BOL #9921-X-A • HASH: SHA256_VERIFIED</p>
                    </div>
                    
                    <div className="flex-1 bg-white border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl relative overflow-hidden touch-none" style={{ minHeight: '200px' }}>
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={300}
                            className="w-full h-full cursor-crosshair"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            style={{ touchAction: 'none' }}
                        />
                        {!signatureData && !isSigning && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-xs font-black uppercase text-slate-300">Sign Here to Accept Custody</span>
                            </div>
                        )}
                        <button onClick={clearSignature} className="absolute top-2 right-2 p-2 bg-slate-100 rounded-full text-slate-500 hover:text-red-500">
                            <X size={16}/>
                        </button>
                    </div>

                    {signatureData && (
                        <div className="flex gap-4">
                            <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all" onClick={() => window.print()}>
                                <Printer size={16} /> Print BOL
                            </button>
                            <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                <Download size={16} /> Download PDF
                            </button>
                        </div>
                    )}

                    <button onClick={() => setCurrentStep('ACTIVE_MONITOR')} disabled={!signatureData} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:grayscale">
                        Sign & Depart
                    </button>
                </div>
            )}

            {/* STEP 7: ACTIVE MONITOR (Simulated En Route) */}
            {currentStep === 'ACTIVE_MONITOR' && (
                <div className="space-y-8 animate-fadeIn text-center py-10">
                    <div className="relative w-40 h-40 mx-auto">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                        <div className="relative bg-white dark:bg-slate-900 w-40 h-40 rounded-full flex items-center justify-center border-4 border-blue-500 shadow-2xl">
                            <Truck size={48} className="text-blue-600 dark:text-blue-400"/>
                        </div>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">En Route</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest">Monitoring HOS & CO2 Output</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <Clock size={20} className="mx-auto mb-2 text-orange-500"/>
                            <span className="text-[10px] font-black uppercase">Log HOS Duty</span>
                        </button>
                        <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <Camera size={20} className="mx-auto mb-2 text-blue-500"/>
                            <span className="text-[10px] font-black uppercase">Receipt Snap</span>
                        </button>
                    </div>

                    <button onClick={() => setCurrentStep('DROPOFF_CODE')} className="w-full py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-8">
                        Arrive at Destination
                    </button>
                </div>
            )}

            {/* STEP 8: DROPOFF CODE */}
            {currentStep === 'DROPOFF_CODE' && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="text-center">
                        <Lock size={48} className="mx-auto text-blue-500 mb-4"/>
                        <h3 className="text-2xl font-black uppercase">Receiver Verification</h3>
                        <p className="text-slate-500 text-xs mt-2">Enter the 4-digit secure release code from the Receiver.</p>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                        {receiverCode.map((digit, i) => (
                            <input 
                                key={i}
                                id={`code-${i}`}
                                type="text" 
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleCodeChange(i, e.target.value)}
                                className="w-16 h-20 text-center text-3xl font-black bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none"
                            />
                        ))}
                    </div>

                    <div className="space-y-3">
                        <button onClick={submitDropoff} className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                            Verify & Release
                        </button>
                        <button onClick={() => setExceptionMode(true)} className="w-full py-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                            Code Not Available (Exception)
                        </button>
                    </div>

                    {exceptionMode && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl animate-fadeIn">
                            <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2"><AlertTriangle size={14}/> Dispatch Notified</p>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400">Agent H.E.N.R.Y. is contacting the facility manager. Standby.</p>
                        </div>
                    )}
                </div>
            )}

            {/* STEP 9: FINANCE & PAYOUT */}
            {currentStep === 'FINANCE_SUBMIT' && (
                <div className="space-y-8 animate-fadeIn text-center">
                    <div className="w-32 h-32 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center animate-bounce-in">
                        <DollarSign size={64} className="text-emerald-600 dark:text-emerald-400"/>
                    </div>
                    <div>
                        <h3 className="text-3xl font-black uppercase text-slate-900 dark:text-white">Run Complete</h3>
                        <p className="text-emerald-500 font-black uppercase tracking-widest mt-2">Data Match: 100% Verified</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-black uppercase text-slate-500">Base Pay</span>
                            <span className="text-sm font-mono font-bold">$4,200.50</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-black uppercase text-slate-500">Fuel Surcharge</span>
                            <span className="text-sm font-mono font-bold">$450.00</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-600">
                            <span className="text-sm font-black uppercase text-slate-800 dark:text-white">Total Payout</span>
                            <span className="text-xl font-mono font-black text-emerald-500">$4,650.50</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                            <Clock size={12} className="inline mr-1"/> 30-Minute Instant Transfer Initiated
                        </p>
                        <button onClick={finalizeTransaction} className="w-full py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                            Return to Board
                        </button>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default UnitSetupWizard;
