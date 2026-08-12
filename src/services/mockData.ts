import type { Tank, SensorDevice, Alert, AIPrediction, ParameterThreshold } from '../types';

export const DEFAULT_THRESHOLDS: Record<string, ParameterThreshold> = {
  ph: { min: 6.5, max: 8.5, unit: 'pH', warningMargin: 0.2 },
  tds: { min: 50, max: 300, unit: 'ppm', warningMargin: 30 },
  turbidity: { min: 0, max: 2.5, unit: 'NTU', warningMargin: 0.3 },
  temperature: { min: 15, max: 32, unit: '°C', warningMargin: 2 },
  conductivity: { min: 100, max: 800, unit: 'µS/cm', warningMargin: 50 },
  orp: { min: 250, max: 700, unit: 'mV', warningMargin: 30 },
  waterLevel: { min: 20, max: 98, unit: '%', warningMargin: 5 },
  flowRate: { min: 5, max: 120, unit: 'L/min', warningMargin: 10 },
};

export const INITIAL_TANKS: Tank[] = [
  {
    id: 'tank-kiet-01',
    name: 'Main Overhead Tank 01',
    building: 'Boys Hostel Block A',
    campus: 'KIET Hostel Campus',
    organization: 'KIET Group of Institutions',
    capacityLiters: 25000,
    currentLevelPercent: 84,
    status: 'SAFE',
    safetyScore: 98,
    flowRateLpm: 42.5,
    lastUpdated: 'Just now',
    readings: {
      ph: {
        id: 'r-ph',
        name: 'pH Index',
        key: 'ph',
        value: 7.2,
        unit: 'pH',
        status: 'SAFE',
        normalRange: '6.5 - 8.5 pH',
        trend: 'stable',
        lastUpdated: 'Just now',
        history: [7.1, 7.15, 7.2, 7.18, 7.22, 7.2, 7.2],
        description: 'Measures acidity/alkalinity balance. Safe range prevents corrosion & irritation.'
      },
      tds: {
        id: 'r-tds',
        name: 'Total Dissolved Solids (TDS)',
        key: 'tds',
        value: 280,
        unit: 'ppm',
        status: 'SAFE',
        normalRange: '50 - 300 ppm',
        trend: 'up',
        lastUpdated: 'Just now',
        history: [265, 270, 272, 275, 278, 279, 280],
        description: 'Dissolved minerals & salts concentration. Ideal for institutional drinking supply.'
      },
      temperature: {
        id: 'r-temp',
        name: 'Water Temperature',
        key: 'temperature',
        value: 26.4,
        unit: '°C',
        status: 'SAFE',
        normalRange: '15.0 - 32.0 °C',
        trend: 'stable',
        lastUpdated: 'Just now',
        history: [25.8, 26.0, 26.1, 26.2, 26.3, 26.4, 26.4],
        description: 'Ambient water temp. Prevents bacterial proliferation risk.'
      },
      turbidity: {
        id: 'r-turb',
        name: 'Turbidity (Clarity)',
        key: 'turbidity',
        value: 1.2,
        unit: 'NTU',
        status: 'SAFE',
        normalRange: '0.0 - 2.5 NTU',
        trend: 'down',
        lastUpdated: 'Just now',
        history: [1.6, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2],
        description: 'Cloudiness & suspended particle count. Lower indicates high filtration purity.'
      },
      conductivity: {
        id: 'r-cond',
        name: 'Electrical Conductivity',
        key: 'conductivity',
        value: 412,
        unit: 'µS/cm',
        status: 'SAFE',
        normalRange: '100 - 800 µS/cm',
        trend: 'stable',
        lastUpdated: 'Just now',
        history: [408, 410, 410, 411, 412, 412, 412],
        description: 'Ionic concentration indication. Directly correlates with mineral load.'
      },
      orp: {
        id: 'r-orp',
        name: 'Oxidation Reduction Potential',
        key: 'orp',
        value: 450,
        unit: 'mV',
        status: 'SAFE',
        normalRange: '250 - 700 mV',
        trend: 'stable',
        lastUpdated: 'Just now',
        history: [445, 448, 450, 450, 449, 450, 450],
        description: 'Sanitizer effectiveness indicator. Higher ORP ensures effective pathogen kill.'
      },
      waterLevel: {
        id: 'r-level',
        name: 'Tank Reservoir Level',
        key: 'waterLevel',
        value: 84,
        unit: '%',
        status: 'SAFE',
        normalRange: '20 - 98 %',
        trend: 'stable',
        lastUpdated: 'Just now',
        history: [90, 88, 87, 86, 85, 84, 84],
        description: 'Ultrasonic depth measurement. Auto-triggers inlet pump optimization.'
      },
      flowRate: {
        id: 'r-flow',
        name: 'Discharge Flow Rate',
        key: 'flowRate',
        value: 42.5,
        unit: 'L/min',
        status: 'SAFE',
        normalRange: '5 - 120 L/min',
        trend: 'up',
        lastUpdated: 'Just now',
        history: [30, 35, 38, 40, 41, 42, 42.5],
        description: 'Distribution flow. Monitors consumption spikes and potential line leaks.'
      }
    }
  },
  {
    id: 'tank-kiet-02',
    name: 'Girls Hostel Underground Sump',
    building: 'Girls Hostel Block B',
    campus: 'KIET Hostel Campus',
    organization: 'KIET Group of Institutions',
    capacityLiters: 40000,
    currentLevelPercent: 62,
    status: 'WARNING',
    safetyScore: 84,
    flowRateLpm: 58.0,
    lastUpdated: '1 min ago',
    readings: {
      ph: {
        id: 'r2-ph',
        name: 'pH Index',
        key: 'ph',
        value: 8.4,
        unit: 'pH',
        status: 'WARNING',
        normalRange: '6.5 - 8.5 pH',
        trend: 'up',
        lastUpdated: '1 min ago',
        history: [7.8, 8.0, 8.1, 8.2, 8.3, 8.4, 8.4],
        description: 'Approaching upper alkaline threshold limit.'
      },
      tds: {
        id: 'r2-tds',
        name: 'Total Dissolved Solids (TDS)',
        key: 'tds',
        value: 295,
        unit: 'ppm',
        status: 'WARNING',
        normalRange: '50 - 300 ppm',
        trend: 'up',
        lastUpdated: '1 min ago',
        history: [270, 275, 280, 288, 290, 292, 295],
        description: 'High mineral solids detected near threshold limit.'
      },
      temperature: {
        id: 'r2-temp',
        name: 'Water Temperature',
        key: 'temperature',
        value: 28.1,
        unit: '°C',
        status: 'SAFE',
        normalRange: '15.0 - 32.0 °C',
        trend: 'stable',
        lastUpdated: '1 min ago',
        history: [27.5, 27.8, 28.0, 28.0, 28.1, 28.1, 28.1],
        description: 'Normal underground sump temperature.'
      },
      turbidity: {
        id: 'r2-turb',
        name: 'Turbidity (Clarity)',
        key: 'turbidity',
        value: 1.8,
        unit: 'NTU',
        status: 'SAFE',
        normalRange: '0.0 - 2.5 NTU',
        trend: 'up',
        lastUpdated: '1 min ago',
        history: [1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.8],
        description: 'Slight sediment churn detected after fresh municipal refill.'
      },
      conductivity: {
        id: 'r2-cond',
        name: 'Electrical Conductivity',
        key: 'conductivity',
        value: 540,
        unit: 'µS/cm',
        status: 'SAFE',
        normalRange: '100 - 800 µS/cm',
        trend: 'stable',
        lastUpdated: '1 min ago',
        history: [530, 535, 538, 540, 540, 540, 540],
        description: 'Conductivity within normal institutional bounds.'
      },
      orp: {
        id: 'r2-orp',
        name: 'Oxidation Reduction Potential',
        key: 'orp',
        value: 390,
        unit: 'mV',
        status: 'SAFE',
        normalRange: '250 - 700 mV',
        trend: 'stable',
        lastUpdated: '1 min ago',
        history: [380, 385, 390, 390, 390, 390, 390],
        description: 'Pathogen oxidation potential acceptable.'
      },
      waterLevel: {
        id: 'r2-level',
        name: 'Tank Reservoir Level',
        key: 'waterLevel',
        value: 62,
        unit: '%',
        status: 'SAFE',
        normalRange: '20 - 98 %',
        trend: 'down',
        lastUpdated: '1 min ago',
        history: [75, 72, 68, 65, 63, 62, 62],
        description: 'Optimal storage reserve remaining.'
      },
      flowRate: {
        id: 'r2-flow',
        name: 'Discharge Flow Rate',
        key: 'flowRate',
        value: 58.0,
        unit: 'L/min',
        status: 'SAFE',
        normalRange: '5 - 120 L/min',
        trend: 'stable',
        lastUpdated: '1 min ago',
        history: [55, 56, 57, 58, 58, 58, 58],
        description: 'Peak morning routine discharge rate.'
      }
    }
  },
  {
    id: 'tank-kiet-03',
    name: 'Faculty Residence Overhead Tank',
    building: 'Staff Quarters Block C',
    campus: 'KIET Main Campus',
    organization: 'KIET Group of Institutions',
    capacityLiters: 15000,
    currentLevelPercent: 91,
    status: 'SAFE',
    safetyScore: 99,
    flowRateLpm: 18.2,
    lastUpdated: '3 mins ago',
    readings: {
      ph: {
        id: 'r3-ph',
        name: 'pH Index',
        key: 'ph',
        value: 7.1,
        unit: 'pH',
        status: 'SAFE',
        normalRange: '6.5 - 8.5 pH',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [7.0, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1],
        description: 'Balanced pH profile.'
      },
      tds: {
        id: 'r3-tds',
        name: 'Total Dissolved Solids (TDS)',
        key: 'tds',
        value: 190,
        unit: 'ppm',
        status: 'SAFE',
        normalRange: '50 - 300 ppm',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [188, 189, 190, 190, 190, 190, 190],
        description: 'Filtered reverse osmosis supply quality.'
      },
      temperature: {
        id: 'r3-temp',
        name: 'Water Temperature',
        key: 'temperature',
        value: 25.2,
        unit: '°C',
        status: 'SAFE',
        normalRange: '15.0 - 32.0 °C',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [25.0, 25.1, 25.2, 25.2, 25.2, 25.2, 25.2],
        description: 'Optimal ambient temperature.'
      },
      turbidity: {
        id: 'r3-turb',
        name: 'Turbidity (Clarity)',
        key: 'turbidity',
        value: 0.6,
        unit: 'NTU',
        status: 'SAFE',
        normalRange: '0.0 - 2.5 NTU',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
        description: 'Ultra-clear drinking standard water clarity.'
      },
      conductivity: {
        id: 'r3-cond',
        name: 'Electrical Conductivity',
        key: 'conductivity',
        value: 310,
        unit: 'µS/cm',
        status: 'SAFE',
        normalRange: '100 - 800 µS/cm',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [305, 308, 310, 310, 310, 310, 310],
        description: 'Stable conductivity balance.'
      },
      orp: {
        id: 'r3-orp',
        name: 'Oxidation Reduction Potential',
        key: 'orp',
        value: 480,
        unit: 'mV',
        status: 'SAFE',
        normalRange: '250 - 700 mV',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [475, 478, 480, 480, 480, 480, 480],
        description: 'Optimal disinfection residual.'
      },
      waterLevel: {
        id: 'r3-level',
        name: 'Tank Reservoir Level',
        key: 'waterLevel',
        value: 91,
        unit: '%',
        status: 'SAFE',
        normalRange: '20 - 98 %',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [92, 92, 91, 91, 91, 91, 91],
        description: 'Full operational capacity.'
      },
      flowRate: {
        id: 'r3-flow',
        name: 'Discharge Flow Rate',
        key: 'flowRate',
        value: 18.2,
        unit: 'L/min',
        status: 'SAFE',
        normalRange: '5 - 120 L/min',
        trend: 'stable',
        lastUpdated: '3 mins ago',
        history: [18.0, 18.1, 18.2, 18.2, 18.2, 18.2, 18.2],
        description: 'Low uniform discharge.'
      }
    }
  }
];

export const INITIAL_DEVICES: SensorDevice[] = [
  {
    id: 'node-01-esp32',
    name: 'AquaNode IoT Probe #01 (ESP32)',
    tankId: 'tank-kiet-01',
    type: 'Multi-Parameter Industrial Array',
    status: 'online',
    batteryLevel: 96,
    signalDbm: -64,
    firmwareVersion: 'v2.4.1-p3',
    lastCommunication: '4 seconds ago',
    calibrationDate: '2026-07-28',
    nextMaintenance: '2026-10-28',
    errorCount: 0
  },
  {
    id: 'node-02-esp32',
    name: 'AquaNode IoT Probe #02 (ESP32)',
    tankId: 'tank-kiet-02',
    type: 'Submersible Chemical Array',
    status: 'online',
    batteryLevel: 88,
    signalDbm: -72,
    firmwareVersion: 'v2.4.1-p3',
    lastCommunication: '12 seconds ago',
    calibrationDate: '2026-07-15',
    nextMaintenance: '2026-10-15',
    errorCount: 1
  },
  {
    id: 'node-03-esp32',
    name: 'AquaNode IoT Probe #03 (ESP32)',
    tankId: 'tank-kiet-03',
    type: 'Precision Optical Turbidity Probe',
    status: 'online',
    batteryLevel: 100,
    signalDbm: -58,
    firmwareVersion: 'v2.4.0',
    lastCommunication: '2 seconds ago',
    calibrationDate: '2026-08-01',
    nextMaintenance: '2026-11-01',
    errorCount: 0
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'alt-101',
    timestamp: '10 mins ago',
    severity: 'warning',
    title: 'TDS Approaching Upper Limit',
    message: 'Girls Hostel Sump TDS registered at 295 ppm (Threshold: 300 ppm). Filtration flush recommended.',
    tankName: 'Girls Hostel Underground Sump',
    campusName: 'KIET Hostel Campus',
    parameterKey: 'tds',
    value: '295 ppm',
    threshold: 'max 300 ppm',
    read: false
  },
  {
    id: 'alt-102',
    timestamp: '2 hours ago',
    severity: 'info',
    title: 'Automated Sensor Self-Calibration',
    message: 'AquaNode Probe #01 completed 24-hour optical lens self-cleansing cycle.',
    tankName: 'Main Overhead Tank 01',
    campusName: 'KIET Hostel Campus',
    parameterKey: 'turbidity',
    value: '1.2 NTU',
    threshold: 'Normal',
    read: true
  },
  {
    id: 'alt-103',
    timestamp: '1 day ago',
    severity: 'critical',
    title: 'Transient Turbidity Spike Detected',
    message: 'Turbidity spiked briefly to 2.8 NTU during tank inlet refill. Auto-settled in 15 mins.',
    tankName: 'Main Overhead Tank 01',
    campusName: 'KIET Hostel Campus',
    parameterKey: 'turbidity',
    value: '2.8 NTU',
    threshold: '2.5 NTU',
    read: true
  }
];

export const INITIAL_AI_PREDICTIONS: AIPrediction[] = [
  {
    id: 'ai-01',
    timestamp: 'Today at 08:30 AM',
    type: 'trend',
    title: 'Gradual TDS Elevation Trend Detected',
    description: 'Statistical drift analysis indicates TDS in Girls Hostel Sump has risen by +8.4% over 72 hours following municipal water blend changes.',
    confidence: 94,
    recommendation: 'Initiate RO membrane back-wash sequence or adjust raw water intake ratio within 24 hours.',
    impactLevel: 'medium'
  },
  {
    id: 'ai-02',
    timestamp: 'Today at 06:15 AM',
    type: 'maintenance',
    title: 'Predictive Sensor Maintenance Window',
    description: 'AquaNode Probe #02 pH glass electrode response time increased by 140ms. Minor bio-fouling suspected.',
    confidence: 88,
    recommendation: 'Schedule technician inspection and manual buffer solution calibration before Oct 15.',
    impactLevel: 'low'
  },
  {
    id: 'ai-03',
    timestamp: 'Yesterday at 05:00 PM',
    type: 'safety',
    title: 'Pathogen Proliferation Risk Evaluation',
    description: 'Cross-parameter AI risk score calculated at 0.02 (Safe). Water temperature of 26.4°C combined with 450mV ORP guarantees 99.99% pathogen inactivation.',
    confidence: 99,
    recommendation: 'No preventive action required. Maintain current chlorination residual.',
    impactLevel: 'low'
  }
];
