import React from 'react';
import { ClipboardList, CheckCircle2, XCircle, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HistorySummary = ({ inspections = [] }) => {
  const { t } = useLanguage();
  const total = inspections.length;
  const compliant = inspections.filter(
    (i) => i.status === 'COMPLIANT' || i.status === 'PASS'
  ).length;
  const nonCompliant = inspections.filter(
    (i) => i.status === 'NON-COMPLIANT' || i.status === 'FAIL' || i.status === 'VIOLATION'
  ).length;
  const needsReview = inspections.filter(
    (i) => i.status === 'NEEDS REVIEW' || i.status === 'NEEDS_REVIEW' || i.status === 'PENDING REVIEW'
  ).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Inspections */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {t('totalInspections', 'Total Inspections')}
          </span>
          <div className="text-2xl font-black text-slate-900">{total}</div>
          <span className="text-[11px] text-slate-400 font-medium">{t('loggedRepository', 'Logged in repository')}</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center shadow-xs">
          <ClipboardList className="w-5 h-5" />
        </div>
      </div>

      {/* Compliant */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {t('compliant', 'Compliant')}
          </span>
          <div className="text-2xl font-black text-emerald-700">{compliant}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">{t('statutoryClearance', 'Statutory clearance')}</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Non-Compliant */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {t('nonCompliant', 'Non-Compliant')}
          </span>
          <div className="text-2xl font-black text-rose-700">{nonCompliant}</div>
          <span className="text-[11px] text-rose-600 font-semibold">{t('potentialViolations', 'Potential violations')}</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
          <XCircle className="w-5 h-5" />
        </div>
      </div>

      {/* Needs Review */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {t('needsReview', 'Needs Review')}
          </span>
          <div className="text-2xl font-black text-amber-700">{needsReview}</div>
          <span className="text-[11px] text-amber-600 font-semibold">{t('officerActionRequired', 'Officer action required')}</span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
