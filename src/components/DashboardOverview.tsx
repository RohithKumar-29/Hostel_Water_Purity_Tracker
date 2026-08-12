import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  Activity, 
  Droplets, 
  Gauge, 
  Zap, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Tank, Alert, SafetyStatus } from '../types';

interface DashboardOverviewProps {
  tanks: Tank[];
  selectedTank: Tank;
  alerts: Alert[];
  onSelectTab: (tab: any) => void;
  isDemoMode: boolean;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  tanks,
  selectedTank,
  alerts,
  onSelectTab,
  isDemoMode
}) => {
  const getStatusBadge = (status: SafetyStatus) => {
    switch (status) {
      case 'SAFE':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>🟢 SAFE</span>
          </span>
        );
      case 'WARNING':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>🟡 WARNING</span>
          </span>
        );
      case 'DANGER':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center space-x-1 animate-pulse">
            <XCircle className="w-3.5 h-3.5" />
            <span>🔴 DANGER</span>
          </span>
        );
    }
  };

  const parameters = Object.values(selectedTank.readings);
  const safeCount = parameters.filter(p => p.status === 'SAFE').length;
  const warningCount = parameters.filter(p => p.status === 'WARNING').length;
  const dangerCount = parameters.filter(p => p.status === 'DANGER').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Alert if Warning or Danger */}
      {alerts.length > 0 && (
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-amber-300 text-sm">System Warning Active</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/30">
                  {alerts[0].timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {alerts[0].message}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('alerts')}
            className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/40 transition-colors shrink-0"
          >
            Review Alerts ({alerts.length}) →
          </button>
        </div>
      )}

      {/* Main Executive Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Safety Score & Overall Status */}
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck className="w-32 h-32 text-sky-400" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Water Safety Index
              </span>
              {getStatusBadge(selectedTank.status)}
            </div>

            <div className="flex items-baseline space-x-3 mb-2">
              <span className="text-5xl font-black tracking-tight text-white font-mono">
                {selectedTank.safetyScore}
              </span>
              <span className="text-xl font-bold text-slate-400">/ 100</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-0.5" /> +2.1%
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Evaluated across <span className="font-semibold text-sky-300">8 chemical & physical parameters</span> against WHO / IS 10500 standards.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-3 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Optimal</span>
              <span className="font-bold text-emerald-400">{safeCount}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Warning</span>
              <span className="font-bold text-amber-400">{warningCount}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Critical</span>
              <span className="font-bold text-rose-400">{dangerCount}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Tank Level & Flow Overview */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Node: {selectedTank.name}
              </span>
              <span className="text-[11px] font-mono text-slate-400 flex items-center">
                <RefreshCw className={`w-3 h-3 mr-1 ${isDemoMode ? 'animate-spin text-sky-400' : ''}`} />
                {selectedTank.lastUpdated}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Reservoir Water Level</span>
                  <span className="text-sky-400 font-mono">{selectedTank.currentLevelPercent}% ({selectedTank.capacityLiters * selectedTank.currentLevelPercent / 100} L)</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div 
                    className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${selectedTank.currentLevelPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Flow Rate</span>
                  <span className="text-lg font-bold text-white font-mono">{selectedTank.flowRateLpm} L/min</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Capacity</span>
                  <span className="text-lg font-bold text-white font-mono">{selectedTank.capacityLiters.toLocaleString()} L</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Location: {selectedTank.building}</span>
            <button
              onClick={() => onSelectTab('digital-twin')}
              className="text-sky-400 font-semibold hover:underline flex items-center"
            >
              Inspect 3D Twin →
            </button>
          </div>
        </div>

        {/* Card 3: AI Intelligence Early Warning Card */}
        <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-sky-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  AquaSense AI Insight
                </span>
              </div>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded border border-sky-500/30">
                PREDICTIVE
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mb-2">
              Gradual TDS Elevation Pattern Detected
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              "TDS concentration in Girls Hostel Sump has shown a +8.4% upward trajectory over the last 72 hours. Water remains within 100% safe bounds, but filter flushing is recommended within 24h."
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">AI Confidence Score:</span>
              <span className="font-mono font-bold text-emerald-400">94.2%</span>
            </div>
            <button
              onClick={() => onSelectTab('ai-assistant')}
              className="w-full py-2 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Ask AquaSense AI Assistant</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Monitored Sensor Parameters Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Real-Time Sensor Telemetry</h3>
            <p className="text-xs text-slate-400">Live IoT stream from Probe Node #01 ({selectedTank.name})</p>
          </div>
          <button
            onClick={() => onSelectTab('live-monitoring')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center space-x-1"
          >
            <span>View All Sensor Cards</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {parameters.map((p) => {
            const isSafe = p.status === 'SAFE';
            const isWarn = p.status === 'WARNING';
            
            return (
              <div 
                key={p.key}
                className="glass-card glass-card-hover rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 truncate max-w-[140px]" title={p.name}>
                    {p.name}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isSafe ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    isWarn ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {p.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                      {p.value}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{p.unit}</span>
                  </div>

                  {/* Sparkline Visual Simulation */}
                  <div className="flex items-end space-x-1 h-6">
                    {p.history.map((val, idx) => {
                      const maxVal = Math.max(...p.history);
                      const minVal = Math.min(...p.history);
                      const range = (maxVal - minVal) || 1;
                      const pct = Math.max(20, Math.min(100, ((val - minVal) / range) * 100));
                      return (
                        <div 
                          key={idx}
                          className={`w-1 rounded-t ${isSafe ? 'bg-sky-400' : 'bg-amber-400'}`}
                          style={{ height: `${pct}%` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Range: {p.normalRange}</span>
                  <span className="font-semibold text-slate-300 capitalize">{p.trend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Tank Quick Switch Grid */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Institutional Tanks Monitored ({tanks.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tanks.map((tank) => (
            <div 
              key={tank.id}
              onClick={() => onSelectTab('live-monitoring')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                tank.id === selectedTank.id 
                  ? 'bg-sky-950/40 border-sky-500/50 shadow-lg shadow-sky-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{tank.name}</span>
                {getStatusBadge(tank.status)}
              </div>
              <p className="text-xs text-slate-400 mb-3">{tank.building}</p>
              <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                <span>Score: {tank.safetyScore}/100</span>
                <span>Level: {tank.currentLevelPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
