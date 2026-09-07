import React from 'react';
import { CheckCircle2, ShieldCheck, Eye } from 'lucide-react';
import { StatusBadge } from '../results/StatusBadge';
import { ConfidenceBadge } from '../results/ConfidenceBadge';

export const ComplianceChecks = ({ checks = [], onViewEvidence }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Compliance Checks</h3>
            <p className="text-xs text-slate-500">
              Statutory verification results and AI confidence ratings.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/90 text-slate-600 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Check</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Finding</th>
              <th className="py-3 px-4 text-right">Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {checks.map((chk) => {
              const hasEvidence =
                chk.hasEvidence !== false &&
                (chk.status === 'NEEDS REVIEW' ||
                  chk.status === 'NON-COMPLIANT' ||
                  chk.regionId ||
                  chk.id === 'chk_mrp' ||
                  chk.id === 'chk_care' ||
                  chk.id === 'chk_font');

              return (
                <tr key={chk.id || chk.name} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {chk.name}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge status={chk.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <ConfidenceBadge confidence={chk.confidence} showLabel={false} />
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-[220px] truncate">
                    {chk.finding || chk.explanation || 'Verified against statutory rules'}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {hasEvidence ? (
                      <button
                        type="button"
                        onClick={() => onViewEvidence && onViewEvidence(chk)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-cyan-700 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Evidence</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">Verified</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
