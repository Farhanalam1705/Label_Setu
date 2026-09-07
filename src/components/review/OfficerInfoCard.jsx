import React from 'react';
import { User, Building2, Shield, Calendar } from 'lucide-react';

const today = new Date().toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export const OfficerInfoCard = ({ reviewStatus = 'PENDING REVIEW' }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
      Officer Information
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#0c1e33] flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Officer Name
          </p>
          <p className="text-sm font-bold text-slate-900">Officer</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Role</p>
          <p className="text-sm font-bold text-slate-800">Enforcement Official</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Department
          </p>
          <p className="text-sm font-bold text-slate-800">Legal Metrology</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Review Date
          </p>
          <p className="text-sm font-bold text-slate-800">{today}</p>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
      <span className="text-xs text-slate-500 font-medium">Review Status</span>
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full border ${
          reviewStatus === 'REVIEWED'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
            : 'bg-amber-50 text-amber-800 border-amber-300'
        }`}
      >
        {reviewStatus === 'REVIEWED' ? '✓ Reviewed' : 'Pending Review'}
      </span>
    </div>
  </div>
);
