import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, AlertTriangle, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { FINAL_ASSESSMENT_OPTIONS } from '../../data/mockReviewData';

export const OfficerReviewSummary = ({
  officerReview = null,
  inspectionId = 'LM-2026-00129',
}) => {
  const navigate = useNavigate();
  const isReviewed = officerReview?.reviewStatus === 'REVIEWED';

  const assessmentOption = FINAL_ASSESSMENT_OPTIONS.find(
    (o) => o.id === officerReview?.finalAssessment
  );
  const finalAssessmentLabel =
    assessmentOption?.label || officerReview?.finalAssessment || 'Inspection Requires Further Review';

  const observationText =
    officerReview?.observations?.['chk_care'] ||
    officerReview?.observations?.['chk_mrp'] ||
    officerReview?.observations?.['chk_font'] ||
    'Consumer care contact contains non-standard placeholder characters (1800-XXX-XXXX). Statutory notice recommended under Packaged Commodities Rules.';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Officer Review</h3>
            <p className="text-xs text-slate-500">
              Enforcement official verification and final legal assessment.
            </p>
          </div>
        </div>

        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
            isReviewed
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}
        >
          {isReviewed ? '✓ REVIEWED' : '○ PENDING REVIEW'}
        </span>
      </div>

      {isReviewed ? (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-slate-400 text-[11px] block">Officer</span>
              <span className="font-bold text-slate-900">Officer</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Role</span>
              <span className="font-semibold text-slate-800">Enforcement Official</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Review Status</span>
              <span className="font-bold text-emerald-800">REVIEWED</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Final Assessment</span>
              <span className="font-bold text-slate-900 truncate block">
                {finalAssessmentLabel}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Officer Observation
            </span>
            <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-lg border border-slate-150">
              &quot;{observationText}&quot;
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold block">Officer review is pending.</span>
              <span className="text-amber-700 text-[11px]">
                Review the AI-assisted findings and confirm statutory assessment.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/review/${inspectionId}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer"
          >
            <span>Review Findings</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      )}
    </div>
  );
};
