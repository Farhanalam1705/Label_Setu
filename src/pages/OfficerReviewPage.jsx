import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ClipboardCheck,
  Shield,
  Save,
} from 'lucide-react';

import { MOCK_INSPECTION_DATA } from '../data/mockResultsData';
import {
  REVIEW_FINDINGS,
  CHECKLIST_ITEMS,
  REVIEW_STORAGE_KEY,
} from '../data/mockReviewData';

import { OfficerInfoCard } from '../components/review/OfficerInfoCard';
import { ReviewSummary } from '../components/review/ReviewSummary';
import { FindingReviewCard } from '../components/review/FindingReviewCard';
import { ReviewChecklist } from '../components/review/ReviewChecklist';
import { FinalAssessment } from '../components/review/FinalAssessment';
import { SubmitReviewModal } from '../components/review/SubmitReviewModal';
import { ReviewSuccess } from '../components/review/ReviewSuccess';
import { EvidenceViewer } from '../components/results/EvidenceViewer';
import { useToast } from '../components/common/Toast';
import { useLanguage } from '../context/LanguageContext';

// ---------- helpers ----------
const buildInitialState = () => {
  try {
    const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}

  const decisions = {};
  const observations = {};
  REVIEW_FINDINGS.forEach((f) => {
    decisions[f.id] = '';
    observations[f.id] = '';
  });

  const checklist = {};
  CHECKLIST_ITEMS.forEach((c) => {
    checklist[c.id] = false;
  });

  return {
    decisions,
    observations,
    checklist,
    finalAssessment: '',
    reviewStatus: 'PENDING',
    reviewDate: '',
  };
};

const persist = (state) => {
  try {
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
};

// ---------- component ----------
export const OfficerReviewPage = () => {
  const { inspectionId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const [reviewState, setReviewState] = useState(buildInitialState);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(
    () => buildInitialState().reviewStatus === 'REVIEWED'
  );

  // Evidence viewer state
  const [evidenceData, setEvidenceData] = useState(null);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    persist(reviewState);
  }, [reviewState]);

  // ---- computed ----
  const allDecisionsMade = REVIEW_FINDINGS.every((f) => !!reviewState.decisions[f.id]);
  const allChecklistDone = CHECKLIST_ITEMS.every((c) => !!reviewState.checklist[c.id]);
  const canSubmit = allDecisionsMade && allChecklistDone && !!reviewState.finalAssessment;
  const reviewedCount = REVIEW_FINDINGS.filter((f) => !!reviewState.decisions[f.id]).length;

  // ---- handlers ----
  const handleDecisionChange = (findingId, decisionId) => {
    setReviewState((prev) => ({
      ...prev,
      decisions: { ...prev.decisions, [findingId]: decisionId },
    }));
  };

  const handleObservationChange = (findingId, text) => {
    setReviewState((prev) => ({
      ...prev,
      observations: { ...prev.observations, [findingId]: text },
    }));
  };

  const handleChecklistChange = (itemId, checked) => {
    setReviewState((prev) => ({
      ...prev,
      checklist: { ...prev.checklist, [itemId]: checked },
    }));
  };

  const handleFinalAssessmentChange = (id) => {
    setReviewState((prev) => ({ ...prev, finalAssessment: id }));
  };

  const handleSaveDraft = () => {
    persist(reviewState);
    addToast({
      title: t('reviewSaved', 'Review Saved'),
      message: t('reviewSavedDraft', 'Review saved as draft.'),
      type: 'success',
    });
  };

  const handleSubmitConfirm = () => {
    const updated = {
      ...reviewState,
      reviewStatus: 'REVIEWED',
      reviewDate: new Date().toISOString(),
    };
    setReviewState(updated);
    persist(updated);
    setIsSubmitModalOpen(false);
    setIsSubmitted(true);
  };

  const handleViewEvidence = (finding) => {
    setEvidenceData({
      title: finding.title,
      fieldName: finding.title,
      extractedText: finding.extractedText,
      confidence: finding.confidence,
      status: finding.aiStatus,
      finding: finding.aiFinding,
    });
    setIsEvidenceOpen(true);
  };

  // ---------- SUBMITTED STATE ----------
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto pb-16 space-y-6">
        <ReviewSuccess
          finalAssessment={reviewState.finalAssessment}
          reviewedCount={reviewedCount}
        />

        {/* Evidence Viewer (still accessible post-submit) */}
        <EvidenceViewer
          isOpen={isEvidenceOpen}
          onClose={() => setIsEvidenceOpen(false)}
          evidenceData={evidenceData}
          imageSrc={null}
        />
      </div>
    );
  }

  // ---------- MAIN PAGE ----------
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-6">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Link to="/results" className="hover:text-cyan-600 transition-colors">
            {t('complianceResults', 'Compliance Results')}
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{t('officerReview', 'Officer Review')}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {t('officerReview', 'Officer Review')}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#0c1e33] px-2 py-0.5 rounded">
                {t('enforcementStage', 'Enforcement Stage')}
              </span>
            </div>
            <p className="text-sm text-slate-500">
              {t('reviewAiFindingsDesc', 'Review AI-assisted findings before finalizing the inspection.')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/results')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer self-start"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t('backToResults', 'Back to Results')}
          </button>
        </div>

        {/* Inspection Meta */}
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: t('inspectionId', 'Inspection ID'), value: MOCK_INSPECTION_DATA.inspectionId },
            { label: t('product', 'Product'), value: MOCK_INSPECTION_DATA.product.name },
            {
              label: t('status', 'Status'),
              value: MOCK_INSPECTION_DATA.overall.status,
              highlight: true,
            },
            {
              label: t('complianceScore', 'Compliance Score'),
              value: `${MOCK_INSPECTION_DATA.overall.score}%`,
            },
          ].map(({ label, value, highlight }) => (
            <div key={label}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {label}
              </p>
              <p
                className={`text-sm font-bold mt-0.5 ${
                  highlight ? 'text-amber-700' : 'text-slate-900'
                }`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Officer Info ────────────────────────────────────────── */}
      <OfficerInfoCard reviewStatus={reviewState.reviewStatus === 'REVIEWED' ? 'REVIEWED' : 'PENDING REVIEW'} />

      {/* ── Review Summary ───────────────────────────────────────── */}
      <ReviewSummary />

      {/* ── AI-Assisted Findings ─────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-600" />
          <h2 className="text-sm font-bold text-slate-900">{t('aiAssistedFindings', 'AI-Assisted Findings')}</h2>
          <span className="text-xs text-slate-400 ml-1">— {t('officerVerificationRequired', 'Officer Verification Required')}</span>
        </div>

        {REVIEW_FINDINGS.map((finding, index) => (
          <FindingReviewCard
            key={finding.id}
            finding={finding}
            index={index}
            decision={reviewState.decisions[finding.id]}
            observation={reviewState.observations[finding.id]}
            onDecisionChange={handleDecisionChange}
            onObservationChange={handleObservationChange}
            onViewEvidence={handleViewEvidence}
          />
        ))}
      </div>

      {/* ── Two-column: Checklist + Final Assessment ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ReviewChecklist
          checklist={reviewState.checklist}
          onChange={handleChecklistChange}
        />
        <FinalAssessment
          value={reviewState.finalAssessment}
          onChange={handleFinalAssessmentChange}
        />
      </div>

      {/* ── Submit Bar (sticky) ──────────────────────────────────── */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-300/80 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ClipboardCheck className="w-4 h-4 text-cyan-600" />
          <span>
            {reviewedCount}/{REVIEW_FINDINGS.length} {t('findingsReviewed', 'findings reviewed')}
            {!allChecklistDone && ` · ${t('completeChecklist', 'Complete checklist')}`}
            {!reviewState.finalAssessment && ` · ${t('selectFinalAssessment', 'Select final assessment')}`}
          </span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            {t('saveDraft', 'Save Draft')}
          </button>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => setIsSubmitModalOpen(true)}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm ${
              canSubmit
                ? 'text-white bg-[#0c1e33] hover:bg-slate-800 hover:shadow-md'
                : 'text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed'
            }`}
          >
            {t('submitReview', 'Submit Review')}
          </button>
        </div>
      </div>

      {/* ── Submit Confirmation Modal ─────────────────────────────── */}
      <SubmitReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleSubmitConfirm}
      />

      {/* ── Evidence Viewer Modal (reused) ────────────────────────── */}
      <EvidenceViewer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        evidenceData={evidenceData}
        imageSrc={null}
      />
    </div>
  );
};
