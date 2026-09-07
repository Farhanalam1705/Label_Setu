import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, FileText, ExternalLink, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MOCK_INSPECTION_DATA } from '../data/mockResultsData';
import { REVIEW_STORAGE_KEY, FINAL_ASSESSMENT_OPTIONS } from '../data/mockReviewData';
import { getInspectionHistory } from '../data/mockHistoryData';
import { InspectionOverview } from '../components/details/InspectionOverview';
import { ComplianceSummary } from '../components/details/ComplianceSummary';
import { ProductInformation } from '../components/details/ProductInformation';
import { ComplianceChecks } from '../components/details/ComplianceChecks';
import { OfficerReviewSummary } from '../components/details/OfficerReviewSummary';
import { AuditTimeline } from '../components/details/AuditTimeline';
import { EvidenceSummary } from '../components/details/EvidenceSummary';
import { ReportSummary } from '../components/details/ReportSummary';
import { EvidenceViewer } from '../components/results/EvidenceViewer';
import { StatusBadge } from '../components/results/StatusBadge';

export const InspectionDetailsPage = () => {
  const { inspectionId = 'LM-2026-00129' } = useParams();
  const navigate = useNavigate();

  // Selected evidence for modal
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  // Load officer review state if available
  const [officerReview] = useState(() => {
    try {
      const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return {
      reviewStatus: 'REVIEWED',
      finalAssessment: 'further_review',
      decisions: {
        chk_mrp: 'confirm',
        chk_care: 'confirm',
        chk_font: 'further',
      },
      observations: {
        chk_care: 'Consumer care contact contains placeholder characters (1800-XXX-XXXX). Statutory notice recommended under Packaged Commodities Rules.',
      },
      reviewDate: '2026-09-05T10:32:00Z',
    };
  });

  const finalAssessmentObj = FINAL_ASSESSMENT_OPTIONS.find(
    (o) => o.id === officerReview?.finalAssessment
  );
  const finalAssessmentLabel =
    finalAssessmentObj?.label || officerReview?.finalAssessment || 'Inspection Requires Further Review';

  const handleOpenEvidence = (finding) => {
    setSelectedEvidence({
      title: finding.title || finding.name || 'Statutory Declaration',
      fieldName: finding.name || finding.fieldName || 'Declaration Item',
      extractedValue: finding.extractedText || finding.extractedValue || '₹520',
      extractedText: finding.extractedText || finding.extractedValue || '₹520',
      confidence: finding.confidence || 88,
      status: finding.status || 'NEEDS REVIEW',
      finding: finding.finding || finding.explanation || 'Statutory packaging element requires verification.',
    });
    setIsEvidenceModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/dashboard" className="hover:text-slate-800 transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link to="/history" className="hover:text-slate-800 transition-colors">
          Inspection History
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-bold">Inspection Details</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Inspection Details
            </h1>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-400">
              {inspectionId}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review the complete inspection record and activity timeline.
          </p>
        </div>

        {/* Top-Right Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/history')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to History</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/reports/generate')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Report</span>
          </button>
        </div>
      </div>

      {/* 1. Inspection Overview Card */}
      <InspectionOverview
        inspectionId={inspectionId}
        productName={MOCK_INSPECTION_DATA.product.name}
        category={MOCK_INSPECTION_DATA.product.category}
        date={MOCK_INSPECTION_DATA.date}
        officer="Officer"
        department="Legal Metrology"
        reviewStatus={officerReview?.reviewStatus || 'REVIEWED'}
        finalAssessment={finalAssessmentLabel}
      />

      {/* 2. Compliance Summary Cards (4 cards) */}
      <ComplianceSummary
        complianceScore={82}
        compliantCount={3}
        nonCompliantCount={1}
        needsReviewCount={2}
      />

      {/* 3. Product Information */}
      <ProductInformation product={MOCK_INSPECTION_DATA.product} />

      {/* 4. Compliance Checks Table */}
      <ComplianceChecks
        checks={MOCK_INSPECTION_DATA.complianceChecks}
        onViewEvidence={handleOpenEvidence}
      />

      {/* 5. Officer Review */}
      <OfficerReviewSummary
        officerReview={officerReview}
        inspectionId={inspectionId}
      />

      {/* 6. Audit Trail (Inspection Activity Vertical Timeline) */}
      <AuditTimeline />

      {/* 7. Evidence Summary */}
      <EvidenceSummary onViewEvidence={handleOpenEvidence} />

      {/* 8. Report Section */}
      <ReportSummary inspectionId={inspectionId} />

      {/* 9. Bottom Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-3 sticky bottom-4 z-20">
        <button
          type="button"
          onClick={() => navigate('/history')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to History</span>
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => navigate('/results')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <span>View Results</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/reports/generate')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-700" />
            <span>View Report</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/review/${inspectionId}`)}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>Review Findings</span>
          </button>
        </div>
      </div>

      {/* Evidence Viewer Modal */}
      {isEvidenceModalOpen && selectedEvidence && (
        <EvidenceViewer
          isOpen={isEvidenceModalOpen}
          onClose={() => setIsEvidenceModalOpen(false)}
          evidenceData={selectedEvidence}
        />
      )}
    </div>
  );
};
