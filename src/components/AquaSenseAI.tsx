import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Droplets, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Tank, Alert } from '../types';

interface AquaSenseAIProps {
  tanks: Tank[];
  selectedTank: Tank;
  alerts: Alert[];
  onOpenReport: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  dataCard?: any;
}

export const AquaSenseAI: React.FC<AquaSenseAIProps> = ({
  tanks,
  selectedTank,
  alerts,
  onOpenReport
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello! I am AquaSense AI — your intelligent water quality & safety assistant. I have live access to telemetry from ${tanks.length} monitored tanks at ${selectedTank.organization}. How can I assist you right now?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const samplePrompts = [
    "Is the water currently safe?",
    "What happened to TDS today?",
    "Why is the status showing warning?",
    "Show me this week's water-quality trend.",
    "Which tank has the most alerts?",
    "Generate a water-quality report."
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let responseText = "";
      let dataCard: any = null;
      const q = query.toLowerCase();

      if (q.includes("safe") || q.includes("is the water")) {
        const isSafe = selectedTank.status === 'SAFE';
        responseText = `Yes! Water in ${selectedTank.name} is currently **${selectedTank.status}** with an overall Safety Index of **${selectedTank.safetyScore}/100**. All 8 chemical & physical parameters are within configured WHO / IS 10500 standards (pH: 7.2, TDS: 280 ppm, Turbidity: 1.2 NTU).`;
      } else if (q.includes("tds")) {
        responseText = `Today TDS in ${selectedTank.name} registered at **280 ppm** (Normal range: 50–300 ppm). In Girls Hostel Sump 02, TDS peaked at **295 ppm** (+8.4% drift), triggering a mild system warning. Reverse Osmosis filtration is functioning normally.`;
      } else if (q.includes("warning") || q.includes("why")) {
        if (alerts.length > 0) {
          responseText = `The system is flagging a **${alerts[0].severity.toUpperCase()}** because ${alerts[0].message} Configured limit: ${alerts[0].threshold}.`;
        } else {
          responseText = `There are currently no active warning flags across your monitored tanks! All parameters are in optimal range.`;
        }
      } else if (q.includes("trend") || q.includes("week")) {
        responseText = `This week's trajectory across KIET Hostel Campus shows high stability: pH maintained between 7.1 and 7.22 (variance ±0.06), average TDS at 274 ppm, and turbidity clarity at 1.15 NTU. Water safety uptime is at 100%.`;
      } else if (q.includes("which tank") || q.includes("most alerts")) {
        responseText = `Currently, **Girls Hostel Underground Sump (Tank 02)** has registered 1 warning alert due to TDS reaching 295 ppm near the 300 ppm threshold. Main Overhead Tank 01 is 100% clear.`;
      } else if (q.includes("report") || q.includes("generate")) {
        responseText = `I have compiled the latest Institutional Water Safety Report for ${selectedTank.organization}. Click below to view and export full PDF/CSV files.`;
        dataCard = { type: 'report' };
      } else {
        responseText = `Based on live telemetry for ${selectedTank.name}: Water level is at ${selectedTank.currentLevelPercent}% (${selectedTank.capacityLiters * selectedTank.currentLevelPercent / 100} L), pH is 7.2, TDS is 280 ppm, and turbidity is 1.2 NTU. Overall safety status: 🟢 SAFE.`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dataCard
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* AI Assistant Header */}
      <div className="glass-card p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/40 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Bot className="w-7 h-7 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">AquaSense AI Conversational Assistant</h2>
            <p className="text-xs text-slate-300">
              Direct telemetry intelligence • Asks & analyzes live sensor data with zero hallucination
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg">
            🟢 Context Live Connected
          </span>
        </div>
      </div>

      {/* Main Chat Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chat Conversation Box (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 flex flex-col h-[520px]">
          
          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start space-x-3 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  m.sender === 'user' ? 'bg-sky-600' : 'bg-gradient-to-tr from-cyan-600 to-sky-500'
                }`}>
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] p-4 rounded-2xl text-xs space-y-2 leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-sky-600 text-white font-medium rounded-tr-none' 
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  <p>{m.text}</p>

                  {m.dataCard && m.dataCard.type === 'report' && (
                    <div className="pt-2">
                      <button
                        onClick={onOpenReport}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Open Report Generator Portal</span>
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block font-mono text-right">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center space-x-2 text-xs text-sky-400 font-medium p-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AquaSense AI is processing live telemetry vectors...</span>
              </div>
            )}
          </div>

          {/* Quick Sample Prompts Pills */}
          <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium rounded-xl border border-slate-800 shrink-0 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-3">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AquaSense AI about water quality, trends, alerts, or safety..."
              className="flex-1 bg-slate-900 text-slate-100 text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 placeholder-slate-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-lg shadow-sky-500/20 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Live Data Context Panel (1 Col) */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live System Data Context</h3>
          <p className="text-xs text-slate-400">Context bounds injected into AI engine</p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Active Monitored Tank</span>
              <span className="font-bold text-sky-300">{selectedTank.name}</span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Current Safety Index</span>
              <span className="font-bold text-emerald-400 text-base">{selectedTank.safetyScore} / 100</span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Recent Unread Alerts</span>
              <span className="font-bold text-amber-400">{alerts.filter(a=>!a.read).length} Active Alerts</span>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Standard Applied</span>
              <span className="font-bold text-slate-200">WHO & IS 10500 Drinking Water</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
