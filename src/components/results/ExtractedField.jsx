import React from 'react';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';
import { Eye } from 'lucide-react';

export const ExtractedField = ({
  fieldName,
  extractedValue,
  confidence,
  status,
  onViewEvidence = null,
}) => {
  return (
    <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
      {/* Field Identification & Value */}
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            {fieldName}
          </span>
        </div>

        <p className="text-sm font-semibold text-slate-800 font-mono break-words">
          {extractedValue || '—'}
        </p>
      </div>

      {/* Badges & View Evidence Button */}
      <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto flex-wrap">
        <ConfidenceBadge value={confidence} showLabel={true} />
        <StatusBadge status={status} size="sm" />

        {onViewEvidence && (
          <button
            type="button"
            onClick={onViewEvidence}
            className="p-1.5 text-slate-500 hover:text-cyan-700 hover:bg-cyan-50 border border-slate-200 rounded-lg transition-colors"
            title={`View image evidence for ${fieldName}`}
            aria-label={`View evidence for ${fieldName}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
