import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  X, 
  MessageSquare, 
  FileEdit, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { REVIEW_STORAGE_KEY } from '../../data/mockReviewData';

export const OfficerReview = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  targetFinding = null,
  onSaveReview,
  savedReview = null,
}) => {
  const navigate = useNavigate();
  const [decision, setDecision] = useState('Needs Further Review');
  const [observation, setObservation] = useState('');

  // Check localStorage for a completed review
  const localReview = (() => {
    try {
      const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.reviewStatus === 'REVIEWED' ? parsed : null;
      }
    } catch (_) {}
    return null;
  })();

  const activeReview = savedReview || localReview;

  const decisionsList = [
    {
      id: 'confirm',
      title: 'Confirm Finding',
      desc: 'Affirm the automated detection as a potential statutory non-compliance.',
      color: 'border-rose-500 bg-rose-50/40 text-rose-900',
    },
    {
      id: 'reject',
      title: 'Reject Finding',
      desc: 'Label element complies upon visual manual officer inspection.',
      color: 'border-emerald-500 bg-emerald-50/40 text-emerald-900',
    },
    {
      id: 'review',
      title: 'Needs Further Review',
      desc: 'Requires physical lab measurement or clarification from packaging manufacturer.',
      color: 'border-amber-500 bg-amber-50/40 text-amber-900',
    },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (onSaveReview) {
      onSaveReview({
        decision,
        observation: observation || 'Officer reviewed and logged notes on Legal Metrology declarations.',
        targetItem: targetFinding?.title || targetFinding?.fieldName || 'Overall Inspection',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        officer: 'Officer Rajesh Kumar (LM-ENF-2026-894)',
      });
    }
    setObservation('');
    onCloseModal();
  };

  return (
    <>
      {/* Officer Review Section Card at bottom of page */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0c1e33] text-white flex items-center justify-center shrink-0 shadow-xs">
              <UserCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Officer Review
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.2 rounded border border-slate-200">
                  Enforcement Stage
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                AI findings should be verified by an authorized officer.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => navigate(`/review/LM-2026-00129`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              <FileEdit className="w-3.5 h-3.5 text-slate-500" />
              <span>Review Findings</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/review/LM-2026-00129`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add Observation</span>
            </button>
          </div>
        </div>

        {/* Display Saved Review if Officer Logged One */}
        {activeReview ? (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-900">
                  ✓ Officer Review Completed
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {activeReview.reviewDate ? new Date(activeReview.reviewDate).toLocaleDateString('en-IN') : ''}
              </span>
            </div>
            <p className="text-slate-700 pl-6">
              Final Assessment: <strong>{activeReview.finalAssessment}</strong>
            </p>
          </div>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-2 italic">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>No formal officer endorsement has been submitted yet for this session.</span>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onCloseModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0c1e33] text-white flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Enforcement Officer Review
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Inspection ID: LM-2026-00129
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onCloseModal}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Target Item Pill */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Reviewing Item
                </span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  {targetFinding?.title || targetFinding?.fieldName || 'Complete Inspection Findings'}
                </p>
              </div>

              {/* Officer Decision Radio Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Officer Decision
                </label>
                <div className="space-y-2">
                  {decisionsList.map((d) => (
                    <label
                      key={d.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        decision === d.title
                          ? `${d.color} ring-2 ring-slate-800/10 shadow-2xs`
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="officerDecision"
                        value={d.title}
                        checked={decision === d.title}
                        onChange={(e) => setDecision(e.target.value)}
                        className="mt-0.5 text-cyan-600 focus:ring-cyan-500"
                      />
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold block">{d.title}</span>
                        <span className="text-[11px] text-slate-500 block leading-tight">
                          {d.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Observation Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  Observation
                </label>
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="Enter authorized officer observations, verification notes, or instructions for compliance notice..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-600 resize-none bg-slate-50/50"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-[#0c1e33] hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
