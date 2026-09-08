import React, { useState } from 'react';
import { Shield, Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useLanguage } from '../../context/LanguageContext';

export const SecuritySettings = () => {
  const { t } = useLanguage();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Shield className="w-4 h-4 text-cyan-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('securityTitle', 'Security Settings')}</h3>
            <p className="text-xs text-slate-500">{t('securitySubtitle', 'Manage officer access credentials and authentication security.')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-600" />
              <span className="font-bold text-slate-900">{t('portalPassword', 'Portal Password')}</span>
            </div>
            <p className="text-[11px] font-mono tracking-widest text-slate-400">
              ••••••••••••
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <KeyRound className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t('changePassword', 'Change Password')}</span>
          </button>
        </div>

        <div className="p-4 bg-slate-50/60 rounded-xl border border-slate-200/60 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('workstationVerified', 'Enforcement Station Verified')}</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {t('workstationVerifiedDesc', 'This workstation is connected through the authorized Legal Metrology enforcement terminal interface. Session activities are logged for statutory compliance.')}
          </p>
        </div>
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
};
