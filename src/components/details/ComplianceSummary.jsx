import React from 'react';
import { Award, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export const ComplianceSummary = ({
  complianceScore = 82,
  compliantCount = 3,
  nonCompliantCount = 1,
  needsReviewCount = 2,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Compliance Score */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Compliance Score
          </span>
          <div className="text-2xl font-black text-slate-900">{complianceScore}%</div>
          <span className="text-[11px] text-cyan-600 font-bold">Overall Rating</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center shadow-xs">
          <Award className="w-5 h-5" />
        </div>
      </div>

      {/* Compliant */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Compliant
          </span>
          <div className="text-2xl font-black text-emerald-700">{compliantCount}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Checks Passed</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Non-Compliant */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Non-Compliant
          </span>
          <div className="text-2xl font-black text-rose-700">{nonCompliantCount}</div>
          <span className="text-[11px] text-rose-600 font-semibold">Potential Violations</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
          <XCircle className="w-5 h-5" />
        </div>
      </div>

      {/* Needs Review */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Needs Review
          </span>
          <div className="text-2xl font-black text-amber-700">{needsReviewCount}</div>
          <span className="text-[11px] text-amber-600 font-semibold">Verification Needed</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
