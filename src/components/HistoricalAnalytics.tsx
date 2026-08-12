import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line,
  BarChart,
  Bar
} from 'recharts';
import type { Tank } from '../types';

interface HistoricalAnalyticsProps {
  selectedTank: Tank;
}

export const HistoricalAnalytics: React.FC<HistoricalAnalyticsProps> = ({ selectedTank }) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [selectedParameter, setSelectedParameter] = useState<string>('all');

  const data24h = [
    { time: '00:00', ph: 7.1, tds: 265, temp: 25.2, turbidity: 1.1, level: 88, flow: 12 },
    { time: '04:00', ph: 7.15, tds: 268, temp: 24.8, turbidity: 1.0, level: 92, flow: 8 },
    { time: '08:00', ph: 7.22, tds: 275, temp: 25.8, turbidity: 1.3, level: 82, flow: 54 },
    { time: '12:00', ph: 7.2, tds: 280, temp: 26.4, turbidity: 1.2, level: 75, flow: 48 },
    { time: '16:00', ph: 7.18, tds: 278, temp: 27.0, turbidity: 1.2, level: 84, flow: 38 },
    { time: '20:00', ph: 7.19, tds: 282, temp: 26.1, turbidity: 1.1, level: 86, flow: 28 },
    { time: '23:59', ph: 7.2, tds: 280, temp: 26.4, turbidity: 1.2, level: 84, flow: 42.5 },
  ];

  const data7d = [
    { time: 'Mon', ph: 7.1, tds: 260, temp: 25.5, turbidity: 1.0, level: 85, flow: 40 },
    { time: 'Tue', ph: 7.12, tds: 265, temp: 25.8, turbidity: 1.1, level: 82, flow: 42 },
    { time: 'Wed', ph: 7.18, tds: 270, temp: 26.0, turbidity: 1.2, level: 88, flow: 45 },
    { time: 'Thu', ph: 7.2, tds: 275, temp: 26.2, turbidity: 1.3, level: 90, flow: 44 },
    { time: 'Fri', ph: 7.22, tds: 278, temp: 26.5, turbidity: 1.2, level: 86, flow: 48 },
    { time: 'Sat', ph: 7.19, tds: 280, temp: 26.3, turbidity: 1.1, level: 84, flow: 38 },
    { time: 'Sun', ph: 7.2, tds: 280, temp: 26.4, turbidity: 1.2, level: 84, flow: 42.5 },
  ];

  const data30d = [
    { time: 'Week 1', ph: 7.08, tds: 255, temp: 25.0, turbidity: 0.9, level: 86, flow: 39 },
    { time: 'Week 2', ph: 7.14, tds: 264, temp: 25.6, turbidity: 1.0, level: 88, flow: 41 },
    { time: 'Week 3', ph: 7.18, tds: 272, temp: 26.1, turbidity: 1.2, level: 85, flow: 43 },
    { time: 'Week 4', ph: 7.2, tds: 280, temp: 26.4, turbidity: 1.2, level: 84, flow: 42.5 },
  ];

  const chartData = timeRange === '24h' ? data24h : timeRange === '7d' ? data7d : data30d;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Analytics Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-extrabold text-white">Historical Water Quality Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing telemetry trends for <span className="font-bold text-slate-200">{selectedTank.name}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setTimeRange('24h')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                timeRange === '24h' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              24 Hours
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                timeRange === '7d' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                timeRange === '30d' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              30 Days
            </button>
          </div>

          {/* Parameter Filter */}
          <select
            value={selectedParameter}
            onChange={(e) => setSelectedParameter(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-800 focus:outline-none"
          >
            <option value="all">All Combined Parameters</option>
            <option value="ph">pH Index</option>
            <option value="tds">TDS (Total Dissolved Solids)</option>
            <option value="turbidity">Turbidity (NTU)</option>
            <option value="temp">Temperature (°C)</option>
          </select>
        </div>
      </div>

      {/* Main Multi-Line Recharts Chart */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Multi-Parameter Telemetry Curve ({timeRange.toUpperCase()})</h3>
            <p className="text-xs text-slate-400">Continuous telemetry dataset with safe threshold boundaries</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center text-sky-400"><span className="w-3 h-3 bg-sky-400 rounded-full mr-1.5"></span>TDS (ppm)</span>
            <span className="flex items-center text-emerald-400"><span className="w-3 h-3 bg-emerald-400 rounded-full mr-1.5"></span>pH (x10)</span>
            <span className="flex items-center text-amber-400"><span className="w-3 h-3 bg-amber-400 rounded-full mr-1.5"></span>Turbidity (x100)</span>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tdsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="tds" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#tdsGrad)" name="TDS (ppm)" />
              <Area type="monotone" dataKey="level" stroke="#818cf8" strokeWidth={2} fillOpacity={0.2} fill="#818cf8" name="Tank Level (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Specialized Sub-Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* pH Index Detailed Trend */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-white">pH Acidity/Alkalinity Stability</h4>
            <span className="text-xs font-mono text-emerald-400 font-bold">Target: 6.5 - 8.5 pH</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[6.0, 9.0]} stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="ph" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', r: 4 }} name="pH Level" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Level vs Flow Rate Comparison */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-white">Reservoir Volume vs Flow Rate (L/min)</h4>
            <span className="text-xs font-mono text-sky-400 font-bold">Capacity: 25,000 L</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                <Bar dataKey="flow" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Discharge Rate (L/min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
