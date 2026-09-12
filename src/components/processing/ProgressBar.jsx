import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProgressBar = ({ progress = 0, statusMessage = 'Processing product image...' }) => {
  const { t } = useLanguage();
  const isComplete = progress >= 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
      {/* Header: Title and Percentage */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            {t('analysisProgress', 'Analysis Progress')}
          </span>
          {isComplete ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> {t('ready', 'Ready')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
              <Loader2 className="w-2.5 h-2.5 animate-spin text-cyan-600" /> {t('inProgress', 'In Progress')}
            </span>
          )}
        </div>

        <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#0c1e33]">
          {Math.min(100, Math.max(0, progress))}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${isComplete
              ? 'bg-emerald-600'
              : 'bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-500'
            }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dynamic Status Caption */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="flex items-center gap-2 truncate">
          {!isComplete && (
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
            </span>
          )}
          <p className="font-medium text-slate-700 truncate italic">
            "{statusMessage}"
          </p>
        </div>

        <span className="text-[11px] text-slate-400 shrink-0 font-mono pl-2">
          {isComplete ? `6 ${t('of', 'of')} 6 ${t('stagesDone', 'stages done')}` : t('automatedPipeline', 'AI-Assisted Pipeline')}
        </span>
      </div>
    </div>
  );
};
