import React from 'react';
import { AlertTriangle, X, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ResetSettingsModal = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <RotateCcw className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">{t('resetPreferencesModalTitle', 'Reset Preferences?')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('resetPreferencesModalDesc', 'This will restore your application preferences to their default values. Inspection history and logged reviews will remain unaffected.')}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              {t('cancel', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              {t('reset', 'Reset')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
