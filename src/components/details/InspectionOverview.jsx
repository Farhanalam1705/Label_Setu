import React from 'react';
import { Scale, Shield, Calendar, User, Building2, Award } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';

export const InspectionOverview = ({
  inspectionId = 'LM-2026-00129',
  productName = 'ABC Premium Rice',
  category = 'Food Grains & Pulses (Packaged)',
  date = '05 September 2026',
  officer = 'Officer',
  department = 'Legal Metrology',
  reviewStatus = 'REVIEWED',
  finalAssessment = 'Inspection Requires Further Review',
}) => {
  const isReviewed = reviewStatus === 'REVIEWED';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Inspection Overview
            </span>
            <h2 className="text-base font-black text-slate-900">{productName}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
            {inspectionId}
          </span>
          <StatusBadge status={reviewStatus === 'REVIEWED' ? 'REVIEWED' : 'PENDING REVIEW'} size="sm" />
        </div>
      </div>

      {/* Grid of attributes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Inspection ID</span>
          <span className="font-mono font-bold text-slate-900">{inspectionId}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Product</span>
          <span className="font-bold text-slate-900 truncate block">{productName}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Category</span>
          <span className="font-semibold text-slate-800 truncate block">{category}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Inspection Date</span>
          <span className="font-semibold text-slate-800">{date}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Officer</span>
          <span className="font-bold text-slate-900">{officer}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Department</span>
          <span className="font-semibold text-slate-800">{department}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Review Status</span>
          <span
            className={`inline-block font-bold text-[10px] px-2 py-0.5 rounded mt-0.5 ${
              isReviewed
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-amber-50 text-amber-800 border border-amber-300'
            }`}
          >
            {isReviewed ? '✓ REVIEWED' : '○ PENDING REVIEW'}
          </span>
        </div>

        <div>
          <span className="text-slate-400 text-[11px] block font-medium">Final Assessment</span>
          <span className="font-bold text-slate-900 truncate block">{finalAssessment}</span>
        </div>
      </div>
    </div>
  );
};
