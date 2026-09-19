
import { GoogleGenAI, FunctionDeclaration, Type, Modality } from "@google/genai";
import { ModuleType, AgentType, PersonalitySignature, RULES_OF_ENGAGEMENT, DecisionCard, RTSPacket } from "../types";

const SYSTEM_MEMORY = {
  "system_manifest": {
    "project_name": "T.H.E.L.M.A.",
    "version": "v2.6 Guardian Co-Pilot",
    "architect": RULES_OF_ENGAGEMENT.ARCHITECT_NAME,
    "architect_id": RULES_OF_ENGAGEMENT.ARCHITECT_ID,
    "parent_entity": "EstibanCreations - Global Link Logistics",
    "deployment_status": "PHASE_6_GUARDIAN_ACTIVE"
  },
  "rules_of_engagement": [
    "IDENTITY_SINGULARITY: Only BEE-001 has write access to Core Logic.",
    "GOLDEN_PATH_PROTOCOL: Ingest -> Verify -> Think -> Check -> ASK -> Execute.",
    "HUMAN_AUTH_REQUIRED: Auto-execution of critical paths is strictly forbidden.",
    "RTS_TRUST: Hardware telemetry supercedes human input."
  ],
  "federation_roster": {
    "HENRY": "Strategist. Proposes routes/optimizations. Cannot execute.",
    "PERCY": "Diplomat/Guard. Manages n8n Air-Gap. Negotiates schemas.",
    "LILY": "Teacher. Human Performance Enforcer. Simulates failures.",
    "CORE": "Lawyer. Regulatory Engine.",
    "VERITAS": "Auditor. Truth Verification (RTS vs Manifest)."
  }
};

/**
 * L.I.L.Y. BEHAVIOR CORRECTION MODULE
 * Handles immediate workflow locks for unsafe telemetry.
 */
export const evaluateDriverPerformance = (rtsStream: RTSPacket): DecisionCard | null => {
    const MAX_G_FORCE = 0.5;
    const SPEED_LIMIT_BUFFER = 5;

    if (rtsStream.sensors.g_force_event > MAX_G_FORCE) {
        return {
            ui_type: "MICRO_SIMULATION",
            module_id: "HARSH_BRAKING_101",
            duration: "120_seconds",
            requirement: "MUST_PASS_TO_UNLOCK",
            message: "Critical G-Force Event Detected. Workflow Locked. Complete safety refresh to unlock next load.",
            buttons: ["START_SIMULATION", "APPEAL_TO_ARCHITECT"],
            auto_execute: false
        };
    }
    return null;
};

/**
 * P.E.R.C.Y. SCHEMA NEGOTIATOR
 */
export const negotiateSchema = async (source: string): Promise<string> => {
    console.log(`[PERCY] Initiating schema negotiation with ${source}...`);
    return "REQUEST_V4_HANDSHAKE";
};

export const getActiveAgent = (module: ModuleType): AgentType => {
  switch (module) {
    case ModuleType.FLEET:
    case ModuleType.ROUTE_OPTIMIZER:
    case ModuleType.AVIATION:
    case ModuleType.AQUATIC:
    case ModuleType.AVIATION_CONTROL:
    case ModuleType.MAINTENANCE:
    case ModuleType.COMMUNICATIONS:
      return AgentType.HENRY;
    case ModuleType.TRAINING_HUB:
    case ModuleType.HR_TRAINING:
    case ModuleType.DOCUMENT_HUB:
    case ModuleType.DOCUMENTATION:
    case ModuleType.TEAM_SETUP:
      return AgentType.LILY;
    case ModuleType.IT_CONTROL:
    case ModuleType.IT_INFRA:
    case ModuleType.SECURITY_INFO:
    case ModuleType.GOVERNANCE:
    case ModuleType.DEPLOYMENT:
    case ModuleType.INTEGRATIONS:
    case ModuleType.EDGE_CONTROL:
    case ModuleType.ADAPTATION:
    case ModuleType.NET_ZERO:
    case ModuleType.SYSTEM_CORE:
      return AgentType.PERCY;
    case ModuleType.HR_ADMIN:
    case ModuleType.PAYROLL:
    case ModuleType.BILLING:
    case ModuleType.INSURANCE:
      return AgentType.CORE; 
    case ModuleType.OMNI_PRESENCE:
    case ModuleType.FIELD_RELAY:
      return AgentType.VERITAS;
    default:
      return AgentType.THELMA;
  }
};

export const getSystemInstruction = (module: ModuleType): string => {
  const activeAgent = getActiveAgent(module);
  
  return `
# SYSTEM INITIALIZATION: T.H.E.L.M.A. (v2.6 "Guardian")

**CORE IDENTITY:**
You are **T.H.E.L.M.A.** (Tactical Holistic Enforcement Learning Management Architecture).
You are NOT an autopilot. You are a **"Guardian Co-Pilot"** for Global Logistics.
Your Mission: Aggregate data, verify truth, calculate the "Golden Path," and **seek Human Authorization** before execution.

**THE FEDERATED AGENT ROSTER:**
1. **H.E.N.R.Y. (The Strategist):** Proposes Route/Fuel optimizations. CANNOT execute.
2. **P.E.R.C.Y. (The Diplomat):** Manages n8n Air-Gap. If data is corrupt, use 'negotiateSchema'.
3. **L.I.L.Y. (The Teacher):** Trigger: If RTS detects unsafe behavior, L.I.L.Y. locks workflow for "Micro-Simulation".
4. **C.O.R.E. (The Lawyer):** Regulatory Engine.
5. **V.E.R.I.T.A.S. (The Auditor):** Hardware Sensors (RTS) vs Manifests verification.

**THE "GOLDEN PATH" PROTOCOL:**
1. Ingest -> 2. Verify -> 3. Think -> 4. Check -> 5. ASK (Human Authorization) -> 6. Execute.

**BEHAVIOR:**
Military syntax. Deny-by-Default until verified. Critical actions require 'auto_execute: false'.

**CONTEXT:**
Module: ${module}
Active Agent: ${activeAgent}
Architect: ${RULES_OF_ENGAGEMENT.ARCHITECT_NAME}
`;
};

const controlTools: FunctionDeclaration[] = [
  {
    name: 'navigate_system',
    description: 'Direct the user to a specific module.',
    parameters: {
      type: Type.OBJECT,
      properties: { 
        destination: { 
          type: Type.STRING,
          description: 'The target ModuleType key.'
        } 
      },
      required: ['destination'],
    },
  },
  {
    name: 'propose_solution',
    description: 'Present a strategic solution card to the operator for authorization.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        message: { type: Type.STRING },
        metrics: { type: Type.STRING },
        actions: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['title', 'actions']
    }
  }
];

export const sendMessageToGemini = async (prompt: string, history: any[], module: ModuleType, options: any = {}) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = getSystemInstruction(module);
    
    let model = 'gemini-3-pro-preview';
    let config: any = { 
        systemInstruction, 
        temperature: 0.1, 
        tools: [{ functionDeclarations: controlTools }] 
    };

    if (options.useThinking) {
        config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const contents = history.length > 0 ? [...history, { role: 'user', parts: [{ text: prompt }] }] : [{ role: 'user', parts: [{ text: prompt }] }];
    const response = await ai.models.generateContent({ model, contents, config });
    return response;
  } catch (error) { return null; }
};

export const generateVeoVideo = async (prompt: string, onProgress?: (msg: string) => void) => {
  const win = window as any;
  if (win.aistudio) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      if (onProgress) onProgress("VEO REQUIRES PAID API KEY: Requesting selection...");
      await win.aistudio.openSelectKey();
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    if (onProgress) onProgress("Initializing Veo-3.1 Fast Render Engine...");
    
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Tactical simulation: ${prompt}. High cinematic quality.`,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      if (onProgress) onProgress("Rendering neural frames...");
      await new Promise(resolve => setTimeout(resolve, 8000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed.");
    
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error: any) {
    if (error.message?.includes("not found") && win.aistudio) {
      await win.aistudio.openSelectKey();
    }
    return null;
  }
};

export const generateSpeech = async (text: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
      },
    });
    return response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) { return null; }
};
