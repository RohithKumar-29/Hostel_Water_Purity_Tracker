import React from 'react';
import { 
  Droplets, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Activity, 
  Globe
} from 'lucide-react';
import type { UserContext, UserRole } from '../types';

interface HeaderProps {
  user: UserContext;
  setUserRole: (role: UserRole) => void;
  selectedTankId: string;
  setSelectedTankId: (id: string) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  viewMode: 'app' | 'landing';
  setViewMode: (mode: 'app' | 'landing') => void;
  unreadAlertCount: number;
  onOpenAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  setUserRole,
  selectedTankId,
  setSelectedTankId,
  isDemoMode,
  setIsDemoMode,
  viewMode,
  setViewMode,
  unreadAlertCount,
  onOpenAlerts
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between">
        
        {/* Brand Logo & View Switcher */}
        <div className="flex items-center space-x-6">
          <div 
            onClick={() => setViewMode('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Droplets className="w-6 h-6 text-white animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
                  AquaScence
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded">
                  v2.4 IoT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium">
                Smart Water Intelligence
              </p>
            </div>
          </div>

          {/* Landing / App Navigation Button */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('landing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
                viewMode === 'landing' 
                  ? 'bg-sky-600 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </button>
            <button
              onClick={() => setViewMode('app')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
                viewMode === 'app' 
                  ? 'bg-sky-600 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Live Platform</span>
            </button>
          </div>
        </div>

        {/* Center Tenant Location Selector (App Mode) */}
        {viewMode === 'app' && (
          <div className="hidden lg:flex items-center space-x-3 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800">
            <Building2 className="w-4 h-4 text-sky-400" />
            <div className="text-xs">
              <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">Hierarchy Node</span>
              <select
                value={selectedTankId}
                onChange={(e) => setSelectedTankId(e.target.value)}
                className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer pr-2 text-xs"
              >
                <option value="tank-kiet-01" className="bg-slate-900 text-slate-200">
                  KIET Hostel • Boys Block A (Tank 01)
                </option>
                <option value="tank-kiet-02" className="bg-slate-900 text-slate-200">
                  KIET Hostel • Girls Block B (Sump 02)
                </option>
                <option value="tank-kiet-03" className="bg-slate-900 text-slate-200">
                  KIET Campus • Faculty Block C (Tank 03)
                </option>
              </select>
            </div>
          </div>
        )}

        {/* Right Tools & Settings */}
        <div className="flex items-center space-x-3">
          
          {/* Demo Mode Toggle */}
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="relative flex h-2.5 w-2.5">
              {isDemoMode ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-500"></span>
              )}
            </span>
            <span className="text-xs font-medium text-slate-300">
              {isDemoMode ? 'Demo Telemetry' : 'Static Mode'}
            </span>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`ml-1 text-[11px] px-2 py-0.5 rounded font-semibold transition-colors ${
                isDemoMode
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isDemoMode ? 'ACTIVE' : 'PAUSED'}
            </button>
          </div>

          {/* Role Switcher Pill */}
          <div className="hidden xl:flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Role:</span>
            <select
              value={user.role}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="bg-transparent text-sky-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Super Admin" className="bg-slate-900">Super Admin</option>
              <option value="Organization Admin" className="bg-slate-900">Org Admin</option>
              <option value="Manager" className="bg-slate-900">Campus Manager</option>
              <option value="Technician" className="bg-slate-900">IoT Technician</option>
              <option value="Viewer" className="bg-slate-900">Viewer</option>
            </select>
          </div>

          {/* Alert Notification Bell */}
          <button
            onClick={onOpenAlerts}
            className="relative p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-900 rounded-xl transition-colors"
            title="System Alerts"
          >
            <Bell className="w-5 h-5" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadAlertCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <div className="font-semibold text-slate-200">{user.name}</div>
              <div className="text-[10px] text-slate-400">{user.organization}</div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
