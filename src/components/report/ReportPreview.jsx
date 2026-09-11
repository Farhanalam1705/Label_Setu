import React from 'react';
import { ShieldCheck, Scale, FileText, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';
import { ConfidenceBadge } from '../results/ConfidenceBadge';
import { FINAL_ASSESSMENT_OPTIONS } from '../../data/mockReviewData';

export const ReportPreview = ({
  inspectionData,
  officerReview,
  reportType,
  selectedSections,
}) => {
  const { product, inspector, overall, declarations, complianceChecks, potentialViolations } =
    inspectionData;

  const todayStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const finalAssessmentObj = FINAL_ASSESSMENT_OPTIONS.find(
    (o) => o.id === officerReview?.finalAssessment
  );
  const finalAssessmentText =
    finalAssessmentObj?.label || officerReview?.finalAssessment || 'Inspection Requires Further Review';

  const isReviewed = officerReview?.reviewStatus === 'REVIEWED';

  return (
    <div
      id="report-print-target"
      className="bg-white rounded-2xl border border-slate-300 shadow-md max-w-4xl mx-auto p-8 sm:p-12 text-slate-900 font-sans"
    >
      {/* Document Header */}
      <div className="border-b-2 border-slate-900 pb-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0c1e33] text-cyan-400 flex items-center justify-center font-black text-xl shadow-xs">
              LS
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0c1e33] tracking-tight">LABEL SETU</h1>
              <p className="text-xs font-semibold text-slate-600">
                {reportType === 'violation'
                  ? 'Legal Metrology Violation Report'
                  : 'Legal Metrology Compliance Inspection Report'}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg border sm:border-0 border-slate-200">
            <div>
              <span className="text-slate-500">Inspection ID: </span>
              <span className="font-mono font-bold text-slate-900">{inspectionData.inspectionId}</span>
            </div>
            <div>
              <span className="text-slate-500">Date: </span>
              <span className="font-semibold text-slate-800">{todayStr}</span>
            </div>
            <div>
              <span className="text-slate-500">Officer: </span>
              <span className="font-semibold text-slate-800">Officer</span>
            </div>
            <div>
              <span className="text-slate-500">Department: </span>
              <span className="font-semibold text-slate-800">Legal Metrology</span>
            </div>
          </div>
        </div>

        {!isReviewed && (
          <div className="mt-4 p-2.5 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-900 font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>DRAFT REPORT:</strong> Officer review pending. Final legal determinations are subject to authorized officer sign-off.
            </span>
          </div>
        )}
      </div>

      <div className="space-y-8 text-xs">
        {/* 1. INSPECTION INFORMATION */}
        {selectedSections.inspectionInfo && (
          <section className="print-page-break-inside-avoid space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                1
              </span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                Inspection Information
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-500 block text-[11px]">Inspection ID</span>
                <span className="font-mono font-bold text-slate-900">{inspectionData.inspectionId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Date of Inspection</span>
                <span className="font-semibold text-slate-900">{todayStr}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Enforcement Officer</span>
                <span className="font-semibold text-slate-900">Officer</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Review Status</span>
                <span
                  className={`inline-block font-bold text-[10px] px-2 py-0.5 rounded ${
                    isReviewed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {isReviewed ? 'REVIEWED' : 'OFFICER REVIEW PENDING'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block text-[11px]">Final Assessment</span>
                <span className="font-bold text-slate-900">{finalAssessmentText}</span>
              </div>
            </div>
          </section>
        )}

        {/* 2. PRODUCT INFORMATION */}
        {selectedSections.productInfo && (
          <section className="print-page-break-inside-avoid space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                2
              </span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                Product Information
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="sm:col-span-2">
                <span className="text-slate-500 block text-[11px]">Product Name</span>
                <span className="font-bold text-slate-900 text-sm">{product.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Category</span>
                <span className="font-semibold text-slate-800">{product.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Net Quantity</span>
                <span className="font-bold text-slate-900">{product.netQuantity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">MRP</span>
                <span className="font-bold text-slate-900">{product.mrp}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Batch Number</span>
                <span className="font-mono font-bold text-slate-900">{product.batchNo || 'AR52026'}</span>
              </div>
            </div>
          </section>
        )}

        {/* 3. EXTRACTED DECLARATIONS */}
        {selectedSections.declarations && (
          <section className="print-page-break-inside-avoid space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                3
              </span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                Extracted Declarations
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
                <span className="text-slate-500 text-[11px] block">Manufacturer</span>
                <span className="font-semibold text-slate-900">ABC Foods Pvt. Ltd.</span>
              </div>
              <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
                <span className="text-slate-500 text-[11px] block">Packer</span>
                <span className="font-semibold text-slate-900">ABC Foods Pvt. Ltd.</span>
              </div>
              <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
                <span className="text-slate-500 text-[11px] block">Importer</span>
                <span className="font-semibold text-slate-900">Not Applicable</span>
              </div>
              <div className="border-b sm:border-b-0 pb-2 sm:pb-0">
                <span className="text-slate-500 text-[11px] block">Net Quantity</span>
                <span className="font-semibold text-slate-900">5 kg</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 text-[11px] block">MRP</span>
                <span className="font-semibold text-slate-900">₹520</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 text-[11px] block">Packed Date</span>
                <span className="font-semibold text-slate-900">08/2026</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 text-[11px] block">Consumer Care</span>
                <span className="font-semibold text-slate-900">1800-XXX-XXXX</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 text-[11px] block">Batch</span>
                <span className="font-semibold text-slate-900">AR52026</span>
              </div>
            </div>
          </section>
        )}

        {/* 4. COMPLIANCE CHECKS */}
        {selectedSections.complianceChecks && (
          <section className="print-page-break-inside-avoid space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                4
              </span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                Compliance Checks
              </h2>
            </div>
            <div className="overflow-hidden border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold text-[11px] border-b border-slate-200">
                    <th className="py-2.5 px-4">Check</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {complianceChecks.map((chk) => (
                    <tr key={chk.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-slate-800">{chk.name}</td>
                      <td className="py-2.5 px-4">
                        <StatusBadge status={chk.status} />
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <ConfidenceBadge confidence={chk.confidence} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. POTENTIAL FINDINGS */}
        {selectedSections.violations && (
          <section className="print-page-break-inside-avoid space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                5
              </span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                Potential Findings
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1">
                <div className="font-bold text-slate-900 text-xs">MRP Declaration</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Needs Review
                  </span>
                  <span className="font-bold text-slate-700">94%</span>
                </div>
              </div>

              <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-200 space-y-1">
                <div className="font-bold text-slate-900 text-xs">Consumer Care Details</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                    Non-Compliant
                  </span>
                  <span className="font-bold text-slate-700">88%</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1">
                <div className="font-bold text-slate-900 text-xs">Font Size / Readability</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Needs Review
                  </span>
                  <span className="font-bold text-slate-700">76%</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. EVIDENCE SUMMARY */}
        {selectedSections.evidenceSummary && (
          <section className="print-page-break-inside-avoid space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                6
              </span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                Evidence Summary
              </h2>
            </div>
            <div className="overflow-hidden border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold text-[11px] border-b border-slate-200">
                    <th className="py-2.5 px-3">Finding</th>
                    <th className="py-2.5 px-3">Evidence</th>
                    <th className="py-2.5 px-3">Confidence</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900 align-top">MRP Declaration</td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px] align-top">
                      Extracted Text: &quot;MRP Rs. 520.00 (Taxes?)&quot; &mdash; Statutory font ratio verification required.
                    </td>
                    <td className="py-2.5 px-3 align-top font-bold text-slate-700">94%</td>
                    <td className="py-2.5 px-3 align-top text-right">
                      <StatusBadge status="NEEDS REVIEW" />
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900 align-top">Consumer Care Details</td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px] align-top">
                      Extracted Text: &quot;Consumer Care: 1800-XXX-XXXX&quot; &mdash; Placeholder characters present, email unreadable.
                    </td>
                    <td className="py-2.5 px-3 align-top font-bold text-slate-700">88%</td>
                    <td className="py-2.5 px-3 align-top text-right">
                      <StatusBadge status="NON-COMPLIANT" />
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900 align-top">Font Size / Readability</td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px] align-top">
                      Extracted Text: &quot;Net Weight: 5 kg&quot; &mdash; Font height close to minimum statutory 3mm threshold.
                    </td>
                    <td className="py-2.5 px-3 align-top font-bold text-slate-700">76%</td>
                    <td className="py-2.5 px-3 align-top text-right">
                      <StatusBadge status="NEEDS REVIEW" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 7. OFFICER REVIEW */}
        {selectedSections.officerReview && (
          <section className="print-page-break-inside-avoid space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                7
              </span>
              <h2 className="text-sm font-bold tracking-wide uppercase text-slate-900">
                Officer Review
              </h2>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Officer</span>
                  <span className="font-bold text-slate-900">Officer</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Role</span>
                  <span className="font-semibold text-slate-900">Enforcement Official</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Review Status</span>
                  <span className="font-bold text-emerald-800">
                    {isReviewed ? 'REVIEWED' : 'OFFICER REVIEW PENDING'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Final Assessment</span>
                  <span className="font-bold text-slate-900">{finalAssessmentText}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 block text-[11px] mb-1">Officer Observation:</span>
                <p className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-slate-200 italic">
                  {officerReview?.observations?.['chk_care'] ||
                    officerReview?.observations?.['chk_mrp'] ||
                    officerReview?.observations?.['chk_font'] ||
                    'Consumer care contact contains non-standard placeholder characters. Notice recommended under statutory provisions.'}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 8. DISCLAIMER */}
        <section className="print-page-break-inside-avoid pt-4 border-t-2 border-slate-900 space-y-2">
          <div className="flex items-start gap-2 text-[11px] text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Statutory Notice / Disclaimer: </span>
              AI-assisted findings are provided for inspection support. Final findings and enforcement decisions are subject to authorized officer verification.
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2">
            <span>Generated by LABEL SETU Legal Metrology Enforcement System</span>
            <span>Document ID: INS-2026-0001-REP</span>
          </div>
        </section>
      </div>
    </div>
  );
};
