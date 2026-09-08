import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, History as HistoryIcon, Trash2, AlertTriangle, X } from 'lucide-react';
import {
  getInspectionHistory,
  deleteInspectionFromHistory,
  deleteMultipleInspections,
  clearAllInspectionHistory,
} from '../data/mockHistoryData';
import { HistorySummary } from '../components/history/HistorySummary';
import { HistoryFilters } from '../components/history/HistoryFilters';
import { InspectionTable } from '../components/history/InspectionTable';
import { HistoryPagination } from '../components/history/HistoryPagination';
import { EvidenceViewer } from '../components/results/EvidenceViewer';
import { useToast } from '../components/common/Toast';
import { useLanguage } from '../context/LanguageContext';

export const InspectionHistoryPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const [isLoading, setIsLoading] = useState(true);
  const [inspections, setInspections] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Evidence Viewer Modal State
  const [selectedEvidenceInspection, setSelectedEvidenceInspection] = useState(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  // Initial simulated load
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getInspectionHistory();
      setInspections(data);
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredInspections = useMemo(() => {
    return inspections.filter((item) => {
      // 1. Text Search (ID, Product, Manufacturer)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = item.inspectionId?.toLowerCase().includes(q);
        const matchesProd = item.productName?.toLowerCase().includes(q);
        const matchesMfr = item.manufacturer?.toLowerCase().includes(q);
        if (!matchesId && !matchesProd && !matchesMfr) return false;
      }

      // 2. Status Filter
      if (statusFilter !== 'ALL') {
        const itemStatus = (item.status || '').toUpperCase();
        if (statusFilter === 'COMPLIANT' && itemStatus !== 'COMPLIANT' && itemStatus !== 'PASS') {
          return false;
        }
        if (
          statusFilter === 'NON-COMPLIANT' &&
          itemStatus !== 'NON-COMPLIANT' &&
          itemStatus !== 'FAIL' &&
          itemStatus !== 'VIOLATION'
        ) {
          return false;
        }
        if (
          statusFilter === 'NEEDS REVIEW' &&
          itemStatus !== 'NEEDS REVIEW' &&
          itemStatus !== 'NEEDS_REVIEW'
        ) {
          return false;
        }
        if (
          statusFilter === 'PENDING REVIEW' &&
          itemStatus !== 'PENDING REVIEW' &&
          itemStatus !== 'PENDING'
        ) {
          return false;
        }
      }

      // 3. Category Filter
      if (categoryFilter !== 'ALL') {
        if (item.categoryGroup !== categoryFilter && item.category !== categoryFilter) {
          return false;
        }
      }

      // 4. Date Filter
      if (dateFilter !== 'ALL') {
        if (dateFilter === 'TODAY') {
          if (item.date !== '05 Sep 2026') return false;
        } else if (dateFilter === 'WEEK') {
          const validWeekDates = [
            '05 Sep 2026',
            '04 Sep 2026',
            '03 Sep 2026',
            '02 Sep 2026',
            '01 Sep 2026',
            '31 Aug 2026',
            '30 Aug 2026',
          ];
          if (!validWeekDates.includes(item.date)) return false;
        } else if (dateFilter === 'MONTH') {
          if (!item.date.includes('Sep 2026')) return false;
        }
      }

      return true;
    });
  }, [inspections, searchQuery, statusFilter, dateFilter, categoryFilter]);

  // Reset pagination to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateFilter, categoryFilter]);

  // Paginated slice
  const totalPages = Math.ceil(filteredInspections.length / PAGE_SIZE) || 1;
  const paginatedInspections = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredInspections.slice(start, start + PAGE_SIZE);
  }, [filteredInspections, currentPage]);

  const isFiltered =
    searchQuery !== '' ||
    statusFilter !== 'ALL' ||
    dateFilter !== 'ALL' ||
    categoryFilter !== 'ALL';

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setDateFilter('ALL');
    setCategoryFilter('ALL');
  };

  const handleOpenEvidence = (inspection) => {
    setSelectedEvidenceInspection(inspection);
    setIsEvidenceModalOpen(true);
  };

  // Delete single inspection
  const handleDeleteSingle = (inspectionId) => {
    const updated = deleteInspectionFromHistory(inspectionId);
    setInspections(updated);
    setSelectedIds((prev) => prev.filter((id) => id !== inspectionId));
    addToast({
      title: t('deleteRecord', 'Record Deleted'),
      message: `${inspectionId} ${t('deleteConfirm', 'deleted successfully.')}`,
      type: 'info',
    });
  };

  // Bulk selection & deletion
  const handleToggleSelect = (inspectionId) => {
    setSelectedIds((prev) =>
      prev.includes(inspectionId)
        ? prev.filter((id) => id !== inspectionId)
        : [...prev, inspectionId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginatedInspections.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedInspections.map((i) => i.inspectionId));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    const updated = deleteMultipleInspections(selectedIds);
    setInspections(updated);
    const count = selectedIds.length;
    setSelectedIds([]);
    addToast({
      title: t('deleteRecord', 'Records Deleted'),
      message: `${count} ${t('deleteConfirm', 'inspection records deleted successfully.')}`,
      type: 'info',
    });
  };

  // Clear entire history
  const handleClearAllConfirm = () => {
    const updated = clearAllInspectionHistory();
    setInspections(updated);
    setSelectedIds([]);
    setIsClearModalOpen(false);
    addToast({
      title: t('clearData', 'History Cleared'),
      message: t('clearSuccess', 'All inspection history has been cleared.'),
      type: 'info',
    });
  };

  const activeEvidenceData = selectedEvidenceInspection
    ? {
        title: `${selectedEvidenceInspection.productName} - Declaration Check`,
        fieldName: 'MRP & Net Quantity Declaration',
        extractedValue: `${selectedEvidenceInspection.netQuantity || 'Standard'} | ${selectedEvidenceInspection.mrp || 'MRP'}`,
        extractedText: `Net: ${selectedEvidenceInspection.netQuantity || '5 kg'} | MRP: ${selectedEvidenceInspection.mrp || '₹520'}`,
        confidence: selectedEvidenceInspection.complianceScore || 90,
        status: selectedEvidenceInspection.status || 'COMPLIANT',
        finding: `OCR label region citation for ${selectedEvidenceInspection.productName} (${selectedEvidenceInspection.inspectionId}). Verification logged by ${selectedEvidenceInspection.officer}.`,
      }
    : null;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              {t('inspectionRegistry', 'Inspection Registry')}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <HistoryIcon className="w-6 h-6 text-cyan-600" />
            {t('inspectionHistory', 'Inspection History')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t('inspectionHistorySubtitle', 'View and manage previous legal metrology inspections.')}
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          {inspections.length > 0 && (
            <button
              type="button"
              onClick={() => setIsClearModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer active:scale-98"
              title={t('clearData', 'Clear History')}
            >
              <Trash2 className="w-4 h-4" />
              <span>{t('clearData', 'Clear History')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate('/new-inspection')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>{t('newInspection', 'New Inspection')}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <HistorySummary inspections={inspections} />

      {/* Search & Filter Bar */}
      <HistoryFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onClearFilters={handleClearFilters}
        isFiltered={isFiltered}
      />

      {/* Inspection Table */}
      <InspectionTable
        inspections={paginatedInspections}
        isLoading={isLoading}
        onClearFilters={handleClearFilters}
        onViewEvidence={handleOpenEvidence}
        onDeleteInspection={handleDeleteSingle}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Pagination */}
      {!isLoading && (
        <HistoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredInspections.length}
          pageSize={PAGE_SIZE}
        />
      )}

      {/* Evidence Viewer Modal */}
      {isEvidenceModalOpen && activeEvidenceData && (
        <EvidenceViewer
          isOpen={isEvidenceModalOpen}
          onClose={() => setIsEvidenceModalOpen(false)}
          evidenceData={activeEvidenceData}
        />
      )}

      {/* Clear All History Confirmation Modal */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  {t('clearDataConfirmTitle', 'Clear All Inspection History?')}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('clearDataConfirmDesc', 'This action will permanently delete all logged inspection records from your history. This cannot be undone.')}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsClearModalOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  {t('cancel', 'Cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleClearAllConfirm}
                  className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  {t('delete', 'Clear All')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
