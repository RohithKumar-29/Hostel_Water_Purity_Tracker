import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sliders, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Clock,
  FlaskConical,
  Gauge,
  Thermometer,
  Eye,
  Waves,
  Zap
} from 'lucide-react';
import type { Tank, SafetyStatus } from '../types';

interface LiveMonitoringProps {
  selectedTank: Tank;
  isDemoMode: boolean;
  onEditThresholds: () => void;
}

export const LiveMonitoring: React.FC<LiveMonitoringProps> = ({
  selectedTank,
  onEditThresholds
}) => {
  const [selectedSensorKey, setSelectedSensorKey] = useState<string | null>(null);

  const getSensorIcon = (key: string) => {
    switch (key) {
      case 'ph': return <FlaskConical className="w-5 h-5 text-purple-400" />;
      case 'tds': return <Gauge className="w-5 h-5 text-sky-400" />;
      case 'temperature': return <Thermometer className="w-5 h-5 text-rose-400" />;
      case 'turbidity': return <Eye className="w-5 h-5 text-amber-400" />;
      case 'conductivity': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'orp': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'waterLevel': return <Waves className="w-5 h-5 text-blue-400" />;
      case 'flowRate': return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      default: return <Activity className="w-5 h-5 text-sky-400" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-amber-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getStatusBadge = (status: SafetyStatus) => {
    switch (status) {
      case 'SAFE':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SAFE</span>
          </span>
        );
      case 'WARNING':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>WARNING</span>
          </span>
        );
      case 'DANGER':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center space-x-1 animate-pulse">
            <XCircle className="w-3.5 h-3.5" />
            <span>DANGER</span>
          </span>
        );
    }
  };

  const readings = Object.values(selectedTank.readings);
  const activeDetailSensor = selectedSensorKey ? selectedTank.readings[selectedSensorKey] : null;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-white">Live Sensor Array Telemetry</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded uppercase">
              Probe Node #01
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active Tank: <span className="font-bold text-slate-200">{selectedTank.name}</span> ({selectedTank.building})
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onEditThresholds}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center space-x-2"
          >
            <Sliders className="w-4 h-4 text-sky-400" />
            <span>Configure Thresholds</span>
          </button>
          
          <div className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Sync Rate:</span>
            <span className="font-mono font-bold text-emerald-400">3.0 sec</span>
          </div>
        </div>
      </div>

      {/* Sensor Parameter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {readings.map((sensor) => {
          const isSelected = selectedSensorKey === sensor.key;

          return (
            <div
              key={sensor.key}
              onClick={() => setSelectedSensorKey(sensor.key)}
              className={`glass-card glass-card-hover rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected 
                  ? 'border-sky-500 shadow-xl shadow-sky-500/10 bg-slate-900/90' 
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    {getSensorIcon(sensor.key)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white tracking-tight">{sensor.name}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">ID: {sensor.id}</span>
                  </div>
                </div>
                {getStatusBadge(sensor.status)}
              </div>

              {/* Card Value Display */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-3xl font-black text-white font-mono tracking-tight">
                    {sensor.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 ml-1.5">{sensor.unit}</span>
                </div>

                <div className="flex items-center space-x-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
                  {getTrendIcon(sensor.trend)}
                  <span className="text-slate-300 font-semibold capitalize text-[11px]">{sensor.trend}</span>
                </div>
              </div>

              {/* Sparkline & Range Bar */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Normal Standard:</span>
                  <span className="font-mono text-slate-200">{sensor.normalRange}</span>
                </div>

                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      sensor.status === 'SAFE' ? 'bg-gradient-to-r from-sky-400 to-emerald-400' :
                      sensor.status === 'WARNING' ? 'bg-amber-400' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(15, (sensor.value / (parseFloat(sensor.normalRange.split('-')[1]) || sensor.value * 1.5)) * 100))}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pt-1">
                  {sensor.description}
                </p>
              </div>

              <div className="text-[10px] text-slate-500 font-mono text-right pt-1">
                Updated: {sensor.lastUpdated}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Sensor Deep Dive Modal / Detail Panel */}
      {activeDetailSensor && (
        <div className="glass-card rounded-2xl p-6 border-sky-500/40 bg-gradient-to-br from-slate-900 to-sky-950/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-sky-500/20 rounded-xl text-sky-400 border border-sky-500/30">
                {getSensorIcon(activeDetailSensor.key)}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{activeDetailSensor.name} — Technical Telemetry Detail</h3>
                <p className="text-xs text-slate-400">Sensor Hardware ID: {activeDetailSensor.id} • Probe Location: In-Line Submersible</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSensorKey(null)}
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 bg-slate-800 rounded-lg"
            >
              Close Detail ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Configured Safety Range</span>
              <span className="text-xl font-bold font-mono text-sky-300">{activeDetailSensor.normalRange}</span>
              <p className="text-xs text-slate-400">WHO Drinking Water Guidelines (IS 10500 Compliant)</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold block">7-Sample Rolling Values</span>
              <div className="flex items-center space-x-1.5 font-mono text-xs text-emerald-400 font-bold">
                {activeDetailSensor.history.map((v, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800">{v}</span>
                ))}
              </div>
              <p className="text-xs text-slate-400">3-second moving window telemetry log</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Sensor Calibration Status</span>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-slate-200">100% Calibrated</span>
              </div>
              <p className="text-xs text-slate-400">Next scheduled maintenance in 76 days</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
