import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Calendar, 
  FileText, 
  Eye, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Shield, 
  Building, 
  Tag, 
  Layers, 
  ExternalLink,
  Download,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../../components/results/StatusBadge';
import { EvidenceViewer } from '../../components/results/EvidenceViewer';

export const CustomerInspectionDetail = () => {
  const { inspectionId } = useParams();
  const navigate = useNavigate();

  // State for Evidence Viewer Modal
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const displayInspectionId = inspectionId || 'LM-2026-00129';

  // Specific finding data with realistic Legal Metrology packaging OCR evidence
  const findingsList = [
    {
      id: 'f-1',
      title: 'Manufacturer / Packer Details',
      status: 'COMPLIANT',
      confidence: 97,
      finding: 'Manufacturer and packer details verified.',
      extractedText: 'Mfd & Packed by: ABC Foods Pvt. Ltd., Plot 42, Industrial Area, Sector 62, Noida, Gautam Buddha Nagar, UP 201301',
      explanation: 'Complete manufacturer name, registered address with state and pin code conforms to Rule 6(1)(a) of Legal Metrology (Packaged Commodities) Rules 2011.',
      imageSrc: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      rule: 'Rule 6(1)(a)',
    },
    {
      id: 'f-2',
      title: 'Net Quantity',
      status: 'COMPLIANT',
      confidence: 96,
      finding: 'Declared net quantity appears consistent.',
      extractedText: 'Net Qty: 5 kg (5000 g)',
      explanation: 'Net quantity is declared in permissible metric units (kg) with mandatory minimum letter size for packages > 4kg under Rule 6(1)(c).',
      imageSrc: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      rule: 'Rule 6(1)(c)',
    },
    {
      id: 'f-3',
      title: 'MRP Declaration',
      status: 'NEEDS REVIEW',
      confidence: 94,
      finding: 'Potential issue detected in the MRP declaration.',
      extractedText: 'MRP Rs. 520/-',
      explanation: 'Mandatory phrase "inclusive of all taxes" or "incl. of all taxes" is not clearly legible alongside MRP notation. Requires officer verification.',
      imageSrc: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      rule: 'Rule 6(1)(d)',
    },
    {
      id: 'f-4',
      title: 'Consumer Care Details',
      status: 'NON-COMPLIANT',
      confidence: 88,
      finding: 'Consumer care contact information appears incomplete.',
      extractedText: 'For feedback: feedback@abcfoods.com (Phone line: [truncated])',
      explanation: 'Missing mandatory executive consumer care telephone helpline and full postal contact person declaration under Rule 6(1)(n).',
      imageSrc: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      rule: 'Rule 6(1)(n)',
    },
    {
      id: 'f-5',
      title: 'Font Size / Readability',
      status: 'NEEDS REVIEW',
      confidence: 76,
      finding: 'Declared text may require verification for minimum readability.',
      extractedText: 'Batch: AR52026 | Packed: 08/2026 | Best Before 12 Months',
      explanation: 'The height of statutory numeric fonts on secondary panel appears near the lower 2.0mm threshold specified in Schedule II table.',
      imageSrc: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      rule: 'Schedule II (Font Size)',
    },
  ];

  const handleOpenEvidence = (finding) => {
    setSelectedEvidence({
      title: finding.title,
      fieldName: finding.title,
      extractedText: finding.extractedText,
      confidence: finding.confidence,
      status: finding.status,
      finding: finding.finding,
      explanation: finding.explanation,
      imageSrc: finding.imageSrc,
      rule: finding.rule,
    });
    setIsEvidenceOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Evidence Viewer Modal Component */}
      <EvidenceViewer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        evidenceData={selectedEvidence}
        imageSrc={selectedEvidence?.imageSrc}
      />

      {/* ───────────────────────────────────────────────────────── */}
      {/* PAGE HEADER & BREADCRUMBS */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link to="/customer/dashboard" className="hover:text-rose-700 transition-colors">
            Customer Portal
          </Link>
          <span className="text-slate-300">/</span>
          <Link to="/customer/inspections" className="hover:text-rose-700 transition-colors">
            My Inspections
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-rose-700 font-bold">Inspection Details</span>
        </nav>

        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Inspection Details
              </h1>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                  {displayInspectionId}
                </span>
                <StatusBadge status="Needs Review" size="sm" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              View the inspection results and compliance findings for your product.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <Link
              to="/customer/inspections"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Back to My Inspections</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 2. INSPECTION SUMMARY CARDS */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Compliance Score
          </span>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-2xl font-black text-slate-900">82%</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Verified
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Compliant
          </span>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-2xl font-black text-emerald-700">3</span>
            <span className="text-[10px] font-medium text-slate-400">Declarations</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
            Needs Review
          </span>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-2xl font-black text-amber-700">2</span>
            <span className="text-[10px] font-medium text-slate-400">Attention</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
            Non-Compliant
          </span>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-2xl font-black text-rose-700">1</span>
            <span className="text-[10px] font-medium text-slate-400">Flagged</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Inspection Date
          </span>
          <div className="flex items-center gap-1.5 mt-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-800">05 Sep 2026</span>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 1. PRODUCT INFORMATION & 3. COMPLIANCE OVERVIEW */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. PRODUCT INFORMATION (2 COLUMNS on Desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-700 flex items-center justify-center font-bold">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Product Information</h2>
                <p className="text-[11px] text-slate-400">Registered packaged commodity metadata</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Batch: AR52026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Product Name
              </span>
              <p className="font-bold text-slate-900 text-sm">ABC Premium Rice</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Category
              </span>
              <p className="font-bold text-slate-800 text-sm">Food Grains & Pulses</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Manufacturer / Packer
              </span>
              <p className="font-semibold text-slate-800">ABC Foods Pvt. Ltd.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Net Quantity
              </span>
              <p className="font-bold text-slate-900 text-sm">5 kg</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Maximum Retail Price (MRP)
              </span>
              <p className="font-black text-rose-700 text-sm">₹520</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Packed Date
              </span>
              <p className="font-semibold text-slate-800 text-sm">08/2026</p>
            </div>
          </div>
        </div>

        {/* 3. COMPLIANCE OVERVIEW (Display-only with Gauge) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Shield className="w-4 h-4 text-rose-700" />
              <h2 className="text-sm font-bold text-slate-900">Compliance Overview</h2>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress Arc */}
                  <path
                    className="text-amber-500 transition-all duration-1000 ease-out"
                    strokeDasharray="82, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 leading-none">82%</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-0.5">Score</span>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-2">Overall Compliance Score</p>
              <span className="text-[11px] text-slate-400">Legal Metrology Index</span>
            </div>
          </div>

          {/* Breakdown checklist */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-800 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Compliant</span>
              </div>
              <span className="font-bold">3 checks</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/60 border border-amber-100 text-amber-800 font-semibold">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Needs Review</span>
              </div>
              <span className="font-bold">2 checks</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/60 border border-rose-100 text-rose-800 font-semibold">
              <div className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Non-Compliant</span>
              </div>
              <span className="font-bold">1 check</span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 4. COMPLIANCE FINDINGS */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight">
              Compliance Findings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed statutory verification per Legal Metrology (Packaged Commodities) Rules
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
            5 Total Checks
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {findingsList.map((finding) => (
            <div
              key={finding.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              {/* Finding Info */}
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-bold text-sm text-slate-900">{finding.title}</h3>
                  <StatusBadge status={finding.status} size="sm" />
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    Confidence: {finding.confidence}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {finding.finding}
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleOpenEvidence(finding)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 transition-colors cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-rose-600" />
                  <span>View Evidence</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 6. INSPECTION INFORMATION & 7. TIMELINE & 8. REPORT */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 6. INSPECTION INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-4 h-4 text-rose-700" />
            <h2 className="text-sm font-bold text-slate-900">Inspection Information</h2>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Inspection ID</span>
              <span className="font-mono font-bold text-slate-900">{displayInspectionId}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Inspection Date</span>
              <span className="font-semibold text-slate-800">05 September 2026</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Inspection Type</span>
              <span className="font-semibold text-slate-800">Product Label Inspection</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Inspected By</span>
              <span className="font-semibold text-slate-800">Officer</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Department</span>
              <span className="font-semibold text-slate-800">Legal Metrology</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Status</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Needs Review
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Officer Review</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* 7. INSPECTION TIMELINE */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Clock className="w-4 h-4 text-rose-700" />
            <h2 className="text-sm font-bold text-slate-900">Inspection Timeline</h2>
          </div>

          <div className="relative pl-5 space-y-3.5 border-l-2 border-rose-100 ml-2 text-xs">
            <div className="relative">
              <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <span className="text-[10px] font-bold text-slate-400 block">05 Sep 2026</span>
              <span className="font-semibold text-slate-800">Inspection Started</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <span className="text-[10px] font-bold text-slate-400 block">05 Sep 2026</span>
              <span className="font-semibold text-slate-800">Product Image Captured</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <span className="text-[10px] font-bold text-slate-400 block">05 Sep 2026</span>
              <span className="font-semibold text-slate-800">AI-Assisted Analysis Completed</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <span className="text-[10px] font-bold text-slate-400 block">05 Sep 2026</span>
              <span className="font-semibold text-slate-800">Compliance Findings Generated</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <span className="text-[10px] font-bold text-slate-400 block">05 Sep 2026</span>
              <span className="font-semibold text-slate-800">Officer Review Completed</span>
            </div>

            <div className="relative">
              <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <span className="text-[10px] font-bold text-slate-400 block">05 Sep 2026</span>
              <span className="font-bold text-rose-700">Report Generated</span>
            </div>
          </div>
        </div>

        {/* 8. REPORT CARD */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-rose-700" />
              <h2 className="text-sm font-bold text-slate-900">Inspection Report</h2>
            </div>

            <div className="p-3.5 mt-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Official Document
                  </span>
                  <p className="font-mono text-xs font-bold text-slate-900 truncate">
                    LABEL_SETU_Inspection_{displayInspectionId}.pdf
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                <span className="text-slate-500">Document Status</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              to="/customer/reports"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#57184a] hover:bg-[#431238] text-white transition-colors shadow-2xs"
            >
              <FileText className="w-4 h-4" />
              <span>View Report</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 10. RAISE COMPLAINT CALLOUT BANNER */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-rose-50 via-pink-50 to-purple-50 border border-rose-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Have you identified an issue with this product?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Submit product snapshots to initiate an AI-assisted compliance analysis and officer verification.
            </p>
          </div>
        </div>

        <Link
          to="/customer/complaints"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-900/10 transition-all active:scale-98 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Raise a Complaint</span>
        </Link>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 9. BOTTOM CUSTOMER ACTIONS */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/80">
        <Link
          to="/customer/inspections"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400" />
          <span>Back to My Inspections</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleOpenEvidence(findingsList[2])}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors shadow-2xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Evidence</span>
          </button>
        </div>
      </div>
    </div>
  );
};
