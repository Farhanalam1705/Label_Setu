import React from 'react';
import { Package, ShieldAlert, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';

export const ReportSummaryCard = ({ inspectionData, officerReview }) => {
  const { product, overall } = inspectionData;

  const finalStatus = officerReview?.finalAssessment
    ? officerReview.finalAssessment === 'compliant'
      ? 'COMPLIANT'
      : officerReview.finalAssessment === 'non_compliant'
      ? 'NON-COMPLIANT'
      : 'NEEDS REVIEW'
    : overall?.status || 'NEEDS REVIEW';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-cyan-50 text-cyan-700 rounded-lg">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Inspection Summary</h3>
            <p className="text-xs text-slate-500">Key inspection attributes and compliance score.</p>
          </div>
        </div>
        <StatusBadge status={finalStatus} />
      </div>

      {/* Product metadata table */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70 text-xs">
        <div>
          <span className="text-[11px] text-slate-500 block">Product</span>
          <span className="font-bold text-slate-900">{product.name}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-500 block">Category</span>
          <span className="font-semibold text-slate-800 truncate block">{product.category}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-500 block">Net Quantity</span>
          <span className="font-bold text-slate-900">{product.netQuantity}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-500 block">MRP</span>
          <span className="font-bold text-slate-900">{product.mrp}</span>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <span className="text-[11px] text-slate-500 block mb-0.5">Overall Compliance</span>
          <div className="text-lg font-black text-slate-900">{overall.score}%</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <span className="text-[11px] text-slate-500 block mb-0.5">Total Findings</span>
          <div className="text-lg font-black text-slate-900">3</div>
        </div>
        <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-center">
          <span className="text-[11px] text-rose-600 font-medium block mb-0.5">Non-Compliant</span>
          <div className="text-lg font-black text-rose-700">1</div>
        </div>
        <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-center">
          <span className="text-[11px] text-amber-600 font-medium block mb-0.5">Needs Review</span>
          <div className="text-lg font-black text-amber-700">2</div>
        </div>
      </div>
    </div>
  );
};
