
export enum DeploymentMode {
  CLOUD = 'CLOUD',
  HYBRID = 'HYBRID',
  ON_PREMISE = 'ON_PREMISE',
}

export enum UserRole {
  ARCHITECT = 'ARCHITECT',
  CEO = 'CEO',
  COO = 'COO',
  CTO = 'CTO',
  CFO = 'CFO',
  FLEET_MANAGER = 'FLEET_MANAGER',
  PILOT = 'PILOT',
  IT_SPECIALIST = 'IT_SPECIALIST',
  DISPATCHER = 'DISPATCHER',
  TRAINING_DIRECTOR = 'TRAINING_DIRECTOR',
  OPS_MANAGER = 'OPS_MANAGER',
  FIELD_OPERATOR = 'FIELD_OPERATOR',
  AUDITOR = 'AUDITOR',
  DOT_INSPECTOR = 'DOT_INSPECTOR',
  HR_ADMIN = 'HR_ADMIN',
  PORTER = 'PORTER',
  DRIVER = 'DRIVER'
}

export enum AgentType {
  THELMA = 'T.H.E.L.M.A.',
  MINIMI = 'M.I.N.I.M.I.',
  HENRY = 'H.E.N.R.Y.',
  LILY = 'L.I.L.Y.',
  PERCY = 'P.E.R.C.Y.',
  CORE = 'C.O.R.E.',
  SENTINEL = 'S.E.N.T.I.N.E.L.',
  VERITAS = 'V.E.R.I.T.A.S.'
}

export type AlertLevel = 'IDLE' | 'THINKING' | 'WARNING' | 'CRITICAL' | 'COPILOT_ADVISORY' | 'HAPTIC_PULSE' | 'PROTOCOL_ZERO' | 'QUANTUM_SYNC';
export type PersonalitySignature = 'ADVOCATE' | 'LOGICIAN' | 'ARCHITECT' | 'COMMANDER';

export const RULES_OF_ENGAGEMENT = {
  IDENTITY_SINGULARITY: "USER_ID === 'BEE-001'",
  CLEARANCE_LEVEL_MAX: 10,
  GHOST_PROTOCOL_ACTIVE: true,
  ACCESS_PROHIBITED_MESSAGE: "AUTHORIZATION REJECTED: T.H.E.L.M.A. CORE IS LOCKED TO ARCHITECT SIGNATURE BEE-001. NO EXTERNAL OR FOREIGN ACCESS PERMITTED.",
  ARCHITECT_ID: "BEE-001",
  ARCHITECT_NAME: "Steve Henry",
  SYSTEM_VERSION: "v2.6 Guardian"
};

export interface RTSPacket {
  rts_unit_id: string;
  timestamp: string;
  n8n_buffer_token: string;
  sensors: {
    gps_lat: number;
    gps_long: number;
    ignition_status: 'ON' | 'OFF';
    speed_mph: number;
    g_force_event: number;
    fuel_level: number;
    biometric_driver_id: string;
  };
  verification_logic: {
    gps_match_manifest: boolean;
    driver_match_schedule: boolean;
    status: 'GREEN_LIGHT' | 'AMBER_FLAG' | 'RED_LOCK';
  }
}

export interface DecisionCard {
  ui_type: "AUTHORIZATION_CARD" | "INFO_CARD" | "ALERT" | "MICRO_SIMULATION";
  message: string;
  metrics?: any;
  buttons: string[];
  auto_execute: boolean;
  module_id?: string;
  duration?: string;
  requirement?: string;
}

export interface LoadTicket {
  id: string;
  unitNumber: string;
  origin: string;
  destination: string;
  status: 'PENDING' | 'HANDSHAKE' | 'ENROUTE' | 'COMPLETE';
  hazards: {
    weather: string;
    lowBridge: string;
    migration: string;
  };
}

export interface Bid {
  id: string;
  driverName: string;
  driverId: string;
  amount: number;
  timestamp: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export interface DispatchOrder {
    id: string;
    client: string;
    origin: string;
    destination: string;
    priority: 'STANDARD' | 'EXPEDITED' | 'CRITICAL';
    domain: 'LAND' | 'AIR' | 'SEA';
    status: 'PENDING' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED';
    payload: string;
    assignedAssetId?: string;
    value: number;
    eta?: string;
    bids: Bid[];
}

export interface SystemAlert {
  id: string;
  type: 'TELEMETRY' | 'SECURITY' | 'COMPLIANCE' | 'ACCIDENT' | 'MIGRATION' | 'SENSORY_FAULT' | 'INTRUSION';
  severity: AlertLevel;
  message: string;
  module: ModuleType;
  timestamp: string;
}

export interface CortexAction {
  id: string;
  type: 'NAVIGATE' | 'REPORT' | 'SECURITY' | 'CONFIRM_LOAD' | 'RE_ROUTE' | 'HAPTIC_SYNC' | 'PROTOCOL_ZERO_ARM' | 'LOCKDOWN' | 'AUTHORIZE_DECISION';
  message: string;
  destination?: ModuleType;
  loadTicket?: LoadTicket;
  timestamp: string;
  decisionData?: any;
}

export enum DutyStatus {
  STANDBY = 'STANDBY',
  FUELING = 'FUELING',
  ENROUTE = 'ENROUTE',
  STOPPED = 'STOPPED',
  SLEEPER = 'SLEEPER',
  OFF_DUTY = 'OFF_DUTY'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  agent?: AgentType;
  systemTimestamp: string;
  actionCard?: CortexAction | DecisionCard;
}

export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  OMNI_PRESENCE = 'OMNI_PRESENCE',
  DISPATCH = 'DISPATCH',
  AI_INSIGHTS = 'AI_INSIGHTS',
  TRAINING_HUB = 'TRAINING_HUB',
  AGENT_HUB = 'AGENT_HUB',
  IT_CONTROL = 'IT_CONTROL',
  HR_ADMIN = 'HR_ADMIN',
  ANALYTICS = 'ANALYTICS',
  TEAM_SETUP = 'TEAM_SETUP',
  ROUTE_OPTIMIZER = 'ROUTE_OPTIMIZER',
  AVIATION_CONTROL = 'AVIATION_CONTROL',
  DOCUMENT_HUB = 'DOCUMENT_HUB',
  BILLING = 'BILLING',
  SETTINGS = 'SETTINGS',
  SECURITY_INFO = 'SECURITY_INFO',
  DOCUMENTATION = 'DOCUMENTATION',
  DEPLOYMENT = 'DEPLOYMENT',
  FLEET = 'FLEET',
  AVIATION = 'AVIATION',
  AQUATIC = 'AQUATIC',
  ORBITAL = 'ORBITAL',
  EMERGENCY = 'EMERGENCY',
  INSURANCE = 'INSURANCE',
  HR_TRAINING = 'HR_TRAINING',
  IT_INFRA = 'IT_INFRA',
  INTEGRATIONS = 'INTEGRATIONS',
  ADAPTATION = 'ADAPTATION',
  NET_ZERO = 'NET_ZERO',
  GOVERNANCE = 'GOVERNANCE',
  EDGE_CONTROL = 'EDGE_CONTROL',
  PAYROLL = 'PAYROLL',
  COMMUNICATIONS = 'COMMUNICATIONS',
  MAINTENANCE = 'MAINTENANCE',
  FIELD_RELAY = 'FIELD_RELAY',
  SYSTEM_CORE = 'SYSTEM_CORE'
}

export type SystemMode = 'NORMAL' | 'DEFCON' | 'ECO' | 'QUANTUM' | 'VR_TRAINING' | 'PROTOCOL_ZERO' | 'GHOST_RUN';

export interface User {
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  clearanceLevel: number;
}

export interface PersonnelProfile {
    id: string;
    fullName: string;
    role: UserRole;
    email: string;
    phone: string;
    status: 'ACTIVE' | 'ONBOARDING' | 'SUSPENDED' | 'TERMINATED';
    identity: {
        ssn_ein: string;
        type: 'W2_EMPLOYEE' | '1099_CONTRACTOR';
        dob: string;
        licenseNumber: string;
        licenseExpiry: string;
        licenseClass: string;
        licenseImageUploaded: boolean;
    };
    financial: {
        payrollActivated: boolean;
        cardType?: string;
        cardLastFour?: string;
        payoutFrequency: 'INSTANT' | 'WEEKLY';
    };
    dotCompliance: {
        lastReset: string;
        totalDriveTimeToday: number;
        totalDutyTimeToday: number;
        logs: any[];
    };
    insurance: {
        provider: string;
        policyNumber: string;
        coverageType: string;
        expiry: string;
        status: string;
    };
    ledgerId: string;
    systemTimestamp: string;
}

export interface AquaticAsset {
  id: string;
  name: string;
  type: string;
  status: string;
  coordinates: string;
  fuelLevel: number;
  description: string;
  specs: Record<string, string>;
  systemTimestamp: string;
}

export interface AviationAsset {
  id: string;
  callsign: string;
  type: string;
  status: string;
  altitude: string;
  batteryLevel: number;
  coordinates: string;
  flightHours: number;
  lastService: string;
  maintenanceLog: any[];
  description: string;
  specs: Record<string, string>;
  systemTimestamp: string;
}

export interface PayrollEntry {
  id: string;
  recipientId: string;
  name: string;
  type: 'SALARY' | 'LOAD_COMMISSION' | 'BONUS' | 'REIMBURSEMENT';
  amount: number;
  status: 'PROCESSED' | 'PENDING' | 'HELD';
  date: string;
  notes?: string;
  systemTimestamp: string;
}

export interface ApiKey {
  id: string;
  serviceName: string;
  preview: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  created: string;
}

export type PowerSource = 'ELECTRIC' | 'HYDROGEN' | 'DIESEL' | 'ZERO_POINT' | 'HYBRID' | 'NUCLEAR' | 'WIND_SOLAR' | 'JET_A1';
export type UnitType = 'TRUCK' | 'DRONE' | 'SHIP' | 'ANTIGRAV' | 'ROBOT' | 'SUBMERSIBLE' | 'EVTOL' | 'BIKE' | 'OFFROAD' | 'JETPACK' | 'HYDROFOIL';

export interface AssetSchematic {
    chassis: string;
    propulsion: string;
    sensors: string[];
    maxPayload: string;
    range: string;
    criticalCheckpoints: string[]; 
}

export interface CatalogItem {
    id: string;
    name: string;
    make?: string;
    model?: string;
    domain: 'LAND' | 'AIR' | 'SEA' | 'SUB' | 'SPACE';
    category: string; 
    type: UnitType;
    power: PowerSource;
    year: string;
    status: string;
    schematic: AssetSchematic;
    specs: any;
    abilities: string[]; 
    last_review: string;
    description?: string;
}

export interface UnitConfiguration {
  id: string;
  name: string;
  type: UnitType;
  powerSource: PowerSource;
  dimensions: { length: number; width: number; height: number; weight: number };
  hazmatCertified: boolean;
  mileage: number;
  fuelLevel: number;
  documents: Record<string, boolean>;
  releaseCode: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user_id: string;
  role: UserRole;
  action: string;
  module: string;
  evidence: string[];
  result: string | AuditResult;
  metadata: Record<string, any>;
  systemTimestamp: string;
}

export interface LegacySystem {
  id: string;
  name: string;
  type: string;
  connectionStatus: 'CONNECTED' | 'SYNCING' | 'ERROR';
  lastSync: string;
  dataPoints: number;
}

export interface MaintenanceRecord {
  id: string;
  unitId: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  technician: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED';
}

export interface InjectionManifest {
    id: string;
    category: 'SECURITY' | 'LOGISTICS' | 'GOVERNANCE' | 'PERSONNEL' | 'EXPERIMENTAL' | 'FINANCIAL';
    title: string;
    description: string;
    codeHash: string;
    status: 'DEPLOYED' | 'PENDING' | 'SIMULATED';
    author: 'ARCHITECT BEE-001';
}

export enum AuditResult {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  PENDING = 'PENDING'
}

export interface FleetVehicle {
    id: string;
    name: string;
    type: string;
    status: string;
    fuelLevel: number;
    mileage: number;
    lastService: string;
    vin: string;
    verified: boolean;
    driver: string;
    lat: number;
    lng: number;
    heading: number;
    health: number;
    trainingStatus: number;
}

export interface DOTLogEntry {
  id: string;
  timestamp: string;
  status: DutyStatus;
  location: string;
  notes: string;
}

export interface RouteHazard {
    id: string;
    type: string;
    location: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
}

export interface N8nWorkflow {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ERROR';
  lastRun: string;
  trigger: string;
  nodes: number;
  connectorType: string;
  successRate: number;
  latency: number;
}

export interface IntegrationRequestLog {
    id: string;
    timestamp: string;
    workflowId: string;
    status: 'SUCCESS' | 'FAILURE';
    payload: any;
}
