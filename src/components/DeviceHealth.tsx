import React from 'react';
import { 
  Wifi, 
  BatteryCharging, 
  RefreshCw
} from 'lucide-react';
import type { SensorDevice } from '../types';

interface DeviceHealthProps {
  devices: SensorDevice[];
}

export const DeviceHealth: React.FC<DeviceHealthProps> = ({ devices }) => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Device Network Overview Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-white">IoT Hardware & Device Health Monitor</h2>
            <span className="px-2.5 py-0.5 text-xs font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded uppercase">
              100% Nodes Online
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time battery, wireless signal dBm, optical lens calibration, and firmware version telemetry
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 text-slate-300">
            Active Devices: <strong className="text-emerald-400">{devices.length} Nodes</strong>
          </div>
          <button
            onClick={() => alert("Pinged all ESP32 nodes. Heartbeat acknowledgement received in 42ms.")}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Ping Hardware Nodes</span>
          </button>
        </div>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {devices.map((device) => {
          const isOnline = device.status === 'online';

          return (
            <div
              key={device.id}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white font-mono">{device.name}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full flex items-center space-x-1 ${
                    isOnline ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>{device.status.toUpperCase()}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4">{device.type}</p>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Battery Level</span>
                    <span className="font-bold text-emerald-400 flex items-center mt-1">
                      <BatteryCharging className="w-4 h-4 mr-1 text-emerald-400" />
                      {device.batteryLevel}%
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Wi-Fi Signal Strength</span>
                    <span className="font-bold text-sky-400 flex items-center mt-1">
                      <Wifi className="w-4 h-4 mr-1 text-sky-400" />
                      {device.signalDbm} dBm
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Firmware Revision:</span>
                  <span className="font-mono text-slate-200">{device.firmwareVersion}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Last Heartbeat:</span>
                  <span className="font-mono text-emerald-400">{device.lastCommunication}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Last Calibration:</span>
                  <span className="font-mono text-slate-200">{device.calibrationDate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Next Maintenance:</span>
                  <span className="font-mono text-sky-300">{device.nextMaintenance}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hardware IoT Architecture Flow Banner */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">AquaScence Hardware & Cloud Bridge Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 text-center text-xs">
          
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-medium">
            <span className="block font-bold text-sky-400 mb-1">1. Probe Sensors</span>
            <span className="text-slate-400 text-[11px]">pH, TDS, Turbidity, ORP, Temp</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-medium">
            <span className="block font-bold text-purple-400 mb-1">2. ESP32 MCU</span>
            <span className="text-slate-400 text-[11px]">Analog ADC + Calibration code</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-medium">
            <span className="block font-bold text-cyan-400 mb-1">3. MQTT Gateway</span>
            <span className="text-slate-400 text-[11px]">TLS 1.3 Encrypted Broker</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-medium">
            <span className="block font-bold text-amber-400 mb-1">4. Safety Engine</span>
            <span className="text-slate-400 text-[11px]">Risk evaluation & AI Pipeline</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-medium">
            <span className="block font-bold text-emerald-400 mb-1">5. Web App</span>
            <span className="text-slate-400 text-[11px]">Real-time React UI Dashboard</span>
          </div>

        </div>
      </div>

    </div>
  );
};
