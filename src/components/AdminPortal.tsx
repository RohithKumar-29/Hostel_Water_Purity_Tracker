import React, { useState } from 'react';
import { 
  Building2, 
  SlidersHorizontal, 
  Users, 
  ShieldCheck, 
  Save, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Globe, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ParameterThreshold } from '../types';

interface AdminPortalProps {
  thresholds: Record<string, ParameterThreshold>;
  onSaveThresholds: (newThresholds: Record<string, ParameterThreshold>) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  thresholds,
  onSaveThresholds
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'hierarchy' | 'thresholds' | 'users'>('thresholds');
  const [localThresholds, setLocalThresholds] = useState(thresholds);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleMinChange = (key: string, val: number) => {
    setLocalThresholds(prev => ({
      ...prev,
      [key]: { ...prev[key], min: val }
    }));
  };

  const handleMaxChange = (key: string, val: number) => {
    setLocalThresholds(prev => ({
      ...prev,
      [key]: { ...prev[key], max: val }
    }));
  };

  const handleSave = () => {
    onSaveThresholds(localThresholds);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Sub-Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-extrabold text-white">Administrator Portal & Rule Engine</h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure multi-tenant structures, threshold trigger rules, and role-based access controls
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubTab('thresholds')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'thresholds' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Threshold Rules</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('hierarchy')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'hierarchy' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Multi-Tenant Hierarchy</span>
          </button>

          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-3.5 py-2 font-semibold rounded-lg transition-colors flex items-center space-x-1.5 ${
              activeSubTab === 'users' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>User RBAC Access</span>
          </button>
        </div>
      </div>

      {/* Threshold Configuration Sub-Tab */}
      {activeSubTab === 'thresholds' && (
        <div className="space-y-6">
          
          {saveSuccess && (
            <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-2xl flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Threshold rules updated successfully! Safety Status engine recalculated live readings.</span>
            </div>
          )}

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Configurable Safety & Warning Threshold Rules</h3>
                <p className="text-xs text-slate-400">Adapt threshold bounds based on local regulatory standards (WHO / IS 10500 / US EPA)</p>
              </div>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save New Thresholds</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {Object.entries(localThresholds).map(([key, t]) => (
                <div key={key} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs uppercase text-sky-400">{key} Parameter</span>
                    <span className="text-[10px] font-mono text-slate-400">Unit: {t.unit}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Minimum Allowable</label>
                      <input
                        type="number"
                        step="0.1"
                        value={t.min}
                        onChange={(e) => handleMinChange(key, parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 text-white text-xs font-mono px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Maximum Allowable</label>
                      <input
                        type="number"
                        step="0.1"
                        value={t.max}
                        onChange={(e) => handleMaxChange(key, parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 text-white text-xs font-mono px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                    <span>Warning Threshold Margin:</span>
                    <span className="text-amber-400">±{t.warningMargin} {t.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Multi-Tenant Hierarchy Sub-Tab */}
      {activeSubTab === 'hierarchy' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Multi-Tenant Scalability Tree</h3>
            <p className="text-xs text-slate-400">Organization → Campus → Building → Tank → Sensor Node structure</p>
          </div>

          <div className="p-6 bg-slate-950/80 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
              <Globe className="w-5 h-5" />
              <span>KIET Group of Institutions (Organization ID: ORG-KIET-001)</span>
            </div>

            <div className="pl-6 space-y-3 border-l-2 border-slate-800">
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-purple-300 font-bold">
                  <Building2 className="w-4 h-4" />
                  <span>KIET Hostel Campus (Campus ID: CMP-HOSTEL)</span>
                </div>

                <div className="pl-6 space-y-2 border-l-2 border-slate-800/60">
                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div>
                      <span className="font-bold text-slate-200">Boys Hostel Block A</span>
                      <span className="text-slate-400 block text-[11px]">Tank 01 Overhead (25,000 L) • Sensor Node #01</span>
                    </div>
                    <span className="text-emerald-400 font-bold">🟢 Active</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div>
                      <span className="font-bold text-slate-200">Girls Hostel Block B</span>
                      <span className="text-slate-400 block text-[11px]">Tank 02 Sump (40,000 L) • Sensor Node #02</span>
                    </div>
                    <span className="text-amber-400 font-bold">🟡 Warning</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-purple-300 font-bold">
                  <Building2 className="w-4 h-4" />
                  <span>KIET Main Campus (Campus ID: CMP-MAIN)</span>
                </div>

                <div className="pl-6 border-l-2 border-slate-800/60">
                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div>
                      <span className="font-bold text-slate-200">Faculty Block C</span>
                      <span className="text-slate-400 block text-[11px]">Tank 03 Overhead (15,000 L) • Sensor Node #03</span>
                    </div>
                    <span className="text-emerald-400 font-bold">🟢 Active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* User RBAC Matrix Sub-Tab */}
      {activeSubTab === 'users' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-slate-400">Institutional user permission assignment matrix</p>
            </div>
            <button
              onClick={() => alert("Add User modal triggered.")}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Institutional User</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800 uppercase">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Organization Node</th>
                  <th className="p-3">Permissions</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">Rohit (Administrator)</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 font-bold rounded">Super Admin</span></td>
                  <td className="p-3">All Campuses</td>
                  <td className="p-3 text-emerald-400 font-mono">Full System Access</td>
                  <td className="p-3 text-right"><button className="text-sky-400 hover:underline">Edit</button></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">KIET Hostel Warden</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-sky-500/20 text-sky-300 font-bold rounded">Org Admin</span></td>
                  <td className="p-3">Hostel Campus</td>
                  <td className="p-3 text-slate-400 font-mono">View, Alert Dispatch & Reports</td>
                  <td className="p-3 text-right"><button className="text-sky-400 hover:underline">Edit</button></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">IoT Maintenance Tech #01</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-bold rounded">Technician</span></td>
                  <td className="p-3">Hostel Campus</td>
                  <td className="p-3 text-slate-400 font-mono">Sensor Calibration & Device Logs</td>
                  <td className="p-3 text-right"><button className="text-sky-400 hover:underline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
