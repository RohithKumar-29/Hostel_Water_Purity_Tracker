import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { LiveMonitoring } from './components/LiveMonitoring';
import { HistoricalAnalytics } from './components/HistoricalAnalytics';
import { SmartAlerts } from './components/SmartAlerts';
import { AIIntelligence } from './components/AIIntelligence';
import { DigitalTwin } from './components/DigitalTwin';
import { AquaSenseAI } from './components/AquaSenseAI';
import { AdminPortal } from './components/AdminPortal';
import { DeviceHealth } from './components/DeviceHealth';
import { ReportGenerator } from './components/ReportGenerator';
import { CustomerOnboarding } from './components/CustomerOnboarding';
import { KIETPilotPage } from './components/KIETPilotPage';
import { RoadmapPage } from './components/RoadmapPage';

import { 
  INITIAL_TANKS, 
  INITIAL_DEVICES, 
  INITIAL_ALERTS, 
  INITIAL_AI_PREDICTIONS, 
  DEFAULT_THRESHOLDS 
} from './services/mockData';
import { Tank, UserContext, UserRole, SafetyStatus, ParameterThreshold } from './types';

export function App() {
  const [viewMode, setViewMode] = useState<'app' | 'landing'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedTankId, setSelectedTankId] = useState<string>('tank-kiet-01');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  const [tanks, setTanks] = useState<Tank[]>(INITIAL_TANKS);
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [predictions, setPredictions] = useState(INITIAL_AI_PREDICTIONS);
  const [thresholds, setThresholds] = useState<Record<string, ParameterThreshold>>(DEFAULT_THRESHOLDS);

  const [user, setUser] = useState<UserContext>({
    name: 'Rohit (Administrator)',
    role: 'Super Admin',
    organization: 'KIET Group of Institutions',
    campus: 'KIET Hostel Campus',
    avatar: 'R'
  });

  const setUserRole = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
  };

  const selectedTank = tanks.find(t => t.id === selectedTankId) || tanks[0];

  // Demo Telemetry Stream simulation (updates every 3 seconds)
  useEffect(() => {
    if (!isDemoMode) return;

    const interval = setInterval(() => {
      setTanks(prevTanks => 
        prevTanks.map(tank => {
          if (tank.id !== selectedTankId) return tank;

          const updatedReadings = { ...tank.readings };
          
          // Fluctuate pH slightly
          const phVal = Number(Math.max(6.5, Math.min(8.6, updatedReadings.ph.value + (Math.random() * 0.08 - 0.04))).toFixed(2));
          updatedReadings.ph.value = phVal;
          updatedReadings.ph.history = [...updatedReadings.ph.history.slice(1), phVal];
          updatedReadings.ph.lastUpdated = 'Just now';

          // Fluctuate TDS
          const tdsVal = Math.max(50, Math.min(320, Math.round(updatedReadings.tds.value + (Math.random() * 4 - 2))));
          updatedReadings.tds.value = tdsVal;
          updatedReadings.tds.history = [...updatedReadings.tds.history.slice(1), tdsVal];

          // Fluctuate Turbidity
          const turbVal = Number(Math.max(0.4, Math.min(2.8, updatedReadings.turbidity.value + (Math.random() * 0.1 - 0.05))).toFixed(2));
          updatedReadings.turbidity.value = turbVal;
          updatedReadings.turbidity.history = [...updatedReadings.turbidity.history.slice(1), turbVal];

          // Calculate Parameter Safety Status against configured thresholds
          let isWarning = false;
          let isDanger = false;

          Object.keys(updatedReadings).forEach(key => {
            const r = updatedReadings[key];
            const th = thresholds[key];
            if (th) {
              if (r.value < th.min || r.value > th.max) {
                r.status = 'DANGER';
                isDanger = true;
              } else if (r.value > (th.max - th.warningMargin) || r.value < (th.min + th.warningMargin)) {
                r.status = 'WARNING';
                isWarning = true;
              } else {
                r.status = 'SAFE';
              }
            }
          });

          const overallStatus: SafetyStatus = isDanger ? 'DANGER' : isWarning ? 'WARNING' : 'SAFE';
          const safetyScore = isDanger ? 62 : isWarning ? 84 : 98;

          return {
            ...tank,
            safetyScore,
            status: overallStatus,
            lastUpdated: 'Just now',
            readings: updatedReadings
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isDemoMode, selectedTankId, thresholds]);

  const handleMarkAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  const unreadAlertCount = alerts.filter(a => !a.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Sticky Global Header */}
      <Header
        user={user}
        setUserRole={setUserRole}
        selectedTankId={selectedTankId}
        setSelectedTankId={setSelectedTankId}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        viewMode={viewMode}
        setViewMode={setViewMode}
        unreadAlertCount={unreadAlertCount}
        onOpenAlerts={() => {
          setViewMode('app');
          setActiveTab('alerts');
        }}
      />

      {/* Main View Router */}
      {viewMode === 'landing' ? (
        <main className="flex-1">
          <LandingPage 
            onLaunchPlatform={() => {
              setViewMode('app');
              setActiveTab('dashboard');
            }} 
          />
        </main>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Sidebar Navigation */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            alertCount={unreadAlertCount}
          />

          {/* Right Main Content Panel */}
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto h-[calc(100vh-65px)]">
            {activeTab === 'dashboard' && (
              <DashboardOverview
                tanks={tanks}
                selectedTank={selectedTank}
                alerts={alerts}
                onSelectTab={setActiveTab}
                isDemoMode={isDemoMode}
              />
            )}

            {activeTab === 'live-monitoring' && (
              <LiveMonitoring
                selectedTank={selectedTank}
                isDemoMode={isDemoMode}
                onEditThresholds={() => setActiveTab('admin')}
              />
            )}

            {activeTab === 'analytics' && (
              <HistoricalAnalytics
                selectedTank={selectedTank}
              />
            )}

            {activeTab === 'alerts' && (
              <SmartAlerts
                alerts={alerts}
                onMarkAsRead={handleMarkAlertRead}
                onClearAll={handleClearAlerts}
                onOpenThresholds={() => setActiveTab('admin')}
              />
            )}

            {activeTab === 'ai-intelligence' && (
              <AIIntelligence
                predictions={predictions}
                selectedTank={selectedTank}
              />
            )}

            {activeTab === 'digital-twin' && (
              <DigitalTwin
                selectedTank={selectedTank}
                isDemoMode={isDemoMode}
              />
            )}

            {activeTab === 'ai-assistant' && (
              <AquaSenseAI
                tanks={tanks}
                selectedTank={selectedTank}
                alerts={alerts}
                onOpenReport={() => setActiveTab('reports')}
              />
            )}

            {activeTab === 'admin' && (
              <AdminPortal
                thresholds={thresholds}
                onSaveThresholds={(newTh) => setThresholds(newTh)}
              />
            )}

            {activeTab === 'device-health' && (
              <DeviceHealth
                devices={devices}
              />
            )}

            {activeTab === 'reports' && (
              <ReportGenerator
                selectedTank={selectedTank}
              />
            )}

            {activeTab === 'onboarding' && (
              <CustomerOnboarding
                onComplete={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'kiet-pilot' && (
              <KIETPilotPage />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapPage />
            )}
          </main>
        </div>
      )}

    </div>
  );
}

export default App;
