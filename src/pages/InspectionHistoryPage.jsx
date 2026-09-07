import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, History as HistoryIcon, FileSpreadsheet, RefreshCw } from 'lucide-react';
import { getInspectionHistory } from '../data/mockHistoryData';
import { HistorySummary } from '../components/history/HistorySummary';
import { HistoryFilters } from '../components/history/HistoryFilters';
import { InspectionTable } from '../components/history/InspectionTable';
import { HistoryPagination } from '../components/history/HistoryPagination';
import { EvidenceViewer } from '../components/results/EvidenceViewer';

export const InspectionHistoryPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [inspections, setInspections] = useState([]);

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
    }, 350);
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
          // Today is 05 Sep 2026 in mock timeline
          if (item.date !== '05 Sep 2026') return false;
        } else if (dateFilter === 'WEEK') {
          // Week of Sep 1 - Sep 5
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
          // September 2026
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
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              Inspection Registry
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <HistoryIcon className="w-6 h-6 text-cyan-600" />
            Inspection History
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View and manage previous legal metrology inspections.
          </p>
        </div>

        {/* Primary Action Button */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/new-inspection')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>New Inspection</span>
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
    </div>
  );
};
