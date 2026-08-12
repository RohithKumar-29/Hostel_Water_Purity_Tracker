import React, { useState } from 'react';
import { 
  Box, 
  Cpu, 
  Gauge, 
  Eye, 
  ArrowDown,
  ArrowRight,
  FlaskConical
} from 'lucide-react';
import type { Tank } from '../types';

interface DigitalTwinProps {
  selectedTank: Tank;
  isDemoMode: boolean;
}

export const DigitalTwin: React.FC<DigitalTwinProps> = ({ selectedTank, isDemoMode }) => {
  const [hoveredProbe, setHoveredProbe] = useState<string | null>(null);

  const waterLevelPct = selectedTank.currentLevelPercent;
  const flowRate = selectedTank.flowRateLpm;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-white">3D Reservoir Digital Twin Monitor</h2>
            <span className="px-2.5 py-0.5 text-xs font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded uppercase">
              Physical Mesh Sync
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time physical spatial monitoring of <span className="font-bold text-slate-200">{selectedTank.name}</span> ({selectedTank.building})
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400">Node ID:</span>
            <span className="font-mono text-emerald-400 font-bold">ESP32-NODE-01</span>
          </div>

          <div className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center space-x-2">
            <Box className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400">Model:</span>
            <span className="font-mono text-purple-300 font-bold">Hostel 25,000L Overhead</span>
          </div>
        </div>
      </div>

      {/* Main 3D Interactive Reservoir Model Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual 3D Canvas Tank Representation (2 Columns) */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          
          {/* Top Inlet Pipe Flow */}
          <div className="absolute top-4 left-1/4 flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 z-10">
            <ArrowDown className={`w-4 h-4 text-sky-400 ${isDemoMode ? 'animate-bounce' : ''}`} />
            <span>Inlet Supply: <strong>RO Refill Line (60 L/min)</strong></span>
          </div>

          {/* Outlet Discharge Pipe Flow */}
          <div className="absolute bottom-4 right-1/4 flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 z-10">
            <ArrowRight className={`w-4 h-4 text-cyan-400 ${isDemoMode ? 'animate-pulse' : ''}`} />
            <span>Hostel Tap Line: <strong>{flowRate} L/min</strong></span>
          </div>

          {/* 3D Tank Cylinder Geometry Container */}
          <div className="relative w-72 h-96 border-4 border-slate-700/80 rounded-b-3xl rounded-t-xl bg-slate-900/60 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col justify-end">
            
            {/* Height Percentage Ruler Marks */}
            <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-[10px] font-mono text-slate-500 z-10 pointer-events-none select-none">
              <span>100% (25k L)</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* Fluid Water Level Container */}
            <div 
              className="w-full bg-gradient-to-t from-sky-600/90 via-sky-500/70 to-cyan-400/80 relative transition-all duration-1000 overflow-hidden"
              style={{ height: `${waterLevelPct}%` }}
            >
              {/* Fluid Animated Surface Waves */}
              <div className={`absolute top-0 left-0 right-0 h-4 bg-cyan-300/40 ${isDemoMode ? 'animate-pulse' : ''}`}></div>

              {/* Submersible Sensor Probe Nodes Floating inside the fluid */}
              <div className="relative h-full w-full">
                
                {/* Probe 1: pH Electrode */}
                <div 
                  onMouseEnter={() => setHoveredProbe('ph')}
                  onMouseLeave={() => setHoveredProbe(null)}
                  className="absolute top-1/4 right-8 p-2 bg-purple-950/80 border-2 border-purple-400 text-purple-300 rounded-full shadow-lg cursor-pointer transform hover:scale-125 transition-all group z-20"
                >
                  <FlaskConical className="w-4 h-4" />
                  {/* Floating Tooltip */}
                  {hoveredProbe === 'ph' && (
                    <div className="absolute left-full ml-3 top-0 w-44 p-2.5 bg-slate-950 text-white text-xs rounded-xl border border-purple-500 shadow-2xl z-30 font-sans">
                      <span className="font-bold block text-purple-300">pH Glass Electrode</span>
                      <span className="font-mono text-lg">{selectedTank.readings.ph.value} pH</span>
                      <p className="text-[10px] text-slate-400 mt-1">Status: {selectedTank.readings.ph.status}</p>
                    </div>
                  )}
                </div>

                {/* Probe 2: TDS Probe */}
                <div 
                  onMouseEnter={() => setHoveredProbe('tds')}
                  onMouseLeave={() => setHoveredProbe(null)}
                  className="absolute top-2/4 right-16 p-2 bg-sky-950/80 border-2 border-sky-400 text-sky-300 rounded-full shadow-lg cursor-pointer transform hover:scale-125 transition-all group z-20"
                >
                  <Gauge className="w-4 h-4" />
                  {hoveredProbe === 'tds' && (
                    <div className="absolute left-full ml-3 top-0 w-44 p-2.5 bg-slate-950 text-white text-xs rounded-xl border border-sky-500 shadow-2xl z-30 font-sans">
                      <span className="font-bold block text-sky-300">TDS Conductivity Array</span>
                      <span className="font-mono text-lg">{selectedTank.readings.tds.value} ppm</span>
                      <p className="text-[10px] text-slate-400 mt-1">Status: {selectedTank.readings.tds.status}</p>
                    </div>
                  )}
                </div>

                {/* Probe 3: Turbidity Optical Sensor */}
                <div 
                  onMouseEnter={() => setHoveredProbe('turbidity')}
                  onMouseLeave={() => setHoveredProbe(null)}
                  className="absolute bottom-1/4 left-10 p-2 bg-amber-950/80 border-2 border-amber-400 text-amber-300 rounded-full shadow-lg cursor-pointer transform hover:scale-125 transition-all group z-20"
                >
                  <Eye className="w-4 h-4" />
                  {hoveredProbe === 'turbidity' && (
                    <div className="absolute right-full mr-3 top-0 w-44 p-2.5 bg-slate-950 text-white text-xs rounded-xl border border-amber-500 shadow-2xl z-30 font-sans">
                      <span className="font-bold block text-amber-300">Optical Turbidity Lens</span>
                      <span className="font-mono text-lg">{selectedTank.readings.turbidity.value} NTU</span>
                      <p className="text-[10px] text-slate-400 mt-1">Status: {selectedTank.readings.turbidity.status}</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

          <p className="text-xs text-slate-400 mt-4 italic">
            * Hover over circular probe markers inside tank geometry to inspect physical sensor telemetry.
          </p>
        </div>

        {/* Spatial Properties & Hardware Info Panel (1 Column) */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">IoT Probe Node Assembly</h3>
            <p className="text-xs text-slate-400 mb-4">Hardware mapping & physical mounting specs</p>

            <div className="space-y-3">
              
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Microcontroller MCU:</span>
                <span className="font-mono font-bold text-sky-400">ESP32 Dual-Core 240MHz</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Communication Band:</span>
                <span className="font-mono font-bold text-emerald-400">Wi-Fi 802.11 b/g/n + LoRaWAN</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Probe Submersion Depth:</span>
                <span className="font-mono font-bold text-purple-300">1.8 Meters (Mid-Strata)</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Ultrasonic Level Sensor:</span>
                <span className="font-mono font-bold text-amber-400">HC-SR04 Waterproof Industrial</span>
              </div>

            </div>
          </div>

          <div className="p-4 bg-sky-950/40 rounded-xl border border-sky-500/30 text-xs space-y-1">
            <span className="font-bold text-sky-300 block">Digital Twin Synchronization</span>
            <p className="text-slate-300 leading-relaxed">
              Physical fluid level is measured via ultrasonic echo timing. Sensor node sends telemetry to AWS IoT Core over TLS MQTT every 3 seconds.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
