import React from 'react';

export const RoadmapPage: React.FC = () => {
  const phases = [
    {
      num: 'Phase 1',
      title: 'Real-Time IoT Water Monitoring',
      status: 'completed',
      desc: 'Deployment of multi-parameter sensors (pH, TDS, Temp, Turbidity) with 3-second live telemetry streaming.',
      date: 'Q1 2026'
    },
    {
      num: 'Phase 2',
      title: 'Cloud Telemetry & Analytics Platform',
      status: 'completed',
      desc: 'Scalable PostgreSQL cloud database, historical trend graphs, and multi-tenant organization tree.',
      date: 'Q2 2026'
    },
    {
      num: 'Phase 3',
      title: 'AI Anomaly Detection Pipeline',
      status: 'in-progress',
      desc: 'Machine learning model isolating sensor electrode drift from physical water contamination events.',
      date: 'Q3 2026'
    },
    {
      num: 'Phase 4',
      title: 'Predictive Filter Maintenance',
      status: 'in-progress',
      desc: 'Automated maintenance scheduling based on bio-fouling rates and optical lens degradation.',
      date: 'Q4 2026'
    },
    {
      num: 'Phase 5',
      title: 'Multi-Campus Institutional Expansion',
      status: 'upcoming',
      desc: 'Scaling to 50+ college campuses, university hostels, and residential apartment complexes across NCR.',
      date: 'Q1 2027'
    },
    {
      num: 'Phase 6',
      title: 'Commercial Enterprise SaaS Launch',
      status: 'upcoming',
      desc: 'Turnkey hardware-as-a-service (HaaS) + subscription monitoring for hospitals, hotels & factories.',
      date: 'Q2 2027'
    },
    {
      num: 'Phase 7',
      title: 'Large-Scale City Water Intelligence Network',
      status: 'upcoming',
      desc: 'Smart municipal integration linking private institutional tanks into city-wide water safety grid.',
      date: 'Q4 2027'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-white">AquaScence Strategic Technology Roadmap</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded uppercase">
              Phase 3 Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            From KIET Hostel pilot installation to nationwide institutional water safety network
          </p>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="relative border-l-2 border-slate-800 pl-6 space-y-8 ml-3">
          {phases.map((p, idx) => {
            const isCompleted = p.status === 'completed';
            const isInProgress = p.status === 'in-progress';

            return (
              <div key={idx} className="relative group">
                {/* Bullet Node */}
                <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isCompleted ? 'bg-emerald-500 border-emerald-400 text-white' :
                  isInProgress ? 'bg-sky-500 border-sky-400 animate-pulse' :
                  'bg-slate-900 border-slate-700'
                }`}></div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-sky-400 uppercase">{p.num}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isCompleted ? 'bg-emerald-500/20 text-emerald-300' :
                      isInProgress ? 'bg-sky-500/20 text-sky-300' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {p.status}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">• {p.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
