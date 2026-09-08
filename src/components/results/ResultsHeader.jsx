import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileCheck2, Calendar, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ResultsHeader = ({
  inspectionId = 'LM-2026-00129',
  date = '05 September 2026',
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
      {/* Left section: Breadcrumb & Title */}
      <div className="space-y-1.5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/dashboard" className="hover:text-slate-900 transition-colors">
            {t('dashboard', 'Dashboard')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/scanner" className="hover:text-slate-900 transition-colors">
            {t('newInspection', 'New Inspection')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/processing" className="hover:text-slate-900 transition-colors">
            {t('analysis', 'Analysis')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-cyan-700 font-bold">{t('results', 'Results')}</span>
        </nav>

        {/* Headings */}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t('complianceResults', 'Compliance Results')}
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              <Shield className="w-3 h-3 text-cyan-600" />
              <span>{t('inspectionStage3of4', 'Inspection Stage: 3 of 4')}</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('reviewAiAssessment', 'Review the AI-assisted assessment of the scanned product.')}
          </p>
        </div>
      </div>

      {/* Right section: Metadata pills */}
      <div className="flex flex-col sm:items-end gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-900">LABEL SETU</span>
          <span className="text-[10px] text-slate-400">|</span>
          <span className="text-[11px] text-slate-500 font-medium">
            {t('legalMetrologyDivision', 'Legal Metrology Division')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-lg shadow-2xs">
            <FileCheck2 className="w-3.5 h-3.5 text-cyan-700" />
            <span className="text-slate-500">{t('inspectionId', 'Inspection ID')}:</span>
            <strong className="font-mono text-slate-900">{inspectionId}</strong>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-lg shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">{t('date', 'Date')}:</span>
            <strong className="font-medium text-slate-800">{date}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
