import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  User, 
  Mail, 
  Package, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  Eye, 
  Download, 
  Send, 
  Check, 
  X, 
  HelpCircle,
  Paperclip,
  ZoomIn,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  getComplaintById, 
  updateComplaintStatus, 
  subscribeComplaints 
} from '../services/complaintService';
import { useToast } from '../components/common/Toast';

export const OfficerComplaintDetail = () => {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [complaint, setComplaint] = useState(() => getComplaintById(complaintId));
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedEvidenceImage, setSelectedEvidenceImage] = useState(null);

  // Modals state
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestEvidenceModal, setShowRequestEvidenceModal] = useState(false);
  const [evidenceRequestReason, setEvidenceRequestReason] = useState(
    'Please upload a clearer high-resolution photo showing the mandatory declaration section on the product packaging.'
  );

  // Load and subscribe
  useEffect(() => {
    const item = getComplaintById(complaintId);
    setComplaint(item);
    if (item?.officerRemarks) {
      setOfficerRemarks(item.officerRemarks);
    }

    const unsubscribe = subscribeComplaints(() => {
      const refreshed = getComplaintById(complaintId);
      setComplaint(refreshed);
    });
    return () => unsubscribe();
  }, [complaintId]);

  if (!complaint) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Complaint Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested complaint identifier <code className="text-cyan-400">{complaintId}</code> does not exist in the enforcement database.
        </p>
        <Link
          to="/complaints"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Complaints List
        </Link>
      </div>
    );
  }

  const cId = complaint.complaintId || complaint.id;
  const pName = complaint.productName || complaint.product || 'Packaged Commodity';
  const status = (complaint.status || 'SUBMITTED').toUpperCase();
  const isSubmitted = status === 'SUBMITTED';
  const isUnderReview = status === 'UNDER_REVIEW' || status === 'UNDER REVIEW';
  const isResolved = status === 'RESOLVED' || status === 'VALIDATED';
  const isRejected = status === 'REJECTED';
  const isEvidenceRequired = status === 'ADDITIONAL_EVIDENCE_REQUIRED';

  // Handle Action: Start Review
  const handleStartReview = () => {
    const updated = updateComplaintStatus(
      cId,
      'UNDER_REVIEW',
      'Officer initiated formal preliminary complaint review.'
    );
    if (updated) {
      setComplaint(updated);
      addToast({
        type: 'info',
        title: 'Review Initiated',
        message: `Complaint ${cId} moved to Under Review. Customer notified.`,
      });
    }
  };

  // Handle Action: Validate / Accept Complaint
  const handleConfirmValidate = () => {
    const updated = updateComplaintStatus(
      cId,
      'RESOLVED',
      officerRemarks.trim() || 'Complaint validated following officer assessment.',
      'Complaint validated.'
    );
    if (updated) {
      setComplaint(updated);
      setShowValidateModal(false);
      addToast({
        type: 'success',
        title: 'Complaint Validated',
        message: `Complaint ${cId} has been resolved & validated. Customer notified.`,
      });
    }
  };

  // Handle Action: Reject Complaint
  const handleConfirmReject = () => {
    if (!officerRemarks.trim()) {
      addToast({
        type: 'error',
        title: 'Remarks Required',
        message: 'Please provide officer remarks explaining the reason for rejection.',
      });
      return;
    }
    const updated = updateComplaintStatus(
      cId,
      'REJECTED',
      officerRemarks.trim(),
      'Complaint rejected.'
    );
    if (updated) {
      setComplaint(updated);
      setShowRejectModal(false);
      addToast({
        type: 'info',
        title: 'Complaint Rejected',
        message: `Complaint ${cId} has been rejected. Customer notified.`,
      });
    }
  };

  // Handle Action: Request Additional Evidence
  const handleConfirmRequestEvidence = () => {
    if (!evidenceRequestReason.trim()) {
      addToast({
        type: 'error',
        title: 'Reason Required',
        message: 'Please specify the exact evidence required from the customer.',
      });
      return;
    }
    const updated = updateComplaintStatus(
      cId,
      'ADDITIONAL_EVIDENCE_REQUIRED',
      evidenceRequestReason.trim(),
      'Additional evidence requested.'
    );
    if (updated) {
      setComplaint(updated);
      setShowRequestEvidenceModal(false);
      addToast({
        type: 'warning',
        title: 'Evidence Requested',
        message: `Evidence request sent to customer for ${cId}.`,
      });
    }
  };

  const getStatusBadge = () => {
    if (isSubmitted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Clock className="w-3.5 h-3.5" /> Submitted
        </span>
      );
    }
    if (isUnderReview) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <RefreshCw className="w-3.5 h-3.5" /> Under Review
        </span>
      );
    }
    if (isEvidenceRequired) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
          <AlertTriangle className="w-3.5 h-3.5 text-purple-400" /> Evidence Requested
        </span>
      );
    }
    if (isResolved) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved / Validated
        </span>
      );
    }
    if (isRejected) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3.5 h-3.5" /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <Link to="/complaints" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Complaints Management
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-400 font-mono">{cId}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Complaint Details
            </h1>
            {getStatusBadge()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/complaints"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            &larr; Back to List
          </Link>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols on desktop): Information, Description, AI Analysis, Evidence */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Complaint Key Information Card */}
          <div className="bg-[#0c1e33] rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Grievance Profile
              </span>
              <span className="font-mono text-xs font-bold text-slate-400">
                Inspection Ref: {complaint.inspectionId || 'LM-2026-00129'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Complaint ID</span>
                <p className="font-mono font-bold text-white text-sm">{cId}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Product Name</span>
                <p className="font-bold text-white truncate">{pName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category</span>
                <p className="font-bold text-amber-300">{complaint.category || 'Consumer Care Issue'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer</span>
                <p className="font-bold text-white">{complaint.customerName || 'Customer'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Email</span>
                <p className="font-mono text-slate-300 truncate">{complaint.customerEmail || 'customer@labelsetu.gov.in'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Date Submitted</span>
                <p className="text-slate-300">{complaint.date || '09 Sep 2026'}</p>
              </div>
            </div>
          </div>

          {/* 2. Customer Description (Read-Only) */}
          <div className="bg-[#0c1e33] rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Customer Complaint Description</span>
            </div>
            <div className="p-4 rounded-xl bg-[#071220] border border-slate-800 text-xs text-slate-200 leading-relaxed italic">
              "{complaint.description || 'No description provided.'}"
            </div>
          </div>

          {/* 3. AI-Assisted Preliminary Analysis */}
          <div className="bg-[#0c1e33] rounded-2xl p-5 sm:p-6 border border-cyan-500/30 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>AI-Assisted Preliminary Analysis</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {complaint.aiAnalysis?.confidence ?? 88}% Confidence
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#071220] border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Screened Product</span>
                <p className="font-bold text-white">{pName}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#071220] border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Screening Result</span>
                <p className="font-bold text-amber-300">
                  {complaint.aiAnalysis?.issueDetected ?? true ? 'Potential Issue Detected' : 'No Apparent Issue'}
                </p>
              </div>

              <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#071220] border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Observation</span>
                <p className="font-medium text-slate-200">
                  {complaint.aiAnalysis?.issue || 'Consumer care contact information appears incomplete.'}
                </p>
              </div>
            </div>

            {/* Mandatory Statutory Advisory Note */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Important:</strong> This analysis is preliminary and does not constitute a final compliance or enforcement decision. The Officer must review evidence and execute statutory determinations.
              </span>
            </div>
          </div>

          {/* 4. Evidence Section (Primary + Additional) */}
          <div className="bg-[#0c1e33] rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Evidence & Scanned Product Media</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {1 + (complaint.additionalEvidence?.length || 0)} File(s) attached
              </span>
            </div>

            {/* Primary Evidence Image */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Primary Evidence (Customer Upload)
              </span>
              <div className="relative group rounded-xl overflow-hidden border border-slate-800 bg-[#071220] max-w-md">
                <img
                  src={complaint.image || complaint.imageUrl}
                  alt={pName}
                  className="w-full h-64 object-cover object-center group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => {
                      setSelectedEvidenceImage(complaint.image || complaint.imageUrl);
                      setIsImageModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" /> View Full Image
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Evidence If Any */}
            {Array.isArray(complaint.additionalEvidence) && complaint.additionalEvidence.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-purple-400" /> Supplementary Customer Evidence
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {complaint.additionalEvidence.map((ev, idx) => (
                    <div
                      key={ev.id || idx}
                      className="p-3 rounded-xl bg-[#071220] border border-purple-500/30 flex items-center gap-3"
                    >
                      {ev.url ? (
                        <img
                          src={ev.url}
                          alt={ev.name}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-700 shrink-0 cursor-pointer"
                          onClick={() => {
                            setSelectedEvidenceImage(ev.url);
                            setIsImageModalOpen(true);
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                      <div className="text-xs min-w-0 flex-1">
                        <p className="font-bold text-white truncate">{ev.name || 'Additional Image Evidence'}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{ev.date || 'Recently uploaded'}</p>
                        <p className="text-[10px] text-purple-300 truncate">{ev.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Officer Review Panel & Decision Actions */}
        <div className="space-y-6">
          {/* Officer Review Actions Card */}
          <div className="bg-[#0c1e33] rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-5 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm text-white">Officer Review</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Enforcement Action</span>
            </div>

            {/* Officer Remarks Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Officer Remarks & Statutory Notes
              </label>
              <textarea
                rows={4}
                value={officerRemarks}
                onChange={(e) => setOfficerRemarks(e.target.value)}
                placeholder="Enter regulatory justification, assessment notes, or required remediation instructions..."
                className="w-full p-3 rounded-xl bg-[#071220] border border-slate-700 text-white text-xs focus:outline-hidden focus:border-cyan-500 placeholder:text-slate-500"
              />
            </div>

            {/* Action Buttons based on status */}
            <div className="space-y-2.5 pt-2">
              {/* If SUBMITTED: Option to Start Review */}
              {isSubmitted && (
                <button
                  onClick={handleStartReview}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Start Review</span>
                </button>
              )}

              {/* Accept / Validate Complaint */}
              <button
                onClick={() => setShowValidateModal(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accept / Validate Complaint</span>
              </button>

              {/* Request Additional Evidence */}
              <button
                onClick={() => setShowRequestEvidenceModal(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-600 text-white shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Request Additional Evidence</span>
              </button>

              {/* Reject Complaint */}
              <button
                onClick={() => setShowRejectModal(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-700/80 hover:bg-rose-600 text-white shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject Complaint</span>
              </button>
            </div>

            {/* Current Decision Log if finalized */}
            {(isResolved || isRejected) && (
              <div className="p-3.5 rounded-xl bg-[#071220] border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Recorded Decision
                </span>
                <p className={`font-bold ${isResolved ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {complaint.officerDecision || (isResolved ? 'Complaint validated.' : 'Complaint rejected.')}
                </p>
                {complaint.officerRemarks && (
                  <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800 mt-1">
                    "{complaint.officerRemarks}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Audit Timeline Card */}
          <div className="bg-[#0c1e33] rounded-2xl p-5 border border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white pb-2 border-b border-slate-800">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Grievance Audit Trail</span>
            </div>

            <div className="space-y-3 relative pl-3 text-xs before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {(complaint.timeline || [
                {
                  status: 'SUBMITTED',
                  title: 'Complaint Submitted',
                  date: complaint.date || '09 Sep 2026',
                  note: 'Grievance submitted by Customer.',
                }
              ]).map((entry, idx) => (
                <div key={idx} className="relative pl-3 space-y-0.5">
                  <div className="absolute -left-3.25 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-[#0c1e33]" />
                  <p className="font-bold text-white">{entry.title}</p>
                  <p className="text-[10px] font-mono text-slate-400">{entry.date}</p>
                  {entry.note && (
                    <p className="text-[11px] text-slate-300 italic">{entry.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* MODAL 1: ACCEPT / VALIDATE CONFIRMATION */}
      {/* ───────────────────────────────────────────────────────── */}
      {showValidateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0c1e33] max-w-md w-full rounded-2xl p-6 border border-emerald-500/40 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">Validate & Accept Complaint</h3>
                <p className="text-xs text-slate-300">
                  Confirm that this complaint should proceed for statutory enforcement action?
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#071220] border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Complaint Reference</span>
              <p className="font-bold text-white">{cId} &bull; {pName}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowValidateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmValidate}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-colors cursor-pointer"
              >
                Confirm Validation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* MODAL 2: REJECT CONFIRMATION */}
      {/* ───────────────────────────────────────────────────────── */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0c1e33] max-w-md w-full rounded-2xl p-6 border border-rose-500/40 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">Reject Customer Complaint</h3>
                <p className="text-xs text-slate-300">
                  Are you sure you want to dismiss this complaint? An explanation is required for regulatory audit.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Reason for Rejection <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                value={officerRemarks}
                onChange={(e) => setOfficerRemarks(e.target.value)}
                placeholder="e.g. Insufficient evidence to validate the reported issue."
                className="w-full p-2.5 rounded-xl bg-[#071220] border border-slate-700 text-white text-xs focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-colors cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* MODAL 3: REQUEST ADDITIONAL EVIDENCE */}
      {/* ───────────────────────────────────────────────────────── */}
      {showRequestEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0c1e33] max-w-md w-full rounded-2xl p-6 border border-purple-500/40 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">Request Additional Evidence</h3>
                <p className="text-xs text-slate-300">
                  Notify customer to upload clearer packaging snapshots or supplementary proof.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Evidence Requirements & Instructions <span className="text-purple-400">*</span>
              </label>
              <textarea
                rows={3}
                value={evidenceRequestReason}
                onChange={(e) => setEvidenceRequestReason(e.target.value)}
                placeholder="e.g. Please upload a clearer image showing the MRP section."
                className="w-full p-2.5 rounded-xl bg-[#071220] border border-slate-700 text-white text-xs focus:outline-hidden focus:border-purple-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRequestEvidenceModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequestEvidence}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-colors cursor-pointer"
              >
                Send Request to Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* FULL EVIDENCE IMAGE VIEWER MODAL */}
      {/* ───────────────────────────────────────────────────────── */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-10 right-0 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedEvidenceImage || complaint.image || complaint.imageUrl}
              alt="Evidence Full View"
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-slate-700 shadow-2xl"
            />
            <p className="text-xs text-slate-400 mt-2 font-mono">{cId} - {pName}</p>
          </div>
        </div>
      )}
    </div>
  );
};
