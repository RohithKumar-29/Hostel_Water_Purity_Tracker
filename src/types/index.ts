export type SafetyStatus = 'SAFE' | 'WARNING' | 'DANGER';

export interface ParameterThreshold {
  min: number;
  max: number;
  unit: string;
  warningMargin: number; // percentage before threshold to trigger warning
}

export interface SensorReading {
  id: string;
  name: string;
  key: string;
  value: number;
  unit: string;
  status: SafetyStatus;
  normalRange: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  history: number[];
  description: string;
}

export interface Tank {
  id: string;
  name: string;
  building: string;
  campus: string;
  organization: string;
  capacityLiters: number;
  currentLevelPercent: number;
  status: SafetyStatus;
  safetyScore: number;
  flowRateLpm: number;
  lastUpdated: string;
  readings: Record<string, SensorReading>;
}

export interface SensorDevice {
  id: string;
  name: string;
  tankId: string;
  type: string;
  status: 'online' | 'offline' | 'calibrating';
  batteryLevel: number;
  signalDbm: number;
  firmwareVersion: string;
  lastCommunication: string;
  calibrationDate: string;
  nextMaintenance: string;
  errorCount: number;
}

export interface Alert {
  id: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  tankName: string;
  campusName: string;
  parameterKey: string;
  value: string;
  threshold: string;
  read: boolean;
}

export interface AIPrediction {
  id: string;
  timestamp: string;
  type: 'trend' | 'anomaly' | 'maintenance' | 'safety';
  title: string;
  description: string;
  confidence: number;
  recommendation: string;
  impactLevel: 'high' | 'medium' | 'low';
}

export type UserRole = 'Super Admin' | 'Organization Admin' | 'Manager' | 'Technician' | 'Viewer';

export interface UserContext {
  name: string;
  role: UserRole;
  organization: string;
  campus: string;
  avatar: string;
}
