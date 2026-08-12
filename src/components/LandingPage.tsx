import React, { useState } from 'react';
import { 
  Droplets, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Users, 
  Play,
  BookOpen,
  HeartPulse,
  Award,
  Database,
  Globe,
  BrainCircuit,
  Wifi,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onLaunchPlatform: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchPlatform }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jntukSubjects = [
    {
      code: 'R23-CS-IOT',
      title: 'Internet of Things (IoT)',
      desc: 'ESP32 microcontroller programming, analog sensor interfacing (pH, TDS, Turbidity), ADC signal conversion, and TLS MQTT protocol streaming.',
      icon: Cpu
    },
    {
      code: 'R23-CE-EVE',
      title: 'Environmental Engineering & Water Resources',
      desc: 'Water quality standards (WHO / IS 10500), chemical/physical parameters (pH, TDS, Turbidity, ORP), and reservoir fluid dynamics.',
      icon: Droplets
    },
    {
      code: 'R23-CS-ML',
      title: 'Machine Learning & AI Intelligence',
      desc: 'Statistical trajectory analysis, anomaly detection algorithms, predictive maintenance modeling, and early contamination risk forecasting.',
      icon: BrainCircuit
    },
    {
      code: 'R23-CS-WT',
      title: 'Web Technologies & Full-Stack Development',
      desc: 'React 18, TypeScript, Tailwind CSS, component-driven architecture, REST APIs, state management, and real-time dashboard UI.',
      icon: BookOpen
    },
    {
      code: 'R23-CS-CN',
      title: 'Computer Networks & Cloud Computing',
      desc: 'TCP/IP networking, Wi-Fi 802.11 b/g/n, LoRaWAN wireless bands, cloud database architecture, and multi-tenant security.',
      icon: Wifi
    },
    {
      code: 'R23-CS-DS',
      title: 'Data Science & Big Data Analytics',
      desc: 'Time-series data aggregation, statistical moving window averages, interactive data visualization with Recharts, and reporting.',
      icon: Database
    }
  ];

  const faqs = [
    {
      q: "How fast are water quality sensor readings updated?",
      a: "Our AquaNode IoT probes stream multi-parameter data (pH, TDS, Turbidity, Temp, ORP) every 3 seconds over TLS-encrypted Wi-Fi or LoRaWAN to the cloud dashboard."
    },
    {
      q: "Can threshold safety rules be customized for our institution?",
      a: "Yes! Administrators can configure thresholds according to local water regulations (WHO, IS 10500, or US EPA guidelines) directly from the admin portal."
    },
    {
      q: "How does the AI predictive layer work?",
      a: "The AI evaluates 72-hour rolling trend vectors to differentiate between normal water mineral shifts and electrode bio-fouling, providing early warnings before threshold breaches happen."
    },
    {
      q: "How is this project aligned with JNTUK R23 Regulation?",
      a: "AquaScence incorporates core engineering subjects from the JNTUK R23 curriculum including IoT, Environmental Engineering, Machine Learning, Web Technologies, Computer Networks, and Data Science."
    }
  ];

  return (
    <div className="space-y-24 pb-20 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Pilot Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span>Tested & Deployed at KIET Hostel Campus • 2,400+ Students Protected</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Know Your Water.{' '}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Before It Becomes a Problem.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Real-time IoT water quality monitoring, intelligent alert dispatches, and predictive AI insights for hostels, universities, residential communities, and commercial facilities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onLaunchPlatform}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white font-bold text-sm rounded-2xl shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
          >
            <Activity className="w-5 h-5" />
            <span>Launch Live SaaS Platform</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-2xl border border-slate-800 transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-sky-400" />
            <span>Explore Architecture</span>
          </button>
        </div>

        {/* Live Metrics Counter */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto font-mono">
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-3xl font-extrabold text-white">99.98%</span>
            <span className="text-xs text-slate-400 block mt-1 font-sans font-medium">Water Safety Index</span>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-3xl font-extrabold text-sky-400">3 sec</span>
            <span className="text-xs text-slate-400 block mt-1 font-sans font-medium">IoT Stream Latency</span>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-3xl font-extrabold text-emerald-400">100%</span>
            <span className="text-xs text-slate-400 block mt-1 font-sans font-medium">Threshold Compliance</span>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <span className="text-3xl font-extrabold text-purple-400">8 parameters</span>
            <span className="text-xs text-slate-400 block mt-1 font-sans font-medium">Monitored In Real-Time</span>
          </div>
        </div>

      </section>

      {/* Importance of Water Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold rounded-full border border-emerald-500/20">
            CRITICAL HEALTH & ENVIRONMENT SENSING
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Critical Importance of Water Quality Monitoring
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Water is essential to human life, institutional health, and ecological sustainability. Clean drinking water prevents diseases, protects infrastructure, and ensures safe living conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 w-fit rounded-xl border border-emerald-500/20">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Public Health & Disease Prevention</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unmonitored drinking water in hostels, schools, and hospitals is a primary cause of water-borne pathogens, typhoid, cholera, and gastrointestinal illness. Real-time pH and ORP tracking guarantees pathogen inactivation.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 bg-sky-500/10 text-sky-400 w-fit rounded-xl border border-sky-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Infrastructure & RO Membrane Longevity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              High TDS and abnormal pH levels accelerate pipe corrosion and foul industrial Reverse Osmosis (RO) membranes. Early anomaly detection saves thousands in institutional repair costs.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 w-fit rounded-xl border border-purple-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Regulatory Compliance (IS 10500 & WHO)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Educational institutions and residential complexes are mandated to maintain drinking water within WHO & Indian Standard IS 10500 limits. AquaScence automates digital compliance audit logs.
            </p>
          </div>

        </div>
      </section>

      {/* Problem vs Solution Split */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="glass-card p-8 rounded-3xl border border-rose-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/20 space-y-4">
            <span className="px-3 py-1 bg-rose-500/20 text-rose-300 text-xs font-mono font-bold rounded-full border border-rose-500/30">
              THE UNMONITORED RISK
            </span>
            <h3 className="text-2xl font-bold text-white">Traditional Water Testing is Blind</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Manual lab tests happen weekly or monthly, leaving huge unmonitored contamination windows.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Silent TDS spikes, pH drops, and turbidity shifts damage RO membranes and plumbing.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Administrators are notified only after students or residents experience health issues.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20 space-y-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold rounded-full border border-emerald-500/30">
              THE AQUASCENCE SOLUTION
            </span>
            <h3 className="text-2xl font-bold text-white">Sense → Analyze → Alert → Predict</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Continuous 24/7 telemetry from ESP32 multi-parameter sensor arrays directly in overhead tanks & sumps.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated instant WhatsApp, SMS, and Email alert dispatches prior to regulatory threshold violations.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Predictive AI models forecast mineral drift and bio-fouling for early filter maintenance.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Core Methodology Pipeline */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How AquaScence Works</h2>
          <p className="text-xs sm:text-sm text-slate-400">Turn raw sensor data into actionable water intelligence in 6 steps</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { step: '1. Sense', desc: 'IoT probes read pH, TDS, Temp, Turbidity & ORP' },
            { step: '2. Analyze', desc: 'Centralized Risk Engine evaluates telemetry' },
            { step: '3. Detect', desc: 'Threshold rules detect abnormal drift' },
            { step: '4. Alert', desc: 'Dispatches multi-channel alerts instantly' },
            { step: '5. Predict', desc: 'AI forecasts maintenance & contamination risk' },
            { step: '6. Improve', desc: 'Automated filter flushing & compliance reports' }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400 block">{item.step}</span>
              <p className="text-[11px] text-slate-300 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JNTUK R23 Subjects Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-sky-500/10 text-sky-300 text-xs font-mono font-bold rounded-full border border-sky-500/20">
            JNTUK R23 REGULATION CURRICULUM ALIGNMENT
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Subjects Applied in this Project
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            AquaScence integrates multi-disciplinary engineering concepts mapped directly to the Jawaharlal Nehru Technological University Kakinada (JNTUK) R23 Regulation curriculum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jntukSubjects.map((sub, i) => {
            const Icon = sub.icon;
            return (
              <div key={i} className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-900 text-sky-400 border border-slate-800 rounded">
                    {sub.code}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white">{sub.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{sub.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Everything you need to know about AquaScence water monitoring</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-white focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-sky-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 pt-12 max-w-7xl mx-auto px-4 lg:px-8 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-xs">
            AS
          </div>
          <div>
            <span className="font-extrabold text-sm text-white block">AquaScence</span>
            <span className="text-[11px] text-slate-500">Turning Water Data into Water Intelligence.</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-[11px]">
          <span>© 2026 AquaScence Inc. All rights reserved.</span>
          <span className="text-emerald-400 font-mono flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
            JNTUK R23 Aligned Project
          </span>
        </div>
      </footer>

    </div>
  );
};
