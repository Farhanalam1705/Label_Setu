import React from 'react';
import { Clock, ShieldCheck } from 'lucide-react';

export const WelcomeSection = () => {
  return (
    <div className="bg-[#0f1b2d] rounded-2xl p-5 sm:p-6 border border-[#1e314f] shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Welcome back
        </h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
          Active
        </span>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto bg-[#142237] px-3.5 py-2 rounded-xl border border-slate-700/80 text-xs">
        <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
        <div>
          <span className="text-slate-400 font-medium">Last updated: </span>
          <span className="text-white font-bold">Today</span>
        </div>
      </div>
    </div>
  );
};
