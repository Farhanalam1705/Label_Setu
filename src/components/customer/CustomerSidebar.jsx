import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  AlertCircle,
  FileText,
  Bell,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react';
import { LabelSetuLogo } from '../common/LabelSetuLogo';
import { logout } from '../../services/auth';
import { useToast } from '../common/Toast';
import { useLanguage } from '../../context/LanguageContext';

export const CustomerSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    logout();
    addToast({
      title: 'Logged Out',
      message: 'You have been signed out successfully.',
      type: 'info',
    });
    navigate('/login', { replace: true });
  };

  const navItems = [
    {
      name: t('dashboard', 'Dashboard'),
      path: '/customer/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: t('myProducts', 'My Products'),
      path: '/customer/products',
      icon: Package,
      badge: null,
    },
    {
      name: t('myInspections', 'My Inspections'),
      path: '/customer/inspections',
      icon: ClipboardList,
      badge: null,
    },
    {
      name: t('complaints', 'Complaints'),
      path: '/customer/complaints',
      icon: AlertCircle,
      badge: null,
    },
    {
      name: t('reports', 'Reports'),
      path: '/customer/reports',
      icon: FileText,
      badge: null,
    },
    {
      name: t('settings', 'Settings'),
      path: '/customer/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Customer Sidebar Container: Matching customer login deep plum theme */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#1b0a1a] text-slate-100 flex flex-col border-r border-[#3a1635]/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="p-5 border-b border-[#3a1635]/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LabelSetuLogo className="w-10 h-10 ring-1 ring-rose-500/40" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wider text-white">LABEL SETU</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <p className="text-[11px] text-rose-300 font-medium">{t('customerPortal', 'Customer Portal')}</p>
              </div>
            </div>
          </div>

          {/* Close button on Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#2f102c] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-rose-300/60">
            {t('customerServices', 'Customer Services')}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#57184a] text-white shadow-xs font-bold ring-1 ring-rose-500/30'
                      : 'text-slate-300 hover:bg-[#2f102c] hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Business Compliance Card */}
        <div className="p-4 mx-3 mb-2 rounded-xl bg-[#2a0e28]/90 border border-[#43173f]/80 text-[11px] text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-200 font-semibold text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span>{t('businessCompliance', 'Business Compliance')}</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Track declarations under Legal Metrology (Packaged Commodities) Rules.
          </p>
        </div>

        {/* Bottom User Info & Logout */}
        <div className="p-4 border-t border-[#3a1635] bg-[#140614]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#57184a] text-white font-bold text-xs flex items-center justify-center shrink-0 ring-1 ring-rose-400/30">
                CU
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Customer</p>
                <p className="text-[11px] text-rose-300/70 truncate">customer@labelsetu.gov.in</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title={t('logout', 'Logout')}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
