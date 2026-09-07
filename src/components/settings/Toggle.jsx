import React from 'react';

export const Toggle = ({ checked, onChange, label, description, id }) => {
  return (
    <div className="flex items-start justify-between gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors">
      <div className="space-y-0.5">
        <label htmlFor={id} className="text-xs font-bold text-slate-900 cursor-pointer block">
          {label}
        </label>
        {description && (
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
          checked ? 'bg-[#0c1e33]' : 'bg-slate-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
