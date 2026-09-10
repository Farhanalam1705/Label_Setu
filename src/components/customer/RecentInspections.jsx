import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Trash2, 
  RotateCcw, 
  Search, 
  Eye, 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CUSTOMER_RECENT_INSPECTIONS } from '../../data/customerMockData';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../context/LanguageContext';

const STORAGE_KEY = 'label_setu_customer_recent_inspections';

export const RecentInspections = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  // Load from localStorage or fallback to mock data
  const [inspections, setInspections] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return CUSTOMER_RECENT_INSPECTIONS;
  });

  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showClearModal, setShowClearModal] = useState(false);

  // Sync to localStorage whenever inspections changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
    } catch {
      // ignore
    }
  }, [inspections]);

  // Filtered list
  const filteredInspections = inspections.filter((item) => {
    const matchesSearch = 
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'COMPLIANT') return matchesSearch && (item.status === 'Compliant' || item.status === 'PASS');
    if (statusFilter === 'REVIEW') return matchesSearch && (item.status === 'Needs Review' || item.status === 'REVIEW');
    if (statusFilter === 'NON_COMPLIANT') return matchesSearch && (item.status === 'Non-Compliant' || item.status === 'Violation');
    return matchesSearch;
  });

  // Toggle single selection
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredInspections.length && filteredInspections.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInspections.map((i) => i.id));
    }
  };

  // Delete single item
  const handleDeleteSingle = (id, productName) => {
    setInspections((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    addToast({
      title: 'Record Removed',
      message: `Inspection record ${id} (${productName}) was deleted.`,
      type: 'info',
    });
  };

  // Delete selected items
  const handleDeleteSelected = () => {
    const count = selectedIds.length;
    if (count === 0) return;
    setInspections((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    addToast({
      title: 'Selected Records Deleted',
      message: `Successfully removed ${count} inspection record(s).`,
      type: 'info',
    });
  };

  // Clear all data
  const handleClearAll = () => {
    setInspections([]);
    setSelectedIds([]);
    setShowClearModal(false);
    addToast({
      title: 'History Cleared',
      message: 'All recent inspection records have been deleted.',
      type: 'warning',
    });
  };

  // Reset to default mock data
  const handleResetData = () => {
    setInspections(CUSTOMER_RECENT_INSPECTIONS);
    setSelectedIds([]);
    addToast({
      title: 'Data Restored',
      message: 'Demo inspection records have been restored.',
      type: 'success',
    });
  };

  const getStatusBadge = (status) => {
    const norm = (status || '').toUpperCase();
    if (norm.includes('COMPLIANT') && !norm.includes('NON')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          {t('compliant', 'COMPLIANT')}
        </span>
      );
    }
    if (norm.includes('NON') || norm.includes('VIOLATION')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
          <XCircle className="w-3 h-3" />
          {t('nonCompliant', 'NON-COMPLIANT')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
        <AlertTriangle className="w-3 h-3" />
        {t('needsReview', 'NEEDS REVIEW')}
      </span>
    );
  };

  return (
    <div className="bg-[#0f1b2d] rounded-2xl border border-[#1e314f] shadow-xl overflow-hidden text-white">
      {/* Top Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400 flex items-center justify-center font-bold shadow-xs">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              {t('recentInspections', 'Recent Inspection History')}
            </h2>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {inspections.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition-colors cursor-pointer"
              title="Clear all inspection records"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('clearAllData', 'Clear All Data')}</span>
            </button>
          )}

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Reset to default mock data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('resetDemo', 'Reset Demo')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Selection Control Bar */}
      <div className="p-4 bg-[#142237] border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder', 'Search by Product Name, ID or Category...')}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-[#0a1526] text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#0a1526] p-1 rounded-xl border border-slate-700 text-xs">
          {[
            { key: 'ALL', label: t('all', 'All') },
            { key: 'COMPLIANT', label: t('compliant', 'Compliant') },
            { key: 'REVIEW', label: t('review', 'Review') },
            { key: 'NON_COMPLIANT', label: t('violations', 'Violations') },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                statusFilter === tab.key
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Select Floating Action Banner */}
      {selectedIds.length > 0 && (
        <div className="p-3 px-6 bg-cyan-950/90 border-b border-cyan-500/30 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2 text-xs text-cyan-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{selectedIds.length} {t('inspectionsSelected', 'inspection(s) selected')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer font-medium"
            >
              {t('deselectAll', 'Deselect All')}
            </button>
            <button
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('deleteSelected', 'Delete Selected')} ({selectedIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Inspections Table */}
      {filteredInspections.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#142237] text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-10 text-center">
                  <button
                    onClick={handleToggleSelectAll}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                    title={selectedIds.length === filteredInspections.length ? 'Deselect All' : 'Select All'}
                  >
                    {selectedIds.length > 0 && selectedIds.length === filteredInspections.length ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4">{t('inspectionId', 'Inspection ID')}</th>
                <th className="py-3.5 px-4">{t('productName', 'Product Name')}</th>
                <th className="py-3.5 px-4">{t('date', 'Date')}</th>
                <th className="py-3.5 px-4">{t('status', 'Status')}</th>
                <th className="py-3.5 px-4">{t('score', 'Score')}</th>
                <th className="py-3.5 px-4 text-right">{t('actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredInspections.map((inspection) => {
                const isSelected = selectedIds.includes(inspection.id);
                return (
                  <tr
                    key={inspection.id}
                    className={`hover:bg-[#162740] transition-colors group ${
                      isSelected ? 'bg-cyan-950/40' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleSelect(inspection.id)}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                        )}
                      </button>
                    </td>

                    {/* ID */}
                    <td className="py-4 px-4 font-mono font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {inspection.id}
                    </td>

                    {/* Product */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{inspection.product}</div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {inspection.category} &bull; Batch: {inspection.batchNo}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                      {inspection.date}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {getStatusBadge(inspection.status)}
                    </td>

                    {/* Score Bar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-white">
                          {inspection.score}%
                        </span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              inspection.score >= 90
                                ? 'bg-emerald-400'
                                : inspection.score >= 75
                                ? 'bg-amber-400'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${inspection.score}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/customer/inspections/${inspection.id}`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t('details', 'Details')}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteSingle(inspection.id, inspection.product)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 border border-transparent hover:border-rose-500/30 transition-colors cursor-pointer"
                          title="Delete this record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{t('noInspectionRecordsFound', 'No Inspection Records Found')}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              {searchQuery || statusFilter !== 'ALL'
                ? t('noInspectionsMatched', 'No inspections matched your filter criteria.')
                : t('allInspectionLogsRemoved', 'All inspection logs have been removed.')}
            </p>
          </div>
          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('restoreDemoRecords', 'Restore Demo Records')}</span>
          </button>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1b2d] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t('clearAllInspectionData', 'Clear All Inspection Data?')}</h3>
              <p className="text-xs text-slate-300 mt-1">
                {t('clearAllInspectionDataDesc', `This will delete all ${inspections.length} recent inspection records from your active view. You can restore default demo records anytime.`)}
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors cursor-pointer"
              >
                {t('yesClearAll', 'Yes, Clear All')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
