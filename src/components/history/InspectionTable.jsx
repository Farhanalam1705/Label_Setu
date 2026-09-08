import React from 'react';
import { InspectionRow } from './InspectionRow';
import { InspectionCard } from './InspectionCard';
import { SearchX, RotateCcw, Loader2, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const InspectionTable = ({
  inspections = [],
  isLoading = false,
  onClearFilters,
  onViewEvidence,
  onDeleteInspection,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onDeleteSelected,
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-12 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-cyan-600 animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-800">{t('loadingHistory', 'Loading inspection history...')}</p>
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
          <h3 className="text-base font-bold text-slate-900">{t('noInspectionsFound', 'No inspections found')}</h3>
          <p className="text-xs text-slate-500">
            {t('tryChangingFilters', 'Try changing your search or filters.')}
          </p>
        </div>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('clearFilters', 'Clear Filters')}</span>
          </button>
        )}
      </div>
    );
  }

  const isAllSelected = inspections.length > 0 && selectedIds.length === inspections.length;

  return (
    <div className="space-y-3">
      {/* Bulk Action Bar when records are selected */}
      {selectedIds.length > 0 && (
        <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
          <span className="font-bold text-cyan-900">
            {selectedIds.length} {t('selected', 'selected')}
          </span>
          <button
            type="button"
            onClick={onDeleteSelected}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('deleteSelected', 'Delete Selected')}</span>
          </button>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 pl-4 pr-1 text-center w-8">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onToggleSelectAll}
                    className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-3">{t('inspectionId', 'Inspection ID')}</th>
                <th className="py-3 px-4">{t('product', 'Product')}</th>
                <th className="py-3 px-4">{t('category', 'Category')}</th>
                <th className="py-3 px-4">{t('date', 'Date')}</th>
                <th className="py-3 px-4">{t('officer', 'Officer')}</th>
                <th className="py-3 px-4">{t('compliance', 'Compliance')}</th>
                <th className="py-3 px-4">{t('status', 'Status')}</th>
                <th className="py-3 px-4 text-right">{t('actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inspections.map((inspection) => (
                <InspectionRow
                  key={inspection.inspectionId}
                  inspection={inspection}
                  onViewEvidence={onViewEvidence}
                  onDeleteInspection={onDeleteInspection}
                  isSelected={selectedIds.includes(inspection.inspectionId)}
                  onToggleSelect={onToggleSelect}
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
            onDeleteInspection={onDeleteInspection}
          />
        ))}
      </div>
    </div>
  );
};
