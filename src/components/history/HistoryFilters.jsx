import React from 'react';
import { Search, Filter, Calendar, Tag, X, RotateCcw } from 'lucide-react';

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
            placeholder="Search by inspection ID, product, manufacturer..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
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
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Filter controls row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100">
        {/* Status Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-cyan-600" />
            <span>Status</span>
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLIANT">Compliant</option>
            <option value="NON-COMPLIANT">Non-Compliant</option>
            <option value="NEEDS REVIEW">Needs Review</option>
            <option value="PENDING REVIEW">Pending Review</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-cyan-600" />
            <span>Date Range</span>
          </label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="ALL">All Time</option>
            <option value="TODAY">Today (05 Sep 2026)</option>
            <option value="WEEK">This Week</option>
            <option value="MONTH">This Month (Sep 2026)</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-cyan-600" />
            <span>Product Category</span>
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Food Grains & Pulses">Food Grains & Pulses</option>
            <option value="Packaged Commodities">Packaged Commodities</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};
