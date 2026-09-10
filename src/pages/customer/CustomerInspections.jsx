import React from 'react';
import { ClipboardList, ArrowLeft, Eye, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CUSTOMER_RECENT_INSPECTIONS } from '../../data/customerMockData';
import { StatusBadge } from '../../components/results/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';

export const CustomerInspections = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <Link to="/customer/dashboard" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> {t('backToDashboard', 'Back to Dashboard')}
            </Link>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {t('myInspections', 'My Inspections')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t('recentInspectionsDesc', 'Official inspection logs and verification status for your products')}
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{t('all', 'All')} {t('myInspections', 'Inspection Records')}</span>
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('filterAll', 'Filter: All Batches')}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">{t('inspectionId', 'Inspection ID')}</th>
                <th className="py-3.5 px-6">{t('productName', 'Product')}</th>
                <th className="py-3.5 px-6">{t('batchNo', 'Batch No')}</th>
                <th className="py-3.5 px-6">{t('date', 'Date')}</th>
                <th className="py-3.5 px-6">{t('status', 'Status')}</th>
                <th className="py-3.5 px-6">{t('score', 'Score')}</th>
                <th className="py-3.5 px-6 text-right">{t('actions', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {CUSTOMER_RECENT_INSPECTIONS.map((inspection) => (
                <tr
                  key={inspection.id}
                  onClick={() => navigate(`/customer/inspections/${inspection.id}`)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">
                    {inspection.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-800">{inspection.product}</div>
                    <div className="text-[11px] text-slate-400">{inspection.category}</div>
                  </td>
                  <td className="py-4 px-6 font-mono text-slate-500">
                    {inspection.batchNo}
                  </td>
                  <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                    {inspection.date}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={inspection.status} size="sm" />
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-black text-xs text-slate-900">{inspection.score}%</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/customer/inspections/${inspection.id}`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer border border-rose-200/60"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t('details', 'View Details')}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
