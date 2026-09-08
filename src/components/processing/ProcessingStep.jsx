import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProcessingStep = ({
  stepNumber,
  title,
  description,
  status = 'PENDING', // 'COMPLETED' | 'ACTIVE' | 'PENDING'
  isLast = false,
}) => {
  const { t } = useLanguage();
  const isCompleted = status === 'COMPLETED';
  const isActive = status === 'ACTIVE';
  const isPending = status === 'PENDING';

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Stepper Node & Connecting Line Column */}
      <div className="flex flex-col items-center shrink-0">
        {/* Step Icon Badge */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500 shadow-xs'
              : isActive
              ? 'bg-cyan-50 text-cyan-700 border-2 border-cyan-500 ring-4 ring-cyan-500/15 shadow-xs'
              : 'bg-slate-100 text-slate-400 border border-slate-300'
          }`}
        >
          {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isActive && <Loader2 className="w-5 h-5 text-cyan-600 animate-spin" />}
          {isPending && <Circle className="w-4 h-4 text-slate-400" />}
        </div>

        {/* Vertical Connecting Line */}
        {!isLast && (
          <div
            className={`w-0.5 min-h-[36px] my-1 transition-colors duration-300 ${
              isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
            }`}
          />
        )}
      </div>

      {/* Step Content */}
      <div className={`flex-1 pb-4 min-w-0 ${!isLast ? '' : 'pb-0'}`}>
        <div className="flex items-center justify-between gap-2">
          <h4
            className={`text-sm font-semibold tracking-tight transition-colors ${
              isCompleted
                ? 'text-slate-900 font-bold'
                : isActive
                ? 'text-cyan-950 font-bold'
                : 'text-slate-500'
            }`}
          >
            {title}
          </h4>

          {/* Status Badge */}
          {isCompleted && (
            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 shrink-0">
              {t('completed', 'Completed')}
            </span>
          )}
          {isActive && (
            <span className="text-[10px] uppercase font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200 shrink-0 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse"></span>
              {t('active', 'Active')}
            </span>
          )}
          {isPending && (
            <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
              {t('pending', 'Pending')}
            </span>
          )}
        </div>

        <p
          className={`text-xs mt-0.5 leading-relaxed ${
            isCompleted
              ? 'text-slate-600'
              : isActive
              ? 'text-cyan-800 font-medium'
              : 'text-slate-400'
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
