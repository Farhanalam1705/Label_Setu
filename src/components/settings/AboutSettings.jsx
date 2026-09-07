import React from 'react';
import { Info, Scale, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { LabelSetuLogo } from '../common/LabelSetuLogo';

export const AboutSettings = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">About LABEL SETU</h3>
            <p className="text-xs text-slate-500">Platform architecture, version information, and statutory compliance advisory.</p>
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
            Platform Purpose
          </span>
          <p className="text-xs text-slate-700 leading-relaxed">
            An AI-assisted inspection platform designed to support enforcement officers in checking packaged commodity labels and reviewing potential compliance issues.
          </p>
        </div>

        {/* AI-Assisted Decision Support Note */}
        <div className="p-4 bg-cyan-50/60 border border-cyan-200 rounded-xl space-y-1.5 text-cyan-950">
          <div className="flex items-center gap-2 font-bold text-xs text-cyan-900">
            <Sparkles className="w-4 h-4 text-cyan-700 shrink-0" />
            <span>AI-Assisted Decision Support</span>
          </div>
          <p className="text-xs text-cyan-800 leading-relaxed">
            AI-generated findings are intended to support authorized officers and do not replace official enforcement judgment.
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Environment:</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              Frontend Prototype
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
