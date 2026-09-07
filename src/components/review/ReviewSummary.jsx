import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ClipboardList } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, colorClass }) => (
  <div className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center ${colorClass}`}>
    <Icon className="w-5 h-5 mb-1.5 opacity-70" />
    <span className="text-2xl font-extrabold leading-none">{value}</span>
    <span className="text-[11px] font-semibold mt-1 opacity-80 uppercase tracking-wide">{label}</span>
  </div>
);

export const ReviewSummary = () => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
      Review Summary
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        label="Total Findings"
        value={3}
        icon={ClipboardList}
        colorClass="bg-slate-50 border-slate-200 text-slate-700"
      />
      <StatCard
        label="Compliant"
        value={3}
        icon={CheckCircle2}
        colorClass="bg-emerald-50 border-emerald-200 text-emerald-800"
      />
      <StatCard
        label="Non-Compliant"
        value={1}
        icon={XCircle}
        colorClass="bg-rose-50 border-rose-200 text-rose-800"
      />
      <StatCard
        label="Needs Review"
        value={2}
        icon={AlertTriangle}
        colorClass="bg-amber-50 border-amber-200 text-amber-800"
      />
    </div>
  </div>
);
