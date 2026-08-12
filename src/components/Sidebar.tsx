import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  LineChart, 
  Bell as BellIcon, 
  BrainCircuit, 
  Box, 
  Bot, 
  ShieldAlert, 
  Cpu, 
  FileText, 
  UserPlus, 
  GraduationCap, 
  Map,
  Layers,
  Sparkles
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard'
  | 'live-monitoring'
  | 'analytics'
  | 'alerts'
  | 'ai-intelligence'
  | 'digital-twin'
  | 'ai-assistant'
  | 'admin'
  | 'device-health'
  | 'reports'
  | 'onboarding'
  | 'kiet-pilot'
  | 'roadmap';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  alertCount
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, category: 'Core Platform' },
    { id: 'live-monitoring', label: 'Live Monitoring', icon: Activity, category: 'Core Platform' },
    { id: 'analytics', label: 'Historical Analytics', icon: LineChart, category: 'Core Platform' },
    { id: 'alerts', label: 'Alert Center', icon: Layers, category: 'Core Platform', badge: alertCount },
    
    { id: 'ai-intelligence', label: 'AI Risk Intelligence', icon: BrainCircuit, category: 'Advanced AI' },
    { id: 'digital-twin', label: '3D Digital Twin', icon: Box, category: 'Advanced AI', isNew: true },
    { id: 'ai-assistant', label: 'AquaSense AI', icon: Bot, category: 'Advanced AI', highlight: true },

    { id: 'admin', label: 'Admin & Thresholds', icon: ShieldAlert, category: 'Management' },
    { id: 'device-health', label: 'IoT Device Health', icon: Cpu, category: 'Management' },
    { id: 'reports', label: 'Report Generator', icon: FileText, category: 'Management' },

    { id: 'onboarding', label: 'Onboarding Wizard', icon: UserPlus, category: 'Enterprise' },
    { id: 'kiet-pilot', label: 'KIET Hostel Pilot', icon: GraduationCap, category: 'Enterprise' },
    { id: 'roadmap', label: 'Product Roadmap', icon: Map, category: 'Enterprise' },
  ];

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <aside className="w-64 bg-slate-950/90 border-r border-slate-800/80 flex flex-col h-[calc(100vh-65px)] overflow-y-auto shrink-0 select-none">
      <div className="p-4 space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-1">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
              <span>{category}</span>
            </div>
            
            {menuItems
              .filter(item => item.category === category)
              .map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold shadow-lg shadow-sky-500/20'
                        : item.highlight
                        ? 'text-sky-300 bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-sky-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {item.badge && item.badge > 0 ? (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      ) : null}

                      {item.isNew && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded uppercase">
                          3D
                        </span>
                      )}

                      {item.highlight && !isActive && (
                        <Sparkles className="w-3 h-3 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      {/* Pilot Case Badge at bottom */}
      <div className="mt-auto p-4 border-t border-slate-800/80">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
            <span>KIET Pilot Status</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2">
            Monitoring 3 Hostel Tanks serving 2,400+ students.
          </p>
          <button
            onClick={() => setActiveTab('kiet-pilot')}
            className="w-full text-center text-[11px] font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            View Live Case Study →
          </button>
        </div>
      </div>
    </aside>
  );
};
