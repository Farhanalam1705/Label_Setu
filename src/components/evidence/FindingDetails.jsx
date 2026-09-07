import React from 'react';

export const FindingDetails = ({ findings = [], activeId, onSelect }) => (
  <div className="space-y-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm max-h-[70vh] overflow-y-auto">
    <h2 className="text-lg font-semibold text-slate-800 border-b pb-2">Findings</h2>
    {findings.map((f) => (
      <div
        key={f.id}
        className={`p-3 rounded cursor-pointer transition-colors ${f.id === activeId ? 'bg-cyan-50 border border-cyan-400' : 'hover:bg-slate-50'} `}
        onClick={() => onSelect(f.id)}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-900">{f.label}</span>
          <span className="text-xs text-slate-500">{f.description}</span>
        </div>
      </div>
    ))}
  </div>
);
