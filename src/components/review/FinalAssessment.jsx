import React from 'react';
import { FINAL_ASSESSMENT_OPTIONS } from '../../data/mockReviewData';

const colorMap = {
  emerald: {
    selected: 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200',
    radio: 'accent-emerald-600',
    title: 'text-emerald-900',
    desc: 'text-emerald-700',
  },
  amber: {
    selected: 'border-amber-500 bg-amber-50 ring-2 ring-amber-200',
    radio: 'accent-amber-600',
    title: 'text-amber-900',
    desc: 'text-amber-700',
  },
  rose: {
    selected: 'border-rose-500 bg-rose-50 ring-2 ring-rose-200',
    radio: 'accent-rose-600',
    title: 'text-rose-900',
    desc: 'text-rose-700',
  },
};

export const FinalAssessment = ({ value, onChange }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
    <h2 className="text-sm font-bold text-slate-900 mb-1">Final Officer Assessment</h2>
    <p className="text-xs text-slate-500 mb-4">
      Select one — this is your official determination for this inspection.
    </p>
    <div className="space-y-3">
      {FINAL_ASSESSMENT_OPTIONS.map((opt) => {
        const isSelected = value === opt.id;
        const colors = colorMap[opt.color];
        return (
          <label
            key={opt.id}
            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
              isSelected ? colors.selected : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              name="finalAssessment"
              value={opt.id}
              checked={isSelected}
              onChange={() => onChange(opt.id)}
              className={`mt-0.5 shrink-0 ${isSelected ? colors.radio : ''}`}
            />
            <div>
              <span className={`text-sm font-bold block ${isSelected ? colors.title : 'text-slate-900'}`}>
                {opt.label}
              </span>
              <span className={`text-xs mt-0.5 block leading-relaxed ${isSelected ? colors.desc : 'text-slate-500'}`}>
                {opt.description}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  </div>
);
