import React from 'react';
import { Check, X, AlertCircle, AlertTriangle } from 'lucide-react';

/**
 * StatusBadge Component
 * Standard 4 statuses for Legal Metrology enforcement workflow:
 * - COMPLIANT: ✓ COMPLIANT
 * - NON-COMPLIANT: ✕ NON-COMPLIANT
 * - MISSING: ! MISSING
 * - NEEDS REVIEW: ⚠ NEEDS REVIEW
 */
export const StatusBadge = ({ status, size = 'md' }) => {
  const norm = (status || '').toUpperCase().trim();

  let config = {
    symbol: '?',
    icon: null,
    text: status || 'UNKNOWN',
    style: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  if (norm === 'COMPLIANT' || norm === 'PASS') {
    config = {
      symbol: '✓',
      icon: <Check className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
      text: 'COMPLIANT',
      style: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
    };
  } else if (norm === 'NON-COMPLIANT' || norm === 'NON COMPLIANT' || norm === 'VIOLATION' || norm === 'FAIL') {
    config = {
      symbol: '✕',
      icon: <X className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
      text: 'NON-COMPLIANT',
      style: 'bg-rose-50 text-rose-800 border-rose-300 font-bold',
    };
  } else if (norm === 'MISSING') {
    config = {
      symbol: '!',
      icon: <AlertCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
      text: 'MISSING',
      style: 'bg-orange-50 text-orange-800 border-orange-300 font-bold',
    };
  } else if (norm === 'NEEDS REVIEW' || norm === 'REVIEW' || norm === 'NEEDS_REVIEW') {
    config = {
      symbol: '⚠',
      icon: <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
      text: 'NEEDS REVIEW',
      style: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
    };
  } else if (norm === 'PENDING REVIEW' || norm === 'PENDING' || norm === 'PENDING_REVIEW') {
    config = {
      symbol: '○',
      icon: <span className="w-2 h-2 rounded-full border-2 border-slate-500 inline-block shrink-0" />,
      text: 'PENDING REVIEW',
      style: 'bg-slate-100 text-slate-700 border-slate-300 font-bold',
    };
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  }[size] || 'px-2.5 py-1 text-xs gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs tracking-wide uppercase transition-colors shrink-0 ${config.style} ${sizeClasses}`}
    >
      <span className="shrink-0">{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
};
