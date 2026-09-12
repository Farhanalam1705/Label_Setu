import React, { useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Camera, CheckCircle2, ChevronRight, FileImage, ImageUp, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { CameraModal } from '../../components/scanner/CameraModal';
import { createComplaint } from '../../services/complaintService';
import { getCurrentUser } from '../../services/auth';

const complaintTypes = ['Missing Mandatory Declaration', 'Incorrect MRP', 'Incorrect Net Quantity', 'Manufacturer/Packer Information', 'Consumer Care Details', 'Font Size / Readability', 'Misleading Declaration', 'Other'];

export const CustomerComplaintCreate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [complaintType, setComplaintType] = useState('Consumer Care Details');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);
  const [error, setError] = useState('');

  const inspection = state?.inspectionId ? state : null;

  if (!inspection) {
    return (
      <div className="max-w-5xl mx-auto rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-amber-600" />
        <h1 className="mt-3 text-lg font-black text-slate-900">Inspection Required</h1>
        <p className="mt-1 text-sm text-slate-600">Please start a complaint from the inspection you want to report.</p>
        <Link to="/customer/inspections" className="mt-4 inline-flex rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-700">Back to My Inspections</Link>
      </div>
    );
  }

  const setEvidenceFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setEvidence({ name: file.name, url: event.target.result });
      setAnalysis(null);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!description.trim()) return setError('Please describe the issue before analysis.');
    if (!evidence) return setError('Please attach product evidence before analysis.');
    setError('');
    setIsAnalyzing(true);
    window.setTimeout(() => {
      setAnalysis({ confidence: 88, finding: 'Consumer care contact information appears incomplete.', eligible: true });
      setIsAnalyzing(false);
    }, 650);
  };

  const handleSubmit = () => {
    if (!description.trim()) return setError('Please describe the issue before submitting.');
    if (!evidence) return setError('Please attach product evidence before submitting.');
    if (!analysis?.eligible) return setError('Please complete the AI analysis before submitting.');

    setError('');
    setIsSubmitting(true);
    const user = getCurrentUser() || {};
    const complaint = createComplaint({
      customerId: user.id || 'CUS-001', customerName: user.name || 'Aster Foods Pvt. Ltd.', customerEmail: user.email || 'customer@labelsetu.gov.in',
      inspectionId: inspection.inspectionId, productId: inspection.productId, productName: inspection.productName,
      complaintType, category: complaintType, description, evidence: [evidence], image: evidence.url, imageUrl: evidence.url,
      aiAnalysis: { issueDetected: true, confidence: analysis.confidence, issue: analysis.finding }, eligibility: 'ELIGIBLE',
    });
    setSubmittedComplaint(complaint);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <CameraModal isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} onCapture={setEvidenceFile} />
      <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link to="/customer/dashboard" className="hover:text-rose-700">Customer Portal</Link><ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link to="/customer/inspections" className="hover:text-rose-700">My Inspections</Link><ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link to={`/customer/inspections/${inspection.inspectionId}`} className="hover:text-rose-700">Inspection Details</Link><ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-rose-700">Raise Complaint</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Raise a Complaint</h1><p className="text-xs sm:text-sm text-slate-500 mt-1">Submit a complaint regarding this inspected product.</p></div>
        <Link to={`/customer/inspections/${inspection.inspectionId}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-2xs"><ArrowLeft className="w-3.5 h-3.5" />Back to Inspection</Link>
      </div>

      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
        <h2 className="text-sm font-bold text-slate-900">Product Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
          <Info label="Product" value={inspection.productName} /><Info label="Inspection ID" value={inspection.inspectionId} mono />
          <Info label="Inspection Date" value={inspection.inspectionDate} /><Info label="Inspection Status" value={inspection.inspectionStatus} />
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-5">
        <div><label className="text-xs font-bold text-slate-700">Complaint Type</label><select value={complaintType} onChange={(event) => { setComplaintType(event.target.value); setAnalysis(null); }} className="mt-1.5 w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500">{complaintTypes.map((type) => <option key={type}>{type}</option>)}</select></div>
        <div><label className="text-xs font-bold text-slate-700">Describe the Issue</label><textarea value={description} onChange={(event) => { setDescription(event.target.value); setAnalysis(null); }} placeholder="Please describe the issue you identified with this product..." className="mt-1.5 w-full min-h-28 px-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500 resize-y" /></div>
        <div><label className="text-xs font-bold text-slate-700">Upload Product Evidence</label><p className="text-[11px] text-slate-400 mt-0.5">Attach a photograph showing the suspected issue.</p><div className="mt-2 flex flex-wrap items-center gap-2"><input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => setEvidenceFile(event.target.files?.[0])} /><button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"><ImageUp className="w-4 h-4" />Upload Image</button><button type="button" onClick={() => setIsCameraOpen(true)} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"><Camera className="w-4 h-4" />Capture Image</button></div>{evidence && <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><img src={evidence.url} alt="Complaint evidence preview" className="w-14 h-14 rounded-lg object-cover" /><div className="min-w-0"><p className="text-xs font-bold text-slate-800 truncate">{evidence.name}</p><p className="text-[11px] text-emerald-700 font-medium">Evidence image attached</p></div></div>}</div>
        {error && <p className="text-xs font-medium text-rose-700 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" />{error}</p>}
        <button type="button" onClick={handleAnalyze} disabled={isAnalyzing} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#57184a] hover:bg-[#431238] text-white disabled:opacity-60"><Sparkles className="w-4 h-4" />{isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</> : 'Analyze with AI'}</button>
      </section>

      {analysis && <section className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-5"><div><h2 className="text-sm font-bold text-slate-900">AI Analysis</h2><div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs"><p className="font-bold text-amber-900">Potential Issue Detected</p><p className="mt-1 text-slate-700">{analysis.finding}</p><p className="mt-2 font-semibold text-amber-800">Confidence: {analysis.confidence}%</p></div><p className="mt-2 text-[11px] text-slate-500">AI analysis is advisory and requires officer verification.</p></div><div><h2 className="text-sm font-bold text-slate-900">Complaint Eligibility</h2><div className="mt-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5 text-emerald-800"><p className="font-bold">Potential complaint detected</p><p>✓ Product is associated with an existing inspection</p><p>✓ Evidence image attached</p><p>✓ Potential compliance issue identified</p><p className="pt-1 font-black">ELIGIBLE FOR OFFICER REVIEW</p></div></div><div className="pt-1"><p className="text-xs text-slate-500 mb-3">Your complaint will be forwarded to an authorized Legal Metrology Officer for verification.</p><button type="button" onClick={handleSubmit} disabled={isSubmitting} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-60"><ShieldCheck className="w-4 h-4" />{isSubmitting ? 'Submitting...' : 'Submit Complaint'}</button></div></section>}

      {submittedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="complaint-success-title">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 id="complaint-success-title" className="mt-4 text-xl font-black text-slate-900">Complaint Registered Successfully</h2>
            <p className="mt-2 text-sm text-slate-600">Your complaint has been successfully registered and forwarded for officer verification.</p>
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Complaint ID</span>
              <span className="mt-1 block font-mono text-sm font-bold text-slate-900">{submittedComplaint.complaintId || submittedComplaint.id}</span>
              <span className="mt-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">Submitted</span>
            </div>
            <div className="mt-6 flex justify-center">
              <button type="button" onClick={() => navigate('/customer/complaints')} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50">Back to My Complaints</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value, mono = false }) => <div className="p-3 rounded-xl bg-slate-50 border border-slate-100"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className={`mt-1 text-sm font-bold text-slate-800 ${mono ? 'font-mono' : ''}`}>{value}</p></div>;
