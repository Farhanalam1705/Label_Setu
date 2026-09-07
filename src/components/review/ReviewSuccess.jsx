import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, FileText } from 'lucide-react';
import { FINAL_ASSESSMENT_OPTIONS, REVIEW_FINDINGS } from '../../data/mockReviewData';
import { useToast } from '../common/Toast';

const today = new Date().toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export const ReviewSuccess = ({ finalAssessment, reviewedCount }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const assessmentOption = FINAL_ASSESSMENT_OPTIONS.find((o) => o.id === finalAssessment);

  const handleGenerateReport = () => {
    navigate('/reports/generate');
  };

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Success banner */}
        <div className="px-6 py-6 bg-emerald-600 text-white text-center space-y-2">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="w-12 h-12 text-white/90" />
          </div>
          <h2 className="text-xl font-extrabold">Officer Review Submitted</h2>
          <p className="text-sm text-emerald-100">
            The inspection review has been recorded successfully.
          </p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Officer</span>
              <span className="font-bold text-slate-900">Officer</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Review Date</span>
              <span className="font-bold text-slate-900">{today}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Final Assessment</span>
              <span className="font-semibold text-slate-800 text-right max-w-[200px]">
                {assessmentOption?.label || finalAssessment}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Findings Reviewed</span>
              <span className="font-bold text-slate-900">
                {reviewedCount} / {REVIEW_FINDINGS.length}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-500 font-medium">Review Status</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                ✓ REVIEWED
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/results')}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Results
            </button>
            <button
              type="button"
              onClick={handleGenerateReport}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
