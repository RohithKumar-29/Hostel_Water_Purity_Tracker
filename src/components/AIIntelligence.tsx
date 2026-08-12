import React from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  Zap,
  Activity,
  Cpu,
  Database
} from 'lucide-react';
import type { AIPrediction, Tank } from '../types';

interface AIIntelligenceProps {
  predictions: AIPrediction[];
  selectedTank: Tank;
}

export const AIIntelligence: React.FC<AIIntelligenceProps> = ({ predictions, selectedTank }) => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit className="w-48 h-48 text-sky-400" />
        </div>

        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
            <h2 className="text-xl font-extrabold text-white">AquaSense Predictive AI Intelligence Layer</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded uppercase">
              ML Pipeline Active
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Continuous multi-sensor trajectory analysis, anomaly detection, bio-fouling risk modeling, and predictive maintenance schedules for institutional water safety.
          </p>

          <div className="flex items-center space-x-6 pt-3 text-xs font-mono">
            <div className="flex items-center space-x-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Model Accuracy: 96.8%</span>
            </div>
            <div className="flex items-center space-x-1.5 text-sky-300">
              <Database className="w-4 h-4" />
              <span>1.2M Telemetry Vectors Evaluated</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Predictions & Anomaly Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictions.map((pred) => {
          const isHigh = pred.impactLevel === 'high';
          const isMed = pred.impactLevel === 'medium';

          return (
            <div
              key={pred.id}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                    pred.type === 'trend' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                    pred.type === 'maintenance' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {pred.type} Insight
                  </span>
                  
                  <span className="text-xs font-mono font-bold text-sky-400">
                    {pred.confidence}% Confidence
                  </span>
                </div>

                <h3 className="font-bold text-base text-white mb-2 leading-snug">
                  {pred.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {pred.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    AI Recommended Action
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {pred.recommendation}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Evaluated: {pred.timestamp}</span>
                  <span className={`font-semibold capitalize ${
                    isHigh ? 'text-rose-400' : isMed ? 'text-amber-400' : 'text-slate-300'
                  }`}>
                    Impact: {pred.impactLevel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Anomaly Detection Pipeline Architecture */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">AquaSense Anomaly Detection & Prevention Engine</h3>
        <p className="text-xs text-slate-400">How AI protects institutional drinking water before failures occur</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <div className="p-2 bg-sky-500/10 text-sky-400 w-fit rounded-lg">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-white">1. High-Freq Telemetry</h4>
            <p className="text-[11px] text-slate-400">Streams pH, TDS, Turbidity & ORP at 3-second intervals.</p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <div className="p-2 bg-purple-500/10 text-purple-400 w-fit rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-white">2. Feature Extraction</h4>
            <p className="text-[11px] text-slate-400">Calculates rolling variances, derivative rates & cross-correlations.</p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <div className="p-2 bg-amber-500/10 text-amber-400 w-fit rounded-lg">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-white">3. Anomaly Isolation</h4>
            <p className="text-[11px] text-slate-400">Separates physical water changes from sensor electrode drift.</p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 w-fit rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-white">4. Early Action Trigger</h4>
            <p className="text-[11px] text-slate-400">Dispatches preventive alerts to engineers before thresholds break.</p>
          </div>

        </div>
      </div>

    </div>
  );
};
