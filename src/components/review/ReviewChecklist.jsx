import React from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { CHECKLIST_ITEMS } from '../../data/mockReviewData';

export const ReviewChecklist = ({ checklist, onChange }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
    <h2 className="text-sm font-bold text-slate-900 mb-4">Officer Review Checklist</h2>
    <div className="space-y-2.5">
      {CHECKLIST_ITEMS.map((item) => {
        const checked = !!checklist[item.id];
        return (
          <label
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all select-none ${
              checked
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(item.id, e.target.checked)}
              className="sr-only"
            />
            <span className="shrink-0">
              {checked ? (
                <CheckSquare className="w-5 h-5 text-emerald-600" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </span>
            <span className={`text-sm ${checked ? 'text-emerald-800 font-semibold line-through decoration-emerald-400' : 'text-slate-700'}`}>
              {item.label}
            </span>
          </label>
        );
      })}
    </div>
    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
      <span className="text-xs text-slate-500">
        {Object.values(checklist).filter(Boolean).length} / {CHECKLIST_ITEMS.length} completed
      </span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{
            width: `${(Object.values(checklist).filter(Boolean).length / CHECKLIST_ITEMS.length) * 100}%`,
          }}
        />
      </div>
    </div>
  </div>
);
