import React from 'react';

/**
 * ConfidenceBadge Component
 * Shows AI confidence percentage with color indicators
 */
export const ConfidenceBadge = ({ value = 90, showLabel = true, size = 'sm' }) => {
  const num = Number(value) || 0;

  let colorClasses = 'text-slate-700 bg-slate-100 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (num >= 95) {
    colorClasses = 'text-emerald-800 bg-emerald-50/80 border-emerald-200';
    dotColor = 'bg-emerald-600';
  } else if (num >= 85) {
    colorClasses = 'text-cyan-800 bg-cyan-50/80 border-cyan-200';
    dotColor = 'bg-cyan-600';
  } else if (num >= 70) {
    colorClasses = 'text-amber-800 bg-amber-50/80 border-amber-200';
    dotColor = 'bg-amber-600';
  } else {
    colorClasses = 'text-rose-800 bg-rose-50/80 border-rose-200';
    dotColor = 'bg-rose-600';
  }

  const sizeClasses = size === 'xs' 
    ? 'text-[10px] px-1.5 py-0.2 gap-1' 
    : 'text-[11px] px-2 py-0.5 gap-1.5 font-semibold';

  return (
    <span
      className={`inline-flex items-center rounded-md border font-mono tracking-tight shrink-0 shadow-2xs ${colorClasses} ${sizeClasses}`}
      title={`AI detection confidence: ${num}%`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      <span>{showLabel ? `Confidence ${num}%` : `${num}%`}</span>
    </span>
  );
};
