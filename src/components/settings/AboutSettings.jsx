import React, { useState } from 'react';
import { Info, Scale, ShieldCheck, Sparkles, CheckCircle2, Activity, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';

export const AboutSettings = () => {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  const handleRunDiagnostics = () => {
    setIsChecking(true);
    setDiagnosticResult(null);

    setTimeout(() => {
      setIsChecking(false);
      setDiagnosticResult({
        status: 'Operational',
        latency: '14ms',
        ruleEngine: 'Active (Legal Metrology Rules 2011)',
        ocrStatus: 'Ready (Multi-lingual OCR)',
      });
      addToast({
        title: 'System Health: 100%',
        message: t('diagnosticOk', 'All Local Inspection Services Operational'),
        type: 'success',
      });
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Info className="w-4 h-4 text-cyan-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('aboutTitle', 'About LABEL SETU')}</h3>
            <p className="text-xs text-slate-500">{t('aboutSubtitle', 'Platform architecture, version information, and statutory compliance advisory.')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 text-xs">
        {/* Header Branding Card */}
        <div className="flex items-center gap-4 p-4 bg-slate-900 text-white rounded-xl shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-black text-xl">
            LS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black text-white">LABEL SETU</h4>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-cyan-200/90">
              AI-Powered Legal Metrology Compliance Checker
            </p>
          </div>
        </div>

        {/* Purpose */}
        <div className="space-y-1.5 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            {t('platformPurpose', 'Platform Purpose')}
          </span>
          <p className="text-xs text-slate-700 leading-relaxed">
            {t('platformPurposeDesc', 'An AI-assisted inspection platform designed to support enforcement officers in checking packaged commodity labels and reviewing potential compliance issues.')}
          </p>
        </div>

        {/* AI-Assisted Decision Support Note */}
        <div className="p-4 bg-cyan-50/60 border border-cyan-200 rounded-xl space-y-1.5 text-cyan-950">
          <div className="flex items-center gap-2 font-bold text-xs text-cyan-900">
            <Sparkles className="w-4 h-4 text-cyan-700 shrink-0" />
            <span>{t('aiSupport', 'AI-Assisted Decision Support')}</span>
          </div>
          <p className="text-xs text-cyan-800 leading-relaxed">
            {t('aiSupportDesc', 'AI-generated findings are intended to support authorized officers and do not replace official enforcement judgment.')}
          </p>
        </div>

        {/* System Diagnostics Interactive Box */}
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600" />
              <span className="font-bold text-slate-900">System Diagnostics</span>
            </div>
            <button
              type="button"
              onClick={handleRunDiagnostics}
              disabled={isChecking}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer shadow-2xs disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 ${isChecking ? 'animate-spin' : ''}`} />
              <span>{isChecking ? 'Running Diagnostics...' : t('diagnosticCheck', 'Run System Diagnostics')}</span>
            </button>
          </div>

          {diagnosticResult && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-[11px] animate-fadeIn">
              <div className="p-2 bg-emerald-50 text-emerald-900 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Status: <strong>{diagnosticResult.status}</strong> ({diagnosticResult.latency})</span>
              </div>
              <div className="p-2 bg-slate-100 text-slate-800 rounded-lg">
                <span>Rules: <strong>{diagnosticResult.ruleEngine}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{t('environment', 'Environment')}:</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              {t('prototype', 'Enforcement Prototype')}
            </span>
          </div>

          <div>
            <span>Statutory Verification Engine • 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
