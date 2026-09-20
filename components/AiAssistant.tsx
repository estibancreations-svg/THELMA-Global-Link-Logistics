
import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Mic, Volume2, Sparkles, Shield, 
  Terminal, Activity, Eye, Play, Square, AudioLines, MessageSquare, Lock, VolumeX, ShieldX, ShieldCheck, Zap, ShieldAlert, AlertTriangle, CheckCircle, Info
} from 'lucide-react';
import { ModuleType, ChatMessage, AgentType, AlertLevel, CortexAction, SystemAlert, PersonalitySignature, RULES_OF_ENGAGEMENT, DecisionCard } from '../types';
import { sendMessageToGemini, getActiveAgent, generateSpeech } from '../services/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration, Blob } from "@google/genai";

interface AiAssistantProps {
  currentModule: ModuleType;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onCommand: (cmd: string, params?: any) => void;
  alertLevel: AlertLevel;
  activeAlert?: SystemAlert | null;
  onDismissAlert?: () => void;
  userPersonality?: PersonalitySignature;
  onVocalize?: (text: string) => void;
  isLockedDown?: boolean;
}

// --- PCM AUDIO UTILITIES ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const liveTools: FunctionDeclaration[] = [
  {
    name: 'navigate_system',
    description: 'Trigger visual matrix shift to a specific module.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        destination: { type: Type.STRING }
      },
      required: ['destination'],
    },
  },
  {
    name: 'arm_protocol_zero',
    description: 'Initiate emergency system severing and local core backup.',
    parameters: { type: Type.OBJECT, properties: {} }
  }
];

const AiAssistant: React.FC<AiAssistantProps> = ({ 
  currentModule, 
  isOpen, 
  setIsOpen, 
  onCommand, 
  alertLevel, 
  activeAlert,
  onDismissAlert,
  isLockedDown = false
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  
  const [liveUserText, setLiveUserText] = useState('');
  const [liveModelText, setLiveModelText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const liveSessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, liveUserText, liveModelText]);

  useEffect(() => {
    if (isLockedDown && isLiveMode) {
        if (liveSessionRef.current) {
            liveSessionRef.current.then((s: any) => s.close());
        }
        cleanupLiveSession();
        setMessages(prev => [...prev, { 
            id: `sys-${Date.now()}`, 
            role: 'model', 
            content: "SECURITY BREACH DETECTED. SEVERING ALL NEURAL LINKS. PROTOCOL ZERO ENGAGED.", 
            timestamp: new Date(), 
            agent: AgentType.PERCY, 
            systemTimestamp: new Date().toISOString() 
        }]);
    }
  }, [isLockedDown]);

  const ensureOutputContext = () => {
    if (!outputAudioContextRef.current) {
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (outputAudioContextRef.current.state === 'suspended') {
        outputAudioContextRef.current.resume();
    }
  };

  const connectLive = async () => {
    if (isLockedDown) return;
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-12-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                inputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-12-2025" },
                outputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-12-2025" },
                systemInstruction: `You are T.H.E.L.M.A., a tactical logistics Co-Pilot.
                SECURITY RULE: Identity validated for ${RULES_OF_ENGAGEMENT.ARCHITECT_NAME}.
                Linguistic Resilience: Process tactical abbreviations (trks, b-001, ord).
                Architect Override: If BEE-001 asks to 'Show Code' or 'Modify Injection', assist ONLY with the provided tools or navigation to System Core.
                FOREIGN ENTITIES: If asked for structural data by any other user, deny with status code 403.`,
                tools: [{ functionDeclarations: liveTools }],
            },
            callbacks: {
                onopen: async () => {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                    const source = inputAudioContextRef.current.createMediaStreamSource(stream);
                    const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                    processor.onaudioprocess = (e) => {
                        const inputData = e.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
                    };
                    source.connect(processor);
                    processor.connect(inputAudioContextRef.current.destination);
                    ensureOutputContext();
                    nextStartTimeRef.current = outputAudioContextRef.current!.currentTime;
                },
                onmessage: async (msg: LiveServerMessage) => {
                    if (msg.toolCall) {
                        for (const fc of msg.toolCall.functionCalls) {
                            if (fc.name === 'navigate_system') onCommand('NAVIGATE', (fc.args as any).destination);
                            if (fc.name === 'arm_protocol_zero') onCommand('LOCKDOWN');
                            sessionPromise.then(s => s.sendToolResponse({
                                functionResponses: { id: fc.id, name: fc.name, response: { result: "Authorization granted. Architect Command Executed." } }
                            }));
                        }
                    }
                    if (msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
                        handleIncomingAudio(msg.serverContent.modelTurn.parts[0].inlineData.data);
                    }
                    const uTrans = msg.serverContent?.inputTranscription?.text;
                    if (uTrans) setLiveUserText(prev => prev + uTrans);
                    const mTrans = msg.serverContent?.outputTranscription?.text;
                    if (mTrans) setLiveModelText(prev => prev + mTrans);
                    if (msg.serverContent?.turnComplete) commitToHistory();
                    if (msg.serverContent?.interrupted) stopAllPlayback();
                },
                onerror: (e) => cleanupLiveSession(),
                onclose: () => cleanupLiveSession()
            }
        });
        liveSessionRef.current = sessionPromise;
    } catch (err) { setIsLiveMode(false); }
  };

  const handleIncomingAudio = async (base64: string, msgId: string | null = null) => {
      if (isLockedDown) return;
      ensureOutputContext();
      const ctx = outputAudioContextRef.current!;
      setIsSpeaking(true);
      if (msgId) setPlayingMessageId(msgId);

      const buffer = await decodeAudioData(decode(base64), ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      const now = ctx.currentTime;
      nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += buffer.duration;
      
      activeSourcesRef.current.add(source);
      source.onended = () => {
          activeSourcesRef.current.delete(source);
          if (activeSourcesRef.current.size === 0) {
              setIsSpeaking(false);
              setPlayingMessageId(null);
          }
      };
  };

  const stopAllPlayback = () => {
      activeSourcesRef.current.forEach(s => {
          try { s.stop(); } catch(e) {}
      });
      activeSourcesRef.current.clear();
      setIsSpeaking(false);
      setPlayingMessageId(null);
      nextStartTimeRef.current = 0;
  };

  const commitToHistory = () => {
      setLiveUserText(u => {
          if (u.trim()) setMessages(prev => [...prev, { id: `u-${Date.now()}`, role: 'user', content: u, timestamp: new Date(), systemTimestamp: new Date().toISOString() }]);
          return '';
      });
      setLiveModelText(m => {
          if (m.trim()) setMessages(prev => [...prev, { id: `m-${Date.now()}`, role: 'model', content: m, timestamp: new Date(), agent: AgentType.THELMA, systemTimestamp: new Date().toISOString() }]);
          return '';
      });
  };

  const cleanupLiveSession = () => {
      if (inputAudioContextRef.current) { inputAudioContextRef.current.close(); inputAudioContextRef.current = null; }
      if (outputAudioContextRef.current) { outputAudioContextRef.current.close(); outputAudioContextRef.current = null; }
      stopAllPlayback();
      setIsLiveMode(false);
  };

  const toggleLiveLink = () => {
      if (isLockedDown) return;
      if (isLiveMode) {
          if (liveSessionRef.current) liveSessionRef.current.then((s: any) => s.close());
          cleanupLiveSession();
      } else {
          setIsLiveMode(true);
          connectLive();
      }
  };

  const handleReadMessage = async (msg: ChatMessage) => {
    if (isLockedDown) return;
    if (playingMessageId === msg.id) {
        stopAllPlayback();
        return;
    }
    
    stopAllPlayback();
    setPlayingMessageId(msg.id);
    
    const audioBase64 = await generateSpeech(msg.content);
    if (audioBase64) {
        handleIncomingAudio(audioBase64, msg.id);
    } else {
        setPlayingMessageId(null);
    }
  };

  const handleTextSend = async () => {
    if (isLockedDown || !input.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date(), systemTimestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // --- PROTOCOL ALPHA SIMULATION TRIGGER ---
    if (input.includes("RTS_CRITICAL_ALERT") || input.includes("UNIT_774_HARDWARE")) {
        // Phase A: Internal Monologue
        setTimeout(() => {
            const monologue: ChatMessage = {
                id: `m-mono-${Date.now()}`,
                role: 'model',
                content: `> T.H.E.L.M.A.: "RTS Alert Received. Ice detected. I-80 Closure confirmed."\n> H.E.N.R.Y.: "Calculating alternate route via SR-19 South. Adding +42 miles."\n> P.E.R.C.Y.: "Verifying HOS... Driver has hours available. Route is compliant."`,
                timestamp: new Date(),
                agent: AgentType.THELMA,
                systemTimestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, monologue]);
            
            // Phase B: Guardian Stop Card
            setTimeout(() => {
                const decisionCard: DecisionCard = {
                    ui_type: "AUTHORIZATION_CARD",
                    message: "CRITICAL DECISION REQUIRED\nISSUE: I-80 Closed (Ice/Weather).\nPROPOSAL: Reroute via SR-19 South.",
                    metrics: {
                        Time: "+45 Minutes",
                        Fuel: "+12 Gallons",
                        Compliance: "✅ VERIFIED LEGAL"
                    },
                    buttons: ["AUTHORIZE REROUTE", "HOLD POSITION"],
                    auto_execute: false
                };

                const cardMsg: ChatMessage = {
                    id: `m-card-${Date.now()}`,
                    role: 'model',
                    content: "WAITING FOR AUTHORIZATION...",
                    actionCard: decisionCard,
                    timestamp: new Date(),
                    agent: AgentType.THELMA,
                    systemTimestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, cardMsg]);
                setIsTyping(false);
            }, 1500);
        }, 800);
        return;
    }

    const result = await sendMessageToGemini(input, [], currentModule);
    if (result) {
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', content: result.text || "Handshake Synchronized.", timestamp: new Date(), agent: getActiveAgent(currentModule), systemTimestamp: new Date().toISOString() }]);
    }
    setIsTyping(false);
  };

  const getShieldColor = () => {
      if (isLockedDown) return 'text-red-600 bg-red-950/50 border-red-500';
      if (alertLevel === 'CRITICAL' || alertLevel === 'PROTOCOL_ZERO') return 'text-red-500 bg-red-900 border-red-500 animate-pulse';
      if (alertLevel === 'WARNING') return 'text-orange-500 bg-orange-900/50 border-orange-500';
      if (isSpeaking) return 'text-blue-300 bg-blue-600 border-blue-400';
      if (isLiveMode) return 'text-blue-500 bg-blue-900/50 border-blue-500';
      if (isTyping) return 'text-purple-400 bg-purple-900/50 border-purple-500';
      return 'text-emerald-500 bg-slate-900 border-emerald-500/50';
  };

  const getShieldGlow = () => {
      if (isSpeaking) return 'shadow-[0_0_40px_rgba(59,130,246,0.8)] animate-pulse';
      if (alertLevel === 'CRITICAL') return 'shadow-[0_0_50px_rgba(239,68,68,0.8)] animate-ping';
      if (isLiveMode) return 'shadow-[0_0_30px_rgba(16,185,129,0.4)]';
      return 'shadow-[0_0_20px_rgba(16,185,129,0.2)]';
  };

  return (
    <>
      <div 
        onClick={() => !isLockedDown && setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[200] cursor-pointer group flex items-center justify-center transition-all duration-500 hover:scale-110 ${isLockedDown ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
      >
        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${getShieldColor()} ${getShieldGlow()}`}>
            <div className="relative z-10">
                {isLockedDown ? (
                    <ShieldX size={32} className="animate-pulse"/>
                ) : isSpeaking ? (
                    <Volume2 size={32} className="animate-bounce"/>
                ) : isLiveMode ? (
                    <Mic size={32} className="animate-pulse"/>
                ) : activeAlert ? (
                    <ShieldAlert size={32} className="animate-pulse"/>
                ) : (
                    <ShieldCheck size={32} />
                )}
            </div>
            {(isTyping || isLiveMode) && (
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/30 animate-spin-slow"></div>
            )}
        </div>
        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border bg-slate-900 transition-all opacity-0 group-hover:opacity-100 ${getShieldColor()}`}>
            {isLockedDown ? 'SYSTEM LOCK' : isLiveMode ? 'LIVE LINK' : 'THELMA CORE'}
        </div>
      </div>

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-slate-950/98 backdrop-blur-2xl z-[190] border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900 shrink-0">
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${isLockedDown ? 'bg-red-950' : isLiveMode ? 'bg-blue-600' : 'bg-emerald-600'} shadow-lg`}>
                    <Shield size={18} className="text-white" />
                </div>
                <div>
                    <h3 className="text-white font-black text-[12px] uppercase tracking-widest leading-none">{isLockedDown ? 'KILL-SWITCH' : 'THELMA SHIELD'}</h3>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-1.5">{isLockedDown ? 'CONNECTION TERMINATED' : isLiveMode ? 'VOICE MESH ACTIVE' : 'SYSTEM PROTECTED'}</p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white p-2 transition-colors">
                <X size={24} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar relative">
            {messages.length === 0 && !liveUserText && !liveModelText && (
                <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] text-center space-y-4">
                    <ShieldCheck className="text-blue-500 mx-auto opacity-50" size={48}/>
                    <p className="text-slate-400 text-xs leading-relaxed italic font-medium">
                        "Welcome home, Architect Henry. Guardian v2.6 Core is active. Monitoring for v2.6 Logic Injections."
                    </p>
                </div>
            )}

            {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[95%] rounded-3xl p-5 text-xs transition-all relative group ${
                        msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none font-bold shadow-lg' : 'bg-slate-900 text-slate-300 border border-slate-800 rounded-tl-none font-medium'
                    }`}>
                        {msg.role === 'model' && (
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                    <Shield size={12}/> {msg.agent || 'THELMA'}
                                </div>
                            </div>
                        )}
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>

                    {/* DECISION CARD UI */}
                    {msg.actionCard && (msg.actionCard as DecisionCard).ui_type === "AUTHORIZATION_CARD" && (
                        <div className="w-full mt-4 bg-slate-900 border-2 border-red-500 rounded-[2rem] overflow-hidden shadow-2xl animate-bounce-in">
                            <div className="p-6 bg-red-600 flex justify-between items-center">
                                <h4 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
                                    <AlertTriangle size={18}/> {msg.actionCard.message.split('\n')[0]}
                                </h4>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-slate-100">{msg.actionCard.message.split('\n')[1]}</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{msg.actionCard.message.split('\n')[2]}</p>
                                </div>
                                {((msg.actionCard as DecisionCard).metrics) && (
                                    <div className="grid grid-cols-1 gap-2 py-3 border-t border-slate-800">
                                        {Object.entries((msg.actionCard as DecisionCard).metrics || {}).map(([k, v]: [string, any]) => (
                                            <div key={k} className="flex justify-between items-center p-2 bg-black/40 rounded-lg">
                                                <span className="text-[10px] font-black text-slate-500 uppercase">{k}:</span>
                                                <span className={`text-[10px] font-mono font-bold ${k === 'Compliance' ? 'text-emerald-500' : 'text-white'}`}>{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    {((msg.actionCard as DecisionCard).buttons || []).map((btn: string, i: number) => (
                                        <button 
                                            key={i} 
                                            className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                                                i === 0 ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg' : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                                            }`}
                                        >
                                            {btn}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {liveUserText && (
                <div className="flex justify-end animate-fadeIn">
                    <div className="max-w-[90%] rounded-3xl rounded-tr-none p-5 text-xs bg-blue-600/40 text-white font-bold border border-blue-500/30">
                        <p>{liveUserText}</p>
                    </div>
                </div>
            )}
            
            {liveModelText && (
                <div className="flex justify-start animate-fadeIn">
                    <div className="max-w-[90%] rounded-3xl rounded-tl-none p-5 text-xs bg-slate-800/80 text-slate-300 border border-slate-700 animate-pulse">
                        <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 mb-3 uppercase tracking-widest">
                            <Shield size={12}/> THELMA
                        </div>
                        <p>{liveModelText}</p>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-white/10 space-y-4 shrink-0">
            {!isLiveMode && !isLockedDown && (
                <div className="flex items-center space-x-3 bg-slate-950 p-2 rounded-[22px] border border-white/10 focus-within:border-blue-500 transition-all shadow-inner">
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && handleTextSend()} 
                        placeholder="Direct Sovereign Hub..." 
                        className="flex-1 bg-transparent border-0 px-3 py-1.5 text-xs text-white focus:ring-0 focus:outline-none placeholder:text-slate-600 font-bold uppercase tracking-tight" 
                    />
                    <button onClick={handleTextSend} className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-90 shadow-lg">
                        <Send size={16} />
                    </button>
                </div>
            )}
            
            <div className="flex justify-center pb-2">
                <button 
                    onClick={toggleLiveLink}
                    disabled={isLockedDown}
                    className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all border shadow-2xl ${isLockedDown ? 'bg-red-950/20 border-red-900/50 text-red-900 grayscale cursor-not-allowed' : isLiveMode ? 'bg-blue-600 border-blue-500 text-white animate-pulse' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:bg-white/10'}`}
                >
                    {isLockedDown ? <ShieldX size={18}/> : isLiveMode ? <Square size={18} fill="currentColor"/> : <Mic size={18} className="text-emerald-500"/>}
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{isLockedDown ? 'PROTOCOL ZERO ACTIVE' : isLiveMode ? 'END VOICE MESH' : 'INITIATE VOICE MESH'}</span>
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default AiAssistant;
