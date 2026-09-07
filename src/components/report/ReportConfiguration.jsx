import React from 'react';
import { FileCheck, ShieldAlert, FileText, Printer, Sliders } from 'lucide-react';

export const SECTION_KEYS = [
  { id: 'inspectionInfo', label: 'Inspection Information', defaultChecked: true },
  { id: 'productInfo', label: 'Product Information', defaultChecked: true },
  { id: 'declarations', label: 'Extracted Declarations', defaultChecked: true },
  { id: 'complianceChecks', label: 'Compliance Checks', defaultChecked: true },
  { id: 'violations', label: 'Potential Violations', defaultChecked: true },
  { id: 'evidenceSummary', label: 'Evidence Summary', defaultChecked: true },
  { id: 'officerReview', label: 'Officer Review', defaultChecked: true },
];

export const ReportConfiguration = ({
  reportType,
  setReportType,
  reportFormat,
  setReportFormat,
  selectedSections,
  toggleSection,
  selectAllSections,
  deselectAllSections,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Report Configuration</h3>
            <p className="text-xs text-slate-500">Configure sections and parameters for this official report.</p>
          </div>
        </div>
      </div>

      {/* Report Type */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Report Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setReportType('compliance')}
            className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              reportType === 'compliance'
                ? 'border-cyan-500 bg-cyan-50/40 text-slate-900 shadow-2xs ring-1 ring-cyan-500/30'
                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
            }`}
          >
            <input
              type="radio"
              name="reportType"
              checked={reportType === 'compliance'}
              onChange={() => setReportType('compliance')}
              className="mt-0.5 text-cyan-600 focus:ring-cyan-500"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <FileCheck className="w-3.5 h-3.5 text-cyan-600" />
                Compliance Inspection Report
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Full statutory verification summary including all compliant, review, and violation findings.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setReportType('violation')}
            className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              reportType === 'violation'
                ? 'border-amber-500 bg-amber-50/40 text-slate-900 shadow-2xs ring-1 ring-amber-500/30'
                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
            }`}
          >
            <input
              type="radio"
              name="reportType"
              checked={reportType === 'violation'}
              onChange={() => setReportType('violation')}
              className="mt-0.5 text-amber-600 focus:ring-amber-500"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                Violation Report
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Focused enforcement brief highlighting non-compliances and items requiring officer action.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Format Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Format
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          <label
            className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
              reportFormat === 'pdf'
                ? 'border-slate-800 bg-slate-900 text-white shadow-2xs'
                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
            }`}
          >
            <input
              type="radio"
              name="reportFormat"
              checked={reportFormat === 'pdf'}
              onChange={() => setReportFormat('pdf')}
              className="text-cyan-500 focus:ring-cyan-500"
            />
            <FileText className={`w-4 h-4 ${reportFormat === 'pdf' ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span className="text-xs font-bold">PDF Document (.pdf)</span>
          </label>

          <label
            className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
              reportFormat === 'print'
                ? 'border-slate-800 bg-slate-900 text-white shadow-2xs'
                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
            }`}
          >
            <input
              type="radio"
              name="reportFormat"
              checked={reportFormat === 'print'}
              onChange={() => setReportFormat('print')}
              className="text-cyan-500 focus:ring-cyan-500"
            />
            <Printer className={`w-4 h-4 ${reportFormat === 'print' ? 'text-cyan-400' : 'text-slate-500'}`} />
            <span className="text-xs font-bold">Print (A4 Sheet)</span>
          </label>
        </div>
      </div>

      {/* Report Sections */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Include Sections
          </label>
          <div className="flex gap-2 text-[11px]">
            <button
              type="button"
              onClick={selectAllSections}
              className="text-cyan-700 hover:text-cyan-900 font-semibold cursor-pointer underline"
            >
              Select All
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={deselectAllSections}
              className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer underline"
            >
              Deselect All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {SECTION_KEYS.map((sec) => {
            const isChecked = !!selectedSections[sec.id];
            return (
              <label
                key={sec.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer text-xs ${
                  isChecked
                    ? 'bg-slate-50/80 border-slate-300 text-slate-900 font-medium'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSection(sec.id)}
                  className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                />
                <span>{sec.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
