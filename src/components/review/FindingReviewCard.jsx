import React from 'react';
import { Eye, Bot } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';
import { ConfidenceBadge } from '../results/ConfidenceBadge';
import { DECISION_OPTIONS } from '../../data/mockReviewData';

export const FindingReviewCard = ({
  finding,
  decision,
  observation,
  onDecisionChange,
  onObservationChange,
  onViewEvidence,
  index,
}) => {
  const maxChars = 500;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[#0c1e33] text-white text-xs font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{finding.title}</h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
              AI-Assisted Finding
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <ConfidenceBadge value={finding.confidence} showLabel />
          <StatusBadge status={finding.aiStatus} size="sm" />
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* AI Finding */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Bot className="w-3.5 h-3.5 text-cyan-600" />
            <span>AI-Assisted Finding</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{finding.aiFinding}</p>
          {finding.extractedText && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold">Extracted:</span>
              <code className="text-[11px] font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {finding.extractedText}
              </code>
            </div>
          )}
        </div>

        {/* View Evidence */}
        <button
          type="button"
          onClick={() => onViewEvidence(finding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-600" />
          View Evidence
        </button>

        {/* Officer Decision */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-800">
            Officer Decision <span className="text-rose-500">*</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DECISION_OPTIONS.map((opt) => {
              const isSelected = decision === opt.id;
              let selectedStyle = '';
              if (isSelected) {
                if (opt.id === 'confirm') selectedStyle = 'border-rose-500 bg-rose-50 ring-2 ring-rose-200';
                else if (opt.id === 'reject') selectedStyle = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200';
                else selectedStyle = 'border-amber-500 bg-amber-50 ring-2 ring-amber-200';
              } else {
                selectedStyle = 'border-slate-200 bg-white hover:bg-slate-50';
              }

              return (
                <label
                  key={opt.id}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${selectedStyle}`}
                >
                  <input
                    type="radio"
                    name={`decision-${finding.id}`}
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => onDecisionChange(finding.id, opt.id)}
                    className="mt-0.5 shrink-0 accent-cyan-600"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block">{opt.label}</span>
                    <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                      {opt.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Officer Observation */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">Officer Observation</label>
            <span className="text-[10px] text-slate-400 font-mono">
              {(observation || '').length} / {maxChars}
            </span>
          </div>
          <textarea
            value={observation || ''}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                onObservationChange(finding.id, e.target.value);
              }
            }}
            placeholder="Add verification notes, measurements, or observations from physical inspection."
            rows={3}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-600 resize-none bg-slate-50/50 transition"
          />
        </div>
      </div>
    </div>
  );
};
