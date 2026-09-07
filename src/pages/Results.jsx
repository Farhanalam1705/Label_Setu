import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Download, 
  Shield
} from 'lucide-react';
import { MOCK_INSPECTION_DATA } from '../data/mockResultsData';
import { ResultsHeader } from '../components/results/ResultsHeader';
import { ComplianceSummary } from '../components/results/ComplianceSummary';
import { ProductImageViewer } from '../components/results/ProductImageViewer';
import { ExtractedDeclarations } from '../components/results/ExtractedDeclarations';
import { ComplianceChecklist } from '../components/results/ComplianceChecklist';
import { ViolationCard } from '../components/results/ViolationCard';
import { EvidenceViewer } from '../components/results/EvidenceViewer';
import { OfficerReview } from '../components/results/OfficerReview';
import { useToast } from '../components/common/Toast';

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  // Retrieve image from React Router state or sessionStorage fallback
  const [imageSrc] = useState(() => {
    if (location.state?.image) return location.state.image;
    try {
      const stored = sessionStorage.getItem('label_setu_inspection_image');
      if (stored) return stored;
    } catch (e) {
      console.warn('Could not read stored image from sessionStorage', e);
    }
    return null;
  });

  // Modal states
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [targetReviewFinding, setTargetReviewFinding] = useState(null);
  const [savedOfficerReview, setSavedOfficerReview] = useState(null);
  const [activeRegionId, setActiveRegionId] = useState(null);

  // Handlers
  const handleOpenEvidence = (item) => {
    setSelectedEvidence(item);
    setIsEvidenceModalOpen(true);
    if (item.regionId) {
      setActiveRegionId(item.regionId);
    }
  };

  const handleCloseEvidence = () => {
    setIsEvidenceModalOpen(false);
    setSelectedEvidence(null);
  };

  const handleRegionClick = (region) => {
    setActiveRegionId(region.id);
    setSelectedEvidence({
      title: region.field,
      fieldName: region.field,
      extractedText: region.extractedText,
      confidence: region.confidence,
      status: region.status,
      finding: `Detected region on label matching ${region.field}.`,
    });
    setIsEvidenceModalOpen(true);
  };

  const handleOpenReviewModal = (finding = null) => {
    setTargetReviewFinding(finding);
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (reviewData) => {
    setSavedOfficerReview(reviewData);
    addToast({
      title: 'Officer Review Logged',
      message: `Assessment marked as "${reviewData.decision}" by officer.`,
      type: 'success',
    });
  };

  const handleGenerateReport = () => {
    addToast({
      title: 'Report Module Staged',
      message: 'Report generation will be available in the next module.',
      type: 'info',
    });
  };

  const handleBackToScanner = () => {
    navigate('/scanner');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header with Breadcrumb and Inspection ID */}
      <ResultsHeader
        inspectionId={MOCK_INSPECTION_DATA.inspectionId}
        date={MOCK_INSPECTION_DATA.date}
      />

      {/* 2. Prominent Overall Compliance Summary Card */}
      <ComplianceSummary
        score={MOCK_INSPECTION_DATA.overall.score}
        status={MOCK_INSPECTION_DATA.overall.status}
        confidence={MOCK_INSPECTION_DATA.overall.confidence}
        summaryText={MOCK_INSPECTION_DATA.overall.summaryText}
      />

      {/* 3. Main Two-Column Layout (Responsive: Stack on Mobile/Tablet, 2 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Product Image & Evidence Viewer */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
          <ProductImageViewer
            imageSrc={imageSrc}
            regions={MOCK_INSPECTION_DATA.regions}
            activeRegionId={activeRegionId}
            onRegionClick={handleRegionClick}
          />

          {/* Quick Product Identity Overview Box */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Product Profile
              </span>
              <span className="font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded font-bold text-[10px]">
                {MOCK_INSPECTION_DATA.product.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>
                <span className="text-slate-400 text-[10px] block">Brand Name</span>
                <strong className="text-slate-900">{MOCK_INSPECTION_DATA.product.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Net Quantity</span>
                <strong className="text-slate-900 font-mono">{MOCK_INSPECTION_DATA.product.netQuantity}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Maximum Retail Price</span>
                <strong className="text-slate-900 font-mono">{MOCK_INSPECTION_DATA.product.mrp}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Batch Number</span>
                <strong className="text-slate-900 font-mono">{MOCK_INSPECTION_DATA.product.batchNo}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Extracted Declarations, Compliance Checks, Violations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section: Potential Violations (Highlighted First for Urgent Review) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Potential Violations
                </h3>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {MOCK_INSPECTION_DATA.potentialViolations.length} Items Flagged
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_INSPECTION_DATA.potentialViolations.map((violation) => (
                <ViolationCard
                  key={violation.id}
                  title={violation.title}
                  status={violation.status}
                  confidence={violation.confidence}
                  finding={violation.finding}
                  evidence={violation.evidence}
                  extractedText={violation.extractedText}
                  onViewEvidence={() => handleOpenEvidence(violation)}
                />
              ))}
            </div>
          </div>

          {/* Section: Extracted Declarations (9 Mandatory Fields) */}
          <ExtractedDeclarations
            declarations={MOCK_INSPECTION_DATA.declarations}
            onSelectEvidence={handleOpenEvidence}
          />

          {/* Section: Compliance Checks (6 Key Rules & Standards) */}
          <ComplianceChecklist
            checks={MOCK_INSPECTION_DATA.complianceChecks}
            onSelectEvidence={handleOpenEvidence}
          />
        </div>
      </div>

      {/* 4. Officer Review Section */}
      <OfficerReview
        isModalOpen={isReviewModalOpen}
        onOpenModal={handleOpenReviewModal}
        onCloseModal={() => setIsReviewModalOpen(false)}
        targetFinding={targetReviewFinding}
        onSaveReview={handleSaveReview}
        savedReview={savedOfficerReview}
      />

      {/* 5. Sticky Action Bar at Bottom */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-300/80 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Shield className="w-4 h-4 text-cyan-600" />
          <span>Session: <strong className="text-slate-800 font-mono">LM-2026-00129</strong></span>
          <span className="text-slate-300">|</span>
          <span>Status: <strong className="text-amber-700">Needs Review</strong></span>
        </div>

        {/* Action Buttons: [ Back to Scanner ] [ Review Findings ] [ Generate Report ] */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={handleBackToScanner}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors shadow-2xs cursor-pointer active:scale-98"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Scanner</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenReviewModal(null)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 border border-slate-300 rounded-xl transition-colors shadow-2xs cursor-pointer active:scale-98"
          >
            <span>Review Findings</span>
          </button>

          <button
            type="button"
            onClick={handleGenerateReport}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* 6. Evidence Viewer Modal */}
      <EvidenceViewer
        isOpen={isEvidenceModalOpen}
        onClose={handleCloseEvidence}
        evidenceData={selectedEvidence}
        imageSrc={imageSrc}
        onReviewFinding={(finding) => handleOpenReviewModal(finding)}
      />
    </div>
  );
};
