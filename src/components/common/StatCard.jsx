import React from 'react';
import { ClipboardCheck, ShieldCheck, AlertTriangle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap = {
  ClipboardCheck,
  ShieldCheck,
  AlertTriangle,
  Clock,
};

export const StatCard = ({ title, value, percentage, change, trend, color = 'blue', icon, description }) => {
  const IconComponent = iconMap[icon] || ClipboardCheck;

  const colorStyles = {
    blue: {
      bgIcon: 'bg-blue-50 text-blue-700 border-blue-200/80 group-hover:scale-110 group-hover:bg-blue-100/90',
      borderAccent: 'hover:border-blue-300 hover:shadow-md',
      badge: 'text-blue-700 bg-blue-50/80 border-blue-200',
    },
    emerald: {
      bgIcon: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 group-hover:scale-110 group-hover:bg-emerald-100/90',
      borderAccent: 'hover:border-emerald-300 hover:shadow-md',
      badge: 'text-emerald-700 bg-emerald-50/80 border-emerald-200',
    },
    rose: {
      bgIcon: 'bg-rose-50 text-rose-700 border-rose-200/80 group-hover:scale-110 group-hover:bg-rose-100/90',
      borderAccent: 'hover:border-rose-300 hover:shadow-md',
      badge: 'text-rose-700 bg-rose-50/80 border-rose-200',
    },
    amber: {
      bgIcon: 'bg-amber-50 text-amber-700 border-amber-200/80 group-hover:scale-110 group-hover:bg-amber-100/90',
      borderAccent: 'hover:border-amber-300 hover:shadow-md',
      badge: 'text-amber-700 bg-amber-50/80 border-amber-200',
    },
  };

  const currentStyle = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 group cursor-default ${currentStyle.borderAccent}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-slate-950 transition-colors">{value}</h3>
            {percentage && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-transform duration-200 group-hover:scale-105 ${currentStyle.badge}`}>
                {percentage}
              </span>
            )}
          </div>
        </div>

        <div className={`p-2.5 rounded-lg border shrink-0 transition-all duration-300 ease-out ${currentStyle.bgIcon}`}>
          <IconComponent className="w-5 h-5 transition-transform duration-300" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate">{description}</span>
        {change && (
          <span className="flex items-center gap-1 font-medium text-emerald-600 shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
