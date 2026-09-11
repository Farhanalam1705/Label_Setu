import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, CheckCircle2, RefreshCw } from 'lucide-react';

export const ReportSummary = ({ inspectionId = 'INS-2026-0001' }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Inspection Report</h3>
            <p className="text-xs text-slate-500">Official generated document and export actions.</p>
          </div>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
          ✓ Generated
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-700" />
            <span className="font-mono font-bold text-xs text-slate-900">
              LABEL_SETU_Inspection_{inspectionId}.pdf
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Legal Metrology Compliance Inspection Report • Standard A4 Document
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/reports/generate')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>View Report</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/reports/generate')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
