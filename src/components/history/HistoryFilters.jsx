import React from 'react';
import { Search, Filter, Calendar, Tag, X, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HistoryFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  categoryFilter,
  setCategoryFilter,
  onClearFilters,
  isFiltered,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
      {/* Search row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder', 'Search by inspection ID, product, manufacturer...')}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('clearFilters', 'Clear Filters')}</span>
          </button>
        )}
      </div>

      {/* Filter controls row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100">
        {/* Status Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-cyan-600" />
            <span>{t('status', 'Status')}</span>
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="ALL">{t('allStatuses', 'All Statuses')}</option>
            <option value="COMPLIANT">{t('compliant', 'Compliant')}</option>
            <option value="NON-COMPLIANT">{t('nonCompliant', 'Non-Compliant')}</option>
            <option value="NEEDS REVIEW">{t('needsReview', 'Needs Review')}</option>
            <option value="PENDING REVIEW">{t('pendingReview', 'Pending Review')}</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-cyan-600" />
            <span>{t('dateRange', 'Date Range')}</span>
          </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="ALL">{t('allTime', 'All Time')}</option>
            <option value="TODAY">{t('today', 'Today')} (05 Sep 2026)</option>
            <option value="WEEK">{t('thisWeek', 'This Week')}</option>
            <option value="MONTH">{t('thisMonth', 'This Month')} (Sep 2026)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-cyan-600" />
            <span>{t('productCategory', 'Product Category')}</span>
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="ALL">{t('allCategories', 'All Categories')}</option>
            <option value="Food Grains & Pulses">{t('foodGrainsPulses', 'Food Grains & Pulses')}</option>
            <option value="Packaged Commodities">{t('packagedCommodities', 'Packaged Commodities')}</option>
            <option value="Other">{t('other', 'Other')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
