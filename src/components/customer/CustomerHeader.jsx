import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, ChevronRight, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { logout, getCurrentUser } from '../../services/auth';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../context/LanguageContext';
import { CUSTOMER_RECENT_NOTIFICATIONS } from '../../data/customerMockData';

export const CustomerHeader = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  const user = getCurrentUser() || {
    name: 'Customer',
    email: 'customer@labelsetu.gov.in',
    role: 'Customer',
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    logout();
    addToast({
      title: 'Logged Out',
      message: 'You have been signed out of the Customer Portal.',
      type: 'info',
    });
    navigate('/login', { replace: true });
  };

  const unreadCount = CUSTOMER_RECENT_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/90 shadow-2xs flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">LABEL SETU</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              {t('customerPortal', 'Customer Portal')}
            </span>
          </div>
          <ChevronRight className="hidden sm:inline w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline font-medium text-slate-600">{t('dashboard', 'Dashboard')}</span>
        </div>
      </div>

      {/* Right: Notifications, User Info, Profile Icon, Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors cursor-pointer"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-bold text-slate-900">Customer Alerts & Updates</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {CUSTOMER_RECENT_NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs hover:bg-slate-50 transition-colors ${
                      n.unread ? 'bg-rose-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {n.type === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      {n.type === 'success' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {n.type === 'info' && (
                        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 leading-tight">{n.title}</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">{n.product}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2.5 border-t border-slate-100 text-center bg-slate-50/50">
                <Link
                  to="/customer/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-rose-700 hover:text-rose-900 transition-colors"
                >
                  View All Notifications &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Identity Pill */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#57184a] text-white flex items-center justify-center font-bold text-xs shadow-2xs ring-1 ring-rose-300/40">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800">Customer</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-rose-50 text-rose-700 font-semibold rounded border border-rose-200/60">
                Business
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-[170px]">
              customer@labelsetu.gov.in
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          title={t('logout', 'Logout')}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t('logout', 'Logout')}</span>
        </button>
      </div>
    </header>
  );
};
