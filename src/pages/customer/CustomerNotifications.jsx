import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle2, Info, Check, XCircle, Bell, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CUSTOMER_RECENT_NOTIFICATIONS } from '../../data/customerMockData';
import { getComplaintNotifications } from '../../services/complaintService';
import { useLanguage } from '../../context/LanguageContext';

export const CustomerNotifications = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState(() => {
    const dynamicNotifs = getComplaintNotifications('customer');
    const staticMapped = CUSTOMER_RECENT_NOTIFICATIONS.map((n) => ({
      ...n,
      message: n.desc,
    }));
    return [...dynamicNotifs, ...staticMapped];
  });

  useEffect(() => {
    const handler = () => {
      const dynamicNotifs = getComplaintNotifications('customer');
      const staticMapped = CUSTOMER_RECENT_NOTIFICATIONS.map((n) => ({
        ...n,
        message: n.desc,
      }));
      setNotifications([...dynamicNotifs, ...staticMapped]);
    };
    window.addEventListener('labelsetu_notifications_updated', handler);
    return () => window.removeEventListener('labelsetu_notifications_updated', handler);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <Link to="/customer/dashboard" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> {t('backToDashboard', 'Back to Dashboard')}
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('notifications', 'Notifications & Alerts')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('notificationPreferencesSubtitle', 'Stay updated with Legal Metrology inspection notices, complaint actions, and statutory alerts')}
          </p>
        </div>

        <button 
          onClick={handleMarkAllRead}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{t('markAllAsRead', 'Mark All as Read')}</span>
        </button>
      </div>

      {/* Notifications Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Bell className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-600">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors ${
                  item.unread ? 'bg-rose-50/25' : ''
                }`}
              >
                <div className="mt-1 shrink-0">
                  {item.type === 'warning' && (
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                  )}
                  {item.type === 'success' && (
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  {item.type === 'error' && (
                    <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                      <XCircle className="w-4 h-4" />
                    </div>
                  )}
                  {item.type === 'info' && (
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                      <Info className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                      )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{item.time || 'Today'}</span>
                  </div>
                  {item.product && (
                    <p className="text-xs font-semibold text-rose-700 mt-0.5">{item.product}</p>
                  )}
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.message || item.desc}
                  </p>
                  {item.complaintId && (
                    <div className="mt-2">
                      <Link
                        to={`/customer/complaints/${item.complaintId}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors"
                      >
                        Track Complaint ({item.complaintId}) &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
