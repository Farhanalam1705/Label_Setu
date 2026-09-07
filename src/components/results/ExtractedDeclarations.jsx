import React from 'react';
import { FileSpreadsheet, ShieldCheck, Filter } from 'lucide-react';
import { ExtractedField } from './ExtractedField';

export const ExtractedDeclarations = ({ declarations = [], onSelectEvidence = null }) => {
  const compliantCount = declarations.filter((d) => d.status === 'COMPLIANT').length;
  const reviewCount = declarations.filter((d) => d.status !== 'COMPLIANT').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-slate-50/70">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-cyan-600" />
            <span>Extracted Declarations</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Mandatory packaged commodity declarations recognized by the OCR parser
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {compliantCount} Valid
          </span>
          {reviewCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              {reviewCount} Issues
            </span>
          )}
        </div>
      </div>

      {/* Field List Grid */}
      <div className="p-4 sm:p-5 space-y-2.5">
        {declarations.map((field) => (
          <ExtractedField
            key={field.id}
            fieldName={field.fieldName}
            extractedValue={field.extractedValue}
            confidence={field.confidence}
            status={field.status}
            onViewEvidence={
              field.regionId && onSelectEvidence
                ? () => onSelectEvidence(field)
                : null
            }
          />
        ))}
      </div>
    </div>
  );
};
