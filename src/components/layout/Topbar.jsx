import React, { useState } from 'react';
import { Menu, Bell, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const Topbar = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic title based on route
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: t('enforcementDashboard', 'Enforcement Dashboard'),
          category: t('portalTitle', 'Portal'),
        };
      case '/scanner':
      case '/new-inspection':
        return {
          title: t('productScanner', 'Product Scanner'),
          category: t('inspections', 'Inspections'),
        };
      case '/processing':
        return {
          title: t('aiAnalysis', 'AI Analysis & Processing'),
          category: t('newInspection', 'New Inspection'),
        };
      case '/results':
        return {
          title: t('complianceResults', 'Compliance Results'),
          category: t('inspectionReport', 'Inspection Report'),
        };
      case '/history':
        return {
          title: t('inspectionHistory', 'Inspection History'),
          category: t('records', 'Records'),
        };
      case '/settings':
        return {
          title: t('settings', 'Settings'),
          category: t('systemConfig', 'System Configuration'),
        };
      default:
        return {
          title: t('portalTitle', 'Portal'),
          category: 'LABEL SETU',
        };
    }
  };

  const pageInfo = getPageInfo();

  const mockNotifications = [
    {
      id: 1,
      title: 'Mandatory Declaration Alert',
      desc: 'New guideline update issued for packaged food commodity MRP declarations.',
      time: '15m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Batch Inspection Synced',
      desc: 'Inspection INS-2026-0894 logged to central enforcement registry.',
      time: '1h ago',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/90 shadow-xs flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left section: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="hidden sm:inline text-slate-400">LABEL SETU</span>
          <ChevronRight className="hidden sm:inline w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline text-slate-400">{pageInfo.category}</span>
          <ChevronRight className="hidden sm:inline w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-800 text-sm">{pageInfo.title}</span>
        </div>
      </div>

      {/* Center/Right section: Status Pill & User Menu */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Enforcement Alerts</span>
                <span className="text-[10px] bg-cyan-100 text-cyan-800 font-bold px-1.5 py-0.5 rounded">
                  1 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 transition-colors ${n.unread ? 'bg-cyan-50/30' : ''}`}>
                    <p className="font-semibold text-slate-800">{n.title}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{n.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-medium text-cyan-700 hover:underline cursor-pointer"
                >
                  {t('close', 'Close notifications')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};
