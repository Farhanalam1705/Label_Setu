import React from 'react';
import { AlertTriangle, AlertCircle, Eye, ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';

export const ViolationCard = ({
  title,
  status = 'NEEDS REVIEW',
  confidence = 90,
  finding,
  evidence,
  extractedText,
  onViewEvidence = null,
}) => {
  const isNonCompliant = status === 'NON-COMPLIANT';

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 shadow-xs space-y-4 transition-all ${
        isNonCompliant
          ? 'bg-gradient-to-br from-white via-rose-50/25 to-slate-50 border-rose-200'
          : 'bg-gradient-to-br from-white via-amber-50/25 to-slate-50 border-amber-200'
      }`}
    >
      {/* Card Header: Title & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl shrink-0 ${
              isNonCompliant
                ? 'bg-rose-100 text-rose-700'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isNonCompliant ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">
              {title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ConfidenceBadge value={confidence} showLabel={true} />
          <StatusBadge status={status} size="sm" />
        </div>
      </div>

      {/* Finding & Evidence Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Finding Description
          </span>
          <p className="text-slate-800 font-medium leading-relaxed">
            {finding}
          </p>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Label Evidence Reference
          </span>
          <p className="text-slate-600 leading-relaxed">
            {evidence}
          </p>
        </div>
      </div>

      {/* Extracted snippet if available */}
      {extractedText && (
        <div className="px-3.5 py-2 bg-slate-50 rounded-lg border border-slate-200/90 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
              Raw Extracted Text:
            </span>
            <code className="font-mono font-bold text-slate-800 truncate">
              "{extractedText}"
            </code>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-slate-500 italic">
          Requires verification before notice issuance.
        </span>

        {onViewEvidence && (
          <button
            type="button"
            onClick={onViewEvidence}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl transition-colors shadow-2xs group"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-700" />
            <span>View Evidence</span>
            <ArrowRight className="w-3 h-3 text-cyan-500 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
