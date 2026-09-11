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
  ChevronRight,
  Shield
} from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  getComplaintById, 
  updateComplaintStatus, 
  subscribeComplaints 
} from '../services/complaintService';
import { useToast } from '../components/common/Toast';
import { useLanguage } from '../context/LanguageContext';

export const OfficerComplaintDetail = () => {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const [complaint, setComplaint] = useState(() => getComplaintById(complaintId));
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedEvidenceImage, setSelectedEvidenceImage] = useState(null);

  // Modals state
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestEvidenceModal, setShowRequestEvidenceModal] = useState(false);
  const [rejectReason, setRejectReason] = useState(
    'Insufficient evidence to validate the reported statutory compliance issue.'
  );
  const [evidenceRequestReason, setEvidenceRequestReason] = useState(
    'Please upload a clearer high-resolution photo showing the mandatory declaration section on the product packaging.'
  );

  // Load and subscribe
  useEffect(() => {
    const item = getComplaintById(complaintId);
    setComplaint(item);
    if (item?.officerRemarks) {
      setOfficerRemarks(item.officerRemarks);
      setRejectReason(item.officerRemarks);
    }

    const unsubscribe = subscribeComplaints(() => {
      const refreshed = getComplaintById(complaintId);
      setComplaint(refreshed);
    });
    return () => unsubscribe();
  }, [complaintId]);

  if (!complaint) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{t('complaintNotFound', 'Complaint Not Found')}</h2>
        <p className="text-xs text-slate-500">
          {t('complaintNotFoundMsg', 'The requested complaint identifier does not exist in the enforcement database.')}{' '}
          <code className="text-cyan-700 font-mono font-bold">{complaintId}</code>
        </p>
        <Link
          to="/complaints"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t('backToComplaintsList', 'Back to Complaints List')}
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

  const getTranslatedCategory = (cat) => {
    if (!cat) return t('consumerCareIssue', 'Consumer Care Issue');
    if (cat.includes('MRP')) return t('incorrectMrp', 'Incorrect MRP');
    if (cat.includes('Quantity')) return t('incorrectQuantity', 'Incorrect Quantity');
    if (cat.includes('Missing')) return t('missingInformation', 'Missing Information');
    if (cat.includes('Labeling')) return t('labelingIssue', 'Labeling Issue');
    if (cat.includes('Consumer')) return t('consumerCareIssue', 'Consumer Care Issue');
    return cat;
  };

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
        title: t('reviewInitiated', 'Review Initiated'),
        message: `${cId} ${t('reviewInitiatedMsg', 'moved to Under Review. Customer notified.')}`,
      });
    }
  };

  // Handle Action: Validate / Accept Complaint
  const handleConfirmValidate = () => {
    const finalRemarks = (officerRemarks || 'Complaint validated following officer assessment.').trim();
    const updated = updateComplaintStatus(
      cId,
      'RESOLVED',
      finalRemarks,
      'Complaint validated.'
    );
    if (updated) {
      setComplaint(updated);
      setShowValidateModal(false);
      addToast({
        type: 'success',
        title: t('complaintValidatedToast', 'Complaint Validated'),
        message: `${cId} ${t('complaintValidatedMsg', 'has been resolved & validated. Customer notified.')}`,
      });
    }
  };

  // Handle Action: Reject Complaint
  const handleConfirmReject = () => {
    const finalReason = (rejectReason || officerRemarks || 'Insufficient evidence to validate the reported statutory compliance issue.').trim();
    const updated = updateComplaintStatus(
      cId,
      'REJECTED',
      finalReason,
      'Complaint rejected.'
    );
    if (updated) {
      setComplaint(updated);
      setOfficerRemarks(finalReason);
      setShowRejectModal(false);
      addToast({
        type: 'info',
        title: t('complaintRejectedToast', 'Complaint Rejected'),
        message: `${cId} ${t('complaintRejectedMsg', 'has been rejected. Customer notified.')}`,
      });
    }
  };

  // Handle Action: Request Additional Evidence
  const handleConfirmRequestEvidence = () => {
    const finalEvidenceReason = (evidenceRequestReason || 'Please upload a clearer image showing the mandatory declarations.').trim();
    const updated = updateComplaintStatus(
      cId,
      'ADDITIONAL_EVIDENCE_REQUIRED',
      finalEvidenceReason,
      'Additional evidence requested.'
    );
    if (updated) {
      setComplaint(updated);
      setShowRequestEvidenceModal(false);
      addToast({
        type: 'warning',
        title: t('evidenceRequestedToast', 'Evidence Requested'),
        message: `${t('evidenceRequestedMsg', 'Evidence request sent to customer for')} ${cId}.`,
      });
    }
  };

  const getStatusBadge = () => {
    if (isSubmitted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
          <Clock className="w-3.5 h-3.5 text-amber-600" /> {t('submitted', 'Submitted')}
        </span>
      );
    }
    if (isUnderReview) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200/80">
          <RefreshCw className="w-3.5 h-3.5 text-sky-600" /> {t('underReview', 'Under Review')}
        </span>
      );
    }
    if (isEvidenceRequired) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80">
          <AlertTriangle className="w-3.5 h-3.5 text-purple-600" /> {t('evidenceRequested', 'Evidence Requested')}
        </span>
      );
    }
    if (isResolved) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t('resolvedValidated', 'Resolved / Validated')}
        </span>
      );
    }
    if (isRejected) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80">
          <XCircle className="w-3.5 h-3.5 text-rose-600" /> {t('rejected', 'Rejected')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5">
            <Link to="/complaints" className="hover:text-slate-800 transition-colors flex items-center gap-1 font-semibold text-cyan-700">
              <ArrowLeft className="w-3.5 h-3.5" /> {t('complaintsManagement', 'Complaints Management')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-bold font-mono">{cId}</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('complaintDetails', 'Complaint Details')}
            </h1>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-400">
              {cId}
            </span>
            {getStatusBadge()}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/complaints"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {t('backToComplaints', 'Back to Complaints')}
          </Link>
        </div>
      </div>

      {/* Main Grid: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2 Cols): Details & Evidence */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Overview & Meta Details */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-600" />
                <h2 className="font-bold text-sm text-slate-900">{t('grievanceOverview', 'Grievance Overview')}</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {t('inspectionRef', 'Inspection Ref')}: <strong className="text-cyan-700">{complaint.inspectionId || 'INS-2026-0001'}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('productName', 'Product Name')}</span>
                <p className="font-bold text-slate-900 text-sm">{pName}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('complaintCategory', 'Complaint Category')}</span>
                <p className="font-bold text-rose-700 text-sm">{getTranslatedCategory(complaint.category)}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('complainantCustomer', 'Customer / Complainant')}</span>
                <p className="font-semibold text-slate-900">{complaint.customerName || t('customer', 'Customer')}</p>
                <p className="text-[11px] text-slate-500 font-mono">{complaint.customerEmail || 'customer@labelsetu.gov.in'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('dateFiled', 'Date Filed')}</span>
                <p className="font-mono text-slate-700">{complaint.date || '09 Sep 2026'}</p>
                <p className="text-[10px] text-slate-500">{t('status', 'Status')}: <strong className="text-cyan-700">{status}</strong></p>
              </div>
            </div>

            {/* Customer Description */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-600" />
                {t('customerGrievanceStatement', 'Customer Grievance Statement (Read-Only)')}
              </label>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed italic">
                "{complaint.description || t('noNarrativeSubmitted', 'No detailed grievance narrative was submitted.')}"
              </div>
            </div>
          </div>

          {/* Card 2: AI Preliminary Analysis */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <h3 className="font-bold text-sm text-slate-900">{t('aiAssistedPreliminaryAnalysis', 'AI-Assisted Preliminary Analysis')}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                {complaint.aiAnalysis?.confidence || 88}% {t('confidence', 'Confidence')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('screenedProduct', 'Screened Product')}</span>
                <p className="font-bold text-slate-900">{pName}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t('screeningResult', 'Screening Result')}</span>
                <p className="font-bold text-amber-700">{t('potentialIssueDetected', 'Potential Issue Detected')}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t('identifiedObservation', 'Identified Observation')}</span>
              <p className="text-slate-800 leading-relaxed font-medium">
                {complaint.aiAnalysis?.issue || 'Potential consumer care helpline or packaging declaration inconsistency detected.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {t('statutoryNoticeAi', 'Statutory Notice: This preliminary analysis is generated for supervisory assistance and does not constitute a final regulatory determination. The Enforcement Officer must execute statutory judgment.')}
              </span>
            </div>
          </div>

          {/* Card 3: Evidence & Image Viewer */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-600" />
                <h3 className="font-bold text-sm text-slate-900">{t('evidenceAndMedia', 'Evidence & Scanned Product Media')}</h3>
              </div>
              <span className="text-xs text-slate-500">
                {(complaint.additionalEvidence?.length || 0) + 1} {t('filesAttached', 'File(s) attached')}
              </span>
            </div>

            {/* Primary Submitted Image */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {t('primaryEvidenceCustomer', 'Primary Evidence (Customer Upload)')}
              </span>
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 max-h-96 flex items-center justify-center p-3 group">
                <img
                  src={complaint.image || complaint.imageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600'}
                  alt="Product Evidence"
                  className="max-h-80 w-auto object-contain rounded-xl shadow-xs transition-transform duration-200 group-hover:scale-[1.01]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvidenceImage(complaint.image || complaint.imageUrl);
                    setIsImageModalOpen(true);
                  }}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900/90 hover:bg-slate-900 text-cyan-400 border border-slate-700 shadow-md backdrop-blur-xs transition-all cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{t('enlargeEvidence', 'Enlarge Evidence')}</span>
                </button>
              </div>
            </div>

            {/* Additional Evidence If Any */}
            {Array.isArray(complaint.additionalEvidence) && complaint.additionalEvidence.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-purple-600" /> {t('supplementaryCustomerEvidence', 'Supplementary Customer Evidence')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {complaint.additionalEvidence.map((ev, idx) => (
                    <div
                      key={ev.id || idx}
                      className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-200 flex items-center gap-3"
                    >
                      {ev.url ? (
                        <img
                          src={ev.url}
                          alt={ev.name}
                          className="w-12 h-12 object-cover rounded-lg border border-purple-200 shrink-0 cursor-pointer"
                          onClick={() => {
                            setSelectedEvidenceImage(ev.url);
                            setIsImageModalOpen(true);
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-purple-100 border border-purple-300 text-purple-700 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                      )}
                      <div className="text-xs min-w-0 flex-1">
                        <p className="font-bold text-slate-900 truncate">{ev.name || t('additionalImageEvidence', 'Additional Image Evidence')}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{ev.date || 'Recently uploaded'}</p>
                        <p className="text-[10px] text-purple-700 truncate">{ev.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Officer Review Panel & Decision Actions */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {/* Officer Review Actions Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <h3 className="font-bold text-sm text-slate-900">{t('officerReview', 'Officer Review')}</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">{t('enforcementAction', 'Enforcement Action')}</span>
            </div>

            {/* Officer Remarks Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {t('officerRemarksNotes', 'Officer Remarks & Statutory Notes')}
              </label>
              <textarea
                rows={4}
                value={officerRemarks}
                onChange={(e) => {
                  setOfficerRemarks(e.target.value);
                  setRejectReason(e.target.value);
                }}
                placeholder={t('officerRemarksPlaceholder', 'Enter regulatory justification, assessment notes, or required remediation instructions...')}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:bg-white placeholder:text-slate-400"
              />
            </div>

            {/* Action Buttons based on status */}
            <div className="space-y-2.5 pt-2">
              {/* If SUBMITTED: Option to Start Review */}
              {isSubmitted && (
                <button
                  type="button"
                  onClick={handleStartReview}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t('startReview', 'Start Review')}</span>
                </button>
              )}

              {/* Accept / Validate Complaint */}
              <button
                type="button"
                onClick={() => setShowValidateModal(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('acceptValidateComplaint', 'Accept / Validate Complaint')}</span>
              </button>

              {/* Request Additional Evidence */}
              <button
                type="button"
                onClick={() => setShowRequestEvidenceModal(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t('requestAdditionalEvidence', 'Request Additional Evidence')}</span>
              </button>

              {/* Reject Complaint */}
              <button
                type="button"
                onClick={() => {
                  setRejectReason(officerRemarks.trim() || 'Insufficient evidence to validate the reported statutory compliance issue.');
                  setShowRejectModal(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>{t('rejectComplaint', 'Reject Complaint')}</span>
              </button>
            </div>

            {/* Current Decision Log if finalized */}
            {(isResolved || isRejected) && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {t('recordedDecision', 'Recorded Decision')}
                </span>
                <p className={`font-bold ${isResolved ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {complaint.officerDecision || (isResolved ? t('complaintValidated', 'Complaint validated.') : t('complaintRejected', 'Complaint rejected.'))}
                </p>
                {complaint.officerRemarks && (
                  <p className="text-slate-600 text-[11px] pt-1 border-t border-slate-200 mt-1">
                    "{complaint.officerRemarks}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Audit Timeline Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>{t('grievanceAuditTrail', 'Grievance Audit Trail')}</span>
            </div>

            <div className="space-y-3 relative pl-3 text-xs before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {(complaint.timeline || [
                {
                  status: 'SUBMITTED',
                  title: t('complaintSubmitted', 'Complaint Submitted'),
                  date: complaint.date || '09 Sep 2026',
                  note: t('grievanceSubmittedByCustomer', 'Grievance submitted by Customer.'),
                }
              ]).map((entry, idx) => (
                <div key={idx} className="relative pl-3 space-y-0.5">
                  <div className="absolute -left-3.25 top-1 w-2.5 h-2.5 rounded-full bg-cyan-600 ring-4 ring-white" />
                  <p className="font-bold text-slate-900">{entry.title}</p>
                  <p className="text-[10px] font-mono text-slate-500">{entry.date}</p>
                  {entry.note && (
                    <p className="text-[11px] text-slate-600 italic">{entry.note}</p>
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
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-emerald-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900">{t('validateModalTitle', 'Validate & Accept Complaint')}</h3>
                <p className="text-xs text-slate-600">
                  {t('validateModalDesc', 'Confirm that this complaint should proceed for statutory enforcement action?')}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t('complaintReference', 'Complaint Reference')}</span>
              <p className="font-bold text-slate-900">{cId} &bull; {pName}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowValidateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmValidate}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                {t('confirmValidation', 'Confirm Validation')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* MODAL 2: REJECT COMPLAINT */}
      {/* ───────────────────────────────────────────────────────── */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-rose-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <XCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900">{t('rejectModalTitle', 'Reject Customer Complaint')}</h3>
                <p className="text-xs text-slate-600">
                  {t('rejectModalDesc', 'Are you sure you want to dismiss this complaint? An explanation is required for regulatory audit.')}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {t('reasonForRejection', 'Reason for Rejection')} <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Insufficient evidence to validate the reported issue."
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                {t('confirmRejection', 'Confirm Rejection')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* MODAL 3: REQUEST ADDITIONAL EVIDENCE */}
      {/* ───────────────────────────────────────────────────────── */}
      {showRequestEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-purple-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900">{t('requestEvidenceModalTitle', 'Request Additional Evidence')}</h3>
                <p className="text-xs text-slate-600">
                  {t('requestEvidenceModalDesc', 'Notify customer to upload clearer packaging snapshots or supplementary proof.')}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {t('evidenceRequirementsInstructions', 'Evidence Requirements & Instructions')} <span className="text-purple-600">*</span>
              </label>
              <textarea
                rows={3}
                value={evidenceRequestReason}
                onChange={(e) => setEvidenceRequestReason(e.target.value)}
                placeholder="e.g. Please upload a clearer image showing the MRP section."
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRequestEvidenceModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmRequestEvidence}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                {t('sendRequestToCustomer', 'Send Request to Customer')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* FULL EVIDENCE IMAGE VIEWER MODAL */}
      {/* ───────────────────────────────────────────────────────── */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-10 right-0 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedEvidenceImage || complaint.image || complaint.imageUrl}
              alt={t('evidenceFullView', 'Evidence Full View')}
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-slate-700 shadow-2xl bg-slate-900"
            />
            <p className="text-xs text-slate-300 mt-2 font-mono">{cId} - {pName}</p>
          </div>
        </div>
      )}
    </div>
  );
};
