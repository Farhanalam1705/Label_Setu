import React from 'react';
import { Bell, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CUSTOMER_RECENT_NOTIFICATIONS } from '../../data/customerMockData';

export const RecentNotifications = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold border border-rose-200/60">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Recent Notifications
            </h2>
            <p className="text-xs text-slate-400">Updates on inspections & guidelines</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          3 Recent
        </span>
      </div>

      {/* Notifications List */}
      <div className="py-4 space-y-3">
        {CUSTOMER_RECENT_NOTIFICATIONS.map((item) => {
          const isWarning = item.type === 'warning';
          const isSuccess = item.type === 'success';
          const isInfo = item.type === 'info';

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                item.unread
                  ? 'bg-rose-50/30 border-rose-200/80 shadow-2xs'
                  : 'bg-slate-50/50 border-slate-200/80'
              }`}
            >
              {/* Icon */}
              <div className="mt-0.5 shrink-0">
                {isWarning && (
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                )}
                {isSuccess && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
                {isInfo && (
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {item.title}
                  </p>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap font-medium">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs font-semibold text-rose-800 mt-0.5">
                  {item.product}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="pt-3 border-t border-slate-100">
        <Link
          to="/customer/notifications"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
        >
          <span>View All Notifications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
