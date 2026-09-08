import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Shield, Trash2 } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';
import { ConfidenceBadge } from '../results/ConfidenceBadge';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../context/LanguageContext';

export const InspectionCard = ({ inspection, onViewEvidence, onDeleteInspection }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const handleViewReport = () => {
    if (inspection.hasReport) {
      navigate('/reports/generate');
    } else {
      addToast({
        title: 'Report Unavailable',
        message: 'Report is not available for this inspection.',
        type: 'info',
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 space-y-3">
      {/* Header: Product & ID */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div>
          <h4 className="font-bold text-slate-900 text-sm leading-tight">
            {inspection.productName}
          </h4>
          <span className="font-mono text-xs font-semibold text-cyan-800 block mt-0.5">
            {inspection.inspectionId}
          </span>
        </div>
        <StatusBadge status={inspection.status} size="sm" />
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs py-1">
        <div>
          <span className="text-slate-400 block text-[11px]">{t('date', 'Date')}</span>
          <span className="font-medium text-slate-700">{inspection.date}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">{t('category', 'Category')}</span>
          <span className="font-medium text-slate-700 truncate block">
            {inspection.category}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">{t('officer', 'Officer')}</span>
          <span className="font-medium text-slate-700">{inspection.officer}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[11px]">{t('compliance', 'Compliance')}</span>
          <ConfidenceBadge confidence={inspection.complianceScore} showLabel={true} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => navigate(`/history/${inspection.inspectionId}`)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-2xs cursor-pointer"
        >
          <span>{t('viewDetails', 'View Details')}</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>

        <button
          type="button"
          onClick={handleViewReport}
          title={t('viewReport', 'View Report')}
          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onViewEvidence && onViewEvidence(inspection)}
          title={t('viewEvidence', 'View Evidence')}
          className="p-2 text-cyan-700 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl transition-colors cursor-pointer"
        >
          <Shield className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onDeleteInspection && onDeleteInspection(inspection.inspectionId)}
          title={t('deleteRecord', 'Delete Record')}
          className="p-2 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
