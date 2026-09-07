import React from 'react';
import { AlertTriangle, Sparkles, ShieldAlert, CheckCircle2, FileSearch } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';

export const ComplianceSummary = ({
  score = 82,
  status = 'NEEDS REVIEW',
  confidence = 89,
  summaryText = 'Potential compliance issues were detected and require officer review.',
  onScrollToViolations = null,
}) => {
  return (
    <div className="bg-gradient-to-br from-white via-amber-50/20 to-slate-50 rounded-2xl border-2 border-amber-300/80 p-6 sm:p-7 shadow-xs relative overflow-hidden">
      {/* Subtle top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Overall Score + Status + Message */}
        <div className="flex items-start gap-4 sm:gap-5 min-w-0">
          {/* Circular Score Gauge */}
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col items-center justify-center shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Score
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900">
              {score}%
            </span>
            <span className="text-[9px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.2 rounded-md mt-0.5">
              Grade B
            </span>
          </div>

          {/* Text Summary Details */}
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Overall Compliance
              </h2>
              <StatusBadge status={status} size="md" />
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-xl">
              {summaryText}
            </p>

            {/* AI-Assisted Assessment Notice & Confidence */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                <Sparkles className="w-3 h-3 text-cyan-600" />
                <span>AI-assisted assessment</span>
              </span>

              <ConfidenceBadge value={confidence} showLabel={true} />

              <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Needs Officer Review</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Breakdown Pills */}
        <div className="flex sm:flex-col justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-6 shrink-0">
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Statutory Checks
            </span>
            <div className="flex items-center gap-2 sm:justify-end mt-0.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> 4 Pass
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <ShieldAlert className="w-3 h-3" /> 2 Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
