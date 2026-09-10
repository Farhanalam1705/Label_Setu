import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertCircle, 
  PlusCircle, 
  Camera, 
  Upload, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Sparkles, 
  Send, 
  Check, 
  Search, 
  Eye, 
  Info, 
  ShieldCheck, 
  Edit3, 
  X, 
  Download, 
  ExternalLink,
  Trash2,
  Loader2,
  Paperclip,
  CheckSquare,
  Square
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DEMO_PRESET_SCENARIOS } from '../../data/complaintsMockData';
import { useToast } from '../../components/common/Toast';
import { CameraModal } from '../../components/scanner/CameraModal';
import { 
  getComplaints, 
  createComplaint, 
  addAdditionalEvidence, 
  deleteComplaints, 
  subscribeComplaints 
} from '../../services/complaintService';
import { useLanguage } from '../../context/LanguageContext';

export const CustomerComplaints = () => {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const additionalEvidenceInputRef = useRef(null);
  const modalEvidenceInputRef = useRef(null);

  // Complaints State connected to shared service
  const [complaints, setComplaints] = useState(() => getComplaints());

  // Selected Complaint for Details / Tracking Modal
  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState(null);

  // Workflow view state: 'list' | 'upload' | 'preview' | 'analyzing' | 'eligibility' | 'form' | 'success'
  const [viewState, setViewState] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Subscribe to live multi-tab & local updates
  useEffect(() => {
    setComplaints(getComplaints());
    const unsubscribe = subscribeComplaints((updated) => {
      setComplaints(updated);
      // Auto refresh selected modal if open
      if (selectedComplaintDetail) {
        const curId = selectedComplaintDetail.complaintId || selectedComplaintDetail.id;
        const refreshed = updated.find(
          (c) => (c.complaintId && c.complaintId === curId) || (c.id && c.id === curId)
        );
        if (refreshed) {
          setSelectedComplaintDetail(refreshed);
        }
      }
    });
    return () => unsubscribe();
  }, [selectedComplaintDetail]);

  // Sync route param with modal view
  useEffect(() => {
    if (complaintId) {
      const found = complaints.find((c) => c.id === complaintId);
      if (found) {
        setSelectedComplaintDetail(found);
      }
    }
  }, [complaintId, complaints]);

  const handleCloseDetail = () => {
    setSelectedComplaintDetail(null);
    if (complaintId) {
      navigate('/customer/complaints', { replace: true });
    }
  };

  // Camera Modal State
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Multi-step form state
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('eligible'); // 'eligible' | 'rejected'
  const [uploadedImage, setUploadedImage] = useState(DEMO_PRESET_SCENARIOS.eligible.imageUrl);
  const [productName, setProductName] = useState(DEMO_PRESET_SCENARIOS.eligible.product);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [activeAnalysisResult, setActiveAnalysisResult] = useState(DEMO_PRESET_SCENARIOS.eligible);

  // Form inputs & validation state
  const [complaintCategory, setComplaintCategory] = useState('Consumer Care Issue');
  const [complaintDescription, setComplaintDescription] = useState('Consumer care contact number appears truncated or masked on the rear packaging panel.');
  const [additionalEvidenceName, setAdditionalEvidenceName] = useState('');
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  // Filtered complaints list
  const filteredComplaints = complaints.filter((c) => {
    const pName = c.productName || c.product || '';
    const cId = c.complaintId || c.id || '';
    const cat = c.category || c.issue || '';
    const status = (c.status || '').toUpperCase();

    const matchesSearch = 
      pName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && (
      status === statusFilter.toUpperCase() ||
      (statusFilter === 'UNDER_REVIEW' && (status === 'UNDER REVIEW' || status === 'ADDITIONAL_EVIDENCE_REQUIRED')) ||
      (statusFilter === 'RESOLVED' && (status === 'RESOLVED' || status === 'VALIDATED'))
    );
  });

  // Multi-selection state for deleting complaints
  const [selectedComplaintIds, setSelectedComplaintIds] = useState([]);

  // Toggle select all filtered complaints
  const handleToggleSelectAll = () => {
    if (filteredComplaints.length === 0) return;
    const allFilteredSelected = filteredComplaints.every((c) => 
      selectedComplaintIds.includes(c.complaintId || c.id)
    );
    if (allFilteredSelected) {
      const filteredIds = new Set(filteredComplaints.map((c) => c.complaintId || c.id));
      setSelectedComplaintIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      const newIds = new Set([...selectedComplaintIds, ...filteredComplaints.map((c) => c.complaintId || c.id)]);
      setSelectedComplaintIds(Array.from(newIds));
    }
  };

  // Toggle single item selection
  const handleToggleSelect = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedComplaintIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Delete selected complaints
  const handleDeleteSelected = () => {
    if (selectedComplaintIds.length === 0) return;
    const count = selectedComplaintIds.length;
    if (window.confirm(`Are you sure you want to delete ${count} selected complaint(s)?`)) {
      const updated = deleteComplaints(selectedComplaintIds);
      setComplaints(updated);
      setSelectedComplaintIds([]);
      if (selectedComplaintDetail && selectedComplaintIds.includes(selectedComplaintDetail.complaintId || selectedComplaintDetail.id)) {
        handleCloseDetail();
      }
      addToast({
        type: 'success',
        title: 'Data Deleted',
        message: `${count} complaint record(s) deleted successfully.`,
      });
    }
  };

  // Delete single complaint
  const handleDeleteSingle = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete complaint record ${id}?`)) {
      const updated = deleteComplaints([id]);
      setComplaints(updated);
      setSelectedComplaintIds((prev) => prev.filter((itemId) => itemId !== id));
      if ((selectedComplaintDetail?.complaintId || selectedComplaintDetail?.id) === id) {
        handleCloseDetail();
      }
      addToast({
        type: 'success',
        title: 'Complaint Deleted',
        message: `Complaint ${id} removed successfully.`,
      });
    }
  };

  // Handle live camera photo capture
  const handleCameraCapture = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setProductName('Captured Packaged Product');
      setSelectedScenarioKey('eligible');
      setActiveAnalysisResult({
        product: 'Captured Packaged Product',
        issueDetected: true,
        issue: 'Consumer care helpline and MRP typography declaration requires officer verification.',
        confidence: 89,
        category: 'Consumer Care Issue',
        result: 'ELIGIBLE',
      });
      setComplaintCategory('Consumer Care Issue');
      setComplaintDescription('Captured product packaging panel requires verification.');
      setConfirmationChecked(false);
      setViewState('preview');
      addToast({
        title: 'Image Captured',
        message: 'Photo captured from scanner camera ready for analysis.',
        type: 'success',
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle custom file upload from disk
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        const autoName = file.name.split('.')[0].replace(/[-_]/g, ' ') || 'Packaged Product';
        setProductName(autoName);
        setSelectedScenarioKey('eligible');
        setActiveAnalysisResult({
          product: autoName,
          issueDetected: true,
          issue: 'Statutory declarations require officer review for font clarity & net quantity.',
          confidence: 87,
          category: 'Missing Information',
          result: 'ELIGIBLE',
        });
        setComplaintCategory('Missing Information');
        setComplaintDescription(`Uploaded product packaging label [${file.name}] requires verification.`);
        setConfirmationChecked(false);
        setViewState('preview');
        addToast({
          title: 'Image Uploaded',
          message: `${file.name} ready for preliminary analysis.`,
          type: 'success',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle optional additional evidence upload in creation form
  const handleAdditionalEvidenceChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAdditionalEvidenceName(file.name);
      addToast({
        title: 'Additional Evidence Attached',
        message: `${file.name} attached to complaint submission.`,
        type: 'success',
      });
    }
  };

  // Handle customer uploading supplementary evidence when requested by officer
  const handleModalEvidenceUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && selectedComplaintDetail) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const cId = selectedComplaintDetail.complaintId || selectedComplaintDetail.id;
        const updated = addAdditionalEvidence(cId, {
          name: file.name,
          url: event.target.result,
          notes: 'Uploaded by customer in response to officer request.',
        });
        if (updated) {
          setSelectedComplaintDetail(updated);
          addToast({
            type: 'success',
            title: 'Evidence Submitted',
            message: `Supplementary evidence (${file.name}) submitted. Status updated to Under Review.`,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger Demo Scenario Presets
  const handleSelectScenario = (key) => {
    const scenario = DEMO_PRESET_SCENARIOS[key];
    setSelectedScenarioKey(key);
    setUploadedImage(scenario.imageUrl);
    setProductName(scenario.product);
    setActiveAnalysisResult(scenario);
    if (key === 'eligible') {
      setComplaintCategory(scenario.category);
      setComplaintDescription('Consumer care contact telephone number is truncated on the principal display panel.');
    }
    setConfirmationChecked(false);
    setViewState('preview');
  };

  // Start Simulated AI Analysis
  const handleStartAnalysis = () => {
    setViewState('analyzing');
    setAnalysisProgress(0);
    setAnalysisStepIndex(0);

    // Simulated progress pipeline
    const timer1 = setTimeout(() => {
      setAnalysisStepIndex(1);
      setAnalysisProgress(30);
    }, 500);

    const timer2 = setTimeout(() => {
      setAnalysisStepIndex(2);
      setAnalysisProgress(65);
    }, 1100);

    const timer3 = setTimeout(() => {
      setAnalysisStepIndex(3);
      setAnalysisProgress(95);
    }, 1700);

    const timer4 = setTimeout(() => {
      setAnalysisProgress(100);
      setViewState('eligibility');
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  // Submit Complaint with brief loading state
  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    if (!confirmationChecked || !complaintCategory || !complaintDescription.trim() || !uploadedImage) {
      addToast({
        type: 'error',
        title: 'Incomplete Submission',
        message: 'Please complete all required fields and confirm declaration.',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord = createComplaint({
        productName: productName || 'ABC Premium Rice',
        category: complaintCategory,
        description: complaintDescription,
        image: uploadedImage,
        aiAnalysis: {
          issueDetected: activeAnalysisResult?.issueDetected ?? true,
          confidence: activeAnalysisResult?.confidence || 88,
          issue: activeAnalysisResult?.issue || 'Potential compliance discrepancy detected.',
        },
        eligibility: activeAnalysisResult?.issueDetected ? 'ELIGIBLE' : 'REJECTED',
        additionalEvidence: additionalEvidenceName
          ? [{ name: additionalEvidenceName, notes: 'Attached during complaint submission' }]
          : [],
      });

      setSubmittedComplaint(newRecord);
      setIsSubmitting(false);
      setViewState('success');

      addToast({
        title: 'Complaint Submitted',
        message: `Grievance ${newRecord.complaintId} submitted for Legal Metrology Officer review.`,
        type: 'success',
      });
    }, 800);
  };

  const getStatusBadge = (statusStr) => {
    const norm = (statusStr || '').toUpperCase();
    if (norm === 'RESOLVED' || norm === 'VALIDATED') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          {t('resolved', 'Resolved')}
        </span>
      );
    }
    if (norm === 'UNDER REVIEW' || norm === 'UNDER_REVIEW') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
          <Clock className="w-3 h-3" />
          {t('needsReview', 'Under Review')}
        </span>
      );
    }
    if (norm === 'ADDITIONAL EVIDENCE REQUESTED' || norm === 'ADDITIONAL_EVIDENCE_REQUIRED') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
          <Paperclip className="w-3 h-3" />
          {t('evidenceRequested', 'Evidence Requested')}
        </span>
      );
    }
    if (norm === 'REJECTED') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
          <XCircle className="w-3 h-3" />
          {t('rejected', 'Rejected')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
        <Send className="w-3 h-3" />
        {t('submitted', 'Submitted')}
      </span>
    );
  };

  return (
    <div className="space-y-6 text-white pb-8">
      {/* Live Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Hidden file input for modal evidence upload */}
      <input
        type="file"
        ref={modalEvidenceInputRef}
        onChange={handleModalEvidenceUpload}
        className="hidden"
        accept="image/*"
      />

      {/* ───────────────────────────────────────────────────────── */}
      {/* FEATURE 3: COMPLAINT DETAILS & TRACKING MODAL */}
      {/* ───────────────────────────────────────────────────────── */}
      {selectedComplaintDetail && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#0f1b2d] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-white">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#0f1b2d]/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Complaint Tracking: <span className="font-mono text-rose-400">{selectedComplaintDetail.complaintId || selectedComplaintDetail.id}</span>
                    </h3>
                    {getStatusBadge(selectedComplaintDetail.status)}
                  </div>
                  <p className="text-xs text-slate-400">
                    Logged under Legal Metrology Grievance Registry &bull; View-Only
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseDetail}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Complaint Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#142237] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Product Name</span>
                  <p className="text-sm font-bold text-white">{selectedComplaintDetail.productName || selectedComplaintDetail.product}</p>
                </div>
                <div className="bg-[#142237] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Complaint Category</span>
                  <p className="text-sm font-bold text-rose-300">{selectedComplaintDetail.category || selectedComplaintDetail.issue}</p>
                </div>
                <div className="bg-[#142237] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Date Filed</span>
                  <p className="text-xs font-mono text-slate-200">{selectedComplaintDetail.date || '09 Sep 2026'}</p>
                </div>
                <div className="bg-[#142237] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Current Status</span>
                  <div>{getStatusBadge(selectedComplaintDetail.status)}</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 block">Reported Grievance Description:</span>
                <p className="text-xs text-slate-300 bg-[#142237] p-3.5 rounded-xl border border-slate-800 leading-relaxed italic">
                  "{selectedComplaintDetail.description || 'No description entered.'}"
                </p>
              </div>

              {/* Officer Decision / Status Alert */}
              {(selectedComplaintDetail.status === 'RESOLVED' || selectedComplaintDetail.status === 'Resolved' || selectedComplaintDetail.status === 'VALIDATED') && (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ Complaint Validated & Resolved</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Officer Decision:</strong> {selectedComplaintDetail.officerDecision || 'Complaint validated.'}
                  </p>
                  {selectedComplaintDetail.officerRemarks && (
                    <p className="text-xs text-slate-300">
                      <strong>Remarks:</strong> {selectedComplaintDetail.officerRemarks}
                    </p>
                  )}
                </div>
              )}

              {(selectedComplaintDetail.status === 'REJECTED' || selectedComplaintDetail.status === 'Rejected') && (
                <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                    <XCircle className="w-4 h-4" />
                    <span>✕ Complaint Rejected</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Officer Remarks:</strong> {selectedComplaintDetail.officerRemarks || selectedComplaintDetail.officerResponse || 'Complaint could not be validated based on the available evidence.'}
                  </p>
                </div>
              )}

              {(selectedComplaintDetail.status === 'ADDITIONAL_EVIDENCE_REQUIRED' || selectedComplaintDetail.status === 'Additional Evidence Requested') && (
                <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                    <Paperclip className="w-4 h-4" />
                    <span>Additional evidence has been requested by the enforcement officer.</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-purple-900/30 p-2.5 rounded-lg border border-purple-500/20">
                    <strong>Officer Request:</strong> "{selectedComplaintDetail.officerRemarks || 'Please upload an additional high-resolution photo of the packaging panel.'}"
                  </p>
                  <button
                    onClick={() => modalEvidenceInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Additional Evidence</span>
                  </button>
                </div>
              )}

              {/* Attached Evidence & Preliminary AI Evaluation */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Uploaded Evidence & AI Preliminary Analysis:</span>
                <div className="bg-[#142237] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                  {(selectedComplaintDetail.image || selectedComplaintDetail.imageUrl) && (
                    <img
                      src={selectedComplaintDetail.image || selectedComplaintDetail.imageUrl}
                      alt="Complaint Evidence"
                      className="w-28 h-28 object-cover rounded-xl border border-slate-700 shrink-0"
                    />
                  )}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        ✓ Image Verified
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {selectedComplaintDetail.aiAnalysis?.confidence || selectedComplaintDetail.confidence || 88}% Confidence
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white">AI-Assisted Preliminary Validation</p>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {selectedComplaintDetail.aiAnalysis?.issue || 'Potential issue flagged during preliminary scan.'}
                    </p>
                    {Array.isArray(selectedComplaintDetail.additionalEvidence) && selectedComplaintDetail.additionalEvidence.length > 0 && (
                      <div className="pt-1.5 space-y-1">
                        <span className="text-[10px] font-bold text-purple-300 uppercase block">Supplementary Evidence:</span>
                        {selectedComplaintDetail.additionalEvidence.map((ev, i) => (
                          <p key={i} className="text-[11px] text-purple-300 font-mono flex items-center gap-1">
                            <Paperclip className="w-3 h-3" /> {ev.name || `File ${i + 1}`} ({ev.date || 'Uploaded'})
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-[#142237] p-5 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">Complaint Status Timeline:</span>
                <div className="space-y-3 pl-2 text-xs">
                  {/* Step 1: Submitted */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-white">Complaint Submitted</span>
                      <span className="text-slate-400 ml-2">({selectedComplaintDetail.date || '09 Sep 2026'})</span>
                    </div>
                  </div>

                  {/* Step 2: Under Review */}
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      selectedComplaintDetail.status !== 'SUBMITTED' && selectedComplaintDetail.status !== 'Submitted'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400 animate-pulse'
                    }`}>
                      {selectedComplaintDetail.status !== 'SUBMITTED' && selectedComplaintDetail.status !== 'Submitted' ? '✓' : '⏳'}
                    </div>
                    <div>
                      <span className={selectedComplaintDetail.status !== 'SUBMITTED' && selectedComplaintDetail.status !== 'Submitted' ? 'font-bold text-white' : 'font-bold text-amber-300'}>
                        Under Officer Review
                      </span>
                      <span className="text-slate-400 ml-2">
                        {selectedComplaintDetail.status !== 'SUBMITTED' && selectedComplaintDetail.status !== 'Submitted' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Step 3: Evidence Requested if active */}
                  {(selectedComplaintDetail.status === 'ADDITIONAL_EVIDENCE_REQUIRED' || selectedComplaintDetail.status === 'Additional Evidence Requested') && (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                        ⚠
                      </div>
                      <div>
                        <span className="font-bold text-purple-300">Additional Evidence Required</span>
                        <span className="text-slate-400 ml-2">Action needed from customer</span>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Officer Decision */}
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      ['RESOLVED', 'Resolved', 'VALIDATED', 'REJECTED', 'Rejected'].includes(selectedComplaintDetail.status)
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {['RESOLVED', 'Resolved', 'VALIDATED', 'REJECTED', 'Rejected'].includes(selectedComplaintDetail.status) ? '✓' : '○'}
                    </div>
                    <div>
                      <span className={['RESOLVED', 'Resolved', 'VALIDATED', 'REJECTED', 'Rejected'].includes(selectedComplaintDetail.status) ? 'font-bold text-white' : 'text-slate-500'}>
                        Officer Decision
                      </span>
                      <span className="text-slate-400 ml-2">
                        {['RESOLVED', 'Resolved', 'VALIDATED', 'REJECTED', 'Rejected'].includes(selectedComplaintDetail.status) ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Step 5: Final Result */}
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      ['RESOLVED', 'Resolved', 'VALIDATED'].includes(selectedComplaintDetail.status)
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : ['REJECTED', 'Rejected'].includes(selectedComplaintDetail.status)
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {['RESOLVED', 'Resolved', 'VALIDATED'].includes(selectedComplaintDetail.status) ? '✓' : ['REJECTED', 'Rejected'].includes(selectedComplaintDetail.status) ? '✕' : '○'}
                    </div>
                    <div>
                      <span className={
                        ['RESOLVED', 'Resolved', 'VALIDATED'].includes(selectedComplaintDetail.status)
                          ? 'font-bold text-emerald-300'
                          : ['REJECTED', 'Rejected'].includes(selectedComplaintDetail.status)
                          ? 'font-bold text-rose-400'
                          : 'text-slate-500'
                      }>
                        {['REJECTED', 'Rejected'].includes(selectedComplaintDetail.status) ? 'Rejected' : 'Resolved'}
                      </span>
                      <span className="text-slate-400 ml-2">
                        {['RESOLVED', 'Resolved', 'VALIDATED', 'REJECTED', 'Rejected'].includes(selectedComplaintDetail.status) ? 'Final' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-slate-800 bg-[#0a1526] flex items-center justify-between sticky bottom-0">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Record</span>
              </button>

              <button
                onClick={handleCloseDetail}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* VIEW: 1. MY COMPLAINTS LIST */}
      {/* ───────────────────────────────────────────────────────── */}
      {viewState === 'list' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 mb-1">
                <Link to="/customer/dashboard" className="hover:underline flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> {t('backToDashboard', 'Back to Dashboard')}
                </Link>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {t('complaints', 'Complaints & Grievances')}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {t('grievanceAlertsSubtitle', 'Raise and track complaints related to product labels and inspections.')}
              </p>
            </div>

            {/* Raise New Complaint Button */}
            <button
              onClick={() => {
                setSelectedScenarioKey('eligible');
                setActiveAnalysisResult(DEMO_PRESET_SCENARIOS.eligible);
                setUploadedImage(DEMO_PRESET_SCENARIOS.eligible.imageUrl);
                setProductName(DEMO_PRESET_SCENARIOS.eligible.product);
                setConfirmationChecked(false);
                setViewState('upload');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-950/30 transition-all active:scale-98 cursor-pointer self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('raiseNewComplaint', 'Raise New Complaint')}</span>
            </button>
          </div>

          {/* Quick Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-[#0f1b2d] p-4 rounded-xl border border-[#1e314f]">
              <span className="text-xs font-semibold text-slate-400">{t('totalGrievances', 'Total Grievances')}</span>
              <p className="text-2xl font-black text-white mt-1">{complaints.length}</p>
            </div>
            <div className="bg-[#0f1b2d] p-4 rounded-xl border border-[#1e314f]">
              <span className="text-xs font-semibold text-cyan-400">{t('submitted', 'Submitted')}</span>
              <p className="text-2xl font-black text-white mt-1">
                {complaints.filter((c) => ['SUBMITTED', 'Submitted'].includes(c.status)).length}
              </p>
            </div>
            <div className="bg-[#0f1b2d] p-4 rounded-xl border border-[#1e314f]">
              <span className="text-xs font-semibold text-amber-400">{t('needsReview', 'Under Review')}</span>
              <p className="text-2xl font-black text-white mt-1">
                {complaints.filter((c) => ['UNDER_REVIEW', 'Under Review', 'ADDITIONAL_EVIDENCE_REQUIRED', 'Additional Evidence Requested'].includes(c.status)).length}
              </p>
            </div>
            <div className="bg-[#0f1b2d] p-4 rounded-xl border border-[#1e314f]">
              <span className="text-xs font-semibold text-emerald-400">{t('resolved', 'Resolved')}</span>
              <p className="text-2xl font-black text-white mt-1">
                {complaints.filter((c) => ['RESOLVED', 'Resolved', 'VALIDATED'].includes(c.status)).length}
              </p>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-[#0f1b2d] rounded-2xl border border-[#1e314f] shadow-xl overflow-hidden">
            {/* Filter & Action Bar */}
            <div className="p-4 bg-[#142237] border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchComplaintsPlaceholder', 'Search complaints by ID, Product or Category...')}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-[#0a1526] text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Delete Data Action */}
                {selectedComplaintIds.length > 0 ? (
                  <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-500/30 px-2.5 py-1 rounded-xl">
                    <span className="text-xs font-bold text-rose-300">
                      {selectedComplaintIds.length} {t('selected', 'Selected')}
                    </span>
                    <button
                      onClick={handleDeleteSelected}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t('deleteData', 'Delete Data')} ({selectedComplaintIds.length})</span>
                    </button>
                    <button
                      onClick={() => setSelectedComplaintIds([])}
                      className="text-xs text-slate-400 hover:text-white px-1 cursor-pointer"
                    >
                      {t('clear', 'Clear')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (filteredComplaints.length === 0) {
                        addToast({
                          type: 'info',
                          title: 'No Data',
                          message: 'No complaints available to delete.',
                        });
                        return;
                      }
                      handleToggleSelectAll();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-[#0a1526] hover:bg-rose-950/30 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t('deleteData', 'Delete Data')}</span>
                  </button>
                )}

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-[#0a1526] p-1 rounded-xl border border-slate-700 text-xs">
                  {[
                    { key: 'ALL', label: t('all', 'All') },
                    { key: 'Submitted', label: t('submitted', 'Submitted') },
                    { key: 'Under Review', label: t('needsReview', 'Under Review') },
                    { key: 'Resolved', label: t('resolved', 'Resolved') },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setStatusFilter(tab.key)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                        statusFilter === tab.key
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Complaints List Table */}
            {filteredComplaints.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#142237] text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 pl-4 pr-2 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            filteredComplaints.length > 0 &&
                            filteredComplaints.every((c) => selectedComplaintIds.includes(c.id))
                          }
                          onChange={handleToggleSelectAll}
                          aria-label="Select all complaints"
                          className="w-4 h-4 rounded border-slate-700 bg-[#0a1526] text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                        />
                      </th>
                      <th className="py-3.5 px-4">{t('complaintId', 'Complaint ID')}</th>
                      <th className="py-3.5 px-4">{t('product', 'Product')}</th>
                      <th className="py-3.5 px-4">{t('date', 'Date')}</th>
                      <th className="py-3.5 px-4">{t('category', 'Issue Category')}</th>
                      <th className="py-3.5 px-4">{t('status', 'Status')}</th>
                      <th className="py-3.5 px-4 text-right">{t('actions', 'Action')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {filteredComplaints.map((item) => {
                      const cId = item.complaintId || item.id;
                      const pName = item.productName || item.product;
                      const cat = item.category || item.issue;
                      return (
                        <tr
                          key={cId}
                          className={`hover:bg-[#162740] transition-colors ${
                            selectedComplaintIds.includes(cId)
                              ? 'bg-[#182a45] ring-1 ring-inset ring-rose-500/40'
                              : ''
                          }`}
                        >
                          <td
                            className="py-4 pl-4 pr-2 w-10 text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={selectedComplaintIds.includes(cId)}
                              onChange={(e) => handleToggleSelect(cId, e)}
                              aria-label={`Select complaint ${cId}`}
                              className="w-4 h-4 rounded border-slate-700 bg-[#0a1526] text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600"
                            />
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-white hover:text-rose-400 transition-colors">
                            {cId}
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-white">{pName}</div>
                            <div className="text-[11px] text-slate-400 font-normal line-clamp-1">
                              {item.description}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold text-slate-200">{cat}</span>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedComplaintDetail(item)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition-colors cursor-pointer shadow-xs"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{t('details', 'View Details')}</span>
                              </button>
                              <button
                                onClick={(e) => handleDeleteSingle(cId, e)}
                                title="Delete Record"
                                aria-label={`Delete complaint ${cId}`}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-700/60 hover:border-rose-500/40 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#142237] border border-slate-700 text-slate-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">{t('noComplaintsSubmitted', 'No complaints submitted yet.')}</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {t('raiseComplaintPrompt', 'Raise a complaint if you identify a potential issue with a product label.')}
                </p>
                <button
                  onClick={() => setViewState('upload')}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t('raiseNewComplaint', 'Raise New Complaint')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* VIEW: 2. STEP 1 - SCAN OR UPLOAD IMAGE */}
      {/* ───────────────────────────────────────────────────────── */}
      {viewState === 'upload' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewState('list')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> {t('cancelAndReturn', 'Cancel & Return')}
            </button>
            <span className="text-xs font-bold text-slate-400">{t('step1Scan', 'Step 1 of 3: Scan Product Label')}</span>
          </div>

          <div className="bg-[#0f1b2d] rounded-2xl p-6 sm:p-8 border border-[#1e314f] shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-xs">
                <Camera className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {t('uploadOrCapture', 'Upload or Capture Product Image')}
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                {t('uploadOrCaptureDesc', 'Provide a clear image of the product label so LABEL SETU can perform a preliminary analysis.')}
              </p>
              <p className="text-[11px] font-mono text-slate-400">
                {t('acceptedFormats', 'Accepted formats: JPG • PNG • WEBP')}
              </p>
            </div>

            {/* Live Camera & File Upload Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />

              {/* LIVE CAMERA CAPTURE BUTTON */}
              <button
                onClick={() => setIsCameraOpen(true)}
                className="p-6 rounded-xl border border-slate-700 hover:border-rose-500/80 bg-[#142237] hover:bg-[#1a2c47] text-center space-y-2.5 transition-all group cursor-pointer shadow-md active:scale-98"
              >
                <div className="w-11 h-11 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">📷 {t('captureImage', 'Capture Image')}</div>
                <p className="text-[11px] text-slate-400">{t('captureImageDesc', 'Open device camera to snapshot actual product')}</p>
              </button>

              {/* FILE UPLOAD BUTTON */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-6 rounded-xl border border-slate-700 hover:border-cyan-500/80 bg-[#142237] hover:bg-[#1a2c47] text-center space-y-2.5 transition-all group cursor-pointer shadow-md active:scale-98"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm text-white">↑ {t('uploadImage', 'Upload Image')}</div>
                <p className="text-[11px] text-slate-400">{t('uploadImageDesc', 'Choose custom photo from your device')}</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* VIEW: 3. IMAGE PREVIEW */}
      {/* ───────────────────────────────────────────────────────── */}
      {viewState === 'preview' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewState('upload')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> {t('changeImage', 'Change Image')}
            </button>
            <span className="text-xs font-bold text-slate-400">{t('step1Preview', 'Step 1 of 3: Image Preview')}</span>
          </div>

          <div className="bg-[#0f1b2d] rounded-2xl p-6 sm:p-8 border border-[#1e314f] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  {t('productImagePreview', 'Product Image Preview')}
                </h2>
                <p className="text-xs text-slate-400">
                  {t('previewSubtitle', 'Review the captured label before running preliminary check')}
                </p>
              </div>

              {/* Editable Product Name Pill */}
              <div className="flex items-center gap-1.5 bg-[#142237] px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={t('productNameSku', 'Enter Product Name...')}
                  className="bg-transparent text-white font-bold text-xs focus:outline-hidden"
                />
              </div>
            </div>

            {/* Preview Frame */}
            <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-slate-700 max-h-80 flex items-center justify-center p-2 shadow-inner">
              <img
                src={uploadedImage}
                alt="Product Preview"
                className="max-h-72 w-auto object-contain rounded-xl"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-mono text-slate-300 border border-white/10">
                {productName}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setViewState('upload')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <span>{t('changeImage', 'Choose Another Image')}</span>
              </button>

              <button
                onClick={handleStartAnalysis}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-950/40 transition-all cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('startPreliminaryAnalysis', 'Continue to AI Analysis &rarr;')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* VIEW: 4. AI-ASSISTED PRELIMINARY ANALYSIS (PROCESSING) */}
      {/* ───────────────────────────────────────────────────────── */}
      {viewState === 'analyzing' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-[#0f1b2d] rounded-2xl p-8 border border-[#1e314f] shadow-xl text-center space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 inline-block">
                {t('aiAssistedAnalysis', 'AI-Assisted Preliminary Analysis')}
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {t('analyzingProduct', 'Analyzing Product Label...')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('analyzingSubtitle', 'Evaluating packaging declarations for')} {productName}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#142237] h-2.5 rounded-full overflow-hidden border border-slate-700 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>

            {/* Steps Checklist */}
            <div className="bg-[#142237]/80 rounded-xl p-5 border border-slate-800 text-left space-y-3">
              {[
                { title: t('stepPreprocessing', 'Image uploaded'), done: analysisStepIndex >= 0 },
                { title: t('stepDetecting', 'Product label detected'), done: analysisStepIndex >= 1 },
                { title: t('stepVerifying', 'Checking label information'), done: analysisStepIndex >= 2 },
                { title: t('stepSynthesizing', 'Evaluating potential compliance issue'), done: analysisStepIndex >= 3 },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  {step.done ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                      ✓
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0 animate-pulse">
                      ⏳
                    </div>
                  )}
                  <span className={step.done ? 'text-white font-medium' : 'text-slate-400'}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* FEATURE 1: COMPLAINT ELIGIBILITY */}
      {/* ───────────────────────────────────────────────────────── */}
      {viewState === 'eligibility' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400">
              {t('eligibilityCheck', 'Complaint Eligibility')}
            </span>
            <span className="text-xs text-slate-400">{t('step2Eligibility', 'Step 2 of 3: AI Preliminary Screening')}</span>
          </div>

          {activeAnalysisResult?.issueDetected ? (
            /* ELIGIBLE RESULT */
            <div className="bg-[#0f1b2d] rounded-2xl p-6 sm:p-8 border border-amber-500/40 shadow-xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-500/40">
                    ⚠ {t('issueDetected', 'Potential Issue Detected')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {t('eligibleForSubmission', 'ELIGIBLE FOR SUBMISSION')}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t('statutoryGuidance', 'A potential compliance issue was identified from the submitted product image. You may submit a complaint for officer review.')}
                  </p>
                </div>
              </div>

              {/* AI-Assisted Preliminary Analysis Summary Card */}
              <div className="bg-[#142237] rounded-xl p-5 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400 font-semibold">{t('product', 'Product')}:</span>
                  <span className="font-bold text-white">{productName || activeAnalysisResult.product}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400 font-semibold">{t('detectedIssue', 'Potential Issue')}:</span>
                  <span className="font-bold text-amber-300 text-right max-w-xs">{activeAnalysisResult.issue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">{t('aiConfidenceScore', 'Confidence')}:</span>
                  <span className="font-mono font-bold text-emerald-400">{activeAnalysisResult.confidence}%</span>
                </div>
              </div>

              {/* Attached Evidence Thumbnail */}
              <div className="bg-[#142237]/60 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
                <img
                  src={uploadedImage}
                  alt="Product Evidence"
                  className="w-14 h-14 object-cover rounded-lg border border-slate-700 shrink-0"
                />
                <div className="text-xs space-y-0.5 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('viewEvidence', 'Evidence')}</span>
                  <p className="font-bold text-white truncate">{productName}</p>
                  <p className="text-[11px] text-slate-400">{t('uploadedProductImage', 'Uploaded product label snapshot')}</p>
                </div>
              </div>

              {/* Mandatory Preliminary Disclaimer */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{t('aiInfoBoxMsg', 'Final verification will be performed by an enforcement officer.')}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setViewState('upload')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  {t('cancel', 'Back')}
                </button>

                <button
                  onClick={() => setViewState('form')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
                >
                  <span>{t('proceedToFileComplaint', 'Continue to Complaint Submission &rarr;')}</span>
                </button>
              </div>
            </div>
          ) : (
            /* NOT ELIGIBLE RESULT */
            <div className="bg-[#0f1b2d] rounded-2xl p-6 sm:p-8 border border-emerald-500/40 shadow-xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    ✓ {t('noIssueDetected', 'No Apparent Compliance Issue')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {t('ineligibleForSubmission', 'NOT ELIGIBLE FOR SUBMISSION')}
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t('noIssueDetected', 'Based on the submitted image, no potential compliance issue was identified during the preliminary analysis.')}
                  </p>
                </div>
              </div>

              {/* Details Box */}
              <div className="bg-[#142237] rounded-xl p-5 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400 font-semibold">{t('product', 'Product')}:</span>
                  <span className="font-bold text-white">{productName || activeAnalysisResult.product}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400 font-semibold">{t('detectedIssue', 'Potential Issue')}:</span>
                  <span className="font-bold text-emerald-400">{t('noIssueDetected', 'None detected.')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">{t('aiConfidenceScore', 'Confidence')}:</span>
                  <span className="font-mono font-bold text-emerald-400">{activeAnalysisResult.confidence}%</span>
                </div>
              </div>

              {/* Blocked Submission Notice */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{t('ineligibleForSubmission', 'The customer cannot submit a complaint when the eligibility result is negative.')}</span>
              </div>

              {/* Action Button: ONLY Upload Another Image */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setViewState('upload')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('changeImage', 'Upload Another Image')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* FEATURE 2: COMPLAINT SUBMISSION */}
      {/* ───────────────────────────────────────────────────────── */}
      {viewState === 'form' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewState('eligibility')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> {t('cancel', 'Back to Eligibility')}
            </button>
            <span className="text-xs font-bold text-slate-400">{t('step3Form', 'Step 3 of 3: Submit Complaint')}</span>
          </div>

          {/* COMPLAINT REVIEW SECTION */}
          <div className="bg-[#0f1b2d] rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>{t('complaintFiling', 'Complaint Review')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#142237] border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('product', 'Product')}</span>
                <p className="font-bold text-white">{productName}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#142237] border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('category', 'Issue')}</span>
                <p className="font-bold text-amber-300">{complaintCategory}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#142237] border border-slate-800 space-y-1 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('aiAssistedAnalysis', 'AI Preliminary Finding')}</span>
                  <span className="text-emerald-400 font-mono font-bold text-[11px]">{activeAnalysisResult.confidence}% {t('score', 'Confidence')}</span>
                </div>
                <p className="text-slate-200 font-medium">"{activeAnalysisResult.issue}"</p>
              </div>
            </div>

            {/* Evidence Thumbnail */}
            <div className="p-3 rounded-xl bg-[#142237]/60 border border-slate-800 flex items-center gap-3">
              <img
                src={uploadedImage}
                alt="Product Evidence"
                className="w-14 h-14 object-cover rounded-lg border border-slate-700 shrink-0"
              />
              <div className="text-xs space-y-0.5 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('viewEvidence', 'Evidence')}</span>
                <p className="font-bold text-white truncate">{productName}</p>
                <p className="text-[11px] text-emerald-400 font-semibold">✓ {t('imageVerified', 'Verified in Preliminary AI Step')}</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmitComplaint} className="bg-[#0f1b2d] rounded-2xl p-6 sm:p-8 border border-[#1e314f] shadow-xl space-y-5">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                {t('submitComplaint', 'Submit Complaint')}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('complaintFilingSubtitle', 'Complete the grievance details for official review by Legal Metrology Officers.')}
              </p>
            </div>

            {/* Complaint Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                {t('complaintCategory', 'Complaint Category')} <span className="text-rose-400">*</span>
              </label>
              <select
                value={complaintCategory}
                onChange={(e) => setComplaintCategory(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-[#0a1526] text-white text-xs focus:outline-hidden focus:border-rose-500 cursor-pointer"
              >
                <option value="Incorrect MRP">{t('mrpDeclaration', 'Incorrect MRP')}</option>
                <option value="Incorrect Quantity">{t('netQuantity', 'Incorrect Quantity')}</option>
                <option value="Missing Information">{t('findings', 'Missing Information')}</option>
                <option value="Labeling Issue">{t('declarations', 'Labeling Issue')}</option>
                <option value="Consumer Care Issue">{t('consumerCareDetails', 'Consumer Care Issue')}</option>
                <option value="Other">{t('actions', 'Other')}</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                {t('complaintDescription', 'Description')} <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
                placeholder="Explain what issue you identified with the product label."
                className="w-full p-2.5 rounded-xl border border-slate-700 bg-[#0a1526] text-white text-xs focus:outline-hidden focus:border-rose-500"
              />
            </div>

            {/* Evidence & Optional Additional Evidence */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">{t('additionalEvidenceOptional', 'Additional Evidence (Optional)')}</label>
              <input
                type="file"
                ref={additionalEvidenceInputRef}
                onChange={handleAdditionalEvidenceChange}
                className="hidden"
              />
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#142237] border border-slate-700 text-xs">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">
                    {additionalEvidenceName ? additionalEvidenceName : t('noInspectionRecordsFound', 'No additional file selected')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => additionalEvidenceInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors cursor-pointer"
                >
                  {t('uploadImage', 'Upload File')}
                </button>
              </div>
            </div>

            {/* SUBMISSION CONFIRMATION CHECKBOX */}
            <div className="p-4 rounded-xl bg-[#142237]/80 border border-slate-800 space-y-2">
              <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={confirmationChecked}
                  onChange={(e) => setConfirmationChecked(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-[#0a1526] text-rose-600 focus:ring-rose-500 cursor-pointer accent-rose-600 shrink-0"
                />
                <span>
                  {t('declarationConfirm', 'I confirm that the information provided is accurate to the best of my knowledge.')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={!confirmationChecked || !complaintCategory || !complaintDescription.trim() || isSubmitting}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  confirmationChecked && complaintCategory && complaintDescription.trim() && !isSubmitting
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-950/40 cursor-pointer active:scale-98'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{t('submitting', 'Submitting Complaint...')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('submitComplaint', 'Submit Complaint')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────── */}
      {/* FEATURE 3: COMPLAINT SUBMITTED CONFIRMATION (SUCCESS) */}
      {/* ───────────────────────────────────────────────────────── */}
      {viewState === 'success' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-[#0f1b2d] rounded-2xl p-8 border border-emerald-500/40 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                ✓ {t('complaintSubmittedSuccessfully', 'Complaint Submitted Successfully')}
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {t('complaintSubmittedSubtitle', 'Grievance Registered')}
              </h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {t('grievanceAlertsDesc', 'Your complaint has been submitted successfully and is awaiting review by the enforcement team.')}
              </p>
            </div>

            {/* Summary Details */}
            <div className="bg-[#142237] rounded-xl p-5 border border-slate-800 space-y-3 text-xs text-left max-w-md mx-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                <span className="text-slate-400">{t('complaintId', 'Complaint ID')}:</span>
                <span className="font-mono font-bold text-white text-sm">
                  {submittedComplaint?.id || 'CMP-2026-0001'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                <span className="text-slate-400">{t('product', 'Product')}:</span>
                <span className="font-bold text-white">{submittedComplaint?.product || 'ABC Premium Rice'}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                <span className="text-slate-400">{t('category', 'Category')}:</span>
                <span className="font-bold text-rose-300">{submittedComplaint?.category || 'Consumer Care Issue'}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                <span className="text-slate-400">{t('submitted', 'Submitted')}:</span>
                <span className="font-medium text-slate-200">09 September 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{t('status', 'Status')}:</span>
                <span className="font-bold text-cyan-300 uppercase tracking-wider">{t('submitted', 'SUBMITTED')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (submittedComplaint) {
                    setSelectedComplaintDetail(submittedComplaint);
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#142237] hover:bg-[#1c304d] text-white border border-slate-700 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>{t('trackComplaint', 'View Complaint')}</span>
              </button>

              <button
                onClick={() => setViewState('list')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all cursor-pointer active:scale-98"
              >
                <span>{t('backToComplaints', 'View All Complaints')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
