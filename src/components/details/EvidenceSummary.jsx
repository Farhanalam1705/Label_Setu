import React from 'react';
import { ShieldAlert, Eye, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';
import { ConfidenceBadge } from '../results/ConfidenceBadge';

export const EvidenceSummary = ({ onViewEvidence }) => {
  const evidenceItems = [
    {
      id: 'chk_mrp',
      title: 'MRP Declaration',
      fieldName: 'MRP Declaration',
      status: 'NEEDS REVIEW',
      confidence: 94,
      extractedText: 'MRP Rs. 520.00 (Taxes?)',
      finding: 'Potential issue detected in the MRP declaration. The mandatory text "inclusive of all taxes" is partially obscured.',
    },
    {
      id: 'chk_care',
      title: 'Consumer Care Details',
      fieldName: 'Consumer Care Details',
      status: 'NON-COMPLIANT',
      confidence: 88,
      extractedText: 'Customer Care: 1800-XXX-XXXX | care@ [unreadable]',
      finding: 'Consumer care helpline contains placeholder characters (XXX-XXXX), and no valid email was detected.',
    },
    {
      id: 'chk_font',
      title: 'Font Size / Readability',
      fieldName: 'Font Size / Readability',
      status: 'NEEDS REVIEW',
      confidence: 76,
      extractedText: 'Net Weight: 5 kg',
      finding: 'Principal display panel font height is near minimum statutory threshold (3mm) for 5kg packages.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Evidence</h3>
            <p className="text-xs text-slate-500">
              Total Evidence Items: <span className="font-bold text-slate-800">3</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {evidenceItems.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-1">
                <span className="font-bold text-slate-900 text-xs">{item.title}</span>
                <ConfidenceBadge confidence={item.confidence} showLabel={false} />
              </div>
              <StatusBadge status={item.status} size="sm" />
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {item.finding}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onViewEvidence && onViewEvidence(item)}
              className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-600" />
              <span>View Evidence</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
