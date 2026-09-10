import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CategoryComplianceBreakdown = () => {
  const categories = [
    {
      name: 'Food & Grains',
      total: 5,
      compliant: 4,
      review: 1,
      score: 88,
      status: 'Good',
      color: 'from-emerald-500 to-teal-400',
    },
    {
      name: 'Flour & Staples',
      total: 3,
      compliant: 3,
      review: 0,
      score: 96,
      status: 'Excellent',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Edible Oils',
      total: 2,
      compliant: 0,
      review: 1,
      score: 61,
      status: 'Action Required',
      color: 'from-rose-500 to-amber-500',
    },
    {
      name: 'Sweeteners & Sugar',
      total: 2,
      compliant: 1,
      review: 1,
      score: 89,
      status: 'Good',
      color: 'from-violet-500 to-purple-400',
    },
  ];

  const rulesChecklist = [
    { rule: 'Rule 6(1)(a) Manufacturer Identification', rate: 100, status: 'Passed' },
    { rule: 'Rule 6(1)(c) Net Quantity & Unit Standard', rate: 91, status: 'Passed' },
    { rule: 'Rule 6(1)(d) MRP Declaration (All Taxes Incl.)', rate: 75, status: 'Review' },
    { rule: 'Rule 6(1)(n) Consumer Care & Helpline Info', rate: 83, status: 'Review' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Category Performance Card */}
      <div className="lg:col-span-7 bg-[#0f1b2d] rounded-2xl p-6 sm:p-7 border border-[#1e314f] shadow-xl text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Category Compliance Performance
                </h3>
                <p className="text-xs text-slate-400">Compliance health broken down by product lines</p>
              </div>
            </div>

            <Link
              to="/customer/products"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span>Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="py-5 space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-[#142237]/60 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">{cat.compliant}/{cat.total} Compliant</span>
                    <span className="font-black text-white text-xs">{cat.score}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Updated as of latest inspection round</span>
          <span className="text-cyan-400 font-medium">4 Core Categories</span>
        </div>
      </div>

      {/* Statutory Rules Audit Checklist Card */}
      <div className="lg:col-span-5 bg-[#0f1b2d] rounded-2xl p-6 sm:p-7 border border-[#1e314f] shadow-xl text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Statutory Rule Checklist
                </h3>
                <p className="text-xs text-slate-400">Legal Metrology PCR 2011</p>
              </div>
            </div>
          </div>

          <div className="py-4 space-y-3">
            {rulesChecklist.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#142237]/60 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{item.rule}</p>
                  <p className="text-[11px] text-slate-400">{item.rate}% compliance conformity rate</p>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                    item.status === 'Passed'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 text-center">
          Verified under Legal Metrology Act Standards
        </div>
      </div>
    </div>
  );
};
