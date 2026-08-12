import React from 'react';
import { 
  Building2, 
  ArrowRight, 
  Droplets,
  Cpu,
  BrainCircuit
} from 'lucide-react';

export const KIETPilotPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Pilot Banner */}
      <div className="glass-card p-8 rounded-3xl border border-sky-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-sky-500/20 text-sky-300 font-mono text-xs font-bold rounded-full border border-sky-500/30">
              INITIAL DEPLOYMENT CASE STUDY
            </span>
            <span className="text-xs text-slate-400 font-mono">Ghaziabad, Uttar Pradesh</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
            KIET Hostel — Smart Water Quality & Safety Telemetry Pilot
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            AquaScence was initially deployed at KIET Group of Institutions to solve institutional drinking water safety challenges, protect 2,400+ resident students across 3 major hostel blocks, and demonstrate continuous automated IoT water monitoring.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-sans">Resident Students</span>
              <span className="text-xl font-bold text-white">2,400+</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-sans">Monitored Tanks</span>
              <span className="text-xl font-bold text-sky-400">3 Reservoirs</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-sans">Telemetry Uptime</span>
              <span className="text-xl font-bold text-emerald-400">100.0%</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-sans">Daily Safe Water</span>
              <span className="text-xl font-bold text-cyan-300">80,000 L</span>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Pipeline (Problem -> Solution) */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white">Implementation Architecture Journey</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase text-rose-400 font-mono">01. The Challenge</span>
            <h3 className="font-bold text-sm text-white">Manual Water Testing Delays</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Institutional hostels traditionally rely on periodic manual water sampling, leaving long unmonitored gaps where contamination, sudden TDS spikes, or pH imbalances could affect student health undetected.
            </p>
          </div>

          <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase text-sky-400 font-mono">02. IoT Hardware Deployment</span>
            <h3 className="font-bold text-sm text-white">AquaNode Multi-Parameter Probes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submerged high-precision probes into Main Overhead Tank 01, Girls Hostel Sump 02, and Faculty Block C Tank. ESP32 microcontrollers stream pH, TDS, Turbidity, and ORP data every 3 seconds.
            </p>
          </div>

          <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-400 font-mono">03. Real-Time Impact</span>
            <h3 className="font-bold text-sm text-white">Instant Safety Alerts & Early Detection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hostel wardens and maintenance engineers receive instant dashboard alerts. In August 2026, an automated TDS drift alert enabled maintenance to back-wash RO filters prior to threshold violation.
            </p>
          </div>

        </div>
      </div>

      {/* Visual System Architecture Diagram */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">KIET Pilot IoT Network Diagram</h3>

        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-center">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 w-full md:w-auto">
            <Droplets className="w-6 h-6 text-sky-400 mx-auto mb-1" />
            <span className="font-bold text-white block">Hostel Tanks</span>
            <span className="text-[10px] text-slate-400">80k L Total</span>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 w-full md:w-auto">
            <Cpu className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <span className="font-bold text-white block">ESP32 Nodes</span>
            <span className="text-[10px] text-slate-400">TLS MQTT</span>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 w-full md:w-auto">
            <BrainCircuit className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <span className="font-bold text-white block">AquaScence Engine</span>
            <span className="text-[10px] text-slate-400">AI Trajectory</span>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-600 hidden md:block" />

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 w-full md:w-auto">
            <Building2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
            <span className="font-bold text-white block">KIET Management</span>
            <span className="text-[10px] text-slate-400">Warden Portal</span>
          </div>
        </div>
      </div>

    </div>
  );
};
