import React from 'react';
import { ShieldCheck, CheckSquare, FileText } from 'lucide-react';
import { ComplianceCheck } from './ComplianceCheck';

export const ComplianceChecklist = ({ checks = [], onSelectEvidence = null }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-cyan-600" />
            <span>Compliance Checks</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated verification of mandatory packaging requirements
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
          {checks.length} Criteria Evaluated
        </span>
      </div>

      {/* Checks List */}
      <div className="p-4 sm:p-5 space-y-2.5">
        {checks.map((check) => (
          <ComplianceCheck
            key={check.id}
            name={check.name}
            status={check.status}
            confidence={check.confidence}
            explanation={check.explanation}
            onViewEvidence={
              onSelectEvidence ? () => onSelectEvidence(check) : null
            }
          />
        ))}
      </div>
    </div>
  );
};
