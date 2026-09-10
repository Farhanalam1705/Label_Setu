import React from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CUSTOMER_RECENT_REPORTS } from '../../data/customerMockData';
import { useLanguage } from '../../context/LanguageContext';

export const RecentReports = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold border border-rose-200/60">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {t('reports', 'Recent Reports')}
            </h2>
            <p className="text-xs text-slate-400">{t('officialReportsSubtitle', 'Official inspection certificates')}</p>
          </div>
        </div>

        <Link
          to="/customer/reports"
          className="text-xs font-semibold text-rose-700 hover:text-rose-900 transition-colors"
        >
          {t('reports', 'All Reports')} &rarr;
        </Link>
      </div>

      {/* Reports List */}
      <div className="py-4 space-y-3">
        {CUSTOMER_RECENT_REPORTS.map((report) => (
          <div
            key={report.id}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="font-mono font-bold text-xs text-slate-900 break-all">
                  {report.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>{t('product', 'Product')}: {report.product}</span>
                  <span>&bull;</span>
                  <span>{report.date}</span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {report.status}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/customer/inspections/${report.inspectionId}`)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-[#57184a] text-white hover:bg-[#431238] rounded-lg transition-colors shrink-0 cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('viewReport', 'View Report')}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Verified digital stamps attached</span>
        <Link
          to="/customer/reports"
          className="text-rose-700 font-semibold hover:underline"
        >
          {t('archivedDocuments', 'Manage archive')}
        </Link>
      </div>
    </div>
  );
};

