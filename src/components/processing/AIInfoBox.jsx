import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AIInfoBox = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200/90 p-4 sm:p-4.5 text-xs text-slate-600 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-200/70 text-cyan-700 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <h5 className="font-bold text-slate-800 text-xs tracking-tight">
              {t('aiAssistedAnalysis', 'AI-Assisted Analysis')}
            </h5>
            <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.2 rounded border border-slate-200">
              {t('enforcementAdvisory', 'Enforcement Advisory')}
            </span>
          </div>
          <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed">
            {t('aiInfoBoxMsg', 'This screen represents the AI-assisted analysis stage. Final findings will be presented for officer review.')}
          </p>
        </div>
      </div>
    </div>
  );
};
