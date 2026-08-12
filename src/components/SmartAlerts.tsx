import React, { useState } from 'react';
import { 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Bell, 
  Mail, 
  Smartphone, 
  MessageSquare, 
  SlidersHorizontal,
  Trash2,
  Check,
  ShieldAlert,
  Send
} from 'lucide-react';
import type { Alert } from '../types';

interface SmartAlertsProps {
  alerts: Alert[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onOpenThresholds: () => void;
}

export const SmartAlerts: React.FC<SmartAlertsProps> = ({
  alerts,
  onMarkAsRead,
  onClearAll,
  onOpenThresholds
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'channels'>('active');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Alert Center Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-white">Smart Alert & Safety Dispatch Center</h2>
            {alerts.filter(a => !a.read).length > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-500 text-white rounded-full">
                {alerts.filter(a => !a.read).length} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time threshold breaches, sensor anomalies, and automated alert dispatch logs
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                activeTab === 'active' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Alert Log ({alerts.length})
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
                activeTab === 'channels' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dispatch Channels
            </button>
          </div>

          <button
            onClick={onOpenThresholds}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-sky-400" />
            <span>Threshold Rules</span>
          </button>
        </div>
      </div>

      {activeTab === 'active' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Security & Quality Notifications
            </span>
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-400 hover:text-rose-400 flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Alerts</span>
            </button>
          </div>

          {alerts.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">All Systems Operational & Safe</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No active threshold violations or sensor anomalies detected. Water quality parameters are within WHO / IS 10500 optimal bounds.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => {
                const isCritical = alert.severity === 'critical';
                const isWarning = alert.severity === 'warning';

                return (
                  <div
                    key={alert.id}
                    className={`glass-card p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      !alert.read ? 'border-sky-500/50 bg-slate-900/90' : 'border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                        isCritical ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        isWarning ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      }`}>
                        {isCritical ? <XCircle className="w-6 h-6 animate-pulse" /> :
                         isWarning ? <AlertTriangle className="w-6 h-6" /> :
                         <Bell className="w-6 h-6" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isCritical ? 'bg-rose-500/20 text-rose-300' :
                            isWarning ? 'bg-amber-500/20 text-amber-300' :
                            'bg-sky-500/20 text-sky-300'
                          }`}>
                            {alert.severity}
                          </span>
                          <span className="text-xs font-bold text-white">{alert.title}</span>
                          <span className="text-[11px] text-slate-400 font-mono">• {alert.timestamp}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {alert.message}
                        </p>

                        <div className="flex items-center space-x-4 text-[11px] text-slate-400 pt-1 font-mono">
                          <span>Location: <strong className="text-slate-200">{alert.tankName}</strong></span>
                          <span>Registered Value: <strong className="text-amber-400">{alert.value}</strong></span>
                          <span>Limit: <strong className="text-slate-300">{alert.threshold}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
                      {!alert.read && (
                        <button
                          onClick={() => onMarkAsRead(alert.id)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center space-x-1"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Mark Read</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Dispatch Channels Architecture */
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Multi-Channel Alert Dispatch Architecture</h3>
            <p className="text-xs text-slate-400">Configure instant notification pathways for emergency water safety alerts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email Dispatch */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Email Gateway (SMTP / SES)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Sends detailed executive PDF report on critical breach.</p>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-2">Active: admin@kiet.edu</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-5 h-5 accent-sky-500 cursor-pointer"
              />
            </div>

            {/* WhatsApp Integration */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">WhatsApp Business API Gateway</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Instant WhatsApp message template for hostel wardens.</p>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-2">Active: +91 98765 43210</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={whatsappAlerts} 
                onChange={() => setWhatsappAlerts(!whatsappAlerts)}
                className="w-5 h-5 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* SMS Gateway */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Twilio SMS Gateway</h4>
                  <p className="text-xs text-slate-400 mt-0.5">High-priority SMS dispatch for offline maintenance staff.</p>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-2">Active: 3 Warden Phones</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={smsAlerts} 
                onChange={() => setSmsAlerts(!smsAlerts)}
                className="w-5 h-5 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Mobile Push */}
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Firebase FCM Push Notifications</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time mobile app push for administrators.</p>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-2">Active: AquaScence Mobile App</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={pushAlerts} 
                onChange={() => setPushAlerts(!pushAlerts)}
                className="w-5 h-5 accent-purple-500 cursor-pointer"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => alert("Notification dispatch settings saved successfully.")}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Save Dispatch Settings</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
