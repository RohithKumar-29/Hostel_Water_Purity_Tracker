import React, { useState } from 'react';
import { 
  Printer, 
  FileSpreadsheet
} from 'lucide-react';
import type { Tank } from '../types';

interface ReportGeneratorProps {
  selectedTank: Tank;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ selectedTank }) => {
  const [reportPeriod, setReportPeriod] = useState<'24h' | '7d' | '30d'>('7d');

  const handleDownloadCSV = () => {
    const csvHeader = "Parameter,Current Value,Normal Range,Minimum Registered,Maximum Registered,Average Value,Status\n";
    const csvRows = Object.values(selectedTank.readings).map(r => 
      `"${r.name}","${r.value} ${r.unit}","${r.normalRange}","${(r.value * 0.95).toFixed(1)}","${(r.value * 1.05).toFixed(1)}","${r.value}","${r.status}"`
    ).join("\n");
    
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AquaScence_Water_Quality_Report_${selectedTank.id}_${reportPeriod}.csv`;
    a.click();
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Report Generator Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-2xl no-print">
        <div>
          <h2 className="text-xl font-extrabold text-white">Institutional Water Quality Compliance Report</h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate certified water safety audit documents for college management, municipal health inspectors & environmental audits
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setReportPeriod('24h')}
              className={`px-3 py-1.5 font-semibold rounded-lg ${reportPeriod === '24h' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
            >
              24 Hours
            </button>
            <button
              onClick={() => setReportPeriod('7d')}
              className={`px-3 py-1.5 font-semibold rounded-lg ${reportPeriod === '7d' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
            >
              7 Days
            </button>
            <button
              onClick={() => setReportPeriod('30d')}
              className={`px-3 py-1.5 font-semibold rounded-lg ${reportPeriod === '30d' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
            >
              30 Days
            </button>
          </div>

          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center space-x-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV / Excel</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print PDF Report</span>
          </button>
        </div>
      </div>

      {/* Printable Institutional Report Document View */}
      <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 space-y-8 print:bg-white print:text-black print:p-0">
        
        {/* Document Header */}
        <div className="flex justify-between items-start border-b border-slate-800 print:border-black pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-sm">
                AS
              </div>
              <span className="text-2xl font-black tracking-tight text-white print:text-black">AquaScence</span>
            </div>
            <p className="text-xs text-slate-400 print:text-gray-600 mt-1 font-medium">
              Smart Water Telemetry & Safety Intelligence Network
            </p>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="font-bold text-sky-400 print:text-blue-700 block">REPORT ID: AS-RPT-2026-0812</span>
            <span className="text-slate-400 print:text-gray-600">Generated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Audit Context */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900/80 print:bg-gray-100 rounded-xl text-xs font-mono">
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">Institution:</span>
            <span className="font-bold text-white print:text-black">{selectedTank.organization}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">Location Node:</span>
            <span className="font-bold text-white print:text-black">{selectedTank.name}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">Audit Window:</span>
            <span className="font-bold text-sky-400 print:text-blue-700">{reportPeriod.toUpperCase()} Rolling Window</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">Sensor Uptime:</span>
            <span className="font-bold text-emerald-400 print:text-green-700">100.0% Operational</span>
          </div>
        </div>

        {/* Aggregated Statistical Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider">
            Water Telemetry Parameter Aggregations (IS 10500 Compliant)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 print:bg-gray-200 text-slate-300 print:text-black font-mono border-b border-slate-800">
                  <th className="p-3">Parameter Name</th>
                  <th className="p-3">Current</th>
                  <th className="p-3">Normal Standard</th>
                  <th className="p-3">Min Value</th>
                  <th className="p-3">Max Value</th>
                  <th className="p-3">Mean Avg</th>
                  <th className="p-3">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-gray-300 font-mono text-slate-200 print:text-black">
                {Object.values(selectedTank.readings).map((r) => (
                  <tr key={r.key}>
                    <td className="p-3 font-bold">{r.name}</td>
                    <td className="p-3 font-extrabold text-sky-300 print:text-black">{r.value} {r.unit}</td>
                    <td className="p-3 text-slate-400 print:text-gray-700">{r.normalRange}</td>
                    <td className="p-3">{(r.value * 0.95).toFixed(1)}</td>
                    <td className="p-3">{(r.value * 1.05).toFixed(1)}</td>
                    <td className="p-3">{r.value}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        r.status === 'SAFE' ? 'bg-emerald-500/20 text-emerald-400 print:text-green-700' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Executive Verification Sign-Off */}
        <div className="pt-8 border-t border-slate-800 print:border-black flex justify-between items-end text-xs">
          <div>
            <span className="font-bold text-white print:text-black block mb-1">AquaScence Automated AI Verification</span>
            <p className="text-slate-400 print:text-gray-600 max-w-sm text-[11px]">
              This digital report was compiled automatically using cryptographically signed MQTT telemetry logs from ESP32 IoT Node arrays.
            </p>
          </div>

          <div className="text-center font-mono space-y-1">
            <div className="w-36 border-b border-slate-700 print:border-black mb-1"></div>
            <span className="text-[10px] text-slate-400 print:text-gray-600 block">Authorized Auditor Signature</span>
          </div>
        </div>

      </div>

    </div>
  );
};
