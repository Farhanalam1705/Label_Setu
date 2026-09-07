import React from 'react';
import { X, Eye, ShieldAlert, CheckCircle2, AlertTriangle, FileText, CornerDownRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';

export const EvidenceViewer = ({
  isOpen = false,
  onClose,
  evidenceData,
  imageSrc,
  onReviewFinding = null,
}) => {
  if (!isOpen || !evidenceData) return null;

  const {
    title,
    fieldName,
    name,
    extractedValue,
    extractedText,
    confidence = 90,
    status = 'NEEDS REVIEW',
    finding,
    explanation,
    ruleRef,
    rule,
  } = evidenceData;

  const displayTitle = title || fieldName || name || 'Declaration Item';
  const displayExtracted = extractedText || extractedValue || '—';
  const displayFinding = finding || explanation || 'Evidence verified against Legal Metrology Rules (Packaged Commodities), 2011.';
  const displayRule = ruleRef || rule || 'Legal Metrology Rules 2011';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-xs">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Evidence Reference & OCR Region
              </h3>
              <p className="text-[11px] text-slate-500">
                Inspection ID: <span className="font-mono font-semibold text-slate-700">LM-2026-00129</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Header pill details */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Target Declaration
              </span>
              <h4 className="text-base font-extrabold text-slate-900">
                {displayTitle}
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">
                {displayRule}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ConfidenceBadge value={confidence} showLabel={true} />
              <StatusBadge status={status} size="md" />
            </div>
          </div>

          {/* Product Image Snippet & Mock Highlighted Region */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block">
              Label Region Crop
            </span>
            <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px]">
              {/* If user uploaded an image */}
              {imageSrc ? (
                <div className="relative max-h-[200px] max-w-full overflow-hidden flex items-center justify-center">
                  <img
                    src={imageSrc}
                    alt="Target Region Evidence"
                    className="max-h-[190px] w-auto object-contain rounded-md"
                  />
                  {/* Subtle highlight box over center */}
                  <div className="absolute inset-4 border-2 border-cyan-400 bg-cyan-500/20 rounded shadow-[0_0_15px_rgba(56,189,248,0.4)] pointer-events-none flex items-start justify-start p-1">
                    <span className="text-[9px] font-bold font-mono bg-slate-900/90 text-cyan-300 px-1.5 py-0.5 rounded">
                      DETECTED REGION
                    </span>
                  </div>
                </div>
              ) : (
                /* Mock Evidence Snippet Card */
                <div className="w-full max-w-md p-4 bg-amber-50/95 border-2 border-dashed border-amber-400 rounded-lg text-slate-900 space-y-2 relative shadow-inner">
                  <div className="flex items-center justify-between text-[10px] font-bold text-amber-800 border-b border-amber-200/80 pb-1">
                    <span>LABEL REGION: {displayTitle.toUpperCase()}</span>
                    <span className="bg-amber-600 text-white px-1.5 py-0.2 rounded font-mono">
                      CONF: {confidence}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/90 rounded border border-amber-200">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      Raw Text Extracted
                    </span>
                    <p className="text-sm font-mono font-black text-slate-900">
                      "{displayExtracted}"
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-600">
                    Statutory Rule Reference: <strong>{displayRule}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Finding & OCR Summary */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <FileText className="w-4 h-4 text-cyan-600" />
                <span>AI Finding Analysis</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {displayFinding}
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between gap-3">
              <span className="text-slate-500 font-medium">Extracted Text:</span>
              <code className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                {displayExtracted}
              </code>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors shadow-2xs"
          >
            Close
          </button>

          {onReviewFinding && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onReviewFinding(evidenceData);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <span>Review Finding</span>
              <CornerDownRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
