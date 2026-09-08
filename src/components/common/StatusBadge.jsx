import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const StatusBadge = ({ status, size = 'md' }) => {
  const { t } = useLanguage();
  const normalized = (status || '').toLowerCase().trim();

  let config = {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: null,
    text: status || 'Unknown',
  };

  if (normalized === 'compliant' || normalized === 'pass') {
    config = {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/10',
      icon: <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
      text: t('compliant', 'Compliant'),
    };
  } else if (normalized === 'violation' || normalized === 'fail' || normalized === 'non-compliant') {
    config = {
      bg: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/10',
      icon: <AlertCircle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
      text: t('violations', 'Violation'),
    };
  } else if (normalized === 'needs review' || normalized === 'review' || normalized === 'pending') {
    config = {
      bg: 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/10',
      icon: <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
      text: t('needsReview', 'Needs Review'),
    };
  }

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs font-medium gap-1' 
    : 'px-2.5 py-1 text-xs font-semibold gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs transition-colors ${config.bg} ${sizeClasses}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </span>
  );
};

