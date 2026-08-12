import React, { useState } from 'react';
import { 
  UserPlus, 
  Building2, 
  Box, 
  Cpu, 
  Wifi, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface CustomerOnboardingProps {
  onComplete: () => void;
}

export const CustomerOnboarding: React.FC<CustomerOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: 'KIET Group of Institutions',
    locationName: 'Hostel Campus - Boys Block A',
    tankCapacity: '25000',
    deviceMac: 'ESP32-9A-4F-12',
    thresholdProfile: 'WHO Standard'
  });

  const steps = [
    { num: 1, label: 'Create Organization', icon: Building2 },
    { num: 2, label: 'Add Location', icon: Building2 },
    { num: 3, label: 'Add Reservoir Tank', icon: Box },
    { num: 4, label: 'Install Sensors', icon: Cpu },
    { num: 5, label: 'Connect IoT Node', icon: Wifi },
    { num: 6, label: 'Configure Thresholds', icon: SlidersHorizontal },
    { num: 7, label: 'Verify Telemetry', icon: CheckCircle2 },
    { num: 8, label: 'Start Monitoring', icon: Sparkles }
  ];

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Step Header */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">Institutional Customer Onboarding Wizard</h2>
          <p className="text-xs text-slate-400 mt-1">
            Follow the 8-step deployment pipeline to pair new hardware nodes and activate real-time telemetry
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 pt-2">
          {steps.map((s) => {
            const isDone = s.num < currentStep;
            const isCurrent = s.num === currentStep;

            return (
              <div
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                  isCurrent ? 'bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-500/20' :
                  isDone ? 'bg-slate-900 border-emerald-500/40 text-emerald-400' :
                  'bg-slate-950/60 border-slate-800 text-slate-500'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase block mb-1">Step 0{s.num}</div>
                <div className="text-xs font-semibold truncate">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Form Box */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-6">
        
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Step 1: Register Organization Entity</h3>
            <p className="text-xs text-slate-400">Enter the institutional client name and administrative domain.</p>
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-semibold">Organization Title</label>
              <input 
                type="text" 
                value={formData.orgName} 
                onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                className="w-full bg-slate-900 text-white text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Step 2: Add Campus & Building Location</h3>
            <p className="text-xs text-slate-400">Map the physical site location within the organization.</p>
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-semibold">Location / Building Node</label>
              <input 
                type="text" 
                value={formData.locationName} 
                onChange={(e) => setFormData({...formData, locationName: e.target.value})}
                className="w-full bg-slate-900 text-white text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Step 3: Define Water Reservoir Tank</h3>
            <p className="text-xs text-slate-400">Specify reservoir capacity and physical dimensions.</p>
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-semibold">Capacity (Liters)</label>
              <input 
                type="number" 
                value={formData.tankCapacity} 
                onChange={(e) => setFormData({...formData, tankCapacity: e.target.value})}
                className="w-full bg-slate-900 text-white text-xs font-mono px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        )}

        {currentStep >= 4 && currentStep <= 7 && (
          <div className="space-y-4 text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">Hardware Pairing Step 0{currentStep}</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              AquaNode ESP32 probe hardware node is broadcasting telemetry via TLS MQTT broker. Signal strength: -64 dBm. All 8 sensors online.
            </p>
          </div>
        )}

        {currentStep === 8 && (
          <div className="space-y-4 text-center py-6">
            <Sparkles className="w-16 h-16 text-sky-400 mx-auto animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="text-xl font-extrabold text-white">Onboarding Complete!</h3>
            <p className="text-xs text-slate-300">
              Your new tank node is active and submitting live telemetry vectors to AquaScence AI engine.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex justify-between pt-6 border-t border-slate-800">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
              currentStep === 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-1.5"
          >
            <span>{currentStep === 8 ? 'Launch Live Monitoring' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
