import React from 'react';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';
import { Eye, ShieldCheck, AlertCircle, FileSearch } from 'lucide-react';

export const ComplianceCheck = ({
  name,
  status,
  confidence,
  explanation,
  rule,
  onViewEvidence = null,
}) => {
  return (
    <div className="p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
      {/* Left: Name, Rule and Explanation */}
      <div className="space-y-1 min-w-0 max-w-2xl">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            {name}
          </h4>
          {rule && (
            <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.2 rounded border border-slate-200">
              {rule}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Right: Badges and View Evidence Button */}
      <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto flex-wrap">
        <ConfidenceBadge value={confidence} showLabel={true} />
        <StatusBadge status={status} size="sm" />

        {onViewEvidence && (
          <button
            type="button"
            onClick={onViewEvidence}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100/80 border border-cyan-200 rounded-lg transition-colors shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Evidence</span>
          </button>
        )}
      </div>
    </div>
  );
};
