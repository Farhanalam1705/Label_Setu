import React from 'react';
import { InspectionRow } from './InspectionRow';
import { InspectionCard } from './InspectionCard';
import { SearchX, RotateCcw, Loader2 } from 'lucide-react';

export const InspectionTable = ({
  inspections = [],
  isLoading = false,
  onClearFilters,
  onViewEvidence,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-12 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-cyan-600 animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-800">Loading inspection history...</p>
        <p className="text-xs text-slate-400">Fetching inspection records and compliance summaries.</p>
      </div>
    );
  }

  if (inspections.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-12 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <SearchX className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">No inspections found</h3>
          <p className="text-xs text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Inspection ID</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Officer</th>
                <th className="py-3 px-4">Compliance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inspections.map((inspection) => (
                <InspectionRow
                  key={inspection.inspectionId}
                  inspection={inspection}
                  onViewEvidence={onViewEvidence}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {inspections.map((inspection) => (
          <InspectionCard
            key={inspection.inspectionId}
            inspection={inspection}
            onViewEvidence={onViewEvidence}
          />
        ))}
      </div>
    </div>
  );
};
