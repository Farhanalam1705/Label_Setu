import React from 'react';
import { Package, ClipboardList, FileText, Bell, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'View My Products',
      desc: '12 registered SKUs',
      icon: Package,
      path: '/customer/products',
      color: 'hover:border-rose-300 hover:bg-rose-50/40 text-rose-800',
      iconBg: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    },
    {
      title: 'View Inspections',
      desc: '8 verification audits',
      icon: ClipboardList,
      path: '/customer/inspections',
      color: 'hover:border-[#57184a]/30 hover:bg-[#57184a]/5 text-[#57184a]',
      iconBg: 'bg-[#57184a]/10 text-[#57184a] border border-[#57184a]/20',
    },
    {
      title: 'View Reports',
      desc: 'Download certificates',
      icon: FileText,
      path: '/customer/reports',
      color: 'hover:border-emerald-300 hover:bg-emerald-50/40 text-emerald-800',
      iconBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    },
    {
      title: 'Notifications',
      desc: 'Alerts & rule changes',
      icon: Bell,
      path: '/customer/notifications',
      color: 'hover:border-amber-300 hover:bg-amber-50/40 text-amber-800',
      iconBg: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold border border-rose-200/60">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Quick Actions
          </h2>
          <p className="text-xs text-slate-400">Direct shortcuts to customer tools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.path}
              onClick={() => navigate(act.path)}
              className={`p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 text-left transition-all duration-150 flex items-center justify-between group cursor-pointer ${act.color}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.iconBg} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-slate-900">
                    {act.title}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {act.desc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
