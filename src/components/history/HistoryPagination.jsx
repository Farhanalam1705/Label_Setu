import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HistoryPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
}) => {
  const { t } = useLanguage();

  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
      <div className="text-xs text-slate-500 font-medium">
        {t('showing', 'Showing')}{' '}
        <span className="font-bold text-slate-900">{startIndex}–{endIndex}</span>{' '}
        {t('of', 'of')}{' '}
        <span className="font-bold text-slate-900">{totalItems}</span>{' '}
        {t('results', 'results')}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>{t('previous', 'Previous')}</span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === p
                  ? 'bg-[#0c1e33] text-white shadow-2xs ring-1 ring-cyan-500/40'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <span>{t('next', 'Next')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
