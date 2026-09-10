import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { CUSTOMER_SUMMARY_STATS } from '../../data/customerMockData';

export const ComplianceOverview = () => {
  const percentage = CUSTOMER_SUMMARY_STATS.overallCompliance;
  const { compliant, needsReview, nonCompliant } = CUSTOMER_SUMMARY_STATS.breakdown;
  const total = compliant + needsReview + nonCompliant;

  // SVG circular gauge math
  const size = 160;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#0f1b2d] rounded-2xl p-6 sm:p-7 border border-[#1e314f] shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">
                Compliance Overview
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Sparkles className="w-3 h-3" /> Live Audit
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Good Standing (Grade A)
          </span>
        </div>
      </div>

      {/* Main Visual Display: Ring & Interactive Bars */}
      <div className="py-6 sm:py-7 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
        {/* Radial Progress Ring */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-44 h-44 transform -rotate-90 filter drop-shadow-md" viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="complianceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#1a2942"
              strokeWidth={strokeWidth}
              className="fill-none"
            />
            {/* Gradient Arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#complianceGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="fill-none transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Centered Score Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-black text-white tracking-tight">
              {percentage}%
            </span>
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider mt-0.5">
              Overall Score
            </span>
          </div>
        </div>

        {/* Status Distribution & Context Details */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              Commodity Distribution Bar
            </span>
            <span className="font-medium text-slate-400">
              {compliant} of {total} items compliant
            </span>
          </div>
          
          {/* Multi-segment Glow Bar */}
          <div className="w-full h-3.5 bg-[#142237] rounded-full overflow-hidden flex gap-1 p-0.5 border border-[#1e314f]">
            <div
              style={{ width: `${(compliant / total) * 100}%` }}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-l-full transition-all duration-500 shadow-xs"
              title={`Compliant: ${compliant} products`}
            />
            <div
              style={{ width: `${(needsReview / total) * 100}%` }}
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-500 shadow-xs"
              title={`Needs Review: ${needsReview} products`}
            />
            <div
              style={{ width: `${(nonCompliant / total) * 100}%` }}
              className="bg-gradient-to-r from-rose-500 to-red-600 h-full rounded-r-full transition-all duration-500 shadow-xs"
              title={`Non-Compliant: ${nonCompliant} products`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-xs shadow-emerald-500/50"></span>
              <span className="font-semibold text-slate-200">Compliant (58%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-xs shadow-amber-500/50"></span>
              <span className="font-semibold text-slate-200">Needs Review (25%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs shadow-rose-500/50"></span>
              <span className="font-semibold text-slate-200">Violations (17%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
